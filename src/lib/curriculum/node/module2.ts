import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 2: ASYNCHRONOUS APIS AND SERVER UTILITIES
// Lessons 078 - 080 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 078: CALLBACKS, PROMISES AND ASYNC I/O IN NODE
const lesson078: CurriculumItem = {
  id: "item-node-078-callbacks-promises-async-io",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-async-utilities",
  moduleTitle: "Module 2: Asynchronous APIs and Server Utilities",
  modulePosition: 2,
  title: "Callbacks, Promises and Async I/O in Node",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Callbacks, Promises and Async I/O in Node: Concurrency & Control Flow",
  contentDescription: "Master asynchronous control flow in server environments, from historical error-first callbacks to modern Promise concurrency patterns, Promise.allSettled, and bulletproof error boundaries.",
  codeSnippet: {
    language: "javascript",
    code: `// Modern async/await with Promise concurrency orchestration
import fs from 'node:fs/promises';

async function loadServerConfiguration(paths) {
  try {
    // Read multiple configuration files concurrently without serial blocking
    const readPromises = paths.map(filePath => fs.readFile(filePath, 'utf8'));
    
    // Promise.allSettled ensures partial failures do not discard successful reads
    const results = await Promise.allSettled(readPromises);
    
    return results.map((res, index) => {
      if (res.status === 'fulfilled') {
        return { path: paths[index], content: JSON.parse(res.value), ok: true };
      }
      return { path: paths[index], error: res.reason.message, ok: false };
    });
  } catch (error) {
    console.error('Fatal configuration loader crash:', error);
    throw error;
  }
}`
  },
  sections: [
    {
      title: "Core Concept: The Evolution of Asynchronous JavaScript in Node",
      explanation: "Because Node.js executes JavaScript on a single thread, any operation that takes time—such as awaiting a database response, waiting for a file to read from an SSD, or exchanging data across a network socket—must be handled asynchronously. Over the past fifteen years, the mechanism for managing asynchronous results has evolved through three distinct paradigms:\n\n1. Error-First Callbacks: The original Node convention where functions accepted a callback whose first argument was reserved for an error object.\n2. ES6 Promises: Objects representing the eventual completion (or failure) of an asynchronous operation with chaining via `.then()` and `.catch()`.\n3. Async / Await: Syntactic sugar built on top of Promises that allows asynchronous code to be written and structured with the readability of synchronous sequential statements."
    },
    {
      title: "The Danger of Callback Hell and the Error-First Protocol",
      explanation: "In early Node.js code, nesting multiple asynchronous operations (such as querying a user, finding their orders, and sending an email) created deeply nested indentations termed 'Callback Hell' or the 'Pyramid of Doom'. Furthermore, forgetting to return immediately after invoking a callback often caused duplicate executions and unhandled exceptions.",
      table: {
        headers: ["Pattern", "Strengths", "Weaknesses", "Modern Status"],
        rows: [
          ["Error-First Callbacks", "Low memory overhead; native in legacy C++ bindings", "Pyramid of Doom, fragile error handling, difficult composition", "Legacy (wrapped via util.promisify)"],
          ["Promise Chains (.then)", "Linear composition; centralized .catch error handling", "Verbose syntax; variable scoping across steps is awkward", "Standard Foundation"],
          ["Async / Await", "Clean try/catch syntax; sequential readability", "Requires care to avoid unintended serial bottlenecks", "Modern Industry Standard"]
        ]
      }
    },
    {
      title: "Promise Concurrency: Sequential vs Parallel Execution",
      explanation: "A frequent performance anti-pattern in Node servers is awaiting independent asynchronous operations sequentially:\n\n```javascript\n// BAD: Takes 300ms + 200ms = 500ms total\nconst user = await fetchUser(id); // 300ms\nconst settings = await fetchSettings(id); // 200ms\n\n// GOOD: Runs in parallel, takes only max(300ms, 200ms) = 300ms total\nconst [user, settings] = await Promise.all([\n  fetchUser(id),\n  fetchSettings(id)\n]);\n```\n\nWhen orchestrating concurrent tasks, choose the appropriate Promise combinator:",
      bullets: [
        "Promise.all: Resolves when all promises resolve. Rejects immediately if ANY single promise fails (fail-fast behavior).",
        "Promise.allSettled: Waits for all promises to either resolve or reject, returning an array of outcome objects ({ status: 'fulfilled', value } or { status: 'rejected', reason }). Ideal for batch processing where one failure should not abort remaining tasks.",
        "Promise.race: Resolves or rejects as soon as the very first promise settles (useful for request timeout wrappers).",
        "Promise.any: Resolves as soon as the first promise successfully fulfills, ignoring rejections unless all promises fail."
      ]
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Never launch an asynchronous operation without either awaiting it or attaching a `.catch()` handler. Unhandled promise rejections in modern Node.js versions terminate the process with a non-zero exit code (`ERR_UNHANDLED_REJECTION`). Furthermore, always distinguish between operational errors (expected network timeouts or validation rejections) and programmer errors (syntax bugs or referencing properties of undefined)."
    }
  ],
  questions: [
    {
      id: "q-node-078-1",
      prompt: "What was the universal signature convention for legacy Node.js asynchronous callbacks?",
      options: [
        { id: "a", label: "callback(data, error)" },
        { id: "b", label: "callback(error, result)" },
        { id: "c", label: "callback(status, code, data)" },
        { id: "d", label: "callback(null)" }
      ],
      correctIndex: 1,
      explanation: "The Node.js error-first callback pattern requires the first argument to be an Error object (or null if successful), and the second argument to be the successful result."
    },
    {
      id: "q-node-078-2",
      prompt: "What happens if one of the promises passed to `Promise.all()` rejects?",
      options: [
        { id: "a", label: "Promise.all waits for all other promises to finish before rejecting" },
        { id: "b", label: "Promise.all rejects immediately with the error of the first failed promise, discarding remaining pending results" },
        { id: "c", label: "It silently replaces the failed promise with null" },
        { id: "d", label: "It restarts the entire operating system" }
      ],
      correctIndex: 1,
      explanation: "Promise.all is fail-fast: if any single promise rejects, the entire returned promise rejects immediately with that error."
    },
    {
      id: "q-node-078-3",
      prompt: "When should you prefer `Promise.allSettled()` over `Promise.all()`?",
      options: [
        { id: "a", label: "When you want the code to run in a web browser only" },
        { id: "b", label: "When you want all operations to complete regardless of whether some succeed or fail, such as sending batch emails" },
        { id: "c", label: "When you need to stop all operations on the very first error" },
        { id: "d", label: "When working strictly with synchronous functions" }
      ],
      correctIndex: 1,
      explanation: "Promise.allSettled waits for every promise to resolve or reject, providing the individual outcome of each task without short-circuiting on failure."
    },
    {
      id: "q-node-078-4",
      prompt: "Which Node.js built-in utility converts legacy error-first callback functions into Promise-returning functions?",
      options: [
        { id: "a", label: "util.promisify" },
        { id: "b", label: "async.transform" },
        { id: "c", label: "events.toPromise" },
        { id: "d", label: "process.makeAsync" }
      ],
      correctIndex: 0,
      explanation: "node:util provides promisify(), which takes an error-first callback-based function and returns a version that returns standard Promises."
    },
    {
      id: "q-node-078-5",
      prompt: "What happens in modern Node.js when an unhandled Promise rejection occurs?",
      options: [
        { id: "a", label: "It is silently ignored" },
        { id: "b", label: "The Node.js process emits an unhandledRejection event and terminates with an error exit code" },
        { id: "c", label: "The browser opens automatically" },
        { id: "d", label: "The rejected promise is converted to an empty string" }
      ],
      correctIndex: 1,
      explanation: "In modern Node.js, unhandled promise rejections trigger a crash with an unhandledRejection error to prevent silent data corruption."
    },
    {
      id: "q-node-078-6",
      prompt: "How can you implement a 5-second request timeout on an asynchronous fetch using Promise combinators?",
      options: [
        { id: "a", label: "Using `Promise.race([fetchPromise, timeoutPromise])`" },
        { id: "b", label: "Using `Promise.all([fetchPromise, timeoutPromise])`" },
        { id: "c", label: "Using `setTimeout` inside a while loop" },
        { id: "d", label: "Using `process.nextTick`" }
      ],
      correctIndex: 0,
      explanation: "Promise.race resolves or rejects with whichever promise settles first, allowing a timeout promise to cancel or reject before a slow network request."
    },
    {
      id: "q-node-078-7",
      prompt: "Why is executing independent database calls sequentially with individual `await` statements often considered a performance defect?",
      options: [
        { id: "a", label: "Because await corrupts the database connection" },
        { id: "b", label: "Because it introduces artificial serial latency where total time equals the sum of all queries instead of the maximum single query time" },
        { id: "c", label: "Because await converts JSON data to XML" },
        { id: "d", label: "Because Node cannot execute more than one function per file" }
      ],
      correctIndex: 1,
      explanation: "Awaiting independent tasks sequentially multiplies the total round-trip latency. Running them concurrently with Promise.all reduces latency to the single longest task."
    },
    {
      id: "q-node-078-8",
      prompt: "What does an `async` function always return in JavaScript?",
      options: [
        { id: "a", label: "A Callback function" },
        { id: "b", label: "A Promise (wrapping the returned value or thrown error)" },
        { id: "c", label: "A raw Buffer" },
        { id: "d", label: "A Boolean status flag" }
      ],
      correctIndex: 1,
      explanation: "Any function declared with the async keyword automatically returns a Promise, resolving with the returned value or rejecting if an exception is thrown."
    },
    {
      id: "q-node-078-9",
      prompt: "What happens if a promise is rejected and caught inside a `try/catch` block within an `async` function?",
      options: [
        { id: "a", label: "The error is swallowed and the program crashes" },
        { id: "b", label: "The catch block receives the rejection reason as an error object, allowing graceful recovery or custom logging" },
        { id: "c", label: "The entire process must be restarted" },
        { id: "d", label: "The database rolls back automatically" }
      ],
      correctIndex: 1,
      explanation: "In async/await syntax, a rejected promise unwraps into a caught exception inside the surrounding try/catch block."
    },
    {
      id: "q-node-078-10",
      prompt: "What is the difference between an operational error and a programmer error?",
      options: [
        { id: "a", label: "Operational errors are bugs in code; programmer errors are hardware failures" },
        { id: "b", label: "Operational errors represent known runtime situations (network timeout, invalid user input); programmer errors represent bugs (syntax error, reading property of undefined)" },
        { id: "c", label: "There is no difference in JavaScript" },
        { id: "d", label: "Operational errors only occur in HTML files" }
      ],
      correctIndex: 1,
      explanation: "Operational errors are expected runtime conditions to handle gracefully, whereas programmer errors are bugs that require code fixes."
    }
  ]
};

