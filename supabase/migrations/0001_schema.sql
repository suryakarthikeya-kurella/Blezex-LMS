-- BlezeX Career Accelerator: schema + RLS
create type app_role as enum ('admin','mentor','student');

create table profiles(
  id uuid primary key references auth.users on delete cascade,
  full_name text not null, email text not null,
  role app_role not null default 'student',
  status text not null default 'active' check (status in ('active','suspended')),
  created_at timestamptz not null default now());
create table tracks(id uuid primary key default gen_random_uuid(), name text not null unique, description text);
create table courses(id uuid primary key default gen_random_uuid(), track_id uuid references tracks on delete set null,
  title text not null, slug text not null unique, description text,
  status text not null default 'draft' check (status in ('draft','published','archived')), created_at timestamptz not null default now());
create table modules(id uuid primary key default gen_random_uuid(), course_id uuid not null references courses on delete cascade, title text not null, position int not null default 1);
create table lessons(id uuid primary key default gen_random_uuid(), module_id uuid not null references modules on delete cascade,
  title text not null, content_html text not null default '', position int not null default 1,
  status text not null default 'draft' check (status in ('draft','published')));
create table batches(id uuid primary key default gen_random_uuid(), course_id uuid not null references courses on delete cascade, name text not null, start_date date, end_date date);
create table enrollments(id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles on delete restrict,
  course_id uuid not null references courses on delete restrict,
  mentor_id uuid references profiles on delete set null,
  batch_id uuid references batches on delete set null,
  status text not null default 'active' check (status in ('active','paused','revoked','completed')),
  granted_by uuid references profiles, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
-- no duplicate live enrollment per student+course; history (revoked) is preserved
create unique index one_live_enrollment on enrollments(student_id, course_id) where status in ('active','paused');
create index on enrollments(student_id); create index on enrollments(mentor_id); create index on enrollments(course_id);
create table lesson_progress(enrollment_id uuid references enrollments on delete cascade, lesson_id uuid references lessons on delete cascade,
  completed_at timestamptz not null default now(), primary key(enrollment_id, lesson_id));
create table assignments(id uuid primary key default gen_random_uuid(), course_id uuid not null references courses on delete cascade, title text not null, instructions text, due_date date);
create table submissions(id uuid primary key default gen_random_uuid(), assignment_id uuid not null references assignments on delete cascade,
  enrollment_id uuid not null references enrollments on delete cascade, text_response text, link_url text check (link_url is null or link_url ~* '^https?://'),
  status text not null default 'submitted' check (status in ('submitted','graded')), score numeric, feedback text, graded_by uuid references profiles,
  created_at timestamptz not null default now(), unique(assignment_id, enrollment_id));
create table attendance(id uuid primary key default gen_random_uuid(), enrollment_id uuid not null references enrollments on delete cascade,
  session_date date not null, present boolean not null, unique(enrollment_id, session_date));
create table certificates(id uuid primary key default gen_random_uuid(), enrollment_id uuid not null unique references enrollments on delete restrict,
  verification_id text not null unique default ('BLZX-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))),
  status text not null default 'issued' check (status in ('issued','revoked')), issued_at timestamptz not null default now());
create table notifications(id uuid primary key default gen_random_uuid(), user_id uuid not null references profiles on delete cascade,
  title text not null, body text, read boolean not null default false, created_at timestamptz not null default now());
create index on notifications(user_id);
create table audit_logs(id bigint generated always as identity primary key, actor_id uuid, action text not null, entity text, entity_id text, details jsonb, created_at timestamptz not null default now());

-- helpers (SECURITY DEFINER avoids RLS recursion)
create function is_admin() returns boolean language sql stable security definer set search_path=public as
$$ select exists(select 1 from profiles where id=auth.uid() and role='admin' and status='active') $$;
create function is_active_user() returns boolean language sql stable security definer set search_path=public as
$$ select exists(select 1 from profiles where id=auth.uid() and status='active') $$;
create function owns_enrollment(eid uuid) returns boolean language sql stable security definer set search_path=public as
$$ select is_active_user() and exists(select 1 from enrollments where id=eid and student_id=auth.uid()) $$;
create function owns_active_enrollment(eid uuid) returns boolean language sql stable security definer set search_path=public as
$$ select is_active_user() and exists(select 1 from enrollments where id=eid and student_id=auth.uid() and status='active') $$;
create function mentors_enrollment(eid uuid) returns boolean language sql stable security definer set search_path=public as
$$ select is_active_user() and exists(select 1 from enrollments where id=eid and mentor_id=auth.uid() and status in ('active','completed','paused')) $$;
create function can_view_course(cid uuid) returns boolean language sql stable security definer set search_path=public as
$$ select is_active_user() and exists(select 1 from enrollments e join courses c on c.id=e.course_id where e.course_id=cid and c.status='published'
   and e.status in ('active','paused','completed') and (e.student_id=auth.uid() or e.mentor_id=auth.uid())) $$;
create function can_learn(cid uuid) returns boolean language sql stable security definer set search_path=public as
$$ select is_active_user() and exists(select 1 from enrollments e join courses c on c.id=e.course_id where e.course_id=cid and c.status='published'
   and e.status in ('active','completed') and (e.student_id=auth.uid() or e.mentor_id=auth.uid())) $$;

-- triggers
create function guard_profile() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is not null and not is_admin() then new.role:=old.role; new.status:=old.status; new.email:=old.email; end if;
  return new; end $$;
create trigger t_guard_profile before update on profiles for each row execute function guard_profile();

create function guard_submission() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() and not mentors_enrollment(old.enrollment_id) then
    if old.status='graded' then raise exception 'Graded submissions cannot be changed'; end if;
    new.score:=old.score; new.feedback:=old.feedback; new.graded_by:=old.graded_by; new.status:=old.status;
    new.assignment_id:=old.assignment_id; new.enrollment_id:=old.enrollment_id;
  end if; return new; end $$;
create trigger t_guard_submission before update on submissions for each row execute function guard_submission();

create function audit_enrollment() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into audit_logs(actor_id,action,entity,entity_id,details) values(auth.uid(), tg_op||'_enrollment','enrollments',new.id::text,
    jsonb_build_object('student',new.student_id,'course',new.course_id,'status',new.status,'mentor',new.mentor_id,'batch',new.batch_id));
  new.updated_at:=now();
  if tg_op='INSERT' then insert into notifications(user_id,title,body) values(new.student_id,'New course access','An administrator granted you access to a new course.'); end if;
  return new; end $$;
create trigger t_audit_enr_i before insert on enrollments for each row execute function audit_enrollment();
create trigger t_audit_enr_u before update on enrollments for each row execute function audit_enrollment();
-- stamp granted_by
create function set_granted_by() returns trigger language plpgsql as $$ begin new.granted_by:=auth.uid(); return new; end $$;
create trigger t_granted before insert on enrollments for each row execute function set_granted_by();

-- public certificate verification: returns only minimal data
create function verify_certificate(vid text) returns table(student_name text, course_title text, issued_at timestamptz, status text)
language sql stable security definer set search_path=public as
$$ select p.full_name, c.title, ce.issued_at, ce.status from certificates ce join enrollments e on e.id=ce.enrollment_id
   join profiles p on p.id=e.student_id join courses c on c.id=e.course_id where ce.verification_id=vid $$;

-- RLS
do $$ declare t text; begin
 foreach t in array array['profiles','tracks','courses','modules','lessons','batches','enrollments','lesson_progress','assignments','submissions','attendance','certificates','notifications','audit_logs']
 loop execute format('alter table %I enable row level security', t); end loop; end $$;

create policy p_sel on profiles for select using (id=auth.uid() or is_admin()
  or exists(select 1 from enrollments e where (e.mentor_id=auth.uid() and e.student_id=profiles.id) or (e.student_id=auth.uid() and e.mentor_id=profiles.id)));
create policy p_upd_admin on profiles for update using (is_admin()) with check (is_admin());
create policy p_upd_self on profiles for update using (id=auth.uid()) with check (id=auth.uid());

create policy tr_sel on tracks for select using (is_active_user());
create policy tr_all on tracks for all using (is_admin()) with check (is_admin());
create policy c_sel on courses for select using (is_admin() or can_view_course(id));
create policy c_all on courses for all using (is_admin()) with check (is_admin());
create policy m_sel on modules for select using (is_admin() or can_learn(course_id));
create policy m_all on modules for all using (is_admin()) with check (is_admin());
create policy l_sel on lessons for select using (is_admin() or (status='published' and can_learn((select course_id from modules where id=module_id))));
create policy l_all on lessons for all using (is_admin()) with check (is_admin());
create policy b_sel on batches for select using (is_admin() or can_view_course(course_id));
create policy b_all on batches for all using (is_admin()) with check (is_admin());
create policy e_sel on enrollments for select using (is_admin() or (is_active_user() and (student_id=auth.uid() or mentor_id=auth.uid())));
create policy e_all on enrollments for all using (is_admin()) with check (is_admin());
create policy lp_sel on lesson_progress for select using (is_admin() or owns_enrollment(enrollment_id) or mentors_enrollment(enrollment_id));
create policy lp_ins on lesson_progress for insert with check (owns_active_enrollment(enrollment_id));
create policy lp_del on lesson_progress for delete using (owns_active_enrollment(enrollment_id));
create policy a_sel on assignments for select using (is_admin() or can_learn(course_id));
create policy a_all on assignments for all using (is_admin()) with check (is_admin());
create policy s_sel on submissions for select using (is_admin() or owns_enrollment(enrollment_id) or mentors_enrollment(enrollment_id));
create policy s_ins on submissions for insert with check (owns_active_enrollment(enrollment_id) and status='submitted' and score is null);
create policy s_upd_stu on submissions for update using (owns_active_enrollment(enrollment_id)) with check (owns_active_enrollment(enrollment_id));
create policy s_upd_men on submissions for update using (mentors_enrollment(enrollment_id)) with check (mentors_enrollment(enrollment_id));
create policy s_all_admin on submissions for all using (is_admin()) with check (is_admin());
create policy at_sel on attendance for select using (is_admin() or owns_enrollment(enrollment_id) or mentors_enrollment(enrollment_id));
create policy at_men on attendance for all using (mentors_enrollment(enrollment_id)) with check (mentors_enrollment(enrollment_id));
create policy at_adm on attendance for all using (is_admin()) with check (is_admin());
create policy ce_sel on certificates for select using (is_admin() or owns_enrollment(enrollment_id));
create policy ce_all on certificates for all using (is_admin()) with check (is_admin());
create policy n_sel on notifications for select using (user_id=auth.uid() or is_admin());
create policy n_upd on notifications for update using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy n_ins on notifications for insert with check (is_admin());
create policy al_sel on audit_logs for select using (is_admin());

-- grants: anon gets nothing except certificate verification
revoke all on all tables in schema public from anon;
revoke all on all functions in schema public from anon;
grant execute on function verify_certificate(text) to anon, authenticated;
