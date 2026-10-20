import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 1: NODE.JS FOUNDATIONS
// Lessons 074 - 077 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 074: NODE.JS ARCHITECTURE AND RUNTIME
const lesson074: CurriculumItem = {
  id: "item-node-074-architecture-runtime",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-foundations",
  moduleTitle: "Module 1: Node.js Foundations",
  modulePosition: 1,
  title: "Node.js Architecture and Runtime",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Node.js Architecture and Runtime: V8 Engine, libuv & The Event Loop",
  contentDescription: "Master the internal architecture of Node.js, the single-threaded event loop, non-blocking asynchronous I/O, the libuv thread pool, and why CPU-bound operations stall network throughput.",
  codeSnippet: {
    language: "javascript",
    code: `// Non-blocking asynchronous I/O vs blocking CPU-bound code
import fs from 'node:fs/promises';

// Asynchronous non-blocking reading: delegates to libuv thread pool
console.log('1. Initiating file read request...');
fs.readFile('./server.log', 'utf8')
  .then(data => console.log('3. File read complete! Size:', data.length))
  .catch(err => console.error('Read error:', err.message));

// Main thread continues execution immediately without waiting
console.log('2. Server continues listening for incoming HTTP requests');`
  },
  sections: [
    {
      title: "Core Concept: What Node.js Really Is",
      explanation: "For the first fifteen years of JavaScript's existence, the language ran exclusively within web browsers such as Netscape, Internet Explorer, and Google Chrome. In 2009, Ryan Dahl extracted Google's high-performance open-source V8 JavaScript engine—the same C++ engine that compiles and executes JavaScript inside Chrome—and paired it with a robust C library called libuv. The result was Node.js: an asynchronous, event-driven runtime environment capable of executing JavaScript directly on computer operating systems, physical servers, and cloud containers.\n\nNode.js is neither a programming language nor a web framework, nor is it a database. JavaScript is the programming language; Express and Fastify are web frameworks; PostgreSQL and MongoDB are databases; and Node.js is the runtime host that executes your JavaScript code and exposes operating system interfaces such as the file system, network sockets, child processes, and cryptographic hardware."
    },
    {
      title: "The Dual Engine Architecture: V8 and libuv",
      explanation: "Under the hood, a Node.js process is an orchestration of two distinct software engines. The V8 engine provides the memory heap (where objects, arrays, and variables are allocated) and the single call stack (where currently executing functions push and pop frames). Because there is only one call stack, JavaScript execution is fundamentally single-threaded.\n\nHowever, production servers must simultaneously handle thousands of concurrent network connections. To prevent the single JavaScript thread from freezing while waiting for slow disk drives or database responses, Node.js offloads all input/output tasks to libuv. Libuv maintains an asynchronous event loop and a configurable background thread pool (defaulting to 4 C-level threads) capable of executing operating-system-level non-blocking operations.",
      table: {
        headers: ["Component", "Primary Responsibility", "Written In", "Execution Context"],
        rows: [
          ["Google V8", "Compiles JS to machine code; manages heap and call stack", "C++", "Main Single Thread"],
          ["libuv", "Asynchronous I/O, event loop, file/DNS thread pool", "C", "Background Worker Threads"],
          ["Node.js C++ Bindings", "Exposes OS primitives (sockets, buffers, crypto) to JS", "C++", "Bridge between V8 & OS"],
          ["Node Core API", "High-level JavaScript standard libraries (fs, http, path)", "JavaScript", "Userland API"]
        ]
      }
    },
    {
      title: "The Event Loop Execution Lifecycle",
      explanation: "When you execute a Node.js application, the runtime initializes the process, parses top-level code, registers event listeners, and initiates the event loop. The event loop continually spins across specialized phases in a fixed order:",
      bullets: [
        "Timers Phase: Executes callbacks scheduled by setTimeout() and setInterval().",
        "Pending Callbacks Phase: Executes I/O callbacks deferred from the previous iteration, such as TCP connection errors.",
        "Idle / Prepare Phase: Internal operations used exclusively by the runtime system.",
        "Poll Phase: Retrieves new I/O events, reads incoming TCP packets, accepts incoming HTTP sockets, and executes their associated callbacks.",
        "Check Phase: Executes callbacks registered via setImmediate().",
        "Close Callbacks Phase: Executes socket and resource shutdown callbacks, such as socket.on('close')."
      ]
    },
    {
      title: "Microtasks and the Call Stack Priority",
      explanation: "Between every single phase of the event loop, and immediately whenever the JavaScript call stack becomes empty, Node.js flushes the Microtask Queue. The Microtask Queue contains process.nextTick() callbacks (highest priority) and resolved Promise .then() / async continuations. If an asynchronous recursive function continually enqueues microtasks, the event loop starves and can never advance to the next phase, freezing all incoming network requests."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Because JavaScript runs on a single main thread, any CPU-intensive synchronous operation blocks all other requests handled by that server process. For example, executing a heavy synchronous cryptographic loop (such as bcrypt.hashSync with high rounds) or running a synchronous JSON.parse on a 500-megabyte file will freeze the server for several seconds. During this freeze, new HTTP requests cannot be accepted, health checks will fail, and open client connections will time out.\n\nTo preserve responsiveness, always use asynchronous non-blocking APIs (such as fs.promises.readFile instead of fs.readFileSync) and offload CPU-intensive operations (such as image resizing, video transcoding, or large-scale data transformation) to Node.js Worker Threads (worker_threads) or dedicated background queue workers (such as BullMQ or Redis streams)."
    }
  ],
  questions: [
    {
      id: "q-node-074-1",
      prompt: "What is the primary role of Google's V8 engine inside the Node.js runtime?",
      options: [
        { id: "a", label: "Managing operating system file descriptors and network sockets" },
        { id: "b", label: "Compiling JavaScript code directly into native machine code and managing the memory heap" },
        { id: "c", label: "Handling HTTP routing and middleware pipelines" },
        { id: "d", label: "Serving as an embedded relational database engine" }
      ],
      correctIndex: 1,
      explanation: "Google V8 is a high-performance C++ engine that parses JavaScript syntax, manages memory allocation on the heap, and compiles JavaScript into native machine code."
    },
    {
      id: "q-node-074-2",
      prompt: "Which library powers asynchronous I/O and the event loop inside Node.js?",
      options: [
        { id: "a", label: "libuv" },
        { id: "b", label: "React DOM" },
        { id: "c", label: "WebKit" },
        { id: "d", label: "Express Core" }
      ],
      correctIndex: 0,
      explanation: "libuv is the multi-platform C library responsible for the event loop, non-blocking asynchronous I/O, and the background thread pool."
    },
    {
      id: "q-node-074-3",
      prompt: "What happens if a developer runs a synchronous 5-second CPU-intensive calculation on the main thread in an Express server?",
      options: [
        { id: "a", label: "Node automatically spawns a new process for other HTTP requests" },
        { id: "b", label: "The server continues serving other users concurrently on separate threads" },
        { id: "c", label: "The entire event loop blocks, preventing all other concurrent requests from being processed" },
        { id: "d", label: "V8 raises an OutOfMemory exception immediately" }
      ],
      correctIndex: 2,
      explanation: "Because Node executes JavaScript on a single thread, any synchronous CPU-bound task blocks the call stack, halting the event loop and delaying all concurrent requests."
    },
    {
      id: "q-node-074-4",
      prompt: "In which event loop phase are `setImmediate()` callbacks executed?",
      options: [
        { id: "a", label: "Timers phase" },
        { id: "b", label: "Poll phase" },
        { id: "c", label: "Check phase" },
        { id: "d", label: "Close callbacks phase" }
      ],
      correctIndex: 2,
      explanation: "Callbacks scheduled via setImmediate() are processed specifically during the Check phase, right after the Poll phase completes."
    },
    {
      id: "q-node-074-5",
      prompt: "What queue has the highest execution priority as soon as the active call stack empties?",
      options: [
        { id: "a", label: "The microtask queue (process.nextTick and resolved Promises)" },
        { id: "b", label: "The macrotask queue (setTimeout)" },
        { id: "c", label: "The file system thread pool queue" },
        { id: "d", label: "The OS network driver queue" }
      ],
      correctIndex: 0,
      explanation: "Microtasks (including process.nextTick and Promise callbacks) are drained immediately whenever the current JavaScript call stack empties, before the event loop advances."
    },
    {
      id: "q-node-074-6",
      prompt: "What is the default size of the libuv background thread pool in Node.js?",
      options: [
        { id: "a", label: "1 thread" },
        { id: "b", label: "4 threads" },
        { id: "c", label: "16 threads" },
        { id: "d", label: "Unlimited dynamic threads" }
      ],
      correctIndex: 1,
      explanation: "libuv provides a default pool of 4 worker threads, which can be modified by setting the UV_THREADPOOL_SIZE environment variable up to 1024."
    },
    {
      id: "q-node-074-7",
      prompt: "Which operations are delegated to the libuv thread pool rather than asynchronous OS kernel mechanisms?",
      options: [
        { id: "a", label: "File system operations (fs), DNS lookups (dns.lookup), and crypto hashing" },
        { id: "b", label: "Network TCP sockets (net.Socket)" },
        { id: "c", label: "Parsing string templates and arithmetic operations" },
        { id: "d", label: "Console.log text formatting" }
      ],
      correctIndex: 0,
      explanation: "Network sockets use OS-level asynchronous interfaces (epoll/kqueue/IOCP), whereas file system I/O, DNS lookups, and CPU-heavy crypto operations are offloaded to the libuv thread pool."
    },
    {
      id: "q-node-074-8",
      prompt: "Why is Node.js well-suited for I/O-bound web applications?",
      options: [
        { id: "a", label: "Because it consumes a separate heavy OS thread for each client connection" },
        { id: "b", label: "Because its non-blocking event-driven model handles thousands of idle or waiting connections with minimal memory overhead" },
        { id: "c", label: "Because it automatically converts relational tables into NoSQL documents" },
        { id: "d", label: "Because it eliminates the need for database indexes" }
      ],
      correctIndex: 1,
      explanation: "Non-blocking I/O allows a single process to hold open tens of thousands of concurrent network connections without allocating heavy operating system thread stacks for each socket."
    },
    {
      id: "q-node-074-9",
      prompt: "What does `await` actually pause in modern asynchronous JavaScript?",
      options: [
        { id: "a", label: "It pauses the entire operating system process" },
        { id: "b", label: "It pauses the execution continuation of that specific async function, allowing the call stack and event loop to handle other work" },
        { id: "c", label: "It suspends the V8 garbage collector" },
        { id: "d", label: "It blocks all other incoming HTTP connections" }
      ],
      correctIndex: 1,
      explanation: "Awaiting a promise yields control of the call stack back to the event loop; only the local continuation of that async function is paused until the promise resolves."
    },
    {
      id: "q-node-074-10",
      prompt: "How should a development team handle CPU-heavy tasks such as video transcoding or machine learning inference in a Node.js ecosystem?",
      options: [
        { id: "a", label: "Execute them synchronously inside Express route handlers" },
        { id: "b", label: "Increase the browser's JavaScript memory limit" },
        { id: "c", label: "Offload them to Worker Threads, child processes, or external asynchronous background job queues" },
        { id: "d", label: "Convert all files to synchronous CSV dumps" }
      ],
      correctIndex: 2,
      explanation: "CPU-heavy processing should be offloaded to worker threads or independent job queue workers so the primary web server's event loop remains responsive to incoming network traffic."
    }
  ]
};

