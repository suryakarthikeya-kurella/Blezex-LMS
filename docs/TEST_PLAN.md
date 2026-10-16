Automated (all executed, see results in the audit report):
- `npm run typecheck` — strict TypeScript
- `npm test` — vitest (36): sanitizer, schemas, formatting helpers (incl. local-date), report cell formatting, UI primitives, migration hygiene, security headers, secrets hygiene
- `npm run test:db` — spins up a throwaway local PostgreSQL, applies every migration, runs `supabase/tests/rls_tests.sql` (authorization) and `supabase/tests/integrity_tests.sql` (audit trail, transitions, atomic RPCs, score ranges, attendance, mentor/student write limits, suspended users). Needs PostgreSQL server binaries (initdb/pg_ctl/psql). Never touches Supabase.
- `npm run test:all` — all of the above
- `npm run build` — production build

Not automated yet: end-to-end browser tests against a real Supabase project (see manual smoke test), the Edge Function (Deno), load/performance tests.

Manual smoke test (run on a staging Supabase project after applying migrations):
1. Admin: create mentor + student → student logs in, is forced to set a new password.
2. Admin: grant 2 courses to the student with different mentors; student sees both, nothing else.
3. Revoke one course: the other still works; the revoked course URL shows "Access revoked".
4. Student: complete lessons, take a quiz, submit an assignment + milestone; see mentor evaluations on the course page.
5. Mentor: grade, mark attendance for two same-day sessions, add evaluation; another mentor's student is invisible.
6. Admin: Complete + certify (blocked until rules met), open /verify/<id> logged out, revoke the enrollment (certificate shows REVOKED), check Reports and Audit Log (suspend/certificate events present).
7. Suspend the student → sign-in shows the suspended notice. Test mobile width and keyboard navigation (drawer, tabs, dialogs).
