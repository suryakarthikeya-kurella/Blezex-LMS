-- 0008_code_lab.sql: BlezeX Code Lab tables, constraints, indexes and RLS policies
-- 1. Code Projects (Student workspaces and scratchpads)
create table if not exists code_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text,
  language text not null, -- 'python', 'javascript', 'typescript', 'web', 'sql', 'cpp', 'java', etc.
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Code Project Files (Multi-file support)
create table if not exists code_project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references code_projects(id) on delete cascade,
  name text not null, -- e.g. 'main.py', 'index.html', 'styles.css'
  content text not null default '',
  is_entry_point boolean not null default false,
  position int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, name)
);

-- 3. Lesson-Linked Coding Exercises & Assessments
create table if not exists coding_exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  instructions text not null,
  language text not null,
  starter_code text not null default '',
  solution_code text, -- Reference solution (admin/mentor only)
  test_cases jsonb not null default '[]', -- Array of { id, input, expected_output, is_hidden, explanation }
  hints jsonb not null default '[]', -- Array of string hints
  time_limit_sec numeric not null default 5.0,
  created_at timestamptz not null default now()
);

-- 4. Student Coding Submissions & Test Results
create table if not exists coding_exercise_submissions (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references coding_exercises(id) on delete cascade,
  enrollment_id uuid not null references enrollments(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  submitted_code text not null,
  tests_passed int not null default 0,
  tests_total int not null default 0,
  status text not null check (status in ('passed', 'failed', 'error')),
  runtime_ms numeric,
  error_output text,
  created_at timestamptz not null default now()
);

-- Indexes for hot paths
create index if not exists code_projects_user_idx on code_projects(user_id, updated_at desc);
create index if not exists code_project_files_proj_idx on code_project_files(project_id, position);
create index if not exists coding_exercises_lesson_idx on coding_exercises(lesson_id);
create index if not exists coding_exercises_course_idx on coding_exercises(course_id);
create index if not exists coding_submissions_enrollment_idx on coding_exercise_submissions(enrollment_id, exercise_id);
create index if not exists coding_submissions_student_idx on coding_exercise_submissions(student_id, created_at desc);

-- RLS setup
alter table code_projects enable row level security;
alter table code_project_files enable row level security;
alter table coding_exercises enable row level security;
alter table coding_exercise_submissions enable row level security;

-- Policies for code_projects
create policy cp_select on code_projects for select using (
  user_id = auth.uid() or is_public = true or is_admin()
);
create policy cp_insert on code_projects for insert with check (
  user_id = auth.uid() and is_active_user()
);
create policy cp_update on code_projects for update using (
  user_id = auth.uid() and is_active_user()
) with check (
  user_id = auth.uid()
);
create policy cp_delete on code_projects for delete using (
  user_id = auth.uid() or is_admin()
);

-- Policies for code_project_files
create policy cpf_select on code_project_files for select using (
  exists (select 1 from code_projects p where p.id = project_id and (p.user_id = auth.uid() or p.is_public = true or is_admin()))
);
create policy cpf_insert on code_project_files for insert with check (
  exists (select 1 from code_projects p where p.id = project_id and p.user_id = auth.uid() and is_active_user())
);
create policy cpf_update on code_project_files for update using (
  exists (select 1 from code_projects p where p.id = project_id and p.user_id = auth.uid() and is_active_user())
) with check (
  exists (select 1 from code_projects p where p.id = project_id and p.user_id = auth.uid())
);
create policy cpf_delete on code_project_files for delete using (
  exists (select 1 from code_projects p where p.id = project_id and (p.user_id = auth.uid() or is_admin()))
);

-- Policies for coding_exercises
create policy ce_select on coding_exercises for select using (is_active_user());
create policy ce_admin on coding_exercises for all using (is_admin()) with check (is_admin());

-- Policies for coding_exercise_submissions
create policy ces_select on coding_exercise_submissions for select using (
  student_id = auth.uid() or is_admin() or mentors_enrollment(enrollment_id)
);
create policy ces_insert on coding_exercise_submissions for insert with check (
  student_id = auth.uid() and owns_active_enrollment(enrollment_id)
);
