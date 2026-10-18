import { CurriculumItem } from "../curriculumTypes";

export const jsGradedAssignment: CurriculumItem = {
  id: "item-js-graded-assignment",
  moduleId: "mod-js-fundamentals",
  moduleTitle: "Fundamentals of JavaScript",
  modulePosition: 2,
  title: "34. Graded Project Assignment: Interactive Task & Habit Manager",
  duration: "90 mins",
  type: "assignment",
  position: 34,
  contentHeading: "Graded Project Assignment: Production Task & Habit Manager",
  contentDescription: "Build a single-page interactive application combining modern JavaScript paradigms: ES6 classes / state management, DOM manipulation, form validation, event delegation, higher-order array methods, safe HTML text rendering, and localStorage synchronization.",
  assignmentPrompt: {
    instructions: `Build a complete, accessible, and reactive Task & Habit Management application in Vanilla JavaScript (HTML, CSS, and JS).

Requirements & Specification:
1. State Architecture: Maintain a centralized array of task objects: { id: string, title: string, category: string, completed: boolean, createdAt: number }.
2. Form Input & Validation: Include an input form to create new tasks with title and category. Trim inputs with String.prototype.trim(), prevent empty submissions, and stop page reload using event.preventDefault().
3. Unique Identifiers: Generate cryptographically secure UUIDs using crypto.randomUUID() for every task.
4. Rendering & DOM Updates: Use DocumentFragment or element.replaceChildren() to re-render the task list efficiently on state changes.
5. Interactive Controls:
   - Checkbox toggle to mark tasks completed / active.
   - Delete button to remove tasks from the list.
   - Filter dropdown (All, Active, Completed) using Array.prototype.filter().
   - Search input filtering tasks dynamically by title in real-time.
6. Persistence: Synchronize state with window.localStorage using JSON.stringify() on every mutation, and rehydrate tasks with JSON.parse(localStorage.getItem('tasks')) || [] on initial load.
7. Security: Use element.textContent (NOT innerHTML) when rendering user-submitted text to protect against Cross-Site Scripting (XSS) attacks.
8. Live Summary Bar: Dynamically calculate and display the total tasks, completed tasks, and active tasks using Array.prototype.reduce() or Array.prototype.filter().length.`,
    deliverables: [
      "Modular JavaScript code structured with functions and clean state separation.",
      "Strict form validation using String.prototype.trim() and event.preventDefault().",
      "Defensive security: 100% of dynamic user content rendered with textContent rather than innerHTML to prevent XSS vulnerabilities.",
      "Higher-order array operations: filter() for Active/Completed filtering and deletion.",
      "Synchronous localStorage persistence on every task add, toggle, and delete.",
      "Accurate dynamic counter displaying total tasks and completed tasks."
    ]
  }
};
