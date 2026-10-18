import { PracticeQuestion } from "../curriculumTypes";

export const extraQuestionsLesson1: PracticeQuestion[] = [
  {
    id: "q-js-intro-3",
    prompt: "Which of the following describes the execution model of modern JavaScript engines like Google V8?",
    options: [
      { id: "e1", label: "Pure interpretation line-by-line without any optimization." },
      { id: "e2", label: "Just-In-Time (JIT) compilation, compiling source code to machine code at runtime." },
      { id: "e3", label: "Ahead-of-Time (AOT) static compilation directly into a native binary executable." },
      { id: "e4", label: "Bytecode translation executed inside an isolated Java Virtual Machine." }
    ],
    correctIndex: 1,
    explanation: "Modern JavaScript engines use Just-In-Time (JIT) compilation to monitor code execution and compile frequently executed code paths into optimized machine code dynamically."
  },
  {
    id: "q-js-intro-4",
    prompt: "What is the primary difference between the 'defer' and 'async' attributes when loading external scripts?",
    options: [
      { id: "e5", label: "'defer' executes scripts in document order after HTML parsing; 'async' executes as soon as downloaded, potentially out of order." },
      { id: "e6", label: "'defer' blocks the HTML parser while downloading, whereas 'async' does not." },
      { id: "e7", label: "'async' guarantees execution in strict document order, whereas 'defer' does not." },
      { id: "e8", label: "'defer' is only supported in Internet Explorer." }
    ],
    correctIndex: 0,
    explanation: "Both download in parallel, but 'defer' preserves execution order and waits until the DOM is parsed, whereas 'async' executes immediately upon download, which may disrupt script order."
  },
  {
    id: "q-js-intro-5",
    prompt: "Which console method is specifically used to display structured tabular data in browser DevTools?",
    options: [
      { id: "e9", label: "console.dir()" },
      { id: "e10", label: "console.table()" },
      { id: "e11", label: "console.matrix()" },
      { id: "e12", label: "console.grid()" }
    ],
    correctIndex: 1,
    explanation: "console.table() formats arrays of objects or 2D arrays into a readable interactive table in browser DevTools."
  },
  {
    id: "q-js-intro-6",
    prompt: "Why is 'alert()' generally avoided in modern professional frontend applications?",
    options: [
      { id: "e13", label: "It blocks the browser thread and freezes user interaction until dismissed." },
      { id: "e14", label: "It cannot display string values." },
      { id: "e15", label: "It requires Node.js runtime installed on the client machine." },
      { id: "e16", label: "It permanently closes the browser tab." }
    ],
    correctIndex: 0,
    explanation: "window.alert() is synchronous and modal: it blocks JavaScript execution and halts the UI event loop until the user clicks OK."
  },
  {
    id: "q-js-intro-7",
    prompt: "What does the JavaScript runtime Node.js allow developers to do?",
    options: [
      { id: "e17", label: "Execute JavaScript on servers and computers outside of a web browser." },
      { id: "e18", label: "Only compile CSS stylesheets." },
      { id: "e19", label: "Replace HTML rendering engines inside Google Chrome." },
      { id: "e20", label: "Convert JavaScript directly into Python scripts." }
    ],
    correctIndex: 0,
    explanation: "Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine that enables server-side and command-line JavaScript development."
  },
  {
    id: "q-js-intro-8",
    prompt: "Which of the following is a valid multi-line comment in JavaScript?",
    options: [
      { id: "e21", label: "<!-- This is a comment -->" },
      { id: "e22", label: "/* This is a comment */" },
      { id: "e23", label: "# This is a comment" },
      { id: "e24", label: "// This is a comment //" }
    ],
    correctIndex: 1,
    explanation: "JavaScript supports single-line comments with '//' and multi-line block comments enclosed between '/*' and '*/'."
  },
  {
    id: "q-js-intro-9",
    prompt: "What happens when you execute JavaScript in 'strict mode' using 'use strict'?",
    options: [
      { id: "e25", label: "It catches silent coding mistakes, prevents accidental global variables, and prohibits certain unsafe syntax." },
      { id: "e26", label: "It slows down performance by 50%." },
      { id: "e27", label: "It converts all variables into const automatically." },
      { id: "e28", label: "It turns off all console.log output." }
    ],
    correctIndex: 0,
    explanation: "'use strict' enforces stricter parsing and error handling, throwing errors for undeclared variable assignments, duplicate parameter names, and reserved keywords."
  },
  {
    id: "q-js-intro-10",
    prompt: "Where should you look in Google Chrome or Firefox to inspect runtime JavaScript errors and warnings?",
    options: [
      { id: "e29", label: "Application Cache" },
      { id: "e30", label: "Browser Console Tab in Developer Tools" },
      { id: "e31", label: "HTML Elements Tree Inspector" },
      { id: "e32", label: "Bookmarks Manager" }
    ],
    correctIndex: 1,
    explanation: "The Console tab in browser Developer Tools displays logs, warnings, uncaught exceptions, and provides an interactive REPL to evaluate JavaScript expressions."
  }
];

