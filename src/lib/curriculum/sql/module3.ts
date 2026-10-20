import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 3: QUERYING AND ANALYSIS
// Lessons 058 - 062 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 058: AGGREGATE FUNCTIONS
const lesson058: CurriculumItem = {
  id: "item-sql-058-aggregate-functions",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-03-querying-analysis",
  moduleTitle: "Module 3: Querying and Analysis",
  modulePosition: 3,
  title: "Aggregate Functions",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Aggregate Functions: Grouping, Summarizing & Post-Aggregation Filters",
  contentDescription: "Master COUNT, SUM, AVG, MIN, and MAX, group dataset rows with GROUP BY, and filter group statistics using the HAVING clause.",
  codeSnippet: {
    language: "sql",
    code: `-- Analyzing course enrollments and revenue per department
SELECT
  c.department,
  COUNT(e.student_id) AS total_enrolled_students,
  ROUND(AVG(c.price), 2) AS average_course_price,
  SUM(c.price) AS projected_revenue
FROM courses c
LEFT JOIN course_enrollments e ON e.course_id = c.course_id
GROUP BY c.department
HAVING COUNT(e.student_id) >= 10 -- Filters grouped aggregations
ORDER BY projected_revenue DESC;`
  },
  sections: [
    {
      title: "Core Concept: Transforming Rows into Statistical Insights",
      explanation: "Relational queries often need to summarize large volumes of individual transaction rows into actionable executive metrics: total revenue this month, average exam scores across cohorts, or departments with declining student counts.\n\nSQL aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) collapse multiple rows into single summary scalar values. The `GROUP BY` clause divides the dataset into distinct subsets based on matching column values before computing aggregations for each independent group."
    },
    {
      title: "Aggregate Functions Breakdown",
      explanation: "Each standard aggregate function handles missing data and calculation rules deliberately:",
      table: {
        headers: ["Function", "Description", "NULL Handling Rule", "Common Use Case"],
        rows: [
          ["`COUNT(*)`", "Counts total rows in the group", "Includes NULL rows", "Counting total registrations or orders"],
          ["`COUNT(col)`", "Counts non-null values in specified column", "Excludes NULLs", "Counting students with verified emails"],
          ["`SUM(col)`", "Calculates arithmetic sum of numeric values", "Excludes NULLs", "Total gross revenue, hours studied"],
          ["`AVG(col)`", "Computes arithmetic mean", "Excludes NULLs from both sum and count", "Average student grade, course rating"],
          ["`MIN(col)` / `MAX(col)`", "Finds lowest and highest values", "Excludes NULLs", "Earliest sign-up date, peak course fee"]
        ]
      }
    },
    {
      title: "System Mechanics: The Crucial Difference Between WHERE and HAVING",
      explanation: "Understanding the distinction between WHERE and HAVING is essential for writing valid SQL:",
      bullets: [
        "WHERE filters individual candidate rows BEFORE any grouping or aggregation takes place. It cannot evaluate aggregate functions like `WHERE COUNT(*) > 5` (which produces a syntax error).",
        "HAVING filters aggregated groups AFTER `GROUP BY` has collapsed rows and computed summary values. It evaluates expressions like `HAVING SUM(revenue) > 10000`."
      ]
    },
    {
      title: "Production Scenario: The Single-Column Grouping Invariant",
      explanation: "If you select `department, title, COUNT(*)` and write `GROUP BY department`, the database will throw an error: `column \"title\" must appear in the GROUP BY clause or be used in an aggregate function`. Why? Because if a department contains 40 courses with 40 different titles, the database cannot guess which single title to display alongside the collapsed department count. Every unaggregated column in `SELECT` must be explicitly listed in `GROUP BY`."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Beware of calculating averages on columns where zero is meaningful but stored as NULL. If student exam scores are stored as NULL when absent, `AVG(score)` excludes them from the denominator, reporting an artificially inflated class performance. Always wrap nullable inputs in `COALESCE(score, 0)` when absences should penalize the average."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query that groups enrollments by course level ('beginner', 'intermediate', 'advanced'), computing the total student count, average course price, and minimum course price. Include only levels with at least 5 registered students."
    }
  ],
  questions: [
    {
      id: "q-sql-058-1",
      prompt: "Why does `SELECT department, COUNT(*) FROM courses WHERE COUNT(*) > 5 GROUP BY department;` cause an error?",
      options: [
        { id: "a", label: "COUNT(*) is not supported in GROUP BY queries" },
        { id: "b", label: "The WHERE clause filters rows before aggregation; aggregate conditions must be placed in the HAVING clause" },
        { id: "c", label: "The department column must be an integer" },
        { id: "d", label: "SQL does not allow the number 5 in WHERE clauses" }
      ],
      correctAnswer: "b",
      explanation: "WHERE filters candidate rows before GROUP BY forms groups. To filter post-aggregation summaries like COUNT(*) > 5, you must use the HAVING clause."
    },
    {
      id: "q-sql-058-2",
      prompt: "What is the difference between `COUNT(*)` and `COUNT(instructor_id)`?",
      options: [
        { id: "a", label: "There is no difference in any database" },
        { id: "b", label: "COUNT(*) counts all rows; COUNT(instructor_id) counts only rows where instructor_id is NOT NULL" },
        { id: "c", label: "COUNT(instructor_id) only counts distinct instructors" },
        { id: "d", label: "COUNT(*) only counts primary keys" }
      ],
      correctAnswer: "b",
      explanation: "COUNT(*) counts total tuples regardless of content; passing a specific column name causes the aggregate to ignore rows with NULL in that column."
    },
    {
      id: "q-sql-058-3",
      prompt: "What rule governs non-aggregated columns listed in the SELECT clause of a GROUP BY query?",
      options: [
        { id: "a", label: "They must all be renamed with aliases" },
        { id: "b", label: "Every non-aggregated column in SELECT must be included in the GROUP BY clause" },
        { id: "c", label: "They must be converted to VARCHAR data types" },
        { id: "d", label: "Only one non-aggregated column is permitted in any SQL query" }
      ],
      correctAnswer: "b",
      explanation: "Unless a column is uniquely determined by the primary key, all non-aggregated attributes in SELECT must be listed in GROUP BY to resolve ambiguity."
    },
    {
      id: "q-sql-058-4",
      prompt: "How do you count the number of unique, distinct students who enrolled across all courses?",
      options: [
        { id: "a", label: "SELECT COUNT(UNIQUE student_id) FROM enrollments;" },
        { id: "b", label: "SELECT COUNT(DISTINCT student_id) FROM enrollments;" },
        { id: "c", label: "SELECT DISTINCT COUNT(student_id) FROM enrollments;" },
        { id: "d", label: "SELECT TOTAL(student_id) FROM enrollments;" }
      ],
      correctAnswer: "b",
      explanation: "Combining `COUNT(DISTINCT column)` de-duplicates candidate values before calculating the total aggregate tally."
    },
    {
      id: "q-sql-058-5",
      prompt: "What will `SELECT SUM(bonus) FROM employees;` return if every row in the employees table has `bonus = NULL`?",
      options: [
        { id: "a", label: "0" },
        { id: "b", label: "NULL" },
        { id: "c", label: "An arithmetic overflow error" },
        { id: "d", label: "-1" }
      ],
      correctAnswer: "b",
      explanation: "When SUM or AVG is computed over a set of entirely NULL values, the aggregate function returns NULL (representing unknown)."
    },
    {
      id: "q-sql-058-6",
      prompt: "Can multiple columns be specified in a single GROUP BY clause?",
      options: [
        { id: "a", label: "No, SQL only permits grouping by a single column" },
        { id: "b", label: "Yes, grouping by multiple columns forms sub-groups for each unique combination of values" },
        { id: "c", label: "Only if all columns are foreign keys" },
        { id: "d", label: "Only in MySQL" }
      ],
      correctAnswer: "b",
      explanation: "Specifying `GROUP BY department, academic_year` calculates aggregates for every unique pair of department and year."
    },
    {
      id: "q-sql-058-7",
      prompt: "What does the `ROUND(AVG(price), 2)` function call achieve?",
      options: [
        { id: "a", label: "Rounds the average price to the nearest integer" },
        { id: "b", label: "Rounds the computed average price to 2 decimal places" },
        { id: "c", label: "Calculates the average of the first 2 prices only" },
        { id: "d", label: "Multiplies the average price by 2" }
      ],
      correctAnswer: "b",
      explanation: "The second argument to the ROUND function specifies the desired numeric scale (decimal places) for formatting."
    },
    {
      id: "q-sql-058-8",
      prompt: "When does the HAVING clause execute in the logical query processing order?",
      options: [
        { id: "a", label: "Before the FROM clause" },
        { id: "b", label: "Immediately after the GROUP BY clause and before SELECT" },
        { id: "c", label: "After the ORDER BY clause" },
        { id: "d", label: "At the very end of query execution" }
      ],
      correctAnswer: "b",
      explanation: "HAVING executes at Step 4, immediately after GROUP BY forms grouped subsets, allowing filtering based on aggregate expressions."
    },
    {
      id: "q-sql-058-9",
      prompt: "Which aggregate function returns the earliest calendar date in a column of registration timestamps?",
      options: [
        { id: "a", label: "EARLIEST(created_at)" },
        { id: "b", label: "MIN(created_at)" },
        { id: "c", label: "FIRST(created_at)" },
        { id: "d", label: "BOTTOM(created_at)" }
      ],
      correctAnswer: "b",
      explanation: "MIN() operates on temporal timestamps just like numbers, returning the earliest chronological date in the dataset."
    },
    {
      id: "q-sql-058-10",
      prompt: "How can you sort departments from the highest enrollment count to the lowest?",
      options: [
        { id: "a", label: "ORDER BY COUNT(*) DESC" },
        { id: "b", label: "SORT BY COUNT(*) HIGH" },
        { id: "c", label: "GROUP BY COUNT(*) DESC" },
        { id: "d", label: "HAVING COUNT(*) MAX" }
      ],
      correctAnswer: "a",
      explanation: "Aggregate expressions computed during grouping can be referenced directly in the ORDER BY clause with `DESC` to sort summaries."
    }
  ]
};

