import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// SUB-COURSE 4: BACKEND DEVELOPMENT WITH NODE.JS & EXPRESS.JS
// =========================================================================

// =========================================================================
// MODULE 1: NODE.JS RUNTIME & ASYNCHRONOUS ARCHITECTURE
// =========================================================================

const nodeLesson01: CurriculumItem = {
  id: "item-node-01-architecture-event-loop",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-runtime",
  moduleTitle: "Module 1: Node.js Runtime & Event-Driven Architecture",
  modulePosition: 1,
  title: "01. Node.js Architecture, V8 Engine & The Event Loop",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 01: Node.js Architecture, V8 Engine & The Event Loop",
  contentDescription: "Master how Node.js executes JavaScript on servers outside the browser using Google Chrome's V8 engine, libuv, non-blocking I/O, and the multi-phase Event Loop.",
  codeSnippet: {
    language: "javascript",
    code: "// Demonstrating Non-blocking Asynchronous Execution Order\nconsole.log('1. Synchronous - Script starts');\n\nsetTimeout(() => {\n  console.log('4. Macrotask (Timers Phase) - 0ms timer callback');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3. Microtask (Promise) - Executes before next event loop phase');\n});\n\nprocess.nextTick(() => {\n  console.log('2. Microtask (nextTick) - Highest priority microtask');\n});\n\nconsole.log('1b. Synchronous - Script ends');"
  },
  sections: [
    {
      title: "1.1 What is Node.js? Server-Side JavaScript",
      explanation: "Node.js is an open-source, cross-platform JavaScript runtime environment created by Ryan Dahl in 2009. Prior to Node.js, JavaScript ran exclusively inside client browsers. Node.js bundles Google's high-performance C++ V8 JavaScript engine with libuv, an abstraction library providing asynchronous I/O and an event loop, allowing JavaScript to interact directly with the operating system, file system, network sockets, and hardware.",
      bullets: [
        "V8 Engine: Compiles JavaScript directly into native machine code using Just-In-Time (JIT) compilation.",
        "libuv: A C library that provides the event loop, thread pool (4 worker threads by default), and asynchronous file/network I/O.",
        "Single-Threaded Main Thread: Executes JavaScript code on one call stack, eliminating thread synchronization and deadlock bugs.",
        "Non-blocking I/O: Heavy operations (disk reads, database queries, network calls) are offloaded to OS kernels or libuv threads."
      ],
      diagram: "+-------------------------------------------------------------+\n|                     NODE.JS ARCHITECTURE                    |\n+-------------------------------------------------------------+\n|               JavaScript Application Code                   |\n|                              |                              |\n|         Node.js Core API (fs, http, crypto, path)           |\n|                              |                              |\n|  +------------------------+-----+-------------------------+ |\n|  | Google V8 Engine (C++) |     |      libuv (C Library)   | |\n|  | - Call Stack           |     | - Event Loop            | |\n|  | - Memory Heap          |     | - Worker Thread Pool (4)| |\n|  +------------------------+     +-------------------------+ |\n|                              |                              |\n|                 Operating System Kernel                     |\n+-------------------------------------------------------------+"
    },
    {
      title: "1.2 The Node.js Event Loop Phases",
      explanation: "The Event Loop continuously checks if the call stack is empty and coordinates the execution of callbacks across dedicated chronological phases:",
      table: {
        headers: ["Phase", "Purpose", "Example Callbacks Handled"],
        rows: [
          ["Timers Phase", "Executes callbacks scheduled by timers", "setTimeout(), setInterval()"],
          ["Pending I/O Callbacks", "Executes deferred system-level I/O callbacks", "TCP errors like ECONNREFUSED"],
          ["Idle, Prepare", "Internal internal use only", "Node internal subsystem routines"],
          ["Poll Phase", "Retrieves new I/O events & executes I/O callbacks", "fs.readFile(), socket incoming data"],
          ["Check Phase", "Executes immediate callbacks right after poll", "setImmediate()"],
          ["Close Callbacks", "Handles resource closure callbacks", "socket.on('close', ...), db.close()"]
        ]
      }
    },
    {
      title: "1.3 Microtask Queue vs Macrotask Queue",
      explanation: "Between every phase of the event loop, Node.js exhausts all microtasks before proceeding to the next phase. `process.nextTick()` has the absolute highest priority, followed by resolved Promise `.then()` handlers.",
      bullets: [
        "Microtask 1 (process.nextTick): Executes immediately after current synchronous code finishes, before promises.",
        "Microtask 2 (Promise.then / catch / finally): Executes after nextTick queue is drained.",
        "Macrotasks: setTimeout, setInterval, setImmediate, and I/O callbacks scheduled in the event loop phases."
      ]
    }
  ],
  questions: [
    {
      id: "q-node-01-1",
      prompt: "Which underlying library provides Node.js with its Event Loop and multi-threaded I/O thread pool?",
      options: [
        { id: "a", label: "React Native" },
        { id: "b", label: "libuv" },
        { id: "c", label: "Babel" },
        { id: "d", label: "Webpack" }
      ],
      correctIndex: 1,
      explanation: "libuv is the multi-platform C library that handles the event loop, non-blocking asynchronous I/O, and the background worker thread pool in Node.js."
    },
    {
      id: "q-node-01-2",
      prompt: "What engine does Node.js use to compile JavaScript into native machine code?",
      options: [
        { id: "a", label: "Mozilla SpiderMonkey" },
        { id: "b", label: "Apple JavaScriptCore" },
        { id: "c", label: "Google V8 Engine" },
        { id: "d", label: "Microsoft Chakra" }
      ],
      correctIndex: 2,
      explanation: "Node.js is built on top of Google Chrome's open-source V8 JavaScript engine written in C++."
    },
    {
      id: "q-node-01-3",
      prompt: "By default, how many worker threads does libuv provide in its background thread pool?",
      options: [
        { id: "a", label: "1" },
        { id: "b", label: "4" },
        { id: "c", label: "16" },
        { id: "d", label: "64" }
      ],
      correctIndex: 1,
      explanation: "libuv initializes with a default of 4 worker threads, configurable via the UV_THREADPOOL_SIZE environment variable."
    },
    {
      id: "q-node-01-4",
      prompt: "Which microtask callback executes first among the following when synchronous code concludes?",
      options: [
        { id: "a", label: "setTimeout(..., 0)" },
        { id: "b", label: "Promise.resolve().then(...)" },
        { id: "c", label: "process.nextTick(...)" },
        { id: "d", label: "setImmediate(...)" }
      ],
      correctIndex: 2,
      explanation: "process.nextTick() callbacks have the highest microtask priority and are processed before promise microtasks and macrotasks."
    },
    {
      id: "q-node-01-5",
      prompt: "In which event loop phase are callbacks scheduled with setImmediate() executed?",
      options: [
        { id: "a", label: "Timers phase" },
        { id: "b", label: "Check phase" },
        { id: "c", label: "Poll phase" },
        { id: "d", label: "Close phase" }
      ],
      correctIndex: 1,
      explanation: "setImmediate() callbacks are specifically executed during the Check phase, which runs immediately after the Poll phase completes."
    },
    {
      id: "q-node-01-6",
      prompt: "Why is Node.js considered single-threaded when it can handle thousands of concurrent requests?",
      options: [
        { id: "a", label: "It creates a new OS process for each incoming HTTP request" },
        { id: "b", label: "The JavaScript execution thread is single-threaded, but libuv handles I/O asynchronously in the background" },
        { id: "c", label: "It pauses all other network traffic while running one calculation" },
        { id: "d", label: "It executes JavaScript only inside web workers" }
      ],
      correctIndex: 1,
      explanation: "Node.js runs your JavaScript code on a single main event loop thread while delegating heavy I/O and network operations to the operating system or worker threads."
    },
    {
      id: "q-node-01-7",
      prompt: "What will happen if you run a blocking, CPU-intensive while(true) loop on the Node.js main thread?",
      options: [
        { id: "a", label: "Node.js will automatically move the loop to another CPU core" },
        { id: "b", label: "The event loop will freeze and no other incoming requests or timers can be processed" },
        { id: "c", label: "Node.js will instantly kill the process with an error" },
        { id: "d", label: "The browser will render a 404 Not Found error" }
      ],
      correctIndex: 1,
      explanation: "Because JavaScript runs on a single main thread, long synchronous operations starve the event loop, blocking all timers, incoming requests, and callbacks."
    },
    {
      id: "q-node-01-8",
      prompt: "Which phase of the event loop retrieves new I/O events and waits for network/disk data?",
      options: [
        { id: "a", label: "Timers" },
        { id: "b", label: "Poll" },
        { id: "c", label: "Pending" },
        { id: "d", label: "Close" }
      ],
      correctIndex: 1,
      explanation: "The Poll phase is the heart of the event loop where Node.js polls for new I/O events and executes callbacks for data received from sockets or file reads."
    },
    {
      id: "q-node-01-9",
      prompt: "What command in terminal runs a Node.js file named server.js?",
      options: [
        { id: "a", label: "run server.js" },
        { id: "b", label: "node server.js" },
        { id: "c", label: "compile server.js" },
        { id: "d", label: "javascript server.js" }
      ],
      correctIndex: 1,
      explanation: "The 'node <filename>' command invokes the Node.js runtime CLI to execute the specified script."
    },
    {
      id: "q-node-01-10",
      prompt: "Which global object in Node.js contains information about the current running process and environment variables?",
      options: [
        { id: "a", label: "window" },
        { id: "b", label: "document" },
        { id: "c", label: "process" },
        { id: "d", label: "globalThis.window" }
      ],
      correctIndex: 2,
      explanation: "The 'process' global object provides control and inspection over the Node.js process (e.g., process.env, process.argv, process.exit)."
    }
  ]
};

