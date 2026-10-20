import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 6: SQL APPLICATION INTEGRATION AND MONGODB BRIDGE
// Lessons 071 - 073 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 071: CONNECTING NODE.JS TO SQL
const lesson071: CurriculumItem = {
  id: "item-sql-071-connecting-node-sql",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-06-integration-mongodb",
  moduleTitle: "Module 6: SQL Application Integration and MongoDB Bridge",
  modulePosition: 6,
  title: "Connecting Node.js to SQL",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Connecting Node.js to SQL: Connection Pooling, Drivers & Lifecycle",
  contentDescription: "Understand database drivers (pg, mysql2), implement production connection pooling, manage connection lifecycles, and handle network drops gracefully.",
  codeSnippet: {
    language: "javascript",
    code: `// Production PostgreSQL connection pooling in Node.js
import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Max concurrent socket connections
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Abort if connection takes > 2s
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Generic query helper with automatic connection release
export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV !== 'production') {
    console.log('Executed query', { text, duration, rows: res.rowCount });
  }
  return res;
}`
  },
  sections: [
    {
      title: "Core Concept: The Heavy Cost of Database TCP Connections",
      explanation: "When your Node.js backend connects to PostgreSQL or MySQL, establishing a raw socket connection is expensive. The server must negotiate a TCP three-way handshake, establish TLS/SSL encryption, authenticate credentials, and spawn a dedicated background backend process inside the database engine. This process takes 50 to 150 milliseconds.\n\nIf your backend opened a brand-new connection for every incoming HTTP request, your database would spend 90% of its CPU power opening and closing sockets rather than executing queries, collapsing under moderate traffic. A Connection Pool maintains a pre-warmed pool of reusable, persistent database connections that request handlers borrow and return in sub-millisecond time."
    },
    {
      title: "Connection Pool Mechanics Explained",
      explanation: "How connection pooling coordinates high-concurrency traffic:",
      table: {
        headers: ["Pool State", "Client Action", "Database Action", "Timing Impact"],
        rows: [
          ["Idle Pool", "Application idle with 5 open standby sockets", "Database processes remain sleeping and warm", "Zero latency overhead"],
          ["Request Arrives", "Handler requests connection: `pool.connect()`", "Pool hands over an existing open socket instantly", "< 1 millisecond checkout"],
          ["Query Executes", "Handler sends SQL over checked-out socket", "Database worker processes query and returns result", "Fast query execution"],
          ["Request Finishes", "Handler releases connection: `client.release()`", "Socket returned to pool for the next waiting request", "Connection is never destroyed"]
        ]
      }
    },
    {
      title: "System Mechanics: Pool Configuration Parameters",
      explanation: "Configuring your database pool requires setting four essential parameters:",
      bullets: [
        "`max`: The maximum number of concurrent socket connections allowed in the pool (e.g. 10 to 20 per Node.js process).",
        "`idleTimeoutMillis`: How long an idle connection can sit unused before being terminated to reclaim memory.",
        "`connectionTimeoutMillis`: How long the application will wait in queue for an available socket before throwing an error if the pool is exhausted.",
        "`ssl`: Security configuration for cloud hosting providers (e.g. Supabase, AWS RDS, Neon) requiring encrypted connections."
      ]
    },
    {
      title: "Production Scenario: The Leaked Connection Outage",
      explanation: "A catastrophic bug in backend programming is checking out a connection with `const client = await pool.connect()` and forgetting to call `client.release()` in a `finally` block when an error occurs. After 20 errors, all 20 pool slots are permanently tied up (leaked). Every subsequent HTTP request across the entire platform hangs indefinitely, causing a complete system outage. Using `pool.query()` directly avoids this because it handles acquisition and release automatically."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Hardcoding database credentials in source code: Storing `postgres://admin:secret123@localhost:5432` in git commits is a severe security vulnerability. Always read connection strings from environment variables (`process.env.DATABASE_URL`) managed by `.env` files locally and secure secret stores in production."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Configure a Node.js script using the `pg` driver that initializes a connection pool, executes `SELECT NOW()`, logs the database time, and gracefully terminates the pool with `pool.end()`."
    }
  ],
  questions: [
    {
      id: "q-sql-071-1",
      prompt: "Why do production backend applications use Database Connection Pooling instead of creating a new connection for every request?",
      options: [
        { id: "a", label: "Creating new TCP and TLS connections for every request causes massive CPU overhead and latency" },
        { id: "b", label: "Database drivers only permit one connection per year" },
        { id: "c", label: "Connection pools compress the database tables" },
        { id: "d", label: "SQL syntax requires connection pools" }
      ],
      correctAnswer: "a",
      explanation: "Establishing TCP sockets, TLS handshakes, and database authentication takes 50-150ms. Connection pooling reuses pre-established sockets in under 1ms."
    },
    {
      id: "q-sql-071-2",
      prompt: "What catastrophe happens if a backend handler borrows a client via `pool.connect()` but fails to call `client.release()`?",
      options: [
        { id: "a", label: "The database password changes automatically" },
        { id: "b", label: "The connection is leaked; once the pool reaches its max limit, all future requests hang indefinitely waiting for an available socket" },
        { id: "c", label: "The table data is erased" },
        { id: "d", label: "The Node.js server deletes its package.json" }
      ],
      correctAnswer: "b",
      explanation: "Connection leaks exhaust pool capacity, leaving all subsequent queries stalled in queue until the application crashes or times out."
    },
    {
      id: "q-sql-071-3",
      prompt: "Where should database connection credentials and passwords be stored in production applications?",
      options: [
        { id: "a", label: "Directly in the git repository README" },
        { id: "b", label: "In environment variables (e.g. DATABASE_URL) excluded from version control" },
        { id: "c", label: "Inside public HTML meta tags" },
        { id: "d", label: "In the user's browser localStorage" }
      ],
      correctAnswer: "b",
      explanation: "Database connection strings contain sensitive credentials and must be injected via environment variables, never committed to git repositories."
    },
    {
      id: "q-sql-071-4",
      prompt: "What does `pool.query(sql, params)` provide compared to manual `pool.connect()`?",
      options: [
        { id: "a", label: "It automatically borrows a connection from the pool, executes the query, and releases the connection back to the pool" },
        { id: "b", label: "It converts SQL into MongoDB queries" },
        { id: "c", label: "It runs the query without a database connection" },
        { id: "d", label: "It makes all columns uppercase" }
      ],
      correctAnswer: "a",
      explanation: "`pool.query()` is a convenient wrapper that acquires a connection, runs the query, and guarantees release back to the pool even if an error occurs."
    },
    {
      id: "q-sql-071-5",
      prompt: "What does the `max` configuration parameter specify in a connection pool?",
      options: [
        { id: "a", label: "The maximum number of rows a query can return" },
        { id: "b", label: "The maximum number of concurrent database connections allowed in the pool" },
        { id: "c", label: "The maximum file size of the database" },
        { id: "d", label: "The maximum length of a table name" }
      ],
      correctAnswer: "b",
      explanation: "`max` limits the pool size, protecting the database engine from being overwhelmed by thousands of simultaneous socket processes."
    },
    {
      id: "q-sql-071-6",
      prompt: "What does the `idleTimeoutMillis` setting do?",
      options: [
        { id: "a", label: "Shuts down the computer after 10 minutes" },
        { id: "b", label: "Terminates an idle standby connection if it sits unused for longer than the specified milliseconds" },
        { id: "c", label: "Delays queries intentionally" },
        { id: "d", label: "Sets the query timeout" }
      ],
      correctAnswer: "b",
      explanation: "`idleTimeoutMillis` reclaims memory and server resources by closing connections that have remained dormant for an extended duration."
    },
    {
      id: "q-sql-071-7",
      prompt: "How can you gracefully shut down a database connection pool when terminating a Node.js process?",
      options: [
        { id: "a", label: "pool.delete()" },
        { id: "b", label: "await pool.end()" },
        { id: "c", label: "process.kill()" },
        { id: "d", label: "DROP POOL;" }
      ],
      correctAnswer: "b",
      explanation: "`await pool.end()` drains active queries cleanly, closes all open TCP sockets, and shuts down the pool during graceful application teardown."
    },
    {
      id: "q-sql-071-8",
      prompt: "Why is a `finally` block essential when manually borrowing clients with `await pool.connect()`?",
      options: [
        { id: "a", label: "It speeds up JavaScript execution" },
        { id: "b", label: "It guarantees that `client.release()` executes regardless of whether the query succeeded or threw an error" },
        { id: "c", label: "It is required by TypeScript compiler rules" },
        { id: "d", label: "It logs errors to the console automatically" }
      ],
      correctAnswer: "b",
      explanation: "Code in a `finally` block runs whether an exception was thrown or not, ensuring connections are never leaked."
    },
    {
      id: "q-sql-071-9",
      prompt: "Which Node.js package is the standard low-level driver for connecting to PostgreSQL databases?",
      options: [
        { id: "a", label: "pg" },
        { id: "b", label: "mysql2" },
        { id: "c", label: "mongoose" },
        { id: "d", label: "express" }
      ],
      correctAnswer: "a",
      explanation: "`pg` (node-postgres) is the foundational, production-proven client library for PostgreSQL in Node.js."
    },
    {
      id: "q-sql-071-10",
      prompt: "What error occurs if your backend attempts to acquire a connection from a pool whose `max` limit is reached, and the wait exceeds `connectionTimeoutMillis`?",
      options: [
        { id: "a", label: "Timeout Error: connection pool exhausted or could not acquire connection" },
        { id: "b", label: "Syntax error in SQL" },
        { id: "c", label: "Table not found error" },
        { id: "d", label: "Authentication failure" }
      ],
      correctAnswer: "a",
      explanation: "When all pool connections are busy and the timeout expires, the driver throws a connection timeout error indicating pool saturation."
    }
  ]
};