// LESSON 079: FILE SYSTEM, PATHS AND STREAMS
const lesson079: CurriculumItem = {
  id: "item-node-079-filesystem-paths-streams",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-async-utilities",
  moduleTitle: "Module 2: Asynchronous APIs and Server Utilities",
  modulePosition: 2,
  title: "File System, Paths and Streams",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "File System, Paths and Streams: Memory-Efficient I/O & Path Security",
  contentDescription: "Master non-blocking file I/O, cross-platform path resolution via node:path, path traversal vulnerability defenses, and memory-efficient stream processing with pipeline.",
  codeSnippet: {
    language: "javascript",
    code: `// Memory-efficient file streaming and path resolution
import path from 'node:path';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

async function compressLogFile(filename) {
  // Prevent path traversal vulnerabilities by enforcing directory confinement
  const safeBaseDir = path.resolve(process.cwd(), 'logs');
  const targetPath = path.resolve(safeBaseDir, filename);

  if (!targetPath.startsWith(safeBaseDir)) {
    throw new Error('SECURITY VIOLATION: Directory traversal attempt detected');
  }

  const sourceStream = fs.createReadStream(targetPath);
  const gzipStream = zlib.createGzip();
  const destinationStream = fs.createWriteStream(\`\${targetPath}.gz\`);

  // Pipeline handles error cleanup, backpressure, and resource closure automatically
  await pipeline(sourceStream, gzipStream, destinationStream);
  console.log('Streaming compression completed with zero memory spikes!');
}`
  },
  sections: [
    {
      title: "Core Concept: Buffering vs Streaming Data",
      explanation: "When an application needs to read or write a file, it can take one of two fundamental approaches:\n\n1. Fully Buffered I/O (`fs.readFile`): Node loads the entire contents of the file into V8 process memory as a single contiguous buffer before returning it. While acceptable for small configuration files or templates (under a few megabytes), using `readFile` on a 2-gigabyte video or large CSV export causes massive memory spikes, triggers V8 garbage collector freezes, and risks crashing the server with an `Out Of Memory` (OOM) fatal error.\n\n2. Stream-based I/O (`fs.createReadStream`): Node reads the file in small sequential chunks (defaulting to 64KB per chunk) as data arrives, pushing each chunk through an asynchronous pipeline directly to the client socket or disk destination. Even when processing a 50-gigabyte file, process memory usage remains virtually flat at only a few megabytes."
    },
    {
      title: "Cross-Platform Path Resolution: path.join vs path.resolve",
      explanation: "Operating systems differ fundamentally in file system conventions: Windows utilizes backslashes (`C:\\Users\\admin`), while Linux and macOS utilize forward slashes (`/home/admin`). Concatenating path strings manually using string templates (`${dir}/${file}`) guarantees cross-platform failures.\n\nThe `node:path` standard library provides cross-platform normalization tools:",
      table: {
        headers: ["Function", "Behavior", "Output Example (POSIX vs Windows)"],
        rows: [
          ["path.join()", "Joins all segments using platform-specific separator and normalizes relative segments", "path.join('src', 'utils') -> 'src/utils' or 'src\\\\utils'"],
          ["path.resolve()", "Resolves segments into an absolute path, treating the current working directory as the root if relative", "path.resolve('logs') -> '/var/app/logs' or 'C:\\\\app\\\\logs'"],
          ["path.extname()", "Extracts the extension portion of a path", "path.extname('index.html') -> '.html'"],
          ["path.basename()", "Returns the final portion of a path", "path.basename('/etc/nginx/nginx.conf') -> 'nginx.conf'"]
        ]
      }
    },
    {
      title: "Path Traversal Security Defense",
      explanation: "A catastrophic web vulnerability occurs when an API endpoint accepts a user-controlled filename parameter and passes it directly to file operations:\n\n```javascript\n// VULNERABLE: Attacker requests: filename = '../../../../etc/passwd'\nconst file = await fs.readFile(path.join('/app/uploads', req.query.filename));\n```\n\nTo neutralize path traversal attacks, always resolve the path to an absolute string and verify that it strictly begins with the intended base directory:\n\n```javascript\nconst safeBase = path.resolve('/app/uploads');\nconst resolvedTarget = path.resolve(safeBase, req.query.filename);\nif (!resolvedTarget.startsWith(safeBase)) {\n  throw new Error('Access denied: Invalid file path');\n}\n```"
    },
    {
      title: "Backpressure and stream.pipeline",
      explanation: "When data is read faster than the receiving destination can write it (e.g., reading from high-speed NVMe disk to write over a slow 3G cellular network connection), memory buffers fill up. This phenomenon is called Backpressure.\n\nLegacy `.pipe()` methods had a severe architectural flaw: if either stream errored, file descriptors remained open, leaking operating system resources. Modern Node.js provides `pipeline` from `node:stream/promises`. Pipeline automatically forwards backpressure signals, coordinates chunk flow, and guarantees that every stream in the chain is properly destroyed upon error or completion."
    }
  ],
  questions: [
    {
      id: "q-node-079-1",
      prompt: "Why is `fs.createReadStream` preferred over `fs.readFile` when serving large files over HTTP?",
      options: [
        { id: "a", label: "Because createReadStream encrypts files automatically" },
        { id: "b", label: "Because createReadStream processes files in small sequential chunks, keeping memory consumption low and constant regardless of file size" },
        { id: "c", label: "Because readFile only works on Windows" },
        { id: "d", label: "Because createReadStream deletes the file after reading" }
      ],
      correctIndex: 1,
      explanation: "Streams process files chunk by chunk without loading the entire payload into RAM, avoiding out-of-memory crashes on large files."
    },
    {
      id: "q-node-079-2",
      prompt: "What security risk arises from directly passing unsanitized user input into `path.join('/uploads', userParam)`?",
      options: [
        { id: "a", label: "SQL Injection" },
        { id: "b", label: "Cross-Site Scripting (XSS)" },
        { id: "c", label: "Path Traversal (allowing malicious actors to read arbitrary system files like /etc/passwd via ../)" },
        { id: "d", label: "Denial of Service via CSS injection" }
      ],
      correctIndex: 2,
      explanation: "Path traversal allows attackers to inject '../' sequences to navigate out of the intended directory and access sensitive server files."
    },
    {
      id: "q-node-079-3",
      prompt: "How does `path.resolve()` differ from `path.join()`?",
      options: [
        { id: "a", label: "path.resolve always returns an absolute path from the root or current working directory" },
        { id: "b", label: "path.join only works on Linux machines" },
        { id: "c", label: "path.resolve converts text to uppercase" },
        { id: "d", label: "path.join deletes duplicate files" }
      ],
      correctIndex: 0,
      explanation: "path.resolve processes path segments from right to left until an absolute path is formed, falling back to process.cwd() if relative."
    },
    {
      id: "q-node-079-4",
      prompt: "What is backpressure in Node.js streams?",
      options: [
        { id: "a", label: "An error thrown when a file is locked by another program" },
        { id: "b", label: "The condition where a readable stream produces data faster than the writable stream can consume it" },
        { id: "c", label: "A technique for compressing JPEG images" },
        { id: "d", label: "A database transaction isolation level" }
      ],
      correctIndex: 1,
      explanation: "Backpressure occurs when the consumer cannot keep up with the producer; the stream signals the readable source to pause until the write buffer drains."
    },
    {
      id: "q-node-079-5",
      prompt: "Why should `stream.pipeline()` be used instead of `.pipe()`?",
      options: [
        { id: "a", label: "pipeline() automatically cleans up, destroys, and closes all streams if an error occurs, preventing file descriptor leaks" },
        { id: "b", label: "pipe() is deprecated in all versions of JavaScript" },
        { id: "c", label: "pipeline() only works with MongoDB" },
        { id: "d", label: "pipe() runs synchronously and blocks the thread" }
      ],
      correctIndex: 0,
      explanation: "Legacy .pipe() does not forward errors or close open streams properly on failures; stream.pipeline properly manages resource cleanup and Promise settlement."
    },
    {
      id: "q-node-079-6",
      prompt: "Which promise-based standard library module is used for modern asynchronous file system operations?",
      options: [
        { id: "a", label: "node:fs/promises" },
        { id: "b", label: "node:file" },
        { id: "c", label: "node:storage" },
        { id: "d", label: "node:async-fs" }
      ],
      correctIndex: 0,
      explanation: "The node:fs/promises module exposes all native file system operations as Promise-returning functions that seamlessly support async/await."
    },
    {
      id: "q-node-079-7",
      prompt: "What is the default chunk size of a standard `fs.createReadStream()` in Node.js?",
      options: [
        { id: "a", label: "1 kilobyte" },
        { id: "b", label: "64 kilobytes (64 * 1024 bytes)" },
        { id: "c", label: "1 megabyte" },
        { id: "d", label: "Entire file size" }
      ],
      correctIndex: 1,
      explanation: "By default, file read streams use a highWaterMark buffer of 64KB per chunk (which can be customized in the options parameter)."
    },
    {
      id: "q-node-079-8",
      prompt: "What method checks if a file exists asynchronously in `node:fs/promises` without raising deprecation warnings?",
      options: [
        { id: "a", label: "fs.exists()" },
        { id: "b", label: "fs.access()" },
        { id: "c", label: "fs.isFilePresent()" },
        { id: "d", label: "fs.probe()" }
      ],
      correctIndex: 1,
      explanation: "fs.access() tests user permissions for the specified file; if the file does not exist, it rejects with an ENOENT error code."
    },
    {
      id: "q-node-079-9",
      prompt: "How can you securely verify that a resolved target path does not escape a safe base uploads directory?",
      options: [
        { id: "a", label: "Check if the path string contains '..' using .includes('..')" },
        { id: "b", label: "Resolve both paths with path.resolve() and verify targetPath.startsWith(safeBaseDir)" },
        { id: "c", label: "Convert the path to lowercase" },
        { id: "d", label: "Replace slashes with underscores" }
      ],
      correctIndex: 1,
      explanation: "Resolving absolute paths eliminates relative segments, after which verifying that targetPath.startsWith(safeBaseDir) guarantees confinement."
    },
    {
      id: "q-node-079-10",
      prompt: "What stream type is a gzip compression stream created with `zlib.createGzip()`?",
      options: [
        { id: "a", label: "A Readable stream only" },
        { id: "b", label: "A Writable stream only" },
        { id: "c", label: "A Transform (Duplex) stream that reads uncompressed input and writes compressed output" },
        { id: "d", label: "A PassThrough stream" }
      ],
      correctIndex: 2,
      explanation: "A Transform stream is a duplex stream where the output is computed based on the input; zlib compresses input chunks and emits compressed bytes."
    }
  ]
};