export const extraQuestionsLesson2: PracticeQuestion[] = [
  {
    id: "q-js-var-3",
    prompt: "What happens if you declare a variable using 'let' inside a block (e.g. inside an 'if' statement) and try to access it outside?",
    options: [
      { id: "v3a", label: "It throws a ReferenceError because 'let' is block-scoped." },
      { id: "v3b", label: "It prints 'undefined'." },
      { id: "v3c", label: "It prints 'null'." },
      { id: "v3d", label: "It accesses the variable normally." }
    ],
    correctIndex: 0,
    explanation: "Variables declared with 'let' and 'const' are scoped strictly to the enclosing pair of curly braces {}. Outside the block, they do not exist in scope."
  },
  {
    id: "q-js-var-4",
    prompt: "Can you reassign a variable declared with 'const'?",
    options: [
      { id: "v4a", label: "Yes, you can reassign it any number of times." },
      { id: "v4b", label: "No, reassigning a 'const' identifier throws a TypeError." },
      { id: "v4c", label: "Only if you reassign it to the same data type." },
      { id: "v4d", label: "Only inside an asynchronous function." }
    ],
    correctIndex: 1,
    explanation: "'const' creates an immutable identifier binding. Attempting to assign a new value to it triggers 'TypeError: Assignment to constant variable'."
  },
  {
    id: "q-js-var-5",
    prompt: "If you declare 'const user = { name: \"Hari\" };', which of the following operations is allowed?",
    options: [
      { id: "v5a", label: "user.name = \"Ravi\"; (modifying an object property)" },
      { id: "v5b", label: "user = { name: \"Ravi\" }; (reassigning the object reference)" },
      { id: "v5c", label: "user = null;" },
      { id: "v5d", label: "Neither property modification nor reassignment is allowed." }
    ],
    correctIndex: 0,
    explanation: "'const' prevents reassigning the variable reference itself, but the object itself remains mutable, so its properties can be modified or added."
  },
  {
    id: "q-js-var-6",
    prompt: "What is the Temporal Dead Zone (TDZ)?",
    options: [
      { id: "v6a", label: "The time required for an API fetch request to complete." },
      { id: "v6b", label: "The period between entering scope and the line where a 'let' or 'const' variable is declared, during which accessing it throws a ReferenceError." },
      { id: "v6c", label: "The memory cleanup interval executed by the browser garbage collector." },
      { id: "v6d", label: "A deprecated feature in older versions of ECMAScript 3." }
    ],
    correctIndex: 1,
    explanation: "In the TDZ, 'let' and 'const' variables exist in scope due to hoisting, but are uninitialized. Accessing them before their declaration line throws a ReferenceError."
  },
  {
    id: "q-js-var-7",
    prompt: "What happens when you declare a variable with 'var' inside a standard 'for' loop?",
    options: [
      { id: "v7a", label: "It is scoped to the loop block and inaccessible outside." },
      { id: "v7b", label: "It is function-scoped (or global if outside a function) and leaks outside the loop." },
      { id: "v7c", label: "It throws a SyntaxError." },
      { id: "v7d", label: "It creates a new binding for every iteration." }
    ],
    correctIndex: 1,
    explanation: "'var' does not respect block boundaries: it is scoped to the enclosing function, which causes the loop index to leak into the outer scope."
  },
  {
    id: "q-js-var-8",
    prompt: "Which of the following identifier names is INVALID in JavaScript?",
    options: [
      { id: "v8a", label: "$totalAmount" },
      { id: "v8b", label: "_isAuthorized" },
      { id: "v8c", label: "2ndPlayer" },
      { id: "v8d", label: "firstName" }
    ],
    correctIndex: 2,
    explanation: "JavaScript identifiers cannot start with a digit. They must begin with a letter, underscore (_), or dollar sign ($)."
  },
  {
    id: "q-js-var-9",
    prompt: "What is the result of declaring the same variable name twice with 'let' in the same scope?",
    options: [
      { id: "v9a", label: "The second declaration silently overwrites the first." },
      { id: "v9b", label: "A SyntaxError: Identifier has already been declared is thrown." },
      { id: "v9c", label: "The variable becomes undefined." },
      { id: "v9d", label: "It converts into an array of values." }
    ],
    correctIndex: 1,
    explanation: "'let' and 'const' prohibit redeclaring an identifier in the same scope, preventing accidental shadowing and variable collisions."
  },
  {
    id: "q-js-var-10",
    prompt: "Why should global variables created with 'var' be avoided in client-side JavaScript?",
    options: [
      { id: "v10a", label: "They become properties on the global 'window' object, creating collisions and security risks." },
      { id: "v10b", label: "They crash the browser immediately." },
      { id: "v10c", label: "They cannot be read inside functions." },
      { id: "v10d", label: "They disable CSS transitions." }
    ],
    correctIndex: 0,
    explanation: "Top-level 'var' declarations attach to the global 'window' object in browsers, polluting the namespace and leading to unpredictable naming conflicts."
  }
];

