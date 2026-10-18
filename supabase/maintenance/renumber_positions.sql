-- OPTIONAL, MANUAL, one-time data repair (NOT a migration; never run automatically).
-- Before migration 0003 every lesson / quiz question was saved with position 99, so older rows may share a position
-- and their order is undefined. This renumbers each parent's rows 1..n, keeping the current ordering
-- (position first, then physical row order). Review with the SELECT below, then run the UPDATEs in a transaction on a backup-verified project.
--
-- Preview: parents that currently contain duplicate positions
select 'lessons' as tbl, module_id as parent, count(*) as rows from lessons group by module_id, position having count(*) > 1
union all select 'quiz_questions', quiz_id, count(*) from quiz_questions group by quiz_id, position having count(*) > 1
union all select 'modules', course_id, count(*) from modules group by course_id, position having count(*) > 1;

begin;
update lessons l set position = r.n from (select id, row_number() over (partition by module_id order by position, ctid) as n from lessons) r where r.id = l.id and l.position <> r.n;
update quiz_questions q set position = r.n from (select id, row_number() over (partition by quiz_id order by position, ctid) as n from quiz_questions) r where r.id = q.id and q.position <> r.n;
update modules m set position = r.n from (select id, row_number() over (partition by course_id order by position, ctid) as n from modules) r where r.id = m.id and m.position <> r.n;
commit;
