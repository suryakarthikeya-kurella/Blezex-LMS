import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 2: STATE AND INTERACTION
// Lessons 104 - 107 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 104: EVENTS AND STATE WITH USESTATE
const lesson104: CurriculumItem = {
  id: "item-react-104-events-state-usestate",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-interaction",
  moduleTitle: "Module 2: State and Interaction",
  modulePosition: 2,
  title: "Events and State with useState",
  duration: "35 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Events and State with useState",
  contentDescription: "Understand SyntheticEvent dispatching, the useState hook, state batching, asynchronous updater mechanics, and functional updater closures for reliable state updates.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useState } from 'react';

function Counter() {
  // 1. Declare state variable and setter with useState
  const [count, setCount] = useState(0);

  // 2. Functional updater pattern: guarantees correct previous state
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter-card">
      <h3>Enrollment Tally: {count}</h3>
      <div className="btn-group">
        {/* Pass function reference, NOT function invocation! */}
        <button onClick={handleIncrement} className="btn-primary">
          Increment (+1)
        </button>
        <button onClick={handleReset} className="btn-secondary">
          Reset (0)
        </button>
      </div>
    </div>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: A Classroom Scoreboard",
      explanation: "Imagine a scorekeeper standing in front of a giant digital scoreboard in a sports arena. Normal local variables in a JavaScript function (`let count = 0`) are like writing the score on a piece of paper that gets thrown in the trash can every time a play finishes—the next play, the function runs from scratch and the score is back to 0! But `useState` gives you the permanent digital scoreboard mounted on the arena wall. When you push the button to change the score, React remembers the score across every quarter (re-render) and lights up the new digits for the whole stadium to see!",
      bullets: [
        "State vs Local Variable: Local variables disappear when a function finishes; state persists across re-renders.",
        "Setter schedules a re-render: Calling `setCount(5)` tells React: 'Please recalculate the UI blueprint with count = 5'.",
        "Synthetic Events: React wraps native browser events in cross-browser `SyntheticEvent` objects for consistent behavior."
      ]
    },
    {
      title: "The Mechanism of `useState` & The Snapshot Rule",
      explanation: "Calling a state setter does NOT immediately mutate the variable in the currently executing closure. State in React acts like a fixed snapshot for that specific render:",
      table: {
        headers: ["Code", "What Beginners Think Happens", "What ACTUALLY Happens in React"],
        rows: [
          ["`setCount(count + 1); console.log(count);`", "Logs the incremented value (e.g. 1)", "Logs the old value (0) because `count` in the current function closure is unchanged until the next render"],
          ["`setCount(count + 1); setCount(count + 1);`", "Increments by +2", "Increments by +1! Both calls read the same snapshot `count = 0`"],
          ["`setCount(c => c + 1); setCount(c => c + 1);`", "Increments by +2", "Correctly increments by +2 because each functional updater receives the fresh pending state in the queue"]
        ]
      }
    },
    {
      title: "Concept in Depth: Passing Handlers vs Invoking Handlers",
      explanation: "A classic mistake is invoking the event handler immediately instead of passing a function reference:",
      bullets: [
        "WRONG: `<button onClick={handleClick()}>` — This calls `handleClick()` immediately during rendering, causing an infinite re-render loop if it sets state!",
        "CORRECT: `<button onClick={handleClick}>` — Passes a reference to the function; React invokes it only when clicked.",
        "PASSING ARGUMENTS: `<button onClick={() => handleDelete(item.id)}>` — Wraps the call in an arrow function so it runs only on click."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common state bugs:",
      bullets: [
        "Direct State Mutation: Writing `count = count + 1` does NOT trigger a re-render. Always call the setter `setCount(...)`.",
        "Stale Closures: Using `setCount(count + 1)` multiple times in the same handler. Always use functional updates `setCount(prev => prev + 1)` when next state depends on current state.",
        "Calling Hooks Conditionally: Never put `useState` inside an `if` block or loop. Hooks must always execute in the exact same order on every render."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build an interactive `VoteCounter` with Upvote and Downvote buttons. Ensure the vote tally cannot drop below zero. Implement an 'Undo' button that reverts to the previous count, and log state changes to confirm that updates are batched."
    }
  ],
  questions: [
    {
      id: "q-react-104-1",
      prompt: "What does calling a state setter function (e.g., `setCount(5)`) do in React?",
      options: [
        { id: "a", label: "It immediately mutates the variable in the current line of code" },
        { id: "b", label: "It schedules a re-render with the new state value" },
        { id: "c", label: "It reloads the browser tab" },
        { id: "d", label: "It clears all variables from memory" }
      ],
      correctAnswer: "b",
      explanation: "State setters do not immediately overwrite the variable in the current closure; they tell React to schedule a re-render with the requested value."
    },
    {
      id: "q-react-104-2",
      prompt: "Why does `console.log(count)` show the old value immediately after calling `setCount(count + 1)`?",
      options: [
        { id: "a", label: "Because React has a bug" },
        { id: "b", label: "Because state updates are asynchronous and state acts as a snapshot for the current render closure" },
        { id: "c", label: "Because JavaScript console is always delayed" },
        { id: "d", label: "Because setCount only works on mobile devices" }
      ],
      correctAnswer: "b",
      explanation: "A component render is a snapshot of state in time. Within the current event handler, `count` remains the value it had when the component was rendered."
    },
    {
      id: "q-react-104-3",
      prompt: "When should you use the functional updater form: `setCount(prev => prev + 1)`?",
      options: [
        { id: "a", label: "Only when dealing with strings" },
        { id: "b", label: "Whenever the next state depends on the previous state, preventing stale value bugs in asynchronous updates" },
        { id: "c", label: "Only in class components" },
        { id: "d", label: "Never; it is considered deprecated" }
      ],
      correctAnswer: "b",
      explanation: "The functional updater `setVal(prev => ...)` guarantees that React passes the latest pending state from the update queue."
    },
    {
      id: "q-react-104-4",
      prompt: "What happens if you write `<button onClick={setCount(1)}>Click</button>`?",
      options: [
        { id: "a", label: "The button works normally when clicked" },
        { id: "b", label: "`setCount(1)` executes immediately upon render, setting state and causing an infinite re-render crash ('Too many re-renders')" },
        { id: "c", label: "The button turns invisible" },
        { id: "d", label: "React disables the mouse cursor" }
      ],
      correctAnswer: "b",
      explanation: "Parentheses `()` immediately execute the function during render. You must pass a function reference: `onClick={() => setCount(1)}`."
    },
    {
      id: "q-react-104-5",
      prompt: "What is React's SyntheticEvent?",
      options: [
        { id: "a", label: "A fake event generated by automated robots" },
        { id: "b", label: "A cross-browser wrapper around the browser's native event that standardizes event behavior across Chrome, Safari, and Firefox" },
        { id: "c", label: "A CSS animation trigger" },
        { id: "d", label: "An error thrown by the Vite server" }
      ],
      correctAnswer: "b",
      explanation: "React wraps native browser events in `SyntheticEvent` instances to ensure uniform properties and methods across all browsers."
    },
    {
      id: "q-react-104-6",
      prompt: "What are the two items returned in the array by `useState(initialValue)`?",
      options: [
        { id: "a", label: "The component name and its CSS style" },
        { id: "b", label: "The current state value and a setter function to update it" },
        { id: "c", label: "A promise and a resolve function" },
        { id: "d", label: "The HTML container and its ID" }
      ],
      correctAnswer: "b",
      explanation: "`const [state, setState] = useState(initial)` returns a tuple containing the current state value and its corresponding updater function."
    },
    {
      id: "q-react-104-7",
      prompt: "Why can't you call `useState` inside an `if` statement or loop?",
      options: [
        { id: "a", label: "Because React relies on the exact call order of Hooks between renders to match state with the correct variable" },
        { id: "b", label: "Because if statements are not allowed in React" },
        { id: "c", label: "Because the compiler will delete the file" },
        { id: "d", label: "Because state can only be defined in HTML" }
      ],
      correctAnswer: "a",
      explanation: "The Rules of Hooks require that Hooks be called at the top level so that React can track internal state slots by their execution order."
    },
    {
      id: "q-react-104-8",
      prompt: "What is 'automatic batching' in React 18+?",
      options: [
        { id: "a", label: "Compressing images before uploading" },
        { id: "b", label: "Grouping multiple state updates (even inside timeouts or promises) into a single re-render to optimize performance" },
        { id: "c", label: "Automatically creating backups on GitHub" },
        { id: "d", label: "Deleting inactive user accounts" }
      ],
      correctAnswer: "b",
      explanation: "React 18 batches multiple state updates into a single re-render pass, even across promises, timeouts, and native event handlers."
    },
    {
      id: "q-react-104-9",
      prompt: "How do you pass an argument (like an item ID) to a click handler function in JSX?",
      options: [
        { id: "a", label: "`onClick={deleteItem(item.id)}`" },
        { id: "b", label: "`onClick={() => deleteItem(item.id)}`" },
        { id: "c", label: "`onClick=deleteItem:item.id`" },
        { id: "d", label: "`onClick={item.id.deleteItem}`" }
      ],
      correctAnswer: "b",
      explanation: "Using an inline arrow function `() => deleteItem(item.id)` passes a function that React will call only when the user clicks the element."
    },
    {
      id: "q-react-104-10",
      prompt: "What happens if you update state with the exact same primitive value as current state (e.g. `setCount(5)` when count is already 5)?",
      options: [
        { id: "a", label: "React throws a warning in the console" },
        { id: "b", label: "React bails out using Object.is comparison and skips re-rendering the component and its children" },
        { id: "c", label: "The component renders 10 times" },
        { id: "d", label: "The browser reloads" }
      ],
      correctAnswer: "b",
      explanation: "If you update state to the same value as the current state (compared with `Object.is`), React optimizes by bailing out without re-rendering."
    }
  ]
};

// LESSON 105: STATE, PROPS AND LIFTING STATE
const lesson105: CurriculumItem = {
  id: "item-react-105-lifting-state",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-interaction",
  moduleTitle: "Module 2: State and Interaction",
  modulePosition: 2,
  title: "State, Props and Lifting State",
  duration: "35 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "State, Props and Lifting State",
  contentDescription: "Understand the single source of truth principle, distinguishing state from derived values, lifting state up to the nearest common parent, and passing data down via props and events up via callbacks.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useState } from 'react';

// Common Parent Component holds the Single Source of Truth
function SearchableCourseManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const allCourses = ['React Essentials', 'Node & Express API', 'PostgreSQL DB', 'Git Collaboration'];

  // Derived Value: Computed during render; DO NOT store in separate state!
  const filteredCourses = allCourses.filter(course =>
    course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manager-shell">
      {/* 1. Pass state and updater callback down to SearchInput */}
      <SearchInput query={searchQuery} onQueryChange={setSearchQuery} />

      {/* 2. Pass derived count down to ResultCounter */}
      <ResultCounter count={filteredCourses.length} />

      {/* 3. Pass filtered list down to CourseList */}
      <CourseList items={filteredCourses} />
    </div>
  );
}

// Child 1: Controlled Input
function SearchInput({ query, onQueryChange }) {
  return (
    <input
      type="text"
      placeholder="Search sub-courses…"
      value={query}
      onChange={e => onQueryChange(e.target.value)}
      className="search-box"
    />
  );
}

// Child 2: Pure Display
function ResultCounter({ count }) {
  return <p className="badge-count">Found {count} matching courses</p>;
}

// Child 3: List Display
function CourseList({ items }) {
  if (items.length === 0) return <p>No matching courses.</p>;
  return <ul>{items.map(it => <li key={it}>{it}</li>)}</ul>;
}`
  },
  sections: [
    {
      title: "Core Concept: The Classroom Projector",
      explanation: "Imagine two students sitting at opposite ends of a classroom. Student A is typing a search query, and Student B wants to see how many results match. Student A cannot whisper directly across the room to Student B—that causes chaos and confusion. Instead, Student A hands their query to the Professor at the front of the classroom (the Parent Component). The Professor projects the query onto the main whiteboard. Now both Student A and Student B (and everyone else) see the exact same synchronized information! That is 'Lifting State Up'.",
      bullets: [
        "Single Source of Truth: When two or more components need to share the same data, find their closest common parent.",
        "Move state to parent: The parent owns the state and provides updater callbacks to children.",
        "Derive values during render: Don't store `filteredCourses` or `itemCount` in duplicate state variables."
      ]
    },
    {
      title: "The Golden Rule of Derived State",
      explanation: "Before creating a new state variable with `useState`, ask yourself three questions:",
      table: {
        headers: ["Question", "If YES...", "If NO..."],
        rows: [
          ["1. Is it passed in from a parent via props?", "It is NOT state! Use props directly.", "Proceed to question 2."],
          ["2. Does it remain unchanged over time?", "It is NOT state! Use a regular constant.", "Proceed to question 3."],
          ["3. Can you compute it from existing state or props?", "It is NOT state! Calculate it during render (`derived value`).", "It is TRUE STATE! Declare it with `useState`."]
        ]
      }
    },
    {
      title: "Concept in Depth: Callback Functions as Upward Communicators",
      explanation: "While props only travel DOWN from parent to child, children can communicate UPWARDS by executing callback functions passed to them by the parent:",
      bullets: [
        "Parent declares: `const [activeId, setActiveId] = useState(null);`",
        "Parent passes: `<Child onSelect={setActiveId} />`",
        "Child triggers: `<button onClick={() => onSelect(item.id)}>Select</button>`",
        "Result: Parent updates state, triggering a coordinated re-render of all related children."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common state synchronization errors:",
      bullets: [
        "Duplicate State: Storing both `items` and `itemCount` in state. If you forget to update `itemCount` when adding an item, they desynchronize! Just use `items.length` directly during render.",
        "Mirroring Props in State: Writing `const [name, setName] = useState(props.initialName)`. If `props.initialName` changes later, the local state will NOT update automatically unless synced.",
        "Lifting State Too High: Moving local state (like an open dropdown tooltip) to the root `App` component unnecessarily, causing the entire app to re-render on hover."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a parent `TemperatureConverter` with two child components: `CelsiusInput` and `FahrenheitInput`. When the user types in either input, both inputs must instantly synchronize and reflect the converted temperature. Compute the conversion as derived data during render."
    }
  ],
  questions: [
    {
      id: "q-react-105-1",
      prompt: "What does 'lifting state up' mean in React?",
      options: [
        { id: "a", label: "Uploading local variables to a cloud server" },
        { id: "b", label: "Moving a piece of state up to the nearest common parent component so multiple children can share and synchronize it" },
        { id: "c", label: "Converting a functional component into a class component" },
        { id: "d", label: "Increasing the z-index CSS property" }
      ],
      correctAnswer: "b",
      explanation: "Lifting state up means moving state to the closest common ancestor of the components that need it, preserving a single source of truth."
    },
    {
      id: "q-react-105-2",
      prompt: "What is a 'derived value' in React?",
      options: [
        { id: "a", label: "A variable calculated on the fly during render from existing state or props without using an extra useState hook" },
        { id: "b", label: "A value downloaded from a third-party website" },
        { id: "c", label: "A CSS animation keyframe" },
        { id: "d", label: "A deleted state variable" }
      ],
      correctAnswer: "a",
      explanation: "Derived values (e.g. `const total = items.reduce(...)`) are computed directly during render, preventing redundant state and synchronization bugs."
    },
    {
      id: "q-react-105-3",
      prompt: "Why is storing `filteredList` in separate state alongside `allList` and `searchQuery` an anti-pattern?",
      options: [
        { id: "a", label: "Because React limits apps to only one useState hook per component" },
        { id: "b", label: "Because duplicate state creates synchronization bugs; if `allList` updates, `filteredList` becomes stale unless manually kept in sync" },
        { id: "c", label: "Because arrays cannot be stored in useState" },
        { id: "d", label: "Because it makes the bundle file size 50 times larger" }
      ],
      correctAnswer: "b",
      explanation: "Keeping redundant state requires manual synchronization. Instead, compute `filteredList` directly during render: `allList.filter(...)`."
    },
    {
      id: "q-react-105-4",
      prompt: "How does a child component send data or notify changes to its parent component?",
      options: [
        { id: "a", label: "By calling `parent.setState()` directly" },
        { id: "b", label: "By invoking a callback function passed down to it from the parent as a prop" },
        { id: "c", label: "By dispatching an alert popup" },
        { id: "d", label: "By reloading the browser window" }
      ],
      correctAnswer: "b",
      explanation: "Parents pass callback functions (e.g., `onChange={handleChange}`) down as props, which children invoke with their new values."
    },
    {
      id: "q-react-105-5",
      prompt: "What is the 'Single Source of Truth' principle in React UI architecture?",
      options: [
        { id: "a", label: "Every component must have its own private copy of every piece of data" },
        { id: "b", label: "For any piece of changing data in the application, there should be only one component that owns and manages it" },
        { id: "c", label: "All data must be stored in cookies" },
        { id: "d", label: "Only one developer is allowed to edit code at a time" }
      ],
      correctAnswer: "b",
      explanation: "The Single Source of Truth principle dictates that one component owns the state, while others consume it as read-only props, preventing desync."
    },
    {
      id: "q-react-105-6",
      prompt: "If only ONE child component needs a piece of state and no siblings care about it, where should that state live?",
      options: [
        { id: "a", label: "In the global root App component" },
        { id: "b", label: "Locally inside that specific child component" },
        { id: "c", label: "In a global SQL database" },
        { id: "d", label: "In the browser's localStorage" }
      ],
      correctAnswer: "b",
      explanation: "Keep state as local as possible. Only lift state up when multiple components need to share or coordinate with it."
    },
    {
      id: "q-react-105-7",
      prompt: "What happens if a parent component re-renders due to a state change?",
      options: [
        { id: "a", label: "Only the parent re-renders; child components are never re-evaluated" },
        { id: "b", label: "By default, all child components in the parent's subtree also re-render" },
        { id: "c", label: "The browser tab refreshes" },
        { id: "d", label: "All CSS files are re-downloaded" }
      ],
      correctAnswer: "b",
      explanation: "In React's default render cycle, when a parent re-renders, React recursively re-renders all child components in that subtree."
    },
    {
      id: "q-react-105-8",
      prompt: "Which of the following is the best way to represent whether a user is an adult?",
      options: [
        { id: "a", label: "`const [isAdult, setIsAdult] = useState(age >= 18);` with separate updater" },
        { id: "b", label: "Derive it during render: `const isAdult = age >= 18;`" },
        { id: "c", label: "Store it in a cookie on every keystroke" },
        { id: "d", label: "Use a global window variable" }
      ],
      correctAnswer: "b",
      explanation: "`isAdult` is completely derivable from `age`. Computing `const isAdult = age >= 18;` during render eliminates redundant state."
    },
    {
      id: "q-react-105-9",
      prompt: "What is an anti-pattern known as 'mirroring props in state'?",
      options: [
        { id: "a", label: "Displaying props on screen" },
        { id: "b", label: "Copying a prop into local state (`useState(props.val)`) when you expect the state to always reflect changes in that prop" },
        { id: "c", label: "Passing numbers as props" },
        { id: "d", label: "Using props inside a return statement" }
      ],
      correctAnswer: "b",
      explanation: "Initializing state from props (`useState(props.val)`) only runs on initial mount. Subsequent prop updates will NOT update the state unless explicitly coded."
    },
    {
      id: "q-react-105-10",
      prompt: "How can you pass multiple related handler callbacks cleanly to a child component?",
      options: [
        { id: "a", label: "Pack them as named prop functions (e.g. `onEdit={handleEdit}` `onDelete={handleDelete}`)" },
        { id: "b", label: "Write them directly into the HTML `<title>` tag" },
        { id: "c", label: "Put them in a global JSON file" },
        { id: "d", label: "Pass them via Bluetooth" }
      ],
      correctAnswer: "a",
      explanation: "Passing named callback props (`onEdit`, `onDelete`, `onToggle`) makes component interfaces explicit, testable, and self-documenting."
    }
  ]
};

// LESSON 106: FORMS AND CONTROLLED COMPONENTS
const lesson106: CurriculumItem = {
  id: "item-react-106-forms-controlled-components",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-interaction",
  moduleTitle: "Module 2: State and Interaction",
  modulePosition: 2,
  title: "Forms and Controlled Components",
  duration: "35 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Forms and Controlled Components",
  contentDescription: "Master controlled form inputs (input, textarea, select, checkbox), handling e.preventDefault() on submit, client-side validation, accessible form labels, and multi-field state management.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useState } from 'react';

function StudentRegistrationForm() {
  // Single state object managing multiple form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    track: 'react',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generic change handler for all input types
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    // 1. Mandatory: Stop native browser page refresh!
    e.preventDefault();

    // 2. Validate form fields
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must accept the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    console.log('Submitted payload:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Enroll in BlezeX Full Stack</h2>

      {/* Controlled Text Input */}
      <div className="field">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="err-msg">{errors.fullName}</span>}
      </div>

      {/* Controlled Select Dropdown */}
      <div className="field">
        <label htmlFor="track">Learning Track</label>
        <select id="track" name="track" value={formData.track} onChange={handleChange}>
          <option value="react">React Frontend</option>
          <option value="node">Node.js Backend</option>
          <option value="fullstack">Full-Stack Accelerator</option>
        </select>
      </div>

      {/* Controlled Checkbox */}
      <div className="field-checkbox">
        <input
          id="agreedToTerms"
          name="agreedToTerms"
          type="checkbox"
          checked={formData.agreedToTerms}
          onChange={handleChange}
        />
        <label htmlFor="agreedToTerms">I agree to terms & conditions</label>
        {errors.agreedToTerms && <span className="err-msg">{errors.agreedToTerms}</span>}
      </div>

      <button type="submit" className="btn-submit">Complete Registration</button>
      {isSubmitted && <p className="success-msg">Registration Successful!</p>}
    </form>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: The Puppet on Strings",
      explanation: "In standard HTML forms, an `<input>` is an independent wild animal: it keeps its own secret memory of what the user types. If you want to check what is typed, you have to inspect the DOM node manually. But in a React 'Controlled Component', the input is a puppet on strings! React holds the strings: the input displays strictly what React state tells it to display via `value={state}`, and when the user presses a key, the input tells React via `onChange={e => setState(e.target.value)}`. React updates state, and the puppet moves its hands. React is in total control 100% of the time!",
      bullets: [
        "Controlled Component: An input element whose value is driven by React state.",
        "`e.preventDefault()`: Prevents the traditional browser behavior of reloading the page and submitting a GET/POST request.",
        "Instant Validation: Because React knows the value on every single keystroke, you can disable submit buttons, show password strength meters, or format credit card numbers live."
      ]
    },
    {
      title: "Controlled vs Uncontrolled Components",
      explanation: "Understanding the distinction between controlled inputs and uncontrolled DOM refs:",
      table: {
        headers: ["Feature", "Controlled Component (Recommended)", "Uncontrolled Component (useRef)"],
        rows: [
          ["Source of Truth", "React component state (`useState`)", "Internal browser DOM element node"],
          ["Value Binding", "`value={state}` and `onChange={handler}`", "`defaultValue='...'` and `ref={inputRef}`"],
          ["Real-Time Validation", "Trivial; value is available on every keystroke", "Difficult; requires manual event listeners"],
          ["Best For", "99% of UI forms, inputs, selects, toggles", "File inputs (`<input type='file'>`) or 3rd party non-React libraries"]
        ]
      }
    },
    {
      title: "Concept in Depth: Generic Multi-Field Form Handler",
      explanation: "Rather than writing 10 separate `const [email, setEmail] = useState('')` hooks, use a single state object with a dynamic computed property name:",
      bullets: [
        "`[name]: type === 'checkbox' ? checked : value`: Uses ES6 computed property keys `[e.target.name]` to dynamically update the matching field in state.",
        "Spread Operator: `...prev` preserves all other fields while overriding only the active field.",
        "Preserve User Data: When validation fails, controlled inputs retain what the user already typed, preventing frustrating data loss."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Watch out for these common form errors:",
      bullets: [
        "Forgetting `e.preventDefault()`: Clicking submit causes the entire browser tab to reload and wipe all form data.",
        "Switching from Uncontrolled to Controlled: If `value={formData.title}` is `undefined` on initial render and later becomes a string, React throws a warning. Always initialize state with empty strings `''`, never `undefined`.",
        "Missing `name` attribute: The generic handler relies on `e.target.name` matching the key in your state object.",
        "Relying Solely on Client Validation: Client validation is for user experience; server-side validation is MANDATORY for security."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build a `CourseFeedbackForm` with controlled fields for `studentName`, `rating` (1 to 5), `comments`, and `recommend` (checkbox). Validate that comments have at least 15 characters, display field-specific error messages below each input, and prevent submission if any field is invalid."
    }
  ],
  questions: [
    {
      id: "q-react-106-1",
      prompt: "What makes an input element a 'controlled component' in React?",
      options: [
        { id: "a", label: "It is controlled by the user's keyboard hardware directly" },
        { id: "b", label: "Its current value is bound to React state via `value` and updated via `onChange`" },
        { id: "c", label: "It has a CSS `position: absolute` styling rule" },
        { id: "d", label: "It can only accept numeric input" }
      ],
      correctAnswer: "b",
      explanation: "In a controlled component, React state serves as the single source of truth for the input's current value via `value={state}` and `onChange`."
    },
    {
      id: "q-react-106-2",
      prompt: "What is the purpose of `e.preventDefault()` in a form's `onSubmit` handler?",
      options: [
        { id: "a", label: "It stops JavaScript from executing" },
        { id: "b", label: "It prevents the browser's default behavior of reloading the entire web page upon form submission" },
        { id: "c", label: "It automatically saves the form to Google Drive" },
        { id: "d", label: "It deletes the input fields" }
      ],
      correctAnswer: "b",
      explanation: "HTML forms refresh the entire page upon submission by default. In a single-page React app, `e.preventDefault()` prevents this refresh."
    },
    {
      id: "q-react-106-3",
      prompt: "Why does React warn: 'A component is changing an uncontrolled input to be controlled'?",
      options: [
        { id: "a", label: "Because the input's initial value was `undefined` or `null`, and later changed to a defined string" },
        { id: "b", label: "Because the user typed too quickly" },
        { id: "c", label: "Because the form had more than 3 inputs" },
        { id: "d", label: "Because the submit button had no icon" }
      ],
      correctAnswer: "a",
      explanation: "An input with `value={undefined}` is treated by React as uncontrolled. If state later becomes a string, it switches to controlled, prompting a warning. Always initialize state to `''`."
    },
    {
      id: "q-react-106-4",
      prompt: "How do you read whether a checkbox is checked inside an `onChange` event handler?",
      options: [
        { id: "a", label: "`e.target.value`" },
        { id: "b", label: "`e.target.checked`" },
        { id: "c", label: "`e.target.selected`" },
        { id: "d", label: "`e.target.boxState`" }
      ],
      correctAnswer: "b",
      explanation: "For checkboxes, HTML DOM elements expose the boolean state via `e.target.checked` rather than `e.target.value`."
    },
    {
      id: "q-react-106-5",
      prompt: "What JavaScript ES6 syntax allows a single handler to update multiple fields in an object state: `setForm({ ...prev, [name]: value })`?",
      options: [
        { id: "a", label: "Computed property names" },
        { id: "b", label: "Regular expressions" },
        { id: "c", label: "Bitwise shift operators" },
        { id: "d", label: "Generator functions" }
      ],
      correctAnswer: "a",
      explanation: "Computed property names (`[name]: value`) dynamically use the value of the `name` variable as the object key."
    },
    {
      id: "q-react-106-6",
      prompt: "Why must form labels be linked to inputs using `htmlFor` and matching `id` attributes?",
      options: [
        { id: "a", label: "To make the text bold in CSS" },
        { id: "b", label: "For accessibility: screen readers can announce the input's purpose and clicking the label focuses the input" },
        { id: "c", label: "Because Vite requires it for compilation" },
        { id: "d", label: "It is required for JavaScript to run" }
      ],
      correctAnswer: "b",
      explanation: "Linking labels to inputs via `htmlFor='fieldId'` is an essential web accessibility (a11y) standard, enhancing keyboard navigation and screen-reader usability."
    },
    {
      id: "q-react-106-7",
      prompt: "Even with thorough client-side form validation in React, why is server-side validation still mandatory?",
      options: [
        { id: "a", label: "Because React only works in development mode" },
        { id: "b", label: "Because malicious actors can bypass client-side code and send raw HTTP requests directly to the API endpoint (e.g. using curl or Postman)" },
        { id: "c", label: "Because browsers automatically disable JavaScript on forms" },
        { id: "d", label: "Server validation is actually optional and never needed" }
      ],
      correctAnswer: "b",
      explanation: "Client-side validation is purely for user experience. An attacker can easily send HTTP POST requests directly to your backend, making server-side validation mandatory."
    },
    {
      id: "q-react-106-8",
      prompt: "Which input type in HTML is ALWAYS an uncontrolled component in React due to browser security restrictions?",
      options: [
        { id: "a", label: "`<input type='text' />`" },
        { id: "b", label: "`<input type='file' />`" },
        { id: "c", label: "`<input type='password' />`" },
        { id: "d", label: "`<input type='checkbox' />`" }
      ],
      correctAnswer: "b",
      explanation: "File inputs are read-only for security reasons (JavaScript cannot arbitrarily programmatically set file paths). They must be accessed via `useRef()`."
    },
    {
      id: "q-react-106-9",
      prompt: "What is the best way to disable the form submit button while an async submission is in flight?",
      options: [
        { id: "a", label: "Delete the button from the DOM" },
        { id: "b", label: "Set `disabled={isSubmitting}` on the button and display a loading indicator" },
        { id: "c", label: "Show an alert dialog" },
        { id: "d", label: "Disconnect the user's internet" }
      ],
      correctAnswer: "b",
      explanation: "Setting `disabled={isSubmitting}` prevents accidental double-clicks and communicates clear feedback to the user."
    },
    {
      id: "q-react-106-10",
      prompt: "How does a controlled `<textarea>` differ in React compared to traditional HTML?",
      options: [
        { id: "a", label: "React uses `value={text}` attribute rather than putting text between `<textarea>...</textarea>` tags" },
        { id: "b", label: "React does not support `<textarea>`" },
        { id: "c", label: "In React, `<textarea>` can only display one line" },
        { id: "d", label: "It cannot have CSS styling" }
      ],
      correctAnswer: "a",
      explanation: "React standardizes `<textarea>` to use the `value` prop and `onChange` handler, just like a single-line `<input>`."
    }
  ]
};

// LESSON 107: STATE UPDATES AND IMMUTABILITY
const lesson107: CurriculumItem = {
  id: "item-react-107-state-immutability",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-interaction",
  moduleTitle: "Module 2: State and Interaction",
  modulePosition: 2,
  title: "State Updates and Immutability",
  duration: "35 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "State Updates and Immutability",
  contentDescription: "Master immutable state operations in React: creating shallow copies with object spread (...), updating arrays with map, deleting with filter, adding with concat/spread, and updating nested object structures.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React Foundations', completed: true },
    { id: 2, title: 'Master State Immutability', completed: false }
  ]);

  // 1. IMMUTABLE ADD: Spread into new array (NEVER push!)
  const addTask = (newTitle) => {
    const newTask = { id: Date.now(), title: newTitle, completed: false };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // 2. IMMUTABLE TOGGLE: Map over array and return new object for matched item
  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3. IMMUTABLE DELETE: Filter out matched item (NEVER splice!)
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-manager">
      <h3>Active Tasks ({tasks.length})</h3>
      <ul>
        {tasks.map(t => (
          <li key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
            <span>{t.title}</span>
            <button onClick={() => toggleTask(t.id)}>Toggle</button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Photo Album vs Vandalizing a Painting",
      explanation: "Imagine you own an art gallery. If an artist wants to show a painting during the morning, afternoon, and night, they don't paint over the canvas directly with black ink and destroy the original painting (mutation). Instead, they take a photo of the morning canvas, make a brand-new copy for the afternoon, and another new copy for the night. That way, if anyone wants to compare the morning version to the afternoon version, both paintings exist side-by-side in perfect condition! In React, 'Immutability' means you NEVER mutate an existing object or array in place—you always create a fresh copy with your desired changes.",
      bullets: [
        "Shallow Equality Check: React compares previous state to next state using `Object.is(oldState, newState)`.",
        "Why Mutation Fails: If you write `tasks.push(newItem)` and call `setTasks(tasks)`, the memory reference pointer of `tasks` hasn't changed! React thinks nothing happened and refuses to re-render!",
        "Predictable History: Immutability enables undo/redo, time-travel debugging, and fast component memoization."
      ]
    },
    {
      title: "The Immutable Operations Cheat Sheet",
      explanation: "Memorize these standard immutable JavaScript patterns:",
      table: {
        headers: ["Operation", "MUTABLE Anti-Pattern (DO NOT USE!)", "IMMUTABLE Pattern (DO THIS!)"],
        rows: [
          ["Add to Array", "`tasks.push(item)`", "`[...tasks, item]`"],
          ["Prepend to Array", "`tasks.unshift(item)`", "`[item, ...tasks]`"],
          ["Delete from Array", "`tasks.splice(index, 1)`", "`tasks.filter(t => t.id !== id)`"],
          ["Update Item in Array", "`tasks[index].done = true`", "`tasks.map(t => t.id === id ? { ...t, done: true } : t)`"],
          ["Update Object Property", "`user.name = 'Hari'`", "`{ ...user, name: 'Hari' }`"]
        ]
      }
    },
    {
      title: "Concept in Depth: Nested State Updates",
      explanation: "In JavaScript, the spread operator `{ ...object }` is a *shallow* copy. If your state has nested objects or arrays, copying the outer object does NOT copy the inner objects:",
      bullets: [
        "Shallow Copy Hazard: `const copy = { ...user }; copy.profile.bio = 'New';` still mutates the original `profile` object in memory!",
        "Deep Immutable Copy: `setUser(prev => ({ ...prev, profile: { ...prev.profile, bio: 'New' } }))` — you must copy every changed level.",
        "State Normalization: To avoid deeply nested spread hell, normalize your state like a database (store items by ID in a flat object)."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Deadly state mutation traps:",
      bullets: [
        "Array `.sort()` and `.reverse()`: These native methods mutate the array in place! Always clone first: `[...items].sort((a, b) => ...)`.",
        "Passing Mutated State to Setter: Writing `const arr = list; arr.push(1); setList(arr);` causes React to skip re-rendering.",
        "Overcomplicating State: Nesting objects 5 levels deep. Keep state as flat as possible."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a shopping cart state that holds items with `id`, `name`, `price`, and `quantity`. Implement functions for: 1) Adding a new product, 2) Incrementing quantity of an existing item immutably, 3) Decrementing quantity (and removing the item if quantity reaches 0), and 4) Clearing the cart."
    }
  ],
  questions: [
    {
      id: "q-react-107-1",
      prompt: "What happens if you mutate state directly (e.g., `todos.push(newTodo); setTodos(todos);`)?",
      options: [
        { id: "a", label: "React re-renders twice as fast" },
        { id: "b", label: "React compares object references (`Object.is`), sees the same array pointer in memory, and skips re-rendering entirely" },
        { id: "c", label: "The browser throws a syntax error" },
        { id: "d", label: "The operating system crashes" }
      ],
      correctAnswer: "b",
      explanation: "React performs reference equality checks. Because `todos` is the exact same object reference in memory, React concludes nothing changed and will not re-render."
    },
    {
      id: "q-react-107-2",
      prompt: "Which array method should you use to immutably delete an item from an array in React state?",
      options: [
        { id: "a", label: "Array.prototype.splice()" },
        { id: "b", label: "Array.prototype.filter()" },
        { id: "c", label: "Array.prototype.pop()" },
        { id: "d", label: "Array.prototype.shift()" }
      ],
      correctAnswer: "b",
      explanation: "`.filter()` does not mutate the original array; it returns a brand-new array containing only elements that satisfy the predicate."
    },
    {
      id: "q-react-107-3",
      prompt: "Which array method should you use to immutably update a single item in a list in React state?",
      options: [
        { id: "a", label: "Array.prototype.map()" },
        { id: "b", label: "Array.prototype.push()" },
        { id: "c", label: "Array.prototype.reverse()" },
        { id: "d", label: "Array.prototype.sort()" }
      ],
      correctAnswer: "a",
      explanation: "`.map()` produces a new array where the matching item is replaced with a cloned, updated object (`{ ...item, done: true }`), while non-matching items are preserved."
    },
    {
      id: "q-react-107-4",
      prompt: "What does the object spread operator `{ ...user, email: 'new@example.com' }` do?",
      options: [
        { id: "a", label: "It deletes the user object" },
        { id: "b", label: "It creates a shallow copy of the user object and overrides the `email` property with the new value" },
        { id: "c", label: "It encrypts the user's password" },
        { id: "d", label: "It converts the user object into an array" }
      ],
      correctAnswer: "b",
      explanation: "Object spread copies all enumerable properties from `user` into a new object literal, then sets `email` to the new value."
    },
    {
      id: "q-react-107-5",
      prompt: "Why is calling `items.sort()` directly on state considered a bug in React?",
      options: [
        { id: "a", label: "Because `.sort()` mutates the original array in place instead of returning a new array copy" },
        { id: "b", label: "Because `.sort()` does not work with letters" },
        { id: "c", label: "Because React does not support sorting" },
        { id: "d", label: "Because it deletes the array" }
      ],
      correctAnswer: "a",
      explanation: "Native `.sort()` mutates the array in place. To sort immutably, first create a clone: `[...items].sort((a, b) => ...)`."
    },
    {
      id: "q-react-107-6",
      prompt: "If an object in state has a nested property `user.address.city`, how must you update `city` immutably?",
      options: [
        { id: "a", label: "`user.address.city = 'London'; setUser(user);`" },
        { id: "b", label: "`setUser(prev => ({ ...prev, address: { ...prev.address, city: 'London' } }))`" },
        { id: "c", label: "`setUser({ city: 'London' })`" },
        { id: "d", label: "`setUser(user.city = 'London')`" }
      ],
      correctAnswer: "b",
      explanation: "Because spread is shallow, you must copy every nested level that changes: copy the outer object, then copy the nested `address` object."
    },
    {
      id: "q-react-107-7",
      prompt: "How do you immutably prepend an item to the beginning of an array in state?",
      options: [
        { id: "a", label: "`setItems(prev => prev.unshift(newItem))`" },
        { id: "b", label: "`setItems(prev => [newItem, ...prev])`" },
        { id: "c", label: "`setItems(prev => prev.push(newItem))`" },
        { id: "d", label: "`setItems(newItem + prev)`" }
      ],
      correctAnswer: "b",
      explanation: "`[newItem, ...prev]` constructs a new array with `newItem` as the first element followed by all existing items."
    },
    {
      id: "q-react-107-8",
      prompt: "What is reference equality check in JavaScript and React (`Object.is(a, b)`)?",
      options: [
        { id: "a", label: "Checking if two variables have the exact same text string" },
        { id: "b", label: "Checking whether two variables point to the exact same memory address location" },
        { id: "c", label: "Checking if two files have the same size" },
        { id: "d", label: "Checking if two users are logged in" }
      ],
      correctAnswer: "b",
      explanation: "Reference equality checks whether two object pointers refer to the exact same location in memory."
    },
    {
      id: "q-react-107-9",
      prompt: "What advantage does immutability give developers when debugging React applications?",
      options: [
        { id: "a", label: "It allows time-travel debugging, inspectable state change logs, and easy rollback of changes" },
        { id: "b", label: "It removes the need for tests" },
        { id: "c", label: "It automatically fixes syntax errors" },
        { id: "d", label: "It hides bugs from users" }
      ],
      correctAnswer: "a",
      explanation: "Because past state snapshots are never mutated, tools like React DevTools and Redux can record history and travel backward and forward through time."
    },
    {
      id: "q-react-107-10",
      prompt: "What library is commonly used in complex React applications to write immutable code using simple mutating syntax under the hood?",
      options: [
        { id: "a", label: "Immer (built into Redux Toolkit)" },
        { id: "b", label: "jQuery" },
        { id: "c", label: "Bootstrap" },
        { id: "d", label: "Angular" }
      ],
      correctAnswer: "a",
      explanation: "Immer uses JavaScript Proxies to let you write seemingly mutable code (`state.todos[0].done = true`) while producing a 100% frozen, immutable state tree underneath."
    }
  ]
};

// MODULE 2 QUIZ
const module02Quiz: CurriculumItem = {
  id: "item-react-mod02-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-interaction",
  moduleTitle: "Module 2: State and Interaction",
  modulePosition: 2,
  title: "Module 2 Assessment: State and Interaction MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 2 Quiz: State Architecture, Events & Controlled Forms",
  contentDescription: "Evaluate your comprehensive mastery of stateful React programming: useState snapshot behavior, functional updaters, lifting state up, derived values, controlled forms, validation, and immutable array/object updates.",
  questions: [
    ...(lesson104.questions || []).slice(0, 3),
    ...(lesson105.questions || []).slice(0, 3),
    ...(lesson106.questions || []).slice(0, 2),
    ...(lesson107.questions || []).slice(0, 2)
  ]
};

// MODULE 2 ASSESSMENT (LAB)
const module02Assessment: CurriculumItem = {
  id: "item-react-mod02-lab",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-02-state-interaction",
  moduleTitle: "Module 2: State and Interaction",
  modulePosition: 2,
  title: "Module 2 Lab: Interactive Task & Enrollment Board",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 2 Lab Project: Interactive Task & Enrollment Board",
  contentDescription: "Build a full-featured, accessible task and enrollment board with controlled inputs, multi-field validation, lifted search state, and 100% immutable state operations.",
  assignmentPrompt: {
    instructions: "Develop an interactive task and course enrollment management dashboard:\n1. Controlled Form: Create an accessible form with inputs for `title`, `priority` (low/medium/high), and a `isUrgent` checkbox.\n2. Validation: Prevent submission if `title` is shorter than 3 characters, and show inline error messages.\n3. Immutable Operations: Implement `addTask`, `toggleTaskCompleted`, and `deleteTask` using `.map()`, `.filter()`, and object spread.\n4. Lifted State: Add a search bar at the top that filters visible tasks dynamically as derived state.\n5. Stats Summary: Compute total tasks, pending tasks, and completion percentage directly during render.",
    deliverables: [
      "Controlled components with e.preventDefault() and clean validation feedback",
      "Strictly immutable state update patterns without push, splice, or in-place sorting",
      "Derived values for search filtering and stats calculations"
    ]
  }
};

export const reactModule02: CurriculumSubModule = {
  id: "module-react-02-state-interaction",
  subCourseId: "mod-react-essentials",
  title: "Module 2 — State and Interaction",
  description: "Learn state management with useState, synthetic event handling, lifting state up, controlled form components, and immutable data structures.",
  position: 2,
  items: [
    lesson104,
    lesson105,
    lesson106,
    lesson107,
    module02Quiz,
    module02Assessment
  ]
};
