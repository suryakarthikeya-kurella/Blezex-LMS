import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 2: SQL OPERATIONS AND CONSTRAINTS
// Lessons 054 - 057 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 054: CREATE DATABASES AND TABLES
const lesson054: CurriculumItem = {
  id: "item-sql-054-create-databases-tables",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-operations-constraints",
  moduleTitle: "Module 2: SQL Operations and Constraints",
  modulePosition: 2,
  title: "Create Databases and Tables",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Create Databases and Tables: Data Definition Language (DDL)",
  contentDescription: "Master DDL statements including CREATE, ALTER, and DROP, define column defaults, configure check constraints, and manage database schemas safely.",
  codeSnippet: {
    language: "sql",
    code: `-- Creating a robust course catalog table with DDL constraints
CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  level VARCHAR(20) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  price NUMERIC(8, 2) NOT NULL DEFAULT 0.00 CHECK (price >= 0),
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);`
  },
  sections: [
    {
      title: "Core Concept: Defining Storage Contracts with DDL",
      explanation: "Data Definition Language (DDL) is the sub-language of SQL responsible for creating, modifying, and destroying database containers. Unlike rows of data which can change millions of times per day, table structures represent formal contracts that client applications rely upon.\n\nWhen you issue a `CREATE TABLE` statement, the database engine allocates schema metadata catalog entries, initializes disk page structures, and establishes index B-Trees. Incorporating constraints directly in DDL ensures that invalid data is rejected at the storage gateway before it can ever contaminate persistent storage."
    },
    {
      title: "The Core DDL Commands",
      explanation: "Production database schemas evolve over time. DDL provides distinct statements for lifecycle management:",
      table: {
        headers: ["Statement", "Purpose", "Production Risk Level", "Best Practice"],
        rows: [
          ["CREATE TABLE", "Defines new table structure and initial constraints", "Low", "Use IF NOT EXISTS in idempotent scripts"],
          ["ALTER TABLE", "Adds columns, modifies constraints, or alters types", "Medium to High", "Avoid adding NOT NULL columns without defaults on large tables"],
          ["DROP TABLE", "Permanently deletes table and all its stored rows", "Critical", "Requires verified backups and DROP TABLE ... CASCADE checks"],
          ["TRUNCATE", "Instantly empties all rows while preserving table schema", "High", "Much faster than DELETE because it resets disk page pointers"]
        ]
      }
    },
    {
      title: "System Mechanics: CHECK Constraints & Domain Invariants",
      explanation: "CHECK constraints evaluate boolean expressions whenever a row is inserted or updated. If the condition evaluates to FALSE, the engine immediately aborts the write with an integrity violation error:",
      bullets: [
        "Range Checks: Ensure numeric values stay within rational bounds, e.g., `CHECK (rating >= 1.0 AND rating <= 5.0)`.",
        "Allowed Value Sets: Restrict strings to enumerated domains without creating separate tables, e.g., `CHECK (status IN ('draft', 'published', 'archived'))`.",
        "Cross-Column Validation: Enforce conditional relationships, e.g., `CHECK (discount_price < regular_price)`."
      ]
    },
    {
      title: "Production Scenario: Zero-Downtime Schema Migrations",
      explanation: "In an active system with millions of rows, running `ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL;` will immediately fail if existing rows exist, or freeze the entire table with an exclusive access lock. Senior engineers execute migrations in progressive steps: add the column as nullable, backfill values in background batches, add the constraint, and finally set `NOT NULL` once all rows conform."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "A dangerous rookie pitfall is running `DROP TABLE` or destructive `ALTER TABLE` statements directly in production terminals. Always version-control schema changes in migration files (such as Knex, Prisma, or Flyway migrations) that can be reviewed, tested in staging, and rolled back deterministically."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write DDL statements to create an `instructors` table and an `instructor_payouts` table. Ensure the payout amount is strictly positive and that the payout date defaults to the current timestamp."
    }
  ],
  questions: [
    {
      id: "q-sql-054-1",
      prompt: "What does the SQL command TRUNCATE TABLE do compared to DELETE FROM table?",
      options: [
        { id: "a", label: "TRUNCATE only deletes the table schema but keeps the rows" },
        { id: "b", label: "TRUNCATE rapidly empties all rows by deallocating storage pages rather than deleting rows one by one" },
        { id: "c", label: "TRUNCATE exports all rows to an Excel spreadsheet" },
        { id: "d", label: "TRUNCATE only deletes rows created on weekends" }
      ],
      correctAnswer: "b",
      explanation: "TRUNCATE quickly reinitializes storage pages and bypasses row-by-row logging, making it dramatically faster than DELETE for wiping entire tables."
    },
    {
      id: "q-sql-054-2",
      prompt: "Which constraint ensures that a numeric column like `discount_price` never exceeds `original_price`?",
      options: [
        { id: "a", label: "FOREIGN KEY" },
        { id: "b", label: "CHECK (discount_price <= original_price)" },
        { id: "c", label: "UNIQUE" },
        { id: "d", label: "PRIMARY KEY" }
      ],
      correctAnswer: "b",
      explanation: "CHECK constraints evaluate arbitrary boolean expressions against row column values, rejecting any write where the condition evaluates to FALSE."
    },
    {
      id: "q-sql-054-3",
      prompt: "What is the consequence of executing `DROP TABLE students CASCADE;`?",
      options: [
        { id: "a", label: "It deletes the students table and all foreign-key-dependent child tables or views" },
        { id: "b", label: "It makes a duplicate backup of the students table" },
        { id: "c", label: "It renames the table to students_archived" },
        { id: "d", label: "It only deletes empty rows" }
      ],
      correctAnswer: "a",
      explanation: "The CASCADE option drops dependent objects (such as foreign key constraints or views) along with the parent table."
    },
    {
      id: "q-sql-054-4",
      prompt: "What happens when you insert a row without specifying a value for a column that has a DEFAULT constraint?",
      options: [
        { id: "a", label: "The database automatically rejects the insert" },
        { id: "b", label: "The database inserts the specified default value automatically" },
        { id: "c", label: "The database generates a random string" },
        { id: "d", label: "The database pauses and waits for user terminal input" }
      ],
      correctAnswer: "b",
      explanation: "A DEFAULT clause supplies a predefined value (such as FALSE or CURRENT_TIMESTAMP) whenever the INSERT statement omits that attribute."
    },
    {
      id: "q-sql-054-5",
      prompt: "Which sub-language of SQL includes statements like CREATE, ALTER, and DROP?",
      options: [
        { id: "a", label: "DML (Data Manipulation Language)" },
        { id: "b", label: "DCL (Data Control Language)" },
        { id: "c", label: "DDL (Data Definition Language)" },
        { id: "d", label: "TCL (Transaction Control Language)" }
      ],
      correctAnswer: "c",
      explanation: "Data Definition Language (DDL) manages schema containers, table definitions, constraints, indexes, and database objects."
    },
    {
      id: "q-sql-054-6",
      prompt: "Why is adding a `NOT NULL` column without a DEFAULT value to a 10-million row table problematic in production?",
      options: [
        { id: "a", label: "It causes the server to run out of RAM instantly" },
        { id: "b", label: "Existing rows have no value for that column, violating NOT NULL unless a default or backfill is provided" },
        { id: "c", label: "SQL syntax forbids adding columns to existing tables" },
        { id: "d", label: "It converts all existing text to uppercase" }
      ],
      correctAnswer: "b",
      explanation: "Every pre-existing row would contain NULL for the new column, violating the NOT NULL rule. A default value or staged migration is required."
    },
    {
      id: "q-sql-054-7",
      prompt: "What does the statement `ALTER TABLE courses ADD CONSTRAINT uq_slug UNIQUE(slug);` accomplish?",
      options: [
        { id: "a", label: "Renames the slug column to uq_slug" },
        { id: "b", label: "Ensures every value in the slug column is unique across the table" },
        { id: "c", label: "Deletes all duplicate rows automatically" },
        { id: "d", label: "Encrypts the slug column" }
      ],
      correctAnswer: "b",
      explanation: "It attaches a named UNIQUE constraint to the table, creating an underlying unique index to enforce distinctness."
    },
    {
      id: "q-sql-054-8",
      prompt: "What happens if an INSERT statement attempts to insert 'expert' into a column with `CHECK (level IN ('beginner', 'advanced'))`?",
      options: [
        { id: "a", label: "The database rounds it to 'advanced'" },
        { id: "b", label: "The database rejects the insert with a CHECK constraint violation error" },
        { id: "c", label: "The database creates a new enum value automatically" },
        { id: "d", label: "The column value is set to NULL" }
      ],
      correctAnswer: "b",
      explanation: "The CHECK condition evaluates to FALSE for 'expert', and the relational engine aborts the transaction."
    },
    {
      id: "q-sql-054-9",
      prompt: "How can you prevent an error if you want to create a table only if it does not already exist?",
      options: [
        { id: "a", label: "CREATE TABLE IF MISSING table_name" },
        { id: "b", label: "CREATE TABLE IF NOT EXISTS table_name" },
        { id: "c", label: "CREATE NEW TABLE table_name" },
        { id: "d", label: "TRY CREATE TABLE table_name" }
      ],
      correctAnswer: "b",
      explanation: "The `CREATE TABLE IF NOT EXISTS` syntax creates the table if absent or silently succeeds if it already exists, ensuring script idempotency."
    },
    {
      id: "q-sql-054-10",
      prompt: "What is a database migration file?",
      options: [
        { id: "a", label: "A video file explaining database theory" },
        { id: "b", label: "A version-controlled script containing incremental DDL instructions to transition database schemas" },
        { id: "c", label: "An export of user passwords to a spreadsheet" },
        { id: "d", label: "A temporary file deleted every midnight" }
      ],
      correctAnswer: "b",
      explanation: "Migrations track schema changes sequentially in code repositories, ensuring consistent schemas across development, staging, and production environments."
    }
  ]
};

