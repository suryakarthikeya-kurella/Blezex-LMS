export interface PracticeQuestion {
  id: string;
  prompt: string;
  codeSnippet?: { language: string; code: string };
  options: Array<{ id: string; label: string; code?: string }>;
  correctIndex: number;
  explanation: string;
}

export interface CheatSheetSection {
  title: string;
  explanation?: string;
  bullets?: string[];
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
  };
}

export interface CurriculumItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  modulePosition: number;
  title: string;
  duration: string;
  type: "cheatsheet" | "practice" | "quiz" | "assignment";
  position: number;
  contentHeading?: string;
  contentDescription?: string;
  sections?: CheatSheetSection[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  contentHtml?: string;
  questions?: PracticeQuestion[];
  assignmentPrompt?: {
    instructions: string;
    starterCode?: string;
    deliverables: string[];
  };
}

export interface CurriculumModule {
  id: string;
  title: string;
  position: number;
  duration: string;
  description: string;
  items: CurriculumItem[];
}

export const FULL_STACK_MODULES: CurriculumModule[] = [
  {
    id: "mod-html-css-intro",
    title: "Introduction to HTML & CSS",
    position: 1,
    duration: "6 hours, 35 mins",
    description: "Master document semantics, structural elements, layout foundations, and responsive components.",
    items: [
      {
        id: "item-html-structure",
        moduleId: "mod-html-css-intro",
        moduleTitle: "Introduction to HTML & CSS",
        modulePosition: 1,
        title: "Introduction to HTML | Cheat Sheet",
        duration: "15 mins",
        type: "cheatsheet",
        position: 1,
        contentHeading: "1. Basic HTML5 Document Structure",
        contentDescription: "HTML (HyperText Markup Language) provides the core skeleton of every website. Browsers parse tags to create the Document Object Model (DOM) tree.",
        codeSnippet: {
          language: "HTML",
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to Full Stack Web Development</h1>
    <p>Your content and interactive components go here.</p>
  </body>
</html>`,
        },
        sections: [
          {
            title: "Document Anatomy & Declarations",
            explanation: "Every HTML document follows a strict container hierarchy:",
            bullets: [
              "<!DOCTYPE html>: Tells the browser rendering engine to use modern standards mode rather than legacy quirks mode.",
              "<html lang='en'>: The root container of the page, specifying primary language for screen readers and SEO.",
              "<head>: Houses page metadata, document character encoding, external stylesheets, and title (never visible on the page canvas).",
              "<body>: Contains all visible page contents—headings, paragraphs, images, tables, forms, and interactive widgets.",
            ],
          },
          {
            title: "Element Syntax & Attributes",
            explanation: "HTML elements consist of an opening tag, optional attributes, content, and a closing tag:",
            codeSnippet: {
              language: "HTML",
              filename: "syntax.html",
              code: `<!-- Element with attribute -->
<a href="https://blezex.com" target="_blank" rel="noopener">Visit BlezeX</a>

<!-- Void / Self-closing element (no closing tag needed) -->
<img src="/logo.png" alt="Company Logo" width="200" height="60">
<input type="text" id="username" name="username">`,
            },
            bullets: [
              "Attributes provide metadata or configuration (e.g. href, src, alt, id, class).",
              "Void tags like <img>, <input>, <br>, and <meta> do not enclose content and have no closing tag.",
            ],
          },
        ],
        questions: [
          {
            id: "q-html-1",
            prompt: "What is the correct Basic Structure of an HTML document?",
            options: [
              { id: "opt-1", label: "<!DOCTYPE html> followed by <html>, <head> for metadata, and <body> for visible content." },
              { id: "opt-2", label: "<document> tag containing <header> and <content>." },
              { id: "opt-3", label: "<body> element placed directly inside the <head>." },
              { id: "opt-4", label: "A single <div> container without any doctype." },
            ],
            correctIndex: 0,
            explanation: "An HTML document must always begin with the <!DOCTYPE html> preamble, followed by the <html> root element enclosing a <head> for metadata and a <body> containing visible content.",
          },
          {
            id: "q-html-2",
            prompt: "Which element must be placed inside <head> to tell mobile browsers to adapt layout width to the device screen?",
            options: [
              { id: "opt-2a", label: "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" },
              { id: "opt-2b", label: "<mobile responsive='true'>" },
              { id: "opt-2c", label: "<style device='mobile'>" },
              { id: "opt-2d", label: "<script device='phone'>" },
            ],
            correctIndex: 0,
            explanation: "The viewport meta tag instructs mobile browsers to render the page at the physical device width instead of scaling down a 980px desktop view.",
          },
        ],
      },
      {
        id: "item-html-semantic",
        moduleId: "mod-html-css-intro",
        moduleTitle: "Introduction to HTML & CSS",
        modulePosition: 1,
        title: "Semantic Elements & Text Hierarchy | Cheat Sheet",
        duration: "25 mins",
        type: "cheatsheet",
        position: 2,
        contentHeading: "2. Semantic HTML & Accessible Landmarks",
        contentDescription: "Semantic HTML means using tags according to their meaning rather than appearance. Assistive tools and search engines rely on semantic landmarks.",
        codeSnippet: {
          language: "HTML",
          code: `<header>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/courses">Courses</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Building Accessible Web Apps</h1>
    <section>
      <h2>Document Landmarks</h2>
      <p>Semantic tags replace generic <code>&lt;div&gt;</code> tags.</p>
    </section>
  </article>
</main>

<footer>
  <p>&copy; 2026 BlezeX LMS. All rights reserved.</p>
</footer>`,
        },
        sections: [
          {
            title: "Core Landmark Tags",
            explanation: "Replace generic divs with semantic landmarks to guide users:",
            bullets: [
              "<header>: Introductory content, site branding, and top navigation.",
              "<nav>: Major navigational link groups (always pair with aria-label when multiple navs exist).",
              "<main>: The central, unique content of the page (there must only be one <main> per document).",
              "<article>: Self-contained content that can be distributed independently (e.g. blog post, card, forum entry).",
              "<section>: Thematic group of related content, typically beginning with its own heading.",
              "<aside>: Tangential content related to the page (sidebars, callouts, footnotes).",
              "<footer>: Copyright notices, sitemaps, and legal links.",
            ],
          },
          {
            title: "Text & Image Accessibility",
            explanation: "Structure text meaningfully to ensure universal accessibility:",
            bullets: [
              "Headings <h1> to <h6> must follow a logical descending tree. Never skip from <h1> to <h4>.",
              "<p>: Standard paragraph text for prose.",
              "<strong> vs <em>: <strong> conveys urgency or importance, while <em> adds conversational emphasis.",
              "<img alt='...'>: Always include alt text explaining the image. For decorative images, use alt='' so screen readers skip them.",
            ],
          },
        ],
        questions: [
          {
            id: "q-sem-1",
            prompt: "Which attribute is REQUIRED on <img> elements to describe the visual content for screen readers?",
            options: [
              { id: "s1", label: "src" },
              { id: "s2", label: "alt" },
              { id: "s3", label: "title" },
              { id: "s4", label: "aria-image" },
            ],
            correctIndex: 1,
            explanation: "The alt attribute conveys the meaning or purpose of the image. For decorative images, an empty alt='' attribute allows assistive tools to skip it.",
          },
          {
            id: "q-sem-2",
            prompt: "How many <main> landmark elements should be present in a single HTML document?",
            options: [
              { id: "s2a", label: "Only one <main> element representing the central content." },
              { id: "s2b", label: "One <main> element for each section." },
              { id: "s2c", label: "As many as desired inside headers and footers." },
            ],
            correctIndex: 0,
            explanation: "A document must contain only one visible <main> landmark element representing the unique primary content of that page.",
          },
        ],
      },
      {
        id: "item-html-forms",
        moduleId: "mod-html-css-intro",
        moduleTitle: "Introduction to HTML & CSS",
        modulePosition: 1,
        title: "HTML Forms, Inputs & Validation | Cheat Sheet",
        duration: "30 mins",
        type: "cheatsheet",
        position: 3,
        contentHeading: "3. Accessible Forms & Native Validation",
        contentDescription: "HTML forms gather user input, handle authentication, and transmit payloads securely to backend endpoints.",
        codeSnippet: {
          language: "HTML",
          code: `<form action="/api/enroll" method="POST">
  <fieldset>
    <legend>Student Registration</legend>

    <label for="student-name">Full Name</label>
    <input type="text" id="student-name" name="name" required minlength="3">

    <label for="student-email">Email Address</label>
    <input type="email" id="student-email" name="email" required>

    <label for="track-select">Select Track</label>
    <select id="track-select" name="track">
      <option value="frontend">Frontend Web Development</option>
      <option value="fullstack">Full Stack Engineering</option>
    </select>

    <button type="submit">Submit Application</button>
  </fieldset>
</form>`,
        },
        sections: [
          {
            title: "Label-Input Pairing",
            explanation: "Every form control MUST be explicitly linked to an accessible label:",
            bullets: [
              "The <label for='...'> attribute must match the input's id='...' attribute.",
              "Clicking the label automatically focuses the corresponding input or checks the radio/checkbox.",
              "Never use placeholder text as a replacement for visible labels.",
            ],
          },
          {
            title: "Built-In Browser Validation",
            explanation: "HTML5 provides instant client-side validation attributes:",
            bullets: [
              "required: Blocks submission if field is left empty.",
              "type='email': Automatically checks for valid user@domain format.",
              "minlength and maxlength: Restricts character lengths.",
              "pattern: Validates with a regular expression before submit.",
            ],
          },
        ],
        questions: [
          {
            id: "q-form-1",
            prompt: "How does an accessible <label> link to an <input> element?",
            options: [
              { id: "f1", label: "By setting the label's 'for' attribute equal to the input's 'id' attribute." },
              { id: "f2", label: "By matching the label's name with input's name." },
              { id: "f3", label: "By placing both in the same <div> without attributes." },
            ],
            correctIndex: 0,
            explanation: "The 'for' attribute on a <label> matches the unique 'id' attribute of its target input, making the label clickable and announcing it in screen readers.",
          },
        ],
      },
      {
        id: "item-html-practice-1",
        moduleId: "mod-html-css-intro",
        moduleTitle: "Introduction to HTML & CSS",
        modulePosition: 1,
        title: "Practice 1: Semantic Tags & Hierarchy",
        duration: "20 mins",
        type: "practice",
        position: 4,
        contentHeading: "Practice: Semantic Layouts",
        contentDescription: "Test your mastery of HTML document hierarchy, tags, and accessible markup.",
        questions: [
          {
            id: "q-p1-1",
            prompt: "Which element represents an independent, self-contained article or card that could be shared outside the site?",
            options: [
              { id: "p1", label: "<article>" },
              { id: "p2", label: "<section>" },
              { id: "p3", label: "<aside>" },
              { id: "p4", label: "<div>" },
            ],
            correctIndex: 0,
            explanation: "<article> is designed for standalone syndicated content such as blog entries, news items, and product cards.",
          },
          {
            id: "q-p1-2",
            prompt: "What is the purpose of the <legend> element?",
            options: [
              { id: "p2a", label: "It provides a visible, accessible caption for a <fieldset> group of form controls." },
              { id: "p2b", label: "It styles fonts with bold typography." },
              { id: "p2c", label: "It replaces the document <title> on mobile screens." },
            ],
            correctIndex: 0,
            explanation: "<legend> provides an accessible caption for the grouped controls enclosed by a <fieldset>.",
          },
          {
            id: "q-p1-3",
            prompt: "Which tag is used to embed tabular data with rows and header cells?",
            options: [
              { id: "p3a", label: "<table> with <tr>, <th>, and <td> elements" },
              { id: "p3b", label: "<grid> with <col> elements" },
              { id: "p3c", label: "<data-matrix>" },
            ],
            correctIndex: 0,
            explanation: "<table> combined with <tr> (table row), <th> (header cell), and <td> (data cell) displays tabular data accessibly.",
          },
        ],
      },
      {
        id: "item-html-assignment",
        moduleId: "mod-html-css-intro",
        moduleTitle: "Introduction to HTML & CSS",
        modulePosition: 1,
        title: "Course Assignment | Student Portfolio Shell",
        duration: "45 mins",
        type: "assignment",
        position: 5,
        contentHeading: "Project: Semantic Developer Portfolio",
        contentDescription: "Build a multi-section semantic HTML portfolio with header, navigation, about section, projects table, and contact form.",
        assignmentPrompt: {
          instructions: "Create an index.html file that incorporates semantic HTML5 landmarks: <header>, <nav>, <main>, <article>, and <footer>. Include at least 3 headings, an accessible table showing completed certifications, and a validated contact form.",
          deliverables: [
            "Valid HTML5 doctype and semantic markup",
            "Functional navigation links targeting section IDs",
            "Accessible contact form with <label> and required fields",
            "Clean indentations and validated syntax",
          ],
        },
      },
    ],
  },
  {
    id: "mod-css-fundamentals",
    title: "Fundamentals of CSS",
    position: 2,
    duration: "8 hours, 10 mins",
    description: "Master modern styling with CSS Box Model, Flexbox, CSS Grid, custom properties, and responsive breakpoints.",
    items: [
      {
        id: "item-css-selectors",
        moduleId: "mod-css-fundamentals",
        moduleTitle: "Fundamentals of CSS",
        modulePosition: 2,
        title: "CSS Syntax, Selectors & Cascade | Cheat Sheet",
        duration: "30 mins",
        type: "cheatsheet",
        position: 1,
        contentHeading: "1. Cascade, Specificity & Custom Properties",
        contentDescription: "CSS controls the visual layout, typography, colors, and responsive behavior of elements.",
        codeSnippet: {
          language: "CSS",
          code: `:root {
  --primary-color: #2563eb;
  --bg-dark: #0f172a;
  --radius-md: 0.75rem;
}

/* Class Selector */
.card {
  background-color: var(--bg-dark);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Pseudo-class & Combined Selector */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}`,
        },
        sections: [
          {
            title: "Calculating Specificity",
            explanation: "When multiple rules target the same element, browsers calculate specificity:",
            bullets: [
              "Inline styles (style='...'): Highest specificity (1, 0, 0, 0).",
              "IDs (#header): High specificity (0, 1, 0, 0).",
              "Classes (.btn), Attributes ([type='text']), and Pseudo-classes (:hover): (0, 0, 1, 0).",
              "Elements (h1, div, p): Lowest specificity (0, 0, 0, 1).",
              "Avoid using !important because it breaks natural cascade inheritance.",
            ],
          },
          {
            title: "CSS Variables (Custom Properties)",
            explanation: "Define reusable design tokens on the :root pseudo-class so theme changes cascade everywhere.",
          },
        ],
        questions: [
          {
            id: "q-css-1",
            prompt: "Which selector has the highest specificity?",
            options: [
              { id: "c1", label: "#header-nav (ID selector)" },
              { id: "c2", label: ".btn-primary (Class selector)" },
              { id: "c3", label: "button (Element selector)" },
              { id: "c4", label: "* (Universal selector)" },
            ],
            correctIndex: 0,
            explanation: "ID selectors carry a specificity weight of (0, 1, 0, 0), beating classes, attributes, and element selectors.",
          },
        ],
      },
      {
        id: "item-css-boxmodel",
        moduleId: "mod-css-fundamentals",
        moduleTitle: "Fundamentals of CSS",
        modulePosition: 2,
        title: "The CSS Box Model & Spacing | Cheat Sheet",
        duration: "25 mins",
        type: "cheatsheet",
        position: 2,
        contentHeading: "2. The Box Model & Border-Box Sizing",
        contentDescription: "Every rendered HTML element is surrounded by content, padding, border, and margin.",
        codeSnippet: {
          language: "CSS",
          code: `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.box {
  width: 320px;
  padding: 1.5rem;    /* Internal space inside border */
  border: 2px solid #3b82f6;
  margin: 1rem auto;  /* External separation */
}`,
        },
        sections: [
          {
            title: "box-sizing: border-box",
            explanation: "By default (content-box), declared width applies ONLY to content, so adding padding increases total element width and breaks layouts. With border-box, padding and border are included inside the declared width.",
          },
          {
            title: "Margin Collapsing",
            explanation: "Vertical margins between adjacent sibling blocks collapse into a single margin equal to the largest value, rather than adding together.",
          },
        ],
        questions: [
          {
            id: "q-bm-1",
            prompt: "What does setting 'box-sizing: border-box' achieve?",
            options: [
              { id: "bm1", label: "Padding and border are included inside the declared element width and height." },
              { id: "bm2", label: "Margins are added into the element width." },
              { id: "bm3", label: "It removes all borders from the screen." },
            ],
            correctIndex: 0,
            explanation: "With border-box, width = content + padding + border, preventing elements from overflowing when padding is added.",
          },
        ],
      },
      {
        id: "item-css-flexbox",
        moduleId: "mod-css-fundamentals",
        moduleTitle: "Fundamentals of CSS",
        modulePosition: 2,
        title: "CSS Flexbox & Layouts | Cheat Sheet",
        duration: "30 mins",
        type: "cheatsheet",
        position: 3,
        contentHeading: "3. One-Dimensional Flexbox Layouts",
        contentDescription: "Flexbox aligns and distributes space along a single axis (row or column).",
        codeSnippet: {
          language: "CSS",
          code: `.navbar {
  display: flex;
  justify-content: space-between; /* Main Axis: Horizontal */
  align-items: center;            /* Cross Axis: Vertical */
  gap: 1.5rem;
  flex-wrap: wrap;
}

.nav-links {
  display: flex;
  gap: 1rem;
}`,
        },
        sections: [
          {
            title: "Flex Container Properties",
            bullets: [
              "justify-content: Distributes items along main axis (flex-start, center, space-between, space-around).",
              "align-items: Aligns items along cross axis (stretch, center, flex-start, flex-end).",
              "gap: Sets spacing directly between items without margin hacks.",
              "flex-wrap: wrap: Lets items drop to the next line when screen shrinks.",
            ],
          },
        ],
        questions: [
          {
            id: "q-fl-1",
            prompt: "Which property distributes items along the MAIN axis in a flex container?",
            options: [
              { id: "fl1", label: "align-items" },
              { id: "fl2", label: "justify-content" },
              { id: "fl3", label: "align-content" },
              { id: "fl4", label: "flex-direction" },
            ],
            correctIndex: 1,
            explanation: "justify-content aligns items along the main axis, while align-items aligns along the cross axis.",
          },
        ],
      },
      {
        id: "item-css-grid",
        moduleId: "mod-css-fundamentals",
        moduleTitle: "Fundamentals of CSS",
        modulePosition: 2,
        title: "CSS Grid Systems & Responsive Layouts | Cheat Sheet",
        duration: "30 mins",
        type: "cheatsheet",
        position: 4,
        contentHeading: "4. Two-Dimensional CSS Grid Layouts",
        contentDescription: "CSS Grid manages rows and columns simultaneously, ideal for complex dashboards and galleries.",
        codeSnippet: {
          language: "CSS",
          code: `.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`,
        },
        sections: [
          {
            title: "The auto-fit + minmax() Magic",
            explanation: "repeat(auto-fit, minmax(280px, 1fr)) creates responsive columns without needing a single media query. Columns never shrink below 280px and expand evenly to share available viewport space.",
          },
        ],
        questions: [
          {
            id: "q-gr-1",
            prompt: "What does 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))' do?",
            options: [
              { id: "g1", label: "Creates responsive columns that wrap automatically as the screen resizes without fixed breakpoints." },
              { id: "g2", label: "Forces elements to strictly remain 250px wide forever." },
              { id: "g3", label: "Creates exactly 1 row." },
            ],
            correctIndex: 0,
            explanation: "auto-fit with minmax() automatically calculates how many 250px+ columns fit in the container, stretching them to 1fr.",
          },
        ],
      },
      {
        id: "item-css-practice",
        moduleId: "mod-css-fundamentals",
        moduleTitle: "Fundamentals of CSS",
        modulePosition: 2,
        title: "Quiz: CSS Selectors, Box Model & Layouts",
        duration: "25 mins",
        type: "quiz",
        position: 5,
        contentHeading: "Knowledge Check: CSS Mastery",
        contentDescription: "Test your understanding of modern CSS architecture, cascade, flexbox, and grid.",
        questions: [
          {
            id: "qc-1",
            prompt: "What is the result of applying 'margin: 0 auto' to a block element with a set width?",
            options: [
              { id: "q1a", label: "It horizontally centers the element within its parent container." },
              { id: "q1b", label: "It removes all borders." },
              { id: "q1c", label: "It vertically centers the element." },
            ],
            correctIndex: 0,
            explanation: "margin: 0 auto divides the remaining horizontal space equally between left and right margins, centering the block.",
          },
          {
            id: "qc-2",
            prompt: "Which unit scales relative to the root <html> font-size (ideal for accessible typography)?",
            options: [
              { id: "q2a", label: "rem" },
              { id: "q2b", label: "em" },
              { id: "q2c", label: "px" },
              { id: "q2d", label: "vh" },
            ],
            correctIndex: 0,
            explanation: "rem (root em) is relative to the root <html> element's font-size, respecting browser accessibility font settings.",
          },
        ],
      },
      {
        id: "item-css-assignment",
        moduleId: "mod-css-fundamentals",
        moduleTitle: "Fundamentals of CSS",
        modulePosition: 2,
        title: "Course Assignment | Responsive Landing Page",
        duration: "60 mins",
        type: "assignment",
        position: 6,
        contentHeading: "Project: Modern Responsive Landing Page",
        contentDescription: "Style a complete responsive landing page with hero banner, feature grid, and pricing cards.",
        assignmentPrompt: {
          instructions: "Apply custom CSS to your HTML portfolio or landing page. Use CSS Custom Properties for theme tokens, implement a responsive navigation bar, and create a 3-card pricing grid with hover micro-animations.",
          deliverables: [
            "Root variables for brand colors and spacing tokens",
            "Mobile-first responsive media queries",
            "Smooth hover transitions on buttons and cards",
          ],
        },
      },
    ],
  },
  {
    id: "mod-js-fundamentals",
    title: "Fundamentals of JavaScript",
    position: 3,
    duration: "10 hours, 40 mins",
    description: "Write clean, modern ES6+ JavaScript. Master variables, functions, objects, DOM manipulation, events, and asynchronous programming.",
    items: [
      {
        id: "item-js-variables",
        moduleId: "mod-js-fundamentals",
        moduleTitle: "Fundamentals of JavaScript",
        modulePosition: 3,
        title: "Variables, Data Types & Scope | Cheat Sheet",
        duration: "30 mins",
        type: "cheatsheet",
        position: 1,
        contentHeading: "1. Modern JavaScript Variables & Primitive Types",
        contentDescription: "JavaScript is the programming language of the web. Modern ES6+ code relies on block-scoped declarations.",
        codeSnippet: {
          language: "JavaScript",
          code: `// const: Immutable binding (default choice)
const courseName = "Full Stack Web";
const maxScore = 100;

// let: Reassignable block-scoped variable
let currentScore = 85;
currentScore += 5; // Valid

// Data Types: String, Number, Boolean, Null, Undefined, Object
const student = {
  id: "std-01",
  name: "Hari",
  isActive: true,
  coursesEnrolled: ["HTML", "CSS", "JS"]
};`,
        },
        sections: [
          {
            title: "const vs let vs var",
            bullets: [
              "const: Block-scoped. Cannot be reassigned. Use by default for all variables.",
              "let: Block-scoped. Can be reassigned. Use when values change over time (e.g. counters, loops).",
              "var: Legacy function-scoped declaration with hoisting bugs. Avoid in modern code.",
            ],
          },
          {
            title: "Equality: === vs ==",
            explanation: "Always use strict equality (===) which checks both value and data type without silent type coercion.",
          },
        ],
        questions: [
          {
            id: "q-js-1",
            prompt: "What is the primary difference between 'const' and 'let' in JavaScript?",
            options: [
              { id: "js1", label: "'const' creates an immutable binding that cannot be reassigned; 'let' can be reassigned." },
              { id: "js2", label: "'const' is global, while 'let' is private." },
              { id: "js3", label: "'let' can only store numbers." },
            ],
            correctIndex: 0,
            explanation: "'const' bindings cannot be reassigned once initialized, while 'let' bindings can be freely reassigned within their block.",
          },
        ],
      },
      {
        id: "item-js-functions",
        moduleId: "mod-js-fundamentals",
        moduleTitle: "Fundamentals of JavaScript",
        modulePosition: 3,
        title: "Functions, Arrow Syntax & Control Flow | Cheat Sheet",
        duration: "30 mins",
        type: "cheatsheet",
        position: 2,
        contentHeading: "2. Functions & Modern Arrow Syntax",
        contentDescription: "Functions encapsulate reusable logic and can be passed as first-class citizens in JavaScript.",
        codeSnippet: {
          language: "JavaScript",
          code: `// Standard function declaration
function calculatePercentage(completed, total) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// Concise Arrow Function with implicit return
const isPassing = (score) => score >= 70;

// Arrow function with block body
const formatStudentBadge = (name, role) => {
  const prefix = role === "admin" ? "Staff" : "Learner";
  return \`\${prefix}: \${name.toUpperCase()}\`;
};`,
        },
        questions: [
          {
            id: "q-fn-1",
            prompt: "What does an arrow function with no curly braces (e.g. x => x * 2) return?",
            options: [
              { id: "fn1", label: "It implicitly returns the evaluated expression value." },
              { id: "fn2", label: "It returns undefined." },
              { id: "fn3", label: "It throws a syntax error." },
            ],
            correctIndex: 0,
            explanation: "When concise body syntax is used without curly braces, arrow functions automatically return the evaluation of that single expression.",
          },
        ],
      },
      {
        id: "item-js-arrays",
        moduleId: "mod-js-fundamentals",
        moduleTitle: "Fundamentals of JavaScript",
        modulePosition: 3,
        title: "Arrays, Objects & ES6+ Methods | Cheat Sheet",
        duration: "35 mins",
        type: "cheatsheet",
        position: 3,
        contentHeading: "3. Higher-Order Array Methods & Destructuring",
        contentDescription: "Transform, filter, and inspect collections immutably without manual for loops.",
        codeSnippet: {
          language: "JavaScript",
          code: `const lessons = [
  { id: 1, title: "HTML Basics", isDone: true, time: 20 },
  { id: 2, title: "CSS Flexbox", isDone: false, time: 30 },
  { id: 3, title: "JS Objects", isDone: true, time: 25 }
];

// .filter() creates a new array of matching items
const completed = lessons.filter(l => l.isDone);

// .map() creates a new array of transformed values
const titles = lessons.map(l => l.title);

// Destructuring & Spread
const [firstLesson, ...otherLessons] = lessons;
const updated = { ...firstLesson, isDone: false };`,
        },
        questions: [
          {
            id: "q-arr-1",
            prompt: "What does Array.prototype.map() do to the original array?",
            options: [
              { id: "ar1", label: "It leaves the original array untouched and returns a new transformed array." },
              { id: "ar2", label: "It mutates and overwrites the original array." },
              { id: "ar3", label: "It deletes items that don't match." },
            ],
            correctIndex: 0,
            explanation: "map() is pure and immutable: it does not alter the source array, returning a fresh array of transformed items.",
          },
        ],
      },
      {
        id: "item-js-dom",
        moduleId: "mod-js-fundamentals",
        moduleTitle: "Fundamentals of JavaScript",
        modulePosition: 3,
        title: "DOM Manipulation & Event Handling | Cheat Sheet",
        duration: "35 mins",
        type: "cheatsheet",
        position: 4,
        contentHeading: "4. Interacting with the DOM Tree",
        contentDescription: "Select elements, listen to user clicks, and update classes reactively.",
        codeSnippet: {
          language: "JavaScript",
          code: `// Selecting elements
const submitBtn = document.querySelector("#submit-btn");
const taskInput = document.querySelector("#task-input");
const listContainer = document.querySelector(".todo-list");

// Listening for click event
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("task-item");
  listContainer.appendChild(li);

  taskInput.value = "";
});`,
        },
        questions: [
          {
            id: "q-dom-1",
            prompt: "Why should you call 'event.preventDefault()' on form submit events?",
            options: [
              { id: "d1", label: "To stop the browser from automatically refreshing/reloading the page on form submission." },
              { id: "d2", label: "To clear the database." },
              { id: "d3", label: "To prevent CSS styles from loading." },
            ],
            correctIndex: 0,
            explanation: "Calling event.preventDefault() intercepts the default browser action (reloading the entire page on submit), allowing your JavaScript to handle the submission smoothly.",
          },
        ],
      },
      {
        id: "item-js-quiz",
        moduleId: "mod-js-fundamentals",
        moduleTitle: "Fundamentals of JavaScript",
        modulePosition: 3,
        title: "Quiz & Practice: JavaScript Core Logic",
        duration: "25 mins",
        type: "quiz",
        position: 5,
        contentHeading: "Knowledge Check: JavaScript Core",
        contentDescription: "Verify your understanding of JavaScript types, arrays, scope, and asynchronous execution.",
        questions: [
          {
            id: "q-j-1",
            prompt: "What will 'typeof []' return in JavaScript?",
            options: [
              { id: "t1", label: "'object'" },
              { id: "t2", label: "'array'" },
              { id: "t3", label: "'list'" },
            ],
            correctIndex: 0,
            explanation: "In JavaScript, arrays are technically specialized objects. To check if a value is an array, use Array.isArray(value).",
          },
          {
            id: "q-j-2",
            prompt: "Which keyword creates a Promise that resolves when an asynchronous operation completes?",
            options: [
              { id: "t2a", label: "async / await" },
              { id: "t2b", label: "loop" },
              { id: "t2c", label: "defer" },
            ],
            correctIndex: 0,
            explanation: "async functions always return a Promise, and the await keyword pauses execution until the Promise resolves.",
          },
        ],
      },
      {
        id: "item-js-assignment",
        moduleId: "mod-js-fundamentals",
        moduleTitle: "Fundamentals of JavaScript",
        modulePosition: 3,
        title: "Course Assignment | Interactive Task & Habit Tracker",
        duration: "60 mins",
        type: "assignment",
        position: 6,
        contentHeading: "Project: Dynamic Task & Habit Tracker",
        contentDescription: "Create a fully interactive web app with item addition, completion toggle, filter tabs, and localStorage persistence.",
        assignmentPrompt: {
          instructions: "Build a single-page interactive task application. Users should be able to type a task, press Enter or click Add, mark tasks as complete, filter by Active/Completed, and persist their tasks in window.localStorage.",
          deliverables: [
            "Event listener for form submission and item deletion",
            "Dynamic DOM creation using createElement or template literals",
            "localStorage sync to maintain state on page reload",
          ],
        },
      },
    ],
  },
  {
    id: "mod-react-essentials",
    title: "Frontend Foundations & React",
    position: 4,
    duration: "9 hours, 15 mins",
    description: "Build robust single-page applications with React. Components, JSX, props, state hooks, effect lifecycles, and context.",
    items: [
      {
        id: "item-react-components",
        moduleId: "mod-react-essentials",
        moduleTitle: "Frontend Foundations & React",
        modulePosition: 4,
        title: "React Components & JSX Foundations | Cheat Sheet",
        duration: "35 mins",
        type: "cheatsheet",
        position: 1,
        contentHeading: "1. Thinking in React Components",
        contentDescription: "React builds user interfaces out of reusable, declarative functions called components that return JSX.",
        codeSnippet: {
          language: "JavaScript",
          code: `// Child component with typed props
export function LessonBadge({ title, duration, isComplete }) {
  return (
    <div className={\`badge \${isComplete ? "done" : "pending"}\`}>
      <h3>{title}</h3>
      <span>{duration}</span>
    </div>
  );
}

// Parent container
export function CourseList({ lessons }) {
  return (
    <section className="courses">
      {lessons.map(l => (
        <LessonBadge 
          key={l.id} 
          title={l.title} 
          duration={l.duration} 
          isComplete={l.isComplete} 
        />
      ))}
    </section>
  );
}`,
        },
        questions: [
          {
            id: "q-r-1",
            prompt: "Why must you provide a unique 'key' prop when rendering lists in React?",
            options: [
              { id: "rk1", label: "To help React's virtual DOM identify which items changed, were added, or were removed efficiently." },
              { id: "rk2", label: "Keys are required by the CSS engine to paint colors." },
              { id: "rk3", label: "Keys automatically encrypt student data." },
            ],
            correctIndex: 0,
            explanation: "The key prop gives elements a stable identity inside React's reconciler so it re-renders only modified list items rather than re-creating the entire list.",
          },
        ],
      },
      {
        id: "item-react-state",
        moduleId: "mod-react-essentials",
        moduleTitle: "Frontend Foundations & React",
        modulePosition: 4,
        title: "React State & useState Hook | Cheat Sheet",
        duration: "35 mins",
        type: "cheatsheet",
        position: 2,
        contentHeading: "2. Component Memory with useState",
        contentDescription: "State stores dynamic values that trigger re-rendering when updated.",
        codeSnippet: {
          language: "JavaScript",
          code: `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  // Functional update for predictable state transitions
  const increment = () => setCount(prev => prev + 1);

  return (
    <button onClick={increment}>
      Completed Lessons: {count}
    </button>
  );
}`,
        },
        questions: [
          {
            id: "q-rs-1",
            prompt: "Why should you NEVER mutate state variables directly (e.g. count = 5)?",
            options: [
              { id: "rs1", label: "React will not detect direct mutations and will not trigger a re-render of the component." },
              { id: "rs2", label: "It crashes the browser immediately." },
              { id: "rs3", label: "Direct mutation only works in TypeScript." },
            ],
            correctIndex: 0,
            explanation: "Calling the state setter function (e.g. setCount) signals React that state changed and schedules a UI re-render. Direct mutation skips this trigger.",
          },
        ],
      },
      {
        id: "item-react-quiz",
        moduleId: "mod-react-essentials",
        moduleTitle: "Frontend Foundations & React",
        modulePosition: 4,
        title: "Quiz: React State & Lifecycle Rules",
        duration: "25 mins",
        type: "quiz",
        position: 3,
        contentHeading: "Knowledge Check: React Mastery",
        contentDescription: "Test your understanding of component re-renders, hook rules, and props flow.",
        questions: [
          {
            id: "qr-1",
            prompt: "What is the result of passing an empty dependency array [] to useEffect?",
            options: [
              { id: "qra", label: "The effect runs once when the component mounts and cleans up when it unmounts." },
              { id: "qrb", label: "The effect runs on every single re-render." },
              { id: "qrc", label: "The effect never executes." },
            ],
            correctIndex: 0,
            explanation: "An empty dependency array [] tells React that the effect doesn't depend on any props or state, so it runs only once after the initial render.",
          },
        ],
      },
      {
        id: "item-react-assignment",
        moduleId: "mod-react-essentials",
        moduleTitle: "Frontend Foundations & React",
        modulePosition: 4,
        title: "Course Assignment | Interactive Course Dashboard",
        duration: "75 mins",
        type: "assignment",
        position: 4,
        contentHeading: "Project: Modern Learning Dashboard",
        contentDescription: "Build a modular React application featuring dynamic course cards, filters, and progress tracking.",
        assignmentPrompt: {
          instructions: "Create a React component library featuring a Header, CourseList, and FilterBar. Manage active filters with useState and provide smooth interactive feedback.",
          deliverables: [
            "Reusable child components receiving typed props",
            "Stateful filtering by topic (HTML, CSS, JS)",
            "Clean code splitting and error boundaries",
          ],
        },
      },
    ],
  },
  {
    id: "mod-nodejs-apis",
    title: "Node.js & Express APIs",
    position: 5,
    duration: "8 hours, 50 mins",
    description: "Build robust backend web servers, design RESTful APIs, manage middleware, parse JSON payloads, and handle errors.",
    items: [
      {
        id: "item-node-runtime",
        moduleId: "mod-nodejs-apis",
        moduleTitle: "Node.js & Express APIs",
        modulePosition: 5,
        title: "Node.js Runtime & Express Server Setup | Cheat Sheet",
        duration: "30 mins",
        type: "cheatsheet",
        position: 1,
        contentHeading: "1. Node.js & Express Fundamentals",
        contentDescription: "Node.js executes JavaScript on the server. Express provides a minimalist HTTP web framework.",
        codeSnippet: {
          language: "JavaScript",
          code: `import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Built-in JSON body parser middleware
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Server listening on http://localhost:\${PORT}\`);
});`,
        },
        questions: [
          {
            id: "qn-1",
            prompt: "What does 'app.use(express.json())' do in an Express application?",
            options: [
              { id: "na", label: "It parses incoming HTTP requests with JSON payloads and populates req.body." },
              { id: "nb", label: "It downloads JSON files from the internet." },
              { id: "nc", label: "It encrypts passwords with bcrypt." },
            ],
            correctIndex: 0,
            explanation: "express.json() is middleware that inspects requests with Content-Type: application/json, parses the payload, and attaches it as a JavaScript object on req.body.",
          },
        ],
      },
      {
        id: "item-node-rest",
        moduleId: "mod-nodejs-apis",
        moduleTitle: "Node.js & Express APIs",
        modulePosition: 5,
        title: "REST API Design & HTTP Verbs | Cheat Sheet",
        duration: "35 mins",
        type: "cheatsheet",
        position: 2,
        contentHeading: "2. Designing RESTful Endpoints",
        contentDescription: "Standard HTTP methods and status codes for scalable APIs.",
        codeSnippet: {
          language: "JavaScript",
          code: `// GET: Read all items
app.get('/api/courses', (req, res) => {
  res.status(200).json({ data: courses });
});

// POST: Create a new resource
app.post('/api/courses', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  res.status(201).json({ id: "c-101", title });
});

// DELETE: Remove a resource
app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  res.status(204).send();
});`,
        },
        questions: [
          {
            id: "qr-2",
            prompt: "Which HTTP status code should be returned after successfully creating a new resource?",
            options: [
              { id: "r201", label: "201 Created" },
              { id: "r200", label: "200 OK" },
              { id: "r404", label: "404 Not Found" },
              { id: "r500", label: "500 Server Error" },
            ],
            correctIndex: 0,
            explanation: "201 Created explicitly tells the client that the request succeeded and a new resource record was generated.",
          },
        ],
      },
      {
        id: "item-node-quiz",
        moduleId: "mod-nodejs-apis",
        moduleTitle: "Node.js & Express APIs",
        modulePosition: 5,
        title: "Quiz: REST APIs, Status Codes & Express",
        duration: "25 mins",
        type: "quiz",
        position: 3,
        contentHeading: "Knowledge Check: Backend APIs",
        contentDescription: "Test your understanding of middleware execution, status codes, and route parameters.",
        questions: [
          {
            id: "q-nd-1",
            prompt: "What must you invoke in Express middleware to pass control to the next handler?",
            options: [
              { id: "nx", label: "next()" },
              { id: "ny", label: "res.continue()" },
              { id: "nz", label: "return true" },
            ],
            correctIndex: 0,
            explanation: "Calling next() tells Express to move to the subsequent middleware or route handler in the execution pipeline.",
          },
        ],
      },
      {
        id: "item-node-assignment",
        moduleId: "mod-nodejs-apis",
        moduleTitle: "Node.js & Express APIs",
        modulePosition: 5,
        title: "Course Assignment | Build a RESTful Notes API",
        duration: "80 mins",
        type: "assignment",
        position: 4,
        contentHeading: "Project: Full CRUD API Server",
        contentDescription: "Build a complete Express REST API supporting Create, Read, Update, and Delete operations with request validation.",
        assignmentPrompt: {
          instructions: "Create an Express server with routes for /api/notes. Validate that title and content exist before inserting, return appropriate status codes (200, 201, 400, 404), and include a global error handler.",
          deliverables: [
            "GET, POST, PUT, DELETE endpoints for notes",
            "Express JSON body parser integration",
            "Structured error response JSON format",
          ],
        },
      },
    ],
  },
  {
    id: "mod-database-sql",
    title: "Database Fundamentals & SQL",
    position: 6,
    duration: "7 hours, 20 mins",
    description: "Design relational schemas, write performant SQL queries, master joins, indexes, foreign keys, and Row Level Security (RLS).",
    items: [
      {
        id: "item-sql-schema",
        moduleId: "mod-database-sql",
        moduleTitle: "Database Fundamentals & SQL",
        modulePosition: 6,
        title: "Relational Modeling & Schema Design | Cheat Sheet",
        duration: "35 mins",
        type: "cheatsheet",
        position: 1,
        contentHeading: "1. Relational Databases & Schema Constraints",
        contentDescription: "Relational databases store records in tables with strict data types, primary keys, and foreign key relationships.",
        codeSnippet: {
          language: "SQL",
          code: `CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  min_progress_pct INT DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  created_at TIMESTAMPTZ DEFAULT now()
);`,
        },
        questions: [
          {
            id: "q-sql-1",
            prompt: "What does 'ON DELETE CASCADE' on a foreign key do?",
            options: [
              { id: "sqc", label: "When the referenced parent row is deleted, all dependent child rows are automatically deleted." },
              { id: "sqd", label: "It stops any record from ever being deleted." },
              { id: "sqe", label: "It encrypts deleted records." },
            ],
            correctIndex: 0,
            explanation: "ON DELETE CASCADE guarantees referential integrity by automatically cleaning up child rows when the parent record is deleted.",
          },
        ],
      },
      {
        id: "item-sql-queries",
        moduleId: "mod-database-sql",
        moduleTitle: "Database Fundamentals & SQL",
        modulePosition: 6,
        title: "SQL Queries, Filtering & Joins | Cheat Sheet",
        duration: "35 mins",
        type: "cheatsheet",
        position: 2,
        contentHeading: "2. SELECT Queries & Relational Joins",
        contentDescription: "Retrieve, filter, and combine records across multiple related tables.",
        codeSnippet: {
          language: "SQL",
          code: `-- INNER JOIN: Students enrolled in courses
SELECT 
  p.full_name AS student_name,
  c.title AS course_title,
  e.status
FROM enrollments e
JOIN profiles p ON p.id = e.student_id
JOIN courses c ON c.id = e.course_id
WHERE e.status = 'active'
ORDER BY p.full_name ASC;

-- Aggregations with GROUP BY and HAVING
SELECT 
  c.title,
  COUNT(e.id) AS total_enrolled
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.title
HAVING COUNT(e.id) > 0;`,
        },
        questions: [
          {
            id: "q-sql-2",
            prompt: "What records does an INNER JOIN return?",
            options: [
              { id: "j1", label: "Only records that have matching values in both joined tables." },
              { id: "j2", label: "All records from the left table even if no match exists." },
              { id: "j3", label: "Every possible combination of rows (Cartesian product)." },
            ],
            correctIndex: 0,
            explanation: "An INNER JOIN matches records across tables based on the ON condition and excludes rows with no match in either table.",
          },
        ],
      },
      {
        id: "item-sql-quiz",
        moduleId: "mod-database-sql",
        moduleTitle: "Database Fundamentals & SQL",
        modulePosition: 6,
        title: "Quiz: SQL Joins, Constraints & Schemas",
        duration: "25 mins",
        type: "quiz",
        position: 3,
        contentHeading: "Knowledge Check: SQL & Databases",
        contentDescription: "Verify your ability to design tables, write performant filters, and join relationships.",
        questions: [
          {
            id: "q-sq-q1",
            prompt: "When should you use HAVING instead of WHERE in a SQL statement?",
            options: [
              { id: "ha", label: "To filter aggregated groups after GROUP BY has calculated (e.g. HAVING COUNT(*) > 5)." },
              { id: "hb", label: "To filter raw individual rows before grouping." },
              { id: "hc", label: "HAVING and WHERE are completely identical." },
            ],
            correctIndex: 0,
            explanation: "WHERE filters individual table rows prior to aggregation, while HAVING filters the aggregated summary groups produced by GROUP BY.",
          },
        ],
      },
      {
        id: "item-sql-assignment",
        moduleId: "mod-database-sql",
        moduleTitle: "Database Fundamentals & SQL",
        modulePosition: 6,
        title: "Course Assignment | Production Database Schema",
        duration: "60 mins",
        type: "assignment",
        position: 4,
        contentHeading: "Project: Production Database Schema",
        contentDescription: "Design a relational schema with tables, constraints, foreign keys, and indexes for an e-commerce or LMS application.",
        assignmentPrompt: {
          instructions: "Write a SQL migration script creating tables for users, orders, and order_items. Include foreign key constraints with ON DELETE CASCADE, unique email indexes, and check constraints on price.",
          deliverables: [
            "CREATE TABLE statements with primary and foreign keys",
            "CREATE INDEX statements on foreign key columns",
            "Sample INSERT and SELECT queries verifying relationships",
          ],
        },
      },
    ],
  },
];

export function findCurriculumItem(itemId: string): { item: CurriculumItem; module: CurriculumModule; index: number } | null {
  for (const mod of FULL_STACK_MODULES) {
    const itemIndex = mod.items.findIndex(it => it.id === itemId);
    if (itemIndex !== -1) {
      return { item: mod.items[itemIndex], module: mod, index: itemIndex };
    }
  }
  return null;
}