export const extraQuestionsLesson3: PracticeQuestion[] = [
  {
    id: "q-js-dt-3",
    prompt: "What does 'typeof null' return in JavaScript, and why?",
    options: [
      { id: "dt3a", label: "'null', because it is a distinct primitive." },
      { id: "dt3b", label: "'object', due to a legacy bug in the original 1995 JavaScript implementation." },
      { id: "dt3c", label: "'undefined', because null represents absence of value." },
      { id: "dt3d", label: "'boolean', representing false." }
    ],
    correctIndex: 1,
    explanation: "In JavaScript's first implementation, values were stored with type tags. The tag for objects was 000, and null was represented as a NULL pointer (all zeroes), causing typeof null to return 'object'."
  },
  {
    id: "q-js-dt-4",
    prompt: "How many primitive data types exist in modern ECMAScript?",
    options: [
      { id: "dt4a", label: "5" },
      { id: "dt4b", label: "6" },
      { id: "dt4c", label: "7: string, number, boolean, undefined, null, bigint, symbol" },
      { id: "dt4d", label: "8: including object" }
    ],
    correctIndex: 2,
    explanation: "JavaScript has 7 primitive data types: string, number, boolean, undefined, null, bigint, and symbol. Objects (including arrays and functions) are non-primitive."
  },
  {
    id: "q-js-dt-5",
    prompt: "What is the difference between 'undefined' and 'null'?",
    options: [
      { id: "dt5a", label: "'undefined' means a variable has been declared but not assigned a value; 'null' is an intentional assignment representing no value." },
      { id: "dt5b", label: "'undefined' is an object; 'null' is a number." },
      { id: "dt5c", label: "There is no difference; they are completely identical." },
      { id: "dt5d", label: "'null' is automatically assigned by the browser when memory is low." }
    ],
    correctIndex: 0,
    explanation: "'undefined' is the default value of uninitialized variables and missing arguments. 'null' is intentionally assigned by developers to represent an empty or non-existent value."
  },
  {
    id: "q-js-dt-6",
    prompt: "What is 'NaN' in JavaScript and what is its 'typeof'?",
    options: [
      { id: "dt6a", label: "Not-a-Number, and typeof NaN is 'number'." },
      { id: "dt6b", label: "Null-and-Nothing, and typeof is 'undefined'." },
      { id: "dt6c", label: "Not-a-Name, and typeof is 'string'." },
      { id: "dt6d", label: "An error object with typeof 'error'." }
    ],
    correctIndex: 0,
    explanation: "NaN stands for 'Not a Number', but according to the IEEE 754 floating-point standard, it represents an invalid numeric result, so typeof NaN is 'number'."
  },
  {
    id: "q-js-dt-7",
    prompt: "What happens when you assign a primitive value to a new variable (e.g. let b = a)?",
    options: [
      { id: "dt7a", label: "Both variables reference the same memory slot." },
      { id: "dt7b", label: "A copy of the actual value is created independently in memory (pass-by-value)." },
      { id: "dt7c", label: "The original variable 'a' is deleted." },
      { id: "dt7d", label: "It throws a TypeError." }
    ],
    correctIndex: 1,
    explanation: "Primitives are stored and copied by value. Changing the new variable 'b' has zero effect on the original variable 'a'."
  },
  {
    id: "q-js-dt-8",
    prompt: "What is the primary purpose of the 'BigInt' data type introduced in ES2020?",
    options: [
      { id: "dt8a", label: "To format currency symbols." },
      { id: "dt8b", label: "To represent integers beyond Number.MAX_SAFE_INTEGER (2^53 - 1) with arbitrary precision." },
      { id: "dt8c", label: "To compress strings in memory." },
      { id: "dt8d", label: "To convert numbers to hexadecimal notation." }
    ],
    correctIndex: 1,
    explanation: "JavaScript's standard Number type loses precision above 9,007,199,254,740,991. BigInt allows integers of arbitrary size, denoted by adding an 'n' suffix (e.g. 100n)."
  },
  {
    id: "q-js-dt-9",
    prompt: "Why are Symbols unique in JavaScript?",
    options: [
      { id: "dt9a", label: "Every Symbol() call produces a distinct, guaranteed-unique primitive value, ideal for collision-free object property keys." },
      { id: "dt9b", label: "They can only be used once in a browser session." },
      { id: "dt9c", label: "They cannot be converted into strings." },
      { id: "dt9d", label: "They are encrypted with SHA-256." }
    ],
    correctIndex: 0,
    explanation: "Symbol('desc') creates a unique identifier even if another symbol is created with the same description: Symbol('id') !== Symbol('id')."
  },
  {
    id: "q-js-dt-10",
    prompt: "How can you reliably test if a value is an Array in JavaScript?",
    options: [
      { id: "dt10a", label: "typeof value === 'array'" },
      { id: "dt10b", label: "Array.isArray(value)" },
      { id: "dt10c", label: "value.type === 'list'" },
      { id: "dt10d", label: "value instanceof String" }
    ],
    correctIndex: 1,
    explanation: "Because typeof [] evaluates to 'object', Array.isArray(value) is the standard and reliable method to verify if a variable is an array."
  }
];

export const extraQuestionsLesson4: PracticeQuestion[] = [
  {
    id: "q-js-op-3",
    prompt: "What is the difference between prefix (++x) and postfix (x++) increment?",
    options: [
      { id: "op3a", label: "++x increments the value and returns the new value; x++ returns the current value first, then increments." },
      { id: "op3b", label: "x++ increments by 2; ++x increments by 1." },
      { id: "op3c", label: "++x only works on negative numbers." },
      { id: "op3d", label: "They are 100% identical in all expressions." }
    ],
    correctIndex: 0,
    explanation: "Prefix ++x updates before the expression evaluates. Postfix x++ evaluates with the old value, then increments the variable afterward."
  },
  {
    id: "q-js-op-4",
    prompt: "What will '10 % 3' evaluate to in JavaScript?",
    options: [
      { id: "op4a", label: "3" },
      { id: "op4b", label: "1" },
      { id: "op4c", label: "0" },
      { id: "op4d", label: "0.333" }
    ],
    correctIndex: 1,
    explanation: "The remainder (modulo) operator % divides 10 by 3 (which is 3 with a remainder of 1) and returns 1."
  },
  {
    id: "q-js-op-5",
    prompt: "What does short-circuit evaluation mean for the logical AND (&&) operator?",
    options: [
      { id: "op5a", label: "If the first operand is falsy, it immediately returns that operand without evaluating the second." },
      { id: "op5b", label: "It always evaluates both operands regardless of their values." },
      { id: "op5c", label: "It throws an error if either operand is boolean." },
      { id: "op5d", label: "It converts both sides to numbers." }
    ],
    correctIndex: 0,
    explanation: "In expr1 && expr2, if expr1 is falsy, JavaScript short-circuits and returns expr1 without running expr2."
  },
  {
    id: "q-js-op-6",
    prompt: "What will the expression 'false || \"fallback\"' return?",
    options: [
      { id: "op6a", label: "false" },
      { id: "op6b", label: "\"fallback\"" },
      { id: "op6c", label: "true" },
      { id: "op6d", label: "undefined" }
    ],
    correctIndex: 1,
    explanation: "The logical OR (||) operator returns the first truthy value it encounters. Since false is falsy, it returns 'fallback'."
  },
  {
    id: "q-js-op-7",
    prompt: "What is the nullish coalescing operator (??) and how does it differ from logical OR (||)?",
    options: [
      { id: "op7a", label: "?? only falls back when the left operand is null or undefined, preserving 0, false, and \"\"." },
      { id: "op7b", label: "?? falls back on all falsy values including 0 and false." },
      { id: "op7c", label: "?? converts strings to numbers automatically." },
      { id: "op7d", label: "?? is identical to the ternary operator." }
    ],
    correctIndex: 0,
    explanation: "Unlike || which treats 0, false, and \"\" as falsy, ?? only falls back if the left-hand value is strictly null or undefined."
  },
  {
    id: "q-js-op-8",
    prompt: "What is the result of '2 + 3 * 4' in JavaScript according to operator precedence?",
    options: [
      { id: "op8a", label: "20" },
      { id: "op8b", label: "14" },
      { id: "op8c", label: "24" },
      { id: "op8d", label: "10" }
    ],
    correctIndex: 1,
    explanation: "Multiplication (*) has higher precedence than addition (+), so 3 * 4 is calculated first (12), plus 2 equals 14."
  },
  {
    id: "q-js-op-9",
    prompt: "What is the purpose of the conditional (ternary) operator 'condition ? exprIfTrue : exprIfFalse'?",
    options: [
      { id: "op9a", label: "To provide a concise one-line expression that returns one of two values based on a condition." },
      { id: "op9b", label: "To define asynchronous generators." },
      { id: "op9c", label: "To loop through array elements." },
      { id: "op9d", label: "To throw exceptions conditionally." }
    ],
    correctIndex: 0,
    explanation: "The ternary operator is JavaScript's only operator taking three operands, acting as a clean expression-based alternative to simple if-else blocks."
  },
  {
    id: "q-js-op-10",
    prompt: "What will '\"10\" - 5' and '\"10\" + 5' evaluate to respectively?",
    options: [
      { id: "op10a", label: "5 and 15" },
      { id: "op10b", label: "5 and \"105\"" },
      { id: "op10c", label: "NaN and \"105\"" },
      { id: "op10d", label: "\"5\" and 15" }
    ],
    correctIndex: 1,
    explanation: "The '-' operator only performs numeric subtraction, coercing '10' to 10 - 5 = 5. The '+' operator prefers string concatenation when one operand is a string, producing '105'."
  }
];

