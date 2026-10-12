-- RLS / business-rule tests. Run in the SQL Editor of a DEV/TEST Supabase project (everything is rolled back).
-- Each failure raises an exception naming the broken rule. Success = "ALL RLS TESTS PASSED" notice.
begin;
create function pg_temp.ok(c boolean, m text) returns void language plpgsql as $$ begin if not coalesce(c,false) then raise exception 'FAILED: %', m; end if; end $$;
create function pg_temp.as_user(u uuid) returns void language plpgsql as $$ begin
  perform set_config('request.jwt.claims', json_build_object('sub',u,'role','authenticated')::text, true); set local role authenticated; end $$;

insert into auth.users(id,email) values
 ('00000000-0000-0000-0000-0000000000a1','admin@t.test'),('00000000-0000-0000-0000-0000000000b1','mentor@t.test'),('00000000-0000-0000-0000-0000000000b2','mentor2@t.test'),
 ('00000000-0000-0000-0000-0000000000c1','s1@t.test'),('00000000-0000-0000-0000-0000000000c2','s2@t.test');
insert into profiles(id,full_name,email,role) values
 ('00000000-0000-0000-0000-0000000000a1','A','admin@t.test','admin'),('00000000-0000-0000-0000-0000000000b1','M1','mentor@t.test','mentor'),('00000000-0000-0000-0000-0000000000b2','M2','mentor2@t.test','mentor'),
 ('00000000-0000-0000-0000-0000000000c1','S1','s1@t.test','student'),('00000000-0000-0000-0000-0000000000c2','S2','s2@t.test','student');
insert into courses(id,title,slug,status) values ('10000000-0000-0000-0000-000000000001','C1','c1','published'),('10000000-0000-0000-0000-000000000002','C2','c2','published');
insert into modules(id,course_id,title) values ('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','M'),('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','M');
insert into lessons(module_id,title,status) values ('20000000-0000-0000-0000-000000000001','L1','published'),('20000000-0000-0000-0000-000000000002','L2','published');
insert into enrollments(id,student_id,course_id,mentor_id) values
 ('30000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000c1','10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-0000000000b1'),
 ('30000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-0000000000c2','10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-0000000000b2');
insert into quizzes(id,course_id,title,status) values ('40000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Q','published');
insert into quiz_questions(id,quiz_id,prompt,options) values ('50000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001','?','["a","b"]');
insert into quiz_keys values ('50000000-0000-0000-0000-000000000001',1);
insert into assignments(id,course_id,title) values ('60000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','A1');

-- duplicate live enrollment is rejected
do $$ begin
  begin insert into enrollments(student_id,course_id) values ('00000000-0000-0000-0000-0000000000c1','10000000-0000-0000-0000-000000000001'); raise exception 'FAILED: duplicate enrollment allowed';
  exception when unique_violation then null; end; end $$;

select pg_temp.as_user('00000000-0000-0000-0000-0000000000c1');
select pg_temp.ok((select count(*) from enrollments)=1, 'student sees only own enrollments');
select pg_temp.ok((select count(*) from lessons)=1, 'student sees only lessons of enrolled course');
select pg_temp.ok((select count(*) from courses)=1, 'student sees only enrolled courses');
select pg_temp.ok((select count(*) from quiz_keys)=0, 'student cannot read answer keys');
select pg_temp.ok((select count(*) from profiles where id='00000000-0000-0000-0000-0000000000c2')=0, 'student cannot see other students');
update profiles set role='admin' where id='00000000-0000-0000-0000-0000000000c1';
select pg_temp.ok((select role from profiles where id='00000000-0000-0000-0000-0000000000c1')='student', 'student cannot escalate role');
do $$ begin begin insert into enrollments(student_id,course_id) values ('00000000-0000-0000-0000-0000000000c1','10000000-0000-0000-0000-000000000002'); raise exception 'FAILED: student granted self access';
  exception when insufficient_privilege or check_violation then null; end; end $$;
-- quiz scoring is server-side
select pg_temp.ok((select score_pct from submit_quiz('40000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','{"50000000-0000-0000-0000-000000000001":1}'::jsonb))=100, 'quiz scored by server');
insert into submissions(assignment_id,enrollment_id,text_response) values ('60000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','x');
update submissions set score=100, status='graded';
select pg_temp.ok((select score from submissions) is null and (select status from submissions)='submitted', 'student cannot self-grade');
reset role;

select pg_temp.as_user('00000000-0000-0000-0000-0000000000b1');
select pg_temp.ok((select count(*) from enrollments)=1, 'mentor sees only assigned enrollments');
select pg_temp.ok((select count(*) from profiles where id='00000000-0000-0000-0000-0000000000c2')=0, 'mentor cannot see unrelated students');
select pg_temp.ok((select count(*) from submissions)=1, 'mentor sees assigned submissions');
reset role;

-- revoking one enrollment hides only that course
update enrollments set status='revoked' where id='30000000-0000-0000-0000-000000000001';
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c1');
select pg_temp.ok((select count(*) from lessons)=0, 'revoked enrollment loses lesson access');
reset role;
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c2');
select pg_temp.ok((select count(*) from lessons)=1, 'other students unaffected by revoke');
reset role;

-- suspended accounts lose all access
update profiles set status='suspended' where id='00000000-0000-0000-0000-0000000000c2';
select pg_temp.as_user('00000000-0000-0000-0000-0000000000c2');
select pg_temp.ok((select count(*) from enrollments)=0 and (select count(*) from lessons)=0, 'suspended user sees nothing');
reset role;

-- anon has no table access
set local role anon;
do $$ begin begin perform count(*) from profiles; raise exception 'FAILED: anon can read profiles'; exception when insufficient_privilege then null; end; end $$;
reset role;
do $$ begin raise notice 'ALL RLS TESTS PASSED'; end $$;
rollback;
