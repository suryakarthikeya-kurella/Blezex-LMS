import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// SUB-COURSE 3: RELATIONAL DATABASES & SQL
// =========================================================================

// --- MODULE 1: RELATIONAL MODELING & SCHEMA FOUNDATIONS ---

const sqlLesson01: CurriculumItem = {
  id: "item-sql-01-intro-rdbms",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Relational Modeling & Schema Foundations",
  modulePosition: 1,
  title: "01. Introduction to Databases, RDBMS & Client-Server Architecture",
  duration: "25 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 01: Introduction to Databases, RDBMS & Architecture",
  contentDescription: "Understand persistent data storage, file systems vs databases, relational database management systems (PostgreSQL, MySQL, SQLite), and how client applications communicate with database engines.",
  codeSnippet: {
    language: "SQL",
    code: "-- Connect to database server and create a dedicated workspace\nCREATE DATABASE blezex_academy;\n\\c blezex_academy;\n\n-- Verify current server connection and version\nSELECT version(), current_database(), current_user;"
  },
  sections: [
    {
      title: "1.1 Why Databases? File Systems vs Relational Databases",
      explanation: "In early computing, applications stored data in flat files (CSV, JSON, XML). While simple, flat files fail at scale due to concurrency conflicts (race conditions), data corruption when multiple users write at once, lack of atomicity (crashes mid-write), and lack of indexing for fast lookups. A Relational Database Management System (RDBMS) provides ACID guarantees: Atomicity, Consistency, Isolation, and Durability.",
      bullets: [
        "Atomicity: Transactions succeed completely or roll back entirely — no half-saved payments or orders.",
        "Consistency: Data must satisfy all defined constraints (types, foreign keys, uniqueness).",
        "Isolation: Concurrent transactions execute independently without interfering with one another.",
        "Durability: Committed transactions are permanently written to non-volatile storage and survive power outages."
      ],
      diagram: "+-------------------------------------------------------------+\n|                   FILE STORAGE vs RDBMS                     |\n+-------------------------------------------------------------+\n| Flat Files (JSON/CSV)      | Relational Database (RDBMS)     |\n| - Prone to race conditions | - ACID transactional integrity  |\n| - Linear slow searches     | - B-Tree indexes for fast O(logN)|\n| - No referential integrity | - Foreign keys enforce relations|\n+-------------------------------------------------------------+"
    },
    {
      title: "1.2 Client-Server Database Architecture",
      explanation: "Modern database systems run as background daemon services listening on a TCP port (e.g., PostgreSQL port 5432, MySQL port 3306). Client applications (Node.js servers, CLI clients, GUI tools) establish TCP socket connections, send SQL query strings over the wire, and receive structured tabular result sets.",
      table: {
        headers: ["Component", "Role", "Example"],
        rows: [
          ["Database Client", "Constructs SQL queries & sends via TCP driver", "pg (Node.js), psql CLI, DBeaver"],
          ["Network Protocol", "Binary / text protocol over TCP connection", "PostgreSQL Wire Protocol on Port 5432"],
          ["Query Parser & Planner", "Parses SQL syntax and computes optimal execution plan", "PostgreSQL Cost-Based Optimizer"],
          ["Storage Engine", "Writes pages to disk and manages WAL logs", "PostgreSQL Buffer Pool & Heap Storage"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-sql-01-1",
      prompt: "What does the 'A' in ACID database transactions guarantee?",
      options: [
        { id: "a", label: "All data is stored Alphabetically" },
        { id: "b", label: "Transactions are Atomic: all operations succeed or all are rolled back" },
        { id: "c", label: "Automatic backup occurs after every write" },
        { id: "d", label: "Access is granted to all authenticated users simultaneously" }
      ],
      correctIndex: 1,
      explanation: "Atomicity ensures that all statements within a transaction succeed together. If any failure happens mid-flight, the entire transaction rolls back to the prior state."
    },
    {
      id: "q-sql-01-2",
      prompt: "Which port is the default connection port for PostgreSQL database servers?",
      options: [
        { id: "a", label: "3306" },
        { id: "b", label: "8080" },
        { id: "c", label: "5432" },
        { id: "d", label: "27017" }
      ],
      correctIndex: 2,
      explanation: "Port 5432 is the standard default port for PostgreSQL. MySQL uses 3306 and MongoDB uses 27017."
    },
    {
      id: "q-sql-01-3",
      prompt: "Why is a relational database superior to writing data directly to JSON files on disk?",
      options: [
        { id: "a", label: "JSON files cannot store text strings" },
        { id: "b", label: "RDBMS handles concurrent writes, transaction rollback, and fast indexing" },
        { id: "c", label: "Databases do not require hard drives" },
        { id: "d", label: "JSON files cannot be read by web browsers" }
      ],
      correctIndex: 1,
      explanation: "Relational databases solve multi-user concurrency, race conditions, schema validation, and fast lookups using B-Tree indexes, which flat files cannot do reliably."
    },
    {
      id: "q-sql-01-4",
      prompt: "What does the Durability property in ACID mean?",
      options: [
        { id: "a", label: "Data can never be deleted by any user" },
        { id: "b", label: "Once a transaction commits, its changes survive crashes or power failures" },
        { id: "c", label: "The database uses durable memory rather than hard disk" },
        { id: "d", label: "The database runs without needing regular updates" }
      ],
      correctIndex: 1,
      explanation: "Durability guarantees that once a transaction commits, its records are committed to non-volatile storage (like WAL and disk tables) and will not be lost if the server reboots."
    },
    {
      id: "q-sql-01-5",
      prompt: "Which command in PostgreSQL CLI switches the active database context?",
      options: [
        { id: "a", label: "USE database_name;" },
        { id: "b", label: "\\c database_name" },
        { id: "c", label: "SWITCH DATABASE database_name;" },
        { id: "d", label: "SELECT database_name;" }
      ],
      correctIndex: 1,
      explanation: "In PostgreSQL's psql CLI tool, '\\c <dbname>' is used to connect/switch to a database. (MySQL uses 'USE <dbname>;')."
    },
    {
      id: "q-sql-01-6",
      prompt: "What is an RDBMS?",
      options: [
        { id: "a", label: "Rapid Dynamic Base Module Server" },
        { id: "b", label: "Relational Database Management System" },
        { id: "c", label: "Redundant Binary Memory System" },
        { id: "d", label: "Realtime Data Binary Socket" }
      ],
      correctIndex: 1,
      explanation: "RDBMS stands for Relational Database Management System — software that manages tables with relations and enforces schema integrity."
    },
    {
      id: "q-sql-01-7",
      prompt: "In client-server database architecture, how does a Node.js backend talk to PostgreSQL?",
      options: [
        { id: "a", label: "By uploading CSV files via FTP" },
        { id: "b", label: "Via TCP socket connection executing SQL commands" },
        { id: "c", label: "Through Bluetooth wireless pairing" },
        { id: "d", label: "By reading HTML source code" }
      ],
      correctIndex: 1,
      explanation: "Node.js drivers (like pg or postgres) establish a TCP network connection to PostgreSQL and stream queries and result packets over TCP."
    },
    {
      id: "q-sql-01-8",
      prompt: "What is the primary role of the Database Query Optimizer?",
      options: [
        { id: "a", label: "To format query strings with syntax highlighting" },
        { id: "b", label: "To find the most efficient execution plan (indexes, join order) for a query" },
        { id: "c", label: "To compress image files before saving" },
        { id: "d", label: "To automatically delete old rows" }
      ],
      correctIndex: 1,
      explanation: "The query planner/optimizer evaluates multiple algorithms and index paths to execute the SQL query in the least amount of time and disk I/O."
    },
    {
      id: "q-sql-01-9",
      prompt: "What category of SQL language does the 'CREATE DATABASE' command belong to?",
      options: [
        { id: "a", label: "DQL (Data Query Language)" },
        { id: "b", label: "DDL (Data Definition Language)" },
        { id: "c", label: "DML (Data Manipulation Language)" },
        { id: "d", label: "TCL (Transaction Control Language)" }
      ],
      correctIndex: 1,
      explanation: "DDL (Data Definition Language) includes commands like CREATE, ALTER, and DROP that define or modify database structure."
    },
    {
      id: "q-sql-01-10",
      prompt: "What happens if a power failure strikes halfway through a multi-statement transaction?",
      options: [
        { id: "a", label: "Half of the changes stay in the database permanently" },
        { id: "b", label: "The database rolls back incomplete changes on restart due to Atomicity" },
        { id: "c", label: "The whole database is automatically formatted" },
        { id: "d", label: "The server ignores the transaction completely without logging" }
      ],
      correctIndex: 1,
      explanation: "Due to Atomicity and Write-Ahead Logging (WAL), uncommitted changes from an aborted transaction are discarded and rolled back on restart."
    }
  ]
};

const sqlLesson02: CurriculumItem = {
  id: "item-sql-02-tables-keys-constraints",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Relational Modeling & Schema Foundations",
  modulePosition: 1,
  title: "02. Tables, Data Types, Primary Keys & Foreign Key Constraints",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 02: Tables, Data Types & Primary/Foreign Keys",
  contentDescription: "Master table creation, selecting proper column types (VARCHAR, INT, UUID, TIMESTAMP, BOOLEAN), primary keys for row identification, and foreign keys for relational integrity.",
  codeSnippet: {
    language: "SQL",
    code: "-- Create Users Table\nCREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) NOT NULL UNIQUE,\n  full_name VARCHAR(100) NOT NULL,\n  is_active BOOLEAN DEFAULT true,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Create Orders Table with Foreign Key relation\nCREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),\n  status VARCHAR(50) DEFAULT 'pending',\n  ordered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);"
  },
  sections: [
    {
      title: "2.1 Primary Keys vs Foreign Keys",
      explanation: "A Primary Key (PK) uniquely identifies every individual row in a table. It cannot be null and must be unique. A Foreign Key (FK) is a column in one table that references the Primary Key of another table, enforcing referential integrity so orphaned records cannot exist.",
      bullets: [
        "Primary Key: Typically an auto-incrementing integer (SERIAL) or a randomly generated UUID.",
        "Foreign Key: Enforces that user_id in orders must reference a valid id that actually exists in users.",
        "ON DELETE CASCADE: If a user is deleted, all their related orders are automatically deleted.",
        "ON DELETE RESTRICT: Prevents deletion of a user if related orders still exist."
      ],
      diagram: "+---------------------+            +-------------------------+\n|       USERS         |            |         ORDERS          |\n+---------------------+            +-------------------------+\n| [PK] id (UUID)      |<===========| [FK] user_id (UUID)     |\n|      email (VARCHAR)| 1        * | [PK] id (SERIAL)        |\n|      full_name      |            |      total_amount (DEC) |\n+---------------------+            +-------------------------+"
    },
    {
      title: "2.2 Common SQL Column Data Types",
      explanation: "Choosing the correct data type guarantees data integrity and optimizes memory on disk and in database caches.",
      table: {
        headers: ["Data Type", "Usage", "Example"],
        rows: [
          ["VARCHAR(N)", "Variable length text with max limit N", "VARCHAR(255) for email or title"],
          ["TEXT", "Unbounded variable length text", "Blog post content, code snippets"],
          ["INT / BIGINT", "Whole integers (4 or 8 bytes)", "Quantity, view counts, epoch timestamps"],
          ["NUMERIC(P, S)", "Exact fixed-point decimal", "NUMERIC(10, 2) for financial currencies"],
          ["BOOLEAN", "True or False flags", "is_active, is_verified"],
          ["TIMESTAMPTZ", "Timestamp with timezone offset", "created_at, updated_at"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-sql-02-1",
      prompt: "What two properties must every Primary Key satisfy in an RDBMS?",
      options: [
        { id: "a", label: "Must be uppercase and indexed" },
        { id: "b", label: "Must be unique and cannot contain NULL values" },
        { id: "c", label: "Must contain numbers and letters" },
        { id: "d", label: "Must be encrypted with AES-256" }
      ],
      correctIndex: 1,
      explanation: "A primary key column must be completely unique across all rows and cannot contain null values."
    },
    {
      id: "q-sql-02-2",
      prompt: "Which data type should always be used for monetary values and payment calculations?",
      options: [
        { id: "a", label: "FLOAT" },
        { id: "b", label: "DOUBLE PRECISION" },
        { id: "c", label: "NUMERIC(10, 2) or DECIMAL" },
        { id: "d", label: "VARCHAR(20)" }
      ],
      correctIndex: 2,
      explanation: "FLOAT and DOUBLE are floating-point types subject to binary rounding errors (e.g., 0.1 + 0.2 = 0.30000000000000004). NUMERIC/DECIMAL stores exact fixed-point values."
    },
    {
      id: "q-sql-02-3",
      prompt: "What does 'ON DELETE CASCADE' do on a Foreign Key definition?",
      options: [
        { id: "a", label: "Prevents the parent record from ever being deleted" },
        { id: "b", label: "Automatically deletes child records when the referenced parent record is deleted" },
        { id: "c", label: "Deletes the entire table structure" },
        { id: "d", label: "Sends an email alert to the administrator" }
      ],
      correctIndex: 1,
      explanation: "ON DELETE CASCADE ensures that when a parent row (e.g., a user) is removed, all child rows linked by foreign key (e.g., their orders) are automatically cleaned up."
    },
    {
      id: "q-sql-02-4",
      prompt: "What is the purpose of the 'UNIQUE' constraint on a column like 'email'?",
      options: [
        { id: "a", label: "Ensures no two rows can have identical values in that column" },
        { id: "b", label: "Changes all letters to uppercase" },
        { id: "c", label: "Enforces that the email contains an @ symbol" },
        { id: "d", label: "Encrypts the email before storage" }
      ],
      correctIndex: 0,
      explanation: "The UNIQUE constraint guarantees that every value in that column is distinct across all rows in the table."
    },
    {
      id: "q-sql-02-5",
      prompt: "Which constraint ensures that 'total_amount >= 0' on an orders table?",
      options: [
        { id: "a", label: "CHECK constraint" },
        { id: "b", label: "FOREIGN KEY constraint" },
        { id: "c", label: "NOT NULL constraint" },
        { id: "d", label: "DEFAULT constraint" }
      ],
      correctIndex: 0,
      explanation: "A CHECK constraint specifies a boolean condition that every inserted or updated row must satisfy."
    },
    {
      id: "q-sql-02-6",
      prompt: "What is a UUID?",
      options: [
        { id: "a", label: "Uniform User Identifier" },
        { id: "b", label: "Universally Unique Identifier (128-bit number)" },
        { id: "c", label: "Uncompressed Ultra Image Data" },
        { id: "d", label: "Universal Unix Interface Driver" }
      ],
      correctIndex: 1,
      explanation: "A UUID is a 128-bit value that is mathematically virtually guaranteed to be unique across all systems without needing a centralized auto-increment coordinator."
    },
    {
      id: "q-sql-02-7",
      prompt: "What does the 'NOT NULL' constraint enforce on a column?",
      options: [
        { id: "a", label: "The column must have a default value of zero" },
        { id: "b", label: "The column cannot be left empty or without a value during insertion" },
        { id: "c", label: "The column can only accept negative numbers" },
        { id: "d", label: "The column value is masked from public view" }
      ],
      correctIndex: 1,
      explanation: "NOT NULL ensures that an explicit or default value must be provided for the column; missing or NULL values will reject the transaction."
    },
    {
      id: "q-sql-02-8",
      prompt: "Why is 'TIMESTAMPTZ' preferred over plain 'TIMESTAMP' in production systems?",
      options: [
        { id: "a", label: "It takes up half the disk space" },
        { id: "b", label: "It stores UTC time and converts automatically to client time zones" },
        { id: "c", label: "It only stores years, not minutes" },
        { id: "d", label: "It prevents dates before the year 2000" }
      ],
      correctIndex: 1,
      explanation: "TIMESTAMPTZ (timestamp with time zone) standardizes dates in UTC internally and converts to local offsets cleanly, avoiding time-drift bugs."
    },
    {
      id: "q-sql-02-9",
      prompt: "What happens if you try to insert an order with a 'user_id' that does not exist in the 'users' table?",
      options: [
        { id: "a", label: "The database automatically creates a new dummy user" },
        { id: "b", label: "The database throws a Foreign Key violation error and rejects the insert" },
        { id: "c", label: "The user_id is changed to 0" },
        { id: "d", label: "The order is saved in a temporary quarantine table" }
      ],
      correctIndex: 1,
      explanation: "Foreign key constraints strictly enforce referential integrity. Inserting a foreign key that does not exist in the referenced parent table results in an immediate error."
    },
    {
      id: "q-sql-02-10",
      prompt: "What SQL keyword provides a fallback value when an insert statement does not specify that column?",
      options: [
        { id: "a", label: "FALLBACK" },
        { id: "b", label: "DEFAULT" },
        { id: "c", label: "AUTO" },
        { id: "d", label: "INITIAL" }
      ],
      correctIndex: 1,
      explanation: "The DEFAULT clause (e.g., DEFAULT NOW(), DEFAULT 'pending', DEFAULT true) automatically assigns a value if none is provided in the INSERT statement."
    }
  ]
};

const sqlLesson03: CurriculumItem = {
  id: "item-sql-03-normalization",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Relational Modeling & Schema Foundations",
  modulePosition: 1,
  title: "03. Database Normalization (1NF, 2NF, 3NF) & Relationship Types",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 03: Normalization & Relationship Types",
  contentDescription: "Learn how to structure databases to eliminate data redundancy, prevent update anomalies, apply 1NF, 2NF, and 3NF, and model 1-to-1, 1-to-many, and many-to-many relationships.",
  codeSnippet: {
    language: "SQL",
    code: "-- Modeling a Many-to-Many Relationship with a Junction / Join Table\nCREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE courses (\n  id SERIAL PRIMARY KEY,\n  title VARCHAR(150) NOT NULL\n);\n\n-- Junction Table: enrollments\nCREATE TABLE enrollments (\n  student_id INT REFERENCES students(id) ON DELETE CASCADE,\n  course_id INT REFERENCES courses(id) ON DELETE CASCADE,\n  enrolled_at TIMESTAMP DEFAULT NOW(),\n  PRIMARY KEY (student_id, course_id) -- Composite Primary Key\n);"
  },
  sections: [
    {
      title: "3.1 The Three Normal Forms (1NF, 2NF, 3NF)",
      explanation: "Normalization is the systematic process of organizing data to reduce redundancy and avoid insertion, deletion, and update anomalies.",
      bullets: [
        "1NF (First Normal Form): Every cell contains atomic (indivisible) values. No multi-valued lists (like 'tag1, tag2, tag3') in a single column.",
        "2NF (Second Normal Form): Must be in 1NF, and all non-key attributes must depend on the FULL primary key (no partial dependencies on composite keys).",
        "3NF (Third Normal Form): Must be in 2NF, and no non-key attribute can depend on another non-key attribute (no transitive dependencies like zip_code -> city)."
      ],
      diagram: "+-------------------------------------------------------------+\n|                   NORMALIZATION PROGRESSION                 |\n+-------------------------------------------------------------+\n| Unnormalized Table  | Repeated columns, comma lists         |\n| 1NF (Atomic Data)   | Single value per cell, primary key    |\n| 2NF (Full Key)      | Eliminates partial key dependencies   |\n| 3NF (Transitive)    | Eliminates non-key -> non-key links   |\n+-------------------------------------------------------------+"
    },
    {
      title: "3.2 The Three Fundamental Database Relationship Types",
      explanation: "Real-world entities interact in three core cardinality patterns:",
      table: {
        headers: ["Relationship", "Definition", "Implementation"],
        rows: [
          ["One-to-One (1:1)", "A user has exactly one profile", "Foreign key on profile table with UNIQUE constraint"],
          ["One-to-Many (1:N)", "A customer has multiple orders", "Foreign key on orders table referencing customer id"],
          ["Many-to-Many (M:N)", "Students enroll in multiple courses", "Junction / Join table (enrollments) with composite PK"]
        ]
      }
    }
  ],
  questions: [
    {
      id: "q-sql-03-1",
      prompt: "What is required for a database table to be in First Normal Form (1NF)?",
      options: [
        { id: "a", label: "Every table must have at least 10 columns" },
        { id: "b", label: "Each cell must contain atomic values and each row must be uniquely identifiable" },
        { id: "c", label: "Tables cannot contain foreign keys" },
        { id: "d", label: "All columns must use numeric types" }
      ],
      correctIndex: 1,
      explanation: "1NF requires atomic (single, indivisible) values in every cell (no comma-separated lists) and a designated primary key."
    },
    {
      id: "q-sql-03-2",
      prompt: "How is a Many-to-Many (M:N) relationship modeled in a relational database?",
      options: [
        { id: "a", label: "By putting arrays in both tables" },
        { id: "b", label: "Using a Junction / Join table with foreign keys referencing both entities" },
        { id: "c", label: "By combining both entities into one single gigantic table" },
        { id: "d", label: "Many-to-many relationships are impossible in SQL" }
      ],
      correctIndex: 1,
      explanation: "A junction (or join/pivot) table holds foreign keys to both parent tables, allowing many rows on either side to connect."
    },
    {
      id: "q-sql-03-3",
      prompt: "What does Third Normal Form (3NF) eliminate?",
      options: [
        { id: "a", label: "Primary keys" },
        { id: "b", label: "Transitive dependencies (non-key columns depending on other non-key columns)" },
        { id: "c", label: "Foreign keys" },
        { id: "d", label: "Index structures" }
      ],
      correctIndex: 1,
      explanation: "3NF eliminates transitive dependencies where column A determines column B, and column B determines column C (e.g. employee -> zip -> city)."
    },
    {
      id: "q-sql-03-4",
      prompt: "What is an update anomaly caused by unnormalized data?",
      options: [
        { id: "a", label: "The database software refuses to update to a newer version" },
        { id: "b", label: "Changing customer address in one row leaves conflicting outdated addresses in other rows" },
        { id: "c", label: "Columns are renamed automatically" },
        { id: "d", label: "Queries take longer on weekends" }
      ],
      correctIndex: 1,
      explanation: "In duplicate unnormalized rows, updating a customer's address in one purchase order but failing to update another creates inconsistent, conflicting data."
    },
    {
      id: "q-sql-03-5",
      prompt: "What is a Composite Primary Key?",
      options: [
        { id: "a", label: "A primary key made from high-strength plastic" },
        { id: "b", label: "A primary key made up of two or more columns combined together" },
        { id: "c", label: "A key that changes daily" },
        { id: "d", label: "A key that is stored in an external file" }
      ],
      correctIndex: 1,
      explanation: "A composite primary key combines multiple columns (e.g., PRIMARY KEY (student_id, course_id)) to ensure the pair is unique."
    },
    {
      id: "q-sql-03-6",
      prompt: "How do you enforce a One-to-One (1:1) relationship between Users and Profiles?",
      options: [
        { id: "a", label: "By creating two tables with the exact same name" },
        { id: "b", label: "By adding a Foreign Key on Profiles referencing Users with a UNIQUE constraint" },
        { id: "c", label: "By using an array of user IDs" },
        { id: "d", label: "One-to-one relationships require three tables" }
      ],
      correctIndex: 1,
      explanation: "Adding a UNIQUE constraint to the Foreign Key column (e.g., user_id in profiles) guarantees that each user can only link to at most one profile."
    },
    {
      id: "q-sql-03-7",
      prompt: "What is a deletion anomaly?",
      options: [
        { id: "a", label: "Accidentally deleting the primary key value" },
        { id: "b", label: "Deleting one piece of data causes unintentional loss of other unrelated data" },
        { id: "c", label: "A deletion takes longer than 5 seconds" },
        { id: "d", label: "The trash can icon disappears" }
      ],
      correctIndex: 1,
      explanation: "If student and course info are in one table, deleting the last enrolled student accidentally deletes the course information from existence too."
    },
    {
      id: "q-sql-03-8",
      prompt: "In Second Normal Form (2NF), what kind of dependencies are prohibited?",
      options: [
        { id: "a", label: "Total dependencies" },
        { id: "b", label: "Partial dependencies on a composite primary key" },
        { id: "c", label: "Internet dependencies" },
        { id: "d", label: "Cross-database connections" }
      ],
      correctIndex: 1,
      explanation: "2NF requires that every non-key column depends on the WHOLE primary key, not just a portion of a composite primary key."
    },
    {
      id: "q-sql-03-9",
      prompt: "What is the primary benefit of normalized relational design?",
      options: [
        { id: "a", label: "Takes up zero disk space" },
        { id: "b", label: "Prevents data duplication, guarantees consistency, and simplifies data updates" },
        { id: "c", label: "Removes the need for SQL queries" },
        { id: "d", label: "Allows web pages to load without CSS" }
      ],
      correctIndex: 1,
      explanation: "Normalization minimizes redundancy, ensuring a piece of data exists in exactly one canonical place, preventing desynchronization."
    },
    {
      id: "q-sql-03-10",
      prompt: "When might an engineering team deliberately denormalize part of a database?",
      options: [
        { id: "a", label: "When they do not know how to write SQL" },
        { id: "b", label: "To speed up high-frequency read queries in analytical reporting (OLAP)" },
        { id: "c", label: "To make the database look more complex" },
        { id: "d", label: "When the database reaches 100 rows" }
      ],
      correctIndex: 1,
      explanation: "In heavy read/analytics databases (data warehouses), controlled denormalization avoids costly multi-table joins to maximize query speed."
    }
  ]
};

// Module 1 MCQs and Assessment:
const sqlModule01Quiz: CurriculumItem = {
  id: "item-sql-mod1-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Relational Modeling & Schema Foundations",
  modulePosition: 1,
  title: "Module 1 Knowledge Check: Database Architecture & Schema Design",
  duration: "25 mins",
  type: "quiz",
  position: 4,
  isModuleQuiz: true,
  contentHeading: "Module 1 Assessment: Relational Architecture & Normalization",
  contentDescription: "Evaluate your comprehension of database architecture, ACID properties, column data types, constraints, and 1NF/2NF/3NF normalization.",
  questions: [
    ...sqlLesson01.questions!.slice(0, 5),
    ...sqlLesson02.questions!.slice(0, 5)
  ]
};

const sqlModule01Assessment: CurriculumItem = {
  id: "item-sql-mod1-assessment",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-01-foundations",
  moduleTitle: "Module 1: Relational Modeling & Schema Foundations",
  modulePosition: 1,
  title: "Module 1 Assessment: Design an E-Commerce Relational Schema",
  duration: "45 mins",
  type: "assignment",
  position: 5,
  isModuleAssessment: true,
  contentHeading: "Module 1 Practical Lab: Production E-Commerce Schema",
  contentDescription: "Write standard DDL SQL statements to model a complete multi-table e-commerce database with users, products, categories, orders, and order_items.",
  assignmentPrompt: {
    instructions: "Write the complete SQL DDL schema for an e-commerce platform meeting 3NF normalization:\n1. users (id UUID PK, email UNIQUE NOT NULL, password_hash, full_name, created_at)\n2. categories (id SERIAL PK, name VARCHAR UNIQUE, slug VARCHAR UNIQUE)\n3. products (id SERIAL PK, category_id FK, title, price NUMERIC(10,2) CHECK > 0, stock_quantity INT)\n4. orders (id SERIAL PK, user_id FK, status, total_amount, created_at)\n5. order_items (order_id FK, product_id FK, quantity INT CHECK > 0, unit_price NUMERIC, PRIMARY KEY(order_id, product_id))",
    deliverables: [
      "Clean CREATE TABLE DDL scripts with correct primary keys and data types",
      "Foreign key constraints with appropriate ON DELETE policies",
      "CHECK constraints enforcing valid quantities and positive prices",
      "Composite primary key on junction table order_items"
    ]
  }
};

const sqlModule01: CurriculumSubModule = {
  id: "module-sql-01-foundations",
  subCourseId: "mod-database-sql",
  title: "Module 1: Relational Modeling & Schema Foundations",
  description: "Database architectures, ACID transactions, data types, primary & foreign keys, constraints, and 3NF normalization.",
  position: 1,
  duration: "2 hours, 10 mins",
  lessons: [sqlLesson01, sqlLesson02, sqlLesson03],
  moduleQuiz: sqlModule01Quiz,
  moduleAssessment: sqlModule01Assessment,
  items: [sqlLesson01, sqlLesson02, sqlLesson03, sqlModule01Quiz, sqlModule01Assessment]
};

// --- MODULE 2: SQL QUERYING, JOINS & PERFORMANCE ---

const sqlLesson04: CurriculumItem = {
  id: "item-sql-04-crud-queries",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Module 2: SQL Querying, Joins & Optimization",
  modulePosition: 2,
  title: "04. SQL CRUD Operations — SELECT, INSERT, UPDATE, DELETE",
  duration: "25 mins",
  type: "cheatsheet",
  position: 6,
  contentHeading: "Lesson 04: SQL CRUD Operations (SELECT, INSERT, UPDATE, DELETE)",
  contentDescription: "Master the foundational Data Manipulation Language (DML) commands to query, insert, modify, and delete records safely with conditional WHERE clauses.",
  codeSnippet: {
    language: "SQL",
    code: "-- 1. INSERT new records\nINSERT INTO products (title, price, stock_quantity)\nVALUES ('Mechanical Keyboard', 89.99, 45)\nRETURNING id, title, created_at;\n\n-- 2. SELECT with filtering\nSELECT id, title, price\nFROM products\nWHERE price > 50.00 AND stock_quantity > 0\nORDER BY price DESC\nLIMIT 10;\n\n-- 3. UPDATE safely with WHERE\nUPDATE products\nSET stock_quantity = stock_quantity - 1\nWHERE id = 1 AND stock_quantity > 0;\n\n-- 4. DELETE safely with WHERE\nDELETE FROM products\nWHERE id = 99;"
  },
  sections: [
    {
      title: "4.1 The Importance of the WHERE Clause",
      explanation: "Executing an UPDATE or DELETE statement without a WHERE clause will modify or delete EVERY SINGLE ROW in the entire table. In production environments, always test your condition with a SELECT query first before executing destructive updates or deletions.",
      bullets: [
        "UPDATE without WHERE modifies every record in the table.",
        "DELETE without WHERE deletes all rows in the table (DML).",
        "TRUNCATE TABLE quickly removes all rows by resetting the table storage (DDL).",
        "RETURNING clause in PostgreSQL returns the newly inserted or modified row immediately."
      ]
    }
  ],
  questions: [
    {
      id: "q-sql-04-1",
      prompt: "What happens if you execute: 'DELETE FROM users;' without a WHERE clause?",
      options: [
        { id: "a", label: "Only the first user is deleted" },
        { id: "b", label: "Every row in the entire users table is permanently deleted" },
        { id: "c", label: "The database prompts with a confirmation dialog" },
        { id: "d", label: "The query errors with a syntax error" }
      ],
      correctIndex: 1,
      explanation: "Without a WHERE clause filter, DELETE removes every row in the target table."
    },
    {
      id: "q-sql-04-2",
      prompt: "Which SQL clause limits the maximum number of rows returned by a query?",
      options: [
        { id: "a", label: "STOP" },
        { id: "b", label: "LIMIT" },
        { id: "c", label: "MAX" },
        { id: "d", label: "CEIL" }
      ],
      correctIndex: 1,
      explanation: "The LIMIT clause (e.g. LIMIT 10) caps the number of records returned to the client."
    },
    {
      id: "q-sql-04-3",
      prompt: "In PostgreSQL, which clause allows you to return newly generated primary keys upon INSERT?",
      options: [
        { id: "a", label: "OUTPUT ID" },
        { id: "b", label: "RETURNING id" },
        { id: "c", label: "GET LAST ID" },
        { id: "d", label: "ECHO ID" }
      ],
      correctIndex: 1,
      explanation: "'INSERT INTO ... VALUES (...) RETURNING id;' returns the newly created ID in the response packet."
    },
    {
      id: "q-sql-04-4",
      prompt: "How do you update multiple columns in a single SQL statement?",
      options: [
        { id: "a", label: "UPDATE users SET name = 'Hari' AND email = 'h@b.com'" },
        { id: "b", label: "UPDATE users SET name = 'Hari', email = 'h@b.com' WHERE id = 1;" },
        { id: "c", label: "UPDATE users SET name = 'Hari' THEN email = 'h@b.com'" },
        { id: "d", label: "You must run separate UPDATE statements for each column" }
      ],
      correctIndex: 1,
      explanation: "Multiple column updates in a SET clause are separated by commas (',')."
    },
    {
      id: "q-sql-04-5",
      prompt: "Which command sorts query results in descending order?",
      options: [
        { id: "a", label: "ORDER BY price REVERSE" },
        { id: "b", label: "ORDER BY price DESC" },
        { id: "c", label: "SORT BY price DOWN" },
        { id: "d", label: "ARRANGE price DESCENDING" }
      ],
      correctIndex: 1,
      explanation: "ORDER BY <column> DESC sorts from highest to lowest or Z to A."
    },
    {
      id: "q-sql-04-6",
      prompt: "What is the difference between 'DELETE FROM table' and 'TRUNCATE TABLE'?",
      options: [
        { id: "a", label: "There is no difference" },
        { id: "b", label: "TRUNCATE is a fast DDL command that deallocates storage pages directly" },
        { id: "c", label: "DELETE is faster than TRUNCATE" },
        { id: "d", label: "TRUNCATE can be filtered with a WHERE clause" }
      ],
      correctIndex: 1,
      explanation: "TRUNCATE quickly wipes the table data at the storage level, whereas DELETE scans and logs individual row deletions."
    },
    {
      id: "q-sql-04-7",
      prompt: "Which keyword is used to eliminate duplicate rows from a query result?",
      options: [
        { id: "a", label: "UNIQUE" },
        { id: "b", label: "DISTINCT" },
        { id: "c", label: "DIFFERENT" },
        { id: "d", label: "SINGLE" }
      ],
      correctIndex: 1,
      explanation: "SELECT DISTINCT <column> filters out duplicate values from the output."
    },
    {
      id: "q-sql-04-8",
      prompt: "How do you search for titles starting with the word 'Web' in SQL?",
      options: [
        { id: "a", label: "WHERE title = 'Web*'" },
        { id: "b", label: "WHERE title LIKE 'Web%'" },
        { id: "c", label: "WHERE title CONTAINS 'Web'" },
        { id: "d", label: "WHERE title HAS 'Web'" }
      ],
      correctIndex: 1,
      explanation: "The LIKE operator with wildcard '%' matches any sequence of characters (e.g. 'Web%' matches 'Web Design', 'Website')."
    },
    {
      id: "q-sql-04-9",
      prompt: "In PostgreSQL, which operator performs case-insensitive pattern matching?",
      options: [
        { id: "a", label: "LIKE" },
        { id: "b", label: "ILIKE" },
        { id: "c", label: "NOCASE" },
        { id: "d", label: "SEARCH" }
      ],
      correctIndex: 1,
      explanation: "ILIKE in PostgreSQL is the case-insensitive equivalent of the standard LIKE operator."
    },
    {
      id: "q-sql-04-10",
      prompt: "How do you test if a column value is empty or unassigned in SQL?",
      options: [
        { id: "a", label: "WHERE phone == NULL" },
        { id: "b", label: "WHERE phone IS NULL" },
        { id: "c", label: "WHERE phone = undefined" },
        { id: "d", label: "WHERE phone.isEmpty()" }
      ],
      correctIndex: 1,
      explanation: "In SQL, NULL represents the absence of a value; equality checks must use 'IS NULL' or 'IS NOT NULL', not '='."
    }
  ]
};

const sqlLesson05: CurriculumItem = {
  id: "item-sql-05-aggregates-group-by",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Module 2: SQL Querying, Joins & Optimization",
  modulePosition: 2,
  title: "05. Aggregate Functions, GROUP BY & The HAVING Clause",
  duration: "30 mins",
  type: "cheatsheet",
  position: 7,
  contentHeading: "Lesson 05: Aggregate Functions, GROUP BY & HAVING",
  contentDescription: "Master analytical calculations using COUNT, SUM, AVG, MIN, and MAX, group records by common attributes, and filter grouped summaries with HAVING.",
  codeSnippet: {
    language: "SQL",
    code: "-- Calculate order volume and total revenue per user\nSELECT \n  user_id,\n  COUNT(*) AS total_orders,\n  SUM(total_amount) AS lifetime_value,\n  ROUND(AVG(total_amount), 2) AS average_order_value\nFROM orders\nWHERE status = 'completed'\nGROUP BY user_id\nHAVING SUM(total_amount) > 500.00\nORDER BY lifetime_value DESC;"
  },
  sections: [
    {
      title: "5.1 WHERE vs HAVING: The Key Difference",
      explanation: "A common beginner confusion is when to use WHERE vs HAVING. WHERE filters individual rows BEFORE they are grouped. HAVING filters aggregated group results AFTER the GROUP BY computation occurs.",
      bullets: [
        "WHERE: Filters raw rows (e.g., WHERE status = 'completed'). Cannot use aggregate functions like SUM() or COUNT().",
        "GROUP BY: Collapses multiple rows sharing identical values into summary groups.",
        "HAVING: Filters the resulting groups (e.g., HAVING COUNT(*) > 5 or HAVING SUM(amount) > 1000)."
      ]
    }
  ],
  questions: [
    {
      id: "q-sql-05-1",
      prompt: "What is the critical difference between the WHERE clause and the HAVING clause?",
      options: [
        { id: "a", label: "WHERE is for numbers; HAVING is for text strings" },
        { id: "b", label: "WHERE filters rows before grouping; HAVING filters aggregated groups" },
        { id: "c", label: "WHERE is for PostgreSQL; HAVING is only for MySQL" },
        { id: "d", label: "HAVING cannot be used with GROUP BY" }
      ],
      correctIndex: 1,
      explanation: "WHERE filters individual rows before grouping; HAVING filters groups created by GROUP BY based on aggregate conditions."
    },
    {
      id: "q-sql-05-2",
      prompt: "Which aggregate function calculates the total sum of numerical values in a column?",
      options: [
        { id: "a", label: "TOTAL()" },
        { id: "b", label: "SUM()" },
        { id: "c", label: "ADD()" },
        { id: "d", label: "COUNT()" }
      ],
      correctIndex: 1,
      explanation: "SUM() calculates the mathematical total of all non-null numbers in that column."
    },
    {
      id: "q-sql-05-3",
      prompt: "What does 'COUNT(*)' return?",
      options: [
        { id: "a", label: "The sum of all numbers" },
        { id: "b", label: "The total number of rows matching the query criteria" },
        { id: "c", label: "The multiplication of all row IDs" },
        { id: "d", label: "The count of columns in the table" }
      ],
      correctIndex: 1,
      explanation: "COUNT(*) counts the total number of rows returned, including rows with NULL values in specific columns."
    },
    {
      id: "q-sql-05-4",
      prompt: "If you SELECT category_id, AVG(price) FROM products, what clause is required?",
      options: [
        { id: "a", label: "ORDER BY price" },
        { id: "b", label: "GROUP BY category_id" },
        { id: "c", label: "HAVING price > 0" },
        { id: "d", label: "WHERE category_id IS NOT NULL" }
      ],
      correctIndex: 1,
      explanation: "Any column in the SELECT list that is not part of an aggregate function must appear in the GROUP BY clause."
    },
    {
      id: "q-sql-05-5",
      prompt: "Which aggregate function returns the highest value in a column?",
      options: [
        { id: "a", label: "TOP()" },
        { id: "b", label: "MAX()" },
        { id: "c", label: "HIGH()" },
        { id: "d", label: "PEAK()" }
      ],
      correctIndex: 1,
      explanation: "MAX() returns the maximum value found in the specified column."
    },
    {
      id: "q-sql-05-6",
      prompt: "What does 'COUNT(email)' do if 3 out of 10 users have a NULL email?",
      options: [
        { id: "a", label: "Returns 10" },
        { id: "b", label: "Returns 7" },
        { id: "c", label: "Throws an error" },
        { id: "d", label: "Returns NULL" }
      ],
      correctIndex: 1,
      explanation: "COUNT(column_name) ignores NULL values, counting only rows where the column is NOT NULL."
    },
    {
      id: "q-sql-05-7",
      prompt: "How do you find categories with more than 10 products?",
      options: [
        { id: "a", label: "GROUP BY category_id WHERE COUNT(*) > 10" },
        { id: "b", label: "GROUP BY category_id HAVING COUNT(*) > 10" },
        { id: "c", label: "WHERE COUNT(category_id) > 10" },
        { id: "d", label: "ORDER BY category_id LIMIT 10" }
      ],
      correctIndex: 1,
      explanation: "Filtering by an aggregate (COUNT(*) > 10) must be placed in the HAVING clause after GROUP BY."
    },
    {
      id: "q-sql-05-8",
      prompt: "What is the logical order of execution for SQL query clauses?",
      options: [
        { id: "a", label: "SELECT -> FROM -> WHERE -> GROUP BY" },
        { id: "b", label: "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT" },
        { id: "c", label: "LIMIT -> ORDER BY -> SELECT -> FROM" },
        { id: "d", label: "WHERE -> FROM -> HAVING -> SELECT" }
      ],
      correctIndex: 1,
      explanation: "The database engine first identifies tables (FROM), filters rows (WHERE), aggregates (GROUP BY), filters aggregates (HAVING), selects expressions (SELECT), sorts (ORDER BY), and limits (LIMIT)."
    },
    {
      id: "q-sql-05-9",
      prompt: "Which function calculates the mean average of a column in SQL?",
      options: [
        { id: "a", label: "MEAN()" },
        { id: "b", label: "AVG()" },
        { id: "c", label: "MEDIAN()" },
        { id: "d", label: "SUM_DIV()" }
      ],
      correctIndex: 1,
      explanation: "AVG() computes the arithmetic mean of all non-null values in the column."
    },
    {
      id: "q-sql-05-10",
      prompt: "Can you use aliases defined in the SELECT clause directly in a WHERE clause?",
      options: [
        { id: "a", label: "Yes, always" },
        { id: "b", label: "No, because the WHERE clause executes before the SELECT clause" },
        { id: "c", label: "Only if the alias starts with a capital letter" },
        { id: "d", label: "Only for numeric columns" }
      ],
      correctIndex: 1,
      explanation: "Because WHERE executes before SELECT evaluates column aliases, the WHERE clause does not recognize SELECT aliases."
    }
  ]
};

const sqlLesson06: CurriculumItem = {
  id: "item-sql-06-joins-masterclass",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Module 2: SQL Querying, Joins & Optimization",
  modulePosition: 2,
  title: "06. SQL Joins Masterclass — INNER, LEFT, RIGHT & FULL OUTER Joins",
  duration: "30 mins",
  type: "cheatsheet",
  position: 8,
  contentHeading: "Lesson 06: SQL Joins Masterclass (INNER, LEFT, RIGHT, FULL OUTER)",
  contentDescription: "Understand relational multi-table queries: combine data from related tables using Venn diagram logic, handle NULLs on unmatched records, and write performant join conditions.",
  codeSnippet: {
    language: "SQL",
    code: "-- 1. INNER JOIN: returns only users who have placed orders\nSELECT u.full_name, o.id AS order_id, o.total_amount\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- 2. LEFT JOIN: returns ALL users, including those with 0 orders\nSELECT u.full_name, COALESCE(COUNT(o.id), 0) AS total_orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.full_name;\n\n-- 3. Multi-table Join: User -> Orders -> OrderItems -> Products\nSELECT u.email, p.title AS product_name, oi.quantity\nFROM users u\nJOIN orders o ON u.id = o.user_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id;"
  },
  sections: [
    {
      title: "6.1 Visual Comparison of SQL Join Types",
      explanation: "Joins combine columns from one or more tables based on a related column between them.",
      table: {
        headers: ["Join Type", "Behavior", "When to Use"],
        rows: [
          ["INNER JOIN", "Returns rows when there is a match in BOTH tables", "Active orders with active user accounts"],
          ["LEFT JOIN", "Returns ALL rows from Left table, matched rows from Right table (NULL if no match)", "User list showing who has and hasn't placed orders"],
          ["RIGHT JOIN", "Returns ALL rows from Right table, matched from Left table", "Rarely used; usually rewritten as LEFT JOIN"],
          ["FULL OUTER JOIN", "Returns all rows from both tables, filling NULLs where unmatched", "Auditing and synchronizing data between systems"]
        ]
      },
      diagram: "   INNER JOIN             LEFT JOIN            FULL OUTER JOIN\n   +-----+-----+        +=====+-----+        +=====+=====+\n   |     |X X X|        |     |X X X|        |X X X|X X X|\n   |  A  |X X X| B      |  A  |X X X| B      |X X X|X X X|\n   |     |X X X|        |=====|X X X|        |X X X|X X X|\n   +-----+-----+        +=====+-----+        +=====+=====+"
    }
  ],
  questions: [
    {
      id: "q-sql-06-1",
      prompt: "What will a LEFT JOIN return if a customer in the left table has zero orders in the right table?",
      options: [
        { id: "a", label: "The customer is omitted from the result set" },
        { id: "b", label: "The customer is returned with NULL in all the orders columns" },
        { id: "c", label: "An error occurs" },
        { id: "d", label: "A blank order with ID 0 is created automatically" }
      ],
      correctIndex: 1,
      explanation: "A LEFT JOIN preserves every row from the left table; if no matching row exists in the right table, right-side columns are filled with NULL."
    },
    {
      id: "q-sql-06-2",
      prompt: "Which join returns ONLY rows where the join condition matches in BOTH tables?",
      options: [
        { id: "a", label: "LEFT JOIN" },
        { id: "b", label: "INNER JOIN" },
        { id: "c", label: "CROSS JOIN" },
        { id: "d", label: "FULL OUTER JOIN" }
      ],
      correctIndex: 1,
      explanation: "INNER JOIN excludes any record that does not find a corresponding match in both tables."
    },
    {
      id: "q-sql-06-3",
      prompt: "How do you find all users who have NEVER placed an order using a join?",
      options: [
        { id: "a", label: "INNER JOIN orders ON users.id = orders.user_id WHERE orders.id = 0" },
        { id: "b", label: "LEFT JOIN orders ON users.id = orders.user_id WHERE orders.id IS NULL" },
        { id: "c", label: "CROSS JOIN orders" },
        { id: "d", label: "RIGHT JOIN users" }
      ],
      correctIndex: 1,
      explanation: "LEFT JOIN paired with 'WHERE orders.id IS NULL' is the canonical SQL anti-join pattern to find unmatched records."
    },
    {
      id: "q-sql-06-4",
      prompt: "What does a CROSS JOIN produce?",
      options: [
        { id: "a", label: "Only the intersecting rows" },
        { id: "b", label: "The Cartesian product: every row of table A paired with every row of table B" },
        { id: "c", label: "A single combined column" },
        { id: "d", label: "A table sorted in cross-order" }
      ],
      correctIndex: 1,
      explanation: "A CROSS JOIN multiplies rows without condition: 10 rows in A and 5 rows in B produces 50 resulting rows."
    },
    {
      id: "q-sql-06-5",
      prompt: "What SQL function substitutes a fallback value if a column is NULL?",
      options: [
        { id: "a", label: "IFNULL / COALESCE" },
        { id: "b", label: "DEFAULT_TO" },
        { id: "c", label: "FALLBACK" },
        { id: "d", label: "REPLACE_NULL" }
      ],
      correctIndex: 0,
      explanation: "COALESCE(column, fallback) returns the first non-null expression in its argument list."
    },
    {
      id: "q-sql-06-6",
      prompt: "What is a table alias in a SQL join query?",
      options: [
        { id: "a", label: "A duplicate copy of the table stored in memory" },
        { id: "b", label: "A temporary shorthand name (e.g., 'FROM users u') for brevity and disambiguation" },
        { id: "c", label: "A secret password for the table" },
        { id: "d", label: "A permanent column rename" }
      ],
      correctIndex: 1,
      explanation: "Aliases like 'FROM users u' provide a concise prefix to distinguish columns like u.id from o.id."
    },
    {
      id: "q-sql-06-7",
      prompt: "What happens if you join two tables without specifying an 'ON' condition?",
      options: [
        { id: "a", label: "The database matches by column name automatically" },
        { id: "b", label: "It results in a syntax error or an unintended Cartesian product (CROSS JOIN)" },
        { id: "c", label: "Only 1 row is returned" },
        { id: "d", label: "The query deletes both tables" }
      ],
      correctIndex: 1,
      explanation: "Without an ON condition, the query errors or performs an expensive Cartesian product pairing every row with every other row."
    },
    {
      id: "q-sql-06-8",
      prompt: "Can you join more than two tables in a single SQL query?",
      options: [
        { id: "a", label: "No, SQL only permits 2 tables per query" },
        { id: "b", label: "Yes, you can chain multiple JOIN clauses sequentially" },
        { id: "c", label: "Only if all tables have identical column names" },
        { id: "d", label: "Only on 64-bit operating systems" }
      ],
      correctIndex: 1,
      explanation: "You can chain many joins (e.g., users -> orders -> order_items -> products) to traverse relational graphs."
    },
    {
      id: "q-sql-06-9",
      prompt: "In a FULL OUTER JOIN between Table A and Table B, which rows are preserved?",
      options: [
        { id: "a", label: "Only matched rows" },
        { id: "b", label: "All rows from Table A and all rows from Table B" },
        { id: "c", label: "Only rows with primary keys greater than 100" },
        { id: "d", label: "Only rows with non-null foreign keys" }
      ],
      correctIndex: 1,
      explanation: "FULL OUTER JOIN retains all records from both sides, matching where possible and injecting NULLs where no pair exists."
    },
    {
      id: "q-sql-06-10",
      prompt: "What is a self-join?",
      options: [
        { id: "a", label: "A query that connects to your local computer" },
        { id: "b", label: "A regular join where a table is joined with itself (e.g. employee -> manager_id)" },
        { id: "c", label: "A join that runs without human intervention" },
        { id: "d", label: "A join between two databases" }
      ],
      correctIndex: 1,
      explanation: "A self-join queries a table against itself (using different aliases) to model hierarchical relationships like employee -> manager or category -> parent_category."
    }
  ]
};

const sqlLesson07: CurriculumItem = {
  id: "item-sql-07-indexes-performance",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Module 2: SQL Querying, Joins & Optimization",
  modulePosition: 2,
  title: "07. Subqueries, Views, Indexes & Query Optimization",
  duration: "30 mins",
  type: "cheatsheet",
  position: 9,
  contentHeading: "Lesson 07: Subqueries, Views, Indexes & Optimization",
  contentDescription: "Understand query execution plans (EXPLAIN ANALYZE), B-Tree indexes for fast O(log N) lookups, Common Table Expressions (WITH queries), and creating reusable Views.",
  codeSnippet: {
    language: "SQL",
    code: "-- 1. Create a B-Tree index on foreign key or search column\nCREATE INDEX idx_orders_user_id ON orders(user_id);\nCREATE INDEX idx_users_email ON users(email);\n\n-- 2. Inspect query execution plan\nEXPLAIN ANALYZE\nSELECT * FROM orders WHERE user_id = 'e2b34a6c-4b5d-4f1e-8a2b-9c3d4e5f6a7b';\n\n-- 3. Common Table Expression (CTE)\nWITH HighValueCustomers AS (\n  SELECT user_id, SUM(total_amount) AS total_spent\n  FROM orders\n  GROUP BY user_id\n  HAVING SUM(total_amount) > 1000\n)\nSELECT u.email, h.total_spent\nFROM users u\nJOIN HighValueCustomers h ON u.id = h.user_id;"
  },
  sections: [
    {
      title: "7.1 How B-Tree Indexes Work",
      explanation: "Without an index, finding a row requires a Sequential Scan (reading every single page from disk). A B-Tree index stores sorted keys in a balanced tree structure, allowing lookups in logarithmic O(log N) time — turning a 1-second query across 10 million rows into a 1-millisecond instant fetch.",
      bullets: [
        "Sequential Scan: O(N) linear time — scans every row on disk.",
        "Index Scan: O(log N) tree traversal directly to the disk page pointer.",
        "Tradeoff: Indexes accelerate SELECT queries, but slightly slow down INSERT/UPDATE/DELETE because the index tree must be updated on writes."
      ]
    }
  ],
  questions: [
    {
      id: "q-sql-07-1",
      prompt: "What is the primary purpose of a database index (e.g. B-Tree)?",
      options: [
        { id: "a", label: "To encrypt the table data" },
        { id: "b", label: "To accelerate SELECT queries by providing fast O(log N) lookups" },
        { id: "c", label: "To automatically delete old rows" },
        { id: "d", label: "To backup data to the cloud" }
      ],
      correctIndex: 1,
      explanation: "Indexes act like book indexes: allowing the database engine to find specific rows in O(log N) time without scanning every row on disk."
    },
    {
      id: "q-sql-07-2",
      prompt: "Which command in PostgreSQL shows the actual query execution plan and elapsed time?",
      options: [
        { id: "a", label: "SHOW SPEED" },
        { id: "b", label: "EXPLAIN ANALYZE" },
        { id: "c", label: "CHECK TIMING" },
        { id: "d", label: "BENCHMARK QUERY" }
      ],
      correctIndex: 1,
      explanation: "EXPLAIN ANALYZE executes the query and returns the real cost, row estimates, index hits, and millisecond execution times."
    },
    {
      id: "q-sql-07-3",
      prompt: "What is the tradeoff of adding many indexes to a table?",
      options: [
        { id: "a", label: "The database will fail to start" },
        { id: "b", label: "INSERT, UPDATE, and DELETE operations become slightly slower as index trees must be updated" },
        { id: "c", label: "The table can only store text" },
        { id: "d", label: "Queries become case-sensitive" }
      ],
      correctIndex: 1,
      explanation: "Every write (INSERT/UPDATE/DELETE) must maintain all defined index trees, consuming extra CPU and disk I/O."
    },
    {
      id: "q-sql-07-4",
      prompt: "What is a Common Table Expression (CTE) in SQL?",
      options: [
        { id: "a", label: "A temporary named result set defined using the WITH keyword" },
        { id: "b", label: "A permanent database table created on disk" },
        { id: "c", label: "A database error message" },
        { id: "d", label: "A column that stores common English words" }
      ],
      correctIndex: 0,
      explanation: "A CTE (WITH cte_name AS (...)) creates a temporary readable query scope used in subsequent SELECT statements."
    },
    {
      id: "q-sql-07-5",
      prompt: "What is a Database View?",
      options: [
        { id: "a", label: "A physical computer monitor attached to the server" },
        { id: "b", label: "A stored virtual table based on the result set of an underlying SQL query" },
        { id: "c", label: "A screenshot of database tables" },
        { id: "d", label: "A user permission setting" }
      ],
      correctIndex: 1,
      explanation: "A View is a virtual table that encapsulates a complex query; it does not store duplicate data, but re-runs the underlying query on demand."
    },
    {
      id: "q-sql-07-6",
      prompt: "What is a Sequential Scan (Seq Scan)?",
      options: [
        { id: "a", label: "Scanning rows using an index" },
        { id: "b", label: "The database reads every single row in the table from top to bottom" },
        { id: "c", label: "Scanning rows in alphabetical order" },
        { id: "d", label: "An antivirus scan on database files" }
      ],
      correctIndex: 1,
      explanation: "A sequential scan inspects every page and row sequentially; fine for small tables, but very slow on millions of rows."
    },
    {
      id: "q-sql-07-7",
      prompt: "Which columns should almost always be indexed in production databases?",
      options: [
        { id: "a", label: "Columns with giant paragraph text" },
        { id: "b", label: "Foreign key columns and columns frequently used in WHERE filters or JOIN conditions" },
        { id: "c", label: "Columns that are never queried" },
        { id: "d", label: "Only boolean columns" }
      ],
      correctIndex: 1,
      explanation: "Foreign keys and high-frequency WHERE filters benefit most from indexing, preventing slow full-table scans during joins."
    },
    {
      id: "q-sql-07-8",
      prompt: "What is a subquery in SQL?",
      options: [
        { id: "a", label: "A query written by an assistant" },
        { id: "b", label: "A query nested inside another SQL statement" },
        { id: "c", label: "A query that only returns 1 column" },
        { id: "d", label: "A query that runs in the background" }
      ],
      correctIndex: 1,
      explanation: "A subquery (or inner query) is nested inside a parent query's WHERE, FROM, or SELECT clause."
    },
    {
      id: "q-sql-07-9",
      prompt: "What does the SQL keyword 'IN' do when paired with a subquery?",
      options: [
        { id: "a", label: "Enters a new database record" },
        { id: "b", label: "Tests if a value matches any value in the subquery result set" },
        { id: "c", label: "Imports data from a CSV file" },
        { id: "d", label: "Enables indexing" }
      ],
      correctIndex: 1,
      explanation: "WHERE id IN (SELECT user_id FROM orders) evaluates true if the row's ID exists within the subquery's result set."
    },
    {
      id: "q-sql-07-10",
      prompt: "What is a Materialized View in PostgreSQL?",
      options: [
        { id: "a", label: "A view that is printed on paper" },
        { id: "b", label: "A view that physically caches its query result on disk for high performance" },
        { id: "c", label: "A view that can only be accessed by admins" },
        { id: "d", label: "A view that converts numbers to text" }
      ],
      correctIndex: 1,
      explanation: "Unlike a regular view that runs its query on every access, a Materialized View physically caches the result on disk and can be refreshed periodically."
    }
  ]
};

const sqlModule02Quiz: CurriculumItem = {
  id: "item-sql-mod2-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Module 2: SQL Querying, Joins & Optimization",
  modulePosition: 2,
  title: "Module 2 Knowledge Check: SQL Queries, Joins & Indexes",
  duration: "25 mins",
  type: "quiz",
  position: 10,
  isModuleQuiz: true,
  contentHeading: "Module 2 Assessment: SQL Queries, Aggregates & Joins",
  contentDescription: "Test your mastery of CRUD operations, GROUP BY/HAVING aggregations, multi-table joins, subqueries, and B-Tree indexing.",
  questions: [
    ...sqlLesson04.questions!.slice(0, 4),
    ...sqlLesson05.questions!.slice(0, 3),
    ...sqlLesson06.questions!.slice(0, 3)
  ]
};

const sqlModule02Assessment: CurriculumItem = {
  id: "item-sql-mod2-assessment",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Module 2: SQL Querying, Joins & Optimization",
  modulePosition: 2,
  title: "Module 2 Assessment: Complex Multi-Table SQL Reporting Queries",
  duration: "45 mins",
  type: "assignment",
  position: 11,
  isModuleAssessment: true,
  contentHeading: "Module 2 Practical Lab: Analytical Reporting Queries",
  contentDescription: "Write advanced SQL queries for business analytics: revenue per category, top 5 customers by lifetime spend, customer churn detection via anti-joins, and query optimization with indexes.",
  assignmentPrompt: {
    instructions: "Write the following 4 production SQL queries against the e-commerce schema:\n1. Top 5 customers ranked by total spend with order count and average order value.\n2. Total revenue generated per product category including categories with 0 sales (LEFT JOIN).\n3. Anti-join finding all registered users who have never placed an order.\n4. Create B-Tree indexes on appropriate foreign keys and explain the performance difference using EXPLAIN ANALYZE.",
    deliverables: [
      "SQL scripts with proper JOIN, GROUP BY, and HAVING clauses",
      "Correct formatting and aggregation logic",
      "Index creation statements and performance rationale"
    ]
  }
};

const sqlModule02: CurriculumSubModule = {
  id: "module-sql-02-queries-joins",
  subCourseId: "mod-database-sql",
  title: "Module 2: SQL Querying, Joins & Optimization",
  description: "CRUD operations, aggregation functions (COUNT, SUM, AVG), GROUP BY & HAVING, multi-table joins, CTEs, and B-Tree indexing.",
  position: 2,
  duration: "2 hours, 45 mins",
  lessons: [sqlLesson04, sqlLesson05, sqlLesson06, sqlLesson07],
  moduleQuiz: sqlModule02Quiz,
  moduleAssessment: sqlModule02Assessment,
  items: [sqlLesson04, sqlLesson05, sqlLesson06, sqlLesson07, sqlModule02Quiz, sqlModule02Assessment]
};

// --- SUB-COURSE FINAL ASSESSMENT ---

const sqlSubCourseExam: CurriculumItem = {
  id: "item-sql-course-assessment",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 3,
  title: "Sub-Course Assessment: Relational Databases & SQL Certification Exam",
  duration: "40 mins",
  type: "quiz",
  position: 12,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 03 Certification Exam: Relational Databases & SQL",
  contentDescription: "Comprehensive examination covering all modules: relational architecture, ACID transactions, 3NF schema design, complex joins, aggregations, and query optimization.",
  questions: [
    ...sqlLesson01.questions!.slice(0, 3),
    ...sqlLesson02.questions!.slice(0, 3),
    ...sqlLesson03.questions!.slice(0, 4),
    ...sqlLesson04.questions!.slice(0, 3),
    ...sqlLesson05.questions!.slice(0, 3),
    ...sqlLesson06.questions!.slice(0, 4)
  ]
};

const sqlSubCourseProject: CurriculumItem = {
  id: "item-sql-course-project",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-02-queries-joins",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 3,
  title: "Sub-Course Capstone Project: Production Database Schema & Query Optimization",
  duration: "1 hour, 30 mins",
  type: "assignment",
  position: 13,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 03 Capstone Project: Production Database Architecture",
  contentDescription: "Design, normalize, and implement a scalable relational database schema with seed data, foreign keys, constraints, and analytical query views.",
  assignmentPrompt: {
    instructions: "Design an end-to-end production database for a SaaS subscription platform (users, subscriptions, invoices, payment_logs):\n1. 3NF normalized schema with UUID primary keys and foreign key constraints.\n2. Indexes on user_id, status, and created_at columns.\n3. A materialized view computing Monthly Recurring Revenue (MRR) and active subscriber counts.\n4. Transactional SQL script simulating a user subscribing and generating an invoice atomically.",
    deliverables: [
      "Complete .sql migration file with DDL table definitions and indexes",
      "Seed data script inserting realistic multi-table test records",
      "Analytical queries calculating MRR and churn metrics",
      "Documentation explaining foreign key deletion policies and normalization trade-offs"
    ]
  }
};

export const databaseSqlSubCourse: CurriculumSubCourse = {
  id: "mod-database-sql",
  title: "Relational Databases & SQL",
  position: 3,
  duration: "6 hours, 30 mins",
  description: "Master relational database architecture, ACID transactions, table design, primary & foreign keys, 3NF normalization, CRUD operations, advanced multi-table joins, aggregate reporting, and index optimization.",
  modules: [sqlModule01, sqlModule02],
  courseAssessment: sqlSubCourseExam,
  courseProject: sqlSubCourseProject,
  items: [
    ...sqlModule01.items,
    ...sqlModule02.items,
    sqlSubCourseExam,
    sqlSubCourseProject
  ]
};