export const extraQuestionsLesson5: PracticeQuestion[] = [
  {
    id: "q-js-tc-3",
    prompt: "Which of the following values is TRUTHY in JavaScript?",
    options: [
      { id: "tc3a", label: "0" },
      { id: "tc3b", label: "\"\" (empty string)" },
      { id: "tc3c", label: "[] (empty array)" },
      { id: "tc3d", label: "null" }
    ],
    correctIndex: 2,
    explanation: "All objects (including empty arrays [] and empty objects {}) are truthy in JavaScript. 0, \"\", null, undefined, NaN, and false are the 6 falsy values."
  },
  {
    id: "q-js-tc-4",
    prompt: "What does 'Number.isNaN(value)' do compared to the global 'isNaN(value)' function?",
    options: [
      { id: "tc4a", label: "Number.isNaN strictly checks if the value is of type number and is NaN, without coercive conversion." },
      { id: "tc4b", label: "Global isNaN is more modern and safer." },
      { id: "tc4c", label: "There is no difference." },
      { id: "tc4d", label: "Number.isNaN converts strings to numbers first." }
    ],
    correctIndex: 0,
    explanation: "Global isNaN('hello') coerces 'hello' to NaN and returns true (confusing!). Number.isNaN('hello') returns false because 'hello' is not of type number."
  },
  {
    id: "q-js-tc-5",
    prompt: "What does 'parseInt(\"100px\", 10)' return?",
    options: [
      { id: "tc5a", label: "NaN" },
      { id: "tc5b", label: "100" },
      { id: "tc5c", label: "\"100\"" },
      { id: "tc5d", label: "TypeError" }
    ],
    correctIndex: 1,
    explanation: "parseInt parses from the start of the string, extracts consecutive valid digits, and stops when encountering a non-numeric character ('p'), returning 100."
  },
  {
    id: "q-js-tc-6",
    prompt: "Why should you always specify the radix (e.g. 10) in parseInt(string, radix)?",
    options: [
      { id: "tc6a", label: "To ensure predictable base-10 decimal parsing and avoid unintended octal or hexadecimal interpretation." },
      { id: "tc6b", label: "To format the output into a floating point number." },
      { id: "tc6c", label: "Because parseInt throws an error without it in strict mode." },
      { id: "tc6d", label: "To round up to the nearest ten." }
    ],
    correctIndex: 0,
    explanation: "Specifying radix 10 guarantees standard decimal interpretation regardless of leading zeros or historical browser quirks."
  },
  {
    id: "q-js-tc-7",
    prompt: "What does the unary plus operator (+value) do when applied to a string like +\"42\"?",
    options: [
      { id: "tc7a", label: "Concatenates a '+' sign." },
      { id: "tc7b", label: "Converts the string into a numeric value (equivalent to Number(\"42\"))." },
      { id: "tc7c", label: "Increments the number by 1." },
      { id: "tc7d", label: "Throws a SyntaxError." }
    ],
    correctIndex: 1,
    explanation: "The unary plus operator is the fastest and most concise way to convert a string or boolean representation into a Number."
  },
  {
    id: "q-js-tc-8",
    prompt: "What will 'Boolean(\"false\")' return?",
    options: [
      { id: "tc8a", label: "false" },
      { id: "tc8b", label: "true" },
      { id: "tc8c", label: "undefined" },
      { id: "tc8d", label: "NaN" }
    ],
    correctIndex: 1,
    explanation: "Any non-empty string is truthy in JavaScript. Because \"false\" is a string containing 5 characters, Boolean(\"false\") evaluates to true."
  },
  {
    id: "q-js-tc-9",
    prompt: "What is the result of 'null == undefined' and 'null === undefined'?",
    options: [
      { id: "tc9a", label: "true and false" },
      { id: "tc9b", label: "true and true" },
      { id: "tc9c", label: "false and false" },
      { id: "tc9d", label: "false and true" }
    ],
    correctIndex: 0,
    explanation: "Under loose equality (==), null and undefined equal each other. Under strict equality (===), their types differ ('object' vs 'undefined'), so it evaluates to false."
  },
  {
    id: "q-js-tc-10",
    prompt: "What does 'parseFloat(\"3.14159text\")' return?",
    options: [
      { id: "tc10a", label: "3" },
      { id: "tc10b", label: "3.14159" },
      { id: "tc10c", label: "NaN" },
      { id: "tc10d", label: "TypeError" }
    ],
    correctIndex: 1,
    explanation: "parseFloat extracts a floating-point number from the beginning of the string until it encounters an invalid character."
  }
];