// LESSON 072: CRUD API AND DATABASE BOUNDARIES
const lesson072: CurriculumItem = {
  id: "item-sql-072-crud-api-database-boundaries",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-06-integration-mongodb",
  moduleTitle: "Module 6: SQL Application Integration and MongoDB Bridge",
  modulePosition: 6,
  title: "CRUD API and Database Boundaries",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "CRUD API and Database Boundaries: Repositories & HTTP Status Mapping",
  contentDescription: "Architect a layered repository pattern separating HTTP controllers from SQL queries, handle database constraint violations gracefully, and map storage errors to standard HTTP status codes.",
  codeSnippet: {
    language: "javascript",
    code: `// Repository Layer isolating raw SQL queries
import { pool } from '../db.js';

export const CourseRepository = {
  async findById(courseId) {
    const { rows } = await pool.query(
      'SELECT course_id, title, price, is_published FROM courses WHERE course_id = $1;',
      [courseId]
    );
    return rows[0] || null;
  },

  async create(courseData) {
    const { rows } = await pool.query(
      \`INSERT INTO courses (title, level, price)
       VALUES ($1, $2, $3)
       RETURNING course_id, title, price, created_at;\`,
      [courseData.title, courseData.level, courseData.price]
    );
    return rows[0];
  }
};`
  },
  sections: [
    {
      title: "Core Concept: Separating HTTP Routing from SQL Persistence",
      explanation: "In clean software architecture, your HTTP route handlers should not contain raw SQL query strings. If an Express controller handles HTTP headers, parses cookies, validates JSON, writes SQL queries, and formats database results all in one file, changing a table column requires modifying dozens of route handlers.\n\nThe Repository Pattern creates an architectural boundary: Route Controllers handle HTTP concerns (request bodies, query params, status codes), while Repositories encapsulate raw SQL queries and return pure domain objects. This keeps code modular, testable, and maintainable."
    },
    {
      title: "Mapping Database Error Codes to HTTP Responses",
      explanation: "Database engines return specific machine-readable error codes (such as SQLSTATE codes in PostgreSQL). Translating these errors gracefully into appropriate HTTP responses is critical:",
      table: {
        headers: ["PostgreSQL Error Code", "Condition", "Meaning", "HTTP Status Response"],
        rows: [
          ["`23505`", "unique_violation", "Attempted duplicate value on a UNIQUE column", "`409 Conflict` ('Email already registered')"],
          ["`23503`", "foreign_key_violation", "Referenced parent record does not exist", "`400 Bad Request` ('Invalid department ID')"],
          ["`23514`", "check_violation", "Value violated a CHECK constraint condition", "`422 Unprocessable Entity` ('Price must be positive')"],
          ["`22P02`", "invalid_text_representation", "Malformed data type (e.g. passing 'abc' as UUID)", "`400 Bad Request` ('Invalid ID format')"],
          ["`08006`", "connection_failure", "Database network drop or server offline", "`503 Service Unavailable` ('Database offline')"]
        ]
      }
    },
    {
      title: "System Mechanics: Preventing Data Leaks in Error Handlers",
      explanation: "When a database query fails, the raw error object often contains internal schema names, SQL snippets, and system file paths. In centralized Express error middleware, always inspect the error code and return a clean, user-friendly JSON message (`{ error: 'Resource conflict' }`), while sending the full technical stack trace to private server logs.",
      bullets: [
        "Never send `err.message` or `err.stack` directly to public API clients.",
        "Log the full error with request ID to private logging tools (Winston, Pino, Datadog).",
        "Return consistent structured JSON envelopes: `{ success: false, error: 'User-friendly message' }`."
      ]
    },
    {
      title: "Production Scenario: Atomic Soft Deletes",
      explanation: "In production enterprise applications, rows are rarely physically deleted with `DELETE FROM`. Instead, a soft delete pattern is used: `UPDATE courses SET deleted_at = NOW() WHERE course_id = $1`. The repository's find queries automatically append `WHERE deleted_at IS NULL`. This preserves historical audit relationships while hiding deleted items from the active API catalog."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Returning `200 OK` when a resource is not found: If `CourseRepository.findById(999)` returns `null`, returning `res.json(null)` with a 200 status forces frontend clients to handle null checks everywhere. Always check if the record exists, and return an explicit `404 Not Found` response (`return res.status(404).json({ error: 'Course not found' })`)."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Build an Express route `POST /api/courses` that calls `CourseRepository.create()`. Catch PostgreSQL error code `23505` (unique violation) and return a `409 Conflict` response with an explanatory message."
    }
  ],
  questions: [
    {
      id: "q-sql-072-1",
      prompt: "What is the primary role of the Repository Pattern in backend web architecture?",
      options: [
        { id: "a", label: "To store code on GitHub" },
        { id: "b", label: "To isolate raw database queries from HTTP route controllers, creating a clean modular boundary" },
        { id: "c", label: "To convert SQL into CSS" },
        { id: "d", label: "To delete old database backups" }
      ],
      correctAnswer: "b",
      explanation: "The Repository Pattern encapsulates data access logic, allowing controllers to interact with high-level data methods without coupling to specific SQL statements."
    },
    {
      id: "q-sql-072-2",
      prompt: "What HTTP status code should an API return when a database insert fails due to a unique constraint violation (PostgreSQL code 23505)?",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "409 Conflict" },
        { id: "c", label: "500 Internal Server Error" },
        { id: "d", label: "301 Moved Permanently" }
      ],
      correctAnswer: "b",
      explanation: "HTTP 409 Conflict informs the client that the request cannot be completed because it conflicts with existing state (e.g. email already registered)."
    },
    {
      id: "q-sql-072-3",
      prompt: "What HTTP status code should you return when a query by ID returns zero rows (`rows[0]` is undefined)?",
      options: [
        { id: "a", label: "200 OK with empty string" },
        { id: "b", label: "404 Not Found" },
        { id: "c", label: "500 Server Error" },
        { id: "d", label: "401 Unauthorized" }
      ],
      correctAnswer: "b",
      explanation: "HTTP 404 Not Found explicitly communicates that the requested resource URI does not exist."
    },
    {
      id: "q-sql-072-4",
      prompt: "What is a 'Soft Delete' in enterprise database systems?",
      options: [
        { id: "a", label: "Deleting rows while whispering quietly" },
        { id: "b", label: "Marking records as deleted using a timestamp column (e.g. `deleted_at = NOW()`) rather than physically removing them from disk" },
        { id: "c", label: "Deleting only odd-numbered IDs" },
        { id: "d", label: "Deleting rows from RAM but keeping them on disk" }
      ],
      correctAnswer: "b",
      explanation: "Soft deleting updates a flag or timestamp, preserving the historical integrity of past orders and financial records while filtering the item from active views."
    },
    {
      id: "q-sql-072-5",
      prompt: "Why should backend services catch database errors and translate them into custom JSON envelopes?",
      options: [
        { id: "a", label: "Raw database errors expose internal schema architecture, table names, and line numbers to potential attackers" },
        { id: "b", label: "Database errors are written in binary and crash browsers" },
        { id: "c", label: "JSON envelopes make internet cables faster" },
        { id: "d", label: "It is required by the World Wide Web Consortium (W3C)" }
      ],
      correctAnswer: "a",
      explanation: "Exposing raw database exceptions leaks sensitive architectural metadata. Custom responses provide safe user feedback while logging technical context internally."
    },
    {
      id: "q-sql-072-6",
      prompt: "What PostgreSQL error code represents a Foreign Key Violation (`foreign_key_violation`)?",
      options: [
        { id: "a", label: "23503" },
        { id: "b", label: "40404" },
        { id: "c", label: "00000" },
        { id: "d", label: "99999" }
      ],
      correctAnswer: "a",
      explanation: "In SQLSTATE standards, class 23 represents integrity constraint violations; specifically `23503` indicates a foreign key violation."
    },
    {
      id: "q-sql-072-7",
      prompt: "In a RESTful API, which HTTP method should be used to partially update specific fields of a course record?",
      options: [
        { id: "a", label: "GET" },
        { id: "b", label: "PATCH" },
        { id: "c", label: "POST" },
        { id: "d", label: "OPTIONS" }
      ],
      correctAnswer: "b",
      explanation: "HTTP PATCH is defined by RFC standards for applying partial modifications to a resource, whereas PUT replaces the entire resource."
    },
    {
      id: "q-sql-072-8",
      prompt: "What HTTP status code should be returned after successfully creating a new resource with `INSERT ... RETURNING`?",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "201 Created" },
        { id: "c", label: "204 No Content" },
        { id: "d", label: "202 Accepted" }
      ],
      correctAnswer: "b",
      explanation: "HTTP 201 Created indicates that the request succeeded and resulted in the creation of a new resource, typically returning the new record and its location."
    },
    {
      id: "q-sql-072-9",
      prompt: "What is an advantage of returning pure JavaScript objects from the repository layer?",
      options: [
        { id: "a", label: "JavaScript objects use zero memory" },
        { id: "b", label: "Controllers and services can be easily tested with mock repositories without requiring an active database server" },
        { id: "c", label: "It eliminates the need for Node.js" },
        { id: "d", label: "It converts relational data into GraphQL automatically" }
      ],
      correctAnswer: "b",
      explanation: "Decoupling persistence behind an interface allows unit tests to supply lightweight mock repositories in memory, speeding up test suites dramatically."
    },
    {
      id: "q-sql-072-10",
      prompt: "What should an API return when a client sends a malformed UUID like `GET /api/courses/not-a-uuid`?",
      options: [
        { id: "a", label: "500 Internal Server Error" },
        { id: "b", label: "400 Bad Request explaining that the course ID format is invalid" },
        { id: "c", label: "200 OK with random course" },
        { id: "d", label: "Restart the server" }
      ],
      correctAnswer: "b",
      explanation: "Catching invalid data format errors (PostgreSQL code 22P02) and returning 400 Bad Request informs the client that their input syntax is malformed."
    }
  ]
};

