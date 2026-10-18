import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 6: DATABASE INTEGRATION AND PRODUCTION
// Lessons 096 - 099 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 096: MONGODB AND MONGOOSE
const lesson096: CurriculumItem = {
  id: "item-node-096-mongodb-mongoose",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Module 6: Database Integration and Production",
  modulePosition: 6,
  title: "MongoDB and Mongoose",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "MongoDB and Mongoose: Document Modeling, Schemas & Hooks",
  contentDescription: "Master document data modeling in MongoDB, Mongoose schemas, types, custom validators, pre/post middleware hooks, document embedding vs referencing, and compound indexes.",
  codeSnippet: {
    language: "javascript",
    code: `// Mongoose Schema with Validation, Hooks and Indexing
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is mandatory'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory'],
    minlength: 8,
    select: false // Automatically omitted from queries by default for safety
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  }
}, { timestamps: true });

// Pre-save document middleware hook to hash passwords before persistence
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const User = mongoose.model('User', userSchema);`
  },
  sections: [
    {
      title: "Core Concept: The Document Data Paradigm",
      explanation: "MongoDB is a document-oriented NoSQL database that stores data as flexible, JSON-like BSON (Binary JSON) documents inside collections. Unlike relational databases that enforce rigid tabular schemas, documents can store rich hierarchical structures—including embedded sub-documents and arrays—directly within a single record.\n\nWhile raw MongoDB is schema-less, enterprise Node.js applications use Mongoose (an Object Data Modeling library) to enforce strict application-level schemas, type casting, validation rules, and business logic hooks."
    },
    {
      title: "Embedding vs Referencing (Normalization)",
      explanation: "A central architectural decision in MongoDB design is deciding between embedded documents and referenced collections:",
      table: {
        headers: ["Pattern", "Mechanics", "Strengths", "When to Use"],
        rows: [
          ["Embedding (Denormalized)", "Stores related data directly inside the parent document (e.g. course.lessons = [...])", "Single O(1) read query retrieves all data; atomic document updates", "1-to-few relationships (<100 items); data that is always viewed together"],
          ["Referencing (Normalized)", "Stores ObjectId references pointing to documents in another collection", "Avoids 16MB document size limit; avoids data duplication", "1-to-many or many-to-many relationships; large or frequently updated data"]
        ]
      }
    },
    {
      title: "Mongoose Middleware Hooks: Pre and Post",
      explanation: "Mongoose provides powerful lifecycle hooks that execute before or after operations:\n\n- `pre('save')`: Executes before a document is written to the database. Commonly used for password hashing, slug generation, or timestamp synchronization.\n- `pre('find')`: Executes before queries run, useful for automatically filtering out soft-deleted records (`this.where({ isDeleted: false })`).\n- `post('save')`: Executes after successful persistence, ideal for emitting audit events or notifying external webhooks."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "A frequent pitfall is assuming `unique: true` in a Mongoose schema is a validator. It is NOT a validator; it tells Mongoose to create a unique B-Tree index in MongoDB. If duplicate data is inserted, MongoDB throws an error with error code `11000`. Always handle error code 11000 in your centralized error middleware and map it to a user-friendly `409 Conflict` response."
    }
  ],
  questions: [
    {
      id: "q-node-096-1",
      prompt: "What is Mongoose in the Node.js and MongoDB ecosystem?",
      options: [
        { id: "a", label: "A web browser extension" },
        { id: "b", label: "An Object Data Modeling (ODM) library providing schemas, validation, middleware hooks, and type casting on top of MongoDB" },
        { id: "c", label: "A replacement for the V8 engine" },
        { id: "d", label: "A relational SQL query planner" }
      ],
      correctIndex: 1,
      explanation: "Mongoose provides a schema-based modeling solution to model application data with built-in validation, type casting, and query construction."
    },
    {
      id: "q-node-096-2",
      prompt: "When should related data be EMBEDDED inside a parent MongoDB document rather than referenced?",
      options: [
        { id: "a", label: "When the relationship is 'one-to-few' (e.g. 5-10 chapters in a course) and the data is almost always read together with the parent" },
        { id: "b", label: "When there are millions of related records" },
        { id: "c", label: "When the total document size exceeds 16MB" },
        { id: "d", label: "Never, embedding is illegal in MongoDB" }
      ],
      correctIndex: 0,
      explanation: "Embedding is ideal for small, tightly coupled child records that are always loaded with the parent, enabling single-query retrieval without joins."
    },
    {
      id: "q-node-096-3",
      prompt: "What is the maximum BSON document size limit enforced by MongoDB?",
      options: [
        { id: "a", label: "1 Megabyte" },
        { id: "b", label: "16 Megabytes" },
        { id: "c", label: "100 Gigabytes" },
        { id: "d", label: "Unlimited" }
      ],
      correctIndex: 1,
      explanation: "MongoDB enforces a strict 16MB maximum document size to prevent individual document bloat and ensure high-throughput memory cache utilization."
    },
    {
      id: "q-node-096-4",
      prompt: "What MongoDB error code indicates a violation of a unique index (e.g. duplicate email registration)?",
      options: [
        { id: "a", label: "404" },
        { id: "b", label: "11000" },
        { id: "c", label: "500" },
        { id: "d", label: "2000" }
      ],
      correctIndex: 1,
      explanation: "Error code 11000 is MongoDB's duplicate key error, thrown when an insert or update violates a unique index constraint."
    },
    {
      id: "q-node-096-5",
      prompt: "What does setting `select: false` on a schema path (e.g. `password`) accomplish in Mongoose?",
      options: [
        { id: "a", label: "It deletes the password from the database" },
        { id: "b", label: "It omits the field from query projections by default, preventing accidental leaks in API responses unless explicitly requested via `.select('+password')`" },
        { id: "c", label: "It disables password hashing" },
        { id: "d", label: "It forces passwords to be numbers" }
      ],
      correctIndex: 1,
      explanation: "select: false ensures that sensitive fields are excluded from query results by default, guarding against accidental exposure in client JSON responses."
    },
    {
      id: "q-node-096-6",
      prompt: "What is a `pre('save')` hook commonly used for in Mongoose schemas?",
      options: [
        { id: "a", label: "Closing the database connection" },
        { id: "b", label: "Executing asynchronous transformations like password hashing before the document is persisted to disk" },
        { id: "c", label: "Rendering HTML templates" },
        { id: "d", label: "Restarting Express" }
      ],
      correctIndex: 1,
      explanation: "pre('save') middleware runs right before a document is validated and saved, making it the ideal place to hash passwords and update timestamps."
    },
    {
      id: "q-node-096-7",
      prompt: "What Mongoose method replaces referenced `ObjectId` identifiers in a document with the actual populated documents from another collection?",
      options: [
        { id: "a", label: ".join()" },
        { id: "b", label: ".populate()" },
        { id: "c", label: ".fetchChildren()" },
        { id: "d", label: ".attach()" }
      ],
      correctIndex: 1,
      explanation: "Mongoose's populate() method executes secondary queries behind the scenes to replace referenced ObjectIds with the populated child documents."
    },
    {
      id: "q-node-096-8",
      prompt: "Why should `this.isModified('password')` be checked inside a `pre('save')` password hashing hook?",
      options: [
        { id: "a", label: "To prevent re-hashing an already-hashed password whenever unrelated fields (like user name or email) are updated" },
        { id: "b", label: "Because bcrypt only works once" },
        { id: "c", label: "Because Mongoose requires it" },
        { id: "d", label: "To convert passwords to lowercase" }
      ],
      correctIndex: 0,
      explanation: "Without checking isModified('password'), updating a user's name would cause bcrypt to re-hash the existing hash string, corrupting the password."
    },
    {
      id: "q-node-096-9",
      prompt: "What query option in Mongoose bypasses full Mongoose Document hydration and returns plain JavaScript objects for maximum read performance?",
      options: [
        { id: "a", label: ".lean()" },
        { id: "b", label: ".fast()" },
        { id: "c", label: ".raw()" },
        { id: "d", label: ".plain()" }
      ],
      correctIndex: 0,
      explanation: ".lean() tells Mongoose to skip hydrating queries into full Mongoose Documents, returning plain JS objects with up to 5x faster read throughput."
    },
    {
      id: "q-node-096-10",
      prompt: "What is a compound index in MongoDB?",
      options: [
        { id: "a", label: "An index built across multiple fields (e.g. `{ courseId: 1, studentId: 1 }`) to accelerate multi-condition queries" },
        { id: "b", label: "An index that costs money" },
        { id: "c", label: "An index stored in the browser" },
        { id: "d", label: "An index that deletes duplicate collections" }
      ],
      correctIndex: 0,
      explanation: "Compound indexes index combinations of multiple fields, supporting queries that filter or sort by those specific column sequences."
    }
  ]
};