// LESSON 059: JOINS AND RELATIONSHIPS
const lesson059: CurriculumItem = {
  id: "item-sql-059-joins-relationships",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-03-querying-analysis",
  moduleTitle: "Module 3: Querying and Analysis",
  modulePosition: 3,
  title: "JOINs and Relationships",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "JOINs and Relationships: INNER, LEFT, RIGHT & Cross Product Mechanics",
  contentDescription: "Master relational join operations, avoid Cartesian product explosion, handle many-to-many junction tables, and query missing right-side records with LEFT JOIN.",
  codeSnippet: {
    language: "sql",
    code: `-- Querying students with their enrolled courses (Many-to-Many via junction table)
SELECT
  s.student_id,
  s.full_name AS student_name,
  c.title AS course_title,
  e.enrolled_at
FROM students s
INNER JOIN course_enrollments e ON e.student_id = s.student_id
INNER JOIN courses c ON c.course_id = e.course_id
ORDER BY s.full_name ASC, e.enrolled_at DESC;

-- Finding students who have NEVER enrolled in any course
SELECT s.student_id, s.full_name, s.email
FROM students s
LEFT JOIN course_enrollments e ON e.student_id = s.student_id
WHERE e.student_id IS NULL; -- Filter for unmatched left rows`
  },
  sections: [
    {
      title: "Core Concept: Connecting Normalized Entities",
      explanation: "Because normalized relational databases split real-world information into separate entity tables to eliminate duplication, retrieving meaningful business views requires combining rows from multiple tables based on related foreign key attributes.\n\nA `JOIN` operation computes a virtual combined table. The database engine matches rows from the left table with rows from the right table using a join predicate specified in the `ON` clause."
    },
    {
      title: "The Four Primary SQL Join Types",
      explanation: "Different join types determine whether unmatched rows are retained or excluded:",
      table: {
        headers: ["Join Type", "Behavior", "Unmatched Rows Result"],
        rows: [
          ["`INNER JOIN`", "Returns only rows where the join predicate matches in BOTH tables", "Unmatched rows from either table are discarded"],
          ["`LEFT JOIN` (OUTER)", "Returns ALL rows from the left table, plus matched right-table attributes", "Right-side columns are filled with NULL for unmatched left rows"],
          ["`RIGHT JOIN` (OUTER)", "Returns ALL rows from the right table, plus matched left-table attributes", "Left-side columns are filled with NULL for unmatched right rows"],
          ["`FULL OUTER JOIN`", "Returns ALL rows from BOTH tables regardless of whether matches exist", "Missing sides are populated with NULLs"]
        ]
      }
    },
    {
      title: "System Mechanics: The Danger of the Cartesian Product",
      explanation: "If you omit the `ON` clause or write an unconditional join (`FROM students, courses` or `CROSS JOIN`), the database computes the Cartesian product: every single student row is paired with every single course row. If you have 10,000 students and 500 courses, the query generates 5,000,000 output rows, overwhelming server memory and freezing database workers. Always verify your `ON` matching predicate."
    },
    {
      title: "Production Scenario: Finding Students Without Enrollments",
      explanation: "A common reporting requirement is finding inactive students who created an account but never enrolled in any course. Using a `LEFT JOIN` on `course_enrollments` keeps all students in the result. By adding `WHERE enrollments.student_id IS NULL`, you filter specifically for students who produced zero join matches, identifying prospective leads for follow-up emails."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "The duplicate row multiplication trap: When you join a parent table with two independent child tables (e.g. joining `orders` with `order_items` AND `order_shipments`), the result set forms a cross-product between items and shipments. Calculating `SUM(item_price)` on that joined result produces duplicated, inflated numbers! Perform aggregations in separate subqueries or CTEs before joining."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query linking `professors`, `courses`, and `departments`. List every professor's name, their department name, and the titles of all courses they teach. Use a LEFT JOIN so professors who are not currently assigned to any course still appear."
    }
  ],
  questions: [
    {
      id: "q-sql-059-1",
      prompt: "What rows are returned by an INNER JOIN between students and enrollments?",
      options: [
        { id: "a", label: "All students, regardless of whether they ever enrolled" },
        { id: "b", label: "Only rows where a student record matches an enrollment record on student_id" },
        { id: "c", label: "All enrollments with student data set to NULL" },
        { id: "d", label: "A random sample of 10 rows" }
      ],
      correctAnswer: "b",
      explanation: "An INNER JOIN discards any rows from either table that do not satisfy the matching condition in the ON clause."
    },
    {
      id: "q-sql-059-2",
      prompt: "How does a LEFT OUTER JOIN handle a row in the left table that has no matching rows in the right table?",
      options: [
        { id: "a", label: "It throws a foreign key constraint violation error" },
        { id: "b", label: "It includes the left row in the result and populates all right-table columns with NULL" },
        { id: "c", label: "It deletes the left row from the database" },
        { id: "d", label: "It pauses until the user inserts a matching right row" }
      ],
      correctAnswer: "b",
      explanation: "LEFT JOIN preserves all rows from the left table; when no right-side record matches, right-side attributes are represented as NULL."
    },
    {
      id: "q-sql-059-3",
      prompt: "What pattern identifies records in table A that have NO corresponding match in table B?",
      options: [
        { id: "a", label: "SELECT * FROM A INNER JOIN B ON A.id = B.a_id;" },
        { id: "b", label: "SELECT * FROM A LEFT JOIN B ON A.id = B.a_id WHERE B.a_id IS NULL;" },
        { id: "c", label: "SELECT * FROM A CROSS JOIN B;" },
        { id: "d", label: "SELECT * FROM A RIGHT JOIN B ON A.id = B.a_id WHERE A.id IS NOT NULL;" }
      ],
      correctAnswer: "b",
      explanation: "A LEFT JOIN combined with a `WHERE right_table.key IS NULL` filter isolates non-matching left rows (an anti-join)."
    },
    {
      id: "q-sql-059-4",
      prompt: "What happens if you join two tables without specifying an ON condition (a CROSS JOIN)?",
      options: [
        { id: "a", label: "The database matches rows alphabetically" },
        { id: "b", label: "A Cartesian product is computed, pairing every row in the first table with every row in the second table" },
        { id: "c", label: "The database automatically matches primary keys" },
        { id: "d", label: "The query fails with an index corruption error" }
      ],
      correctAnswer: "b",
      explanation: "Without an ON predicate, the engine generates the Cartesian product (N x M rows), which can cause catastrophic memory exhaustion on large tables."
    },
    {
      id: "q-sql-059-5",
      prompt: "How is a Many-to-Many relationship (e.g. Students and Courses) represented in a relational schema?",
      options: [
        { id: "a", label: "By storing a comma-separated list of course IDs in a VARCHAR column in the students table" },
        { id: "b", label: "Through a junction (bridge) table containing foreign keys referencing both primary tables" },
        { id: "c", label: "By duplicating the students table for every single course" },
        { id: "d", label: "Many-to-many relationships are impossible in SQL" }
      ],
      correctAnswer: "b",
      explanation: "A junction table (such as `course_enrollments`) breaks down a Many-to-Many relationship into two One-to-Many relationships with foreign keys."
    },
    {
      id: "q-sql-059-6",
      prompt: "What is a 'Self Join' in SQL?",
      options: [
        { id: "a", label: "A query that joins a table to itself, often using aliases to model hierarchical data like managers and employees" },
        { id: "b", label: "A query executed automatically by the database background scheduler" },
        { id: "c", label: "A join between two identical databases on different servers" },
        { id: "d", label: "A join that runs without network access" }
      ],
      correctAnswer: "a",
      explanation: "A Self Join joins a table to itself (e.g. `FROM employees e LEFT JOIN employees m ON e.manager_id = m.id`) to model parent-child hierarchies."
    },
    {
      id: "q-sql-059-7",
      prompt: "What does `FULL OUTER JOIN` return?",
      options: [
        { id: "a", label: "Only matching rows between both tables" },
        { id: "b", label: "All rows from both tables, pairing matching rows and inserting NULLs for unmatched rows on either side" },
        { id: "c", label: "Only the columns that have identical names" },
        { id: "d", label: "All database tables in the current schema" }
      ],
      correctAnswer: "b",
      explanation: "A FULL OUTER JOIN retains all tuples from both left and right relations, matching where possible and supplying NULLs where unmatched."
    },
    {
      id: "q-sql-059-8",
      prompt: "Why is it important to use short table aliases (e.g. `FROM courses c JOIN departments d ON d.id = c.dept_id`) in multi-table queries?",
      options: [
        { id: "a", label: "SQL syntax requires aliases to be at most 2 letters" },
        { id: "b", label: "Aliases improve readability and eliminate column name ambiguity when multiple tables share column names like `id` or `created_at`" },
        { id: "c", label: "Aliases make queries run 10x faster" },
        { id: "d", label: "Aliases prevent SQL injection" }
      ],
      correctAnswer: "b",
      explanation: "Qualifying columns with table aliases (`c.id` vs `d.id`) prevents ambiguity errors when joined tables share identical column identifiers."
    },
    {
      id: "q-sql-059-9",
      prompt: "What issue arises when you join a parent table with two separate one-to-many child tables in the same query?",
      options: [
        { id: "a", label: "The database refuses to execute the query" },
        { id: "b", label: "Row multiplication creates a Cartesian product between the children, duplicating rows and inflating SUM aggregates" },
        { id: "c", label: "All primary keys are converted to strings" },
        { id: "d", label: "Foreign keys are permanently disabled" }
      ],
      correctAnswer: "b",
      explanation: "Joining multiple one-to-many relationships multiplies child rows together, causing aggregate calculations like SUM to produce duplicate-inflated totals."
    },
    {
      id: "q-sql-059-10",
      prompt: "Which join type is equivalent to writing `LEFT OUTER JOIN`?",
      options: [
        { id: "a", label: "INNER JOIN" },
        { id: "b", label: "LEFT JOIN" },
        { id: "c", label: "CROSS JOIN" },
        { id: "d", label: "NATURAL JOIN" }
      ],
      correctAnswer: "b",
      explanation: "In SQL grammar, the `OUTER` keyword is optional; `LEFT JOIN` and `LEFT OUTER JOIN` are completely synonymous."
    }
  ]
};

