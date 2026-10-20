import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 5: TRANSACTIONS AND SECURITY
// Lessons 067 - 070 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 067: TRANSACTIONS AND ACID
const lesson067: CurriculumItem = {
  id: "item-sql-067-transactions-acid",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-05-transactions-security",
  moduleTitle: "Module 5: Transactions and Security",
  modulePosition: 5,
  title: "Transactions and ACID",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Transactions and ACID: Ensuring Atomic All-or-Nothing Operations",
  contentDescription: "Understand BEGIN, COMMIT, and ROLLBACK mechanics, analyze the four ACID guarantees in depth, and implement multi-table financial balance transfers safely.",
  codeSnippet: {
    language: "sql",
    code: `-- Executing a bulletproof atomic financial transfer in SQL
BEGIN;
  -- Step 1: Deduct balance from sender (ensuring sufficient funds)
  UPDATE student_wallets
  SET balance = balance - 120.00
  WHERE student_id = 'stu_101' AND balance >= 120.00;

  -- Step 2: Credit payment to platform treasury
  UPDATE platform_accounts
  SET balance = balance + 120.00
  WHERE account_code = 'TREASURY_MAIN';

  -- Step 3: Record enrollment record
  INSERT INTO course_enrollments (student_id, course_id, enrolled_at)
  VALUES ('stu_101', 'crs_804', NOW());

  -- If any previous step affected 0 rows or failed, ROLLBACK is called;
  -- otherwise COMMIT permanently saves all mutations.
COMMIT;`
  },
  sections: [
    {
      title: "Core Concept: The All-or-Nothing Rule",
      explanation: "In software engineering, a real-world business operation rarely consists of a single isolated database write. Enrolling a student in a paid course requires at least three independent actions: deducting credits from the student's wallet, crediting the company revenue ledger, and inserting the enrollment record.\n\nWhat happens if the server loses power or crashes immediately after Step 1? The student's money has been deducted, but the enrollment was never created. The customer is furious, and the database is inconsistent. A Transaction groups multiple SQL operations into a single logical unit of work that either finishes completely (`COMMIT`) or undoes all intermediate changes entirely (`ROLLBACK`)."
    },
    {
      title: "The Four ACID Pillars Examined",
      explanation: "Relational engines enforce four strict guarantees to protect transactional integrity:",
      table: {
        headers: ["ACID Pillar", "Guaranteed Protection", "Hardware / Engine Implementation"],
        rows: [
          ["Atomicity", "All operations succeed together, or all changes are rolled back", "Undo logs and Write-Ahead Log (WAL) record rollbacks"],
          ["Consistency", "Database transitions strictly from one valid state to another", "Enforced via PRIMARY, FOREIGN KEY, and CHECK constraints"],
          ["Isolation", "Concurrent transactions execute without seeing uncommitted intermediate states", "Row locks, Multi-Version Concurrency Control (MVCC)"],
          ["Durability", "Committed transactions survive crashes, power cuts, and OS reboots", "WAL flushed to non-volatile disk via `fsync` before COMMIT returns"]
        ]
      }
    },
    {
      title: "System Mechanics: Savepoints for Partial Rollbacks",
      explanation: "Inside complex transactions, you can set intermediate checkpoints using `SAVEPOINT`:",
      bullets: [
        "`SAVEPOINT savepoint_name;`: Establishes a named checkpoint inside an open transaction.",
        "`ROLLBACK TO SAVEPOINT savepoint_name;`: Undoes operations executed after the savepoint while keeping earlier operations intact.",
        "`RELEASE SAVEPOINT savepoint_name;`: Frees the savepoint checkpoint without rolling back."
      ]
    },
    {
      title: "Production Scenario: Automated Error Recovery in Backend Drivers",
      explanation: "In Node.js, transaction management follows a strict try/catch pattern:\n```javascript\nconst client = await pool.connect();\ntry {\n  await client.query('BEGIN');\n  await client.query('UPDATE wallets ...');\n  await client.query('INSERT INTO enrollments ...');\n  await client.query('COMMIT');\n} catch (err) {\n  await client.query('ROLLBACK');\n  throw err;\n} finally {\n  client.release();\n}\n```\nThis ensures that any runtime exception, database constraint rejection, or network timeout cleanly rolls back the transaction, preventing dangling locks."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Keeping transactions open across slow external network calls: Never call external payment gateways (like Stripe or PayPal) or third-party webhooks inside an open database transaction! If the third-party API takes 10 seconds to respond, your database holds exclusive row locks for 10 seconds, queuing hundreds of subsequent user requests and exhausting connection pools. Always talk to external APIs first, then execute the database transaction in milliseconds."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Simulate a balance transfer transaction using PostgreSQL `psql`. Intentionally violate a CHECK constraint (`balance >= 0`) in the second statement and observe how issuing `ROLLBACK` completely restores the initial account balance."
    }
  ],
  questions: [
    {
      id: "q-sql-067-1",
      prompt: "What SQL command initiates an explicit database transaction block?",
      options: [
        { id: "a", label: "START TRANSACTION or BEGIN" },
        { id: "b", label: "OPEN DATABASE" },
        { id: "c", label: "INITIALIZE" },
        { id: "d", label: "RUN" }
      ],
      correctAnswer: "a",
      explanation: "In standard SQL and PostgreSQL, the `BEGIN` (or `START TRANSACTION`) statement opens a transactional boundary."
    },
    {
      id: "q-sql-067-2",
      prompt: "What SQL command reverses all uncommitted mutations executed inside an active transaction?",
      options: [
        { id: "a", label: "UNDO" },
        { id: "b", label: "ROLLBACK" },
        { id: "c", label: "REVERSE" },
        { id: "d", label: "CANCEL" }
      ],
      correctAnswer: "b",
      explanation: "The `ROLLBACK` command aborts the active transaction and reverts all modifications made since `BEGIN` or the latest savepoint."
    },
    {
      id: "q-sql-067-3",
      prompt: "What does the `COMMIT` command accomplish?",
      options: [
        { id: "a", label: "It closes the database connection permanently" },
        { id: "b", label: "It permanently saves all transaction changes to persistent storage and makes them visible to other connections" },
        { id: "c", label: "It runs a virus scan on the table" },
        { id: "d", label: "It exports the query to GitHub" }
      ],
      correctAnswer: "b",
      explanation: "COMMIT finalizes the transaction, flushes the Write-Ahead Log to persistent disk, releases row locks, and publishes changes to all clients."
    },
    {
      id: "q-sql-067-4",
      prompt: "Why should you never execute slow third-party API calls (e.g. Stripe, AWS S3) inside an active database transaction?",
      options: [
        { id: "a", label: "The database will automatically convert API responses to uppercase" },
        { id: "b", label: "The transaction holds database row locks and connections open, choking database capacity and causing connection starvation" },
        { id: "c", label: "SQL syntax forbids internet access" },
        { id: "d", label: "Stripe requires all database queries to be written in PHP" }
      ],
      correctAnswer: "b",
      explanation: "Holding database transactions open during external network delays ties up precious database connection pool slots and locks rows, bringing systems to a halt."
    },
    {
      id: "q-sql-067-5",
      prompt: "What does a `SAVEPOINT` allow you to do within an ongoing transaction?",
      options: [
        { id: "a", label: "Save the database to a floppy disk" },
        { id: "b", label: "Create a partial rollback checkpoint to undo specific operations without canceling the entire transaction" },
        { id: "c", label: "Pause the transaction for 24 hours" },
        { id: "d", label: "Increase user account permissions" }
      ],
      correctAnswer: "b",
      explanation: "A SAVEPOINT establishes an intermediate marker that can be targeted by `ROLLBACK TO SAVEPOINT`, keeping operations preceding the savepoint intact."
    },
    {
      id: "q-sql-067-6",
      prompt: "What guarantee does Durability provide when a transaction commits?",
      options: [
        { id: "a", label: "The transaction will execute in less than 10 milliseconds" },
        { id: "b", label: "Committed data is flushed to non-volatile disk and will survive sudden crashes, OS faults, or power cuts" },
        { id: "c", label: "The data will never be deleted by any future transaction" },
        { id: "d", label: "The table cannot be modified for 1 year" }
      ],
      correctAnswer: "b",
      explanation: "Durability guarantees that committed modifications are written to durable, non-volatile storage and can be reconstructed upon crash recovery."
    },
    {
      id: "q-sql-067-7",
      prompt: "What happens if a backend application crashes while inside an open transaction before issuing COMMIT?",
      options: [
        { id: "a", label: "The database commits all changes automatically" },
        { id: "b", label: "The database detects the dropped client connection and automatically rolls back the entire uncommitted transaction" },
        { id: "c", label: "The database freezes all tables permanently" },
        { id: "d", label: "The operating system restarts in safe mode" }
      ],
      correctAnswer: "b",
      explanation: "If a client disconnects unexpectedly or fails to complete a transaction, the server's connection monitor automatically triggers a clean ROLLBACK."
    },
    {
      id: "q-sql-067-8",
      prompt: "Which ACID property guarantees that concurrent transactions execute without reading uncommitted dirty modifications from each other?",
      options: [
        { id: "a", label: "Atomicity" },
        { id: "b", label: "Consistency" },
        { id: "c", label: "Isolation" },
        { id: "d", label: "Durability" }
      ],
      correctAnswer: "c",
      explanation: "Isolation determines how concurrent transactions interact and guarantees that intermediate, uncommitted updates remain isolated from other transactions."
    },
    {
      id: "q-sql-067-9",
      prompt: "In PostgreSQL, what is the default behavior if you execute an individual SQL statement without writing `BEGIN`?",
      options: [
        { id: "a", label: "The statement is rejected" },
        { id: "b", label: "It runs in autocommit mode, wrapping the single statement in an implicit transaction that commits immediately" },
        { id: "c", label: "The database rolls back automatically after 5 seconds" },
        { id: "d", label: "The statement only saves to memory" }
      ],
      correctAnswer: "b",
      explanation: "PostgreSQL treats standalone SQL statements as individual single-statement transactions that automatically commit upon successful execution."
    },
    {
      id: "q-sql-067-10",
      prompt: "How does the Consistency property protect an application when a foreign key violation occurs inside a transaction?",
      options: [
        { id: "a", label: "It deletes the parent table" },
        { id: "b", label: "It aborts the operation and prevents transitioning the database into an invalid state" },
        { id: "c", label: "It ignores the error and inserts NULL" },
        { id: "d", label: "It changes the foreign key to 0" }
      ],
      correctAnswer: "b",
      explanation: "Consistency ensures the database cannot enter an illegal state violating defined constraints, immediately aborting non-compliant transactions."
    }
  ]
};