// LESSON 075: NPM AND PACKAGE MANAGEMENT
const lesson075: CurriculumItem = {
  id: "item-node-075-npm-package-management",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-foundations",
  moduleTitle: "Module 1: Node.js Foundations",
  modulePosition: 1,
  title: "npm and Package Management",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "npm and Package Management: Dependencies, Locks & Security",
  contentDescription: "Understand the node package manager, semantic versioning ranges, deterministic dependency resolution via package-lock.json, devDependencies vs dependencies, and vulnerability auditing.",
  codeSnippet: {
    language: "bash",
    code: `# Initialize a new Node.js package with defaults
npm init -y

# Install production dependencies
npm install express dotenv cors

# Install development tooling dependencies
npm install --save-dev nodemon vitest supertest

# Verify dependency vulnerabilities and generate audit reports
npm audit
npm audit fix --dry-run`
  },
  sections: [
    {
      title: "Core Concept: The npm Ecosystem and Manifests",
      explanation: "Modern software development rarely involves writing every utility from scratch. When building production backends, engineers leverage npm (the Node Package Manager)—the world's largest software registry containing millions of reusable open-source modules.\n\nAt the root of every Node project resides `package.json`. This JSON manifest serves as the single source of truth describing project metadata (name, version, license), script automation aliases, and the external libraries required for execution."
    },
    {
      title: "Production Dependencies vs Development Dependencies",
      explanation: "When installing third-party libraries, separating runtime code from development tooling is critical for production container size, security posture, and build performance. Libraries are partitioned into two distinct categories:",
      table: {
        headers: ["Manifest Key", "CLI Flag", "Purpose", "Included in Production?"],
        rows: [
          ["dependencies", "npm install <pkg>", "Required for the application to run in production (e.g., express, pg, bcrypt)", "YES"],
          ["devDependencies", "npm install -D <pkg>", "Tooling required only during development and testing (e.g., nodemon, vitest, eslint)", "NO (omitted when NODE_ENV=production)"],
          ["peerDependencies", "Manually specified", "Enforces compatibility with parent plugin ecosystems (e.g., react in component libraries)", "Expected in host environment"],
          ["optionalDependencies", "npm install -O <pkg>", "Packages that fail gracefully if native binary compilation is unsupported", "CONDITIONAL"]
        ]
      }
    },
    {
      title: "Deterministic Builds: The Role of package-lock.json",
      explanation: "In `package.json`, version numbers frequently utilize semantic versioning prefix symbols such as `^1.4.2` (allowing any non-breaking patch or minor release up to `<2.0.0`) or `~1.4.2` (allowing only patch releases `<1.5.0`).\n\nIf two developers or automated deployment pipelines run `npm install` on different days, a permissive range like `^1.4.2` could pull a freshly published minor release containing an unforeseen regression. To guarantee that every server, testing container, and developer workstation installs the exact identical byte-for-byte dependency graph, npm generates `package-lock.json`. This lockfile records exact resolved versions and cryptographic integrity hashes for every single package and transitive dependency."
    },
    {
      title: "Command Lifecycle and Security Hygiene",
      explanation: "Professional engineering teams employ strict command discipline across the development lifecycle:",
      bullets: [
        "Local Development: Run `npm install` to install or upgrade dependencies according to package.json ranges.",
        "Continuous Integration & Production: Always run `npm ci` (Clean Install). This command strictly enforces package-lock.json, deletes existing node_modules, never modifies lockfiles, and fails if the manifest and lockfile are out of sync.",
        "Security Auditing: Periodically run `npm audit` to identify known Common Vulnerabilities and Exposures (CVEs) in your dependency tree.",
        "Scripts Execution: Use `npm run <script>` to execute standardized project tasks such as linting, compiling, migrating databases, or launching test suites."
      ]
    }
  ],
  questions: [
    {
      id: "q-node-075-1",
      prompt: "What is the primary purpose of the `package-lock.json` file?",
      options: [
        { id: "a", label: "To lock user accounts so unauthorized developers cannot commit code" },
        { id: "b", label: "To record the exact resolved versions and cryptographic hashes of all direct and transitive dependencies for deterministic builds" },
        { id: "c", label: "To encrypt passwords and database connection strings before saving to disk" },
        { id: "d", label: "To prevent the Node.js runtime from restarting on crashes" }
      ],
      correctIndex: 1,
      explanation: "package-lock.json locks the exact dependency tree, ensuring that every machine running npm install or npm ci receives identical package versions."
    },
    {
      id: "q-node-075-2",
      prompt: "Which command should be used in production deployment pipelines and CI/CD environments instead of `npm install`?",
      options: [
        { id: "a", label: "npm ci" },
        { id: "b", label: "npm update --force" },
        { id: "c", label: "npm init" },
        { id: "d", label: "npm publish" }
      ],
      correctIndex: 0,
      explanation: "npm ci (clean install) is specifically built for CI/CD and production: it strictly honors package-lock.json, deletes existing node_modules, and never alters lockfiles."
    },
    {
      id: "q-node-075-3",
      prompt: "Under SemVer rules, what does the version string `^2.4.1` indicate?",
      options: [
        { id: "a", label: "Accept only patch updates (>=2.4.1 <2.5.0)" },
        { id: "b", label: "Accept backwards-compatible minor and patch updates (>=2.4.1 <3.0.0)" },
        { id: "c", label: "Lock strictly to exact version 2.4.1 with no updates allowed" },
        { id: "d", label: "Accept major breaking updates (>=2.4.1 <10.0.0)" }
      ],
      correctIndex: 1,
      explanation: "The caret (^) symbol permits minor and patch updates that do not modify the leftmost non-zero digit, meaning any release from 2.4.1 up to, but not including, 3.0.0."
    },
    {
      id: "q-node-075-4",
      prompt: "Which package category in package.json is suitable for a testing library such as `vitest` or `supertest`?",
      options: [
        { id: "a", label: "dependencies" },
        { id: "b", label: "devDependencies" },
        { id: "c", label: "peerDependencies" },
        { id: "d", label: "bundledDependencies" }
      ],
      correctIndex: 1,
      explanation: "devDependencies contains packages needed only during local development and testing, preventing bloated production container images."
    },
    {
      id: "q-node-075-5",
      prompt: "What does the command `npm audit` do?",
      options: [
        { id: "a", label: "It counts the total number of lines of JavaScript in node_modules" },
        { id: "b", label: "It analyzes installed packages against the npm vulnerability database to flag known security advisories" },
        { id: "c", label: "It formats source code according to ESLint guidelines" },
        { id: "d", label: "It benchmarks the CPU execution speed of package scripts" }
      ],
      correctIndex: 1,
      explanation: "npm audit checks your dependency tree against the public security vulnerability advisory database and reports known CVE risks."
    },
    {
      id: "q-node-075-6",
      prompt: "Under SemVer, what does the tilde (`~1.5.3`) permit?",
      options: [
        { id: "a", label: "Accepts only patch updates: >=1.5.3 <1.6.0" },
        { id: "b", label: "Accepts any update up to 2.0.0" },
        { id: "c", label: "Allows major breaking changes" },
        { id: "d", label: "Installs only pre-release beta builds" }
      ],
      correctIndex: 0,
      explanation: "The tilde (~) operator restricts updates strictly to patch releases within the specified minor version (>=1.5.3 <1.6.0)."
    },
    {
      id: "q-node-075-7",
      prompt: "What happens if you run `npm install --omit=dev` in a deployment container?",
      options: [
        { id: "a", label: "It deletes the package.json file" },
        { id: "b", label: "It installs only production `dependencies` and skips `devDependencies`" },
        { id: "c", label: "It ignores git commits" },
        { id: "d", label: "It disables production error logs" }
      ],
      correctIndex: 1,
      explanation: "The flag --omit=dev instructs npm to omit packages listed under devDependencies, resulting in leaner and more secure production deployments."
    },
    {
      id: "q-node-075-8",
      prompt: "Where does npm store cached tarballs of downloaded packages on a developer's local machine?",
      options: [
        { id: "a", label: "Inside the global `~/.npm` cache directory" },
        { id: "b", label: "Inside the browser's localStorage" },
        { id: "c", label: "Directly in the operating system BIOS" },
        { id: "d", label: "Inside git commit objects" }
      ],
      correctIndex: 0,
      explanation: "npm maintains a local cache folder (~/.npm) containing downloaded package tarballs and metadata to speed up subsequent installations."
    },
    {
      id: "q-node-075-9",
      prompt: "Why should `node_modules` always be included in the `.gitignore` file?",
      options: [
        { id: "a", label: "Because Git cannot store folders with more than 10 files" },
        { id: "b", label: "Because node_modules can contain hundreds of thousands of files and OS-specific native compiled binaries that should be regenerated via package-lock.json" },
        { id: "c", label: "Because npm deletes git repositories automatically" },
        { id: "d", label: "Because node_modules contains plain text passwords" }
      ],
      correctIndex: 1,
      explanation: "node_modules is massive, contains platform-dependent compiled binaries, and can be completely and deterministically reproduced using package.json and package-lock.json."
    },
    {
      id: "q-node-075-10",
      prompt: "How are custom scripts defined in `package.json` executed from the command line?",
      options: [
        { id: "a", label: "npm run <script-name>" },
        { id: "b", label: "node execute <script-name>" },
        { id: "c", label: "npm exec-all <script-name>" },
        { id: "d", label: "npm compile <script-name>" }
      ],
      correctIndex: 0,
      explanation: "Custom scripts configured inside the scripts object of package.json (such as 'build', 'lint', or 'test') are triggered using npm run <script-name>."
    }
  ]
};

