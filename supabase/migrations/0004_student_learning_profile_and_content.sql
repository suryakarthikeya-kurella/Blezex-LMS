alter table profiles add column if not exists education_level text;
alter table profiles add column if not exists institution text;
alter table profiles add column if not exists field_of_study text;
alter table profiles add column if not exists graduation_year integer check (graduation_year is null or graduation_year between 1900 and 2200);
alter table profiles add column if not exists emergency_contact_name text;
alter table profiles add column if not exists emergency_contact_phone text;

insert into tracks(name) values ('Technology') on conflict (name) do nothing;

insert into courses(track_id, title, slug, description, status)
select t.id, 'Full Stack Web Development', 'full-stack-web', 'Build modern web applications from responsive interfaces to APIs and databases.', 'published'
from tracks t where t.name = 'Technology'
on conflict (slug) do nothing;

update courses
set min_progress_pct = 80
where slug = 'full-stack-web';

insert into modules(course_id, title, position)
select c.id, module.title, module.position
from courses c
cross join (values
  ('Getting Started', 1),
  ('Frontend Foundations', 2),
  ('React Essentials', 3),
  ('APIs and Deployment', 4)
) as module(title, position)
where c.slug = 'full-stack-web'
  and not exists (
    select 1 from modules m where m.course_id = c.id and m.title = module.title
  );

insert into lessons(module_id, title, content_html, position, status)
select m.id, lesson.title, lesson.content_html, lesson.position, 'published'
from modules m
join courses c on c.id = m.course_id
cross join (values
  ('Getting Started', 'Set up your development workspace', $lesson$<h2>Set up your workspace</h2><p>A reliable development setup makes it easier to experiment, test ideas, and collaborate. Install a code editor, a current Node.js LTS release, and Git before starting a project.</p><h3>First steps</h3><ol><li>Create a project folder and initialize Git.</li><li>Use a package manager to install project dependencies.</li><li>Run the local development server and open the app in a browser.</li></ol><div class="callout">Keep changes small and commit working checkpoints often.</div>$lesson$, 2),
  ('Getting Started', 'How the browser, server, and database work together', $lesson$<h2>Follow a web request</h2><p>A web application usually has a client, a server, and a data store. The browser sends an HTTP request, the server applies application rules, and the database stores or retrieves information.</p><ul><li><b>Client:</b> renders the interface and responds to user input.</li><li><b>Server:</b> validates requests and coordinates application logic.</li><li><b>Database:</b> stores structured information for future use.</li></ul><p>Use the browser network panel to inspect requests and responses while developing.</p>$lesson$, 3),
  ('Frontend Foundations', 'Build semantic HTML pages', $lesson$<h2>Structure with HTML</h2><p>HTML communicates the meaning and hierarchy of page content. Prefer landmarks such as <code>header</code>, <code>nav</code>, <code>main</code>, and <code>footer</code> over generic containers when they fit the content.</p><h3>Accessible forms</h3><p>Connect every input to a visible label. Buttons should describe their action, and headings should follow a logical hierarchy.</p><pre><code>&lt;main&gt;\n  &lt;h1&gt;Learning dashboard&lt;/h1&gt;\n  &lt;p&gt;Continue where you left off.&lt;/p&gt;\n&lt;/main&gt;</code></pre>$lesson$, 1),
  ('Frontend Foundations', 'Style responsive layouts with CSS', $lesson$<h2>Design for every screen</h2><p>Start with a readable layout on a narrow screen, then add breakpoints when the content needs more space. CSS Grid and Flexbox help arrange content without hard-coded positioning.</p><ul><li>Use relative widths and a comfortable maximum content width.</li><li>Keep text contrast strong and interactive targets easy to tap.</li><li>Test layouts at several viewport widths.</li></ul><p>Responsive design is not just shrinking a desktop page; it is choosing a useful layout for each context.</p>$lesson$, 2),
  ('Frontend Foundations', 'Use JavaScript to respond to events', $lesson$<h2>Make interfaces interactive</h2><p>JavaScript can respond to events such as clicks, form submissions, and keyboard input. Keep the user interface synchronized with the application state instead of directly changing unrelated page elements.</p><h3>Reliable event handling</h3><p>Validate user input, show clear feedback, and handle both success and error outcomes. Avoid assuming a network request will always succeed.</p>$lesson$, 3),
  ('React Essentials', 'Think in reusable React components', $lesson$<h2>Compose a user interface</h2><p>React components turn a screen into reusable, testable pieces. A component can receive information through props and maintain local state when the user interacts with it.</p><ul><li>Keep each component focused on a clear responsibility.</li><li>Use descriptive prop names and stable list keys.</li><li>Share state at the lowest common parent that needs it.</li></ul>$lesson$, 1),
  ('React Essentials', 'Manage state and forms', $lesson$<h2>Model the current interface state</h2><p>State describes information that can change over time, such as a selected lesson or a form response. Update state through the framework so React can render the current interface consistently.</p><p>Forms should explain what is required, preserve the student input after validation errors, and confirm when a save succeeds.</p><div class="callout">Keep a single source of truth for each value that multiple parts of the interface use.</div>$lesson$, 2),
  ('React Essentials', 'Load data and handle loading states', $lesson$<h2>Design for asynchronous data</h2><p>Network requests take time and can fail. A well-behaved interface distinguishes loading, empty, success, and error states so students always know what is happening.</p><ol><li>Start the request when the relevant view loads.</li><li>Show a meaningful loading state while waiting.</li><li>Display an actionable error if the request fails.</li><li>Render the resulting data or a helpful empty state.</li></ol>$lesson$, 3),
  ('APIs and Deployment', 'Design and consume a REST API', $lesson$<h2>Use HTTP APIs</h2><p>REST APIs expose resources through predictable URLs and HTTP methods. A client should send only the information needed for the requested operation and handle status codes explicitly.</p><ul><li><code>GET</code> reads a resource.</li><li><code>POST</code> creates a resource.</li><li><code>PATCH</code> updates part of a resource.</li><li><code>DELETE</code> removes a resource.</li></ul><p>Validate data on the server even when the client also validates it.</p>$lesson$, 1),
  ('APIs and Deployment', 'Connect an application to a database', $lesson$<h2>Persist application data</h2><p>A database lets an application retain information across sessions. Model entities and their relationships, add constraints for important rules, and use parameterized queries or a trusted data client.</p><p>Never expose privileged database credentials in browser code. Apply least-privilege access policies and test them with realistic user roles.</p>$lesson$, 2),
  ('APIs and Deployment', 'Test and deploy a web application', $lesson$<h2>Ship with confidence</h2><p>Before deployment, run type checks and tests, review environment-specific configuration, and make sure secrets are stored in the hosting provider rather than committed to source control.</p><ol><li>Build the production bundle.</li><li>Deploy to a preview environment and test key flows.</li><li>Check browser and server logs for errors.</li><li>Promote the verified build to production.</li></ol>$lesson$, 3)
) as lesson(module_title, title, content_html, position)
where c.slug = 'full-stack-web'
  and m.title = lesson.module_title
  and not exists (select 1 from lessons l where l.module_id = m.id and l.title = lesson.title);

