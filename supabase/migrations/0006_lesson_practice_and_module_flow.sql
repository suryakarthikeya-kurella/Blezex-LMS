alter table assignments
  add column if not exists lesson_id uuid references lessons(id) on delete cascade;

create index if not exists assignments_lesson_id_idx on assignments(lesson_id);

update assignments a
set lesson_id = l.id
from lessons l
join modules m on m.id = l.module_id
join courses c on c.id = m.course_id
where a.course_id = c.id
  and a.lesson_id is null
  and (
    (a.title = 'Responsive Portfolio Page' and l.title = 'Style responsive layouts with CSS')
    or (a.title = 'React Learning Dashboard' and l.title = 'Think in reusable React components')
    or (a.title = 'Full Stack API Integration' and l.title = 'Design and consume a REST API')
  );

with first_lesson as (
  select distinct on (m.course_id) m.course_id, l.id
  from lessons l
  join modules m on m.id = l.module_id
  where l.status = 'published'
  order by m.course_id, m.position, l.position
)
update assignments a
set lesson_id = first_lesson.id
from first_lesson
where a.lesson_id is null and a.course_id = first_lesson.course_id;

insert into assignments(course_id, lesson_id, title, instructions)
select m.course_id,
       l.id,
       l.title || ' - Practice',
       'Practice the concepts from "' || l.title || '". Create a small example that demonstrates the main ideas, then submit your code or project link with a short explanation of how you tested it.'
from lessons l
join modules m on m.id = l.module_id
join courses c on c.id = m.course_id
where l.status = 'published'
  and c.slug = 'full-stack-web'
  and not exists (
    select 1 from assignments a where a.lesson_id = l.id
  );
