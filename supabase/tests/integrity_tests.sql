-- Integrity / hardening tests for migration 0003. Runs on a DEV/TEST database only; everything is rolled back.
-- Success = "ALL INTEGRITY TESTS PASSED" notice. Any failure raises an exception naming the broken rule.
begin;
create function pg_temp.ok(c boolean, m text) returns void language plpgsql as $$ begin if not coalesce(c,false) then raise exception 'FAILED: %', m; end if; end $$;
create function pg_temp.as_user(u uuid) returns void language plpgsql as $$ begin
  perform set_config('request.jwt.claims', json_build_object('sub',u,'role','authenticated')::text, true); set local role authenticated; end $$;
create function pg_temp.as_root() returns void language plpgsql as $$ begin perform set_config('request.jwt.claims','',true); execute 'reset role'; end $$;
-- the statement MUST raise; otherwise the rule is broken
create function pg_temp.fails(q text, m text) returns void language plpgsql as $$
declare raised boolean := false;
begin begin execute q; exception when others then raised := true; end;
  if not raised then raise exception 'FAILED: %', m; end if; end $$;

-- fixtures: a1 admin, b1/b2 mentors, c1/c2 students
insert into auth.users(id,email) values
 ('00000000-0000-0000-0000-0000000000a1','a@t.test'),('00000000-0000-0000-0000-0000000000b1','m1@t.test'),('00000000-0000-0000-0000-0000000000b2','m2@t.test'),
 ('00000000-0000-0000-0000-0000000000c1','s1@t.test'),('00000000-0000-0000-0000-0000000000c2','s2@t.test');
insert into profiles(id,full_name,email,role) values
 ('00000000-0000-0000-0000-0000000000a1','A','a@t.test','admin'),('00000000-0000-0000-0000-0000000000b1','M1','m1@t.test','mentor'),('00000000-0000-0000-0000-0000000000b2','M2','m2@t.test','mentor'),
 ('00000000-0000-0000-0000-0000000000c1','S1','s1@t.test','student'),('00000000-0000-0000-0000-0000000000c2','S2','s2@t.test','student');
insert into courses(id,title,slug,status,min_progress_pct,min_attendance_pct,min_assignment_avg) values
 ('10000000-0000-0000-0000-000000000001','C1','c1','published',100,75,40),
 ('10000000-0000-0000-0000-000000000002','C2','c2','published',100,75,40),
 ('10000000-0000-0000-0000-000000000003','C3','c3','published',0,75,0);
insert into modules(id,course_id,title) values
 ('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','M1'),
 ('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','M2');
insert into lessons(id,module_id,title,status) values
 ('21000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','L1','published'),
 ('21000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000002','L2','published');
insert into batches(id,course_id,name) values ('70000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','B-of-C2');
insert into enrollments(id,student_id,course_id,mentor_id) values
 ('30000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000c1','10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000b1'),
 ('30000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-0000000000c2','10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-0000000000b2'),
 ('30000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-0000000000c1','10000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-0000000000b1');
insert into assignments(id,course_id,title) values ('60000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','A1');
insert into quizzes(id,course_id,title,status) values ('40000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Q1','published'),
 ('40000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','Q2','published');
insert into quiz_questions(id,quiz_id,prompt,options) values ('50000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000002','?','["a","b"]');
insert into quiz_keys values ('50000000-0000-0000-0000-000000000002',1);

-- ordering: server assigns increasing positions regardless of what the client sends
insert into lessons(module_id,title,status,position) values ('20000000-0000-0000-0000-000000000001','L1b','published',99),('20000000-0000-0000-0000-000000000001','L1c','published',99);
select pg_temp.ok((select array_agg(position order by position) from lessons where module_id='20000000-0000-0000-0000-000000000001')=array[1,2,3], 'lesson positions are 1,2,3 even when client sends 99');
insert into modules(course_id,title,position) values ('10000000-0000-0000-0000-000000000001','M1b',99);
select pg_temp.ok((select position from modules where title='M1b')=2, 'module position is server-assigned');

-- admin actions are audited by the database
select pg_temp.as_user('00000000-0000-0000-0000-0000000000a1');
update profiles set status='suspended' where id='00000000-0000-0000-0000-0000000000b2';
select pg_temp.ok(exists(select 1 from audit_logs where action='set_status_suspended' and entity_id='00000000-0000-0000-0000-0000000000b2' and actor_id='00000000-0000-0000-0000-0000000000a1'), 'suspend is written to audit_logs with the actor');
update profiles set status='active' where id='00000000-0000-0000-0000-0000000000b2';
select pg_temp.ok((select count(*) from audit_logs where action='set_status_active' and entity_id='00000000-0000-0000-0000-0000000000b2')=1, 'reactivate is audited');
update courses set status='draft' where id='10000000-0000-0000-0000-000000000003';
select pg_temp.ok(exists(select 1 from audit_logs where action='course_draft'), 'course unpublish is audited');
update courses set status='published' where id='10000000-0000-0000-0000-000000000003';
select pg_temp.fails($$insert into audit_logs(action) values ('forged')$$, 'clients cannot write audit_logs directly');
select pg_temp.as_root();

