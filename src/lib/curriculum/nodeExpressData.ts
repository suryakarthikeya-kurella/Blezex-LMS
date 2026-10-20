import { CurriculumSubCourse, CurriculumItem } from "../curriculumTypes";
import { nodeModule01 } from "./node/module1";
import { nodeModule02 } from "./node/module2";
import { nodeModule03 } from "./node/module3";
import { nodeModule04 } from "./node/module4";
import { nodeModule05 } from "./node/module5";
import { nodeModule06 } from "./node/module6";

// =========================================================================
// SUB-COURSE 4: NODE.JS & EXPRESS.JS BACKEND ENGINEERING
// 6 Modules (Lessons 074 - 099) + Module Quizzes & Labs + Final Exam & Capstone
// =========================================================================

// SUB-COURSE FINAL CERTIFICATION EXAM (30 Questions across all 6 modules)
const nodeSubCourseExam: CurriculumItem = {
  id: "item-node-subcourse-certification-exam",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 6,
  title: "Sub-Course Assessment: Node.js & Express.js Engineering Certification Exam",
  duration: "50 mins",
  type: "quiz",
  position: 7,
  isSubCourseAssessment: true,
  contentHeading: "Node.js & Express.js Mastery Certification Exam: Server-Side JavaScript",
  contentDescription: "Comprehensive 30-question mastery exam covering runtime V8/libuv architecture, event loop phases, microtasks, npm determinism, ESM modules, fail-fast configuration, streams, backpressure, Buffer manipulation, HTTP semantics, Express middleware onion pipelines, 3-tier layering, custom AppError hierarchies, cursor pagination, Multer upload security, sliding-window rate limiting, bcrypt work factors, JWT HttpOnly cookie transmission, RBAC, IDOR prevention, CORS, Helmet headers, Mongoose ODM, Vitest unit testing, Supertest integration testing, and graceful SIGTERM shutdown.",
  questions: [
    ...(nodeModule01.items[0].questions || []).slice(0, 2), // Lesson 074
    ...(nodeModule01.items[1].questions || []).slice(0, 1), // Lesson 075
    ...(nodeModule01.items[2].questions || []).slice(0, 1), // Lesson 076
    ...(nodeModule01.items[3].questions || []).slice(0, 1), // Lesson 077
    ...(nodeModule02.items[0].questions || []).slice(0, 2), // Lesson 078
    ...(nodeModule02.items[1].questions || []).slice(0, 1), // Lesson 079
    ...(nodeModule02.items[2].questions || []).slice(0, 1), // Lesson 080
    ...(nodeModule03.items[0].questions || []).slice(0, 2), // Lesson 081
    ...(nodeModule03.items[1].questions || []).slice(0, 1), // Lesson 082
    ...(nodeModule03.items[2].questions || []).slice(0, 1), // Lesson 083
    ...(nodeModule03.items[3].questions || []).slice(0, 1), // Lesson 084
    ...(nodeModule03.items[4].questions || []).slice(0, 1), // Lesson 085
    ...(nodeModule04.items[0].questions || []).slice(0, 2), // Lesson 086
    ...(nodeModule04.items[1].questions || []).slice(0, 1), // Lesson 087
    ...(nodeModule04.items[2].questions || []).slice(0, 1), // Lesson 088
    ...(nodeModule04.items[3].questions || []).slice(0, 1), // Lesson 089
    ...(nodeModule04.items[4].questions || []).slice(0, 1), // Lesson 090
    ...(nodeModule04.items[5].questions || []).slice(0, 1), // Lesson 091
    ...(nodeModule05.items[0].questions || []).slice(0, 2), // Lesson 092
    ...(nodeModule05.items[1].questions || []).slice(0, 1), // Lesson 093
    ...(nodeModule05.items[2].questions || []).slice(0, 1), // Lesson 094
    ...(nodeModule05.items[3].questions || []).slice(0, 1), // Lesson 095
    ...(nodeModule06.items[0].questions || []).slice(0, 1), // Lesson 096
    ...(nodeModule06.items[1].questions || []).slice(0, 1), // Lesson 097
    ...(nodeModule06.items[2].questions || []).slice(0, 1)  // Lesson 098
  ]
};