// LESSON 055: INSERT, SELECT, UPDATE AND DELETE
const lesson055: CurriculumItem = {
  id: "item-sql-055-insert-select-update-delete",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-operations-constraints",
  moduleTitle: "Module 2: SQL Operations and Constraints",
  modulePosition: 2,
  title: "INSERT, SELECT, UPDATE and DELETE",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "INSERT, SELECT, UPDATE and DELETE: Core Data Manipulation Language",
  contentDescription: "Master Data Manipulation Language (DML) statements, atomic batch inserts, returning clauses, and safe WHERE conditions to prevent catastrophic updates or deletions.",
  codeSnippet: {
    language: "sql",
    code: `-- Safe DML statements with explicit column mapping and RETURNING
INSERT INTO courses (slug, title, level, price)
VALUES ('docker-mastery', 'Docker & Kubernetes Mastery', 'intermediate', 79.99)
RETURNING course_id, title, created_at;

-- Always verify WHERE clauses before executing UPDATE or DELETE
UPDATE courses
SET price = 49.99, is_published = TRUE
WHERE slug = 'docker-mastery';

DELETE FROM courses
WHERE is_published = FALSE AND created_at < NOW() - INTERVAL '30 days';`
  },
  sections: [
    {
      title: "Core Concept: The Four Verbs of Data Manipulation",
      explanation: "Data Manipulation Language (DML) statements are the lifeblood of day-to-day application operations. Whenever a student creates an account, views a syllabus, updates their avatar, or cancels a subscription, your backend executes one of four core SQL commands:\n\n1. `INSERT`: Adds one or more new tuples to a table.\n2. `SELECT`: Reads and projects requested attributes matching criteria.\n3. `UPDATE`: Modifies attributes in existing matching records.\n4. `DELETE`: Removes matching records permanently from storage."
    },
    {
      title: "The Golden Rule of UPDATE and DELETE",
      explanation: "In SQL, an `UPDATE` or `DELETE` statement without a `WHERE` clause applies to EVERY SINGLE ROW in the entire table. Running `DELETE FROM users;` in a production console immediately wipes every customer record without asking for confirmation. Always inspect the WHERE clause twice before running destructive mutations.",
      table: {
        headers: ["Statement", "Safe Practice Pattern", "Dangerous Anti-Pattern"],
        rows: [
          ["INSERT", "Always list explicit column targets: `INSERT INTO t (col1, col2) ...`", "`INSERT INTO t VALUES (...)` without column names"],
          ["SELECT", "Request specific required columns: `SELECT id, name FROM ...`", "`SELECT *` transferring gigabytes of unneeded columns"],
          ["UPDATE", "Target specific primary key: `UPDATE t SET x = 1 WHERE id = 42;`", "`UPDATE t SET x = 1;` wiping entire table state"],
          ["DELETE", "Target specific primary key: `DELETE FROM t WHERE id = 42;`", "`DELETE FROM t;` catastrophic data wipeout"]
        ]
      }
    },
    {
      title: "System Mechanics: The RETURNING Clause",
      explanation: "Traditionally, when you insert a record with an auto-generated primary key (like a `SERIAL` or `UUID`), you had to execute a second query to retrieve the new ID. Modern SQL engines like PostgreSQL provide the `RETURNING` clause:",
      bullets: [
        "`INSERT ... RETURNING id;` gives you the freshly generated primary key in a single network round-trip.",
        "`UPDATE ... RETURNING balance;` returns the newly updated values directly to your backend API handler.",
        "`DELETE ... RETURNING *;` returns the exact deleted records so your application can log an audit trail."
      ]
    },
    {
      title: "Production Scenario: Batch Inserts vs Loop Inserts",
      explanation: "If you need to seed 1,000 course modules into the database, executing 1,000 independent `INSERT` statements in a JavaScript loop forces 1,000 individual TCP network round-trips and 1,000 disk commits. A multi-row batch insert (`INSERT INTO modules (title) VALUES ('M1'), ('M2'), ... ('M1000');`) bundles all records into a single atomic database packet, running up to 50 times faster."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Never use `SELECT *` in production backend endpoints. Over time, tables gain heavy columns like `profile_image_blob` or `internal_notes`. A query that once returned 2 KB can balloon to 50 MB per request, suffocating server memory and saturating network bandwidth."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query that inserts three sample courses in a single statement. Then write an UPDATE query that applies a 15% discount to all intermediate courses, utilizing the `RETURNING` clause to inspect the updated prices."
    }
  ],
  questions: [
    {
      id: "q-sql-055-1",
      prompt: "What catastrophe occurs if you execute `UPDATE courses SET price = 0.00;` without a WHERE clause?",
      options: [
        { id: "a", label: "The database throws a syntax error because WHERE is mandatory" },
        { id: "b", label: "Every single course in the entire table has its price changed to 0.00" },
        { id: "c", label: "Only the first row in the table is updated" },
        { id: "d", label: "The query executes in simulation mode without making changes" }
      ],
      correctAnswer: "b",
      explanation: "In SQL, omitting the WHERE clause from an UPDATE or DELETE command causes the operation to apply indiscriminately to every single row in the table."
    },
    {
      id: "q-sql-055-2",
      prompt: "Why is `SELECT *` considered an anti-pattern in production backend services?",
      options: [
        { id: "a", label: "The asterisk symbol is deprecated in modern SQL standards" },
        { id: "b", label: "It transfers unnecessary columns over the network, increases memory consumption, and breaks caching" },
        { id: "c", label: "It prevents database transactions from committing" },
        { id: "d", label: "It causes tables to be locked in read-only mode" }
      ],
      correctAnswer: "b",
      explanation: "Explicitly naming required columns minimizes network transfer, enables index-only scans, and prevents unexpected breakage when schema columns are added or renamed."
    },
    {
      id: "q-sql-055-3",
      prompt: "What does the `RETURNING` clause provide in an INSERT or UPDATE statement?",
      options: [
        { id: "a", label: "It returns the user to the database login prompt" },
        { id: "b", label: "It immediately yields values generated or modified by the statement without requiring a second query" },
        { id: "c", label: "It undoes the change after 5 minutes" },
        { id: "d", label: "It returns money to the student's credit card" }
      ],
      correctAnswer: "b",
      explanation: "The RETURNING clause returns computed or modified column values (such as auto-generated primary keys) in the same round trip as the mutation."
    },
    {
      id: "q-sql-055-4",
      prompt: "Why should you always write explicit column lists in INSERT statements: `INSERT INTO users (name, email) ...`?",
      options: [
        { id: "a", label: "Implicit inserts break if columns are reordered or new columns with defaults are added" },
        { id: "b", label: "The SQL parser runs 10x slower without column names" },
        { id: "c", label: "Database drivers refuse to compile queries without parentheses" },
        { id: "d", label: "It allows bypassing primary key uniqueness" }
      ],
      correctAnswer: "a",
      explanation: "Explicit column mapping guarantees that values map to the exact intended attributes, preventing silent column misalignment when schemas evolve."
    },
    {
      id: "q-sql-055-5",
      prompt: "How can you insert multiple rows into a table within a single SQL statement?",
      options: [
        { id: "a", label: "By separating multiple INSERT statements with commas" },
        { id: "b", label: "By providing multiple comma-separated tuple value lists: `VALUES ('A'), ('B'), ('C')`" },
        { id: "c", label: "By running the query in a JavaScript while loop" },
        { id: "d", label: "Multi-row insert is not supported in SQL" }
      ],
      correctAnswer: "b",
      explanation: "Standard SQL supports multi-row inserts by listing multiple comma-separated tuples within a single `VALUES` clause, saving network latency."
    },
    {
      id: "q-sql-055-6",
      prompt: "Which statement deletes rows from a table while allowing a WHERE filter?",
      options: [
        { id: "a", label: "REMOVE FROM" },
        { id: "b", label: "DELETE FROM" },
        { id: "c", label: "DROP ROWS" },
        { id: "d", label: "TRUNCATE WHERE" }
      ],
      correctAnswer: "b",
      explanation: "The `DELETE FROM table_name WHERE condition;` statement deletes only the specific rows satisfying the filter criteria."
    },
    {
      id: "q-sql-055-7",
      prompt: "What is the expected result of: `UPDATE accounts SET balance = balance + 50 WHERE id = 999;` if row 999 does not exist?",
      options: [
        { id: "a", label: "The database creates a new row with balance = 50" },
        { id: "b", label: "The command executes successfully and reports 'UPDATE 0' with no rows altered" },
        { id: "c", label: "The database server throws a fatal crash error" },
        { id: "d", label: "The first available row is updated instead" }
      ],
      correctAnswer: "b",
      explanation: "If no rows match the WHERE filter in an UPDATE statement, the query completes successfully but reports that 0 rows were affected."
    },
    {
      id: "q-sql-055-8",
      prompt: "What SQL clause is used to change existing column values in a table?",
      options: [
        { id: "a", label: "MODIFY" },
        { id: "b", label: "SET" },
        { id: "c", label: "ASSIGN" },
        { id: "d", label: "REPLACE" }
      ],
      correctAnswer: "b",
      explanation: "The `SET` clause specifies which column identifiers receive new expression values within an UPDATE statement."
    },
    {
      id: "q-sql-055-9",
      prompt: "In a CRUD API architecture, which SQL statement corresponds to the HTTP 'POST' method?",
      options: [
        { id: "a", label: "SELECT" },
        { id: "b", label: "INSERT" },
        { id: "c", label: "UPDATE" },
        { id: "d", label: "DELETE" }
      ],
      correctAnswer: "b",
      explanation: "HTTP POST requests create new domain resources, which directly maps to SQL `INSERT` statements in relational storage."
    },
    {
      id: "q-sql-055-10",
      prompt: "What does the SQL command `SELECT 1;` do?",
      options: [
        { id: "a", label: "It deletes the first row of table 1" },
        { id: "b", label: "It returns a single row containing the integer 1, often used as a lightweight database health check" },
        { id: "c", label: "It resets the database server to factory settings" },
        { id: "d", label: "It selects all tables starting with number 1" }
      ],
      correctAnswer: "b",
      explanation: "`SELECT 1;` evaluates a constant literal without scanning any disk tables, making it the industry-standard query for backend database connection pool health checks."
    }
  ]
};

