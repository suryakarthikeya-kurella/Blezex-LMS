import { CurriculumSubCourse, CurriculumItem } from "../curriculumTypes";
import { sqlModule01 } from "./sql/module1";
import { sqlModule02 } from "./sql/module2";
import { sqlModule03 } from "./sql/module3";
import { sqlModule04 } from "./sql/module4";
import { sqlModule05 } from "./sql/module5";
import { sqlModule06 } from "./sql/module6";

// =========================================================================
// SUB-COURSE 3: RELATIONAL DATABASES, SQL & DATA MODELING
// 6 Modules (Lessons 050 - 073) + Module Quizzes & Labs + Final Exam & Capstone
// =========================================================================

// SUB-COURSE FINAL CERTIFICATION EXAM (30 Questions across all 6 modules)
const sqlSubCourseExam: CurriculumItem = {
  id: "item-sql-subcourse-certification-exam",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-06-app-bridge",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 6,
  title: "Sub-Course Assessment: Database Engineering & SQL Mastery Certification Exam",
  duration: "50 mins",
  type: "quiz",
  position: 6,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 03 Certification Exam: Relational & Document Data Architecture",
  contentDescription: "Comprehensive 30-question mastery exam spanning database foundations, relational schema design, ACID transactions, isolation anomalies, B-Tree indexes, aggregation, complex joins, CTEs, window functions, query planning, stored procedures, SQL injection prevention, connection pooling, and MongoDB document bridges.",
  questions: [
    ...(sqlModule01.items[0].questions || []).slice(0, 2), // Lesson 050
    ...(sqlModule01.items[1].questions || []).slice(0, 2), // Lesson 051
    ...(sqlModule01.items[2].questions || []).slice(0, 2), // Lesson 052
    ...(sqlModule01.items[3].questions || []).slice(0, 2), // Lesson 053
    ...(sqlModule02.items[0].questions || []).slice(0, 2), // Lesson 054
    ...(sqlModule02.items[1].questions || []).slice(0, 2), // Lesson 055
    ...(sqlModule02.items[2].questions || []).slice(0, 2), // Lesson 056
    ...(sqlModule02.items[3].questions || []).slice(0, 1), // Lesson 057
    ...(sqlModule03.items[0].questions || []).slice(0, 2), // Lesson 058
    ...(sqlModule03.items[1].questions || []).slice(0, 2), // Lesson 059
    ...(sqlModule03.items[2].questions || []).slice(0, 1), // Lesson 060
    ...(sqlModule03.items[3].questions || []).slice(0, 1), // Lesson 061
    ...(sqlModule03.items[4].questions || []).slice(0, 1), // Lesson 062
    ...(sqlModule04.items[0].questions || []).slice(0, 2), // Lesson 063
    ...(sqlModule04.items[1].questions || []).slice(0, 2), // Lesson 064
    ...(sqlModule04.items[2].questions || []).slice(0, 1), // Lesson 065
    ...(sqlModule04.items[3].questions || []).slice(0, 1), // Lesson 066
    ...(sqlModule05.items[0].questions || []).slice(0, 1), // Lesson 067
    ...(sqlModule05.items[1].questions || []).slice(0, 1), // Lesson 068
    ...(sqlModule05.items[2].questions || []).slice(0, 1), // Lesson 069
    ...(sqlModule05.items[3].questions || []).slice(0, 1), // Lesson 070
    ...(sqlModule06.items[0].questions || []).slice(0, 1), // Lesson 071
    ...(sqlModule06.items[1].questions || []).slice(0, 1), // Lesson 072
    ...(sqlModule06.items[2].questions || []).slice(0, 1)  // Lesson 073
  ]
};

