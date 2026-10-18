import { CurriculumItem } from "../curriculumTypes";

export const jsLessons22To27: CurriculumItem[] = [
  {
    id: "item-js-callbacks",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "22. Callbacks",
    duration: "35 mins",
    type: "cheatsheet",
    position: 22,
    contentHeading: "Lesson 22: Callbacks",
    contentDescription: "Understand higher-order functions and callbacks: synchronous vs asynchronous execution, event handling, timers, and resolving callback hell.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Synchronous Callback\nfunction processUser(name, callback) {\n  callback(name.toUpperCase());\n}\nprocessUser(\"Hari\", (formatted) => console.log(\"Hello,\", formatted));\n\n// 2. Asynchronous Callback with setTimeout\nconsole.log(\"Start\");\nsetTimeout(() => {\n  console.log(\"Timer finished (runs asynchronously)\");\n}, 1000);\nconsole.log(\"End\");\n// Output order: Start -> End -> Timer finished"
    },
    sections: [
      {
        title: "22.1 What is a Callback?",
        explanation: "A callback is a function passed as an argument to another function, intended to be invoked (called back) by the receiving function. Notice the critical difference: fn(callback) passes the function reference, whereas fn(callback()) executes the function immediately and passes its return value.",
        bullets: [
          "Functions are first-class citizens in JavaScript: they can be passed as arguments, assigned to variables, and returned from other functions.",
          "Used in event listeners, array processing, network requests, and timers."
        ]
      },
      {
        title: "22.2 Synchronous vs Asynchronous Callbacks",
        explanation: "Callbacks can execute synchronously or asynchronously:",
        bullets: [
          "Synchronous Callbacks: Execute immediately on the current call stack before the outer function completes. Examples: array methods (map, filter, reduce), sorting functions, and calculation callbacks.",
          "Asynchronous Callbacks: Scheduled to execute later after an asynchronous event, network response, or timer settles. Examples: setTimeout, setInterval, addEventListener click handlers."
        ]
      },
      {
        title: "22.3 What is 'Callback Hell'?",
        explanation: "Callback hell (also called the 'Pyramid of Doom') happens when asynchronous operations depend sequentially on one another, resulting in deeply nested callbacks with complex error handling and difficult maintenance.",
        codeSnippet: {
          language: "JavaScript",
          code: "// Callback Hell (Pyramid of Doom):\ngetUser(userId, (user) => {\n  getOrders(user.id, (orders) => {\n    getPayment(orders[0].id, (payment) => {\n      sendReceipt(payment, () => {\n        console.log(\"Receipt sent!\");\n      });\n    });\n  });\n});\n// Solution: Promises and async/await flatten this into clean, sequential code!"
        }
      }
    ],
    questions: [
      {
        id: "q-cb-1",
        prompt: "What is a callback function in JavaScript?",
        options: [
          { id: "cb1", label: "A function passed into another function as an argument to be invoked at a later time." },
          { id: "cb2", label: "A function that automatically deletes itself after running." },
          { id: "cb3", label: "A function that can only be written in HTML." },
          { id: "cb4", label: "A function that restarts the computer." }
        ],
        correctIndex: 0,
        explanation: "In JavaScript, functions are first-class values. Passing a function as an argument so the recipient can invoke it makes that function a callback."
      },
      {
        id: "q-cb-2",
        prompt: "What is the crucial difference between 'button.addEventListener(\"click\", handleClick)' and 'button.addEventListener(\"click\", handleClick())'?",
        options: [
          { id: "cb5", label: "handleClick passes the function reference to run on click; handleClick() invokes the function immediately when the script runs and passes its return value." },
          { id: "cb6", label: "handleClick() is required in modern JavaScript." },
          { id: "cb7", label: "handleClick only works for keyboard events." },
          { id: "cb8", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "Passing parentheses handleClick() calls the function right away. Passing without parentheses handleClick passes the function itself to be called when the event actually occurs."
      },
      {
        id: "q-cb-3",
        prompt: "Are callbacks passed to 'array.map()' synchronous or asynchronous?",
        options: [
          { id: "cb9", label: "Synchronous: they execute immediately during the map() call." },
          { id: "cb10", label: "Asynchronous: they run in the microtask queue." },
          { id: "cb11", label: "They execute after 100 milliseconds." },
          { id: "cb12", label: "They execute only when clicked." }
        ],
        correctIndex: 0,
        explanation: "Array methods like map, filter, and reduce execute their callbacks synchronously on the active call stack before moving to the next line of code."
      },
      {
        id: "q-cb-4",
        prompt: "In what order will this code print: console.log(\"1\"); setTimeout(() => console.log(\"2\"), 0); console.log(\"3\");?",
        options: [
          { id: "cb13", label: "1, 3, 2" },
          { id: "cb14", label: "1, 2, 3" },
          { id: "cb15", label: "2, 1, 3" },
          { id: "cb16", label: "3, 1, 2" }
        ],
        correctIndex: 0,
        explanation: "1 and 3 are logged synchronously on the main thread. Even with 0ms delay, the setTimeout callback is queued as a macrotask and executes only after synchronous code completes."
      },
      {
        id: "q-cb-5",
        prompt: "What primary problem led to the invention of Promises and async/await as alternatives to nested callbacks?",
        options: [
          { id: "cb17", label: "Callback Hell: deeply nested indentation, difficult error propagation, and unmaintainable sequential logic." },
          { id: "cb18", label: "Callbacks consume 100% of CPU memory." },
          { id: "cb19", label: "Callbacks cannot accept parameters." },
          { id: "cb20", label: "Callbacks were banned by the W3C." }
        ],
        correctIndex: 0,
        explanation: "Deeply nested asynchronous callbacks make code hard to read, error handling painful, and coordinating multiple parallel or sequential requests clumsy."
      },
      {
        id: "q-cb-6",
        prompt: "What does 'setTimeout(fn, 1000)' guarantee?",
        options: [
          { id: "cb21", label: "The callback will execute NO EARLIER than 1000ms, subject to the event loop and thread availability." },
          { id: "cb22", label: "The callback executes at exactly 1000.000ms with microsecond precision." },
          { id: "cb23", label: "The browser freezes for 1000ms." },
          { id: "cb24", label: "The function repeats every 1000ms indefinitely." }
        ],
        correctIndex: 0,
        explanation: "The delay in setTimeout represents a minimum waiting period. If the main thread is busy running synchronous tasks, the callback must wait until the thread clears."
      },
      {
        id: "q-cb-7",
        prompt: "How can you cancel a scheduled timer created with 'const timerId = setTimeout(...)'?",
        options: [
          { id: "cb25", label: "clearTimeout(timerId)" },
          { id: "cb26", label: "stopTimeout(timerId)" },
          { id: "cb27", label: "delete timerId" },
          { id: "cb28", label: "timerId.cancel()" }
        ],
        correctIndex: 0,
        explanation: "clearTimeout(timerId) cancels a pending timeout before its callback has executed."
      },
      {
        id: "q-cb-8",
        prompt: "What method repeats a callback function periodically at a specified interval?",
        options: [
          { id: "cb29", label: "setInterval()" },
          { id: "cb30", label: "repeatLoop()" },
          { id: "cb31", label: "setTimeout()" },
          { id: "cb32", label: "periodically()" }
        ],
        correctIndex: 0,
        explanation: "setInterval(callback, intervalMs) repeatedly invokes the callback function after every interval of milliseconds until cleared with clearInterval()."
      },
      {
        id: "q-cb-9",
        prompt: "Can a callback function return a value back to its caller?",
        options: [
          { id: "cb33", label: "Yes, synchronous callbacks (like in map or sort) return values directly to the invoking function." },
          { id: "cb34", label: "No, callbacks can never return values." },
          { id: "cb35", label: "Only if declared with the async keyword." },
          { id: "cb36", label: "Only in Node.js." }
        ],
        correctIndex: 0,
        explanation: "In synchronous higher-order functions (e.g. array.map(x => x * 2)), the return value of the callback is collected by the outer function."
      },
      {
        id: "q-cb-10",
        prompt: "What is an event handler in the context of callbacks?",
        options: [
          { id: "cb37", label: "A callback function registered to run when a specific browser DOM event occurs." },
          { id: "cb38", label: "A hardware driver in the computer mouse." },
          { id: "cb39", label: "A CSS property for buttons." },
          { id: "cb40", label: "A database transaction." }
        ],
        correctIndex: 0,
        explanation: "When you attach a listener via addEventListener('click', callback), that callback function serves as the event handler for click events."
      }
    ]
  },
  {
    id: "item-js-promises",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "23. Promises",
    duration: "40 mins",
    type: "cheatsheet",
    position: 23,
    contentHeading: "Lesson 23: Promises",
    contentDescription: "Understand asynchronous Promise architecture: 3 states, executor functions, chaining .then(), catching rejections, and coordinating parallel tasks with Promise.all and Promise.allSettled.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Creating a Promise\nconst checkStock = (item) => {\n  return new Promise((resolve, reject) => {\n    const inStock = true;\n    if (inStock) {\n      resolve(`${item} is ready for dispatch!`);\n    } else {\n      reject(new Error(`${item} is out of stock.`));\n    }\n  });\n};\n\n// 2. Chaining and Error Handling\ncheckStock(\"Laptop\")\n  .then((msg) => console.log(\"Success:\", msg))\n  .catch((err) => console.error(\"Failed:\", err.message))\n  .finally(() => console.log(\"Check completed.\"));"
    },
    sections: [
      {
        title: "23.1 What is a Promise?",
        explanation: "A Promise is an object representing the eventual completion (fulfillment) or failure (rejection) of an asynchronous operation. A promise acts as a placeholder for a value that will become available in the future.",
        bullets: [
          "Pending: Initial state; neither fulfilled nor rejected.",
          "Fulfilled: The asynchronous operation succeeded, yielding a value (via resolve(value)).",
          "Rejected: The operation failed with a reason or error (via reject(reason)).",
          "Settled: A Promise that has either fulfilled or rejected. Once settled, its state is immutable and can never change!"
        ]
      },
      {
        title: "23.2 Creating and Consuming Promises",
        explanation: "Promises are created with 'new Promise((resolve, reject) => { ... })'. The executor function runs immediately. Consumers attach handlers using .then(), .catch(), and .finally():",
        bullets: [
          ".then(onFulfilled): Handles successful completion and receives the fulfillment value.",
          ".catch(onRejected): Handles errors and rejections.",
          ".finally(onSettled): Runs cleanup code regardless of whether the promise fulfilled or rejected."
        ]
      },
      {
        title: "23.3 Promise Chaining",
        explanation: "Every call to .then() returns a BRAND NEW Promise. Returning a value from a .then() handler fulfills the next promise with that value. Returning a new Promise makes the chain wait and adopt that promise's outcome.",
        codeSnippet: {
          language: "JavaScript",
          code: "Promise.resolve(10)\n  .then(num => num * 2) // returns 20\n  .then(num => num + 5) // returns 25\n  .then(final => console.log(\"Result:\", final)); // \"Result: 25\""
        }
      },
      {
        title: "23.4 Static Promise Methods Comparison",
        explanation: "JavaScript provides powerful static methods to coordinate multiple concurrent operations:",
        table: {
          headers: ["Method", "Fulfills When", "Rejects When", "Typical Use"],
          rows: [
            ["Promise.all([p1, p2])", "ALL promises fulfill", "ANY single promise rejects (fast-fail)", "Dependent parallel batch requests"],
            ["Promise.allSettled([p1, p2])", "ALL promises settle (fulfilled or rejected)", "Never rejects", "Bulk independent operations where partial failure is okay"],
            ["Promise.race([p1, p2])", "FIRST promise settles (first to win)", "FIRST promise settles (if first rejects)", "Timeouts and racing mirror servers"],
            ["Promise.any([p1, p2])", "FIRST promise to FULFILL", "Only if ALL promises reject", "Fetching from first healthy mirror"]
          ]
        }
      }
    ],
    questions: [
      {
        id: "q-prom-1",
        prompt: "What are the three possible states of a JavaScript Promise?",
        options: [
          { id: "pr1", label: "Pending, Fulfilled, Rejected" },
          { id: "pr2", label: "Starting, Loading, Finished" },
          { id: "pr3", label: "Open, In-Progress, Closed" },
          { id: "pr4", label: "Created, Running, Terminated" }
        ],
        correctIndex: 0,
        explanation: "A Promise begins in the Pending state, and transitions permanently into either Fulfilled (success) or Rejected (failure)."
      },
      {
        id: "q-prom-2",
        prompt: "Can a Promise change its state after it has already settled (e.g. from fulfilled to rejected)?",
        options: [
          { id: "pr5", label: "No, a Promise can settle only once; subsequent calls to resolve() or reject() are ignored." },
          { id: "pr6", label: "Yes, calling reject() always overrides previous resolve() calls." },
          { id: "pr7", label: "Only if reset with promise.reset()." },
          { id: "pr8", label: "Only in strict mode." }
        ],
        correctIndex: 0,
        explanation: "Promises are immutable once settled: once resolve or reject is invoked, the state and value are permanently locked."
      },
      {
        id: "q-prom-3",
        prompt: "What does calling '.then()' on a Promise return?",
        options: [
          { id: "pr9", label: "A brand new Promise" },
          { id: "pr10", label: "The same original Promise reference" },
          { id: "pr11", label: "undefined" },
          { id: "pr12", label: "A boolean true" }
        ],
        correctIndex: 0,
        explanation: "Every .then() call creates and returns a new Promise, enabling fluent sequential Promise chaining."
      },
      {
        id: "q-prom-4",
        prompt: "What happens if one Promise in 'Promise.all([p1, p2, p3])' rejects?",
        options: [
          { id: "pr13", label: "The entire Promise.all immediately rejects with that rejection reason (fail-fast)." },
          { id: "pr14", label: "It ignores the error and returns the remaining successful promises." },
          { id: "pr15", label: "It returns an array containing null for the failed item." },
          { id: "pr16", label: "It retries the failed promise 3 times." }
        ],
        correctIndex: 0,
        explanation: "Promise.all() is 'fail-fast': if any single promise rejects, the returned promise immediately rejects with that reason, discarding other pending outcomes."
      },
      {
        id: "q-prom-5",
        prompt: "Which static Promise method waits for ALL promises to complete, regardless of whether they fulfill or reject?",
        options: [
          { id: "pr17", label: "Promise.allSettled()" },
          { id: "pr18", label: "Promise.all()" },
          { id: "pr19", label: "Promise.race()" },
          { id: "pr20", label: "Promise.any()" }
        ],
        correctIndex: 0,
        explanation: "Promise.allSettled() returns a promise that fulfills after all of the given promises have either fulfilled or rejected, with an array of result objects describing each outcome."
      },
      {
        id: "q-prom-6",
        prompt: "What does 'Promise.race([p1, p2])' do?",
        options: [
          { id: "pr21", label: "Settles as soon as the first promise settles (whether fulfilled or rejected)." },
          { id: "pr22", label: "Runs the promises 100 times to benchmark speed." },
          { id: "pr23", label: "Waits only for the slowest promise to finish." },
          { id: "pr24", label: "Rejects if any promise takes longer than 1 second." }
        ],
        correctIndex: 0,
        explanation: "Promise.race() takes an iterable of promises and returns a single promise that settles with the outcome of the first promise to settle (win the race)."
      },
      {
        id: "q-prom-7",
        prompt: "When does the callback passed to '.finally()' execute in a Promise chain?",
        options: [
          { id: "pr25", label: "When the promise settles, whether it fulfilled or rejected." },
          { id: "pr26", label: "Only if the promise rejects." },
          { id: "pr27", label: "Only if the promise fulfills." },
          { id: "pr28", label: "Before the promise starts." }
        ],
        correctIndex: 0,
        explanation: ".finally() allows executing cleanup logic (like hiding spinners) that must run regardless of success or failure."
      },
      {
        id: "q-prom-8",
        prompt: "In a Promise chain, what happens if an error is thrown in a '.then()' handler?",
        options: [
          { id: "pr29", label: "Execution jumps directly to the nearest downstream '.catch()' handler." },
          { id: "pr30", label: "The browser freezes." },
          { id: "pr31", label: "The next .then() receives undefined." },
          { id: "pr32", label: "The error is silently ignored." }
        ],
        correctIndex: 0,
        explanation: "Errors and exceptions thrown inside a .then() handler automatically cause that promise to reject, bypassing subsequent .then() blocks until reaching a .catch()."
      },
      {
        id: "q-prom-9",
        prompt: "What does 'Promise.resolve(val)' return if 'val' is already a Promise?",
        options: [
          { id: "pr33", label: "It returns that same Promise directly without unnecessary re-wrapping." },
          { id: "pr34", label: "It wraps it in a double-nested Promise." },
          { id: "pr35", label: "It throws a TypeError." },
          { id: "pr36", label: "It converts it into a synchronous string." }
        ],
        correctIndex: 0,
        explanation: "Promise.resolve() is idempotent with promises: if passed a promise, it returns that promise directly."
      },
      {
        id: "q-prom-10",
        prompt: "What is an 'UnhandledPromiseRejection' in JavaScript?",
        options: [
          { id: "pr37", label: "A Promise that rejected without any attached .catch() or rejection handler, potentially crashing Node.js or logging console errors." },
          { id: "pr38", label: "A promise that took longer than 60 seconds." },
          { id: "pr39", label: "A syntax error in an arrow function." },
          { id: "pr40", label: "A security alert on HTTP connections." }
        ],
        correctIndex: 0,
        explanation: "When a promise rejects and has no rejection handler (.catch()), it triggers an unhandled rejection event, which in Node.js terminates the process."
      }
    ]
  },
  {
    id: "item-js-async-await",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "24. Async/Await",
    duration: "40 mins",
    type: "cheatsheet",
    position: 24,
    contentHeading: "Lesson 24: Async/Await",
    contentDescription: "Write clean asynchronous code with async and await: Promise wrapping, sequential workflows, parallel execution with Promise.all, and try/catch exception handling.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Async functions always return a Promise\nasync function getGreeting(name) {\n  return `Hello, ${name}!`; // Wrapped in Promise.resolve\n}\n\n// 2. Sequential async operations\nasync function processOrder(orderId) {\n  try {\n    const order = await fetchOrder(orderId);\n    const payment = await chargeCard(order.amount);\n    const receipt = await emailReceipt(payment.id);\n    return receipt;\n  } catch (error) {\n    console.error(\"Order processing failed:\", error.message);\n  }\n}\n\n// 3. Parallel execution with Promise.all\nasync function loadDashboard() {\n  const [users, stats] = await Promise.all([\n    fetchUsers(),\n    fetchStats()\n  ]);\n}"
    },
    sections: [
      {
        title: "24.1 What is async/await?",
        explanation: "async and await are modern ES2017 syntactic keywords built on top of Promises. They allow writing asynchronous code that looks and reads like clean, synchronous top-to-bottom statements without messy callback nesting or long .then() chains.",
        bullets: [
          "async: Placed before a function declaration. Guarantees that the function always returns a Promise.",
          "await: Placed before a Promise inside an async function. Pauses function progression until the Promise settles.",
          "Non-blocking: 'await' pauses only the execution of that specific async function; it never freezes the main browser thread or other event loop tasks."
        ]
      },
      {
        title: "24.2 The async Keyword",
        explanation: "Even if an async function returns a primitive value (like a number or string), JavaScript automatically wraps the returned value in a fulfilled Promise.",
        codeSnippet: {
          language: "JavaScript",
          code: "async function getNumber() {\n  return 42;\n}\n\n// Calling it returns a Promise:\ngetNumber().then(val => console.log(val)); // 42"
        }
      },
      {
        title: "24.3 The await Keyword",
        explanation: "The await keyword unwraps the resolved value of a Promise. If the Promise rejects, the await expression throws the rejection reason as an exception, which can be captured cleanly using a standard try...catch block.",
        codeSnippet: {
          language: "JavaScript",
          code: "async function loadData() {\n  try {\n    const data = await fetchUserData(); // Await resolves or throws\n    console.log(\"User:\", data.name);\n  } catch (error) {\n    console.error(\"Failed to load user:\", error.message);\n  } finally {\n    console.log(\"Fetch attempt finished.\");\n  }\n}"
        }
      },
      {
        title: "24.4 Sequential vs Parallel Execution",
        explanation: "Avoid the common pitfall of awaiting independent operations sequentially. If tasks do not depend on one another, run them concurrently in parallel with Promise.all():",
        bullets: [
          "Sequential: const a = await getA(); const b = await getB(); (Takes time(A) + time(B)).",
          "Parallel: const [a, b] = await Promise.all([getA(), getB()]); (Takes max(time(A), time(B)) — 2x faster!)."
        ]
      }
    ],
    questions: [
      {
        id: "q-async-1",
        prompt: "What does an 'async' function always return in JavaScript?",
        options: [
          { id: "as1", label: "A Promise (wrapping the return value if not already a promise)" },
          { id: "as2", label: "A synchronous value" },
          { id: "as3", label: "undefined" },
          { id: "as4", label: "A Generator" }
        ],
        correctIndex: 0,
        explanation: "An async function always returns a Promise. If you return a primitive (e.g. return 10), JavaScript automatically wraps it in Promise.resolve(10)."
      },
      {
        id: "q-async-2",
        prompt: "Does the 'await' keyword block the entire browser thread while waiting for a Promise to resolve?",
        options: [
          { id: "as5", label: "No, it only suspends execution of that async function; the browser continues processing other tasks, rendering, and events." },
          { id: "as6", label: "Yes, it freezes all tabs until complete." },
          { id: "as7", label: "Yes, it creates a busy-wait CPU loop." },
          { id: "as8", label: "Only if the Promise takes longer than 5 seconds." }
        ],
        correctIndex: 0,
        explanation: "await is non-blocking to the main thread. It yields execution back to the browser event loop, allowing user interactions and rendering to continue smoothly."
      },
      {
        id: "q-async-3",
        prompt: "How are errors from rejected Promises handled when using 'await'?",
        options: [
          { id: "as9", label: "By wrapping the await expression in a standard try...catch block." },
          { id: "as10", label: "By adding an 'onError' parameter to the function." },
          { id: "as11", label: "Errors cannot be caught with async/await." },
          { id: "as12", label: "By calling window.catchError()." }
        ],
        correctIndex: 0,
        explanation: "When a promise awaited by 'await' rejects, it throws the rejection error at the await expression, allowing standard try...catch statements to intercept it."
      },
      {
        id: "q-async-4",
        prompt: "Where can the 'await' keyword be used in modern JavaScript?",
        options: [
          { id: "as13", label: "Inside 'async' functions and at the top level of ES modules." },
          { id: "as14", label: "Inside any regular synchronous function." },
          { id: "as15", label: "Inside HTML script tags without type=\"module\"." },
          { id: "as16", label: "Only in Node.js, not browsers." }
        ],
        correctIndex: 0,
        explanation: "await can only be used inside functions declared with 'async', or at the top level of an ECMAScript module (Top-Level Await)."
      },
      {
        id: "q-async-5",
        prompt: "What will happen if you forget the 'await' keyword: 'const data = fetchUserData();'?",
        options: [
          { id: "as17", label: "'data' will hold the pending Promise object itself, not the resolved data." },
          { id: "as18", label: "JavaScript throws a SyntaxError." },
          { id: "as19", label: "The browser waits automatically." },
          { id: "as20", label: "'data' becomes null." }
        ],
        correctIndex: 0,
        explanation: "Calling an async function without await immediately returns the Promise object itself. To get the resolved value, you must await it."
      },
      {
        id: "q-async-6",
        prompt: "How can you execute two independent async operations 'getUsers()' and 'getProducts()' concurrently in parallel?",
        options: [
          { id: "as21", label: "const [users, products] = await Promise.all([getUsers(), getProducts()]);" },
          { id: "as22", label: "const users = await getUsers(); const products = await getProducts();" },
          { id: "as23", label: "await concurrent(getUsers, getProducts);" },
          { id: "as24", label: "getUsers().parallel(getProducts());" }
        ],
        correctIndex: 0,
        explanation: "Passing an array of promises to Promise.all initiates both asynchronous operations at the same time, reducing total wait time."
      },
      {
        id: "q-async-7",
        prompt: "What does an async arrow function look like?",
        options: [
          { id: "as25", label: "const load = async () => { ... };" },
          { id: "as26", label: "const load = () async => { ... };" },
          { id: "as27", label: "const load = () => async { ... };" },
          { id: "as28", label: "const async load = () => { ... };" }
        ],
        correctIndex: 0,
        explanation: "The 'async' keyword is placed immediately before the parameter parenthesis in an arrow function (const fn = async () => {})."
      },
      {
        id: "q-async-8",
        prompt: "If an async function has no explicit return statement, what does it resolve to?",
        options: [
          { id: "as29", label: "A Promise that fulfills with 'undefined'." },
          { id: "as30", label: "A Promise that rejects." },
          { id: "as31", label: "null" },
          { id: "as32", label: "0" }
        ],
        correctIndex: 0,
        explanation: "Like regular functions that return undefined by default, an async function with no return returns a Promise that fulfills with undefined."
      },
      {
        id: "q-async-9",
        prompt: "Can 'finally' blocks be used with async/await and try/catch?",
        options: [
          { id: "as33", label: "Yes, 'finally' executes reliably after try and catch to clean up loading states or connections." },
          { id: "as34", label: "No, finally only works with Promises directly." },
          { id: "as35", label: "Only in Node.js." },
          { id: "as36", label: "Only if no error occurred." }
        ],
        correctIndex: 0,
        explanation: "try...catch...finally works seamlessly with async/await, running the finally block after the awaited operations and catch handler complete."
      },
      {
        id: "q-async-10",
        prompt: "Why is async/await considered syntactic sugar over Promises?",
        options: [
          { id: "as37", label: "Because under the hood, async/await uses Promises and the microtask queue; it provides cleaner, more readable syntax for working with them." },
          { id: "as38", label: "Because it makes code run 100 times faster." },
          { id: "as39", label: "Because it was created by sweetjs." },
          { id: "as40", label: "Because it converts JavaScript into WebAssembly." }
        ],
        correctIndex: 0,
        explanation: "async/await is built directly on Promises and generator mechanics. It introduces no new underlying asynchronous paradigm, but offers a vastly cleaner syntax."
      }
    ]
  },
  {
    id: "item-js-fetch-api",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "25. Fetch API and HTTP Requests",
    duration: "40 mins",
    type: "cheatsheet",
    position: 25,
    contentHeading: "Lesson 25: Fetch API and HTTP Requests",
    contentDescription: "Master network requests: HTTP methods (GET, POST, PUT, DELETE), status codes, headers, parsing response.json(), error handling (response.ok), and AbortController.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. GET Request with HTTP error checking\nasync function fetchUsers() {\n  try {\n    const response = await fetch(\"https://jsonplaceholder.typicode.com/users\");\n    if (!response.ok) {\n      throw new Error(`HTTP error! Status: ${response.status}`);\n    }\n    const users = await response.json();\n    console.log(\"Loaded users:\", users);\n  } catch (error) {\n    console.error(\"Fetch failed:\", error.message);\n  }\n}\n\n// 2. POST Request with JSON payload\nasync function createPost(newPost) {\n  const res = await fetch(\"https://jsonplaceholder.typicode.com/posts\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(newPost)\n  });\n  return res.json();\n}"
    },
    sections: [
      {
        title: "25.1 What is an API and HTTP?",
        explanation: "An API (Application Programming Interface) allows software systems to communicate. In web applications, the frontend communicates with backend servers over HTTP (Hypertext Transfer Protocol) to retrieve, store, or update data.",
        bullets: [
          "HTTP Request: URL endpoint, method (GET/POST), request headers, and optional body payload.",
          "HTTP Response: Status code (e.g. 200, 404, 500), response headers, and response body (usually JSON)."
        ]
      },
      {
        title: "25.2 Common HTTP Methods",
        explanation: "Standard REST API conventions use specific HTTP verbs for operations:",
        table: {
          headers: ["Method", "Purpose", "Has Request Body?", "Common Use Case"],
          rows: [
            ["GET", "Retrieve data from server", "No", "Fetch product list, user profile"],
            ["POST", "Send data to create new resource", "Yes", "Submit registration form, create order"],
            ["PUT", "Replace entire representation of resource", "Yes", "Update complete user profile"],
            ["PATCH", "Partially update resource", "Yes", "Update only product price or task status"],
            ["DELETE", "Remove a resource from server", "No", "Delete a task or comment"]
          ]
        }
      },
      {
        title: "25.3 The Fetch API & CRITICAL Interview Question",
        explanation: "fetch() returns a Promise resolving to a Response object. CRITICAL INTERVIEW RULE: fetch() does NOT reject on HTTP 404 or 500 errors! A Promise returned by fetch() only rejects on network failures (loss of internet connection, DNS failure, CORS block). You MUST explicitly verify response.ok or response.status!",
        codeSnippet: {
          language: "JavaScript",
          code: "const response = await fetch(url);\nif (!response.ok) { // response.ok is true only for status 200-299\n  throw new Error(`Server returned error status: ${response.status}`);\n}\nconst data = await response.json(); // Also asynchronous!"
        }
      },
      {
        title: "25.4 Making POST / Mutation Requests",
        explanation: "When sending JSON payloads, specify the method, set the 'Content-Type: application/json' header, and serialize the body with JSON.stringify():",
        codeSnippet: {
          language: "JavaScript",
          code: "await fetch(\"/api/tasks\", {\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ title: \"Complete JS Course\", completed: false })\n});"
        }
      },
      {
        title: "25.5 Cancelling Requests with AbortController",
        explanation: "To cancel an ongoing fetch request (e.g. when a user navigates away or types a new search query), pass an AbortSignal from an AbortController:",
        codeSnippet: {
          language: "JavaScript",
          code: "const controller = new AbortController();\nfetch(\"/api/search?q=js\", { signal: controller.signal });\n\n// Cancel the request:\ncontroller.abort(); // Rejects with AbortError"
        }
      }
    ],
    questions: [
      {
        id: "q-fetch-1",
        prompt: "Does 'fetch()' reject its Promise when a server responds with an HTTP 404 Not Found or 500 Internal Server Error?",
        options: [
          { id: "fe1", label: "No! fetch() resolves successfully for any response received from the server, even 404 and 500. You must inspect 'response.ok'." },
          { id: "fe2", label: "Yes, fetch() automatically throws an exception on all 4xx and 5xx errors." },
          { id: "fe3", label: "Only for 500 errors, not 404." },
          { id: "fe4", label: "Only in Google Chrome." }
        ],
        correctIndex: 0,
        explanation: "This is a classic interview question. The fetch() promise only rejects on network failure or request blocking. HTTP error status codes (404, 500) fulfill the promise; you must check response.ok."
      },
      {
        id: "q-fetch-2",
        prompt: "What range of HTTP status codes makes 'response.ok' evaluate to true?",
        options: [
          { id: "fe5", label: "Status codes 200 through 299 (successful responses)" },
          { id: "fe6", label: "Only status 200 exactly" },
          { id: "fe7", label: "Status codes 100 through 500" },
          { id: "fe8", label: "Status 304 only" }
        ],
        correctIndex: 0,
        explanation: "response.ok is a boolean property that is true if the HTTP response status code is in the range 200–299."
      },
      {
        id: "q-fetch-3",
        prompt: "Why must you use 'await response.json()' rather than accessing 'response.json' directly as a property?",
        options: [
          { id: "fe9", label: "'response.json()' is an asynchronous method that reads the stream body and returns a Promise resolving to the parsed JavaScript data." },
          { id: "fe10", label: "Because json() is a CSS function." },
          { id: "fe11", label: "Because fetch is written in C++." },
          { id: "fe12", label: "Because JSON strings can only be parsed once per hour." }
        ],
        correctIndex: 0,
        explanation: "HTTP response bodies arrive as data streams. response.json() reads the full stream asynchronously to completion and parses the JSON text."
      },
      {
        id: "q-fetch-4",
        prompt: "What header is required when sending a JSON string in a POST request body to inform the server of the payload format?",
        options: [
          { id: "fe13", label: "'Content-Type': 'application/json'" },
          { id: "fe14", label: "'Accept': 'text/html'" },
          { id: "fe15", label: "'Format': 'json'" },
          { id: "fe16", label: "'Encoding': 'utf-8-only'" }
        ],
        correctIndex: 0,
        explanation: "The 'Content-Type': 'application/json' HTTP header tells the receiving server that the raw body text represents JSON data."
      },
      {
        id: "q-fetch-5",
        prompt: "Which HTTP method is specifically intended to delete a resource on the server?",
        options: [
          { id: "fe17", label: "DELETE" },
          { id: "fe18", label: "REMOVE" },
          { id: "fe19", label: "DROP" },
          { id: "fe20", label: "CLEAR" }
        ],
        correctIndex: 0,
        explanation: "The HTTP DELETE method requests that the target server remove the specified resource."
      },
      {
        id: "q-fetch-6",
        prompt: "What browser security mechanism blocks a frontend webpage at 'https://app.com' from reading data fetched from 'https://api.com' without server permission headers?",
        options: [
          { id: "fe21", label: "CORS (Cross-Origin Resource Sharing)" },
          { id: "fe22", label: "SSL Certificate Expiry" },
          { id: "fe23", label: "DNS Firewall" },
          { id: "fe24", label: "HTML5 Sandbox" }
        ],
        correctIndex: 0,
        explanation: "CORS is a browser security mechanism that restricts cross-origin HTTP requests unless the server explicitly responds with Access-Control-Allow-Origin headers."
      },
      {
        id: "q-fetch-7",
        prompt: "How can you cancel an in-flight fetch request using JavaScript?",
        options: [
          { id: "fe25", label: "Using an AbortController and passing its signal to fetch: controller.abort()" },
          { id: "fe26", label: "fetch.stop()" },
          { id: "fe27", label: "window.stopRequest()" },
          { id: "fe28", label: "delete response" }
        ],
        correctIndex: 0,
        explanation: "AbortController creates an AbortSignal. Calling controller.abort() cancels the network connection and rejects the fetch promise with an AbortError."
      },
      {
        id: "q-fetch-8",
        prompt: "What is the difference between HTTP PUT and HTTP PATCH?",
        options: [
          { id: "fe29", label: "PUT replaces the entire resource representation; PATCH applies partial modifications to a resource." },
          { id: "fe30", label: "PUT creates items; PATCH deletes items." },
          { id: "fe31", label: "PATCH is synchronous; PUT is asynchronous." },
          { id: "fe32", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "In REST conventions, PUT replaces the complete resource with the sent payload, whereas PATCH modifies only specified fields."
      },
      {
        id: "q-fetch-9",
        prompt: "What will happen if you pass a plain JavaScript object directly to the 'body' option of a fetch POST request without JSON.stringify?",
        options: [
          { id: "fe33", label: "The browser sends '[object Object]', which will cause server parsing errors." },
          { id: "fe34", label: "The browser automatically converts it to JSON." },
          { id: "fe35", label: "It throws a TypeError in the console." },
          { id: "fe36", label: "The request is converted to a GET request." }
        ],
        correctIndex: 0,
        explanation: "fetch() expects a string, FormData, or Blob as body. Passing an object coerces it to the useless text '[object Object]'. Always use JSON.stringify(data)."
      },
      {
        id: "q-fetch-10",
        prompt: "What does HTTP status code 401 typically signify?",
        options: [
          { id: "fe37", label: "Unauthorized: the request lacks valid authentication credentials." },
          { id: "fe38", label: "Not Found: the URL does not exist." },
          { id: "fe39", label: "OK: the request succeeded." },
          { id: "fe40", label: "Internal Server Error." }
        ],
        correctIndex: 0,
        explanation: "HTTP 401 indicates that the request has not been applied because it lacks valid authentication credentials for the target resource."
      }
    ]
  },
  {
    id: "item-js-event-loop",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "26. Event Loop, Call Stack, and Task Queues",
    duration: "40 mins",
    type: "cheatsheet",
    position: 26,
    contentHeading: "Lesson 26: Event Loop, Call Stack, and Task Queues",
    contentDescription: "Master the JavaScript execution engine: single-threaded runtime, Call Stack, Task (Macrotask) Queue, Microtask Queue (Promises), and execution ordering.",
    codeSnippet: {
      language: "JavaScript",
      code: "console.log(\"1: Synchronous\");\n\nsetTimeout(() => {\n  console.log(\"2: Macrotask (Timer)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"3: Microtask (Promise)\");\n});\n\nqueueMicrotask(() => {\n  console.log(\"4: Microtask (Explicit)\");\n});\n\nconsole.log(\"5: Synchronous\");\n// Exact Output Order: 1 -> 5 -> 3 -> 4 -> 2"
    },
    sections: [
      {
        title: "26.1 What is the Call Stack?",
        explanation: "JavaScript is a single-threaded programming language, meaning it has one call stack and executes one operation at a time. The Call Stack operates on Last-In, First-Out (LIFO): when a function is called, a frame is pushed onto the stack; when it returns, it is popped off.",
        bullets: [
          "Single main thread per execution context.",
          "Synchronous code runs sequentially on the stack.",
          "Stack overflow occurs when recursive functions exceed call stack limits."
        ]
      },
      {
        title: "26.2 What is the Event Loop?",
        explanation: "The Event Loop is a continuous background process that monitors the Call Stack and task queues. When the Call Stack becomes completely empty, the Event Loop checks the queues and pushes eligible callbacks onto the Call Stack to run.",
        bullets: [
          "Call stack empty? -> Process all pending microtasks -> Run next macrotask -> Render UI -> Repeat."
        ]
      },
      {
        title: "26.3 Macrotasks vs Microtasks",
        explanation: "JavaScript schedules asynchronous callbacks into two distinct queues with strict priority rules:",
        table: {
          headers: ["Queue Type", "Sources", "Priority / Timing"],
          rows: [
            ["Microtask Queue", "Promise reactions (.then, .catch, .finally), queueMicrotask(), async/await continuations", "HIGH PRIORITY: Drained completely after every turn of synchronous code and before the next macrotask"],
            ["Task Queue (Macrotasks)", "setTimeout, setInterval, I/O, UI interaction events (click, keydown)", "Processed ONE AT A TIME after the microtask queue is completely empty"]
          ]
        }
      },
      {
        title: "26.4 Detailed Execution Order Example",
        explanation: "Trace this classic technical interview puzzle step-by-step:",
        codeSnippet: {
          language: "JavaScript",
          code: "console.log(\"A\"); // 1. Runs synchronously -> Prints 'A'\nsetTimeout(() => console.log(\"B\"), 0); // 2. Queued in Macrotask queue\nPromise.resolve().then(() => console.log(\"C\")); // 3. Queued in Microtask queue\nconsole.log(\"D\"); // 4. Runs synchronously -> Prints 'D'\n\n// Execution finishes on Call Stack:\n// Microtasks run first -> Prints 'C'\n// Macrotask timer runs next -> Prints 'B'\n// Final Output: A, D, C, B"
        }
      },
      {
        title: "26.5 Does setTimeout(fn, 0) execute immediately?",
        explanation: "No! Even with a delay of 0 milliseconds, the callback is scheduled into the macrotask queue. It cannot run until the current call stack clears AND all pending microtasks have finished processing.",
        bullets: [
          "Minimum 4ms clamp: Browsers enforce a minimum 4ms clamp for nested timers.",
          "Thread blocking: A busy while loop (while(true)) freezes the thread, preventing timers from ever running."
        ]
      }
    ],
    questions: [
      {
        id: "q-evtlp-1",
        prompt: "Which queue has higher priority and is completely drained before the next macrotask executes?",
        options: [
          { id: "el1", label: "The Microtask Queue (Promises, queueMicrotask)" },
          { id: "el2", label: "The Macrotask / Task Queue (setTimeout, setInterval)" },
          { id: "el3", label: "Both queues are processed at equal random intervals" },
          { id: "el4", label: "The Call Stack Queue" }
        ],
        correctIndex: 0,
        explanation: "Microtasks have absolute priority: whenever the call stack empties, the engine drains the entire microtask queue completely before picking up the next macrotask."
      },
      {
        id: "q-evtlp-2",
        prompt: "What will this code output: console.log(\"A\"); setTimeout(() => console.log(\"B\"), 0); Promise.resolve().then(() => console.log(\"C\")); console.log(\"D\");?",
        options: [
          { id: "el5", label: "A, D, C, B" },
          { id: "el6", label: "A, B, C, D" },
          { id: "el7", label: "A, C, D, B" },
          { id: "el8", label: "B, C, A, D" }
        ],
        correctIndex: 0,
        explanation: "A and D print synchronously. Next, the Promise microtask C runs. Finally, the timer macrotask B runs. Output: A, D, C, B."
      },
      {
        id: "q-evtlp-3",
        prompt: "What is the primary role of the Event Loop in JavaScript?",
        options: [
          { id: "el9", label: "To monitor the Call Stack and push callbacks from the queues onto the stack once it becomes empty." },
          { id: "el10", label: "To compile JavaScript into byte code." },
          { id: "el11", label: "To measure network ping speeds." },
          { id: "el12", label: "To loop through array elements." }
        ],
        correctIndex: 0,
        explanation: "The event loop coordinates execution by checking if the call stack is clear, draining microtasks, executing ready tasks, and coordinating browser rendering."
      },
      {
        id: "q-evtlp-4",
        prompt: "What data structure does the JavaScript Call Stack follow?",
        options: [
          { id: "el13", label: "LIFO (Last-In, First-Out)" },
          { id: "el14", label: "FIFO (First-In, First-Out)" },
          { id: "el15", label: "Binary Search Tree" },
          { id: "el16", label: "Hash Map" }
        ],
        correctIndex: 0,
        explanation: "The call stack operates as a LIFO stack: the most recently called function is pushed onto the top and must return (pop) before outer callers continue."
      },
      {
        id: "q-evtlp-5",
        prompt: "Why does an infinite synchronous 'while(true) {}' loop freeze the web browser tab?",
        options: [
          { id: "el17", label: "JavaScript runs on a single main thread; the infinite loop never pops off the call stack, preventing events, rendering, and timers from ever executing." },
          { id: "el18", label: "Because while loops trigger garbage collection." },
          { id: "el19", label: "Because while loops only run on the server." },
          { id: "el20", label: "Because the computer runs out of hard drive space." }
        ],
        correctIndex: 0,
        explanation: "Because JavaScript is single-threaded, a blocking synchronous loop monopolizes the call stack indefinitely, preventing the event loop from ever servicing UI events or rendering."
      },
      {
        id: "q-evtlp-6",
        prompt: "What is the function 'queueMicrotask(fn)' used for?",
        options: [
          { id: "el21", label: "To explicitly schedule a callback into the microtask queue without needing to instantiate a Promise." },
          { id: "el22", label: "To start a background Web Worker thread." },
          { id: "el23", label: "To delay execution by 1 second." },
          { id: "el24", label: "To cancel pending timers." }
        ],
        correctIndex: 0,
        explanation: "queueMicrotask() provides a standard mechanism to queue a microtask directly, ensuring it runs before browser rendering and next tasks."
      },
      {
        id: "q-evtlp-7",
        prompt: "Where does the code after an 'await' statement execute in terms of the event loop?",
        options: [
          { id: "el25", label: "As a microtask scheduled when the awaited Promise settles." },
          { id: "el26", label: "As a macrotask in the timer queue." },
          { id: "el27", label: "Synchronously on the same call stack turn." },
          { id: "el28", label: "In a separate operating system process." }
        ],
        correctIndex: 0,
        explanation: "await pauses the async function. When the awaited promise fulfills, the remaining code of the function is enqueued as a microtask."
      },
      {
        id: "q-evtlp-8",
        prompt: "What happens if a microtask schedules another microtask recursively without stopping?",
        options: [
          { id: "el29", label: "It starves the event loop, completely blocking macrotasks, user input, and screen rendering (microtask starvation)." },
          { id: "el30", label: "The browser limits microtasks to 5." },
          { id: "el31", label: "It runs in the background smoothly." },
          { id: "el32", label: "It throws a SyntaxError." }
        ],
        correctIndex: 0,
        explanation: "Because the engine must completely drain the microtask queue before picking up the next macrotask, an infinite microtask chain starves the event loop."
      },
      {
        id: "q-evtlp-9",
        prompt: "Why doesn't JavaScript execution freeze while waiting for an HTTP fetch network response?",
        options: [
          { id: "el33", label: "The browser's underlying C++ network threads handle the network I/O in the background outside the JavaScript main thread." },
          { id: "el34", label: "Because JavaScript uses 16 CPU cores simultaneously." },
          { id: "el35", label: "Because fetch is synchronous." },
          { id: "el36", label: "Because network data is downloaded before the page opens." }
        ],
        correctIndex: 0,
        explanation: "Web APIs like fetch and timers are handled by browser runtime background threads. When data arrives, the callback is enqueued into the JavaScript queues."
      },
      {
        id: "q-evtlp-10",
        prompt: "What causes a 'Maximum call stack size exceeded' RangeError?",
        options: [
          { id: "el37", label: "Excessive or infinite function recursion filling all available memory frames in the Call Stack." },
          { id: "el38", label: "Having more than 100 HTML elements on the page." },
          { id: "el39", label: "Using setTimeout 10 times." },
          { id: "el40", label: "An array with more than 1000 items." }
        ],
        correctIndex: 0,
        explanation: "When a function calls itself without a proper termination base condition, stack frames accumulate until the browser's call stack limit is reached, throwing a RangeError."
      }
    ]
  },
  {
    id: "item-js-closures",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "27. Closures",
    duration: "40 mins",
    type: "cheatsheet",
    position: 27,
    contentHeading: "Lesson 27: Closures",
    contentDescription: "Master JavaScript's most celebrated superpower: closures, lexical environments, private state encapsulation, function factories, and the classic var-in-loop interview puzzle.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. What is a closure? Function + lexical environment\nfunction createCounter() {\n  let count = 0; // Private variable\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter1 = createCounter();\nconsole.log(counter1()); // 1\nconsole.log(counter1()); // 2\n\nconst counter2 = createCounter(); // Independent state\nconsole.log(counter2()); // 1\n\n// 2. Encapsulation / Private state\nfunction createBankAccount(initial) {\n  let balance = initial;\n  return {\n    deposit(amount) { balance += amount; return balance; },\n    getBalance() { return balance; }\n  };\n}"
    },
    sections: [
      {
        title: "27.1 What is a Closure?",
        explanation: "A closure is a function bundled together with references to its surrounding lexical environment. In simple terms: an inner function can continue to access variables from its enclosing outer function even after the outer function has finished executing and returned!",
        bullets: [
          "Lexical scope determines variable access based on code position.",
          "Closures preserve state between function invocations.",
          "Encapsulates private variables without exposing them globally.",
          "Foundation of React hooks (useState, useEffect) and function factories."
        ]
      },
      {
        title: "27.2 Independent Lexical Environments",
        explanation: "Every invocation of an outer function creates a completely distinct lexical environment in memory. Multiple closure instances hold independent state:",
        codeSnippet: {
          language: "JavaScript",
          code: "function multiplier(factor) {\n  return number => number * factor;\n}\n\nconst double = multiplier(2);\nconst triple = multiplier(3);\n\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15"
        }
      },
      {
        title: "27.3 Private Variables & Encapsulation",
        explanation: "Variables inside the outer function cannot be accessed or modified directly from outside. Only the methods returned by the closure have access to that private state:",
        codeSnippet: {
          language: "JavaScript",
          code: "const account = createBankAccount(1000);\nconsole.log(account.getBalance()); // 1000\naccount.deposit(500);\nconsole.log(account.getBalance()); // 1500\nconsole.log(account.balance); // undefined! (Private and protected)"
        }
      },
      {
        title: "27.4 The Classic 'var' in Loop Interview Puzzle",
        explanation: "One of the most famous JavaScript interview questions:",
        codeSnippet: {
          language: "JavaScript",
          code: "// PROBLEM with var (function-scoped):\nfor (var i = 1; i <= 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 4, 4, 4 (All callbacks share the single hoisted variable 'i')\n\n// SOLUTION with let (block-scoped):\nfor (let i = 1; i <= 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 1, 2, 3 ('let' creates a fresh binding of 'i' for every iteration!)"
        }
      },
      {
        title: "27.5 Common Closure Pitfalls",
        explanation: "Key nuances to remember when working with closures:",
        bullets: [
          "Closures capture variables by reference, NOT static snapshots: if the variable value changes later, the closure reads the updated value.",
          "Unintentional memory retention: Closures keep referenced outer variables alive in memory, preventing garbage collection until the closure itself is released."
        ]
      }
    ],
    questions: [
      {
        id: "q-clos-1",
        prompt: "What is a closure in JavaScript?",
        options: [
          { id: "cl1", label: "A function bundled with access to variables from its surrounding lexical scope, even after the outer function has returned." },
          { id: "cl2", label: "A method that closes the browser tab." },
          { id: "cl3", label: "A syntax error in a recursive function." },
          { id: "cl4", label: "An object with frozen properties." }
        ],
        correctIndex: 0,
        explanation: "A closure gives an inner function access to its outer function's scope. In JavaScript, closures are created every time a function is created at function creation time."
      },
      {
        id: "q-clos-2",
        prompt: "In 'for (var i = 1; i <= 3; i++) { setTimeout(() => console.log(i), 100); }', why does the console print '4, 4, 4'?",
        options: [
          { id: "cl5", label: "'var' is function-scoped; all three timer callbacks close over the same shared variable 'i', which equals 4 when the loop completes." },
          { id: "cl6", label: "Because setTimeout has a bug in JavaScript." },
          { id: "cl7", label: "Because 3 is incremented by 1." },
          { id: "cl8", label: "Because arrays start at index 0." }
        ],
        correctIndex: 0,
        explanation: "'var' is not block-scoped, so only one 'i' variable exists. By the time the asynchronous timer callbacks execute, the loop has completed and i is 4."
      },
      {
        id: "q-clos-3",
        prompt: "Why does changing 'var i' to 'let i' fix the loop puzzle so it prints '1, 2, 3'?",
        options: [
          { id: "cl9", label: "'let' is block-scoped, creating a fresh, independent binding of 'i' for each loop iteration that each closure captures." },
          { id: "cl10", label: "'let' makes the loop synchronous." },
          { id: "cl11", label: "'let' prevents setTimeout from executing." },
          { id: "cl12", label: "'let' converts numbers into strings." }
        ],
        correctIndex: 0,
        explanation: "'let' binds a new distinct variable for each iteration of the for loop. Each timer callback closes over its own specific iteration's value."
      },
      {
        id: "q-clos-4",
        prompt: "How can closures be used to create private variables in JavaScript?",
        options: [
          { id: "cl13", label: "By defining variables inside an outer function and returning methods that access them without exposing the variable directly." },
          { id: "cl14", label: "By declaring variables with the 'private' keyword in functions." },
          { id: "cl15", label: "By saving variables in localStorage." },
          { id: "cl16", label: "By placing variables in a comment." }
        ],
        correctIndex: 0,
        explanation: "Variables declared in an outer function are inaccessible from the outside world. Only privileged inner functions exposed by the closure can read or modify them."
      },
      {
        id: "q-clos-5",
        prompt: "What is a 'function factory'?",
        options: [
          { id: "cl17", label: "A function that returns another function with preset or customized parameters captured in its closure." },
          { id: "cl18", label: "A factory pattern in CSS." },
          { id: "cl19", label: "A compiler tool that builds HTML." },
          { id: "cl20", label: "A function with more than 100 lines." }
        ],
        correctIndex: 0,
        explanation: "Function factories (e.g. multiplyBy(multiplier)) return customized functions that remember configured parameters through closure."
      },
      {
        id: "q-clos-6",
        prompt: "If 'const c1 = createCounter(); const c2 = createCounter();', do 'c1' and 'c2' share the same counter variable?",
        options: [
          { id: "cl21", label: "No, each call to createCounter() creates a completely separate, independent lexical environment in memory." },
          { id: "cl22", label: "Yes, all functions share the same memory." },
          { id: "cl23", label: "Only if declared with var." },
          { id: "cl24", label: "Only in Node.js." }
        ],
        correctIndex: 0,
        explanation: "Each invocation of an outer function instantiates a new lexical scope. c1 and c2 maintain separate, isolated state."
      },
      {
        id: "q-clos-7",
        prompt: "Do closures capture a static snapshot of a variable's value or a live reference to the variable binding?",
        options: [
          { id: "cl25", label: "A live reference: if the variable's value changes later in the outer scope, the closure sees the updated value." },
          { id: "cl26", label: "A frozen snapshot at the moment the inner function was declared." },
          { id: "cl27", label: "A cloned string." },
          { id: "cl28", label: "It depends on whether strict mode is enabled." }
        ],
        correctIndex: 0,
        explanation: "Closures capture the live variable binding in memory, not a static copy. Modifying the variable in the outer scope is observed by the closure."
      },
      {
        id: "q-clos-8",
        prompt: "How can closures potentially cause memory leaks if not managed carefully?",
        options: [
          { id: "cl29", label: "If a long-lived closure retains references to large objects or DOM elements, the garbage collector cannot free that memory." },
          { id: "cl30", label: "Closures duplicate RAM on every line." },
          { id: "cl31", label: "Closures prevent the browser from closing." },
          { id: "cl32", label: "By deleting global variables." }
        ],
        correctIndex: 0,
        explanation: "As long as an active closure retains a reference to an outer variable, the garbage collector cannot deallocate that variable, which can lead to memory retention."
      },
      {
        id: "q-clos-9",
        prompt: "How does the React 'useState' hook leverage closures?",
        options: [
          { id: "cl33", label: "React components use closures to retain state values and setter functions across component re-renders." },
          { id: "cl34", label: "React hooks do not use closures." },
          { id: "cl35", label: "By storing data in SQL databases." },
          { id: "cl36", label: "By modifying HTML files on the server." }
        ],
        correctIndex: 0,
        explanation: "React hooks rely on closures to connect component renders with internal state cells stored in fiber nodes between renders."
      },
      {
        id: "q-clos-10",
        prompt: "What will this code log: function outer() { let x = 10; return function() { return x; }; } const get = outer(); console.log(get());?",
        options: [
          { id: "cl37", label: "10" },
          { id: "cl38", label: "undefined" },
          { id: "cl39", label: "ReferenceError" },
          { id: "cl40", label: "null" }
        ],
        correctIndex: 0,
        explanation: "Even though outer() has finished executing and returned, the closure returned to 'get' retains access to 'x', successfully returning 10."
      }
    ]
  }
];
