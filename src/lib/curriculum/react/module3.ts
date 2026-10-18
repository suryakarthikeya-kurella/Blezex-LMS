import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 3: HOOKS AND LIFECYCLE
// Lessons 108 - 113 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 108: USEEFFECT AND DEPENDENCY ARRAYS
const lesson108: CurriculumItem = {
  id: "item-react-108-useeffect-dependency-arrays",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "useEffect and Dependency Arrays",
  duration: "35 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "useEffect and Dependency Arrays",
  contentDescription: "Understand synchronizing components with external systems, side effect execution timing, dependency array semantics (empty, missing, reactive values), and cleanup functions.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useState, useEffect } from 'react';

function DocumentTitleSynchronizer({ courseTitle }) {
  const [unreadNotes, setUnreadNotes] = useState(0);

  // 1. Synchronize document title whenever courseTitle or unreadNotes changes
  useEffect(() => {
    document.title = unreadNotes > 0
      ? \`(\${unreadNotes}) \${courseTitle} | BlezeX\`
      : \`\${courseTitle} | BlezeX\`;

    // 2. Cleanup function: Runs before re-running the effect AND on unmount
    return () => {
      document.title = 'BlezeX Learning Portal';
    };
  }, [courseTitle, unreadNotes]); // Dependency array: reactive values used inside effect

  return (
    <div>
      <h2>{courseTitle}</h2>
      <button onClick={() => setUnreadNotes(n => n + 1)}>
        Add Note ({unreadNotes})
      </button>
    </div>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: The Room's Thermostat",
      explanation: "A React component function is like drawing a picture of a room. It should be fast and pure: given props and state, it outputs JSX. But what if you want to turn on an air conditioner outside the room, start a timer on the microwave, or phone a friend? That is an 'External Side Effect'. `useEffect` is your smart thermostat: it waits until the room is completely drawn and displayed on screen, and THEN synchronizes with the outside world. And if you change the room's temperature setting, it turns off the old cycle (cleanup) and starts the new one!",
      bullets: [
        "Side Effect: Any interaction with outside systems (network, timers, document.title, window event listeners).",
        "Runs After Paint: `useEffect` runs asynchronously after the browser paints the screen, preventing UI lag.",
        "Cleanup Function: Returned by `useEffect` to unsubscribe, clear intervals, or abort active connections."
      ]
    },
    {
      title: "The 3 Faces of the Dependency Array",
      explanation: "How React decides when to re-run your effect:",
      table: {
        headers: ["Dependency Array Syntax", "When It Runs", "Common Use Case"],
        rows: [
          ["`useEffect(() => { ... })` (No array)", "Runs after EVERY single render", "Rare; logging render cycles (can cause infinite loops if setting state!)"],
          ["`useEffect(() => { ... }, [])` (Empty array)", "Runs ONLY ONCE after initial mount", "One-time setup: fetching initial data, attaching window resize listeners"],
          ["`useEffect(() => { ... }, [a, b])` (With deps)", "Runs on mount AND whenever `a` or `b` changes value", "Synchronization with specific props, search queries, or IDs"]
        ]
      }
    },
    {
      title: "Concept in Depth: The Invariant of Honest Dependencies",
      explanation: "Every reactive value (props, state, or variables defined in the component) that is referenced inside the effect MUST be included in the dependency array. Omitting real dependencies creates 'stale closure bugs' where the effect holds onto outdated state forever.",
      bullets: [
        "Linter Rule: `react-hooks/exhaustive-deps` warns you whenever a dependency is missing.",
        "Don't lie to React: If you don't want the effect to re-run, restructure the code or use functional updaters (`setCount(c => c + 1)`) so `count` isn't needed in the array."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these classic effect traps:",
      bullets: [
        "Setting State Without Dependencies: Calling `setCount(count + 1)` inside `useEffect` with no dependency array creates an infinite render loop that freezes the browser.",
        "Using useEffect for Derived State: Writing `useEffect(() => { setFullName(first + ' ' + last); }, [first, last])`. DO NOT do this! Just derive `const fullName = first + ' ' + last;` directly during render.",
        "Missing Cleanup: Starting `setInterval` or `addEventListener` without returning `() => clearInterval(id)`. This causes memory leaks and zombie event handlers."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a `WindowWidthTracker` component. Use `useEffect` to listen to the `window.onresize` event and display the current viewport width in real-time. Ensure you return a cleanup function that properly removes the event listener when the component unmounts."
    }
  ],
  questions: [
    {
      id: "q-react-108-1",
      prompt: "What is the primary purpose of the `useEffect` hook in React?",
      options: [
        { id: "a", label: "To define HTML table layouts" },
        { id: "b", label: "To synchronize a component with external systems (such as browser APIs, network requests, timers, or subscriptions)" },
        { id: "c", label: "To replace CSS animations" },
        { id: "d", label: "To create database tables" }
      ],
      correctAnswer: "b",
      explanation: "`useEffect` allows components to perform side effects that connect and synchronize with systems outside of React's pure render cycle."
    },
    {
      id: "q-react-108-2",
      prompt: "When does the callback function passed to `useEffect` execute?",
      options: [
        { id: "a", label: "Before the component starts rendering" },
        { id: "b", label: "After the render is committed to the DOM and the browser has painted the screen" },
        { id: "c", label: "Only when the user clicks a button" },
        { id: "d", label: "During the Vite build process" }
      ],
      correctAnswer: "b",
      explanation: "`useEffect` runs asynchronously after the component renders and the browser paints, ensuring non-blocking user interactions."
    },
    {
      id: "q-react-108-3",
      prompt: "What happens if you pass an empty dependency array `[]` to `useEffect`?",
      options: [
        { id: "a", label: "The effect runs on every single render" },
        { id: "b", label: "The effect runs only once after the initial mount, and its cleanup runs on unmount" },
        { id: "c", label: "The effect never runs at all" },
        { id: "d", label: "It throws a syntax error" }
      ],
      correctAnswer: "b",
      explanation: "An empty dependency array `[]` signals that the effect does not depend on any reactive values, so it executes only after the initial mount."
    },
    {
      id: "q-react-108-4",
      prompt: "What happens if you completely omit the dependency array: `useEffect(() => { ... })`?",
      options: [
        { id: "a", label: "The effect runs after EVERY single render of the component" },
        { id: "b", label: "The effect runs only once" },
        { id: "c", label: "The component unmounts immediately" },
        { id: "d", label: "React disables the component" }
      ],
      correctAnswer: "a",
      explanation: "Without a dependency array, React has no rules to compare, so it runs the effect after every render cycle."
    },
    {
      id: "q-react-108-5",
      prompt: "Why should you return a cleanup function from your `useEffect` callback?",
      options: [
        { id: "a", label: "To clear intervals, abort network requests, or remove event listeners to prevent memory leaks" },
        { id: "b", label: "To restart the operating system" },
        { id: "c", label: "To delete the HTML elements from the server" },
        { id: "d", label: "Cleanup functions are required by law in JavaScript" }
      ],
      correctAnswer: "a",
      explanation: "The cleanup function cleans up ongoing subscriptions, intervals, or event listeners before the effect re-runs or when the component unmounts."
    },
    {
      id: "q-react-108-6",
      prompt: "When does the cleanup function of `useEffect` run?",
      options: [
        { id: "a", label: "Only when the browser tab is closed" },
        { id: "b", label: "Before the effect re-runs with new dependencies, and when the component unmounts from the DOM" },
        { id: "c", label: "Immediately when the effect starts" },
        { id: "d", label: "Every 5 minutes automatically" }
      ],
      correctAnswer: "b",
      explanation: "React runs the cleanup function with the old state/props right before re-executing the effect with new values, and finally when the component unmounts."
    },
    {
      id: "q-react-108-7",
      prompt: "What is a 'stale closure' bug in `useEffect`?",
      options: [
        { id: "a", label: "When a function closes the browser window" },
        { id: "b", label: "When an effect captures old state or prop values because they were omitted from the dependency array" },
        { id: "c", label: "When CSS styles are not refreshed" },
        { id: "d", label: "When the database connection times out" }
      ],
      correctAnswer: "b",
      explanation: "If you omit reactive variables from the dependency array, JavaScript closures retain the initial stale values across subsequent renders."
    },
    {
      id: "q-react-108-8",
      prompt: "Why is it an anti-pattern to use `useEffect` to compute values that could be calculated during render?",
      options: [
        { id: "a", label: "Because calculating in an effect triggers an unnecessary extra render pass and complicates the component" },
        { id: "b", label: "Because effects cannot perform math" },
        { id: "c", label: "Because JavaScript does not allow variables in effects" },
        { id: "d", label: "It slows down the internet connection" }
      ],
      correctAnswer: "a",
      explanation: "Setting state inside an effect to store derived values causes a redundant re-render. Calculate derived values directly in the component body."
    },
    {
      id: "q-react-108-9",
      prompt: "Why does React in StrictMode (development mode) run effects and cleanups twice on initial mount?",
      options: [
        { id: "a", label: "It is a bug in React 18" },
        { id: "b", label: "To intentionally test whether your effects clean up after themselves and uncover missing cleanup logic" },
        { id: "c", label: "To double the speed of rendering" },
        { id: "d", label: "Because developers have dual monitors" }
      ],
      correctAnswer: "b",
      explanation: "StrictMode mounts, unmounts, and re-mounts components in development to verify that setup and cleanup logic are symmetrical and leak-free."
    },
    {
      id: "q-react-108-10",
      prompt: "How can you update state inside `useEffect` without adding that state variable to the dependency array?",
      options: [
        { id: "a", label: "By using the functional updater form: `setCount(prev => prev + 1)`" },
        { id: "b", label: "By deleting the variable" },
        { id: "c", label: "By using a window.alert" },
        { id: "d", label: "It is impossible in React" }
      ],
      correctAnswer: "a",
      explanation: "Using `setCount(c => c + 1)` passes a function to the setter, so the effect doesn't need to read `count` directly, omitting it from dependencies."
    }
  ]
};

// LESSON 109: FETCHING DATA, CLEANUP AND RACE CONDITIONS
const lesson109: CurriculumItem = {
  id: "item-react-109-fetching-data-race-conditions",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "Fetching Data, Cleanup and Race Conditions",
  duration: "35 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Fetching Data, Cleanup and Race Conditions",
  contentDescription: "Master requesting asynchronous API data in useEffect, handling HTTP errors, managing loading/empty/error states, and eliminating network race conditions with AbortController or active flags.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useState, useEffect } from 'react';

function CourseSearchList({ query }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Create an AbortController to cancel stale network requests
    const controller = new AbortController();
    let isCancelled = false;

    async function fetchCourses() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(\`/api/courses?q=\${encodeURIComponent(query)}\`, {
          signal: controller.signal
        });

        // Handle HTTP application-level errors (404, 500)
        if (!response.ok) {
          throw new Error(\`Server returned status \${response.status}\`);
        }

        const data = await response.json();
        if (!isCancelled) {
          setCourses(data);
        }
      } catch (err) {
        // Ignore deliberate user cancellations
        if (err.name !== 'AbortError' && !isCancelled) {
          setError(err.message || 'Failed to load courses');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCourses();

    // 2. Cleanup: Abort request if query changes before response arrives!
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [query]);

  if (isLoading) return <p className="status-msg">Searching courses…</p>;
  if (error) return <p className="status-msg error">{error}</p>;
  if (courses.length === 0) return <p className="status-msg">No courses match "{query}".</p>;

  return (
    <ul className="course-list">
      {courses.map(c => <li key={c.id}>{c.title}</li>)}
    </ul>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Ordering at Two Food Trucks",
      explanation: "Imagine you are standing at a festival. You walk up to Food Truck A and order a Burger (Request 1). It is taking 10 minutes. Impatient, you walk to Food Truck B and order Tacos (Request 2). Truck B hands you the Tacos in 2 minutes, and you sit down to eat. 8 minutes later, Truck A finally runs over with your Burger and takes your Tacos away! That is a 'Network Race Condition'! Request 1 was sent first, but arrived LAST, overwriting your newer data with stale data. `AbortController` is how you yell: 'Cancel my Burger!' the moment you order Tacos.",
      bullets: [
        "Race Condition: When asynchronous operations complete out of order, corrupting state with outdated data.",
        "`AbortController`: Standard browser API to cancel fetch requests in flight.",
        "Unmounted Component Safety: Prevents updating state after a component has left the screen."
      ]
    },
    {
      title: "The 4 Mandatory HTTP States in React",
      explanation: "Every professional data-fetching component must handle 4 states explicitly:",
      table: {
        headers: ["State", "Trigger / Condition", "User Experience (UI)"],
        rows: [
          ["1. Idle / Loading", "`isLoading === true`", "Skeleton loader, spinner, or accessible loading message"],
          ["2. Error", "`error !== null`", "Clear error message explaining the problem with a 'Retry' button"],
          ["3. Empty", "`!isLoading && !error && data.length === 0`", "Friendly explanation that no items were found"],
          ["4. Success", "`!isLoading && !error && data.length > 0`", "Clean, rendered list of items"]
        ]
      }
    },
    {
      title: "Concept in Depth: Transport vs Application Failures",
      explanation: "A common beginner misconception is believing `fetch()` rejects when the server returns 404 or 500. It does NOT! `fetch()` only rejects on network disconnects. You MUST inspect `response.ok`:",
      bullets: [
        "Transport Failure: No internet connection or DNS error -> `fetch()` promise rejects.",
        "Application Failure: Server returns 404 Not Found or 500 Server Error -> `fetch()` promise resolves, but `response.ok === false`! You must throw an error manually."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these data fetching bugs:",
      bullets: [
        "Making the useEffect callback itself `async`: Writing `useEffect(async () => { ... })` is forbidden! An async function returns a Promise, but React expects an effect to return a cleanup function (or nothing). Define an async function *inside* the effect instead.",
        "Ignoring Race Conditions: Typing in a search box without cancelling previous requests causes random stale results.",
        "Forgetting to check `err.name === 'AbortError'`: Throwing an error alert when the user simply navigated away from the page."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build a `CourseDetailFetcher` component that accepts a `courseId` prop. When `courseId` changes, fetch course data from a mock endpoint with a 1-second simulated delay. Use `AbortController` to cancel in-flight requests if the user switches courses rapidly, and display loading, error, and detail states."
    }
  ],
  questions: [
    {
      id: "q-react-109-1",
      prompt: "What is a 'network race condition' in a React data-fetching component?",
      options: [
        { id: "a", label: "When two users compete to buy the last course" },
        { id: "b", label: "When an older, slower network request resolves AFTER a newer request, overwriting fresh data with outdated results" },
        { id: "c", label: "When the Wi-Fi router overheats" },
        { id: "d", label: "When React renders faster than the computer screen" }
      ],
      correctAnswer: "b",
      explanation: "A race condition happens when multiple asynchronous requests finish out of order, allowing an obsolete response to overwrite current state."
    },
    {
      id: "q-react-109-2",
      prompt: "How can you cancel an in-flight native `fetch()` request in modern browsers?",
      options: [
        { id: "a", label: "By deleting the URL" },
        { id: "b", label: "Using an `AbortController` and passing its `signal` to the fetch options, then calling `controller.abort()` in cleanup" },
        { id: "c", label: "By closing the laptop lid" },
        { id: "d", label: "By calling `fetch.cancel()`" }
      ],
      correctAnswer: "b",
      explanation: "Standard `fetch()` accepts `{ signal: controller.signal }`. Calling `controller.abort()` immediately cancels the HTTP request."
    },
    {
      id: "q-react-109-3",
      prompt: "Why is writing `useEffect(async () => { ... }, [])` invalid in React?",
      options: [
        { id: "a", label: "Because async/await is deprecated in modern JavaScript" },
        { id: "b", label: "Because an async function returns a Promise, but React expects an effect callback to return either a cleanup function or undefined" },
        { id: "c", label: "Because effects only support XML" },
        { id: "d", label: "Because promises cannot run in browsers" }
      ],
      correctAnswer: "b",
      explanation: "React relies on the return value of an effect to be a cleanup function. Async functions return Promises, which React cannot call as cleanup functions."
    },
    {
      id: "q-react-109-4",
      prompt: "Does native `window.fetch()` reject its promise when the server returns a 404 or 500 status code?",
      options: [
        { id: "a", label: "Yes, it throws a catchable NetworkError automatically" },
        { id: "b", label: "No; it resolves successfully with `response.ok === false`. You must manually check `if (!response.ok) throw new Error(...)`" },
        { id: "c", label: "Only if the response is JSON" },
        { id: "d", label: "Only on Windows operating systems" }
      ],
      correctAnswer: "b",
      explanation: "`fetch()` only rejects on network failures (e.g. offline). HTTP 4xx and 5xx responses still resolve normally, requiring manual `response.ok` verification."
    },
    {
      id: "q-react-109-5",
      prompt: "What error name is thrown when a `fetch` request is aborted via `AbortController`?",
      options: [
        { id: "a", label: "'CancelException'" },
        { id: "b", label: "'AbortError'" },
        { id: "c", label: "'NetworkFailure'" },
        { id: "d", label: "'TimeoutError'" }
      ],
      correctAnswer: "b",
      explanation: "Aborting a fetch throws a DOMException with the name `'AbortError'`. Catch blocks check for this to avoid displaying false error banners to users."
    },
    {
      id: "q-react-109-6",
      prompt: "Which library is commonly used in enterprise React applications for automatic caching, retries, and race condition management?",
      options: [
        { id: "a", label: "TanStack Query (React Query)" },
        { id: "b", label: "Lodash" },
        { id: "c", label: "Moment.js" },
        { id: "d", label: "jQuery UI" }
      ],
      correctAnswer: "a",
      explanation: "TanStack Query provides robust server-state management with automatic background refetching, request deduplication, and cache invalidation."
    },
    {
      id: "q-react-109-7",
      prompt: "Why should you track `isLoading`, `error`, and `data` in separate state variables or a combined state object?",
      options: [
        { id: "a", label: "To make the component code as long as possible" },
        { id: "b", label: "To make the four UI states (loading, error, empty, and loaded) completely explicit and predictable" },
        { id: "c", label: "Because React forbids combining them" },
        { id: "d", label: "To increase CSS animation frame rate" }
      ],
      correctAnswer: "b",
      explanation: "Explicitly tracking loading, error, and data prevents 'impossible states' and ensures users always receive accurate visual feedback."
    },
    {
      id: "q-react-109-8",
      prompt: "What happens if a user navigates away from a page while a fetch request is still loading and no cleanup or abort logic exists?",
      options: [
        { id: "a", label: "The entire website crashes" },
        { id: "b", label: "When the response arrives, the component tries to call `setState` on an unmounted component, potentially causing memory leaks" },
        { id: "c", label: "The browser downloads the entire internet" },
        { id: "d", label: "React cancels it automatically" }
      ],
      correctAnswer: "b",
      explanation: "Without cleanup, the asynchronous callback executes after unmount, keeping old memory references alive and causing state leaks."
    },
    {
      id: "q-react-109-9",
      prompt: "What is an alternative to AbortController for preventing state updates from stale requests?",
      options: [
        { id: "a", label: "Using a boolean cancellation flag: `let isCurrent = true; ... return () => { isCurrent = false; }`" },
        { id: "b", label: "Disconnecting the database" },
        { id: "c", label: "Using a `for` loop that runs 1 million times" },
        { id: "d", label: "Closing the browser console" }
      ],
      correctAnswer: "a",
      explanation: "A boolean `isCancelled` flag set to `true` in the cleanup function ensures that even if the request finishes, `setState` will be skipped."
    },
    {
      id: "q-react-109-10",
      prompt: "Why should you encode query parameters with `encodeURIComponent(query)` when building API URLs?",
      options: [
        { id: "a", label: "To make the text upper-case" },
        { id: "b", label: "To safely handle spaces, ampersands (&), and special characters that would otherwise corrupt the URL query string" },
        { id: "c", label: "To encrypt the user's password" },
        { id: "d", label: "Because Vite requires it for build" }
      ],
      correctAnswer: "b",
      explanation: "`encodeURIComponent()` escapes special characters (like spaces, `&`, `?`), ensuring valid URL query string formatting."
    }
  ]
};

// LESSON 110: USEREF AND DOM REFERENCES
const lesson110: CurriculumItem = {
  id: "item-react-110-useref-dom-references",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "useRef and DOM References",
  duration: "35 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "useRef and DOM References",
  contentDescription: "Understand mutable ref containers, accessing real DOM elements directly (focus, scroll, media playback), storing timer/interval IDs across renders, and the critical distinction between state and refs.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useRef, useState, useEffect } from 'react';

function VideoPlayerWithStopwatch() {
  // 1. DOM Ref: Access real DOM node directly for imperative APIs
  const videoRef = useRef(null);

  // 2. Mutable Value Ref: Persists across renders WITHOUT triggering re-render
  const timerIdRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Focus and play video on mount
  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);

    // Start timer and store ID in ref
    if (!timerIdRef.current) {
      timerIdRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);

    // Clear timer stored in ref
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, []);

  return (
    <div className="player-card">
      <video ref={videoRef} width="400" src="/sample-lesson.mp4" />
      <p>Watch Time: {seconds}s</p>
      <div className="controls">
        <button onClick={handlePlay} disabled={isPlaying}>Play</button>
        <button onClick={handlePause} disabled={!isPlaying}>Pause</button>
      </div>
    </div>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: The Sticky Note Behind the Screen",
      explanation: "Remember how `useState` is like a digital arena scoreboard that causes everyone in the stadium to look and cheer (triggers a full re-render)? A `useRef` is like a small yellow sticky note stuck to the *back* of the scorekeeper's desk. The scorekeeper can write on it, erase it, and change the number 1,000 times a minute, and nobody in the stadium notices because changing a ref NEVER triggers a re-render! It also acts like a physical leash to an actual browser DOM element (like an `<input>` or `<video>`) when you need to call native browser methods like `.focus()` or `.scrollIntoView()`.",
      bullets: [
        "Plain JS Object: `useRef(initial)` returns `{ current: initial }`.",
        "Persistent: The `.current` property survives across all re-renders.",
        "Silent: Mutating `.current` does NOT cause the component to re-render."
      ]
    },
    {
      title: "The 2 Main Use Cases for `useRef`",
      explanation: "When should you reach for `useRef`?",
      table: {
        headers: ["Use Case", "Why `useRef` is Used", "Code Example"],
        rows: [
          ["1. Direct DOM Access", "For imperative DOM actions that React cannot do declaratively (focus, scroll, measurements, media)", "`inputRef.current.focus()`"],
          ["2. Storing Mutable Values", "For holding data that needs to persist across renders but doesn't affect visible JSX (timer IDs, previous state, isMounted flags)", "`timerRef.current = setInterval(...)`"]
        ]
      }
    },
    {
      title: "Concept in Depth: State vs Ref Decision Matrix",
      explanation: "Should you use `useState` or `useRef`? Follow this simple test:",
      bullets: [
        "Does changing this value need to be reflected immediately in the rendered JSX on screen? -> Use `useState`.",
        "Is this value only used internally by event handlers or effects, and changing it should NOT trigger a re-render? -> Use `useRef`."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common ref mistakes:",
      bullets: [
        "Reading or writing `ref.current` during rendering: DO NOT read or write `ref.current` inside the component body during render! Only read or write refs inside event handlers or `useEffect`.",
        "Using refs to bypass React state: Trying to build forms by querying `ref.current.value` everywhere instead of using controlled inputs.",
        "Forgetting Optional Chaining: Calling `inputRef.current.focus()` before the element has mounted throws a TypeError. Always write `inputRef.current?.focus()`."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build an auto-focus search modal. When the modal opens, automatically focus the search `<input>` using a DOM ref. Include a timer that tracks how many seconds the modal has been open using a mutable value ref, and verify that the timer update does not re-render the modal content."
    }
  ],
  questions: [
    {
      id: "q-react-110-1",
      prompt: "What does `useRef(initialValue)` return in a React component?",
      options: [
        { id: "a", label: "A function that triggers a re-render" },
        { id: "b", label: "A mutable object with a single `.current` property initialized to `initialValue`" },
        { id: "c", label: "An array of all DOM elements in the document" },
        { id: "d", label: "A database query cursor" }
      ],
      correctAnswer: "b",
      explanation: "`useRef()` returns a plain JavaScript object `{ current: initialValue }` that persists throughout the full lifecycle of the component."
    },
    {
      id: "q-react-110-2",
      prompt: "What happens when you mutate the `.current` property of a ref (e.g. `countRef.current = 10`)?",
      options: [
        { id: "a", label: "The component immediately re-renders" },
        { id: "b", label: "Nothing re-renders; mutating `.current` changes the stored value silently without triggering a render" },
        { id: "c", label: "React throws a warning about direct mutation" },
        { id: "d", label: "The browser tab refreshes" }
      ],
      correctAnswer: "b",
      explanation: "Unlike state setters, mutating `ref.current` does not notify React or schedule a re-render. It is a silent, synchronous mutation."
    },
    {
      id: "q-react-110-3",
      prompt: "Which of the following is a legitimate use case for a DOM ref?",
      options: [
        { id: "a", label: "Managing the text of a paragraph" },
        { id: "b", label: "Imperatively focusing an `<input>`, scrolling to a specific element, or measuring element dimensions" },
        { id: "c", label: "Storing the entire application's authentication token" },
        { id: "d", label: "Replacing all CSS stylesheets" }
      ],
      correctAnswer: "b",
      explanation: "Imperative DOM operations like `.focus()`, `.scrollIntoView()`, and calling `.play()` on HTML5 `<video>` elements require direct DOM refs."
    },
    {
      id: "q-react-110-4",
      prompt: "Why should you NOT read or write `ref.current` during the render phase (in the component body)?",
      options: [
        { id: "a", label: "Because React components should be pure functions with respect to rendering; modifying refs during render produces unpredictable bugs with Concurrent Mode" },
        { id: "b", label: "Because refs only exist in Node.js" },
        { id: "c", label: "Because JavaScript variables are deleted during render" },
        { id: "d", label: "Because it makes the browser window close" }
      ],
      correctAnswer: "a",
      explanation: "Render functions must remain pure. You should only read or write `ref.current` inside event handlers or `useEffect` hooks."
    },
    {
      id: "q-react-110-5",
      prompt: "How do you connect a `useRef` hook to a JSX element in React?",
      options: [
        { id: "a", label: "`<input id={myRef} />`" },
        { id: "b", label: "`<input ref={myRef} />`" },
        { id: "c", label: "`<input bindRef={myRef} />`" },
        { id: "d", label: "`<input target={myRef} />`" }
      ],
      correctAnswer: "b",
      explanation: "Passing the ref object to the `ref` prop (`<input ref={inputRef} />`) tells React to assign the corresponding DOM node to `inputRef.current` once mounted."
    },
    {
      id: "q-react-110-6",
      prompt: "What is the value of `inputRef.current` on the very first render before the component has mounted to the DOM?",
      options: [
        { id: "a", label: "The HTML element" },
        { id: "b", label: "Whatever initial value was passed to `useRef(initialValue)` (commonly `null`)" },
        { id: "c", label: "`undefined`" },
        { id: "d", label: "The entire window document" }
      ],
      correctAnswer: "b",
      explanation: "Before the initial commit and mount, React has not created the DOM node yet, so `ref.current` holds its initial value (typically `null`)."
    },
    {
      id: "q-react-110-7",
      prompt: "How can `useRef` be used to store a timer ID from `setInterval`?",
      options: [
        { id: "a", label: "Store it in `timerRef.current = setInterval(...)` so it can be cleared across different renders without causing extra re-renders" },
        { id: "b", label: "Refs cannot store numbers" },
        { id: "c", label: "By saving it as a cookie" },
        { id: "d", label: "By writing it to the console" }
      ],
      correctAnswer: "a",
      explanation: "Timer IDs do not affect what is displayed on screen, making `useRef` the ideal container to store the ID across renders."
    },
    {
      id: "q-react-110-8",
      prompt: "What hook can be used by child components to expose specific imperative methods to a parent ref?",
      options: [
        { id: "a", label: "`useImperativeHandle` combined with `forwardRef`" },
        { id: "b", label: "`useCallback`" },
        { id: "c", label: "`useMemo`" },
        { id: "d", label: "`useReducer`" }
      ],
      correctAnswer: "a",
      explanation: "`useImperativeHandle(ref, createHandle)` customizes the instance value that is exposed to parent components when using `forwardRef`."
    },
    {
      id: "q-react-110-9",
      prompt: "How can you track the PREVIOUS value of a state variable across renders?",
      options: [
        { id: "a", label: "Using a `useRef` that stores the value in `useEffect` on every render" },
        { id: "b", label: "By saving it in localStorage" },
        { id: "c", label: "React saves previous state in `window.previous`" },
        { id: "d", label: "It is impossible in React" }
      ],
      correctAnswer: "a",
      explanation: "A custom `usePrevious(value)` hook uses a ref to store the current value in `useEffect`, allowing the component to read the previous render's value."
    },
    {
      id: "q-react-110-10",
      prompt: "What will happen if you attempt to use `ref` on a custom function component without `forwardRef`?",
      options: [
        { id: "a", label: "It works automatically" },
        { id: "b", label: "React prints a console warning: 'Function components cannot be given refs. Did you mean to use React.forwardRef()?'" },
        { id: "c", label: "The browser crashes" },
        { id: "d", label: "The component converts into a class component" }
      ],
      correctAnswer: "b",
      explanation: "Plain function components do not accept the `ref` attribute by default. You must wrap them in `React.forwardRef((props, ref) => ...)`."
    }
  ]
};

// LESSON 111: CONTEXT AND USEREDUCER
const lesson111: CurriculumItem = {
  id: "item-react-111-context-usereducer",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "Context API and useReducer",
  duration: "35 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Context API and useReducer",
  contentDescription: "Master eliminating prop-drilling with React Context (createContext, useContext, Provider), managing complex state transitions with pure reducers via useReducer, and pairing Context with useReducer for clean global state.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { createContext, useContext, useReducer } from 'react';

// 1. Define Pure Reducer function: (state, action) => newState
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_COURSE': {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (exists) return state; // Avoid duplicate enrollment
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_COURSE':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      throw new Error(\`Unknown action type: \${action.type}\`);
  }
}

// 2. Create Context
const CartContext = createContext(null);

// 3. Provider Component wrapping state + dispatch
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Custom Hook for clean, safe consumption
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}`
  },
  sections: [
    {
      title: "Core Concept: The University Wi-Fi vs Carrying Ethernet Cables",
      explanation: "Imagine you are in a 5-story university building. If the ground-floor server wants to send internet data to a student on the 5th floor, 'prop drilling' is like running a physical Ethernet cable from floor 1, through floor 2, through floor 3, and through floor 4, forcing every single professor in between to hold the wire even if they don't care about it! React 'Context' is the University Wi-Fi: the `Provider` broadcasts the signal into the air, and any student on any floor can simply open their laptop and connect directly with `useContext()`. And `useReducer` is the University Registrar: instead of students scribbling all over official records directly, they submit an official 'Action Request Form' (`dispatch({ type: 'ENROLL' })`), and the Registrar processes it following strict, pure rules!",
      bullets: [
        "Context: Broadcasts values down the entire component subtree without manual prop passing.",
        "useReducer: Consolidates complex state transitions into a single pure reducer function.",
        "Separation of Concerns: UI dispatches 'what happened'; the reducer computes 'how state changes'."
      ]
    },
    {
      title: "The useReducer Flow",
      explanation: "How state transitions happen predictably in `useReducer`:",
      diagram: "+-------------------------------------------------------------+\n|                      THE REDUCER CYCLE                      |\n+-------------------------------------------------------------+\n| [User Interaction]: Click 'Enroll Now' button               |\n|            |                                                |\n|            v                                                |\n| [dispatch(action)]: { type: 'ADD_COURSE', payload: course } |\n|            |                                                |\n|            v                                                |\n| [Pure Reducer]: (currentState, action) => nextState         |\n|            |    Must be pure (no side effects, no mutations)|\n|            v                                                |\n| [Subscribed UI]: Re-renders with the newly returned state   |\n+-------------------------------------------------------------+"
    },
    {
      title: "Concept in Depth: Reducers Must Be Pure",
      explanation: "A reducer function must be 100% PURE: given the same state and action, it must always return the exact same output:",
      bullets: [
        "No Side Effects: Never call API requests, timers, or `Math.random()` inside a reducer.",
        "No Mutations: Never write `state.items.push(item)`. Always return a new object: `{ ...state, items: [...] }`.",
        "Default Fallback: Always throw an error or return current state for unrecognized actions."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Crucial mistakes when using Context and useReducer:",
      bullets: [
        "Putting Rapidly Changing State into One Giant Context: If a Context value updates, EVERY component that calls `useContext()` on it will re-render! Split unrelated contexts (e.g. `ThemeContext` separate from `CartContext`).",
        "Consuming Context Outside its Provider: Calling `useCart()` in a component that isn't wrapped in `<CartProvider>` returns `null` or throws an error.",
        "Putting API calls in Reducers: Reducers compute state synchronously; network calls belong in effects or thunks."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a `ThemeContext` that supports 'light' and 'dark' mode. Wrap your application tree in `ThemeProvider`. Build a `ThemeToggle` button in the navbar and a `DashboardCard` in the content area that dynamically reads the current theme from Context without any props."
    }
  ],
  questions: [
    {
      id: "q-react-111-1",
      prompt: "What problem does the React Context API primarily solve?",
      options: [
        { id: "a", label: "It speeds up network download speeds" },
        { id: "b", label: "It eliminates 'prop drilling' by sharing values across deeply nested components without passing props through every level" },
        { id: "c", label: "It compiles TypeScript into JavaScript" },
        { id: "d", label: "It replaces the need for backend servers" }
      ],
      correctAnswer: "b",
      explanation: "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
    },
    {
      id: "q-react-111-2",
      prompt: "What are the two core elements required to use React Context?",
      options: [
        { id: "a", label: "A `<Provider>` component that supplies the value and a `useContext()` hook that consumes it" },
        { id: "b", label: "A SQL table and an API router" },
        { id: "c", label: "A CSS file and an SVG icon" },
        { id: "d", label: "A class component and a render method" }
      ],
      correctAnswer: "a",
      explanation: "You wrap the subtree in `<MyContext.Provider value={...}>`, and any descendant component consumes it using `const val = useContext(MyContext)`."
    },
    {
      id: "q-react-111-3",
      prompt: "What is a 'reducer' function in React's `useReducer` hook?",
      options: [
        { id: "a", label: "A function that reduces the image resolution" },
        { id: "b", label: "A pure function that accepts `(state, action)` and returns the calculated `nextState`" },
        { id: "c", label: "A function that deletes unused CSS classes" },
        { id: "d", label: "A method to compress the bundle file" }
      ],
      correctAnswer: "b",
      explanation: "A reducer is a pure function that calculates the next state based on the current state and an incoming action object."
    },
    {
      id: "q-react-111-4",
      prompt: "Why must a reducer function be strictly 'pure'?",
      options: [
        { id: "a", label: "Because impure reducers with mutations or random numbers cause unpredictable state bugs and break time-travel debugging" },
        { id: "b", label: "Because JavaScript deletes impure functions" },
        { id: "c", label: "Because React only runs on SSL websites" },
        { id: "d", label: "It is only a cosmetic recommendation" }
      ],
      correctAnswer: "a",
      explanation: "Reducers must produce identical outputs for given inputs without mutating arguments or performing asynchronous side effects."
    },
    {
      id: "q-react-111-5",
      prompt: "What does the `dispatch` function do in `useReducer`?",
      options: [
        { id: "a", label: "It sends an email notification" },
        { id: "b", label: "It sends an action object (e.g. `{ type: 'ADD_ITEM', payload: data }`) to the reducer function to trigger a state transition" },
        { id: "c", label: "It stops JavaScript execution" },
        { id: "d", label: "It reloads the page" }
      ],
      correctAnswer: "b",
      explanation: "`dispatch(action)` passes an action to the reducer, which calculates the new state and schedules a re-render."
    },
    {
      id: "q-react-111-6",
      prompt: "When is `useReducer` preferred over multiple `useState` hooks?",
      options: [
        { id: "a", label: "When state logic is complex, involves multiple sub-values, or when the next state depends closely on previous state across many actions" },
        { id: "b", label: "Only when building games" },
        { id: "c", label: "When a component has only a single boolean state" },
        { id: "d", label: "Never; useState has completely replaced useReducer" }
      ],
      correctAnswer: "a",
      explanation: "`useReducer` excels when managing complex state transitions, separating business logic from UI event handlers."
    },
    {
      id: "q-react-111-7",
      prompt: "What happens when a Context Provider's `value` prop changes?",
      options: [
        { id: "a", label: "Only the Provider component re-renders" },
        { id: "b", label: "All descendant components that call `useContext()` on that specific context will automatically re-render with the new value" },
        { id: "c", label: "The browser reloads" },
        { id: "d", label: "All other contexts are deleted" }
      ],
      correctAnswer: "b",
      explanation: "Any component that subscribes to a context via `useContext` will re-render whenever the Provider's value changes."
    },
    {
      id: "q-react-111-8",
      prompt: "Why should you avoid putting rapidly updating values (like mouse coordinates) into a global context?",
      options: [
        { id: "a", label: "Because every subscribed component in the entire app will re-render on every mouse movement, causing severe UI lag" },
        { id: "b", label: "Because mouse coordinates cannot be numbers" },
        { id: "c", label: "Because React does not support mouse events" },
        { id: "d", label: "Because Context only supports strings" }
      ],
      correctAnswer: "a",
      explanation: "Rapid context updates trigger widespread re-renders of all consumer components. High-frequency state should remain local or use specialized stores."
    },
    {
      id: "q-react-111-9",
      prompt: "What will `useContext(MyContext)` return if called inside a component that is NOT wrapped in `<MyContext.Provider>`?",
      options: [
        { id: "a", label: "The `defaultValue` passed when `createContext(defaultValue)` was initially created" },
        { id: "b", label: "An empty array" },
        { id: "c", label: "The string 'Error'" },
        { id: "d", label: "The window object" }
      ],
      correctAnswer: "a",
      explanation: "If no matching Provider exists above in the tree, React falls back to the default value provided during `createContext(defaultValue)`."
    },
    {
      id: "q-react-111-10",
      prompt: "How can you prevent consuming components from receiving `null` when using a custom context hook?",
      options: [
        { id: "a", label: "Add a safety check: `if (!context) throw new Error('useMyContext must be used within Provider');`" },
        { id: "b", label: "Make all contexts global window variables" },
        { id: "c", label: "Disable TypeScript" },
        { id: "d", label: "It cannot be prevented" }
      ],
      correctAnswer: "a",
      explanation: "Wrapping `useContext` in a custom hook with a guard check provides helpful runtime error messages if developers forget to wrap their components in the Provider."
    }
  ]
};

// LESSON 112: CUSTOM HOOKS AND LIFECYCLE CONCEPTS
const lesson112: CurriculumItem = {
  id: "item-react-112-custom-hooks-lifecycle",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "Custom Hooks and Lifecycle Concepts",
  duration: "35 mins",
  type: "cheatsheet",
  position: 5,
  contentHeading: "Custom Hooks and Lifecycle Concepts",
  contentDescription: "Master extracting reusable stateful logic into custom hooks (functions starting with 'use'), understanding render and synchronization lifecycles, and sharing behavior without duplicating code.",
  codeSnippet: {
    language: "jsx",
    code: `import { useState, useEffect } from 'react';

// 1. Custom Hook: Extracts reusable localStorage synchronization logic
export function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Keep localStorage synchronized whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// 2. Component cleanly consumes the custom hook
function BookmarkButton({ courseId }) {
  const [bookmarks, setBookmarks] = useLocalStorage('blezex_bookmarks', []);
  const isBookmarked = bookmarks.includes(courseId);

  const toggleBookmark = () => {
    setBookmarks(prev =>
      isBookmarked ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  return (
    <button onClick={toggleBookmark} className={isBookmarked ? 'bookmarked' : ''}>
      {isBookmarked ? '★ Bookmarked' : '☆ Bookmark Course'}
    </button>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Custom Recipe Cards",
      explanation: "Imagine you are a chef. Every time you make pasta, pizza, or soup, you have to measure garlic, chop onions, and heat olive oil. Writing out the exact same 15 steps in every single recipe is exhausting! So you create a dedicated recipe card called `useGarlicBase()`. Whenever you cook, you just pull out that card and use it. A 'Custom Hook' is your reusable recipe card in React: whenever two or more components need the exact same stateful logic (like debouncing a search query, checking online status, or synchronizing with localStorage), you package it into a function named `useSomething()`. Components share the LOGIC, but each gets its own independent state!",
      bullets: [
        "Naming Convention: MUST begin with `use` (e.g. `useOnlineStatus`, `useFetch`, `useDebounce`) so React linters can enforce the Rules of Hooks.",
        "Independent State: Calling a custom hook inside 5 components creates 5 separate, isolated instances of state.",
        "Think in Synchronization: Move away from old class lifecycle names (`componentDidMount`) to thinking about render and synchronization."
      ]
    },
    {
      title: "The Rules of Hooks",
      explanation: "React enforces two unbreakable rules across all hooks (built-in and custom):",
      table: {
        headers: ["Rule", "What It Prohibits", "Why It Exists"],
        rows: [
          ["1. Only Call Hooks at the Top Level", "Do not call hooks inside loops, conditions, or nested functions", "React relies on the call order of hooks to match state across renders"],
          ["2. Only Call Hooks from React Functions", "Do not call hooks inside regular vanilla JS helper functions", "Hooks require React's internal fiber execution context to work"]
        ]
      }
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Watch out for these custom hook mistakes:",
      bullets: [
        "Naming without 'use': Naming your custom hook `getLocalStorage()` disables React's linter, allowing hook rule violations to sneak in undetected.",
        "Assuming Shared State: Thinking that `useAuth()` shares state between components automatically. Custom hooks share *logic*, not state. To share state, combine the custom hook with React Context.",
        "Over-Extracting: Creating custom hooks for trivial 2-line handlers. Only extract when logic is genuinely reused or complex."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a custom hook named `useOnlineStatus()` that subscribes to `window.addEventListener('online')` and `window.addEventListener('offline')`. Return a boolean `isOnline`. Consume it in an `AppBanner` component that displays a red warning banner whenever the user loses internet connection."
    }
  ],
  questions: [
    {
      id: "q-react-112-1",
      prompt: "What is a custom hook in React?",
      options: [
        { id: "a", label: "A special CSS selector for styling buttons" },
        { id: "b", label: "A JavaScript function whose name starts with 'use' and that can call other React hooks to extract reusable stateful logic" },
        { id: "c", label: "A database stored procedure" },
        { id: "d", label: "A feature only available in React Native" }
      ],
      correctAnswer: "b",
      explanation: "Custom hooks are JavaScript functions whose names begin with 'use' that package reusable stateful logic by composing built-in hooks."
    },
    {
      id: "q-react-112-2",
      prompt: "Why MUST the name of a custom hook always start with 'use' (e.g. `useWindowSize`)?",
      options: [
        { id: "a", label: "To allow React and ESLint to automatically identify it and enforce the Rules of Hooks" },
        { id: "b", label: "Because JavaScript keywords must start with 'use'" },
        { id: "c", label: "It is required for the browser to download the file" },
        { id: "d", label: "It has no significance and can be named anything" }
      ],
      correctAnswer: "a",
      explanation: "The 'use' prefix enables React's compiler and linter (`eslint-plugin-react-hooks`) to verify that the Rules of Hooks are respected."
    },
    {
      id: "q-react-112-3",
      prompt: "If Component A and Component B both call the same custom hook `const [val, setVal] = useToggle()`, do they share the same state value?",
      options: [
        { id: "a", label: "Yes, custom hooks create global state shared by all callers" },
        { id: "b", label: "No; each component calling a custom hook gets its own completely independent instance of state" },
        { id: "c", label: "Only if they are siblings" },
        { id: "d", label: "Only in production mode" }
      ],
      correctAnswer: "b",
      explanation: "Custom hooks share stateful *logic*, not state itself. Each call to a hook sets up an isolated, independent state container."
    },
    {
      id: "q-react-112-4",
      prompt: "Which of the following is a violation of the Rules of Hooks?",
      options: [
        { id: "a", label: "Calling `useState` at the top level of a component function" },
        { id: "b", label: "Calling `useEffect` inside an `if (isLoggedIn)` conditional block" },
        { id: "c", label: "Returning an array from a custom hook" },
        { id: "d", label: "Calling a custom hook inside another custom hook" }
      ],
      correctAnswer: "b",
      explanation: "Hooks must never be called conditionally, inside loops, or inside nested callbacks. They must always run in the same order on every render."
    },
    {
      id: "q-react-112-5",
      prompt: "Can a custom hook return values other than an array `[value, setter]`?",
      options: [
        { id: "a", label: "No, custom hooks are restricted to returning 2-element arrays" },
        { id: "b", label: "Yes, a custom hook can return any JavaScript value (objects, booleans, functions, numbers, or tuples)" },
        { id: "c", label: "Only strings are allowed" },
        { id: "d", label: "Only promises are allowed" }
      ],
      correctAnswer: "b",
      explanation: "Unlike `useState`, custom hooks can return whatever data structures make sense: objects (`{ data, isLoading, error }`), booleans, or arrays."
    },
    {
      id: "q-react-112-6",
      prompt: "What is the modern mental model for React component lifecycles?",
      options: [
        { id: "a", label: "Thinking in terms of class lifecycle methods (componentDidMount, componentWillUpdate)" },
        { id: "b", label: "Thinking in terms of state rendering and synchronization with external systems" },
        { id: "c", label: "Thinking in terms of server thread locks" },
        { id: "d", label: "Thinking in terms of CSS animations" }
      ],
      correctAnswer: "b",
      explanation: "Modern React encourages thinking about how UI synchronizes with props and state rather than mapping to arbitrary class lifecycle events."
    },
    {
      id: "q-react-112-7",
      prompt: "How can you combine custom hooks with React Context to share a single state instance across the entire application?",
      options: [
        { id: "a", label: "Define the custom hook inside the Context Provider and export a wrapper hook `useMyContext()` that calls `useContext(MyContext)`" },
        { id: "b", label: "Save the state in a cookie" },
        { id: "c", label: "You cannot combine them" },
        { id: "d", label: "By refreshing the web page" }
      ],
      correctAnswer: "a",
      explanation: "Pairing a custom hook with a Context Provider provides a clean, ergonomic API for consuming global shared state."
    },
    {
      id: "q-react-112-8",
      prompt: "What is the purpose of a `useDebounce` custom hook in a search input?",
      options: [
        { id: "a", label: "To delay sending API search queries until the user stops typing for a specified time (e.g. 300ms), reducing server load" },
        { id: "b", label: "To check spelling mistakes" },
        { id: "c", label: "To encrypt the search query" },
        { id: "d", label: "To delete the input text" }
      ],
      correctAnswer: "a",
      explanation: "Debouncing postpones executing an expensive operation (like an API request) until a certain amount of idle time has elapsed since the last keystroke."
    },
    {
      id: "q-react-112-9",
      prompt: "Can custom hooks call other custom hooks?",
      options: [
        { id: "a", label: "No, custom hooks cannot be composed" },
        { id: "b", label: "Yes, custom hooks can freely call built-in hooks and other custom hooks to create layered abstractions" },
        { id: "c", label: "Only if they share the same file name" },
        { id: "d", label: "Only on Linux servers" }
      ],
      correctAnswer: "b",
      explanation: "Custom hooks are composable. For example, a `useCourseCatalog` hook can call `useFetch`, which in turn calls `useLocalStorage`."
    },
    {
      id: "q-react-112-10",
      prompt: "Where can custom hooks be called?",
      options: [
        { id: "a", label: "Inside vanilla JavaScript utility files that have no React components" },
        { id: "b", label: "Only at the top level of React function components or at the top level of other custom hooks" },
        { id: "c", label: "Inside HTML script tags" },
        { id: "d", label: "Inside package.json" }
      ],
      correctAnswer: "b",
      explanation: "Hooks can only be called from React function components or from other custom hooks, never from ordinary JavaScript functions."
    }
  ]
};

// LESSON 113: USEID AND ACCESSIBLE ID RELATIONSHIPS
const lesson113: CurriculumItem = {
  id: "item-react-113-useid-accessible-ids",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "useId and Accessible ID Relationships",
  duration: "35 mins",
  type: "cheatsheet",
  position: 6,
  contentHeading: "useId and Accessible ID Relationships",
  contentDescription: "Understand generating unique, stable IDs across server and client with useId, linking form controls with htmlFor and aria-describedby, and why useId must never be used as a list key.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useId } from 'react';

// Reusable Form Field that can be rendered 100 times on the same page
// without ever producing duplicate HTML ID collisions!
function FormField({ label, hint, error, ...inputProps }) {
  // 1. Generate unique, stable ID prefix
  const id = useId();
  const inputId = \`\${id}-input\`;
  const hintId = \`\${id}-hint\`;
  const errorId = \`\${id}-error\`;

  return (
    <div className="field-container">
      {/* 2. Link label to input */}
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>

      {/* 3. Link input to accessibility hint and error via aria-describedby */}
      <input
        id={inputId}
        aria-describedby={\`\${hint ? hintId : ''} \${error ? errorId : ''}\`.trim() || undefined}
        aria-invalid={!!error}
        className={error ? 'input-error' : 'input-valid'}
        {...inputProps}
      />

      {hint && <span id={hintId} className="field-hint">{hint}</span>}
      {error && <span id={errorId} className="field-error-msg">{error}</span>}
    </div>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Name Tags at a Twin Convention",
      explanation: "Imagine you design a beautiful name tag for an employee: `id='employee-name'`. That works great if there is only one employee on screen. But what if you have a registration form with 3 people: Student, Parent, and Emergency Contact? If all three use the same `id='employee-name'`, the browser gets confused! When the user clicks the label for the Emergency Contact, the browser jumps to the Student's input box! `useId` is a smart automated badge dispenser: it stamps a guaranteed unique, collision-proof ID onto every single component instance (`:r1:`, `:r2:`, `:r3:`).",
      bullets: [
        "Unique & Collision-Free: Guarantees no two inputs on the same webpage share the same HTML ID.",
        "Server-Side Rendering (SSR) Safe: Generates identical IDs on both server and client, preventing hydration mismatch errors.",
        "A11y Relationships: Connects `<label htmlFor={id}>`, `aria-describedby`, and `aria-labelledby` seamlessly."
      ]
    },
    {
      title: "The DOs and DON'Ts of `useId`",
      explanation: "Important rules to avoid misusing `useId`:",
      table: {
        headers: ["Scenario", "Permitted / Recommended?", "Reason"],
        rows: [
          ["Connecting `<label>` to `<input>`", "YES (Primary use case)", "Ensures clicking label focuses the matching input"],
          ["Connecting `aria-describedby` hint text", "YES (Recommended)", "Allows screen readers to announce help text when input is focused"],
          ["Using `useId()` as a list item key (`key={useId()}`)", "STRICTLY FORBIDDEN (ANTI-PATTERN!)", "Keys must represent the identity of the DATA item, not the component hook instance!"]
        ]
      }
    },
    {
      title: "Concept in Depth: Generating Multiple Related IDs",
      explanation: "You do NOT need to call `useId()` 5 times for 5 related fields in the same component. Call `useId()` ONCE and append suffixes:",
      bullets: [
        "`const id = useId();`",
        "`const firstNameId = id + '-first';`",
        "`const lastNameId = id + '-last';`",
        "`const errorId = id + '-error';`"
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common accessibility mistakes:",
      bullets: [
        "Hardcoding static IDs in reusable components: Writing `<input id='email'>` means if the component is rendered twice on the page, the HTML is invalid.",
        "Using `useId` for database records: `useId` generates React internal token strings (like `:r0:`); it is not for database primary keys.",
        "Using `useId` as CSS class selectors: The colon characters in `:r0:` require CSS escaping. Use standard semantic CSS classes instead."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build a reusable `PasswordInputField` component using `useId`. Connect the `<label>` to the `<input>` via `htmlFor`, and connect an accessible password requirements helper box via `aria-describedby`. Render the component twice on the same screen (for 'Password' and 'Confirm Password') and verify that both inputs have independent, collision-free IDs."
    }
  ],
  questions: [
    {
      id: "q-react-113-1",
      prompt: "What is the primary purpose of the `useId` hook introduced in React 18?",
      options: [
        { id: "a", label: "To generate unique, stable IDs for connecting accessible HTML attributes (like htmlFor and aria-describedby) across client and server" },
        { id: "b", label: "To generate random user passwords" },
        { id: "c", label: "To create database primary keys" },
        { id: "d", label: "To identify users in Google Analytics" }
      ],
      correctAnswer: "a",
      explanation: "`useId` generates unique IDs that are stable across renders and across server/client hydration, primarily for accessibility attributes."
    },
    {
      id: "q-react-113-2",
      prompt: "Can `useId` be used to generate list keys: `<li key={useId()}>`?",
      options: [
        { id: "a", label: "Yes, it is the recommended way to generate keys" },
        { id: "b", label: "STRICTLY NO; list keys must come from the identity of the data item (e.g. `item.id`), not from component hook calls" },
        { id: "c", label: "Only for arrays with fewer than 10 items" },
        { id: "d", label: "Only in test environments" }
      ],
      correctAnswer: "b",
      explanation: "Keys must be tied to the data records themselves so React can match items when data is reordered or filtered. `useId` must never be used as a key."
    },
    {
      id: "q-react-113-3",
      prompt: "What problem occurs when a reusable component has hardcoded IDs (e.g. `<input id='email' />`) and is rendered multiple times on a page?",
      options: [
        { id: "a", label: "Duplicate HTML IDs violate web standards, causing `<label>` clicks to always focus the first input and breaking accessibility" },
        { id: "b", label: "The browser will delete the CSS styling" },
        { id: "c", label: "The page will fail to compile" },
        { id: "d", label: "It causes memory overflows" }
      ],
      correctAnswer: "a",
      explanation: "HTML IDs must be unique across the entire document. Duplicate IDs confuse browsers and screen readers, focusing the wrong input on label click."
    },
    {
      id: "q-react-113-4",
      prompt: "How can you derive multiple related IDs (such as input, hint, and error) using a single `useId()` call?",
      options: [
        { id: "a", label: "By calling `useId()` 5 separate times in a loop" },
        { id: "b", label: "By appending string suffixes to the base ID: `const inputId = id + '-input'; const errorId = id + '-error';`" },
        { id: "c", label: "By multiplying the ID by 2" },
        { id: "d", label: "It is not possible in React" }
      ],
      correctAnswer: "b",
      explanation: "Calling `useId()` once and appending distinct suffixes (`id + '-first'`, `id + '-last'`) is the official, idiomatic pattern."
    },
    {
      id: "q-react-113-5",
      prompt: "What accessibility attribute links an `<input>` to an explanatory description or error message container?",
      options: [
        { id: "a", label: "`aria-describedby='idOfHint'`" },
        { id: "b", label: "`aria-label='hint'`" },
        { id: "c", label: "`htmlFor='hint'`" },
        { id: "d", label: "`title='hint'`" }
      ],
      correctAnswer: "a",
      explanation: "`aria-describedby` points to the ID of an element containing descriptive or error text, enabling screen readers to read it when the input is focused."
    },
    {
      id: "q-react-113-6",
      prompt: "What format do IDs generated by React's `useId()` typically look like?",
      options: [
        { id: "a", label: "Numbers like `1`, `2`, `3`" },
        { id: "b", label: "Tokens enclosed in colons like `:r0:`, `:r1:`" },
        { id: "c", label: "UUIDs with 36 characters" },
        { id: "d", label: "Random dictionary words" }
      ],
      correctAnswer: "b",
      explanation: "React formats `useId` strings with leading and trailing colons (e.g. `:r0:`, `:r1:`) representing the component's position in the Fiber tree."
    },
    {
      id: "q-react-113-7",
      prompt: "Why is `useId` superior to using `Math.random()` to generate input IDs?",
      options: [
        { id: "a", label: "`Math.random()` generates different values on server render and client hydration, causing SSR hydration mismatch errors; `useId()` generates matching IDs" },
        { id: "b", label: "`Math.random()` is not available in web browsers" },
        { id: "c", label: "`useId()` runs 1,000 times faster" },
        { id: "d", label: "`Math.random()` only generates negative numbers" }
      ],
      correctAnswer: "a",
      explanation: "Random IDs differ between the server-rendered HTML and client-side JavaScript, triggering hydration mismatch warnings. `useId` is deterministically stable."
    },
    {
      id: "q-react-113-8",
      prompt: "Which accessibility attribute should be set to `true` on an input when it fails form validation?",
      options: [
        { id: "a", label: "`aria-invalid='true'`" },
        { id: "b", label: "`aria-error='yes'`" },
        { id: "c", label: "`aria-wrong='true'`" },
        { id: "d", label: "`data-invalid='error'`" }
      ],
      correctAnswer: "a",
      explanation: "`aria-invalid={true}` informs assistive technologies that the current field value does not conform to the expected format."
    },
    {
      id: "q-react-113-9",
      prompt: "Can `useId` be used inside a regular JavaScript utility function that is not a component or custom hook?",
      options: [
        { id: "a", label: "Yes, it can be called anywhere in the project" },
        { id: "b", label: "No; like all React hooks, `useId` can only be called inside function components or custom hooks" },
        { id: "c", label: "Only if the file imports React" },
        { id: "d", label: "Only inside package.json" }
      ],
      correctAnswer: "b",
      explanation: "The Rules of Hooks apply to `useId`. It can only be invoked within React components or custom hooks."
    },
    {
      id: "q-react-113-10",
      prompt: "Why should you avoid using `useId()` outputs directly as CSS class selectors?",
      options: [
        { id: "a", label: "Because the colons in `:r0:` have special meaning in CSS (pseudo-classes like `:hover`) and require complex backslash escaping" },
        { id: "b", label: "Because CSS does not allow classes" },
        { id: "c", label: "Because it changes color automatically" },
        { id: "d", label: "Because it slows down GPU rendering" }
      ],
      correctAnswer: "a",
      explanation: "CSS treats colons as pseudo-classes. Selecting `#\\:r0\\:` in CSS requires escaping, so semantic class names should be used for styling instead."
    }
  ]
};

// MODULE 3 QUIZ
const module03Quiz: CurriculumItem = {
  id: "item-react-mod03-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "Module 3 Assessment: Hooks and Lifecycle MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 7,
  isModuleQuiz: true,
  contentHeading: "Module 3 Quiz: Advanced React Hooks & Architecture",
  contentDescription: "Evaluate your comprehensive mastery of React Hooks: useEffect dependency arrays, cleanup functions, AbortController, useRef DOM access vs mutable timers, Context API, useReducer, custom hooks, and useId accessibility.",
  questions: [
    ...(lesson108.questions || []).slice(0, 2),
    ...(lesson109.questions || []).slice(0, 2),
    ...(lesson110.questions || []).slice(0, 2),
    ...(lesson111.questions || []).slice(0, 2),
    ...(lesson112.questions || []).slice(0, 1),
    ...(lesson113.questions || []).slice(0, 1)
  ]
};

// MODULE 3 ASSESSMENT (LAB)
const module03Assessment: CurriculumItem = {
  id: "item-react-mod03-lab",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-03-hooks-lifecycle",
  moduleTitle: "Module 3: Hooks and Lifecycle",
  modulePosition: 3,
  title: "Module 3 Lab: Custom Hook & Context Data Hub",
  duration: "50 mins",
  type: "assignment",
  position: 8,
  isModuleAssessment: true,
  contentHeading: "Module 3 Lab Project: Custom Hook & Context Data Hub",
  contentDescription: "Architect a centralized course enrollment and preferences hub using a custom `useLocalStorage` hook, React Context, pure reducers, and accessible form controls with `useId`.",
  assignmentPrompt: {
    instructions: "Build an enterprise React state and synchronization architecture:\n1. Custom Hook: Create a `useDebounce(value, delay)` hook that delays query changes.\n2. Context & Reducer: Build an `EnrollmentContext` powered by `useReducer` to manage enrolled courses, bookmarks, and status messages.\n3. Safe Data Fetching: Build a course search component that fetches from a simulated API, using `AbortController` in `useEffect` to abort stale requests.\n4. Accessible Fields: Build reusable form fields with `useId` connecting labels, hints, and error alerts.\n5. DOM Ref: Add an automatic search input focus on page load using `useRef`.",
    deliverables: [
      "Modular custom hooks with thorough dependency management",
      "Context provider wrapping the application with clean custom consumption hooks",
      "Robust data-fetching with loading, empty, and error state handling"
    ]
  }
};

export const reactModule03: CurriculumSubModule = {
  id: "module-react-03-hooks-lifecycle",
  subCourseId: "mod-react-essentials",
  title: "Module 3 — Hooks and Lifecycle",
  description: "Master React Hooks lifecycle, external system synchronization with useEffect, AbortController race condition cleanup, DOM manipulation with useRef, Context API, useReducer, and accessible IDs with useId.",
  position: 3,
  items: [
    lesson108,
    lesson109,
    lesson110,
    lesson111,
    lesson112,
    lesson113,
    module03Quiz,
    module03Assessment
  ]
};
