import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 1: DATABASE FOUNDATIONS
// Lessons 050 - 053 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 050: WHAT DATABASES SOLVE
const lesson050: CurriculumItem = {
  id: "item-sql-050-what-databases-solve",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Database Foundations",
  modulePosition: 1,
  title: "What Databases Solve",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "What Databases Solve: Reliable Storage, Concurrency & Integrity",
  contentDescription: "Understand why file storage fails for multi-user applications, how database engines guarantee persistence and concurrency, and how ACID transactions preserve data integrity.",
  codeSnippet: {
    language: "sql",
    code: `-- Example: Database transaction preventing partial data corruption
BEGIN;
  -- Deduct credit from student account
  UPDATE student_wallets
  SET balance = balance - 150
  WHERE student_id = 'stu_901' AND balance >= 150;

  -- Create enrollment record
  INSERT INTO course_enrollments (student_id, course_id, enrolled_at)
  VALUES ('stu_901', 'crs_402', NOW());
COMMIT;`
  },
  sections: [
    {
      title: "Core Concept: The Fragility of File Systems vs Database Engines",
      explanation: "Imagine running a busy university registrar office using a single paper notebook or a shared spreadsheet on a desktop. If two staff members open the file at the exact same second to register students for the final seat in a physics lecture, whichever person saves last overwrites the first. The first student's tuition is deducted, but their enrollment record vanishes into thin air.\n\nThis is the fundamental problem of flat-file storage: race conditions, absence of transactional boundaries, and vulnerability to catastrophic corruption if the computer loses power mid-write. A database management system (DBMS) is purpose-built software that coordinates concurrent reads and writes, enforces strict data types, indexes records for instant searching, and guarantees durability through write-ahead logging."
    },
    {
      title: "How Database Engines Coordinate Data Safely",
      explanation: "When your backend server executes a database query, it does not directly modify disk sectors. Instead, the database engine maintains an active memory buffer pool and a sequential append-only Write-Ahead Log (WAL). Before any data page is updated in memory, the proposed modification is flushed to the WAL on persistent storage. Even if power cuts out mid-operation, the engine reads the WAL upon reboot and either rolls forward completed transactions or rolls back incomplete ones.",
      table: {
        headers: ["Characteristic", "Flat Files (JSON / CSV)", "Database Management System (DBMS)"],
        rows: [
          ["Concurrency", "Prone to race conditions and file lock contention", "Row-level locking and Multi-Version Concurrency Control (MVCC)"],
          ["Crash Recovery", "Partial writes cause permanent file corruption", "Write-Ahead Logging (WAL) ensures atomic recovery"],
          ["Search Speed", "Linear O(N) scan reading entire file into memory", "B-Tree and Hash indexes retrieve records in O(log N) time"],
          ["Data Integrity", "Application must check every rule manually", "Enforced at engine boundary via primary, foreign, and check constraints"]
        ]
      }
    },
    {
      title: "System Mechanics: The ACID Guarantee",
      explanation: "Relational database engines provide four foundational guarantees known by the acronym ACID. These rules ensure that mission-critical business transactions remain predictable and consistent under heavy traffic or hardware failures:",
      bullets: [
        "Atomicity: An entire unit of work either completely finishes or completely fails. There is no partial state where money is withdrawn without enrollment created.",
        "Consistency: The database transitions strictly from one valid state to another, upholding all constraints, keys, and relational invariants.",
        "Isolation: Concurrent transactions execute as if they were running sequentially, preventing uncommitted updates from leaking between users.",
        "Durability: Once a transaction issues a COMMIT confirmation, its changes are guaranteed to survive subsequent server crashes or power failures."
      ]
    },
    {
      title: "Production Scenario: Concurrent Seat Reservation",
      explanation: "Consider an online academy where 500 eager students click 'Enroll Now' simultaneously for a cohort capped at 30 seats. Without database-level constraints and atomic transactions, an application-level check (such as reading current count from memory) will report available seats to dozens of concurrent requests before the write completes. With a database transaction and a CHECK constraint (`seats_reserved <= capacity`), the database engine evaluates each candidate atomically at the storage layer, rejecting any request that would violate the invariant."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "A frequent rookie mistake is relying solely on client-side or frontend checks for data integrity. Frontend validation improves user experience by giving instant UI feedback, but it provides zero security against direct API requests, scripts, or concurrent backend threads. Database constraints represent the ultimate, non-negotiable boundary of truth."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Consider an e-commerce platform with orders, customers, and inventory items. Write down three catastrophic data corruptions that would occur if the platform used flat JSON files on disk instead of an ACID-compliant relational database. Then identify which ACID property protects against each failure."
    }
  ],
  questions: [
    {
      id: "q-sql-050-1",
      prompt: "What primary problem occurs when multiple backend processes write to a shared flat JSON file simultaneously?",
      options: [
        { id: "a", label: "JSON files automatically convert to binary format" },
        { id: "b", label: "Race conditions and concurrent file writes cause data overwrites and corruption" },
        { id: "c", label: "The operating system automatically locks the file forever" },
        { id: "d", label: "The JSON syntax is automatically minified without developer consent" }
      ],
      correctAnswer: "b",
      explanation: "Without a database manager providing multi-version concurrency control and atomic write-ahead logs, concurrent writes to flat files lead to race conditions where the last writer overwrites previous changes, causing data loss."
    },
    {
      id: "q-sql-050-2",
      prompt: "What does the 'A' (Atomicity) in the ACID properties guarantee?",
      options: [
        { id: "a", label: "All data is alphabetized automatically" },
        { id: "b", label: "All transactions execute asynchronously without waiting" },
        { id: "c", label: "All operations in a transaction succeed together, or all are rolled back" },
        { id: "d", label: "Data is split into tiny atomic sub-files across disks" }
      ],
      correctAnswer: "c",
      explanation: "Atomicity ensures that a multi-step transaction is treated as an indivisible unit. If any step fails, all preceding changes are completely rolled back."
    },
    {
      id: "q-sql-050-3",
      prompt: "What mechanism allows a database engine to recover committed transactions after a sudden power loss?",
      options: [
        { id: "a", label: "Browser cache backups" },
        { id: "b", label: "Write-Ahead Logging (WAL) flushed to persistent disk before memory updates" },
        { id: "c", label: "Temporary JavaScript variables stored in RAM" },
        { id: "d", label: "Restarting the computer in safe mode" }
      ],
      correctAnswer: "b",
      explanation: "The Write-Ahead Log (WAL) records every transaction intent to non-volatile disk before modifying data pages in memory, allowing the engine to replay committed changes upon crash recovery."
    },
    {
      id: "q-sql-050-4",
      prompt: "Why is frontend validation insufficient for protecting database business rules?",
      options: [
        { id: "a", label: "Frontend validation cannot be styled with modern CSS" },
        { id: "b", label: "HTTP requests can bypass the browser entirely via Postman, curl, or scripts" },
        { id: "c", label: "Frontend JavaScript is converted to WebAssembly and loses validation logic" },
        { id: "d", label: "React components do not support form input elements" }
      ],
      correctAnswer: "b",
      explanation: "Any client can craft arbitrary HTTP requests using curl or API tools without executing browser validation scripts. The database must enforce constraints as the final trusted boundary."
    },
    {
      id: "q-sql-050-5",
      prompt: "Which ACID property guarantees that once a transaction reports COMMIT, the data will not be lost even if the server crashes seconds later?",
      options: [
        { id: "a", label: "Atomicity" },
        { id: "b", label: "Consistency" },
        { id: "c", label: "Isolation" },
        { id: "d", label: "Durability" }
      ],
      correctAnswer: "d",
      explanation: "Durability guarantees that committed records are permanently recorded on non-volatile storage and survive power outages or operating system crashes."
    },
    {
      id: "q-sql-050-6",
      prompt: "What is the primary role of a Database Management System (DBMS)?",
      options: [
        { id: "a", label: "To compile TypeScript code into JavaScript" },
        { id: "b", label: "To provide centralized query optimization, access control, concurrency, and persistence" },
        { id: "c", label: "To render HTML components in the user browser" },
        { id: "d", label: "To replace backend Node.js servers entirely" }
      ],
      correctAnswer: "b",
      explanation: "A DBMS is the software layer managing structured storage, executing SQL, coordinating concurrent connections, enforcing security permissions, and maintaining backups."
    },
    {
      id: "q-sql-050-7",
      prompt: "In database terminology, what is a 'race condition'?",
      options: [
        { id: "a", label: "A competition between software developers to finish code first" },
        { id: "b", label: "An unexpected defect where outcome depends on the uncontrollable timing of concurrent operations" },
        { id: "c", label: "When a database query runs faster than 1 millisecond" },
        { id: "d", label: "A network router switching from IPv4 to IPv6" }
      ],
      correctAnswer: "b",
      explanation: "A race condition occurs when multiple threads or requests read and write shared data concurrently without proper locking or isolation, producing erratic outcomes based on who finishes first."
    },
    {
      id: "q-sql-050-8",
      prompt: "Why do relational databases use B-Tree indexes instead of scanning rows sequentially?",
      options: [
        { id: "a", label: "Sequential scans are forbidden by SQL syntax rules" },
        { id: "b", label: "B-Tree indexes allow locating records in logarithmic O(log N) time instead of O(N) full-table scans" },
        { id: "c", label: "B-Trees reduce hard drive cost by compressing all text into numbers" },
        { id: "d", label: "Indexes remove the need for primary keys" }
      ],
      correctAnswer: "b",
      explanation: "Scanning a table with millions of rows one by one (O(N)) takes seconds or minutes. A balanced B-Tree index navigates directly to the target record in a handful of pointer comparisons (O(log N))."
    },
    {
      id: "q-sql-050-9",
      prompt: "What happens if a database transaction encounters an error after completing 3 of its 4 operations?",
      options: [
        { id: "a", label: "The first 3 operations stay saved and the 4th is skipped" },
        { id: "b", label: "The database rolls back all 3 completed operations, leaving the state untouched" },
        { id: "c", label: "The entire database server shuts down immediately" },
        { id: "d", label: "The table is deleted and recreated from scratch" }
      ],
      correctAnswer: "b",
      explanation: "Under the Atomicity guarantee, when an unrecoverable failure occurs before COMMIT, the engine issues a ROLLBACK that reverses all intermediate mutations."
    },
    {
      id: "q-sql-050-10",
      prompt: "Which data constraint prevents two distinct users from registering with the exact same email address?",
      options: [
        { id: "a", label: "FOREIGN KEY" },
        { id: "b", label: "UNIQUE constraint" },
        { id: "c", label: "NOT NULL" },
        { id: "d", label: "AUTO_INCREMENT" }
      ],
      correctAnswer: "b",
      explanation: "A UNIQUE constraint ensures that all values in a column or set of columns are distinct across the entire table, preventing duplicate records."
    }
  ]
};