// LESSON 097: TESTING, ENVIRONMENT SETUP AND DEPLOYMENT
const lesson097: CurriculumItem = {
  id: "item-node-097-testing-environment-deployment",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Module 6: Database Integration and Production",
  modulePosition: 6,
  title: "Testing, Environment Setup and Deployment",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Testing, Environment Setup and Deployment: The Testing Pyramid & CI/CD",
  contentDescription: "Master test automation pyramids, unit tests vs integration tests vs E2E tests, modern runners (Vitest), test database isolation, and automated CI deployment pipelines.",
  codeSnippet: {
    language: "javascript",
    code: `// Unit Testing Business Logic with Vitest (tests/services/courseService.test.js)
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CourseService } from '../../src/services/courseService.js';
import { ForbiddenError, NotFoundError } from '../../src/errors/AppError.js';

describe('CourseService Unit Tests', () => {
  let mockRepo;
  let service;

  beforeEach(() => {
    // Isolated in-memory repository mock (zero database needed)
    mockRepo = {
      findById: vi.fn(),
      create: vi.fn()
    };
    service = new CourseService(mockRepo);
  });

  it('throws NotFoundError if course does not exist', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(service.getCourseDetails('crs_unknown', { role: 'student' }))
      .rejects.toThrow(NotFoundError);
  });

  it('prevents non-admins from viewing draft courses', async () => {
    mockRepo.findById.mockResolvedValue({ id: 'crs_1', isDraft: true });

    await expect(service.getCourseDetails('crs_1', { role: 'student' }))
      .rejects.toThrow(ForbiddenError);
  });
});`
  },
  sections: [
    {
      title: "Core Concept: The Automated Testing Pyramid",
      explanation: "Shipping production backends with confidence requires automated test coverage. Relying on manual testing via Postman is slow, error-prone, and cannot catch regressions introduced across hundreds of commits.\n\nSoftware engineering follows Mike Cohn's Testing Pyramid:\n\n1. Unit Tests (Base): Hundreds of fast, isolated tests verifying pure functions, algorithms, and business services without database or network I/O (executes in milliseconds).\n2. Integration Tests (Middle): Dozens of tests verifying controllers, database queries, and middleware working together against a dedicated test database.\n3. End-to-End (E2E) Tests (Peak): A small handful of high-level tests exercising full user journeys across real deployments."
    },
    {
      title: "Test Runners: Why Vitest has Overtaken Jest",
      explanation: "While Jest was the historical standard, modern Node.js and TypeScript ecosystems increasingly adopt Vitest:",
      table: {
        headers: ["Feature", "Legacy Jest", "Modern Vitest"],
        rows: [
          ["ESM Support", "Requires complex Babel/ts-jest transforms", "Native, first-class ESM and top-level await"],
          ["Execution Speed", "Slower cold start overhead", "Instant Vite-powered multi-threaded worker execution"],
          ["TypeScript", "Requires ts-jest compilation layer", "Out-of-the-box zero-config TypeScript parsing"],
          ["Watch Mode", "Resource intensive", "Lightning-fast HMR-powered test re-runs"]
        ]
      }
    },
    {
      title: "Test Database Isolation Strategy",
      explanation: "Never run automated tests against production or shared staging databases! Integration test suites require an isolated test database (e.g. `blezex_test`).\n\nObserve strict test lifecycle hooks:\n- `beforeAll`: Connect to test database and execute schema migrations.\n- `beforeEach`: Reset test data fixtures to a clean, known initial state.\n- `afterAll`: Close database connection pools and server sockets so the test runner exits cleanly."
    },
    {
      title: "Continuous Integration (CI) with GitHub Actions",
      explanation: "Every pull request must pass automated validation in a GitHub Actions workflow before merging. A production CI pipeline executes:\n1. Dependency installation (`npm ci`)\n2. Linting and formatting checks (`npm run lint`)\n3. Type checking (`npx tsc --noEmit`)\n4. Automated test suite execution (`npm run test`)\n5. Security audit (`npm audit --audit-level=high`)\nOnly when all checks return exit code 0 is merging permitted."
    }
  ],
  questions: [
    {
      id: "q-node-097-1",
      prompt: "What is the primary characteristic of a true 'Unit Test'?",
      options: [
        { id: "a", label: "It spins up 10 cloud servers and runs for 2 hours" },
        { id: "b", label: "It tests an isolated piece of logic (a function or class) in complete isolation, replacing external dependencies (like databases) with mocks" },
        { id: "c", label: "It clicks buttons in Google Chrome" },
        { id: "d", label: "It modifies production database records" }
      ],
      correctIndex: 1,
      explanation: "Unit tests isolate individual code units from external infrastructure (network, disk, databases) using test doubles and mocks for speed and determinism."
    },
    {
      id: "q-node-097-2",
      prompt: "According to the Testing Pyramid, which test category should constitute the largest volume of tests?",
      options: [
        { id: "a", label: "Manual user testing" },
        { id: "b", label: "Unit tests (fast, reliable, and cheap to run and maintain)" },
        { id: "c", label: "End-to-End browser tests" },
        { id: "d", label: "Stress testing" }
      ],
      correctIndex: 1,
      explanation: "Unit tests form the broad foundation of the testing pyramid because they execute in milliseconds and pinpoint the exact line where logic breaks."
    },
    {
      id: "q-node-097-3",
      prompt: "Why is Vitest preferred over legacy Jest in modern Node.js ESM applications?",
      options: [
        { id: "a", label: "Vitest natively supports ECMAScript Modules (ESM) and TypeScript out-of-the-box without brittle transformation configs" },
        { id: "b", label: "Vitest deletes failing tests automatically" },
        { id: "c", label: "Vitest only runs on Linux" },
        { id: "d", label: "Jest is not compatible with JavaScript" }
      ],
      correctIndex: 0,
      explanation: "Vitest provides native ESM and TypeScript support with fast multithreading, avoiding Jest's complex Babel compilation overhead."
    },
    {
      id: "q-node-097-4",
      prompt: "Why must automated integration tests run against an isolated test database rather than development or production?",
      options: [
        { id: "a", label: "Because testing tools cannot connect to production" },
        { id: "b", label: "To prevent accidental destruction of real data and avoid race conditions from concurrent test runs" },
        { id: "c", label: "Because test databases run faster than RAM" },
        { id: "d", label: "To comply with CSS standards" }
      ],
      correctIndex: 1,
      explanation: "Test databases ensure destructive test operations (clearing tables, resetting fixtures) do not corrupt real data or interfere with developers."
    },
    {
      id: "q-node-097-5",
      prompt: "What does `vi.fn()` do in Vitest?",
      options: [
        { id: "a", label: "It creates a mock spy function that tracks invocations, arguments, and allows stubbing return values" },
        { id: "b", label: "It formats source code" },
        { id: "c", label: "It shuts down the operating system" },
        { id: "d", label: "It compiles HTML" }
      ],
      correctIndex: 0,
      explanation: "vi.fn() creates a mock function to record calls, inspect arguments, and return simulated data without invoking real dependencies."
    },
    {
      id: "q-node-097-6",
      prompt: "What is the purpose of the `afterAll` hook in test suites?",
      options: [
        { id: "a", label: "Cleaning up resources, closing open database connection pools, and stopping test HTTP servers so the process can exit cleanly" },
        { id: "b", label: "Starting the test runner" },
        { id: "c", label: "Deleting the repository" },
        { id: "d", label: "Sending test results to Discord" }
      ],
      correctIndex: 0,
      explanation: "afterAll executes once after all tests complete, closing database connections and open sockets to prevent hanging test runner processes."
    },
    {
      id: "q-node-097-7",
      prompt: "What is Continuous Integration (CI)?",
      options: [
        { id: "a", label: "Writing code without taking breaks" },
        { id: "b", label: "The practice of automatically running linters, type checks, and test suites on every pull request to catch defects before code is merged" },
        { id: "c", label: "Restarting production servers every hour" },
        { id: "d", label: "Selling software subscriptions" }
      ],
      correctIndex: 1,
      explanation: "CI automates build verification and testing on every code commit, preventing broken builds and regressions from reaching the main branch."
    },
    {
      id: "q-node-097-8",
      prompt: "What exit code must a test runner emit for a CI pipeline to consider the test run successful?",
      options: [
        { id: "a", label: "0" },
        { id: "b", label: "1" },
        { id: "c", label: "200" },
        { id: "d", label: "-1" }
      ],
      correctIndex: 0,
      explanation: "In Unix and command line processes, exit code 0 signifies successful execution without errors; any non-zero exit code indicates failure."
    },
    {
      id: "q-node-097-9",
      prompt: "What does `NODE_ENV=test` typically trigger in an Express application?",
      options: [
        { id: "a", label: "It mutes error logs and loads test configuration settings (e.g. test database URI)" },
        { id: "b", label: "It deletes the node_modules folder" },
        { id: "c", label: "It disables HTTPS" },
        { id: "d", label: "It forces the browser to open" }
      ],
      correctIndex: 0,
      explanation: "Setting NODE_ENV=test informs the app to load test environment variables, silence console error dumps during expected error tests, and use test databases."
    },
    {
      id: "q-node-097-10",
      prompt: "What is 'Code Coverage' in automated testing?",
      options: [
        { id: "a", label: "The physical size of the JavaScript files on disk" },
        { id: "b", label: "A metric measuring the percentage of source code lines, branches, and functions executed during automated test runs" },
        { id: "c", label: "The amount of comments in the code" },
        { id: "d", label: "The number of git branches created" }
      ],
      correctIndex: 1,
      explanation: "Code coverage tracks which statements, branches, and functions were executed by the test suite, identifying untested edge cases."
    }
  ]
};