// LESSON 068: ISOLATION AND CONCURRENCY
const lesson068: CurriculumItem = {
  id: "item-sql-068-isolation-concurrency",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-05-transactions-security",
  moduleTitle: "Module 5: Transactions and Security",
  modulePosition: 5,
  title: "Isolation and Concurrency",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Isolation and Concurrency: Concurrency Phenomena & Isolation Levels",
  contentDescription: "Understand the four standard SQL isolation levels, analyze concurrency phenomena (Dirty Reads, Non-Repeatable Reads, Phantom Reads, Lost Updates), and explore pessimistic vs optimistic locking.",
  codeSnippet: {
    language: "sql",
    code: `-- Setting transaction isolation level explicitly
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
  -- Operations here observe a consistent snapshot as of the transaction start
  SELECT COUNT(*) FROM course_enrollments WHERE course_id = 42;
COMMIT;

-- Explicit pessimistic locking for limited-inventory checkout
BEGIN;
  -- Lock the specific course row against concurrent checkouts
  SELECT course_id, seats_available
  FROM courses
  WHERE course_id = 42
  FOR UPDATE; -- Acquires exclusive row-level lock

  UPDATE courses
  SET seats_available = seats_available - 1
  WHERE course_id = 42 AND seats_available > 0;
COMMIT;`
  },
  sections: [
    {
      title: "Core Concept: The High-Traffic Interleaving Problem",
      explanation: "In modern cloud architectures, hundreds of client requests hit the database simultaneously across multiple web worker processes. If Transaction A is midway through calculating total course revenue while Transaction B is actively modifying prices and inserting refunds, how should the database handle the overlap?\n\nIsolation is the 'I' in ACID. SQL defines four standardized Isolation Levels that govern the strictness with which concurrent reads and writes are separated. Choosing an isolation level is a deliberate engineering tradeoff between absolute consistency and maximum concurrent throughput."
    },
    {
      title: "The Four Standard SQL Isolation Levels",
      explanation: "Each level progressively prevents specific concurrency phenomena:",
      table: {
        headers: ["Isolation Level", "Dirty Read Prevention", "Non-Repeatable Read Prevention", "Phantom Read Prevention"],
        rows: [
          ["Read Uncommitted", "No (reads uncommitted dirty writes)", "No", "No"],
          ["Read Committed (Default)", "Yes (reads only committed rows)", "No (re-reading may yield changed values)", "No"],
          ["Repeatable Read", "Yes", "Yes (snapshot isolation guarantees unchanged reads)", "Yes (in PostgreSQL MVCC)"],
          ["Serializable", "Yes", "Yes", "Yes (guarantees execution equivalent to sequential order)"]
        ]
      }
    },
    {
      title: "System Mechanics: Concurrency Phenomena Defined",
      explanation: "Database literature defines four specific concurrency bugs:",
      bullets: [
        "Dirty Read: Transaction A reads data modified by Transaction B that has not yet committed. If Transaction B then rolls back, Transaction A acted on phantom data that never officially existed.",
        "Non-Repeatable Read: Transaction A reads a row, Transaction B updates that row and commits, and Transaction A reads the exact same row again, observing modified values.",
        "Phantom Read: Transaction A queries a range (`WHERE price > 50`), Transaction B inserts a new matching row and commits, and Transaction A re-runs the range query, seeing a new 'phantom' row.",
        "Lost Update: Two transactions read the same balance (100) simultaneously. Both deduct 20 in memory and write back 80, overwriting each other and losing a 20 deduction."
      ]
    },
    {
      title: "Production Scenario: Pessimistic vs Optimistic Locking",
      explanation: "To prevent lost updates in high-contention workflows:\n\n1. Pessimistic Locking (`SELECT ... FOR UPDATE`): Locks the target row immediately upon read, forcing concurrent transactions to wait until the lock holder commits. Best for limited concert seats or flash sales.\n\n2. Optimistic Concurrency Control (OCC): Adds a `version INT` column. Writes check `WHERE id = $id AND version = $expected_version`. If another writer updated the row first, version mismatch detects the race without holding persistent locks, prompting a clean application retry."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Assuming Read Committed prevents Lost Updates: In the default `Read Committed` isolation level, running `SELECT balance ...` in your app, modifying it in JavaScript, and executing `UPDATE accounts SET balance = $new` does NOT prevent lost updates! Either perform atomic calculations directly in SQL (`SET balance = balance - 20`) or use `SELECT ... FOR UPDATE`."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Open two separate terminal windows with `psql` connections to the same database. Begin a transaction in Terminal 1 with `SELECT ... FOR UPDATE` on a test row. Attempt to update the same row in Terminal 2 and observe how Terminal 2 blocks until Terminal 1 issues `COMMIT`."
    }
  ],
  questions: [
    {
      id: "q-sql-068-1",
      prompt: "What is a 'Dirty Read' in database concurrency?",
      options: [
        { id: "a", label: "Reading data from a corrupted hard drive" },
        { id: "b", label: "A transaction reading uncommitted data written by another active transaction that may subsequently roll back" },
        { id: "c", label: "A query executed without an SSL certificate" },
        { id: "d", label: "Reading rows that have no primary keys" }
      ],
      correctAnswer: "b",
      explanation: "A dirty read occurs when a transaction observes intermediate mutations made by another uncommitted transaction, risking action on data that never officially commits."
    },
    {
      id: "q-sql-068-2",
      prompt: "What is the default transaction isolation level in PostgreSQL and MySQL?",
      options: [
        { id: "a", label: "Read Uncommitted" },
        { id: "b", label: "Read Committed in PostgreSQL; Repeatable Read in MySQL InnoDB" },
        { id: "c", label: "Serializable in all databases" },
        { id: "d", label: "No isolation" }
      ],
      correctAnswer: "b",
      explanation: "PostgreSQL defaults to `Read Committed` (each statement sees a snapshot of committed rows), while MySQL InnoDB defaults to `Repeatable Read`."
    },
    {
      id: "q-sql-068-3",
      prompt: "What is a 'Non-Repeatable Read'?",
      options: [
        { id: "a", label: "A query that can only be run once per session" },
        { id: "b", label: "When a transaction reads the same row twice and observes different attribute values because another transaction modified and committed them in between" },
        { id: "c", label: "When the database forgets the primary key" },
        { id: "d", label: "A syntax error in SELECT statements" }
      ],
      correctAnswer: "b",
      explanation: "Non-repeatable reads occur when committed updates from concurrent transactions change the values of previously read records within the same active transaction."
    },
    {
      id: "q-sql-068-4",
      prompt: "What does `SELECT ... FOR UPDATE` do in SQL?",
      options: [
        { id: "a", label: "It immediately updates all selected rows to zero" },
        { id: "b", label: "It acquires an exclusive row-level lock on matching rows, making concurrent transactions wait until the current transaction finishes" },
        { id: "c", label: "It deletes the selected rows" },
        { id: "d", label: "It exports selected rows to JSON" }
      ],
      correctAnswer: "b",
      explanation: "`SELECT ... FOR UPDATE` implements pessimistic locking, locking selected rows against concurrent modifications until the current transaction commits or rolls back."
    },
    {
      id: "q-sql-068-5",
      prompt: "What is a 'Phantom Read'?",
      options: [
        { id: "a", label: "Reading a row from a deleted table" },
        { id: "b", label: "When a transaction re-runs a range query and discovers new rows inserted and committed by another transaction in the interim" },
        { id: "c", label: "A query executed on Halloween" },
        { id: "d", label: "An index that has no table" }
      ],
      correctAnswer: "b",
      explanation: "Phantom reads occur when a transaction queries a range of rows twice and discovers new rows matching the criteria that were inserted and committed by another transaction."
    },
    {
      id: "q-sql-068-6",
      prompt: "What is the highest and strictest SQL isolation level?",
      options: [
        { id: "a", label: "Read Committed" },
        { id: "b", label: "Serializable" },
        { id: "c", label: "Repeatable Read" },
        { id: "d", label: "Immutable" }
      ],
      correctAnswer: "b",
      explanation: "Serializable guarantees execution equivalent to running transactions sequentially, completely eliminating dirty reads, non-repeatable reads, phantom reads, and serialization anomalies."
    },
    {
      id: "q-sql-068-7",
      prompt: "How does Optimistic Concurrency Control (OCC) detect concurrent conflicts?",
      options: [
        { id: "a", label: "By holding database locks for 10 minutes" },
        { id: "b", label: "By including a version or timestamp column in update queries: `WHERE id = $id AND version = $expected_version`" },
        { id: "c", label: "By shutting down the database when two users click at once" },
        { id: "d", label: "By asking the user for confirmation in a browser popup" }
      ],
      correctAnswer: "b",
      explanation: "OCC assumes conflicts are rare, checking if the record version changed between read and write; if a conflict occurs, the mutation affects 0 rows, triggering an app retry."
    },
    {
      id: "q-sql-068-8",
      prompt: "What is Multi-Version Concurrency Control (MVCC) in PostgreSQL?",
      options: [
        { id: "a", label: "A feature that allows installing 5 different versions of PostgreSQL at once" },
        { id: "b", label: "An engine architecture where readers do not block writers and writers do not block readers by maintaining snapshot row versions" },
        { id: "c", label: "A backup tool that runs every hour" },
        { id: "d", label: "A multi-player video game" }
      ],
      correctAnswer: "b",
      explanation: "MVCC keeps historical row versions with creation/deletion transaction IDs (`xmin`/`xmax`), allowing readers to view consistent snapshots without acquiring table locks."
    },
    {
      id: "q-sql-068-9",
      prompt: "What is a 'Deadlock' in database systems?",
      options: [
        { id: "a", label: "A hard drive cable disconnection" },
        { id: "b", label: "When Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1, freezing both indefinitely" },
        { id: "c", label: "When a user forgets their password" },
        { id: "d", label: "A query that returns 0 rows" }
      ],
      correctAnswer: "b",
      explanation: "Deadlocks occur when two or more transactions form a circular dependency waiting on locks held by each other. The database engine automatically detects deadlocks and aborts one transaction."
    },
    {
      id: "q-sql-068-10",
      prompt: "How can applications avoid deadlocks when updating multiple related records?",
      options: [
        { id: "a", label: "Always update records in a consistent, predictable order (e.g. sorted by primary key ID)" },
        { id: "b", label: "Never use transactions" },
        { id: "c", label: "Delete all foreign keys" },
        { id: "d", label: "Increase server RAM" }
      ],
      correctAnswer: "a",
      explanation: "Acquiring locks in a deterministic global order (e.g. sorting user IDs before locking) prevents cyclic wait chains, eliminating deadlocks."
    }
  ]
};