const nodeLesson02: CurriculumItem = {
  id: "item-node-02-modules-npm",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-runtime",
  moduleTitle: "Module 1: Node.js Runtime & Event-Driven Architecture",
  modulePosition: 1,
  title: "02. Node.js Modules (CommonJS vs ES Modules) & NPM",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 02: Node.js Modules (CommonJS vs ES Modules) & NPM",
  contentDescription: "Understand modular architecture in Node.js: CommonJS require/exports, ECMAScript Modules (import/export), package.json configuration, semantic versioning (SemVer), and npm package management.",
  codeSnippet: {
    language: "javascript",
    code: "// --- mathUtils.js (CommonJS export) ---\nfunction add(a, b) { return a + b; }\nfunction multiply(a, b) { return a * b; }\nmodule.exports = { add, multiply };\n\n// --- app.js (CommonJS import) ---\nconst { add, multiply } = require('./mathUtils');\nconsole.log(add(5, 10)); // 15\n\n// --- ES Module equivalent (when 'type': 'module' in package.json) ---\n// export function subtract(a, b) { return a - b; }\n// import { subtract } from './mathUtils.js';"
  },
  sections: [
    {
      title: "2.1 CommonJS (CJS) vs ECMAScript Modules (ESM)",
      explanation: "Node.js historically used the CommonJS module system where files are wrapped in an invisible module wrapper function. Modern Node.js also natively supports standard ES Modules (ESM).",
      table: {
        headers: ["Feature", "CommonJS (CJS)", "ES Modules (ESM)"],
        rows: [
          ["Syntax", "require() & module.exports", "import & export"],
          ["Loading Mechanism", "Synchronous at runtime", "Asynchronous static analysis at parse time"],
          ["File Extension", ".js (default) or .cjs", ".mjs or .js with 'type': 'module' in package.json"],
          ["Top-Level await", "Supported in modern async wrappers", "Natively supported at top-level"],
          ["Special Identifiers", "__dirname and __filename available", "import.meta.url used instead"]
        ]
      }
    },
    {
      title: "2.2 package.json & Semantic Versioning (SemVer)",
      explanation: "Every Node.js project is initialized with `npm init -y`, generating a `package.json` file. Dependencies specify semantic versions following MAJOR.MINOR.PATCH:",
      bullets: [
        "MAJOR (X.0.0): Incompatible API breaking changes.",
        "MINOR (1.X.0): Backward-compatible new features.",
        "PATCH (1.0.X): Backward-compatible bug fixes.",
        "^ (Caret, e.g. ^4.18.2): Allows updates that do not change the major version.",
        "~ (Tilde, e.g. ~4.18.2): Allows only patch updates (4.18.x)."
      ]
    }
  ],
  questions: [
    {
      id: "q-node-02-1",
      prompt: "Which keyword is used in CommonJS to export functions and variables from a module?",
      options: [
        { id: "a", label: "export default" },
        { id: "b", label: "module.exports" },
        { id: "c", label: "package.send" },
        { id: "d", label: "share.public" }
      ],
      correctIndex: 1,
      explanation: "In CommonJS, 'module.exports' (or the shorthand 'exports') is used to expose objects, functions, or primitives to other files."
    },
    {
      id: "q-node-02-2",
      prompt: "How do you enable standard ES Module syntax (import/export) for all .js files in a Node.js project?",
      options: [
        { id: "a", label: "Set \"esm\": true in package.json" },
        { id: "b", label: "Add \"type\": \"module\" to package.json" },
        { id: "c", label: "Run node --allow-es-modules" },
        { id: "d", label: "Install the Babel CLI globally" }
      ],
      correctIndex: 1,
      explanation: "Adding '\"type\": \"module\"' to package.json instructs Node.js to treat all .js files in the project directory as ES Modules."
    },
    {
      id: "q-node-02-3",
      prompt: "What does the caret symbol (^) in dependency version '^18.2.0' indicate?",
      options: [
        { id: "a", label: "Lock strictly to 18.2.0, never update" },
        { id: "b", label: "Permit minor and patch updates (e.g., 18.3.0, 18.2.1), but not breaking major version 19.0.0" },
        { id: "c", label: "Permit any update including major versions up to 100" },
        { id: "d", label: "Download the pre-release beta version" }
      ],
      correctIndex: 1,
      explanation: "The caret (^) allows npm to install minor updates and patch fixes without altering the left-most non-zero digit (Major version)."
    },
    {
      id: "q-node-02-4",
      prompt: "Which file ensures that every developer and CI server installs the exact same dependency tree down to the exact commit and hash?",
      options: [
        { id: "a", label: "package.json" },
        { id: "b", label: "package-lock.json" },
        { id: "c", label: "tsconfig.json" },
        { id: "d", label: "node_modules.lock" }
      ],
      correctIndex: 1,
      explanation: "package-lock.json locks the precise resolved versions, download URLs, and integrity hashes of all transitive dependencies."
    },
    {
      id: "q-node-02-5",
      prompt: "What is the command to install a library only as a development-time tool (e.g., nodemon, jest)?",
      options: [
        { id: "a", label: "npm install <pkg> --global" },
        { id: "b", label: "npm install <pkg> --save-dev (or -D)" },
        { id: "c", label: "npm install <pkg> --temporary" },
        { id: "d", label: "npm get <pkg>" }
      ],
      correctIndex: 1,
      explanation: "The '--save-dev' or '-D' flag saves the dependency under 'devDependencies' in package.json, excluding it from production builds."
    },
    {
      id: "q-node-02-6",
      prompt: "Which two variables exist in CommonJS modules to give the current directory and file path?",
      options: [
        { id: "a", label: "window.path and window.name" },
        { id: "b", label: "__dirname and __filename" },
        { id: "c", label: "process.dir and process.file" },
        { id: "d", label: "fs.currentDir and fs.currentFile" }
      ],
      correctIndex: 1,
      explanation: "In CommonJS, the module wrapper injects '__dirname' (absolute path of current folder) and '__filename' (absolute path of current file)."
    },
    {
      id: "q-node-02-7",
      prompt: "What happens when you require() a local module without specifying a file extension, like require('./config')?",
      options: [
        { id: "a", label: "Node immediately throws an MODULE_NOT_FOUND error" },
        { id: "b", label: "Node resolves .js, .json, .node, or looks for an index.js inside a folder named config" },
        { id: "c", label: "Node downloads config from npm registry" },
        { id: "d", label: "Node compiles it using Webpack" }
      ],
      correctIndex: 1,
      explanation: "Node's module resolution algorithm checks for config.js, config.json, config.node, and then config/index.js automatically."
    },
    {
      id: "q-node-02-8",
      prompt: "What command creates a default package.json in an empty directory without prompting interactive questions?",
      options: [
        { id: "a", label: "node create" },
        { id: "b", label: "npm init -y" },
        { id: "c", label: "npm start" },
        { id: "d", label: "npm new" }
      ],
      correctIndex: 1,
      explanation: "'npm init -y' (or --yes) automatically generates package.json populated with standard defaults."
    },
    {
      id: "q-node-02-9",
      prompt: "Can an ES Module (import) be loaded conditionally inside an if statement like require()?",
      options: [
        { id: "a", label: "Yes, static import syntax can be put anywhere inside if blocks" },
        { id: "b", label: "No, static import must be at the top level, but dynamic import() returns a Promise and can be called anywhere" },
        { id: "c", label: "No, ES Modules do not support dynamic loading at all" },
        { id: "d", label: "Only if jQuery is loaded" }
      ],
      correctIndex: 1,
      explanation: "Static 'import ... from' must reside at module top-level. Dynamic imports via 'import('./module.js')' can be used conditionally anywhere."
    },
    {
      id: "q-node-02-10",
      prompt: "Why should the node_modules folder never be committed to Git repositories?",
      options: [
        { id: "a", label: "Git refuses to commit any folder starting with 'node'" },
        { id: "b", label: "It contains thousands of large files that can be reinstalled anytime using package.json via 'npm install'" },
        { id: "c", label: "Node modules are encrypted and cannot be parsed by Git" },
        { id: "d", label: "Node.js deletes node_modules on reboot" }
      ],
      correctIndex: 1,
      explanation: "node_modules is large, platform-dependent (some packages compile C++ binaries), and easily reproduced with 'npm install' or 'npm ci'."
    }
  ]
};

