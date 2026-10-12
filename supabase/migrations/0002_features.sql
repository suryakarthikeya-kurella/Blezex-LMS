-- 0002: quizzes, projects, sessions, evaluations, completion rules, alumni, notifications, reports, grant hardening
alter table profiles add column must_change_password boolean not null default false;
alter table profiles add column is_alumni boolean not null default false;
alter table courses add column min_progress_pct int not null default 100 check (min_progress_pct between 0 and 100);
alter table courses add column min_attendance_pct int not null default 75 check (min_attendance_pct between 0 and 100);
alter table courses add column min_assignment_avg numeric not null default 40;

create or replace function guard_profile() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is not null and not is_admin() then new.role:=old.role; new.status:=old.status; new.email:=old.email; new.is_alumni:=old.is_alumni; end if;
  return new; end $$;

create function mentors_course(cid uuid) returns boolean language sql stable security definer set search_path=public as
$$ select is_active_user() and exists(select 1 from enrollments where course_id=cid and mentor_id=auth.uid()) $$;

-- enrollment validation: roles, mentor active, batch belongs to course
create function validate_enrollment() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not exists(select 1 from profiles where id=new.student_id and role='student') then raise exception 'student_id must reference a student'; end if;
  if new.mentor_id is not null and not exists(select 1 from profiles where id=new.mentor_id and role='mentor' and status='active') then raise exception 'mentor_id must reference an active mentor'; end if;
  if new.batch_id is not null and not exists(select 1 from batches where id=new.batch_id and course_id=new.course_id) then raise exception 'batch does not belong to this course'; end if;
  return new; end $$;
create trigger t_a_validate before insert or update on enrollments for each row execute function validate_enrollment();

create function enrollment_after() returns trigger language plpgsql security definer set search_path=public as $$
begin
  update profiles set is_alumni = (exists(select 1 from enrollments where student_id=new.student_id and status='completed')
    and not exists(select 1 from enrollments where student_id=new.student_id and status in ('active','paused'))) where id=new.student_id;
  if new.mentor_id is not null then
    if tg_op='INSERT' then
      insert into notifications(user_id,title,body) values(new.mentor_id,'New student assigned','A student was assigned to you.');
    elsif old.mentor_id is distinct from new.mentor_id then
      insert into notifications(user_id,title,body) values(new.mentor_id,'New student assigned','A student was assigned to you.');
    end if;
  end if;
  return new; end $$;
create trigger t_enr_after after insert or update on enrollments for each row execute function enrollment_after();

-- explicit completion rules
create function enrollment_eligibility(eid uuid)
returns table(progress_pct numeric, attendance_pct numeric, assignment_avg numeric, assignments_graded int, assignments_total int, eligible boolean)
language plpgsql stable security definer set search_path=public as $$
declare e enrollments; c courses; tl int; dl int; an int; ap int; av numeric; ta int; ga int; pr numeric; at_ numeric;
begin
  select * into e from enrollments where id=eid and (is_admin() or student_id=auth.uid() or mentor_id=auth.uid());
  if not found then return; end if;
  select * into c from courses where id=e.course_id;
  select count(*) into tl from lessons l join modules m on m.id=l.module_id where m.course_id=e.course_id and l.status='published';
  select count(*) into dl from lesson_progress lp join lessons l on l.id=lp.lesson_id where lp.enrollment_id=eid and l.status='published';
  select count(*), count(*) filter (where present) into an, ap from attendance where enrollment_id=eid;
  select coalesce(avg(score),0), count(*) into av, ga from submissions where enrollment_id=eid and status='graded';
  select count(*) into ta from assignments where course_id=e.course_id;
  pr := case when tl=0 then 0 else round(100.0*dl/tl,1) end;
  at_ := case when an=0 then 100 else round(100.0*ap/an,1) end;
  return query select pr, at_, round(av,1), ga, ta,
    (pr>=c.min_progress_pct and at_>=c.min_attendance_pct and (ta=0 or (ga>=ta and av>=c.min_assignment_avg)));
end $$;

create function check_cert_eligible() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() then raise exception 'Only admins can issue certificates'; end if;
  if not exists(select 1 from enrollment_eligibility(new.enrollment_id) where eligible) then raise exception 'Enrollment does not meet completion requirements'; end if;
  return new; end $$;
create trigger t_cert_check before insert on certificates for each row execute function check_cert_eligible();
create function notify_cert() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into notifications(user_id,title,body) select e.student_id,'Certificate issued','Your certificate ID: '||new.verification_id from enrollments e where e.id=new.enrollment_id; return new; end $$;
create trigger t_cert_notify after insert on certificates for each row execute function notify_cert();

-- sessions & evaluations
create table class_sessions(id uuid primary key default gen_random_uuid(), course_id uuid not null references courses on delete cascade,
  batch_id uuid references batches on delete set null, title text not null, session_date date not null, created_by uuid references profiles default auth.uid());
