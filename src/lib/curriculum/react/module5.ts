import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 5: API INTEGRATION AND OPTIMIZATION
// Lessons 119 - 123 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 119: API INTEGRATION AND HTTP STATES
const lesson119: CurriculumItem = {
  id: "item-react-119-api-integration-http-states",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-05-api-optimization",
  moduleTitle: "Module 5: API Integration and Optimization",
  modulePosition: 5,
  title: "119. API Integration and HTTP States",
  duration: "35 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 119: API Integration and HTTP States",
  contentDescription: "Master organizing reusable API service layers, handling loading/success/empty/error states explicitly, client environment variables (VITE_API_URL), and avoiding exposing private secrets.",
  codeSnippet: {
    language: "jsx",
    code: `// 1. Reusable API Client Service (apiClient.js)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchCourses(searchTerm = '') {
  const url = searchTerm
    ? \`\${API_BASE_URL}/courses?search=\${encodeURIComponent(searchTerm)}\`
    : \`\${API_BASE_URL}/courses\`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // Attach auth token if available
      'Authorization': \`Bearer \${localStorage.getItem('token') || ''}\`
    }
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || \`HTTP error! Status: \${response.status}\`);
  }

  return response.json();
}

// 2. Component consuming API client with explicit states
function CourseExplorer() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const loadCourses = async (query = '') => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const data = await fetchCourses(query);
      setCourses(data);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  useEffect(() => { loadCourses(); }, []);

  if (status === 'loading') return <div className="loader">Loading courses…</div>;
  if (status === 'error') return <div className="error-alert">Error: {errorMessage}</div>;
  if (status === 'success' && courses.length === 0) return <p>No courses available.</p>;

  return (
    <div className="grid">
      {courses.map(c => <div key={c.id} className="card">{c.title}</div>)}
    </div>
  );
}`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Restaurant Waiter Service",
      explanation: "Imagine you are dining at a restaurant. As a customer (React Component), you don't walk into the hot kitchen, turn on the stove, and rummage through the meat freezer (direct database queries). Instead, you call the professional waiter (API Client Service). You tell the waiter: 'I'd like the pasta with extra cheese' (HTTP Request). The waiter takes your order to the kitchen (Express Backend), and brings back the cooked dish (JSON response). If the kitchen is out of cheese, the waiter politely informs you (404/Error). Separating the API service from the component keeps your code clean, modular, and testable!",
      bullets: [
        "API Service Layer: Keep network URLs, header formatting, and JSON parsing in dedicated utility functions.",
        "Explicit State Machine: Use explicit statuses (`idle`, `loading`, `success`, `error`) instead of confusing boolean combinations.",
        "Security Invariant: Client-side environment variables prefixed with `VITE_` are completely PUBLIC in browser bundles. NEVER store database passwords or private API keys in client code!"
      ]
    },
    {
      title: "2. The Danger of Exposing Secrets in Client Bundles",
      explanation: "Understanding environment variable security in modern React apps:",
      table: {
        headers: ["Variable Location", "Visible in Browser?", "Safe Content Example", "DANGEROUS Content (NEVER PUT HERE!)"],
        rows: [
          ["`VITE_API_BASE_URL` (Client)", "YES — Bundled into public JS", "`https://api.blezex.com`", "Stripe Secret Key, Database Password"],
          ["`.env` on Express Server (Backend)", "NO — Stays strictly on server", "`DB_PASSWORD=secret123`", "Safe on server; never expose to client"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Error Handling Beyond 200 OK",
      explanation: "Network requests fail in two different ways: network transport failure and server application failure. Your API client must handle both cleanly:",
      bullets: [
        "Catch Network Drops: Wrapped in `try / catch` to catch offline status or DNS failures.",
        "Inspect HTTP Status: `if (!response.ok)` catches 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, and 500 Server Crash.",
        "Parse Error JSON: Safely attempt to parse `response.json()` to display the backend's friendly error message."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common API integration mistakes:",
      bullets: [
        "Hardcoding localhost URLs: Writing `fetch('http://localhost:5000/api')`. When deployed to production on Vercel or AWS, this breaks! Always use `import.meta.env.VITE_API_URL`.",
        "Assuming `fetch()` rejects on 404: It does not reject! Always verify `response.ok`.",
        "Leaving Users Hanging: Failing to provide a visual spinner or disabled button while requests are in flight."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a dedicated `courseService.js` file with `getAllCourses()`, `getCourseById(id)`, and `enrollInCourse(id)`. Build a UI that consumes these functions, displays loading skeletons during load, and offers a 'Retry' button when a network request fails."
    }
  ],
  questions: [
    {
      id: "q-react-119-1",
      prompt: "Why should API calls be extracted into a dedicated service layer (e.g. `courseService.js`) rather than written inline inside components?",
      options: [
        { id: "a", label: "To decouple network logic from presentation, improve reusability, make testing easier, and centralize headers/error handling" },
        { id: "b", label: "Because React forbids `fetch()` inside components" },
        { id: "c", label: "To make the application run without JavaScript" },
        { id: "d", label: "Because Vite requires it for build" }
      ],
      correctAnswer: "a",
      explanation: "Centralizing API logic in a service layer promotes clean separation of concerns, DRY code, and straightforward mocking during unit tests."
    },
    {
      id: "q-react-119-2",
      prompt: "Can secret API keys (like a Stripe Secret Key or Database Password) be safely stored in Vite's `VITE_` client environment variables?",
      options: [
        { id: "a", label: "Yes, Vite encrypts them with military-grade encryption" },
        { id: "b", label: "ABSOLUTELY NOT; any variable starting with `VITE_` is baked directly into the public JavaScript bundle and visible to anyone who opens DevTools" },
        { id: "c", label: "Only if the file is named `.env.production`" },
        { id: "d", label: "Yes, browsers delete environment variables after reading" }
      ],
      correctAnswer: "b",
      explanation: "Client-side bundles are downloaded by the user's browser. Any environment variable prefixed with `VITE_` is readable by anyone in the source code."
    },
    {
      id: "q-react-119-3",
      prompt: "How does Vite access environment variables in client-side code?",
      options: [
        { id: "a", label: "`process.env.VITE_VAR`" },
        { id: "b", label: "`import.meta.env.VITE_VAR`" },
        { id: "c", label: "`window.env.VITE_VAR`" },
        { id: "d", label: "`global.VITE_VAR`" }
      ],
      correctAnswer: "b",
      explanation: "Vite uses ES modules standard `import.meta.env` to expose client environment variables."
    },
    {
      id: "q-react-119-4",
      prompt: "Why is an explicit status string (`'idle' | 'loading' | 'success' | 'error'`) often preferred over multiple booleans (`isLoading`, `isError`, `isSuccess`)?",
      options: [
        { id: "a", label: "Because multiple booleans can create 'impossible states' (like `isLoading: true` and `isSuccess: true` simultaneously)" },
        { id: "b", label: "Because booleans run slower than strings in JavaScript" },
        { id: "c", label: "Because React only accepts strings" },
        { id: "d", label: "It is only a matter of personal opinion" }
      ],
      correctAnswer: "a",
      explanation: "Representing state as a discrete finite state machine (`status`) makes invalid combinations physically impossible to represent."
    },
    {
      id: "q-react-119-5",
      prompt: "What is the proper way to pass a JWT bearer token in an API request header?",
      options: [
        { id: "a", label: "`headers: { 'Authorization': 'Bearer ' + token }`" },
        { id: "b", label: "`headers: { 'Password': token }`" },
        { id: "c", label: "`body: { token }`" },
        { id: "d", label: "`url: 'http://api.com?token=' + token`" }
      ],
      correctAnswer: "a",
      explanation: "The standard HTTP header format for bearer tokens is `Authorization: Bearer <token>`."
    },
    {
      id: "q-react-119-6",
      prompt: "What should you do if an API request returns an HTTP 500 Server Error?",
      options: [
        { id: "a", label: "Catch the error, set the status to 'error', and display a helpful, user-friendly message with a 'Try Again' button" },
        { id: "b", label: "Crash the entire application silently" },
        { id: "c", label: "Delete the database" },
        { id: "d", label: "Show a blank white screen" }
      ],
      correctAnswer: "a",
      explanation: "Graceful error recovery informs the user that something went wrong without breaking the rest of the application interface."
    },
    {
      id: "q-react-119-7",
      prompt: "How can you dynamically configure the API base URL between local development and production deployment?",
      options: [
        { id: "a", label: "Use `.env.development` with `VITE_API_URL=http://localhost:5000/api` and `.env.production` with `VITE_API_URL=https://api.blezex.com`" },
        { id: "b", label: "Manually edit the source code file before every deployment" },
        { id: "c", label: "React only supports localhost" },
        { id: "d", label: "By changing the computer's IP address" }
      ],
      correctAnswer: "a",
      explanation: "Vite automatically loads environment files based on the build mode (`.env.development` during `dev` and `.env.production` during `build`)."
    },
    {
      id: "q-react-119-8",
      prompt: "What is an optimistic UI update?",
      options: [
        { id: "a", label: "Updating the UI immediately as if the API request succeeded, before waiting for the server response, and rolling back if it fails" },
        { id: "b", label: "Hoping that the user has fast internet" },
        { id: "c", label: "Using bright colors in CSS" },
        { id: "d", label: "Disabling error alerts" }
      ],
      correctAnswer: "a",
      explanation: "Optimistic updates create instantaneous, snappy experiences (e.g. liking a post or toggling a bookmark) by updating state immediately."
    },
    {
      id: "q-react-119-9",
      prompt: "What does the HTTP header `'Content-Type': 'application/json'` inform the server?",
      options: [
        { id: "a", label: "That the request payload body is formatted as a serialized JSON string" },
        { id: "b", label: "That the user is using Chrome" },
        { id: "c", label: "That the webpage has images" },
        { id: "d", label: "That the website is written in React" }
      ],
      correctAnswer: "a",
      explanation: "`Content-Type: application/json` tells backend parsers (like Express `express.json()`) to parse the incoming request body as JSON."
    },
    {
      id: "q-react-119-10",
      prompt: "How should you handle an empty list returned by an API (`[]`) versus an API error?",
      options: [
        { id: "a", label: "Treat them identically" },
        { id: "b", label: "An empty array is a successful response and should render a friendly 'No courses found' empty state; an error should render an error banner with recovery options" },
        { id: "c", label: "Throw an error if the array is empty" },
        { id: "d", label: "Reload the page" }
      ],
      correctAnswer: "b",
      explanation: "Distinguishing an empty search result from a network failure is essential for user clarity and interface predictability."
    }
  ]
};

// LESSON 120: USEMEMO, USECALLBACK AND REACT.MEMO
const lesson120: CurriculumItem = {
  id: "item-react-120-usememo-usecallback-memo",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-05-api-optimization",
  moduleTitle: "Module 5: API Integration and Optimization",
  modulePosition: 5,
  title: "120. useMemo, useCallback and React.memo",
  duration: "35 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 120: useMemo, useCallback and React.memo",
  contentDescription: "Understand performance optimization tools, caching expensive calculations with useMemo, preserving function referential stability with useCallback, skipping child re-renders with React.memo, and measuring before optimizing.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useState, useMemo, useCallback } from 'react';

// 1. React.memo: Skips re-rendering if props compare shallowly equal
const CourseCardItem = React.memo(function CourseCardItem({ course, onEnroll }) {
  console.log(\`Rendering CourseCard: \${course.title}\`);
  return (
    <div className="card">
      <h4>{course.title}</h4>
      <button onClick={() => onEnroll(course.id)}>Enroll</button>
    </div>
  );
});

function CourseCatalogOptimizer({ allCourses }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('dark');

  // 2. useMemo: Caches the result of an expensive calculation between renders
  const filteredCourses = useMemo(() => {
    console.log('Calculating filtered courses… (Expensive operation)');
    return allCourses.filter(c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCourses, searchTerm]); // Only recalculates when allCourses or searchTerm changes!

  // 3. useCallback: Caches function identity to prevent breaking React.memo shallow equality
  const handleEnroll = useCallback((id) => {
    console.log(\`Enrolled in course: \${id}\`);
  }, []); // Empty deps: function reference remains identical across all renders

  return (
    <div className={theme}>
      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        Toggle Theme (Current: {theme})
      </button>

      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search…"
      />

      {/* Toggling theme will NOT re-calculate filteredCourses or re-render CourseCardItems! */}
      <div className="grid">
        {filteredCourses.map(course => (
          <CourseCardItem
            key={course.id}
            course={course}
            onEnroll={handleEnroll}
          />
        ))}
      </div>
    </div>
  );
}`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Calculator Memory vs Re-doing 100 Math Problems",
      explanation: "Imagine you are doing your taxes. You spend 45 minutes calculating your annual tax deduction from 5,000 receipts. If your friend asks you: 'What is your deduction?', you don't spend another 45 minutes re-adding all 5,000 receipts! You look at the final number you already wrote down on the notepad. That is `useMemo`: caching the calculated result. And `useCallback` is like keeping your signature identical on every page so the bank doesn't reject your papers. But beware: writing things on notepads costs memory! If a math problem only takes 0.001 seconds (`2 + 2`), setting up a memoization cache takes MORE time than just doing the math! Measure before you optimize!",
      bullets: [
        "`useMemo(() => fn(), [deps])`: Caches the RETURN VALUE of an expensive calculation.",
        "`useCallback(fn, [deps])`: Caches the FUNCTION REFERENCE itself across renders.",
        "`React.memo(Component)`: Higher-order component that skips re-rendering if props haven't changed."
      ]
    },
    {
      title: "2. The Optimization Trio Compared",
      explanation: "Understanding what each tool does and when to apply it:",
      table: {
        headers: ["Optimization Tool", "What It Caches", "Primary Purpose", "When to Use"],
        rows: [
          ["`useMemo`", "Result value of a calculation", "Avoids repeating heavy CPU calculations on every render", "Filtering/sorting 10,000 items, complex math, heavy data transformations"],
          ["`useCallback`", "Function instance / reference", "Preserves function reference stability to satisfy `React.memo` or effect dependencies", "Passing callbacks to memoized child components"],
          ["`React.memo`", "Rendered component UI", "Skips re-rendering a child component if its props compare equal", "Large component subtrees or heavy lists that re-render frequently without prop changes"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: The 'Premature Optimization' Trap",
      explanation: "Optimization is not free. Every `useMemo` and `useCallback` adds lines of code, memory overhead, and dependency array comparison costs:",
      bullets: [
        "Rule 1: React is naturally fast. Most re-renders take less than 1 millisecond and are completely harmless.",
        "Rule 2: Never optimize blindly. Measure first using React DevTools Profiler to identify actual bottlenecks.",
        "Rule 3: If you memoize a component with `React.memo`, you MUST also memoize any object or callback props passed to it, or the memoization is useless!"
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these memoization errors:",
      bullets: [
        "Passing Inline Functions to Memoized Children: `<MemoChild onAction={() => {}} />` creates a new function on every render, defeating `React.memo`. Wrap with `useCallback`.",
        "Omitting Dependencies: Leaving variables out of dependency arrays creates stale closures.",
        "Wrapping Trivial Math: Writing `useMemo(() => a + b, [a, b])` adds overhead for an operation that takes 1 nanosecond."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a list of 2,000 items with search and sort. Measure the render time before and after using `useMemo` on the filtering function. Wrap the list item in `React.memo` and pass an `onSelect` callback wrapped in `useCallback`. Verify with console logs that toggling an unrelated theme state does not re-render the list items."
    }
  ],
  questions: [
    {
      id: "q-react-120-1",
      prompt: "What is the primary purpose of the `useMemo` hook in React?",
      options: [
        { id: "a", label: "To cache the result of an expensive calculation between renders until its dependencies change" },
        { id: "b", label: "To save files to browser memory" },
        { id: "c", label: "To create global Redux stores" },
        { id: "d", label: "To replace CSS grid" }
      ],
      correctAnswer: "a",
      explanation: "`useMemo` caches the calculated return value of a function, re-executing it only when one of its specified dependencies has changed."
    },
    {
      id: "q-react-120-2",
      prompt: "What is the primary difference between `useMemo` and `useCallback`?",
      options: [
        { id: "a", label: "`useMemo` caches a calculated value (`useMemo(() => fn(), deps)`); `useCallback` caches the function reference itself (`useCallback(fn, deps)`)" },
        { id: "b", label: "`useMemo` only runs on servers; `useCallback` runs in browsers" },
        { id: "c", label: "`useCallback` was removed in React 18" },
        { id: "d", label: "They are completely interchangeable identical aliases" }
      ],
      correctAnswer: "a",
      explanation: "`useMemo` executes its callback and returns the cached result, whereas `useCallback` returns the cached function definition itself."
    },
    {
      id: "q-react-120-3",
      prompt: "What does wrapping a component in `React.memo(Component)` do?",
      options: [
        { id: "a", label: "It prevents the component from re-rendering if its props have not changed (via shallow equality comparison)" },
        { id: "b", label: "It saves the component in the database" },
        { id: "c", label: "It makes the component invisible" },
        { id: "d", label: "It disables all hooks" }
      ],
      correctAnswer: "a",
      explanation: "`React.memo` is a higher-order component that skips re-rendering when the incoming props are shallowly identical to the previous render's props."
    },
    {
      id: "q-react-120-4",
      prompt: "Why does passing an inline arrow function (`onClick={() => doSomething()}`) to a `React.memo` child component cause it to re-render anyway?",
      options: [
        { id: "a", label: "Because a brand-new function object is created in memory on every render, failing `React.memo`'s shallow equality check (`prevProps.onClick !== nextProps.onClick`)" },
        { id: "b", label: "Because arrow functions are invalid in JSX" },
        { id: "c", label: "Because React does not support inline functions" },
        { id: "d", label: "Because the button is clicked automatically" }
      ],
      correctAnswer: "a",
      explanation: "In JavaScript, `{}` and `() => {}` create new object references every time. `React.memo` detects a new prop reference and re-renders."
    },
    {
      id: "q-react-120-5",
      prompt: "When should you NOT use `useMemo` or `useCallback`?",
      options: [
        { id: "a", label: "For cheap, trivial operations (like `a + b` or basic array concatenation) where the overhead of tracking dependencies exceeds the cost of re-running the code" },
        { id: "b", label: "When using TypeScript" },
        { id: "c", label: "Inside functional components" },
        { id: "d", label: "When you have more than 3 props" }
      ],
      correctAnswer: "a",
      explanation: "Memoization has a cost: creating closures, memory consumption, and array comparisons. Don't memoize cheap calculations."
    },
    {
      id: "q-react-120-6",
      prompt: "What tool should you use to measure whether a React component actually has a performance bottleneck before applying optimizations?",
      options: [
        { id: "a", label: "React DevTools Profiler" },
        { id: "b", label: "The browser's bookmarks bar" },
        { id: "c", label: "Windows Notepad" },
        { id: "d", label: "GitHub pull requests" }
      ],
      correctAnswer: "a",
      explanation: "The React Profiler records render durations, re-render counts, and identifies the exact components responsible for lag."
    },
    {
      id: "q-react-120-7",
      prompt: "What comparison does `React.memo` perform by default to check if props have changed?",
      options: [
        { id: "a", label: "Shallow equality comparison of props (`Object.is` for primitives, reference equality for objects/arrays)" },
        { id: "b", label: "Deep recursive JSON comparison of all nested data" },
        { id: "c", label: "String length comparison" },
        { id: "d", label: "Alphabetical sorting comparison" }
      ],
      correctAnswer: "a",
      explanation: "`React.memo` performs a shallow equality check on each prop. A custom comparison function can optionally be provided as a second argument."
    },
    {
      id: "q-react-120-8",
      prompt: "Can `useMemo` be used as a semantic guarantee that a calculation will NEVER re-run unless dependencies change?",
      options: [
        { id: "a", label: "No; React may choose to 'forget' memoized values in low-memory situations; write code that still works without useMemo, using it strictly for performance" },
        { id: "b", label: "Yes, it is legally guaranteed by ECMAScript" },
        { id: "c", label: "Yes, React stores it permanently in flash memory" },
        { id: "d", label: "Only if the array has zero dependencies" }
      ],
      correctAnswer: "a",
      explanation: "React documentation explicitly warns: use `useMemo` as a performance hint, not a semantic guarantee. Your code must be functionally correct without it."
    },
    {
      id: "q-react-120-9",
      prompt: "How can you verify that a function wrapped in `useCallback` has a stable reference?",
      options: [
        { id: "a", label: "By saving references across renders (e.g. in a ref or set) and checking `ref.current === handleAction`" },
        { id: "b", label: "By checking its font size" },
        { id: "c", label: "By refreshing the web page" },
        { id: "d", label: "By converting it to a string" }
      ],
      correctAnswer: "a",
      explanation: "Comparing function references across renders verifies whether `useCallback` successfully preserved referential identity."
    },
    {
      id: "q-react-120-10",
      prompt: "What happens if you omit a reactive prop from a `useCallback` dependency array?",
      options: [
        { id: "a", label: "The callback will execute with stale, outdated values from the render in which it was initially created" },
        { id: "b", label: "The computer reboots" },
        { id: "c", label: "The function deletes itself" },
        { id: "d", label: "React corrects it automatically" }
      ],
      correctAnswer: "a",
      explanation: "Omitting dependencies produces stale closure bugs, where the cached callback retains outdated variables from past renders."
    }
  ]
};

// LESSON 121: PERFORMANCE, CODE SPLITTING AND ACCESSIBILITY
const lesson121: CurriculumItem = {
  id: "item-react-121-performance-splitting-a11y",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-05-api-optimization",
  moduleTitle: "Module 5: API Integration and Optimization",
  modulePosition: 5,
  title: "121. Performance, Code Splitting and Accessibility",
  duration: "35 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 121: Performance, Code Splitting and Accessibility",
  contentDescription: "Master route-level code splitting with React.lazy and dynamic imports, optimizing initial bundle payloads, keyboard navigation, focus management, semantic HTML landmarks, and automated a11y testing.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Code Splitting: Lazy load heavy feature pages on demand
const CourseAnalytics = lazy(() => import('./pages/CourseAnalytics'));
const VideoEditor = lazy(() => import('./pages/VideoEditor'));

function AccessibleAppShell() {
  return (
    <div className="app-shell">
      {/* Semantic Accessibility: Skip to Main Content Link for Keyboard Users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header role="banner" className="header">
        <h1>BlezeX Learning Platform</h1>
      </header>

      {/* Main semantic landmark */}
      <main id="main-content" role="main">
        {/* Suspense fallback displayed while the lazy JavaScript bundle loads */}
        <Suspense fallback={<div className="route-loader" aria-live="polite">Loading module…</div>}>
          <Routes>
            <Route path="/analytics" element={<CourseAnalytics />} />
            <Route path="/editor" element={<VideoEditor />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Packing a Backpack vs Ordering Books On-Demand",
      explanation: "Imagine you are starting college. On day one, you don't pack all 50 heavy textbooks for the entire 4-year degree into your backpack! Your backpack would weigh 200 pounds, and you would collapse on the pavement before reaching the first classroom (slow initial bundle load). Instead, you only pack your notebook for today's class. When you have biology class on Thursday, you go to the library and check out the biology book then. 'Code Splitting' with `React.lazy()` breaks your giant 5MB JavaScript bundle into small, lightweight chunks. The user only downloads the code for the page they are currently looking at!",
      bullets: [
        "Code Splitting: Bundler (Vite/Rollup) generates separate `.js` chunk files for each lazy component.",
        "Dynamic `import()`: Triggers asynchronous network download of the chunk only when the route is visited.",
        "Web Accessibility (a11y): Product quality requires that applications work seamlessly with keyboards, screen readers, and high-contrast modes."
      ]
    },
    {
      title: "2. The Web Accessibility (WCAG) Checklist for React",
      explanation: "Mandatory accessibility requirements for every professional application:",
      table: {
        headers: ["Requirement", "Implementation", "Why It Matters"],
        rows: [
          ["Semantic Landmarks", "`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`", "Screen readers can jump directly to specific content regions"],
          ["Keyboard Navigation", "`tabIndex={0}`, Enter and Space triggers on buttons", "Motor-impaired users who cannot use a mouse can operate the app"],
          ["Focus Management", "Move focus to modal window when opened (`autoFocus`) and restore on close", "Prevents keyboard focus from getting trapped behind dark overlays"],
          ["Color Contrast", "Minimum 4.5:1 ratio for normal text (WCAG AA)", "Low-vision and color-blind users can clearly read text"],
          ["Image Alt Text", "`<img alt='Detailed description' />` (or `alt=''` for decorative)", "Screen readers announce image content to visually impaired learners"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: The 'Skip to Main Content' Link",
      explanation: "Keyboard-only users who navigate with the Tab key shouldn't have to press Tab 30 times through the navigation menu on every single page:",
      bullets: [
        "A hidden link `<a href='#main-content' className='skip-link'>Skip to content</a>` is positioned off-screen.",
        "When the user presses Tab on page load, the link becomes visible at the top of the screen.",
        "Pressing Enter immediately shifts keyboard focus directly into the `<main id='main-content'>` landmark."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these performance and accessibility violations:",
      bullets: [
        "Using `<div onClick={...}>` instead of `<button>`: A `<div>` is NOT keyboard-focusable, does not respond to Enter/Space, and is not announced by screen readers. ALWAYS use semantic `<button>` elements for clickable actions.",
        "Missing Suspense Boundary: Using `React.lazy()` without wrapping it in a `<Suspense fallback={...}>` causes a runtime crash when the component loads.",
        "Over-Splitting: Lazy-loading tiny 20-line components creates dozens of micro-requests, increasing latency. Split primarily at the ROUTE level."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Take an existing React application and split at least two heavy routes using `React.lazy()`. Wrap them in `<Suspense>` with an accessible skeleton fallback. Navigate through the entire page using ONLY your keyboard (Tab, Shift+Tab, Enter, Space) and ensure all controls are reachable with a visible focus outline."
    }
  ],
  questions: [
    {
      id: "q-react-121-1",
      prompt: "What does 'code splitting' achieve in modern React web applications?",
      options: [
        { id: "a", label: "It divides a large single JavaScript bundle into smaller chunks that are loaded on demand, drastically reducing initial page load time" },
        { id: "b", label: "It divides the developer team into two groups" },
        { id: "c", label: "It splits HTML tags into two halves" },
        { id: "d", label: "It deletes obsolete code from the repository" }
      ],
      correctAnswer: "a",
      explanation: "Code splitting uses dynamic `import()` to generate separate bundles, downloading code only when the user navigates to that feature."
    },
    {
      id: "q-react-121-2",
      prompt: "How do you lazy-load a component in React?",
      options: [
        { id: "a", label: "`const MyPage = lazy(() => import('./MyPage.jsx'));` wrapped inside `<Suspense fallback={<Loader />}>`" },
        { id: "b", label: "`const MyPage = defer('./MyPage.jsx')`" },
        { id: "c", label: "`import MyPage from './MyPage.jsx' async`" },
        { id: "d", label: "`<lazy src='./MyPage.jsx' />`" }
      ],
      correctAnswer: "a",
      explanation: "`React.lazy()` paired with `<Suspense fallback={...}>` enables declarative on-demand component and route loading."
    },
    {
      id: "q-react-121-3",
      prompt: "Why should you use semantic `<button>` elements instead of `<div onClick={handleClick}>` for interactive elements?",
      options: [
        { id: "a", label: "Native buttons have built-in keyboard accessibility (Tab focus, Enter/Space activation) and announce their role correctly to screen readers" },
        { id: "b", label: "Because divs cannot have CSS styling" },
        { id: "c", label: "Because React does not support onClick on divs" },
        { id: "d", label: "Buttons use less RAM" }
      ],
      correctAnswer: "a",
      explanation: "Using semantic `<button>` provides free, native keyboard focus, keyboard activation via Space/Enter, and accessibility tree roles."
    },
    {
      id: "q-react-121-4",
      prompt: "What is the purpose of a 'Skip to Content' link for accessibility?",
      options: [
        { id: "a", label: "It allows keyboard and screen-reader users to bypass long navigation headers and jump directly to the primary page content" },
        { id: "b", label: "It skips paying for courses" },
        { id: "c", label: "It skips watching video lectures" },
        { id: "d", label: "It disables cookies" }
      ],
      correctAnswer: "a",
      explanation: "Skip links prevent keyboard users from having to repeatedly tab through dozens of navigation links on every page visit."
    },
    {
      id: "q-react-121-5",
      prompt: "What is the minimum recommended color contrast ratio for standard text according to WCAG 2.1 Level AA?",
      options: [
        { id: "a", label: "4.5 : 1" },
        { id: "b", label: "1 : 1" },
        { id: "c", label: "100 : 1" },
        { id: "d", label: "2 : 1" }
      ],
      correctAnswer: "a",
      explanation: "WCAG AA requires at least a 4.5:1 contrast ratio for normal text and 3:1 for large text against its background."
    },
    {
      id: "q-react-121-6",
      prompt: "What happens if you remove the CSS `outline: none` on focused elements without providing a custom `:focus-visible` replacement?",
      options: [
        { id: "a", label: "Keyboard users will have no visible visual indicator showing which interactive button or input is currently selected" },
        { id: "b", label: "The browser will crash" },
        { id: "c", label: "The text will turn invisible" },
        { id: "d", label: "It makes the website faster" }
      ],
      correctAnswer: "a",
      explanation: "Removing focus outlines without a replacement makes keyboard navigation impossible for sighted keyboard users."
    },
    {
      id: "q-react-121-7",
      prompt: "What should decorative images (like a background pattern) have for their `alt` attribute?",
      options: [
        { id: "a", label: "`alt=''` (empty string), which informs screen readers to skip the decorative image" },
        { id: "b", label: "`alt='image'`" },
        { id: "c", label: "Omit the alt attribute entirely" },
        { id: "d", label: "`alt='decoration'`" }
      ],
      correctAnswer: "a",
      explanation: "An empty alt attribute (`alt=''`) marks the image as decorative, instructing screen readers to ignore it rather than reading its file name."
    },
    {
      id: "q-react-121-8",
      prompt: "Where is code splitting most effectively applied in a React application?",
      options: [
        { id: "a", label: "At the route level (splitting entire pages like /admin, /analytics, /dashboard)" },
        { id: "b", label: "On every single button component" },
        { id: "c", label: "Inside for loops" },
        { id: "d", label: "Inside CSS files" }
      ],
      correctAnswer: "a",
      explanation: "Route-based splitting is the most effective strategy because users naturally transition between pages, providing natural loading boundaries."
    },
    {
      id: "q-react-121-9",
      prompt: "What automated tool is built into Chrome DevTools to audit web accessibility and performance?",
      options: [
        { id: "a", label: "Lighthouse" },
        { id: "b", label: "Notepad" },
        { id: "c", label: "Paint" },
        { id: "d", label: "Taskbar" }
      ],
      correctAnswer: "a",
      explanation: "Google Lighthouse audits Performance, Accessibility (a11y), Best Practices, and SEO directly inside Chrome DevTools."
    },
    {
      id: "q-react-121-10",
      prompt: "What does `aria-live='polite'` do when applied to an element (like a notification badge or loading status)?",
      options: [
        { id: "a", label: "It instructs screen readers to announce updates to that element when the user is idle, without interrupting ongoing speech" },
        { id: "b", label: "It plays a chime sound" },
        { id: "c", label: "It changes the font to cursive" },
        { id: "d", label: "It automatically submits the form" }
      ],
      correctAnswer: "a",
      explanation: "`aria-live='polite'` ensures assistive technologies announce dynamic updates without rudely cutting off whatever is currently being read."
    }
  ]
};

// LESSON 122: TESTING REACT COMPONENTS
const lesson122: CurriculumItem = {
  id: "item-react-122-testing-components",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-05-api-optimization",
  moduleTitle: "Module 5: API Integration and Optimization",
  modulePosition: 5,
  title: "122. Testing React Components",
  duration: "35 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lesson 122: Testing React Components",
  contentDescription: "Master writing automated component tests with Vitest and React Testing Library (RTL), testing user-visible behavior (roles, labels, text) instead of implementation details, user-event interactions, and mocking network requests.",
  codeSnippet: {
    language: "jsx",
    code: `// CourseEnrollment.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CourseEnrollmentCard } from './CourseEnrollmentCard';

describe('CourseEnrollmentCard Component', () => {
  it('renders course information and handles enrollment click', async () => {
    // 1. Arrange: Setup user event and mock handler
    const user = userEvent.setup();
    const handleEnroll = vi.fn();

    const mockCourse = {
      id: 'react-101',
      title: 'React.js Foundations',
      duration: '6 hours'
    };

    // 2. Act: Render component
    render(
      <CourseEnrollmentCard course={mockCourse} onEnroll={handleEnroll} />
    );

    // 3. Assert: Query by user-visible accessibility roles and text
    expect(screen.getByRole('heading', { name: /react\.js foundations/i })).toBeInTheDocument();
    expect(screen.getByText(/6 hours/i)).toBeInTheDocument();

    const enrollButton = screen.getByRole('button', { name: /enroll now/i });
    expect(enrollButton).toBeInTheDocument();

    // 4. Simulate user interaction
    await user.click(enrollButton);

    // 5. Verify outcome: Mock callback called with correct ID
    expect(handleEnroll).toHaveBeenCalledTimes(1);
    expect(handleEnroll).toHaveBeenCalledWith('react-101');
  });
});`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Testing a Car from the Driver's Seat",
      explanation: "Imagine you are an automobile inspector testing a new car. You don't drill holes through the dashboard to test whether the yellow wire connects to pin 47 on the circuit board (testing implementation details). You sit in the driver's seat, turn the steering wheel, step on the brake pedal, and check if the car stops! If the car stops smoothly, it passes the test! React Testing Library (RTL) tests components from the user's perspective: it finds elements by their visible text, labels, and accessible roles (`getByRole('button')`), clicks them like a real human (`userEvent.click()`), and asserts that the expected message appears on screen.",
      bullets: [
        "Guiding Principle: The more your tests resemble the way your software is used, the more confidence they can give you.",
        "Avoid Implementation Details: Don't test component state names (`wrapper.state('count')`) or internal helper methods.",
        "Vitest + RTL: The modern, high-speed testing stack for Vite and React."
      ]
    },
    {
      title: "2. The Priority Order of Testing Library Queries",
      explanation: "Always prefer queries that reflect accessible user experience:",
      table: {
        headers: ["Priority", "Query Method", "Why It is Preferred"],
        rows: [
          ["1. Top Priority", "`getByRole('button', { name: /save/i })`", "Reflects how screen readers and assistive tech perceive the page"],
          ["2. Form Controls", "`getByLabelText('Email Address')`", "Verifies that form inputs have correctly linked labels"],
          ["3. Text Content", "`getByText('Welcome back')`", "Matches non-interactive visible text paragraphs and headers"],
          ["4. Last Resort", "`getByTestId('custom-id')`", "Use ONLY when an element has no accessible text or semantic role"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: `userEvent` vs `fireEvent`",
      explanation: "Always use `@testing-library/user-event` instead of `fireEvent`:",
      bullets: [
        "`fireEvent.click(btn)`: Dispatches a raw, synthetic DOM click event without hover states, focus changes, or keyboard keydowns.",
        "`userEvent.click(btn)`: Simulates real browser interactions—it moves the mouse, triggers hover, focuses the element, presses the button down, fires the click, and releases."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common testing errors:",
      bullets: [
        "Testing Internal State: Asserting `expect(component.state.isOpen).toBe(true)`. If you refactor to use a different state variable, your test breaks even though the UI works! Assert that the modal is visible instead.",
        "Using `getByTestId` for everything: Robs you of accessibility validation.",
        "Forgetting `await` on userEvent: `userEvent` methods are asynchronous and return Promises. Omitting `await` causes race conditions in tests."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Write automated tests for a `CourseSearch` component. Test that typing in the search input updates the visible list, verify that clicking 'Clear' empties the input, and assert that an empty state message is rendered when a query matches zero items."
    }
  ],
  questions: [
    {
      id: "q-react-122-1",
      prompt: "What is the core philosophy of React Testing Library (RTL)?",
      options: [
        { id: "a", label: "The more your tests resemble the way your software is used, the more confidence they can give you (test user behavior, not implementation details)" },
        { id: "b", label: "Tests must verify the private variables inside component state" },
        { id: "c", label: "Tests must run only in production" },
        { id: "d", label: "Tests should verify CSS line numbers" }
      ],
      correctAnswer: "a",
      explanation: "RTL tests components from the user's perspective by querying accessible labels and roles rather than inspecting internal state or component instances."
    },
    {
      id: "q-react-122-2",
      prompt: "Which query is the HIGHEST priority recommendation in React Testing Library?",
      options: [
        { id: "a", label: "`getByRole()` (e.g. `getByRole('button', { name: /enroll/i })`)" },
        { id: "b", label: "`getByTestId()`" },
        { id: "c", label: "`document.querySelector()`" },
        { id: "d", label: "`getByClassName()`" }
      ],
      correctAnswer: "a",
      explanation: "`getByRole()` queries the accessibility tree, ensuring the element is accessible to assistive technologies and sighted users alike."
    },
    {
      id: "q-react-122-3",
      prompt: "Why is `@testing-library/user-event` preferred over `fireEvent`?",
      options: [
        { id: "a", label: "`userEvent` simulates full realistic browser user interactions (hover, focus, keydown, click) rather than dispatching isolated raw DOM events" },
        { id: "b", label: "`fireEvent` is deprecated and deleted from npm" },
        { id: "c", label: "`userEvent` runs without JavaScript" },
        { id: "d", label: "`userEvent` only works for games" }
      ],
      correctAnswer: "a",
      explanation: "`userEvent` accurately replicates how users interact with the browser, triggering all intermediate events that real user actions cause."
    },
    {
      id: "q-react-122-4",
      prompt: "Why should you avoid testing internal component state names (like `expect(state.count).toBe(1)`)?",
      options: [
        { id: "a", label: "Because refactoring internal state names will break the test even if the component continues to work perfectly for the user (brittle tests)" },
        { id: "b", label: "Because state is encrypted" },
        { id: "c", label: "Because state cannot be read by tests" },
        { id: "d", label: "Because tests cannot run in Node" }
      ],
      correctAnswer: "a",
      explanation: "Testing implementation details makes tests brittle to refactoring. Test what the user sees on screen instead."
    },
    {
      id: "q-react-122-5",
      prompt: "How do you test asynchronous code (such as data fetching) in React Testing Library?",
      options: [
        { id: "a", label: "Using `findBy...` queries (e.g. `await screen.findByText('Loaded Data')`) or `waitFor()`" },
        { id: "b", label: "Using a `while` loop" },
        { id: "c", label: "By pausing the test for 10 seconds" },
        { id: "d", label: "Async code cannot be tested" }
      ],
      correctAnswer: "a",
      explanation: "`findBy...` queries return a Promise that retries until the element appears in the DOM or times out, making it ideal for async data."
    },
    {
      id: "q-react-122-6",
      prompt: "What is the difference between `getBy...`, `queryBy...`, and `findBy...` in React Testing Library?",
      options: [
        { id: "a", label: "`getBy` throws if not found; `queryBy` returns `null` if not found (ideal for asserting absence); `findBy` returns a Promise for async elements" },
        { id: "b", label: "They are exact synonyms" },
        { id: "c", label: "`findBy` only works for images" },
        { id: "d", label: "`queryBy` only works for SQL" }
      ],
      correctAnswer: "a",
      explanation: "`getBy` expects the element immediately; `queryBy` is used with `expect(...).not.toBeInTheDocument()`; `findBy` waits for async elements."
    },
    {
      id: "q-react-122-7",
      prompt: "How can you mock network HTTP API requests during unit testing?",
      options: [
        { id: "a", label: "Using Mock Service Worker (MSW) or mocking `global.fetch` with `vi.fn()`" },
        { id: "b", label: "By shutting down the local Wi-Fi router" },
        { id: "c", label: "By creating real user accounts on the live production database" },
        { id: "d", label: "By deleting the backend code" }
      ],
      correctAnswer: "a",
      explanation: "MSW (Mock Service Worker) intercepts network requests at the network level, providing deterministic mock responses without hitting live servers."
    },
    {
      id: "q-react-122-8",
      prompt: "What modern test runner is natively optimized for Vite projects?",
      options: [
        { id: "a", label: "Vitest" },
        { id: "b", label: "Jasmine" },
        { id: "c", label: "JUnit" },
        { id: "d", label: "Mocha from 2012" }
      ],
      correctAnswer: "a",
      explanation: "Vitest shares Vite's config, plugins, and transform pipeline, executing tests with blazing speed and built-in TypeScript/JSX support."
    },
    {
      id: "q-react-122-9",
      prompt: "What matcher is used to assert that an element is present in the document DOM?",
      options: [
        { id: "a", label: "`expect(element).toBeInTheDocument()` (from `@testing-library/jest-dom`)" },
        { id: "b", label: "`expect(element).exists()`" },
        { id: "c", label: "`expect(element).isAlive()`" },
        { id: "d", label: "`expect(element).isRendered()`" }
      ],
      correctAnswer: "a",
      explanation: "`toBeInTheDocument()` from `jest-dom` provides clear, readable DOM existence assertions."
    },
    {
      id: "q-react-122-10",
      prompt: "Why should you call `userEvent.setup()` before rendering in your tests?",
      options: [
        { id: "a", label: "To properly initialize userEvent session state before simulating clicks and typing" },
        { id: "b", label: "To connect to GitHub" },
        { id: "c", label: "To clean the computer monitor" },
        { id: "d", label: "It is optional and never needed" }
      ],
      correctAnswer: "a",
      explanation: "Calling `const user = userEvent.setup()` initializes user-event instance state prior to rendering, which is recommended in RTL v14+."
    }
  ]
};

// LESSON 123: SUSPENSE, LAZY LOADING AND ERROR BOUNDARIES
const lesson123: CurriculumItem = {
  id: "item-react-123-suspense-error-boundaries",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-05-api-optimization",
  moduleTitle: "Module 5: API Integration and Optimization",
  modulePosition: 5,
  title: "123. Suspense, Lazy Loading and Error Boundaries",
  duration: "35 mins",
  type: "cheatsheet",
  position: 5,
  contentHeading: "Lesson 123: Suspense, Lazy Loading and Error Boundaries",
  contentDescription: "Master graceful degradation in React: catching rendering exceptions with Class Error Boundaries (getDerivedStateFromError, componentDidCatch), coordinating async loading states with Suspense, and designing resilient failure recovery flows.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { Component, lazy, Suspense } from 'react';

// 1. Production Error Boundary (Must be a Class Component in current React!)
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Lifecycle 1: Update state so the next render shows fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Lifecycle 2: Log error to reporting service (e.g. Sentry)
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-card" role="alert">
          <h3>Something went wrong in this module.</h3>
          <p>{this.state.error?.message || 'Unexpected application error.'}</p>
          <button onClick={this.handleRetry} className="btn-retry">
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 2. Combining Error Boundary with Suspense and Lazy Loading
const HeavyExamReports = lazy(() => import('./HeavyExamReports'));

export function AnalyticsDashboard() {
  return (
    <div className="analytics-page">
      <h2>Student Analytics</h2>

      {/* Boundary protects the rest of the application if the reports module crashes */}
      <ErrorBoundary>
        <Suspense fallback={<div className="loading-bar">Loading reports module…</div>}>
          <HeavyExamReports />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Electrical Circuit Breakers",
      explanation: "Imagine your house electrical wiring. If your kitchen microwave shorts out and sparks, you don't want the ENTIRE house to lose power, shutting off the living room lights, the refrigerator, and the bedroom fan! Your house has a 'Circuit Breaker' panel: the breaker for the kitchen trips, containing the problem to just the microwave while the rest of the house stays fully powered and safe. An 'Error Boundary' in React is your UI circuit breaker: if a complex chart or widget crashes with a JavaScript error, the Error Boundary catches it, shows a polite 'Failed to load chart' box, and PREVENTS the entire web page from crashing into a blank white screen!",
      bullets: [
        "Circuit Breaker Pattern: Catches JavaScript rendering errors anywhere in its child component tree.",
        "Must be a Class Component: React requires `static getDerivedStateFromError()` and `componentDidCatch()` (no hook equivalent exists yet).",
        "Resilient Recovery: Provides a 'Try Again' button to allow users to recover without refreshing the page."
      ]
    },
    {
      title: "2. What Error Boundaries Catch vs What They DO NOT Catch",
      explanation: "Crucial boundaries of what Error Boundaries can intercept:",
      table: {
        headers: ["Scenario", "Caught by Error Boundary?", "How to Handle If NOT Caught"],
        rows: [
          ["Errors during rendering", "YES (100% caught)", "Displays fallback UI via `getDerivedStateFromError`"],
          ["Errors in lifecycle methods", "YES (100% caught)", "Displays fallback UI and logs error"],
          ["Errors in constructor", "YES (100% caught)", "Displays fallback UI"],
          ["Errors in Event Handlers (`onClick`)", "NO (Not caught!)", "Use regular `try / catch` blocks inside the event handler"],
          ["Errors in Asynchronous Code (`setTimeout`, `fetch`)", "NO (Not caught!)", "Use `.catch()` on promises or `try / catch` inside async functions"],
          ["Errors on the Server (SSR)", "NO (Not caught!)", "Handled by server error-handling middleware"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Pairing Suspense with Error Boundaries",
      explanation: "A robust modern React UI architecture wraps features in both an Error Boundary and a Suspense component:",
      bullets: [
        "`<Suspense fallback={<Spinner />}>`: Handles the HAPPY asynchronous loading state while the code chunk is downloading.",
        "`<ErrorBoundary>`: Handles the UNHAPPY failure state if the network chunk fails to download (e.g. user goes offline)."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these error boundary bugs:",
      bullets: [
        "Relying on Error Boundaries for Form Validation: Error boundaries are for catastrophic runtime crashes, not for showing 'Password too short' validation messages.",
        "Putting a Single Boundary at the Very Root: If the root boundary trips, the whole app still disappears. Place granular boundaries around individual widgets, sidebars, and feature cards.",
        "Forgetting Retry Capability: Leaving users stranded on the error screen without a button to retry rendering."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build a reusable `ErrorBoundary` class component with a custom fallback message and 'Retry' button. Create a buggy component that throws `new Error('Simulated Crash')` when a button is clicked during render. Verify that the Error Boundary catches the crash and displays the recovery UI without affecting sibling components."
    }
  ],
  questions: [
    {
      id: "q-react-123-1",
      prompt: "What is an Error Boundary in React?",
      options: [
        { id: "a", label: "A React class component that catches JavaScript errors anywhere in its child component tree, logs the errors, and displays a fallback UI instead of crashing the whole app" },
        { id: "b", label: "A CSS border colored red" },
        { id: "c", label: "A firewall setting in Windows" },
        { id: "d", label: "An automated GitHub bot" }
      ],
      correctAnswer: "a",
      explanation: "Error Boundaries act like JavaScript `catch {}` blocks for components, preventing runtime rendering errors from taking down the entire UI tree."
    },
    {
      id: "q-react-123-2",
      prompt: "Which two lifecycle methods must a class component implement to become an Error Boundary?",
      options: [
        { id: "a", label: "`static getDerivedStateFromError()` and/or `componentDidCatch()`" },
        { id: "b", label: "`render()` and `componentDidMount()`" },
        { id: "c", label: "`useState()` and `useEffect()`" },
        { id: "d", label: "`catch()` and `finally()`" }
      ],
      correctAnswer: "a",
      explanation: "`static getDerivedStateFromError(error)` updates state to show fallback UI, while `componentDidCatch(error, info)` logs errors to reporting services."
    },
    {
      id: "q-react-123-3",
      prompt: "Which of the following errors is CANNOT be caught by a React Error Boundary?",
      options: [
        { id: "a", label: "An unhandled exception inside an `onClick` event handler function" },
        { id: "b", label: "An error during JSX rendering" },
        { id: "c", label: "An error in a child component's constructor" },
        { id: "d", label: "An error in a child component's render method" }
      ],
      correctAnswer: "a",
      explanation: "Error Boundaries do NOT catch errors inside event handlers (like `onClick`). Event handler errors do not occur during rendering and should use regular `try/catch`."
    },
    {
      id: "q-react-123-4",
      prompt: "Why can't an Error Boundary currently be written as a functional component with a hook?",
      options: [
        { id: "a", label: "Because React does not currently have a hook equivalent for `componentDidCatch` or `getDerivedStateFromError`" },
        { id: "b", label: "Because hooks are deprecated" },
        { id: "c", label: "Because function components cannot render HTML" },
        { id: "d", label: "Because Vite only supports classes" }
      ],
      correctAnswer: "a",
      explanation: "As of React 18/19, Error Boundaries must be implemented as class components (or using third-party libraries like `react-error-boundary`)."
    },
    {
      id: "q-react-123-5",
      prompt: "What is the purpose of `<Suspense fallback={<Spinner />}>`?",
      options: [
        { id: "a", label: "It displays a fallback UI (like a spinner or skeleton) while its child components are asynchronously loading (e.g. lazy bundles or data)" },
        { id: "b", label: "It stops animations" },
        { id: "c", label: "It pauses user input" },
        { id: "d", label: "It deletes obsolete state" }
      ],
      correctAnswer: "a",
      explanation: "`Suspense` coordinates asynchronous operations, rendering the `fallback` prop until all descendant promises resolve."
    },
    {
      id: "q-react-123-6",
      prompt: "What happens if a component crashes during rendering and there is NO Error Boundary anywhere above it?",
      options: [
        { id: "a", label: "React unmounts the entire application root component tree, resulting in an unrecoverable blank white screen for the user" },
        { id: "b", label: "The browser automatically fixes the code" },
        { id: "c", label: "The crashed component turns gray" },
        { id: "d", label: "The user is logged out" }
      ],
      correctAnswer: "a",
      explanation: "In React 16+, unhandled rendering errors unmount the entire React root, leaving the user with a blank screen."
    },
    {
      id: "q-react-123-7",
      prompt: "Where should Error Boundaries ideally be placed in an application?",
      options: [
        { id: "a", label: "Strategically around individual isolated widgets, feature routes, and complex dashboard cards, as well as a top-level fallback" },
        { id: "b", label: "Only around every single `<span>` tag" },
        { id: "c", label: "Only in the `index.html` file" },
        { id: "d", label: "Error boundaries should only be placed in test files" }
      ],
      correctAnswer: "a",
      explanation: "Granular boundaries isolate crashes to specific cards or widgets, allowing the rest of the application to remain functional."
    },
    {
      id: "q-react-123-8",
      prompt: "How can a user recover from a caught error in a properly implemented Error Boundary?",
      options: [
        { id: "a", label: "By clicking a 'Try Again' button that resets the Error Boundary's `hasError` state to `false`" },
        { id: "b", label: "By purchasing a new computer" },
        { id: "c", label: "By re-installing Windows" },
        { id: "d", label: "Recovery is impossible without closing the browser" }
      ],
      correctAnswer: "a",
      explanation: "Resetting `this.setState({ hasError: false })` allows the Error Boundary to re-attempt rendering its children."
    },
    {
      id: "q-react-123-9",
      prompt: "What third-party library is officially recommended by the React team for writing error boundaries without writing class components by hand?",
      options: [
        { id: "a", label: "`react-error-boundary`" },
        { id: "b", label: "`jquery`" },
        { id: "c", label: "`lodash`" },
        { id: "d", label: "`express`" }
      ],
      correctAnswer: "a",
      explanation: "`react-error-boundary` provides a versatile `<ErrorBoundary FallbackComponent={...}>` and `useErrorBoundary()` hook."
    },
    {
      id: "q-react-123-10",
      prompt: "What happens if a network error occurs while downloading a `React.lazy()` bundle chunk?",
      options: [
        { id: "a", label: "The dynamic import promise rejects, throwing an error that can be caught by an enclosing `<ErrorBoundary>`" },
        { id: "b", label: "The browser retries 1,000,000 times" },
        { id: "c", label: "The computer shuts down" },
        { id: "d", label: "React ignores it and shows an empty page" }
      ],
      correctAnswer: "a",
      explanation: "A failed lazy bundle load rejects the import Promise. An Error Boundary wraps `<Suspense>` to catch and display a 'Failed to load page. Please check your connection' card."
    }
  ]
};

// MODULE 5 QUIZ
const module05Quiz: CurriculumItem = {
  id: "item-react-mod05-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-05-api-optimization",
  moduleTitle: "Module 5: API Integration and Optimization",
  modulePosition: 5,
  title: "Module 5 Assessment: API & Optimization MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 6,
  isModuleQuiz: true,
  contentHeading: "Module 5 Quiz: API Integration, Performance & Resilience",
  contentDescription: "Evaluate your comprehensive mastery of production React engineering: API client layers, environment variables security, useMemo, useCallback, React.memo, code splitting with React.lazy and Suspense, testing with RTL and Vitest, and Class Error Boundaries.",
  questions: [
    ...(lesson119.questions || []).slice(0, 2),
    ...(lesson120.questions || []).slice(0, 2),
    ...(lesson121.questions || []).slice(0, 2),
    ...(lesson122.questions || []).slice(0, 2),
    ...(lesson123.questions || []).slice(0, 2)
  ]
};

// MODULE 5 ASSESSMENT (LAB)
const module05Assessment: CurriculumItem = {
  id: "item-react-mod05-lab",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-05-api-optimization",
  moduleTitle: "Module 5: API Integration and Optimization",
  modulePosition: 5,
  title: "Module 5 Lab: Resilient API Explorer with Lazy Loading & Vitest",
  duration: "50 mins",
  type: "assignment",
  position: 7,
  isModuleAssessment: true,
  contentHeading: "Module 5 Lab Project: Resilient API Explorer with Lazy Loading & Vitest",
  contentDescription: "Build a production-hardened course explorer that integrates a decoupled API client, memoized filtering with useMemo, code-split route chunks with Suspense, an Error Boundary circuit breaker, and Vitest unit tests.",
  assignmentPrompt: {
    instructions: "Develop a production-optimized course analytics explorer:\n1. API Service: Create `courseApi.js` with `getCourses()` and `getAnalytics()` reading `import.meta.env.VITE_API_URL`.\n2. Performance Tuning: Memoize expensive search/filtering with `useMemo`, and pass stable callbacks with `useCallback` to a `React.memo` card item.\n3. Code Splitting: Lazy-load the heavy analytics view using `React.lazy()` and wrap in `<Suspense>`.\n4. Resilience: Wrap the view in an `ErrorBoundary` with a friendly retry fallback UI.\n5. Testing: Write Vitest tests with React Testing Library asserting accessible button clicks and error state handling.",
    deliverables: [
      "Modular API client handling network drops and 4xx/5xx responses",
      "Lazy-loaded route chunk with verified network waterfall in DevTools",
      "Comprehensive unit test suite passing in Vitest"
    ]
  }
};

export const reactModule05: CurriculumSubModule = {
  id: "module-react-05-api-optimization",
  subCourseId: "mod-react-essentials",
  title: "Module 5 — API Integration and Optimization",
  description: "Connect to REST APIs, manage loading/error/empty states, optimize renders with memoization, code-split with Suspense, and write unit tests.",
  position: 5,
  items: [
    lesson119,
    lesson120,
    lesson121,
    lesson122,
    lesson123,
    module05Quiz,
    module05Assessment
  ]
};