// SUB-COURSE CAPSTONE PROJECT
const nodeSubCourseProject: CurriculumItem = {
  id: "item-node-subcourse-capstone-project",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-06-database-production",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 6,
  title: "Capstone Project: Enterprise E-Learning REST API Platform",
  duration: "4 hours",
  type: "assignment",
  position: 8,
  isSubCourseAssessment: true,
  contentHeading: "Node.js & Express.js Capstone: Full-Featured Enterprise API Engine",
  contentDescription: "Engineer a production-ready, secure, and testable REST API for an enterprise learning platform using Node.js, Express, PostgreSQL/MongoDB, JWT authentication in HttpOnly cookies, RBAC, Multer avatar uploads, rate limiting, and an automated integration test suite.",
  sections: [
    {
      title: "Project Architecture & Requirements",
      explanation: "Build a complete server-side application implementing professional software architecture principles:",
      bullets: [
        "3-Tier Architecture: Strictly partition application code into Routes, Controllers, Services, and Repositories using ECMAScript Modules.",
        "Authentication & Security: Implement user registration and login using bcrypt password hashing (cost factor 12) and short-lived JWTs stored in HttpOnly, Secure, SameSite cookies.",
        "Role-Based Authorization & IDOR Protection: Restrict administrative endpoints to admin roles and ensure instructors can only modify courses and lessons they authored.",
        "Declarative Input Validation: Validate all incoming body, query, and path parameters using Zod schemas with descriptive 400 Bad Request responses.",
        "Resilient Error Handling: Centralize error processing in a 4-argument error handler using a custom AppError class that shields internal stack traces in production.",
        "Scalable Data Retrieval: Implement keyset cursor pagination on the course catalog with allowlisted sorting.",
        "Media Uploads: Support secure avatar uploads with Multer, file size limits (2MB), MIME allowlisting, and random filename hashing.",
        "Automated Test Coverage: Author a comprehensive Supertest test suite asserting happy path and failure edge cases with code coverage reports."
      ]
    },
    {
      title: "API Endpoint Specifications",
      table: {
        headers: ["Method", "Endpoint", "Auth Required", "Access Roles", "Description"],
        rows: [
          ["POST", "/api/v1/auth/register", "NO", "Public", "Registers new student with hashed password"],
          ["POST", "/api/v1/auth/login", "NO", "Public", "Authenticates credentials and sets HttpOnly JWT cookie"],
          ["POST", "/api/v1/auth/logout", "YES", "All Roles", "Clears authentication cookie"],
          ["GET", "/api/v1/courses", "NO", "Public", "Retrieves paginated course catalog with filters"],
          ["POST", "/api/v1/courses", "YES", "Instructor / Admin", "Creates a new draft course"],
          ["PATCH", "/api/v1/courses/:id", "YES", "Course Author / Admin", "Updates course metadata (IDOR protected)"],
          ["DELETE", "/api/v1/courses/:id", "YES", "Course Author / Admin", "Deletes target course"],
          ["GET", "/health/live & /health/ready", "NO", "Public", "Liveness and database readiness probes"]
        ]
      }
    },
    {
      title: "Deliverables & Submission Guidelines",
      explanation: "Submit a GitHub repository containing:\n1. Complete Node.js codebase configured with `\"type\": \"module\"` and strict linting.\n2. `.env.example` documenting all configuration keys.\n3. Comprehensive test suite (`npm run test`) passing with 100% success rate.\n4. Multi-stage `Dockerfile` and `docker-compose.yml` demonstrating local container execution."
    }
  ]
};

// Aggregating all 6 modules
export const nodeExpressSubCourse: CurriculumSubCourse = {
  id: "mod-node-express",
  title: "Node.js & Express.js",
  position: 4,
  duration: "16 hours, 35 mins",
  description: "Build secure, scalable, and testable HTTP APIs using asynchronous server-side JavaScript, Express routing pipelines, 3-tier layering, JWT authentication, and production containerization across 6 modules (Lessons 074 to 099).",
  modules: [
    nodeModule01,
    nodeModule02,
    nodeModule03,
    nodeModule04,
    nodeModule05,
    nodeModule06
  ],
  courseAssessment: nodeSubCourseExam,
  courseProject: nodeSubCourseProject,
  items: [
    ...nodeModule01.items,
    ...nodeModule02.items,
    ...nodeModule03.items,
    ...nodeModule04.items,
    ...nodeModule05.items,
    ...nodeModule06.items,
    nodeSubCourseExam,
    nodeSubCourseProject
  ]
};
