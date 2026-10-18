import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";
import { jsLessons1To10 } from "./jsLessons1To10";
import { jsLessons11To16 } from "./jsLessons11To16";
import { jsLessons17To21 } from "./jsLessons17To21";
import { jsLessons22To27 } from "./jsLessons22To27";
import { jsLessons28To32 } from "./jsLessons28To32";
import { jsModuleAssessment } from "./jsModuleAssessment";
import { jsGradedAssignment } from "./jsGradedAssignment";

// =========================================================================
// SUB-COURSE 2: MODERN JAVASCRIPT FUNDAMENTALS
// =========================================================================

// --- MODULE 1: LANGUAGE FUNDAMENTALS, VARIABLES & CONTROL FLOW (LESSONS 1-10) ---

const jsModule01Quiz: CurriculumItem = {
  id: "item-js-m1-quiz",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-01-syntax-control",
  moduleTitle: "Module 1: Language Syntax, Variables & Control Flow",
  modulePosition: 1,
  title: "Module 1 MCQs: JavaScript Syntax, Types & Logic Flow",
  duration: "25 mins",
  type: "quiz",
  position: 11,
  isModuleQuiz: true,
  contentHeading: "Module 1 Assessment: JavaScript Fundamentals Knowledge Check",
  contentDescription: "Evaluate your understanding of var/let/const, primitives vs references, type coercion, operators, switch/ternary branching, loops, and function declarations.",
  questions: [
    ...jsLessons1To10[0].questions!.slice(0, 3),
    ...jsLessons1To10[1].questions!.slice(0, 3),
    ...jsLessons1To10[2].questions!.slice(0, 3),
    ...jsLessons1To10[4].questions!.slice(0, 3),
    ...jsLessons1To10[6].questions!.slice(0, 3)
  ]
};

const jsModule01Assessment: CurriculumItem = {
  id: "item-js-m1-assessment",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-01-syntax-control",
  moduleTitle: "Module 1: Language Syntax, Variables & Control Flow",
  modulePosition: 1,
  title: "Module 1 Assessment: Interactive Logic & Algorithmic Calculator",
  duration: "45 mins",
  type: "assignment",
  position: 12,
  isModuleAssessment: true,
  contentHeading: "Module 1 Practical Challenge: Dynamic Pricing & Discount Engine",
  contentDescription: "Build a JavaScript module using functions, loops, and conditional branching that calculates tiered discounts, tax rates, and currency conversions based on customer loyalty tiers.",
  assignmentPrompt: {
    instructions: "Write a JavaScript utility `pricingCalculator.js`:\\n1. Implement `calculateDiscount(cartTotal, customerTier)` using switch and ternary operators.\\n2. Validate inputs using strict type equality (`===`) and throw meaningful Error instances on invalid inputs.\\n3. Use loops to iterate over cart items and calculate subtotal, sales tax, and final amount.\\n4. Provide test console outputs verifying edge cases (zero amount, unknown tier).",
    deliverables: [
      "JavaScript file with pure calculation functions",
      "Demonstration of let vs const usage without var",
      "Console verification of normal and error scenarios"
    ]
  }
};

const jsModule01: CurriculumSubModule = {
  id: "module-js-01-syntax-control",
  subCourseId: "mod-js-fundamentals",
  title: "Module 1: Language Syntax, Variables & Control Flow",
  description: "Master foundational JavaScript programming: execution environments, variables (let/const), primitive data types, type coercion, arithmetic & logical operators, conditional branching, loops, functions, and lexical scope.",
  position: 1,
  duration: "5 hours, 30 mins",
  lessons: jsLessons1To10,
  moduleQuiz: jsModule01Quiz,
  moduleAssessment: jsModule01Assessment,
  items: [...jsLessons1To10, jsModule01Quiz, jsModule01Assessment]
};

// --- MODULE 2: OBJECTS, ARRAYS & BROWSER DOM MANIPULATION (LESSONS 11-16) ---