// LESSON 076: MODULES AND PROJECT STRUCTURE
const lesson076: CurriculumItem = {
  id: "item-node-076-modules-project-structure",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-foundations",
  moduleTitle: "Module 1: Node.js Foundations",
  modulePosition: 1,
  title: "Modules and Project Structure",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Modules and Project Structure: ESM, CommonJS & Clean Separation",
  contentDescription: "Master ECMAScript Modules (ESM) vs CommonJS (CJS), configure package types, avoid circular dependencies, and organize scalable multi-layered backend directory architectures.",
  codeSnippet: {
    language: "javascript",
    code: `// Standard ESM Named and Default Exports (src/utils/math.js)
export function calculateTax(amount, rate = 0.08) {
  if (amount < 0) throw new RangeError('Amount must be non-negative');
  return Number((amount * rate).toFixed(2));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

// Importing in another module (src/services/billing.js)
import { calculateTax, formatCurrency } from '../utils/math.js';

const tax = calculateTax(100);
console.log('Total Tax:', formatCurrency(tax)); // Total Tax: $8.00`
  },
  sections: [
    {
      title: "Core Concept: The Module Evolution in JavaScript",
      explanation: "In traditional browser JavaScript, all scripts shared a single global execution namespace (`window`), leading to catastrophic variable naming collisions and race conditions. Node.js introduced modular encapsulation from day one using CommonJS (`require` and `module.exports`).\n\nWith ECMAScript 2015 (ES6), the JavaScript language specification introduced standard ECMAScript Modules (`import` and `export`). Today, modern Node.js backends predominantly adopt ESM because it enables static analysis, tree-shaking, and seamless parity with frontend React and Vue codebases."
    },
    {
      title: "CommonJS vs ECMAScript Modules Compared",
      explanation: "Understanding the mechanical differences between CJS and ESM prevents subtle runtime errors when integrating packages:",
      table: {
        headers: ["Feature", "CommonJS (CJS)", "ECMAScript Modules (ESM)"],
        rows: [
          ["Import Syntax", "const pkg = require('./file')", "import pkg from './file.js'"],
          ["Export Syntax", "module.exports = { ... } / exports.fn", "export const fn / export default ..."],
          ["Evaluation Timing", "Dynamic and synchronous at runtime", "Static and asynchronous before code execution"],
          ["Top-level await", "Unsupported (requires wrapper async IIFE)", "Natively supported at module top level"],
          ["Magic Variables", "__dirname and __filename exist natively", "Omitted; derived via import.meta.url"],
          ["Node Config", "Default mode (.js files without type field)", "Activated by setting \"type\": \"module\" in package.json"]
        ]
      }
    },
    {
      title: "Production Backend Directory Architecture",
      explanation: "Placing all route definitions, database queries, and business logic into a single monolithic `app.js` file creates unmaintainable software. Scalable backend applications enforce a clean Separation of Concerns (SoC) using layered directory structures:",
      bullets: [
        "src/config/: Environment variable validation, database pool parameters, third-party API keys.",
        "src/routes/: Express router definitions mapping HTTP methods and endpoints to controllers.",
        "src/controllers/: Request parsing, HTTP status code selection, and response formatting.",
        "src/services/: Pure business logic, validation rules, financial calculations, notification workflows.",
        "src/repositories/: Data access layer isolating raw SQL queries or Mongoose model interactions.",
        "src/middleware/: Authentication verifiers, request validators, rate limiters, centralized error handlers.",
        "src/utils/: Pure helper functions, string formatters, cryptographic helpers, custom Error classes."
      ]
    },
    {
      title: "Avoiding Circular Dependencies",
      explanation: "A circular dependency occurs when Module A imports Module B, and Module B directly or indirectly imports Module A. In CommonJS, this results in partially initialized objects (`undefined` exports). In ESM, it triggers ReferenceErrors before functions can be called.\n\nTo prevent circular dependencies, maintain a strict unidirectional dependency hierarchy: Controllers may import Services, Services may import Repositories, but Repositories should never import Controllers or Services. Shared utility code should always reside in independent helper modules."
    }
  ],
  questions: [
    {
      id: "q-node-076-1",
      prompt: "How do you configure a Node.js project to treat all `.js` files as ECMAScript Modules (ESM) by default?",
      options: [
        { id: "a", label: "Add `\"type\": \"module\"` to the root `package.json` file" },
        { id: "b", label: "Include `\"esm\": true` in the `.gitignore` file" },
        { id: "c", label: "Rename all files with the extension `.node`" },
        { id: "d", label: "Execute scripts using `node --legacy-mode`" }
      ],
      correctIndex: 0,
      explanation: "Setting \"type\": \"module\" in package.json tells the Node runtime to parse standard .js files as ECMAScript Modules rather than CommonJS."
    },
    {
      id: "q-node-076-2",
      prompt: "How can a developer determine the current file path in an ESM module where `__dirname` is not defined?",
      options: [
        { id: "a", label: "By reading `process.__dirname`" },
        { id: "b", label: "Using `import.meta.url` combined with `fileURLToPath` from `node:url`" },
        { id: "c", label: "Using `global.currentPath`" },
        { id: "d", label: "By querying the database schema" }
      ],
      correctIndex: 1,
      explanation: "In ESM, import.meta.url gives the module's file URL, which is converted to an absolute path using fileURLToPath from the node:url standard library."
    },
    {
      id: "q-node-076-3",
      prompt: "What is the primary architectural responsibility of the 'Service' layer in a 3-tier backend application?",
      options: [
        { id: "a", label: "Reading raw HTTP request headers and writing response cookies" },
        { id: "b", label: "Encapsulating core business rules, validations, and domain logic independently of HTTP" },
        { id: "c", label: "Formatting HTML templates with CSS styles" },
        { id: "d", label: "Managing physical hard drive partitions" }
      ],
      correctIndex: 1,
      explanation: "The service layer contains pure business logic and rules, decoupling application functionality from HTTP transport details and database queries."
    },
    {
      id: "q-node-076-4",
      prompt: "Which statement about CommonJS `require()` is correct?",
      options: [
        { id: "a", label: "It is asynchronous and returns a Promise" },
        { id: "b", label: "It evaluates modules synchronously and dynamically at runtime" },
        { id: "c", label: "It can only be used in frontend browser scripts" },
        { id: "d", label: "It is strictly forbidden by the V8 engine" }
      ],
      correctIndex: 1,
      explanation: "CommonJS require() is synchronous; it loads, compiles, and evaluates the target file on the main thread during execution."
    },
    {
      id: "q-node-076-5",
      prompt: "What is a circular dependency in software architecture?",
      options: [
        { id: "a", label: "When two or more modules depend on each other directly or indirectly, creating an import loop" },
        { id: "b", label: "When an Express server calls its own health check endpoint" },
        { id: "c", label: "When a database table has two primary keys" },
        { id: "d", label: "When git branches are merged in a circle" }
      ],
      correctIndex: 0,
      explanation: "Circular dependencies occur when Module A imports Module B and Module B imports Module A, risking partially initialized states or runtime ReferenceErrors."
    },
    {
      id: "q-node-076-6",
      prompt: "What is the file extension used to explicitly declare an ECMAScript module even when `package.json` lacks `\"type\": \"module\"`?",
      options: [
        { id: "a", label: ".cjs" },
        { id: "b", label: ".mjs" },
        { id: "c", label: ".esmodule" },
        { id: "d", label: ".esm.js" }
      ],
      correctIndex: 1,
      explanation: "The .mjs extension explicitly signifies an ECMAScript Module regardless of the enclosing package.json configuration."
    },
    {
      id: "q-node-076-7",
      prompt: "In a layered architecture, what should the controller do upon receiving an incoming HTTP request?",
      options: [
        { id: "a", label: "Write raw SQL queries directly and manage database connection sockets" },
        { id: "b", label: "Extract and validate input from req.params/req.body, invoke the service, and map the result to an HTTP status code and response payload" },
        { id: "c", label: "Restart the operating system daemon" },
        { id: "d", label: "Encrypt the entire source code directory" }
      ],
      correctIndex: 1,
      explanation: "Controllers act as HTTP adapters: they extract request data, call the appropriate business service, and return standard HTTP responses."
    },
    {
      id: "q-node-076-8",
      prompt: "Can `await` be used at the top level of an ECMAScript Module (ESM) without wrapping it in an `async` function?",
      options: [
        { id: "a", label: "No, top-level await is completely illegal in JavaScript" },
        { id: "b", label: "Yes, modern Node.js natively supports top-level await in ESM modules" },
        { id: "c", label: "Only if running on Windows 95" },
        { id: "d", label: "Only inside HTML script tags" }
      ],
      correctIndex: 1,
      explanation: "Top-level await is a first-class feature of ECMAScript Modules in modern Node.js, allowing asynchronous database connections or config loading at module boot."
    },
    {
      id: "q-node-076-9",
      prompt: "What is the benefit of prefixing internal Node built-in imports with `node:` (e.g., `import fs from 'node:fs'`)?",
      options: [
        { id: "a", label: "It makes the imports run 500 times faster" },
        { id: "b", label: "It unambiguously identifies standard library modules and prevents third-party packages in node_modules from shadowing built-ins" },
        { id: "c", label: "It enables automatic TypeScript compilation" },
        { id: "d", label: "It forces the application to run in strict mode" }
      ],
      correctIndex: 1,
      explanation: "The node: scheme guarantees that the module resolver accesses the native Node standard library, avoiding conflicts with identically named npm packages."
    },
    {
      id: "q-node-076-10",
      prompt: "Why should business logic be kept outside Express route handler definitions?",
      options: [
        { id: "a", label: "Because Express does not allow more than 5 lines of code in route handlers" },
        { id: "b", label: "To enable automated unit testing without needing to mock HTTP request and response objects, and to permit code reuse across CLI or queue consumers" },
        { id: "c", label: "Because routing handlers are automatically deleted after each HTTP request" },
        { id: "d", label: "To increase server CPU temperature" }
      ],
      correctIndex: 1,
      explanation: "Separating business logic into independent service functions allows testing core business calculations purely with input/output assertions without spinning up HTTP test harnesses."
    }
  ]
};

