Automated (run): `npm run typecheck`, `npm test` (vitest: sanitizer + schemas), `npm run build`.
Automated (written, not run): `supabase/tests/rls_tests.sql` (authorization, role escalation, revoked/suspended users, answer-key privacy, self-grading, duplicate enrollment, anon access).
Manual smoke test (do after setup):
1. Admin: create mentor + student → student logs in, is forced to set a new password.
2. Admin: grant 2 courses to the student with different mentors; student sees both, nothing else. Add a 6th course: student does NOT see it.
3. Revoke one course: the other still works; student cannot open the revoked course URL.
4. Student: complete lessons, take a quiz (wrong answers shown only as score), submit an assignment + milestone.
5. Mentor: grade, mark attendance for a session, add evaluation; confirm another mentor's student is invisible.
6. Admin: Complete + certify (blocked until rules met), open /verify/<id> logged out, revoke cert, check Reports and Audit Log.
7. Suspend the student → login fails. Test mobile width and keyboard navigation.