// LESSON 056: FILTERING, SORTING AND LIMITING
const lesson056: CurriculumItem = {
  id: "item-sql-056-filtering-sorting-limiting",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-operations-constraints",
  moduleTitle: "Module 2: SQL Operations and Constraints",
  modulePosition: 2,
  title: "Filtering, Sorting and Limiting",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Filtering, Sorting and Limiting: Pagination, Predicates & Pattern Matching",
  contentDescription: "Master SQL filter operators (IN, BETWEEN, LIKE, ILIKE), sorting with ORDER BY tie-breakers, and pagination mechanics using LIMIT and OFFSET.",
  codeSnippet: {
    language: "sql",
    code: `-- Safe paginated search with deterministic sorting
SELECT course_id, title, price, created_at
FROM courses
WHERE is_published = TRUE
  AND price BETWEEN 20.00 AND 100.00
  AND title ILIKE '%javascript%' -- Case-insensitive search
ORDER BY price DESC, course_id ASC -- Tie-breaker ensures deterministic pagination
LIMIT 10 OFFSET 20; -- Page 3 (10 items per page)`
  },
  sections: [
    {
      title: "Core Concept: Slicing and Ordering Data",
      explanation: "A production database holds millions of historical records, but a user's mobile screen can only render a dozen items at a time. The database engine must filter, sort, and slice rows server-side before returning the payload over the network.\n\nThe `WHERE` clause filters candidate rows using comparison operators (`=`, `<>`, `>`, `<`, `<=`), set lookups (`IN`), range checks (`BETWEEN`), and text patterns (`LIKE`, `ILIKE`). The `ORDER BY` clause sorts the result set, and `LIMIT`/`OFFSET` divides results into accessible pages."
    },
    {
      title: "Common SQL Filtering Predicates",
      explanation: "Writing clean SQL predicates lets the database index engine accelerate lookups:",
      table: {
        headers: ["Operator", "Example", "Behavior & Index Note"],
        rows: [
          ["=", "`status = 'active'`", "Exact match; fast B-Tree index lookup"],
          ["IN", "`level IN ('beginner', 'intermediate')`", "Matches any value in the provided list"],
          ["BETWEEN", "`price BETWEEN 25.00 AND 75.00`", "Inclusive range match (`price >= 25 AND price <= 75`)"],
          ["LIKE", "`title LIKE 'React%'`", "Case-sensitive pattern; `%` matches wildcard characters"],
          ["ILIKE", "`email ILIKE '%@gmail.com'`", "Case-insensitive pattern matching (PostgreSQL)"],
          ["IS NULL", "`completed_at IS NULL`", "Checks for absent or unassigned values"]
        ]
      }
    },
    {
      title: "System Mechanics: Deterministic Sorting for Pagination",
      explanation: "When you paginate using `LIMIT` and `OFFSET`, what happens if two courses have the exact same price of $49.99? If you sort only by `ORDER BY price DESC`, the database optimizer does not guarantee the relative order of tied records. Between Page 1 and Page 2, tied records can shuffle, causing items to appear twice or vanish entirely. To guarantee deterministic pagination, always include a unique tie-breaker column (such as the primary key `course_id`):",
      bullets: [
        "Unstable Pagination: `ORDER BY price DESC` (can cause duplicate items across page boundaries).",
        "Deterministic Pagination: `ORDER BY price DESC, course_id ASC` (each page slice is mathematically fixed)."
      ]
    },
    {
      title: "Production Scenario: Offset Pagination vs Cursor Pagination",
      explanation: "Offset pagination (`LIMIT 20 OFFSET 100000`) forces the database to read and discard 100,000 rows on disk before returning the next 20 rows. At deep page depths, response times degrade from milliseconds to seconds. High-scale platforms switch to cursor-based keyset pagination (`WHERE (created_at, id) < ($last_time, $last_id) ORDER BY created_at DESC, id DESC LIMIT 20`), allowing the B-Tree index to jump directly to the target row in O(log N) time."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Leading wildcard searches like `WHERE title LIKE '%python'` cannot utilize standard B-Tree indexes because the prefix is unknown. The database must scan every single row in the table. For leading wildcard or full-text searches, use PostgreSQL Trigram (`pg_trgm`) GIN indexes or full-text search vectors (`tsvector`)."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query that retrieves page 2 of enrolled courses (15 items per page) sorted by enrollment date newest first, with student ID as tie-breaker. Filter for courses whose price is strictly greater than zero."
    }
  ],
  questions: [
    {
      id: "q-sql-056-1",
      prompt: "Why must a pagination query include a unique tie-breaker column in its ORDER BY clause?",
      options: [
        { id: "a", label: "Without a tie-breaker, the database throws an invalid syntax error" },
        { id: "b", label: "Rows with identical sorted values may switch order across pages, showing duplicates or skipping items" },
        { id: "c", label: "Tie-breakers compress the result set automatically" },
        { id: "d", label: "Tie-breakers are required by browser HTTP specifications" }
      ],
      correctAnswer: "b",
      explanation: "Relational tables are unordered mathematical sets. Without a unique tie-breaker (like primary key ID), the order of tied rows is non-deterministic and can shift between page requests."
    },
    {
      id: "q-sql-056-2",
      prompt: "What does the SQL wildcard `%` represent in a `LIKE` pattern?",
      options: [
        { id: "a", label: "Exactly one single character" },
        { id: "b", label: "Zero, one, or multiple arbitrary characters" },
        { id: "c", label: "A numeric percentage discount" },
        { id: "d", label: "A line break" }
      ],
      correctAnswer: "b",
      explanation: "In SQL pattern matching, `%` matches any sequence of zero or more characters, while `_` matches exactly one character."
    },
    {
      id: "q-sql-056-3",
      prompt: "What is the difference between `LIKE` and `ILIKE` in PostgreSQL?",
      options: [
        { id: "a", label: "LIKE is for numbers; ILIKE is for strings" },
        { id: "b", label: "LIKE is case-sensitive, while ILIKE performs case-insensitive pattern matching" },
        { id: "c", label: "ILIKE is an illegal keyword that triggers an error" },
        { id: "d", label: "ILIKE sorts results backwards" }
      ],
      correctAnswer: "b",
      explanation: "PostgreSQL provides `ILIKE` for convenient case-insensitive string matching, meaning 'react' matches 'React', 'REACT', and 'rEaCt'."
    },
    {
      id: "q-sql-056-4",
      prompt: "If each page shows 25 records, what LIMIT and OFFSET values retrieve Page 4?",
      options: [
        { id: "a", label: "LIMIT 25 OFFSET 100" },
        { id: "b", label: "LIMIT 25 OFFSET 75" },
        { id: "c", label: "LIMIT 4 OFFSET 25" },
        { id: "d", label: "LIMIT 75 OFFSET 25" }
      ],
      correctAnswer: "b",
      explanation: "OFFSET calculates as `(page - 1) * limit`. For Page 4 with limit 25: `(4 - 1) * 25 = 75`. The query skips 75 rows and reads 25."
    },
    {
      id: "q-sql-056-5",
      prompt: "Why does `WHERE title LIKE '%sql'` prevent the database from using a standard B-Tree index?",
      options: [
        { id: "a", label: "B-Tree indexes cannot index text columns" },
        { id: "b", label: "A leading wildcard obscures the starting characters, forcing a full sequential scan of all entries" },
        { id: "c", label: "The percentage sign requires root permissions" },
        { id: "d", label: "B-Tree indexes only work with integers" }
      ],
      correctAnswer: "b",
      explanation: "A B-Tree index is sorted alphabetically from left to right (like a physical dictionary). If the word begins with an unknown wildcard, the index cannot navigate to a starting branch."
    },
    {
      id: "q-sql-056-6",
      prompt: "What does the expression `BETWEEN 10 AND 50` evaluate to?",
      options: [
        { id: "a", label: "Numbers strictly greater than 10 and strictly less than 50" },
        { id: "b", label: "Inclusive range: `value >= 10 AND value <= 50`" },
        { id: "c", label: "Only 10 and 50" },
        { id: "d", label: "Numbers outside the 10 to 50 range" }
      ],
      correctAnswer: "b",
      explanation: "The SQL BETWEEN operator is inclusive of both specified boundary endpoints."
    },
    {
      id: "q-sql-056-7",
      prompt: "How do you specify descending sort order in SQL?",
      options: [
        { id: "a", label: "ORDER BY column DOWN" },
        { id: "b", label: "ORDER BY column DESC" },
        { id: "c", label: "SORT column REVERSE" },
        { id: "d", label: "ORDER BY column BOTTOM" }
      ],
      correctAnswer: "b",
      explanation: "The `DESC` keyword after a column name in the ORDER BY clause sorts records from highest to lowest."
    },
    {
      id: "q-sql-056-8",
      prompt: "What is the primary performance drawback of OFFSET pagination on massive tables with millions of rows?",
      options: [
        { id: "a", label: "OFFSET deletes skipped rows from disk" },
        { id: "b", label: "The database must still read and discard all offset rows before returning the page, causing high I/O latency" },
        { id: "c", label: "OFFSET only works with primary keys" },
        { id: "d", label: "OFFSET requires an internet connection" }
      ],
      correctAnswer: "b",
      explanation: "At large offsets (`OFFSET 500000`), the engine spends significant time traversing through 500,000 index pages only to discard them."
    },
    {
      id: "q-sql-056-9",
      prompt: "Which clause is evaluated FIRST in a query with WHERE and ORDER BY?",
      options: [
        { id: "a", label: "ORDER BY" },
        { id: "b", label: "WHERE" },
        { id: "c", label: "Both are evaluated simultaneously" },
        { id: "d", label: "LIMIT" }
      ],
      correctAnswer: "b",
      explanation: "The WHERE clause filters rows early in the pipeline (Step 2), while ORDER BY sorts the surviving filtered rows near the end (Step 7)."
    },
    {
      id: "q-sql-056-10",
      prompt: "Which SQL operator checks whether a column value matches any item in a list of possibilities?",
      options: [
        { id: "a", label: "CONTAINED" },
        { id: "b", label: "IN" },
        { id: "c", label: "EXISTS" },
        { id: "d", label: "MATCHES" }
      ],
      correctAnswer: "b",
      explanation: "The `IN` operator filters rows whose column matches any expression within a comma-separated list, e.g., `WHERE level IN ('beginner', 'advanced')`."
    }
  ]
};