// LESSON 080: EVENTS, BUFFERS AND DEBUGGING
const lesson080: CurriculumItem = {
  id: "item-node-080-events-buffers-debugging",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-async-utilities",
  moduleTitle: "Module 2: Asynchronous APIs and Server Utilities",
  modulePosition: 2,
  title: "Events, Buffers and Debugging",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Events, Buffers and Debugging: Event-Driven Design & Memory Introspection",
  contentDescription: "Master Node's EventEmitter architecture, event listener memory leak diagnostics, binary Buffer manipulation, structured logging with Pino, and interactive debugging via the V8 inspector.",
  codeSnippet: {
    language: "javascript",
    code: `// Custom Event-Driven Architecture with Structured Diagnostics
import { EventEmitter } from 'node:events';

class PaymentProcessor extends EventEmitter {
  async processPayment(orderId, amount) {
    this.emit('payment:start', { orderId, amount, timestamp: Date.now() });
    
    try {
      // Simulate asynchronous payment gateway verification
      if (amount <= 0) throw new Error('Invalid payment amount');
      
      const transactionId = \`txn_\${Math.random().toString(36).substring(2, 9)}\`;
      this.emit('payment:success', { orderId, transactionId });
      return { success: true, transactionId };
    } catch (error) {
      this.emit('payment:failure', { orderId, error: error.message });
      throw error;
    }
  }
}

// Consuming events decoupled from core payment business logic
const payments = new PaymentProcessor();
payments.on('payment:success', evt => console.log('Audit Notification:', evt));`
  },
  sections: [
    {
      title: "Core Concept: The EventEmitter Pattern",
      explanation: "Much of the Node.js core standard library—including HTTP servers, TCP sockets, and file streams—is built upon the `EventEmitter` class from `node:events`. The event-driven architecture enables loose coupling: an object can announce that a state transition or system event has occurred (`this.emit('user:registered', user)`), and any number of independent listeners can react without the emitter knowing who is listening."
    },
    {
      title: "Memory Leaks and the MaxListeners Warning",
      explanation: "When you attach a listener via `emitter.on('event', handler)`, the emitter stores a reference to that function in an internal listener array. If an application repeatedly attaches listeners to a long-lived emitter inside an HTTP route handler, the listeners accumulate in memory and prevent garbage collection.\n\nTo alert developers to memory leaks, Node prints a warning whenever more than 10 listeners are attached to a single event on an emitter (`MaxListenersExceededWarning`). Always remove listeners when they are no longer needed using `emitter.off()` or use `emitter.once()` for one-time events."
    },
    {
      title: "Buffers: Raw Binary Memory in Node",
      explanation: "Before ES6 TypedArrays, JavaScript had no mechanism for manipulating raw binary data. Node introduced the `Buffer` class to allocate and manipulate raw binary memory outside the V8 heap. Buffers are ubiquitous when reading files, receiving network packets, or processing image uploads:",
      table: {
        headers: ["Buffer Method", "Purpose", "Security & Architectural Note"],
        rows: [
          ["Buffer.from(data, encoding)", "Encodes strings, arrays, or existing buffers into binary", "Supports 'utf8', 'hex', 'base64', 'ascii'"],
          ["Buffer.alloc(size)", "Allocates a zero-initialized buffer of specified byte size", "Safe: memory is wiped with zeros before return"],
          ["Buffer.allocUnsafe(size)", "Allocates uninitialized memory chunk directly from OS", "Fast but UNSAFE: may contain leftover sensitive memory bytes"],
          ["buf.toString('base64')", "Decodes binary buffer back into desired string format", "Crucial for transmitting binary data over JSON"]
        ]
      }
    },
    {
      title: "Production Debugging & Structured Logging",
      explanation: "Relying on `console.log` in production is an anti-pattern: it blocks I/O synchronously when writing to terminal outputs, provides no standard timestamps, and cannot be parsed cleanly by log management systems like Datadog, ElasticSearch, or CloudWatch.\n\nProduction applications employ structured JSON loggers (such as `pino` or `winston`). For deep debugging, Node provides an integrated V8 debugger protocol activated via `node --inspect index.js`, enabling developers to attach Chrome DevTools or VS Code breakpoints to inspect the live call stack, scope variables, and heap allocations."
    }
  ],
  questions: [
    {
      id: "q-node-080-1",
      prompt: "What does Node's `MaxListenersExceededWarning` typically signify in an application?",
      options: [
        { id: "a", label: "The server network bandwidth has been exceeded" },
        { id: "b", label: "A potential memory leak where listeners are repeatedly attached to an EventEmitter without being cleaned up" },
        { id: "c", label: "Too many users are connected to the database" },
        { id: "d", label: "The package.json file has more than 10 dependencies" }
      ],
      correctIndex: 1,
      explanation: "The default threshold of 10 listeners per event warns developers of potential memory leaks caused by repeatedly binding event listeners in request cycles."
    },
    {
      id: "q-node-080-2",
      prompt: "Which Buffer allocation method is safest for production when creating a new byte buffer?",
      options: [
        { id: "a", label: "Buffer.allocUnsafe(size)" },
        { id: "b", label: "Buffer.alloc(size)" },
        { id: "c", label: "new Buffer(size)" },
        { id: "d", label: "Buffer.create(size)" }
      ],
      correctIndex: 1,
      explanation: "Buffer.alloc(size) zeroes out memory before returning it, preventing residual sensitive memory data from leaking into the buffer."
    },
    {
      id: "q-node-080-3",
      prompt: "How does `emitter.once('event', handler)` differ from `emitter.on('event', handler)`?",
      options: [
        { id: "a", label: "once() triggers the handler only the first time the event is emitted, then unregisters itself automatically" },
        { id: "b", label: "once() executes synchronously before all other functions" },
        { id: "c", label: "once() can only be called from inside a class" },
        { id: "d", label: "once() encrypts the event payload" }
      ],
      correctIndex: 0,
      explanation: "emitter.once() automatically removes the listener immediately after its first invocation, preventing listener buildup."
    },
    {
      id: "q-node-080-4",
      prompt: "What CLI flag launches a Node.js application with the V8 debugging inspector enabled?",
      options: [
        { id: "a", label: "node --inspect app.js" },
        { id: "b", label: "node --debug-full app.js" },
        { id: "c", label: "node --breakpoint-mode app.js" },
        { id: "d", label: "node --trace-all app.js" }
      ],
      correctIndex: 0,
      explanation: "The --inspect flag starts the V8 inspector server on port 9229, allowing developers to connect Chrome DevTools or VS Code for interactive debugging."
    },
    {
      id: "q-node-080-5",
      prompt: "Why is `console.log()` discouraged for high-throughput production logging in Node.js?",
      options: [
        { id: "a", label: "Because console.log crashes the server after 100 calls" },
        { id: "b", label: "Because it lacks structured metadata, cannot be ingested easily by log aggregators, and can block synchronously when writing to terminal stdout" },
        { id: "c", label: "Because console.log is only available in web browsers" },
        { id: "d", label: "Because console.log alters variable values" }
      ],
      correctIndex: 1,
      explanation: "console.log writes unstructured text and may block synchronous standard output streams, whereas modern loggers emit asynchronous structured JSON."
    },
    {
      id: "q-node-080-6",
      prompt: "Where is Buffer memory allocated relative to the V8 JavaScript heap?",
      options: [
        { id: "a", label: "Directly in the CPU cache registers" },
        { id: "b", label: "Outside the V8 heap in raw operating system memory managed via C++ bindings" },
        { id: "c", label: "In browser cookies" },
        { id: "d", label: "In the git repository cache" }
      ],
      correctIndex: 1,
      explanation: "Buffer memory is allocated outside the V8 heap, which allows handling large binary payloads without triggering excessive JavaScript garbage collection overhead."
    },
    {
      id: "q-node-080-7",
      prompt: "Which encoding format is standard for converting binary image data into text suitable for embedding in JSON payloads?",
      options: [
        { id: "a", label: "base64" },
        { id: "b", label: "utf-16le" },
        { id: "c", label: "binary-octal" },
        { id: "d", label: "ascii-8bit" }
      ],
      correctIndex: 0,
      explanation: "Base64 encodes arbitrary binary bytes into an ASCII string representation of 64 printable characters, making it safe for JSON transmission."
    },
    {
      id: "q-node-080-8",
      prompt: "What happens if an `error` event is emitted on an EventEmitter that has no listener registered for `'error'`?",
      options: [
        { id: "a", label: "The event is safely ignored" },
        { id: "b", label: "Node.js treats it as an uncaught exception, prints the stack trace, and crashes the process" },
        { id: "c", label: "The error is logged to a hidden text file" },
        { id: "d", label: "The event emitter resets its listeners" }
      ],
      correctIndex: 1,
      explanation: "EventEmitter treats 'error' as a special event: if no listener is attached when an 'error' event emits, Node throws an unhandled exception and exits."
    },
    {
      id: "q-node-080-9",
      prompt: "What does the `EventEmitter.defaultMaxListeners` property control?",
      options: [
        { id: "a", label: "The maximum number of HTTP connections allowed per second" },
        { id: "b", label: "The default threshold before a warning is logged when adding listeners to any EventEmitter instance" },
        { id: "c", label: "The number of CPU threads in libuv" },
        { id: "d", label: "The database query timeout" }
      ],
      correctIndex: 1,
      explanation: "defaultMaxListeners sets the global threshold (default 10) for warning logs when attaching multiple listeners to any single EventEmitter instance."
    },
    {
      id: "q-node-080-10",
      prompt: "What is the primary advantage of structured JSON logging libraries like `pino`?",
      options: [
        { id: "a", label: "They output colored comic book fonts" },
        { id: "b", label: "They format log records as newline-delimited JSON with timestamps and log levels for automated parsing and alerting" },
        { id: "c", label: "They prevent developers from writing code bugs" },
        { id: "d", label: "They store logs directly in the user's browser" }
      ],
      correctIndex: 1,
      explanation: "Structured loggers emit NDJSON (newline-delimited JSON) with standardized keys (level, time, msg, pid), enabling centralized analysis in enterprise monitoring systems."
    }
  ]
};

