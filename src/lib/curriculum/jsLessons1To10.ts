import { CurriculumItem } from "../curriculumTypes";
import {
  extraQuestionsLesson1,
  extraQuestionsLesson2,
  extraQuestionsLesson3,
  extraQuestionsLesson4,
  extraQuestionsLesson5,
  extraQuestionsLesson6,
  extraQuestionsLesson7,
  extraQuestionsLesson8,
  extraQuestionsLesson9,
  extraQuestionsLesson10
} from "./jsExtraQuestions1To10";

export const jsLessons1To10: CurriculumItem[] = [
{
  "id": "item-07-intro-javascript",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "01. Introduction to JavaScript",
  "duration": "25 mins",
  "type": "cheatsheet",
  "position": 1,
  "contentHeading": "Lesson 1: Introduction to JavaScript",
  "contentDescription": "Learn what JavaScript is, its core features, role in web development, adding scripts to HTML, displaying output, comments, and runtimes.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. Connecting external JavaScript with defer\n// <script src=\"script.js\" defer></script>\n\n// 2. Logging output to browser console\nconsole.log(\"Hello JavaScript!\");\nconsole.log(\"Shopping Cart Subtotal:\", 500 * 2);\n\n// 3. Updating HTML text dynamically\nconst message = document.getElementById(\"message\");\nif (message) {\n  message.textContent = \"New message loaded dynamically!\";\n}"
  },
  "sections": [
    {
      "title": "1.1 What is JavaScript?",
      "explanation": "JavaScript is a programming language used to make websites interactive and dynamic. It can also be used for backend development, mobile applications, and other software.",
      "bullets": [
        "HTML displays product names, item structures, and buttons.",
        "CSS controls colors, responsive layouts, and visual styles.",
        "JavaScript handles actions such as adding products to a cart, calculating prices, and validating forms."
      ],
      "diagram": "+--------------------------------------------------------------+\n|                HOW WEB TECHNOLOGIES WORK TOGETHER            |\n+--------------------------------------------------------------+\n|  HTML (Structure):   <button id=\"add-to-cart\">Buy</button>   |\n|  CSS (Style):        button { background: #2563eb; color: #fff } |\n|  JavaScript (Logic): button.onclick = () => addToCart(id)    |\n+--------------------------------------------------------------+"
    },
    {
      "title": "1.2 Features of JavaScript",
      "explanation": "Modern JavaScript is powerful, flexible, and supported across all platforms:",
      "bullets": [
        "Dynamic: Values can be assigned different types at runtime.",
        "Interpreted/JIT compiled: Modern JavaScript engines execute code using interpretation and just-in-time compilation techniques for peak performance.",
        "Event-driven: Code can respond to user actions such as clicks, typing, keypresses, and scroll events.",
        "Asynchronous: It can handle background tasks such as API requests and timers without freezing the user interface.",
        "Multi-paradigm: Supports procedural, functional, and object-oriented programming styles.",
        "Cross-platform: Runs natively in all web browsers as well as backend runtimes like Node.js."
      ]
    },
    {
      "title": "1.3 JavaScript vs HTML vs CSS",
      "explanation": "The three foundational pillars of web development work together to deliver modern web apps:",
      "table": {
        "headers": [
          "Feature",
          "HTML",
          "CSS",
          "JavaScript"
        ],
        "rows": [
          [
            "Purpose",
            "Structure",
            "Styling",
            "Behavior"
          ],
          [
            "Analogy",
            "House walls and doors",
            "Paint, lighting, and decor",
            "Electrical switches and automation"
          ],
          [
            "Example",
            "Button element",
            "Button color and hover shadow",
            "Button click handler"
          ],
          [
            "File extension",
            ".html",
            ".css",
            ".js"
          ]
        ]
      }
    },
    {
      "title": "1.4 How to Add JavaScript to HTML",
      "explanation": "JavaScript can be embedded directly within HTML or linked from an external file:",
      "bullets": [
        "Method 1: Internal JavaScript — using <script> tags inside HTML files. Best for small scripts and quick experiments.",
        "Method 2: External JavaScript (Recommended) — separate logic into clean .js files using <script src=\"script.js\" defer></script>.",
        "The defer attribute: Tells the browser to parse HTML in parallel and execute external scripts after the HTML has been parsed."
      ],
      "codeSnippet": {
        "language": "HTML",
        "code": "<!-- Method 1: Internal JavaScript -->\n<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Welcome</h1>\n    <script>\n      console.log(\"Hello JavaScript!\");\n    </script>\n  </body>\n</html>\n\n<!-- Method 2: External JavaScript (Recommended) -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Website</title>\n    <script src=\"script.js\" defer></script>\n  </head>\n  <body>\n    <h1>Welcome</h1>\n  </body>\n</html>"
      }
    },
    {
      "title": "1.5 Displaying Output",
      "explanation": "JavaScript provides multiple standard ways to output data:",
      "bullets": [
        "console.log(): Displays values in the browser DevTools console (e.g. console.log('Hello'); console.log(10 + 20); // Output: Hello 30).",
        "alert(): Displays a modal popup alert dialog to the user (e.g. alert('Welcome to my website!');).",
        "document.write(): Writes content directly into the document stream. Avoid in normal application development because it can overwrite an already loaded page.",
        "textContent: Directly changes the visible text inside an HTML element without re-parsing HTML tags."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// 1. Browser Console Output\nconsole.log(\"Hello\");\nconsole.log(10 + 20); // 30\n\n// 2. Alert Box\nalert(\"Welcome to my website!\");\n\n// 3. Modifying DOM Elements via textContent\n// <p id=\"message\">Old message</p>\nconst msg = document.getElementById(\"message\");\nif (msg) {\n  msg.textContent = \"New message\";\n}"
      }
    },
    {
      "title": "1.6 JavaScript Comments",
      "explanation": "Comments explain code logic, make complex codebases easy to understand, and are completely ignored during execution:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Single-line comment: explain a single line of logic\n\n/* \n   Multi-line comment:\n   Document function parameters,\n   architectural notes, or logic details.\n*/\nconsole.log(\"Hello\");"
      }
    },
    {
      "title": "1.7 Where Does JavaScript Run? & Best Practices",
      "explanation": "JavaScript is ubiquitous across modern software architecture:",
      "bullets": [
        "Browser: Interactive websites, client-side routing, animations, and DOM manipulation.",
        "Node.js: Backend API services, microservices, database scripts, and command-line applications.",
        "Other Runtimes: Mobile development (React Native) and desktop development (Electron).",
        "Best Practice: Use the browser DevTools console to practise and debug code. Keep application logic organized in separate files."
      ]
    }
  ]
  ,
  "questions": [
    {
    "id": "q-js-intro-1",
    "prompt": "Why is linking an external JavaScript file with the 'defer' attribute recommended?",
    "options": [
        {
            "id": "def1",
            "label": "It downloads the script in parallel and executes it after the HTML document is fully parsed."
        },
        {
            "id": "def2",
            "label": "It turns off all JavaScript syntax errors."
        },
        {
            "id": "def3",
            "label": "It hides the script from being inspected in DevTools."
        }
    ],
    "correctIndex": 0,
    "explanation": "The 'defer' attribute prevents script execution from blocking HTML rendering. The script downloads in the background and executes in document order once DOM parsing is complete."
},
    {
    "id": "q-js-intro-2",
    "prompt": "Why should you avoid using document.write() in modern web applications?",
    "options": [
        {
            "id": "dw1",
            "label": "It can overwrite the entire loaded webpage if executed after document load."
        },
        {
            "id": "dw2",
            "label": "It is not supported by any browser."
        },
        {
            "id": "dw3",
            "label": "It can only output images."
        }
    ],
    "correctIndex": 0,
    "explanation": "Calling document.write() after the page has finished loading causes the browser to clear the existing document and overwrite it completely."
},
    ...extraQuestionsLesson1
  ]
},
{
  "id": "item-js-variables",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "02. Variables — var, let, and const",
  "duration": "30 mins",
  "type": "cheatsheet",
  "position": 2,
  "contentHeading": "Lesson 2: Variables — var, let, and const",
  "contentDescription": "Master variable declaration, initialization, scoping rules (var vs let vs const), block scope, object mutability, and naming conventions.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. Modern variable declarations\nconst country = \"India\"; // Immutable binding\nlet count = 1;          // Reassignable\ncount = 2;              // Valid reassignment\n\n// 2. const object properties can mutate:\nconst user = { name: \"Hari\" };\nuser.name = \"Rahul\";    // Valid!\nconsole.log(user.name); // \"Rahul\"\n\n// 3. Block scope:\nif (true) {\n  let blockScoped = 10;\n  const alsoBlock = 20;\n}\n// blockScoped is not accessible here!"
  },
  "sections": [
    {
      "title": "2.1 What is a Variable?",
      "explanation": "A variable is a named identifier used to access a value stored by a program in memory.",
      "bullets": [
        "Real-World Example: An e-commerce application stores a customer's name, product price, and cart quantity in variables."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "let username = \"Hari\";\nlet price = 500;\nlet quantity = 2;\n\nconsole.log(username);         // Hari\nconsole.log(price * quantity); // 1000"
      }
    },
    {
      "title": "2.2 Declaring and Initializing Variables",
      "explanation": "Understanding the variable lifecycle:",
      "bullets": [
        "Declaration: Creating a variable binding in scope (e.g. let score;).",
        "Initialization: Assigning its initial value upon creation (e.g. score = 10;).",
        "Reassignment: Giving an existing variable a new value (e.g. score = 20;)."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "let score;          // Declaration\nscore = 10;         // Initialization\nscore = 20;         // Reassignment\nconsole.log(score); // Output: 20"
      }
    },
    {
      "title": "2.3 var, let, and const",
      "explanation": "JavaScript has three keywords for declaring variables, each with specific scoping and mutability rules:",
      "bullets": [
        "var (Older): Allows reassignment and redeclaration in the same scope. It is function-scoped rather than block-scoped.",
        "let (Reassignable): Allows reassignment, but does not allow another declaration with the same name in the same scope. It is block-scoped.",
        "const (Non-reassignable): Must be initialized when declared and cannot be reassigned to a different value."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// var — allows redeclaration and reassignment\nvar age = 20;\nage = 21;\nvar age = 22;\nconsole.log(age); // Output: 22\n\n// let — allows reassignment, no redeclaration\nlet count = 1;\ncount = 2;\nconsole.log(count); // Output: 2\n\n// const — non-reassignable binding\nconst country = \"India\";\nconsole.log(country); // Output: India"
      }
    },
    {
      "title": "2.4 Difference Between var, let, and const",
      "table": {
        "headers": [
          "Feature",
          "var",
          "let",
          "const"
        ],
        "rows": [
          [
            "Reassignment",
            "Yes",
            "Yes",
            "No"
          ],
          [
            "Redeclaration in same scope",
            "Yes",
            "No",
            "No"
          ],
          [
            "Scope",
            "Function",
            "Block",
            "Block"
          ],
          [
            "Must initialize immediately",
            "No",
            "No",
            "Yes"
          ],
          [
            "Hoisted",
            "Yes, initialized to undefined",
            "Yes, but inaccessible before declaration (TDZ)",
            "Yes, but inaccessible before declaration (TDZ)"
          ]
        ]
      }
    },
    {
      "title": "2.5 Understanding Block Scope",
      "explanation": "A block is a section of code enclosed in curly braces { } (such as inside if, for, while, or custom blocks):",
      "bullets": [
        "var is not restricted to the if block, but let and const are strictly confined to the enclosing block."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "if (true) {\n  var a = 10;\n  let b = 20;\n  const c = 30;\n}\n\nconsole.log(a); // 10 (var leaked out of block scope!)\n// console.log(b); // ReferenceError: b is not defined\n// console.log(c); // ReferenceError: c is not defined"
      }
    },
    {
      "title": "2.6 Can a const Object Change?",
      "explanation": "Yes. const prevents reassignment of the variable binding, not modification of the object or array itself:",
      "bullets": [
        "Assigning a completely new object or value to user causes a TypeError.",
        "Mutating properties inside the existing object is completely valid."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const user = { name: \"Hari\" };\n\n// Mutating property of const object is ALLOWED\nuser.name = \"Rahul\";\nconsole.log(user.name); // Output: Rahul\n\n// Reassigning user to a new object is NOT allowed\n// user = { name: \"New User\" }; // TypeError: Assignment to constant variable"
      }
    },
    {
      "title": "2.7 Variable Naming Rules & Best Practices",
      "explanation": "JavaScript identifiers must follow standardized naming syntax and conventions:",
      "bullets": [
        "Valid Examples: let firstName = 'Hari'; let userAge = 22; let _count = 10; let $price = 500;",
        "Invalid Examples: let 1name (cannot start with a number); let first-name (hyphens not allowed); let let = 10 (reserved keyword).",
        "Rules: Names cannot start with a number; can contain letters, digits, _, and $; reserved keywords cannot be used; names are case-sensitive (age and Age are different).",
        "Best Practice: Prefer const by default. Use let when reassignment is necessary. Avoid var in modern JavaScript."
      ]
    }
  ]
  ,
  "questions": [
    {
    "id": "q-js-var-1",
    "prompt": "What happens when you declare an object with 'const' and update one of its properties?",
    "options": [
        {
            "id": "co1",
            "label": "The property updates successfully because 'const' prevents reassignment of the binding, not mutation of the object."
        },
        {
            "id": "co2",
            "label": "JavaScript throws a TypeError immediately."
        },
        {
            "id": "co3",
            "label": "The object is automatically deleted."
        }
    ],
    "correctIndex": 0,
    "explanation": "'const' creates an immutable variable binding (the variable cannot point to another object or value), but the contents of the object itself remain mutable."
},
    {
    "id": "q-js-var-2",
    "prompt": "Which scoping rule applies to 'let' and 'const' declarations?",
    "options": [
        {
            "id": "sc1",
            "label": "Block scope: they exist only within the nearest enclosing curly braces { }."
        },
        {
            "id": "sc2",
            "label": "Function scope only: they are always accessible throughout the entire file."
        },
        {
            "id": "sc3",
            "label": "Global scope: they leak into the window object."
        }
    ],
    "correctIndex": 0,
    "explanation": "'let' and 'const' are block-scoped, meaning they are only accessible within the block ({ }) in which they are declared."
},
    ...extraQuestionsLesson2
  ]
},
{
  "id": "item-js-data-types",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "03. Data Types",
  "duration": "30 mins",
  "type": "cheatsheet",
  "position": 3,
  "contentHeading": "Lesson 3: Data Types",
  "contentDescription": "Learn about JavaScript data types, the 7 primitive types, non-primitive reference types, typeof quirks, and pass-by-value vs pass-by-reference.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 7 Primitive Data Types:\nconst str = \"Hari\";           // String\nconst num = 22;               // Number\nconst bool = true;            // Boolean\nlet undef;                    // Undefined\nconst empty = null;           // Null\nconst big = 100n;             // BigInt\nconst sym = Symbol(\"id\");     // Symbol\n\n// Non-primitive types:\nconst student = { name: \"Hari\", age: 22 };   // Object\nconst skills = [\"HTML\", \"CSS\", \"JavaScript\"]; // Array\nconst greet = () => \"Hello\";                // Function"
  },
  "sections": [
    {
      "title": "3.1 What is a Data Type?",
      "explanation": "A data type classifies a value and determines what operations can be performed on it. Adding two numbers performs arithmetic, while adding two strings joins their text.",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(10 + 20);           // 30 (Numeric Addition)\nconsole.log(\"Hello \" + \"World\"); // \"Hello World\" (String Concatenation)"
      }
    },
    {
      "title": "3.2 Primitive Data Types",
      "explanation": "JavaScript has seven primitive types:",
      "bullets": [
        "1. String: Represents text (e.g. let name = 'Hari'; typeof name is 'string').",
        "2. Number: Represents integers and decimal numbers, including NaN and Infinity (e.g. let age = 22; let price = 99.5; typeof is 'number').",
        "3. Boolean: Represents either true or false (e.g. let isLoggedIn = true; typeof is 'boolean').",
        "4. Undefined: A variable that has been declared but has not been assigned a value (e.g. let result; typeof is 'undefined').",
        "5. Null: Represents an intentional absence of a value (e.g. let selectedUser = null;). Note: typeof null returning 'object' is a historical JavaScript quirk.",
        "6. BigInt: Represents integers larger than the safe range of the Number type (e.g. let bigNumber = 12345678901234567890n; typeof is 'bigint').",
        "7. Symbol: Creates a unique and immutable identifier, often used as an object property key (e.g. const id = Symbol('id'); typeof is 'symbol')."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(typeof \"Hari\");       // string\nconsole.log(typeof 22);           // number\nconsole.log(typeof true);         // boolean\nconsole.log(typeof undefined);    // undefined\nconsole.log(typeof null);         // object (Historical JavaScript quirk!)\nconsole.log(typeof 123456789n);   // bigint\nconsole.log(typeof Symbol(\"id\")); // symbol"
      }
    },
    {
      "title": "3.3 Non-Primitive Types",
      "explanation": "Objects store collections of values or more complex structures. Arrays and functions are also specialized objects in JavaScript:",
      "bullets": [
        "Object: Key-value store (e.g. const student = { name: 'Hari', age: 22 }; console.log(student.name); // Hari).",
        "Array: Ordered collection of values. Indexing starts at zero (e.g. const skills = ['HTML', 'CSS', 'JavaScript']; console.log(skills[0]); // HTML).",
        "Function: Stores reusable executable logic (e.g. function greet() { return 'Hello'; } console.log(greet()); // Hello)."
      ]
    },
    {
      "title": "3.4 Checking Data Types Using typeof & Array.isArray()",
      "explanation": "The typeof operator returns a string describing the type of a value. To check whether a value is an array, use Array.isArray():",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(typeof \"Hello\");   // string\nconsole.log(typeof 100);       // number\nconsole.log(typeof true);      // boolean\nconsole.log(typeof undefined); // undefined\nconsole.log(typeof {});        // object\nconsole.log(typeof []);        // object\nconsole.log(typeof null);      // object\n\n// Reliable array detection:\nconsole.log(Array.isArray([])); // true\nconsole.log(Array.isArray({})); // false"
      }
    },
    {
      "title": "3.5 Primitive Values vs Objects (Pass-by-Value vs Pass-by-Reference)",
      "table": {
        "headers": [
          "Primitive values",
          "Objects"
        ],
        "rows": [
          [
            "Include strings, numbers, and booleans",
            "Include objects, arrays, and functions"
          ],
          [
            "Immutable values",
            "Often mutable"
          ],
          [
            "Copied as values",
            "Variables hold references to objects"
          ]
        ]
      },
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// 1. Primitive copy by value:\nlet a = 10;\nlet b = a;\nb = 20;\nconsole.log(a); // 10\nconsole.log(b); // 20\n\n// 2. Object copy by reference:\nconst first = { score: 10 };\nconst second = first;\nsecond.score = 20;\nconsole.log(first.score); // 20 (Both point to the same memory object!)"
      }
    },
    {
      "title": "3.6 Best Practices",
      "explanation": "Best practice: Understand the distinction between null and undefined, and use explicit types and meaningful names to make code easier to maintain."
    }
  ]
  ,
  "questions": [
    {
    "id": "q-js-dt-1",
    "prompt": "What does 'typeof null' return in JavaScript, and why?",
    "options": [
        {
            "id": "tn1",
            "label": "'object', due to a historical quirk from early JavaScript implementation."
        },
        {
            "id": "tn2",
            "label": "'null', because null is its own primitive type."
        },
        {
            "id": "tn3",
            "label": "'undefined', because null means unassigned."
        }
    ],
    "correctIndex": 0,
    "explanation": "In the initial implementation of JavaScript, values were stored in 32-bit units with a type tag. 'object' had a tag of 0, and null was represented as a NULL pointer (all zeros), causing typeof null to return 'object'."
},
    {
    "id": "q-js-dt-2",
    "prompt": "If const obj2 = obj1; and obj2.name = 'Rahul'; what happens to obj1.name?",
    "options": [
        {
            "id": "ob1",
            "label": "obj1.name becomes 'Rahul' because objects are copied by reference."
        },
        {
            "id": "ob2",
            "label": "obj1.name remains unchanged because objects are cloned."
        },
        {
            "id": "ob3",
            "label": "An error is thrown because const objects cannot be modified."
        }
    ],
    "correctIndex": 0,
    "explanation": "Assigning an object variable copies the memory reference, not the underlying object data. Therefore, modifying obj2 mutates the same object referenced by obj1."
},
    ...extraQuestionsLesson3
  ]
},
{
  "id": "item-js-operators",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "04. Operators and Expressions",
  "duration": "30 mins",
  "type": "cheatsheet",
  "position": 4,
  "contentHeading": "Lesson 4: Operators and Expressions",
  "contentDescription": "Learn arithmetic, assignment, comparison, logical, prefix/postfix increment, ternary operators, precedence, and string concatenation.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. Arithmetic & Assignment\nlet x = 10;\nx += 5; // x = 15\n\n// 2. Comparison: === vs ==\nconsole.log(5 == \"5\");  // true (loose coercion)\nconsole.log(5 === \"5\"); // false (strict equality)\n\n// 3. Logical Operators\nconst canBuy = 10 > 5 && 20 > 10; // true\n\n// 4. Ternary Operator\nconst age = 20;\nconst category = age >= 18 ? \"Adult\" : \"Minor\"; // \"Adult\""
  },
  "sections": [
    {
      "title": "4.1 What is an Operator?",
      "explanation": "An operator is a symbol or keyword that performs an operation on values. In 'let total = 10 + 20;', '+' is an operator and '10 + 20' is an expression."
    },
    {
      "title": "4.2 Arithmetic Operators",
      "explanation": "Used for mathematical calculations:",
      "table": {
        "headers": [
          "Operator",
          "Meaning",
          "Example",
          "Result"
        ],
        "rows": [
          [
            "+",
            "Addition",
            "10 + 5",
            "15"
          ],
          [
            "-",
            "Subtraction",
            "10 - 5",
            "5"
          ],
          [
            "*",
            "Multiplication",
            "10 * 5",
            "50"
          ],
          [
            "/",
            "Division",
            "10 / 5",
            "2"
          ],
          [
            "%",
            "Remainder",
            "10 % 3",
            "1"
          ],
          [
            "**",
            "Exponentiation",
            "2 ** 3",
            "8"
          ],
          [
            "++",
            "Increment",
            "x++",
            "Adds 1"
          ],
          [
            "--",
            "Decrement",
            "x--",
            "Subtracts 1"
          ]
        ]
      },
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Practical example:\nconst price = 500;\nconst quantity = 3;\nconsole.log(price * quantity); // Output: 1500"
      }
    },
    {
      "title": "4.3 Assignment Operators",
      "explanation": "Used to assign or update values in place:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "let x = 10;\nx += 5; // x = x + 5 -> 15\nconsole.log(x); // 15\nx -= 3; // x = x - 3 -> 12\nconsole.log(x); // 12\nx *= 2; // x = x * 2 -> 24\nconsole.log(x); // 24\n\n// Other assignment operators include /=, %=, and **=."
      }
    },
    {
      "title": "4.4 Comparison Operators & Strict Equality (== vs ===)",
      "explanation": "Compare values and return a boolean:",
      "table": {
        "headers": [
          "Operator",
          "Meaning",
          "Example",
          "Result"
        ],
        "rows": [
          [
            ">",
            "Greater than",
            "10 > 5",
            "true"
          ],
          [
            "<",
            "Less than",
            "5 < 10",
            "true"
          ],
          [
            ">=",
            "Greater than or equal",
            "5 >= 5",
            "true"
          ],
          [
            "<=",
            "Less than or equal",
            "4 <= 3",
            "false"
          ],
          [
            "===",
            "Strict equality",
            "5 === \"5\"",
            "false"
          ],
          [
            "!==",
            "Strict inequality",
            "5 !== \"5\"",
            "true"
          ]
        ]
      },
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// == vs ===\nconsole.log(5 == \"5\");  // true  (coerces string to number)\nconsole.log(5 === \"5\"); // false (checks value AND type)\n\n// Best practice: Prefer === and !== unless you have a specific reason to use loose equality."
      }
    },
    {
      "title": "4.5 Logical Operators",
      "explanation": "Used to combine or reverse conditions:",
      "bullets": [
        "AND (&&): Returns a truthy value only when both operands are truthy (e.g. console.log(10 > 5 && 20 > 10); // Output: true).",
        "OR (||): Returns a truthy value if at least one operand is truthy (e.g. console.log(10 < 5 || 20 > 10); // Output: true).",
        "NOT (!): Reverses truthiness (e.g. console.log(!true); // Output: false)."
      ]
    },
    {
      "title": "4.6 Increment and Decrement (Prefix vs Postfix)",
      "explanation": "The placement of ++ or -- determines when the value changes:",
      "bullets": [
        "Post-increment (count++): returns the original value before incrementing.",
        "Pre-increment (++count): changes the value before returning it."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Post-increment:\nlet count1 = 5;\nconsole.log(count1++); // 5 (returns original value)\nconsole.log(count1);   // 6\n\n// Pre-increment:\nlet count2 = 5;\nconsole.log(++count2); // 6 (incremented first)\nconsole.log(count2);   // 6"
      }
    },
    {
      "title": "4.7 Ternary Operator",
      "explanation": "A compact way to choose between two expressions: condition ? valueIfTrue : valueIfFalse;",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const age = 20;\nconst result = age >= 18 ? \"Adult\" : \"Minor\";\nconsole.log(result); // Output: Adult"
      }
    },
    {
      "title": "4.8 Operator Precedence",
      "explanation": "Operator precedence determines which operations are evaluated first. Multiplication takes precedence over addition. Parentheses make the intended order explicit:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(10 + 5 * 2);   // 20 (5 * 2 evaluated first)\nconsole.log((10 + 5) * 2); // 30 (parentheses evaluated first)"
      }
    },
    {
      "title": "4.9 String Concatenation with + & Best Practices",
      "explanation": "The + operator can add numbers or join strings. When one operand is a string, JavaScript converts the other to a string:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(\"Hello \" + \"Hari\"); // \"Hello Hari\"\nconsole.log(10 + 20);           // 30\nconsole.log(\"10\" + 20);         // \"1020\" (String concatenation!)\n\n// Best practice: Use parentheses when expressions are complex, avoid confusing increment operations in larger expressions, and prefer template literals for readable string construction."
      }
    }
  ]
  ,
  "questions": [
    {
    "id": "q-js-op-1",
    "prompt": "What is the result of the expression: '10' + 20?",
    "options": [
        {
            "id": "res1",
            "label": "'1020' (a string) because the plus operator coerces 20 to a string."
        },
        {
            "id": "res2",
            "label": "30 (a number)."
        },
        {
            "id": "res3",
            "label": "NaN."
        }
    ],
    "correctIndex": 0,
    "explanation": "When either operand in a '+' expression is a string, JavaScript performs string concatenation rather than numeric addition."
},
    {
    "id": "q-js-op-2",
    "prompt": "Which equality operator should be used by default in modern JavaScript, and why?",
    "options": [
        {
            "id": "eq1",
            "label": "=== (strict equality) because it avoids unintended type coercion."
        },
        {
            "id": "eq2",
            "label": "== (loose equality) because it converts strings automatically."
        },
        {
            "id": "eq3",
            "label": "= because it assigns equality."
        }
    ],
    "correctIndex": 0,
    "explanation": "Strict equality (===) compares both value and data type without silent type conversions, eliminating unexpected coercion bugs."
},
    ...extraQuestionsLesson4
  ]
},
{
  "id": "item-js-type-conversion",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "05. Type Conversion and Coercion",
  "duration": "30 mins",
  "type": "cheatsheet",
  "position": 5,
  "contentHeading": "Lesson 5: Type Conversion and Coercion",
  "contentDescription": "Understand explicit type conversion, implicit coercion, truthy and falsy values, parseInt, parseFloat, NaN validation, and common pitfalls.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. Explicit Conversion\nconst num = Number(\"100\"); // 100\nconst str = String(50);    // \"50\"\nconst bool = Boolean(1);   // true\n\n// 2. Implicit Coercion\nconsole.log(\"5\" + 2); // \"52\" (string concatenation)\nconsole.log(\"5\" - 2); // 3 (numeric subtraction)\n\n// 3. Parsing units\nconsole.log(parseInt(\"25px\", 10));   // 25\nconsole.log(parseFloat(\"10.75kg\")); // 10.75\n\n// 4. Safe NaN Check\nconsole.log(Number.isNaN(Number(\"abc\"))); // true"
  },
  "sections": [
    {
      "title": "5.1 What is Type Conversion?",
      "explanation": "Type conversion changes a value from one data type to another. There are two main categories:",
      "bullets": [
        "Explicit conversion (Type Casting): You deliberately convert the value using built-in functions like Number(), String(), or Boolean().",
        "Implicit conversion (Coercion): JavaScript converts a value automatically during an operation."
      ]
    },
    {
      "title": "5.2 Explicit Conversion (Number, String, Boolean)",
      "explanation": "Deliberately converting between types:",
      "bullets": [
        "Number(): Converts string or boolean to number. If invalid, returns NaN (e.g. Number('100') -> 100, Number('10.5') -> 10.5, Number('hello') -> NaN).",
        "String(): Converts any value to a string (e.g. String(100) -> '100', String(true) -> 'true').",
        "Boolean(): Converts values to true or false (e.g. Boolean(1) -> true, Boolean(0) -> false, Boolean('') -> false, Boolean('Hello') -> true)."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Explicit Numbers\nconsole.log(Number(\"100\"));   // 100\nconsole.log(Number(\"10.5\"));  // 10.5\nconsole.log(Number(\"hello\")); // NaN (\"Not a Number\")\n\n// Explicit Strings\nconsole.log(String(100));     // \"100\"\nconsole.log(String(true));    // \"true\"\n\n// Explicit Booleans\nconsole.log(Boolean(1));      // true\nconsole.log(Boolean(0));      // false\nconsole.log(Boolean(\"\"));     // false\nconsole.log(Boolean(\"Hello\"));// true"
      }
    },
    {
      "title": "5.3 Truthy and Falsy Values",
      "explanation": "A falsy value behaves like false in a boolean context. Almost everything else is truthy, including empty arrays ([]) and empty objects ({}):",
      "bullets": [
        "The Falsy Values in JavaScript: false, 0, -0, 0n, \"\" (empty string), null, undefined, NaN.",
        "Truthy Values: Everything else! Including non-empty strings, '0', 'false', [], and {}."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(Boolean([]));   // true (Empty array is truthy!)\nconsole.log(Boolean({}));   // true (Empty object is truthy!)\nconsole.log(Boolean(\"0\"));  // true (Non-empty string is truthy!)\nconsole.log(Boolean(\"\"));   // false (Empty string is falsy)"
      }
    },
    {
      "title": "5.4 Implicit Conversion (Type Coercion)",
      "explanation": "JavaScript sometimes converts values automatically based on the operator:",
      "bullets": [
        "Example 1 (String concatenation): console.log('5' + 2); // Output: '52' — converts number to string and joins.",
        "Example 2 (Numeric subtraction): console.log('5' - 2); // Output: 3 — converts string '5' to number before subtracting.",
        "Example 3 (Boolean conversion in condition): if ('Hello') { console.log('Condition is true'); } // Output: Condition is true"
      ]
    },
    {
      "title": "5.5 parseInt() and parseFloat()",
      "explanation": "These functions parse numeric values from strings containing non-numeric suffixes (such as CSS pixels or metric units):",
      "bullets": [
        "parseInt('25px', 10) reads an integer from the beginning of a string and returns 25.",
        "parseFloat('10.75kg') reads a floating-point number from the beginning and returns 10.75.",
        "Unlike Number('25px'), which returns NaN, parseInt('25px', 10) extracts 25. Use these functions when parsing numeric prefixes is intentional."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(parseInt(\"25px\", 10));   // 25\nconsole.log(parseFloat(\"10.75kg\")); // 10.75\nconsole.log(Number(\"25px\"));         // NaN"
      }
    },
    {
      "title": "5.6 NaN and Safe Validation",
      "explanation": "NaN can result from invalid numeric operations. Note that NaN === NaN is false in JavaScript! Always use Number.isNaN():",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const value = Number(\"hello\");\nconsole.log(value);                // NaN\nconsole.log(value === NaN);        // false (NaN never equals itself!)\nconsole.log(Number.isNaN(value));  // true (The reliable way to validate)"
      }
    },
    {
      "title": "5.7 Practical Example: Shopping Cart Form Inputs",
      "explanation": "HTML input field values are always strings. Failing to convert them causes string concatenation bugs:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const price = \"500\";\nconst quantity = \"2\";\n\n// Bug: joins strings together\nconsole.log(price + quantity); // \"5002\"\n\n// Correct: explicit numeric conversion\nconst total = Number(price) * Number(quantity);\nconsole.log(total); // 1000"
      }
    },
    {
      "title": "5.8 Common Mistakes & Best Practices",
      "table": {
        "headers": [
          "Mistake",
          "Why it matters",
          "Better approach"
        ],
        "rows": [
          [
            "\"10\" + 5",
            "Produces \"105\"",
            "Convert to number when doing arithmetic: Number(\"10\") + 5"
          ],
          [
            "Number(\"abc\")",
            "Produces NaN",
            "Validate input with !Number.isNaN()"
          ],
          [
            "Boolean(\"false\")",
            "Produces true",
            "Parse textual booleans explicitly: val === \"true\""
          ],
          [
            "Comparing with ==",
            "Can trigger surprising coercion",
            "Prefer ==="
          ],
          [
            "Assuming [] is falsy",
            "Empty arrays are truthy",
            "Check .length: array.length === 0"
          ]
        ]
      },
      "explanation": "Best practice: Convert user input explicitly, validate it before calculations, and use strict equality to make comparisons predictable."
    }
  ]
  ,
  "questions": [
    {
    "id": "q-js-tc-1",
    "prompt": "Which of the following values is FALSY in JavaScript?",
    "options": [
        {
            "id": "fal1",
            "label": "0 (the number zero)"
        },
        {
            "id": "fal2",
            "label": "[] (an empty array)"
        },
        {
            "id": "fal3",
            "label": "{} (an empty object)"
        },
        {
            "id": "fal4",
            "label": "'false' (a string containing the word false)"
        }
    ],
    "correctIndex": 0,
    "explanation": "0 is falsy. In contrast, [], {}, and 'false' are all truthy because all objects, arrays, and non-empty strings are truthy in JavaScript."
},
    {
    "id": "q-js-tc-2",
    "prompt": "How should you correctly test if a numeric calculation resulted in NaN?",
    "options": [
        {
            "id": "nan1",
            "label": "Number.isNaN(value)"
        },
        {
            "id": "nan2",
            "label": "value === NaN"
        },
        {
            "id": "nan3",
            "label": "typeof value === 'nan'"
        }
    ],
    "correctIndex": 0,
    "explanation": "Because NaN is the only value in JavaScript that is not equal to itself, 'value === NaN' is always false. 'Number.isNaN(value)' is the standard and safe test."
},
    ...extraQuestionsLesson5
  ]
},
{
  "id": "item-js-conditionals",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "06. Conditionals",
  "duration": "30 mins",
  "type": "cheatsheet",
  "position": 6,
  "contentHeading": "Lesson 6: Conditionals",
  "contentDescription": "Master decision-making in JavaScript: if, if...else, else if ladders, nested conditionals, switch statements, ternary expressions, truthy/falsy evaluation, and logical guards.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. If-Else with logical operators\nconst balance = 5000;\nconst amount = 3000;\n\nif (balance >= amount) {\n  console.log(\"Transaction approved\");\n} else {\n  console.log(\"Insufficient balance\");\n}\n\n// 2. Switch Statement\nconst day = 2;\nswitch (day) {\n  case 1: console.log(\"Monday\"); break;\n  case 2: console.log(\"Tuesday\"); break;\n  default: console.log(\"Other day\");\n}\n\n// 3. Ternary Operator\nconst age = 17;\nconst status = age >= 18 ? \"Adult\" : \"Minor\"; // \"Minor\""
  },
  "sections": [
    {
      "title": "6.1 What are Conditionals?",
      "explanation": "Conditionals are statements that allow a program to execute different blocks of code depending on whether a condition is true or false.",
      "bullets": [
        "Practical Example: In a banking application, a transaction should be approved only if the account has sufficient balance."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const balance = 5000;\nconst amount = 3000;\n\nif (balance >= amount) {\n  console.log(\"Transaction approved\");\n} else {\n  console.log(\"Insufficient balance\");\n}\n// Output: Transaction approved"
      }
    },
    {
      "title": "6.2 The if Statement",
      "explanation": "Executes a block only when the condition is true. If the condition evaluates to false, the block is completely skipped.",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const age = 20;\n\nif (age >= 18) {\n  console.log(\"You are eligible to vote\");\n}\n// Output: You are eligible to vote"
      }
    },
    {
      "title": "6.3 The if...else Statement",
      "explanation": "Use it when you need two alternative outcomes — one when true, and another when false:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const temperature = 15;\n\nif (temperature > 25) {\n  console.log(\"It is hot\");\n} else {\n  console.log(\"It is cool\");\n}\n// Output: It is cool"
      }
    },
    {
      "title": "6.4 The if...else if...else Statement",
      "explanation": "Use this when several conditions must be checked in sequence. Execution stops at the first matching branch:",
      "bullets": [
        "1. JavaScript checks whether marks are at least 90.",
        "2. If false, it checks whether marks are at least 75.",
        "3. The first true condition executes its block.",
        "4. The remaining branches are skipped.",
        "Order matters: Put more specific or higher-threshold conditions first when appropriate."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const marks = 82;\n\nif (marks >= 90) {\n  console.log(\"Grade A\");\n} else if (marks >= 75) {\n  console.log(\"Grade B\");\n} else if (marks >= 50) {\n  console.log(\"Grade C\");\n} else {\n  console.log(\"Fail\");\n}\n// Output: Grade B"
      }
    },
    {
      "title": "6.5 Nested if Statements",
      "explanation": "A nested conditional is an if statement inside another conditional, useful when a secondary decision depends on an initial check:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const isLoggedIn = true;\nconst isAdmin = true;\n\nif (isLoggedIn) {\n  if (isAdmin) {\n    console.log(\"Admin dashboard\");\n  } else {\n    console.log(\"User dashboard\");\n  }\n} else {\n  console.log(\"Please log in\");\n}\n// Output: Admin dashboard"
      }
    },
    {
      "title": "6.6 The switch Statement",
      "explanation": "switch compares an expression against multiple case values using strict equality (===) and executes the matching branch:",
      "bullets": [
        "case: A value to compare against.",
        "break: Exits the switch statement immediately.",
        "default: Runs if no case matches.",
        "Cases use strict equality semantics.",
        "Fall-through: Without break, execution continues into subsequent cases regardless of their value."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const day = 2;\n\nswitch (day) {\n  case 1:\n    console.log(\"Monday\");\n    break;\n  case 2:\n    console.log(\"Tuesday\");\n    break;\n  case 3:\n    console.log(\"Wednesday\");\n    break;\n  default:\n    console.log(\"Invalid day\");\n}\n// Output: Tuesday"
      }
    },
    {
      "title": "6.7 The Ternary Operator",
      "explanation": "A concise inline way to select one of two expressions: condition ? valueIfTrue : valueIfFalse;",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const age = 17;\nconst status = age >= 18 ? \"Adult\" : \"Minor\";\nconsole.log(status);\n// Output: Minor\n\n// Note: Use ternary expressions for simple decisions. Avoid deeply nested ternaries because they become difficult to read."
      }
    },
    {
      "title": "6.8 Truthy and Falsy Conditions",
      "explanation": "JavaScript evaluates non-boolean values in conditions based on truthiness:",
      "bullets": [
        "Common falsy values: false, 0, -0, 0n, \"\" (empty string), null, undefined, and NaN.",
        "Truthy values: Non-empty strings (\"Hello\"), non-zero numbers, empty arrays ([]), and empty objects ({})."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "if (\"Hello\") {\n  console.log(\"Executed\"); // Runs because non-empty string is truthy\n}\n\nif (0) {\n  console.log(\"This will not execute\"); // 0 is falsy\n}"
      }
    },
    {
      "title": "6.9 Logical Operators in Conditions",
      "explanation": "Combine or reverse conditional checks:",
      "bullets": [
        "&& (AND): Both operands must be truthy for the overall condition to pass.",
        "|| (OR): At least one operand must be truthy.",
        "! (NOT): Inverts truthiness.",
        "Logical operators return operand values directly rather than always returning boolean primitives."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const age = 25;\nconst hasID = true;\n\nif (age >= 18 && hasID) {\n  console.log(\"Entry allowed\");\n}\n// Output: Entry allowed"
      }
    },
    {
      "title": "6.10 Practical Example: Login Validation & Best Practices",
      "explanation": "Validating user credentials using conditional logic:",
      "bullets": [
        "Use === for strict equality comparison to avoid type coercion bugs.",
        "Handle boundary values carefully, such as exactly 18 years old (>= vs >).",
        "Keep conditions readable by extracting complex expressions into descriptive boolean variables.",
        "Avoid unnecessarily deep nesting by returning early (guard clauses).",
        "Practice Challenge: Write a program that checks whether a number is positive, negative, or zero."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const username = \"hari\";\nconst password = \"abc123\";\n\nif (username === \"hari\" && password === \"abc123\") {\n  console.log(\"Login successful\");\n} else {\n  console.log(\"Invalid credentials\");\n}\n// Output: Login successful\n// Note: Real authentication must verify credentials securely on the server."
      }
    }
  ]
  ,
  "questions": [
    {
    "id": "q-cond-1",
    "prompt": "What happens in a switch statement if you omit the 'break' statement after a matching case?",
    "options": [
        {
            "id": "c1",
            "label": "Execution continues into subsequent cases even if their conditions do not match (fall-through)."
        },
        {
            "id": "c2",
            "label": "JavaScript immediately throws a SyntaxError."
        },
        {
            "id": "c3",
            "label": "The switch statement resets to the default branch."
        }
    ],
    "correctIndex": 0,
    "explanation": "Without a 'break' statement, execution falls through into following case clauses regardless of whether they match the switch expression."
},
    {
    "id": "q-cond-2",
    "prompt": "Which of the following values will evaluate to true inside an if condition?",
    "options": [
        {
            "id": "c4",
            "label": "[] (an empty array)"
        },
        {
            "id": "c5",
            "label": "0 (zero)"
        },
        {
            "id": "c6",
            "label": "'' (empty string)"
        },
        {
            "id": "c7",
            "label": "NaN"
        }
    ],
    "correctIndex": 0,
    "explanation": "All objects and arrays in JavaScript (even empty ones like []) are truthy. 0, '', and NaN are falsy."
},
    ...extraQuestionsLesson6
  ]
},
{
  "id": "item-js-loops",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "07. Loops",
  "duration": "30 mins",
  "type": "cheatsheet",
  "position": 7,
  "contentHeading": "Lesson 7: Loops",
  "contentDescription": "Master iteration in JavaScript: for loops, while loops, do...while, for...of over collections, for...in object property inspection, break, continue, and nested loops.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. Standard for loop\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n\n// 2. for...of over arrays\nconst fruits = [\"Apple\", \"Mango\", \"Orange\"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n\n// 3. for...in over object keys\nconst user = { name: \"Hari\", age: 22, city: \"Bengaluru\" };\nfor (const key in user) {\n  console.log(key, user[key]);\n}"
  },
  "sections": [
    {
      "title": "7.1 What are Loops?",
      "explanation": "Loops execute a block of code repeatedly until a specified condition is no longer satisfied or the loop is terminated. Instead of writing five separate statements to print five product names, a loop automates the repetition."
    },
    {
      "title": "7.2 The for Loop",
      "explanation": "Use a for loop when you know how to initialize, test, and update a counter:",
      "bullets": [
        "1. Initialize i to 1.",
        "2. Check whether i <= 5.",
        "3. Execute the body.",
        "4. Increment i (i++).",
        "5. Repeat until the condition evaluates to false."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n// Output:\n// 1\n// 2\n// 3\n// 4\n// 5"
      }
    },
    {
      "title": "7.3 The while Loop",
      "explanation": "Use a while loop when repetition depends on a dynamic condition checked before each iteration. If initially false, the loop body does not execute at all:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "let count = 1;\n\nwhile (count <= 3) {\n  console.log(count);\n  count++;\n}\n// Output:\n// 1\n// 2\n// 3"
      }
    },
    {
      "title": "7.4 The do...while Loop",
      "explanation": "Executes the body at least once because the test condition is evaluated after execution:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "let number = 5;\n\ndo {\n  console.log(number);\n  number++;\n} while (number <= 3);\n// Output: 5 (Executes once even though number <= 3 is initially false)"
      }
    },
    {
      "title": "7.5 The for...of Loop",
      "explanation": "Iterates directly over the values in an iterable, such as an array, string, or set. Use for...of when you need the items themselves rather than their indexes:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const fruits = [\"Apple\", \"Mango\", \"Orange\"];\n\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n// Output:\n// Apple\n// Mango\n// Orange"
      }
    },
    {
      "title": "7.6 The for...in Loop",
      "explanation": "Iterates over enumerable string-keyed property names, commonly used for inspecting objects. For arrays, prefer for...of or array methods because for...in iterates keys and may include unexpected enumerable properties:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const user = {\n  name: \"Hari\",\n  age: 22,\n  city: \"Bengaluru\"\n};\n\nfor (const key in user) {\n  console.log(key, user[key]);\n}\n// Output:\n// name Hari\n// age 22\n// city Bengaluru"
      }
    },
    {
      "title": "7.7 break and continue",
      "explanation": "Fine-grained loop control:",
      "bullets": [
        "break: Terminates the loop immediately and resumes execution after the loop block.",
        "continue: Skips the remainder of the current iteration and jumps directly to the next cycle."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// break example:\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) break;\n  console.log(i);\n}\n// Output: 1, 2\n\n// continue example:\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}\n// Output: 1, 2, 4, 5 (3 skipped)"
      }
    },
    {
      "title": "7.8 Nested Loops",
      "explanation": "A loop inside another loop. For each single iteration of the outer loop, the inner loop completes all its iterations. Essential for 2D grids, tables, and coordinate systems:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "for (let i = 1; i <= 2; i++) {\n  for (let j = 1; j <= 3; j++) {\n    console.log(i, j);\n  }\n}\n// Output:\n// 1 1\n// 1 2\n// 1 3\n// 2 1\n// 2 2\n// 2 3"
      }
    },
    {
      "title": "7.9 Common Loop Mistakes & Best Practices",
      "explanation": "Avoid common iteration bugs:",
      "bullets": [
        "Infinite Loops: Ensure loop counters are updated within the loop body so conditions eventually evaluate to false.",
        "Off-by-One Errors: Double check starting indexes and comparisons (for (let i = 0; i < 5; i++) produces 0..4, not 1..5).",
        "Use for...of for iterable items and array values.",
        "Use array methods (map, filter) when they express the intended operation more declaratively.",
        "Practice Challenge: Print numbers from 1 to 20, but skip multiples of 3 using the continue statement."
      ]
    }
  ]
  ,
  "questions": [
    {
    "id": "q-loop-1",
    "prompt": "What will be printed when running: for (let i = 1; i <= 5; i++) { if (i === 3) break; console.log(i); }?",
    "options": [
        {
            "id": "l1",
            "label": "1 and 2 only"
        },
        {
            "id": "l2",
            "label": "1, 2, 4, 5"
        },
        {
            "id": "l3",
            "label": "3"
        }
    ],
    "correctIndex": 0,
    "explanation": "'break' terminates the loop entirely as soon as i equals 3, so only 1 and 2 are printed."
},
    {
    "id": "q-loop-2",
    "prompt": "Why is 'for...of' preferred over 'for...in' when looping through an array's items?",
    "options": [
        {
            "id": "l4",
            "label": "for...of yields the element values directly, whereas for...in iterates over keys/indexes."
        },
        {
            "id": "l5",
            "label": "for...in cannot run inside functions."
        },
        {
            "id": "l6",
            "label": "for...of runs only in reverse order."
        }
    ],
    "correctIndex": 0,
    "explanation": "for...of is designed for iterables and yields values directly. for...in iterates over enumerable string property keys."
},
    ...extraQuestionsLesson7
  ]
},
{
  "id": "item-js-functions-deep",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "08. Functions",
  "duration": "35 mins",
  "type": "cheatsheet",
  "position": 8,
  "contentHeading": "Lesson 8: Functions",
  "contentDescription": "Learn reusable modular code: function declarations, parameters vs arguments, return values vs console.log, function expressions, arrow functions, default parameters, function scope, and callbacks.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. Function Declaration\nfunction calculateTotal(price, quantity) {\n  return price * quantity;\n}\n\n// 2. Arrow Function with implicit return\nconst square = number => number * number;\n\n// 3. Default parameter\nfunction greet(name = \"Guest\") {\n  return `Hello, ${name}`;\n}\n\n// 4. Callback execution\nfunction processNumber(number, callback) {\n  callback(number);\n}\nprocessNumber(10, value => console.log(value * 2)); // 20"
  },
  "sections": [
    {
      "title": "8.1 What is a Function?",
      "explanation": "A function is a reusable block of code designed to perform a specific task. It can accept inputs and return an output. Instead of repeating identical calculations in many places, a function allows you to write the logic once and reuse it safely across your app."
    },
    {
      "title": "8.2 Function Declaration",
      "explanation": "Defining a function does not execute its body; calling (invoking) it does:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "function greet() {\n  console.log(\"Hello, Hari!\");\n}\n\ngreet();\ngreet();\n// Output:\n// Hello, Hari!\n// Hello, Hari!"
      }
    },
    {
      "title": "8.3 Parameters and Arguments",
      "explanation": "Distinguishing parameters from arguments:",
      "bullets": [
        "Parameter: A named placeholder variable defined in the function signature (e.g. name).",
        "Argument: The actual value passed when invoking the function (e.g. 'Hari' or 'Rahul')."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "function greet(name) {\n  console.log(\"Hello, \" + name);\n}\n\ngreet(\"Hari\");  // \"Hari\" is an argument\ngreet(\"Rahul\"); // \"Rahul\" is an argument\n// Output:\n// Hello, Hari\n// Hello, Rahul"
      }
    },
    {
      "title": "8.4 The return Statement (return vs console.log)",
      "explanation": "return sends a value back to the caller and terminates function execution immediately. Functions without an explicit return statement return undefined by default:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Function with return\nfunction add(a, b) {\n  return a + b;\n}\nconst result = add(10, 20);\nconsole.log(result); // Output: 30\n\n// Function without return:\nfunction printSum(a, b) {\n  console.log(a + b); // Prints 5\n}\nconst res = printSum(2, 3);\nconsole.log(res); // Output: undefined"
      }
    },
    {
      "title": "8.5 Function Expressions",
      "explanation": "A function can be treated as an expression and assigned to a variable. Function expressions are not callable before their definition line because variable bindings are not hoisted like function declarations:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const multiply = function (a, b) {\n  return a * b;\n};\n\nconsole.log(multiply(4, 5)); // Output: 20"
      }
    },
    {
      "title": "8.6 Arrow Functions",
      "explanation": "Arrow functions provide shorter syntax and lexical this binding. For a single expression, curly braces and the return keyword can be omitted (implicit return):",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Block body arrow function\nconst add = (a, b) => {\n  return a + b;\n};\nconsole.log(add(5, 3)); // Output: 8\n\n// Concise body with implicit return\nconst square = number => number * number;\nconsole.log(square(4)); // Output: 16"
      }
    },
    {
      "title": "8.7 Default Parameters",
      "explanation": "A default parameter provides a fallback value when an argument is omitted or strictly undefined. Note: Passing null does not trigger the default value:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "function greet(name = \"Guest\") {\n  return `Hello, ${name}`;\n}\n\nconsole.log(greet());        // Output: Hello, Guest\nconsole.log(greet(\"Hari\"));   // Output: Hello, Hari\nconsole.log(greet(null));    // Output: Hello, null (null is NOT undefined)"
      }
    },
    {
      "title": "8.8 Function Scope",
      "explanation": "Variables declared inside a function are local to that function and cannot be accessed from outer scopes:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "function demo() {\n  const message = \"Inside function\";\n  console.log(message);\n}\n\ndemo();\n// console.log(message); // ReferenceError: message is not defined"
      }
    },
    {
      "title": "8.9 Callback Functions",
      "explanation": "A callback is a function passed as an argument into another function to be invoked by it. Callbacks are foundational for event listeners, array processing, and asynchronous operations:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "function processNumber(number, callback) {\n  callback(number);\n}\n\nprocessNumber(10, value => {\n  console.log(value * 2);\n});\n// Output: 20"
      }
    },
    {
      "title": "8.10 Practical Example: Shopping Bill Calculator & Best Practices",
      "explanation": "Modular function architecture for calculating order billing:",
      "bullets": [
        "Give functions clear, descriptive action names (verbs like calculate, get, parse).",
        "Keep each function focused on a single responsibility.",
        "Always return values when callers need to compute further operations.",
        "Validate arguments before performing critical math.",
        "Practice Challenge: Write a function that takes a number and returns whether it is even or odd."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "function calculateTotal(price, quantity) {\n  return price * quantity;\n}\n\nfunction applyDiscount(total, percentage) {\n  return total - (total * percentage / 100);\n}\n\nconst total = calculateTotal(500, 3);\nconst finalAmount = applyDiscount(total, 10);\n\nconsole.log(\"Total:\", total);            // Output: Total: 1500\nconsole.log(\"Final amount:\", finalAmount); // Output: Final amount: 1350"
      }
    }
  ]
  ,
  "questions": [
    {
    "id": "q-fn-1",
    "prompt": "What does a JavaScript function return if it does not contain an explicit 'return' statement?",
    "options": [
        {
            "id": "fn1",
            "label": "undefined"
        },
        {
            "id": "fn2",
            "label": "null"
        },
        {
            "id": "fn3",
            "label": "0"
        }
    ],
    "correctIndex": 0,
    "explanation": "Functions without an explicit return statement return undefined by default when execution reaches the closing brace."
},
    {
    "id": "q-fn-2",
    "prompt": "What is the difference between a parameter and an argument?",
    "options": [
        {
            "id": "fn4",
            "label": "A parameter is the variable declared in the function definition; an argument is the actual value passed in during a call."
        },
        {
            "id": "fn5",
            "label": "A parameter is always a number; an argument is always a string."
        },
        {
            "id": "fn6",
            "label": "They are exact synonyms with no difference."
        }
    ],
    "correctIndex": 0,
    "explanation": "Parameters are defined in the function signature, while arguments are the concrete values provided when the function is invoked."
},
    ...extraQuestionsLesson8
  ]
},
{
  "id": "item-js-scope-hoisting",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "09. Scope, Hoisting, and the Temporal Dead Zone",
  "duration": "35 mins",
  "type": "cheatsheet",
  "position": 9,
  "contentHeading": "Lesson 9: Scope, Hoisting, and the Temporal Dead Zone",
  "contentDescription": "Understand JavaScript memory and execution lifecycle: global scope, function scope, block scope, lexical scope, variable/function hoisting, the TDZ, and closure fundamentals.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. var hoisting (initialized to undefined)\nconsole.log(a); // undefined\nvar a = 10;\n\n// 2. let / const hoisting & Temporal Dead Zone (TDZ):\n// console.log(b); // ReferenceError: Cannot access 'b' before initialization\nlet b = 20;\n\n// 3. Lexical scope and Closures:\nfunction outer() {\n  const message = \"Hello\";\n  return function inner() {\n    console.log(message);\n  };\n}\nconst sayHello = outer();\nsayHello(); // Output: Hello (closure retains lexical environment)"
  },
  "sections": [
    {
      "title": "9.1 What is Scope?",
      "explanation": "Scope determines where a variable or function can be accessed in a program. JavaScript features four primary scope levels:",
      "bullets": [
        "A. Global Scope: Top-level variables available throughout the entire script (e.g. const appName = 'My Website';).",
        "B. Function Scope: Variables declared inside a function are accessible only within that function.",
        "C. Block Scope: Variables declared with let and const inside curly braces { } exist only within that block.",
        "D. Lexical Scope: Nested functions have access to variables declared in their outer parent scopes."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Lexical scope example:\nfunction outer() {\n  const name = \"Hari\";\n  function inner() {\n    console.log(name); // Accesses parent scope variable\n  }\n  inner();\n}\nouter(); // Output: Hari"
      }
    },
    {
      "title": "9.2 What is Hoisting?",
      "explanation": "Hoisting describes how JavaScript allocates memory for declarations before executing code in a given scope:",
      "bullets": [
        "var Hoisting: Declaration is hoisted and initialized to undefined. Assignments stay in place.",
        "Function Declaration Hoisting: Entire function declarations are hoisted, so they can be called before their definition line.",
        "let and const Hoisting: The binding is hoisted into scope, but remains uninitialized. Accessing it before declaration triggers a ReferenceError."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// var hoisting:\nconsole.log(age); // Output: undefined\nvar age = 22;\n\n// Function declaration hoisting:\ngreet(); // Output: Hello (works smoothly!)\nfunction greet() {\n  console.log(\"Hello\");\n}"
      }
    },
    {
      "title": "9.3 What is the Temporal Dead Zone (TDZ)?",
      "explanation": "The Temporal Dead Zone is the period from the start of a scope until a let or const variable is initialized. Accessing the variable during this window throws a ReferenceError:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "{\n  // TDZ begins for 'score'\n  // console.log(score); // ReferenceError: Cannot access 'score' before initialization\n\n  let score = 100; // TDZ ends\n  console.log(score); // Output: 100\n}"
      }
    },
    {
      "title": "9.4 Difference Between var, let, and const in Scope",
      "table": {
        "headers": [
          "Feature",
          "var",
          "let",
          "const"
        ],
        "rows": [
          [
            "Scope",
            "Function or global script",
            "Block",
            "Block"
          ],
          [
            "Reassignment",
            "Allowed",
            "Allowed",
            "Not allowed"
          ],
          [
            "Redeclaration in same scope",
            "Allowed",
            "Not allowed",
            "Not allowed"
          ],
          [
            "Before initialization",
            "Reads as undefined after hoisting",
            "TDZ (ReferenceError)",
            "TDZ (ReferenceError)"
          ]
        ]
      }
    },
    {
      "title": "9.5 Common Interview Example",
      "explanation": "Demonstrating the difference between var and let in execution order:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "console.log(a);\nvar a = 10;\n\n// console.log(b); // ReferenceError: Cannot access 'b' before initialization\nlet b = 20;\n\nconsole.log(b);\n// Output:\n// undefined\n// 20"
      }
    },
    {
      "title": "9.6 Closures and Scope & Best Practices",
      "explanation": "A closure occurs when an inner function retains access to its parent lexical scope even after the parent function has finished executing:",
      "bullets": [
        "Prefer const and let over var in all modern applications.",
        "Always declare variables before using them to prevent TDZ issues.",
        "Keep variables confined to the smallest enclosing scope necessary.",
        "Practice Challenge: Predict the output of a program containing a var variable inside a block and a let variable inside the same block."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "function outer() {\n  const message = \"Hello\";\n  return function inner() {\n    console.log(message);\n  };\n}\n\nconst sayHello = outer();\nsayHello(); // Output: Hello (retains access to 'message' through closure)"
      }
    }
  ]
  ,
  "questions": [
    {
    "id": "q-tdz-1",
    "prompt": "What happens if you reference a 'let' variable before its declaration line?",
    "options": [
        {
            "id": "tdz1",
            "label": "A ReferenceError is thrown because the variable is in the Temporal Dead Zone (TDZ)."
        },
        {
            "id": "tdz2",
            "label": "It logs 'undefined' like var."
        },
        {
            "id": "tdz3",
            "label": "It logs null."
        }
    ],
    "correctIndex": 0,
    "explanation": "Variables declared with let and const exist in a Temporal Dead Zone from the start of the block until initialization; accessing them early throws a ReferenceError."
},
    {
    "id": "q-tdz-2",
    "prompt": "What is a closure in JavaScript?",
    "options": [
        {
            "id": "tdz4",
            "label": "A function bundled together with references to its surrounding lexical environment."
        },
        {
            "id": "tdz5",
            "label": "A method that closes browser windows."
        },
        {
            "id": "tdz6",
            "label": "A syntax error that occurs when forgetting a closing bracket."
        }
    ],
    "correctIndex": 0,
    "explanation": "A closure allows an inner function to remember and access variables from an enclosing outer function scope even after that outer function has returned."
},
    ...extraQuestionsLesson9
  ]
},
{
  "id": "item-js-arrays-fundamentals",
  "moduleId": "mod-js-fundamentals",
  "moduleTitle": "Fundamentals of JavaScript",
  "modulePosition": 2,
  "title": "10. Arrays",
  "duration": "35 mins",
  "type": "cheatsheet",
  "position": 10,
  "contentHeading": "Lesson 10: Arrays",
  "contentDescription": "Master sequential collections in JavaScript: array creation, zero-based indexing, mutation vs immutability, push/pop/shift/unshift, searching, slice vs splice, multidimensional matrices, and spread cloning.",
  "codeSnippet": {
    "language": "JavaScript",
    "code": "// 1. Creating and Updating Arrays\nconst fruits = [\"Apple\", \"Mango\", \"Orange\"];\nfruits[1] = \"Banana\"; // Mutation allowed with const\n\n// 2. Modifying Elements\nfruits.push(\"Grapes\"); // Add to end\nfruits.pop();          // Remove from end\n\n// 3. Searching and Slicing\nconsole.log(fruits.includes(\"Apple\")); // true\nconst portion = fruits.slice(0, 2);    // Non-mutating copy\n\n// 4. Spread Cloning\nconst clone = [...fruits]; // Shallow copy"
  },
  "sections": [
    {
      "title": "10.1 What is an Array?",
      "explanation": "An array is an ordered collection of values stored under one variable name. Instead of creating individual variables for every item, arrays store grouped data:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const products = [\"Laptop\", \"Phone\", \"Headphones\"];\nconsole.log(products);\n// Output: [\"Laptop\", \"Phone\", \"Headphones\"]"
      }
    },
    {
      "title": "10.2 Creating Arrays",
      "explanation": "Arrays can be initialized using array literal syntax (recommended) or the Array constructor:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Array literal (recommended)\nconst fruits = [\"Apple\", \"Mango\", \"Orange\"];\n\n// Empty array\nconst items = [];\n\n// Array constructor\nconst numbers = new Array(10, 20, 30);\nconsole.log(numbers); // Output: [10, 20, 30]"
      }
    },
    {
      "title": "10.3 Accessing Array Elements",
      "explanation": "Array indexes start at zero. Accessing an index that does not exist returns undefined:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const fruits = [\"Apple\", \"Mango\", \"Orange\"];\n\nconsole.log(fruits[0]); // Apple\nconsole.log(fruits[1]); // Mango\nconsole.log(fruits[2]); // Orange\nconsole.log(fruits[10]); // undefined"
      }
    },
    {
      "title": "10.4 Updating Array Elements",
      "explanation": "const prevents reassigning the variable to a different array, but the contents inside the array can be freely mutated:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const fruits = [\"Apple\", \"Mango\", \"Orange\"];\nfruits[1] = \"Banana\";\nconsole.log(fruits);\n// Output: [\"Apple\", \"Banana\", \"Orange\"]"
      }
    },
    {
      "title": "10.5 The length Property",
      "explanation": "Returns the number of elements in an array. The final element can be accessed using array[array.length - 1]:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const numbers = [10, 20, 30, 40];\nconsole.log(numbers.length); // Output: 4\nconsole.log(numbers[numbers.length - 1]); // Output: 40"
      }
    },
    {
      "title": "10.6 Adding and Removing Elements",
      "explanation": "Standard methods that modify the original array in place:",
      "table": {
        "headers": [
          "Method",
          "Purpose",
          "Example"
        ],
        "rows": [
          [
            "push()",
            "Adds elements to the end",
            "arr.push(4)"
          ],
          [
            "pop()",
            "Removes the last element",
            "arr.pop()"
          ],
          [
            "unshift()",
            "Adds elements to the beginning",
            "arr.unshift(0)"
          ],
          [
            "shift()",
            "Removes the first element",
            "arr.shift()"
          ]
        ]
      },
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const numbers = [10, 20];\nnumbers.push(30);   // [10, 20, 30]\nnumbers.pop();       // [10, 20]\nnumbers.unshift(5);  // [5, 10, 20]\nnumbers.shift();     // [10, 20]"
      }
    },
    {
      "title": "10.7 Searching Arrays (includes & indexOf)",
      "explanation": "Searching primitives by value and objects by reference:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const fruits = [\"Apple\", \"Mango\", \"Orange\"];\n\n// includes() returns boolean\nconsole.log(fruits.includes(\"Mango\"));  // true\nconsole.log(fruits.includes(\"Grapes\")); // false\n\n// indexOf() returns index or -1\nconsole.log(fruits.indexOf(\"Orange\"));  // 2\nconsole.log(fruits.indexOf(\"Grapes\"));  // -1"
      }
    },
    {
      "title": "10.8 The slice() Method (Non-Mutating)",
      "explanation": "Returns a shallow copy of a portion of an array without altering the original array. The start index is included, but the end index is excluded:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const numbers = [10, 20, 30, 40, 50];\nconst portion = numbers.slice(1, 4);\n\nconsole.log(portion); // Output: [20, 30, 40]\nconsole.log(numbers); // Output: [10, 20, 30, 40, 50] (Unchanged!)"
      }
    },
    {
      "title": "10.9 The splice() Method (Mutating)",
      "explanation": "Adds, removes, or replaces elements in place inside the original array. First argument is start index; second is delete count:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const fruits = [\"Apple\", \"Mango\", \"Orange\"];\nfruits.splice(1, 1); // Removes 1 item at index 1\nconsole.log(fruits); // Output: [\"Apple\", \"Orange\"]"
      }
    },
    {
      "title": "10.10 Looping Through Arrays",
      "explanation": "Using standard for loops (when indexes are needed) versus for...of loops (when only values are needed):",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const fruits = [\"Apple\", \"Mango\", \"Orange\"];\n\n// 1. Indexed for loop\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}\n\n// 2. for...of loop\nfor (const fruit of fruits) {\n  console.log(fruit);\n}"
      }
    },
    {
      "title": "10.11 Multidimensional Arrays (Matrices)",
      "explanation": "An array can contain other arrays, forming matrices and multi-level data tables:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const matrix = [\n  [1, 2],\n  [3, 4]\n];\n\nconsole.log(matrix[0][1]); // Output: 2\nconsole.log(matrix[1][0]); // Output: 3"
      }
    },
    {
      "title": "10.12 Copying Arrays (Reference vs Spread Clone)",
      "explanation": "Assigning an array variable copies the memory reference, not the array. Use spread syntax [...arr] to create an independent shallow copy:",
      "codeSnippet": {
        "language": "JavaScript",
        "code": "// Reference copy (both point to same memory!):\nconst first = [1, 2, 3];\nconst second = first;\nsecond.push(4);\nconsole.log(first); // [1, 2, 3, 4] (first also changed!)\n\n// Shallow copy using spread syntax:\nconst a = [1, 2, 3];\nconst b = [...a];\nb.push(4);\nconsole.log(a); // [1, 2, 3] (original protected!)\nconsole.log(b); // [1, 2, 3, 4]"
      }
    },
    {
      "title": "10.13 Practical Example: Shopping Cart & Best Practices",
      "explanation": "Iterating over collections of objects to calculate shopping totals:",
      "bullets": [
        "Always check array bounds and remember zero-based indexing.",
        "Use slice() when you need a subset without modifying the source data.",
        "Use splice() only when you intentionally want in-place deletion or insertion.",
        "Use array methods such as map(), filter(), and reduce() when appropriate (covered in Lesson 11).",
        "Avoid accidental shared reference bugs by cloning arrays using the spread operator [...arr]."
      ],
      "codeSnippet": {
        "language": "JavaScript",
        "code": "const cart = [\n  { name: \"Laptop\", price: 50000 },\n  { name: \"Mouse\", price: 1000 },\n  { name: \"Keyboard\", price: 2000 }\n];\n\nlet total = 0;\nfor (const product of cart) {\n  total += product.price;\n}\nconsole.log(\"Cart total:\", total); // Output: Cart total: 53000"
      }
    }
  ]
  ,
  "questions": [
    {
    "id": "q-arr-1",
    "prompt": "What is the primary difference between array.slice() and array.splice()?",
    "options": [
        {
            "id": "ar1",
            "label": "slice() returns a new array without modifying the original; splice() modifies the original array in place."
        },
        {
            "id": "ar2",
            "label": "slice() can only remove items; splice() can only add items."
        },
        {
            "id": "ar3",
            "label": "splice() only works on numbers."
        }
    ],
    "correctIndex": 0,
    "explanation": "slice() is non-destructive (pure) and returns a slice of the array. splice() mutates the original array in place."
},
    {
    "id": "q-arr-2",
    "prompt": "If const b = a; where a is an array, what happens when you run b.push(99)?",
    "options": [
        {
            "id": "ar4",
            "label": "Both a and b contain 99 because b holds a reference to the same array as a."
        },
        {
            "id": "ar5",
            "label": "Only b contains 99 because arrays are copied automatically."
        },
        {
            "id": "ar6",
            "label": "JavaScript throws a TypeError."
        }
    ],
    "correctIndex": 0,
    "explanation": "Assignment copies the object reference, not the underlying array. To create an independent copy, use spread syntax: [...a]."
},
    ...extraQuestionsLesson10
  ]
}
];
