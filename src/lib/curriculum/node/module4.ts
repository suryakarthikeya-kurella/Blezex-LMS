import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 4: ROBUST API ARCHITECTURE
// Lessons 086 - 091 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 086: CONTROLLERS, SERVICES AND REPOSITORIES
const lesson086: CurriculumItem = {
  id: "item-node-086-controllers-services-repositories",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "Controllers, Services and Repositories",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Controllers, Services and Repositories: The 3-Tier Enterprise Pattern",
  contentDescription: "Master separation of concerns in enterprise backends by decoupling HTTP transport logic from core business domains and raw database persistence layers.",
  codeSnippet: {
    language: "javascript",
    code: `// 1. Repository: Encapsulates pure SQL/database queries
export class CourseRepository {
  constructor(private dbPool) {}
  async findById(id) {
    const { rows } = await this.dbPool.query('SELECT * FROM courses WHERE id = $1', [id]);
    return rows[0] || null;
  }
}

// 2. Service: Encapsulates pure business logic and rules
export class CourseService {
  constructor(private courseRepo) {}
  async getCourseDetails(id, requestingUser) {
    const course = await this.courseRepo.findById(id);
    if (!course) throw new NotFoundError('Course not found');
    if (course.isDraft && requestingUser.role !== 'admin') {
      throw new ForbiddenError('Draft courses are accessible by administrators only');
    }
    return course;
  }
}

// 3. Controller: Translates HTTP request/response
export class CourseController {
  constructor(private courseService) {}
  getCourse = async (req, res, next) => {
    try {
      const course = await this.courseService.getCourseDetails(req.params.id, req.user);
      return res.status(200).json({ success: true, data: course });
    } catch (err) {
      next(err);
    }
  };
}`
  },
  sections: [
    {
      title: "Core Concept: The Problem with Fat Controllers",
      explanation: "In small tutorials, developers frequently write database queries, validation checks, email dispatch calls, and HTTP responses inside a single callback function attached to `app.get()`. In enterprise systems, this 'fat controller' pattern creates an unmaintainable codebase. If business logic is inextricably bound to Express `req` and `res` objects, you cannot test that logic without mocking HTTP servers, nor can you reuse it inside CLI scripts, cron jobs, or Kafka message consumers.\n\nThe industry solution is the 3-Tier Layered Architecture: Controllers, Services, and Repositories."
    },
    {
      title: "The Responsibilities of Each Layer",
      explanation: "Each tier has a strict, well-defined single responsibility:",
      table: {
        headers: ["Layer", "Knows About HTTP?", "Knows About Database?", "Primary Responsibility"],
        rows: [
          ["Controller", "YES (req, res, next, cookies)", "NO (Calls service methods)", "Extracts input, chooses HTTP status, formats JSON response"],
          ["Service", "NO (Zero Express imports)", "NO (Interacts via repository interface)", "Core business rules, validations, workflows, calculations"],
          ["Repository", "NO (Zero Express imports)", "YES (SQL, Prisma, Mongoose)", "Isolates raw database queries, connection pools, and transactions"]
        ]
      }
    },
    {
      title: "Dependency Injection for Seamless Testability",
      explanation: "Notice in the code snippet that classes do not instantiate their dependencies internally via `new DatabaseConnection()`. Instead, dependencies are passed into class constructors (`constructor(courseRepo) { ... }`). This pattern—Dependency Injection (DI)—allows automated unit tests to pass a mock repository containing in-memory arrays, testing 100% of complex business logic in 5 milliseconds without needing a running database."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Never pass Express `req` or `res` objects down into the Service or Repository layers. If a service needs an authenticated user's ID and an item price, extract `req.user.id` and `req.body.price` inside the controller and pass them as plain JavaScript primitives: `await courseService.purchase(userId, price)`. Keeping services pure guarantees that your business logic remains completely independent of web frameworks."
    }
  ],
  questions: [
    {
      id: "q-node-086-1",
      prompt: "What is the primary role of the Controller in a 3-tier backend architecture?",
      options: [
        { id: "a", label: "Writing raw SQL queries directly to tables" },
        { id: "b", label: "Extracting HTTP input, invoking the appropriate business service, and returning HTTP responses with status codes" },
        { id: "c", label: "Managing physical hard disk storage partitions" },
        { id: "d", label: "Serving CSS files to web browsers" }
      ],
      correctIndex: 1,
      explanation: "Controllers act as HTTP adapters between web protocol requests/responses and protocol-agnostic business domain services."
    },
    {
      id: "q-node-086-2",
      prompt: "Should the Service layer contain references to Express `req` or `res` objects?",
      options: [
        { id: "a", label: "Yes, all services must manipulate req and res directly" },
        { id: "b", label: "No, services should be framework-agnostic, accepting plain JavaScript arguments and returning data or throwing domain errors" },
        { id: "c", label: "Only if running in development mode" },
        { id: "d", label: "Only when connecting to MongoDB" }
      ],
      correctIndex: 1,
      explanation: "Decoupling services from Express allows business rules to be reused across queue consumers, CLI commands, and automated unit test suites."
    },
    {
      id: "q-node-086-3",
      prompt: "What is the primary function of the Repository layer?",
      options: [
        { id: "a", label: "Handling password hashing and JWT token signing" },
        { id: "b", label: "Isolating database queries and persistence details from the rest of the application" },
        { id: "c", label: "Serving static HTML files" },
        { id: "d", label: "Generating React JSX components" }
      ],
      correctIndex: 1,
      explanation: "Repositories encapsulate data persistence logic, ensuring that changing from PostgreSQL to MySQL or an ORM only impacts the repository layer."
    },
    {
      id: "q-node-086-4",
      prompt: "What is Dependency Injection (DI) in software engineering?",
      options: [
        { id: "a", label: "Injecting malicious SQL strings into URL query parameters" },
        { id: "b", label: "Passing external dependencies into a class or function (e.g. via constructor) rather than hard-coding their instantiation internally" },
        { id: "c", label: "Downloading npm packages during runtime execution" },
        { id: "d", label: "A browser rendering engine" }
      ],
      correctIndex: 1,
      explanation: "Dependency injection supplies objects with their dependencies from the outside, vastly improving testability, modularity, and decoupling."
    },
    {
      id: "q-node-086-5",
      prompt: "How does Dependency Injection simplify automated unit testing for business logic?",
      options: [
        { id: "a", label: "It makes tests run in the browser" },
        { id: "b", label: "It allows passing mock or stub repositories into services, testing business rules in isolation without hitting a real database" },
        { id: "c", label: "It deletes broken tests automatically" },
        { id: "d", label: "It compiles TypeScript into C++" }
      ],
      correctIndex: 1,
      explanation: "By injecting mock data repositories, unit tests can execute instantly in-memory, asserting business calculations without spinning up database servers."
    },
    {
      id: "q-node-086-6",
      prompt: "In which layer should complex data validations like 'cannot purchase course if student wallet balance is insufficient' reside?",
      options: [
        { id: "a", label: "In the Controller" },
        { id: "b", label: "In the Service layer" },
        { id: "c", label: "In the Express router definition" },
        { id: "d", label: "In the frontend button component" }
      ],
      correctIndex: 1,
      explanation: "Domain rules involving multiple business entities (wallets, courses, enrollments) belong squarely in the Service layer."
    },
    {
      id: "q-node-086-7",
      prompt: "What happens if a developer embeds raw SQL queries directly inside Express route handlers throughout the codebase?",
      options: [
        { id: "a", label: "The queries execute twice as fast" },
        { id: "b", label: "The code becomes highly coupled, making database schema refactoring, connection pooling, and automated testing extremely difficult" },
        { id: "c", label: "Express switches to GraphQL automatically" },
        { id: "d", label: "Database locks are eliminated" }
      ],
      correctIndex: 1,
      explanation: "Scattering raw SQL throughout controllers couples the web framework directly to database tables, creating brittle and untestable systems."
    },
    {
      id: "q-node-086-8",
      prompt: "What pattern can be used in JavaScript class controllers to preserve the `this` binding when passed as Express route handlers?",
      options: [
        { id: "a", label: "Declaring methods as arrow functions on class properties: `getCourse = async (req, res) => { ... }`" },
        { id: "b", label: "Using var instead of const" },
        { id: "c", label: "Deleting the class keyword" },
        { id: "d", label: "Passing null as the first argument" }
      ],
      correctIndex: 0,
      explanation: "Arrow functions lexically bind this to the class instance, preventing this from becoming undefined when Express invokes the callback."
    },
    {
      id: "q-node-086-9",
      prompt: "What should a Service function do when a requested business rule is violated (e.g., student is already enrolled)?",
      options: [
        { id: "a", label: "Call res.status(409).json()" },
        { id: "b", label: "Throw a domain-specific Error (e.g. `throw new ConflictError('Already enrolled')`)" },
        { id: "c", label: "Exit the process with process.exit()" },
        { id: "d", label: "Return null silently" }
      ],
      correctIndex: 1,
      explanation: "Services throw domain error instances; the calling controller or centralized error middleware catches them and maps them to HTTP responses."
    },
    {
      id: "q-node-086-10",
      prompt: "Which architectural principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions?",
      options: [
        { id: "a", label: "The Dependency Inversion Principle (the 'D' in SOLID)" },
        { id: "b", label: "The DRY principle" },
        { id: "c", label: "The Single Responsibility Principle" },
        { id: "d", label: "The Law of Demeter" }
      ],
      correctIndex: 0,
      explanation: "Dependency Inversion decouples high-level business logic from low-level data access implementations through abstract interfaces."
    }
  ]
};