const nodeLesson03: CurriculumItem = {
  id: "item-node-03-core-modules-fs-path",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-runtime",
  moduleTitle: "Module 1: Node.js Runtime & Event-Driven Architecture",
  modulePosition: 1,
  title: "03. Core Node Modules: File System (fs), Path & Event Emitter",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 03: Core Node Modules: File System (fs), Path & Event Emitter",
  contentDescription: "Explore essential built-in Node.js modules: reading and writing files with fs/promises, path manipulation across operating systems, and custom event publishing with EventEmitter.",
  codeSnippet: {
    language: "javascript",
    code: "const fs = require('fs/promises');\nconst path = require('path');\nconst EventEmitter = require('events');\n\n// 1. Path safe cross-platform joining\nconst filePath = path.join(__dirname, 'data', 'users.json');\n\n// 2. Asynchronous File Read/Write\nasync function handleFiles() {\n  await fs.writeFile(filePath, JSON.stringify([{ id: 1, name: 'Alice' }]));\n  const raw = await fs.readFile(filePath, 'utf-8');\n  console.log('Read File:', JSON.parse(raw));\n}\n\n// 3. Custom Event Emitter\nconst userEmitter = new EventEmitter();\nuserEmitter.on('user:created', (user) => {\n  console.log('Event received: Send welcome email to', user.name);\n});\nuserEmitter.emit('user:created', { name: 'Alice' });"
  },
  sections: [
    {
      title: "3.1 File System Module (fs & fs/promises)",
      explanation: "The Node.js `fs` module provides both synchronous blocking methods (e.g. `fs.readFileSync`), callback methods (`fs.readFile`), and Promise-based methods (`fs/promises`). In production web servers, always use asynchronous Promise or stream methods to prevent blocking the event loop.",
      bullets: [
        "fs/promises: Returns native Promises ideal for modern async/await syntax.",
        "Streams (createReadStream / createWriteStream): Reads large files chunk by chunk without exhausting RAM memory.",
        "Encoding: Always specify 'utf-8' when reading text files, otherwise a raw binary Buffer is returned."
      ]
    },
    {
      title: "3.2 Path Module & Cross-Platform Normalization",
      explanation: "Windows uses backslashes (`\\`) for file paths while macOS and Linux use forward slashes (`/`). The `path` module abstracts these differences:",
      bullets: [
        "path.join(...paths): Joins segments using the operating system's separator and normalizes redundant slashes.",
        "path.resolve(...paths): Resolves a sequence of paths into an absolute path.",
        "path.extname(filename): Extracts file extension (e.g. '.json').",
        "path.basename(filename): Extracts the filename with or without extension."
      ]
    },
    {
      title: "3.3 EventEmitter & The Observer Pattern",
      explanation: "Much of Node.js core (including HTTP servers and streams) is built on the `EventEmitter` class. It allows objects to emit named events that trigger registered listener callbacks.",
      table: {
        headers: ["Method", "Description"],
        rows: [
          ["emitter.on(eventName, listener)", "Registers a persistent listener function for the event"],
          ["emitter.once(eventName, listener)", "Registers a one-time listener that automatically removes itself after firing once"],
          ["emitter.emit(eventName, ...args)", "Synchronously calls each listener registered for the event in registration order"],
          ["emitter.off(eventName, listener)", "Removes a specific listener function"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-node-03-1",
      prompt: "Why should you use 'fs/promises' instead of synchronous methods like 'fs.readFileSync' in a production web server?",
      options: [
        { id: "a", label: "fs.readFileSync is deprecated and will not run in Node 18+" },
        { id: "b", label: "Synchronous file reads block the single JavaScript thread, freezing all incoming HTTP requests until the disk finishes reading" },
        { id: "c", label: "fs/promises compresses files automatically" },
        { id: "d", label: "fs.readFileSync can only read XML files" }
      ],
      correctIndex: 1,
      explanation: "Synchronous I/O halts the entire event loop, preventing Node.js from serving other requests until the file operation finishes."
    },
    {
      id: "q-node-03-2",
      prompt: "What does fs.readFile() return if no encoding parameter (like 'utf-8') is provided?",
      options: [
        { id: "a", label: "A JavaScript string" },
        { id: "b", label: "A raw binary Buffer object" },
        { id: "c", label: "An array of numbers" },
        { id: "d", label: "undefined" }
      ],
      correctIndex: 1,
      explanation: "Without an explicit character encoding specified, Node.js returns a raw binary Buffer instance containing memory bytes."
    },
    {
      id: "q-node-03-3",
      prompt: "Which path method joins path segments together safely according to the host operating system's separator?",
      options: [
        { id: "a", label: "path.concat()" },
        { id: "b", label: "path.join()" },
        { id: "c", label: "path.append()" },
        { id: "d", label: "path.merge()" }
      ],
      correctIndex: 1,
      explanation: "path.join() uses '\\' on Windows and '/' on Linux/macOS, normalizing relative paths safely."
    },
    {
      id: "q-node-03-4",
      prompt: "What is the key difference between emitter.on() and emitter.once()?",
      options: [
        { id: "a", label: "emitter.on() runs in parallel; emitter.once() runs in series" },
        { id: "b", label: "emitter.once() triggers only the very first time the event is emitted, then unregisters itself" },
        { id: "c", label: "emitter.on() requires an async callback" },
        { id: "d", label: "emitter.once() only accepts numeric parameters" }
      ],
      correctIndex: 1,
      explanation: "emitter.once() registers a listener that is invoked at most once before being automatically removed."
    },
    {
      id: "q-node-03-5",
      prompt: "What method triggers all listeners registered to a specific event on an EventEmitter instance?",
      options: [
        { id: "a", label: "emitter.trigger()" },
        { id: "b", label: "emitter.emit()" },
        { id: "c", label: "emitter.fire()" },
        { id: "d", label: "emitter.publish()" }
      ],
      correctIndex: 1,
      explanation: "The 'emit(eventName, ...args)' method raises the event and executes all attached listener functions synchronously."
    },
    {
      id: "q-node-03-6",
      prompt: "Which path method converts a relative path into an absolute root-anchored filesystem path?",
      options: [
        { id: "a", label: "path.resolve()" },
        { id: "b", label: "path.normalize()" },
        { id: "c", label: "path.absolute()" },
        { id: "d", label: "path.full()" }
      ],
      correctIndex: 0,
      explanation: "path.resolve() resolves relative paths against the current working directory to create an absolute path."
    },
    {
      id: "q-node-03-7",
      prompt: "When reading a multi-gigabyte video or log file in Node.js, what is the best practice?",
      options: [
        { id: "a", label: "Load the entire file into a string with fs.readFile()" },
        { id: "b", label: "Use readable streams with fs.createReadStream() to stream in small chunks" },
        { id: "c", label: "Convert the file to base64 synchronously" },
        { id: "d", label: "Use JSON.parse() on the file" }
      ],
      correctIndex: 1,
      explanation: "Streams process files in sequential memory-efficient chunks (default 64KB), preventing out-of-memory crashes on large files."
    },
    {
      id: "q-node-03-8",
      prompt: "What core module provides operating system utilities like total memory, free memory, and CPU core count?",
      options: [
        { id: "a", label: "sys" },
        { id: "b", label: "os" },
        { id: "c", label: "hardware" },
        { id: "d", label: "cpu" }
      ],
      correctIndex: 1,
      explanation: "The 'os' module provides os.cpus(), os.freemem(), os.totalmem(), os.platform(), and other system inspection helpers."
    },
    {
      id: "q-node-03-9",
      prompt: "What is the return value of path.extname('invoice.final.pdf')?",
      options: [
        { id: "a", label: "'.final.pdf'" },
        { id: "b", label: "'.pdf'" },
        { id: "c", label: "'pdf'" },
        { id: "d", label: "'invoice'" }
      ],
      correctIndex: 1,
      explanation: "path.extname() returns the extension starting from the last occurrence of the '.' character, which is '.pdf'."
    },
    {
      id: "q-node-03-10",
      prompt: "If an error event ('error') is emitted on an EventEmitter without any listener registered for 'error', what happens?",
      options: [
        { id: "a", label: "Node silently ignores the error and continues running" },
        { id: "b", label: "Node throws an unhandled error exception that crashes the process" },
        { id: "c", label: "The error is logged to a hidden file" },
        { id: "d", label: "The event loop re-emits the event indefinitely" }
      ],
      correctIndex: 1,
      explanation: "EventEmitter has special handling for 'error' events: if no listener is registered, Node.js throws an unhandled error and crashes."
    }
  ]
};

const nodeLesson04: CurriculumItem = {
  id: "item-node-04-native-http-server",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-runtime",
  moduleTitle: "Module 1: Node.js Runtime & Event-Driven Architecture",
  modulePosition: 1,
  title: "04. Building HTTP Servers with Native 'http' Module",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lesson 04: Building HTTP Servers with Native 'http' Module",
  contentDescription: "Understand low-level HTTP web servers in Node.js: the request/response cycle, inspecting headers and URLs, streaming request body payloads, sending status codes, and why frameworks like Express evolved.",
  codeSnippet: {
    language: "javascript",
    code: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  const { method, url } = req;\n\n  if (url === '/api/health' && method === 'GET') {\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify({ status: 'ok', timestamp: new Date() }));\n    return;\n  }\n\n  res.writeHead(404, { 'Content-Type': 'text/plain' });\n  res.end('Route Not Found');\n});\n\nconst PORT = 3000;\nserver.listen(PORT, () => {\n  console.log(`Server listening on http://localhost:${PORT}`);\n});"
  },
  sections: [
    {
      title: "4.1 The Native HTTP Request & Response Streams",
      explanation: "When an HTTP request arrives at a Node.js server, Node instantiates two stream objects: `IncomingMessage` (`req`) as a readable stream of incoming data chunks, and `ServerResponse` (`res`) as a writable stream for outgoing headers and body.",
      bullets: [
        "req.method: The HTTP verb (GET, POST, PUT, DELETE, PATCH).",
        "req.url: The request path and query string (e.g. '/products?category=electronics').",
        "req.headers: Object containing incoming HTTP headers (lowercase keys).",
        "res.writeHead(statusCode, headersObject): Sends response status code and headers.",
        "res.end(data): Flushes the response payload and closes the TCP HTTP connection."
      ]
    },
    {
      title: "4.2 Parsing Request Bodies Without Frameworks",
      explanation: "Because `req` is a readable stream, POST/PUT JSON data does not arrive all at once. Developers must assemble chunks via stream events:",
      codeSnippet: {
        language: "javascript",
        code: "let body = '';\nreq.on('data', (chunk) => { body += chunk.toString(); });\nreq.on('end', () => {\n  try {\n    const parsed = JSON.parse(body);\n    console.log('Received payload:', parsed);\n  } catch (err) {\n    res.writeHead(400); res.end('Invalid JSON');\n  }\n});"
      }
    }
  ],
  questions: [
    {
      id: "q-node-04-1",
      prompt: "What core module in Node.js creates HTTP web servers?",
      options: [
        { id: "a", label: "net" },
        { id: "b", label: "http" },
        { id: "c", label: "url" },
        { id: "d", label: "web" }
      ],
      correctIndex: 1,
      explanation: "The built-in 'http' (and 'https') module provides createServer() and client request capabilities."
    },
    {
      id: "q-node-04-2",
      prompt: "What method must be called to send the final response payload and close the HTTP connection?",
      options: [
        { id: "a", label: "res.close()" },
        { id: "b", label: "res.end()" },
        { id: "c", label: "res.finish()" },
        { id: "d", label: "res.terminate()" }
      ],
      correctIndex: 1,
      explanation: "res.end() signals to the server that all response headers and body have been sent, completing the request."
    },
    {
      id: "q-node-04-3",
      prompt: "Why must you listen to 'data' and 'end' stream events when receiving a POST request in native Node.js?",
      options: [
        { id: "a", label: "Because the incoming request body arrives asynchronously in sequential data chunks" },
        { id: "b", label: "Because Node.js encrypts all incoming packets" },
        { id: "c", label: "To check if the user is authenticated" },
        { id: "d", label: "Because JSON cannot be sent over HTTP" }
      ],
      correctIndex: 0,
      explanation: "IncomingMessage is a readable stream; large payloads arrive split across multiple TCP packets emitted as 'data' events."
    },
    {
      id: "q-node-04-4",
      prompt: "What method specifies the port number a Node.js server binds and listens to for connections?",
      options: [
        { id: "a", label: "server.bind(port)" },
        { id: "b", label: "server.listen(port)" },
        { id: "c", label: "server.open(port)" },
        { id: "d", label: "server.start(port)" }
      ],
      correctIndex: 1,
      explanation: "server.listen(port, [callback]) binds the server to the specified TCP port and begins accepting requests."
    },
    {
      id: "q-node-04-5",
      prompt: "How are header names represented in the req.headers object?",
      options: [
        { id: "a", label: "UPPERCASE" },
        { id: "b", label: "CamelCase" },
        { id: "c", label: "All lowercase" },
        { id: "d", label: "PascalCase" }
      ],
      correctIndex: 2,
      explanation: "Node.js automatically normalizes all incoming HTTP header keys to lowercase (e.g. req.headers['content-type']) to simplify lookups."
    },
    {
      id: "q-node-04-6",
      prompt: "What HTTP status code indicates a requested resource was not found on the server?",
      options: [
        { id: "a", label: "200" },
        { id: "b", label: "301" },
        { id: "c", label: "404" },
        { id: "d", label: "500" }
      ],
      correctIndex: 2,
      explanation: "404 Not Found is the standard HTTP status code indicating the server cannot find the requested URL path."
    },
    {
      id: "q-node-04-7",
      prompt: "What happens if a developer forgets to call res.end() or res.send() in a request handler?",
      options: [
        { id: "a", label: "The browser immediately renders an error" },
        { id: "b", label: "The client browser will hang and spin indefinitely until hitting a timeout" },
        { id: "c", label: "Node.js auto-closes the connection after 1 millisecond" },
        { id: "d", label: "The server restarts automatically" }
      ],
      correctIndex: 1,
      explanation: "If res.end() is not called, the TCP connection remains open and the client browser will keep waiting until it times out."
    },
    {
      id: "q-node-04-8",
      prompt: "Which header informs the client browser that the response body contains JSON formatted text?",
      options: [
        { id: "a", label: "'Content-Type': 'text/plain'" },
        { id: "b", label: "'Content-Type': 'application/json'" },
        { id: "c", label: "'Accept': 'application/json'" },
        { id: "d", label: "'Format': 'json'" }
      ],
      correctIndex: 1,
      explanation: "'Content-Type': 'application/json' instructs client parsers and browsers to decode the response as JSON data."
    },
    {
      id: "q-node-04-9",
      prompt: "What is the primary drawback of building large web applications using only native Node.js 'http'?",
      options: [
        { id: "a", label: "Native http cannot handle HTTPS" },
        { id: "b", label: "Routing, body parsing, static file serving, and middleware must be manually coded from scratch" },
        { id: "c", label: "Native http is slower than Express" },
        { id: "d", label: "Native http only supports GET requests" }
      ],
      correctIndex: 1,
      explanation: "Native http is barebones; developers must write complex boilerplate for URL parameter extraction, body parsing, and route management."
    },
    {
      id: "q-node-04-10",
      prompt: "What does res.writeHead(201) indicate to an API client?",
      options: [
        { id: "a", label: "OK request completed" },
        { id: "b", label: "Created — a new resource was successfully created" },
        { id: "c", label: "Accepted but not yet processed" },
        { id: "d", label: "Bad Request" }
      ],
      correctIndex: 1,
      explanation: "HTTP 201 Created signifies that the request succeeded and led to the creation of a new resource on the server."
    }
  ]
};