// LESSON 077: ENVIRONMENT VARIABLES AND CONFIGURATION
const lesson077: CurriculumItem = {
  id: "item-node-077-environment-variables-config",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-foundations",
  moduleTitle: "Module 1: Node.js Foundations",
  modulePosition: 1,
  title: "Environment Variables and Configuration",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Environment Variables and Configuration: 12-Factor App Principles",
  contentDescription: "Master process.env, local dotenv management, strict startup schema validation (fail-fast), protecting credentials from source control, and multi-environment configuration.",
  codeSnippet: {
    language: "javascript",
    code: `// src/config/index.js - Fail-fast environment configuration
import 'dotenv/config';

function getRequiredEnv(key) {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    throw new Error(\`FATAL CONFIG ERROR: Missing required environment variable [\${key}]\`);
  }
  return value.trim();
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: getRequiredEnv('DATABASE_URL'),
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  isProduction: process.env.NODE_ENV === 'production'
};

// Application boots safely knowing all critical keys are present
console.log(\`Config loaded for environment: \${config.env} on port \${config.port}\`);`
  },
  sections: [
    {
      title: "Core Concept: The 12-Factor App Configuration Rule",
      explanation: "The industry-standard Twelve-Factor App methodology mandates a strict separation between configuration and source code. Configuration represents everything that varies across deployment targets: local developer workstations, continuous integration runners, staging servers, and production clusters.\n\nNever hard-code database passwords, encryption keys, or API credentials into source code files. Instead, your application must read its operational parameters from the runtime environment via `process.env`."
    },
    {
      title: "Environment Variable Management: .env and .env.example",
      explanation: "During local development, managing dozens of operating system variables manually is cumbersome. Developers use packages like `dotenv` (or Node 20+'s native `--env-file` flag) to load variables from a local `.env` file into `process.env` at startup.\n\nTo safeguard your infrastructure, observe strict file hygiene:",
      table: {
        headers: ["File", "Purpose", "Committed to Git?", "Contains Real Secrets?"],
        rows: [
          [".env", "Local developer secrets and configuration overrides", "NO (Always in .gitignore)", "YES (local credentials only)"],
          [".env.example", "Template documenting all required configuration keys", "YES (tracked in Git)", "NO (contains dummy placeholders)"],
          [".env.test", "Configuration fixtures for automated integration test suites", "YES (if no private keys)", "NO (uses mock/local databases)"],
          ["Cloud Secret Manager", "AWS Secrets Manager, Vault, or GCP Secret Manager", "EXTERNAL", "YES (production secrets)"]
        ]
      }
    },
    {
      title: "The Fail-Fast Architecture Pattern",
      explanation: "A common and dangerous mistake is allowing a backend application to boot when a critical configuration key (such as `DATABASE_URL` or `JWT_SECRET`) is missing. The server starts successfully, passes trivial health checks, and runs normally until twenty minutes later when a user attempts to log in—at which point the server crashes with an unhandled exception or signs authentication tokens with `undefined` as the secret key!\n\nTo prevent this vulnerability, always implement a centralized configuration module that validates all required variables at boot time. If any required variable is missing or malformed, throw a descriptive Error and exit the process immediately (`process.exit(1)`). This fail-fast approach ensures faulty deployments are aborted before receiving public traffic."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Remember that all values inside `process.env` are strings. For instance, if you define `PORT=4000` or `ENABLE_LOGS=false` in your `.env` file, reading `Boolean(process.env.ENABLE_LOGS)` will evaluate to `true` because the non-empty string `'false'` is truthy in JavaScript! Always perform explicit type conversions:\n\n```javascript\nconst port = Number(process.env.PORT) || 3000;\nconst enableLogs = process.env.ENABLE_LOGS === 'true';\n```"
    }
  ],
  questions: [
    {
      id: "q-node-077-1",
      prompt: "Why must `.env` files never be committed to a public or private Git repository?",
      options: [
        { id: "a", label: "Because Git cannot store files whose names begin with a period" },
        { id: "b", label: "To prevent sensitive secrets, database passwords, and cryptographic keys from leaking into version control history" },
        { id: "c", label: "Because Node.js will refuse to launch if Git tracks .env" },
        { id: "d", label: "Because .env files exceed the file size limit of GitHub" }
      ],
      correctIndex: 1,
      explanation: "Committing .env files exposes sensitive credentials, tokens, and database passwords in the repository commit history, making them vulnerable to credential harvesting."
    },
    {
      id: "q-node-077-2",
      prompt: "What is the data type of all properties accessed on `process.env`?",
      options: [
        { id: "a", label: "Numbers and Booleans automatically inferred by V8" },
        { id: "b", label: "String (or undefined if the variable was never set)" },
        { id: "c", label: "JSON Objects" },
        { id: "d", label: "Binary Buffer streams" }
      ],
      correctIndex: 1,
      explanation: "Every environment variable in process.env is stored as a string. Number or boolean flags must be parsed explicitly (e.g. Number(process.env.PORT))."
    },
    {
      id: "q-node-077-3",
      prompt: "What is the purpose of committing a `.env.example` file to version control?",
      options: [
        { id: "a", label: "To provide real production database passwords to all collaborators" },
        { id: "b", label: "To document the complete list of required environment variable keys and dummy template values without exposing secrets" },
        { id: "c", label: "To automatically run database migrations on git clone" },
        { id: "d", label: "To configure npm package dependencies" }
      ],
      correctIndex: 1,
      explanation: ".env.example documents what environment variables the application expects to find, allowing new developers and CI pipelines to configure environments accurately."
    },
    {
      id: "q-node-077-4",
      prompt: "What is the 'fail-fast' principle regarding application configuration?",
      options: [
        { id: "a", label: "Crashing the server immediately during startup if any mandatory configuration variable is missing or malformed" },
        { id: "b", label: "Allowing the server to boot and only checking variables when a user clicks a button" },
        { id: "c", label: "Automatically creating fake passwords when variables are missing" },
        { id: "d", label: "Deleting the database whenever an error occurs" }
      ],
      correctIndex: 0,
      explanation: "Fail-fast ensures that if a required setting is absent, the process throws an error and exits at startup rather than failing catastrophically in production during user traffic."
    },
    {
      id: "q-node-077-5",
      prompt: "If `.env` defines `FEATURE_FLAG=false`, what does `Boolean(process.env.FEATURE_FLAG)` evaluate to in JavaScript?",
      options: [
        { id: "a", label: "false" },
        { id: "b", label: "true, because the string 'false' is non-empty and therefore truthy in JavaScript" },
        { id: "c", label: "undefined" },
        { id: "d", label: "SyntaxError" }
      ],
      correctIndex: 1,
      explanation: "Because process.env returns strings, Boolean('false') evaluates to true. You must compare explicitly: process.env.FEATURE_FLAG === 'true'."
    },
    {
      id: "q-node-077-6",
      prompt: "Starting in Node.js version 20.6.0+, which native CLI flag loads environment variables without installing the `dotenv` package?",
      options: [
        { id: "a", label: "node --env-file=.env app.js" },
        { id: "b", label: "node --read-secrets app.js" },
        { id: "c", label: "node --load-variables app.js" },
        { id: "d", label: "node --dotenv-enabled app.js" }
      ],
      correctIndex: 0,
      explanation: "Node 20.6.0+ introduced the native --env-file flag, enabling developers to load environment variables directly from files without external dependencies."
    },
    {
      id: "q-node-077-7",
      prompt: "Which environment variable is standard across Node.js applications to distinguish development from production environments?",
      options: [
        { id: "a", label: "APP_TARGET" },
        { id: "b", label: "NODE_ENV" },
        { id: "c", label: "ENV_STATUS" },
        { id: "d", label: "DEPLOY_MODE" }
      ],
      correctIndex: 1,
      explanation: "NODE_ENV is the universal convention used by Express, React, and production libraries to optimize caching and suppress debugging stack traces."
    },
    {
      id: "q-node-077-8",
      prompt: "How should production secrets be managed in cloud environments like AWS, GCP, or Render?",
      options: [
        { id: "a", label: "Hard-coded in source files inside a hidden Git branch" },
        { id: "b", label: "Injected securely via container environment variables or a managed cloud secret manager" },
        { id: "c", label: "Saved in a publicly accessible JSON file on the web server" },
        { id: "d", label: "Sent over HTTP headers in client cookies" }
      ],
      correctIndex: 1,
      explanation: "Production infrastructure securely injects secrets into runtime processes using managed secret stores or encrypted platform environment settings."
    },
    {
      id: "q-node-077-9",
      prompt: "What will happen if `parseInt(process.env.PORT, 10)` is executed when `PORT` is not defined?",
      options: [
        { id: "a", label: "It evaluates to 0" },
        { id: "b", label: "It evaluates to NaN" },
        { id: "c", label: "It throws a TypeError" },
        { id: "d", label: "It defaults to 8080" }
      ],
      correctIndex: 1,
      explanation: "Parsing undefined with parseInt results in NaN. Best practice is to provide a fallback: Number(process.env.PORT) || 3000."
    },
    {
      id: "q-node-077-10",
      prompt: "What should you do immediately if you accidentally commit a production API key or database password to a Git repository?",
      options: [
        { id: "a", label: "Make a new commit that deletes the file and push again" },
        { id: "b", label: "Rotate (revoke and reissue) the compromised credential immediately, then purge it from git history" },
        { id: "c", label: "Rename the repository on GitHub" },
        { id: "d", label: "Ignore it if the repository is private" }
      ],
      correctIndex: 1,
      explanation: "Once a secret is committed, assume it is compromised. Revoke and rotate the secret immediately in your cloud provider, then purge repository history."
    }
  ]
};

