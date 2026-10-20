import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 4: DATABASE DESIGN
// Lessons 063 - 066 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 063: ER DIAGRAMS AND RELATIONSHIPS
const lesson063: CurriculumItem = {
  id: "item-sql-063-er-diagrams-relationships",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-04-database-design",
  moduleTitle: "Module 4: Database Design",
  modulePosition: 4,
  title: "ER Diagrams and Relationships",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "ER Diagrams and Relationships: Cardinality & Entity Modeling",
  contentDescription: "Model entities and attributes, determine relationship cardinalities (1:1, 1:N, M:N), create visual Entity-Relationship diagrams, and translate real-world domains into physical schemas.",
  codeSnippet: {
    language: "sql",
    code: `-- Translating ER Cardinality into SQL Tables
-- 1. One-to-Many: One Instructor has Many Courses
CREATE TABLE instructors (
  instructor_id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL
);

CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  instructor_id INT NOT NULL REFERENCES instructors(instructor_id),
  title VARCHAR(200) NOT NULL
);

-- 2. Many-to-Many: Many Students enroll in Many Courses via Junction
CREATE TABLE course_enrollments (
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  PRIMARY KEY (student_id, course_id)
);`
  },
  sections: [
    {
      title: "Core Concept: Blueprinting Before Laying Code",
      explanation: "Just as architects design structural blueprints before pouring concrete foundations, database engineers model business entities and relationships using Entity-Relationship (ER) diagrams before executing a single DDL statement.\n\nAn Entity represents a real-world person, place, object, or event (e.g. Student, Course, Order). Attributes are the properties describing the entity (e.g. student email, course title). A Relationship defines how entities interact with one another. Modeling relationships visually reveals logical flaws and missing constraints early when changes cost minutes rather than weeks."
    },
    {
      title: "Understanding Cardinality and Multiplicity",
      explanation: "Cardinality describes the numerical relationship bounds between related entities:",
      table: {
        headers: ["Cardinality", "Definition", "Physical Schema Implementation", "Real-World Example"],
        rows: [
          ["One-to-One (1:1)", "One row in Table A links to at most one row in Table B", "Foreign key on Table B with a UNIQUE constraint", "User to UserProfile (isolating heavy bio/avatar)"],
          ["One-to-Many (1:N)", "One row in Table A links to multiple rows in Table B", "Foreign key column placed in Table B (the 'many' side)", "Department to Professors; Course to Lessons"],
          ["Many-to-Many (M:N)", "Multiple rows in Table A link to multiple rows in Table B", "Junction (bridge) table holding foreign keys to both parents", "Students to Courses; Articles to Tags"]
        ]
      }
    },
    {
      title: "System Mechanics: Entity-Relationship Visual Notation",
      explanation: "In Crow's Foot ER notation, visual symbols communicate cardinality and participation:",
      bullets: [
        "`||` (Mandatory One): Exactly one related record must exist.",
        "`O|` (Optional One): Zero or one related record can exist.",
        "`>|` (Mandatory Many): One or more related records must exist.",
        "`>O` (Optional Many / Crow's Foot): Zero, one, or many related records can exist."
      ]
    },
    {
      title: "Production Scenario: Deciding Where to Put the Foreign Key",
      explanation: "A frequent architectural dilemma in 1:1 relationships is deciding which table holds the foreign key. Consider `Users` and `Profiles`. If every user must have an account, but profile completion is optional, placing `user_id REFERENCES users(id) UNIQUE` in `Profiles` ensures that the `Users` table remains lean and unblocked, while uncreated profiles leave zero clutter in storage."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Attempting to implement a Many-to-Many relationship without a junction table: Storing comma-separated lists of foreign IDs like `'4,12,89'` in a single text column violates the atomic property of relational design. You cannot index individual IDs, foreign key referential integrity is destroyed, and querying whether a user is enrolled requires slow full-table string searches."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Draw an ER diagram for an online ride-sharing platform with Drivers, Riders, Vehicles, and Rides. Specify primary keys, foreign keys, and relationship cardinalities for each connection."
    }
  ],
  questions: [
    {
      id: "q-sql-063-1",
      prompt: "How is a One-to-Many (1:N) relationship implemented in a relational database?",
      options: [
        { id: "a", label: "By placing a foreign key column in the 'many' table referencing the primary key of the 'one' table" },
        { id: "b", label: "By creating two identical tables with the same name" },
        { id: "c", label: "By storing an array of child primary keys in the parent row" },
        { id: "d", label: "By merging both tables into a single column" }
      ],
      correctAnswer: "a",
      explanation: "In a 1:N relationship, the table on the 'many' side contains a foreign key pointing to the primary key of the 'one' parent table."
    },
    {
      id: "q-sql-063-2",
      prompt: "How is a One-to-One (1:1) relationship enforced in physical database tables?",
      options: [
        { id: "a", label: "By giving both tables the exact same number of rows" },
        { id: "b", label: "By adding a UNIQUE constraint to the foreign key column" },
        { id: "c", label: "By using only boolean columns" },
        { id: "d", label: "1:1 relationships cannot be enforced in SQL" }
      ],
      correctAnswer: "b",
      explanation: "Adding a UNIQUE constraint to a foreign key column ensures that no more than one child record can ever reference the same parent primary key."
    },
    {
      id: "q-sql-063-3",
      prompt: "Why is storing comma-separated IDs (e.g. '10,23,45') in a single column an anti-pattern?",
      options: [
        { id: "a", label: "Commas are illegal characters in SQL strings" },
        { id: "b", label: "It violates first normal form, destroys referential integrity, and prevents index lookups" },
        { id: "c", label: "It makes the database file size shrink too much" },
        { id: "d", label: "Browsers cannot display numbers with commas" }
      ],
      correctAnswer: "b",
      explanation: "Storing multi-valued lists in a single field prevents foreign key enforcement, requires string-parsing queries, and disables B-Tree index acceleration."
    },
    {
      id: "q-sql-063-4",
      prompt: "What is an 'Entity' in database modeling?",
      options: [
        { id: "a", label: "A ghost that haunts the server room" },
        { id: "b", label: "A distinct real-world object, person, concept, or event about which data is stored" },
        { id: "c", label: "A password hashing algorithm" },
        { id: "d", label: "A network cable" }
      ],
      correctAnswer: "b",
      explanation: "In ER modeling, an entity represents any distinct identifiable concept in the business domain (e.g. Student, Course, Invoice) that maps to a database table."
    },
    {
      id: "q-sql-063-5",
      prompt: "In Crow's Foot ER notation, what does a three-pronged 'fork' symbol represent?",
      options: [
        { id: "a", label: "Primary Key" },
        { id: "b", label: "Many (Multiplicity > 1)" },
        { id: "c", label: "Database offline" },
        { id: "d", label: "Unique index" }
      ],
      correctAnswer: "b",
      explanation: "The crow's foot symbol (three lines branching out) visually represents the 'many' side of a relationship."
    },
    {
      id: "q-sql-063-6",
      prompt: "What is a 'Junction Table' (also known as a bridge, cross-reference, or associative table)?",
      options: [
        { id: "a", label: "A table that connects SQL to MongoDB" },
        { id: "b", label: "A table designed to resolve a Many-to-Many relationship into two One-to-Many relationships" },
        { id: "c", label: "A table that is deleted automatically when the database restarts" },
        { id: "d", label: "A temporary table used for backups" }
      ],
      correctAnswer: "b",
      explanation: "A junction table contains foreign keys referencing two related parent tables, storing each association as a distinct row."
    },
    {
      id: "q-sql-063-7",
      prompt: "What is the cardinality between Courses and Lessons in a typical learning management system?",
      options: [
        { id: "a", label: "One-to-One (1:1)" },
        { id: "b", label: "One-to-Many (1:N): One Course has Many Lessons, and each Lesson belongs to one Course" },
        { id: "c", label: "Many-to-Many (M:N)" },
        { id: "d", label: "Zero-to-Zero" }
      ],
      correctAnswer: "b",
      explanation: "A course contains multiple sequential lessons, while each lesson is situated within a single parent course, defining a classic 1:N relationship."
    },
    {
      id: "q-sql-063-8",
      prompt: "What is an 'Attribute' in an ER diagram?",
      options: [
        { id: "a", label: "A specific characteristic or data field describing an entity (e.g. title, price)" },
        { id: "b", label: "The physical server IP address" },
        { id: "c", label: "The database user's permission level" },
        { id: "d", label: "The brand of the computer hard drive" }
      ],
      correctAnswer: "a",
      explanation: "Attributes correspond to the individual properties, characteristics, or columns that define the data shape of an entity."
    },
    {
      id: "q-sql-063-9",
      prompt: "When should an entity relationship be marked as 'Optional' (participation 0..1 or 0..N)?",
      options: [
        { id: "a", label: "When the database driver is optional" },
        { id: "b", label: "When an instance of an entity can exist without requiring an associated related record" },
        { id: "c", label: "When the table has no primary key" },
        { id: "d", label: "When the application is written in JavaScript" }
      ],
      correctAnswer: "b",
      explanation: "An optional relationship means a record can exist independently (e.g. a student can register before enrolling in any courses; minimum enrollment = 0)."
    },
    {
      id: "q-sql-063-10",
      prompt: "What primary key configuration is standard on a Many-to-Many junction table like `course_enrollments`?",
      options: [
        { id: "a", label: "No primary key is allowed on junction tables" },
        { id: "b", label: "A composite primary key made of `(student_id, course_id)`" },
        { id: "c", label: "A random text string" },
        { id: "d", label: "The current timestamp only" }
      ],
      correctAnswer: "b",
      explanation: "Using a composite primary key formed by both foreign keys naturally prevents a student from being enrolled in the exact same course more than once."
    }
  ]
};