// LESSON 051: DBMS, RDBMS AND DATA MODELS
const lesson051: CurriculumItem = {
  id: "item-sql-051-dbms-rdbms-data-models",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Database Foundations",
  modulePosition: 1,
  title: "DBMS, RDBMS and Data Models",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "DBMS, RDBMS and Data Models: Relational vs Document Stores",
  contentDescription: "Understand the mathematical foundations of relational databases proposed by Edgar F. Codd, compare relational tables with NoSQL document stores, and select appropriate models for structured vs polymorphic data.",
  codeSnippet: {
    language: "sql",
    code: `-- Relational Model: Normalized entities linked via foreign key
CREATE TABLE departments (
  dept_id SERIAL PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE professors (
  prof_id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  dept_id INT NOT NULL REFERENCES departments(dept_id)
);`
  },
  sections: [
    {
      title: "Core Concept: The Relational Revolution",
      explanation: "In 1970, computer scientist Edgar F. Codd published a landmark paper introducing the relational model. Before Codd, databases were organized as hierarchical trees or linked network graphs. To retrieve a record, programmers had to write complex procedural code telling the computer which physical disk pointers to follow. If the disk structure changed, all application code broke.\n\nCodd's breakthrough was to separate the logical view of data from its physical storage. In a relational database, data is represented mathematically as relations (tables), tuples (rows), and attributes (columns). Developers write declarative SQL queries describing *what* data they want, leaving *how* to find it to the database's intelligent cost-based query optimizer."
    },
    {
      title: "Comparing Data Models: Relational vs Document vs Key-Value",
      explanation: "Different applications have different data access patterns. While relational databases excel at structured, interconnected records where consistency is paramount, other models offer specialized tradeoffs for specific workloads:",
      table: {
        headers: ["Data Model", "Representative Systems", "Data Structure", "Best Suited For"],
        rows: [
          ["Relational (RDBMS)", "PostgreSQL, MySQL, SQLite, Oracle", "Tables with strict schemas and foreign keys", "Financial transactions, enterprise SaaS, relational catalogs"],
          ["Document (NoSQL)", "MongoDB, Couchbase", "Hierarchical JSON/BSON documents", "Rapid prototyping, polymorphic catalogs, CMS articles"],
          ["Key-Value Store", "Redis, AWS DynamoDB", "Key-to-blob hash tables", "Session caches, leaderboards, distributed locks"],
          ["Graph Database", "Neo4j, Amazon Neptune", "Nodes and directional relationship edges", "Social networks, fraud detection, recommendation engines"]
        ]
      }
    },
    {
      title: "System Mechanics: Relational Normalization vs Document Embedding",
      explanation: "In a relational model, related data is stored in separate normalized tables. For example, student details live in `students`, course details in `courses`, and enrollments in an `enrollments` junction table. If a course title changes, you update exactly one row in `courses`, and every student query automatically reflects the new title.\n\nIn a document database like MongoDB, related data is frequently embedded directly inside parent documents. A student document might contain an embedded array of course objects. While this allows fast single-document reads without joins, updating a shared course title requires scanning and updating potentially millions of independent student documents, introducing the risk of data anomalies."
    },
    {
      title: "Production Scenario: Choosing Between PostgreSQL and MongoDB",
      explanation: "A modern fintech application tracks student loans and installment repayments. Because an installment must never be attributed to an invalid loan, and balances must tally to the exact penny under strict audits, an RDBMS like PostgreSQL is mandatory. Conversely, a social blogging feature where posts have wildly varying metadata (tags, rich text blocks, poll options) might leverage document storage or PostgreSQL's native `JSONB` column type."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Do not view SQL and NoSQL as sworn enemies. Modern relational engines like PostgreSQL support robust `JSONB` columns with GIN indexing, allowing you to combine rigid relational integrity for core entities with flexible schema-less JSON for unstructured preferences in the exact same database."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Sketch the schema for an online bookstore in both relational format (tables and foreign keys) and document format (JSON documents). Identify what happens in each model when an author publishes a new edition with an updated biography."
    }
  ],
  questions: [
    {
      id: "q-sql-051-1",
      prompt: "Who introduced the mathematical foundations of the relational database model in 1970?",
      options: [
        { id: "a", label: "Linus Torvalds" },
        { id: "b", label: "Edgar F. Codd" },
        { id: "c", label: "Tim Berners-Lee" },
        { id: "d", label: "Brendan Eich" }
      ],
      correctAnswer: "b",
      explanation: "Dr. Edgar F. Codd published 'A Relational Model of Data for Large Shared Data Banks' in 1970, introducing relational tables, keys, and declarative querying."
    },
    {
      id: "q-sql-051-2",
      prompt: "What is the primary difference between a relational database and a document database?",
      options: [
        { id: "a", label: "Relational databases cannot store numbers" },
        { id: "b", label: "Relational databases use tables with fixed schemas and foreign keys, while document stores use flexible JSON-like documents" },
        { id: "c", label: "Document databases only run on mobile phones" },
        { id: "d", label: "Relational databases do not support indexes" }
      ],
      correctAnswer: "b",
      explanation: "RDBMS systems organize structured data into interconnected tables with strict schemas and foreign keys, whereas document stores like MongoDB store semi-structured JSON/BSON records."
    },
    {
      id: "q-sql-051-3",
      prompt: "What major update anomaly occurs when shared data is duplicated across embedded documents in a NoSQL store?",
      options: [
        { id: "a", label: "The database server immediately loses all network connectivity" },
        { id: "b", label: "Updating the shared value requires modifying every copy; missing any creates inconsistent data" },
        { id: "c", label: "All numbers are converted to boolean values" },
        { id: "d", label: "The file size doubles every 24 hours" }
      ],
      correctAnswer: "b",
      explanation: "Denormalized data duplication means an update to an entity (e.g. an author name) must be repeated across thousands of embedded documents. Any interruption leaves the database in an inconsistent state."
    },
    {
      id: "q-sql-051-4",
      prompt: "Which database system is an example of an open-source Relational Database Management System (RDBMS)?",
      options: [
        { id: "a", label: "Redis" },
        { id: "b", label: "PostgreSQL" },
        { id: "c", label: "MongoDB" },
        { id: "d", label: "Neo4j" }
      ],
      correctAnswer: "b",
      explanation: "PostgreSQL is an advanced, enterprise-grade open-source relational database management system supporting SQL standards, ACID transactions, and extensible data types."
    },
    {
      id: "q-sql-051-5",
      prompt: "What is a 'declarative' query language like SQL?",
      options: [
        { id: "a", label: "A language where you specify step-by-step memory pointer movements" },
        { id: "b", label: "A language where you state what result you want, and the engine decides the execution plan" },
        { id: "c", label: "A language that requires declaring all variables with let and const" },
        { id: "d", label: "A language that only executes inside a web browser" }
      ],
      correctAnswer: "b",
      explanation: "Declarative programming focuses on what the outcome should be (e.g., SELECT title FROM courses WHERE active = true) rather than writing procedural loops and disk-seeking algorithms."
    },
    {
      id: "q-sql-051-6",
      prompt: "Which data store is best optimized for high-speed in-memory caching and session tokens?",
      options: [
        { id: "a", label: "Redis (Key-Value Store)" },
        { id: "b", label: "SQLite" },
        { id: "c", label: "Oracle Database" },
        { id: "d", label: "Cassandra" }
      ],
      correctAnswer: "a",
      explanation: "Redis is an in-memory key-value data structure store delivering sub-millisecond responses, making it ideal for session caching, rate limiting, and pub/sub messaging."
    },
    {
      id: "q-sql-051-7",
      prompt: "How does PostgreSQL support semi-structured, schema-less data alongside traditional relational tables?",
      options: [
        { id: "a", label: "It converts all tables into plain text files" },
        { id: "b", label: "Through its native JSON and JSONB column types with indexing support" },
        { id: "c", label: "By shutting down the relational engine when JSON is detected" },
        { id: "d", label: "PostgreSQL strictly forbids any JSON data" }
      ],
      correctAnswer: "b",
      explanation: "PostgreSQL provides powerful native JSONB (binary JSON) data types that can be queried, updated, and indexed with GIN indexes directly within relational queries."
    },
    {
      id: "q-sql-051-8",
      prompt: "What does the abbreviation RDBMS stand for?",
      options: [
        { id: "a", label: "Realtime Data Backup Management Software" },
        { id: "b", label: "Relational Database Management System" },
        { id: "c", label: "Remote Database Memory Server" },
        { id: "d", label: "Rapid Binary Multi-user Storage" }
      ],
      correctAnswer: "b",
      explanation: "RDBMS stands for Relational Database Management System, a software system designed to create, query, and maintain relational databases."
    },
    {
      id: "q-sql-051-9",
      prompt: "In relational database theory, what is a 'tuple'?",
      options: [
        { id: "a", label: "A table column" },
        { id: "b", label: "A single row or record in a relation" },
        { id: "c", label: "A database password" },
        { id: "d", label: "A network cable connecting servers" }
      ],
      correctAnswer: "b",
      explanation: "In formal relational algebra, a relation corresponds to a table, an attribute corresponds to a column, and a tuple corresponds to a single row."
    },
    {
      id: "q-sql-051-10",
      prompt: "When is a document database like MongoDB preferable over a strict relational database?",
      options: [
        { id: "a", label: "When building high-volume multi-account bank transfers" },
        { id: "b", label: "When entities have rapidly changing, highly polymorphic attributes with minimal inter-record joins" },
        { id: "c", label: "When strict relational integrity with foreign keys is required" },
        { id: "d", label: "When you want to prevent all schema migrations forever" }
      ],
      correctAnswer: "b",
      explanation: "Document stores shine when data structures vary widely between records (polymorphism) and applications read self-contained hierarchies without needing complex multi-table joins."
    }
  ]
};