// MODULE 1 ASSESSMENT QUIZ (10 comprehensive questions)
const nodeModule01Quiz: CurriculumItem = {
  id: "item-node-m1-quiz",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-foundations",
  moduleTitle: "Module 1: Node.js Foundations",
  modulePosition: 1,
  title: "Module 1 Assessment: Node.js Foundations MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  contentHeading: "Module 1 Assessment: Architecture, NPM, Modules & Configuration",
  contentDescription: "Evaluate your foundational knowledge of Node.js runtime mechanics, the V8 engine, libuv event loop phases, semantic versioning, deterministic package locks, ESM/CommonJS modules, and fail-fast configuration.",
  questions: [
    ...(lesson074.questions || []).slice(0, 3),
    ...(lesson075.questions || []).slice(0, 3),
    ...(lesson076.questions || []).slice(0, 2),
    ...(lesson077.questions || []).slice(0, 2)
  ]
};

// MODULE 1 HANDS-ON ASSESSMENT LAB
const nodeModule01Lab: CurriculumItem = {
  id: "item-node-m1-lab",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-01-foundations",
  moduleTitle: "Module 1: Node.js Foundations",
  modulePosition: 1,
  title: "Module 1 Assessment: System Diagnostic & Fail-Fast Config Engine",
  duration: "60 mins",
  type: "assignment",
  position: 6,
  contentHeading: "Module 1 Project Lab: Production Configuration & Diagnostic Runtime Service",
  contentDescription: "Architect a modular Node.js ESM application that performs system hardware diagnostics (CPU, memory, OS uptime) and validates runtime environment variables using the fail-fast pattern.",
  sections: [
    {
      title: "Lab Objectives & Requirements",
      explanation: "In this practical lab, you will construct a production-ready Node.js foundation module meeting strict enterprise criteria:",
      bullets: [
        "Package Configuration: Initialize an ESM package with `\"type\": \"module\"`, standardized npm scripts (`start`, `dev`), and separate devDependencies.",
        "Fail-Fast Environment Validator: Build a configuration module that reads `.env`, validates that `DATABASE_URL`, `JWT_SECRET`, and `PORT` are present and properly typed, and aborts startup with a descriptive error code if invalid.",
        "System Diagnostic Utility: Utilize Node built-in modules (`node:os`, `node:process`) to report free memory, CPU core counts, platform architecture, and active Node version.",
        "Module Separation: Maintain strict separation between configuration (`src/config/`), utilities (`src/utils/`), and the application entry point (`src/index.js`)."
      ]
    },
    {
      title: "Expected Deliverable Specification",
      explanation: "Your project must include:\n1. `package.json` with ESM configuration and clean dependencies.\n2. `.env.example` documenting all configuration keys.\n3. `src/config/env.js` exporting validated configuration objects.\n4. `src/utils/systemInfo.js` generating memory and process diagnostic reports."
    }
  ]
};

// Exporting Module 1
export const nodeModule01: CurriculumSubModule = {
  id: "module-node-01-foundations",
  title: "Module 1: Node.js Foundations",
  description: "Master Node.js runtime internals, the V8 engine, the libuv event loop, npm package management, ESM modules, and 12-factor environment configuration.",
  position: 1,
  duration: "2 hours, 25 mins",
  items: [
    lesson074,
    lesson075,
    lesson076,
    lesson077,
    nodeModule01Quiz,
    nodeModule01Lab
  ]
};