// LESSON 064: NORMALIZATION
const lesson064: CurriculumItem = {
  id: "item-sql-064-normalization",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-04-database-design",
  moduleTitle: "Module 4: Database Design",
  modulePosition: 4,
  title: "Normalization",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Normalization: Eliminating Redundancy & Update Anomalies (1NF to 3NF)",
  contentDescription: "Understand normal forms (1NF, 2NF, 3NF), functional dependencies, insertion/update/deletion anomalies, and when controlled denormalization is warranted.",
  codeSnippet: {
    language: "sql",
    code: `-- Example of 3NF (Third Normal Form) Normalization:
-- Unnormalized table suffered transitive dependency: student -> department -> dept_head_name
-- In 3NF, transitive dependencies are separated into distinct tables:

CREATE TABLE departments (
  department_id SERIAL PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL UNIQUE,
  dept_head_name VARCHAR(150) NOT NULL -- Stored exactly once here!
);

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  department_id INT NOT NULL REFERENCES departments(department_id)
);`
  },
  sections: [
    {
      title: "Core Concept: Why Redundancy Destroys Databases",
      explanation: "Normalization is the systematic process of organizing data in a relational database to reduce data redundancy and eliminate destructive update anomalies. When the same piece of information (such as an instructor's office address) is duplicated across 1,000 course rows, modifying that address requires updating 1,000 separate records.\n\nIf the server crashes halfway through the update, the database enters an inconsistent state where half the courses display the old address and half display the new one. Normalization ensures that every non-key fact is stored in exactly one place."
    },
    {
      title: "The Three Classical Normal Forms",
      explanation: "Each normal form builds progressively upon the requirements of the preceding one:",
      table: {
        headers: ["Normal Form", "Core Rule", "Violation Example", "Resolution Action"],
        rows: [
          ["First Normal Form (1NF)", "Atomic values only; no repeating groups or multi-valued lists", "`courses_taken: 'CS101, MATH201'` in one field", "Create separate rows or a junction table"],
          ["Second Normal Form (2NF)", "Must be in 1NF + no partial dependency on a composite key", "Course title stored in `enrollments(student_id, course_id)`", "Move course title into a dedicated `courses` table"],
          ["Third Normal Form (3NF)", "Must be in 2NF + no transitive dependency (non-key determining non-key)", "`dept_head_name` stored in `students` table", "Move department details into a dedicated `departments` table"]
        ]
      }
    },
    {
      title: "System Mechanics: The Three Database Anomalies",
      explanation: "Normalization specifically protects your system against three catastrophic data anomalies:",
      bullets: [
        "Update Anomaly: Modifying a piece of data requires updating multiple rows. Missing any row creates contradictory data.",
        "Insertion Anomaly: You cannot record an entity because it requires information about an unrelated entity (e.g. you cannot create a new department unless a student has already enrolled in it).",
        "Deletion Anomaly: Deleting one entity accidentally destroys valuable unrelated information (e.g. deleting the last student enrolled in Physics permanently wipes out the existence of the Physics Department)."
      ]
    },
    {
      title: "Production Scenario: When to Deliberately Denormalize",
      explanation: "While 3NF is the gold standard for transactional consistency, high-volume read workloads (such as generating millions of analytics dashboard views per second) can suffer from joining 10 normalized tables repeatedly. In read-heavy scenarios, architects may selectively denormalize (e.g. caching a `total_enrollments_count` column directly on `courses`), keeping it synchronized using database triggers or backend event queues."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Premature denormalization: Many beginner developers skip normalization because writing joins feels intimidating. Denormalizing early introduces update anomalies into young systems before query performance has even been measured. Always normalize to 3NF first; denormalize only after measuring actual database bottlenecks under production loads."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Given a flat spreadsheet table with columns: `(student_id, student_name, course_id, course_title, instructor_id, instructor_name, grade)`, identify all 1NF, 2NF, and 3NF violations and decompose it into clean normalized SQL tables."
    }
  ],
  questions: [
    {
      id: "q-sql-064-1",
      prompt: "What is the primary objective of database Normalization?",
      options: [
        { id: "a", label: "To convert all text into uppercase letters" },
        { id: "b", label: "To reduce data redundancy and prevent insertion, update, and deletion anomalies" },
        { id: "c", label: "To increase disk storage consumption" },
        { id: "d", label: "To eliminate the need for SQL queries" }
      ],
      correctAnswer: "b",
      explanation: "Normalization organizes tables so that each fact is stored in exactly one location, eliminating redundancy and preventing data modification anomalies."
    },
    {
      id: "q-sql-064-2",
      prompt: "What rule must be satisfied for a table to be in First Normal Form (1NF)?",
      options: [
        { id: "a", label: "The table must have at least 100 rows" },
        { id: "b", label: "All attribute values must be atomic (indivisible), and there must be no repeating groups or multi-valued lists" },
        { id: "c", label: "All column names must start with the letter A" },
        { id: "d", label: "The table must be stored on an SSD drive" }
      ],
      correctAnswer: "b",
      explanation: "1NF requires that each column contains only atomic, single values (no comma-separated lists or arrays) and that every row is unique."
    },
    {
      id: "q-sql-064-3",
      prompt: "What is a 'Partial Dependency' in Second Normal Form (2NF)?",
      options: [
        { id: "a", label: "When a non-key attribute depends on only part of a composite primary key" },
        { id: "b", label: "When a table has missing foreign keys" },
        { id: "c", label: "When two servers share the same database" },
        { id: "d", label: "When a column has NULL values" }
      ],
      correctAnswer: "a",
      explanation: "2NF requires that every non-key column must depend on the whole primary key, not merely a subset of a composite primary key."
    },
    {
      id: "q-sql-064-4",
      prompt: "What is a 'Transitive Dependency' in Third Normal Form (3NF)?",
      options: [
        { id: "a", label: "A dependency between two database servers over public internet" },
        { id: "b", label: "When a non-key attribute depends on another non-key attribute (A -> B and B -> C)" },
        { id: "c", label: "A foreign key that points to a view" },
        { id: "d", label: "An index that was created on a Friday" }
      ],
      correctAnswer: "b",
      explanation: "In 3NF, non-key columns must depend strictly on the primary key ('the key, the whole key, and nothing but the key') and never on other non-key columns."
    },
    {
      id: "q-sql-064-5",
      prompt: "What is an 'Update Anomaly'?",
      options: [
        { id: "a", label: "When updating a single real-world fact requires updating redundant data across multiple rows, risking inconsistency" },
        { id: "b", label: "When Windows updates automatically in the middle of a test" },
        { id: "c", label: "When an UPDATE query runs faster than a SELECT query" },
        { id: "d", label: "When a column is renamed to lowercase" }
      ],
      correctAnswer: "a",
      explanation: "An update anomaly occurs when data duplication forces an application to update multiple rows to modify a single fact; if any row is missed, data becomes inconsistent."
    },
    {
      id: "q-sql-064-6",
      prompt: "What is a 'Deletion Anomaly'?",
      options: [
        { id: "a", label: "Accidentally losing unrelated facts because they were bundled in a row that gets deleted" },
        { id: "b", label: "Deleting a table without entering a password" },
        { id: "c", label: "When a deleted row reappears after 24 hours" },
        { id: "d", label: "When TRUNCATE fails to run" }
      ],
      correctAnswer: "a",
      explanation: "A deletion anomaly occurs when deleting one entity (e.g. the last student) inadvertently wipes out an independent entity (e.g. the course info) stored in the same row."
    },
    {
      id: "q-sql-064-7",
      prompt: "When is deliberate Denormalization justified in software engineering?",
      options: [
        { id: "a", label: "Whenever the developer is too lazy to write a JOIN" },
        { id: "b", label: "After profiling and measuring that complex multi-table joins are creating an unbearable read bottleneck" },
        { id: "c", label: "In the first week of prototyping an application" },
        { id: "d", label: "Denormalization is strictly forbidden by computer science theory" }
      ],
      correctAnswer: "b",
      explanation: "Denormalization is an engineering tradeoff made deliberately after measuring read bottlenecks to cache expensive computations at the expense of extra write overhead."
    },
    {
      id: "q-sql-064-8",
      prompt: "If a table's primary key is a single surrogate column `id INT`, is it automatically in 2NF once it satisfies 1NF?",
      options: [
        { id: "a", label: "Yes, because partial key dependencies are impossible with a single-column primary key" },
        { id: "b", label: "No, 2NF requires at least 3 tables" },
        { id: "c", label: "Only if all columns are numbers" },
        { id: "d", label: "Only in PostgreSQL" }
      ],
      correctAnswer: "a",
      explanation: "Partial key dependencies can only exist when a primary key is composite (multi-column). If the PK is a single column, 1NF tables automatically satisfy 2NF."
    },
    {
      id: "q-sql-064-9",
      prompt: "What classic phrase summarizes the requirement for Third Normal Form (3NF)?",
      options: [
        { id: "a", label: "All tables must have at least 3 columns" },
        { id: "b", label: "Every non-key attribute must depend on the key, the whole key, and nothing but the key" },
        { id: "c", label: "Three queries are better than one" },
        { id: "d", label: "Never delete anything" }
      ],
      correctAnswer: "b",
      explanation: "Coined by Bill Kent, this mnemonic summarizes 1NF (the key), 2NF (the whole key), and 3NF (nothing but the key)."
    },
    {
      id: "q-sql-064-10",
      prompt: "What is an 'Insertion Anomaly'?",
      options: [
        { id: "a", label: "Inability to record an entity because another unrelated entity's data is mandatory but not yet available" },
        { id: "b", label: "When an INSERT query takes longer than 1 second" },
        { id: "c", label: "Inserting data from an invalid IP address" },
        { id: "d", label: "Inserting duplicate primary keys" }
      ],
      correctAnswer: "a",
      explanation: "An insertion anomaly occurs when a poorly structured table prevents storing a valid entity (e.g. creating a course) without supplying data for an unrelated entity (e.g. a student)."
    }
  ]
};