// LESSON 060: SUBQUERIES AND COMMON TABLE EXPRESSIONS
const lesson060: CurriculumItem = {
  id: "item-sql-060-subqueries-ctes",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-03-querying-analysis",
  moduleTitle: "Module 3: Querying and Analysis",
  modulePosition: 3,
  title: "Subqueries and Common Table Expressions",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Subqueries and Common Table Expressions: Modular SQL with WITH Clauses",
  contentDescription: "Understand scalar, column, and correlated subqueries, build readable multi-stage query pipelines with Common Table Expressions (CTEs), and leverage EXISTS vs IN predicates.",
  codeSnippet: {
    language: "sql",
    code: `-- Using Common Table Expressions (CTEs) for readable multi-stage analysis
WITH course_metrics AS (
  SELECT
    course_id,
    COUNT(student_id) AS student_count
  FROM course_enrollments
  GROUP BY course_id
),
average_metric AS (
  SELECT AVG(student_count) AS avg_enrollment FROM course_metrics
)
SELECT
  c.course_id,
  c.title,
  cm.student_count,
  ROUND(am.avg_enrollment, 1) AS platform_average
FROM courses c
INNER JOIN course_metrics cm ON cm.course_id = c.course_id
CROSS JOIN average_metric am
WHERE cm.student_count > am.avg_enrollment
ORDER BY cm.student_count DESC;`
  },
  sections: [
    {
      title: "Core Concept: Breaking Complex Queries into Manageable Steps",
      explanation: "As business requirements grow complex, writing a single monolithic SQL query with five nested subqueries becomes unreadable, unmaintainable, and prone to logic errors.\n\nA Common Table Expression (CTE), defined using the `WITH` keyword, is a temporary named result set that exists only during the execution of that specific query. CTEs act like readable intermediate variables in JavaScript, allowing you to compute a preliminary calculation in Stage 1 and then join or filter against it in Stage 2."
    },
    {
      title: "Subquery Types Compared",
      explanation: "SQL supports subqueries in different clauses depending on the shape of data they produce:",
      table: {
        headers: ["Subquery Type", "Returned Shape", "Where Used", "Example"],
        rows: [
          ["Scalar Subquery", "Single value (1 row, 1 column)", "SELECT, WHERE, HAVING", "`WHERE price > (SELECT AVG(price) FROM courses)`"],
          ["Column Subquery", "Single column with multiple rows", "WHERE IN, WHERE NOT IN", "`WHERE id IN (SELECT student_id FROM honors)`"],
          ["Table Subquery (Derived Table)", "Multiple rows and columns", "FROM, JOIN", "`FROM (SELECT ... ) AS sub`"],
          ["Correlated Subquery", "References columns from the outer query", "WHERE EXISTS, SELECT", "`WHERE EXISTS (SELECT 1 FROM e WHERE e.id = outer.id)`"]
        ]
      }
    },
    {
      title: "System Mechanics: `EXISTS` vs `IN`",
      explanation: "When testing whether related records exist in a child table, developers choose between `EXISTS` and `IN`:",
      bullets: [
        "`IN` evaluates the subquery completely, materializes the entire list in memory, and checks for inclusion. If the subquery contains a NULL value, `NOT IN` fails completely under 3VL.",
        "`EXISTS` runs a correlated check and stops processing immediately upon finding the first matching row (short-circuit evaluation). It is safe against NULLs and often significantly faster for parent-child existence checks."
      ]
    },
    {
      title: "Production Scenario: Recursive CTEs for Category Trees",
      explanation: "CTEs also support the `WITH RECURSIVE` syntax, enabling SQL to traverse hierarchical data structures like category taxonomies, organization management hierarchies, or nested forum comment trees in a single query without requiring procedural backend recursion."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "In older database engines (like PostgreSQL 11 and earlier), CTEs acted as optimization fences, forcing the engine to materialize the entire CTE to temporary memory even if the outer query only needed 5 rows. Modern PostgreSQL (v12+) and MySQL (v8+) inline CTEs by default unless you explicitly specify `WITH name AS MATERIALIZED (...)`."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query using a CTE named `top_instructors` that identifies instructors who teach at least 3 courses. Then query `top_instructors` to display their names and total course counts."
    }
  ],
  questions: [
    {
      id: "q-sql-060-1",
      prompt: "What SQL keyword defines a Common Table Expression (CTE)?",
      options: [
        { id: "a", label: "LET" },
        { id: "b", label: "WITH" },
        { id: "c", label: "DEFINE" },
        { id: "d", label: "VARIABLE" }
      ],
      correctAnswer: "b",
      explanation: "The `WITH` keyword introduces one or more Common Table Expressions (CTEs) at the beginning of a query."
    },
    {
      id: "q-sql-060-2",
      prompt: "What is a 'Scalar Subquery'?",
      options: [
        { id: "a", label: "A subquery that multiplies all numbers by 10" },
        { id: "b", label: "A subquery that returns exactly one single value (one row and one column)" },
        { id: "c", label: "A subquery that only runs on scalable cloud servers" },
        { id: "d", label: "A subquery that deletes duplicate rows" }
      ],
      correctAnswer: "b",
      explanation: "A scalar subquery produces a single atomic value, allowing it to be used in expressions, SELECT projections, or comparison predicates (e.g. `WHERE salary > (SELECT AVG(salary) FROM emp)`)."
    },
    {
      id: "q-sql-060-3",
      prompt: "What is a 'Correlated Subquery'?",
      options: [
        { id: "a", label: "A subquery that connects to two different database engines" },
        { id: "b", label: "A subquery that references one or more columns from the enclosing outer query" },
        { id: "c", label: "A subquery that runs once before the outer query starts" },
        { id: "d", label: "A subquery with no WHERE clause" }
      ],
      correctAnswer: "b",
      explanation: "A correlated subquery references values from the outer query row-by-row, evaluating conditionally for each candidate outer row."
    },
    {
      id: "q-sql-060-4",
      prompt: "Why is `WHERE EXISTS (SELECT 1 ...)` typically faster than `WHERE id IN (SELECT ...)` on large child tables?",
      options: [
        { id: "a", label: "EXISTS short-circuits and stops scanning as soon as the first matching row is found" },
        { id: "b", label: "EXISTS converts SQL to C++ machine code" },
        { id: "c", label: "IN is not supported on indexed tables" },
        { id: "d", label: "EXISTS bypasses database permissions" }
      ],
      correctAnswer: "a",
      explanation: "EXISTS returns TRUE immediately upon encountering the first matching record in the child table without scanning the remainder of the dataset."
    },
    {
      id: "q-sql-060-5",
      prompt: "Can a query define multiple Common Table Expressions separated by commas?",
      options: [
        { id: "a", label: "No, only one CTE is permitted per query" },
        { id: "b", label: "Yes: `WITH cte1 AS (...), cte2 AS (...) SELECT ...`" },
        { id: "c", label: "Only in Oracle Database" },
        { id: "d", label: "Only if all CTEs query the exact same table" }
      ],
      correctAnswer: "b",
      explanation: "You can chain multiple CTEs by separating them with commas after the initial `WITH` keyword, and subsequent CTEs can even reference earlier CTEs."
    },
    {
      id: "q-sql-060-6",
      prompt: "What specialized CTE feature allows querying hierarchical data like org charts and category trees?",
      options: [
        { id: "a", label: "WITH HIERARCHY" },
        { id: "b", label: "WITH RECURSIVE" },
        { id: "c", label: "WITH TREE" },
        { id: "d", label: "WITH LOOP" }
      ],
      correctAnswer: "b",
      explanation: "The `WITH RECURSIVE` syntax enables queries to repeatedly execute an anchor query and an iterative union query to traverse nested hierarchies."
    },
    {
      id: "q-sql-060-7",
      prompt: "What happens if a scalar subquery used in `WHERE price > (SELECT ...)` unexpectedly returns 2 rows?",
      options: [
        { id: "a", label: "The database compares price to the first row and ignores the second" },
        { id: "b", label: "The database throws a runtime error: 'more than one row returned by a subquery used as an expression'" },
        { id: "c", label: "The database calculates the average of both rows" },
        { id: "d", label: "Both rows are automatically deleted" }
      ],
      correctAnswer: "b",
      explanation: "A scalar subquery in a comparison expression must return strictly zero or one row; returning multiple rows triggers a fatal query execution error."
    },
    {
      id: "q-sql-060-8",
      prompt: "Does a CTE persist in the database as a permanent table after the query finishes executing?",
      options: [
        { id: "a", label: "Yes, it creates a table on disk until dropped" },
        { id: "b", label: "No, a CTE exists only for the duration of that single query execution" },
        { id: "c", label: "Yes, but only for 24 hours" },
        { id: "d", label: "It is saved in the browser cache" }
      ],
      correctAnswer: "b",
      explanation: "CTEs are transient, query-scoped definitions that vanish immediately after the statement completes. Permanent query abstractions are created using `CREATE VIEW`."
    },
    {
      id: "q-sql-060-9",
      prompt: "What is a 'Derived Table' in SQL?",
      options: [
        { id: "a", label: "A subquery in the FROM clause that is assigned a table alias" },
        { id: "b", label: "A table copied from another database server" },
        { id: "c", label: "A table created by mathematical calculus" },
        { id: "d", label: "A table without a primary key" }
      ],
      correctAnswer: "a",
      explanation: "A subquery wrapped in parentheses and placed in the FROM or JOIN clause with an alias (e.g. `FROM (SELECT ...) AS sub`) is called a derived table."
    },
    {
      id: "q-sql-060-10",
      prompt: "Why do engineers prefer CTEs over deeply nested subqueries for complex business reports?",
      options: [
        { id: "a", label: "CTEs are written in Python" },
        { id: "b", label: "CTEs read top-to-bottom sequentially, making complex multi-stage logic easy to read, test, and maintain" },
        { id: "c", label: "Subqueries are deprecated in modern SQL" },
        { id: "d", label: "CTEs bypass all database security checks" }
      ],
      correctAnswer: "b",
      explanation: "CTEs structure complex transformations into linear, named steps that execute top-to-bottom, avoiding deeply indented nested parenthesis pyramids."
    }
  ]
};