alter table attendance add column session_id uuid references class_sessions on delete set null;
create table evaluations(id uuid primary key default gen_random_uuid(), enrollment_id uuid not null references enrollments on delete cascade,
  criterion text not null, score numeric not null check (score>=0), max_score numeric not null default 10 check (max_score>0), remarks text,
  evaluated_by uuid references profiles default auth.uid(), created_at timestamptz not null default now(), check (score<=max_score));

-- quizzes (answer keys live in a separate admin-only table)
create table quizzes(id uuid primary key default gen_random_uuid(), course_id uuid not null references courses on delete cascade, title text not null,
  pass_pct int not null default 60 check (pass_pct between 1 and 100), max_attempts int not null default 3 check (max_attempts>=1),
  status text not null default 'draft' check (status in ('draft','published')));
create table quiz_questions(id uuid primary key default gen_random_uuid(), quiz_id uuid not null references quizzes on delete cascade,
  prompt text not null, options jsonb not null check (jsonb_typeof(options)='array'), position int not null default 1);
create table quiz_keys(question_id uuid primary key references quiz_questions on delete cascade, correct_index int not null check (correct_index>=0));
create table quiz_attempts(id uuid primary key default gen_random_uuid(), quiz_id uuid not null references quizzes on delete cascade,
  enrollment_id uuid not null references enrollments on delete cascade, score_pct numeric not null, passed boolean not null, answers jsonb, created_at timestamptz not null default now());
create index on quiz_attempts(enrollment_id, quiz_id);

create function submit_quiz(qid uuid, eid uuid, answers jsonb) returns table(score_pct numeric, passed boolean, attempts_used int, attempts_max int)
language plpgsql security definer set search_path=public as $$
declare q quizzes; e enrollments; total int; right_ int; used int; pct numeric; ok boolean;
begin
  select * into e from enrollments where id=eid and student_id=auth.uid() and status='active';
  if not found then raise exception 'No active enrollment'; end if;
  select * into q from quizzes where id=qid and status='published' and course_id=e.course_id;
  if not found then raise exception 'Quiz not available'; end if;
  select count(*) into used from quiz_attempts where quiz_id=qid and enrollment_id=eid;
  if used>=q.max_attempts then raise exception 'Attempt limit reached'; end if;
  select count(*), count(*) filter (where (answers->>qq.id::text) = k.correct_index::text) into total, right_
    from quiz_questions qq join quiz_keys k on k.question_id=qq.id where qq.quiz_id=qid;
  if total=0 then raise exception 'Quiz has no questions'; end if;
  pct := round(100.0*right_/total,1); ok := pct>=q.pass_pct;
  insert into quiz_attempts(quiz_id,enrollment_id,score_pct,passed,answers) values(qid,eid,pct,ok,answers);
  return query select pct, ok, used+1, q.max_attempts;
end $$;

-- project milestones & evaluation
create table project_milestones(id uuid primary key default gen_random_uuid(), enrollment_id uuid not null references enrollments on delete cascade,
  title text not null, description text, due_date date, status text not null default 'pending' check (status in ('pending','submitted','evaluated')),
  link_url text check (link_url is null or link_url ~* '^https?://'), student_notes text, score numeric, feedback text, evaluated_by uuid references profiles, created_at timestamptz not null default now());
create function guard_milestone() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() and not mentors_enrollment(old.enrollment_id) then
    if old.status='evaluated' then raise exception 'Evaluated milestones are locked'; end if;
    new.score:=old.score; new.feedback:=old.feedback; new.evaluated_by:=old.evaluated_by; new.title:=old.title;
    new.description:=old.description; new.due_date:=old.due_date; new.enrollment_id:=old.enrollment_id;
    if new.status not in ('pending','submitted') then new.status:=old.status; end if;
  end if; return new; end $$;
create trigger t_guard_milestone before update on project_milestones for each row execute function guard_milestone();

-- notification triggers
create function notify_events() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if tg_table_name='submissions' then
    if tg_op='INSERT' then insert into notifications(user_id,title,body) select mentor_id,'New submission','A student submitted an assignment.' from enrollments where id=new.enrollment_id and mentor_id is not null;
    elsif new.status='graded' and old.status<>'graded' then insert into notifications(user_id,title,body) select student_id,'Assignment graded','Your assignment received feedback.' from enrollments where id=new.enrollment_id; end if;
  elsif tg_table_name='project_milestones' then
    if tg_op='INSERT' then insert into notifications(user_id,title,body) select student_id,'New project milestone',new.title from enrollments where id=new.enrollment_id;
    elsif new.status='evaluated' and old.status<>'evaluated' then insert into notifications(user_id,title,body) select student_id,'Milestone evaluated',new.title from enrollments where id=new.enrollment_id;
    elsif new.status='submitted' and old.status<>'submitted' then insert into notifications(user_id,title,body) select mentor_id,'Milestone submitted',new.title from enrollments where id=new.enrollment_id and mentor_id is not null; end if;
  elsif tg_table_name='assignments' then
    insert into notifications(user_id,title,body) select student_id,'New assignment',new.title||coalesce(' (due '||new.due_date||')','') from enrollments where course_id=new.course_id and status='active';
  end if; return new; end $$;
