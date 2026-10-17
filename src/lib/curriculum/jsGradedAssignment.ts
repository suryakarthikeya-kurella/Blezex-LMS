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
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Task & Habit Manager</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 1.5rem;
    }
    .app-card {
      width: 100%;
      max-width: 600px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 1.25rem;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    p.subtitle { color: #94a3b8; font-size: 0.875rem; margin-bottom: 1.5rem; }
    form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    input[type="text"], select {
      flex: 1;
      padding: 0.75rem 1rem;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 0.5rem;
      color: white;
      font-size: 0.875rem;
    }
    button.btn-primary {
      padding: 0.75rem 1.25rem;
      background: #3b82f6;
      border: none;
      border-radius: 0.5rem;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
      color: #94a3b8;
    }
    ul.task-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
    li.task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 0.5rem;
    }
    li.task-item.completed span { text-decoration: line-through; opacity: 0.5; }
    .btn-delete {
      background: #ef4444;
      border: none;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.75rem;
    }
  </style>
</head>
<body>
  <div class="app-card">
    <h1>Task & Habit Manager</h1>
    <p class="subtitle">Vanilla JavaScript • State • LocalStorage • Secure DOM</p>

    <form id="task-form">
      <input id="task-input" type="text" placeholder="Add a new task..." required autocomplete="off" />
      <select id="task-category">
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
      </select>
      <button class="btn-primary" type="submit">Add Task</button>
    </form>

    <div class="toolbar">
      <select id="filter-select">
        <option value="all">All Tasks</option>
        <option value="active">Active Only</option>
        <option value="completed">Completed Only</option>
      </select>
      <div id="stats-counter">0 of 0 completed</div>
    </div>

    <ul id="task-list" class="task-list"></ul>
  </div>

  <script>
    // --- 1. STATE INITIALIZATION ---
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // --- 2. SELECT DOM ELEMENTS ---
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskCategory = document.getElementById("task-category");
    const filterSelect = document.getElementById("filter-select");
    const taskList = document.getElementById("task-list");
    const statsCounter = document.getElementById("stats-counter");

    function saveState() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // --- 3. REACTIVE RENDER FUNCTION ---
    function render() {
      taskList.replaceChildren();

      const filterVal = filterSelect.value;
      const filtered = tasks.filter(task => {
        if (filterVal === "active") return !task.completed;
        if (filterVal === "completed") return task.completed;
        return true;
      });

      filtered.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item" + (task.completed ? " completed" : "");

        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.gap = "0.75rem";
        label.style.flex = "1";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          task.completed = checkbox.checked;
          saveState();
          render();
        });

        const span = document.createElement("span");
        span.textContent = \`[\${task.category}] \${task.title}\`; // Safe XSS-proof plain text

        label.append(checkbox, span);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          tasks = tasks.filter(t => t.id !== task.id);
          saveState();
          render();
        });

        li.append(label, deleteBtn);
        taskList.appendChild(li);
      });

      const completedCount = tasks.filter(t => t.completed).length;
      statsCounter.textContent = \`\${completedCount} of \${tasks.length} completed\`;
    }

    // --- 4. FORM SUBMISSION HANDLER ---
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = taskInput.value.trim();
      if (!title) return;

      tasks.push({
        id: crypto.randomUUID(),
        title,
        category: taskCategory.value,
        completed: false,
        createdAt: Date.now()
      });

      saveState();
      render();
      taskInput.value = "";
    });

    filterSelect.addEventListener("change", render);

    // Initial render
    render();
  </script>
</body>
</html>`,
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