export const extraQuestionsLesson6: PracticeQuestion[] = [
  {
    id: "q-js-cond-3",
    prompt: "What happens in a 'switch' statement if you omit the 'break' keyword in a matched case?",
    options: [
      { id: "c3a", label: "The browser throws a SyntaxError." },
      { id: "c3b", label: "Execution falls through and continues into subsequent case blocks regardless of their conditions." },
      { id: "c3c", label: "The switch statement terminates immediately." },
      { id: "c3d", label: "The switch block restarts from the beginning." }
    ],
    correctIndex: 1,
    explanation: "Without a break statement, JavaScript execution falls through to the next case clause, running its code even if its condition does not match."
  },
  {
    id: "q-js-cond-4",
    prompt: "Which equality comparison does a 'switch' statement use to compare its expression against case values?",
    options: [
      { id: "c4a", label: "Loose equality (==)" },
      { id: "c4b", label: "Strict equality (===)" },
      { id: "c4c", label: "Object.is() only" },
      { id: "c4d", label: "String coercion" }
    ],
    correctIndex: 1,
    explanation: "switch statements evaluate case matches using strict equality (===). Therefore, a case '5' will NOT match the number 5."
  },
  {
    id: "q-js-cond-5",
    prompt: "What is an 'else if' ladder primarily used for?",
    options: [
      { id: "c5a", label: "To check multiple sequential conditions in order until one evaluates to true." },
      { id: "c5b", label: "To repeat a block of code 10 times." },
      { id: "c5c", label: "To declare global functions." },
      { id: "c5d", label: "To pause thread execution." }
    ],
    correctIndex: 0,
    explanation: "An else if ladder tests multiple distinct conditions sequentially. As soon as one matches, its block runs and the remaining ladder is skipped."
  },
  {
    id: "q-js-cond-6",
    prompt: "How can you rewrite 'if (isLoggedIn) { showDashboard(); }' concisely using logical short-circuiting?",
    options: [
      { id: "c6a", label: "isLoggedIn || showDashboard();" },
      { id: "c6b", label: "isLoggedIn && showDashboard();" },
      { id: "c6c", label: "isLoggedIn ?? showDashboard();" },
      { id: "c6d", label: "isLoggedIn ?: showDashboard();" }
    ],
    correctIndex: 1,
    explanation: "The logical AND guard (isLoggedIn && showDashboard()) executes showDashboard() only if isLoggedIn evaluates to truthy."
  },
  {
    id: "q-js-cond-7",
    prompt: "What is the 'default' clause in a switch statement?",
    options: [
      { id: "c7a", label: "A clause that runs only when none of the case values match the switch expression." },
      { id: "c7b", label: "The clause that always runs first." },
      { id: "c7c", label: "A mandatory clause required for the code to compile." },
      { id: "c7d", label: "A clause that sets the variable back to undefined." }
    ],
    correctIndex: 0,
    explanation: "The default clause serves as a catch-all fallback that executes when none of the specified case values match the test expression."
  },
  {
    id: "q-js-cond-8",
    prompt: "Can ternary operators be nested, and what is the best practice regarding nested ternaries?",
    options: [
      { id: "c8a", label: "Yes they can, but deeply nesting them harms readability and is generally discouraged in favor of if-else or switch." },
      { id: "c8b", label: "No, JavaScript forbids more than one ternary operator in a file." },
      { id: "c8c", label: "Yes, nesting them improves performance by 10x." },
      { id: "c8d", label: "They can only be nested inside while loops." }
    ],
    correctIndex: 0,
    explanation: "Nested ternaries (a ? b : c ? d : e) are syntactically valid, but can quickly become unreadable and error-prone. Plain if-else or switch statements are preferred for complex logic."
  },
  {
    id: "q-js-cond-9",
    prompt: "What will the condition 'if (\"0\")' evaluate to?",
    options: [
      { id: "c9a", label: "Falsy, because 0 is zero." },
      { id: "c9b", label: "Truthy, because any non-empty string is truthy." },
      { id: "c9c", label: "It throws a TypeError." },
      { id: "c9d", label: "undefined" }
    ],
    correctIndex: 1,
    explanation: "The string \"0\" has length 1. In JavaScript, only the empty string \"\" is falsy; all other strings are truthy."
  },
  {
    id: "q-js-cond-10",
    prompt: "What is a guard clause in function design?",
    options: [
      { id: "c10a", label: "An early conditional return at the beginning of a function that halts execution if arguments or state are invalid." },
      { id: "c10b", label: "A CSS property preventing button clicks." },
      { id: "c10c", label: "An encryption algorithm for function parameters." },
      { id: "c10d", label: "A loop counter that guards against memory leaks." }
    ],
    correctIndex: 0,
    explanation: "Guard clauses check for invalid conditions upfront and return early, flattening code and avoiding deeply nested if statements."
  }
];

