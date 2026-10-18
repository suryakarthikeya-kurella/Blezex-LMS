import { CurriculumSubCourse, CurriculumItem } from "../curriculumTypes";
import { gitModule01 } from "./git/module1";
import { gitModule02 } from "./git/module2";
import { gitModule03 } from "./git/module3";
import { gitModule04 } from "./git/module4";

// =========================================================================
// SUB-COURSE 6: VERSION CONTROL & COLLABORATION WITH GIT & GITHUB
// Complete 4 Modules (Lessons 128 to 143) + Quizzes + Final Exam & Capstone
// =========================================================================

// SUB-COURSE FINAL CERTIFICATION EXAM
const gitSubCourseExam: CurriculumItem = {
  id: "item-git-final-certification-exam",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 4,
  title: "Sub-Course Assessment: Git & GitHub Mastery Certification Exam",
  duration: "45 mins",
  type: "quiz",
  position: 7,
  isSubCourseAssessment: true,
  contentHeading: "Git & GitHub Mastery Certification Exam: Version Control & Team Collaboration",
  contentDescription: "Comprehensive examination covering all 4 modules: DVCS architecture, global configuration, the Three Areas, git status, git log, git diff, atomic commits, .gitignore rules, git restore vs git revert, branching, 3-way merges vs fast-forwards, merge conflict resolution protocols, remotes (origin), git fetch vs pull, push non-fast-forward rejections, git stash, rebase rules, pull requests, semantic versioning (SemVer), tags, GitHub permissions (403 diagnostics), and reflog disaster recovery.",
  questions: [
    ...gitModule01.items[0].questions!.slice(0, 2), // Lesson 128
    ...gitModule01.items[1].questions!.slice(0, 2), // Lesson 129
    ...gitModule01.items[2].questions!.slice(0, 2), // Lesson 130
    ...gitModule02.items[0].questions!.slice(0, 2), // Lesson 131
    ...gitModule02.items[1].questions!.slice(0, 2), // Lesson 132
    ...gitModule02.items[2].questions!.slice(0, 2), // Lesson 133
    ...gitModule02.items[3].questions!.slice(0, 2), // Lesson 134
    ...gitModule03.items[0].questions!.slice(0, 2), // Lesson 135
    ...gitModule03.items[1].questions!.slice(0, 2), // Lesson 136
    ...gitModule03.items[2].questions!.slice(0, 2), // Lesson 137
    ...gitModule03.items[3].questions!.slice(0, 2), // Lesson 138
    ...gitModule03.items[4].questions!.slice(0, 2), // Lesson 139
    ...gitModule04.items[0].questions!.slice(0, 2), // Lesson 140
    ...gitModule04.items[1].questions!.slice(0, 2), // Lesson 141
    ...gitModule04.items[3].questions!.slice(0, 2)  // Lesson 143
  ]
};

// SUB-COURSE CAPSTONE: FULL-STACK COURSE MANAGEMENT PLATFORM
const fullStackCapstoneProject: CurriculumItem = {
  id: "item-fullstack-capstone-platform",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Sub-Course Assessment",
  modulePosition: 4,
  title: "Capstone Project: Full-Stack Course Management Platform",
  duration: "3 hours",
  type: "assignment",
  position: 8,
  isSubCourseAssessment: true,
  contentHeading: "Full-Stack Capstone: Full-Stack Course Management Platform",
  contentDescription: "Build an enterprise application that synthesizes all six courses: HTML/CSS semantic layouts, JavaScript fundamentals, PostgreSQL database relational constraints, Node.js & Express RESTful API with JWT authorization, React.js frontend with routing and controlled forms, and a professional Git feature-branch workflow with automated testing.",
  assignmentPrompt: {
    instructions: "Deliver a production-ready Full-Stack Course Management Platform combining all six courses:\n\n" +
      "1. Architecture Flow:\n" +
      "   Browser -> React component -> API client -> HTTPS request\n" +
      "      ^                                      |\n" +
      "      | JSON response                       v\n" +
      "   React state/UI <- response <- Express route + middleware\n" +
      "                                     |\n" +
      "                                     v\n" +
      "                              service/business rules\n" +
      "                                     |\n" +
      "                                     v\n" +
      "                              database repository\n" +
      "                                     |\n" +
      "                                     v\n" +
      "                            persistent PostgreSQL records\n\n" +
      "2. Git Collaboration Workflow:\n" +
      "   - Issue -> Feature branch -> Focused atomic commits -> PR/review -> Automated CI tests -> Merge.\n\n" +
      "3. Core Acceptance Criteria:\n" +
      "   - Public course catalog with live search, filters, loading skeletons, empty state, and error recovery.\n" +
      "   - User registration & login with secure bcrypt password hashing (never store plaintext passwords).\n" +
      "   - Server-side authorization verifying identity and role on every sensitive endpoint.\n" +
      "   - Full course CRUD and enrollment relational integrity with foreign keys in PostgreSQL.\n" +
      "   - Accessible forms with <label htmlFor>, keyboard navigation, and visible focus outlines.\n" +
      "   - Automated unit and integration tests for API endpoints and React components.\n" +
      "   - Clean Git history with annotated release tag `v1.0.0` and deployment instructions in README.",
    deliverables: [
      "Full-stack GitHub repository with clean feature branch history and passing CI checks",
      "Interactive React frontend communicating with Node/Express API and PostgreSQL database",
      "Production deployment link with documentation on setup, environment variables, and testing"
    ]
  }
};

export const gitBasicsSubCourse: CurriculumSubCourse = {
  id: "mod-git-basics",
  title: "Version Control & Collaboration with Git & GitHub",
  position: 6,
  duration: "10 hours, 15 mins",
  description: "Master distributed version control, local staging areas, branch merging, conflict resolution, GitHub collaboration, and reflog disaster recovery across 4 in-depth modules (Lessons 128 to 143).",
  modules: [
    gitModule01,
    gitModule02,
    gitModule03,
    gitModule04
  ],
  courseAssessment: gitSubCourseExam,
  courseProject: fullStackCapstoneProject,
  items: [
    ...gitModule01.items,
    ...gitModule02.items,
    ...gitModule03.items,
    ...gitModule04.items,
    gitSubCourseExam,
    fullStackCapstoneProject
  ]
};
