Legend: [x] verified by an executed check · [~] implemented, check written but NOT executed · [ ] open
- [x] Lesson HTML sanitizer (script, handlers, javascript: URLs, iframe allowlist) — 7 vitest tests passed
- [x] Input schemas (no admin creation from UI, password confirm, link scheme) — 4 vitest tests passed
- [~] RLS on every table, anon revoked, PUBLIC execute revoked — `supabase/tests/rls_tests.sql` (not executed here; run on a dev project)
- [~] Role escalation blocked by trigger; self-grading blocked by trigger; answer keys in admin-only table
- [~] Edge Function checks caller JWT + active admin; service key never in the browser
- [~] Suspended users lose all data access (is_active_user in every helper)
- [ ] Turn OFF public signups in Supabase dashboard (manual)
- [ ] Known limit: must_change_password can be cleared by the user without changing the password (UX gate, not a security boundary)
- [ ] No rate limiting beyond Supabase Auth defaults