// LESSON 065: INDEXES AND QUERY PERFORMANCE
const lesson065: CurriculumItem = {
  id: "item-sql-065-indexes-query-performance",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-04-database-design",
  moduleTitle: "Module 4: Database Design",
  modulePosition: 4,
  title: "Indexes and Query Performance",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Indexes and Query Performance: B-Trees, EXPLAIN ANALYZE & Query Plans",
  contentDescription: "Master index data structures (B-Tree, Hash, GIN), analyze execution plans with EXPLAIN ANALYZE, optimize composite index column ordering, and avoid write overhead traps.",
  codeSnippet: {
    language: "sql",
    code: `-- Inspecting execution plan with EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT course_id, title, price
FROM courses
WHERE is_published = TRUE AND price > 50.00;

-- Creating a composite B-Tree index with strategic column order
CREATE INDEX idx_courses_published_price
ON courses (is_published, price DESC);`
  },
  sections: [
    {
      title: "Core Concept: The Library Card Catalog Analogy",
      explanation: "Imagine searching for a specific book title in a library with 5 million volumes dumped randomly on the floor. Without an index, you must physically walk down every aisle and inspect all 5 million covers one by one (a Sequential Scan or Full Table Scan). This takes hours.\n\nAn index is like a library card catalog: an auxiliary data structure ordered alphabetically by title that stores pointers to physical shelf locations. Instead of checking millions of books, the librarian navigates directly to the letter 'P' in logarithmic time (O(log N)), finding the book in three seconds."
    },
    {
      title: "Index Structures in Relational Databases",
      explanation: "Different index structures optimize different query patterns:",
      table: {
        headers: ["Index Type", "Internal Structure", "Best Operators", "Common Use Case"],
        rows: [
          ["B-Tree (Default)", "Self-balancing balanced search tree", "`=`, `<`, `>`, `<=`, `>=`, `BETWEEN`, `ORDER BY`", "Primary keys, foreign keys, timestamps, numeric ranges"],
          ["Hash Index", "In-memory hash table with bucket pointers", "`=` only (no range queries)", "Exact key-value lookups (UUIDs, tokens)"],
          ["GIN (Generalized Inverted Index)", "Inverted index mapping elements to row IDs", "`@>`, `?`, `?|` (containment)", "PostgreSQL `JSONB` documents, arrays, full-text search"],
          ["BRIN (Block Range Index)", "Stores min/max values for disk page blocks", "`=`, range filters on sorted data", "Massive time-series tables with billions of sequential rows"]
        ]
      }
    },
    {
      title: "System Mechanics: Reading EXPLAIN ANALYZE Execution Plans",
      explanation: "To diagnose why a query is slow, prepend `EXPLAIN ANALYZE` to the SQL statement. The database optimizer returns the actual execution plan:",
      bullets: [
        "`Seq Scan on courses (cost=0.00..452.00 rows=8210 width=32)`: A full table scan. If the table has 5 million rows, this indicates a missing index.",
        "`Index Scan using idx_courses_price on courses`: The engine navigated the B-Tree index to locate matching pointers and fetched rows from table heap storage.",
        "`Index Only Scan using idx_...`: The query was satisfied 100% from the index pages without touching disk heap storage at all (the ultimate performance goal)."
      ]
    },
    {
      title: "Production Scenario: The Rule of Composite Index Column Order",
      explanation: "When creating a composite index across multiple columns (`CREATE INDEX idx ON enrollments (student_id, course_id);`), the leftmost column rule applies. The index can accelerate queries filtering by `student_id`, or filtering by `student_id AND course_id`. However, a query filtering solely by `course_id` CANNOT use this index effectively because the B-Tree is ordered by student_id first! Always place the most selective filter columns on the left."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "The over-indexing write penalty: Every index speeds up `SELECT` queries, but SLOWS DOWN every `INSERT`, `UPDATE`, and `DELETE`. When you insert a new row into a table with 8 indexes, the engine must perform 1 table write plus 8 separate index B-Tree leaf node rebalances. Never add indexes randomly; index only proven query access patterns."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Run `EXPLAIN ANALYZE` on a search query filtering courses by published status and price. Create a composite index and run `EXPLAIN ANALYZE` again. Document the reduction in total execution time (in milliseconds) and the change in scan node type."
    }
  ],
  questions: [
    {
      id: "q-sql-065-1",
      prompt: "What is the primary performance benefit of a B-Tree index on a relational database column?",
      options: [
        { id: "a", label: "It compresses all text into numbers" },
        { id: "b", label: "It allows locating target rows in logarithmic O(log N) time instead of scanning every row in O(N) time" },
        { id: "c", label: "It deletes duplicate rows automatically" },
        { id: "d", label: "It makes database backups 100x smaller" }
      ],
      correctAnswer: "b",
      explanation: "B-Tree indexes maintain a balanced tree of ordered keys, enabling binary search lookups that pinpoint records in O(log N) operations."
    },
    {
      id: "q-sql-065-2",
      prompt: "What does the SQL command `EXPLAIN ANALYZE` do?",
      options: [
        { id: "a", label: "It runs a spell check on column names" },
        { id: "b", label: "It executes the query, measures actual execution time, and displays the optimizer's execution plan tree" },
        { id: "c", label: "It translates SQL into JavaScript" },
        { id: "d", label: "It deletes unused columns" }
      ],
      correctAnswer: "b",
      explanation: "EXPLAIN ANALYZE runs the query and prints execution statistics including node types (Seq Scan, Index Scan), estimated costs, and actual execution time in milliseconds."
    },
    {
      id: "q-sql-065-3",
      prompt: "What is the tradeoff of adding numerous indexes to a database table?",
      options: [
        { id: "a", label: "SELECT queries become slower" },
        { id: "b", label: "Storage space increases, and INSERT, UPDATE, and DELETE operations slow down because every index must be updated" },
        { id: "c", label: "Primary keys are automatically converted to strings" },
        { id: "d", label: "Foreign keys stop working" }
      ],
      correctAnswer: "b",
      explanation: "Every mutation requires updating the table heap and all associated B-Trees, increasing disk I/O and slowing down write transactions."
    },
    {
      id: "q-sql-065-4",
      prompt: "What is a 'Sequential Scan' (Seq Scan) in an execution plan?",
      options: [
        { id: "a", label: "A fast index lookup" },
        { id: "b", label: "The database reading every disk block of the table sequentially from start to finish" },
        { id: "c", label: "A network scan for open ports" },
        { id: "d", label: "A query that sorts alphabetically" }
      ],
      correctAnswer: "b",
      explanation: "A Seq Scan reads every page and row of the table linearly. On small tables it is harmless; on large tables it indicates a missing or unused index."
    },
    {
      id: "q-sql-065-5",
      prompt: "What is an 'Index-Only Scan'?",
      options: [
        { id: "a", label: "A query that only scans the table without reading any index" },
        { id: "b", label: "A query satisfied entirely from the index data structure without needing to read table heap pages from disk" },
        { id: "c", label: "An index that only works once per day" },
        { id: "d", label: "An index created exclusively for primary keys" }
      ],
      correctAnswer: "b",
      explanation: "An Index-Only Scan occurs when all columns requested in SELECT and WHERE are present directly inside the index leaf nodes, avoiding heap table disk reads."
    },
    {
      id: "q-sql-065-6",
      prompt: "Given an index on `(department_id, is_active)`, can a query filtering ONLY on `WHERE is_active = TRUE` use this index effectively?",
      options: [
        { id: "a", label: "Yes, column order does not matter in composite indexes" },
        { id: "b", label: "No, because composite B-Trees require the leftmost column (department_id) to navigate the tree" },
        { id: "c", label: "Only if the table has fewer than 10 rows" },
        { id: "d", label: "Only in MySQL 5.7" }
      ],
      correctAnswer: "b",
      explanation: "Composite indexes are structured from left to right. A query omitting the leftmost column cannot traverse the tree and must resort to a sequential scan."
    },
    {
      id: "q-sql-065-7",
      prompt: "Which index type in PostgreSQL is specifically designed for indexing JSONB documents and array elements?",
      options: [
        { id: "a", label: "B-Tree" },
        { id: "b", label: "GIN (Generalized Inverted Index)" },
        { id: "c", label: "Hash Index" },
        { id: "d", label: "BRIN" }
      ],
      correctAnswer: "b",
      explanation: "GIN indexes create inverted lookup tables mapping individual JSON keys, values, or array elements to row locations, making containment queries fast."
    },
    {
      id: "q-sql-065-8",
      prompt: "Why should foreign key columns almost always be indexed in relational databases?",
      options: [
        { id: "a", label: "SQL syntax forbids foreign keys without indexes" },
        { id: "b", label: "To accelerate JOIN operations and prevent table-wide locks during parent deletion checks" },
        { id: "c", label: "To automatically generate passwords for foreign keys" },
        { id: "d", label: "To delete the parent record automatically" }
      ],
      correctAnswer: "b",
      explanation: "Relational joins match on foreign keys. Furthermore, when deleting a parent row, the database must verify dependent child rows; an index prevents a full scan of the child table."
    },
    {
      id: "q-sql-065-9",
      prompt: "What is a 'Partial Index' in PostgreSQL?",
      options: [
        { id: "a", label: "An index that was only partially saved during a crash" },
        { id: "b", label: "An index built with a WHERE clause that indexes only a subset of rows meeting a condition" },
        { id: "c", label: "An index that only indexes the first 3 letters of a string" },
        { id: "d", label: "An index shared between two tables" }
      ],
      correctAnswer: "b",
      explanation: "A partial index (e.g. `CREATE INDEX idx ON orders(id) WHERE status = 'unprocessed';`) indexes only relevant rows, saving massive disk space and write overhead."
    },
    {
      id: "q-sql-065-10",
      prompt: "Why does wrapping an indexed column in a function (e.g. `WHERE LOWER(email) = 'test@example.com'`) prevent using a normal index on `email`?",
      options: [
        { id: "a", label: "The database converts lowercase strings to numbers" },
        { id: "b", label: "The index stores raw values; it cannot anticipate computed function transformations without an expression index" },
        { id: "c", label: "LOWER() is an illegal function in SQL" },
        { id: "d", label: "Indexes do not support email addresses" }
      ],
      correctAnswer: "b",
      explanation: "A standard index on `email` holds raw strings. To index function outputs, you must create a functional/expression index: `CREATE INDEX ON users (LOWER(email))`."
    }
  ]
};