// LESSON 061: SET OPERATIONS AND BUILT-IN FUNCTIONS
const lesson061: CurriculumItem = {
  id: "item-sql-061-set-operations-built-in-functions",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-03-querying-analysis",
  moduleTitle: "Module 3: Querying and Analysis",
  modulePosition: 3,
  title: "Set Operations and Built-In Functions",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Set Operations and Built-In Functions: UNION, INTERSECT & Scalar Transforms",
  contentDescription: "Combine compatible query results using UNION, UNION ALL, INTERSECT, and EXCEPT, and transform text, dates, and numbers with built-in SQL functions.",
  codeSnippet: {
    language: "sql",
    code: `-- Combining contact lists using UNION (eliminates duplicates)
SELECT full_name, email, 'student' AS role
FROM students
WHERE is_active = TRUE
UNION ALL -- Preserves all rows without expensive duplicate sorting
SELECT full_name, email, 'instructor' AS role
FROM instructors
WHERE is_active = TRUE
ORDER BY full_name ASC;

-- Scalar string and date transformation functions
SELECT
  LOWER(TRIM(email)) AS normalized_email,
  UPPER(title) AS banner_title,
  DATE_TRUNC('month', enrolled_at) AS enrollment_month,
  EXTRACT(DOW FROM enrolled_at) AS day_of_week
FROM course_enrollments;`
  },
  sections: [
    {
      title: "Core Concept: Mathematical Set Operations on Queries",
      explanation: "In relational algebra, tables and query results are mathematical sets of tuples. Set operations allow you to combine two independent queries vertically into a single unified result set, provided both queries produce compatible column counts and compatible data types.\n\n`UNION` merges rows from both queries and removes duplicate records. `UNION ALL` merges rows while preserving all duplicates, making it significantly faster because the database does not need to sort and de-duplicate the combined stream in memory."
    },
    {
      title: "The Four Relational Set Operations",
      explanation: "Set operations compare whole rows across two compatible queries:",
      table: {
        headers: ["Set Operation", "Mathematical Behavior", "Performance Impact", "Example Usage"],
        rows: [
          ["`UNION`", "Combines sets and strips out duplicate rows", "Requires sorting/hashing to remove duplicates", "Consolidating unique user emails across multiple tables"],
          ["`UNION ALL`", "Combines sets directly, retaining all duplicates", "Fast streaming append with zero sorting overhead", "Aggregating log streams or transaction audit histories"],
          ["`INTERSECT`", "Returns only rows that exist in BOTH query results", "Requires matching evaluation across both sets", "Finding users who are both students AND instructors"],
          ["`EXCEPT` / `MINUS`", "Returns rows in Query 1 that DO NOT exist in Query 2", "Requires anti-membership evaluation", "Finding subscribers who have never submitted feedback"]
        ]
      }
    },
    {
      title: "System Mechanics: Essential Built-In Scalar Functions",
      explanation: "Unlike aggregate functions which collapse multiple rows into one, scalar functions transform individual column values row by row:",
      bullets: [
        "String Functions: `LOWER()`, `UPPER()`, `TRIM()`, `LENGTH()`, `SUBSTRING()`, `CONCAT()` for cleaning and formatting text.",
        "Date & Time Functions: `NOW()`, `CURRENT_DATE`, `DATE_TRUNC('day', ts)`, `EXTRACT(YEAR FROM ts)`, `AGE(ts1, ts2)` for scheduling and analytics.",
        "Numeric Functions: `ROUND()`, `CEIL()`, `FLOOR()`, `ABS()`, `MOD()` for mathematical operations."
      ]
    },
    {
      title: "Production Scenario: Sanitizing User Search Inputs",
      explanation: "When students search for their registered email, casing discrepancies like `'User@Example.Com'` vs `'user@example.com'` can fail an exact equality check. Using `WHERE LOWER(TRIM(email)) = LOWER(TRIM($input))` ensures reliable matching. In PostgreSQL, creating an expression index (`CREATE INDEX idx_lower_email ON users (LOWER(email));`) ensures the function call remains lightning-fast."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Defaulting to `UNION` when `UNION ALL` would suffice: Engineers frequently write `UNION` out of habit. If you know the two datasets cannot overlap (for instance, querying active orders and archived orders by ID), `UNION` forces the database engine to perform an expensive memory sort and hash check to remove duplicates that do not exist. Always prefer `UNION ALL` unless deduplication is an explicit business requirement."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query using `UNION ALL` that compiles a unified activity feed showing course enrollments, course reviews, and certificate completions. Each row should output the user ID, event type, and event timestamp."
    }
  ],
  questions: [
    {
      id: "q-sql-061-1",
      prompt: "What is the primary difference between `UNION` and `UNION ALL`?",
      options: [
        { id: "a", label: "UNION works with numbers; UNION ALL works with text" },
        { id: "b", label: "UNION removes duplicate rows between result sets; UNION ALL keeps all rows including duplicates" },
        { id: "c", label: "UNION ALL can only be run once per day" },
        { id: "d", label: "UNION deletes data from disk" }
      ],
      correctAnswer: "b",
      explanation: "UNION sorts and de-duplicates the combined result set, whereas UNION ALL rapidly appends streams together without deduplication overhead."
    },
    {
      id: "q-sql-061-2",
      prompt: "Why is `UNION ALL` faster than `UNION`?",
      options: [
        { id: "a", label: "UNION ALL uses a secret hardware coprocessor" },
        { id: "b", label: "UNION ALL does not require sorting or hashing records in memory to identify and remove duplicate rows" },
        { id: "c", label: "UNION ALL limits output to 10 rows" },
        { id: "d", label: "UNION ALL bypasses network protocols" }
      ],
      correctAnswer: "b",
      explanation: "Because UNION ALL streams rows directly to the client without executing an in-memory or on-disk deduplication sort, it is significantly faster."
    },
    {
      id: "q-sql-061-3",
      prompt: "What condition must be met for two queries to be combined with a set operator like UNION?",
      options: [
        { id: "a", label: "Both queries must query the exact same table name" },
        { id: "b", label: "Both queries must select the same number of columns with compatible data types in matching order" },
        { id: "c", label: "Both queries must have the exact same WHERE clause" },
        { id: "d", label: "Both queries must be written by the same database user" }
      ],
      correctAnswer: "b",
      explanation: "Union compatibility requires both SELECT lists to contain the identical count of columns, with corresponding column types compatible in position."
    },
    {
      id: "q-sql-061-4",
      prompt: "What does the `INTERSECT` set operator return?",
      options: [
        { id: "a", label: "All rows from the first query that are not in the second" },
        { id: "b", label: "Only rows that are present in both the first and second query results" },
        { id: "c", label: "A random selection of rows" },
        { id: "d", label: "All rows from both queries with duplicates" }
      ],
      correctAnswer: "b",
      explanation: "INTERSECT computes the mathematical intersection of two result sets, outputting only rows that exist in both queries."
    },
    {
      id: "q-sql-061-5",
      prompt: "What does the `EXCEPT` (or `MINUS`) operator return?",
      options: [
        { id: "a", label: "Rows from the first query that do not appear in the second query" },
        { id: "b", label: "Rows that contain error values" },
        { id: "c", label: "All rows except the primary key" },
        { id: "d", label: "All rows with NULL values" }
      ],
      correctAnswer: "a",
      explanation: "EXCEPT takes the result of the first query and subtracts any tuples that appear in the second query."
    },
    {
      id: "q-sql-061-6",
      prompt: "Which scalar function removes leading and trailing whitespace from a user string?",
      options: [
        { id: "a", label: "CLEAN(text)" },
        { id: "b", label: "TRIM(text)" },
        { id: "c", label: "STRIP(text)" },
        { id: "d", label: "CUT(text)" }
      ],
      correctAnswer: "b",
      explanation: "The standard SQL `TRIM(str)` function removes leading and trailing spaces from character strings."
    },
    {
      id: "q-sql-061-7",
      prompt: "What does `DATE_TRUNC('month', timestamp_column)` do in PostgreSQL?",
      options: [
        { id: "a", label: "Deletes the month from the timestamp" },
        { id: "b", label: "Truncates the timestamp to the first day of that month at 00:00:00" },
        { id: "c", label: "Calculates the number of days in that month" },
        { id: "d", label: "Returns the month name as a string" }
      ],
      correctAnswer: "b",
      explanation: "DATE_TRUNC resets timestamp fields finer than the specified precision, rounding down to the start of that month, day, hour, or year."
    },
    {
      id: "q-sql-061-8",
      prompt: "What does `EXTRACT(YEAR FROM registered_at)` return?",
      options: [
        { id: "a", label: "The full timestamp string" },
        { id: "b", label: "A numeric value representing the calendar year (e.g. 2026)" },
        { id: "c", label: "A boolean indicating if the year is a leap year" },
        { id: "d", label: "The user's birthday" }
      ],
      correctAnswer: "b",
      explanation: "The EXTRACT function retrieves sub-fields (such as YEAR, MONTH, DAY, HOUR) from date and time values as numeric quantities."
    },
    {
      id: "q-sql-061-9",
      prompt: "Where does the ORDER BY clause belong in a query that combines two SELECT statements with UNION?",
      options: [
        { id: "a", label: "Inside both SELECT statements" },
        { id: "b", label: "At the very end of the entire union query, applying to the combined result" },
        { id: "c", label: "Before the UNION keyword" },
        { id: "d", label: "ORDER BY is forbidden in UNION queries" }
      ],
      correctAnswer: "b",
      explanation: "In standard SQL, a single ORDER BY clause placed at the conclusion of the entire statement sorts the finalized combined result set."
    },
    {
      id: "q-sql-061-10",
      prompt: "Which scalar function combines multiple strings into a single string?",
      options: [
        { id: "a", label: "MERGE(str1, str2)" },
        { id: "b", label: "CONCAT(str1, str2) or string concatenation operator ||" },
        { id: "c", label: "ATTACH(str1, str2)" },
        { id: "d", label: "JOIN_STR(str1, str2)" }
      ],
      correctAnswer: "b",
      explanation: "SQL provides the `CONCAT(...)` function or the standard string concatenation operator `||` to join strings together."
    }
  ]
};