// LESSON 098: AUTOMATED API TESTING
const lesson098: CurriculumItem = {
  id: "item-node-098-automated-api-testing",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Module 6: Database Integration and Production",
  modulePosition: 6,
  title: "Automated API Testing",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Automated API Testing: Supertest, HTTP Assertions & Edge Cases",
  contentDescription: "Master end-to-end HTTP integration testing using Supertest, verifying response status codes, JSON envelope structures, error edge cases, and authentication headers.",
  codeSnippet: {
    language: "javascript",
    code: `// Automated HTTP API Integration Test with Supertest & Vitest
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('Course API Endpoints Integration Tests', () => {
  it('GET /api/v1/courses returns 200 and paginated course list', async () => {
    const res = await request(app)
      .get('/api/v1/courses?limit=10')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toHaveProperty('count');
  });

  it('POST /api/v1/courses rejects unauthenticated requests with 401', async () => {
    const res = await request(app)
      .post('/api/v1/courses')
      .send({ title: 'Unauthorized Course', price: 99 })
      .expect(401);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/Authentication required/i);
  });

  it('POST /api/v1/courses rejects invalid payload with 400 Bad Request', async () => {
    const adminToken = getTestToken({ role: 'admin' });

    const res = await request(app)
      .post('/api/v1/courses')
      .set('Authorization', \`Bearer \${adminToken}\`)
      .send({ title: 'Hi', price: -50 }) // Fails length & price >= 0
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.issues).toBeDefined();
  });
});`
  },
  sections: [
    {
      title: "Core Concept: HTTP Testing with Supertest",
      explanation: "While unit tests verify isolated functions, API integration tests verify that the entire HTTP pipeline—body parsers, authentication middleware, validation schemas, controllers, and error handlers—works harmoniously together.\n\n`supertest` is the industry-standard library for testing Node HTTP servers. It binds directly to your Express `app` object and dispatches simulated HTTP requests in-memory without needing to bind to a physical TCP port (`app.listen()`), making tests blazingly fast and eliminating port collision conflicts in CI environments."
    },
    {
      title: "The Anatomy of a Comprehensive API Test Suite",
      explanation: "A robust API test suite exercises both the happy path and critical boundary failure states:",
      table: {
        headers: ["Test Scenario", "Expected Status", "Assertions to Verify"],
        rows: [
          ["Happy Path (Valid input)", "200 OK / 201 Created", "Response envelope shape, data values, Location header, database persistence"],
          ["Validation Failure (Malformed body)", "400 Bad Request", "Specific field errors in issues array; zero database side-effects"],
          ["Unauthenticated Request", "401 Unauthorized", "Rejection before reaching business services"],
          ["Forbidden Action (Role mismatch)", "403 Forbidden", "Verified user denied access to privileged endpoint"],
          ["Resource Not Found", "404 Not Found", "Standardized not-found error envelope"],
          ["Conflict (Duplicate unique field)", "409 Conflict", "Database unique index error mapped cleanly to conflict status"]
        ]
      }
    },
    {
      title: "Testing Authentication & Cookies",
      explanation: "To test protected endpoints, helper functions can generate valid test JWTs or session cookies. Supertest allows setting custom headers (`.set('Authorization', 'Bearer ' + token)`) or cookies (`.set('Cookie', ['token=' + token])`), enabling testing of role-based permissions without running full login workflows before every single test."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Do NOT export `app.listen(port)` from the same file that defines your Express `app`. If you do, importing `app` inside your test files will cause Supertest to attempt to listen on the port, throwing `EADDRINUSE` errors when running parallel test workers!\n\nAlways separate your application into two files:\n1. `src/app.js`: Instantiates `express()`, configures middleware, mounts routes, and exports `app`.\n2. `src/server.js`: Imports `app` from `app.js` and calls `app.listen(PORT)`."
    }
  ],
  questions: [
    {
      id: "q-node-098-1",
      prompt: "Why should `app.listen(PORT)` be kept in a separate `server.js` file from `app.js`?",
      options: [
        { id: "a", label: "Because Express does not allow more than one file" },
        { id: "b", label: "To allow test suites (Supertest) to import `app` without binding to a physical TCP port, preventing `EADDRINUSE` port collision errors" },
        { id: "c", label: "Because server.js compiles faster" },
        { id: "d", label: "To enable SSL encryption" }
      ],
      correctIndex: 1,
      explanation: "Separating app creation from server listening allows test runners to pass the Express app directly to Supertest without opening live network sockets."
    },
    {
      id: "q-node-098-2",
      prompt: "What does `supertest(app).get('/api/users')` do?",
      options: [
        { id: "a", label: "Sends a real HTTP request across the public internet to Google" },
        { id: "b", label: "Dispatches an in-memory HTTP GET request to the Express application pipeline and returns response assertions" },
        { id: "c", label: "Deletes the users table" },
        { id: "d", label: "Formats JSON data" }
      ],
      correctIndex: 1,
      explanation: "Supertest simulates HTTP requests against the Express pipeline in-memory, providing fluent assertion methods for status codes and headers."
    },
    {
      id: "q-node-098-3",
      prompt: "Which Supertest method attaches an HTTP header (such as an Authorization token) to a test request?",
      options: [
        { id: "a", label: ".setHeader(key, value)" },
        { id: "b", label: ".set(key, value)" },
        { id: "c", label: ".attachHeader(key, value)" },
        { id: "d", label: ".withToken(token)" }
      ],
      correctIndex: 1,
      explanation: "The .set('Header-Name', 'value') method sets request headers on the outgoing Supertest request."
    },
    {
      id: "q-node-098-4",
      prompt: "Why is it important to assert specific response body schemas in tests rather than merely checking `expect(200)`?",
      options: [
        { id: "a", label: "Because an endpoint could return 200 OK while returning completely empty or corrupted data" },
        { id: "b", label: "Because 200 is deprecated" },
        { id: "c", label: "Because Supertest crashes if you only check status codes" },
        { id: "d", label: "To increase file size" }
      ],
      correctIndex: 0,
      explanation: "Verifying the response payload shape guarantees that business data, pagination metadata, and properties are accurately returned."
    },
    {
      id: "q-node-098-5",
      prompt: "How can you test how your API handles database connection failures?",
      options: [
        { id: "a", label: "Unplug your computer's internet cable" },
        { id: "b", label: "Mock the repository or database query method using `vi.spyOn(repo, 'find').mockRejectedValue(new Error('DB Timeout'))` and assert a 500 status" },
        { id: "c", label: "Delete your database user account" },
        { id: "d", label: "It is impossible to test database errors" }
      ],
      correctIndex: 1,
      explanation: "Mocking repository methods to reject allows verifying that error middleware catches database exceptions and maps them to clean 500 responses."
    },
    {
      id: "q-node-098-6",
      prompt: "What HTTP method does `.send(payload)` attach to in Supertest?",
      options: [
        { id: "a", label: "The request body payload for POST, PUT, or PATCH requests" },
        { id: "b", label: "The URL query parameters" },
        { id: "c", label: "The cookie headers" },
        { id: "d", label: "The server hostname" }
      ],
      correctIndex: 0,
      explanation: ".send(data) serializes data into the request body and sets the Content-Type header to application/json by default."
    },
    {
      id: "q-node-098-7",
      prompt: "How should test databases be managed between individual test cases to prevent state leakage?",
      options: [
        { id: "a", label: "Drop and recreate the entire database on every test (takes 10 seconds per test)" },
        { id: "b", label: "Clear table contents or execute a quick database truncation / transaction rollback in a `beforeEach` hook" },
        { id: "c", label: "Never clean test databases" },
        { id: "d", label: "Run tests in alphabetical order" }
      ],
      correctIndex: 1,
      explanation: "Truncating tables or rolling back transactions in beforeEach resets the database to a clean baseline in milliseconds without slow schema rebuilds."
    },
    {
      id: "q-node-098-8",
      prompt: "What does `.expect('Content-Type', /json/)` verify in a Supertest chain?",
      options: [
        { id: "a", label: "That the server returns a response with a Content-Type header containing 'json'" },
        { id: "b", label: "That the server is written in JavaScript" },
        { id: "c", label: "That the database is MongoDB" },
        { id: "d", label: "That the user is logged in" }
      ],
      correctIndex: 0,
      explanation: ".expect(header, regex) asserts that the designated HTTP response header matches the specified regular expression."
    },
    {
      id: "q-node-098-9",
      prompt: "What does testing 'Boundary Conditions' mean in API validation testing?",
      options: [
        { id: "a", label: "Testing values right at the threshold limits (e.g. testing title length 4 chars, 5 chars, 100 chars, and 101 chars)" },
        { id: "b", label: "Testing from different geographical countries" },
        { id: "c", label: "Testing network router cables" },
        { id: "d", label: "Testing monitor screen resolution" }
      ],
      correctIndex: 0,
      explanation: "Boundary testing evaluates edges of validation constraints (min, max, empty, null) where off-by-one errors frequently occur."
    },
    {
      id: "q-node-098-10",
      prompt: "How can cookies be simulated in Supertest requests?",
      options: [
        { id: "a", label: "By setting the 'Cookie' header: `.set('Cookie', ['token=jwt_here'])`" },
        { id: "b", label: "Using document.cookie" },
        { id: "c", label: "Cookies cannot be tested in Node" },
        { id: "d", label: "By restarting the computer" }
      ],
      correctIndex: 0,
      explanation: "Passing an array of cookie name-value strings to .set('Cookie', [...]) simulates browser cookie transmission in Supertest."
    }
  ]
};