// LESSON 069: STORED PROCEDURES, FUNCTIONS AND TRIGGERS
const lesson069: CurriculumItem = {
  id: "item-sql-069-stored-procedures-functions-triggers",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-05-transactions-security",
  moduleTitle: "Module 5: Transactions and Security",
  modulePosition: 5,
  title: "Stored Procedures, Functions and Triggers",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Stored Procedures, Functions and Triggers: Database-Side Logic",
  contentDescription: "Understand user-defined functions (UDFs), stored procedures with transaction control, and event-driven triggers for automated auditing and data transformation.",
  codeSnippet: {
    language: "sql",
    code: `-- PostgreSQL: Audit trigger function recording course price changes
CREATE OR REPLACE FUNCTION audit_course_price_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.price <> OLD.price THEN
    INSERT INTO course_price_audit_log (course_id, old_price, new_price, changed_at, changed_by)
    VALUES (OLD.course_id, OLD.price, NEW.price, NOW(), current_user);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attaching the trigger to the courses table
CREATE TRIGGER trg_audit_course_price
AFTER UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION audit_course_price_change();`
  },
  sections: [
    {
      title: "Core Concept: Moving Logic Closer to Storage",
      explanation: "Most modern application architectures keep business logic in backend services (Node.js, Go, Python) and use the database primarily for persistent storage. However, certain mission-critical guarantees — such as immutable compliance audit logs, complex multi-table validations, and data transformations — can be executed directly inside the database engine.\n\nDatabase-side logic includes User-Defined Functions (which compute and return values or tables), Stored Procedures (which can commit and roll back internal transactions), and Triggers (which fire automatically in response to DML events)."
    },
    {
      title: "Functions vs Stored Procedures Compared",
      explanation: "While both encapsulate procedural logic, they serve distinct operational roles:",
      table: {
        headers: ["Characteristic", "User-Defined Function (UDF)", "Stored Procedure"],
        rows: [
          ["Return Value", "Mandatory (returns a scalar value or table)", "Optional (returns output parameters or void)"],
          ["Transaction Control", "Cannot execute `COMMIT` or `ROLLBACK` internally", "Can control transactions (`COMMIT`, `ROLLBACK`)"],
          ["Invocation", "Called inside queries: `SELECT calculate_tax(price)`", "Invoked with `CALL procedure_name(args)`"],
          ["Primary Usage", "Computations, data transformations, custom aggregates", "Batch maintenance, archival runs, multi-step workflows"]
        ]
      }
    },
    {
      title: "System Mechanics: Triggers and Event Lifecycles",
      explanation: "A Trigger is a database object that automatically executes a function whenever a specific event occurs on a table:",
      bullets: [
        "Timing: `BEFORE` (validates or sanitizes data before it hits disk), `AFTER` (records audits or synchronizes caches after commit), or `INSTEAD OF` (allows writing to complex views).",
        "Granularity: `FOR EACH ROW` (fires once for every affected tuple, with access to `OLD` and `NEW` records), or `FOR EACH STATEMENT` (fires once per batch command).",
        "Special Variables: In row-level triggers, `OLD` holds column values before the mutation, and `NEW` holds proposed column values."
      ]
    },
    {
      title: "Production Scenario: Automated Immutable Audit Trails",
      explanation: "In financial or regulated medical systems, you must record every modification to sensitive accounts. Relying on backend developers to remember to call an audit endpoint in every microservice risks human error. An `AFTER UPDATE` database trigger guarantees that whether an update originates from a Node.js API, an administrative CLI script, or a database migration, an immutable audit log row is recorded without fail."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "The hidden complexity trap: Overusing triggers turns database schemas into 'black boxes'. If an insert on Table A silently modifies Table B, which triggers a write on Table C, backend developers cannot deduce why records are changing by inspecting application code. Furthermore, cascading triggers can cause severe write performance bottlenecks. Keep database triggers reserved for non-negotiable security audits and integrity enforcement."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a PostgreSQL trigger function that automatically updates a `last_updated_at` column with `NOW()` whenever a course row is updated. Attach it as a `BEFORE UPDATE FOR EACH ROW` trigger."
    }
  ],
  questions: [
    {
      id: "q-sql-069-1",
      prompt: "What is a database Trigger?",
      options: [
        { id: "a", label: "A button clicked by a user in the web application" },
        { id: "b", label: "A stored function automatically executed by the database engine in response to specific DML events on a table" },
        { id: "c", label: "A tool that generates fake test data" },
        { id: "d", label: "A hardware switch on the physical server" }
      ],
      correctAnswer: "b",
      explanation: "Triggers bind execution of procedural code to INSERT, UPDATE, DELETE, or TRUNCATE events on specific tables."
    },
    {
      id: "q-sql-069-2",
      prompt: "What is the primary difference between a User-Defined Function and a Stored Procedure in modern PostgreSQL?",
      options: [
        { id: "a", label: "Functions are written in Python; procedures are written in Java" },
        { id: "b", label: "Stored procedures can execute COMMIT and ROLLBACK internally; functions cannot" },
        { id: "c", label: "Functions can only be run once per day" },
        { id: "d", label: "Procedures cannot take arguments" }
      ],
      correctAnswer: "b",
      explanation: "Stored procedures (called via `CALL`) have full transaction control, allowing them to manage internal commit and rollback boundaries, whereas functions execute within the caller's transaction context."
    },
    {
      id: "q-sql-069-3",
      prompt: "What do the special variables `OLD` and `NEW` represent in a PostgreSQL row-level trigger?",
      options: [
        { id: "a", label: "The database version numbers" },
        { id: "b", label: "OLD contains column values prior to modification; NEW contains proposed values being written" },
        { id: "c", label: "The user's age before and after their birthday" },
        { id: "d", label: "The creation date of the table" }
      ],
      correctAnswer: "b",
      explanation: "In row-level triggers, `OLD` references the row state before the update or delete, while `NEW` references the candidate row state for insert or update."
    },
    {
      id: "q-sql-069-4",
      prompt: "When should a `BEFORE INSERT` trigger be chosen over an `AFTER INSERT` trigger?",
      options: [
        { id: "a", label: "When you want to validate, clean, or modify the incoming row values before they are written to disk" },
        { id: "b", label: "When you want to send an email to the customer" },
        { id: "c", label: "When the table has more than 100 columns" },
        { id: "d", label: "BEFORE triggers are deprecated" }
      ],
      correctAnswer: "a",
      explanation: "A BEFORE trigger can inspect and mutate the `NEW` record (e.g. trimming whitespace, hashing a slug) or abort execution before disk persistence occurs."
    },
    {
      id: "q-sql-069-5",
      prompt: "What SQL statement is used to execute a stored procedure?",
      options: [
        { id: "a", label: "EXECUTE PROCEDURE proc_name();" },
        { id: "b", label: "CALL proc_name(args);" },
        { id: "c", label: "SELECT proc_name();" },
        { id: "d", label: "RUN proc_name();" }
      ],
      correctAnswer: "b",
      explanation: "Standard SQL and PostgreSQL invoke stored procedures using the `CALL procedure_name(parameters);` syntax."
    },
    {
      id: "q-sql-069-6",
      prompt: "Why should excessive business logic in database triggers be avoided in modern application architectures?",
      options: [
        { id: "a", label: "Triggers delete all indexes" },
        { id: "b", label: "Hidden side effects make systems hard to debug, difficult to unit-test, and challenging to version-control compared to application code" },
        { id: "c", label: "Triggers only work on mobile devices" },
        { id: "d", label: "Triggers can only store 5 rows" }
      ],
      correctAnswer: "b",
      explanation: "Burying domain rules in triggers obscures program flow, complicates local testing and CI/CD, and locks code into database-vendor-specific procedural languages."
    },
    {
      id: "q-sql-069-7",
      prompt: "What procedural programming language is built into PostgreSQL for writing triggers and functions?",
      options: [
        { id: "a", label: "PL/pgSQL" },
        { id: "b", label: "VBScript" },
        { id: "c", label: "Assembly" },
        { id: "d", label: "Objective-C" }
      ],
      correctAnswer: "a",
      explanation: "PL/pgSQL (Procedural Language/PostgreSQL) is the native procedural extension language providing control flow, loops, and variable handling in PostgreSQL."
    },
    {
      id: "q-sql-069-8",
      prompt: "In a `FOR EACH ROW` trigger, what does returning `NULL` from a `BEFORE INSERT` trigger function cause?",
      options: [
        { id: "a", label: "It inserts a row with all columns set to NULL" },
        { id: "b", label: "It silently suppresses and aborts the insert operation for that particular row" },
        { id: "c", label: "It deletes the entire table" },
        { id: "d", label: "It throws a fatal database crash error" }
      ],
      correctAnswer: "b",
      explanation: "In PostgreSQL BEFORE row-level triggers, returning NULL signals the engine to cancel the insert or update operation for that row without throwing an error."
    },
    {
      id: "q-sql-069-9",
      prompt: "What is an `INSTEAD OF` trigger used for?",
      options: [
        { id: "a", label: "Running a backup instead of an update" },
        { id: "b", label: "Allowing DML operations (INSERT, UPDATE, DELETE) on non-updatable complex views by intercepting the event and modifying base tables" },
        { id: "c", label: "Rebooting the server instead of restarting the database" },
        { id: "d", label: "Translating SQL to Python" }
      ],
      correctAnswer: "b",
      explanation: "INSTEAD OF triggers intercept write operations targeted at views, giving developers procedural control to write the changes into the appropriate underlying physical tables."
    },
    {
      id: "q-sql-069-10",
      prompt: "What is a prime use case where database triggers are universally considered appropriate and valuable?",
      options: [
        { id: "a", label: "Rendering React components" },
        { id: "b", label: "Enforcing regulatory immutable audit logs and automatic `updated_at` timestamp synchronization" },
        { id: "c", label: "Sending push notifications to mobile phones directly from storage" },
        { id: "d", label: "Validating CSS stylesheets" }
      ],
      correctAnswer: "b",
      explanation: "Audit trails and automatic timestamp tracking are ideal for triggers because they guarantee compliance across all writing sources without relying on application code."
    }
  ]
};