// LESSON 052: TABLES, ROWS, COLUMNS AND KEYS
const lesson052: CurriculumItem = {
  id: "item-sql-052-tables-rows-columns-keys",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Database Foundations",
  modulePosition: 1,
  title: "Tables, Rows, Columns and Keys",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Tables, Rows, Columns and Keys: Relational Entities & Identifiers",
  contentDescription: "Master table structures, primary keys, foreign keys, surrogate vs natural keys, composite keys, and how relational integrity constraints link disparate business records.",
  codeSnippet: {
    language: "sql",
    code: `-- Primary Key, Candidate Key & Foreign Key Relationships
CREATE TABLE students (
  student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE, -- Candidate Natural Key
  full_name VARCHAR(150) NOT NULL
);

CREATE TABLE course_enrollments (
  student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(course_id) ON DELETE RESTRICT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (student_id, course_id) -- Composite Primary Key
);`
  },
  sections: [
    {
      title: "Core Concept: The Building Blocks of a Relational Schema",
      explanation: "A relational database consists of distinct tables, each representing an independent real-world entity or relationship. Within a table, columns represent defined attributes with fixed data types, while rows represent individual recorded instances.\n\nTo make rows meaningful and connectable, every row requires an immutable identity. A Primary Key (PK) is a column or set of columns that uniquely identifies every row in a table. A Foreign Key (FK) is a column in one table whose values reference the primary key of another table, establishing a verifiable relationship that the database engine actively protects."
    },
    {
      title: "Key Types Explained: Natural, Surrogate, and Composite",
      explanation: "When designing tables, choosing the right key strategy determines how easily your schema scales over time:",
      table: {
        headers: ["Key Type", "Definition", "Example", "Tradeoffs"],
        rows: [
          ["Surrogate Key", "An artificial identifier created purely for the database", "Auto-incrementing `id INT` or `UUIDv4`", "Guaranteed unique, never changes, but has no intrinsic business meaning"],
          ["Natural Key", "An existing attribute from the real-world business domain", "Social Security Number, Email, VIN", "Meaningful, but real-world data changes (e.g. users change emails)"],
          ["Composite Key", "A primary key formed by combining multiple columns", "`PRIMARY KEY (student_id, course_id)`", "Perfect for junction tables; prevents duplicate enrollments naturally"],
          ["Foreign Key", "A reference column pointing to a parent table's PK", "`REFERENCES students(student_id)`", "Enforces relational integrity; prevents orphaned child records"]
        ]
      }
    },
    {
      title: "System Mechanics: Referential Integrity & Deletion Rules",
      explanation: "When you link tables using foreign keys, you must decide what happens when a parent row is deleted. Relational engines allow you to define referential actions:",
      bullets: [
        "ON DELETE RESTRICT / NO ACTION: The database prevents the deletion of a parent record as long as child records reference it. You cannot delete a course if students are currently enrolled.",
        "ON DELETE CASCADE: Deleting the parent automatically deletes all associated child rows. Deleting a user account deletes their session tokens and notifications.",
        "ON DELETE SET NULL: The child foreign key column is updated to NULL when the parent record is deleted, preserving the child record as unassigned."
      ]
    },
    {
      title: "Production Scenario: Preventing Orphaned Records",
      explanation: "Suppose an e-commerce database allows deleting a product while past customer invoices reference that product's ID. Without foreign key constraints, generating monthly accounting reports will crash because the invoice points to a nonexistent product ID (an orphaned record). A foreign key with `ON DELETE RESTRICT` ensures historical financial integrity."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Avoid using natural keys like email addresses as primary keys across multiple foreign key relationships. If a user needs to change their email address, updating a primary key forces cascading updates across dozens of tables, creating massive database write locks. Use surrogate UUIDs as primary keys and place a `UNIQUE` constraint on natural attributes like email."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Design a relational schema for a hospital management system with Doctors, Patients, and Appointments. Specify primary keys, foreign keys, and suitable `ON DELETE` rules for each table."
    }
  ],
  questions: [
    {
      id: "q-sql-052-1",
      prompt: "What is the primary purpose of a Primary Key in a relational table?",
      options: [
        { id: "a", label: "To encrypt the table data on disk" },
        { id: "b", label: "To uniquely and unambiguously identify every individual row in the table" },
        { id: "c", label: "To enable public internet access to the table" },
        { id: "d", label: "To count the number of columns in the schema" }
      ],
      correctAnswer: "b",
      explanation: "A primary key enforces unique identification for every record in a table, guaranteeing no duplicate rows and enabling foreign key references."
    },
    {
      id: "q-sql-052-2",
      prompt: "What is a Foreign Key?",
      options: [
        { id: "a", label: "A key imported from a foreign country's database server" },
        { id: "b", label: "A column that references the primary key of another table to establish a relationship" },
        { id: "c", label: "A password used for SSL database connections" },
        { id: "d", label: "An index that only sorts alphabetically" }
      ],
      correctAnswer: "b",
      explanation: "A foreign key creates a referential link between two tables, ensuring child records reference valid, existing parent rows."
    },
    {
      id: "q-sql-052-3",
      prompt: "What is a 'Composite Primary Key'?",
      options: [
        { id: "a", label: "A key made out of recycled plastic" },
        { id: "b", label: "A primary key composed of two or more columns combined together" },
        { id: "c", label: "A key generated by artificial intelligence" },
        { id: "d", label: "A primary key that changes value every hour" }
      ],
      correctAnswer: "b",
      explanation: "A composite primary key uses a combination of multiple columns (such as student_id + course_id in an enrollment table) to guarantee uniqueness."
    },
    {
      id: "q-sql-052-4",
      prompt: "What happens when a parent record is deleted if the foreign key specifies `ON DELETE RESTRICT`?",
      options: [
        { id: "a", label: "All child records are immediately deleted without warning" },
        { id: "b", label: "The database blocks the deletion and throws an error if any child records reference it" },
        { id: "c", label: "The child records are exported to a CSV file" },
        { id: "d", label: "The parent record is hidden but not deleted" }
      ],
      correctAnswer: "b",
      explanation: "`ON DELETE RESTRICT` protects relational integrity by rejecting the delete operation whenever dependent child rows exist."
    },
    {
      id: "q-sql-052-5",
      prompt: "Why are Surrogate Keys (like UUIDs or auto-incrementing integers) generally preferred over Natural Keys (like email addresses)?",
      options: [
        { id: "a", label: "Natural keys cannot be saved in SQL tables" },
        { id: "b", label: "Surrogate keys never change, avoiding expensive cascading updates when business values change" },
        { id: "c", label: "Surrogate keys make database queries 1000x faster by default" },
        { id: "d", label: "Natural keys do not support index lookups" }
      ],
      correctAnswer: "b",
      explanation: "Real-world natural values like emails or phone numbers can change. If used as foreign key references across dozens of tables, updating them triggers massive cascading updates."
    },
    {
      id: "q-sql-052-6",
      prompt: "What is an 'orphaned record' in database systems?",
      options: [
        { id: "a", label: "A child record whose referenced parent record has been deleted without cleanup" },
        { id: "b", label: "A table that has no columns" },
        { id: "c", label: "A database user with no password" },
        { id: "d", label: "A query that took more than 5 seconds to run" }
      ],
      correctAnswer: "a",
      explanation: "Orphaned records occur when foreign key constraints are missing, and parent records are deleted, leaving invalid pointer IDs in child tables."
    },
    {
      id: "q-sql-052-7",
      prompt: "What referential action should you choose if deleting a user account should automatically purge all their private notifications?",
      options: [
        { id: "a", label: "ON DELETE NO ACTION" },
        { id: "b", label: "ON DELETE RESTRICT" },
        { id: "c", label: "ON DELETE CASCADE" },
        { id: "d", label: "ON DELETE SET DEFAULT" }
      ],
      correctAnswer: "c",
      explanation: "`ON DELETE CASCADE` instructs the database to automatically delete dependent child rows when the parent entity is deleted."
    },
    {
      id: "q-sql-052-8",
      prompt: "Can a table have multiple PRIMARY KEY constraints?",
      options: [
        { id: "a", label: "Yes, up to 10 primary keys per table" },
        { id: "b", label: "No, a table can have only one primary key (though it may contain multiple columns)" },
        { id: "c", label: "Yes, but only in PostgreSQL" },
        { id: "d", label: "Only if all columns are of type VARCHAR" }
      ],
      correctAnswer: "b",
      explanation: "A table can define exactly one primary key constraint, which may consist of a single column or a composite set of columns."
    },
    {
      id: "q-sql-052-9",
      prompt: "What is a 'Candidate Key'?",
      options: [
        { id: "a", label: "A column that applied for a job at the database company" },
        { id: "b", label: "Any column or combination of columns that could uniquely qualify as a primary key" },
        { id: "c", label: "A temporary key deleted after 30 days" },
        { id: "d", label: "A foreign key that points to a view" }
      ],
      correctAnswer: "b",
      explanation: "A candidate key is any column or set of columns with unique, non-null values that could serve as the primary key. One is chosen as PK, and others are enforced with UNIQUE constraints."
    },
    {
      id: "q-sql-052-10",
      prompt: "What integrity rule does the database enforce when you insert a row with a foreign key value?",
      options: [
        { id: "a", label: "It verifies that the value exists in the referenced parent table's primary key column (or is NULL)" },
        { id: "b", label: "It encrypts the child row using the parent table's password" },
        { id: "c", label: "It sends an email notification to the database administrator" },
        { id: "d", label: "It duplicates the entire parent table into the child table" }
      ],
      correctAnswer: "a",
      explanation: "Referential integrity requires that any non-null foreign key value must match an existing primary key in the referenced parent table."
    }
  ]
};