// Module 1 Quiz & Assessment
const nodeModule01Quiz: CurriculumItem = {
  id: "item-node-m1-quiz",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-runtime",
  moduleTitle: "Module 1: Node.js Runtime & Event-Driven Architecture",
  modulePosition: 1,
  title: "Module 1 MCQs: Node.js Runtime, Event Loop & Core Modules",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 1 Assessment: Node.js Architecture Knowledge Check",
  contentDescription: "Evaluate your understanding of the V8 engine, libuv event loop phases, microtask queues, CommonJS vs ESM, path handling, streams, and native HTTP servers.",
  questions: [
    ...nodeLesson01.questions!.slice(0, 4),
    ...nodeLesson02.questions!.slice(0, 4),
    ...nodeLesson03.questions!.slice(0, 4),
    ...nodeLesson04.questions!.slice(0, 3)
  ]
};

const nodeModule01Assessment: CurriculumItem = {
  id: "item-node-m1-assessment",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-runtime",
  moduleTitle: "Module 1: Node.js Runtime & Event-Driven Architecture",
  modulePosition: 1,
  title: "Module 1 Assessment: Asynchronous Log File Processor & Stream Pipeline",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 1 Practical Challenge: High-Volume Log Stream Processor",
  contentDescription: "Build a Node.js CLI script using fs/promises, path, and EventEmitter to parse multi-megabyte access logs, track 4xx/5xx errors, and output structured summary metrics.",
  assignmentPrompt: {
    instructions: "Write a production-ready Node.js script `logProcessor.js` using asynchronous I/O and events:\n1. Use path.join to resolve input log file paths safely.\n2. Stream or read log data asynchronously line by line.\n3. Implement a custom MetricsEmitter that emits 'error:500' and 'traffic:high' events.\n4. Write the final calculated error report to an output JSON file using fs/promises.",
    deliverables: [
      "Modular JavaScript code avoiding synchronous blocking fs methods",
      "Custom EventEmitter subclass with listeners for critical server events",
      "Error handling ensuring graceful recovery if the log file path is invalid"
    ]
  }
};

const nodeModule01: CurriculumSubModule = {
  id: "module-node-01-runtime",
  subCourseId: "mod-nodejs-apis",
  title: "Module 1: Node.js Runtime & Event-Driven Architecture",
  description: "Explore the internals of Node.js: V8 engine, libuv event loop, asynchronous non-blocking I/O, module systems (CJS vs ESM), core fs/path modules, and native HTTP servers.",
  position: 1,
  duration: "2 hours, 40 mins",
  lessons: [nodeLesson01, nodeLesson02, nodeLesson03, nodeLesson04],
  moduleQuiz: nodeModule01Quiz,
  moduleAssessment: nodeModule01Assessment,
  items: [nodeLesson01, nodeLesson02, nodeLesson03, nodeLesson04, nodeModule01Quiz, nodeModule01Assessment]
};

// =========================================================================
// MODULE 2: EXPRESS.JS FRAMEWORK & RESTFUL API ARCHITECTURE
// =========================================================================