// LESSON 073: MONGODB CRUD, INDEXES AND MONGOOSE
const lesson073: CurriculumItem = {
  id: "item-sql-073-mongodb-crud-indexes-mongoose",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-06-integration-mongodb",
  moduleTitle: "Module 6: SQL Application Integration and MongoDB Bridge",
  modulePosition: 6,
  title: "MongoDB CRUD, Indexes and Mongoose",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "MongoDB CRUD, Indexes and Mongoose: Document Modeling & ODM Patterns",
  contentDescription: "Understand MongoDB document storage, BSON formats, CRUD operations (insertOne, find, updateOne), Mongoose schemas and models, and indexing strategies in NoSQL.",
  codeSnippet: {
    language: "javascript",
    code: `// Mongoose schema definition with validation and indexing
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, maxlength: 200 },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  price: { type: Number, required: true, min: 0 },
  tags: [{ type: String, trim: true }], // Embedded array
  instructor: {
    name: { type: String, required: true },
    bio: String
  },
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

// Composite index for fast catalog filtering
CourseSchema.index({ isPublished: 1, price: -1 });

export const Course = mongoose.model('Course', CourseSchema);`
  },
  sections: [
    {
      title: "Core Concept: The Document Database Philosophy",
      explanation: "While relational databases organize data into rigid tabular grids linked by foreign keys, document databases like MongoDB store records as self-contained, hierarchical BSON (Binary JSON) documents.\n\nIn MongoDB, documents belonging to the same collection do not need to share the exact same schema (polymorphism). One course document might contain an embedded syllabus array of chapters, while another contains rich video metadata objects. This model maps naturally to JavaScript objects in the MERN stack (MongoDB, Express, React, Node.js)."
    },
    {
      title: "SQL Concepts Mapped to MongoDB Concepts",
      explanation: "Understanding how familiar relational concepts translate into the document world:",
      table: {
        headers: ["Relational (RDBMS / SQL)", "Document Store (MongoDB)", "Description"],
        rows: [
          ["Database", "Database", "Container for collections and user permissions"],
          ["Table", "Collection", "Grouping of documents (e.g. `courses`, `users`)"],
          ["Row (Tuple)", "Document (BSON)", "Individual JSON-like object with an `_id` field"],
          ["Column (Attribute)", "Field / Key", "Key-value pair inside a document"],
          ["JOIN", "`$lookup` Aggregation", "Combines documents from two collections"],
          ["Primary Key", "`_id` (ObjectId)", "12-byte unique BSON identifier generated automatically"]
        ]
      }
    },
    {
      title: "System Mechanics: Core MongoDB CRUD Operations",
      explanation: "MongoDB queries use JavaScript-style method calls rather than declarative SQL strings:",
      bullets: [
        "Create: `await collection.insertOne({ title: 'React Basics', price: 0 });`",
        "Read: `await collection.find({ price: { $gte: 20 }, isPublished: true }).sort({ price: -1 }).limit(10);`",
        "Update: `await collection.updateOne({ _id: courseId }, { $set: { price: 29.99 } });` (Using atomic `$set` operator prevents overwriting entire document).",
        "Delete: `await collection.deleteOne({ _id: courseId });`"
      ]
    },
    {
      title: "Production Scenario: The Role of Mongoose as an ODM",
      explanation: "Because raw MongoDB is schema-less, client applications can accidentally insert malformed documents (like storing a string `'free'` in a numeric price field). Mongoose acts as an Object Data Modeling (ODM) library on top of MongoDB, providing application-level schema enforcement, data type validation, pre/post save lifecycle middleware, and query helpers in Node.js."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Forgetting the `$set` operator in updates: In raw MongoDB, executing `db.courses.updateOne({ _id }, { price: 29.99 })` without `$set` will completely wipe out the title, tags, and all other fields, replacing the entire document with just `{ price: 29.99 }`! Always use `$set: { price: 29.99 }`."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Define a Mongoose schema for a student review with fields for student name, star rating (1 to 5), written comment, and course reference. Add a compound index on course and rating."
    }
  ],
  questions: [
    {
      id: "q-sql-073-1",
      prompt: "What is BSON in MongoDB?",
      options: [
        { id: "a", label: "A styling language for web pages" },
        { id: "b", label: "Binary JSON: a binary serialization format supporting rich types like Date and ObjectId" },
        { id: "c", label: "A backup tool for PostgreSQL" },
        { id: "d", label: "A type of network router" }
      ],
      correctAnswer: "b",
      explanation: "BSON extends JSON with additional data types (such as Date, int32, int64, and ObjectId) and stores documents in an efficient binary format for fast traversal."
    },
    {
      id: "q-sql-073-2",
      prompt: "What is the primary role of Mongoose in a Node.js MongoDB application?",
      options: [
        { id: "a", label: "To convert MongoDB into a SQL database" },
        { id: "b", label: "To provide application-level schemas, strict type validation, and query middleware (ODM)" },
        { id: "c", label: "To run frontend React components" },
        { id: "d", label: "To replace Express servers" }
      ],
      correctAnswer: "b",
      explanation: "Mongoose is an Object Data Modeling (ODM) library that brings structured schema validation, type casting, business logic, and lifecycle hooks to MongoDB."
    },
    {
      id: "q-sql-073-3",
      prompt: "What happens in raw MongoDB if you execute an update without using the `$set` operator?",
      options: [
        { id: "a", label: "The database rejects the query with an error" },
        { id: "b", label: "The entire existing document is overwritten and replaced by the new object" },
        { id: "c", label: "The update is delayed by 1 hour" },
        { id: "d", label: "It automatically creates a duplicate document" }
      ],
      correctAnswer: "b",
      explanation: "In MongoDB driver syntax, passing a plain document without atomic operators like `$set` causes document replacement, wiping all unlisted fields."
    },
    {
      id: "q-sql-073-4",
      prompt: "What is the default primary key field automatically generated on every MongoDB document?",
      options: [
        { id: "a", label: "id" },
        { id: "b", label: "_id (storing a 12-byte ObjectId)" },
        { id: "c", label: "primary_key" },
        { id: "d", label: "uuid" }
      ],
      correctAnswer: "b",
      explanation: "Every MongoDB document requires an `_id` field, which defaults to a uniquely generated 12-byte BSON ObjectId containing timestamp and machine metadata."
    },
    {
      id: "q-sql-073-5",
      prompt: "What is the equivalent of a relational database 'Table' in MongoDB?",
      options: [
        { id: "a", label: "Column" },
        { id: "b", label: "Collection" },
        { id: "c", label: "Index" },
        { id: "d", label: "View" }
      ],
      correctAnswer: "b",
      explanation: "In MongoDB, collections are the containers that group related documents together, equivalent to tables in relational databases."
    },
    {
      id: "q-sql-073-6",
      prompt: "How do you perform a multi-table JOIN equivalent in MongoDB aggregation pipelines?",
      options: [
        { id: "a", label: "$join" },
        { id: "b", label: "$lookup" },
        { id: "c", label: "$merge" },
        { id: "d", label: "$connect" }
      ],
      correctAnswer: "b",
      explanation: "The `$lookup` pipeline stage performs left outer joins to another collection in the same database, bringing matched documents into an array field."
    },
    {
      id: "q-sql-073-7",
      prompt: "Which MongoDB query operator filters for values greater than or equal to a target number?",
      options: [
        { id: "a", label: "$gte" },
        { id: "b", label: ">=" },
        { id: "c", label: "$gt_eq" },
        { id: "d", label: "$more" }
      ],
      correctAnswer: "a",
      explanation: "The `$gte` comparison operator matches values greater than or equal to the specified threshold (e.g. `{ price: { $gte: 50 } }`)."
    },
    {
      id: "q-sql-073-8",
      prompt: "Can MongoDB collections have B-Tree indexes?",
      options: [
        { id: "a", label: "No, NoSQL databases do not use indexes" },
        { id: "b", label: "Yes, MongoDB builds B-Tree indexes on fields to accelerate queries just like relational databases" },
        { id: "c", label: "Only on the _id field" },
        { id: "d", label: "Only if hosted on AWS" }
      ],
      correctAnswer: "b",
      explanation: "MongoDB uses B-Tree indexes extensively to accelerate queries, enforce unique constraints, and support compound sorting."
    },
    {
      id: "q-sql-073-9",
      prompt: "What does the option `{ timestamps: true }` in a Mongoose schema automatically provide?",
      options: [
        { id: "a", label: "It counts the seconds since the database was installed" },
        { id: "b", label: "It automatically creates and manages `createdAt` and `updatedAt` Date fields" },
        { id: "c", label: "It sets a timer that deletes the document after 30 days" },
        { id: "d", label: "It syncs the document with a smartwatch" }
      ],
      correctAnswer: "b",
      explanation: "Mongoose timestamps automatically populate and update `createdAt` and `updatedAt` ISO date fields on every document save."
    },
    {
      id: "q-sql-073-10",
      prompt: "When is embedding related documents inside an array (Denormalization) advantageous in MongoDB?",
      options: [
        { id: "a", label: "When the embedded data grows infinitely to millions of items" },
        { id: "b", label: "When related data is bounded, tightly coupled, and always read together in a single query (e.g. course lesson items)" },
        { id: "c", label: "When you need to perform cross-document atomic transactions" },
        { id: "d", label: "Embedding is never recommended" }
      ],
      correctAnswer: "b",
      explanation: "Embedding is ideal for 1:Few bounded relationships where parent and children are always accessed together, providing lightning-fast single-document reads without joins."
    }
  ]
};