// LESSON 053: SQL SYNTAX AND DATA TYPES
const lesson053: CurriculumItem = {
  id: "item-sql-053-sql-syntax-data-types",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Database Foundations",
  modulePosition: 1,
  title: "SQL Syntax and Data Types",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "SQL Syntax and Data Types: Exact Numerics, Text, Dates & Processing Order",
  contentDescription: "Understand standard SQL grammar, logical query processing order, exact vs floating-point numerics, temporal timestamps with timezone, and boolean logic.",
  codeSnippet: {
    language: "sql",
    code: `-- Choosing accurate SQL data types
CREATE TABLE course_inventory (
  sku VARCHAR(32) PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0), -- Exact monetary precision
  rating FLOAT4 CHECK (rating BETWEEN 0.0 AND 5.0), -- Scientific floating point
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Always with timezone
);`
  },
  sections: [
    {
      title: "Core Concept: Choosing the Right Data Types",
      explanation: "In software engineering, data types define the domain of valid values and determine how data is physically arranged in storage blocks. Selecting the wrong data type causes subtle calculation bugs, security vulnerabilities, or severe storage bloat.\n\nA classic example is monetary calculations. Using floating-point types (`FLOAT`, `DOUBLE PRECISION`) for prices leads to binary rounding errors (such as `0.1 + 0.2 = 0.30000000000000004`). In financial databases, you must use exact numeric types (`NUMERIC(precision, scale)` or `DECIMAL`) where every decimal place is stored with mathematical precision."
    },
    {
      title: "Essential SQL Data Types Reference",
      explanation: "Here is a guide to the core data types available across modern SQL database engines:",
      table: {
        headers: ["Category", "SQL Types", "Storage & Precision", "Best Practice Usage"],
        rows: [
          ["Exact Integers", "SMALLINT (2B), INT (4B), BIGINT (8B)", "Signed integers up to +/-9 quintillion", "Counters, surrogate IDs, quantities"],
          ["Exact Decimals", "NUMERIC(p, s), DECIMAL(p, s)", "Exact user-specified precision and scale", "Currency, financial accounting, exact weights"],
          ["Approximate Float", "REAL / FLOAT4, DOUBLE PRECISION", "IEEE 754 binary floating point", "Scientific readings, GPS coordinates, metrics"],
          ["Character & Text", "CHAR(N), VARCHAR(N), TEXT", "Fixed, bounded, or unbounded UTF-8 strings", "TEXT for descriptions; VARCHAR for bounded names"],
          ["Temporal", "DATE, TIME, TIMESTAMP, TIMESTAMPTZ", "Calendar dates and microsecond timestamps", "Always use TIMESTAMPTZ for global timestamps"],
          ["Boolean", "BOOLEAN", "TRUE, FALSE, or NULL (unknown)", "Flags, active toggles, permissions"]
        ]
      }
    },
    {
      title: "System Mechanics: The Logical Query Processing Order",
      explanation: "One of the most confusing aspects of SQL for beginners is that the order in which you write a query is NOT the order in which the database executes it:",
      bullets: [
        "1. FROM & JOIN: The engine gathers the source tables and computes virtual joined relations.",
        "2. WHERE: Evaluates row-level conditions and filters individual candidate records.",
        "3. GROUP BY: Groups remaining rows by common attribute values.",
        "4. HAVING: Filters aggregated groups (unlike WHERE, HAVING can check aggregates like COUNT > 5).",
        "5. SELECT: Evaluates expressions, computes column outputs, and applies column aliases.",
        "6. DISTINCT: Eliminates duplicate rows from the computed output.",
        "7. ORDER BY: Sorts the final result set according to specified columns.",
        "8. LIMIT / OFFSET: Constrains the total rows returned to the client application."
      ]
    },
    {
      title: "Production Scenario: Why Column Aliases Fail in WHERE Clauses",
      explanation: "Beginners often write queries like:\n`SELECT price * 0.9 AS discounted_price FROM courses WHERE discounted_price < 50;`\nThe database throws an error: `column \"discounted_price\" does not exist`. Why? Because the `WHERE` clause executes at Step 2, long before the `SELECT` clause (Step 5) defines what `discounted_price` means! Understanding execution order solves these mysteries instantly."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Never store timestamps using naive `TIMESTAMP` without timezone information (`TIMESTAMP WITHOUT TIME ZONE`). If your server runs in California, your database in Virginia, and your student registers from Tokyo, comparing naive timestamps causes scheduling bugs. Always use `TIMESTAMPTZ` (`TIMESTAMP WITH TIME ZONE`), which normalizes all input to UTC internally."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL `CREATE TABLE` statement for a student gradebook with columns for student ID, assignment code, earned score, max score, percentage, submission timestamp, and passing status. Pick the most precise data type for each column."
    }
  ],
  questions: [
    {
      id: "q-sql-053-1",
      prompt: "Why should monetary prices and financial balances never be stored as FLOAT or REAL types?",
      options: [
        { id: "a", label: "FLOAT types are limited to numbers smaller than 100" },
        { id: "b", label: "Binary floating-point types suffer from rounding inaccuracies; use exact NUMERIC/DECIMAL instead" },
        { id: "c", label: "FLOAT columns cannot be updated with SQL statements" },
        { id: "d", label: "SQL syntax does not permit dollar signs with FLOAT" }
      ],
      correctAnswer: "b",
      explanation: "Binary floating-point arithmetic (IEEE 754) cannot represent fractions like 0.1 exactly in base-2, causing compounding rounding errors in accounting. NUMERIC/DECIMAL stores exact base-10 digits."
    },
    {
      id: "q-sql-053-2",
      prompt: "In what logical order does a SQL database engine evaluate query clauses?",
      options: [
        { id: "a", label: "SELECT -> FROM -> WHERE -> ORDER BY" },
        { id: "b", label: "FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT" },
        { id: "c", label: "ORDER BY -> LIMIT -> SELECT -> FROM" },
        { id: "d", label: "WHERE -> SELECT -> FROM -> HAVING" }
      ],
      correctAnswer: "b",
      explanation: "SQL evaluates from source tables (FROM/JOIN) first, filters candidate rows (WHERE), groups (GROUP BY), filters groups (HAVING), shapes columns (SELECT), sorts (ORDER BY), and limits pagination (LIMIT)."
    },
    {
      id: "q-sql-053-3",
      prompt: "Why can't you reference a column alias defined in SELECT inside your WHERE clause?",
      options: [
        { id: "a", label: "Aliases are only supported in MySQL" },
        { id: "b", label: "The WHERE clause is evaluated before the SELECT clause produces aliases" },
        { id: "c", label: "Aliases must always begin with an uppercase dollar sign" },
        { id: "d", label: "The WHERE clause only accepts primary key IDs" }
      ],
      correctAnswer: "b",
      explanation: "Because WHERE executes at Step 2 and SELECT executes at Step 5, column aliases defined in SELECT do not exist yet when WHERE filters rows."
    },
    {
      id: "q-sql-053-4",
      prompt: "Which data type should you choose for timestamps in international cloud applications?",
      options: [
        { id: "a", label: "VARCHAR(50)" },
        { id: "b", label: "TIMESTAMP WITH TIME ZONE (TIMESTAMPTZ)" },
        { id: "c", label: "INTEGER (seconds since lunch)" },
        { id: "d", label: "FLOAT8" }
      ],
      correctAnswer: "b",
      explanation: "TIMESTAMPTZ converts incoming timestamps to UTC for unambiguous global persistence and displays them correctly in the client's local timezone."
    },
    {
      id: "q-sql-053-5",
      prompt: "What is the difference between CHAR(10) and VARCHAR(10)?",
      options: [
        { id: "a", label: "CHAR(10) always pads strings with spaces to 10 characters; VARCHAR(10) stores only the actual length" },
        { id: "b", label: "CHAR(10) stores numbers; VARCHAR(10) stores text" },
        { id: "c", label: "VARCHAR(10) has a maximum limit of 10 gigabytes" },
        { id: "d", label: "There is no difference in any database" }
      ],
      correctAnswer: "a",
      explanation: "CHAR(N) is fixed-length and right-pads shorter strings with whitespace, while VARCHAR(N) is variable-length and stores only the characters provided up to limit N."
    },
    {
      id: "q-sql-053-6",
      prompt: "What does the SQL standard NUMERIC(10, 2) specification mean?",
      options: [
        { id: "a", label: "10 numbers before the decimal and 2 numbers after" },
        { id: "b", label: "Total precision of 10 digits, with 2 digits after the decimal point" },
        { id: "c", label: "A number between 2 and 10" },
        { id: "d", label: "10 bytes of storage with 2 versions" }
      ],
      correctAnswer: "b",
      explanation: "Precision (10) is the total count of significant digits across the entire number; Scale (2) is the count of digits situated to the right of the decimal point."
    },
    {
      id: "q-sql-053-7",
      prompt: "What truth values can a BOOLEAN column hold in standard SQL?",
      options: [
        { id: "a", label: "0 and 1 only" },
        { id: "b", label: "TRUE, FALSE, and NULL (Three-valued logic)" },
        { id: "c", label: "YES, NO, and MAYBE" },
        { id: "d", label: "TRUE and FALSE only" }
      ],
      correctAnswer: "b",
      explanation: "SQL utilizes three-valued logic (3VL): a boolean expression or column can evaluate to TRUE, FALSE, or UNKNOWN (represented by NULL)."
    },
    {
      id: "q-sql-053-8",
      prompt: "Which SQL clause is used to filter aggregated group summaries (such as groups where COUNT(*) > 10)?",
      options: [
        { id: "a", label: "WHERE" },
        { id: "b", label: "HAVING" },
        { id: "c", label: "ORDER BY" },
        { id: "d", label: "LIMIT" }
      ],
      correctAnswer: "b",
      explanation: "WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY computation."
    },
    {
      id: "q-sql-053-9",
      prompt: "What is the recommended SQL data type for long unstructured user descriptions or blog post contents?",
      options: [
        { id: "a", label: "CHAR(100)" },
        { id: "b", label: "TEXT" },
        { id: "c", label: "INT" },
        { id: "d", label: "NUMERIC" }
      ],
      correctAnswer: "b",
      explanation: "TEXT stores arbitrary-length strings efficiently using external storage pages (TOAST in PostgreSQL) without imposing arbitrary character boundaries."
    },
    {
      id: "q-sql-053-10",
      prompt: "What keyword is placed after a column definition to prevent missing or empty values?",
      options: [
        { id: "a", label: "REQUIRED" },
        { id: "b", label: "NOT NULL" },
        { id: "c", label: "PRIMARY" },
        { id: "d", label: "STATIC" }
      ],
      correctAnswer: "b",
      explanation: "The NOT NULL constraint ensures that every inserted or updated row must provide a valid, concrete value for the specified column."
    }
  ]
};

