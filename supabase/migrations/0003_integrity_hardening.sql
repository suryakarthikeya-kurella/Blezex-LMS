-- 0003: integrity + security hardening (additive; no existing rows are rewritten).
-- Fixes: missing audit trail, unstable lesson/question order, non-atomic certification, unguarded status transitions,
-- unconstrained scores, same-day attendance overwrite, mentor edits to student work, suspended-user RPC access,
-- cross-course progress rows, editable notification text, unpinned search_path, missing indexes.

-- 1. Deterministic ordering: the server assigns the next position (clients no longer send 99).
create function next_position() returns trigger language plpgsql as $$
declare n int;
begin
  if tg_table_name = 'lessons' then select coalesce(max(position),0)+1 into n from lessons where module_id = new.module_id;
  elsif tg_table_name = 'modules' then select coalesce(max(position),0)+1 into n from modules where course_id = new.course_id;
  else select coalesce(max(position),0)+1 into n from quiz_questions where quiz_id = new.quiz_id; end if;
  new.position := n; return new; end $$;
create trigger t_pos_lessons before insert on lessons for each row execute function next_position();
create trigger t_pos_modules before insert on modules for each row execute function next_position();
create trigger t_pos_questions before insert on quiz_questions for each row execute function next_position();

-- 2. Audit trail written by the database (RLS gives clients no INSERT on audit_logs).
create function audit_profile_status() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into audit_logs(actor_id,action,entity,entity_id,details)
  values(auth.uid(), 'set_status_'||new.status, 'profiles', new.id::text, jsonb_build_object('from',old.status,'to',new.status));
  return new; end $$;
create trigger t_audit_profile_status after update of status on profiles for each row
  when (old.status is distinct from new.status) execute function audit_profile_status();

create function audit_certificate() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if tg_op = 'INSERT' then
    insert into audit_logs(actor_id,action,entity,entity_id,details)
    values(auth.uid(),'issue_certificate','certificates',new.id::text,jsonb_build_object('enrollment',new.enrollment_id,'verification_id',new.verification_id));
  elsif new.status is distinct from old.status then
    insert into audit_logs(actor_id,action,entity,entity_id,details)
    values(auth.uid(),'certificate_'||new.status,'certificates',new.id::text,jsonb_build_object('enrollment',new.enrollment_id,'verification_id',new.verification_id));
  end if; return new; end $$;
create trigger t_audit_cert after insert or update on certificates for each row execute function audit_certificate();

create function audit_course_status() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into audit_logs(actor_id,action,entity,entity_id,details)
  values(auth.uid(),'course_'||new.status,'courses',new.id::text,jsonb_build_object('from',old.status,'to',new.status,'title',new.title));
  return new; end $$;
create trigger t_audit_course_status after update of status on courses for each row
  when (old.status is distinct from new.status) execute function audit_course_status();

-- 3. Enrollment lifecycle: only valid transitions; revoking an enrollment revokes its certificate.
create function guard_enrollment_status() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if new.status is distinct from old.status and not (
       (old.status = 'active'    and new.status in ('paused','revoked','completed'))
    or (old.status = 'paused'    and new.status in ('active','revoked','completed'))
    or (old.status = 'completed' and new.status = 'revoked')) then
    raise exception 'Invalid enrollment status change: % -> %', old.status, new.status; end if;
  return new; end $$;
create trigger t_a_guard_status before update on enrollments for each row execute function guard_enrollment_status();

create function enrollment_revoke_cert() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin update certificates set status = 'revoked' where enrollment_id = new.id and status = 'issued'; return new; end $$;
create trigger t_enr_revoke_cert after update of status on enrollments for each row
  when (new.status = 'revoked' and old.status is distinct from 'revoked') execute function enrollment_revoke_cert();