// LESSON 087: CENTRALIZED ERROR HANDLING AND LOGGING
const lesson087: CurriculumItem = {
  id: "item-node-087-centralized-error-handling-logging",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "Centralized Error Handling and Logging",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Centralized Error Handling and Logging: AppError & Production Shielding",
  contentDescription: "Master enterprise error handling architectures, custom AppError hierarchies, operational vs programmer errors, suppressing stack traces, and structured logging.",
  codeSnippet: {
    language: "javascript",
    code: `// Custom Operational Application Error Hierarchy
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, true);
  }
}

// Global 4-Argument Error Handling Middleware
export function errorHandler(err, req, res, next) {
  const isProd = process.env.NODE_ENV === 'production';
  const statusCode = err.statusCode || 500;
  
  // Log diagnostic context internally for engineers
  console.error({
    message: err.message,
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: isProd ? undefined : err.stack
  });

  // Return safe client response (never leak internal stack traces in production)
  res.status(statusCode).json({
    success: false,
    error: err.isOperational ? err.message : 'An internal server error occurred',
    ...(isProd ? {} : { stack: err.stack })
  });
}`
  },
  sections: [
    {
      title: "Core Concept: The Error Handling Philosophy",
      explanation: "In an unmanaged Node.js application, an unhandled exception or rejected promise inside an asynchronous handler causes the entire process to crash, disconnecting all active users. Conversely, surrounding every individual line of code with repetitive `try/catch` statements leads to messy, unreadable controllers.\n\nA centralized error handling architecture provides a single, unified choke-point where all application failures are safely logged, categorized, and transformed into predictable client responses."
    },
    {
      title: "Operational Errors vs Programmer Bugs",
      explanation: "Production backends encounter two fundamentally different categories of failure:",
      table: {
        headers: ["Category", "Origin / Cause", "Examples", "Appropriate Handling"],
        rows: [
          ["Operational Errors", "Expected real-world runtime conditions", "Invalid user input, 404 not found, database unique constraint violation, expired token", "Return meaningful 4xx status code and user-friendly error message"],
          ["Programmer Errors", "Bugs in software code or configuration", "TypeError (reading property of undefined), syntax errors, passing wrong arguments", "Log stack trace, alert monitoring (Sentry), return generic 500 status"]
        ]
      }
    },
    {
      title: "Information Disclosure: Never Leak Stack Traces",
      explanation: "A severe security vulnerability in web applications is information leakage. When an unhandled database error occurs, returning the raw SQL error string and file-system stack trace to public users reveals table names, server directory paths, and software versions to malicious actors.\n\nIn production (`NODE_ENV=production`), the error handler must shield the user by returning a generic message ('An internal server error occurred') while logging the complete diagnostic stack trace to internal logging tools."
    },
    {
      title: "Asynchronous Error Forwarding in Express",
      explanation: "In Express 4, asynchronous errors thrown inside `async` route handlers do NOT automatically reach the 4-argument error middleware; they result in unhandled promise rejections unless caught and forwarded via `next(err)`. To solve this cleanly, use an async error wrapper utility or install the `express-async-errors` package, which monkey-patches Express routers to forward unhandled async rejections to `next()` automatically."
    }
  ],
  questions: [
    {
      id: "q-node-087-1",
      prompt: "What is the primary role of a custom `AppError` class in an Express backend?",
      options: [
        { id: "a", label: "To restart the computer when memory is low" },
        { id: "b", label: "To attach operational metadata (such as HTTP status codes and operational flags) to errors for centralized handling" },
        { id: "c", label: "To convert all database records to XML" },
        { id: "d", label: "To encrypt client passwords" }
      ],
      correctIndex: 1,
      explanation: "AppError extends the native JavaScript Error class, adding properties like statusCode (e.g. 404, 400) and isOperational flags for unified processing."
    },
    {
      id: "q-node-087-2",
      prompt: "Why is displaying full error stack traces in production API responses a major security vulnerability?",
      options: [
        { id: "a", label: "Because stack traces consume too much internet bandwidth" },
        { id: "b", label: "Because stack traces reveal internal source code paths, database schema details, and server library versions to potential attackers" },
        { id: "c", label: "Because JSON cannot format newlines" },
        { id: "d", label: "Because stack traces disable SSL encryption" }
      ],
      correctIndex: 1,
      explanation: "Stack traces disclose sensitive infrastructure details, file paths, and framework versions, facilitating reconnaissance for targeted cyberattacks."
    },
    {
      id: "q-node-087-3",
      prompt: "In Express 4, what happens if an unhandled error is thrown inside an `async` route handler that lacks a try/catch block?",
      options: [
        { id: "a", label: "Express automatically catches it and returns 500" },
        { id: "b", label: "It results in an UnhandledPromiseRejection, leaving the HTTP client hanging until timeout and potentially crashing the process" },
        { id: "c", label: "The server converts it into a 200 OK" },
        { id: "d", label: "It sends an SMS to the developer" }
      ],
      correctIndex: 1,
      explanation: "Express 4 does not automatically catch rejected promises in async handlers; errors must be passed via next(err) or handled via express-async-errors."
    },
    {
      id: "q-node-087-4",
      prompt: "How does centralized error middleware distinguish an expected operational error from an unexpected programmer bug?",
      options: [
        { id: "a", label: "By checking an `isOperational: true` boolean property on custom AppError instances" },
        { id: "b", label: "By checking if the error was thrown on a weekend" },
        { id: "c", label: "By reading the user's browser version" },
        { id: "d", label: "By pinging Google" }
      ],
      correctIndex: 0,
      explanation: "Trusted operational errors are explicitly flagged with isOperational = true, allowing the handler to return their specific messages safely."
    },
    {
      id: "q-node-087-5",
      prompt: "What should the global error handler return to the public client when an unhandled programmer bug (`isOperational: false`) occurs in production?",
      options: [
        { id: "a", label: "The complete file system path and line number where the bug occurred" },
        { id: "b", label: "A generic 500 response (e.g. `{ error: 'Internal Server Error' }`) while logging the diagnostic stack internally" },
        { id: "c", label: "An empty 200 OK" },
        { id: "d", label: "The entire database connection string" }
      ],
      correctIndex: 1,
      explanation: "Clients should receive an opaque 500 error without internal details, while the full diagnostic error is logged securely to internal monitoring systems."
    },
    {
      id: "q-node-087-6",
      prompt: "What native JavaScript method captures the call stack on a custom Error class instance?",
      options: [
        { id: "a", label: "Error.captureStackTrace(this, constructor)" },
        { id: "b", label: "process.getStack()" },
        { id: "c", label: "console.traceNow()" },
        { id: "d", label: "v8.recordCall()" }
      ],
      correctIndex: 0,
      explanation: "Error.captureStackTrace creates the .stack property on the target error instance, omitting internal constructor frames from the trace."
    },
    {
      id: "q-node-087-7",
      prompt: "Where should the 404 'Resource Not Found' handler be registered relative to routes and error middleware?",
      options: [
        { id: "a", label: "Above all routes" },
        { id: "b", label: "Immediately after all valid application routes, and directly before the 4-argument global error handler" },
        { id: "c", label: "Inside express.json()" },
        { id: "d", label: "In the HTML head tag" }
      ],
      correctIndex: 1,
      explanation: "If an incoming request reaches the end of the route table without matching, the 404 handler intercepts it and creates a NotFoundError before error handling."
    },
    {
      id: "q-node-087-8",
      prompt: "What does the package `express-async-errors` do?",
      options: [
        { id: "a", label: "It turns all errors into warnings" },
        { id: "b", label: "It patches Express route handlers to automatically catch rejected promises and forward them to `next(err)`" },
        { id: "c", label: "It deletes the node_modules folder" },
        { id: "d", label: "It disables try/catch statements" }
      ],
      correctIndex: 1,
      explanation: "express-async-errors eliminates boilerplate try/catch blocks in Express 4 by automatically catching rejected promises and routing them to next(err)."
    },
    {
      id: "q-node-087-9",
      prompt: "Which logging level in structured loggers like Pino indicates an issue that requires urgent engineering attention?",
      options: [
        { id: "a", label: "debug" },
        { id: "b", label: "info" },
        { id: "c", label: "warn" },
        { id: "d", label: "error or fatal" }
      ],
      correctIndex: 3,
      explanation: "The 'error' and 'fatal' levels signify serious unhandled exceptions or system component failures requiring immediate alerting."
    },
    {
      id: "q-node-087-10",
      prompt: "What process event in Node.js captures errors thrown outside any Express request context (e.g. background timers)?",
      options: [
        { id: "a", label: "process.on('uncaughtException', ...)" },
        { id: "b", label: "window.onerror" },
        { id: "c", label: "app.on('fatal', ...)" },
        { id: "d", label: "http.on('crash', ...)" }
      ],
      correctIndex: 0,
      explanation: "process.on('uncaughtException') catches any synchronous exception that was not caught anywhere in the application call stack."
    }
  ]
};