// LESSON 057: CONSTRAINTS AND NULL SEMANTICS
const lesson057: CurriculumItem = {
  id: "item-sql-057-constraints-null-semantics",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-operations-constraints",
  moduleTitle: "Module 2: SQL Operations and Constraints",
  modulePosition: 2,
  title: "Constraints and NULL Semantics",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Constraints and NULL Semantics: Three-Valued Logic & Missing Data",
  contentDescription: "Understand NULL semantics, three-valued logic (3VL), why `column = NULL` always fails, coalescing default fallbacks, and handling partial data safely.",
  codeSnippet: {
    language: "sql",
    code: `-- Safe NULL handling and Three-Valued Logic in SQL
-- WRONG: Returns 0 rows because NULL = NULL evaluates to UNKNOWN!
-- SELECT * FROM students WHERE phone = NULL;

-- CORRECT: Using IS NULL / IS NOT NULL operators
SELECT student_id, full_name, email,
  COALESCE(phone, 'No phone registered') AS contact_phone
FROM students
WHERE phone IS NULL;`
  },
  sections: [
    {
      title: "Core Concept: What NULL Truly Means in Relational Theory",
      explanation: "In standard SQL, `NULL` is not equal to zero, an empty string `\"\"`, or boolean false. `NULL` is a marker representing missing, unknown, or inapplicable information.\n\nBecause NULL represents the state of 'unknown', comparing two unknown values using ordinary equality (`NULL = NULL`) does not produce `TRUE`. If person A's age is unknown, and person B's age is unknown, are they the same age? You cannot say yes; the answer is mathematically unknown. Therefore, in SQL, `NULL = NULL` evaluates to `UNKNOWN` (neither true nor false)."
    },
    {
      title: "The Three-Valued Logic (3VL) Truth Table",
      explanation: "SQL operates on three-valued logic: TRUE, FALSE, and UNKNOWN. In WHERE clauses, a row is only returned if the condition evaluates strictly to TRUE. Rows evaluating to FALSE or UNKNOWN are discarded:",
      table: {
        headers: ["Expression", "Evaluates To", "Result in WHERE filter"],
        rows: [
          ["`NULL = NULL`", "UNKNOWN", "Row discarded"],
          ["`NULL <> 5`", "UNKNOWN", "Row discarded"],
          ["`NULL IS NULL`", "TRUE", "Row retained"],
          ["`NULL IS NOT NULL`", "FALSE", "Row discarded"],
          ["`TRUE AND UNKNOWN`", "UNKNOWN", "Row discarded"],
          ["`FALSE AND UNKNOWN`", "FALSE", "Row discarded"],
          ["`TRUE OR UNKNOWN`", "TRUE", "Row retained"]
        ]
      }
    },
    {
      title: "System Mechanics: Essential NULL Handling Functions",
      explanation: "To prevent NULL values from disrupting calculations or UI renders, SQL provides dedicated functions:",
      bullets: [
        "`IS NULL` and `IS NOT NULL`: The only valid comparison operators for testing absence.",
        "`COALESCE(val1, val2, val3, ...)`: Returns the first non-null argument in the list. Perfect for UI fallbacks: `COALESCE(phone, 'Not provided')`.",
        "`NULLIF(val1, val2)`: Returns NULL if `val1 = val2`; otherwise returns `val1`. Useful for preventing division by zero: `100 / NULLIF(total_credits, 0)`."
      ]
    },
    {
      title: "Production Scenario: Aggregate Functions & NULLs",
      explanation: "Be careful when computing aggregations over columns with NULLs. `COUNT(*)` counts every row regardless of content. However, `COUNT(phone)` counts only rows where the phone column is NOT NULL. Similarly, `AVG(score)` ignores NULL values entirely. If 2 students scored 100 and 8 students did not take the exam (NULL), `AVG(score)` reports 100, not 20! If unsubmitted exams should count as zero, use `AVG(COALESCE(score, 0))`."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "The `NOT IN` subquery trap: If you write `WHERE student_id NOT IN (SELECT student_id FROM suspended_students)`, and the subquery returns even a single row with `student_id IS NULL`, the entire condition evaluates to UNKNOWN for every single candidate row, and the query returns zero results! Always use `NOT EXISTS` or filter out NULLs in subqueries."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query that retrieves all courses and computes the effective price using `COALESCE(sale_price, original_price)`. Include only courses where `archived_at IS NULL`."
    }
  ],
  questions: [
    {
      id: "q-sql-057-1",
      prompt: "What does the expression `NULL = NULL` evaluate to in standard SQL?",
      options: [
        { id: "a", label: "TRUE" },
        { id: "b", label: "FALSE" },
        { id: "c", label: "UNKNOWN" },
        { id: "d", label: "Syntax Error" }
      ],
      correctAnswer: "c",
      explanation: "Under Three-Valued Logic, comparing two unknown states yields UNKNOWN, because you cannot assert that two unknown values are equal."
    },
    {
      id: "q-sql-057-2",
      prompt: "How must you test whether a column `email` has a missing or unassigned value in a WHERE clause?",
      options: [
        { id: "a", label: "WHERE email == NULL" },
        { id: "b", label: "WHERE email IS NULL" },
        { id: "c", label: "WHERE email = 'NULL'" },
        { id: "d", label: "WHERE email.length == 0" }
      ],
      correctAnswer: "b",
      explanation: "The `IS NULL` and `IS NOT NULL` predicate operators are the only correct SQL constructs for testing whether an attribute is marked as NULL."
    },
    {
      id: "q-sql-057-3",
      prompt: "What does the function `COALESCE(phone, mobile, 'None')` return?",
      options: [
        { id: "a", label: "A string concatenating all three arguments" },
        { id: "b", label: "The first non-null argument encountered from left to right" },
        { id: "c", label: "An array of phone numbers" },
        { id: "d", label: "The length of the phone string" }
      ],
      correctAnswer: "b",
      explanation: "COALESCE evaluates its arguments in order and returns the first value that is not NULL. If all are NULL, it returns the final fallback."
    },
    {
      id: "q-sql-057-4",
      prompt: "How does the `COUNT(column_name)` aggregate function treat rows where `column_name` is NULL?",
      options: [
        { id: "a", label: "It counts them as 0" },
        { id: "b", label: "It ignores them and does not include them in the count" },
        { id: "c", label: "It stops the query and throws an error" },
        { id: "d", label: "It counts them as -1" }
      ],
      correctAnswer: "b",
      explanation: "Aggregate functions (except COUNT(*)) silently skip NULL values. COUNT(column) returns the number of rows containing non-null values for that specific attribute."
    },
    {
      id: "q-sql-057-5",
      prompt: "What does `NULLIF(balance, 0)` evaluate to if `balance` equals 0?",
      options: [
        { id: "a", label: "0" },
        { id: "b", label: "NULL" },
        { id: "c", label: "TRUE" },
        { id: "d", label: "1" }
      ],
      correctAnswer: "b",
      explanation: "NULLIF(a, b) returns NULL if both arguments are equal; otherwise it returns argument a. This is often used to prevent division by zero errors."
    },
    {
      id: "q-sql-057-6",
      prompt: "Why does `WHERE id NOT IN (SELECT id FROM t)` return 0 rows if table `t` contains even one NULL id?",
      options: [
        { id: "a", label: "The table automatically locks" },
        { id: "b", label: "`id <> NULL` evaluates to UNKNOWN, causing the entire NOT IN conjunction to evaluate to UNKNOWN" },
        { id: "c", label: "The database deletes table t" },
        { id: "d", label: "The subquery is executed backwards" }
      ],
      correctAnswer: "b",
      explanation: "`x NOT IN (1, 2, NULL)` expands to `x <> 1 AND x <> 2 AND x <> NULL`. Since `x <> NULL` is UNKNOWN, the entire AND chain becomes UNKNOWN, filtering out all rows."
    },
    {
      id: "q-sql-057-7",
      prompt: "Can a UNIQUE constraint column contain NULL values in PostgreSQL?",
      options: [
        { id: "a", label: "No, UNIQUE columns strictly forbid NULLs" },
        { id: "b", label: "Yes, multiple rows can contain NULL because each NULL is considered distinct/unknown" },
        { id: "c", label: "Only one single NULL is allowed in the entire table" },
        { id: "d", label: "Only if the column type is INTEGER" }
      ],
      correctAnswer: "b",
      explanation: "In SQL standard and PostgreSQL, UNIQUE permits multiple rows with NULL values because one unknown value cannot be proven equal to another unknown value."
    },
    {
      id: "q-sql-057-8",
      prompt: "What is Three-Valued Logic (3VL) in relational databases?",
      options: [
        { id: "a", label: "Logic where code can be written in English, Spanish, or French" },
        { id: "b", label: "A logic system where truth values are TRUE, FALSE, or UNKNOWN" },
        { id: "c", label: "Logic executed across three redundant servers" },
        { id: "d", label: "A logic gate with three inputs" }
      ],
      correctAnswer: "b",
      explanation: "SQL's logic system accommodates missing information by introducing the UNKNOWN truth value alongside TRUE and FALSE."
    },
    {
      id: "q-sql-057-9",
      prompt: "What will `SELECT AVG(score)` return if scores are 80, 100, and NULL?",
      options: [
        { id: "a", label: "60 (treating NULL as 0)" },
        { id: "b", label: "90 (averaging only non-null values: (80 + 100) / 2)" },
        { id: "c", label: "NULL" },
        { id: "d", label: "180" }
      ],
      correctAnswer: "b",
      explanation: "AVG excludes NULLs from both sum and count, dividing 180 by 2 non-null records to yield 90."
    },
    {
      id: "q-sql-057-10",
      prompt: "How can you ensure that an unsubmitted test score is counted as 0 when computing average class performance?",
      options: [
        { id: "a", label: "AVG(score = 0)" },
        { id: "b", label: "AVG(COALESCE(score, 0))" },
        { id: "c", label: "AVG(score IS 0)" },
        { id: "d", label: "AVG(NULLIF(score, 0))" }
      ],
      correctAnswer: "b",
      explanation: "Wrapping score in `COALESCE(score, 0)` replaces NULL values with 0.0 before the AVG function computes its division."
    }
  ]
};

