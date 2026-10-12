Source of truth: `supabase/migrations/0001_schema.sql` (core) and `0002_features.sql` (quizzes, milestones, sessions, evaluations, completion rules, alumni, notification triggers, report views, grant hardening). Run both in order, then `seed.sql`.
Deletion/archival: enrollments reference profiles/courses with RESTRICT (history preserved); revoke instead of delete; courses can be `archived`; children of a deleted course/quiz cascade.
Scores are on a 0–100 scale for assignments; evaluations use their own `max_score`.
Report views (security_invoker): v_report_enrollments, _completion, _mentor_workload, _attendance, _evaluations, _certificates.
