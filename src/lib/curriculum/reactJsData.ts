import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// SUB-COURSE 5: FRONTEND DEVELOPMENT WITH REACT
// =========================================================================

// =========================================================================
// MODULE 1: REACT FUNDAMENTALS, JSX & COMPONENT ARCHITECTURE
// =========================================================================

const reactLesson01: CurriculumItem = {
  id: "item-react-01-foundations-vdom",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-fundamentals",
  moduleTitle: "Module 1: React Fundamentals, JSX & Components",
  modulePosition: 1,
  title: "01. Modern React Foundations, Virtual DOM & Declarative UI",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 01: Modern React Foundations, Virtual DOM & Declarative UI",
  contentDescription: "Understand why React was created by Meta: imperative vs declarative programming, the Virtual DOM reconciliation algorithm (Diffing & Fiber), component-driven architecture, and Single Page Application (SPA) mechanics.",
  codeSnippet: {
    language: "jsx",
    code: "// Declarative React Component vs Imperative Vanilla JS\n// 1. Declarative (React): You describe WHAT the UI should look like for a given state\nfunction WelcomeBanner({ username, isOnline }) {\n  return (\n    <header className=\"banner\">\n      <h1>Welcome back, {username}!</h1>\n      <span className={isOnline ? 'badge-green' : 'badge-gray'}>\n        {isOnline ? 'Active Now' : 'Offline'}\n      </span>\n    </header>\n  );\n}\n\n// 2. React creates Virtual DOM nodes (lightweight JS objects), computes diffs,\n// and surgically updates only the altered DOM elements in the real browser DOM."
  },
  sections: [
    {
      title: "1.1 Imperative vs Declarative UI Programming",
      explanation: "In traditional imperative DOM programming (vanilla JavaScript or jQuery), you must write step-by-step instructions telling the browser *how* to find, create, mutate, and remove HTML nodes (e.g., `document.createElement`, `appendChild`, `classList.add`). In declarative React programming, you describe *what* the UI should look like for a given state, and React handles all DOM synchronization behind the scenes.",
      bullets: [
        "Declarative: UI = fn(state). When state changes, React recalculates the UI representation.",
        "Component-Driven: The UI is split into small, reusable, isolated, and self-contained building blocks.",
        "Predictable: State mutations flow down via unidirectional data flow, preventing synchronization bugs."
      ],
      diagram: "+-------------------------------------------------------------+\n|                   THE REACT RENDER PIPELINE                 |\n+-------------------------------------------------------------+\n| [State / Props Change]                                      |\n|            |                                                |\n|            v                                                |\n| [1. Render Phase]: Call component functions                 |\n|            |       Produce new Virtual DOM tree (JSX)       |\n|            v                                                |\n| [2. Reconciliation (Diffing)]: Compares new VDOM vs old VDOM|\n|            |                    Computes minimal delta      |\n|            v                                                |\n| [3. Commit Phase]: Surgically mutates the real browser DOM  |\n+-------------------------------------------------------------+"
    },
    {
      title: "1.2 The Virtual DOM & Reconciliation",
      explanation: "Direct manipulation of the browser DOM is computationally expensive because altering layout triggers browser reflow and repaint. React maintains a lightweight in-memory representation of the DOM tree known as the Virtual DOM (VDOM).",
      table: {
        headers: ["Aspect", "Real Browser DOM", "Virtual DOM (VDOM)"],
        rows: [
          ["Nature", "Native browser C++ nodes with heavy style/layout trees", "Lightweight plain JavaScript objects"],
          ["Updates", "Direct mutations trigger expensive reflows & repaints", "Cheap in-memory object comparisons"],
          ["Diffing", "No built-in diffing mechanism", "Fast O(n) heuristic diffing algorithm"],
          ["Batching", "Manual developer batching required", "Automatic multi-state update batching"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-react-01-1",
      prompt: "What is the primary difference between declarative and imperative UI programming?",
      options: [
        { id: "a", label: "Declarative code runs only on servers; imperative runs in browsers" },
        { id: "b", label: "Declarative describes WHAT the UI should look like based on state; imperative specifies step-by-step HOW to manipulate DOM nodes" },
        { id: "c", label: "Declarative requires TypeScript; imperative requires HTML" },
        { id: "d", label: "Declarative cannot handle button clicks" }
      ],
      correctIndex: 1,
      explanation: "In declarative code (React), you describe the desired UI state and let the runtime update the DOM, rather than issuing manual step-by-step DOM mutations."
    },
    {
      id: "q-react-01-2",
      prompt: "What is the Virtual DOM in React?",
      options: [
        { id: "a", label: "A physical browser plugin installed by users" },
        { id: "b", label: "A lightweight in-memory representation of the actual DOM stored as JavaScript objects" },
        { id: "c", label: "A database table storing HTML strings" },
        { id: "d", label: "A backup copy of Google Chrome's rendering engine" }
      ],
      correctIndex: 1,
      explanation: "The Virtual DOM is a lightweight tree of plain JavaScript objects mimicking the real DOM, enabling fast diffing and minimal mutations."
    },
    {
      id: "q-react-01-3",
      prompt: "What is the process called when React compares the new Virtual DOM with the previous one to find differences?",
      options: [
        { id: "a", label: "Compilation" },
        { id: "b", label: "Reconciliation (or Diffing)" },
        { id: "c", label: "Transpilation" },
        { id: "d", label: "Hydration" }
      ],
      correctIndex: 1,
      explanation: "Reconciliation is React's algorithm for comparing two Virtual DOM trees and determining the minimal set of changes needed in the real DOM."
    },
    {
      id: "q-react-01-4",
      prompt: "Which company originally created and open-sourced React in 2013?",
      options: [
        { id: "a", label: "Google" },
        { id: "b", label: "Meta (Facebook)" },
        { id: "c", label: "Microsoft" },
        { id: "d", label: "Twitter" }
      ],
      correctIndex: 1,
      explanation: "Jordan Walke and the engineering team at Facebook (Meta) created React and released it as open source in 2013."
    },
    {
      id: "q-react-01-5",
      prompt: "What is a Single Page Application (SPA)?",
      options: [
        { id: "a", label: "A website that contains only one single HTML page and reloads from scratch on every link click" },
        { id: "b", label: "A web app that loads a single HTML file and dynamically rewrites page content via JavaScript without full browser reloads" },
        { id: "c", label: "A webpage that cannot scroll vertically" },
        { id: "d", label: "An app that only works on single-core mobile phones" }
      ],
      correctIndex: 1,
      explanation: "An SPA loads once and updates views dynamically on the client using JavaScript routing, providing fluid desktop-like transitions."
    },
    {
      id: "q-react-01-6",
      prompt: "In which phase of the React pipeline does React actually mutate the real browser DOM?",
      options: [
        { id: "a", label: "Render Phase" },
        { id: "b", label: "Diffing Phase" },
        { id: "c", label: "Commit Phase" },
        { id: "d", label: "Parsing Phase" }
      ],
      correctIndex: 2,
      explanation: "The Commit phase is where React applies the computed diffs to the host environment (the real browser DOM)."
    },
    {
      id: "q-react-01-7",
      prompt: "What is React Fiber?",
      options: [
        { id: "a", label: "A fiber-optic network cable connecting to Meta servers" },
        { id: "b", label: "The reimplemented React core reconciliation engine capable of incremental rendering and priority-based task scheduling" },
        { id: "c", label: "A CSS framework for styling React cards" },
        { id: "d", label: "A bundler replacing Vite" }
      ],
      correctIndex: 1,
      explanation: "React Fiber is React's internal reconciler architecture that enables time-slicing, interruptible rendering, and smooth animations."
    },
    {
      id: "q-react-01-8",
      prompt: "Why is direct DOM manipulation (e.g. document.getElementById('x').innerHTML = ...) considered an anti-pattern in React?",
      options: [
        { id: "a", label: "The browser throws a security error" },
        { id: "b", label: "It desynchronizes the real DOM from React's internal Virtual DOM state, causing visual bugs and overwrites" },
        { id: "c", label: "React only supports SVG elements" },
        { id: "d", label: "It prevents Node.js from compiling" }
      ],
      correctIndex: 1,
      explanation: "Bypassing React to mutate DOM directly breaks React's tracking, leading to reconciler conflicts and unexpected UI resets."
    },
    {
      id: "q-react-01-9",
      prompt: "What does unidirectional data flow mean in React?",
      options: [
        { id: "a", label: "Data can only travel from child components up to parent components" },
        { id: "b", label: "Data and props flow downwards in one direction from parent components to child components" },
        { id: "c", label: "All HTTP requests must use HTTP GET" },
        { id: "d", label: "State cannot be modified once initialized" }
      ],
      correctIndex: 1,
      explanation: "Unidirectional data flow means state is owned by parent components and passed down to children via immutable props."
    },
    {
      id: "q-react-01-10",
      prompt: "What HTML element acts as the mount container in a typical React application (e.g. in index.html)?",
      options: [
        { id: "a", label: "<div id=\"root\"></div>" },
        { id: "b", label: "<react-app></react-app>" },
        { id: "c", label: "<script id=\"react\"></script>" },
        { id: "d", label: "<main type=\"vdom\"></main>" }
      ],
      correctIndex: 0,
      explanation: "React mounts its component tree into a designated root container, conventionally '<div id=\"root\"></div>', via ReactDOM.createRoot."
    }
  ]
};

const reactLesson02: CurriculumItem = {
  id: "item-react-02-jsx-rendering",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-fundamentals",
  moduleTitle: "Module 1: React Fundamentals, JSX & Components",
  modulePosition: 1,
  title: "02. JSX Syntax, Expressions, Conditional Rendering & List Keys",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 02: JSX Syntax, Expressions, Conditional Rendering & List Keys",
  contentDescription: "Master JSX (JavaScript XML): embedding expressions with curly braces, JSX attributes (className, htmlFor), ternary conditionals, short-circuit evaluation (&&), rendering lists with .map(), and why unique 'key' props are mandatory.",
  codeSnippet: {
    language: "jsx",
    code: "function CourseDirectory({ courses, isLoading, hasError }) {\n  // 1. Conditional Rendering using early return\n  if (isLoading) return <p className=\"loading-text\">Loading courses...</p>;\n  if (hasError) return <p className=\"error-banner\">Failed to load courses.</p>;\n\n  return (\n    <div className=\"directory-wrapper\">\n      <h2>Available Courses ({courses.length})</h2>\n      {/* 2. Short-circuit conditional rendering */}\n      {courses.length === 0 && <p>No courses match your filter.</p>}\n\n      {/* 3. List rendering with unique key prop */}\n      <ul className=\"course-list\">\n        {courses.map(course => (\n          <li key={course.id} className=\"course-card\">\n            <h3>{course.title}</h3>\n            {/* Ternary conditional */}\n            <span className={course.isFree ? 'badge-free' : 'badge-paid'}>\n              {course.isFree ? 'Free Enrollment' : `$${course.price}`}\n            </span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
  },
  sections: [
    {
      title: "2.1 What is JSX? Syntax Extension for JavaScript",
      explanation: "JSX is a syntax extension for JavaScript that looks visually similar to HTML. Browsers do not understand JSX natively; build tools (Babel, SWC, Vite) compile JSX into standard `React.createElement()` or `_jsx()` function calls that output Virtual DOM objects.",
      bullets: [
        "Single Root Element: A component must return a single root element (or a Fragment `<>...</>`).",
        "Curly Braces {}: Embed any valid JavaScript expression (variables, functions, ternary operations).",
        "Reserved Keywords: Because 'class' and 'for' are reserved in JavaScript, JSX uses 'className' and 'htmlFor'.",
        "Self-Closing Tags: Elements without children (like img, input, br) MUST self-close (`<img src=\"...\" />`)."
      ]
    },
    {
      title: "2.2 The Critical Role of the 'key' Prop in Lists",
      explanation: "When rendering lists of elements with `.map()`, React requires each top-level child element to have a unique `key` prop (typically an ID from your database or data item). Keys give elements a stable identity across re-renders.",
      table: {
        headers: ["Scenario", "Using Stable Unique IDs (e.g. key={item.id})", "Using Array Index (e.g. key={index})"],
        rows: [
          ["Item Reordering", "React reorders existing DOM nodes efficiently", "React mutates DOM contents and causes input focus bugs"],
          ["Item Insertion", "React inserts the new node at the correct position", "React re-renders all subsequent items from insertion point"],
          ["Item Deletion", "React removes only the deleted node", "Uncontrolled input state bleeds into neighboring items"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-react-02-1",
      prompt: "What does JSX compile into behind the scenes during build time?",
      options: [
        { id: "a", label: "SQL database queries" },
        { id: "b", label: "React.createElement() or _jsx() JavaScript function calls" },
        { id: "c", label: "Binary assembly instructions" },
        { id: "d", label: "Raw string templates" }
      ],
      correctIndex: 1,
      explanation: "JSX is syntactic sugar compiled by Babel/SWC into nested React.createElement() or jsx-runtime calls producing VDOM objects."
    },
    {
      id: "q-react-02-2",
      prompt: "Why does JSX use 'className' instead of the standard HTML 'class' attribute?",
      options: [
        { id: "a", label: "Because 'class' is a reserved keyword in JavaScript" },
        { id: "b", label: "Because className is faster for CSS parsers" },
        { id: "c", label: "Because React only works with Tailwind" },
        { id: "d", label: "To distinguish inline styles from external stylesheets" }
      ],
      correctIndex: 0,
      explanation: "Because JSX is embedded directly inside JavaScript, using the reserved keyword 'class' would cause syntactic parse conflicts."
    },
    {
      id: "q-react-02-3",
      prompt: "What is a React Fragment (<>...</>) used for?",
      options: [
        { id: "a", label: "To load partial HTML from a web server" },
        { id: "b", label: "To group multiple sibling elements together without inserting an unnecessary extra DOM node into the HTML" },
        { id: "c", label: "To animate page transitions" },
        { id: "d", label: "To fragment database queries" }
      ],
      correctIndex: 1,
      explanation: "React components must return a single root element. Fragments group children without cluttering the DOM with extra wrapper divs."
    },
    {
      id: "q-react-02-4",
      prompt: "Why should you avoid using array index (e.g. key={index}) as the key prop when rendering dynamic lists?",
      options: [
        { id: "a", label: "Array indexes are strings" },
        { id: "b", label: "Reordering, deleting, or inserting items changes their index, causing React to misidentify items and scramble state" },
        { id: "c", label: "Array indexes are deprecated in ES6" },
        { id: "d", label: "React throws a fatal runtime compilation error" }
      ],
      correctIndex: 1,
      explanation: "Array indices change when list items are sorted, added, or filtered, causing reconciliation bugs and state leakage in child components."
    },
    {
      id: "q-react-02-5",
      prompt: "What is rendered on screen if a boolean or null value is embedded inside JSX expressions, e.g. {false} or {null}?",
      options: [
        { id: "a", label: "The text string 'false' or 'null'" },
        { id: "b", label: "Nothing — React ignores booleans, null, and undefined and renders no DOM node" },
        { id: "c", label: "A red alert box" },
        { id: "d", label: "An empty paragraph tag" }
      ],
      correctIndex: 1,
      explanation: "React treats false, null, and undefined as empty renders, making patterns like '{hasError && <p>Error</p>}' work seamlessly."
    },
    {
      id: "q-react-02-6",
      prompt: "What is the gotcha when using '{count && <Badge />}` if count is the number 0?",
      options: [
        { id: "a", label: "It renders nothing as expected" },
        { id: "b", label: "It renders the number '0' on screen because 0 is falsy, so JavaScript evaluates the expression to 0" },
        { id: "c", label: "It throws a TypeError" },
        { id: "d", label: "It crashes React Fiber" }
      ],
      correctIndex: 1,
      explanation: "In JavaScript, '0 && <Badge />' evaluates to 0. Since React renders numbers, it prints '0'. Use 'count > 0 && <Badge />' instead."
    },
    {
      id: "q-react-02-7",
      prompt: "How are inline styles applied to elements in JSX?",
      options: [
        { id: "a", label: "style=\"color: red; margin-top: 10px;\"" },
        { id: "b", label: "style={{ color: 'red', marginTop: '10px' }} using a camelCase JavaScript object" },
        { id: "c", label: "css={{ 'color': 'red' }}" },
        { id: "d", label: "class-style=\"red\"" }
      ],
      correctIndex: 1,
      explanation: "In JSX, the style attribute accepts a JavaScript object with camelCased CSS property names (e.g., backgroundColor, marginTop)."
    },
    {
      id: "q-react-02-8",
      prompt: "What type of brackets are used to inject JavaScript variables or expressions into JSX markup?",
      options: [
        { id: "a", label: "Parentheses ()" },
        { id: "b", label: "Single curly braces {}" },
        { id: "c", label: "Square brackets []" },
        { id: "d", label: "Angle brackets <>" }
      ],
      correctIndex: 1,
      explanation: "Single curly braces '{}' open JavaScript expression mode inside JSX attributes and element children."
    },
    {
      id: "q-react-02-9",
      prompt: "Can you place a raw JavaScript if statement directly inside JSX children like <div>{if (x) { ... }}</div>?",
      options: [
        { id: "a", label: "Yes, any JavaScript statement is valid inside JSX" },
        { id: "b", label: "No, JSX only accepts expressions that evaluate to a value (use ternary ? : or boolean &&)" },
        { id: "c", label: "Only if wrapped in a function" },
        { id: "d", label: "Only in React 19+" }
      ],
      correctIndex: 1,
      explanation: "JSX interpolations only accept JavaScript expressions that resolve to values (ternaries, function calls, variables), not statements like if or for."
    },
    {
      id: "q-react-02-10",
      prompt: "What must be true for void/empty HTML tags like <img> and <input> when written in JSX?",
      options: [
        { id: "a", label: "They must have an explicit closing tag like <img></img> or be self-closing like <img />" },
        { id: "b", label: "They can be left unclosed like standard HTML 4" },
        { id: "c", label: "They must not have any attributes" },
        { id: "d", label: "They must be placed outside components" }
      ],
      correctIndex: 0,
      explanation: "JSX follows strict XML rules: all elements must either have a matching closing tag or be explicitly self-closed (e.g. '<input />')."
    }
  ]
};

const reactLesson03: CurriculumItem = {
  id: "item-react-03-components-props",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-fundamentals",
  moduleTitle: "Module 1: React Fundamentals, JSX & Components",
  modulePosition: 1,
  title: "03. Functional Components, Props, Children & Composition",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 03: Functional Components, Props, Children & Composition",
  contentDescription: "Understand component hierarchy: writing pure functional components, passing props, destructuring with default parameters, the special 'children' prop, and composing rich UI patterns without prop drilling.",
  codeSnippet: {
    language: "jsx",
    code: "// 1. Card Container Component using composition with 'children'\nfunction Card({ title, variant = 'default', children, actionButton }) {\n  return (\n    <div className={`card card-${variant}`}>\n      <div className=\"card-header\">\n        <h3 className=\"card-title\">{title}</h3>\n        {actionButton}\n      </div>\n      <div className=\"card-body\">\n        {children}\n      </div>\n    </div>\n  );\n}\n\n// 2. Composing Components cleanly in parent\nfunction Dashboard() {\n  return (\n    <Card\n      title=\"Student Enrolled Track\"\n      variant=\"highlight\"\n      actionButton={<button className=\"btn-sm\">View All</button>}\n    >\n      <p>Current Course: Full Stack Web Development</p>\n      <div className=\"progress-bar\" />\n    </Card>\n  );\n}"
  },
  sections: [
    {
      title: "3.1 Anatomy of a Functional Component",
      explanation: "A React functional component is a pure JavaScript function that accepts an object of arguments called `props` (short for properties) and returns JSX. Components must always begin with an uppercase letter so React can distinguish them from native HTML elements (e.g., `<Button />` vs `<button>`).",
      bullets: [
        "PascalCase Naming: `UserProfile`, `NavigationHeader`, `QuizCard`.",
        "Props are Read-Only (Immutable): A component must never modify its own props. Treating props as immutable guarantees purity and predictable rendering.",
        "Pure Functions: Given the same props, a component should always render the exact same UI without side effects during the render phase."
      ]
    },
    {
      title: "3.2 The 'children' Prop & Slot Composition Pattern",
      explanation: "Whatever markup or components are placed between the opening and closing tags of a component are automatically passed inside the special `children` prop. This enables the compound/container design pattern:",
      codeSnippet: {
        language: "jsx",
        code: "// Container component with slot composition\nfunction Modal({ isOpen, onClose, title, children }) {\n  if (!isOpen) return null;\n  return (\n    <div className=\"modal-overlay\" onClick={onClose}>\n      <div className=\"modal-box\" onClick={e => e.stopPropagation()}>\n        <header><h3>{title}</h3></header>\n        <main>{children}</main>\n      </div>\n    </div>\n  );\n}"
      }
    }
  ],
  questions: [
    {
      id: "q-react-03-1",
      prompt: "Why must React component names always start with an uppercase letter (e.g. MyComponent vs myComponent)?",
      options: [
        { id: "a", label: "To follow CSS naming conventions" },
        { id: "b", label: "JSX treats lowercase names as built-in HTML tags (<div>, <span>) and uppercase names as custom React components" },
        { id: "c", label: "Uppercase functions compile faster in V8" },
        { id: "d", label: "It is required by package.json" }
      ],
      correctIndex: 1,
      explanation: "JSX uses capitalization to differentiate native DOM elements (<div>, <button>) from user-defined React components (<Header />, <Card />)."
    },
    {
      id: "q-react-03-2",
      prompt: "Are props mutable inside the component that receives them?",
      options: [
        { id: "a", label: "Yes, props can be modified freely using props.title = 'New'" },
        { id: "b", label: "No, props are strictly read-only and immutable in React" },
        { id: "c", label: "Only if declared with let" },
        { id: "d", label: "Only numeric props can be changed" }
      ],
      correctIndex: 1,
      explanation: "React enforces props immutability. A component must never mutate its incoming props; to change values over time, use state."
    },
    {
      id: "q-react-03-3",
      prompt: "What does the special 'children' prop contain in React?",
      options: [
        { id: "a", label: "An array of child database records" },
        { id: "b", label: "Whatever elements, text, or components are passed between the opening and closing tags of the component" },
        { id: "c", label: "The children of the window object" },
        { id: "d", label: "A list of React Hooks" }
      ],
      correctIndex: 1,
      explanation: "Content placed between '<Wrapper>...</Wrapper>' is automatically injected into 'props.children'."
    },
    {
      id: "q-react-03-4",
      prompt: "How can you specify default values for props in modern functional components?",
      options: [
        { id: "a", label: "Using ES6 default parameter destructuring: function Card({ size = 'md' })" },
        { id: "b", label: "By setting window.defaultProps" },
        { id: "c", label: "Using the @default CSS decorator" },
        { id: "d", label: "React does not support default prop values" }
      ],
      correctIndex: 0,
      explanation: "Standard JavaScript ES6 destructuring with default parameters (e.g. '{ size = \"md\" }') is the idiomatic way to assign default props."
    },
    {
      id: "q-react-03-5",
      prompt: "What is 'prop drilling' in React?",
      options: [
        { id: "a", label: "A build optimization that compresses props" },
        { id: "b", label: "Passing props down through multiple layers of intermediate components that do not need them just to reach a deeply nested child" },
        { id: "c", label: "Validating props with TypeScript" },
        { id: "d", label: "Testing props with Jest" }
      ],
      correctIndex: 1,
      explanation: "Prop drilling is the maintenance headache of threading props through many intermediate components. It is solved via composition or Context."
    },
    {
      id: "q-react-03-6",
      prompt: "Can you pass functions as props from a parent to a child component?",
      options: [
        { id: "a", label: "No, props can only be primitive strings and numbers" },
        { id: "b", label: "Yes, passing callback functions as props allows child components to notify parent components of user events" },
        { id: "c", label: "Only if using Web Workers" },
        { id: "d", label: "Only in class components" }
      ],
      correctIndex: 1,
      explanation: "Passing callback functions (e.g. 'onItemSelect={handleSelect}') allows child components to communicate events upward to parents."
    },
    {
      id: "q-react-03-7",
      prompt: "Can a React component pass entire JSX elements as props to another component?",
      options: [
        { id: "a", label: "No, JSX elements cannot be assigned to variables or props" },
        { id: "b", label: "Yes, JSX elements are first-class JavaScript values and can be passed as props (e.g. icon={<CheckIcon />})" },
        { id: "c", label: "Only if stringified with JSON.stringify" },
        { id: "d", label: "Only in development mode" }
      ],
      correctIndex: 1,
      explanation: "Because JSX elements compile into plain JavaScript objects, they can be passed as props just like any other JavaScript value."
    },
    {
      id: "q-react-03-8",
      prompt: "What is component composition?",
      options: [
        { id: "a", label: "Writing all CSS inside one file" },
        { id: "b", label: "Building complex UIs by combining smaller, specialized, focused components together" },
        { id: "c", label: "Compiling React to WebAssembly" },
        { id: "d", label: "Using inheritance classes" }
      ],
      correctIndex: 1,
      explanation: "React favors composition over inheritance: creating flexible UI structures by nesting and assembling modular components."
    },
    {
      id: "q-react-03-9",
      prompt: "What does the spread operator {...props} do when passed to a JSX element?",
      options: [
        { id: "a", label: "Deletes all props from the element" },
        { id: "b", label: "Forwards every key-value pair in the props object as individual attributes onto the target element" },
        { id: "c", label: "Sorts the props alphabetically" },
        { id: "d", label: "Converts the props into a string" }
      ],
      correctIndex: 1,
      explanation: "'<button {...props}>' spreads all properties of the props object onto the button element as individual JSX attributes."
    },
    {
      id: "q-react-03-10",
      prompt: "What is a 'pure function' in the context of React rendering?",
      options: [
        { id: "a", label: "A function that has no parameters" },
        { id: "b", label: "A function that does not alter any external variables outside its scope and returns the same output given the same input" },
        { id: "c", label: "A function written without any brackets" },
        { id: "d", label: "A function that connects to a database" }
      ],
      correctIndex: 1,
      explanation: "A pure component function produces predictable UI output purely based on its input props and state without causing side effects."
    }
  ]
};

const reactLesson04: CurriculumItem = {
  id: "item-react-04-synthetic-events-forms",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-fundamentals",
  moduleTitle: "Module 1: React Fundamentals, JSX & Components",
  modulePosition: 1,
  title: "04. Handling Synthetic Events & Form Controls",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lesson 04: Handling Synthetic Events & Form Controls",
  contentDescription: "Handle user interaction in React: React's cross-browser SyntheticEvent wrapper, event delegation at the root, event bubbling, event.preventDefault(), and Controlled vs Uncontrolled form inputs.",
  codeSnippet: {
    language: "jsx",
    code: "import { useState } from 'react';\n\nfunction CourseEnrollmentForm({ onEnroll }) {\n  // Controlled input states\n  const [name, setName] = useState('');\n  const [track, setTrack] = useState('full-stack');\n\n  const handleSubmit = (e) => {\n    e.preventDefault(); // Prevents full browser page reload\n    if (!name.trim()) return alert('Name is required');\n    onEnroll({ name, track });\n    setName(''); // Reset form\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className=\"enrollment-form\">\n      <label htmlFor=\"fullName\">Student Full Name</label>\n      <input\n        id=\"fullName\"\n        type=\"text\"\n        value={name} // Controlled: React state is the single source of truth\n        onChange={(e) => setName(e.target.value)}\n        placeholder=\"Hari\"\n      />\n\n      <label htmlFor=\"trackSelect\">Select Track</label>\n      <select id=\"trackSelect\" value={track} onChange={(e) => setTrack(e.target.value)}>\n        <option value=\"full-stack\">Full Stack Web Development</option>\n        <option value=\"frontend\">Frontend React Mastery</option>\n      </select>\n\n      <button type=\"submit\" className=\"btn-submit\">Enroll Now</button>\n    </form>\n  );\n}"
  },
  sections: [
    {
      title: "4.1 React's SyntheticEvent System",
      explanation: "React wraps native browser DOM events in a cross-browser wrapper called `SyntheticEvent`. It provides the identical W3C event interface (e.g. `e.preventDefault()`, `e.stopPropagation()`, `e.target`) regardless of whether the user is on Safari, Chrome, Firefox, or Edge.",
      bullets: [
        "CamelCase Event Handlers: `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onMouseEnter`.",
        "Pass Functions, Not Strings: Write `onClick={handleClick}`, NOT `onClick=\"handleClick()\"`.",
        "Event Delegation: React attaches a single global event listener at the root container rather than individual DOM nodes, saving memory."
      ]
    },
    {
      title: "4.2 Controlled vs Uncontrolled Components",
      explanation: "In HTML form elements, DOM inputs maintain their own internal state. In React, there are two patterns:",
      table: {
        headers: ["Pattern", "Controlled Component", "Uncontrolled Component"],
        rows: [
          ["Single Source of Truth", "React component state via useState", "Browser DOM itself"],
          ["Input Value", "Bound explicitly via `value={state}`", "Managed via `defaultValue` and a `ref`"],
          ["Input Change", "Intercepted on every keystroke via `onChange`", "Queried only when needed (e.g., on submit) via `inputRef.current.value`"],
          ["Validation & Disabling", "Instant, keystroke-by-keystroke validation and conditional submit buttons", "Deferred until form submission"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-react-04-1",
      prompt: "What is a SyntheticEvent in React?",
      options: [
        { id: "a", label: "A fake event generated by automated testing tools" },
        { id: "b", label: "A cross-browser wrapper around the browser's native event that normalizes behavior across all browsers" },
        { id: "c", label: "An event emitted exclusively by Node.js" },
        { id: "d", label: "A CSS transition trigger" }
      ],
      correctIndex: 1,
      explanation: "SyntheticEvent wraps native browser events to ensure consistent properties and methods across all web browsers."
    },
    {
      id: "q-react-04-2",
      prompt: "Why must you call e.preventDefault() inside a form onSubmit handler in React?",
      options: [
        { id: "a", label: "To clear the text inputs" },
        { id: "b", label: "To stop the browser's default behavior of reloading the entire page and submitting a GET/POST request over HTTP" },
        { id: "c", label: "To prevent other buttons from being clicked" },
        { id: "d", label: "To format JSON" }
      ],
      correctIndex: 1,
      explanation: "Calling e.preventDefault() stops the traditional browser HTML form behavior of triggering a full page reload."
    },
    {
      id: "q-react-04-3",
      prompt: "What defines a 'Controlled Component' in React forms?",
      options: [
        { id: "a", label: "An input whose value is driven by React state and updated via an onChange handler" },
        { id: "b", label: "An input that requires an admin password to edit" },
        { id: "c", label: "An input stored in localStorage" },
        { id: "d", label: "An input that only accepts numbers" }
      ],
      correctIndex: 0,
      explanation: "In a controlled component, form element data is handled by a React component's state rather than the browser DOM."
    },
    {
      id: "q-react-04-4",
      prompt: "What is the correct syntax for passing a click handler function to a button in React?",
      options: [
        { id: "a", label: "<button onclick=\"handleClick()\">Click</button>" },
        { id: "b", label: "<button onClick={handleClick}>Click</button>" },
        { id: "c", label: "<button onClick={handleClick()}>Click</button>" },
        { id: "d", label: "<button click={handleClick}>Click</button>" }
      ],
      correctIndex: 1,
      explanation: "In JSX, event names are camelCase (onClick) and accept a function reference '{handleClick}'. '{handleClick()}' would incorrectly invoke it during render."
    },
    {
      id: "q-react-04-5",
      prompt: "How do you pass a custom argument (like item.id) to an event handler in JSX?",
      options: [
        { id: "a", label: "onClick={handleClick(item.id)}" },
        { id: "b", label: "onClick={() => handleClick(item.id)} using an inline arrow function" },
        { id: "c", label: "onClick:item.id={handleClick}" },
        { id: "d", label: "onClick={item.id -> handleClick}" }
      ],
      correctIndex: 1,
      explanation: "Wrapping the call in an arrow function '() => handleClick(item.id)' ensures the handler runs when clicked, not during render."
    },
    {
      id: "q-react-04-6",
      prompt: "What property on the change event object provides the current text typed into an input field?",
      options: [
        { id: "a", label: "e.value" },
        { id: "b", label: "e.target.value" },
        { id: "c", label: "e.current.text" },
        { id: "d", label: "e.input" }
      ],
      correctIndex: 1,
      explanation: "'e.target' points to the DOM element firing the event, and 'e.target.value' retrieves the current value of the input."
    },
    {
      id: "q-react-04-7",
      prompt: "How does React manage event listeners to optimize memory in large single-page applications?",
      options: [
        { id: "a", label: "It attaches a listener to every single HTML element" },
        { id: "b", label: "It uses event delegation, attaching a single listener per event type at the root container" },
        { id: "c", label: "It delegates events to server-side Node.js" },
        { id: "d", label: "It deletes event handlers every 5 seconds" }
      ],
      correctIndex: 1,
      explanation: "Event delegation attaches top-level listeners at the root DOM node, catching bubbled events to reduce memory consumption."
    },
    {
      id: "q-react-04-8",
      prompt: "What method prevents an event from bubbling up the parent DOM tree?",
      options: [
        { id: "a", label: "e.preventDefault()" },
        { id: "b", label: "e.stopPropagation()" },
        { id: "c", label: "e.cancelBubble()" },
        { id: "d", label: "e.halt()" }
      ],
      correctIndex: 1,
      explanation: "e.stopPropagation() halts the propagation of the event up through ancestor elements in the DOM hierarchy."
    },
    {
      id: "q-react-04-9",
      prompt: "What happens if you provide a value prop to an input without providing an onChange handler in React?",
      options: [
        { id: "a", label: "The input works normally" },
        { id: "b", label: "The input becomes read-only because React state never updates the value, and React logs a warning" },
        { id: "c", label: "The application immediately crashes" },
        { id: "d", label: "The input is converted into a password field" }
      ],
      correctIndex: 1,
      explanation: "Specifying a 'value' prop locks the input to that value. Without an 'onChange' handler to mutate state, typing has no effect."
    },
    {
      id: "q-react-04-10",
      prompt: "What hook is typically used in uncontrolled components to access input values directly from the DOM?",
      options: [
        { id: "a", label: "useState" },
        { id: "b", label: "useRef" },
        { id: "c", label: "useEffect" },
        { id: "d", label: "useContext" }
      ],
      correctIndex: 1,
      explanation: "'useRef' creates a mutable ref object whose '.current' property references the underlying native DOM node directly."
    }
  ]
};

// Module 1 Quiz & Assessment
const reactModule01Quiz: CurriculumItem = {
  id: "item-react-m1-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-fundamentals",
  moduleTitle: "Module 1: React Fundamentals, JSX & Components",
  modulePosition: 1,
  title: "Module 1 MCQs: React Fundamentals, JSX & Component Architecture",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 1 Assessment: React Foundations Knowledge Check",
  contentDescription: "Evaluate your understanding of Virtual DOM reconciliation, JSX compilation, component composition, immutable props, list keys, synthetic events, and controlled forms.",
  questions: [
    ...reactLesson01.questions!.slice(0, 4),
    ...reactLesson02.questions!.slice(0, 4),
    ...reactLesson03.questions!.slice(0, 4),
    ...reactLesson04.questions!.slice(0, 3)
  ]
};

const reactModule01Assessment: CurriculumItem = {
  id: "item-react-m1-assessment",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-01-fundamentals",
  moduleTitle: "Module 1: React Fundamentals, JSX & Components",
  modulePosition: 1,
  title: "Module 1 Assessment: Reusable Component Library & Dynamic Catalog",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 1 Practical Challenge: Building a Composable UI Component System",
  contentDescription: "Develop a modular design system in React comprising Button, Card, Badge, and an interactive CourseCatalog component with filtering and list keys.",
  assignmentPrompt: {
    instructions: "Build a set of composable React components:\n1. Reusable `Button` supporting primary, secondary, and ghost variants with disabled states.\n2. Container `Card` component using `children` slot composition.\n3. Dynamic list rendering for 6 course items with unique keys and conditional difficulty badges.\n4. Controlled search input filtering courses in real-time by title.",
    deliverables: [
      "Modular components with typed/destructured props and default values",
      "Correct list key usage with stable IDs (no array index keys)",
      "Zero DOM mutations outside the React render lifecycle"
    ]
  }
};

const reactModule01: CurriculumSubModule = {
  id: "module-react-01-fundamentals",
  subCourseId: "mod-react-essentials",
  title: "Module 1: React Fundamentals, JSX & Components",
  description: "Master the foundational pillars of React: Virtual DOM mechanics, declarative UI paradigms, JSX expressions, functional component architecture, props composition, list keys, and synthetic event handling.",
  position: 1,
  duration: "2 hours, 45 mins",
  lessons: [reactLesson01, reactLesson02, reactLesson03, reactLesson04],
  moduleQuiz: reactModule01Quiz,
  moduleAssessment: reactModule01Assessment,
  items: [reactLesson01, reactLesson02, reactLesson03, reactLesson04, reactModule01Quiz, reactModule01Assessment]
};

// =========================================================================
// MODULE 2: REACT STATE, LIFECYCLE & ADVANCED HOOKS ARCHITECTURE
// =========================================================================

const reactLesson05: CurriculumItem = {
  id: "item-react-05-state-usestate",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Module 2: State, Lifecycle & Advanced Hooks",
  modulePosition: 2,
  title: "05. Component Memory with useState & Immutability Patterns",
  duration: "35 mins",
  type: "cheatsheet",
  position: 7,
  contentHeading: "Lesson 05: Component Memory with useState & Immutability Patterns",
  contentDescription: "Master React component memory with useState: preserving state between renders, asynchronous state updates and automatic batching, updater functions, and immutable updates for objects and arrays.",
  codeSnippet: {
    language: "jsx",
    code: "import { useState } from 'react';\n\nfunction ShoppingCart() {\n  // 1. Array of objects in state\n  const [items, setItems] = useState([\n    { id: 1, name: 'React Course', price: 49, qty: 1 }\n  ]);\n\n  // 2. Immutable Array Update (Spread operator + Map)\n  const incrementQty = (id) => {\n    setItems(prevItems =>\n      prevItems.map(item =>\n        item.id === id ? { ...item, qty: item.qty + 1 } : item\n      )\n    );\n  };\n\n  // 3. Immutable Array Item Removal (Filter)\n  const removeItem = (id) => {\n    setItems(prevItems => prevItems.filter(item => item.id !== id));\n  };\n\n  return (\n    <div>\n      {items.map(it => (\n        <div key={it.id}>\n          <span>{it.name} - Qty: {it.qty}</span>\n          <button onClick={() => incrementQty(it.id)}>+</button>\n          <button onClick={() => removeItem(it.id)}>Remove</button>\n        </div>\n      ))}\n    </div>\n  );\n}"
  },
  sections: [
    {
      title: "5.1 How State Works: Component Memory",
      explanation: "Local variables declared inside a component function are recreated on every render and discarded when the function returns. The `useState` hook provides persistent memory that survives across re-renders and triggers React to recalculate the Virtual DOM when mutated via its setter function.",
      bullets: [
        "Pair of Values: `const [state, setState] = useState(initialValue)`.",
        "Triggers Re-render: Calling `setState(newValue)` notifies React that the component needs to re-render.",
        "Snapshot Model: State variables are constants within a specific render execution; state does not change mid-function."
      ]
    },
    {
      title: "5.2 Updater Functions & React 18 Automatic Batching",
      explanation: "When new state depends on previous state (like counters or queues), always pass an updater function (`setCount(prev => prev + 1)`). In React 18, all state updates inside event handlers, promises, and timeouts are automatically batched together into a single render pass.",
      table: {
        headers: ["Code Pattern", "Behavior", "Result after 3 calls"],
        rows: [
          ["setCount(count + 1); setCount(count + 1);", "Uses stale snapshot of 'count' captured at render start", "Increments by only 1"],
          ["setCount(c => c + 1); setCount(c => c + 1);", "Queues updater functions executed sequentially against latest state", "Increments by 2"]
        ]
      }
    },
    {
      title: "5.3 The Golden Rule of Immutability",
      explanation: "Never mutate objects or arrays in state directly (e.g. `items.push(...)` or `user.age = 25`). React checks if state changed by comparing object references (`Object.is(oldState, newState)`). Mutating existing references skips re-rendering. Always create a new object or array copy using spread syntax (`...`), `.map()`, or `.filter()`."
    }
  ],
  questions: [
    {
      id: "q-react-05-1",
      prompt: "What does calling a state setter function (e.g. setCount(10)) trigger in React?",
      options: [
        { id: "a", label: "A full browser page reload" },
        { id: "b", label: "A component re-render with the updated state value" },
        { id: "c", label: "Direct mutation of the innerHTML string" },
        { id: "d", label: "A network fetch call" }
      ],
      correctIndex: 1,
      explanation: "Calling a state setter updates React's internal state record and schedules a re-render of the component and its children."
    },
    {
      id: "q-react-05-2",
      prompt: "Why does items.push(newItem) fail to update the UI when items is a state variable?",
      options: [
        { id: "a", label: "Arrays cannot be stored in React state" },
        { id: "b", label: "Direct mutation modifies the existing array in memory without creating a new reference, so React's reference comparison assumes nothing changed" },
        { id: "c", label: "push() is only available in Node.js" },
        { id: "d", label: "The browser blocks array modifications" }
      ],
      correctIndex: 1,
      explanation: "React relies on reference equality checks (oldObj !== newObj). Mutating the original array in-place keeps the same reference, skipping re-renders."
    },
    {
      id: "q-react-05-3",
      prompt: "What is the correct immutable pattern to append a new item to an array stored in state?",
      options: [
        { id: "a", label: "setItems(items.push(newItem))" },
        { id: "b", label: "setItems([...items, newItem])" },
        { id: "c", label: "items.append(newItem); setItems(items);" },
        { id: "d", label: "setItems(Object.assign(items, newItem))" }
      ],
      correctIndex: 1,
      explanation: "'[...items, newItem]' spreads the existing elements into a brand-new array reference with the new item appended."
    },
    {
      id: "q-react-05-4",
      prompt: "When should you pass an updater callback like 'setCount(prev => prev + 1)' instead of 'setCount(count + 1)'?",
      options: [
        { id: "a", label: "Only when dealing with strings" },
        { id: "b", label: "Whenever the next state calculation depends on the previous state value" },
        { id: "c", label: "Only inside useEffect" },
        { id: "d", label: "Never, updater callbacks are deprecated" }
      ],
      correctIndex: 1,
      explanation: "Updater functions guarantee access to the most pending state in the queue, preventing race conditions and stale snapshots."
    },
    {
      id: "q-react-05-5",
      prompt: "How does React 18 handle multiple state updates called inside an asynchronous fetch callback?",
      options: [
        { id: "a", label: "It re-renders after every single state update" },
        { id: "b", label: "It automatically batches them together into a single re-render to optimize performance" },
        { id: "c", label: "It cancels all state updates" },
        { id: "d", label: "It throws a warning" }
      ],
      correctIndex: 1,
      explanation: "React 18 introduced Automatic Batching across all contexts (promises, setTimeout, native event handlers) into a single unified render."
    },
    {
      id: "q-react-05-6",
      prompt: "What is the correct immutable pattern to update a nested property in an object state (e.g. user.address.city)?",
      options: [
        { id: "a", label: "user.address.city = 'Austin'; setUser(user);" },
        { id: "b", label: "setUser({ ...user, address: { ...user.address, city: 'Austin' } })" },
        { id: "c", label: "setUser(delete user.address.city)" },
        { id: "d", label: "setUser(user.address = 'Austin')" }
      ],
      correctIndex: 1,
      explanation: "Shallow copying must be performed at every level of nested objects to maintain strict reference immutability."
    },
    {
      id: "q-react-05-7",
      prompt: "Can regular local variables (let counter = 0) replace useState for tracking values that change on button clicks?",
      options: [
        { id: "a", label: "Yes, regular variables work identically to state" },
        { id: "b", label: "No, local variables reset to their initial value on every render and do not trigger re-rendering when changed" },
        { id: "c", label: "Only if declared with var" },
        { id: "d", label: "Only in React Native" }
      ],
      correctIndex: 1,
      explanation: "Normal JavaScript variables do not persist between renders and do not inform React's reconciler that the UI needs to update."
    },
    {
      id: "q-react-05-8",
      prompt: "What is the return value of useState(initialValue)?",
      options: [
        { id: "a", label: "A single object with get and set methods" },
        { id: "b", label: "An array with exactly two elements: the current state value and a state updater function" },
        { id: "c", label: "A Promise resolving to the state" },
        { id: "d", label: "A DOM reference" }
      ],
      correctIndex: 1,
      explanation: "useState returns a 2-tuple: '[currentValue, setValue]', conventionally destructured by developers."
    },
    {
      id: "q-react-05-9",
      prompt: "What is 'lazy initial state' in useState?",
      options: [
        { id: "a", label: "State that updates only after 5 seconds" },
        { id: "b", label: "Passing an initializer function 'useState(() => computeExpensiveValue())' so the computation runs only once during mount" },
        { id: "c", label: "State stored in service workers" },
        { id: "d", label: "State loaded from an external CDN" }
      ],
      correctIndex: 1,
      explanation: "Passing a function to useState (() => computeHeavyInitialValue()) prevents expensive operations from running on subsequent re-renders."
    },
    {
      id: "q-react-05-10",
      prompt: "What happens if you call setState with the exact same primitive value as current state (e.g. setCount(5) when count is already 5)?",
      options: [
        { id: "a", label: "React re-renders the component twice" },
        { id: "b", label: "React bails out of re-rendering because Object.is detects no change" },
        { id: "c", label: "React resets state to 0" },
        { id: "d", label: "React throws a warning" }
      ],
      correctIndex: 1,
      explanation: "If you update a state hook to the same value as the current state, React bails out without re-rendering children or firing effects."
    }
  ]
};

const reactLesson06: CurriculumItem = {
  id: "item-react-06-useeffect-lifecycle",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Module 2: State, Lifecycle & Advanced Hooks",
  modulePosition: 2,
  title: "06. Side Effects, Data Fetching & Cleanup with useEffect",
  duration: "35 mins",
  type: "cheatsheet",
  position: 8,
  contentHeading: "Lesson 06: Side Effects, Data Fetching & Cleanup with useEffect",
  contentDescription: "Synchronize components with external systems: fetching API data, handling race conditions with abort controllers, managing dependencies properly, and avoiding infinite re-render loops.",
  codeSnippet: {
    language: "jsx",
    code: "import { useState, useEffect } from 'react';\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    // 1. AbortController cancels obsolete requests on fast prop changes\n    const controller = new AbortController();\n    setLoading(true);\n\n    fetch(`https://api.example.com/users/${userId}`, { signal: controller.signal })\n      .then(res => res.json())\n      .then(data => {\n        setUser(data);\n        setLoading(false);\n      })\n      .catch(err => {\n        if (err.name !== 'AbortError') setLoading(false);\n      });\n\n    // 2. Cleanup function runs before next effect & when unmounting\n    return () => {\n      controller.abort();\n    };\n  }, [userId]); // 3. Dependency array: re-run ONLY when userId changes\n\n  if (loading) return <p>Loading profile...</p>;\n  return <h2>{user?.name}</h2>;\n}"
  },
  sections: [
    {
      title: "6.1 What is a Side Effect in React?",
      explanation: "A side effect is any operation that reaches outside the functional component's render execution: making HTTP requests, setting timer intervals, subscribing to WebSockets, writing to localStorage, or manually mutating document.title. The `useEffect` hook schedules side effects to run *after* the browser DOM has been painted.",
      bullets: [
        "Runs After Paint: Does not block browser rendering.",
        "Cleanup Functions: Returning a cleanup function cleans up subscriptions, timers, and aborts pending network fetches.",
        "The Dependency Array: Controls precisely when the effect should re-execute."
      ]
    },
    {
      title: "6.2 Understanding the Dependency Array Rules",
      explanation: "The second argument to `useEffect` defines its execution schedule:",
      table: {
        headers: ["Dependency Array", "When Effect Runs", "Common Use Case"],
        rows: [
          ["Omitted entirely (no array)", "Runs after EVERY single render of the component", "Rare: Global DOM metrics tracking"],
          ["Empty array: []", "Runs ONCE when component mounts; cleanup runs when unmounting", "Initial data fetch, global window resize listeners"],
          ["With dependencies: [id, filter]", "Runs on mount AND whenever any dependency value changes", "Refetching data when an active ID or search query changes"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-react-06-1",
      prompt: "What is the primary purpose of the useEffect hook in React?",
      options: [
        { id: "a", label: "To write CSS animations" },
        { id: "b", label: "To synchronize a component with external systems (APIs, timers, browser APIs, subscriptions) after rendering" },
        { id: "c", label: "To define database schemas" },
        { id: "d", label: "To format JSX tags" }
      ],
      correctIndex: 1,
      explanation: "useEffect allows components to perform side effects like data fetching, manual DOM operations, and event subscriptions after paint."
    },
    {
      id: "q-react-06-2",
      prompt: "What happens if you omit the dependency array entirely in useEffect(fn)?",
      options: [
        { id: "a", label: "The effect never runs" },
        { id: "b", label: "The effect runs after the initial render and after EVERY subsequent re-render" },
        { id: "c", label: "The effect runs only once" },
        { id: "d", label: "React throws an error" }
      ],
      correctIndex: 1,
      explanation: "Without a dependency array, useEffect executes after every single render pass, which can cause infinite loops if state is updated inside."
    },
    {
      id: "q-react-06-3",
      prompt: "What does an empty dependency array '[]' in useEffect tell React?",
      options: [
        { id: "a", label: "Run the effect on every second" },
        { id: "b", label: "Run the effect exactly once when the component mounts and clean up when it unmounts" },
        { id: "c", label: "Never run the effect" },
        { id: "d", label: "Run only on error" }
      ],
      correctIndex: 1,
      explanation: "An empty array means the effect depends on no changing state/props, so it executes only on mount and cleans up on unmount."
    },
    {
      id: "q-react-06-4",
      prompt: "How do you define a cleanup routine (like clearInterval or aborting fetch) in useEffect?",
      options: [
        { id: "a", label: "By calling useEffectCleanup()" },
        { id: "b", label: "By returning a cleanup function from inside the effect callback" },
        { id: "c", label: "By passing a third parameter to useEffect" },
        { id: "d", label: "By writing a window.onunload handler" }
      ],
      correctIndex: 1,
      explanation: "If an effect returns a function, React executes that function prior to re-running the effect and when the component unmounts."
    },
    {
      id: "q-react-06-5",
      prompt: "Why can't the callback passed directly to useEffect be marked as async, e.g. useEffect(async () => ...)?",
      options: [
        { id: "a", label: "Because async functions return a Promise, but React expects useEffect to return either undefined or a cleanup function" },
        { id: "b", label: "Because JavaScript does not support async functions in React" },
        { id: "c", label: "Because async functions cause 500 errors" },
        { id: "d", label: "Because Vite disables async" }
      ],
      correctIndex: 0,
      explanation: "Async functions return a Promise. React expects the effect return value to be a cleanup function, not a Promise."
    },
    {
      id: "q-react-06-6",
      prompt: "How should you correctly execute an async fetch inside useEffect?",
      options: [
        { id: "a", label: "Use sync XMLHttpRequest" },
        { id: "b", label: "Define an internal async function inside the effect and invoke it: useEffect(() => { async function fetchData() { ... } fetchData(); }, [])" },
        { id: "c", label: "Convert the component into an async function" },
        { id: "d", label: "Call fetch in the return statement" }
      ],
      correctIndex: 1,
      explanation: "Declaring an inner async function and calling it immediately inside the effect callback is the standard idiomatic React pattern."
    },
    {
      id: "q-react-06-7",
      prompt: "What is an infinite re-render loop in useEffect, and what typically causes it?",
      options: [
        { id: "a", label: "A browser crash caused by missing CSS" },
        { id: "b", label: "Updating state inside an effect that includes that same state (or no array) in its dependencies, triggering endless render cycles" },
        { id: "c", label: "Running two React apps on the same machine" },
        { id: "d", label: "Using TypeScript interfaces" }
      ],
      correctIndex: 1,
      explanation: "Updating state inside an effect causes a re-render. If that effect runs on every render, it triggers an infinite render cycle."
    },
    {
      id: "q-react-06-8",
      prompt: "What standard browser API is used to cancel ongoing HTTP requests when a user rapidly changes pages or tabs?",
      options: [
        { id: "a", label: "CancelRequest" },
        { id: "b", label: "AbortController" },
        { id: "c", label: "StopFetch" },
        { id: "d", label: "CloseSocket" }
      ],
      correctIndex: 1,
      explanation: "AbortController allows canceling pending fetch requests via its signal property inside the effect's cleanup function."
    },
    {
      id: "q-react-06-9",
      prompt: "Why does React StrictMode invoke effects twice on mount in development mode?",
      options: [
        { id: "a", label: "It is a bug in React 18" },
        { id: "b", label: "To help developers identify missing cleanup functions and race conditions by simulating immediate unmounting and remounting" },
        { id: "c", label: "To double-check the internet speed" },
        { id: "d", label: "To cache API responses" }
      ],
      correctIndex: 1,
      explanation: "StrictMode intentionally remounts components in dev to verify that setup and cleanup routines balance symmetrically."
    },
    {
      id: "q-react-06-10",
      prompt: "If an effect uses a variable 'searchTerm' from component props or state, should it be included in the dependency array?",
      options: [
        { id: "a", label: "No, props should never be dependencies" },
        { id: "b", label: "Yes, all reactive values (props, state) used inside the effect must be specified in the dependency array" },
        { id: "c", label: "Only if searchTerm is a boolean" },
        { id: "d", label: "Only in production" }
      ],
      correctIndex: 1,
      explanation: "React's dependency rule requires all reactive variables referenced inside the effect to be declared in dependencies."
    }
  ]
};

const reactLesson07: CurriculumItem = {
  id: "item-react-07-context-custom-hooks",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Module 2: State, Lifecycle & Advanced Hooks",
  modulePosition: 2,
  title: "07. Global State with useContext & Custom Hooks Architecture",
  duration: "35 mins",
  type: "cheatsheet",
  position: 9,
  contentHeading: "Lesson 07: Global State with useContext & Custom Hooks Architecture",
  contentDescription: "Eliminate prop drilling with React Context: creating context, providing values via Provider, consuming with useContext, and building reusable custom hooks for authentication, themes, and window metrics.",
  codeSnippet: {
    language: "jsx",
    code: "import { createContext, useContext, useState } from 'react';\n\n// 1. Create dedicated Context\nconst AuthContext = createContext(null);\n\n// 2. Context Provider Component\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState({ name: 'Hari', role: 'student' });\n  const logout = () => setUser(null);\n\n  return (\n    <AuthContext.Provider value={{ user, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\n// 3. Custom Hook encapsulating context consumption\nexport function useAuth() {\n  const context = useContext(AuthContext);\n  if (!context) throw new Error('useAuth must be used within an AuthProvider');\n  return context;\n}\n\n// 4. Any descendant component consumes auth without prop drilling\nfunction UserHeader() {\n  const { user, logout } = useAuth();\n  if (!user) return <button>Sign In</button>;\n  return (\n    <div>\n      <span>Welcome, {user.name}</span>\n      <button onClick={logout}>Sign Out</button>\n    </div>\n  );\n}"
  },
  sections: [
    {
      title: "7.1 What is React Context?",
      explanation: "React Context allows passing data deeply through the component tree without manually passing props down through every intermediate component. Common use cases include current authenticated user, UI theme (dark/light), language localization, and global notifications.",
      bullets: [
        "createContext(defaultValue): Initializes a new Context object.",
        "Context.Provider: Wraps child components and supplies the current context `value`.",
        "useContext(Context): Hook used by consumer components to read the context value.",
        "Re-render on Change: When the Provider's `value` changes, all consumers re-render automatically."
      ]
    },
    {
      title: "7.2 Building Custom Hooks",
      explanation: "A custom hook is a standard JavaScript function whose name starts with `use` and which calls other React hooks (`useState`, `useEffect`, `useContext`, `useRef`). Custom hooks allow sharing stateful logic across multiple components without duplicating code.",
      codeSnippet: {
        language: "jsx",
        code: "// Custom Hook: useLocalStorage\nfunction useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initialValue;\n  });\n\n  const setStoredValue = (newValue) => {\n    setValue(newValue);\n    localStorage.setItem(key, JSON.stringify(newValue));\n  };\n\n  return [value, setStoredValue];\n}"
      }
    }
  ],
  questions: [
    {
      id: "q-react-07-1",
      prompt: "What major problem does React Context solve in component architectures?",
      options: [
        { id: "a", label: "It compiles JSX into machine code" },
        { id: "b", label: "It eliminates 'prop drilling' by allowing data to be consumed by any descendant component without passing through intermediaries" },
        { id: "c", label: "It speeds up database indexing" },
        { id: "d", label: "It replaces CSS files" }
      ],
      correctIndex: 1,
      explanation: "Context provides a broadcast mechanism for global data (auth, themes), bypassing intermediate components."
    },
    {
      id: "q-react-07-2",
      prompt: "What hook is used to consume values provided by a Context.Provider?",
      options: [
        { id: "a", label: "useConsumer" },
        { id: "b", label: "useContext" },
        { id: "c", label: "useProvider" },
        { id: "d", label: "useGlobal" }
      ],
      correctIndex: 1,
      explanation: "The 'useContext(MyContext)' hook accepts a context object and returns its current value."
    },
    {
      id: "q-react-07-3",
      prompt: "What naming convention MUST all custom React hooks follow?",
      options: [
        { id: "a", label: "They must end with 'Hook', e.g. authHook()" },
        { id: "b", label: "They must start with the prefix 'use', e.g. useAuth() or useWindowSize()" },
        { id: "c", label: "They must be in uppercase, e.g. USEAUTH()" },
        { id: "d", label: "They must have an async prefix" }
      ],
      correctIndex: 1,
      explanation: "The 'use' prefix is required by React's linter rules to identify functions that call other hooks and enforce the Rules of Hooks."
    },
    {
      id: "q-react-07-4",
      prompt: "When two different components call the same custom hook 'useCounter()', do they share the same state instance?",
      options: [
        { id: "a", label: "Yes, custom hooks are global singletons" },
        { id: "b", label: "No, custom hooks share stateful logic, but each component call gets its own independent, isolated state" },
        { id: "c", label: "Only if wrapped in a Context" },
        { id: "d", label: "Only in production builds" }
      ],
      correctIndex: 1,
      explanation: "Custom hooks reuse logic, not state. Each component calling a hook gets its own isolated state variables unless backed by a shared Context."
    },
    {
      id: "q-react-07-5",
      prompt: "What are the two core Rules of Hooks in React?",
      options: [
        { id: "a", label: "1. Only call hooks at the top level of components/custom hooks. 2. Only call hooks from React function components or custom hooks." },
        { id: "b", label: "1. Hooks must return promises. 2. Hooks must be written in TypeScript." },
        { id: "c", label: "1. Only call hooks inside loops. 2. Always wrap hooks in try/catch." },
        { id: "d", label: "Hooks can be called anywhere in any function." }
      ],
      correctIndex: 0,
      explanation: "Never call hooks inside loops, conditions, or nested functions; always call them at the top level to preserve hook call order."
    },
    {
      id: "q-react-07-6",
      prompt: "What happens to components that consume a Context when the Provider's value changes?",
      options: [
        { id: "a", label: "They do nothing until the user clicks" },
        { id: "b", label: "All consuming components automatically re-render with the new context value" },
        { id: "c", label: "Only the parent re-renders" },
        { id: "d", label: "The browser reloads" }
      ],
      correctIndex: 1,
      explanation: "Whenever the 'value' passed to a Provider changes, all consumer components subscribed to that context re-render."
    },
    {
      id: "q-react-07-7",
      prompt: "Why should Context not be used for high-frequency, rapidly updating state (like mouse coordinates or 60fps animations)?",
      options: [
        { id: "a", label: "Context cannot store numbers" },
        { id: "b", label: "Every value update causes all subscriber components across the entire tree to re-render, creating performance bottlenecks" },
        { id: "c", label: "Context is asynchronous" },
        { id: "d", label: "React Fiber disables Context at 60fps" }
      ],
      correctIndex: 1,
      explanation: "Broadcasting rapid updates via Context forces widespread component tree re-renders. High-frequency state is better handled locally or with dedicated stores."
    },
    {
      id: "q-react-07-8",
      prompt: "Why is it best practice to create a custom consumer hook (e.g. useAuth) rather than exposing AuthContext directly?",
      options: [
        { id: "a", label: "It looks more modern" },
        { id: "b", label: "It encapsulates error handling (verifying the component is inside the Provider) and hides context internals" },
        { id: "c", label: "Direct context consumption is deprecated" },
        { id: "d", label: "It compresses JSX" }
      ],
      correctIndex: 1,
      explanation: "A custom hook can assert that 'context !== null', throwing a helpful error if someone forgets to wrap the component in the Provider."
    },
    {
      id: "q-react-07-9",
      prompt: "Can a component consume multiple different contexts at the same time?",
      options: [
        { id: "a", label: "No, a component can only subscribe to one Context" },
        { id: "b", label: "Yes, by calling useContext multiple times (e.g. const auth = useAuth(); const theme = useTheme();)" },
        { id: "c", label: "Only if using class components" },
        { id: "d", label: "Only if merged into a single object" }
      ],
      correctIndex: 1,
      explanation: "Components can consume as many separate Context providers as needed by invoking useContext for each context."
    },
    {
      id: "q-react-07-10",
      prompt: "Where should Context Providers typically be placed in the component hierarchy?",
      options: [
        { id: "a", label: "At the leaf nodes of the tree" },
        { id: "b", label: "Near the top of the component tree (e.g. App.jsx) wrapping all components that need access to the data" },
        { id: "c", label: "Inside individual buttons" },
        { id: "d", label: "In the public index.html" }
      ],
      correctIndex: 1,
      explanation: "Providers wrap ancestor branches of the component hierarchy so all descendant components can access the provided context value."
    }
  ]
};

const reactLesson08: CurriculumItem = {
  id: "item-react-08-performance-usememo-callback",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Module 2: State, Lifecycle & Advanced Hooks",
  modulePosition: 2,
  title: "08. Performance Optimization: useMemo, useCallback & React.memo",
  duration: "35 mins",
  type: "cheatsheet",
  position: 10,
  contentHeading: "Lesson 08: Performance Optimization: useMemo, useCallback & React.memo",
  contentDescription: "Optimize React rendering: preventing unnecessary child re-renders with React.memo, caching expensive calculations with useMemo, maintaining stable function references with useCallback, and profiling components.",
  codeSnippet: {
    language: "jsx",
    code: "import React, { useState, useMemo, useCallback } from 'react';\n\n// 1. React.memo prevents re-rendering if props are shallowly identical\nconst CourseRow = React.memo(({ course, onSelect }) => {\n  console.log('Rendering Row:', course.id);\n  return (\n    <div onClick={() => onSelect(course.id)} className=\"course-row\">\n      <span>{course.title}</span>\n    </div>\n  );\n});\n\nfunction CourseManager({ allCourses }) {\n  const [query, setQuery] = useState('');\n  const [theme, setTheme] = useState('dark');\n\n  // 2. useMemo caches expensive calculation results\n  const filteredCourses = useMemo(() => {\n    console.log('Computing heavy filter...');\n    return allCourses.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));\n  }, [allCourses, query]);\n\n  // 3. useCallback returns a stable function reference across re-renders\n  const handleSelect = useCallback((id) => {\n    console.log('Selected course:', id);\n  }, []); // Stable: never changes\n\n  return (\n    <div className={`theme-${theme}`}>\n      <input value={query} onChange={e => setQuery(e.target.value)} />\n      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>\n      {filteredCourses.map(c => (\n        <CourseRow key={c.id} course={c} onSelect={handleSelect} />\n      ))}\n    </div>\n  );\n}"
  },
  sections: [
    {
      title: "8.1 Why Do Components Re-render?",
      explanation: "In React, a component re-renders whenever its state changes, its parent re-renders, or context it consumes updates. In most applications, re-renders are fast and harmless. However, when rendering thousands of items or executing heavy calculations, performance optimization hooks prevent wasted computation.",
      bullets: [
        "React.memo(Component): Higher-Order Component that skips re-rendering if incoming props are shallowly equal to previous props.",
        "useMemo(() => computeHeavy(a, b), [a, b]): Caches the *result* of a calculation between renders.",
        "useCallback(fn, deps): Caches a *function definition* between renders so child components receive a stable reference."
      ]
    },
    {
      title: "8.2 The Pitfall of Premature Optimization",
      explanation: "Do not wrap every function in `useCallback` or every value in `useMemo`. Both hooks carry overhead (memory allocation for dependency arrays and comparison checks on every render). Optimize only when you have identified a measurable performance problem with React DevTools Profiler."
    }
  ],
  questions: [
    {
      id: "q-react-08-1",
      prompt: "What does React.memo() do when wrapping a functional component?",
      options: [
        { id: "a", label: "It stores the component in browser localStorage" },
        { id: "b", label: "It skips re-rendering the component if its new props are shallowly equal to its previous props" },
        { id: "c", label: "It disables all useState hooks" },
        { id: "d", label: "It forces the component to render every 10ms" }
      ],
      correctIndex: 1,
      explanation: "React.memo is a higher-order component that memoizes rendering, skipping render passes if props haven't changed."
    },
    {
      id: "q-react-08-2",
      prompt: "What is the primary purpose of the useMemo hook?",
      options: [
        { id: "a", label: "To cache the returned result of an expensive calculation between renders" },
        { id: "b", label: "To remember user login passwords" },
        { id: "c", label: "To cache CSS files in browser cache" },
        { id: "d", label: "To create database indexes" }
      ],
      correctIndex: 0,
      explanation: "useMemo caches the calculation result and only recomputes it when specified dependencies change."
    },
    {
      id: "q-react-08-3",
      prompt: "What is the primary purpose of the useCallback hook?",
      options: [
        { id: "a", label: "To call a phone number" },
        { id: "b", label: "To return a memoized, stable callback function reference between renders" },
        { id: "c", label: "To execute a callback after 5 seconds" },
        { id: "d", label: "To replace fetch()" }
      ],
      correctIndex: 1,
      explanation: "useCallback caches function definitions so passing callbacks to memoized child components doesn't break shallow prop comparison."
    },
    {
      id: "q-react-08-4",
      prompt: "Why does passing an inline function 'onClick={() => doSomething()}' to a React.memo child break its memoization?",
      options: [
        { id: "a", label: "Inline functions cannot be executed in React" },
        { id: "b", label: "A new function instance is created in memory on every render, so the child's shallow prop comparison sees a changed prop" },
        { id: "c", label: "React.memo does not support buttons" },
        { id: "d", label: "Inline functions throw a SyntaxError" }
      ],
      correctIndex: 1,
      explanation: "In JavaScript, '(() => {}) !== (() => {})'. Creating functions inline on each render provides a new reference, invalidating shallow equality."
    },
    {
      id: "q-react-08-5",
      prompt: "What is the relationship between useCallback(fn, deps) and useMemo?",
      options: [
        { id: "a", label: "They are completely unrelated" },
        { id: "b", label: "useCallback(fn, deps) is syntactic sugar equivalent to useMemo(() => fn, deps)" },
        { id: "c", label: "useMemo is only for strings; useCallback is only for numbers" },
        { id: "d", label: "useCallback can only be called inside loops" }
      ],
      correctIndex: 1,
      explanation: "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps), specifically designed for caching function references."
    },
    {
      id: "q-react-08-6",
      prompt: "What tool allows developers to record render times and find wasted re-renders in React applications?",
      options: [
        { id: "a", label: "React DevTools Profiler" },
        { id: "b", label: "Postman" },
        { id: "c", label: "Git Bash" },
        { id: "d", label: "Webpack Bundle Analyzer" }
      ],
      correctIndex: 0,
      explanation: "The React Developer Tools extension features a dedicated Profiler tab that visually graphs render durations and reasons."
    },
    {
      id: "q-react-08-7",
      prompt: "What is 'premature optimization' in React?",
      options: [
        { id: "a", label: "Using Vite instead of Webpack" },
        { id: "b", label: "Wrapping every function and value in useCallback and useMemo without profiling, adding unnecessary memory and check overhead" },
        { id: "c", label: "Building apps before testing" },
        { id: "d", label: "Deploying to production on Friday" }
      ],
      correctIndex: 1,
      explanation: "useMemo and useCallback add memory and comparison overhead; applying them everywhere without need degrades performance."
    },
    {
      id: "q-react-08-8",
      prompt: "By default, when a parent component re-renders, what happens to its child components?",
      options: [
        { id: "a", label: "Children only re-render if their props changed" },
        { id: "b", label: "All child components recursively re-render by default, unless wrapped in React.memo" },
        { id: "c", label: "Children never re-render" },
        { id: "d", label: "React unmounts all children" }
      ],
      correctIndex: 1,
      explanation: "React's default behavior is to re-render the entire component sub-tree under a component whose state changes."
    },
    {
      id: "q-react-08-9",
      prompt: "What does useRef return, and why does mutating it NOT trigger a re-render?",
      options: [
        { id: "a", label: "It returns null and crashes the app" },
        { id: "b", label: "It returns a mutable object '{ current: ... }' that persists across renders without notifying React's reconciler" },
        { id: "c", label: "It returns an array of DOM nodes" },
        { id: "d", label: "It triggers a re-render after 1 second" }
      ],
      correctIndex: 1,
      explanation: "useRef is a plain JavaScript object holding a '.current' property; changing it does not schedule a render pass."
    },
    {
      id: "q-react-08-10",
      prompt: "What is code-splitting using React.lazy() and Suspense used for?",
      options: [
        { id: "a", label: "Splitting code into HTML and CSS" },
        { id: "b", label: "Dynamically loading component JavaScript bundles only when they are rendered on screen, decreasing initial bundle size" },
        { id: "c", label: "Splitting code across different GitHub repos" },
        { id: "d", label: "Running code on different CPU threads" }
      ],
      correctIndex: 1,
      explanation: "React.lazy() and <Suspense> enable on-demand bundle chunk loading, accelerating first page load times."
    }
  ]
};

// Module 2 Quiz & Assessment
const reactModule02Quiz: CurriculumItem = {
  id: "item-react-m2-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Module 2: State, Lifecycle & Advanced Hooks",
  modulePosition: 2,
  title: "Module 2 MCQs: React State, Lifecycle & Advanced Hooks Architecture",
  duration: "25 mins",
  type: "quiz",
  position: 11,
  isModuleQuiz: true,
  contentHeading: "Module 2 Assessment: React Hooks & State Mastery Check",
  contentDescription: "Evaluate your understanding of useState immutability, useEffect cleanup & dependency rules, Context providers, custom hooks architecture, and useMemo/useCallback optimization.",
  questions: [
    ...reactLesson05.questions!.slice(0, 4),
    ...reactLesson06.questions!.slice(0, 4),
    ...reactLesson07.questions!.slice(0, 4),
    ...reactLesson08.questions!.slice(0, 3)
  ]
};

const reactModule02Assessment: CurriculumItem = {
  id: "item-react-m2-assessment",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Module 2: State, Lifecycle & Advanced Hooks",
  modulePosition: 2,
  title: "Module 2 Assessment: Real-Time Stateful Dashboard with Context & Custom Hooks",
  duration: "50 mins",
  type: "assignment",
  position: 12,
  isModuleAssessment: true,
  contentHeading: "Module 2 Practical Challenge: Interactive Learning Analytics Dashboard",
  contentDescription: "Architect a comprehensive React application featuring global theme context, custom useLocalStorage hook, asynchronous mock API fetching, and memoized metrics calculations.",
  assignmentPrompt: {
    instructions: "Build an interactive student analytics dashboard:\n1. Global Theme Context (Dark / Light mode) with custom `useTheme` consumer hook.\n2. Custom `useLocalStorage(key, initialValue)` hook persisting student preferences.\n3. `useEffect` data fetching with AbortController for simulated course metrics.\n4. Optimized table rendering using `useMemo` for sorting/filtering and `useCallback` for row action handlers.",
    deliverables: [
      "Modular source files: context/ThemeContext.jsx, hooks/useLocalStorage.js, components/Dashboard.jsx",
      "Correct dependency arrays in all useEffect and useMemo calls",
      "Full responsive design functioning cleanly in dark and light modes"
    ]
  }
};

const reactModule02: CurriculumSubModule = {
  id: "module-react-02-state-hooks",
  subCourseId: "mod-react-essentials",
  title: "Module 2: State, Lifecycle & Advanced Hooks",
  description: "Master React state mechanics: useState immutability patterns, useEffect lifecycle & data fetching, global state with useContext, building custom hooks, and performance optimization with useMemo, useCallback, and React.memo.",
  position: 2,
  duration: "2 hours, 50 mins",
  lessons: [reactLesson05, reactLesson06, reactLesson07, reactLesson08],
  moduleQuiz: reactModule02Quiz,
  moduleAssessment: reactModule02Assessment,
  items: [reactLesson05, reactLesson06, reactLesson07, reactLesson08, reactModule02Quiz, reactModule02Assessment]
};

// =========================================================================
// SUB-COURSE FINAL ASSESSMENT
// =========================================================================

const reactSubCourseExam: CurriculumItem = {
  id: "item-react-course-assessment",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 3,
  title: "Sub-Course Assessment: React.js Comprehensive Certification Exam",
  duration: "40 mins",
  type: "quiz",
  position: 13,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 05 Certification Exam: React.js Architecture",
  contentDescription: "Comprehensive examination covering all modules: Virtual DOM reconciliation, JSX, component composition, synthetic events, controlled forms, useState immutability, useEffect lifecycle, Context, custom hooks, and performance tuning.",
  questions: [
    ...reactLesson01.questions!.slice(0, 3),
    ...reactLesson02.questions!.slice(0, 3),
    ...reactLesson03.questions!.slice(0, 3),
    ...reactLesson04.questions!.slice(0, 3),
    ...reactLesson05.questions!.slice(0, 3),
    ...reactLesson06.questions!.slice(0, 3),
    ...reactLesson07.questions!.slice(0, 4),
    ...reactLesson08.questions!.slice(0, 3)
  ]
};

const reactSubCourseProject: CurriculumItem = {
  id: "item-react-course-project",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-hooks",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 3,
  title: "Sub-Course Capstone Project: Full-Featured Interactive Course / SaaS Portal",
  duration: "1 hour, 45 mins",
  type: "assignment",
  position: 14,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 05 Capstone: Production-Grade React SaaS Web Application",
  contentDescription: "Architect, develop, and deploy an enterprise-grade React application featuring routing, state management, search filters, form validation, modals, and persistent progress tracking.",
  assignmentPrompt: {
    instructions: "Build a production-grade single page application (SPA):\n1. Component Hierarchy: Navbar, Sidebar, CourseGrid, CourseDetailsModal, and ProgressTracker.\n2. State Architecture: Global Context for active course and user bookmarks.\n3. Real-Time Filters: Instant search, category filters, and sorting by duration.\n4. Responsive UI: Mobile drawer toggle and fluid desktop layouts.\n5. Custom Hooks: useDebounce for search input and useLocalStorage for bookmark persistence.",
    deliverables: [
      "Modular React source tree with clean separation of components, context, and hooks",
      "Interactive features operating smoothly without full browser reloads",
      "Documentation detailing component hierarchy, state flow, and optimization choices"
    ]
  }
};

export const reactJsSubCourse: CurriculumSubCourse = {
  id: "mod-react-essentials",
  title: "Frontend Development with React",
  position: 5,
  duration: "6 hours, 15 mins",
  description: "Master modern single-page frontend engineering with React: declarative UI, Virtual DOM reconciliation, JSX, component composition, synthetic events, controlled forms, hooks architecture (useState, useEffect, useContext, useMemo, useCallback), custom hooks, and performance optimization.",
  modules: [reactModule01, reactModule02],
  courseAssessment: reactSubCourseExam,
  courseProject: reactSubCourseProject,
  items: [
    ...reactModule01.items,
    ...reactModule02.items,
    reactSubCourseExam,
    reactSubCourseProject
  ]
};