export const extraQuestionsLesson7: PracticeQuestion[] = [
  {
    id: "q-js-loop-3",
    prompt: "What is the key difference between a 'while' loop and a 'do...while' loop?",
    options: [
      { id: "l3a", label: "A while loop tests the condition before running; a do...while loop tests after, guaranteeing it runs at least once." },
      { id: "l3b", label: "A do...while loop only iterates through arrays." },
      { id: "l3c", label: "A while loop is asynchronous." },
      { id: "l3d", label: "There is no functional difference." }
    ],
    correctIndex: 0,
    explanation: "In a do...while loop, the code block executes first, and then the condition is evaluated. This guarantees at least one execution."
  },
  {
    id: "q-js-loop-4",
    prompt: "Which loop is designed specifically for iterating over the VALUES of an iterable collection (like an Array, Set, or Map)?",
    options: [
      { id: "l4a", label: "for...in" },
      { id: "l4b", label: "for...of" },
      { id: "l4c", label: "for...with" },
      { id: "l4d", label: "switch" }
    ],
    correctIndex: 1,
    explanation: "'for...of' iterates directly over the values of iterable objects (Arrays, Strings, Maps, Sets). 'for...in' iterates over enumerable property keys."
  },
  {
    id: "q-js-loop-5",
    prompt: "What does 'for...in' iterate over when used on an object?",
    options: [
      { id: "l5a", label: "The object's enumerable property names (keys) as strings." },
      { id: "l5b", label: "The object's values directly." },
      { id: "l5c", label: "Only methods." },
      { id: "l5d", label: "The prototype chain length." }
    ],
    correctIndex: 0,
    explanation: "'for (const key in object)' iterates over all enumerable property keys of the object (including inherited enumerable prototype properties)."
  },
  {
    id: "q-js-loop-6",
    prompt: "What is the difference between the 'break' and 'continue' statements inside a loop?",
    options: [
      { id: "l6a", label: "'break' terminates the entire loop immediately; 'continue' skips the rest of the current iteration and moves to the next." },
      { id: "l6b", label: "'continue' exits the loop; 'break' pauses the loop for 1 second." },
      { id: "l6c", label: "'break' only works in switch statements, not loops." },
      { id: "l6d", label: "'continue' restarts the loop from index 0." }
    ],
    correctIndex: 0,
    explanation: "'break' halts the loop completely and jumps execution past the loop block. 'continue' skips remaining lines in the current pass and begins the next iteration."
  },
  {
    id: "q-js-loop-7",
    prompt: "What causes an 'infinite loop' in JavaScript?",
    options: [
      { id: "l7a", label: "A loop whose termination condition is never reached or always remains true." },
      { id: "l7b", label: "Using a const variable in a function." },
      { id: "l7c", label: "Iterating through an array with more than 100 items." },
      { id: "l7d", label: "Calling console.log inside a loop." }
    ],
    correctIndex: 0,
    explanation: "If a loop's condition never becomes false (e.g., forgetting to increment the counter `i++`), the loop runs indefinitely, freezing the thread."
  },
  {
    id: "q-js-loop-8",
    prompt: "How many times will 'for (let i = 0; i < 5; i++)' execute?",
    options: [
      { id: "l8a", label: "4 times" },
      { id: "l8b", label: "5 times (indices 0, 1, 2, 3, 4)" },
      { id: "l8c", label: "6 times" },
      { id: "l8d", label: "Infinite times" }
    ],
    correctIndex: 1,
    explanation: "The loop starts at i = 0 and continues while i < 5. The values of i will be 0, 1, 2, 3, 4 — which is exactly 5 iterations."
  },
  {
    id: "q-js-loop-9",
    prompt: "Why is using 'for...in' over an Array generally discouraged compared to 'for...of' or '.forEach()'?",
    options: [
      { id: "l9a", label: "'for...in' iterates over property keys (strings), includes custom prototype properties, and does not guarantee numeric index order." },
      { id: "l9b", label: "Arrays cannot be used with for...in." },
      { id: "l9c", label: "It throws a TypeError on arrays." },
      { id: "l9d", label: "It deletes array elements." }
    ],
    correctIndex: 0,
    explanation: "'for...in' inspects keys as strings (\"0\", \"1\") and walks the prototype chain. 'for...of' or regular for loops are designed specifically for indexed array values."
  },
  {
    id: "q-js-loop-10",
    prompt: "What will happen in this code: 'for (let i = 0; i < 3; i++) { if (i === 1) continue; console.log(i); }'?",
    options: [
      { id: "l10a", label: "It outputs 0, 1, 2" },
      { id: "l10b", label: "It outputs 0, 2" },
      { id: "l10c", label: "It outputs 1" },
      { id: "l10d", label: "It outputs nothing" }
    ],
    correctIndex: 1,
    explanation: "When i === 1, the continue statement skips console.log(i). Therefore, only 0 and 2 are logged."
  }
];