// LESSON 070: SQL INJECTION AND PARAMETERIZED QUERIES
const lesson070: CurriculumItem = {
  id: "item-sql-070-sql-injection-parameterized-queries",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-05-transactions-security",
  moduleTitle: "Module 5: Transactions and Security",
  modulePosition: 5,
  title: "SQL Injection and Parameterized Queries",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "SQL Injection and Parameterized Queries: Defense at the Trust Boundary",
  contentDescription: "Understand the mechanics of SQL Injection (SQLi), analyze how query concatenation destroys security, and master parameterized prepared statements across database drivers.",
  codeSnippet: {
    language: "javascript",
    code: `// VULNERABLE TO CATASTROPHIC SQL INJECTION (NEVER DO THIS):
// const query = \`SELECT * FROM users WHERE email = '\${req.body.email}'\`;
// Attacker enters: ' OR '1'='1' -- 

// SECURE: Parameterized query treating untrusted input strictly as data
import { pool } from '../db.js';

export async function getUserByEmail(email) {
  const query = 'SELECT user_id, email, password_hash, role FROM users WHERE email = $1;';
  const { rows } = await pool.query(query, [email]); // Parameterized values
  return rows[0] || null;
}`
  },
  sections: [
    {
      title: "Core Concept: The Fundamental Flaw of Code vs Data Confusion",
      explanation: "SQL Injection (SQLi) is consistently ranked among the most destructive web application security vulnerabilities. It occurs when untrusted user input is directly concatenated into a SQL command string. Because the database engine's query parser cannot distinguish between developer-written SQL instructions and malicious user input, the attacker can hijack the query grammar.\n\nBy carefully crafting input containing quotes, semicolons, or boolean logic (such as `' OR '1'='1`), an attacker can bypass authentication, view all private customer data, modify balances, or drop entire database tables."
    },
    {
      title: "How SQL Injection Works in Practice",
      explanation: "Consider a vulnerable login query in backend Node.js:\n```sql\nSELECT * FROM users WHERE email = '$input_email' AND password_hash = '$hash';\n```\nIf an attacker enters the email: `' OR 1=1 --`\nThe concatenated query becomes:\n```sql\nSELECT * FROM users WHERE email = '' OR 1=1 --' AND password_hash = '...';\n```\nBecause `1=1` is always TRUE and `--` comments out the password check, the query returns the first user in the table (typically the system administrator), granting full access without a valid password!"
    },
    {
      title: "The Cure: Parameterized Queries (Prepared Statements)",
      explanation: "The complete, non-negotiable defense against SQL injection is Parameterized Queries (also known as Prepared Statements):",
      bullets: [
        "Phase 1 (Preparation): The backend sends the SQL query template with placeholders (`$1`, `$2` in PostgreSQL or `?` in MySQL) to the database parser. The database compiles and validates the SQL syntax tree *before* seeing any user data.",
        "Phase 2 (Execution): The database receives the raw parameters separately. The engine treats parameters strictly as literal values (strings or numbers), never as executable SQL grammar.",
        "Immunity: Even if an attacker enters `' OR 1=1 --`, the database searches for a user whose literal email address is the character sequence `\"' OR 1=1 --\"`. The query grammar is inviolable."
      ]
    },
    {
      title: "Production Scenario: Least Privilege Database Users",
      explanation: "Defense-in-depth requires that your backend application does not connect to the database as the `postgres` superuser or `root`. Configure a dedicated role (`app_service_user`) with permissions limited strictly to necessary tables (`GRANT SELECT, INSERT, UPDATE ON courses, enrollments TO app_service_user;`). Revoke `DROP TABLE`, `ALTER TABLE`, and access to system catalogs."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Relying on custom string escaping or 'regex sanitization': Escaping quotes with backslashes is notoriously fragile against encoding tricks (like multibyte UTF-8 bypasses). Never attempt to write your own string escaping functions. Always let the database driver handle parameterization through official placeholder arrays."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Inspect three vulnerable legacy backend code snippets that concatenate request query parameters into SQL strings. Rewrite all three queries using parameterized prepared statements with placeholder arrays."
    }
  ],
  questions: [
    {
      id: "q-sql-070-1",
      prompt: "What is SQL Injection (SQLi)?",
      options: [
        { id: "a", label: "A technique to make SQL queries run faster" },
        { id: "b", label: "A vulnerability where untrusted user input alters the intended SQL query structure, allowing attackers to execute unauthorized commands" },
        { id: "c", label: "Injecting CSS styles into a database" },
        { id: "d", label: "An automated database backup process" }
      ],
      correctAnswer: "b",
      explanation: "SQL injection occurs when user input is concatenated into query strings, allowing malicious input to manipulate the SQL parser's syntax tree."
    },
    {
      id: "q-sql-070-2",
      prompt: "What is the single most effective defense against SQL Injection?",
      options: [
        { id: "a", label: "Converting all user passwords to uppercase" },
        { id: "b", label: "Using parameterized queries (prepared statements) with placeholder parameters" },
        { id: "c", label: "Deleting all database indexes" },
        { id: "d", label: "Limiting queries to 10 characters" }
      ],
      correctAnswer: "b",
      explanation: "Parameterized queries separate SQL code structure from user data values, ensuring the parser compiles the query before parameters are bound as pure literals."
    },
    {
      id: "q-sql-070-3",
      prompt: "In PostgreSQL Node.js drivers (`pg`), how are query parameters represented in the SQL string?",
      options: [
        { id: "a", label: "With dollar sign placeholders: `$1`, `$2`, `$3`" },
        { id: "b", label: "With curly braces: `{param1}`, `{param2}`" },
        { id: "c", label: "With asterisks: `*`, `**`" },
        { id: "d", label: "With emoji icons" }
      ],
      correctAnswer: "a",
      explanation: "PostgreSQL wire protocol uses indexed positional placeholders (`$1`, `$2`, etc.), matching elements in the accompanying parameters array."
    },
    {
      id: "q-sql-070-4",
      prompt: "Why is manual string escaping (e.g. `replace(/'/g, \"\\'\")`) considered inferior to parameterized queries?",
      options: [
        { id: "a", label: "Escaping is only supported in Python" },
        { id: "b", label: "Custom escaping is error-prone, misses edge cases like multibyte character encodings, and fails to separate code from data" },
        { id: "c", label: "Escaping doubles the size of the database" },
        { id: "d", label: "The database server rejects escaped quotes" }
      ],
      correctAnswer: "b",
      explanation: "Manual sanitization frequently fails against character encoding tricks, null-byte injection, and nested quotes. Parameterization eliminates the attack vector entirely."
    },
    {
      id: "q-sql-070-5",
      prompt: "What does the double-dash `--` sequence represent in SQL that makes it useful to attackers in SQL injection?",
      options: [
        { id: "a", label: "A division operator" },
        { id: "b", label: "The start of an inline comment, causing the database to ignore the rest of the original query" },
        { id: "c", label: "A commit command" },
        { id: "d", label: "A request for administrator rights" }
      ],
      correctAnswer: "b",
      explanation: "The `--` syntax begins a single-line comment in SQL. Attackers append it to neutralize subsequent conditions (such as password checks) in vulnerable queries."
    },
    {
      id: "q-sql-070-6",
      prompt: "What security principle dictates that your application database user should NOT have permissions to DROP tables?",
      options: [
        { id: "a", label: "Principle of Least Privilege" },
        { id: "b", label: "Principle of Maximum Speed" },
        { id: "c", label: "Principle of Continuous Deployment" },
        { id: "d", label: "Principle of Open Access" }
      ],
      correctAnswer: "a",
      explanation: "The Principle of Least Privilege requires accounts to hold only the minimal permissions necessary for everyday tasks (SELECT, INSERT, UPDATE), revoking administrative powers like DROP."
    },
    {
      id: "q-sql-070-7",
      prompt: "Can SQL injection occur through HTTP request headers or URL path parameters?",
      options: [
        { id: "a", label: "No, SQL injection only happens in password form fields" },
        { id: "b", label: "Yes, any untrusted input source (headers, query params, path params, cookies) that is concatenated into SQL can be exploited" },
        { id: "c", label: "Only if the server is running on Linux" },
        { id: "d", label: "Only if the database is MySQL" }
      ],
      correctAnswer: "b",
      explanation: "Any external data entering your backend — whether headers (User-Agent), cookies, route parameters, or JSON payloads — can trigger SQLi if concatenated into queries."
    },
    {
      id: "q-sql-070-8",
      prompt: "Why should detailed database error messages and stack traces never be displayed to end users in API responses?",
      options: [
        { id: "a", label: "Users don't like reading text" },
        { id: "b", label: "Database errors reveal table names, column structures, and SQL syntax details that help attackers craft precise injection payloads" },
        { id: "c", label: "Error messages take up too much internet bandwidth" },
        { id: "d", label: "It causes the browser to close immediately" }
      ],
      correctAnswer: "b",
      explanation: "Verbose error messages leak internal schema blueprints to malicious actors. Production APIs should return generic error messages while logging details privately."
    },
    {
      id: "q-sql-070-9",
      prompt: "Which of the following Node.js code snippets is completely protected against SQL injection?",
      options: [
        { id: "a", label: "db.query(\"SELECT * FROM users WHERE name = '\" + name + \"'\");" },
        { id: "b", label: "db.query(`SELECT * FROM users WHERE name = '${name}'`);" },
        { id: "c", label: "db.query('SELECT * FROM users WHERE name = $1', [name]);" },
        { id: "d", label: "db.query('SELECT * FROM users WHERE name = ' + escape(name));" }
      ],
      correctAnswer: "c",
      explanation: "Option C uses parameterized prepared statements with a placeholder `$1` and parameters array `[name]`, which is immune to SQL injection."
    },
    {
      id: "q-sql-070-10",
      prompt: "What is 'Blind SQL Injection'?",
      options: [
        { id: "a", label: "SQL injection performed with the monitor turned off" },
        { id: "b", label: "An injection where the database does not display error messages or data directly, but attackers infer data through boolean TRUE/FALSE responses or time delays" },
        { id: "c", label: "A query that only selects blind users" },
        { id: "d", label: "A defect caused by dirty glasses" }
      ],
      correctAnswer: "b",
      explanation: "In Blind SQLi, attackers extract confidential data bit-by-bit by measuring conditional page responses (TRUE vs FALSE) or observing time delays (`pg_sleep(5)`)."
    }
  ]
};

