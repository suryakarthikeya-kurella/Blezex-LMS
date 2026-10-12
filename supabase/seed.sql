insert into tracks(name) values ('Technology'),('Business') on conflict do nothing;
insert into courses(track_id,title,slug,description,status) select t.id,c.title,c.slug,c.d,'published' from (values
 ('Technology','Full Stack Web Development','full-stack-web','HTML, React, Node and databases'),
 ('Technology','Data Analytics','data-analytics','SQL, Excel, Python and dashboards'),
 ('Technology','Cloud & DevOps','cloud-devops','Linux, Docker, CI/CD and cloud basics'),
 ('Technology','UI/UX Design','ui-ux-design','Research, wireframes and prototyping'),
 ('Business','Digital Marketing','digital-marketing','SEO, social and paid campaigns')) c(track,title,slug,d)
 join tracks t on t.name=c.track on conflict do nothing;
-- sample content for the first course
with m as (insert into modules(course_id,title,position) select id,'Getting Started',1 from courses where slug='full-stack-web' returning id)
insert into lessons(module_id,title,content_html,position,status) select id,'Welcome to Full Stack',
 '<h2>Welcome!</h2><p>This lesson is rich HTML.</p><div class="callout">Tip: build something every day.</div><svg viewBox="0 0 200 60" width="200"><rect x="2" y="2" width="196" height="56" rx="12" fill="none" stroke="#111" stroke-width="2"/><text x="100" y="36" text-anchor="middle" font-size="16" fill="#FF4D1C">Client → Server → DB</text></svg>',1,'published' from m;
