alter table quizzes add column if not exists lesson_id uuid references lessons on delete cascade;
create unique index if not exists quizzes_one_lesson_idx on quizzes(lesson_id);

do $$
declare
  lesson_row record;
  lesson_quiz_id uuid;
  lesson_question_id uuid;
  question_no integer;
  correct_index integer;
  lesson_text text;
  answer_text text;
  distractors text[];
  options text[];
  statements text[];
begin
  for lesson_row in
    select l.id, l.title, l.content_html, m.title as module_title, c.id as course_id
    from lessons l
    join modules m on m.id = l.module_id
    join courses c on c.id = m.course_id
    where c.slug = 'full-stack-web'
      and l.status = 'published'
    order by m.position, l.position
  loop
    insert into quizzes(course_id, lesson_id, title, pass_pct, max_attempts, status)
    values (lesson_row.course_id, lesson_row.id, lesson_row.title || ' - Lesson Quiz', 70, 3, 'published')
    on conflict (lesson_id) do nothing
    returning id into lesson_quiz_id;

    if lesson_quiz_id is null then
      select q.id into lesson_quiz_id from quizzes q where q.lesson_id = lesson_row.id;
    end if;

    lesson_text := regexp_replace(
      regexp_replace(lesson_row.content_html, '<[^>]*>', ' ', 'g'),
      '\s+', ' ', 'g'
    );

    select array_agg(trim(sentence) order by sentence_no)
    into statements
    from regexp_split_to_table(lesson_text, '[.!?]+') with ordinality as parts(sentence, sentence_no)
    where length(trim(sentence)) between 30 and 240;

    if coalesce(cardinality(statements), 0) = 0 then
      statements := array[lesson_row.title || ' is a topic in ' || lesson_row.module_title || '.'];
    end if;

    for question_no in 1..10 loop
      answer_text := statements[((question_no - 1) % cardinality(statements)) + 1];

      select array_agg(candidate.statement order by candidate.sort_key)
      into distractors
      from (
        select distinct trim(sentence) as statement, md5(trim(sentence) || question_no::text) as sort_key
        from lessons other_lesson
        join modules other_module on other_module.id = other_lesson.module_id
        cross join lateral regexp_split_to_table(
          regexp_replace(regexp_replace(other_lesson.content_html, '<[^>]*>', ' ', 'g'), '\s+', ' ', 'g'),
          '[.!?]+'
        ) as sentence
        where other_module.course_id = lesson_row.course_id
          and other_lesson.status = 'published'
          and other_lesson.id <> lesson_row.id
          and length(trim(sentence)) between 30 and 240
          and trim(sentence) <> answer_text
        order by sort_key
        limit 3
      ) as candidate;

      if coalesce(cardinality(distractors), 0) < 3 then
        distractors := array[
          'Use the idea to build a reliable web application.',
          'Validate data and handle errors at application boundaries.',
          'Test the experience with realistic user input.'
        ];
      end if;

      correct_index := (question_no - 1) % 4;
      options := case correct_index
        when 0 then array[answer_text, distractors[1], distractors[2], distractors[3]]
        when 1 then array[distractors[1], answer_text, distractors[2], distractors[3]]
        when 2 then array[distractors[1], distractors[2], answer_text, distractors[3]]
        else array[distractors[1], distractors[2], distractors[3], answer_text]
      end;

      insert into quiz_questions(quiz_id, prompt, options, position)
      select
        lesson_quiz_id,
        'Question ' || question_no || ': According to "' || lesson_row.title || '", which statement is covered in this lesson?',
        jsonb_build_array(options[1], options[2], options[3], options[4]),
        question_no
      where not exists (
        select 1 from quiz_questions existing_question
        where existing_question.quiz_id = lesson_quiz_id
          and existing_question.prompt = 'Question ' || question_no || ': According to "' || lesson_row.title || '", which statement is covered in this lesson?'
      )
      returning id into lesson_question_id;

      if lesson_question_id is null then
        select q.id into lesson_question_id
        from quiz_questions q
        where q.quiz_id = lesson_quiz_id
          and q.prompt = 'Question ' || question_no || ': According to "' || lesson_row.title || '", which statement is covered in this lesson?';
      end if;

      insert into quiz_keys(question_id, correct_index)
      values (lesson_question_id, correct_index)
      on conflict (question_id) do nothing;
    end loop;

    lesson_quiz_id := null;
  end loop;
end $$;