// MODULE 2 ASSESSMENT QUIZ (10 comprehensive questions)
const nodeModule02Quiz: CurriculumItem = {
  id: "item-node-m2-quiz",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-async-utilities",
  moduleTitle: "Module 2: Asynchronous APIs and Server Utilities",
  modulePosition: 2,
  title: "Module 2 Assessment: Asynchronous APIs & Utilities MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 4,
  contentHeading: "Module 2 Assessment: Control Flow, Streams, Events & Diagnostics",
  contentDescription: "Evaluate your understanding of asynchronous control flow, Promise concurrency, backpressure in streams, path security, EventEmitters, raw Buffers, and V8 debugging.",
  questions: [
    ...(lesson078.questions || []).slice(0, 4),
    ...(lesson079.questions || []).slice(0, 3),
    ...(lesson080.questions || []).slice(0, 3)
  ]
};

// MODULE 2 HANDS-ON ASSESSMENT LAB
const nodeModule02Lab: CurriculumItem = {
  id: "item-node-m2-lab",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-02-async-utilities",
  moduleTitle: "Module 2: Asynchronous APIs and Server Utilities",
  modulePosition: 2,
  title: "Module 2 Assessment: Streaming File Compressor & Audit Dispatcher",
  duration: "60 mins",
  type: "assignment",
  position: 5,
  contentHeading: "Module 2 Project Lab: High-Performance Stream Pipeline & Event Hub",
  contentDescription: "Build a production-grade utility that processes large multi-megabyte log archives using Transform streams and gzip compression with zero memory bloat, protected against directory traversal attacks.",
  sections: [
    {
      title: "Lab Objectives & Requirements",
      explanation: "In this practical lab, you will engineer a high-throughput file compression and audit logging system meeting strict enterprise reliability standards:",
      bullets: [
        "Path Traversal Sanitation: Build a secure path resolver that accepts an input filename, validates it against a designated `storage/` directory, and rejects any malicious `../` traversal attempt.",
        "Stream Pipeline Architecture: Use `node:stream/promises` `pipeline()` to stream a source file through a `zlib.createGzip()` transform stream directly to a destination `.gz` file without loading entire payloads into memory.",
        "Custom Audit Event Hub: Extend `EventEmitter` to create a `CompressionAuditHub` that emits `archive:start`, `archive:progress` (bytes processed), and `archive:complete` events.",
        "Memory Verification: Log `process.memoryUsage().heapUsed` before and after streaming to verify that memory consumption remains flat even on files larger than 100MB."
      ]
    },
    {
      title: "Expected Deliverable Specification",
      explanation: "Submit your code containing:\n1. `src/utils/securePath.js`: Directory confinement validation helper.\n2. `src/services/compressor.js`: Asynchronous stream pipeline function.\n3. `src/events/auditHub.js`: Event-driven audit observer emitting structured status events.\n4. `src/scripts/testCompress.js`: Demonstration script compressing sample data and verifying memory usage."
    }
  ]
};

// Exporting Module 2
export const nodeModule02: CurriculumSubModule = {
  id: "module-node-02-async-utilities",
  title: "Module 2: Asynchronous APIs and Server Utilities",
  description: "Master asynchronous control flow, Promise concurrency, streaming file I/O, path traversal defenses, EventEmitter patterns, and raw binary Buffers.",
  position: 2,
  duration: "2 hours, 25 mins",
  items: [
    lesson078,
    lesson079,
    lesson080,
    nodeModule02Quiz,
    nodeModule02Lab
  ]
};
