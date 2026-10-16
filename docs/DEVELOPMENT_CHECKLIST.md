Legend: [x] implemented AND verified by an executed check · [~] implemented, not yet verified against a live Supabase · [ ] not done · [?] needs business decision
## Executed checks
- [x] `tsc --noEmit` strict · [x] `vite build` · [x] 11 vitest tests (sanitizer, schemas)
## Features (all [~] until you run supabase/tests/rls_tests.sql and the manual smoke test in TEST_PLAN.md)
- [~] M3 schema/RLS/grants/audit/notifications · [~] M4 login, logout, session restore, reset email + set-password page, first-login password change, role guards, suspend/reactivate, no public signup (dashboard setting)
- [~] M5 admin dashboard, people (search/filter/sort/paginate), courses/tracks/batches, audit log viewer
- [~] M6 multi-course access, per-enrollment mentor/batch (editable), pause/reactivate/revoke, duplicate prevention, validation triggers
- [~] M7 course/module/lesson editor, sanitized HTML + SVG + allowlisted embeds, draft/publish, lesson viewer, prev/next, per-enrollment progress, continue learning
- [~] M8 quizzes (keys protected, attempts, threshold), assignments (text+link), grading, project milestones + evaluation
- [~] M9 mentor dashboard (filters, pending count, attendance by session, grading, evaluations, notifications)
- [~] M10 student dashboard (progress, deadlines, quizzes, attendance, feedback, milestones, notifications, certificates, profile, empty/loading/error states)
- [~] M11 sessions, attendance (unique per day), evaluations, explicit completion rules, admin-approved certificates, verification page, revoke, alumni flag
- [~] M12 in-portal notifications (access, assignments, grading, milestones, certificates, mentor assignment) + 6 admin reports
- [~] M13 responsive header, skip link, aria labels (not audited with a screen reader / contrast tool)
- [?] Logo/mascot assets (not supplied) · [?] email templates in Supabase for recovery
## Not done
- [ ] End-to-end browser tests (Playwright) · [ ] M15 deployment (excluded by request)
- [ ] Rich WYSIWYG editor (HTML textarea + live sanitized preview instead)
## Audit remediation (migration 0003 + UI)
- [x] DB integrity/security hardening (0003) — executed locally: 2 SQL suites pass; integrity suite fails without 0003
- [x] Student panel on the shared shell/kit; Admin/Mentor/Student share typography, dialogs, toasts, badges
- [x] Route-level code splitting, parallel student dashboard queries, lazy lesson bodies, dashboard query caching
- [x] Accessibility: drawer not focusable when closed, Esc closes drawer, WAI-ARIA report tabs, labelled inputs, th scope, AA-contrast brand text/buttons (`brand-dark`)
- [ ] Supabase generated types (needs the CLI against a database), lesson/assignment/batch editing UI, self-hosted fonts, server-side `must_change_password` enforcement
