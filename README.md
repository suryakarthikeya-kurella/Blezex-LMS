# BlezeX Career Accelerator Portal
React + Vite + TypeScript (strict) + Tailwind + Supabase (Postgres, Auth, RLS, Edge Function). No file uploads / Storage.

## Run locally
1. Install Node 18+ and VS Code. Open this folder, then `npm install`.
2. Create a free project at supabase.com. Copy `.env.example` to `.env` and fill `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings > API).
3. Database: SQL Editor > run `supabase/migrations/0001_schema.sql`, then `0002_features.sql`, then `supabase/seed.sql` (5 courses + sample lesson), and finally migrations `0003_integrity_hardening.sql`, then `0004_student_learning_profile_and_content.sql` through `0007_lesson_practice_and_module_flow.sql` in numeric order. These add the student profile fields, Full Stack curriculum and lesson quizzes, and lesson-linked practice assignments. Existing databases must also apply migrations 0004–0007 (0003 is the integrity hardening migration) for the new student course screens to have their content and activities. **If Full Stack Web Development shows only “Welcome to Full Stack” or one lesson, the curriculum migration has not reached that database yet:** run `0005_full_stack_foundations_curriculum.sql` in Supabase SQL Editor (after 0004), then apply 0006 and 0007.
4. Auth: Authentication > Providers > Email: keep enabled, **turn OFF "Allow new users to sign up"**. Authentication > URL Configuration: add `http://localhost:5173` (and your Netlify URL).
5. First admin: follow `supabase/create_first_admin.sql`.
6. Edge function (needed for creating students/mentors):
   `npm i -g supabase` · `supabase login` · `supabase link --project-ref YOUR_REF` · `supabase functions deploy admin-create-user`
   (SUPABASE_URL and SERVICE_ROLE key are injected automatically; never put the service key in `.env`.)
7. `npm run dev` → http://localhost:5173

## Flow
Admin: People → create student/mentor · Courses → add content, publish · Course Access → pick a student, tick courses, set mentor/batch, Grant.
Mentor: sees only assigned enrollments, marks attendance, grades. Student: sees only granted courses, completes modules in order, takes lesson quizzes, reviews project milestones, and submits lesson practice as text or links.

To verify the Full Stack curriculum was seeded, run this in the Supabase SQL Editor; it should return the course modules with their published lesson counts:

```sql
select m.title, count(l.id) as published_lessons
from courses c
join modules m on m.course_id = c.id
left join lessons l on l.module_id = m.id and l.status = 'published'
where c.slug = 'full-stack-web'
group by m.id, m.title, m.position
order by m.position;
```

## Deploy (Netlify)
Push to GitHub → Netlify "Import project" → build `npm run build`, publish `dist`, set the two env vars. `public/_redirects` handles SPA routing.

## Free-tier note
Supabase free projects pause after inactivity and have DB/bandwidth/user caps; Netlify free has build/bandwidth caps. Check current quotas before launch.

## Checks
`npm run typecheck` · `npm test` · `npm run build` · `npm run test:db` (applies every migration to a throwaway local PostgreSQL and runs the RLS + integrity SQL suites; needs PostgreSQL server binaries) · `npm run test:all`. Existing projects: back up, then apply `0003_integrity_hardening.sql` (additive; existing rows are not rewritten).

## Added since v1
Quizzes, project milestones, sessions + attendance, evaluations, completion rules + certificate eligibility, alumni, notifications, reports, audit log, password reset/first-login flow, profile page, pagination/sorting.
