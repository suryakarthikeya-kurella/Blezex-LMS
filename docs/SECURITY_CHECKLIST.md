Legend: [x] verified by an executed check · [~] implemented, not verified against a live Supabase project · [ ] open
Executed checks run on a throwaway local PostgreSQL 16 with a Supabase-compatible auth shim (`npm run test:db`). They prove the SQL (RLS, triggers, RPCs); they do NOT prove the hosted project's settings.

## Verified (executed)
- [x] RLS on every table, anon has no table access, role escalation / self-grading / answer-key privacy / suspended-user visibility — `supabase/tests/rls_tests.sql` (ALL RLS TESTS PASSED)
- [x] Audit trail written by DB triggers (profile suspend/reactivate, certificate issue/revoke, course publish/unpublish); clients cannot insert into `audit_logs`
- [x] Enrollment status transitions enforced; revoking an enrollment revokes its certificate
- [x] Certification is one atomic admin-only RPC (`complete_enrollment`) that re-checks eligibility
- [x] Score ranges, per-session attendance, mentors cannot rewrite student submissions, progress rows must belong to the enrollment's course, notification text immutable, suspended users blocked from quiz/eligibility RPCs and profile edits, all SECURITY DEFINER functions pin `search_path` — `supabase/tests/integrity_tests.sql` (ALL INTEGRITY TESTS PASSED; confirmed to FAIL without migration 0003)
- [x] Lesson HTML sanitizer, input schemas, security-header config, secrets hygiene — vitest (36 tests)

## Implemented, needs a check on the hosted project
- [~] Edge Function `admin-create-user` (caller JWT + active admin; emails lower-cased; length limits) — not deployed or run here
- [~] `netlify.toml` CSP/security headers — verified against the production build locally (no violations); confirm on the deployed site and adjust `connect-src` if you use a custom Supabase domain
- [ ] Turn OFF public signups in the Supabase dashboard (manual) and confirm the password policy
- [ ] Apply migration 0003 to the hosted project (`supabase db push`) after backing up; optionally run `supabase/maintenance/renumber_positions.sql` once

## Known limits
- `must_change_password` can still be cleared by the user without changing the password (UX gate, not a security boundary; needs an Auth hook to enforce)
- No rate limiting beyond Supabase Auth defaults; `verify_certificate` is public (48-bit IDs make enumeration impractical)
- Changing the password does not require the current password (Supabase "secure password change" setting)