// MODULE 1 QUIZ
const sqlModule01Quiz: CurriculumItem = {
  id: "item-sql-mod01-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Database Foundations",
  modulePosition: 1,
  title: "Module 1 Assessment: Database Foundations MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 1 Quiz: Database Foundations & Architecture",
  contentDescription: "Test your comprehension of persistent database architecture, ACID transactional boundaries, relational theory, surrogate vs natural keys, foreign key constraints, and SQL data types.",
  questions: [
    ...(lesson050.questions || []).slice(0, 3),
    ...(lesson051.questions || []).slice(0, 3),
    ...(lesson052.questions || []).slice(0, 2),
    ...(lesson053.questions || []).slice(0, 2)
  ]
};

// MODULE 1 ASSESSMENT (LAB)
const sqlModule01Assessment: CurriculumItem = {
  id: "item-sql-mod01-lab",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Database Foundations",
  modulePosition: 1,
  title: "Module 1 Lab: Relational Schema Design & Connection Test",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 1 Lab Project: Relational Schema Design & Connection Test",
  contentDescription: "Design and implement a relational database schema for a learning portal from scratch. Establish primary keys, candidate natural keys, foreign key constraints, and exact numeric types.",
  assignmentPrompt: {
    instructions: "Complete the database architecture lab:\n1. Create a schema script `schema_v1.sql`.\n2. Define a `students` table with UUID primary key, unique email, full name, and registration timestamp.\n3. Define a `courses` table with surrogate primary key, course title, exact numeric price, and active status flag.\n4. Define an `enrollments` table with composite primary key `(student_id, course_id)`, referential foreign keys with cascade deletion, and enrollment date.\n5. Write verification queries inspecting table schemas and testing foreign key constraint enforcement.",
    deliverables: [
      "SQL script file creating all three tables with appropriate data types and constraints",
      "Terminal log demonstrating successful table creation and foreign key constraint rejection test",
      "Brief architectural commentary explaining surrogate vs natural key decisions"
    ]
  }
};

export const sqlModule01: CurriculumSubModule = {
  id: "module-sql-01-foundations",
  subCourseId: "mod-database-sql",
  title: "Module 1 — Database foundations",
  description: "Understand the purpose of database systems, compare relational and document data models, master primary and foreign keys, and select robust SQL data types.",
  position: 1,
  items: [
    lesson050,
    lesson051,
    lesson052,
    lesson053,
    sqlModule01Quiz,
    sqlModule01Assessment
  ]
};