// LESSON 066: VIEWS AND SCHEMA EVOLUTION
const lesson066: CurriculumItem = {
  id: "item-sql-066-views-schema-evolution",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-04-database-design",
  moduleTitle: "Module 4: Database Design",
  modulePosition: 4,
  title: "Views and Schema Evolution",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Views and Schema Evolution: Virtual Tables & Migration Strategies",
  contentDescription: "Understand virtual views, materialized views, security abstraction with column masking, and zero-downtime schema evolution patterns in production.",
  codeSnippet: {
    language: "sql",
    code: `-- Creating a secure virtual view masking private instructor details
CREATE VIEW active_course_catalog AS
SELECT
  c.course_id,
  c.title,
  c.level,
  c.price,
  i.full_name AS instructor_name
FROM courses c
INNER JOIN instructors i ON i.instructor_id = c.instructor_id
WHERE c.is_published = TRUE;

-- Querying the view exactly like a physical table
SELECT course_id, title, instructor_name
FROM active_course_catalog
WHERE level = 'beginner';`
  },
  sections: [
    {
      title: "Core Concept: Storing Queries as Virtual Tables",
      explanation: "In software engineering, encapsulation prevents client code from tightly coupling to underlying implementation details. In relational databases, a `VIEW` is a saved, named SQL query that behaves like a virtual table.\n\nWhen a client application queries a view, the database engine merges the view's underlying query with the outer query and optimizes them together. Views simplify complex multi-table joins, enforce consistent business logic, and restrict access to sensitive columns (like password hashes or social security numbers) by exposing only permitted attributes."
    },
    {
      title: "Standard Views vs Materialized Views",
      explanation: "Database engines provide two distinct categories of views:",
      table: {
        headers: ["View Type", "Storage on Disk", "Data Freshness", "Performance Profile"],
        rows: [
          ["Standard View", "Zero disk storage (stores only query text)", "100% real-time fresh on every execution", "Runs underlying query dynamically on every read"],
          ["Materialized View", "Stores query results physically on disk as a table", "Snapshot fresh as of last refresh command", "Ultra-fast indexable reads; requires scheduled `REFRESH MATERIALIZED VIEW`"]
        ]
      }
    },
    {
      title: "System Mechanics: Security & Access Control Through Views",
      explanation: "Views provide a powerful database security boundary. Rather than granting frontend reporting tools direct `SELECT` access to the full `students` table (which contains password hashes and billing addresses), you grant permission only to a restricted view:",
      bullets: [
        "Column Masking: Omit private columns from the view definition.",
        "Row-Level Filtering: Restrict the view using `WHERE is_active = TRUE AND deleted_at IS NULL`.",
        "Role-Based Security: Grant `GRANT SELECT ON student_public_directory TO reporting_role;` while revoking access to base tables."
      ]
    },
    {
      title: "Production Scenario: Backward-Compatible Schema Evolution",
      explanation: "Suppose you rename a column from `cost` to `price` in a core table. If you immediately drop the old column, deployed mobile apps and background worker microservices will crash. Using views, you can maintain a compatibility view that aliases `price AS cost`, allowing existing client versions to function seamlessly while newer versions adopt the new schema."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Nesting views five layers deep: When developers build View A on top of View B on top of View C, the resulting query plan becomes a tangled web of redundant joins that confuses the database optimizer. Keep views shallow and focused on direct presentation or security boundaries."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Create a view named `course_enrollment_summaries` that presents course title, department, instructor name, and total enrolled students count. Query the view with an outer filter for courses with more than 10 students."
    }
  ],
  questions: [
    {
      id: "q-sql-066-1",
      prompt: "What is a standard SQL View?",
      options: [
        { id: "a", label: "A screenshot of the database dashboard" },
        { id: "b", label: "A saved query stored in the database catalog that presents virtual table data dynamically on read" },
        { id: "c", label: "A physical copy of the database saved on a USB drive" },
        { id: "d", label: "A temporary table deleted after 10 minutes" }
      ],
      correctAnswer: "b",
      explanation: "A view stores a named query definition; whenever queried, the engine runs the underlying SQL dynamically to present virtual table output."
    },
    {
      id: "q-sql-066-2",
      prompt: "What is the primary difference between a Standard View and a Materialized View?",
      options: [
        { id: "a", label: "Standard views cost money; materialized views are free" },
        { id: "b", label: "A standard view computes results dynamically on read; a materialized view caches computed results physically on disk" },
        { id: "c", label: "Materialized views only work with SQLite" },
        { id: "d", label: "Standard views can only have 1 column" }
      ],
      correctAnswer: "b",
      explanation: "Materialized views persist computed query results to disk like a physical table, providing ultra-fast queries that can be indexed but requiring periodic refresh."
    },
    {
      id: "q-sql-066-3",
      prompt: "How do views enhance database security and privacy?",
      options: [
        { id: "a", label: "By generating random passwords" },
        { id: "b", label: "By exposing only safe, non-sensitive columns and filtering restricted rows while denying direct access to base tables" },
        { id: "c", label: "By preventing all network connections" },
        { id: "d", label: "By converting all text to uppercase" }
      ],
      correctAnswer: "b",
      explanation: "Database administrators can grant read permissions on a restricted view while revoking permissions on underlying tables containing sensitive credentials or personal data."
    },
    {
      id: "q-sql-066-4",
      prompt: "What command updates the data stored inside a Materialized View in PostgreSQL?",
      options: [
        { id: "a", label: "UPDATE MATERIALIZED VIEW view_name;" },
        { id: "b", label: "REFRESH MATERIALIZED VIEW view_name;" },
        { id: "c", label: "RELOAD VIEW view_name;" },
        { id: "d", label: "SYNC VIEW view_name;" }
      ],
      correctAnswer: "b",
      explanation: "The `REFRESH MATERIALIZED VIEW view_name;` command re-evaluates the query and overwrites the cached disk snapshot with updated data."
    },
    {
      id: "q-sql-066-5",
      prompt: "Can you create indexes on a Materialized View in PostgreSQL?",
      options: [
        { id: "a", label: "No, indexes can never be placed on views" },
        { id: "b", label: "Yes, because a materialized view physically stores rows on disk just like a standard table" },
        { id: "c", label: "Only if the materialized view has fewer than 10 rows" },
        { id: "d", label: "Only on weekends" }
      ],
      correctAnswer: "b",
      explanation: "Because a materialized view occupies physical disk storage pages, you can build B-Tree, GIN, or Hash indexes on its columns to maximize read performance."
    },
    {
      id: "q-sql-066-6",
      prompt: "How can views assist in backward-compatible schema migrations when renaming a database column?",
      options: [
        { id: "a", label: "By automatically rewriting client JavaScript code" },
        { id: "b", label: "By creating a view that aliases the new column name back to the old name for older deployed client apps" },
        { id: "c", label: "By shutting down client apps until they update" },
        { id: "d", label: "By duplicating the entire operating system" }
      ],
      correctAnswer: "b",
      explanation: "A view can expose `new_column_name AS old_column_name`, enabling legacy client services to query the database without crashing while migrations proceed."
    },
    {
      id: "q-sql-066-7",
      prompt: "What happens when you execute `DROP VIEW view_name;`?",
      options: [
        { id: "a", label: "All underlying tables and their data rows are permanently deleted" },
        { id: "b", label: "Only the stored view query definition is removed; underlying base tables and rows remain untouched" },
        { id: "c", label: "The database server restarts" },
        { id: "d", label: "The query fails with a foreign key violation" }
      ],
      correctAnswer: "b",
      explanation: "Dropping a standard view deletes only the virtual query definition from the database catalog; no rows in the base tables are affected."
    },
    {
      id: "q-sql-066-8",
      prompt: "Can an ordinary standard view contain JOINs, WHERE filters, and aggregate functions?",
      options: [
        { id: "a", label: "No, views only support simple single-table SELECTs" },
        { id: "b", label: "Yes, a view can encapsulate arbitrary complex queries with joins, groupings, and calculations" },
        { id: "c", label: "Only if written in Python" },
        { id: "d", label: "Only if all numbers are integers" }
      ],
      correctAnswer: "b",
      explanation: "A view definition can contain almost any valid SELECT query, encapsulating complex multi-table joins, subqueries, and calculations behind a clean table interface."
    },
    {
      id: "q-sql-066-9",
      prompt: "What architectural pitfall occurs when views are deeply nested inside other views?",
      options: [
        { id: "a", label: "The database deletes all indexes" },
        { id: "b", label: "Query plans become opaque and unoptimizable, leading to redundant table joins and poor performance" },
        { id: "c", label: "The file extension changes to .docx" },
        { id: "d", label: "Database passwords are reset" }
      ],
      correctAnswer: "b",
      explanation: "Deeply nested views obscure data access paths and frequently force redundant joins that the cost-based query optimizer cannot unravel."
    },
    {
      id: "q-sql-066-10",
      prompt: "What is an 'Updatable View'?",
      options: [
        { id: "a", label: "A view that can be modified using ALTER VIEW" },
        { id: "b", label: "A simple view that allows executing INSERT, UPDATE, or DELETE statements that translate directly to base table modifications" },
        { id: "c", label: "A view that updates its background wallpaper" },
        { id: "d", label: "A view with an internet connection" }
      ],
      correctAnswer: "b",
      explanation: "Under specific conditions (such as querying a single base table without aggregations), SQL engines allow DML statements to be executed directly against views."
    }
  ]
};

