# BlezeX Career Accelerator Portal
React + Vite + TypeScript (strict) + Tailwind + Supabase (Postgres, Auth, RLS, Edge Function). No file uploads / Storage.

## Run locally
1. Install Node 18+ and VS Code. Open this folder, then `npm install`.
2. Create a free project at supabase.com. Copy `.env.example` to `.env` and fill `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings > API).
3. Database: SQL Editor > run `supabase/migrations/0001_schema.sql`, then `0002_features.sql`, then `0003_integrity_hardening.sql`, then `supabase/seed.sql` (5 courses + sample lesson).
4. Auth: Authentication > Providers > Email: keep enabled, **turn OFF "Allow new users to sign up"**. Authentication > URL Configuration: add `http://localhost:5173` (and your Netlify URL).
5. First admin: follow `supabase/create_first_admin.sql`.
6. Edge function (needed for creating students/mentors):
   `npm i -g supabase` · `supabase login` · `supabase link --project-ref YOUR_REF` · `supabase functions deploy admin-create-user`
   (SUPABASE_URL and SERVICE_ROLE key are injected automatically; never put the service key in `.env`.)
7. `npm run dev` → http://localhost:5173

## Flow
Admin: People → create student/mentor · Courses → add content, publish · Course Access → pick a student, tick courses, set mentor/batch, Grant.
Mentor: sees only assigned enrollments, marks attendance, grades. Student: sees only granted courses, learns, submits text/links.

## Deploy (Netlify)
Push to GitHub → Netlify "Import project" → build `npm run build`, publish `dist`, set the two env vars. `public/_redirects` handles SPA routing.

## Free-tier note
Supabase free projects pause after inactivity and have DB/bandwidth/user caps; Netlify free has build/bandwidth caps. Check current quotas before launch.

## Checks
`npm run typecheck` · `npm test` · `npm run build` · `npm run test:db` (applies every migration to a throwaway local PostgreSQL and runs the RLS + integrity SQL suites; needs PostgreSQL server binaries) · `npm run test:all`. Existing projects: back up, then apply `0003_integrity_hardening.sql` (additive; existing rows are not rewritten).

## Added since v1
Quizzes, project milestones, sessions + attendance, evaluations, completion rules + certificate eligibility, alumni, notifications, reports, audit log, password reset/first-login flow, profile page, pagination/sorting.