// LESSON 088: PAGINATION, FILTERING AND API DOCUMENTATION
const lesson088: CurriculumItem = {
  id: "item-node-088-pagination-filtering-api-docs",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "Pagination, Filtering and API Documentation",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Pagination, Filtering and API Documentation: Scalable Collections & OpenAPI",
  contentDescription: "Master offset vs cursor-based pagination, allowlisting filter parameters, preventing slow queries, and documenting REST interfaces using OpenAPI/Swagger.",
  codeSnippet: {
    language: "javascript",
    code: `// Scalable Keyset / Cursor-Based Pagination Query
export async function getCoursesCursorPaginated(db, { limit = 20, cursor = null, level = null }) {
  // Enforce strict upper bound on limit to protect server memory
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
  const values = [];
  let query = 'SELECT id, title, price, level, created_at FROM courses WHERE 1=1';

  if (level) {
    values.push(level);
    query += \` AND level = $\${values.length}\`;
  }

  // Keyset cursor pagination (scales in constant O(1) time regardless of depth)
  if (cursor) {
    values.push(cursor);
    query += \` AND created_at < $\${values.length}\`;
  }

  values.push(safeLimit + 1); // Fetch limit + 1 to calculate hasNextPage
  query += \` ORDER BY created_at DESC LIMIT $\${values.length}\`;

  const { rows } = await db.query(query, values);
  const hasMore = rows.length > safeLimit;
  const data = hasMore ? rows.slice(0, safeLimit) : rows;
  const nextCursor = hasMore ? data[data.length - 1].created_at : null;

  return { data, meta: { hasMore, nextCursor, count: data.length } };
}`
  },
  sections: [
    {
      title: "Core Concept: The Danger of Unbounded Queries",
      explanation: "Executing `SELECT * FROM courses` or querying a collection without pagination parameters is a ticking time bomb. When a platform launches with 50 courses, the endpoint responds in 10 milliseconds. As the catalog scales to 500,000 courses, an unbounded query loads gigabytes of data into Node.js process memory, maxes out CPU garbage collection, causes database connection pool starvation, and takes down the entire backend."
    },
    {
      title: "Offset Pagination vs Keyset / Cursor Pagination",
      explanation: "There are two primary paradigms for paginating database records:",
      table: {
        headers: ["Characteristic", "Offset Pagination (LIMIT / OFFSET)", "Keyset / Cursor Pagination (WHERE id > cursor)"],
        rows: [
          ["SQL Syntax", "`LIMIT 20 OFFSET 100000`", "`WHERE created_at < cursor ORDER BY created_at DESC LIMIT 20`"],
          ["Performance at Scale", "Degrades linearly O(N); database must scan and discard 100,000 rows", "Constant O(1) performance via B-Tree index seek"],
          ["Data Drifting", "Prone to skipped or duplicate rows if records are added mid-session", "Immune to insertion/deletion drift; stable results"],
          ["Page Jumping", "Easy (can jump directly to page 50)", "Difficult (must traverse sequentially forward/backward)"],
          ["Best For", "Internal admin tables with low record counts", "High-scale public feeds, infinite scroll, mobile apps"]
        ]
      }
    },
    {
      title: "Allowlisting Filter and Sort Columns",
      explanation: "Never allow clients to pass arbitrary database column names directly into SQL `ORDER BY` clauses:\n\n```javascript\n// VULNERABLE: Attacker injects: ?sort=(CASE+WHEN...)\nconst query = `SELECT * FROM courses ORDER BY ${req.query.sort}`;\n```\n\nAlways enforce an explicit allowlist of permitted sort keys and directions:\n\n```javascript\nconst ALLOWED_SORTS = new Set(['title', 'price', 'created_at']);\nconst sortColumn = ALLOWED_SORTS.has(req.query.sortBy) ? req.query.sortBy : 'created_at';\nconst sortDirection = req.query.order?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';\n```"
    },
    {
      title: "Interactive Documentation: OpenAPI and Swagger",
      explanation: "Production APIs require clear, machine-readable specifications. The OpenAPI Specification (OAS 3.0) provides a standardized JSON/YAML schema describing every endpoint, accepted query parameters, request bodies, authentication headers, and response status codes. Tools like `swagger-ui-express` render interactive documentation portals where frontend teams and external clients can test API calls live."
    }
  ],
  questions: [
    {
      id: "q-node-088-1",
      prompt: "Why does offset-based pagination (`OFFSET 100000`) become slow on large database tables?",
      options: [
        { id: "a", label: "Because numbers greater than 10,000 cannot be stored in RAM" },
        { id: "b", label: "Because the database engine must scan and discard all 100,000 prior rows before returning the requested 20 rows" },
        { id: "c", label: "Because OFFSET disables SSL certificates" },
        { id: "d", label: "Because Express does not support the OFFSET keyword" }
      ],
      correctIndex: 1,
      explanation: "The database engine must read all rows from 1 to 100,000, sort them, and throw them away before returning the requested page, causing heavy disk I/O."
    },
    {
      id: "q-node-088-2",
      prompt: "What is the primary performance advantage of cursor-based (keyset) pagination?",
      options: [
        { id: "a", label: "It uses B-Tree indexes to seek directly to the cursor position in O(1) time regardless of table size" },
        { id: "b", label: "It deletes old rows automatically" },
        { id: "c", label: "It allows jumping to arbitrary random pages" },
        { id: "d", label: "It bypasses database authentication" }
      ],
      correctIndex: 0,
      explanation: "Cursor pagination uses a WHERE clause on an indexed column (e.g. WHERE id > cursor LIMIT 20), seeking directly to the index position in constant time."
    },
    {
      id: "q-node-088-3",
      prompt: "Why should an API enforce a hard maximum limit (e.g. `Math.min(limit, 100)`) on query pagination?",
      options: [
        { id: "a", label: "Because browsers cannot display more than 100 items" },
        { id: "b", label: "To prevent malicious or careless clients from requesting 10,000,000 records at once, exhausting server RAM and crashing the process" },
        { id: "c", label: "Because SQL only allows numbers up to 100" },
        { id: "d", label: "To comply with copyright laws" }
      ],
      correctIndex: 1,
      explanation: "Unbounded queries allow attackers or buggy clients to request millions of rows in one query, causing memory exhaustion and denial of service."
    },
    {
      id: "q-node-088-4",
      prompt: "Why should sort column parameters from `req.query.sortBy` be checked against a strict allowlist Set?",
      options: [
        { id: "a", label: "Because column names in SQL ORDER BY cannot be parameterized using standard query placeholders ($1)" },
        { id: "b", label: "Because JavaScript sets run faster than arrays" },
        { id: "c", label: "To convert column names to uppercase" },
        { id: "d", label: "Because Express requires Sets" }
      ],
      correctIndex: 0,
      explanation: "SQL drivers cannot parameterize identifiers (like column names) in ORDER BY clauses; allowlisting validates inputs before safe string interpolation."
    },
    {
      id: "q-node-088-5",
      prompt: "What is OpenAPI (formerly Swagger)?",
      options: [
        { id: "a", label: "An open-source relational database" },
        { id: "b", label: "A standard, language-agnostic specification format for describing RESTful APIs" },
        { id: "c", label: "A CSS framework for mobile phones" },
        { id: "d", label: "An antivirus software for Node.js" }
      ],
      correctIndex: 1,
      explanation: "OpenAPI provides a standardized format describing API endpoints, request schemas, authentication methods, and status codes for documentation and SDK generation."
    },
    {
      id: "q-node-088-6",
      prompt: "What is 'data drift' in offset-based pagination?",
      options: [
        { id: "a", label: "When server clock times fall out of sync" },
        { id: "b", label: "When new items inserted while a user is reading cause page boundaries to shift, resulting in duplicate or skipped records on subsequent pages" },
        { id: "c", label: "When hard drives physically move" },
        { id: "d", label: "When database tables are dropped" }
      ],
      correctIndex: 1,
      explanation: "If new rows are inserted at the beginning of a table while paginating, subsequent OFFSET queries shift, displaying rows already viewed on the prior page."
    },
    {
      id: "q-node-088-7",
      prompt: "Which middleware package is commonly used to serve interactive Swagger UI documentation in Express?",
      options: [
        { id: "a", label: "swagger-ui-express" },
        { id: "b", label: "express-docs-viewer" },
        { id: "c", label: "api-display-html" },
        { id: "d", label: "node-doc-server" }
      ],
      correctIndex: 0,
      explanation: "swagger-ui-express generates a live, interactive web documentation portal directly from an OpenAPI specification inside an Express server."
    },
    {
      id: "q-node-088-8",
      prompt: "What metadata should a paginated API response envelope include to support frontend pagination components?",
      options: [
        { id: "a", label: "The database root password" },
        { id: "b", label: "Pagination metadata such as page, limit, totalRecords, totalPages, and hasNextPage" },
        { id: "c", label: "The server's physical IP address" },
        { id: "d", label: "The Git commit hash of the author" }
      ],
      correctIndex: 1,
      explanation: "Returning page numbers, record counts, and navigation flags allows frontend UI controls to render page numbers and disable Next/Previous buttons."
    },
    {
      id: "q-node-088-9",
      prompt: "How can a query builder dynamically construct SQL filters without risking SQL injection?",
      options: [
        { id: "a", label: "By concatenating raw query strings" },
        { id: "b", label: "By building query strings with indexed parameter placeholders ($1, $2) and accumulating matching values in an array" },
        { id: "c", label: "By running queries through eval()" },
        { id: "d", label: "By converting SQL to HTML" }
      ],
      correctIndex: 1,
      explanation: "Dynamic query builders safely concatenate parameter placeholders while placing untrusted user inputs into the parameterized values array."
    },
    {
      id: "q-node-088-10",
      prompt: "What HTTP query string represents filtering courses by level 'advanced' and sorting by price ascending?",
      options: [
        { id: "a", label: "/courses?level=advanced&sortBy=price&order=asc" },
        { id: "b", label: "/courses/level/advanced/price/asc" },
        { id: "c", label: "/courses#advanced#asc" },
        { id: "d", label: "/courses:filter(level=advanced)" }
      ],
      correctIndex: 0,
      explanation: "Standard REST queries use URI query string parameters separated by ampersands (?level=advanced&sortBy=price&order=asc)."
    }
  ]
};