// LESSON 062: WINDOW FUNCTIONS
const lesson062: CurriculumItem = {
  id: "item-sql-062-window-functions",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-03-querying-analysis",
  moduleTitle: "Module 3: Querying and Analysis",
  modulePosition: 3,
  title: "Window Functions",
  duration: "30 mins",
  type: "cheatsheet",
  position: 5,
  contentHeading: "Window Functions: Analytical Calculations Across Related Rows",
  contentDescription: "Master the OVER clause, PARTITION BY partitions, ranking with ROW_NUMBER and DENSE_RANK, cumulative running totals, and previous-row lookups with LAG and LEAD.",
  codeSnippet: {
    language: "sql",
    code: `-- Ranking students within each course and computing cumulative cohort totals
SELECT
  student_id,
  course_id,
  score,
  -- 1. Rank within this specific course cohort
  DENSE_RANK() OVER (PARTITION BY course_id ORDER BY score DESC) AS rank_in_course,
  -- 2. Previous student's score for comparative analysis
  LAG(score, 1) OVER (PARTITION BY course_id ORDER BY score DESC) AS previous_higher_score,
  -- 3. Running cumulative score total across the cohort
  SUM(score) OVER (PARTITION BY course_id ORDER BY score DESC
                   ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_score_total
FROM exam_submissions;`
  },
  sections: [
    {
      title: "Core Concept: Calculations Without Row Collapsing",
      explanation: "A standard `GROUP BY` aggregation collapses rows into group summaries. If a department has 100 students, `GROUP BY department` collapses all 100 records into a single output row. But what if you need to calculate each student's rank relative to their classmates, while still outputting every individual student's name, email, and score?\n\nThis is the power of Window Functions. A window function performs a calculation across a set of table rows that are related to the current row, but *without collapsing individual rows*. Each row in the source table retains its separate identity in the final output."
    },
    {
      title: "The Anatomy of the OVER Clause",
      explanation: "A window function is identified by the `OVER (...)` clause, which configures the 'window frame' of rows visible to the calculation:",
      bullets: [
        "`PARTITION BY column`: Divides the rows into independent groups (like mini-tables). Calculations reset when crossing partition boundaries.",
        "`ORDER BY column`: Establishes the logical sequence of rows within each partition (essential for ranking and running totals).",
        "`ROWS BETWEEN ...`: Specifies the precise sliding frame of rows relative to the current row (e.g. 7-day moving averages)."
      ]
    },
    {
      title: "Essential Window Functions Reference",
      explanation: "Here are the most valuable analytical window functions in production SQL:",
      table: {
        headers: ["Function", "Purpose", "Ties Behavior", "Common Use Case"],
        rows: [
          ["`ROW_NUMBER()`", "Assigns sequential integer 1, 2, 3... to each row", "Arbitrary tie resolution; no duplicates", "Deduplicating rows, top-N per category"],
          ["`RANK()`", "Assigns rank with gaps for ties (1, 2, 2, 4)", "Leaves gap after tied values", "Leaderboards with competitive tie gaps"],
          ["`DENSE_RANK()`", "Assigns rank without gaps (1, 2, 2, 3)", "Never skips integers after ties", "Official academic or tournament ranking"],
          ["`LAG(col, N)`", "Accesses attribute value from N rows BEFORE current", "Returns NULL if before start of partition", "Calculating day-over-day revenue growth"],
          ["`LEAD(col, N)`", "Accesses attribute value from N rows AFTER current", "Returns NULL if past end of partition", "Calculating session durations between events"],
          ["`SUM(col) OVER (...)`", "Computes cumulative running total", "Advances row by row", "Year-to-date budget burn, progress meters"]
        ]
      }
    },
    {
      title: "Production Scenario: Deduplicating Records with ROW_NUMBER()",
      explanation: "Suppose an external webhook accidentally sends duplicate student quiz submission records with identical student and quiz IDs. To pick only the latest submission per student, wrap a window function in a CTE:\n```sql\nWITH ranked_submissions AS (\n  SELECT *,\n    ROW_NUMBER() OVER (PARTITION BY student_id, quiz_id ORDER BY submitted_at DESC) AS rn\n  FROM submissions\n)\nSELECT * FROM ranked_submissions WHERE rn = 1;\n```\nThis classic pattern effortlessly extracts the latest record per entity."
    },
    {
      title: "Common Gotchas & Engineering Pitfalls",
      explanation: "Window functions execute in the query pipeline at Step 5.5, immediately after WHERE, GROUP BY, and HAVING have executed. Therefore, you CANNOT place a window function inside a WHERE clause (e.g. `WHERE ROW_NUMBER() OVER (...) = 1` causes an immediate syntax error). To filter on a window function's output, wrap the query in a CTE or subquery first."
    },
    {
      title: "Hands-On Practice Challenge",
      explanation: "Write a SQL query that ranks all courses within their respective departments by student enrollment count using `DENSE_RANK()`. Then use a CTE to select only the #1 most popular course for every department."
    }
  ],
  questions: [
    {
      id: "q-sql-062-1",
      prompt: "What is the primary difference between a window function and a standard GROUP BY aggregation?",
      options: [
        { id: "a", label: "Window functions only run on Microsoft Windows servers" },
        { id: "b", label: "GROUP BY collapses rows into a single summary row, while window functions compute values across rows without collapsing them" },
        { id: "c", label: "Window functions delete input rows after computing calculations" },
        { id: "d", label: "GROUP BY can only be used with numbers" }
      ],
      correctAnswer: "b",
      explanation: "Window functions calculate across a defined window of related records while preserving the individual row identity of every record in the output."
    },
    {
      id: "q-sql-062-2",
      prompt: "What is the difference between `RANK()` and `DENSE_RANK()` when two rows tie for 1st place?",
      options: [
        { id: "a", label: "There is no difference between them" },
        { id: "b", label: "RANK() leaves a gap (1, 1, 3), whereas DENSE_RANK() does not leave a gap (1, 1, 2)" },
        { id: "c", label: "DENSE_RANK() randomly assigns one to 1st and one to 2nd" },
        { id: "d", label: "RANK() converts ties to NULL" }
      ],
      correctAnswer: "b",
      explanation: "RANK leaves numerical gaps after tied scores (1, 1, 3), whereas DENSE_RANK continues sequentially without gaps (1, 1, 2)."
    },
    {
      id: "q-sql-062-3",
      prompt: "Why can't you write `WHERE ROW_NUMBER() OVER (...) <= 3` directly in a WHERE clause?",
      options: [
        { id: "a", label: "The number 3 is reserved in SQL" },
        { id: "b", label: "Window functions are evaluated after WHERE and HAVING clauses; you must wrap them in a CTE or subquery to filter" },
        { id: "c", label: "ROW_NUMBER only works in SQLite" },
        { id: "d", label: "WHERE clauses only support primary keys" }
      ],
      correctAnswer: "b",
      explanation: "Because WHERE executes at Step 2 and window functions execute at Step 5.5, window calculations do not exist yet when WHERE filters rows."
    },
    {
      id: "q-sql-062-4",
      prompt: "What clause divides rows into separate calculation groups within a window function?",
      options: [
        { id: "a", label: "DIVIDE BY" },
        { id: "b", label: "PARTITION BY" },
        { id: "c", label: "SEPARATE BY" },
        { id: "d", label: "CHUNK BY" }
      ],
      correctAnswer: "b",
      explanation: "The `PARTITION BY` sub-clause inside the `OVER (...)` construct splits the dataset into distinct partitions where window calculations compute independently."
    },
    {
      id: "q-sql-062-5",
      prompt: "What does `LAG(monthly_sales, 1) OVER (ORDER BY month ASC)` return?",
      options: [
        { id: "a", label: "The sales value from the preceding month" },
        { id: "b", label: "The sales value from the following month" },
        { id: "c", label: "The average sales across the entire year" },
        { id: "d", label: "A random past sales figure" }
      ],
      correctAnswer: "a",
      explanation: "The LAG(col, N) function retrieves the column value from N rows before the current row within the ordered partition."
    },
    {
      id: "q-sql-062-6",
      prompt: "What does `LEAD(timestamp, 1) OVER (PARTITION BY user_id ORDER BY timestamp ASC)` allow you to calculate?",
      options: [
        { id: "a", label: "The user's initial registration date" },
        { id: "b", label: "The elapsed time until the user's next subsequent event" },
        { id: "c", label: "The user's total login count" },
        { id: "d", label: "The user's password reset token" }
      ],
      correctAnswer: "b",
      explanation: "LEAD accesses the following row's value, enabling calculating the time interval between consecutive user actions."
    },
    {
      id: "q-sql-062-7",
      prompt: "What does `ROW_NUMBER() OVER ()` without PARTITION BY or ORDER BY produce?",
      options: [
        { id: "a", label: "An arbitrary, non-deterministic sequential integer 1..N across all returned rows" },
        { id: "b", label: "The primary key ID of each row" },
        { id: "c", label: "All zeroes" },
        { id: "d", label: "A syntax error" }
      ],
      correctAnswer: "a",
      explanation: "Without PARTITION BY or ORDER BY, the window encompasses the entire table and numbers rows in whatever physical order the storage engine retrieves them."
    },
    {
      id: "q-sql-062-8",
      prompt: "How can you compute a cumulative running total of daily platform signups?",
      options: [
        { id: "a", label: "SUM(daily_signups) OVER (ORDER BY signup_date ASC)" },
        { id: "b", label: "TOTAL(daily_signups) GROUP BY signup_date" },
        { id: "c", label: "RUNNING_SUM(daily_signups)" },
        { id: "d", label: "COUNT(daily_signups) OVER ()" }
      ],
      correctAnswer: "a",
      explanation: "An aggregate function with an `OVER (ORDER BY ...)` clause computes a cumulative running sum from the beginning of the partition up to the current row."
    },
    {
      id: "q-sql-062-9",
      prompt: "What is a 'window frame' specification like `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` used for?",
      options: [
        { id: "a", label: "Setting browser viewport dimensions" },
        { id: "b", label: "Computing sliding moving metrics, such as a 7-day moving average" },
        { id: "c", label: "Limiting total query execution to 6 seconds" },
        { id: "d", label: "Deleting 6 rows before committing" }
      ],
      correctAnswer: "b",
      explanation: "Specifying row frame bounds defines a sliding window (e.g. 6 previous rows + current row = 7 days) to calculate moving averages or rolling sums."
    },
    {
      id: "q-sql-062-10",
      prompt: "What is the standard pattern for extracting the single top-earning course from every department?",
      options: [
        { id: "a", label: "GROUP BY department ORDER BY price DESC LIMIT 1" },
        { id: "b", label: "Use a CTE computing DENSE_RANK() PARTITION BY department, then filter `WHERE rank = 1` in outer query" },
        { id: "c", label: "SELECT MAX(price) FROM courses" },
        { id: "d", label: "JOIN courses with itself 10 times" }
      ],
      correctAnswer: "b",
      explanation: "Ranking rows within partitions inside a CTE (`DENSE_RANK() OVER (PARTITION BY dept ORDER BY revenue DESC)`) and filtering for rank = 1 is the canonical Top-N per category pattern."
    }
  ]
};