export const extraQuestionsLesson8: PracticeQuestion[] = [
  {
    id: "q-js-fn-3",
    prompt: "What is an arrow function's syntax for an implicit return of a single expression?",
    options: [
      { id: "fn3a", label: "const double = x => { x * 2 };" },
      { id: "fn3b", label: "const double = x => x * 2;" },
      { id: "fn3c", label: "const double = x => return x * 2;" },
      { id: "fn3d", label: "const double = (x) -> x * 2;" }
    ],
    correctIndex: 1,
    explanation: "Without curly braces, arrow functions evaluate the expression and return it implicitly. If curly braces are used, an explicit 'return' keyword is required."
  },
  {
    id: "q-js-fn-4",
    prompt: "How does an arrow function handle the 'this' keyword compared to a traditional function declaration?",
    options: [
      { id: "fn4a", label: "Arrow functions do not have their own 'this'; they lexically capture 'this' from their enclosing scope." },
      { id: "fn4b", label: "Arrow functions bind 'this' to the global window object always." },
      { id: "fn4c", label: "Arrow functions bind 'this' to the calling HTML button element." },
      { id: "fn4d", label: "There is no difference in how 'this' is resolved." }
    ],
    correctIndex: 0,
    explanation: "Traditional functions bind 'this' based on how they are called. Arrow functions inherit 'this' from the enclosing lexical execution context."
  },
  {
    id: "q-js-fn-5",
    prompt: "What will a function return if it executes to completion without reaching an explicit 'return' statement?",
    options: [
      { id: "fn5a", label: "null" },
      { id: "fn5b", label: "0" },
      { id: "fn5c", label: "undefined" },
      { id: "fn5d", label: "false" }
    ],
    correctIndex: 2,
    explanation: "In JavaScript, any function that does not explicitly return a value automatically evaluates to undefined upon completion."
  },
  {
    id: "q-js-fn-6",
    prompt: "What is the difference between a function parameter and a function argument?",
    options: [
      { id: "fn6a", label: "Parameters are placeholders defined in the function definition; arguments are the real values passed during invocation." },
      { id: "fn6b", label: "Arguments are defined in the signature; parameters are passed at call time." },
      { id: "fn6c", label: "Parameters must be numbers; arguments must be strings." },
      { id: "fn6d", label: "They are completely interchangeable terms with no technical distinction." }
    ],
    correctIndex: 0,
    explanation: "In 'function add(a, b)', 'a' and 'b' are parameters. In 'add(10, 20)', 10 and 20 are arguments."
  },
  {
    id: "q-js-fn-7",
    prompt: "What happens when you pass fewer arguments than declared parameters to a function without default parameters?",
    options: [
      { id: "fn7a", label: "JavaScript throws an ArgumentCountError." },
      { id: "fn7b", label: "The unsupplied parameters take the value 'undefined'." },
      { id: "fn7c", label: "The function refuses to execute." },
      { id: "fn7d", label: "The parameters default to 0." }
    ],
    correctIndex: 1,
    explanation: "JavaScript is dynamically typed and flexible with argument counts: missing parameters are assigned undefined."
  },
  {
    id: "q-js-fn-8",
    prompt: "What is a 'Higher-Order Function' (HOH)?",
    options: [
      { id: "fn8a", label: "A function that accepts another function as an argument, returns a function, or both." },
      { id: "fn8b", label: "A function with more than 10 parameters." },
      { id: "fn8c", label: "A function that runs faster than 60 frames per second." },
      { id: "fn8d", label: "A function declared in the global scope." }
    ],
    correctIndex: 0,
    explanation: "In functional programming, higher-order functions treat functions as first-class citizens by taking them as parameters (e.g. map, filter) or returning them."
  },
  {
    id: "q-js-fn-9",
    prompt: "What is an Immediately Invoked Function Expression (IIFE)?",
    options: [
      { id: "fn9a", label: "A function that executes immediately as soon as it is defined: '(function() { ... })();'" },
      { id: "fn9b", label: "A function that only runs inside Web Workers." },
      { id: "fn9c", label: "A recursive function that loops infinitely." },
      { id: "fn9d", label: "An asynchronous function that returns a rejected Promise." }
    ],
    correctIndex: 0,
    explanation: "An IIFE is wrapped in parentheses and immediately followed by () to invoke it right away, historically used to create a private scope before ES6 modules."
  },
  {
    id: "q-js-fn-10",
    prompt: "What is the 'arguments' object available inside traditional functions?",
    options: [
      { id: "fn10a", label: "An array-like object containing all arguments passed to the function (not available in arrow functions)." },
      { id: "fn10b", label: "A modern JavaScript Set." },
      { id: "fn10c", label: "An array of all global variables." },
      { id: "fn10d", label: "The DOM nodes currently selected." }
    ],
    correctIndex: 0,
    explanation: "'arguments' is an array-like local variable containing passed arguments. In modern ES6+, rest parameters (...args) are preferred because they form a true Array."
  }
];

export const extraQuestionsLesson9: PracticeQuestion[] = [
  {
    id: "q-js-scope-3",
    prompt: "What is the Scope Chain in JavaScript?",
    options: [
      { id: "sc3a", label: "The hierarchical resolution process where the engine searches outward from the current local scope up through enclosing parent scopes to the global scope." },
      { id: "sc3b", label: "A CSS layout mechanism." },
      { id: "sc3c", label: "A list of connected microservices." },
      { id: "sc3d", label: "An array method chaining map, filter, and reduce." }
    ],
    correctIndex: 0,
    explanation: "When resolving a variable, JavaScript starts in the innermost local scope. If not found, it moves up to the outer parent scope, continuing until reaching the global scope."
  },
  {
    id: "q-js-scope-4",
    prompt: "Why can traditional function declarations be called before they appear in the source code?",
    options: [
      { id: "sc4a", label: "Function declarations are hoisted completely into memory along with their function body during the creation phase." },
      { id: "sc4b", label: "The browser runs the file twice from bottom to top." },
      { id: "sc4c", label: "Because functions are asynchronous." },
      { id: "sc4d", label: "It is an optical illusion in DevTools." }
    ],
    correctIndex: 0,
    explanation: "Function declarations are hoisted in their entirety (both identifier and definition), allowing them to be safely invoked anywhere within their scope."
  },
  {
    id: "q-js-scope-5",
    prompt: "What happens if you try to call a function expression assigned to a 'var' before its assignment: 'sayHi(); var sayHi = function() {};'?",
    options: [
      { id: "sc5a", label: "It runs normally." },
      { id: "sc5b", label: "TypeError: sayHi is not a function (because 'var sayHi' is hoisted as undefined)." },
      { id: "sc5c", label: "ReferenceError: sayHi is not defined." },
      { id: "sc5d", label: "It returns null." }
    ],
    correctIndex: 1,
    explanation: "'var sayHi' is hoisted with initial value undefined. Attempting to call undefined() throws 'TypeError: sayHi is not a function'."
  },
  {
    id: "q-js-scope-6",
    prompt: "What is lexical scoping?",
    options: [
      { id: "sc6a", label: "Variable access is determined at author-time by where functions and blocks are nested in source code, not by where they are called." },
      { id: "sc6b", label: "Variable names are sorted alphabetically at runtime." },
      { id: "sc6c", label: "Scope changes dynamically depending on the caller function." },
      { id: "sc6d", label: "Variables are only valid during asynchronous execution." }
    ],
    correctIndex: 0,
    explanation: "Lexical scope means inner functions have access to variables declared in their outer enclosing physical code blocks, based on where the code was written."
  },
  {
    id: "q-js-scope-7",
    prompt: "What happens when you assign a value to an undeclared variable without 'let', 'const', or 'var' in non-strict mode?",
    options: [
      { id: "sc7a", label: "It accidentally creates an implicit global variable on the global object." },
      { id: "sc7b", label: "It creates a block-scoped variable." },
      { id: "sc7c", label: "The script terminates immediately." },
      { id: "sc7d", label: "It is saved in sessionStorage." }
    ],
    correctIndex: 0,
    explanation: "In non-strict mode, assigning to an undeclared identifier leaks it into the global scope as an implicit global variable (a major source of bugs)."
  },
  {
    id: "q-js-scope-8",
    prompt: "What error is thrown when accessing a 'let' variable within its Temporal Dead Zone (TDZ)?",
    options: [
      { id: "sc8a", label: "TypeError" },
      { id: "sc8b", label: "ReferenceError: Cannot access variable before initialization" },
      { id: "sc8c", label: "SyntaxError" },
      { id: "sc8d", label: "RangeError" }
    ],
    correctIndex: 1,
    explanation: "Accessing a let or const variable before its declaration line triggers 'ReferenceError: Cannot access <variable> before initialization'."
  },
  {
    id: "q-js-scope-9",
    prompt: "Which of the following creates a new scope for 'let' and 'const' variables?",
    options: [
      { id: "sc9a", label: "Any pair of curly braces {}, such as in if statements, loops, or standalone blocks." },
      { id: "sc9b", label: "Only functions." },
      { id: "sc9c", label: "Only class declarations." },
      { id: "sc9d", label: "Only script tags." }
    ],
    correctIndex: 0,
    explanation: "'let' and 'const' are block-scoped, meaning every pair of curly braces {} creates a fresh, isolated lexical scope."
  },
  {
    id: "q-js-scope-10",
    prompt: "What is variable shadowing?",
    options: [
      { id: "sc10a", label: "When a variable declared in an inner scope has the same name as one in an outer scope, masking access to the outer variable." },
      { id: "sc10b", label: "Applying CSS drop-shadow to text." },
      { id: "sc10c", label: "Copying variables into an encrypted hash." },
      { id: "sc10d", label: "Deleting a variable when memory runs low." }
    ],
    correctIndex: 0,
    explanation: "Shadowing occurs when an inner identifier has the exact same name as an outer one, making the outer identifier inaccessible inside that block."
  }
];