const jsModule02Quiz: CurriculumItem = {
  id: "item-js-m2-quiz",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-02-dom-storage",
  moduleTitle: "Module 2: Objects, Arrays & Browser DOM Manipulation",
  modulePosition: 2,
  title: "Module 2 MCQs: Array Methods, Objects, DOM & Browser Storage",
  duration: "25 mins",
  type: "quiz",
  position: 19,
  isModuleQuiz: true,
  contentHeading: "Module 2 Assessment: Data Structures & DOM Check",
  contentDescription: "Evaluate your understanding of map/filter/reduce, object manipulation, querySelector, event listeners, form validation, and localStorage/sessionStorage.",
  questions: [
    ...jsLessons11To16[0].questions!.slice(0, 3),
    ...jsLessons11To16[1].questions!.slice(0, 3),
    ...jsLessons11To16[2].questions!.slice(0, 3),
    ...jsLessons11To16[3].questions!.slice(0, 3),
    ...jsLessons11To16[5].questions!.slice(0, 3)
  ]
};

const jsModule02Assessment: CurriculumItem = {
  id: "item-js-m2-assessment",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-02-dom-storage",
  moduleTitle: "Module 2: Objects, Arrays & Browser DOM Manipulation",
  modulePosition: 2,
  title: "Module 2 Assessment: Persistent Interactive Bookmarking Widget",
  duration: "50 mins",
  type: "assignment",
  position: 20,
  isModuleAssessment: true,
  contentHeading: "Module 2 Practical Challenge: Dynamic DOM List with LocalStorage",
  contentDescription: "Build an interactive web application that reads user input, renders dynamic DOM elements with event listeners, filters items using array methods, and syncs state to browser localStorage.",
  assignmentPrompt: {
    instructions: "Develop an interactive bookmarking component:\\n1. Listen to form submit events and prevent default page reload.\\n2. Validate URL formatting before adding bookmark objects to array.\\n3. Render bookmark cards to DOM dynamically using document.createElement or template strings.\\n4. Persist data in localStorage using JSON.stringify and load on startup with JSON.parse.\\n5. Add delete and favorite toggle buttons with event delegation.",
    deliverables: [
      "index.html and app.js with clean DOM event listeners",
      "Persistent state surviving browser page refreshes",
      "Array manipulation utilizing map, filter, and find"
    ]
  }
};

const jsModule02: CurriculumSubModule = {
  id: "module-js-02-dom-storage",
  subCourseId: "mod-js-fundamentals",
  title: "Module 2: Objects, Arrays & Browser DOM Manipulation",
  description: "Explore higher-order array methods, complex objects, DOM query selectors, dynamic element creation, event bubbling, form validation, and persistent browser storage.",
  position: 2,
  duration: "4 hours, 45 mins",
  lessons: jsLessons11To16,
  moduleQuiz: jsModule02Quiz,
  moduleAssessment: jsModule02Assessment,
  items: [...jsLessons11To16, jsModule02Quiz, jsModule02Assessment]
};

// --- MODULE 3: ES6+ FEATURES, ASYNCHRONOUS JAVASCRIPT & APIS (LESSONS 17-25) ---

const jsLessonsModule3 = [
  ...jsLessons17To21,
  jsLessons22To27[0], // 22. Callbacks
  jsLessons22To27[1], // 23. Promises
  jsLessons22To27[2], // 24. Async/Await
  jsLessons22To27[3]  // 25. Fetch API
];