insert into assignments(course_id, title, instructions)
select c.id, assignment.title, assignment.instructions
from courses c
cross join (values
  ('Responsive Portfolio Page', 'Create a responsive portfolio page using semantic HTML and CSS. Include an introduction, a projects section, and a contact section. Submit a short explanation of your layout choices and a link to your deployed project.'),
  ('React Learning Dashboard', 'Build a small React dashboard with reusable course cards, a progress indicator, and an empty state. Include at least one interactive control and explain how component state changes the interface. Submit your source repository link.'),
  ('Full Stack API Integration', 'Connect a web interface to a public or local REST API. Show loading, success, empty, and error states. Document the endpoint and HTTP method you used, and submit a link to your working project.')
) as assignment(title, instructions)
where c.slug = 'full-stack-web'
  and not exists (select 1 from assignments a where a.course_id = c.id and a.title = assignment.title);

insert into quizzes(course_id, title, pass_pct, max_attempts, status)
select c.id, 'Full Stack Foundations Check', 70, 3, 'published'
from courses c
where c.slug = 'full-stack-web'
  and not exists (select 1 from quizzes q where q.course_id = c.id and q.title = 'Full Stack Foundations Check');

insert into quiz_questions(quiz_id, prompt, options, position)
select q.id, question.prompt, question.options, question.position
from quizzes q
join courses c on c.id = q.course_id
cross join (values
  ('What does HTML primarily define?', jsonb_build_array('Page structure and meaning', 'Styling only', 'Server processes', 'Database schemas'), 1),
  ('What is a CSS media query commonly used for?', jsonb_build_array('Change database records', 'Apply responsive styles at different viewport sizes', 'Create a server route', 'Compile JavaScript'), 2),
  ('Why should React list items use stable keys?', jsonb_build_array('To give list items a stable identity between renders', 'To make every item visible', 'To fetch server state', 'To create CSS grid columns'), 3),
  ('Which HTTP method is commonly used to retrieve a resource?', jsonb_build_array('GET', 'POST', 'PATCH', 'DELETE'), 4),
  ('Why should an application show a loading state during a request?', jsonb_build_array('To communicate that data is being retrieved', 'To hide every error', 'To skip validation', 'To prevent responsive layouts'), 5)
) as question(prompt, options, position)
where c.slug = 'full-stack-web'
  and q.title = 'Full Stack Foundations Check'
  and not exists (select 1 from quiz_questions qq where qq.quiz_id = q.id and qq.prompt = question.prompt);

insert into quiz_keys(question_id, correct_index)
select qq.id, answer.correct_index
from quiz_questions qq
join quizzes q on q.id = qq.quiz_id
join courses c on c.id = q.course_id
join (values
  ('What does HTML primarily define?', 0),
  ('What is a CSS media query commonly used for?', 1),
  ('Why should React list items use stable keys?', 0),
  ('Which HTTP method is commonly used to retrieve a resource?', 0),
  ('Why should an application show a loading state during a request?', 0)
) as answer(prompt, correct_index) on answer.prompt = qq.prompt
where c.slug = 'full-stack-web'
  and q.title = 'Full Stack Foundations Check'
  and not exists (select 1 from quiz_keys key_row where key_row.question_id = qq.id);