// MODULE 4 QUIZ
const sqlModule04Quiz: CurriculumItem = {
  id: "item-sql-mod04-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-04-database-design",
  moduleTitle: "Module 4: Database Design",
  modulePosition: 4,
  title: "Module 4 Assessment: Database Design & Tuning MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 4 Quiz: ER Modeling, Normalization, Indexes & Views",
  contentDescription: "Evaluate your comprehensive mastery of database engineering: 1:1, 1:N, and M:N relationships, 1NF to 3NF normal forms, update anomalies, B-Tree indexes, EXPLAIN ANALYZE execution plans, and virtual vs materialized views.",
  questions: [
    ...(lesson063.questions || []).slice(0, 3),
    ...(lesson064.questions || []).slice(0, 3),
    ...(lesson065.questions || []).slice(0, 2),
    ...(lesson066.questions || []).slice(0, 2)
  ]
};

// MODULE 4 ASSESSMENT (LAB)
const sqlModule04Assessment: CurriculumItem = {
  id: "item-sql-mod04-lab",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-04-database-design",
  moduleTitle: "Module 4: Database Design",
  modulePosition: 4,
  title: "Module 4 Lab: Schema Modeling, Normalization & Index Tuning",
  duration: "50 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 4 Lab Project: Schema Modeling, Normalization & Index Tuning",
  contentDescription: "Design, normalize, and tune a multi-entity database schema for an academic platform. Decompose denormalized data into 3NF, build composite B-Tree indexes, analyze query plans with EXPLAIN ANALYZE, and create secure reporting views.",
  assignmentPrompt: {
    instructions: "Complete the schema architecture and performance tuning lab:\n1. Create a script `design_and_tune.sql`.\n2. Decompose a provided unnormalized denormalized table into 3NF tables: `students`, `departments`, `courses`, and `enrollments`.\n3. Populate tables with at least 50 sample records.\n4. Write an `EXPLAIN ANALYZE` query searching courses by department and price, noting baseline execution cost.\n5. Create an optimal composite B-Tree index and demonstrate via `EXPLAIN ANALYZE` that the engine switches from a Sequential Scan to an Index Scan.\n6. Create an `active_catalog_view` view omitting internal instructor salary fields.",
    deliverables: [
      "SQL script file containing normalized 3NF DDL, test data, and index definitions",
      "Before-and-after EXPLAIN ANALYZE execution plan comparison report",
      "Architectural explanation justifying the chosen composite index column ordering"
    ]
  }
};

export const sqlModule04: CurriculumSubModule = {
  id: "module-sql-04-database-design",
  subCourseId: "mod-database-sql",
  title: "Module 4 — Database design",
  description: "Model entities and cardinalities in ER diagrams, normalize schemas from 1NF to 3NF, accelerate lookups with B-Tree indexes and EXPLAIN ANALYZE, and encapsulate logic in views.",
  position: 4,
  items: [
    lesson063,
    lesson064,
    lesson065,
    lesson066,
    sqlModule04Quiz,
    sqlModule04Assessment
  ]
};