const jsModule03Quiz: CurriculumItem = {
  id: "item-js-m3-quiz",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-03-async-apis",
  moduleTitle: "Module 3: ES6+ Features, Asynchronous JS & APIs",
  modulePosition: 3,
  title: "Module 3 MCQs: ES6+ Syntax, Promises, Async/Await & Fetch",
  duration: "25 mins",
  type: "quiz",
  position: 30,
  isModuleQuiz: true,
  contentHeading: "Module 3 Assessment: Modern JS & Async Architecture Check",
  contentDescription: "Evaluate your understanding of destructuring, spread/rest, ES modules, try/catch/finally, Promise states, async/await, and Fetch API network requests.",
  questions: [
    ...jsLessons17To21[0].questions!.slice(0, 3),
    ...jsLessons17To21[1].questions!.slice(0, 3),
    ...jsLessons22To27[1].questions!.slice(0, 3),
    ...jsLessons22To27[2].questions!.slice(0, 3),
    ...jsLessons22To27[3].questions!.slice(0, 3)
  ]
};

const jsModule03Assessment: CurriculumItem = {
  id: "item-js-m3-assessment",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-03-async-apis",
  moduleTitle: "Module 3: ES6+ Features, Asynchronous JS & APIs",
  modulePosition: 3,
  title: "Module 3 Assessment: Real-Time Weather & Currency API Dashboard",
  duration: "50 mins",
  type: "assignment",
  position: 31,
  isModuleAssessment: true,
  contentHeading: "Module 3 Practical Challenge: Asynchronous Multi-API Fetch Dashboard",
  contentDescription: "Build a real-world asynchronous application querying public REST APIs, handling loading spinners and network errors gracefully with async/await and destructuring.",
  assignmentPrompt: {
    instructions: "Build an API data consumer application:\\n1. Fetch data from a public REST API (e.g. GitHub Users or OpenWeather) using `fetch` and `async/await`.\\n2. Destructure properties from the received JSON response.\\n3. Implement comprehensive try/catch/finally handling with user-facing error banners on network failure.\\n4. Show a loading indicator during ongoing network requests and hide it in the finally block.",
    deliverables: [
      "Modular JavaScript code using ES6 import/export syntax",
      "Clean async/await structure without raw callback nesting",
      "Graceful error boundary displaying friendly messages on HTTP 404/500"
    ]
  }
};

const jsModule03: CurriculumSubModule = {
  id: "module-js-03-async-apis",
  subCourseId: "mod-js-fundamentals",
  title: "Module 3: ES6+ Features, Asynchronous JS & APIs",
  description: "Master modern ES6+ capabilities: template literals, destructuring, spread/rest, modules, error handling, JSON serialization, callback functions, Promises, async/await, and HTTP communication with Fetch.",
  position: 3,
  duration: "6 hours, 20 mins",
  lessons: jsLessonsModule3,
  moduleQuiz: jsModule03Quiz,
  moduleAssessment: jsModule03Assessment,
  items: [...jsLessonsModule3, jsModule03Quiz, jsModule03Assessment]
};

// --- MODULE 4: ADVANCED JAVASCRIPT INTERNALS, OOP & ARCHITECTURE (LESSONS 26-32) ---

const jsLessonsModule4 = [
  jsLessons22To27[4], // 26. Event Loop
  jsLessons22To27[5], // 27. Closures
  ...jsLessons28To32  // 28-32: this, classes, prototypes, performance, task tracker
];

const jsModule04Quiz: CurriculumItem = {
  id: "item-js-m4-quiz",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-04-internals-oop",
  moduleTitle: "Module 4: Advanced Internals, OOP & Architecture",
  modulePosition: 4,
  title: "Module 4 MCQs: Event Loop, Closures, 'this', Classes & Prototypes",
  duration: "25 mins",
  type: "quiz",
  position: 39,
  isModuleQuiz: true,
  contentHeading: "Module 4 Assessment: Advanced JavaScript Knowledge Check",
  contentDescription: "Evaluate your understanding of macro/microtask queues, lexical scoping, closures, explicit binding (call/apply/bind), prototypal inheritance, and ES6 classes.",
  questions: [
    ...jsLessons22To27[4].questions!.slice(0, 3),
    ...jsLessons22To27[5].questions!.slice(0, 3),
    ...jsLessons28To32[0].questions!.slice(0, 3),
    ...jsLessons28To32[1].questions!.slice(0, 3),
    ...jsLessons28To32[2].questions!.slice(0, 3)
  ]
};