// LESSON 089: FILE UPLOADS AND EXTERNAL SERVICES
const lesson089: CurriculumItem = {
  id: "item-node-089-file-uploads-external-services",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "File Uploads and External Services",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "File Uploads and External Services: Multer, Magic Bytes & Resilient HTTP",
  contentDescription: "Master multipart/form-data handling with Multer, file size limits, magic bytes inspection, cloud object storage patterns (S3 presigned URLs), and resilient external API clients.",
  codeSnippet: {
    language: "javascript",
    code: `// Secure File Upload Configuration with Multer
import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';

// Use memory storage for quick validation or direct upload to cloud storage
const storage = multer.memoryStorage();

export const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 Megabytes strict maximum limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = new Set(['image/jpeg', 'image/png', 'image/webp']);
    if (!allowedMimes.has(file.mimetype)) {
      return cb(new Error('INVALID_FILE_TYPE: Only JPEG, PNG, and WebP images are permitted'));
    }
    cb(null, true);
  }
});

// Express route handling file upload
app.post('/api/v1/users/avatar', uploadAvatar.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    // Generate cryptographically unique safe file name
    const randomHex = crypto.randomBytes(16).toString('hex');
    const safeKey = \`avatars/\${randomHex}\${path.extname(req.file.originalname)}\`;
    
    // Upload buffer to S3 / Object Storage (preserves web server disk)
    const publicUrl = await uploadToCloudStorage(safeKey, req.file.buffer, req.file.mimetype);
    
    res.status(200).json({ success: true, avatarUrl: publicUrl });
  } catch (err) {
    next(err);
  }
});`
  },
  sections: [
    {
      title: "Core Concept: The Mechanics of Multipart Form Data",
      explanation: "Standard JSON request bodies cannot efficiently transmit binary files such as images, PDFs, or videos. File uploads utilize the `multipart/form-data` encoding format, which divides the HTTP payload into discrete chunks separated by cryptographic boundary delimiter strings.\n\nBecause Express's built-in `express.json()` parser ignores multipart streams, backends utilize dedicated multipart middleware such as `multer`."
    },
    {
      title: "File Upload Security: The 4 Lines of Defense",
      explanation: "Permitting users to upload files to a server is one of the highest-risk operations in web development. An attacker who successfully uploads an executable script (`.php`, `.sh`, or `.exe`) to a publicly accessible directory can achieve Remote Code Execution (RCE) and take over your entire server infrastructure:",
      bullets: [
        "1. Strict File Size Caps: Enforce limits (e.g. 2MB for avatars, 20MB for PDFs) to prevent denial of service and disk exhaustion.",
        "2. Whitelist File Extensions & MIME Types: Never trust client file extensions alone (`image.jpg` might be an executable script).",
        "3. Magic Bytes Inspection: Inspect the file's leading binary signature (magic bytes) using packages like `file-type` to verify that a declared JPEG actually begins with `FF D8 FF`.",
        "4. Cryptographically Randomized Filenames: Never save files to disk using the original user-supplied filename (`req.file.originalname`). Generate random UUIDs or hashes to eliminate path traversal and file overwrite exploits."
      ]
    },
    {
      title: "The Production Architecture: Direct-to-Cloud Uploads",
      explanation: "In modern cloud deployments (containers, serverless lambdas), web servers are stateless and ephemeral. Saving uploaded files to the local container disk is an anti-pattern because files vanish when containers restart or autoscale.\n\nProduction systems employ Cloud Object Storage (such as Amazon S3, Google Cloud Storage, or Cloudflare R2). For high-throughput applications, the backend generates an S3 Presigned URL, allowing the client to upload the file directly to object storage, bypassing the web server completely."
    },
    {
      title: "Resilient External API Integrations",
      explanation: "When your Node server calls third-party APIs (Stripe, Twilio, OpenAI, GitHub), never assume external services are 100% reliable. Always enforce:\n\n1. Strict Timeouts: Set timeouts (e.g. 5000ms via `AbortSignal.timeout(5000)`) so a slow external service does not freeze your server.\n2. Exponential Backoff & Jitter: Retry idempotent requests with increasing delays upon receiving 502/503 errors.\n3. Circuit Breakers: Automatically stop calling an external service if it fails repeatedly, failing fast until health recovers."
    }
  ],
  questions: [
    {
      id: "q-node-089-1",
      prompt: "Why can't standard `express.json()` middleware parse file uploads?",
      options: [
        { id: "a", label: "Because JSON only supports numbers" },
        { id: "b", label: "Because file uploads use `multipart/form-data` encoding with boundary delimiters, which requires a specialized streaming parser like Multer" },
        { id: "c", label: "Because Express does not allow files" },
        { id: "d", label: "Because Node cannot read binary data" }
      ],
      correctIndex: 1,
      explanation: "File uploads are encoded as multipart/form-data streams separated by boundary markers, which express.json() is not designed to parse."
    },
    {
      id: "q-node-089-2",
      prompt: "Why should an application never save uploaded files using the user's original filename (`file.originalname`)?",
      options: [
        { id: "a", label: "Because original filenames may contain path traversal sequences (`../../`), dangerous characters, or overwrite existing system files" },
        { id: "b", label: "Because original filenames make files download slower" },
        { id: "c", label: "Because original filenames violate copyright laws" },
        { id: "d", label: "Because Node requires all filenames to be numbers" }
      ],
      correctIndex: 0,
      explanation: "Unsanitized original filenames expose servers to path traversal exploits, file overwrites, and execution of malicious extensions."
    },
    {
      id: "q-node-089-3",
      prompt: "What is 'magic bytes' inspection in file upload security?",
      options: [
        { id: "a", label: "Encrypting the file with a magic password" },
        { id: "b", label: "Reading the leading header bytes of a binary file to verify its true file format, independent of what the client claims in the file extension" },
        { id: "c", label: "Compiling code with WebAssembly" },
        { id: "d", label: "Deleting corrupted bytes" }
      ],
      correctIndex: 1,
      explanation: "File headers contain distinct signature bytes (e.g. PNG files always start with 89 50 4E 47), allowing reliable identification of true file types."
    },
    {
      id: "q-node-089-4",
      prompt: "What is the primary advantage of S3 Presigned URLs for file uploads in web applications?",
      options: [
        { id: "a", label: "They make all files public to the entire internet" },
        { id: "b", label: "The browser uploads the file directly to cloud object storage, bypassing the application server and eliminating server CPU/bandwidth bottlenecks" },
        { id: "c", label: "They convert videos to MP4 format" },
        { id: "d", label: "They make databases obsolete" }
      ],
      correctIndex: 1,
      explanation: "Presigned URLs grant temporary write access directly to S3/GCS buckets, offloading heavy file transfer traffic from the application server."
    },
    {
      id: "q-node-089-5",
      prompt: "Why is saving user-uploaded files to local container disk storage an anti-pattern in cloud deployments?",
      options: [
        { id: "a", label: "Because containers are ephemeral and local disks are wiped clean when containers restart, autoscale, or redeploy" },
        { id: "b", label: "Because Linux cannot store images" },
        { id: "c", label: "Because local disks corrupt JPG files" },
        { id: "d", label: "Because Docker does not support file systems" }
      ],
      correctIndex: 0,
      explanation: "Container instances are ephemeral; any files stored on local container disks are lost when the container is recycled or scaled down."
    },
    {
      id: "q-node-089-6",
      prompt: "How can you implement a 3-second network timeout on a `fetch()` call to an external payment API?",
      options: [
        { id: "a", label: "Using `fetch(url, { signal: AbortSignal.timeout(3000) })`" },
        { id: "b", label: "Setting `setTimeout` in another file" },
        { id: "c", label: "Using `process.kill()`" },
        { id: "d", label: "Using `console.time()`" }
      ],
      correctIndex: 0,
      explanation: "Passing AbortSignal.timeout(3000) automatically cancels the fetch request and throws a TimeoutError if the server does not respond within 3 seconds."
    },
    {
      id: "q-node-089-7",
      prompt: "What is the role of a 'Circuit Breaker' pattern when communicating with third-party microservices?",
      options: [
        { id: "a", label: "To turn off the physical server power" },
        { id: "b", label: "To detect when an external service is failing and temporarily stop sending requests to it, failing fast rather than wasting resources" },
        { id: "c", label: "To encrypt network cables" },
        { id: "d", label: "To format JSON strings" }
      ],
      correctIndex: 1,
      explanation: "A circuit breaker trips after repeated failures, immediately returning fallback errors without hanging open sockets on failing external systems."
    },
    {
      id: "q-node-089-8",
      prompt: "What does 'exponential backoff with jitter' do when retrying failed external HTTP requests?",
      options: [
        { id: "a", label: "It retries immediately 10,000 times" },
        { id: "b", label: "It progressively increases delay between retries (e.g. 1s, 2s, 4s) with slight randomized variance to prevent thundering herd spikes" },
        { id: "c", label: "It deletes the database records" },
        { id: "d", label: "It changes the API key on every attempt" }
      ],
      correctIndex: 1,
      explanation: "Exponential backoff increases wait times exponentially; adding jitter (randomized offset) avoids synchronized retry bursts from multiple clients."
    },
    {
      id: "q-node-089-9",
      prompt: "Where does Multer's `memoryStorage()` keep uploaded files during request processing?",
      options: [
        { id: "a", label: "On the user's hard drive" },
        { id: "b", label: "In RAM as a Buffer object attached to `req.file.buffer`" },
        { id: "c", label: "Inside the git commit history" },
        { id: "d", label: "In browser cookies" }
      ],
      correctIndex: 1,
      explanation: "memoryStorage buffers the incoming file stream into memory as a Node Buffer object (req.file.buffer), ideal for immediate forwarding to cloud storage."
    },
    {
      id: "q-node-089-10",
      prompt: "What Multer configuration option prevents attackers from uploading multi-gigabyte files that exhaust server RAM?",
      options: [
        { id: "a", label: "limits: { fileSize: bytes }" },
        { id: "b", label: "security: { blockBigFiles: true }" },
        { id: "c", label: "ramProtection: true" },
        { id: "d", label: "maxMegaBytes: 10" }
      ],
      correctIndex: 0,
      explanation: "The limits.fileSize property specifies the maximum permitted file size in bytes; Multer throws a LIMIT_FILE_SIZE error if exceeded."
    }
  ]
};