const nodeLesson05: CurriculumItem = {
  id: "item-node-05-express-setup-routing",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Module 2: Express.js Framework & RESTful APIs",
  modulePosition: 2,
  title: "05. Express Setup, Application Structure & Routing Essentials",
  duration: "30 mins",
  type: "cheatsheet",
  position: 7,
  contentHeading: "Lesson 05: Express Setup, Application Structure & Routing Essentials",
  contentDescription: "Get started with Express.js: creating application instances, defining HTTP route handlers, path parameters, query parameters, and organizing route files with express.Router.",
  codeSnippet: {
    language: "javascript",
    code: "const express = require('express');\nconst app = express();\n\n// 1. Built-in JSON body parser\napp.use(express.json());\n\n// 2. Route with Route Parameters & Query Strings\napp.get('/api/users/:userId', (req, res) => {\n  const { userId } = req.params; // Route parameter\n  const { includeProfile } = req.query; // Query parameter (?includeProfile=true)\n  res.json({ userId, includeProfile: includeProfile === 'true' });\n});\n\n// 3. Modular Router\nconst productRouter = express.Router();\nproductRouter.get('/', (req, res) => res.json([{ id: 1, name: 'MacBook' }]));\napp.use('/api/products', productRouter);\n\napp.listen(4000, () => console.log('Express running on port 4000'));"
  },
  sections: [
    {
      title: "5.1 Why Express.js?",
      explanation: "Express is the de facto standard web application framework for Node.js. It provides a thin, unopinionated layer on top of Node's native HTTP module, adding dynamic route pattern matching, nested router trees, middleware pipelines, and convenient helper methods like `res.json()`, `res.status()`, and `res.send()`.",
      bullets: [
        "Minimalist: Fast, lightweight, and gives developers full architectural freedom.",
        "Routing Engine: Supports route parameters (`:id`), wildcards, and regular expressions.",
        "express.Router: Encapsulates routes into modular, testable mini-applications."
      ]
    },
    {
      title: "5.2 Route Parameters vs Query Parameters",
      explanation: "Understanding how clients pass identifiers and filters is foundational in REST API design:",
      table: {
        headers: ["Type", "Example URL", "Access in Express", "Typical Use Case"],
        rows: [
          ["Route Param", "/api/courses/42", "req.params.id", "Identifying a specific individual resource"],
          ["Query String", "/api/courses?sort=asc&page=2", "req.query.sort", "Filtering, sorting, searching, pagination"],
          ["Request Body", "POST /api/courses { \"title\": ... }", "req.body", "Submitting rich JSON payloads to create/update"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-node-05-1",
      prompt: "What is Express.js?",
      options: [
        { id: "a", label: "A relational database management system" },
        { id: "b", label: "A fast, unopinionated minimalist web framework for Node.js" },
        { id: "c", label: "A client-side frontend framework like Vue" },
        { id: "d", label: "A compiler for TypeScript" }
      ],
      correctIndex: 1,
      explanation: "Express.js is the most popular server-side web framework for Node.js, providing routing and middleware capabilities."
    },
    {
      id: "q-node-05-2",
      prompt: "Given route definition app.get('/users/:id', ...), how do you extract the 'id' value in Express?",
      options: [
        { id: "a", label: "req.query.id" },
        { id: "b", label: "req.params.id" },
        { id: "c", label: "req.body.id" },
        { id: "d", label: "req.headers.id" }
      ],
      correctIndex: 1,
      explanation: "Named route segments starting with a colon (':') are populated into the 'req.params' object."
    },
    {
      id: "q-node-05-3",
      prompt: "How do you access query parameters like '?sort=price&limit=10' in Express?",
      options: [
        { id: "a", label: "req.params" },
        { id: "b", label: "req.query" },
        { id: "c", label: "req.search" },
        { id: "d", label: "req.urlParams" }
      ],
      correctIndex: 1,
      explanation: "Express automatically parses URL query strings into the 'req.query' object."
    },
    {
      id: "q-node-05-4",
      prompt: "Which Express method sends a JSON response and sets Content-Type to application/json automatically?",
      options: [
        { id: "a", label: "res.write(data)" },
        { id: "b", label: "res.json(data)" },
        { id: "c", label: "res.serialize(data)" },
        { id: "d", label: "res.render(data)" }
      ],
      correctIndex: 1,
      explanation: "res.json() formats objects into JSON strings and sets the 'Content-Type: application/json' header."
    },
    {
      id: "q-node-05-5",
      prompt: "What utility allows splitting route definitions across multiple files into modular mini-routers?",
      options: [
        { id: "a", label: "express.Module()" },
        { id: "b", label: "express.Router()" },
        { id: "c", label: "express.Controller()" },
        { id: "d", label: "express.RouteSplitter()" }
      ],
      correctIndex: 1,
      explanation: "express.Router() creates isolated router instances that can be mounted into the main application via app.use()."
    },
    {
      id: "q-node-05-6",
      prompt: "What does chainable method syntax like res.status(201).json({ success: true }) do?",
      options: [
        { id: "a", label: "Throws an error if the status is not 200" },
        { id: "b", label: "Sets the HTTP response status code to 201 Created and sends the JSON payload" },
        { id: "c", label: "Retries the request 201 times" },
        { id: "d", label: "Logs the status to the terminal" }
      ],
      correctIndex: 1,
      explanation: "res.status() returns the response object, allowing immediate chaining with .json() or .send()."
    },
    {
      id: "q-node-05-7",
      prompt: "What built-in Express middleware must be applied before route handlers to populate req.body from incoming JSON?",
      options: [
        { id: "a", label: "app.use(express.static())" },
        { id: "b", label: "app.use(express.json())" },
        { id: "c", label: "app.use(express.urlencoded())" },
        { id: "d", label: "app.use(express.parse())" }
      ],
      correctIndex: 1,
      explanation: "express.json() parses incoming HTTP request bodies with JSON payloads into the req.body property."
    },
    {
      id: "q-node-05-8",
      prompt: "Which HTTP method should be defined in Express to update an existing user's record partially?",
      options: [
        { id: "a", label: "app.get" },
        { id: "b", label: "app.post" },
        { id: "c", label: "app.patch" },
        { id: "d", label: "app.delete" }
      ],
      correctIndex: 2,
      explanation: "HTTP PATCH is used for partial updates to an existing resource. (PUT is conventionally used for full replacements)."
    },
    {
      id: "q-node-05-9",
      prompt: "How do you serve static assets (HTML, images, CSS) from a 'public' directory in Express?",
      options: [
        { id: "a", label: "app.use(express.static('public'))" },
        { id: "b", label: "app.serve('public')" },
        { id: "c", label: "app.get('*', express.files)" },
        { id: "d", label: "express.publicFolder()" }
      ],
      correctIndex: 0,
      explanation: "express.static(root) is the built-in middleware function in Express that serves static asset files directly."
    },
    {
      id: "q-node-05-10",
      prompt: "What does the second argument in app.listen(3000, callback) do?",
      options: [
        { id: "a", label: "Runs every time an HTTP request arrives" },
        { id: "b", label: "Runs once when the server has successfully bound to the port and is ready to accept connections" },
        { id: "c", label: "Defines error handling rules" },
        { id: "d", label: "Terminates the server" }
      ],
      correctIndex: 1,
      explanation: "The callback passed to listen() is invoked once the server starts listening on the specified port."
    }
  ]
};

const nodeLesson06: CurriculumItem = {
  id: "item-node-06-middleware-pipeline",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Module 2: Express.js Framework & RESTful APIs",
  modulePosition: 2,
  title: "06. Middleware Pipeline: Built-in, Third-Party & Custom Middleware",
  duration: "30 mins",
  type: "cheatsheet",
  position: 8,
  contentHeading: "Lesson 06: Middleware Pipeline: Built-in, Third-Party & Custom Middleware",
  contentDescription: "Understand the core concept of Express: middleware functions. Learn how the request pipeline works, the role of next(), building custom logger/auth middleware, and integrating popular packages like cors, morgan, and helmet.",
  codeSnippet: {
    language: "javascript",
    code: "const express = require('express');\nconst app = express();\n\n// Custom Request Logger Middleware\nconst requestLogger = (req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);\n  next(); // Passes control to the next middleware in line\n};\n\n// Custom Authentication Guard Middleware\nconst requireApiKey = (req, res, next) => {\n  const apiKey = req.headers['x-api-key'];\n  if (apiKey !== 'secret-key-123') {\n    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });\n  }\n  next(); // Key is valid, proceed\n};\n\napp.use(requestLogger); // Global middleware\napp.get('/api/protected', requireApiKey, (req, res) => {\n  res.json({ secretData: 'Confidential system metrics' });\n});"
  },
  sections: [
    {
      title: "6.1 What is Express Middleware?",
      explanation: "Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application's request-response cycle. They can execute any code, make modifications to `req` and `res`, end the request-response cycle, or call `next()` to invoke the next middleware function in the stack.",
      bullets: [
        "Order of Execution Matters: Middleware executes in the exact sequence it is mounted using app.use().",
        "next(): If a middleware does not terminate the request with res.send/json, it MUST call next() or the request will hang.",
        "Error Middleware: Middleware with 4 parameters `(err, req, res, next)` is treated by Express as an error handler."
      ],
      diagram: "[INCOMING REQUEST]\n        |\n        v\n[1. Global Logger (req, res, next)] ---- calls next() ---->\n        |\n        v\n[2. CORS / Body Parser (req, res, next)] -- calls next() -->\n        |\n        v\n[3. Auth Guard (checks JWT / API Key)] ---- calls next() ---->\n        |\n        v\n[4. Route Controller (res.json(...))] -----> [OUTGOING RESPONSE]"
    },
    {
      title: "6.2 Essential Third-Party Middlewares",
      explanation: "Production Express applications combine trusted community middlewares to secure and observe applications:",
      table: {
        headers: ["Middleware Package", "Command", "Role / Purpose"],
        rows: [
          ["cors", "npm install cors", "Enables Cross-Origin Resource Sharing for browser clients"],
          ["helmet", "npm install helmet", "Secures Express apps by setting various HTTP security headers"],
          ["morgan", "npm install morgan", "HTTP request logger with predefined formats (dev, combined)"],
          ["express-rate-limit", "npm install express-rate-limit", "Protects against brute force and DDoS attacks by throttling requests"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-node-06-1",
      prompt: "What are the three standard arguments passed to an Express middleware function?",
      options: [
        { id: "a", label: "request, response, error" },
        { id: "b", label: "req, res, next" },
        { id: "c", label: "context, event, callback" },
        { id: "d", label: "app, server, router" }
      ],
      correctIndex: 1,
      explanation: "Standard middleware accepts '(req, res, next)' representing the HTTP request, response, and next pipeline handler."
    },
    {
      id: "q-node-06-2",
      prompt: "What happens if a custom middleware function neither sends a response (res.json) nor calls next()?",
      options: [
        { id: "a", label: "Express defaults to a 200 OK" },
        { id: "b", label: "The request hangs indefinitely and the client browser will eventually time out" },
        { id: "c", label: "Express skips to the next route automatically" },
        { id: "d", label: "The server throws a SyntaxError" }
      ],
      correctIndex: 1,
      explanation: "If next() is never invoked and no response is sent, execution stops in that middleware, leaving the request unresolved until a timeout occurs."
    },
    {
      id: "q-node-06-3",
      prompt: "How does Express distinguish an Error Handling Middleware from normal middleware?",
      options: [
        { id: "a", label: "By setting app.useError()" },
        { id: "b", label: "By defining an arity of 4 parameters: (err, req, res, next)" },
        { id: "c", label: "By placing it at the very top of the file" },
        { id: "d", label: "By naming the function 'catchError'" }
      ],
      correctIndex: 1,
      explanation: "Express inspects the function parameter count (Function.length): exactly 4 parameters '(err, req, res, next)' designates it as an error handler."
    },
    {
      id: "q-node-06-4",
      prompt: "Which middleware package sets secure HTTP response headers (like X-Content-Type-Options, Strict-Transport-Security)?",
      options: [
        { id: "a", label: "morgan" },
        { id: "b", label: "helmet" },
        { id: "c", label: "cors" },
        { id: "d", label: "dotenv" }
      ],
      correctIndex: 1,
      explanation: "Helmet helps secure Express applications by setting 15+ modern HTTP security headers automatically."
    },
    {
      id: "q-node-06-5",
      prompt: "Why is the cors package necessary when a React frontend at localhost:5173 calls an Express backend at localhost:4000?",
      options: [
        { id: "a", label: "React cannot send JSON without cors" },
        { id: "b", label: "Web browsers enforce the Same-Origin Policy and block cross-port API calls unless permitted by CORS headers" },
        { id: "c", label: "Port 4000 is reserved for databases" },
        { id: "d", label: "Express crashes if accessed from another port" }
      ],
      correctIndex: 1,
      explanation: "Browsers prevent cross-origin requests by default. The 'cors' middleware adds Access-Control-Allow-Origin headers so frontend apps can communicate with the API."
    },
    {
      id: "q-node-06-6",
      prompt: "Can a middleware function be applied to a single specific route rather than globally to all routes?",
      options: [
        { id: "a", label: "No, middleware must always be global via app.use()" },
        { id: "b", label: "Yes, by passing it as an argument before the route handler: app.get('/path', middleware, handler)" },
        { id: "c", label: "Only if configured in package.json" },
        { id: "d", label: "Only in ES Modules" }
      ],
      correctIndex: 1,
      explanation: "Route-specific middleware is passed as an intermediate argument (or array of arguments) in the route definition."
    },
    {
      id: "q-node-06-7",
      prompt: "What does calling next(new Error('Database unavailable')) do in Express?",
      options: [
        { id: "a", label: "Calls the next regular middleware and passes the error string" },
        { id: "b", label: "Bypasses all remaining regular middlewares and jumps directly to the first Error Handling Middleware" },
        { id: "c", label: "Kills the Node.js server instantly" },
        { id: "d", label: "Logs the error to the console and continues" }
      ],
      correctIndex: 1,
      explanation: "Passing any truthy argument into next() (except the string 'route') informs Express that an error occurred, skipping to the error handling pipeline."
    },
    {
      id: "q-node-06-8",
      prompt: "How can a middleware pass authenticated user data down to subsequent route handlers?",
      options: [
        { id: "a", label: "By saving it to a global variable in the window object" },
        { id: "b", label: "By attaching it to the request object, e.g. req.user = decodedToken" },
        { id: "c", label: "By sending an HTTP cookie to the server" },
        { id: "d", label: "By modifying process.env" }
      ],
      correctIndex: 1,
      explanation: "Attaching custom properties to the 'req' object (e.g. req.user, req.correlationId) is the canonical pattern for passing data through middleware."
    },
    {
      id: "q-node-06-9",
      prompt: "What is morgan commonly used for in Express applications?",
      options: [
        { id: "a", label: "Database object-relational mapping" },
        { id: "b", label: "Logging HTTP request details (method, status, response time) to stdout" },
        { id: "c", label: "Generating fake mock data" },
        { id: "d", label: "Hashing passwords with bcrypt" }
      ],
      correctIndex: 1,
      explanation: "Morgan is an HTTP request logging middleware for Node.js, providing developer-friendly log outputs for every received request."
    },
    {
      id: "q-node-06-10",
      prompt: "In what order does Express execute middlewares registered via app.use()?",
      options: [
        { id: "a", label: "In alphabetical order of function names" },
        { id: "b", label: "In the exact chronological order in which app.use() was registered in code" },
        { id: "c", label: "Asynchronous order based on network speed" },
        { id: "d", label: "Routes execute before any middleware" }
      ],
      correctIndex: 1,
      explanation: "Express maintains an internal pipeline stack and processes middlewares sequentially in the exact order they are declared in code."
    }
  ]
};

const nodeLesson07: CurriculumItem = {
  id: "item-node-07-rest-api-design",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Module 2: Express.js Framework & RESTful APIs",
  modulePosition: 2,
  title: "07. REST API Architecture, HTTP Verbs & Status Codes",
  duration: "35 mins",
  type: "cheatsheet",
  position: 9,
  contentHeading: "Lesson 07: REST API Architecture, HTTP Verbs & Status Codes",
  contentDescription: "Design scalable RESTful APIs: resource-oriented URI naming conventions, mapping HTTP methods (GET, POST, PUT, PATCH, DELETE) to CRUD operations, idempotent operations, and choosing exact HTTP status codes.",
  codeSnippet: {
    language: "javascript",
    code: "// RESTful Course Resource API\nconst express = require('express');\nconst router = express.Router();\n\nlet courses = [\n  { id: 1, title: 'HTML Foundations', enrolled: 120 },\n  { id: 2, title: 'Modern JavaScript', enrolled: 250 }\n];\n\n// 1. GET /api/courses - Read Collection\nrouter.get('/', (req, res) => res.json(courses));\n\n// 2. GET /api/courses/:id - Read Individual\nrouter.get('/:id', (req, res) => {\n  const course = courses.find(c => c.id === parseInt(req.params.id));\n  if (!course) return res.status(404).json({ error: 'Course not found' });\n  res.json(course);\n});\n\n// 3. POST /api/courses - Create Resource\nrouter.post('/', (req, res) => {\n  const newCourse = { id: Date.now(), ...req.body };\n  courses.push(newCourse);\n  res.status(201).json(newCourse);\n});\n\n// 4. DELETE /api/courses/:id - Delete Resource\nrouter.delete('/:id', (req, res) => {\n  courses = courses.filter(c => c.id !== parseInt(req.params.id));\n  res.status(204).send(); // 204 No Content\n});"
  },
  sections: [
    {
      title: "7.1 Principles of RESTful API Design",
      explanation: "Representational State Transfer (REST) is an architectural style for networked applications. A REST API treats server data as resources identified by clean URIs (nouns, not verbs), manipulated using standard HTTP verbs.",
      bullets: [
        "Use Nouns, Not Verbs: Use `/api/users`, NOT `/api/getUsers` or `/api/deleteUser`.",
        "Plural Resource Collections: Standardize on plural nouns (e.g. `/api/articles`, `/api/orders`).",
        "Hierarchical Relationships: Nested relationships follow logical sub-paths (e.g. `/api/users/5/orders`).",
        "Stateless: Each request contains all information necessary for the server to process it."
      ]
    },
    {
      title: "7.2 Standard HTTP Verbs & Idempotence",
      explanation: "An HTTP method is idempotent if making the same request multiple times produces the identical server state as making it once:",
      table: {
        headers: ["HTTP Method", "CRUD Operation", "Idempotent?", "Typical Success Status"],
        rows: [
          ["GET", "Read resource or collection", "Yes", "200 OK"],
          ["POST", "Create new resource", "No", "201 Created"],
          ["PUT", "Replace resource completely", "Yes", "200 OK / 204 No Content"],
          ["PATCH", "Partial update of resource fields", "No (generally)", "200 OK"],
          ["DELETE", "Remove resource", "Yes", "200 OK / 204 No Content"]
        ]
      }
    },
    {
      title: "7.3 HTTP Status Codes Reference Categories",
      explanation: "Always communicate precise outcomes to clients via standard 3-digit HTTP status codes:",
      bullets: [
        "2xx Success: 200 (OK), 201 (Created), 204 (No Content).",
        "3xx Redirection: 301 (Moved Permanently), 304 (Not Modified / Cached).",
        "4xx Client Errors: 400 (Bad Request / Validation Error), 401 (Unauthorized / Unauthenticated), 403 (Forbidden / Insufficient Permissions), 404 (Not Found), 409 (Conflict).",
        "5xx Server Errors: 500 (Internal Server Error), 502 (Bad Gateway), 503 (Service Unavailable)."
      ]
    }
  ],
  questions: [
    {
      id: "q-node-07-1",
      prompt: "According to REST best practices, which URI naming format should be used to retrieve all articles?",
      options: [
        { id: "a", label: "GET /api/getAllArticles" },
        { id: "b", label: "GET /api/articles" },
        { id: "c", label: "POST /api/fetch_articles" },
        { id: "d", label: "GET /api/articles/show" }
      ],
      correctIndex: 1,
      explanation: "REST URIs should use plural nouns representing resources without including action verbs in the path."
    },
    {
      id: "q-node-07-2",
      prompt: "What does it mean for an HTTP method to be 'Idempotent'?",
      options: [
        { id: "a", label: "It executes faster than 1 millisecond" },
        { id: "b", label: "Executing the exact same request multiple times results in the same server state as executing it once" },
        { id: "c", label: "It requires no authentication headers" },
        { id: "d", label: "It cannot be cached by CDNs" }
      ],
      correctIndex: 1,
      explanation: "Idempotence guarantees that repeated identical requests produce the same end result on the server (e.g. GET, PUT, DELETE)."
    },
    {
      id: "q-node-07-3",
      prompt: "Which status code should be returned after successfully creating a new record via POST?",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "201 Created" },
        { id: "c", label: "204 No Content" },
        { id: "d", label: "202 Accepted" }
      ],
      correctIndex: 1,
      explanation: "201 Created explicitly indicates that the request succeeded and resulted in a new resource being created."
    },
    {
      id: "q-node-07-4",
      prompt: "What is the difference between 401 Unauthorized and 403 Forbidden?",
      options: [
        { id: "a", label: "401 means server down; 403 means client down" },
        { id: "b", label: "401 means unauthenticated (missing/invalid credentials); 403 means authenticated but lacking permission to access" },
        { id: "c", label: "401 is for GET requests; 403 is for POST requests" },
        { id: "d", label: "There is no difference" }
      ],
      correctIndex: 1,
      explanation: "401 Unauthorized means the user identity is unknown/unverified. 403 Forbidden means the identity is known, but access rights are denied."
    },
    {
      id: "q-node-07-5",
      prompt: "Which status code is standard for a DELETE request that succeeds and returns no body payload?",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "204 No Content" },
        { id: "c", label: "404 Not Found" },
        { id: "d", label: "205 Reset" }
      ],
      correctIndex: 1,
      explanation: "204 No Content confirms the operation succeeded while signaling that the response contains an empty body."
    },
    {
      id: "q-node-07-6",
      prompt: "What is the difference between PUT and PATCH methods in REST?",
      options: [
        { id: "a", label: "PUT is for creating; PATCH is for deleting" },
        { id: "b", label: "PUT replaces the entire resource document; PATCH partially updates specific fields" },
        { id: "c", label: "PUT is asynchronous; PATCH is synchronous" },
        { id: "d", label: "PUT cannot accept JSON" }
      ],
      correctIndex: 1,
      explanation: "In RESTful standards, PUT replaces the complete resource entity with the new payload, whereas PATCH updates only the supplied fields."
    },
    {
      id: "q-node-07-7",
      prompt: "What status code should an API return when a client sends invalid JSON or fails required field validation?",
      options: [
        { id: "a", label: "500 Internal Server Error" },
        { id: "b", label: "400 Bad Request" },
        { id: "c", label: "404 Not Found" },
        { id: "d", label: "403 Forbidden" }
      ],
      correctIndex: 1,
      explanation: "400 Bad Request indicates that the server cannot process the request due to client error (malformed syntax, missing fields, validation failures)."
    },
    {
      id: "q-node-07-8",
      prompt: "How should a nested RESTful sub-resource like comments for a specific post be structured in URL path?",
      options: [
        { id: "a", label: "GET /api/comments?post=10" },
        { id: "b", label: "GET /api/posts/10/comments" },
        { id: "c", label: "GET /api/fetchPostCommentsById/10" },
        { id: "d", label: "POST /api/posts_comments/10" }
      ],
      correctIndex: 1,
      explanation: "Hierarchical sub-resources in REST follow the parent-child path format: '/parentCollection/:parentId/childCollection'."
    },
    {
      id: "q-node-07-9",
      prompt: "What HTTP status code represents a conflict, such as attempting to register with an email that is already taken?",
      options: [
        { id: "a", label: "400 Bad Request" },
        { id: "b", label: "409 Conflict" },
        { id: "c", label: "422 Unprocessable Entity" },
        { id: "d", label: "503 Service Unavailable" }
      ],
      correctIndex: 1,
      explanation: "409 Conflict indicates the request could not be completed due to a conflict with current server state (e.g. duplicate unique key)."
    },
    {
      id: "q-node-07-10",
      prompt: "Why must API endpoints never expose sensitive database internal errors directly in production responses?",
      options: [
        { id: "a", label: "Because JSON cannot stringify SQL errors" },
        { id: "b", label: "To prevent information disclosure vulnerabilities that reveal database table names, SQL queries, or stack traces to attackers" },
        { id: "c", label: "Because browsers reject 500 status codes" },
        { id: "d", label: "It slows down CPU caching" }
      ],
      correctIndex: 1,
      explanation: "Leaking raw database error messages or internal stack traces aids malicious actors in SQL injection or infrastructure reconnaissance."
    }
  ]
};

const nodeLesson08: CurriculumItem = {
  id: "item-node-08-validation-error-handling",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Module 2: Express.js Framework & RESTful APIs",
  modulePosition: 2,
  title: "08. Input Validation, Centralized Error Handling & Async Middleware",
  duration: "35 mins",
  type: "cheatsheet",
  position: 10,
  contentHeading: "Lesson 08: Input Validation, Centralized Error Handling & Async Middleware",
  contentDescription: "Build robust production Express APIs: schema validation with Zod or Joi, catching unhandled promise rejections with express-async-errors or async wrappers, and writing centralized error handling middleware.",
  codeSnippet: {
    language: "javascript",
    code: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\n// 1. Async Handler Wrapper (avoids try/catch in every route)\nconst asyncHandler = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\n// 2. Route with Validation & Async Handler\napp.post('/api/users', asyncHandler(async (req, res) => {\n  const { email, age } = req.body;\n  if (!email || !email.includes('@')) {\n    const err = new Error('Invalid email address format');\n    err.statusCode = 400;\n    throw err;\n  }\n  res.status(201).json({ id: 1, email, age });\n}));\n\n// 3. Centralized Global Error Handler Middleware (MUST be at the very bottom)\napp.use((err, req, res, next) => {\n  const statusCode = err.statusCode || 500;\n  res.status(statusCode).json({\n    success: false,\n    error: err.message || 'Internal Server Error',\n    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined\n  });\n});"
  },
  sections: [
    {
      title: "8.1 Centralized Error Handling Architecture",
      explanation: "Rather than writing redundant try/catch blocks across dozens of controllers, modern Express applications delegate errors to a single centralized error handling middleware placed at the very bottom of the middleware stack.",
      bullets: [
        "Consistent API Responses: Ensures every error returned to the client follows an identical JSON shape (`{ success: false, error: '...' }`).",
        "Environment Guarding: Exposes stack traces in development mode for easy debugging while hiding sensitive stack traces in production.",
        "Custom AppError Class: Extending JavaScript's native Error class with `statusCode` and `isOperational` properties enables fine-grained status code assignment."
      ]
    },
    {
      title: "8.2 Handling Asynchronous Errors in Express",
      explanation: "Prior to Express 5, unhandled promise rejections inside `async` route handlers bypassed the normal error pipeline and caused unhandled promise rejection warnings or crashes. Wrapping async handlers with a helper utility (`asyncHandler`) catches rejections and automatically passes them to `next(err)`.",
      codeSnippet: {
        language: "javascript",
        code: "// Custom Application Error Class\nclass AppError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.statusCode = statusCode;\n    this.isOperational = true;\n    Error.captureStackTrace(this, this.constructor);\n  }\n}"
      }
    }
  ],
  questions: [
    {
      id: "q-node-08-1",
      prompt: "Where must the centralized error handling middleware (err, req, res, next) be mounted in an Express app?",
      options: [
        { id: "a", label: "At the very top, before all routes" },
        { id: "b", label: "At the very bottom, after all route and middleware definitions" },
        { id: "c", label: "Inside each individual route controller" },
        { id: "d", label: "In the package.json scripts" }
      ],
      correctIndex: 1,
      explanation: "Error handlers must be mounted last because Express passes errors down the stack. Any routes declared after an error handler cannot reach it."
    },
    {
      id: "q-node-08-2",
      prompt: "What happens in Express 4 if an async route handler throws an error without a try/catch or async handler wrapper?",
      options: [
        { id: "a", label: "Express catches it and returns 400" },
        { id: "b", label: "An unhandled promise rejection occurs and the client request hangs indefinitely" },
        { id: "c", label: "The database rolls back automatically" },
        { id: "d", label: "Node converts the error to 200 OK" }
      ],
      correctIndex: 1,
      explanation: "In Express 4, synchronous errors are caught automatically, but asynchronous promise rejections require explicit catch(next) or wrappers."
    },
    {
      id: "q-node-08-3",
      prompt: "What is the purpose of an asyncHandler wrapper function in Express?",
      options: [
        { id: "a", label: "To convert sync code into multi-threaded code" },
        { id: "b", label: "To automatically catch rejected promises in async route handlers and forward them to next(err)" },
        { id: "c", label: "To speed up database connections" },
        { id: "d", label: "To validate JSON bodies" }
      ],
      correctIndex: 1,
      explanation: "asyncHandler wraps an async route handler and calls '.catch(next)' on the returned promise, eliminating redundant try/catch blocks."
    },
    {
      id: "q-node-08-4",
      prompt: "Why should error stack traces (err.stack) be hidden in production environments?",
      options: [
        { id: "a", label: "Because production servers do not generate stack traces" },
        { id: "b", label: "To prevent exposing server filesystem paths, database queries, and internal code details to external users" },
        { id: "c", label: "Because browsers cannot parse stack traces" },
        { id: "d", label: "It violates semantic versioning" }
      ],
      correctIndex: 1,
      explanation: "Exposing stack traces leaks file paths, dependency versions, and internal server structure, creating security vulnerabilities."
    },
    {
      id: "q-node-08-5",
      prompt: "Which modern TypeScript/JavaScript library is widely used for declarative schema validation of request bodies?",
      options: [
        { id: "a", label: "Zod" },
        { id: "b", label: "Lodash" },
        { id: "c", label: "Axios" },
        { id: "d", label: "Chai" }
      ],
      correctIndex: 0,
      explanation: "Zod (and Joi) provides schema declaration and type inference for robust input validation."
    },
    {
      id: "q-node-08-6",
      prompt: "How can a custom error class distinguish expected client errors (like invalid input) from unexpected server bugs?",
      options: [
        { id: "a", label: "By setting an 'isOperational: true' property on expected application errors" },
        { id: "b", label: "By checking if the error message is in uppercase" },
        { id: "c", label: "Operational errors cannot be distinguished" },
        { id: "d", label: "By checking process.platform" }
      ],
      correctIndex: 0,
      explanation: "Setting 'isOperational: true' on known application errors allows error handlers to differentiate operational failures from programming bugs."
    },
    {
      id: "q-node-08-7",
      prompt: "What HTTP status code should be used when a requested email already exists in a registration route?",
      options: [
        { id: "a", label: "200" },
        { id: "b", label: "409" },
        { id: "c", label: "404" },
        { id: "d", label: "502" }
      ],
      correctIndex: 1,
      explanation: "409 Conflict represents a state conflict, such as a duplicate unique key during user registration."
    },
    {
      id: "q-node-08-8",
      prompt: "If an unhandled exception or unhandled promise rejection occurs at the process level, what event can catch it?",
      options: [
        { id: "a", label: "process.on('uncaughtException') and process.on('unhandledRejection')" },
        { id: "b", label: "window.onerror" },
        { id: "c", label: "fs.on('error')" },
        { id: "d", label: "app.on('fatal')" }
      ],
      correctIndex: 0,
      explanation: "The global process object emits 'uncaughtException' and 'unhandledRejection' for unexpected top-level runtime crashes."
    },
    {
      id: "q-node-08-9",
      prompt: "What is the recommended response format for error messages across an entire REST API?",
      options: [
        { id: "a", label: "Plain text strings only" },
        { id: "b", label: "Consistent JSON structure, e.g. { success: false, error: '...', details?: [...] }" },
        { id: "c", label: "Raw HTML error pages" },
        { id: "d", label: "XML documents" }
      ],
      correctIndex: 1,
      explanation: "A predictable, uniform JSON error structure allows frontend clients to parse and display validation messages reliably."
    },
    {
      id: "q-node-08-10",
      prompt: "How do you trigger the global error handler from inside a route handler when an error condition occurs?",
      options: [
        { id: "a", label: "return res.json({ error })" },
        { id: "b", label: "next(new AppError('Invalid input', 400))" },
        { id: "c", label: "process.exit(1)" },
        { id: "d", label: "console.error(err)" }
      ],
      correctIndex: 1,
      explanation: "Passing an error instance to next(err) instructs Express to skip all standard handlers and jump directly to error handling middleware."
    }
  ]
};

// Module 2 Quiz & Assessment
const nodeModule02Quiz: CurriculumItem = {
  id: "item-node-m2-quiz",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Module 2: Express.js Framework & RESTful APIs",
  modulePosition: 2,
  title: "Module 2 MCQs: Express.js Routing, Middleware & RESTful API Architecture",
  duration: "25 mins",
  type: "quiz",
  position: 11,
  isModuleQuiz: true,
  contentHeading: "Module 2 Assessment: Express & REST Architecture Check",
  contentDescription: "Evaluate your understanding of Express application structure, route/query parameters, middleware pipelines, CORS, status codes, and centralized error handling.",
  questions: [
    ...nodeLesson05.questions!.slice(0, 4),
    ...nodeLesson06.questions!.slice(0, 4),
    ...nodeLesson07.questions!.slice(0, 4),
    ...nodeLesson08.questions!.slice(0, 3)
  ]
};

const nodeModule02Assessment: CurriculumItem = {
  id: "item-node-m2-assessment",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Module 2: Express.js Framework & RESTful APIs",
  modulePosition: 2,
  title: "Module 2 Assessment: Production-Ready Express CRUD API with Validation",
  duration: "50 mins",
  type: "assignment",
  position: 12,
  isModuleAssessment: true,
  contentHeading: "Module 2 Practical Challenge: Secure Notes & Task Management API",
  contentDescription: "Design, develop, and test a modular Express.js REST API providing full CRUD functionality for a notes/task resource with schema validation, custom middleware, and error handling.",
  assignmentPrompt: {
    instructions: "Build an Express application with modular routing:\n1. Mount routes under `/api/v1/notes` with GET, POST, PATCH, and DELETE endpoints.\n2. Implement a validation middleware that ensures `title` is at least 3 characters and `priority` is 'low', 'medium', or 'high'.\n3. Attach an API-key authentication middleware protecting POST, PATCH, and DELETE.\n4. Write a centralized 4-parameter error handler returning consistent JSON responses and status codes.",
    deliverables: [
      "Modular app.js, routes/noteRoutes.js, and middleware/errorHandler.js files",
      "Proper HTTP status codes: 200, 201, 204, 400, 401, and 404",
      "Robust async error catching without unhandled promise rejections"
    ]
  }
};

const nodeModule02: CurriculumSubModule = {
  id: "module-node-02-express-apis",
  subCourseId: "mod-nodejs-apis",
  title: "Module 2: Express.js Framework & RESTful APIs",
  description: "Master the Express.js web framework: modular routing, middleware pipelines, CORS, request/response cycle, REST architectural principles, input validation, and centralized error management.",
  position: 2,
  duration: "2 hours, 50 mins",
  lessons: [nodeLesson05, nodeLesson06, nodeLesson07, nodeLesson08],
  moduleQuiz: nodeModule02Quiz,
  moduleAssessment: nodeModule02Assessment,
  items: [nodeLesson05, nodeLesson06, nodeLesson07, nodeLesson08, nodeModule02Quiz, nodeModule02Assessment]
};

// =========================================================================
// SUB-COURSE FINAL ASSESSMENT
// =========================================================================

const nodeSubCourseExam: CurriculumItem = {
  id: "item-node-course-assessment",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 3,
  title: "Sub-Course Assessment: Node.js & Express Certification Exam",
  duration: "40 mins",
  type: "quiz",
  position: 13,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 04 Certification Exam: Node.js & Express Architecture",
  contentDescription: "Comprehensive examination covering all modules: V8 runtime, event loop, libuv thread pool, module systems, streams, native HTTP, Express routing, middleware pipelines, RESTful standards, and production error handling.",
  questions: [
    ...nodeLesson01.questions!.slice(0, 3),
    ...nodeLesson02.questions!.slice(0, 3),
    ...nodeLesson03.questions!.slice(0, 3),
    ...nodeLesson04.questions!.slice(0, 3),
    ...nodeLesson05.questions!.slice(0, 3),
    ...nodeLesson06.questions!.slice(0, 3),
    ...nodeLesson07.questions!.slice(0, 4),
    ...nodeLesson08.questions!.slice(0, 3)
  ]
};

const nodeSubCourseProject: CurriculumItem = {
  id: "item-node-course-project",
  subCourseId: "mod-nodejs-apis",
  subCourseTitle: "Node.js and Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-express-apis",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 3,
  title: "Sub-Course Capstone Project: Production RESTful E-Commerce & LMS Backend API",
  duration: "1 hour, 45 mins",
  type: "assignment",
  position: 14,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 04 Capstone: Enterprise-Grade Express REST API Server",
  contentDescription: "Architect, develop, and document a complete multi-resource Express.js backend server supporting authentication, pagination, search filtering, validation, and error boundaries.",
  assignmentPrompt: {
    instructions: "Build a production-grade backend API service for an online learning platform:\n1. Resources: Users, Courses, and Enrollments with full CRUD.\n2. Pagination and sorting on GET /api/courses (?page=1&limit=10&sort=-createdAt).\n3. Middleware pipeline including helmet, cors, morgan, and custom JWT auth guard.\n4. Input validation schema returning formatted 400 Bad Request error arrays.\n5. Centralized error handling middleware with separate dev/prod output modes.",
    deliverables: [
      "Full server source code with clean MVC separation (routes, controllers, middleware)",
      "Postman or HTTP request collection demonstrating all endpoint responses",
      "Documentation outlining architecture, error formats, and environment setup"
    ]
  }
};

export const nodeExpressSubCourse: CurriculumSubCourse = {
  id: "mod-nodejs-apis",
  title: "Backend Development with Node.js & Express",
  position: 4,
  duration: "6 hours, 10 mins",
  description: "Master modern backend web development with Node.js and Express: the V8 runtime, libuv event loop, non-blocking I/O, core modules, modular routing, middleware pipelines, RESTful API design, input validation, and production error handling.",
  modules: [nodeModule01, nodeModule02],
  courseAssessment: nodeSubCourseExam,
  courseProject: nodeSubCourseProject,
  items: [
    ...nodeModule01.items,
    ...nodeModule02.items,
    nodeSubCourseExam,
    nodeSubCourseProject
  ]
};
