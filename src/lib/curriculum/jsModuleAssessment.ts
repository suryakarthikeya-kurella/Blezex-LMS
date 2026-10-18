import { CurriculumItem } from "../curriculumTypes";

export const jsModuleAssessment: CurriculumItem = {
  id: "item-js-module-assessment",
  moduleId: "mod-js-fundamentals",
  moduleTitle: "Fundamentals of JavaScript",
  modulePosition: 2,
  title: "33. Module Assessment: JavaScript Comprehensive Certification Exam",
  duration: "60 mins",
  type: "quiz",
  position: 33,
  contentHeading: "Module Assessment: JavaScript Certification Quiz",
  contentDescription: "Test your complete mastery of JavaScript across all 32 module topics. This comprehensive 30-question certification exam evaluates core syntax, scopes, data structures, array methods, DOM manipulation, asynchronous programming, event loop mechanics, closures, 'this' binding, OOP, and web performance.",
  questions: [
    {
      id: "exam-q-1",
      prompt: "What is the primary difference in scoping between 'var' and 'let'/'const'?",
      options: [
        { id: "e1", label: "'let' and 'const' are block-scoped ({ ... }), whereas 'var' is function-scoped." },
        { id: "e2", label: "'var' is block-scoped, while 'let' and 'const' are global-scoped." },
        { id: "e3", label: "'var' cannot be redeclared, but 'let' can be redeclared anywhere." },
        { id: "e4", label: "There is no difference in scoping; they are interchangeable aliases." }
      ],
      correctIndex: 0,
      explanation: "Variables declared with let and const respect block scope (confined inside { }), whereas var is scoped to the nearest enclosing function (or global scope if declared outside a function)."
    },
    {
      id: "exam-q-2",
      prompt: "What error occurs if you attempt to access a 'let' or 'const' variable before its declaration line?",
      codeSnippet: {
        language: "JavaScript",
        code: "console.log(score);\nlet score = 100;"
      },
      options: [
        { id: "e5", label: "ReferenceError: Cannot access 'score' before initialization (due to the Temporal Dead Zone)." },
        { id: "e6", label: "undefined is printed to the console." },
        { id: "e7", label: "null is printed to the console." },
        { id: "e8", label: "SyntaxError: Unexpected identifier." }
      ],
      correctIndex: 0,
      explanation: "Unlike 'var' which hoists with a default value of undefined, 'let' and 'const' are hoisted into a Temporal Dead Zone (TDZ). Accessing them before their declaration line throws a ReferenceError."
    },
    {
      id: "exam-q-3",
      prompt: "Which of the following data types in JavaScript is stored and passed by reference rather than by value?",
      options: [
        { id: "e9", label: "Objects (including Arrays and Functions)" },
        { id: "e10", label: "Strings" },
        { id: "e11", label: "Numbers" },
        { id: "e12", label: "Booleans" }
      ],
      correctIndex: 0,
      explanation: "Primitives (number, string, boolean, null, undefined, symbol, bigint) are stored and copied by value. Non-primitives (objects, arrays, functions) are stored in heap memory and accessed/passed by memory reference."
    },
    {
      id: "exam-q-4",
      prompt: "What is the output of '0 == false' versus '0 === false' in JavaScript?",
      options: [
        { id: "e13", label: "true, false" },
        { id: "e14", label: "false, false" },
        { id: "e15", label: "true, true" },
        { id: "e16", label: "false, true" }
      ],
      correctIndex: 0,
      explanation: "Loose equality (==) coerces false to 0, so 0 == false evaluates to true. Strict equality (===) compares both type and value without coercion (number vs boolean), yielding false."
    },
    {
      id: "exam-q-5",
      prompt: "Which of the following expressions evaluates to 'true' in a boolean condition?",
      options: [
        { id: "e17", label: "Boolean([])" },
        { id: "e18", label: "Boolean(\"\")" },
        { id: "e19", label: "Boolean(0)" },
        { id: "e20", label: "Boolean(NaN)" }
      ],
      correctIndex: 0,
      explanation: "All objects and arrays in JavaScript (even empty ones like [] and {}) are truthy objects. The falsy values are false, 0, -0, 0n, \"\", null, undefined, and NaN."
    },
    {
      id: "exam-q-6",
      prompt: "Why can a standard function declaration be called before the line where it is defined in source code, whereas an arrow function variable cannot?",
      options: [
        { id: "e21", label: "Function declarations are hoisted with their complete function body definition during the compilation phase." },
        { id: "e22", label: "Arrow functions are executed on a background web worker thread." },
        { id: "e23", label: "Function declarations run synchronously, whereas arrow functions run asynchronously." },
        { id: "e24", label: "Arrow functions can only be defined in Node.js." }
      ],
      correctIndex: 0,
      explanation: "JavaScript hoists function declarations along with their function body to the top of the enclosing scope. Arrow functions assigned to let/const variables remain uninitialized in the TDZ."
    },
    {
      id: "exam-q-7",
      prompt: "How does the rest parameter syntax '...args' collect variable arguments inside a function?",
      options: [
        { id: "e25", label: "It gathers any remaining arguments into a genuine, standard JavaScript Array." },
        { id: "e26", label: "It converts arguments into a comma-delimited string." },
        { id: "e27", label: "It creates an array-like object without array methods like map and filter." },
        { id: "e28", label: "It limits the function to accepting a maximum of 3 arguments." }
      ],
      correctIndex: 0,
      explanation: "Rest parameters (...args) collect indefinite arguments into a true Array instance, granting full access to array methods like forEach, map, and reduce."
    },
    {
      id: "exam-q-8",
      prompt: "What does '[10, 20, 30].map(x => x * 2)' do to the original array '[10, 20, 30]'?",
      options: [
        { id: "e29", label: "It leaves the original array untouched and returns a new array: [20, 40, 60]." },
        { id: "e30", label: "It mutates the original array in place to [20, 40, 60]." },
        { id: "e31", label: "It deletes the original array from memory." },
        { id: "e32", label: "It returns a single combined number: 120." }
      ],
      correctIndex: 0,
      explanation: "map() is an immutable, pure method: it never modifies the original source array. It allocates and returns a brand-new array containing each transformed item."
    },
    {
      id: "exam-q-9",
      prompt: "What will '[1, 2, 3, 4, 5].filter(num => num > 10)' return?",
      options: [
        { id: "e33", label: "[] (an empty array)" },
        { id: "e34", label: "undefined" },
        { id: "e35", label: "null" },
        { id: "e36", label: "Throws a RangeError" }
      ],
      correctIndex: 0,
      explanation: "When no elements satisfy the filter callback condition, filter() returns a fresh empty array [] rather than undefined or null."
    },
    {
      id: "exam-q-10",
      prompt: "What happens if you execute '[].reduce((acc, curr) => acc + curr)' without supplying an initial value argument?",
      options: [
        { id: "e37", label: "JavaScript throws a TypeError: Reduce of empty array with no initial value." },
        { id: "e38", label: "It returns 0." },
        { id: "e39", label: "It returns undefined." },
        { id: "e40", label: "It returns an empty array []." }
      ],
      correctIndex: 0,
      explanation: "If reduce() is called on an empty array without an initial value, JavaScript cannot determine the initial accumulator and throws a TypeError."
    },
    {
      id: "exam-q-11",
      prompt: "What is the crucial performance difference between 'Array.prototype.find()' and 'Array.prototype.filter()'?",
      options: [
        { id: "e41", label: "find() stops iterating immediately upon finding the first match, whereas filter() must inspect every element in the array." },
        { id: "e42", label: "filter() is synchronous, while find() is asynchronous." },
        { id: "e43", label: "find() always returns an array of matches." },
        { id: "e44", label: "filter() cannot work with arrays of objects." }
      ],
      correctIndex: 0,
      explanation: "find() short-circuits as soon as its callback returns true, returning that single element. filter() evaluates every element in the array to collect all matching results."
    },
    {
      id: "exam-q-12",
      prompt: "What is the result of the following destructuring assignment?",
      codeSnippet: {
        language: "JavaScript",
        code: "const person = { name: \"Hari\" };\nconst { name, role = \"Developer\" } = person;\nconsole.log(role);"
      },
      options: [
        { id: "e45", label: "\"Developer\"" },
        { id: "e46", label: "undefined" },
        { id: "e47", label: "null" },
        { id: "e48", label: "ReferenceError: role is not defined" }
      ],
      correctIndex: 0,
      explanation: "Destructuring default values (role = \"Developer\") apply whenever the target property is undefined in the source object."
    },
    {
      id: "exam-q-13",
      prompt: "What is a major limitation of copying nested objects with the spread operator '{ ...obj }'?",
      options: [
        { id: "e49", label: "It only creates a shallow copy; nested inner objects and arrays are still copied by reference." },
        { id: "e50", label: "It deletes all numeric keys." },
        { id: "e51", label: "It freezes the object so properties cannot be edited." },
        { id: "e52", label: "It converts all values into strings." }
      ],
      correctIndex: 0,
      explanation: "The spread operator performs a shallow copy. Mutating a nested object (e.g. clone.address.city = 'Delhi') will inadvertently mutate the nested object in the original."
    },
    {
      id: "exam-q-14",
      prompt: "What happens to object properties holding 'undefined' or function values when serialized with 'JSON.stringify()'?",
      options: [
        { id: "e53", label: "They are completely omitted from the resulting JSON string." },
        { id: "e54", label: "They are converted into \"null\" strings." },
        { id: "e55", label: "They throw a JSONSerializationError." },
        { id: "e56", label: "They are converted into empty strings \"\"." }
      ],
      correctIndex: 0,
      explanation: "JSON specification does not support undefined, functions, or symbols. When stringifying an object, keys with undefined or function values are omitted."
    },
    {
      id: "exam-q-15",
      prompt: "What is the return value of 'document.querySelector(\".item\")' if multiple elements with class 'item' exist on the page?",
      options: [
        { id: "e57", label: "Only the very first matching element found in document order." },
        { id: "e58", label: "A NodeList of all matching elements." },
        { id: "e59", label: "An array of all matching elements." },
        { id: "e60", label: "null" }
      ],
      correctIndex: 0,
      explanation: "document.querySelector() returns the first element matching the selector. To retrieve all matching elements, you must use document.querySelectorAll()."
    },
    {
      id: "exam-q-16",
      prompt: "Why should you use 'element.textContent' rather than 'element.innerHTML' when rendering dynamic user input?",
      options: [
        { id: "e61", label: "textContent treats input strictly as plain text, eliminating Cross-Site Scripting (XSS) attacks." },
        { id: "e62", label: "innerHTML is deprecated in modern HTML standards." },
        { id: "e63", label: "textContent automatically formats text with bold styling." },
        { id: "e64", label: "innerHTML cannot insert text longer than 50 characters." }
      ],
      correctIndex: 0,
      explanation: "innerHTML parses the string as markup, which allows attackers to inject malicious <script> tags or <img onerror=...> payloads. textContent escapes raw strings safely as plain text."
    },
    {
      id: "exam-q-17",
      prompt: "Why is 'event.preventDefault()' standard practice inside a form 'submit' event handler in single-page apps?",
      options: [
        { id: "e65", label: "It prevents the browser's default behavior of reloading the entire page or sending an HTTP request." },
        { id: "e66", label: "It stops JavaScript execution." },
        { id: "e67", label: "It clears all input values in the form." },
        { id: "e68", label: "It disables the submit button permanently." }
      ],
      correctIndex: 0,
      explanation: "By default, browser forms navigate or refresh the page upon submission. event.preventDefault() stops this reload, allowing client-side JavaScript to validate and process data smoothly."
    },
    {
      id: "exam-q-18",
      prompt: "What is 'event bubbling' in the DOM event propagation model?",
      options: [
        { id: "e69", label: "The event triggers on the innermost target element first, then bubbles upward through its ancestors in the DOM tree." },
        { id: "e70", label: "The event travels downward from window to target only." },
        { id: "e71", label: "The event is cloned and sent to all sibling elements." },
        { id: "e72", label: "The event is delayed by 100 milliseconds." }
      ],
      correctIndex: 0,
      explanation: "In event bubbling, an event dispatched on a target node propagates up through its parent, grandparent, document, and window."
    },
    {
      id: "exam-q-19",
      prompt: "What design pattern attaches a single event listener to a common ancestor rather than dozens of separate listeners on child buttons?",
      options: [
        { id: "e73", label: "Event Delegation (using event.target to identify clicked children)" },
        { id: "e74", label: "Event Polling" },
        { id: "e75", label: "Event Reflection" },
        { id: "e76", label: "Observer Monad" }
      ],
      correctIndex: 0,
      explanation: "Event Delegation leverages event bubbling by placing a single listener on a parent container (like a <ul>), inspecting event.target to handle events on dynamic child elements efficiently."
    },
    {
      id: "exam-q-20",
      prompt: "What is the primary difference in persistence between 'localStorage' and 'sessionStorage'?",
      options: [
        { id: "e77", label: "localStorage data persists indefinitely until manually cleared, whereas sessionStorage data is cleared when the browser tab closes." },
        { id: "e78", label: "localStorage can only store strings, but sessionStorage can store functions." },
        { id: "e79", label: "sessionStorage persists across browser reboots, while localStorage expires after 24 hours." },
        { id: "e80", label: "localStorage is sent to the server with every HTTP header, but sessionStorage is not." }
      ],
      correctIndex: 0,
      explanation: "localStorage stores data with no expiration time across sessions. sessionStorage isolates data to the lifetime of the specific browser tab and is cleared when the tab or window closes."
    },
    {
      id: "exam-q-21",
      prompt: "How does JavaScript execute code given that it is a single-threaded runtime environment?",
      options: [
        { id: "e81", label: "It has a single Call Stack and uses an asynchronous Event Loop with web APIs and queues to handle non-blocking operations." },
        { id: "e82", label: "It spawns a new OS kernel thread for every function call." },
        { id: "e83", label: "It compiles all JavaScript functions directly into C++ threads." },
        { id: "e84", label: "It halts the entire browser whenever an image is requested." }
      ],
      correctIndex: 0,
      explanation: "JavaScript has one Call Stack (single thread of execution). Long-running operations (network requests, timers) are delegated to browser web APIs, and callbacks return via the Event Loop task queues."
    },
    {
      id: "exam-q-22",
      prompt: "What are the three possible lifecycle states of a JavaScript Promise?",
      options: [
        { id: "e85", label: "Pending, Fulfilled, Rejected" },
        { id: "e86", label: "Starting, Loading, Complete" },
        { id: "e87", label: "Open, Active, Closed" },
        { id: "e88", label: "Draft, Committed, Final" }
      ],
      correctIndex: 0,
      explanation: "A Promise begins in the 'pending' state and transitions permanently into either 'fulfilled' (resolved with a value) or 'rejected' (rejected with a reason/error)."
    },
    {
      id: "exam-q-23",
      prompt: "How should you handle errors when writing asynchronous code using 'async' and 'await'?",
      options: [
        { id: "e89", label: "Wrap the awaited operations inside standard 'try { ... } catch (error) { ... }' blocks." },
        { id: "e90", label: "Async/await functions never throw errors; they return false." },
        { id: "e91", label: "Use window.onerror inside the function body." },
        { id: "e92", label: "Add an 'if (await.error)' conditional statement." }
      ],
      correctIndex: 0,
      explanation: "Awaiting a rejected promise throws an exception inside an async function. Wrapping the await in a try...catch block catches this error cleanly."
    },
    {
      id: "exam-q-24",
      prompt: "What happens if one promise in an array of five promises rejects when using 'Promise.all()'?",
      options: [
        { id: "e93", label: "Promise.all() immediately rejects with the error of the first rejected promise (fail-fast behavior)." },
        { id: "e94", label: "It ignores the error and returns the remaining four results." },
        { id: "e95", label: "It retries the rejected promise 3 times automatically." },
        { id: "e96", label: "It returns an array containing null in place of the rejected item." }
      ],
      correctIndex: 0,
      explanation: "Promise.all() fails fast: if any promise rejects, the entire Promise.all() immediately rejects with that error. (To wait for all regardless of outcome, use Promise.allSettled())."
    },
    {
      id: "exam-q-25",
      prompt: "In the JavaScript Event Loop, which queue has higher execution priority: the Microtask Queue or the Macrotask (Task) Queue?",
      options: [
        { id: "e97", label: "The Microtask Queue (e.g. Promise callbacks, queueMicrotask) executes completely before the next Macrotask is processed." },
        { id: "e98", label: "The Macrotask Queue (setTimeout, setInterval) always runs before microtasks." },
        { id: "e99", label: "They alternate strictly one-by-one." },
        { id: "e100", label: "Execution order is completely random and unpredictable." }
      ],
      correctIndex: 0,
      explanation: "Whenever the call stack empties, the event loop drains the entire microtask queue (Promise callbacks) before picking up the next macrotask (such as setTimeout)."
    },
    {
      id: "exam-q-26",
      prompt: "What is a 'closure' in JavaScript?",
      options: [
        { id: "e101", label: "A function bundled together with references to its surrounding lexical state, allowing it to access outer variables even after the outer function has returned." },
        { id: "e102", label: "A syntax for closing open HTML tags in JSX." },
        { id: "e103", label: "A method that terminates an active Web Worker." },
        { id: "e104", label: "A command that cleans up memory in the garbage collector." }
      ],
      correctIndex: 0,
      explanation: "A closure is created every time a function is declared. It retains access to variables from its parent lexical scope even after that parent function has finished executing."
    },
    {
      id: "exam-q-27",
      prompt: "How does the 'this' keyword behave inside an arrow function compared to a standard function?",
      options: [
        { id: "e105", label: "Arrow functions do not bind their own 'this'; they inherit 'this' lexically from the enclosing scope where they were created." },
        { id: "e106", label: "Arrow functions always set 'this' to document.body." },
        { id: "e107", label: "Standard functions always set 'this' to undefined." },
        { id: "e108", label: "Arrow functions allow re-binding 'this' with .bind(), while standard functions do not." }
      ],
      correctIndex: 0,
      explanation: "Arrow functions do not have their own execution context or 'this' binding. They capture the 'this' value of the enclosing lexical scope at definition time."
    },
    {
      id: "exam-q-28",
      prompt: "What is the syntactic difference between 'fn.call(context, arg1, arg2)' and 'fn.apply(context, [arg1, arg2])'?",
      options: [
        { id: "e109", label: "call() takes arguments individually (comma-separated); apply() takes arguments as an array." },
        { id: "e110", label: "call() is asynchronous; apply() is synchronous." },
        { id: "e111", label: "apply() binds permanently like bind(), whereas call() executes once." },
        { id: "e112", label: "apply() can only be called on constructors." }
      ],
      correctIndex: 0,
      explanation: "Both call() and apply() execute immediately with an explicit 'this' argument. The difference is solely how additional parameters are passed: individually vs as an array."
    },
    {
      id: "exam-q-29",
      prompt: "When extending a parent class in ES6 ('class Child extends Parent'), what must you invoke in the child constructor before accessing 'this'?",
      options: [
        { id: "e113", label: "super(...args)" },
        { id: "e114", label: "this.init()" },
        { id: "e115", label: "Parent.call()" },
        { id: "e116", label: "Object.create(this)" }
      ],
      correctIndex: 0,
      explanation: "In derived classes, the child constructor must call super() before accessing 'this', which invokes the parent class constructor to initialize the instance."
    },
    {
      id: "exam-q-30",
      prompt: "Where does JavaScript look next if a requested property is not found on the instance object itself?",
      options: [
        { id: "e117", label: "Up the prototype chain via the object's [[Prototype]] (Object.getPrototypeOf(obj))." },
        { id: "e118", label: "It immediately throws an Uncaught ReferenceError." },
        { id: "e119", label: "In the browser's cookies." },
        { id: "e120", label: "In the global window.defaultProperties object." }
      ],
      correctIndex: 0,
      explanation: "JavaScript walks up the prototype chain: if a property is missing on the object, it checks its prototype, then the prototype's prototype, terminating at null (Object.prototype.__proto__ === null)."
    }
  ]
};