export const extraQuestionsLesson10: PracticeQuestion[] = [
  {
    id: "q-js-arr-3",
    prompt: "What does 'array.push()' do and what value does it return?",
    options: [
      { id: "a3a", label: "Adds elements to the end of the array and returns the new length of the array." },
      { id: "a3b", label: "Adds elements to the beginning and returns the modified array." },
      { id: "a3c", label: "Removes the last item and returns it." },
      { id: "a3d", label: "Sorts the array alphabetically." }
    ],
    correctIndex: 0,
    explanation: "push() mutates the array by appending elements to the end and returns the updated numeric array.length."
  },
  {
    id: "q-js-arr-4",
    prompt: "What method removes and returns the FIRST element of an array?",
    options: [
      { id: "a4a", label: "pop()" },
      { id: "a4b", label: "shift()" },
      { id: "a4c", label: "unshift()" },
      { id: "a4d", label: "slice()" }
    ],
    correctIndex: 1,
    explanation: "shift() removes the first element (index 0) from an array, shifts all subsequent elements down by one index, and returns the removed element."
  },
  {
    id: "q-js-arr-5",
    prompt: "What does 'unshift()' do to an array?",
    options: [
      { id: "a5a", label: "Adds one or more elements to the beginning of the array." },
      { id: "a5b", label: "Deletes the last element." },
      { id: "a5c", label: "Reverses the order of elements." },
      { id: "a5d", label: "Empties the array." }
    ],
    correctIndex: 0,
    explanation: "unshift() inserts new elements at the start of the array (index 0), shifting existing elements to higher indices."
  },
  {
    id: "q-js-arr-6",
    prompt: "What will '[\"a\", \"b\", \"c\"].includes(\"b\")' return?",
    options: [
      { id: "a6a", label: "1 (the index)" },
      { id: "a6b", label: "true" },
      { id: "a6c", label: "false" },
      { id: "a6d", label: "\"b\"" }
    ],
    correctIndex: 1,
    explanation: "includes() determines whether an array includes a certain value among its entries, returning true or false."
  },
  {
    id: "q-js-arr-7",
    prompt: "What will '[\"a\", \"b\", \"c\"].indexOf(\"z\")' return when an item is not found?",
    options: [
      { id: "a7a", label: "null" },
      { id: "a7b", label: "-1" },
      { id: "a7c", label: "undefined" },
      { id: "a7d", label: "0" }
    ],
    correctIndex: 1,
    explanation: "indexOf() returns the first index at which a given element can be found, or -1 if it is not present."
  },
  {
    id: "q-js-arr-8",
    prompt: "What is the critical difference between 'slice()' and 'splice()'?",
    options: [
      { id: "a8a", label: "slice() returns a shallow copy of a portion of an array without modifying the original; splice() modifies the original array in place by removing/adding elements." },
      { id: "a8b", label: "slice() mutates the array; splice() is pure." },
      { id: "a8c", label: "They are synonyms for the exact same function." },
      { id: "a8d", label: "splice() only works on strings." }
    ],
    correctIndex: 0,
    explanation: "slice(start, end) is non-destructive (pure) and returns a new sub-array. splice(start, deleteCount, ...items) mutates the original array in place."
  },
  {
    id: "q-js-arr-9",
    prompt: "How can you create a shallow copy of an array using the spread operator?",
    options: [
      { id: "a9a", label: "const copy = [...original];" },
      { id: "a9b", label: "const copy = {original};" },
      { id: "a9c", label: "const copy = Array.copy(original);" },
      { id: "a9d", label: "const copy = original.clone();" }
    ],
    correctIndex: 0,
    explanation: "The spread syntax [...original] expands elements into a fresh array literal, creating an independent shallow copy."
  },
  {
    id: "q-js-arr-10",
    prompt: "If you have a 2D matrix 'const grid = [[1, 2], [3, 4]];', how do you access the value 4?",
    options: [
      { id: "a10a", label: "grid[1][1]" },
      { id: "a10b", label: "grid[2][2]" },
      { id: "a10c", label: "grid[1, 1]" },
      { id: "a10d", label: "grid[4]" }
    ],
    correctIndex: 0,
    explanation: "Arrays are zero-indexed. grid[1] accesses the second inner array [3, 4], and [1] accesses the second item in that array (4)."
  }
];