// LESSON 090: RATE LIMITING AND ABUSE PREVENTION
const lesson090: CurriculumItem = {
  id: "item-node-090-rate-limiting-abuse-prevention",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "Rate Limiting and Abuse Prevention",
  duration: "30 mins",
  type: "cheatsheet",
  position: 5,
  contentHeading: "Rate Limiting and Abuse Prevention: Sliding Windows & Brute Force Defense",
  contentDescription: "Master rate limiting algorithms (fixed window, sliding window counter, token bucket), distributed Redis stores, proxy IP resolution (trust proxy), and defending auth endpoints.",
  codeSnippet: {
    language: "javascript",
    code: `// Multi-Tier Rate Limiting Architecture with express-rate-limit
import rateLimit from 'express-rate-limit';

// 1. General application-wide rate limiter (e.g. 100 requests per 15 minutes)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7', // Returns RateLimit-* headers
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes'
  }
});

// 2. Strict rate limiter for sensitive authentication endpoints (e.g. 5 attempts per 15 mins)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login attempts. Account temporarily locked for 15 minutes.'
  }
});`
  },
  sections: [
    {
      title: "Core Concept: Why Rate Limiting is Critical",
      explanation: "Without rate limiting, any public API endpoint is vulnerable to brute-force credential stuffing (testing thousands of passwords per second), Denial of Service (DoS) attacks, scraping of proprietary course catalogs, and financial exhaustion via expensive third-party API calls (such as SMS verification or AI text generation).\n\nRate limiting establishes a contract restricting the frequency with which a client (identified by IP address, API key, or user token) can call endpoints within a rolling time window."
    },
    {
      title: "Rate Limiting Algorithms Compared",
      explanation: "Various algorithms trade off memory overhead, implementation complexity, and burst tolerance:",
      table: {
        headers: ["Algorithm", "Mechanics", "Tradeoffs", "Industry Use"],
        rows: [
          ["Fixed Window", "Divides time into fixed buckets (e.g., 12:00-12:15). Resets counter at bucket boundary.", "Susceptible to traffic bursts at boundary edges (2x limit allowed across split seconds)", "Simple default in basic tools"],
          ["Sliding Window Counter", "Weights counts from previous and current window based on current timestamp", "Prevents boundary burst spikes with minimal memory footprint", "express-rate-limit default"],
          ["Token Bucket", "Tokens accumulate at steady rate up to bucket capacity; each request consumes a token", "Allows bursts up to capacity while enforcing steady-state average rate", "Stripe API, AWS API Gateway"],
          ["Leaky Bucket", "Requests enter a FIFO queue and are processed at fixed drip rate; excess overflows", "Completely smooths out bursty traffic; introduces slight latency", "Traffic shaping, network routers"]
        ]
      }
    },
    {
      title: "The Reverse Proxy IP Trap: app.set('trust proxy', 1)",
      explanation: "In production, Node servers rarely sit directly on the public internet. Instead, incoming traffic passes through reverse proxies and load balancers (such as Nginx, Cloudflare, AWS ALB, or Heroku).\n\nIf you inspect `req.ip` without configuring Express, `req.ip` returns the internal private IP of the load balancer! Consequently, ALL users share the exact same IP address in Express, meaning when one user hits the rate limit, the server accidentally locks out ALL users worldwide!\n\nTo resolve client IPs accurately, enable proxy trust in Express: `app.set('trust proxy', 1)`. This instructs Express to read the client IP from the `X-Forwarded-For` header injected by your trusted reverse proxy."
    },
    {
      title: "Distributed Rate Limiting with Redis",
      explanation: "In modern autoscaling clusters with multiple server instances (e.g. 5 Docker containers behind a load balancer), standard in-memory rate limiting fails because each container maintains an isolated local memory map. A malicious client could rotate requests across the 5 containers and achieve 5 times the permitted limit.\n\nProduction deployments use centralized in-memory stores like Redis (via `rate-limit-redis`). Every container checks and increments atomic counters in the shared Redis database, guaranteeing consistent rate enforcement across the entire cluster."
    }
  ],
  questions: [
    {
      id: "q-node-090-1",
      prompt: "What is the primary vulnerability prevented by applying strict rate limits to `/api/login`?",
      options: [
        { id: "a", label: "SQL Injection" },
        { id: "b", label: "Brute-force credential stuffing and password guessing attacks" },
        { id: "c", label: "Cross-Site Scripting (XSS)" },
        { id: "d", label: "Memory leaks in V8" }
      ],
      correctIndex: 1,
      explanation: "Rate limiting prevents attackers from automating millions of password guesses against user accounts in credential stuffing attacks."
    },
    {
      id: "q-node-090-2",
      prompt: "Why must `app.set('trust proxy', 1)` be configured when running Express behind Nginx or an AWS load balancer?",
      options: [
        { id: "a", label: "To allow Express to read the real client IP from the `X-Forwarded-For` header instead of the load balancer's private IP" },
        { id: "b", label: "To disable SSL encryption" },
        { id: "c", label: "To make Express run faster" },
        { id: "d", label: "Because Express crashes without it" }
      ],
      correctIndex: 0,
      explanation: "Behind a reverse proxy, req.ip defaults to the proxy's IP. trust proxy instructs Express to trust the X-Forwarded-For header to identify true client IPs."
    },
    {
      id: "q-node-090-3",
      prompt: "What HTTP status code is returned when a client exceeds their rate limit threshold?",
      options: [
        { id: "a", label: "400 Bad Request" },
        { id: "b", label: "403 Forbidden" },
        { id: "c", label: "429 Too Many Requests" },
        { id: "d", label: "503 Service Unavailable" }
      ],
      correctIndex: 2,
      explanation: "429 Too Many Requests is the standard status code indicating that the client has sent too many requests in a given time window."
    },
    {
      id: "q-node-090-4",
      prompt: "Which header in a 429 response informs the client how many seconds they must wait before retrying?",
      options: [
        { id: "a", label: "Retry-After" },
        { id: "b", label: "Wait-Seconds" },
        { id: "c", label: "Cooldown" },
        { id: "d", label: "Pause-Time" }
      ],
      correctIndex: 0,
      explanation: "The Retry-After header indicates how long the client must wait (in seconds or as an HTTP date) before making a new request."
    },
    {
      id: "q-node-090-5",
      prompt: "Why does default in-memory rate limiting fail across autoscaled multi-container clusters?",
      options: [
        { id: "a", label: "Because memory is disabled in Docker" },
        { id: "b", label: "Because each container tracks counters in its own isolated memory, allowing clients to bypass limits by spreading traffic across containers" },
        { id: "c", label: "Because containers cannot read IP addresses" },
        { id: "d", label: "Because in-memory limiters require Windows" }
      ],
      correctIndex: 1,
      explanation: "Each container holds its own memory counters; without a shared store like Redis, users can execute N times the allowed requests across N containers."
    },
    {
      id: "q-node-090-6",
      prompt: "What shared database engine is industry-standard for distributed rate-limiting counters?",
      options: [
        { id: "a", label: "Redis" },
        { id: "b", label: "SQLite" },
        { id: "c", label: "CSV files" },
        { id: "d", label: "Microsoft Access" }
      ],
      correctIndex: 0,
      explanation: "Redis is an in-memory data store with atomic increment operations (INCR) and automatic key expirations (TTL), making it ideal for distributed rate limiting."
    },
    {
      id: "q-node-090-7",
      prompt: "What rate limiting algorithm allows short bursts of traffic while enforcing a strict steady-state average rate over time?",
      options: [
        { id: "a", label: "Token Bucket" },
        { id: "b", label: "Fixed Window" },
        { id: "c", label: "Linear Probing" },
        { id: "d", label: "Bubble Sort" }
      ],
      correctIndex: 0,
      explanation: "The Token Bucket algorithm accumulates tokens up to a maximum bucket size, permitting bursts when tokens are available while throttling sustained traffic."
    },
    {
      id: "q-node-090-8",
      prompt: "Why should rate limiting be tiered (different limits for public reads vs login vs export endpoints)?",
      options: [
        { id: "a", label: "Because different operations have vastly different computational costs and abuse profiles" },
        { id: "b", label: "Because Express does not allow identical limits on different routes" },
        { id: "c", label: "To make code longer" },
        { id: "d", label: "To increase server temperature" }
      ],
      correctIndex: 0,
      explanation: "Public read queries are cheap and cachable (high limit), whereas login endpoints face brute force (strict limit) and PDF exports consume heavy CPU (low limit)."
    },
    {
      id: "q-node-090-9",
      prompt: "What standard HTTP response headers communicate remaining request allowances to API clients under modern IETF drafts?",
      options: [
        { id: "a", label: "RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset" },
        { id: "b", label: "X-Tokens-Left, X-Max-Tokens" },
        { id: "c", label: "Traffic-Control, Traffic-Allowed" },
        { id: "d", label: "Quota-Status, Quota-Left" }
      ],
      correctIndex: 0,
      explanation: "The modern IETF draft standard defines RateLimit-Limit, RateLimit-Remaining, and RateLimit-Reset headers to communicate rate status transparently."
    },
    {
      id: "q-node-090-10",
      prompt: "Can rate limiting replace user authentication or authorization?",
      options: [
        { id: "a", label: "Yes, rate limiting completely eliminates the need for passwords" },
        { id: "b", label: "No, rate limiting is only one defense layer to mitigate volume abuse; it cannot verify identity or access permissions" },
        { id: "c", label: "Only when using MongoDB" },
        { id: "d", label: "Only in single-page apps" }
      ],
      correctIndex: 1,
      explanation: "Rate limiting restricts request velocity; it does not authenticate identity, verify privileges, or sanitize input data."
    }
  ]
};

