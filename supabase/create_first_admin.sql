-- 1) Supabase Dashboard > Authentication > Users > Add user (email + password, tick "Auto Confirm")
-- 2) Replace the email/name below and run in SQL Editor:
insert into profiles(id, full_name, email, role)
select id, 'Portal Admin', email, 'admin' from auth.users where email = 'blezex.vibe@gmail.com';