-- 4. Atomic admin operations.
create function complete_enrollment(eid uuid) returns text language plpgsql security definer set search_path = public, pg_temp as $$
declare e enrollments; el record; vid text;
begin
  if not is_admin() then raise exception 'Only admins can complete enrollments'; end if;
  select * into e from enrollments where id = eid for update;
  if not found then raise exception 'Enrollment not found'; end if;
  if e.status not in ('active','paused') then raise exception 'Only active or paused enrollments can be completed'; end if;
  if exists(select 1 from certificates where enrollment_id = eid) then raise exception 'A certificate already exists for this enrollment'; end if;
  select * into el from enrollment_eligibility(eid);
  if not coalesce(el.eligible, false) then raise exception 'Enrollment does not meet completion requirements'; end if;
  insert into certificates(enrollment_id) values (eid) returning verification_id into vid;
  update enrollments set status = 'completed' where id = eid;
  return vid; end $$;

create function add_quiz_question(qid uuid, p_prompt text, p_options jsonb, p_correct int) returns uuid
language plpgsql security definer set search_path = public, pg_temp as $$
declare v uuid;
begin
  if not is_admin() then raise exception 'Only admins can edit quizzes'; end if;
  if not exists(select 1 from quizzes where id = qid) then raise exception 'Quiz not found'; end if;
  if coalesce(btrim(p_prompt),'') = '' then raise exception 'Question text is required'; end if;
  if p_options is null or jsonb_typeof(p_options) <> 'array' or jsonb_array_length(p_options) < 2 then raise exception 'A question needs at least 2 options'; end if;
  if p_correct is null or p_correct < 0 or p_correct >= jsonb_array_length(p_options) then raise exception 'Correct option is out of range'; end if;
  insert into quiz_questions(quiz_id,prompt,options) values (qid, btrim(p_prompt), p_options) returning id into v;
  insert into quiz_keys(question_id,correct_index) values (v, p_correct);
  return v; end $$;

-- 5. Score ranges (NOT VALID: enforced for new/changed rows, existing rows are left untouched).
alter table submissions add constraint submissions_score_range check (score is null or (score >= 0 and score <= 100)) not valid;
alter table project_milestones add constraint milestones_score_range check (score is null or (score >= 0 and score <= 100)) not valid;

-- 6. Eligibility: attendance counts as "not applicable" only when the course has no sessions; suspended users get nothing.
create or replace function enrollment_eligibility(eid uuid)
returns table(progress_pct numeric, attendance_pct numeric, assignment_avg numeric, assignments_graded int, assignments_total int, eligible boolean)
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare e enrollments; c courses; tl int; dl int; an int; ap int; ns int; av numeric; ta int; ga int; pr numeric; at_ numeric;
begin
  if not is_active_user() then return; end if;
  select * into e from enrollments where id=eid and (is_admin() or student_id=auth.uid() or mentor_id=auth.uid());
  if not found then return; end if;
  select * into c from courses where id=e.course_id;
  select count(*) into tl from lessons l join modules m on m.id=l.module_id where m.course_id=e.course_id and l.status='published';
  select count(*) into dl from lesson_progress lp join lessons l on l.id=lp.lesson_id where lp.enrollment_id=eid and l.status='published';
  select count(*), count(*) filter (where present) into an, ap from attendance where enrollment_id=eid;
  select count(*) into ns from class_sessions where course_id=e.course_id and (batch_id is null or batch_id is not distinct from e.batch_id);
  select coalesce(avg(score),0), count(*) into av, ga from submissions where enrollment_id=eid and status='graded';
  select count(*) into ta from assignments where course_id=e.course_id;
  pr := case when tl=0 then 0 else least(100, round(100.0*dl/tl,1)) end;
  at_ := case when an=0 then (case when ns=0 then 100 else 0 end) else round(100.0*ap/an,1) end;
  return query select pr, at_, round(av,1), ga, ta,
    (pr>=c.min_progress_pct and at_>=c.min_attendance_pct and (ta=0 or (ga>=ta and av>=c.min_assignment_avg)));
end $$;

-- 7. Quiz attempts: suspended users are blocked and concurrent attempts are serialised per enrollment.
create or replace function submit_quiz(qid uuid, eid uuid, answers jsonb) returns table(score_pct numeric, passed boolean, attempts_used int, attempts_max int)
language plpgsql security definer set search_path = public, pg_temp as $$
declare q quizzes; e enrollments; total int; right_ int; used int; pct numeric; ok boolean;
begin
  if not is_active_user() then raise exception 'Account is not active'; end if;
  select * into e from enrollments where id=eid and student_id=auth.uid() and status='active' for update;
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