// LESSON 091: API VERSIONING AND BACKWARD COMPATIBILITY
const lesson091: CurriculumItem = {
  id: "item-node-091-api-versioning-backward-compatibility",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "API Versioning and Backward Compatibility",
  duration: "30 mins",
  type: "cheatsheet",
  position: 6,
  contentHeading: "API Versioning and Backward Compatibility: Evolution & Deprecation",
  contentDescription: "Master API versioning strategies (URI path vs headers), non-breaking additive schema changes, managing breaking migrations, and standardized deprecation policies.",
  codeSnippet: {
    language: "javascript",
    code: `// Express API Versioning Architecture
import express from 'express';
import v1Router from './routes/v1/index.js';
import v2Router from './routes/v2/index.js';

const app = express();
app.use(express.json());

// Deprecation warning middleware for legacy v1 API consumers
const v1DeprecationMiddleware = (req, res, next) => {
  res.setHeader('Deprecation', '@1792320000'); // Unix timestamp
  res.setHeader('Sunset', 'Fri, 31 Dec 2027 23:59:59 GMT');
  res.setHeader('Link', '<https://api.blezex.com/docs/migration-v2>; rel="deprecation"');
  next();
};

// Mount versioned sub-routers
app.use('/api/v1', v1DeprecationMiddleware, v1Router);
app.use('/api/v2', v2Router);

export default app;`
  },
  sections: [
    {
      title: "Core Concept: The Contract of a Public API",
      explanation: "Once an API is deployed and consumed by frontend single-page apps, mobile clients (iOS/Android), or third-party partner integrations, the API serves as an immutable contract. Unlike a web page where you can change HTML and reload the user's browser, mobile app users may not update their mobile applications for months or years. If you alter field names, delete properties, or change data types in an existing API response, deployed client applications will immediately crash."
    },
    {
      title: "API Versioning Strategies Compared",
      explanation: "Engineering teams implement versioning using three primary approaches:",
      table: {
        headers: ["Strategy", "Format Example", "Strengths", "Weaknesses"],
        rows: [
          ["URI Path Versioning", "/api/v1/courses vs /api/v2/courses", "Explicit, self-documenting, easy to route and cache", "Violates strict REST resource URI purity"],
          ["Custom Request Header", "X-API-Version: 2", "Keeps URIs clean; simplifies URL structure", "Harder to test directly in standard browser URL bars"],
          ["Content Negotiation (Accept Header)", "Accept: application/vnd.blezex.v2+json", "Strictly REST-compliant; version is part of representation", "More complex routing and proxy caching logic"]
        ]
      }
    },
    {
      title: "Breaking vs Non-Breaking Changes",
      explanation: "Before creating a brand-new API version, understand what constitutes a breaking change:",
      bullets: [
        "Non-Breaking (Additive Changes): Adding new optional fields to request bodies, adding new fields to response JSON payloads, adding new endpoints, or adding optional query parameters. Existing clients safely ignore unexpected JSON keys.",
        "Breaking Changes: Renaming an existing field (e.g. `name` -> `fullName`), changing a data type (e.g. `price` from string to number), removing an existing field, changing HTTP status codes, or making an optional parameter required."
      ]
    },
    {
      title: "Deprecation Policies & The Sunset Header",
      explanation: "When deprecating an older API version, never pull the plug abruptly without warning. The modern IETF standard specifies two HTTP response headers to notify client developers programmatically:\n\n1. `Deprecation`: Communicates that the endpoint is deprecated, optionally specifying the date or version.\n2. `Sunset`: Communicates the exact timestamp when the endpoint will be permanently decommissioned and return `410 Gone`.\n\nProviding clear migration documentation and logging legacy version consumer user-agents allows tracking migration progress before decommissioning."
    }
  ],
  questions: [
    {
      id: "q-node-091-1",
      prompt: "Why is changing an existing response field from `{ name: 'John' }` to `{ fullName: 'John' }` considered a breaking change?",
      options: [
        { id: "a", label: "Because mobile applications and existing clients reading `user.name` will receive `undefined` and crash" },
        { id: "b", label: "Because JavaScript cannot parse the word 'fullName'" },
        { id: "c", label: "Because SQL databases do not permit camelCase" },
        { id: "d", label: "Because Node.js requires all names to be 4 letters" }
      ],
      correctIndex: 0,
      explanation: "Renaming a field breaks existing client code that expects the old key; deployed client applications reading user.name will evaluate to undefined."
    },
    {
      id: "q-node-091-2",
      prompt: "Which of the following is considered a non-breaking (backwards-compatible) API change?",
      options: [
        { id: "a", label: "Adding a new optional field to an existing JSON response payload" },
        { id: "b", label: "Deleting an existing endpoint" },
        { id: "c", label: "Changing a string field to an array of objects" },
        { id: "d", label: "Making a previously optional query parameter mandatory" }
      ],
      correctIndex: 0,
      explanation: "Standard JSON parsers in modern clients simply ignore extra fields they do not expect, making additive response fields safe and non-breaking."
    },
    {
      id: "q-node-091-3",
      prompt: "What is the most widely adopted versioning strategy in modern public web APIs (e.g. Stripe, GitHub, Twilio)?",
      options: [
        { id: "a", label: "URI path versioning (e.g. `/api/v1/...`)" },
        { id: "b", label: "Randomly changing URLs daily" },
        { id: "c", label: "Query parameter versioning only" },
        { id: "d", label: "Embedding the version in cookie strings" }
      ],
      correctIndex: 0,
      explanation: "URI path versioning (/api/v1) is transparent, easy to route at the load balancer level, simple to test, and universally supported."
    },
    {
      id: "q-node-091-4",
      prompt: "What standard HTTP response header communicates the exact future date when a deprecated API endpoint will be decommissioned?",
      options: [
        { id: "a", label: "Sunset" },
        { id: "b", label: "Expiration-Date" },
        { id: "c", label: "Decommission-At" },
        { id: "d", label: "End-Of-Life" }
      ],
      correctIndex: 0,
      explanation: "The IETF standard Sunset header (RFC 8594) advertises the date and time when the server will permanently shut down that endpoint."
    },
    {
      id: "q-node-091-5",
      prompt: "What HTTP status code should be returned when an endpoint has been permanently retired after its sunset period?",
      options: [
        { id: "a", label: "410 Gone" },
        { id: "b", label: "200 OK" },
        { id: "c", label: "500 Server Error" },
        { id: "d", label: "302 Redirect to YouTube" }
      ],
      correctIndex: 0,
      explanation: "410 Gone indicates that the target resource was intentionally and permanently deleted and that no forwarding address is known."
    },
    {
      id: "q-node-091-6",
      prompt: "Why can't mobile client applications be updated as easily as web applications when an API changes?",
      options: [
        { id: "a", label: "Because mobile phones do not have internet" },
        { id: "b", label: "Because users may disable auto-updates, leaving outdated app versions active on devices for months or years" },
        { id: "c", label: "Because Apple and Google forbid JSON" },
        { id: "d", label: "Because mobile code is compiled into raw silicon" }
      ],
      correctIndex: 1,
      explanation: "Unlike web browsers that download fresh frontend code on every page refresh, native mobile binaries persist on user devices indefinitely."
    },
    {
      id: "q-node-091-7",
      prompt: "How can a backend team identify which legacy clients are still using a deprecated v1 API?",
      options: [
        { id: "a", label: "By shutting down the entire server for 24 hours" },
        { id: "b", label: "By logging and monitoring the `User-Agent` and `Authorization` headers on incoming v1 requests" },
        { id: "c", label: "By emailing every registered user" },
        { id: "d", label: "By deleting the database" }
      ],
      correctIndex: 1,
      explanation: "Tracking User-Agent metadata and client IDs hitting v1 endpoints reveals exactly which clients and app versions have not yet migrated."
    },
    {
      id: "q-node-091-8",
      prompt: "What is header-based content negotiation versioning?",
      options: [
        { id: "a", label: "Passing the version in the `Accept` header (e.g. `Accept: application/vnd.app.v2+json`)" },
        { id: "b", label: "Writing the version in CSS files" },
        { id: "c", label: "Renaming headers on every request" },
        { id: "d", label: "Using cookies exclusively" }
      ],
      correctIndex: 0,
      explanation: "Content negotiation versioning requests a specific representation version using custom vendor media types in the Accept header."
    },
    {
      id: "q-node-091-9",
      prompt: "When should an engineering team create a brand-new API version (`v2`) instead of evolving `v1`?",
      options: [
        { id: "a", label: "Every Monday morning" },
        { id: "b", label: "Only when introducing breaking architectural or data contract changes that cannot be achieved through additive modifications" },
        { id: "c", label: "Whenever a new developer joins the company" },
        { id: "d", label: "Whenever fixing a small typo in a string" }
      ],
      correctIndex: 1,
      explanation: "Creating new versions introduces code duplication and maintenance overhead; reserve major versions strictly for unavoidable breaking contract changes."
    },
    {
      id: "q-node-091-10",
      prompt: "What is the best way to structure versioned route files in an Express project?",
      options: [
        { id: "a", label: "Put both v1 and v2 routes in the same file using switch statements" },
        { id: "b", label: "Organize route handlers into distinct directories (`src/routes/v1/` and `src/routes/v2/`) mounted on versioned prefixes" },
        { id: "c", label: "Create two separate npm packages" },
        { id: "d", label: "Use different port numbers for every version" }
      ],
      correctIndex: 1,
      explanation: "Partitioning versioned routes into clean directory hierarchies (v1/ and v2/) keeps legacy contracts isolated while allowing shared underlying services."
    }
  ]
};