-- score ranges
select pg_temp.fails($$insert into submissions(assignment_id,enrollment_id,status,score) values ('60000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','graded',101)$$, 'submission score above 100 is rejected');
select pg_temp.fails($$insert into project_milestones(enrollment_id,title,score) values ('30000000-0000-0000-0000-000000000001','m',-1)$$, 'negative milestone score is rejected');

-- mentors can grade but not rewrite the student's work
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c1');
insert into submissions(assignment_id,enrollment_id,text_response) values ('60000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','original');
select pg_temp.as_root();
select pg_temp.as_user('00000000-0000-0000-0000-0000000000b1');
update submissions set text_response='tampered', link_url='https://evil.test', score=80, feedback='ok', status='graded';
select pg_temp.ok((select text_response from submissions)='original' and (select link_url from submissions) is null, 'mentor cannot rewrite student response/link');
select pg_temp.ok((select score from submissions)=80 and (select status from submissions)='graded', 'mentor can still grade');
select pg_temp.as_root();

-- progress rows must belong to the enrollment's own course
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c1');
select pg_temp.fails($$insert into lesson_progress(enrollment_id,lesson_id) values ('30000000-0000-0000-0000-000000000001','21000000-0000-0000-0000-000000000002')$$, 'cross-course lesson progress is rejected');
insert into lesson_progress(enrollment_id,lesson_id) select '30000000-0000-0000-0000-000000000001', id from lessons where module_id='20000000-0000-0000-0000-000000000001';
select pg_temp.ok((select count(*) from lesson_progress)=3, 'own-course progress is accepted');
select pg_temp.as_root();

-- attendance: two sessions on the same day are kept separately
insert into class_sessions(id,course_id,title,session_date) values ('80000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','AM','2026-01-05'),('80000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','PM','2026-01-05');
select pg_temp.as_user('00000000-0000-0000-0000-0000000000b1');
insert into attendance(enrollment_id,session_id,session_date,present) values ('30000000-0000-0000-0000-000000000001','80000000-0000-0000-0000-000000000001','2026-01-05',true),('30000000-0000-0000-0000-000000000001','80000000-0000-0000-0000-000000000002','2026-01-05',false);
select pg_temp.ok((select count(*) from attendance where enrollment_id='30000000-0000-0000-0000-000000000001')=2, 'same-day sessions keep separate attendance rows');
select pg_temp.fails($$insert into attendance(enrollment_id,session_id,session_date,present) values ('30000000-0000-0000-0000-000000000001','80000000-0000-0000-0000-000000000001','2026-01-05',true)$$, 'duplicate attendance for one session is rejected');
select pg_temp.fails($$insert into class_sessions(course_id,batch_id,title,session_date) values ('10000000-0000-0000-0000-000000000001','70000000-0000-0000-0000-000000000002','x','2026-01-06')$$, 'a session cannot use another course''s batch');
select pg_temp.as_root();

-- eligibility: attendance is n/a only for courses without sessions
select pg_temp.as_user('00000000-0000-0000-0000-0000000000a1');
select pg_temp.ok((select attendance_pct from enrollment_eligibility('30000000-0000-0000-0000-000000000002'))=100, 'course without sessions: attendance not applicable');
select pg_temp.as_root();
insert into class_sessions(course_id,title,session_date) values ('10000000-0000-0000-0000-000000000003','S','2026-02-01');
select pg_temp.as_user('00000000-0000-0000-0000-0000000000a1');
select pg_temp.ok((select attendance_pct from enrollment_eligibility('30000000-0000-0000-0000-000000000003'))=0 and not (select eligible from enrollment_eligibility('30000000-0000-0000-0000-000000000003')), 'sessions exist but none attended: attendance 0 and not eligible');

-- certification is atomic and admin-only
select pg_temp.fails($$select complete_enrollment('30000000-0000-0000-0000-000000000002')$$, 'ineligible enrollment cannot be completed');
select pg_temp.ok((select status from enrollments where id='30000000-0000-0000-0000-000000000002')='active' and not exists(select 1 from certificates), 'failed completion leaves no certificate and no status change');
select pg_temp.as_root();
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c1');
select pg_temp.fails($$select complete_enrollment('30000000-0000-0000-0000-000000000001')$$, 'students cannot complete enrollments');
select pg_temp.as_root();
-- make e1 eligible: progress 100% (done above), assignment graded 80, attendance 50% -> lower the course threshold
update courses set min_attendance_pct=50 where id='10000000-0000-0000-0000-000000000001';
select pg_temp.as_user('00000000-0000-0000-0000-0000000000a1');
select pg_temp.ok((select complete_enrollment('30000000-0000-0000-0000-000000000001')) like 'BLZX-%', 'eligible enrollment completes and returns a verification id');
select pg_temp.ok((select status from enrollments where id='30000000-0000-0000-0000-000000000001')='completed' and (select count(*) from certificates)=1, 'completion issued exactly one certificate and set status');
select pg_temp.ok(exists(select 1 from audit_logs where action='issue_certificate'), 'certificate issue is audited');
select pg_temp.fails($$select complete_enrollment('30000000-0000-0000-0000-000000000001')$$, 'a completed enrollment cannot be completed twice');
select pg_temp.as_root();