// LESSON 099: PRODUCTION DEPLOYMENT AND OBSERVABILITY
const lesson099: CurriculumItem = {
  id: "item-node-099-production-deployment-observability",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Module 6: Database Integration and Production",
  modulePosition: 6,
  title: "Production Deployment and Observability",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Production Deployment and Observability: Docker, Graceful Shutdown & Health",
  contentDescription: "Master production readiness checklists, multi-stage Docker builds, liveness and readiness health probes, handling SIGTERM/SIGINT graceful shutdowns, and metrics observability.",
  codeSnippet: {
    language: "javascript",
    code: `// Graceful Shutdown Implementation in Production Express
import http from 'node:http';
import app from './app.js';
import { dbPool } from './config/db.js';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Health check endpoints for Kubernetes / Cloud Load Balancers
app.get('/health/live', (req, res) => res.status(200).json({ status: 'live' }));
app.get('/health/ready', async (req, res) => {
  try {
    // Verify database connectivity before declaring service ready to receive traffic
    await dbPool.query('SELECT 1');
    res.status(200).json({ status: 'ready', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'unavailable', error: 'Database unreachable' });
  }
});

server.listen(PORT, () => console.log(\`Production server running on port \${PORT}\`));

// Graceful shutdown handler for SIGTERM (Docker/Kubernetes termination)
async function handleShutdown(signal) {
  console.log(\`Received \${signal}. Commencing graceful shutdown...\`);
  
  // 1. Stop accepting new incoming HTTP connections
  server.close(async () => {
    console.log('HTTP server closed. Finishing in-flight requests.');
    try {
      // 2. Drain and close database connection pools
      await dbPool.end();
      console.log('Database connections cleanly closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during cleanup:', err);
      process.exit(1);
    }
  });

  // Force shutdown after 10-second timeout if connections fail to close
  setTimeout(() => {
    console.error('Forcefully terminating process after timeout');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));`
  },
  sections: [
    {
      title: "Core Concept: The Production Readiness Checklist",
      explanation: "Writing code that runs on your local machine is only half the journey. Deploying software to production requires operational hardening to ensure zero-downtime deployments, resilience against crashes, and observability when anomalies occur.\n\nA production-ready Node.js backend must satisfy:\n- Environment Secrets: Injected via cloud secret managers; zero secrets committed in Git.\n- Process Management: Multi-process clustering via Docker, Kubernetes, or PM2.\n- Health Checks: Standardized endpoints reporting system liveness and dependency readiness.\n- Graceful Shutdown: Clean cleanup of active network sockets and database pools on container termination."
    },
    {
      title: "Liveness vs Readiness Health Checks",
      explanation: "Cloud orchestrators (like Kubernetes or AWS ECS) use two distinct health probes:",
      table: {
        headers: ["Probe", "Endpoint", "What it Measures", "Orchestrator Action on Failure"],
        rows: [
          ["Liveness Probe", "/health/live", "Is the Node.js event loop spinning and responsive?", "Kills and restarts the container if frozen"],
          ["Readiness Probe", "/health/ready", "Can the service reach its database and downstream dependencies?", "Temporarily removes container from load balancer pool until healthy"]
        ]
      }
    },
    {
      title: "Graceful Shutdown Mechanics: Handling SIGTERM",
      explanation: "When a cloud platform deploys a new version of your container or scales down instances, it sends a POSIX `SIGTERM` signal to the Node process. If your server exits abruptly, all currently executing database transactions, file uploads, and active payment requests are severed mid-flight, corrupting client data.\n\nA graceful shutdown interceptor captures `SIGTERM`, calls `server.close()` to stop accepting new requests while allowing currently pending requests to complete, flushes logs, closes database pools cleanly, and exits with code 0."
    },
    {
      title: "Containerization: Multi-Stage Dockerfile",
      explanation: "Production Docker images must be lean, secure, and devoid of development tooling. Multi-stage Docker builds achieve this by compiling dependencies in a heavy build stage, then copying only the production `node_modules` and compiled source files into a minimal, non-root Alpine Linux production container."
    }
  ],
  questions: [
    {
      id: "q-node-099-1",
      prompt: "What is the purpose of a 'Graceful Shutdown' in a production Node.js server?",
      options: [
        { id: "a", label: "To delete the server disk" },
        { id: "b", label: "To stop accepting new connections while allowing in-flight requests to complete and closing database pools cleanly before the process exits" },
        { id: "c", label: "To restart the computer instantly with zero delay" },
        { id: "d", label: "To notify users via text message" }
      ],
      correctIndex: 1,
      explanation: "Graceful shutdown prevents data corruption by finishing currently executing user requests and closing database pools before termination."
    },
    {
      id: "q-node-099-2",
      prompt: "What POSIX signal does Docker and Kubernetes send to a container process when initiating a shutdown or redeployment?",
      options: [
        { id: "a", label: "SIGKILL" },
        { id: "b", label: "SIGTERM" },
        { id: "c", label: "SIGHUP" },
        { id: "d", label: "SIGSTOP" }
      ],
      correctIndex: 1,
      explanation: "Orchestrators send SIGTERM first, granting the application a grace period (e.g. 30 seconds) to shut down gracefully before sending SIGKILL."
    },
    {
      id: "q-node-099-3",
      prompt: "What is the difference between a Liveness probe and a Readiness probe in cloud deployments?",
      options: [
        { id: "a", label: "Liveness checks if the process is alive; Readiness checks if the application's dependencies (database) are ready to receive live user traffic" },
        { id: "b", label: "Liveness is for databases; Readiness is for CSS" },
        { id: "c", label: "They are synonyms" },
        { id: "d", label: "Liveness only works in development" }
      ],
      correctIndex: 0,
      explanation: "A liveness probe restarts frozen processes, while a readiness probe stops routing network traffic to containers whose databases or dependencies are unavailable."
    },
    {
      id: "q-node-099-4",
      prompt: "What HTTP status code should the `/health/ready` endpoint return if the database connection has failed?",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "503 Service Unavailable" },
        { id: "c", label: "301 Redirect" },
        { id: "d", label: "204 No Content" }
      ],
      correctIndex: 1,
      explanation: "503 Service Unavailable communicates to load balancers that the server cannot process user traffic until dependency health is restored."
    },
    {
      id: "q-node-099-5",
      prompt: "Why should Node.js applications run inside Docker containers as a non-root user (e.g. `USER node`)?",
      options: [
        { id: "a", label: "Because root users cannot execute JavaScript" },
        { id: "b", label: "For security: running as non-root limits the damage an attacker can inflict on the host operating system if they exploit a vulnerability" },
        { id: "c", label: "Because non-root containers download faster" },
        { id: "d", label: "To increase RAM capacity" }
      ],
      correctIndex: 1,
      explanation: "Running as non-root prevents container breakout exploits where an attacker gaining remote code execution gains root privileges on the underlying host."
    },
    {
      id: "q-node-099-6",
      prompt: "What is the primary benefit of a Multi-Stage Docker build for Node.js backends?",
      options: [
        { id: "a", label: "It produces ultra-lean, secure production container images containing only production dependencies and runtime files, omitting compilers and devDependencies" },
        { id: "b", label: "It compiles JavaScript into Python" },
        { id: "c", label: "It eliminates the need for Docker" },
        { id: "d", label: "It makes databases unnecessary" }
      ],
      correctIndex: 0,
      explanation: "Multi-stage builds separate build tooling from runtime environments, shrinking image sizes from hundreds of megabytes to minimal production footprints."
    },
    {
      id: "q-node-099-7",
      prompt: "Why should a safety timeout (`setTimeout(..., 10000).unref()`) be included in graceful shutdown handlers?",
      options: [
        { id: "a", label: "To delay shutdown unnecessarily" },
        { id: "b", label: "To guarantee that the process forcibly exits if a hanging database connection or locked socket prevents `server.close()` from ever completing" },
        { id: "c", label: "Because Express requires 10-second delays" },
        { id: "d", label: "To format logs" }
      ],
      correctIndex: 1,
      explanation: "A failsafe timer ensures the process does not hang indefinitely if an external resource or unclosed socket fails to drain."
    },
    {
      id: "q-node-099-8",
      prompt: "What tool allows running multiple instances of a Node.js process across all available CPU cores on a single virtual machine?",
      options: [
        { id: "a", label: "Node.js Cluster module or PM2 cluster mode" },
        { id: "b", label: "Babel" },
        { id: "c", label: "Nodemon" },
        { id: "d", label: "ESLint" }
      ],
      correctIndex: 0,
      explanation: "The Node Cluster module and PM2 cluster mode fork multiple worker processes sharing the same server port, utilizing all available CPU cores."
    },
    {
      id: "q-node-099-9",
      prompt: "What is distributed tracing in modern microservices observability?",
      options: [
        { id: "a", label: "Drawing pictures of network routers" },
        { id: "b", label: "Tracking an HTTP request as it travels across multiple backend microservices and databases using a shared Trace/Correlation ID" },
        { id: "c", label: "Tracking user mouse movements" },
        { id: "d", label: "Printing git commits to PDF" }
      ],
      correctIndex: 1,
      explanation: "Distributed tracing propagates trace and span IDs across services, profiling total latency and identifying bottlenecks across microservices."
    },
    {
      id: "q-node-099-10",
      prompt: "Why should `nodemon` never be installed as a production dependency or used as a production start command?",
      options: [
        { id: "a", label: "Because nodemon watches the file system continuously, consuming unnecessary CPU/RAM and restarting on temporary log writes" },
        { id: "b", label: "Because nodemon only works on Windows" },
        { id: "c", label: "Because nodemon disables Express" },
        { id: "d", label: "Because nodemon deletes node_modules" }
      ],
      correctIndex: 0,
      explanation: "nodemon is a development file watcher; running it in production wastes resources and risks unwanted restarts during disk writes."
    }
  ]
};