// MODULE 4 ASSESSMENT QUIZ (10 comprehensive questions)
const nodeModule04Quiz: CurriculumItem = {
  id: "item-node-m4-quiz",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "Module 4 Assessment: Enterprise Architecture MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 7,
  contentHeading: "Module 4 Assessment: 3-Tier Layering, Error Handling, Pagination & Abuse Prevention",
  contentDescription: "Evaluate your comprehensive understanding of controller/service/repository architecture, AppError hierarchies, keyset pagination, Multer upload security, rate limiting algorithms, and backward compatibility.",
  questions: [
    ...(lesson086.questions || []).slice(0, 2),
    ...(lesson087.questions || []).slice(0, 2),
    ...(lesson088.questions || []).slice(0, 2),
    ...(lesson089.questions || []).slice(0, 2),
    ...(lesson090.questions || []).slice(0, 1),
    ...(lesson091.questions || []).slice(0, 1)
  ]
};

// MODULE 4 HANDS-ON ASSESSMENT LAB
const nodeModule04Lab: CurriculumItem = {
  id: "item-node-m4-lab",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-04-robust-architecture",
  moduleTitle: "Module 4: Robust API Architecture",
  modulePosition: 4,
  title: "Module 4 Assessment: Multi-Tier Service with Sliding Rate Limiter",
  duration: "75 mins",
  type: "assignment",
  position: 8,
  contentHeading: "Module 4 Project Lab: 3-Tier Course Publishing Service & Rate Limiting",
  contentDescription: "Architect a 3-tier enterprise service layer with dependency injection, keyset cursor pagination, a custom AppError handling pipeline, and sliding window rate limiting on authentication routes.",
  sections: [
    {
      title: "Lab Objectives & Requirements",
      explanation: "In this practical lab, you will engineer an enterprise-grade backend module implementing layered architectural patterns:",
      bullets: [
        "3-Tier Architecture: Build a `CourseRepository` (mock in-memory or SQL), a `CourseService` (with business rules and custom AppError throws), and a `CourseController` (handling HTTP transport).",
        "Dependency Injection: Instantiate the service by passing the repository into its constructor, enabling instant unit testing.",
        "Keyset Cursor Pagination: Implement `GET /courses?limit=10&cursor=timestamp` with safe allowlisted sorting and bounded limits.",
        "Centralized AppError Pipeline: Build custom `NotFoundError` and `ConflictError` classes, terminating in a global 4-argument error handler that suppresses stack traces in production.",
        "Multi-Tier Rate Limiting: Apply a general rate limiter (100 req/15min) to public reads and a strict brute-force limiter (5 req/15min) to login attempts."
      ]
    },
    {
      title: "Expected Deliverable Specification",
      explanation: "Submit your implementation containing:\n1. `src/repositories/courseRepository.js`: Persistence layer.\n2. `src/services/courseService.js`: Pure business domain service.\n3. `src/controllers/courseController.js`: Express HTTP controller.\n4. `src/errors/AppError.js`: Custom operational error hierarchy.\n5. `src/middleware/rateLimiters.js`: Tiered rate limiting middleware configuration."
    }
  ]
};

// Exporting Module 4
export const nodeModule04: CurriculumSubModule = {
  id: "module-node-04-robust-architecture",
  title: "Module 4: Robust API Architecture",
  description: "Master 3-tier enterprise layering, centralized error handling, cursor pagination, Multer file upload security, sliding-window rate limiting, and API backward compatibility.",
  position: 4,
  duration: "3 hours, 30 mins",
  items: [
    lesson086,
    lesson087,
    lesson088,
    lesson089,
    lesson090,
    lesson091,
    nodeModule04Quiz,
    nodeModule04Lab
  ]
};