// SUB-COURSE CAPSTONE: ENTERPRISE LEARNING PLATFORM RELATIONAL DATA ENGINE
const sqlSubCourseProject: CurriculumItem = {
  id: "item-sql-subcourse-capstone-project",
  subCourseId: "mod-database-sql",
  subCourseTitle: "Database Fundamentals & SQL",
  subCoursePosition: 3,
  moduleId: "module-sql-06-app-bridge",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 6,
  title: "Capstone Project: Enterprise Learning Platform Schema & Analytics Engine",
  duration: "4 hours",
  type: "assignment",
  position: 7,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 03 Capstone: Full Relational Schema, Multi-Table Analytics & Safe Node.js Persistence",
  contentDescription: "Architect a production-grade database schema from scratch in PostgreSQL or MySQL. Implement 3NF normalization, foreign key cascading rules, check constraints, composite B-tree indexes, window functions for student rankings, and integrate with a Node.js API with connection pooling and parameterization.",
  sections: [
    {
      title: "Project Architecture & Requirements",
      explanation: "Design and implement a complete backend database architecture for an enterprise learning platform with thousands of daily concurrent users. Your database must support students, instructors, courses, modules, lessons, enrollments, quiz attempts, and financial transactions.",
      bullets: [
        "Database Normalization: Design tables in Third Normal Form (3NF) to eliminate update and deletion anomalies.",
        "Integrity Constraints: Enforce primary keys, foreign keys with ON DELETE RESTRICT, NOT NULL invariants, and CHECK constraints for pricing and ratings.",
        "Performance Indexing: Create composite B-Tree indexes for enrollment lookup and student transaction history; explain query plans using EXPLAIN ANALYZE.",
        "Reporting & Window Functions: Author analytical queries computing running course revenue, top-ranking students per cohort, and enrollment percentiles.",
        "Transactional Safety: Implement ACID bank transfer / enrollment reservation transactions with row-level locks (SELECT FOR UPDATE) to eliminate race conditions.",
        "Node.js Driver Integration: Connect an Express service using a pg / mysql2 connection pool with parameterized queries preventing SQL injection."
      ]
    },
    {
      title: "Core Schema Specification",
      table: {
        headers: ["Table Name", "Primary Key", "Foreign Keys", "Key Constraints"],
        rows: [
          ["users", "id (UUID / INT)", "None", "email VARCHAR(255) UNIQUE NOT NULL, role CHECK (role IN ('student', 'instructor', 'admin'))"],
          ["courses", "id (UUID / INT)", "instructor_id -> users(id)", "price DECIMAL(10,2) CHECK (price >= 0), status CHECK (status IN ('draft', 'published'))"],
          ["enrollments", "(student_id, course_id) Composite PK", "student_id -> users(id), course_id -> courses(id)", "enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW()"],
          ["course_reviews", "id (UUID / INT)", "student_id, course_id", "rating INT CHECK (rating BETWEEN 1 AND 5), UNIQUE(student_id, course_id)"],
          ["wallets", "student_id PK", "student_id -> users(id)", "balance DECIMAL(12,2) CHECK (balance >= 0)"]
        ]
      }
    },
    {
      title: "Deliverables & Submission Criteria",
      explanation: "Submit a GitHub repository containing:\n1. `schema.sql`: Complete DDL script initializing database, extensions, tables, check constraints, and indexes.\n2. `seeds.sql`: Synthetic data generator inserting 500 students, 20 courses, and 2,000 enrollments.\n3. `analytics.sql`: 5 complex reporting queries utilizing CTEs, INNER/LEFT JOINs, and window functions (ROW_NUMBER, DENSE_RANK, SUM() OVER).\n4. `service.js`: Node.js module utilizing a connection pool to execute a multi-step enrollment transaction with rollback on failure."
    }
  ]
};

// Aggregating all 6 modules
export const databaseSqlSubCourse: CurriculumSubCourse = {
  id: "mod-database-sql",
  title: "Database Fundamentals & SQL",
  position: 3,
  duration: "14 hours, 30 mins",
  description: "Master relational data modeling, normalized schema design, declarative SQL querying, ACID transactions, index optimization, and secure backend integration across 6 modules (Lessons 050 to 073).",
  modules: [
    sqlModule01,
    sqlModule02,
    sqlModule03,
    sqlModule04,
    sqlModule05,
    sqlModule06
  ],
  courseAssessment: sqlSubCourseExam,
  courseProject: sqlSubCourseProject,
  items: [
    ...sqlModule01.items,
    ...sqlModule02.items,
    ...sqlModule03.items,
    ...sqlModule04.items,
    ...sqlModule05.items,
    ...sqlModule06.items,
    sqlSubCourseExam,
    sqlSubCourseProject
  ]
};

