import { CurriculumItem } from "../curriculumTypes";

export const jsLessons11To16: CurriculumItem[] = [
  {
    id: "item-js-array-methods",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "11. Array Methods — map(), filter(), reduce(), find()",
    duration: "40 mins",
    type: "cheatsheet",
    position: 11,
    contentHeading: "Lesson 11: Array Methods — map(), filter(), reduce(), find()",
    contentDescription: "Master the four essential higher-order array methods in modern JavaScript: transforming with map(), selecting with filter(), accumulating with reduce(), and searching with find().",
    codeSnippet: {
      language: "JavaScript",
      code: "const numbers = [10, 20, 30, 40, 50];\n\n// 1. map() -> Transform every element\nconst doubled = numbers.map(num => num * 2);\n\n// 2. filter() -> Select elements matching condition\nconst above25 = numbers.filter(num => num > 25); // [30, 40, 50]\n\n// 3. reduce() -> Combine elements into one accumulated result\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0); // 150\n\n// 4. find() -> Find first element matching condition\nconst firstMatch = numbers.find(num => num > 25); // 30"
    },
    sections: [
      {
        title: "11.1 What is an Array?",
        explanation: "An array is a foundational data structure in JavaScript used to store multiple values in a single variable. Each element inside an array has an index, starting from 0 (zero-indexed).",
        bullets: [
          "Index starts at 0: The first item is at index 0, the second at index 1, and so on.",
          "Common uses: Arrays are useful when storing lists of users, products, prices, marks, tasks, or messages.",
          "Dynamic sizing: JavaScript arrays can grow or shrink dynamically and can hold elements of any data type."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const fruits = [\"Apple\", \"Banana\", \"Mango\", \"Orange\"];\n\nconsole.log(fruits);\n// Output: [\"Apple\", \"Banana\", \"Mango\", \"Orange\"]\n\n// Each element has an index, starting from 0:\nconsole.log(fruits[0]); // Output: Apple\nconsole.log(fruits[1]); // Output: Banana\nconsole.log(fruits[2]); // Output: Mango\nconsole.log(fruits[3]); // Output: Orange"
        }
      },
      {
        title: "11.2 What are Array Methods?",
        explanation: "Array methods are built-in JavaScript functions that allow us to perform operations on arrays, such as transforming values, selecting elements, searching, and calculating totals.",
        bullets: [
          "Declarative programming: Avoids error-prone manual 'for' loops and index counters.",
          "Immutability: Methods like map, filter, and reduce create new results without modifying the original array.",
          "Method chaining: Multiple array operations can be chained together (e.g. .filter().map().reduce())."
        ],
        table: {
          headers: ["Method", "Purpose", "Returns", "Original Mutated?"],
          rows: [
            ["map()", "Transform every element", "A new array of equal length", "No (immutable)"],
            ["filter()", "Select matching elements", "A new array of matched elements", "No (immutable)"],
            ["reduce()", "Combine elements into one result", "An accumulated result (number, object, etc.)", "No (immutable)"],
            ["find()", "Find the first matching element", "One element or undefined", "No (immutable)"]
          ]
        },
        codeSnippet: {
          language: "JavaScript",
          code: "// Consider this source numbers array:\nconst numbers = [10, 20, 30, 40, 50];\n\n// 1. map: transform every element\nconst doubled = numbers.map(n => n * 2); // [20, 40, 60, 80, 100]\n\n// 2. filter: select matching elements\nconst above25 = numbers.filter(n => n > 25); // [30, 40, 50]\n\n// 3. reduce: combine elements into one result\nconst total = numbers.reduce((acc, curr) => acc + curr, 0); // 150\n\n// 4. find: find first matching element\nconst first = numbers.find(n => n > 25); // 30"
        }
      },
      {
        title: "11.2 The map() Method",
        explanation: "map() creates a new array by performing an operation on every element of the original array. It processes every element and collects the returned values into a new array of the same length.",
        bullets: [
          "Syntax: array.map((element, index, array) => { return newValue; })",
          "Returns a new array: The original array remains completely untouched.",
          "Always return a value: If you omit return inside curly braces {}, the element becomes undefined.",
          "Real-world use: Rendering a list of products or user cards in React applications."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "// Example: Transforming objects into HTML/React cards\nconst products = [\"Laptop\", \"Phone\", \"Tablet\"];\nconst productCards = products.map(product => `<li>${product}</li>`);\nconsole.log(productCards);\n// [\"<li>Laptop</li>\", \"<li>Phone</li>\", \"<li>Tablet</li>\"]\n\n// Extracting properties from objects:\nconst users = [{ name: \"Hari\", age: 22 }, { name: \"Ravi\", age: 24 }];\nconst names = users.map(u => u.name); // [\"Hari\", \"Ravi\"]"
        }
      },
      {
        title: "11.3 The filter() Method",
        explanation: "filter() creates a new array containing only the elements that satisfy a specified predicate condition (returns true). If the condition is false, the element is excluded.",
        bullets: [
          "Syntax: array.filter((element, index, array) => conditionBoolean)",
          "If no elements match the condition, filter() returns an empty array [].",
          "Real-world use: Search filtering, category filters, finding active users, and filtering completed tasks."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const products = [\n  { name: \"Laptop\", price: 50000 },\n  { name: \"Mouse\", price: 500 },\n  { name: \"Keyboard\", price: 1500 },\n  { name: \"Monitor\", price: 12000 }\n];\n\nconst affordable = products.filter(item => item.price < 2000);\nconsole.log(affordable);\n// Output: [{ name: \"Mouse\", price: 500 }, { name: \"Keyboard\", price: 1500 }]"
        }
      },
      {
        title: "11.4 The reduce() Method",
        explanation: "reduce() processes array elements and combines them into a single accumulated result. That result can be a number, string, object, or another array.",
        bullets: [
          "Syntax: array.reduce((accumulator, currentValue, index, array) => updatedAccumulator, initialValue)",
          "accumulator: Holds the running result built so far across iterations.",
          "initialValue: Always recommended! Without an initial value, an empty array throws TypeError: Reduce of empty array with no initial value.",
          "Can build complex objects such as frequency counts or grouped dictionaries."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "// Counting occurrences using an object accumulator:\nconst fruits = [\"Apple\", \"Banana\", \"Apple\", \"Mango\", \"Apple\"];\nconst count = fruits.reduce((result, fruit) => {\n  result[fruit] = (result[fruit] || 0) + 1;\n  return result;\n}, {});\nconsole.log(count);\n// Output: { Apple: 3, Banana: 1, Mango: 1 }"
        }
      },
      {
        title: "11.5 The find() Method",
        explanation: "find() returns the first element in the array that satisfies the testing condition. As soon as it finds a match, it immediately stops iterating and returns that single element. If no element matches, it returns undefined.",
        bullets: [
          "find() stops at the first match (unlike filter() which checks every item).",
          "Returns the element itself, NOT an array.",
          "If nothing matches, it returns undefined (not null or an empty array).",
          "Ideal for finding a unique user, product, or record by ID."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const users = [\n  { id: 1, name: \"Hari\" },\n  { id: 2, name: \"Ravi\" },\n  { id: 3, name: \"Ram\" }\n];\n\nconst found = users.find(u => u.id === 2);\nconsole.log(found); // { id: 2, name: \"Ravi\" }\n\nconst missing = users.find(u => u.id === 99);\nconsole.log(missing); // undefined"
        }
      },
      {
        title: "11.6 Comparison and Memory Tricks",
        explanation: "Keep these memory associations in mind to choose the right method for any problem:",
        bullets: [
          "map = modify the representation of every item (returns same length array).",
          "filter = keep matching items (returns new array with 0 to N items).",
          "reduce = combine multiple items into a single accumulated value.",
          "find = get the first matching item (returns 1 item or undefined)."
        ]
      }
    ],
    questions: [
      {
        id: "q-arr-m-1",
        prompt: "What does Array.prototype.map() do to the original source array?",
        options: [
          { id: "am1", label: "It leaves the original array untouched and returns a new transformed array." },
          { id: "am2", label: "It mutates and overwrites the original array in place." },
          { id: "am3", label: "It removes elements that do not match a condition." },
          { id: "am4", label: "It converts the array into a string." }
        ],
        correctIndex: 0,
        explanation: "map() is pure and non-destructive: it does not alter the original array, but produces a new array of the same length containing transformed elements."
      },
      {
        id: "q-arr-m-2",
        prompt: "What will '[1, 2, 3].map(x => { x * 2; })' return? (Notice the curly braces without return)",
        options: [
          { id: "am5", label: "[2, 4, 6]" },
          { id: "am6", label: "[undefined, undefined, undefined]" },
          { id: "am7", label: "It throws a SyntaxError." },
          { id: "am8", label: "[1, 2, 3]" }
        ],
        correctIndex: 1,
        explanation: "When using curly braces in an arrow function, an explicit 'return' statement is required. Without it, the function returns undefined for each item."
      },
      {
        id: "q-arr-m-3",
        prompt: "What does 'filter()' return if no elements in the array satisfy the condition?",
        options: [
          { id: "am9", label: "null" },
          { id: "am10", label: "undefined" },
          { id: "am11", label: "An empty array []" },
          { id: "am12", label: "false" }
        ],
        correctIndex: 2,
        explanation: "filter() always returns an array. If no elements match the predicate, it returns a new empty array []."
      },
      {
        id: "q-arr-m-4",
        prompt: "How does 'find()' differ from 'filter()'?",
        options: [
          { id: "am13", label: "'find()' stops at the first match and returns that single element; 'filter()' evaluates every item and returns an array of all matches." },
          { id: "am14", label: "'find()' returns an array, while 'filter()' returns a boolean." },
          { id: "am15", label: "'find()' mutates the array; 'filter()' does not." },
          { id: "am16", label: "There is no difference; they are aliases." }
        ],
        correctIndex: 0,
        explanation: "'find()' searches until the first element satisfying the test is found and returns that element immediately. 'filter()' collects all matching items into a new array."
      },
      {
        id: "q-arr-m-5",
        prompt: "What will '[10, 20, 30].find(num => num > 100)' return?",
        options: [
          { id: "am17", label: "null" },
          { id: "am18", label: "-1" },
          { id: "am19", label: "undefined" },
          { id: "am20", label: "[]" }
        ],
        correctIndex: 2,
        explanation: "When no element satisfies the testing condition in find(), it returns undefined."
      },
      {
        id: "q-arr-m-6",
        prompt: "What is the purpose of the second argument 'initialValue' in 'array.reduce(callback, initialValue)'?",
        options: [
          { id: "am21", label: "It defines the starting value of the accumulator for the first iteration." },
          { id: "am22", label: "It specifies how many times to repeat the reduction." },
          { id: "am23", label: "It sorts the array before reducing." },
          { id: "am24", label: "It sets the timeout delay in milliseconds." }
        ],
        correctIndex: 0,
        explanation: "initialValue initializes the accumulator. Providing an initial value guarantees predictable behavior, especially on empty arrays or when accumulating into objects/arrays."
      },
      {
        id: "q-arr-m-7",
        prompt: "What happens if you call '[].reduce((acc, curr) => acc + curr)' without an initial value?",
        options: [
          { id: "am25", label: "It returns 0." },
          { id: "am26", label: "It returns undefined." },
          { id: "am27", label: "It throws a TypeError: Reduce of empty array with no initial value." },
          { id: "am28", label: "It returns NaN." }
        ],
        correctIndex: 2,
        explanation: "Calling reduce() on an empty array without an initial value throws a TypeError because there is no initial element to assign as the accumulator."
      },
      {
        id: "q-arr-m-8",
        prompt: "Can 'reduce()' return a value that is NOT a number, such as an object or array?",
        options: [
          { id: "am29", label: "Yes, reduce() can return any data type depending on what you accumulate." },
          { id: "am30", label: "No, reduce() is strictly for mathematical summation." },
          { id: "am31", label: "Only if configured with a BigInt." },
          { id: "am32", label: "Only in Node.js, not in web browsers." }
        ],
        correctIndex: 0,
        explanation: "reduce() is versatile: by supplying an empty object {} or array [] as initialValue, it can group, count, flatten, or transform data into any shape."
      },
      {
        id: "q-arr-m-9",
        prompt: "In '[10, 20, 30].map((element, index) => index)', what will the returned array be?",
        options: [
          { id: "am33", label: "[10, 20, 30]" },
          { id: "am34", label: "[0, 1, 2]" },
          { id: "am35", label: "[1, 2, 3]" },
          { id: "am36", label: "[undefined, undefined, undefined]" }
        ],
        correctIndex: 1,
        explanation: "The second parameter of map's callback is the zero-based index of the current item, so returning index yields [0, 1, 2]."
      },
      {
        id: "q-arr-m-10",
        prompt: "Which method is best suited to calculate the total price of all items in a shopping cart array?",
        options: [
          { id: "am37", label: "cart.map()" },
          { id: "am38", label: "cart.filter()" },
          { id: "am39", label: "cart.reduce()" },
          { id: "am40", label: "cart.find()" }
        ],
        correctIndex: 2,
        explanation: "reduce() combines all individual item prices into a single total numeric sum: cart.reduce((total, item) => total + item.price, 0)."
      }
    ]
  },
  {
    id: "item-js-objects",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "12. Objects in JavaScript",
    duration: "40 mins",
    type: "cheatsheet",
    position: 12,
    contentHeading: "Lesson 12: Objects in JavaScript",
    contentDescription: "Understand key-value data structures, dot vs bracket notation, methods, 'this' keyword, nested properties, optional chaining, Object static methods, and reference mutability.",
    codeSnippet: {
      language: "JavaScript",
      code: "const student = {\n  name: \"Hari\",\n  age: 22,\n  course: \"Computer Science\",\n  skills: [\"HTML\", \"CSS\", \"JavaScript\"],\n  address: { city: \"Vizianagaram\", state: \"AP\" },\n  greet() {\n    return `Hello, my name is ${this.name}!`;\n  }\n};\n\nconsole.log(student.name);          // Dot notation\nconsole.log(student[\"course\"]);     // Bracket notation\nconsole.log(student.greet());       // Method invocation\nconsole.log(student.address?.city); // Optional chaining"
    },
    sections: [
      {
        title: "12.1 What is an Object?",
        explanation: "An object is a data structure that stores related information as key-value pairs. A key (property name) identifies a property, and its value contains the associated data. Objects can store strings, numbers, booleans, arrays, functions, and nested objects.",
        bullets: [
          "Key: The property identifier (e.g. name, age).",
          "Value: The data associated with the key (e.g. 'Hari', 22).",
          "Property: The combination of a key and its value.",
          "Method: A function stored as an object property."
        ]
      },
      {
        title: "12.2 Accessing Properties: Dot vs Bracket Notation",
        explanation: "JavaScript provides two ways to access object properties. Dot notation (student.name) is preferred when property names are known in advance. Bracket notation (student['name'] or student[variable]) is essential when property names contain spaces or are stored in variables.",
        bullets: [
          "Dot notation: obj.propertyName (convenient and standard).",
          "Bracket notation: obj[expression] (evaluates the expression inside brackets).",
          "Crucial difference: obj.key looks for a property literally named 'key', while obj[key] looks for the property named in the variable 'key'."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const user = { name: \"Hari\", \"favorite subject\": \"JavaScript\" };\nconsole.log(user.name); // \"Hari\"\nconsole.log(user[\"favorite subject\"]); // Spaces require brackets\n\nconst propName = \"name\";\nconsole.log(user[propName]); // \"Hari\" (dynamic key)"
        }
      },
      {
        title: "12.3 Adding, Modifying, and Deleting Properties",
        explanation: "Properties can be added by assigning to new keys, modified by reassigning existing keys, and removed using the 'delete' operator. Declaring an object with 'const' prevents reassigning the variable, but does not prevent modifying its properties.",
        codeSnippet: {
          language: "JavaScript",
          code: "const student = { name: \"Hari\" };\nstudent.age = 22;      // Add property\nstudent.age = 23;      // Update property\ndelete student.age;    // Delete property\n// student = {};       // TypeError: Assignment to constant variable"
        }
      },
      {
        title: "12.4 Methods and the 'this' Keyword",
        explanation: "When a function is stored as a property on an object, it is called a method. Inside a standard method, 'this' refers to the calling object before the dot. Arrow functions do NOT have their own 'this', so standard methods are preferred for object properties.",
        codeSnippet: {
          language: "JavaScript",
          code: "const calculator = {\n  a: 10,\n  b: 20,\n  add() {\n    return this.a + this.b; // 'this' refers to calculator\n  }\n};\nconsole.log(calculator.add()); // 30"
        }
      },
      {
        title: "12.5 Nested Objects & Optional Chaining (?.)",
        explanation: "Objects can nest other objects. If an intermediate property is null or undefined, accessing a deep property causes a TypeError. Optional chaining (?.) safely short-circuits and evaluates to undefined instead of crashing.",
        codeSnippet: {
          language: "JavaScript",
          code: "const user = { name: \"Hari\", address: { city: \"Vizianagaram\" } };\nconsole.log(user.address?.city); // \"Vizianagaram\"\n\nconst emptyUser = {};\nconsole.log(emptyUser.address?.city); // undefined (safe! No crash)"
        }
      },
      {
        title: "12.6 Built-in Object Methods & Immutability",
        explanation: "JavaScript provides static utility methods to inspect and protect objects:",
        bullets: [
          "Object.keys(obj): Returns an array of keys (e.g. ['name', 'age']).",
          "Object.values(obj): Returns an array of values (e.g. ['Hari', 22]).",
          "Object.entries(obj): Returns an array of [key, value] pairs.",
          "Object.freeze(obj): Prevents any additions, deletions, or modifications to existing properties.",
          "Object.seal(obj): Prevents adding or removing properties, but allows modifying existing writable properties."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const settings = { theme: \"light\" };\nObject.freeze(settings);\nsettings.theme = \"dark\"; // Silently ignored (or throws error in strict mode)\nconsole.log(settings.theme); // \"light\""
        }
      }
    ],
    questions: [
      {
        id: "q-obj-1",
        prompt: "Why does '{ age: 22 } === { age: 22 }' evaluate to false in JavaScript?",
        options: [
          { id: "ob1", label: "Each object literal creates a distinct object in memory with a different reference." },
          { id: "ob2", label: "JavaScript does not allow comparing numbers inside objects." },
          { id: "ob3", label: "Because strict equality (===) coerces objects to strings." },
          { id: "ob4", label: "Object properties are private by default." }
        ],
        correctIndex: 0,
        explanation: "Objects are reference types. Strict equality (===) checks whether both operands refer to the exact same memory reference, not whether their properties match."
      },
      {
        id: "q-obj-2",
        prompt: "What does 'const key = \"name\"; user[key]' access?",
        options: [
          { id: "ob5", label: "The property whose name is stored in the variable 'key' (i.e. user.name)." },
          { id: "ob6", label: "A property literally named 'key'." },
          { id: "ob7", label: "It throws a SyntaxError." },
          { id: "ob8", label: "An array of all keys." }
        ],
        correctIndex: 0,
        explanation: "Bracket notation evaluates the variable or expression inside brackets. Since key = 'name', user[key] evaluates to user['name']."
      },
      {
        id: "q-obj-3",
        prompt: "What happens when you declare an object with 'const' and update one of its properties?",
        options: [
          { id: "ob9", label: "It is allowed, because 'const' prevents reassigning the variable binding, not mutating properties." },
          { id: "ob10", label: "JavaScript throws a TypeError: Assignment to constant variable." },
          { id: "ob11", label: "The property reverts to undefined." },
          { id: "ob12", label: "It converts the object into an immutable Symbol." }
        ],
        correctIndex: 0,
        explanation: "'const' creates an immutable binding to the object reference in memory. The object itself remains fully mutable unless frozen with Object.freeze()."
      },
      {
        id: "q-obj-4",
        prompt: "What operator is used to remove a property from an object?",
        options: [
          { id: "ob13", label: "remove" },
          { id: "ob14", label: "delete" },
          { id: "ob15", label: "pop" },
          { id: "ob16", label: "clear" }
        ],
        correctIndex: 1,
        explanation: "The 'delete' operator deletes a property from an object (e.g. delete student.age)."
      },
      {
        id: "q-obj-5",
        prompt: "What does optional chaining (user.profile?.address?.city) do if 'user.profile' is undefined?",
        options: [
          { id: "ob17", label: "It throws a TypeError: Cannot read properties of undefined." },
          { id: "ob18", label: "It short-circuits and safely returns 'undefined' without throwing an error." },
          { id: "ob19", label: "It creates an empty object in place." },
          { id: "ob20", label: "It reloads the page." }
        ],
        correctIndex: 1,
        explanation: "The ?. operator checks if the value on its left is null or undefined; if so, it immediately short-circuits and evaluates to undefined."
      },
      {
        id: "q-obj-6",
        prompt: "Why are standard functions preferred over arrow functions for object methods that need 'this'?",
        options: [
          { id: "ob21", label: "Arrow functions do not have their own 'this' binding and inherit 'this' from the outer lexical scope." },
          { id: "ob22", label: "Arrow functions cannot return values." },
          { id: "ob23", label: "Arrow functions execute much slower." },
          { id: "ob24", label: "Arrow functions are deprecated in ES6+." }
        ],
        correctIndex: 0,
        explanation: "Standard methods dynamically bind 'this' to the calling object. Arrow functions retain the 'this' of their enclosing lexical context (often window or undefined)."
      },
      {
        id: "q-obj-7",
        prompt: "What does 'Object.keys(obj)' return?",
        options: [
          { id: "ob25", label: "An array of the object's own enumerable property names (keys) as strings." },
          { id: "ob26", label: "An array of property values." },
          { id: "ob27", label: "A single comma-separated string." },
          { id: "ob28", label: "The total number of properties." }
        ],
        correctIndex: 0,
        explanation: "Object.keys({ name: 'Hari', age: 22 }) returns ['name', 'age']."
      },
      {
        id: "q-obj-8",
        prompt: "What is the difference between 'Object.freeze()' and 'Object.seal()'?",
        options: [
          { id: "ob29", label: "freeze() prevents all modifications to properties; seal() prevents adding/deleting properties but allows updating existing writable properties." },
          { id: "ob30", label: "seal() makes the object completely immutable; freeze() does not." },
          { id: "ob31", label: "freeze() automatically deep-freezes nested objects." },
          { id: "ob32", label: "There is no functional difference." }
        ],
        correctIndex: 0,
        explanation: "Object.freeze() makes all own properties read-only. Object.seal() prevents new properties from being added or existing ones deleted, but existing properties can still be modified."
      },
      {
        id: "q-obj-9",
        prompt: "If 'const a = { x: 10 }; const b = a; b.x = 20;', what will 'a.x' be?",
        options: [
          { id: "ob33", label: "10" },
          { id: "ob34", label: "20, because both variables reference the exact same object in memory." },
          { id: "ob35", label: "undefined" },
          { id: "ob36", label: "NaN" }
        ],
        correctIndex: 1,
        explanation: "Assigning an object to another variable copies the reference, not the object. Mutating 'b' directly mutates the object that 'a' points to."
      },
      {
        id: "q-obj-10",
        prompt: "What does 'const clone = { ...original };' do when 'original' has nested objects?",
        options: [
          { id: "ob37", label: "It creates a deep clone where all nested objects are independent copies." },
          { id: "ob38", label: "It creates a shallow copy: top-level properties are cloned, but nested objects still share references." },
          { id: "ob39", label: "It throws a TypeError on nested objects." },
          { id: "ob40", label: "It converts nested objects into strings." }
        ],
        correctIndex: 1,
        explanation: "Object spread creates a shallow copy only. Nested objects are copied by reference; to deeply clone nested data, use structuredClone()."
      }
    ]
  },
  {
    id: "item-js-dom-fundamentals",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "13. DOM Fundamentals",
    duration: "40 mins",
    type: "cheatsheet",
    position: 13,
    contentHeading: "Lesson 13: DOM Fundamentals",
    contentDescription: "Understand the Document Object Model (DOM) tree, element selection (querySelector, getElementById), textContent vs innerHTML, CSS styling, classList, creating/removing nodes, and traversal.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Select elements\nconst heading = document.querySelector(\"#heading\");\nconst taskInput = document.querySelector(\"#taskInput\");\nconst taskList = document.querySelector(\"#taskList\");\n\n// 2. Modify text and classes\nheading.textContent = \"Updated Title\";\nheading.classList.add(\"highlight\");\n\n// 3. Create and append new DOM nodes\nconst item = document.createElement(\"li\");\nitem.textContent = \"Learn JavaScript DOM\";\ntaskList.appendChild(item);\n\n// 4. Remove elements\n// item.remove();"
    },
    sections: [
      {
        title: "13.1 What is the DOM?",
        explanation: "DOM stands for Document Object Model. It is a programming interface that represents an HTML document as a hierarchical tree of objects. JavaScript uses this interface to read, manipulate, add, style, and delete page elements dynamically.",
        bullets: [
          "Document: The entire loaded HTML page (root node).",
          "Element: A node representing an HTML tag (div, h1, button).",
          "Text Node: The actual text contained inside an element.",
          "Parent/Child/Sibling: The hierarchical relationships between DOM nodes."
        ]
      },
      {
        title: "13.2 Selecting HTML Elements",
        explanation: "Before JavaScript can modify an element, it must select it from the DOM tree:",
        bullets: [
          "document.getElementById('id'): Selects a single element by its ID (fastest).",
          "document.querySelector('cssSelector'): Selects the first element matching any CSS selector (#id, .class, tag).",
          "document.querySelectorAll('cssSelector'): Returns a static NodeList of all matching elements.",
          "getElementsByClassName() / getElementsByTagName(): Return live HTMLCollections."
        ]
      },
      {
        title: "13.3 textContent vs innerHTML (Security Warning)",
        explanation: "textContent reads or writes raw, unparsed text. innerHTML parses and renders HTML tags. NEVER assign untrusted user input directly to innerHTML because it enables Cross-Site Scripting (XSS) attacks. Always prefer textContent for safe text display.",
        codeSnippet: {
          language: "JavaScript",
          code: "const box = document.querySelector(\"#box\");\nbox.textContent = \"<span>Hello</span>\"; // Displays literal text: <span>Hello</span>\nbox.innerHTML = \"<span>Hello</span>\";   // Renders a real <span> element inside #box"
        }
      },
      {
        title: "13.4 Manipulating CSS Styles & Classes",
        explanation: "CSS styles can be set inline via the element.style property (using camelCase property names like backgroundColor, fontSize), but the recommended best practice is toggling CSS classes with classList.",
        bullets: [
          "element.classList.add('className'): Adds a class.",
          "element.classList.remove('className'): Removes a class.",
          "element.classList.toggle('className'): Adds if absent, removes if present.",
          "element.classList.contains('className'): Returns true or false."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const btn = document.querySelector(\"#themeToggle\");\nbtn.classList.toggle(\"dark-mode\");\nconsole.log(btn.classList.contains(\"dark-mode\")); // true or false"
        }
      },
      {
        title: "13.5 Creating, Appending, and Removing Elements",
        explanation: "JavaScript can dynamically construct elements in memory and mount them to the live page:",
        bullets: [
          "document.createElement('tagName'): Creates an element node in memory.",
          "parent.appendChild(childNode): Inserts childNode at the end of parent.",
          "parent.append(nodesOrStrings): Appends multiple nodes or strings in one call.",
          "element.remove(): Removes the element directly from the DOM.",
          "parent.removeChild(childNode): Removes a specific child node."
        ]
      },
      {
        title: "13.6 DOM Traversal",
        explanation: "DOM traversal allows navigation between related elements without querying again:",
        bullets: [
          "parentElement: Accesses the immediate parent node.",
          "children: Returns an HTMLCollection of direct element children.",
          "firstElementChild / lastElementChild: The first and last child elements.",
          "nextElementSibling / previousElementSibling: Adjacent sibling elements."
        ]
      }
    ],
    questions: [
      {
        id: "q-dom-f-1",
        prompt: "What does DOM stand for?",
        options: [
          { id: "dm1", label: "Document Object Model" },
          { id: "dm2", label: "Data Oriented Method" },
          { id: "dm3", label: "Digital Output Management" },
          { id: "dm4", label: "Direct Object Mapping" }
        ],
        correctIndex: 0,
        explanation: "DOM stands for Document Object Model, which is the browser's structured object representation of the HTML document."
      },
      {
        id: "q-dom-f-2",
        prompt: "Which method is the most versatile because it accepts any valid CSS selector string?",
        options: [
          { id: "dm5", label: "document.getElementById()" },
          { id: "dm6", label: "document.querySelector()" },
          { id: "dm7", label: "document.getElementsByTagName()" },
          { id: "dm8", label: "document.getElementsByName()" }
        ],
        correctIndex: 1,
        explanation: "document.querySelector() and querySelectorAll() support full CSS selector syntax (.class, #id, div > p, input[type='email'])."
      },
      {
        id: "q-dom-f-3",
        prompt: "Why should you prefer 'textContent' over 'innerHTML' when inserting user-provided text?",
        options: [
          { id: "dm9", label: "'innerHTML' can execute malicious script tags and cause Cross-Site Scripting (XSS) vulnerabilities; 'textContent' treats input as safe plain text." },
          { id: "dm10", label: "'textContent' is only supported in Internet Explorer." },
          { id: "dm11", label: "'innerHTML' changes the browser URL." },
          { id: "dm12", label: "'textContent' automatically translates text into Spanish." }
        ],
        correctIndex: 0,
        explanation: "Inserting untrusted input into innerHTML allows attackers to inject malicious HTML and scripts (XSS). textContent escapes markup and only sets plain text."
      },
      {
        id: "q-dom-f-4",
        prompt: "How does CSS 'background-color' translate into JavaScript style properties?",
        options: [
          { id: "dm13", label: "element.style.background-color" },
          { id: "dm14", label: "element.style.backgroundColor (camelCase)" },
          { id: "dm15", label: "element.style['background-color'] only" },
          { id: "dm16", label: "element.style.ColorBackground" }
        ],
        correctIndex: 1,
        explanation: "CSS kebab-case properties become camelCase in JavaScript DOM style properties (e.g., background-color becomes backgroundColor, font-size becomes fontSize)."
      },
      {
        id: "q-dom-f-5",
        prompt: "What does 'element.classList.toggle(\"active\")' do?",
        options: [
          { id: "dm17", label: "It adds the class 'active' if it is not present, and removes it if it is already present." },
          { id: "dm18", label: "It permanently removes the class." },
          { id: "dm19", label: "It renames the class to inactive." },
          { id: "dm20", label: "It toggles the opacity of the element." }
        ],
        correctIndex: 0,
        explanation: "classList.toggle() checks if the class exists: if yes, it removes it; if no, it adds it. It also returns a boolean indicating whether the class is now present."
      },
      {
        id: "q-dom-f-6",
        prompt: "What method creates a new HTML element node in memory?",
        options: [
          { id: "dm21", label: "document.newElement('div')" },
          { id: "dm22", label: "document.createElement('div')" },
          { id: "dm23", label: "window.makeNode('div')" },
          { id: "dm24", label: "document.build('div')" }
        ],
        correctIndex: 1,
        explanation: "document.createElement('div') constructs an element in memory ready to have text, styles, or children attached before being mounted to the DOM."
      },
      {
        id: "q-dom-f-7",
        prompt: "What is the difference between 'append()' and 'appendChild()'?",
        options: [
          { id: "dm25", label: "'append()' can accept multiple nodes and raw text strings; 'appendChild()' only accepts a single Node object." },
          { id: "dm26", label: "'appendChild()' is faster and deletes siblings." },
          { id: "dm27", label: "'append()' removes elements from the DOM." },
          { id: "dm28", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "parent.append() accepts both DOM nodes and plain strings and can append multiple items simultaneously, whereas appendChild() only accepts a single node."
      },
      {
        id: "q-dom-f-8",
        prompt: "What property provides the direct parent element of a DOM node?",
        options: [
          { id: "dm29", label: "node.parentNodeElement" },
          { id: "dm30", label: "node.parentElement" },
          { id: "dm31", label: "node.rootNode" },
          { id: "dm32", label: "node.ancestor" }
        ],
        correctIndex: 1,
        explanation: "node.parentElement returns the DOM element that is the direct parent of the node, or null if there is no parent element."
      },
      {
        id: "q-dom-f-9",
        prompt: "What does 'querySelectorAll()' return?",
        options: [
          { id: "dm33", label: "A static NodeList" },
          { id: "dm34", label: "A live HTMLCollection" },
          { id: "dm35", label: "A plain JavaScript Array" },
          { id: "dm36", label: "A JSON string" }
        ],
        correctIndex: 0,
        explanation: "querySelectorAll() returns a static NodeList representing a snapshot of matching elements that does not automatically mutate when the DOM changes."
      },
      {
        id: "q-dom-f-10",
        prompt: "Does modifying the DOM with JavaScript rewrite your original HTML file on your disk?",
        options: [
          { id: "dm37", label: "Yes, it saves changes to index.html automatically." },
          { id: "dm38", label: "No, it only updates the in-memory representation in the browser's current tab." },
          { id: "dm39", label: "Only if you run on a local HTTP server." },
          { id: "dm40", label: "Only if you call document.save()." }
        ],
        correctIndex: 1,
        explanation: "The DOM is a live, in-memory object model created by the browser during parsing. JavaScript modifies this live tree, not the source file on the server or disk."
      }
    ]
  },
  {
    id: "item-js-events",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "14. Events and Event Listeners",
    duration: "40 mins",
    type: "cheatsheet",
    position: 14,
    contentHeading: "Lesson 14: Events and Event Listeners",
    contentDescription: "Master event-driven programming: addEventListener, event object (target vs currentTarget), preventDefault, stopPropagation, bubbling, capturing, and event delegation.",
    codeSnippet: {
      language: "JavaScript",
      code: "const btn = document.querySelector(\"#myButton\");\nconst link = document.querySelector(\"#myLink\");\nconst menu = document.querySelector(\"#menu\");\n\n// 1. Basic event listener\nbtn.addEventListener(\"click\", (event) => {\n  console.log(\"Target clicked:\", event.target);\n});\n\n// 2. Prevent default browser behavior (e.g. link navigation)\nlink.addEventListener(\"click\", (event) => {\n  event.preventDefault();\n  console.log(\"Navigation prevented!\");\n});\n\n// 3. Event Delegation on parent container\nmenu.addEventListener(\"click\", (event) => {\n  const item = event.target.closest(\"button\");\n  if (item && menu.contains(item)) {\n    console.log(\"Delegated click on:\", item.textContent);\n  }\n});"
    },
    sections: [
      {
        title: "14.1 What is an Event and Event Listener?",
        explanation: "An event is an action or occurrence in the browser (clicking a button, typing, resizing the window) that JavaScript can respond to. An event listener is a function registered to execute when that particular event occurs.",
        bullets: [
          "Syntax: element.addEventListener(eventType, callbackFunction)",
          "Non-blocking: The listener does not run when registered; it executes when the event is triggered.",
          "Multiple listeners: Unlike element.onclick = fn, addEventListener allows registering multiple independent handlers for the same event."
        ]
      },
      {
        title: "14.2 Common JavaScript Events",
        explanation: "Common browser events include user interactions, form lifecycle, and window status:",
        table: {
          headers: ["Event", "When it occurs", "Common Use Case"],
          rows: [
            ["click", "Element is clicked", "Buttons, navigation links, cards"],
            ["input", "Input value changes while typing", "Real-time search, character counts"],
            ["change", "Control value is committed", "Select dropdowns, checkboxes, file inputs"],
            ["submit", "Form is submitted", "Form validation and submission"],
            ["keydown", "Key is pressed down", "Keyboard shortcuts, gaming, Esc to close modals"],
            ["mouseenter / mouseleave", "Pointer enters/leaves element", "Hover effects, dropdown tooltips"],
            ["focus / blur", "Element gains or loses focus", "Input field highlighting and validation"]
          ]
        }
      },
      {
        title: "14.3 The Event Object: target vs currentTarget",
        explanation: "When an event fires, the browser passes an Event object to the callback. Two critical properties often confuse beginners:",
        bullets: [
          "event.type: The name of the event ('click', 'keydown').",
          "event.target: The innermost element where the event originated (e.g. the specific button clicked).",
          "event.currentTarget: The element whose event listener is currently executing (e.g. the parent container with the listener).",
          "event.key: The character or key code pressed in keyboard events."
        ]
      },
      {
        title: "14.4 preventDefault() vs stopPropagation()",
        explanation: "These two methods solve completely different problems:",
        bullets: [
          "event.preventDefault(): Cancels the browser's default native action (e.g. stops links from navigating, stops forms from reloading the page). It does NOT stop the event from bubbling up.",
          "event.stopPropagation(): Stops the event from propagating (bubbling) further up the DOM tree to ancestor elements.",
          "event.stopImmediatePropagation(): Stops bubbling AND prevents any other listeners on the exact same element from running."
        ]
      },
      {
        title: "14.5 Event Bubbling, Capturing, and Event Delegation",
        explanation: "Events travel through 3 phases: 1. Capturing (root -> ancestors -> target), 2. Target (at target), 3. Bubbling (target -> ancestors -> root).",
        bullets: [
          "Event Delegation: Placing a single listener on a common parent element to manage events for multiple child elements (using event.target.closest('button')).",
          "Benefits: Huge performance savings (fewer listeners in memory) and automatically handles dynamic elements added later to the list!"
        ]
      }
    ],
    questions: [
      {
        id: "q-evt-1",
        prompt: "Why is 'addEventListener()' preferred over inline HTML event handlers (e.g. onclick=\"...\")?",
        options: [
          { id: "ev1", label: "It separates JavaScript logic from HTML markup and allows attaching multiple handlers to the same event." },
          { id: "ev2", label: "It runs faster than native browser code." },
          { id: "ev3", label: "It works without needing JavaScript enabled." },
          { id: "ev4", label: "It automatically saves input data to localStorage." }
        ],
        correctIndex: 0,
        explanation: "addEventListener keeps HTML and JavaScript decoupled (separation of concerns) and allows multiple listeners to observe the same event without overwriting previous handlers."
      },
      {
        id: "q-evt-2",
        prompt: "What is the primary difference between 'event.target' and 'event.currentTarget'?",
        options: [
          { id: "ev5", label: "'event.target' is the element that triggered the event; 'event.currentTarget' is the element listening to the event." },
          { id: "ev6", label: "'event.currentTarget' is always the document body." },
          { id: "ev7", label: "'event.target' is only available in Firefox." },
          { id: "ev8", label: "They are exact synonyms." }
        ],
        correctIndex: 0,
        explanation: "event.target references the innermost element where the user clicked/interacted. event.currentTarget references the element that the listener was attached to."
      },
      {
        id: "q-evt-3",
        prompt: "Why do we call 'event.preventDefault()' in a form's 'submit' event listener?",
        options: [
          { id: "ev9", label: "To prevent the browser from reloading the entire webpage so JavaScript can process the submission asynchronously." },
          { id: "ev10", label: "To clear all form inputs immediately." },
          { id: "ev11", label: "To stop CSS styles from rendering." },
          { id: "ev12", label: "To encrypt the user's password." }
        ],
        correctIndex: 0,
        explanation: "The default browser action on form submit is to reload or navigate away. Calling event.preventDefault() intercepts this, allowing single-page app JavaScript to handle submission."
      },
      {
        id: "q-evt-4",
        prompt: "What does 'event.stopPropagation()' do?",
        options: [
          { id: "ev13", label: "It prevents the event from bubbling up through ancestor DOM elements." },
          { id: "ev14", label: "It cancels default form submissions." },
          { id: "ev15", label: "It deletes the clicked element." },
          { id: "ev16", label: "It prevents JavaScript from throwing errors." }
        ],
        correctIndex: 0,
        explanation: "stopPropagation() stops the event from propagating further along the event dispatch path (bubbling up to parent containers)."
      },
      {
        id: "q-evt-5",
        prompt: "What is Event Delegation?",
        options: [
          { id: "ev17", label: "Attaching a single event listener to a parent element to handle events triggered by its current and future child elements." },
          { id: "ev18", label: "Passing an event from JavaScript to a backend Python server." },
          { id: "ev19", label: "Delegating clicks to the user's mouse hardware." },
          { id: "ev20", label: "Triggering events on a fixed 1-second interval." }
        ],
        correctIndex: 0,
        explanation: "Event delegation leverages event bubbling by listening on a parent container. Using event.target.closest(), it handles interactions from any matching child, even dynamically created ones."
      },
      {
        id: "q-evt-6",
        prompt: "What is the normal order of event propagation phases in the DOM?",
        options: [
          { id: "ev21", label: "1. Capturing Phase -> 2. Target Phase -> 3. Bubbling Phase" },
          { id: "ev22", label: "1. Bubbling Phase -> 2. Target Phase -> 3. Capturing Phase" },
          { id: "ev23", label: "1. Target Phase -> 2. Finish Phase" },
          { id: "ev24", label: "1. Synchronous Phase -> 2. Asynchronous Phase" }
        ],
        correctIndex: 0,
        explanation: "The event first travels down from window/document to target (capturing), triggers at target, and then bubbles back up to window/document (bubbling)."
      },
      {
        id: "q-evt-7",
        prompt: "What is the difference between the 'input' and 'change' events on a text input?",
        options: [
          { id: "ev25", label: "'input' fires continuously on every keystroke; 'change' fires only after the value is committed and the input loses focus." },
          { id: "ev26", label: "'change' fires on keystrokes; 'input' fires on hover." },
          { id: "ev27", label: "'input' only works on checkboxes." },
          { id: "ev28", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "'input' fires synchronously every time the value changes (ideal for live search). 'change' fires only when the user commits the change (e.g. pressing Enter or unfocusing/blurring)."
      },
      {
        id: "q-evt-8",
        prompt: "Why does 'button.removeEventListener(\"click\", () => console.log(\"hi\"))' fail to remove an anonymous listener?",
        options: [
          { id: "ev29", label: "Because the arrow function creates a new distinct function reference in memory that does not match the original listener reference." },
          { id: "ev30", label: "Because removeEventListener only works on 'mouseover' events." },
          { id: "ev31", label: "Because buttons cannot have event listeners removed." },
          { id: "ev32", label: "Because console.log is not an allowed handler." }
        ],
        correctIndex: 0,
        explanation: "removeEventListener requires the exact same function reference that was passed to addEventListener. Passing a new anonymous function passes a different object reference."
      },
      {
        id: "q-evt-9",
        prompt: "What method finds the closest ancestor element matching a CSS selector, starting from the current element?",
        options: [
          { id: "ev33", label: "element.closest(selector)" },
          { id: "ev34", label: "element.findParent(selector)" },
          { id: "ev35", label: "element.parentElement.query(selector)" },
          { id: "ev36", label: "document.nearest(selector)" }
        ],
        correctIndex: 0,
        explanation: "element.closest('selector') traverses the element and its parents heading toward the document root until it finds a node matching the specified CSS selector."
      },
      {
        id: "q-evt-10",
        prompt: "Which event fires when an element loses focus?",
        options: [
          { id: "ev37", label: "blur" },
          { id: "ev38", label: "focus" },
          { id: "ev39", label: "leave" },
          { id: "ev40", label: "unfocus" }
        ],
        correctIndex: 0,
        explanation: "The 'blur' event fires when an element loses focus, making it ideal for validating form fields as soon as the user finishes typing and leaves the field."
      }
    ]
  },
  {
    id: "item-js-forms-validation",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "15. Forms and Validation",
    duration: "40 mins",
    type: "cheatsheet",
    position: 15,
    contentHeading: "Lesson 15: Forms and Validation",
    contentDescription: "Build accessible, bulletproof forms: form controls, input attributes, client vs server validation, HTML5 constraint API, trim(), password confirmation, and form security rules.",
    codeSnippet: {
      language: "JavaScript",
      code: "const form = document.querySelector(\"#registerForm\");\nconst email = document.querySelector(\"#email\");\nconst errorDisplay = document.querySelector(\"#errorMsg\");\n\nform.addEventListener(\"submit\", (event) => {\n  event.preventDefault(); // Stop page reload\n  const emailVal = email.value.trim();\n\n  if (!emailVal) {\n    errorDisplay.textContent = \"Email is required.\";\n    return;\n  }\n  if (!email.validity.valid) {\n    errorDisplay.textContent = \"Please enter a valid email address.\";\n    return;\n  }\n\n  errorDisplay.textContent = \"\";\n  console.log(\"Form submitted successfully!\", emailVal);\n});"
    },
    sections: [
      {
        title: "15.1 Form Elements & Input Attributes",
        explanation: "HTML forms collect user data (registration, login, checkout, search). Common input controls include text, email, password, number, radio buttons, checkboxes, select dropdowns, and textarea.",
        bullets: [
          "name: Identifies the field in submitted form data.",
          "required: Requires a value before submission can proceed.",
          "minlength / maxlength: Minimum and maximum permitted character length.",
          "pattern: A regular expression constraint that the input value must match.",
          "disabled vs readonly: Disabled controls are NOT submitted with the form; readonly controls can still be submitted."
        ]
      },
      {
        title: "15.2 Client-Side vs Server-Side Validation",
        explanation: "Form validation checks whether user input meets application requirements before acceptance. There are two critical layers:",
        bullets: [
          "Client-Side Validation: Runs in the browser. Provides immediate, friendly user feedback and prevents unnecessary requests. Can be bypassed easily by malicious users.",
          "Server-Side Validation (MANDATORY): Runs on a trusted backend server. Checks data integrity, sanitizes input, and authenticates credentials. Client-side checks alone are NEVER a security boundary!"
        ]
      },
      {
        title: "15.3 JavaScript Form Submission & Trimming",
        explanation: "Always listen for the form's 'submit' event (not just the button's click event) to support keyboard submissions (pressing Enter). Always use .trim() to strip leading and trailing whitespace.",
        codeSnippet: {
          language: "JavaScript",
          code: "const nameInput = document.querySelector(\"#name\");\n// Whitespace check:\nif (nameInput.value.trim() === \"\") {\n  console.error(\"Name cannot be blank or only spaces.\");\n}"
        }
      },
      {
        title: "15.4 Password Confirmation & Constraint API",
        explanation: "Modern browsers provide built-in validation APIs through the validity property:",
        bullets: [
          "input.validity.valid: Returns true if the control satisfies all its constraints.",
          "input.validity.valueMissing: true if required field is empty.",
          "input.validity.typeMismatch: true if input value does not match expected type (e.g. invalid email syntax).",
          "form.checkValidity(): Checks if all inputs satisfy their constraints.",
          "form.reportValidity(): Checks constraints and triggers browser validation tooltips."
        ]
      },
      {
        title: "15.5 Security Rules for Forms",
        explanation: "Essential security guidelines when building production web forms:",
        bullets: [
          "Validate on the Server: Never trust client-side validation alone.",
          "Protect Passwords: Never store plain-text passwords. Use bcrypt/argon2 hashing on the backend.",
          "Use HTTPS: Encrypt form data in transit.",
          "Prevent XSS: Always output user input with textContent, never directly into innerHTML.",
          "Never Expose Secrets: Do not put private API keys or database credentials in frontend JavaScript."
        ]
      }
    ],
    questions: [
      {
        id: "q-form-1",
        prompt: "Why must every security-sensitive form be validated on the backend server even if client-side validation is implemented?",
        options: [
          { id: "fo1", label: "Because client-side validation can be easily bypassed or disabled by users in browser DevTools or via direct API tools like Postman/curl." },
          { id: "fo2", label: "Because HTML cannot validate numbers." },
          { id: "fo3", label: "Because the browser deletes invalid data automatically." },
          { id: "fo4", label: "Server validation is only needed for mobile devices." }
        ],
        correctIndex: 0,
        explanation: "Client-side validation is purely for user experience (immediate feedback). Anyone can bypass it using DevTools, curl, or custom HTTP requests, so server validation is strictly mandatory."
      },
      {
        id: "q-form-2",
        prompt: "Why should you listen for a form's 'submit' event rather than just a button's 'click' event?",
        options: [
          { id: "fo5", label: "Listening for 'submit' handles submissions triggered by pressing Enter on any form field as well as button clicks." },
          { id: "fo6", label: "Because 'click' events cannot read text input values." },
          { id: "fo7", label: "Because 'submit' prevents CSS from reloading." },
          { id: "fo8", label: "Because buttons do not support addEventListener." }
        ],
        correctIndex: 0,
        explanation: "Submitting a form can occur by clicking the submit button or pressing Enter inside any input field. Listening to 'submit' captures all submission methods."
      },
      {
        id: "q-form-3",
        prompt: "What does 'string.trim()' do when validating input values?",
        options: [
          { id: "fo9", label: "It removes whitespace from both the beginning and the end of the string." },
          { id: "fo10", label: "It limits the string to 10 characters." },
          { id: "fo11", label: "It converts text to lowercase." },
          { id: "fo12", label: "It removes all vowels." }
        ],
        correctIndex: 0,
        explanation: "trim() strips leading and trailing spaces. Without it, an input containing only spaces ('   ') would be falsely considered valid non-empty text."
      },
      {
        id: "q-form-4",
        prompt: "What is the key difference between 'disabled' and 'readonly' input attributes?",
        options: [
          { id: "fo13", label: "'disabled' controls are not submitted with form data; 'readonly' controls can still be submitted." },
          { id: "fo14", label: "'readonly' controls cannot be seen by the user." },
          { id: "fo15", label: "'disabled' controls allow user typing." },
          { id: "fo16", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "Disabled inputs are excluded from form submission entirely. Readonly inputs prevent user edits in the UI, but their values are still included in form submission."
      },
      {
        id: "q-form-5",
        prompt: "What does 'input.validity.valid' return?",
        options: [
          { id: "fo17", label: "true if the input satisfies all of its HTML5 validation constraints, and false otherwise." },
          { id: "fo18", label: "The input's current text." },
          { id: "fo19", label: "The number of validation errors." },
          { id: "fo20", label: "A promise that resolves when the user stops typing." }
        ],
        correctIndex: 0,
        explanation: "The ValidityState.valid property is a boolean indicating whether the input passes all configured constraints (required, type, minlength, pattern, etc.)."
      },
      {
        id: "q-form-6",
        prompt: "How can you check if a password and confirmPassword input match before submitting?",
        options: [
          { id: "fo21", label: "password.value === confirmPassword.value" },
          { id: "fo22", label: "password == confirmPassword" },
          { id: "fo23", label: "password.match(confirmPassword)" },
          { id: "fo24", label: "confirmPassword.has(password)" }
        ],
        correctIndex: 0,
        explanation: "Comparing password.value === confirmPassword.value checks that the string values entered in both fields are identical."
      },
      {
        id: "q-form-7",
        prompt: "What attribute helps screen readers announce dynamic validation error messages as soon as they appear?",
        options: [
          { id: "fo25", label: "aria-live=\"polite\"" },
          { id: "fo26", label: "role=\"error\"" },
          { id: "fo27", label: "alt=\"validation\"" },
          { id: "fo28", label: "screen-reader=\"speak\"" }
        ],
        correctIndex: 0,
        explanation: "aria-live=\"polite\" instructs assistive technologies to announce updates to the error container without interrupting current screen-reader speech."
      },
      {
        id: "q-form-8",
        prompt: "What does 'form.reportValidity()' do?",
        options: [
          { id: "fo29", label: "Checks validity and displays the browser's native error bubble tooltips for any failing fields." },
          { id: "fo30", label: "Sends the form data to Google Analytics." },
          { id: "fo31", label: "Prints the form to a PDF file." },
          { id: "fo32", label: "Clears the form." }
        ],
        correctIndex: 0,
        explanation: "reportValidity() triggers the browser's constraint validation, focuses the first invalid element, and displays native validation tooltips if invalid."
      },
      {
        id: "q-form-9",
        prompt: "Which input type masks characters with dots or asterisks on screen?",
        options: [
          { id: "fo33", label: "type=\"password\"" },
          { id: "fo34", label: "type=\"secret\"" },
          { id: "fo35", label: "type=\"hidden\"" },
          { id: "fo36", label: "type=\"hash\"" }
        ],
        correctIndex: 0,
        explanation: "type=\"password\" masks the displayed characters to protect shoulder-surfing, though it does not encrypt the submitted value by itself."
      },
      {
        id: "q-form-10",
        prompt: "What HTML attribute defines a regular expression pattern that the input value must match?",
        options: [
          { id: "fo37", label: "regex=\"...\"" },
          { id: "fo38", label: "pattern=\"...\"" },
          { id: "fo39", label: "match=\"...\"" },
          { id: "fo40", label: "validate=\"...\"" }
        ],
        correctIndex: 1,
        explanation: "The 'pattern' attribute specifies a regular expression (e.g. pattern=\"[A-Za-z]+\") that the element's value is checked against on form submission."
      }
    ]
  },
  {
    id: "item-js-browser-storage",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "16. Browser Storage — localStorage, sessionStorage, and Cookies",
    duration: "40 mins",
    type: "cheatsheet",
    position: 16,
    contentHeading: "Lesson 16: Browser Storage — localStorage, sessionStorage, and Cookies",
    contentDescription: "Understand client-side data persistence: localStorage, sessionStorage, cookies, storing objects with JSON.stringify/parse, storage limits, security risks, and theme persistence.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Saving primitives and objects in localStorage\nlocalStorage.setItem(\"theme\", \"dark\");\n\nconst user = { name: \"Hari\", age: 22 };\nlocalStorage.setItem(\"user\", JSON.stringify(user));\n\n// 2. Retrieving and parsing data\nconst savedTheme = localStorage.getItem(\"theme\"); // \"dark\"\nconst savedUser = JSON.parse(localStorage.getItem(\"user\"));\nconsole.log(savedUser.name); // \"Hari\"\n\n// 3. Removing data\nlocalStorage.removeItem(\"theme\");\n// localStorage.clear(); // Clears all entries for origin"
    },
    sections: [
      {
        title: "16.1 What is Browser Storage?",
        explanation: "When a webpage is refreshed, JavaScript variables are recreated and memory resets. Browser storage allows web applications to persist data in the user's browser across page reloads and sessions.",
        bullets: [
          "Preserves user preferences (e.g. dark mode, language).",
          "Maintains shopping cart items and saved drafts.",
          "Stores temporary multi-step wizard state.",
          "Reduces redundant network requests by caching UI state."
        ]
      },
      {
        title: "16.2 localStorage vs sessionStorage",
        explanation: "Both APIs share the same syntax (setItem, getItem, removeItem, clear), but differ in persistence and scope:",
        table: {
          headers: ["Feature", "localStorage", "sessionStorage"],
          rows: [
            ["Data Format", "Strings (Key-Value)", "Strings (Key-Value)"],
            ["Survives Page Refresh", "Yes", "Yes"],
            ["Survives Browser Restart", "Yes (persists indefinitely until cleared)", "No (cleared when tab/window closes)"],
            ["Scope", "Shared across all tabs of same origin", "Scoped strictly to current tab's page session"],
            ["Typical Use", "Dark mode preference, persistent auth token", "Multi-step form wizard, single-session state"]
          ]
        }
      },
      {
        title: "16.3 Storing Objects: JSON.stringify() & JSON.parse()",
        explanation: "Web Storage only stores strings. Trying to save an object directly causes JavaScript to convert it to '[object Object]'. To store objects, serialize them to JSON strings with JSON.stringify() and reconstruct them with JSON.parse().",
        codeSnippet: {
          language: "JavaScript",
          code: "const cart = [{ id: 1, title: \"Laptop\", price: 50000 }];\n\n// Save:\nlocalStorage.setItem(\"cart\", JSON.stringify(cart));\n\n// Retrieve:\nconst stored = localStorage.getItem(\"cart\");\nconst cartData = stored ? JSON.parse(stored) : [];\nconsole.log(cartData[0].title); // \"Laptop\""
        }
      },
      {
        title: "16.4 What are Cookies and Comparison",
        explanation: "Cookies are small pieces of text (typically ~4KB) stored by the browser and automatically sent with HTTP requests to the server. They are essential for server-managed session authentication.",
        bullets: [
          "Capacity: localStorage has ~5-10MB; cookies have ~4KB.",
          "Network: Cookies are sent automatically with matching HTTP requests; localStorage is client-only.",
          "HttpOnly Cookies: Cannot be accessed by JavaScript (document.cookie), protecting authentication tokens from Cross-Site Scripting (XSS)."
        ]
      },
      {
        title: "16.5 Security Rules for Browser Storage",
        explanation: "NEVER store sensitive information such as plaintext passwords, credit card numbers, or sensitive private keys in localStorage. Any JavaScript running on the page (including third-party analytics or compromised libraries) has full access to localStorage.",
        bullets: [
          "HttpOnly secure cookies are preferred for sensitive session IDs.",
          "Always handle JSON.parse() errors with try/catch when reading storage that may be corrupted."
        ]
      }
    ],
    questions: [
      {
        id: "q-stor-1",
        prompt: "What will 'localStorage.getItem(\"user\")' return if you executed 'localStorage.setItem(\"user\", { name: \"Hari\" })' without JSON.stringify?",
        options: [
          { id: "st1", label: "\"[object Object]\" (the string representation of an object)" },
          { id: "st2", label: "The JavaScript object { name: \"Hari\" }" },
          { id: "st3", label: "undefined" },
          { id: "st4", label: "null" }
        ],
        correctIndex: 0,
        explanation: "localStorage only stores strings. Passing an object coerces it via Object.prototype.toString(), storing the useless string '[object Object]'."
      },
      {
        id: "q-stor-2",
        prompt: "How long does data stored in 'localStorage' persist?",
        options: [
          { id: "st5", label: "Indefinitely across sessions until explicitly cleared by user or website code." },
          { id: "st6", label: "Until the current browser tab is closed." },
          { id: "st7", label: "Exactly 24 hours." },
          { id: "st8", label: "Until the computer is rebooted." }
        ],
        correctIndex: 0,
        explanation: "localStorage has no expiration time. Data persists indefinitely across browser restarts until removed via removeItem(), clear(), or clearing browser cache."
      },
      {
        id: "q-stor-3",
        prompt: "When does data in 'sessionStorage' get cleared automatically?",
        options: [
          { id: "st9", label: "When the browser tab or window for that session is closed." },
          { id: "st10", label: "On every page reload/refresh." },
          { id: "st11", label: "After 15 minutes of inactivity." },
          { id: "st12", label: "Never." }
        ],
        correctIndex: 0,
        explanation: "sessionStorage survives page reloads within the same tab, but is completely cleared when that specific browser tab or window is closed."
      },
      {
        id: "q-stor-4",
        prompt: "What will 'localStorage.getItem(\"non_existent_key\")' return?",
        options: [
          { id: "st13", label: "null" },
          { id: "st14", label: "undefined" },
          { id: "st15", label: "\"\" (empty string)" },
          { id: "st16", label: "It throws a ReferenceError." }
        ],
        correctIndex: 0,
        explanation: "If a requested key does not exist in localStorage or sessionStorage, getItem() returns null."
      },
      {
        id: "q-stor-5",
        prompt: "Why should you wrap 'JSON.parse(localStorage.getItem(\"data\"))' in a try/catch block?",
        options: [
          { id: "st17", label: "Because JSON.parse() throws a SyntaxError if the stored string is corrupted or invalid JSON." },
          { id: "st18", label: "Because localStorage is asynchronous." },
          { id: "st19", label: "Because try/catch speeds up parsing." },
          { id: "st20", label: "To bypass browser security restrictions." }
        ],
        correctIndex: 0,
        explanation: "If data in storage is malformed or was overwritten with non-JSON text, JSON.parse() throws an unhandled SyntaxError that can crash the app if not caught."
      },
      {
        id: "q-stor-6",
        prompt: "What is an 'HttpOnly' cookie?",
        options: [
          { id: "st21", label: "A cookie that cannot be accessed or read by client-side JavaScript, protecting session tokens from XSS theft." },
          { id: "st22", label: "A cookie that only works over HTTP, not HTTPS." },
          { id: "st23", label: "A cookie created with localStorage." },
          { id: "st24", label: "A cookie that expires after 1 second." }
        ],
        correctIndex: 0,
        explanation: "HttpOnly cookies are inaccessible to document.cookie in JavaScript. Browsers automatically attach them to HTTP requests, safeguarding authentication session cookies from XSS."
      },
      {
        id: "q-stor-7",
        prompt: "What is the typical storage capacity limit of 'localStorage' compared to cookies?",
        options: [
          { id: "st25", label: "localStorage is ~5-10 MB per origin; cookies are ~4 KB per cookie." },
          { id: "st26", label: "localStorage is 4 KB; cookies are 10 MB." },
          { id: "st27", label: "Both are unlimited." },
          { id: "st28", label: "localStorage is limited to 10 items." }
        ],
        correctIndex: 0,
        explanation: "Web Storage (localStorage and sessionStorage) typically provides around 5-10 MB of storage per origin, whereas cookies are limited to approximately 4 KB."
      },
      {
        id: "q-stor-8",
        prompt: "What does 'localStorage.clear()' do?",
        options: [
          { id: "st29", label: "It removes ALL stored key-value pairs belonging to the current origin." },
          { id: "st30", label: "It only removes the most recently accessed item." },
          { id: "st31", label: "It clears the browser history." },
          { id: "st32", label: "It resets the operating system." }
        ],
        correctIndex: 0,
        explanation: "localStorage.clear() wipes out every entry stored for the current domain origin, so it should be used cautiously."
      },
      {
        id: "q-stor-9",
        prompt: "Why should sensitive credentials like private payment keys or plaintext passwords NEVER be kept in localStorage?",
        options: [
          { id: "st33", label: "Any script running on the origin (including XSS injected scripts) can read and exfiltrate localStorage data." },
          { id: "st34", label: "localStorage deletes data after 5 minutes." },
          { id: "st35", label: "localStorage cannot store numbers." },
          { id: "st36", label: "localStorage is transmitted on every HTTP request." }
        ],
        correctIndex: 0,
        explanation: "localStorage is accessible to all client-side JavaScript on that origin. In the event of a Cross-Site Scripting (XSS) vulnerability, attackers can trivially steal localStorage contents."
      },
      {
        id: "q-stor-10",
        prompt: "How can you remove a single specific entry, such as 'cart', from localStorage?",
        options: [
          { id: "st37", label: "localStorage.removeItem(\"cart\")" },
          { id: "st38", label: "delete localStorage.cart" },
          { id: "st39", label: "localStorage.remove(\"cart\")" },
          { id: "st40", label: "localStorage.clear(\"cart\")" }
        ],
        correctIndex: 0,
        explanation: "The official Storage API method to delete a specific key and its value is localStorage.removeItem(key)."
      }
    ]
  }
];