// MODULE 5 QUIZ
const sqlModule05Quiz: CurriculumItem = {
  id: "item-sql-mod05-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-05-transactions-security",
  moduleTitle: "Module 5: Transactions and Security",
  modulePosition: 5,
  title: "Module 5 Assessment: Transactions & Security MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 5 Quiz: ACID Transactions, Concurrency, Triggers & SQLi Defense",
  contentDescription: "Evaluate your comprehensive mastery of database reliability and security: BEGIN/COMMIT/ROLLBACK workflows, isolation levels, dirty/phantom reads, row-level pessimistic locking, triggers, and parameterized query defense.",
  questions: [
    ...(lesson067.questions || []).slice(0, 3),
    ...(lesson068.questions || []).slice(0, 3),
    ...(lesson069.questions || []).slice(0, 2),
    ...(lesson070.questions || []).slice(0, 2)
  ]
};

// MODULE 5 ASSESSMENT (LAB)
const sqlModule05Assessment: CurriculumItem = {
  id: "item-sql-mod05-lab",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-05-transactions-security",
  moduleTitle: "Module 5: Transactions and Security",
  modulePosition: 5,
  title: "Module 5 Lab: Transaction Isolation and SQL Injection Defense",
  duration: "50 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 5 Lab Project: Transaction Isolation and SQL Injection Defense",
  contentDescription: "Build a secure and reliable backend database interface. Implement atomic financial wallet transactions with rollback recovery, construct an automated audit trigger, and rewrite vulnerable queries into secure parameterized prepared statements.",
  assignmentPrompt: {
    instructions: "Complete the transaction reliability and security defense lab:\n1. Create a script `transaction_security.sql`.\n2. Write an atomic balance transfer transaction that deducts funds from a student wallet, credits a platform account, and inserts an enrollment, testing both COMMIT and error ROLLBACK paths.\n3. Create an immutable audit log table `enrollment_audit_log` and attach an `AFTER INSERT OR DELETE` trigger capturing user and timestamp.\n4. Take three vulnerable JavaScript SQL concatenation snippets and rewrite them into safe parameterized queries using `pool.query(sql, [params])`.\n5. Configure a dedicated application database role with least privilege permissions.",
    deliverables: [
      "SQL transaction script with verified rollback testing logs",
      "Trigger implementation script logging audit mutations",
      "Hardened backend JavaScript queries using parameterized prepared statements"
    ]
  }
};

export const sqlModule05: CurriculumSubModule = {
  id: "module-sql-05-transactions-security",
  subCourseId: "mod-database-sql",
  title: "Module 5 — Transactions and security",
  description: "Execute atomic transactions with ACID guarantees, control concurrency isolation levels and locks, build audit triggers, and defend against SQL injection using parameterized queries.",
  position: 5,
  items: [
    lesson067,
    lesson068,
    lesson069,
    lesson070,
    sqlModule05Quiz,
    sqlModule05Assessment
  ]
};