-- lifecycle: invalid transitions rejected, revoking revokes the certificate
select pg_temp.fails($$update enrollments set status='active' where id='30000000-0000-0000-0000-000000000001'$$, 'completed -> active is rejected');
update enrollments set status='paused' where id='30000000-0000-0000-0000-000000000002';
update enrollments set status='active' where id='30000000-0000-0000-0000-000000000002';
select pg_temp.ok((select status from enrollments where id='30000000-0000-0000-0000-000000000002')='active', 'paused <-> active is allowed');
select pg_temp.as_user('00000000-0000-0000-0000-0000000000a1');
update enrollments set status='revoked' where id='30000000-0000-0000-0000-000000000001';
select pg_temp.ok((select status from certificates)='revoked', 'revoking an enrollment revokes its certificate');
select pg_temp.ok(exists(select 1 from audit_logs where action='certificate_revoked'), 'certificate revoke is audited');
select pg_temp.as_root();
select pg_temp.fails($$update enrollments set status='active' where id='30000000-0000-0000-0000-000000000001'$$, 'revoked is terminal');

-- quizzes: questions and keys are created together, validated, and admin-only
select pg_temp.as_user('00000000-0000-0000-0000-0000000000a1');
select pg_temp.ok((select add_quiz_question('40000000-0000-0000-0000-000000000001','Capital?','["x","y","z"]'::jsonb,2)) is not null, 'admin can add a question with its key');
select pg_temp.ok((select count(*) from quiz_questions q join quiz_keys k on k.question_id=q.id where q.quiz_id='40000000-0000-0000-0000-000000000001')=1, 'question and key exist together');
select pg_temp.fails($$select add_quiz_question('40000000-0000-0000-0000-000000000001','Bad','["x","y"]'::jsonb,5)$$, 'out-of-range correct index is rejected');
select pg_temp.ok((select count(*) from quiz_questions where quiz_id='40000000-0000-0000-0000-000000000001')=1, 'a rejected question leaves nothing behind');
select pg_temp.fails($$select add_quiz_question('40000000-0000-0000-0000-000000000001','One',' ["x"]'::jsonb,0)$$, 'single-option question is rejected');
select pg_temp.as_root();
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c1');
select pg_temp.fails($$select add_quiz_question('40000000-0000-0000-0000-000000000001','Hack','["x","y"]'::jsonb,0)$$, 'students cannot add quiz questions');
select pg_temp.as_root();

-- suspended accounts cannot use the quiz or eligibility RPCs, or edit their profile
update profiles set status='suspended' where id='00000000-0000-0000-0000-0000000000c2';
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c2');
select pg_temp.fails($$select * from submit_quiz('40000000-0000-0000-0000-000000000002','30000000-0000-0000-0000-000000000002','{"50000000-0000-0000-0000-000000000002":1}'::jsonb)$$, 'suspended student cannot submit a quiz');
select pg_temp.ok((select count(*) from enrollment_eligibility('30000000-0000-0000-0000-000000000002'))=0, 'suspended student gets no eligibility data');
update profiles set full_name='Renamed' where id='00000000-0000-0000-0000-0000000000c2';
select pg_temp.as_root();
select pg_temp.ok((select full_name from profiles where id='00000000-0000-0000-0000-0000000000c2')='S2', 'suspended user cannot edit their profile');
update profiles set status='active' where id='00000000-0000-0000-0000-0000000000c2';

-- notifications: users can only mark them read
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c1');
update notifications set title='forged', body='forged', read=true where user_id='00000000-0000-0000-0000-0000000000c1';
select pg_temp.ok((select count(*) from notifications where user_id='00000000-0000-0000-0000-0000000000c1' and title='forged')=0 and (select bool_and(read) from notifications where user_id='00000000-0000-0000-0000-0000000000c1'), 'notification text is immutable, read flag works');
select pg_temp.as_root();

-- every SECURITY DEFINER function pins its search_path
select pg_temp.ok((select count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.prosecdef and not coalesce(p.proconfig::text,'') like '%search_path=public, pg_temp%')=0, 'all security definer functions pin search_path');

do $$ begin raise notice 'ALL INTEGRITY TESTS PASSED'; end $$;
rollback;