// MODULE 3 QUIZ
const sqlModule03Quiz: CurriculumItem = {
  id: "item-sql-mod03-quiz",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-03-querying-analysis",
  moduleTitle: "Module 3: Querying and Analysis",
  modulePosition: 3,
  title: "Module 3 Assessment: Querying & Analysis MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 6,
  isModuleQuiz: true,
  contentHeading: "Module 3 Quiz: Aggregates, Joins, CTEs, Set Operations & Window Functions",
  contentDescription: "Evaluate your comprehensive mastery of SQL data analysis: GROUP BY grouping rules, HAVING filters, INNER vs LEFT JOINs, anti-joins, CTEs, UNION vs UNION ALL, and analytical window functions.",
  questions: [
    ...(lesson058.questions || []).slice(0, 2),
    ...(lesson059.questions || []).slice(0, 2),
    ...(lesson060.questions || []).slice(0, 2),
    ...(lesson061.questions || []).slice(0, 2),
    ...(lesson062.questions || []).slice(0, 2)
  ]
};

// MODULE 3 ASSESSMENT (LAB)
const sqlModule03Assessment: CurriculumItem = {
  id: "item-sql-mod03-lab",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-03-querying-analysis",
  moduleTitle: "Module 3: Querying and Analysis",
  modulePosition: 3,
  title: "Module 3 Lab: Multi-Table Analytics and Reporting",
  duration: "50 mins",
  type: "assignment",
  position: 7,
  isModuleAssessment: true,
  contentHeading: "Module 3 Lab Project: Multi-Table Analytics and Reporting",
  contentDescription: "Write advanced multi-table analytical reporting queries against a production educational schema. Combine junction tables, compute department aggregations, format dates, and rank top courses using window functions.",
  assignmentPrompt: {
    instructions: "Complete the analytical SQL lab:\n1. Create a script `analytics_report.sql`.\n2. Write a query computing department metrics: total courses, total enrolled students, and total revenue, filtering for departments with at least 5 students using HAVING.\n3. Write an anti-join query identifying courses that currently have zero enrollments.\n4. Write a CTE pipeline that computes the platform average course price and lists all courses priced above the platform average.\n5. Write a window function query that ranks courses within each department using `DENSE_RANK()` and calculates a running cumulative revenue sum per department.",
    deliverables: [
      "SQL script file with all five analytical queries properly commented",
      "Terminal query output displaying tabular reporting results",
      "Brief explanation of why CTEs and window functions improve query readability and maintainability"
    ]
  }
};

export const sqlModule03: CurriculumSubModule = {
  id: "module-sql-03-querying-analysis",
  subCourseId: "mod-database-sql",
  title: "Module 3 — Querying and analysis",
  description: "Summarize data with aggregate functions, connect normalized entities using multi-table JOINs, construct modular CTE pipelines, perform set operations, and calculate window rankings.",
  position: 3,
  items: [
    lesson058,
    lesson059,
    lesson060,
    lesson061,
    lesson062,
    sqlModule03Quiz,
    sqlModule03Assessment
  ]
};
