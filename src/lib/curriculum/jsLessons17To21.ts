import { CurriculumItem } from "../curriculumTypes";

export const jsLessons17To21: CurriculumItem[] = [
  {
    id: "item-js-template-literals",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "17. Modern JavaScript — Template Literals and Default Parameters",
    duration: "35 mins",
    type: "cheatsheet",
    position: 17,
    contentHeading: "Lesson 17: Modern JavaScript — Template Literals and Default Parameters",
    contentDescription: "Master modern ES6 string interpolation with backticks, multiline strings, dynamic HTML generation, escaping, and robust default parameter patterns.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Template Literals & Expression Interpolation\nconst name = \"Hari\";\nconst age = 22;\nconsole.log(`My name is ${name} and I am ${age} years old.`);\n\n// 2. Multiline String\nconst note = `Line 1: Clean code\nLine 2: Modern syntax\nLine 3: High performance`;\n\n// 3. Default Parameters with Calculations\nfunction calculateTotal(price, quantity = 1, tax = 10) {\n  return price * quantity * (1 + tax / 100);\n}\nconsole.log(calculateTotal(100)); // 110 (uses defaults)\nconsole.log(calculateTotal(100, 2, 20)); // 240 (overrides defaults)"
    },
    sections: [
      {
        title: "17.1 What are Template Literals?",
        explanation: "Template literals are strings delimited with backtick (`) characters instead of single or double quotation marks. They allow embedding variables, evaluating expressions directly inside strings, writing multi-line text cleanly, and creating dynamic HTML markup.",
        bullets: [
          "Traditional concatenation: \"Hello \" + name + \", age \" + age (cluttered and error-prone).",
          "Template literal: `Hello ${name}, age ${age}` (clean and readable).",
          "${...} interpolates variables, mathematical expressions, function calls, or ternary expressions."
        ]
      },
      {
        title: "17.2 String Interpolation Examples",
        explanation: "Any valid JavaScript expression can be evaluated inside ${...}:",
        bullets: [
          "Calculations: `Subtotal: ${price * quantity}`",
          "Function calls: `Welcome, ${formatName(user)}!`",
          "Ternary conditionals: `Status: ${isOnline ? 'Online' : 'Offline'}`"
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const a = 10;\nconst b = 20;\nconsole.log(`Total: ${a + b}`); // \"Total: 30\"\n\nconst age = 20;\nconsole.log(`You are ${age >= 18 ? \"an adult\" : \"a minor\"}.`);"
        }
      },
      {
        title: "17.3 Multiline Strings & Dynamic HTML",
        explanation: "Template literals preserve actual line breaks without requiring '\\n' escape sequences. This makes generating HTML templates clear and intuitive.",
        codeSnippet: {
          language: "JavaScript",
          code: "const product = { name: \"Laptop\", price: 50000 };\nconst html = `\n  <div class=\"product-card\">\n    <h2>${product.name}</h2>\n    <p>Price: ₹${product.price}</p>\n  </div>\n`;"
        }
      },
      {
        title: "17.4 Escaping Characters in Template Literals",
        explanation: "To include a literal backtick inside a template literal, escape it with a backslash (`\\``). To output a literal `${` without evaluation, escape the dollar sign (`\\${`).",
        codeSnippet: {
          language: "JavaScript",
          code: "console.log(`Use a \\`backtick\\` in a string.`); // \"Use a `backtick` in a string.\"\nconsole.log(`Syntax: \\${variable}`); // \"Syntax: ${variable}\""
        }
      },
      {
        title: "17.5 Default Parameters",
        explanation: "Default parameters specify fallback values when an argument is omitted or passed as undefined. Crucial: default parameters do NOT trigger when null, false, 0, or \"\" are passed!",
        bullets: [
          "Undefined triggers default: greet() and greet(undefined) use the default value.",
          "Null does NOT trigger default: greet(null) assigns null (not the default!).",
          "Earlier parameters can be referenced: function multiply(a, b = a * 2)."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "function greet(name = \"Guest\") {\n  return `Hello, ${name}`;\n}\nconsole.log(greet());          // \"Hello, Guest\"\nconsole.log(greet(undefined));  // \"Hello, Guest\"\nconsole.log(greet(null));       // \"Hello, null\" (null is an intentional value!)"
        }
      }
    ],
    questions: [
      {
        id: "q-es6-1",
        prompt: "Which character is used to delimit template literals in JavaScript?",
        options: [
          { id: "e1", label: "Backticks (`)" },
          { id: "e2", label: "Single quotes (')" },
          { id: "e3", label: "Double quotes (\")" },
          { id: "e4", label: "Angle brackets (<>)" }
        ],
        correctIndex: 0,
        explanation: "Template literals are enclosed by backticks (`) found on the tilde key (~), which allow embedded expressions and multiline strings."
      },
      {
        id: "q-es6-2",
        prompt: "What will '`Total: ${10 + 20}`' evaluate to?",
        options: [
          { id: "e5", label: "\"Total: 10 + 20\"" },
          { id: "e6", label: "\"Total: 30\"" },
          { id: "e7", label: "SyntaxError" },
          { id: "e8", label: "\"Total: NaN\"" }
        ],
        correctIndex: 1,
        explanation: "Expressions inside ${...} are evaluated before string creation, computing 10 + 20 = 30."
      },
      {
        id: "q-es6-3",
        prompt: "Under what condition does a default parameter get applied in a function call?",
        options: [
          { id: "e9", label: "When the argument is omitted or strictly passed as 'undefined'." },
          { id: "e10", label: "Whenever the argument is falsy (including 0, false, and \"\")." },
          { id: "e11", label: "Only when passed as 'null'." },
          { id: "e12", label: "Only when the function throws an error." }
        ],
        correctIndex: 0,
        explanation: "Default parameters trigger only if the argument is omitted or explicitly undefined. Passing null, 0, or false passes that exact value."
      },
      {
        id: "q-es6-4",
        prompt: "Given 'function test(val = 5) { return val; }', what does 'test(null)' return?",
        options: [
          { id: "e13", label: "5" },
          { id: "e14", label: "null" },
          { id: "e15", label: "undefined" },
          { id: "e16", label: "0" }
        ],
        correctIndex: 1,
        explanation: "null is treated as a deliberate, defined value. Therefore, it does NOT trigger the default value of 5 and returns null."
      },
      {
        id: "q-es6-5",
        prompt: "How do you output the literal sequence '${name}' inside a template literal without interpolating it?",
        options: [
          { id: "e17", label: "\\${name}" },
          { id: "e18", label: "${{name}}" },
          { id: "e19", label: "'${name}'" },
          { id: "e20", label: "$${name}" }
        ],
        correctIndex: 0,
        explanation: "Escaping the dollar sign with a backslash (\\${name}) prevents expression interpolation and prints the literal characters."
      },
      {
        id: "q-es6-6",
        prompt: "Can default parameters reference preceding parameters in the same function signature?",
        options: [
          { id: "e21", label: "Yes, earlier parameters are already in scope for subsequent default values (e.g. function multiply(a, b = a * 2))." },
          { id: "e22", label: "No, parameters cannot see each other." },
          { id: "e23", label: "Only in arrow functions." },
          { id: "e24", label: "Only if declared with var." }
        ],
        correctIndex: 0,
        explanation: "JavaScript evaluates parameters from left to right. When determining default values, preceding parameters are in scope and can be referenced."
      },
      {
        id: "q-es6-7",
        prompt: "Can a function call be placed inside a template literal expression '${...}'?",
        options: [
          { id: "e25", label: "Yes, any valid expression including function calls can be evaluated." },
          { id: "e26", label: "No, only primitive variables are permitted." },
          { id: "e27", label: "Only if the function is synchronous and returns a number." },
          { id: "e28", label: "It throws a TypeError." }
        ],
        correctIndex: 0,
        explanation: "Any valid JavaScript expression can be placed inside ${...}, including calculations, ternary checks, and function calls like `${formatPrice(product.price)}`."
      },
      {
        id: "q-es6-8",
        prompt: "What happens when you write a multiline string using standard double quotes (\"\") without backslash escapes?",
        options: [
          { id: "e29", label: "JavaScript throws a SyntaxError: Invalid or unexpected token." },
          { id: "e30", label: "It automatically formats as HTML." },
          { id: "e31", label: "It removes the line breaks." },
          { id: "e32", label: "It converts to a template literal." }
        ],
        correctIndex: 0,
        explanation: "Standard single or double quotes cannot span multiple lines without explicit '\\n' escapes or concatenation (+). Literal line breaks require template literals (` `)."
      },
      {
        id: "q-es6-9",
        prompt: "Given 'function makeCart(item, qty = 1, price = 100) {}', what are the values of qty and price when called as 'makeCart(\"Book\", undefined, 250)'?",
        options: [
          { id: "e33", label: "qty = 1, price = 250" },
          { id: "e34", label: "qty = undefined, price = 250" },
          { id: "e35", label: "qty = 1, price = 100" },
          { id: "e36", label: "qty = 0, price = 250" }
        ],
        correctIndex: 0,
        explanation: "Passing 'undefined' explicitly for the second argument triggers its default value (qty = 1), while price is explicitly set to 250."
      },
      {
        id: "q-es6-10",
        prompt: "Why should you exercise caution when rendering dynamic template literals into 'element.innerHTML'?",
        options: [
          { id: "e37", label: "Untrusted user data interpolated into HTML strings can introduce Cross-Site Scripting (XSS) vulnerabilities." },
          { id: "e38", label: "Template literals cannot render HTML tags." },
          { id: "e39", label: "Template literals are slower than document.write()." },
          { id: "e40", label: "It deletes the CSS stylesheets." }
        ],
        correctIndex: 0,
        explanation: "Interpolating untrusted user input directly into HTML strings that are assigned to innerHTML allows attackers to inject malicious script tags (XSS)."
      }
    ]
  },
  {
    id: "item-js-destructuring-spread-rest",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "18. Destructuring, Spread, and Rest",
    duration: "40 mins",
    type: "cheatsheet",
    position: 18,
    contentHeading: "Lesson 18: Destructuring, Spread, and Rest",
    contentDescription: "Master the trinity of modern ES6 data manipulation: array and object destructuring, parameter destructuring, the spread operator (...), and rest parameters.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Object Destructuring with renaming & defaults\nconst user = { name: \"Hari\", age: 22 };\nconst { name: userName, age, city = \"Bengaluru\" } = user;\n\n// 2. Array Destructuring & Variable Swapping\nlet a = 10, b = 20;\n[a, b] = [b, a]; // a=20, b=10\n\n// 3. Spread Operator (Expand)\nconst numbers = [1, 2, 3];\nconst clone = [...numbers, 4, 5];\nconst updatedUser = { ...user, age: 23 };\n\n// 4. Rest Parameter (Collect)\nfunction sum(...args) {\n  return args.reduce((acc, curr) => acc + curr, 0);\n}"
    },
    sections: [
      {
        title: "18.1 What is Destructuring?",
        explanation: "Destructuring extracts values from arrays or properties from objects and assigns them to distinct variables in a clean, concise statement.",
        bullets: [
          "Array destructuring matches by POSITION: const [first, second] = array.",
          "Object destructuring matches by PROPERTY NAME: const { name, age } = object.",
          "Skipping array items: const [first, , third] = numbers (empty comma skips).",
          "Swapping variables: [a, b] = [b, a] (no temporary variable needed!)."
        ]
      },
      {
        title: "18.2 Advanced Object Destructuring",
        explanation: "Object destructuring supports renaming variables, providing fallback defaults, and extracting nested properties:",
        codeSnippet: {
          language: "JavaScript",
          code: "const employee = {\n  name: \"Hari\",\n  address: { city: \"Vizianagaram\", state: \"AP\" }\n};\n\n// Renaming + Nested destructuring:\nconst { name: empName, address: { city } } = employee;\nconsole.log(empName); // \"Hari\"\nconsole.log(city);    // \"Vizianagaram\""
        }
      },
      {
        title: "18.3 Function Parameter Destructuring",
        explanation: "Destructuring an object directly in a function parameter list is one of the most widely used patterns in modern JavaScript and React component props.",
        codeSnippet: {
          language: "JavaScript",
          code: "// Destructuring user props in function parameters\nfunction displayProfile({ name, age, role = \"Developer\" }) {\n  return `${name} (${age}) is a ${role}.`;\n}\n\ndisplayProfile({ name: \"Hari\", age: 22 });\n// \"Hari (22) is a Developer.\""
        }
      },
      {
        title: "18.4 The Spread Operator (...)",
        explanation: "The spread operator (...) expands iterable elements (arrays, strings) or object properties into a new array, object, or function argument list.",
        bullets: [
          "Array copying: const copy = [...original]; (independent shallow copy).",
          "Array combination: const combined = [...arr1, ...arr2];",
          "Object copying & overriding: const updated = { ...user, age: 23 };",
          "Function arguments: Math.max(...numbers);"
        ]
      },
      {
        title: "18.5 The Rest Parameter (...)",
        explanation: "The rest parameter (...) gathers multiple remaining elements or arguments into a single Array.",
        bullets: [
          "Function arguments: function add(...numbers) gathers all arguments into an array.",
          "Must be last: A rest parameter must be the last parameter in a function signature.",
          "Array rest destructuring: const [first, ...rest] = array;",
          "Object rest destructuring: const { id, ...otherProps } = object;"
        ],
        table: {
          headers: ["Feature", "Spread (...)", "Rest (...)"],
          rows: [
            ["Purpose", "Expands values out into individual items", "Collects multiple values together into an array"],
            ["Context", "Array/object literals, function call arguments", "Function parameter lists, destructuring patterns"],
            ["Memory Trick", "Spread spreads values OUT", "Rest gathers remaining values TOGETHER"]
          ]
        }
      },
      {
        title: "18.6 Shallow Copies vs Deep Cloning",
        explanation: "Both spread ({ ...obj }) and destructuring produce shallow copies. If an object contains nested objects or arrays, the nested references are still shared. To deeply clone nested structures, use the modern built-in 'structuredClone(obj)'.",
        codeSnippet: {
          language: "JavaScript",
          code: "const original = { name: \"Hari\", details: { score: 95 } };\nconst shallow = { ...original };\nshallow.details.score = 100;\nconsole.log(original.details.score); // 100! (Nested reference was shared)\n\n// Deep clone with structuredClone:\nconst deep = structuredClone(original);\ndeep.details.score = 50;\nconsole.log(original.details.score); // Still 100 (Completely isolated!)"
        }
      }
    ],
    questions: [
      {
        id: "q-dest-1",
        prompt: "What is the primary difference in how array destructuring and object destructuring match values?",
        options: [
          { id: "ds1", label: "Array destructuring matches by position/index; object destructuring matches by property key name." },
          { id: "ds2", label: "Array destructuring uses curly braces; object destructuring uses square brackets." },
          { id: "ds3", label: "Object destructuring is only supported in TypeScript." },
          { id: "ds4", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "In array destructuring [a, b] = arr, variables receive values based on their position. In object destructuring { name, age } = obj, variables match property names."
      },
      {
        id: "q-dest-2",
        prompt: "How can you rename a property during object destructuring (e.g. rename 'name' to 'studentName')?",
        options: [
          { id: "ds5", label: "const { name as studentName } = student;" },
          { id: "ds6", label: "const { name: studentName } = student;" },
          { id: "ds7", label: "const { name -> studentName } = student;" },
          { id: "ds8", label: "const { studentName = name } = student;" }
        ],
        correctIndex: 1,
        explanation: "In object destructuring, the colon syntax 'propertyName: newVariableName' assigns the property value to a differently named variable."
      },
      {
        id: "q-dest-3",
        prompt: "How can you swap two variables 'a' and 'b' without a temporary variable using ES6?",
        options: [
          { id: "ds9", label: "[a, b] = [b, a];" },
          { id: "ds10", label: "swap(a, b);" },
          { id: "ds11", label: "a = b && b = a;" },
          { id: "ds12", label: "{ a, b } = { b, a };" }
        ],
        correctIndex: 0,
        explanation: "Array destructuring evaluates the right-hand array literal [b, a] first, then unpacks those values into [a, b] simultaneously."
      },
      {
        id: "q-dest-4",
        prompt: "What is the memory trick to remember the difference between spread and rest?",
        options: [
          { id: "ds13", label: "Spread spreads values out; Rest gathers values together." },
          { id: "ds14", label: "Spread is for numbers; Rest is for strings." },
          { id: "ds15", label: "Rest is asynchronous; Spread is synchronous." },
          { id: "ds16", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "Spread (...) expands elements into new arrays, objects, or arguments. Rest (...) collects multiple remaining elements into an array."
      },
      {
        id: "q-dest-5",
        prompt: "Where must a rest parameter (...rest) be placed in a function signature?",
        options: [
          { id: "ds17", label: "It must be the last parameter." },
          { id: "ds18", label: "It must be the first parameter." },
          { id: "ds19", label: "It can be placed anywhere." },
          { id: "ds20", label: "In the function return statement." }
        ],
        correctIndex: 0,
        explanation: "A rest parameter must be the final parameter in a function declaration; placing parameters after a rest parameter causes a SyntaxError: Rest parameter must be last."
      },
      {
        id: "q-dest-6",
        prompt: "What happens when spreading an object with duplicate keys, like '{ ...{ x: 1, y: 2 }, y: 99 }'?",
        options: [
          { id: "ds21", label: "The later property (y: 99) overwrites the earlier value (y: 2)." },
          { id: "ds22", label: "JavaScript throws a DuplicateKeyError." },
          { id: "ds23", label: "The earlier property (y: 2) takes precedence." },
          { id: "ds24", label: "The properties merge into an array [2, 99]." }
        ],
        correctIndex: 0,
        explanation: "In object literals, properties evaluated later override properties with the same name declared earlier."
      },
      {
        id: "q-dest-7",
        prompt: "What will 'Math.max(...[10, 50, 20])' return?",
        options: [
          { id: "ds25", label: "50" },
          { id: "ds26", label: "NaN" },
          { id: "ds27", label: "[50]" },
          { id: "ds28", label: "TypeError" }
        ],
        correctIndex: 0,
        explanation: "Math.max expects comma-separated numbers. Spreading the array expands [10, 50, 20] into Math.max(10, 50, 20), which evaluates to 50."
      },
      {
        id: "q-dest-8",
        prompt: "How can you skip the second element when destructuring an array?",
        options: [
          { id: "ds29", label: "const [first, , third] = array;" },
          { id: "ds30", label: "const [first, skip, third] = array;" },
          { id: "ds31", label: "const [first, null, third] = array;" },
          { id: "ds32", label: "const [first -> third] = array;" }
        ],
        correctIndex: 0,
        explanation: "Leaving an empty space between commas [first, , third] skips the element at that corresponding index."
      },
      {
        id: "q-dest-9",
        prompt: "What modern built-in JavaScript function creates an independent deep copy of nested objects without sharing references?",
        options: [
          { id: "ds33", label: "structuredClone(obj)" },
          { id: "ds34", label: "Object.deepCopy(obj)" },
          { id: "ds35", label: "JSON.clone(obj)" },
          { id: "ds36", label: "cloneDeep(obj)" }
        ],
        correctIndex: 0,
        explanation: "structuredClone() is the standard built-in method in modern browsers and Node.js to create a deep copy of nested data structures."
      },
      {
        id: "q-dest-10",
        prompt: "Given 'const { name, ...otherDetails } = { name: \"Hari\", age: 22, city: \"BLR\" };', what is 'otherDetails'?",
        options: [
          { id: "ds37", label: "An object containing { age: 22, city: \"BLR\" }" },
          { id: "ds38", label: "An array of keys [\"age\", \"city\"]" },
          { id: "ds39", label: "undefined" },
          { id: "ds40", label: "A string \"age, city\"" }
        ],
        correctIndex: 0,
        explanation: "Rest syntax in object destructuring gathers all remaining own enumerable properties into a fresh object."
      }
    ]
  },
  {
    id: "item-js-modules",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "19. Modules — import and export",
    duration: "40 mins",
    type: "cheatsheet",
    position: 19,
    contentHeading: "Lesson 19: Modules — import and export",
    contentDescription: "Structure scalable applications with ES modules: named exports, default exports, importing namespaces, browser <script type='module'>, module scope, and dynamic import().",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. math.js -> Named exports\nexport const PI = 3.14159;\nexport function add(a, b) { return a + b; }\nexport function subtract(a, b) { return a - b; }\n\n// 2. greet.js -> Default export\nexport default function greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// 3. main.js -> Importing\nimport greet from \"./greet.js\"; // Default import (no braces)\nimport { add, PI } from \"./math.js\"; // Named imports (with braces)\nimport * as math from \"./math.js\"; // Namespace import"
    },
    sections: [
      {
        title: "19.1 What is a JavaScript Module & Why Do We Need Them?",
        explanation: "A module is a distinct JavaScript file that encapsulates internal logic and exposes selected functions, objects, or values to other files using export and import. Modules prevent monolithic spaghetti code, separate concerns, and make code reusable, testable, and maintainable.",
        bullets: [
          "Separation of concerns: math.js handles calculations, api.js handles HTTP, auth.js handles users.",
          "Avoids global namespace collisions.",
          "Explicit dependencies: Every file clearly states what it needs."
        ]
      },
      {
        title: "19.2 Named Exports vs Default Exports",
        explanation: "ES modules support two primary export mechanisms:",
        table: {
          headers: ["Feature", "Named Export", "Default Export"],
          rows: [
            ["Quantity", "Multiple per module", "Exactly ONE per module"],
            ["Export Syntax", "export function add() {} or export { add };", "export default function greet() {}"],
            ["Import Syntax", "import { add } from './math.js';", "import greet from './greet.js'; (NO braces!)"],
            ["Renaming", "import { add as sum } from './math.js';", "import anyName from './greet.js'; (freedom to name)"],
            ["Typical Use", "Utility libraries with multiple helper functions", "The primary component or class of a file"]
          ]
        }
      },
      {
        title: "19.3 Importing Everything as a Namespace",
        explanation: "You can import all named exports of a module under a single namespace object using 'import * as alias from path':",
        codeSnippet: {
          language: "JavaScript",
          code: "import * as math from \"./math.js\";\nconsole.log(math.add(10, 5));\nconsole.log(math.subtract(10, 5));\nconsole.log(math.PI);"
        }
      },
      {
        title: "19.4 Using Modules in the Browser",
        explanation: "To use ES modules natively in HTML, add type=\"module\" to the script tag. Note: native ES modules require an HTTP server (e.g. VS Code Live Server or Vite) and cannot be opened via local file:// protocol due to CORS security rules.",
        codeSnippet: {
          language: "HTML",
          code: "<!-- index.html -->\n<script type=\"module\" src=\"./main.js\"></script>"
        }
      },
      {
        title: "19.5 Key Properties of JavaScript Modules",
        explanation: "Modules have special execution characteristics:",
        bullets: [
          "Module Scope: Top-level variables do NOT pollute the global window object.",
          "Strict Mode: Modules automatically execute in 'use strict' mode.",
          "Evaluated Once: Modules are singletons; if imported across multiple files, they execute only once.",
          "Static Imports: import declarations must be at the top level (not inside if statements).",
          "Dynamic Imports: For conditional or lazy loading, use await import('./module.js')."
        ]
      }
    ],
    questions: [
      {
        id: "q-mod-1",
        prompt: "What is the key difference in import syntax between a named export and a default export?",
        options: [
          { id: "m1", label: "Named imports require curly braces { add }; default imports do not use braces (import add from ...)." },
          { id: "m2", label: "Default imports require parentheses (add)." },
          { id: "m3", label: "Named imports can only import numbers." },
          { id: "m4", label: "Default imports must end with .json." }
        ],
        correctIndex: 0,
        explanation: "Named exports require matching curly braces { fnName }, whereas a default export represents the primary export and is imported directly without braces."
      },
      {
        id: "q-mod-2",
        prompt: "How many 'default' exports can a single JavaScript module have?",
        options: [
          { id: "m5", label: "Exactly one" },
          { id: "m6", label: "Up to 5" },
          { id: "m7", label: "Unlimited" },
          { id: "m8", label: "None; default exports are deprecated" }
        ],
        correctIndex: 0,
        explanation: "A module can have multiple named exports, but at most ONE default export."
      },
      {
        id: "q-mod-3",
        prompt: "How do you rename a named import locally in the importing file?",
        options: [
          { id: "m9", label: "import { add as sum } from \"./math.js\";" },
          { id: "m10", label: "import { add: sum } from \"./math.js\";" },
          { id: "m11", label: "import { add = sum } from \"./math.js\";" },
          { id: "m12", label: "import { add -> sum } from \"./math.js\";" }
        ],
        correctIndex: 0,
        explanation: "The 'as' keyword renames a named import locally (e.g. import { add as sum } from './math.js')."
      },
      {
        id: "q-mod-4",
        prompt: "What HTML attribute must be added to a <script> tag to enable native ES module imports in browsers?",
        options: [
          { id: "m13", label: "type=\"module\"" },
          { id: "m14", label: "module=\"true\"" },
          { id: "m15", label: "async=\"module\"" },
          { id: "m16", label: "type=\"es6\"" }
        ],
        correctIndex: 0,
        explanation: "<script type=\"module\" src=\"main.js\"></script> informs the browser to treat the file as an ECMAScript module."
      },
      {
        id: "q-mod-5",
        prompt: "Do top-level variables declared in an ES module attach to the global 'window' object?",
        options: [
          { id: "m17", label: "No, modules have their own isolated module scope." },
          { id: "m18", label: "Yes, all variables become window properties." },
          { id: "m19", label: "Only if declared with 'var'." },
          { id: "m20", label: "Only in Google Chrome." }
        ],
        correctIndex: 0,
        explanation: "Modules have module scope. Variables declared at the top level remain private to that module and never pollute the global window object."
      },
      {
        id: "q-mod-6",
        prompt: "How can you import all named exports from a module under a single namespace object?",
        options: [
          { id: "m21", label: "import * as math from \"./math.js\";" },
          { id: "m22", label: "import all from \"./math.js\";" },
          { id: "m23", label: "import { * } from \"./math.js\";" },
          { id: "m24", label: "import math.* from \"./math.js\";" }
        ],
        correctIndex: 0,
        explanation: "'import * as alias from ...' binds all exported members into a single namespace object called alias."
      },
      {
        id: "q-mod-7",
        prompt: "Why does opening an HTML file using ES modules directly via 'file://' fail in most web browsers?",
        options: [
          { id: "m25", label: "Browsers enforce CORS (Cross-Origin Resource Sharing) security restrictions that block module loading over the file:// protocol." },
          { id: "m26", label: "Because HTML files cannot contain JavaScript." },
          { id: "m27", label: "Because file:// deletes the JavaScript file." },
          { id: "m28", label: "Because modules only run in Linux." }
        ],
        correctIndex: 0,
        explanation: "Browser security models disallow local file:// origin requests for ES modules. A local web server (like Live Server, Vite, or http-server) is required."
      },
      {
        id: "q-mod-8",
        prompt: "How many times is a module executed if it is imported by five different files in the same app?",
        options: [
          { id: "m29", label: "Exactly once (modules are singletons evaluated upon first import and cached)." },
          { id: "m30", label: "5 times" },
          { id: "m31", label: "Every 10 seconds" },
          { id: "m32", label: "Never" }
        ],
        correctIndex: 0,
        explanation: "Modules are executed once when first imported. Subsequent imports share the exact same cached exported instances."
      },
      {
        id: "q-mod-9",
        prompt: "What feature allows loading a module conditionally or on-demand inside an async function?",
        options: [
          { id: "m33", label: "Dynamic import() which returns a Promise: const mod = await import('./math.js');" },
          { id: "m34", label: "if (true) { import { add } from './math.js'; }" },
          { id: "m35", label: "require.module()" },
          { id: "m36", label: "loadScript()" }
        ],
        correctIndex: 0,
        explanation: "Standard import declarations must be top-level static statements. Dynamic import('...') can be called anywhere and returns a Promise resolving to the module."
      },
      {
        id: "q-mod-10",
        prompt: "Do JavaScript modules execute in strict mode by default?",
        options: [
          { id: "m37", label: "Yes, modules automatically run in strict mode without needing 'use strict'." },
          { id: "m38", label: "No, strict mode must be enabled manually." },
          { id: "m39", label: "Only if configured in package.json." },
          { id: "m40", label: "Only on HTTPS domains." }
        ],
        correctIndex: 0,
        explanation: "The ECMAScript specification dictates that all code inside an ES module automatically executes in strict mode."
      }
    ]
  },
  {
    id: "item-js-error-handling",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "20. Error Handling and Debugging",
    duration: "40 mins",
    type: "cheatsheet",
    position: 20,
    contentHeading: "Lesson 20: Error Handling and Debugging",
    contentDescription: "Handle exceptions and debug like a professional: try, catch, finally, custom throw new Error, error types, debugging with DevTools breakpoints, and the debugger statement.",
    codeSnippet: {
      language: "JavaScript",
      code: "function divide(a, b) {\n  if (b === 0) {\n    throw new Error(\"Cannot divide by zero.\");\n  }\n  return a / b;\n}\n\nlet isLoading = true;\ntry {\n  console.log(divide(10, 2)); // 5\n  console.log(divide(10, 0)); // Throws\n} catch (error) {\n  console.error(\"Caught error:\", error.name, error.message);\n} finally {\n  isLoading = false; // Always completes cleanup\n  console.log(\"Cleanup completed.\");\n}"
    },
    sections: [
      {
        title: "20.1 Common JavaScript Error Types",
        explanation: "Errors occur when syntax is invalid or operations fail during execution. Recognizing built-in error types helps diagnose issues quickly:",
        table: {
          headers: ["Error Type", "Common Cause", "Example"],
          rows: [
            ["SyntaxError", "Invalid JavaScript grammatical syntax", "Missing closing parenthesis: if (x > 0 {"],
            ["ReferenceError", "Accessing an undeclared or out-of-scope variable", "console.log(undeclaredVar);"],
            ["TypeError", "Invalid operation for the value type", "num.toUpperCase() or undefined.name"],
            ["RangeError", "Value outside an allowable range or infinite recursion", "new Array(-1) or Maximum call stack exceeded"],
            ["URIError", "Invalid use of URI encode/decode functions", "decodeURIComponent('%')"]
          ]
        }
      },
      {
        title: "20.2 The try...catch...finally Statement",
        explanation: "try...catch allows handling runtime exceptions gracefully without crashing the application:",
        bullets: [
          "try block: Encloses code that might throw an exception.",
          "catch block: Executes if an error occurs in the try block, receiving the error object.",
          "finally block: Runs unconditionally after try and catch processing, ideal for cleanup (e.g. resetting isLoading = false)."
        ]
      },
      {
        title: "20.3 The throw Statement & Error Object",
        explanation: "The throw statement deliberately raises an exception when an invalid state occurs. Always throw an Error object (throw new Error('...')) rather than raw strings because Error objects provide stack traces and line numbers.",
        codeSnippet: {
          language: "JavaScript",
          code: "function checkAge(age) {\n  if (age < 18) {\n    throw new Error(\"Age must be at least 18.\");\n  }\n  return \"Access granted\";\n}\n\ntry {\n  checkAge(15);\n} catch (err) {\n  console.log(err.message); // \"Age must be at least 18.\"\n  console.log(err.stack);   // Stack trace showing exact line number\n}"
        }
      },
      {
        title: "20.4 Handling JSON Parsing & Async Errors",
        explanation: "Synchronous try...catch does NOT catch errors in unawaited asynchronous promises. Always use await inside try...catch or attach a .catch() handler:",
        codeSnippet: {
          language: "JavaScript",
          code: "// Safe JSON parsing:\ntry {\n  const user = JSON.parse(malformedString);\n} catch (err) {\n  console.error(\"Invalid JSON:\", err.message);\n}\n\n// Safe Async/Await error handling:\nasync function load() {\n  try {\n    const res = await fetch(\"/api/data\");\n    const data = await res.json();\n  } catch (err) {\n    console.error(\"Fetch failed:\", err.message);\n  }\n}"
        }
      },
      {
        title: "20.5 Systematic Debugging & Browser DevTools",
        explanation: "Debugging is the structured process of finding and fixing root causes:",
        bullets: [
          "F12 / Ctrl+Shift+I: Opens Chrome/Firefox DevTools.",
          "Console Tab: View errors, warnings, and inspect data using console.table().",
          "Sources Tab: Set breakpoints to pause execution at specific lines and step through code.",
          "debugger statement: Place 'debugger;' directly in your code to trigger a breakpoint automatically when DevTools is open.",
          "6-Step Debugging: 1. Reproduce -> 2. Read error -> 3. Inspect variables -> 4. Find root cause -> 5. Fix -> 6. Test."
        ]
      }
    ],
    questions: [
      {
        id: "q-err-1",
        prompt: "What error type is thrown when you attempt to call a method that does not exist on a value, like '10.toUpperCase()'?",
        options: [
          { id: "er1", label: "TypeError" },
          { id: "er2", label: "ReferenceError" },
          { id: "er3", label: "SyntaxError" },
          { id: "er4", label: "RangeError" }
        ],
        correctIndex: 0,
        explanation: "TypeError occurs when an operation cannot be performed on the given type, such as treating a number as a string or calling a non-function."
      },
      {
        id: "q-err-2",
        prompt: "What error type is thrown when accessing a variable that has never been declared in any accessible scope?",
        options: [
          { id: "er5", label: "ReferenceError" },
          { id: "er6", label: "TypeError" },
          { id: "er7", label: "SyntaxError" },
          { id: "er8", label: "URIError" }
        ],
        correctIndex: 0,
        explanation: "ReferenceError occurs when code references a variable identifier that cannot be resolved in the scope chain."
      },
      {
        id: "q-err-3",
        prompt: "When does the 'finally' block execute in a try...catch...finally structure?",
        options: [
          { id: "er9", label: "Always, regardless of whether an error was thrown or caught." },
          { id: "er10", label: "Only if an error occurred in the try block." },
          { id: "er11", label: "Only if no error occurred." },
          { id: "er12", label: "Only if the catch block throws a new error." }
        ],
        correctIndex: 0,
        explanation: "The finally block runs unconditionally after try and catch processing, making it ideal for resource cleanup or resetting loading indicators."
      },
      {
        id: "q-err-4",
        prompt: "Why should you throw an Error instance ('throw new Error(...)') instead of a primitive string ('throw \"error\"')?",
        options: [
          { id: "er13", label: "Error objects capture stack traces, filenames, and line numbers, providing crucial debugging context." },
          { id: "er14", label: "Primitive strings are not supported by the throw statement." },
          { id: "er15", label: "Error objects run faster." },
          { id: "er16", label: "Because strings crash the browser." }
        ],
        correctIndex: 0,
        explanation: "Throwing an Error object provides the error message, error name, and a stack trace recording the call chain leading to the failure."
      },
      {
        id: "q-err-5",
        prompt: "What does the 'debugger;' statement do when browser Developer Tools is open?",
        options: [
          { id: "er17", label: "It pauses JavaScript execution at that line like an active breakpoint, allowing you to inspect variables and call stack." },
          { id: "er18", label: "It formats the file with Prettier." },
          { id: "er19", label: "It turns off all JavaScript errors." },
          { id: "er20", label: "It reloads the page in debug mode." }
        ],
        correctIndex: 0,
        explanation: "The debugger statement acts as a programmatic breakpoint: if DevTools is open, execution pauses at that statement so you can inspect memory and step through lines."
      },
      {
        id: "q-err-6",
        prompt: "What error will 'JSON.parse(\"{ invalid json }\")' throw?",
        options: [
          { id: "er21", label: "SyntaxError" },
          { id: "er22", label: "TypeError" },
          { id: "er23", label: "ReferenceError" },
          { id: "er24", label: "RangeError" }
        ],
        correctIndex: 0,
        explanation: "JSON.parse() parses according to strict JSON grammar. Malformed JSON throws a SyntaxError."
      },
      {
        id: "q-err-7",
        prompt: "Why does a standard synchronous try...catch fail to catch an error thrown inside 'setTimeout(() => { throw new Error(); }, 1000)'?",
        options: [
          { id: "er25", label: "The timer callback executes in a future turn of the event loop after the try...catch block has already finished executing." },
          { id: "er26", label: "Because setTimeout does not allow errors." },
          { id: "er27", label: "Because setTimeout is deprecated." },
          { id: "er28", label: "Because errors inside timers are silently deleted." }
        ],
        correctIndex: 0,
        explanation: "Synchronous try...catch only catches exceptions thrown during its immediate execution stack. Asynchronous callbacks run later on a separate call stack."
      },
      {
        id: "q-err-8",
        prompt: "What DevTools console method prints arrays of objects in a clear, formatted spreadsheet table?",
        options: [
          { id: "er29", label: "console.table()" },
          { id: "er30", label: "console.grid()" },
          { id: "er31", label: "console.spread()" },
          { id: "er32", label: "console.matrix()" }
        ],
        correctIndex: 0,
        explanation: "console.table() formats arrays and objects into an interactive table with column headers in the browser console."
      },
      {
        id: "q-err-9",
        prompt: "What is a 'logical error' in programming?",
        options: [
          { id: "er33", label: "An error where code runs without throwing an exception, but produces incorrect results due to flawed logic." },
          { id: "er34", label: "A syntax error in a boolean expression." },
          { id: "er35", label: "An error in the computer's CPU arithmetic logic unit." },
          { id: "er36", label: "A network timeout." }
        ],
        correctIndex: 0,
        explanation: "Logical errors (like multiplying instead of adding) do not crash the script, but yield wrong outputs, making them difficult to detect without tests and debugging."
      },
      {
        id: "q-err-10",
        prompt: "Why should you avoid placing 'return' statements inside a 'finally' block?",
        options: [
          { id: "er37", label: "A return statement in 'finally' overwrites any value returned or exception thrown from the preceding try or catch blocks, masking errors." },
          { id: "er38", label: "Because it causes an infinite loop." },
          { id: "er39", label: "Because 'finally' blocks cannot return numbers." },
          { id: "er40", label: "It throws a SyntaxError." }
        ],
        correctIndex: 0,
        explanation: "Returning inside a finally block discards any thrown exceptions or return values from the try/catch blocks, silently swallowing errors."
      }
    ]
  },
  {
    id: "item-js-json",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "21. JSON — JavaScript Object Notation",
    duration: "35 mins",
    type: "cheatsheet",
    position: 21,
    contentHeading: "Lesson 21: JSON — JavaScript Object Notation",
    contentDescription: "Understand the universal data-interchange format: strict syntax rules, JSON vs JavaScript objects, JSON.stringify(), JSON.parse(), and serialization limitations.",
    codeSnippet: {
      language: "JavaScript",
      code: "const user = {\n  name: \"Hari\",\n  age: 22,\n  skills: [\"HTML\", \"CSS\", \"JavaScript\"],\n  isStudent: false\n};\n\n// 1. Convert JS object to JSON string (Serialization)\nconst jsonString = JSON.stringify(user, null, 2);\nconsole.log(jsonString);\n\n// 2. Convert JSON string back to JS object (Deserialization)\nconst parsedUser = JSON.parse(jsonString);\nconsole.log(parsedUser.name); // \"Hari\""
    },
    sections: [
      {
        title: "21.1 What is JSON and Why Do We Need It?",
        explanation: "JSON stands for JavaScript Object Notation. It is a lightweight, text-based data format used to store and exchange structured data between applications, most notably between client frontends and server backends over REST and GraphQL APIs. JSON is completely language-independent: Python, Java, C#, and Go all understand JSON.",
        bullets: [
          "Universal data format for web APIs.",
          "Used for application configuration (e.g. package.json, tsconfig.json).",
          "Standard format for persistent browser storage strings."
        ]
      },
      {
        title: "21.2 Strict JSON Syntax Rules",
        explanation: "JSON resembles JavaScript object literals, but enforces strict rules:",
        bullets: [
          "Rule 1: Property keys MUST be wrapped in double quotes: {\"name\": \"Hari\"} (NOT {name: \"Hari\"}).",
          "Rule 2: String values MUST use double quotes: \"Bengaluru\" (NOT 'single quotes').",
          "Rule 3: Supported types: string, number, boolean, null, array, and object.",
          "Rule 4: NO trailing commas allowed: {\"a\": 1, \"b\": 2} (NOT {\"a\": 1, \"b\": 2,}).",
          "Rule 5: Comments, functions, undefined, NaN, and Infinity are strictly FORBIDDEN in JSON."
        ]
      },
      {
        title: "21.3 JavaScript Objects vs JSON",
        explanation: "Key differences between JavaScript code and the JSON format:",
        table: {
          headers: ["Feature", "JavaScript Object", "JSON Format"],
          rows: [
            ["Type", "In-memory data structure", "Plain text format"],
            ["Keys", "Can be unquoted identifiers", "MUST use double quotes (\"key\")"],
            ["Quotes", "Single, double, or backticks", "Double quotes only (\"...\")"],
            ["Functions / Methods", "Supported", "NOT supported (omitted during stringify)"],
            ["undefined / NaN", "Valid values", "NOT supported (omitted or coerced to null)"],
            ["Comments", "Supported (//, /* */)", "NOT supported (causes syntax error)"]
          ]
        }
      },
      {
        title: "21.4 JSON.stringify() and JSON.parse()",
        explanation: "JavaScript provides two native static methods on the global JSON object:",
        bullets: [
          "JSON.stringify(value, replacer, space): Converts JavaScript values into a JSON text string. Passing space (e.g. 2) pretty-prints the output.",
          "JSON.parse(text): Parses a JSON text string into JavaScript objects or values. Throws SyntaxError on malformed text."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "// Pretty-printing JSON with 2-space indentation:\nconst formatted = JSON.stringify({ id: 1, name: \"Hari\" }, null, 2);\n\n// Safe parsing with try/catch:\ntry {\n  const data = JSON.parse(apiResponse);\n} catch (e) {\n  console.error(\"Invalid JSON received:\", e.message);\n}"
        }
      },
      {
        title: "21.5 Limitations of JSON Serialization",
        explanation: "JSON.stringify() does NOT preserve all JavaScript types:",
        bullets: [
          "undefined, functions, and symbols in objects are silently omitted.",
          "undefined, functions, and symbols in arrays are serialized as null.",
          "NaN and Infinity are converted to null.",
          "Date objects are converted into ISO 8601 strings.",
          "Circular references (an object referencing itself) throw TypeError: Converting circular structure to JSON."
        ]
      }
    ],
    questions: [
      {
        id: "q-json-1",
        prompt: "Which quote style is MANDATORY for property keys and strings in valid JSON?",
        options: [
          { id: "j1", label: "Double quotes (\"...\")" },
          { id: "j2", label: "Single quotes ('...')" },
          { id: "j3", label: "Backticks (`...`)" },
          { id: "j4", label: "Unquoted identifiers" }
        ],
        correctIndex: 0,
        explanation: "JSON specifications strictly mandate double quotes (\") for all property keys and string values."
      },
      {
        id: "q-json-2",
        prompt: "Which of the following is an INVALID JSON snippet?",
        options: [
          { id: "j5", label: "{\"name\": \"Hari\", \"age\": 22,}" },
          { id: "j6", label: "{\"name\": \"Hari\", \"age\": 22}" },
          { id: "j7", label: "[1, 2, 3]" },
          { id: "j8", label: "{\"active\": true, \"data\": null}" }
        ],
        correctIndex: 0,
        explanation: "JSON strictly forbids trailing commas after the last item or property. The trailing comma after 22 makes it invalid JSON."
      },
      {
        id: "q-json-3",
        prompt: "What happens when you call 'JSON.stringify({ name: \"Hari\", age: undefined, greet: () => {} })'?",
        options: [
          { id: "j9", label: "Properties with 'undefined' and function values are silently omitted: '{\"name\":\"Hari\"}'" },
          { id: "j10", label: "It throws a TypeError." },
          { id: "j11", label: "It converts functions into text code." },
          { id: "j12", label: "It converts them to '{\"age\": null, \"greet\": null}'" }
        ],
        correctIndex: 0,
        explanation: "JSON.stringify() automatically omits object properties whose values are functions, undefined, or symbols."
      },
      {
        id: "q-json-4",
        prompt: "What does 'JSON.parse()' return when given the string '\"Hello\"'?",
        options: [
          { id: "j13", label: "The JavaScript string \"Hello\"" },
          { id: "j14", label: "An object { text: \"Hello\" }" },
          { id: "j15", label: "A syntax error" },
          { id: "j16", label: "undefined" }
        ],
        correctIndex: 0,
        explanation: "JSON can represent primitive values as well as objects and arrays. Parsing '\"Hello\"' evaluates to the primitive string \"Hello\"."
      },
      {
        id: "q-json-5",
        prompt: "How can you format a JSON string with 2-space indentation for human readability?",
        options: [
          { id: "j17", label: "JSON.stringify(data, null, 2)" },
          { id: "j18", label: "JSON.format(data, 2)" },
          { id: "j19", label: "JSON.pretty(data)" },
          { id: "j20", label: "JSON.stringify(data, true)" }
        ],
        correctIndex: 0,
        explanation: "The third argument to JSON.stringify is the space parameter, which inserts indentation whitespace (e.g. 2 spaces) into the output string."
      },
      {
        id: "q-json-6",
        prompt: "What happens if you attempt to serialize an object containing a circular reference using 'JSON.stringify()'?",
        options: [
          { id: "j21", label: "It throws a TypeError: Converting circular structure to JSON." },
          { id: "j22", label: "It enters an infinite loop." },
          { id: "j23", label: "It returns null." },
          { id: "j24", label: "It truncates the circular key." }
        ],
        correctIndex: 0,
        explanation: "JavaScript detects circular references during serialization and throws a TypeError rather than hanging in an infinite loop."
      },
      {
        id: "q-json-7",
        prompt: "Are comments allowed inside JSON files?",
        options: [
          { id: "j25", label: "No, JSON strictly disallows comments." },
          { id: "j26", label: "Yes, using // only." },
          { id: "j27", label: "Yes, using /* */ only." },
          { id: "j28", label: "Yes, using <!-- -->." }
        ],
        correctIndex: 0,
        explanation: "The JSON standard intentionally excludes comments so parsing is fast, simple, and unambiguous."
      },
      {
        id: "q-json-8",
        prompt: "What does 'JSON.stringify([1, undefined, NaN, 4])' produce?",
        options: [
          { id: "j29", label: "\"[1,null,null,4]\"" },
          { id: "j30", label: "\"[1,4]\"" },
          { id: "j31", label: "It throws a TypeError." },
          { id: "j32", label: "\"[1,undefined,NaN,4]\"" }
        ],
        correctIndex: 0,
        explanation: "When undefined or NaN appear inside an Array, JSON.stringify converts them to null to preserve array indexing."
      },
      {
        id: "q-json-9",
        prompt: "What is JSON used for in web development?",
        options: [
          { id: "j33", label: "Exchanging structured data between frontends and backend servers via HTTP APIs." },
          { id: "j34", label: "Styling HTML layouts with grid and flexbox." },
          { id: "j35", label: "Compiling JavaScript into machine assembly code." },
          { id: "j36", label: "Managing database connections in CSS." }
        ],
        correctIndex: 0,
        explanation: "JSON is the global standard format for serializing and transporting structured data over HTTP between web clients and backend servers."
      },
      {
        id: "q-json-10",
        prompt: "What happens when 'new Date()' is serialized with 'JSON.stringify()'?",
        options: [
          { id: "j37", label: "It calls Date.prototype.toISOString() and serializes to an ISO 8601 timestamp string." },
          { id: "j38", label: "It is omitted from the JSON output." },
          { id: "j39", label: "It throws an error." },
          { id: "j40", label: "It serializes to a number of milliseconds." }
        ],
        correctIndex: 0,
        explanation: "Date objects implement toJSON(), which formats dates as standard ISO 8601 strings (e.g. \"2026-10-17T04:30:00.000Z\")."
      }
    ]
  }
];
