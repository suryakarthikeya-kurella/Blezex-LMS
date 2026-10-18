import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 1: REACT FOUNDATIONS
// Lessons 100 - 103 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 100: WHAT REACT IS AND PROJECT SETUP
const lesson100: CurriculumItem = {
  id: "item-react-100-what-is-react-setup",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-foundations",
  moduleTitle: "Module 1: React Foundations",
  modulePosition: 1,
  title: "What React Is and Project Setup",
  duration: "35 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "What React Is and Project Setup",
  contentDescription: "Understand the core architecture of React, declarative vs imperative UI models, Virtual DOM reconciliation, and setting up a modern, high-speed development environment using Vite.",
  codeSnippet: {
    language: "bash",
    code: `# Step 1: Create a modern React application powered by Vite
npm create vite@latest my-react-app -- --template react

# Step 2: Navigate into the project folder
cd my-react-app

# Step 3: Install all required project dependencies (react, react-dom)
npm install

# Step 4: Launch the blazing-fast local development server
npm run dev`
  },
  sections: [
    {
      title: "Core Concept: The Restaurant Blueprint vs Manual Bricklaying",
      explanation: "Imagine you want to update the seating arrangement of a busy dining hall. In traditional vanilla JavaScript (imperative), you run around the room moving each chair by hand, checking each table, and risking knocking glasses over. In React (declarative), you simply draw a blueprint of what the room should look like right now. React's intelligent reconciliation engine (the Virtual DOM) compares your blueprint to the actual room and moves only the two chairs that actually changed positions. React does not touch a single table that didn't need to move!",
      bullets: [
        "Declarative Paradigm: You describe WHAT the user interface should look like for a given state.",
        "Virtual DOM Reconciliation: React maintains a lightweight copy of the UI in memory, calculates the difference ('diff'), and updates the real browser DOM with minimal reflows.",
        "Component-Based: The UI is composed of independent, reusable, self-contained bricks called components."
      ],
      diagram: "+-------------------------------------------------------------------+\n|                     THE REACT DECLARATIVE LOOP                    |\n+-------------------------------------------------------------------+\n| [Component State & Props]                                         |\n|          |                                                        |\n|          v                                                        |\n| [1. Render Blueprint]: Component returns JSX (Virtual DOM node)   |\n|          |                                                        |\n|          v                                                        |\n| [2. Reconciliation (Diffing)]: Compares New VDOM vs Old VDOM      |\n|          |                                                        |\n|          v                                                        |\n| [3. Commit]: Surgically updates ONLY the changed real DOM elements|\n+-------------------------------------------------------------------+"
    },
    {
      title: "Technical Definition & Core Purpose",
      explanation: "React is an open-source JavaScript library developed by Meta (Facebook) in 2013 for building interactive user interfaces from modular components. Components accept arbitrary inputs called 'props' and maintain internal data called 'state'. React is not a full-stack framework, backend engine, or database—it is strictly the 'View' layer of modern web engineering.",
      table: {
        headers: ["Characteristic", "Traditional Imperative DOM (Vanilla JS)", "Declarative React (Vite Setup)"],
        rows: [
          ["UI Updates", "Manual DOM mutations (document.getElementById, appendChild)", "Automatic re-render when state changes"],
          ["Performance", "Frequent browser reflows and repaints", "Virtual DOM batching & minimal DOM patching"],
          ["Code Structure", "Scattered event listeners and DOM queries", "Self-contained reusable components"],
          ["Tooling", "Manual script tags or complex bundlers", "Vite with instant Hot Module Replacement (HMR)"]
        ]
      }
    },
    {
      title: "Concept in Depth: Inputs, Rules & Edge Cases",
      explanation: "React components are pure functions with respect to their props. A component must always return a valid React node (JSX element, string, number, fragment, or null). When state or props change, React schedules a re-render. Key edge cases include handling missing props, empty arrays, null values, and massive data sets without triggering infinite render loops.",
      bullets: [
        "Rule 1: Never manipulate the real browser DOM directly behind React's back using document.querySelector or innerHTML.",
        "Rule 2: State must remain minimal and non-redundant. Never duplicate values that can be derived during render.",
        "Boundary Check: When an input prop is undefined or null, provide safe default values or fallback UI."
      ]
    },
    {
      title: "History, Context & Real-World Application",
      explanation: "Before React, single-page applications suffered from 'spaghetti code' where multiple event handlers mutated different parts of the same DOM nodes, causing desynchronization bugs. React introduced unidirectional data flow (data flows down, events flow up). In production platforms like Netflix, Airbnb, and BlezeX, React powers complex dashboards with loading, loaded, empty, and error states seamlessly.",
      bullets: [
        "2013: Open-sourced by Jordan Walke at Facebook.",
        "2015: Introduced React Native for cross-platform mobile apps.",
        "2018: Introduced React Hooks (v16.8), enabling stateful functional components without classes.",
        "Modern: Vite replaced create-react-app as the standard build tool due to its native ES module dev server."
      ]
    },
    {
      title: "Line-by-Line Breakdown of Project Setup Commands",
      explanation: "Understanding each command in the modern React toolchain:",
      bullets: [
        "`npm create vite@latest my-react-app -- --template react`: Invokes the Vite scaffolding tool to generate a fresh React project with modern build configuration.",
        "`cd my-react-app`: Changes the terminal's working directory into the newly created project folder.",
        "`npm install`: Downloads and installs `react`, `react-dom`, and build plugins into `node_modules/` based on `package.json`.",
        "`npm run dev`: Boots the local Vite development server on `localhost:5173` with Hot Module Replacement (HMR)."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Crucial mistakes beginners make when starting with React:",
      bullets: [
        "Direct DOM Manipulation: Using `document.getElementById('title').innerText = 'New'` instead of updating React state.",
        "Using Create-React-App in modern projects: CRA is deprecated and slow. Always choose Vite or Next.js.",
        "Confusing React with Backend: React runs client-side in the browser; it cannot directly query your PostgreSQL or MongoDB database without an API.",
        "Missing node_modules: Forgetting to run `npm install` after cloning a project repository from Git."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Initialize a new React project using Vite on your local machine. Open `src/App.jsx` and inspect the entry point in `src/main.jsx`. Identify where `ReactDOM.createRoot` connects your root component to the `<div id='root'>` in `index.html`. Add an `<h1>` with your name and verify that Vite hot-reloads instantly."
    }
  ],
  questions: [
    {
      id: "q-react-100-1",
      prompt: "What is the primary role of React in modern web development?",
      options: [
        { id: "a", label: "It is a relational database management system for persistent storage" },
        { id: "b", label: "It is a JavaScript library for building user interfaces using declarative components" },
        { id: "c", label: "It is a server-side operating system designed for cloud hosting" },
        { id: "d", label: "It is a CSS preprocessor used strictly for styling HTML layouts" }
      ],
      correctAnswer: "b",
      explanation: "React is a client-side JavaScript library whose primary purpose is rendering and synchronizing user interfaces through reusable, declarative components."
    },
    {
      id: "q-react-100-2",
      prompt: "How does the Virtual DOM enhance web application performance?",
      options: [
        { id: "a", label: "It completely bypasses JavaScript and writes machine code directly to the CPU" },
        { id: "b", label: "It keeps an in-memory representation of the UI, calculates diffs, and updates only changed DOM nodes" },
        { id: "c", label: "It removes the need for HTML and CSS in web browsers" },
        { id: "d", label: "It stores all application data in the browser's cookies automatically" }
      ],
      correctAnswer: "b",
      explanation: "The Virtual DOM calculates lightweight in-memory differences (reconciliation) and updates only the necessary browser DOM nodes, preventing expensive reflows."
    },
    {
      id: "q-react-100-3",
      prompt: "What is the key difference between imperative and declarative programming in UI development?",
      options: [
        { id: "a", label: "Imperative describes WHAT the UI should look like; declarative specifies step-by-step HOW to mutate nodes" },
        { id: "b", label: "Declarative describes WHAT the UI should look like for a given state; imperative provides step-by-step instructions on HOW to change the DOM" },
        { id: "c", label: "Declarative code can only run on servers; imperative code runs in browsers" },
        { id: "d", label: "There is no difference; they are identical terms in JavaScript" }
      ],
      correctAnswer: "b",
      explanation: "In declarative React, UI = fn(state): you specify what the UI should display, and React handles the step-by-step mutations."
    },
    {
      id: "q-react-100-4",
      prompt: "Which modern tool is recommended for rapidly scaffolding a React development environment?",
      options: [
        { id: "a", label: "Apache Ant" },
        { id: "b", label: "Vite" },
        { id: "c", label: "Subversion" },
        { id: "d", label: "jQuery Mobile" }
      ],
      correctAnswer: "b",
      explanation: "Vite is the modern industry standard for React development due to its lightning-fast ES-module dev server and optimized Rollup production builds."
    },
    {
      id: "q-react-100-5",
      prompt: "What does the command 'npm run dev' do in a Vite React project?",
      options: [
        { id: "a", label: "Builds a minified production bundle for deployment" },
        { id: "b", label: "Starts a local development server with Hot Module Replacement (HMR)" },
        { id: "c", label: "Deletes the node_modules folder and reinstalls dependencies" },
        { id: "d", label: "Uploads the codebase to GitHub automatically" }
      ],
      correctAnswer: "b",
      explanation: "'npm run dev' executes the Vite development server script, enabling live preview and instant Hot Module Replacement during development."
    },
    {
      id: "q-react-100-6",
      prompt: "Where does React attach the top-level application component to the real browser DOM in a standard project?",
      options: [
        { id: "a", label: "Inside the `<head>` element using a `<meta>` tag" },
        { id: "b", label: "Inside the `<div id='root'>` element defined in index.html via ReactDOM.createRoot" },
        { id: "c", label: "Inside the browser's localStorage file system" },
        { id: "d", label: "Directly into the user's desktop registry" }
      ],
      correctAnswer: "b",
      explanation: "`ReactDOM.createRoot(document.getElementById('root')).render(<App />)` mounts the root React component tree into the `#root` container in `index.html`."
    },
    {
      id: "q-react-100-7",
      prompt: "Why should developers avoid directly mutating the DOM (e.g. document.querySelector) in React applications?",
      options: [
        { id: "a", label: "Because the browser will immediately crash and delete the operating system" },
        { id: "b", label: "Because it bypasses React's Virtual DOM state tracking, causing desynchronization bugs and UI glitches" },
        { id: "c", label: "Because vanilla JavaScript is forbidden by international web standards" },
        { id: "d", label: "Because direct DOM manipulation runs slower than network HTTP requests" }
      ],
      correctAnswer: "b",
      explanation: "Direct DOM mutations hide changes from React's reconciliation engine, causing state and UI to fall out of sync."
    },
    {
      id: "q-react-100-8",
      prompt: "What is the primary role of 'react-dom' compared to 'react'?",
      options: [
        { id: "a", label: "'react' defines core component and state APIs; 'react-dom' is the renderer that bridges React with browser DOM elements" },
        { id: "b", label: "'react-dom' is for mobile iOS apps; 'react' is for web servers" },
        { id: "c", label: "'react-dom' is the database driver for MongoDB" },
        { id: "d", label: "They are completely unrelated libraries created by rival companies" }
      ],
      correctAnswer: "a",
      explanation: "'react' contains general UI component logic, while 'react-dom' provides the platform-specific renderer for web browsers."
    },
    {
      id: "q-react-100-9",
      prompt: "Which file lists the project's dependencies, scripts, and package metadata in a React project?",
      options: [
        { id: "a", label: "vite.svg" },
        { id: "b", label: "package.json" },
        { id: "c", label: "index.html" },
        { id: "d", label: "main.jsx.bak" }
      ],
      correctAnswer: "b",
      explanation: "`package.json` is the manifest file that defines dependencies, scripts, and configuration for Node.js and frontend projects."
    },
    {
      id: "q-react-100-10",
      prompt: "What happens if you run 'npm run dev' without first running 'npm install' on a freshly cloned project?",
      options: [
        { id: "a", label: "The browser will automatically download the packages over Bluetooth" },
        { id: "b", label: "The command will fail because the required dependencies in node_modules do not exist yet" },
        { id: "c", label: "The project will convert automatically to vanilla HTML" },
        { id: "d", label: "It will deploy the website directly to production" }
      ],
      correctAnswer: "b",
      explanation: "`npm install` must be executed first to populate the `node_modules/` folder with Vite, React, and build tools."
    }
  ]
};

// LESSON 101: JSX
const lesson101: CurriculumItem = {
  id: "item-react-101-jsx",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-foundations",
  moduleTitle: "Module 1: React Foundations",
  modulePosition: 1,
  title: "JSX (JavaScript XML)",
  duration: "35 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "JSX (JavaScript XML)",
  contentDescription: "Master JSX syntax rules: HTML-like tags in JavaScript, expression embedding with curly braces, className vs class, Fragments, and compile-time transformation into React.createElement.",
  codeSnippet: {
    language: "jsx",
    code: `// A clean, expressive React Component demonstrating JSX rules
import React from 'react';

function UserGreeting({ username, unreadCount }) {
  const formattedDate = new Date().toLocaleDateString();

  return (
    // Rule 1: Must return a single root element or Fragment (<>...</>)
    <section className="greeting-card">
      {/* Rule 2: JavaScript expressions embedded within single curly braces */}
      <h1 className="title">Hello, {username}!</h1>
      <p className="subtitle">Today is {formattedDate}.</p>

      {/* Rule 3: Conditional rendering with JavaScript operators */}
      {unreadCount > 0 ? (
        <span className="badge badge-urgent">You have {unreadCount} new notifications</span>
      ) : (
        <span className="badge badge-neutral">All caught up!</span>
      )}
    </section>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: HTML and JavaScript Getting Married",
      explanation: "In old-school web development, HTML lived in one room (`index.html`) and JavaScript lived in another (`script.js`). Every time JavaScript wanted to show a username, it had to yell across the hallway through clunky DOM selectors. JSX brings them into the same room! JSX lets you write HTML markup directly inside your JavaScript functions. But beware: JSX is NOT HTML; it is syntactic sugar for JavaScript objects!",
      bullets: [
        "JSX = JavaScript XML: An extension syntax for JavaScript.",
        "Under the Hood: Babel or Vite transforms `<h1>Hello</h1>` into `React.createElement('h1', null, 'Hello')`.",
        "XSS Protection: JSX automatically escapes strings before rendering, preventing malicious script injection."
      ]
    },
    {
      title: "The 4 Fundamental Rules of JSX",
      explanation: "Every beginner must memorize these 4 unbreakable rules of JSX syntax:",
      table: {
        headers: ["JSX Rule", "Explanation", "Example / Remedy"],
        rows: [
          ["1. Single Root Element", "Components must return one top-level element", "Wrap siblings in `<React.Fragment>` or `<> ... </>`"],
          ["2. Close Every Tag", "Self-closing tags are mandatory for void elements", "`<img src='...' />`, `<input type='text' />`, `<br />`"],
          ["3. camelCase Attributes", "Reserved words in JS cannot be used as HTML attributes", "`className` instead of `class`, `htmlFor` instead of `for`"],
          ["4. Curly Braces for JS", "Use `{}` to embed any valid JavaScript expression", "`<h1>{user.name.toUpperCase()}</h1>`"]
        ]
      }
    },
    {
      title: "Concept in Depth: Expressions vs Statements in JSX",
      explanation: "Inside JSX curly braces `{ ... }`, you can write any JavaScript *expression* (something that evaluates to a value). You *cannot* write JavaScript *statements* such as `if`, `for`, `while`, or `switch` inside JSX tags.",
      bullets: [
        "Allowed inside `{}`: `user.age >= 18 ? 'Adult' : 'Minor'`, `items.length`, `formatCurrency(price)`, `calcTotal()`",
        "Forbidden inside `{}`: `if (x) { ... }`, `for (let i = 0; i < 10; i++)`, `const a = 1`",
        "Alternative for conditions: Use ternary operator `condition ? <A/> : <B/>` or logical AND `isLoggedIn && <Dashboard/>`."
      ]
    },
    {
      title: "Real-World Application: Safe Dynamic Rendering",
      explanation: "In enterprise applications, data received from third-party APIs can contain untrusted user input. Because JSX escapes strings automatically, an attacker cannot inject `<script>stealCookies()</script>` into a card title. React safely renders it as harmless text on screen.",
      bullets: [
        "Default Escaping: Text rendered in `{userBio}` is sanitized automatically.",
        "Dangerous HTML: If raw HTML must be rendered, React forces the explicit use of `dangerouslySetInnerHTML={{ __html: htmlString }}`, alerting code reviewers to potential XSS vulnerabilities."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Watch out for these common beginner mistakes:",
      bullets: [
        "Using `class` instead of `className`: Causes React console warnings because `class` is a reserved keyword in JavaScript.",
        "Returning sibling elements without a parent or Fragment: Throws `Adjacent JSX elements must be wrapped in an enclosing tag`.",
        "Forgetting self-closing slashes: Writing `<img src='pic.jpg'>` will fail compilation in JSX.",
        "Putting statements inside `{}`: Trying to write `<h1>{if (online) 'Active'}</h1>` fails syntax parsing."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Convert a traditional HTML snippet containing an `<input>`, `<label for='email'>`, `<div class='card'>`, and an unclosed `<img>` tag into valid JSX. Wrap them in a React Fragment `<> ... </>` and embed dynamic variables for `label`, `placeholder`, and `userAvatarUrl`."
    }
  ],
  questions: [
    {
      id: "q-react-101-1",
      prompt: "What does JSX stand for?",
      options: [
        { id: "a", label: "Java Syntax Extension" },
        { id: "b", label: "JavaScript XML" },
        { id: "c", label: "JSON Standard XML" },
        { id: "d", label: "JavaScript Xerox Module" }
      ],
      correctAnswer: "b",
      explanation: "JSX stands for JavaScript XML, a syntax extension for JavaScript that lets you write HTML-like markup inside component functions."
    },
    {
      id: "q-react-101-2",
      prompt: "What does the browser do when it encounters raw JSX code?",
      options: [
        { id: "a", label: "Browsers parse JSX natively just like standard HTML" },
        { id: "b", label: "Browsers cannot execute raw JSX; it must first be transformed into standard JavaScript via a compiler (Babel/Vite)" },
        { id: "c", label: "Browsers convert JSX into CSS styling rules" },
        { id: "d", label: "Browsers save JSX as image files in the cache" }
      ],
      correctAnswer: "b",
      explanation: "Browsers do not understand JSX syntax. Tools like Vite or Babel compile JSX into standard `React.createElement()` or JSX runtime calls."
    },
    {
      id: "q-react-101-3",
      prompt: "Which attribute must you use in JSX instead of the standard HTML 'class' attribute?",
      options: [
        { id: "a", label: "classStyle" },
        { id: "b", label: "className" },
        { id: "c", label: "cssClass" },
        { id: "d", label: "styleClass" }
      ],
      correctAnswer: "b",
      explanation: "`className` is used because `class` is a reserved keyword for ES6 classes in JavaScript."
    },
    {
      id: "q-react-101-4",
      prompt: "Why must adjacent JSX elements be wrapped in a single parent element or Fragment?",
      options: [
        { id: "a", label: "Because HTML only allows one div per webpage" },
        { id: "b", label: "Because a JavaScript function can only return a single value (or single root object)" },
        { id: "c", label: "Because CSS cannot style more than one element at a time" },
        { id: "d", label: "Because React only works on mobile devices with single-core processors" }
      ],
      correctAnswer: "b",
      explanation: "JSX compiles into function calls (`React.createElement` or `_jsx`). In JavaScript, a function can return only one value."
    },
    {
      id: "q-react-101-5",
      prompt: "What is the syntax for a React Fragment shorthand?",
      options: [
        { id: "a", label: "<fragment> ... </fragment>" },
        { id: "b", label: "<> ... </>" },
        { id: "c", label: "<group> ... </group>" },
        { id: "d", label: "[ ... ]" }
      ],
      correctAnswer: "b",
      explanation: "The empty tag syntax `<> ... </>` is the shorthand for `<React.Fragment> ... </React.Fragment>`, allowing grouping without adding extra DOM nodes."
    },
    {
      id: "q-react-101-6",
      prompt: "Which of the following CANNOT be placed directly inside JSX curly braces `{ ... }`?",
      options: [
        { id: "a", label: "A ternary expression: `isActive ? 'Active' : 'Inactive'`" },
        { id: "b", label: "A variable reference: `{username}`" },
        { id: "c", label: "An if-else statement: `{if (x) { return y; }}`" },
        { id: "d", label: "A function call: `{calculateTax(100)}`" }
      ],
      correctAnswer: "c",
      explanation: "Only JavaScript *expressions* can be embedded in curly braces. Statements like `if`, `while`, or `for` cannot be used inside JSX expressions."
    },
    {
      id: "q-react-101-7",
      prompt: "How must void elements like `<img>` and `<input>` be written in JSX?",
      options: [
        { id: "a", label: "They must always be self-closing: `<img />` and `<input />`" },
        { id: "b", label: "They cannot have closing tags or slashes" },
        { id: "c", label: "They must be wrapped in `<code>` tags" },
        { id: "d", label: "They are forbidden in JSX" }
      ],
      correctAnswer: "a",
      explanation: "In JSX (following XML rules), all elements must be explicitly closed, either with a closing tag or by self-closing (`<img />`)."
    },
    {
      id: "q-react-101-8",
      prompt: "How does JSX protect applications against Cross-Site Scripting (XSS) attacks?",
      options: [
        { id: "a", label: "By encrypting all network traffic with SSL" },
        { id: "b", label: "By automatically converting all rendered values into strings and escaping HTML entities before rendering" },
        { id: "c", label: "By disabling JavaScript in the client browser" },
        { id: "d", label: "By requiring user passwords for every component" }
      ],
      correctAnswer: "b",
      explanation: "React automatically escapes all strings rendered in JSX expressions, neutralizing any embedded `<script>` tags before injection into the DOM."
    },
    {
      id: "q-react-101-9",
      prompt: "Which attribute replaces HTML's 'for' attribute when linking a `<label>` to an `<input>` in JSX?",
      options: [
        { id: "a", label: "labelFor" },
        { id: "b", label: "htmlFor" },
        { id: "c", label: "inputTarget" },
        { id: "d", label: "forInput" }
      ],
      correctAnswer: "b",
      explanation: "Because `for` is a reserved keyword in JavaScript (used for loops), JSX uses `htmlFor` to attach labels to form inputs."
    },
    {
      id: "q-react-101-10",
      prompt: "What will `{/* This is a comment */}` do when placed inside JSX markup?",
      options: [
        { id: "a", label: "It will display on screen as visible red text" },
        { id: "b", label: "It acts as a valid JSX comment and will not render to the browser DOM" },
        { id: "c", label: "It causes a fatal build error" },
        { id: "d", label: "It creates a comment on GitHub automatically" }
      ],
      correctAnswer: "b",
      explanation: "In JSX, comments inside markup must be placed within curly braces using multi-line comment syntax: `{/* comment */}`."
    }
  ]
};

// LESSON 102: COMPONENTS, PROPS AND COMPOSITION
const lesson102: CurriculumItem = {
  id: "item-react-102-components-props",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-foundations",
  moduleTitle: "Module 1: React Foundations",
  modulePosition: 1,
  title: "Components, Props and Composition",
  duration: "35 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Components, Props and Composition",
  contentDescription: "Understand function components, passing data via read-only props, object destructuring, children prop composition, and structuring clean component hierarchies.",
  codeSnippet: {
    language: "jsx",
    code: `// 1. Child Component: CourseCard receiving props with destructuring & default values
function CourseCard({ title, level = "Beginner", duration, children }) {
  return (
    <article className="course-card">
      <header className="card-header">
        <h3 className="course-title">{title}</h3>
        <span className="course-level">{level}</span>
      </header>
      <div className="card-body">
        <p>Estimated Time: {duration}</p>
        {/* children represents any nested JSX passed between <CourseCard>...</CourseCard> */}
        {children}
      </div>
    </article>
  );
}

// 2. Parent Component: Composing multiple child components
function CourseList() {
  return (
    <section className="catalog">
      <h2>Available Sub-Courses</h2>
      <CourseCard title="React Foundations" level="Intermediate" duration="6 hrs">
        <button className="btn-enroll">Start Learning</button>
      </CourseCard>
    </section>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: LEGO Bricks and Blueprint Specs",
      explanation: "Think of a React component as an individual LEGO brick. You don't build a toy castle out of one giant unmovable block of plastic; you build it by snapping together small, reusable bricks: wall bricks, window bricks, and door bricks. 'Props' (short for properties) are the specifications you pass into the brick—such as what color to paint it, what label to print on it, or what size to make it.",
      bullets: [
        "Reusability: Define a `CourseCard` once, render it 50 times with different data.",
        "Unidirectional Data Flow: Data always flows DOWN from parent components to child components via props.",
        "Read-Only Invariant: A component must NEVER mutate its own props. Props are immutable inputs."
      ]
    },
    {
      title: "Function Components & Object Destructuring",
      explanation: "A React component is simply a JavaScript function that starts with a CAPITAL letter and returns JSX markup. Props are passed into the function as a single object argument.",
      table: {
        headers: ["Pattern", "Code Syntax", "Why It Matters"],
        rows: [
          ["Standard Props Object", "`function Card(props) { return <h1>{props.title}</h1>; }`", "Verbose; requires `props.` prefix everywhere"],
          ["Destructured Props", "`function Card({ title, level }) { return <h1>{title}</h1>; }`", "Clean, readable, idiomatic React"],
          ["Default Prop Values", "`function Card({ level = 'Beginner' }) { ... }`", "Safe fallback when parent omits optional props"],
          ["The `children` Prop", "`function Card({ children }) { return <div>{children}</div>; }`", "Enables flexible component slot composition"]
        ]
      }
    },
    {
      title: "Concept in Depth: Composition vs Inheritance",
      explanation: "In React, we never use class inheritance (e.g., `class SpecialCard extends Card`). Instead, we use COMPOSITION: we assemble complex UIs by nesting components inside other components using the `children` prop.",
      bullets: [
        "Containment: Generic container components (like Card, Dialog, or Layout) use `{children}` to render arbitrary content passed by the parent.",
        "Specialization: A `WelcomeDialog` renders a generic `Dialog` configured with specific title and message props.",
        "Single Responsibility: Each component should do one job well (presentation, layout, or container)."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common component errors:",
      bullets: [
        "Lowercase Component Names: Writing `function courseCard() { ... }` causes React to treat `<courseCard />` as an unknown native HTML tag. Component names MUST be Capitalized (PascalCase).",
        "Mutating Props Directly: Writing `props.title = 'New'` will cause unpredictable bugs and violates pure function rules.",
        "Prop Drilling Hell: Passing props through 8 levels of components that don't need them. Use React Context when data needs to be global.",
        "Forgetting Return Statement: Defining a component without returning JSX renders blank white screen."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a reusable `Button` component that accepts `variant` ('primary' | 'secondary'), `size` ('sm' | 'lg'), and `children`. Then create a `CourseCard` component that embeds this `Button`. Verify that the button renders different CSS classes based on the props passed."
    }
  ],
  questions: [
    {
      id: "q-react-102-1",
      prompt: "Why must React component names always begin with a capital letter (PascalCase)?",
      options: [
        { id: "a", label: "To distinguish them from standard HTML tags like <div>, <p>, and <span> in JSX" },
        { id: "b", label: "Because lowercase letters are not supported by the JavaScript engine" },
        { id: "c", label: "It is only a cosmetic style guide rule with no runtime effect" },
        { id: "d", label: "To allow the browser to auto-translate the page" }
      ],
      correctAnswer: "a",
      explanation: "React treats tags starting with lowercase letters as built-in HTML elements (`<div>`), while tags starting with uppercase letters are treated as React components (`<MyComponent />`)."
    },
    {
      id: "q-react-102-2",
      prompt: "What are 'props' in React?",
      options: [
        { id: "a", label: "Private internal variables that components modify at runtime" },
        { id: "b", label: "Read-only configuration data passed from a parent component down to a child component" },
        { id: "c", label: "CSS stylesheets linked inside the HTML `<head>` tag" },
        { id: "d", label: "Database records stored in PostgreSQL" }
      ],
      correctAnswer: "b",
      explanation: "Props (properties) are read-only inputs passed from parent to child components, establishing unidirectional data flow."
    },
    {
      id: "q-react-102-3",
      prompt: "Can a child component modify the props it receives from its parent?",
      options: [
        { id: "a", label: "Yes, by calling `props.modify()`" },
        { id: "b", label: "No; props are strictly read-only and immutable within the receiving component" },
        { id: "c", label: "Yes, but only if the prop is a number or boolean" },
        { id: "d", label: "Yes, if the component is an arrow function" }
      ],
      correctAnswer: "b",
      explanation: "All React components must act like pure functions with respect to their props. A component must never mutate its own props."
    },
    {
      id: "q-react-102-4",
      prompt: "What does the special `children` prop represent in React?",
      options: [
        { id: "a", label: "The number of child elements in the database" },
        { id: "b", label: "Whatever JSX content is nested between a component's opening and closing tags" },
        { id: "c", label: "An array of all sub-courses in the LMS" },
        { id: "d", label: "A function that generates random numbers" }
      ],
      correctAnswer: "b",
      explanation: "`props.children` automatically captures whatever elements or text you place between `<MyComponent>...</MyComponent>`."
    },
    {
      id: "q-react-102-5",
      prompt: "How can you provide a default fallback value for a prop using JavaScript ES6 destructuring?",
      options: [
        { id: "a", label: "`function Card({ title = 'Untitled' })`" },
        { id: "b", label: "`function Card(title == 'Untitled')`" },
        { id: "c", label: "`props.default(title, 'Untitled')`" },
        { id: "d", label: "`default.title = 'Untitled'`" }
      ],
      correctAnswer: "a",
      explanation: "Using ES6 parameter destructuring with default assignments (`{ title = 'Untitled' }`) provides clean, idiomatic fallbacks for optional props."
    },
    {
      id: "q-react-102-6",
      prompt: "What is 'unidirectional data flow' in React?",
      options: [
        { id: "a", label: "Data flows upwards from child components into parent components automatically" },
        { id: "b", label: "Data flows exclusively downwards from parent components to child components via props" },
        { id: "c", label: "Data flows horizontally between unrelated components through window variables" },
        { id: "d", label: "Data only flows between the browser and the web server" }
      ],
      correctAnswer: "b",
      explanation: "React enforces a top-down, unidirectional data flow: state is owned by parent components and passed down to children as props."
    },
    {
      id: "q-react-102-7",
      prompt: "Why does React favor component 'composition' over class 'inheritance'?",
      options: [
        { id: "a", label: "Because inheritance is illegal in JavaScript" },
        { id: "b", label: "Because composition is more flexible, modular, and avoids rigid, deeply nested class hierarchies" },
        { id: "c", label: "Because inheritance cannot render HTML tags" },
        { id: "d", label: "Because composition reduces network bandwidth" }
      ],
      correctAnswer: "b",
      explanation: "React uses composition (combining small, focused components via props and `children`) because it creates loosely coupled, highly flexible user interfaces."
    },
    {
      id: "q-react-102-8",
      prompt: "What will happen if you render `<Welcome message={42} />`?",
      options: [
        { id: "a", label: "The component receives `props.message` as the number `42`" },
        { id: "b", label: "React throws a syntax error because numbers cannot be passed as props" },
        { id: "c", label: "The number 42 is converted into a CSS color code" },
        { id: "d", label: "The browser reloads 42 times" }
      ],
      correctAnswer: "a",
      explanation: "Using curly braces allows passing any valid JavaScript value—including numbers, booleans, arrays, objects, and functions—as props."
    },
    {
      id: "q-react-102-9",
      prompt: "What is 'prop drilling' in React development?",
      options: [
        { id: "a", label: "A build optimization that compiles props into machine code" },
        { id: "b", label: "The tedious process of passing props through multiple intermediary components that do not need the data themselves" },
        { id: "c", label: "Deleting unnecessary props from memory" },
        { id: "d", label: "Using props to query a SQL database" }
      ],
      correctAnswer: "b",
      explanation: "Prop drilling occurs when data must be passed through several nested layers of components just to reach a deeply nested child."
    },
    {
      id: "q-react-102-10",
      prompt: "How can a child component notify its parent of an event (like a button click)?",
      options: [
        { id: "a", label: "By directly modifying the parent's source code file" },
        { id: "b", label: "By calling a callback function passed down to it from the parent as a prop" },
        { id: "c", label: "By restarting the Vite development server" },
        { id: "d", label: "By setting a global window cookie" }
      ],
      correctAnswer: "b",
      explanation: "Parents pass callback functions (e.g., `onSelectCourse={handleSelect}`) down as props, which the child invokes when an event occurs."
    }
  ]
};

// LESSON 103: LISTS, KEYS AND CONDITIONAL RENDERING
const lesson103: CurriculumItem = {
  id: "item-react-103-lists-keys-conditional",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-foundations",
  moduleTitle: "Module 1: React Foundations",
  modulePosition: 1,
  title: "Lists, Keys and Conditional Rendering",
  duration: "35 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lists, Keys and Conditional Rendering",
  contentDescription: "Master transforming data arrays into UI with Array.prototype.map, assigning stable unique keys for DOM reconciliation, and implementing clear loading, empty, and populated conditional states.",
  codeSnippet: {
    language: "jsx",
    code: `// Rendering dynamic lists with stable keys and explicit conditional states
function CourseCatalog({ courses, isLoading, errorMessage }) {
  // 1. Loading State
  if (isLoading) {
    return <div className="state-msg">Loading courses, please wait…</div>;
  }

  // 2. Error State
  if (errorMessage) {
    return <div className="state-msg error">{errorMessage}</div>;
  }

  // 3. Empty State
  if (!courses || courses.length === 0) {
    return <div className="state-msg empty">No courses found matching your criteria.</div>;
  }

  // 4. Success State: Transform array with map and assign stable unique key
  return (
    <ul className="course-grid">
      {courses.map(course => (
        // KEY RULE: Key must be on the outermost element returned by map!
        <li key={course.id} className="course-item">
          <h4>{course.title}</h4>
          <span>{course.duration}</span>
        </li>
      ))}
    </ul>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Student Roll Numbers in an Examination Hall",
      explanation: "Imagine 100 students sitting in an exam hall. If the invigilator identifies students only by their chair row numbers (index 0, 1, 2...), what happens when a student in row 2 leaves early? Everyone behind has to shift forward, their row numbers change, and their exam papers get mixed up! But if each student is identified by their permanent Student ID card (stable key), it doesn't matter who shifts or reorders—each student's paper stays with them. That is why React demands a unique, stable `key` for every list item!",
      bullets: [
        "`map()` transforms data: Takes an array of raw objects and returns an array of JSX elements.",
        "`key` prop: A special string attribute that gives elements a permanent identity across re-renders.",
        "Diffing Efficiency: Keys allow React to know precisely whether an item was inserted, deleted, or reordered."
      ]
    },
    {
      title: "Why Array Index as Key is Dangerous",
      explanation: "Using the array index `courses.map((c, index) => <Item key={index} />)` is a notorious anti-pattern if the list can be filtered, sorted, or mutated:",
      table: {
        headers: ["Scenario", "Using Array Index as Key", "Using Stable Database ID (`key={item.id}`)"],
        rows: [
          ["Reordering / Sorting", "Components are reused with wrong internal state / inputs", "React correctly reorders existing DOM nodes"],
          ["Deleting an Item", "Last element in DOM is removed; previous elements re-render incorrectly", "Exact deleted element is surgically removed from DOM"],
          ["Prepending an Item", "Every single sibling item re-renders and loses focus", "New element is inserted at top; siblings remain untouched"]
        ]
      }
    },
    {
      title: "The 3 Methods of Conditional Rendering",
      explanation: "React provides three clean ways to render different UI depending on condition:",
      bullets: [
        "1. Early Return: If condition is met, return early before the main JSX (ideal for loading spinners and error banners).",
        "2. Ternary Operator (`? :`): For toggling between two alternative elements: `{isEnrolled ? <DashboardBtn /> : <EnrollBtn />}`.",
        "3. Logical AND (`&&`): For rendering an element only when a condition is true: `{hasDiscount && <Badge text='50% OFF' />}`. (Warning: Ensure the left-hand condition is a boolean, not `0`)."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Crucial mistakes when working with lists and conditions:",
      bullets: [
        "Placing key on inner element: The `key` attribute MUST be placed on the outermost JSX tag inside the `.map()` callback.",
        "Rendering `0` on screen with `&&`: Writing `{items.length && <List />}` renders `0` when empty because `0` is falsy in JS! Write `{items.length > 0 && <List />}` instead.",
        "Using Math.random() as key: Generates new keys on every render, causing React to completely destroy and recreate DOM nodes every time.",
        "Missing Empty State: Forgetting to explain to users why a page is blank when an array has zero items."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a `TaskFilter` component that renders a list of tasks with stable IDs. Add filter buttons ('All', 'Pending', 'Completed'). Verify that sorting or filtering the list does not cause input focus to jump, and display an empty state message when no tasks match."
    }
  ],
  questions: [
    {
      id: "q-react-103-1",
      prompt: "Which array method is standard for rendering dynamic lists of JSX elements in React?",
      options: [
        { id: "a", label: "Array.prototype.forEach()" },
        { id: "b", label: "Array.prototype.map()" },
        { id: "c", label: "Array.prototype.push()" },
        { id: "d", label: "Array.prototype.splice()" }
      ],
      correctAnswer: "b",
      explanation: "`.map()` is declarative and returns a new array of JSX elements, whereas `.forEach()` returns `undefined` and cannot be embedded in JSX."
    },
    {
      id: "q-react-103-2",
      prompt: "What is the primary purpose of the 'key' prop when rendering lists in React?",
      options: [
        { id: "a", label: "It sets the CSS font family for each list item" },
        { id: "b", label: "It gives each list item a stable identity so React's reconciliation engine can track additions, removals, and reordering" },
        { id: "c", label: "It decrypts user passwords sent from the server" },
        { id: "d", label: "It binds click events to the browser window" }
      ],
      correctAnswer: "b",
      explanation: "Keys provide identity to elements across renders, enabling React's reconciliation algorithm to efficiently diff, reuse, and reorder DOM nodes."
    },
    {
      id: "q-react-103-3",
      prompt: "Why should array indices (e.g. `key={index}`) be avoided as keys when lists can change?",
      options: [
        { id: "a", label: "Because numbers cannot be converted into strings in JavaScript" },
        { id: "b", label: "Because inserting, removing, or reordering items changes their indices, leading to UI bugs, state corruption, and inefficient re-renders" },
        { id: "c", label: "Because React forbids using numbers as keys" },
        { id: "d", label: "Because it prevents CSS styles from applying" }
      ],
      correctAnswer: "b",
      explanation: "If items are reordered or removed, their indices shift, causing React to associate old DOM nodes and local state with the wrong items."
    },
    {
      id: "q-react-103-4",
      prompt: "Where must the `key` prop be placed when rendering a list with `.map()`?",
      options: [
        { id: "a", label: "On the innermost text node" },
        { id: "b", label: "On the outermost JSX element returned directly inside the `.map()` callback" },
        { id: "c", label: "On the parent `<ul>` or `<ol>` container element" },
        { id: "d", label: "Inside the component's package.json file" }
      ],
      correctAnswer: "b",
      explanation: "The `key` must always be declared on the top-level element returned directly inside the `.map()` callback function."
    },
    {
      id: "q-react-103-5",
      prompt: "What is the result of `{items.length && <ItemList />}` when `items` is an empty array `[]`?",
      options: [
        { id: "a", label: "It renders nothing (blank)" },
        { id: "b", label: "It renders the number '0' on screen because 0 is falsy and JavaScript evaluates the expression to 0" },
        { id: "c", label: "It throws a fatal crash" },
        { id: "d", label: "It renders `<ItemList />`" }
      ],
      correctAnswer: "b",
      explanation: "In JavaScript, `0 && <ItemList />` evaluates to `0`. React renders numbers into the DOM, so `0` will literally appear on screen. Always write `items.length > 0 && <ItemList />`."
    },
    {
      id: "q-react-103-6",
      prompt: "Which conditional rendering approach is best suited for showing a full-screen loading spinner before data arrives?",
      options: [
        { id: "a", label: "CSS `display: none` on the entire page" },
        { id: "b", label: "An early return statement: `if (isLoading) return <Spinner />;`" },
        { id: "c", label: "A while loop that blocks the thread for 5 seconds" },
        { id: "d", label: "Wrapping the component in a try/catch block" }
      ],
      correctAnswer: "b",
      explanation: "Early returns cleanly exit the component function early, rendering the loading state without attempting to process unready data."
    },
    {
      id: "q-react-103-7",
      prompt: "What happens if you use `Math.random()` as a list item key?",
      options: [
        { id: "a", label: "It guarantees optimal performance because keys are always unique" },
        { id: "b", label: "React generates a new key on every single render, destroying and recreating DOM nodes every time and losing input focus" },
        { id: "c", label: "The browser will lock up due to cryptographic key generation" },
        { id: "d", label: "React ignores it and assigns index automatically" }
      ],
      correctAnswer: "b",
      explanation: "Keys must be STABLE between renders. Random keys force React to discard existing DOM elements and recreate them from scratch on every render."
    },
    {
      id: "q-react-103-8",
      prompt: "How can you render a fallback UI when an array of products has zero items?",
      options: [
        { id: "a", label: "By deleting the database" },
        { id: "b", label: "By checking `if (products.length === 0)` and returning an empty state message `<p>No products found</p>`" },
        { id: "c", label: "By refreshing the web page automatically in an infinite loop" },
        { id: "d", label: "React renders 'Empty' by default automatically" }
      ],
      correctAnswer: "b",
      explanation: "Explicitly handling the empty state (`products.length === 0`) provides a clear, professional user experience when search or filter returns no results."
    },
    {
      id: "q-react-103-9",
      prompt: "Can two sibling items in the same list share the exact same key?",
      options: [
        { id: "a", label: "Yes, keys do not need to be unique" },
        { id: "b", label: "No; keys must be strictly unique among sibling items so React can identify each element distinctly" },
        { id: "c", label: "Only if the items have different CSS colors" },
        { id: "d", label: "Only in development mode" }
      ],
      correctAnswer: "b",
      explanation: "Keys must be unique among siblings. Duplicate keys cause React to issue warnings and can cause severe DOM update glitches."
    },
    {
      id: "q-react-103-10",
      prompt: "What will React render if a component returns `null`?",
      options: [
        { id: "a", label: "The text string 'null'" },
        { id: "b", label: "Nothing at all (it renders blank without creating any DOM nodes)" },
        { id: "c", label: "A browser alert popup" },
        { id: "d", label: "An error message in red text" }
      ],
      correctAnswer: "b",
      explanation: "Returning `null` from a component is a common pattern to intentionally prevent rendering, producing no DOM nodes on screen."
    }
  ]
};

// MODULE 1 QUIZ
const module01Quiz: CurriculumItem = {
  id: "item-react-mod01-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-foundations",
  moduleTitle: "Module 1: React Foundations",
  modulePosition: 1,
  title: "Module 1 Assessment: React Foundations MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 1 Quiz: Core React Architecture & Fundamentals",
  contentDescription: "Evaluate your comprehensive mastery of React concepts: Virtual DOM reconciliation, declarative programming, JSX rules, component composition, props immutability, list keys, and conditional rendering states.",
  questions: [
    ...(lesson100.questions || []).slice(0, 3),
    ...(lesson101.questions || []).slice(0, 3),
    ...(lesson102.questions || []).slice(0, 2),
    ...(lesson103.questions || []).slice(0, 2)
  ]
};

// MODULE 1 ASSESSMENT (LAB)
const module01Assessment: CurriculumItem = {
  id: "item-react-mod01-lab",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-foundations",
  moduleTitle: "Module 1: React Foundations",
  modulePosition: 1,
  title: "Module 1 Lab: Course Catalog Card Deck",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 1 Lab Project: Interactive Course Catalog Card Deck",
  contentDescription: "Build a responsive course catalog card deck using modular components, props destructuring, children slots, and dynamic list rendering with stable unique keys.",
  assignmentPrompt: {
    instructions: "Create a modular React card deck application:\n1. Create a `CourseCard` component that accepts `title`, `level`, `duration`, `isFeatured`, and `children`.\n2. In `CourseList`, define a mock dataset of at least 4 courses with unique IDs.\n3. Render the list using `.map()` with stable unique keys.\n4. Display a special 'Featured' badge if `isFeatured` is true.\n5. Include an empty state message when the courses array is empty.",
    deliverables: [
      "Modular components with clean destructuring and default props",
      "Dynamic rendering using `.map()` with stable IDs as keys",
      "Empty state and loading state fallbacks implemented cleanly"
    ]
  }
};

export const reactModule01: CurriculumSubModule = {
  id: "module-react-01-foundations",
  subCourseId: "mod-react-essentials",
  title: "Module 1 — React Foundations",
  description: "Master React component-based architecture, JSX transformation, props destructuring, composition patterns, and list reconciliation with stable keys.",
  position: 1,
  items: [
    lesson100,
    lesson101,
    lesson102,
    lesson103,
    module01Quiz,
    module01Assessment
  ]
};
