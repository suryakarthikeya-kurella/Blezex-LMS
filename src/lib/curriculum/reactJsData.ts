import { CurriculumSubCourse, CurriculumItem } from "../curriculumTypes";
import { reactModule01 } from "./react/module1";
import { reactModule02 } from "./react/module2";
import { reactModule03 } from "./react/module3";
import { reactModule04 } from "./react/module4";
import { reactModule05 } from "./react/module5";
import { reactModule06 } from "./react/module6";

// =========================================================================
// SUB-COURSE 5: FRONTEND DEVELOPMENT WITH REACT.JS (COMPLETE 6 MODULES)
// Lessons 100 - 127 + Module Quizzes & Labs + Final Exam & Capstone
// =========================================================================

// SUB-COURSE FINAL CERTIFICATION EXAM
const reactSubCourseExam: CurriculumItem = {
  id: "item-react-final-certification-exam",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 6,
  title: "Sub-Course Assessment: React.js Comprehensive Certification Exam",
  duration: "45 mins",
  type: "quiz",
  position: 7,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 05 Certification Exam: React.js Master Architect",
  contentDescription: "Comprehensive examination covering all 6 modules: Virtual DOM reconciliation, JSX, component composition, synthetic events, useState snapshots, controlled forms, immutability, useEffect, race conditions, useRef, Context & useReducer, custom hooks, useId, client-side routing, protected routes, Redux Toolkit, nested routes, search params, API integration, performance memoization (useMemo/useCallback/React.memo), code splitting, accessibility, Vitest component testing, and Error Boundaries.",
  questions: [
    ...reactModule01.items[0].questions!.slice(0, 2), // Lesson 100
    ...reactModule01.items[1].questions!.slice(0, 2), // Lesson 101
    ...reactModule01.items[2].questions!.slice(0, 2), // Lesson 102
    ...reactModule02.items[0].questions!.slice(0, 2), // Lesson 104
    ...reactModule02.items[2].questions!.slice(0, 2), // Lesson 106
    ...reactModule02.items[3].questions!.slice(0, 2), // Lesson 107
    ...reactModule03.items[0].questions!.slice(0, 2), // Lesson 108
    ...reactModule03.items[1].questions!.slice(0, 2), // Lesson 109
    ...reactModule03.items[3].questions!.slice(0, 2), // Lesson 111
    ...reactModule04.items[0].questions!.slice(0, 2), // Lesson 114
    ...reactModule04.items[1].questions!.slice(0, 2), // Lesson 115
    ...reactModule04.items[4].questions!.slice(0, 2), // Lesson 118
    ...reactModule05.items[1].questions!.slice(0, 2), // Lesson 120
    ...reactModule05.items[3].questions!.slice(0, 2), // Lesson 122
    ...reactModule05.items[4].questions!.slice(0, 2)  // Lesson 123
  ]
};

// SUB-COURSE CAPSTONE PROJECT
const reactSubCourseProject: CurriculumItem = {
  id: "item-react-course-capstone-project",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 6,
  title: "Sub-Course Capstone Project: Enterprise Course Management Platform",
  duration: "2 hours",
  type: "assignment",
  position: 8,
  isSubCourseAssessment: true,
  contentHeading: "Sub-Course 05 Capstone: Full-Featured Course Management Platform",
  contentDescription: "Architect, develop, and deliver a production-grade course management platform featuring client-side routing, protected student dashboards, shareable URL search filters, controlled enrollment forms, error boundaries, performance memoization, and automated Vitest tests.",
  assignmentPrompt: {
    instructions: "Build a complete course catalog and student enrollment management platform:\n1. Routing & Layouts: Configure React Router with `/` (Catalog), `/courses/:id` (Details), `/dashboard` (Nested layout with persistent sidebar and `<Outlet />`), and `*` (404 Page).\n2. Protected Routes: Implement authentication guards redirecting unauthenticated users to `/login` with location return state.\n3. Shareable Search: Synchronize search keywords, category filters, and active pagination to URL query parameters using `useSearchParams`.\n4. Controlled Forms: Build an accessible student enrollment and review modal with `useId` for field linkages and live validation feedback.\n5. State Management: Manage global student enrollment and bookmarks with Context + useReducer or Redux Toolkit.\n6. Performance & Resilience: Wrap heavy views in `React.lazy()` with `<Suspense>`, memoize expensive filters with `useMemo`, and protect widgets with a Class Error Boundary.\n7. Test Coverage: Write Vitest tests with React Testing Library asserting accessible button clicks and form error flows.",
    deliverables: [
      "Modular, feature-based React source tree built with Vite",
      "Interactive routing, state synchronization, and controlled forms functioning with zero console warnings",
      "Comprehensive README with system architecture diagram, test commands, and live deployment link"
    ]
  }
};

export const reactJsSubCourse: CurriculumSubCourse = {
  id: "mod-react-essentials",
  title: "Frontend Development with React",
  position: 5,
  duration: "18 hours, 30 mins",
  description: "Master component-based web engineering with predictable state, client-side routing, API integration, performance optimization, and automated testing across 6 in-depth modules (Lessons 100 to 127).",
  modules: [
    reactModule01,
    reactModule02,
    reactModule03,
    reactModule04,
    reactModule05,
    reactModule06
  ],
  courseAssessment: reactSubCourseExam,
  courseProject: reactSubCourseProject,
  items: [
    ...reactModule01.items,
    ...reactModule02.items,
    ...reactModule03.items,
    ...reactModule04.items,
    ...reactModule05.items,
    ...reactModule06.items,
    reactSubCourseExam,
    reactSubCourseProject
  ]
};