// MODULE 6 QUIZ
const sqlModule06Quiz: CurriculumItem = {
  id: "item-sql-mod06-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-06-integration-mongodb",
  moduleTitle: "Module 6: SQL Application Integration and MongoDB Bridge",
  modulePosition: 6,
  title: "Module 6 Assessment: Application Integration MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 4,
  isModuleQuiz: true,
  contentHeading: "Module 6 Quiz: Connection Pooling, Repositories, Error Codes & MongoDB",
  contentDescription: "Evaluate your comprehensive mastery of backend database integration: connection pool management, preventing connection leaks, repository design, SQLSTATE error mapping, BSON documents, and Mongoose modeling.",
  questions: [
    ...(lesson071.questions || []).slice(0, 4),
    ...(lesson072.questions || []).slice(0, 3),
    ...(lesson073.questions || []).slice(0, 3)
  ]
};

// MODULE 6 ASSESSMENT (LAB)
const sqlModule06Assessment: CurriculumItem = {
  id: "item-sql-mod06-lab",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-06-integration-mongodb",
  moduleTitle: "Module 6: SQL Application Integration and MongoDB Bridge",
  modulePosition: 6,
  title: "Module 6 Lab: Full-Stack SQL API with Connection Pooling",
  duration: "50 mins",
  type: "assignment",
  position: 5,
  isModuleAssessment: true,
  contentHeading: "Module 6 Lab Project: Full-Stack SQL API with Connection Pooling",
  contentDescription: "Build a production-grade Node.js database layer. Establish a connection pool with environment variables, implement a CourseRepository with parameterized CRUD queries, and handle PostgreSQL constraint errors gracefully in Express routes.",
  assignmentPrompt: {
    instructions: "Complete the database integration lab:\n1. Initialize a Node.js project with `pg` and `express`.\n2. Create `db.js` with a connection pool reading `DATABASE_URL` from `.env`.\n3. Create `courseRepository.js` with methods: `findAll(filters, pagination)`, `findById(id)`, `create(data)`, and `update(id, data)`.\n4. Build an Express router mapping HTTP routes to repository calls with error handling: map code `23505` to 409 Conflict and code `22P02` to 400 Bad Request.\n5. Write an automated integration test verifying connection checkout and graceful pool termination with `pool.end()`.",
    deliverables: [
      "Repository code and database connection pool module",
      "Express router with centralized database error translation",
      "Terminal test log showing successful CRUD operations and 409 conflict handling"
    ]
  }
};

export const sqlModule06: CurriculumSubModule = {
  id: "module-sql-06-integration-mongodb",
  subCourseId: "mod-database-sql",
  title: "Module 6 — SQL application integration and MongoDB bridge",
  description: "Connect Node.js to SQL via connection pooling, architect clean repository layers, handle database error codes in REST APIs, and bridge concepts to MongoDB document stores.",
  position: 6,
  items: [
    lesson071,
    lesson072,
    lesson073,
    sqlModule06Quiz,
    sqlModule06Assessment
  ]
};