-- 8. Submissions: mentors may grade but not rewrite the student's work.
create or replace function guard_submission() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if is_admin() then return new; end if;
  if mentors_enrollment(old.enrollment_id) then
    new.text_response := old.text_response; new.link_url := old.link_url; new.assignment_id := old.assignment_id; new.enrollment_id := old.enrollment_id;
    return new; end if;
  if old.status = 'graded' then raise exception 'Graded submissions cannot be changed'; end if;
  new.score := old.score; new.feedback := old.feedback; new.graded_by := old.graded_by; new.status := old.status;
  new.assignment_id := old.assignment_id; new.enrollment_id := old.enrollment_id;
  return new; end $$;

-- 9. Progress rows must reference a published lesson of the enrollment's own course.
create function lesson_in_enrollment(eid uuid, lid uuid) returns boolean language sql stable security definer set search_path = public, pg_temp as
$$ select exists(select 1 from lessons l join modules m on m.id = l.module_id join enrollments e on e.course_id = m.course_id
                 where l.id = lid and e.id = eid and l.status = 'published') $$;
drop policy lp_ins on lesson_progress;
create policy lp_ins on lesson_progress for insert with check (owns_active_enrollment(enrollment_id) and lesson_in_enrollment(enrollment_id, lesson_id));

-- 10. Attendance is per session (two sessions on one day no longer overwrite each other); sessions must use their own course's batch.
alter table attendance drop constraint if exists attendance_enrollment_id_session_date_key;
alter table attendance add constraint attendance_enrollment_session_key unique (enrollment_id, session_id);
create unique index attendance_legacy_day_key on attendance(enrollment_id, session_date) where session_id is null;
create function validate_session() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if new.batch_id is not null and not exists(select 1 from batches where id = new.batch_id and course_id = new.course_id) then
    raise exception 'batch does not belong to this course'; end if;
  return new; end $$;
create trigger t_validate_session before insert or update on class_sessions for each row execute function validate_session();

-- 11. Notifications: users may only flip "read"; suspended users cannot edit their profile.
create function guard_notification() returns trigger language plpgsql as $$
begin
  if auth.uid() is not null and not is_admin() then
    new.user_id := old.user_id; new.title := old.title; new.body := old.body; new.created_at := old.created_at; end if;
  return new; end $$;
create trigger t_guard_notification before update on notifications for each row execute function guard_notification();
drop policy p_upd_self on profiles;
create policy p_upd_self on profiles for update using (id = auth.uid() and is_active_user()) with check (id = auth.uid());

-- 12. Indexes for the hot paths (pending reviews, audit log, sessions, notifications, content trees).
create index if not exists audit_logs_created_at_idx on audit_logs(created_at desc);
create index if not exists submissions_enrollment_idx on submissions(enrollment_id);
create index if not exists submissions_pending_idx on submissions(created_at) where status = 'submitted';
create index if not exists class_sessions_course_idx on class_sessions(course_id, session_date desc);
create index if not exists notifications_user_created_idx on notifications(user_id, created_at desc);
create index if not exists modules_course_idx on modules(course_id);
create index if not exists lessons_module_idx on lessons(module_id);
create index if not exists assignments_course_idx on assignments(course_id);
create index if not exists attendance_session_idx on attendance(session_id);
create index if not exists milestones_enrollment_idx on project_milestones(enrollment_id);
create index if not exists evaluations_enrollment_idx on evaluations(enrollment_id);

-- 13. Pin search_path (incl. pg_temp last) on every SECURITY DEFINER function.
do $$ declare r record; begin
  for r in select p.oid::regprocedure as sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.prosecdef loop
    execute format('alter function %s set search_path = public, pg_temp', r.sig); end loop; end $$;

-- 14. Grants (new functions default to PUBLIC execute, so repeat the lock-down).
revoke execute on all functions in schema public from public, anon;
grant execute on all functions in schema public to authenticated;
grant execute on function verify_certificate(text) to anon;
