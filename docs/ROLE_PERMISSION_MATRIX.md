| Resource | Admin | Mentor | Student |
|---|---|---|---|
| Profiles | all; create via Edge Function; suspend | assigned students (read) | self (name/password), own mentors (read) |
| Courses/modules/lessons | CRUD, publish | read if assigned & published | read if enrolled (active/completed) & published |
| Quizzes / questions | CRUD | read | read published; **no answer keys**; scored by RPC |
| Quiz attempts | read | read assigned | read own; create only via `submit_quiz` |
| Enrollments | CRUD | read assigned | read own |
| Progress | read | read assigned | write own while active |
| Submissions | all | read + grade assigned | create/edit own until graded; cannot set score |
| Project milestones | all | create/evaluate assigned | submit link/notes while not evaluated |
| Sessions | CRUD | create/edit for own courses | read |
| Attendance | all | write assigned | read own |
| Evaluations | all | write assigned | read own |
| Certificates | issue (eligibility enforced) / revoke | – | read own; public verify by ID |
| Notifications | create | own | own |
| Audit log, reports | read | – | – |