const jsModule04Assessment: CurriculumItem = {
  id: "item-js-m4-assessment",
  subCourseId: "mod-js-fundamentals",
  subCourseTitle: "Fundamentals of JavaScript",
  subCoursePosition: 2,
  moduleId: "module-js-04-internals-oop",
  moduleTitle: "Module 4: Advanced Internals, OOP & Architecture",
  modulePosition: 4,
  title: "Module 4 Assessment: Object-Oriented State Machine with Closures",
  duration: "55 mins",
  type: "assignment",
  position: 40,
  isModuleAssessment: true,
  contentHeading: "Module 4 Practical Challenge: Encapsulated State Manager Class",
  contentDescription: "Design and implement a robust state management class in JavaScript utilizing ES6 class syntax, private fields (#), closures for encapsulation, and EventEmitter subscription patterns.",
  assignmentPrompt: {
    instructions: "Create an encapsulated Store class:\\n1. Define a `Store` class with a private field `#state` to prevent direct external mutation.\\n2. Implement a closure-based subscription method `subscribe(listener)` returning an `unsubscribe` function.\\n3. Provide `dispatch(action)` that computes the next state immutably.\\n4. Use explicit `bind` or arrow methods to ensure `this` context is preserved when passing dispatch callbacks.",
    deliverables: [
      "Complete Store class implementation with private properties",
      "Subscription mechanism cleanly registering and unregistering callbacks",
      "Unit-test script demonstrating state transitions without memory leaks"
    ]
  }
};

const jsModule04: CurriculumSubModule = {
  id: "module-js-04-internals-oop",
  subCourseId: "mod-js-fundamentals",
  title: "Module 4: Advanced Internals, OOP & Architecture",
  description: "Dive deep into the JavaScript engine: Event Loop call stack and microtasks, closures, explicit 'this' binding (call/apply/bind), prototypal inheritance, ES6 class syntax, and performance optimization.",
  position: 4,
  duration: "5 hours, 45 mins",
  lessons: jsLessonsModule4,
  moduleQuiz: jsModule04Quiz,
  moduleAssessment: jsModule04Assessment,
  items: [...jsLessonsModule4, jsModule04Quiz, jsModule04Assessment]
};

// =========================================================================
// SUB-COURSE FINAL ASSESSMENT
// =========================================================================

const jsSubCourseExam: CurriculumItem = {
  ...jsModuleAssessment,
  title: "Sub-Course Assessment: JavaScript Comprehensive Certification Exam",
  isSubCourseAssessment: true,
  position: 41
};

const jsSubCourseProject: CurriculumItem = {
  ...jsGradedAssignment,
  title: "Sub-Course Capstone Project: Interactive Task & Habit Manager",
  isSubCourseAssessment: true,
  position: 42
};

export const jsFundamentalsSubCourse: CurriculumSubCourse = {
  id: "mod-js-fundamentals",
  title: "Modern JavaScript Fundamentals",
  position: 2,
  duration: "22 hours, 30 mins",
  description: "Master modern ECMAScript from language primitives and DOM manipulation to asynchronous architecture, the Event Loop, closures, prototypes, and enterprise design patterns.",
  modules: [jsModule01, jsModule02, jsModule03, jsModule04],
  courseAssessment: jsSubCourseExam,
  courseProject: jsSubCourseProject,
  items: [
    ...jsModule01.items,
    ...jsModule02.items,
    ...jsModule03.items,
    ...jsModule04.items,
    jsSubCourseExam,
    jsSubCourseProject
  ]
};

/**
 * Backward compatibility alias
 */
export const jsFundamentalsModule = jsFundamentalsSubCourse;