// MODULE 2 QUIZ
const sqlModule02Quiz: CurriculumItem = {
  id: "item-sql-mod02-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-operations-constraints",
  moduleTitle: "Module 2: SQL Operations and Constraints",
  modulePosition: 2,
  title: "Module 2 Assessment: SQL Operations & Constraints MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 2 Quiz: DDL, DML, Sorting, Pagination & NULL Semantics",
  contentDescription: "Test your comprehension of DDL constraints, safe DML execution, avoiding table-wide wipes, deterministic tie-breaker sorting, LIMIT/OFFSET mechanics, and Three-Valued Logic.",
  questions: [
    ...(lesson054.questions || []).slice(0, 3),
    ...(lesson055.questions || []).slice(0, 3),
    ...(lesson056.questions || []).slice(0, 2),
    ...(lesson057.questions || []).slice(0, 2)
  ]
};

// MODULE 2 ASSESSMENT (LAB)
const sqlModule02Assessment: CurriculumItem = {
  id: "item-sql-mod02-lab",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-operations-constraints",
  moduleTitle: "Module 2: SQL Operations and Constraints",
  modulePosition: 2,
  title: "Module 2 Lab: Data Manipulation and Constraint Integrity",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 2 Lab Project: Data Manipulation and Constraint Integrity",
  contentDescription: "Write and execute safe DML scripts against an educational catalog schema. Implement batch inserts, parameterized updates, deterministic pagination queries, and safe NULL-handling fallbacks.",
  assignmentPrompt: {
    instructions: "Complete the practical SQL operations lab:\n1. Write a script `dml_operations.sql` performing a multi-row batch insert of at least 5 courses.\n2. Execute an UPDATE query applying an introductory discount using `RETURNING course_id, title, price`.\n3. Write a paginated catalog query filtering by level, searching title with case-insensitive `ILIKE`, and sorting deterministically with a primary key tie-breaker.\n4. Demonstrate NULL handling by querying students with missing contact phone numbers using `COALESCE`.\n5. Attempt to insert an invalid course violating a CHECK constraint (`price < 0`) and record the database error.",
    deliverables: [
      "SQL script file with all tested DML statements and comments",
      "Terminal output log showing successful batch insert, RETURNING result, and CHECK constraint rejection",
      "Short reflection on why pagination queries require deterministic tie-breakers"
    ]
  }
};

export const sqlModule02: CurriculumSubModule = {
  id: "module-sql-02-operations-constraints",
  subCourseId: "mod-database-sql",
  title: "Module 2 — SQL operations and constraints",
  description: "Create tables with DDL constraints, execute safe DML updates and deletes, perform paginated searches with tie-breakers, and reason about three-valued logic with NULLs.",
  position: 2,
  items: [
    lesson054,
    lesson055,
    lesson056,
    lesson057,
    sqlModule02Quiz,
    sqlModule02Assessment
  ]
};