// MODULE 6 ASSESSMENT QUIZ (10 comprehensive questions)
const nodeModule06Quiz: CurriculumItem = {
  id: "item-node-m6-quiz",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Module 6: Database Integration and Production",
  modulePosition: 6,
  title: "Module 6 Assessment: Databases & Production Readiness MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  contentHeading: "Module 6 Assessment: Mongoose, Automated Testing, Supertest & Graceful Shutdown",
  contentDescription: "Evaluate your comprehensive mastery of MongoDB document modeling, Mongoose hooks, Vitest unit testing, Supertest HTTP assertions, Docker containerization, health probes, and graceful shutdown.",
  questions: [
    ...(lesson096.questions || []).slice(0, 3),
    ...(lesson097.questions || []).slice(0, 3),
    ...(lesson098.questions || []).slice(0, 2),
    ...(lesson099.questions || []).slice(0, 2)
  ]
};

// MODULE 6 HANDS-ON ASSESSMENT LAB
const nodeModule06Lab: CurriculumItem = {
  id: "item-node-m6-lab",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Module 6: Database Integration and Production",
  modulePosition: 6,
  title: "Module 6 Assessment: Integration Test Suite & Production Hardening",
  duration: "90 mins",
  type: "assignment",
  position: 6,
  contentHeading: "Module 6 Project Lab: Automated API Test Harness & Graceful Container Shutdown",
  contentDescription: "Build a production-hardened Express API suite featuring an automated Supertest integration test harness covering all CRUD and auth endpoints, liveness/readiness probes, and POSIX SIGTERM graceful shutdown.",
  sections: [
    {
      title: "Lab Objectives & Requirements",
      explanation: "In this practical lab, you will bring your backend system to full production readiness:",
      bullets: [
        "Architectural Decoupling: Separate your codebase into `src/app.js` (Express configuration) and `src/server.js` (HTTP server listener).",
        "Automated Supertest Suite: Write integration tests asserting 200/201 success paths, 400 validation failures, 401 unauthenticated rejections, 403 authorization rejections, and 404 not-found handlers.",
        "Liveness & Readiness Probes: Implement `/health/live` (event loop check) and `/health/ready` (active database query probe returning 503 if unavailable).",
        "Graceful Shutdown Lifecycle: Implement a `SIGTERM` / `SIGINT` signal listener that closes the HTTP server, allows in-flight requests to complete, terminates database pools, and safely exits with code 0."
      ]
    },
    {
      title: "Expected Deliverable Specification",
      explanation: "Submit your implementation containing:\n1. `src/app.js`: Express app instance with health check routes.\n2. `src/server.js`: HTTP listener with graceful shutdown handling.\n3. `tests/api/courses.test.js`: Supertest integration test suite.\n4. `Dockerfile`: Multi-stage Docker build running as a non-root user."
    }
  ]
};

// Exporting Module 6
export const nodeModule06: CurriculumSubModule = {
  id: "module-node-06-database-production",
  title: "Module 6: Database Integration and Production",
  description: "Master MongoDB and Mongoose document modeling, unit testing with Vitest, automated API testing with Supertest, Docker containerization, health probes, and graceful shutdown.",
  position: 6,
  duration: "3 hours, 15 mins",
  items: [
    lesson096,
    lesson097,
    lesson098,
    lesson099,
    nodeModule06Quiz,
    nodeModule06Lab
  ]
};