create trigger t_n_sub after insert or update on submissions for each row execute function notify_events();
create trigger t_n_ms after insert or update on project_milestones for each row execute function notify_events();
create trigger t_n_asg after insert on assignments for each row execute function notify_events();

-- RLS for new tables
do $$ declare t text; begin
 foreach t in array array['class_sessions','evaluations','quizzes','quiz_questions','quiz_keys','quiz_attempts','project_milestones'] loop execute format('alter table %I enable row level security', t); end loop; end $$;
create policy cs_sel on class_sessions for select using (is_admin() or can_view_course(course_id));
create policy cs_wr on class_sessions for all using (is_admin() or mentors_course(course_id)) with check (is_admin() or mentors_course(course_id));
create policy ev_sel on evaluations for select using (is_admin() or owns_enrollment(enrollment_id) or mentors_enrollment(enrollment_id));
create policy ev_wr on evaluations for all using (is_admin() or mentors_enrollment(enrollment_id)) with check (is_admin() or mentors_enrollment(enrollment_id));
create policy qz_sel on quizzes for select using (is_admin() or (status='published' and can_learn(course_id)));
create policy qz_all on quizzes for all using (is_admin()) with check (is_admin());
create policy qq_sel on quiz_questions for select using (is_admin() or exists(select 1 from quizzes z where z.id=quiz_id and z.status='published' and can_learn(z.course_id)));
create policy qq_all on quiz_questions for all using (is_admin()) with check (is_admin());
create policy qk_all on quiz_keys for all using (is_admin()) with check (is_admin());
create policy qa_sel on quiz_attempts for select using (is_admin() or owns_enrollment(enrollment_id) or mentors_enrollment(enrollment_id));
create policy pm_sel on project_milestones for select using (is_admin() or owns_enrollment(enrollment_id) or mentors_enrollment(enrollment_id));
create policy pm_men on project_milestones for all using (mentors_enrollment(enrollment_id)) with check (mentors_enrollment(enrollment_id));
create policy pm_adm on project_milestones for all using (is_admin()) with check (is_admin());
create policy pm_stu on project_milestones for update using (owns_active_enrollment(enrollment_id)) with check (owns_active_enrollment(enrollment_id));

-- reports (security_invoker: base-table RLS applies to the caller; the UI exposes them to admins only)
create view v_report_enrollments with (security_invoker=true) as
 select e.id, sp.full_name as student, c.title as course, mp.full_name as mentor, b.name as batch, e.status, e.created_at
 from enrollments e join profiles sp on sp.id=e.student_id join courses c on c.id=e.course_id left join profiles mp on mp.id=e.mentor_id left join batches b on b.id=e.batch_id;
create view v_report_completion with (security_invoker=true) as
 select e.id, sp.full_name as student, c.title as course, e.status, el.progress_pct, el.attendance_pct, el.assignment_avg, el.eligible
 from enrollments e join profiles sp on sp.id=e.student_id join courses c on c.id=e.course_id cross join lateral enrollment_eligibility(e.id) el;
create view v_report_mentor_workload with (security_invoker=true) as
 select p.full_name as mentor, count(e.id) filter (where e.status='active') as active_students, count(distinct e.course_id) as courses,
  (select count(*) from submissions s join enrollments e2 on e2.id=s.enrollment_id where e2.mentor_id=p.id and s.status='submitted') as pending_reviews
 from profiles p left join enrollments e on e.mentor_id=p.id where p.role='mentor' group by p.id, p.full_name;
create view v_report_attendance with (security_invoker=true) as
 select e.id, sp.full_name as student, c.title as course, count(a.id) as sessions, count(a.id) filter (where a.present) as present,
  case when count(a.id)=0 then null else round(100.0*count(a.id) filter (where a.present)/count(a.id),1) end as attendance_pct
 from enrollments e join profiles sp on sp.id=e.student_id join courses c on c.id=e.course_id left join attendance a on a.enrollment_id=e.id group by e.id, sp.full_name, c.title;
create view v_report_evaluations with (security_invoker=true) as
 select e.id, sp.full_name as student, c.title as course, count(v.id) as evaluations, round(avg(100.0*v.score/v.max_score),1) as avg_pct
 from enrollments e join profiles sp on sp.id=e.student_id join courses c on c.id=e.course_id left join evaluations v on v.enrollment_id=e.id group by e.id, sp.full_name, c.title;
create view v_report_certificates with (security_invoker=true) as
 select ce.verification_id, sp.full_name as student, c.title as course, ce.status, ce.issued_at
 from certificates ce join enrollments e on e.id=ce.enrollment_id join profiles sp on sp.id=e.student_id join courses c on c.id=e.course_id;

-- grant hardening: PUBLIC has EXECUTE on new functions by default, so revoke explicitly
revoke all on all tables in schema public from anon;
revoke execute on all functions in schema public from public, anon;
grant execute on all functions in schema public to authenticated;
grant execute on function verify_certificate(text) to anon;
