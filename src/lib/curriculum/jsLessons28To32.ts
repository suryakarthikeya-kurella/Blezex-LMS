import { CurriculumItem } from "../curriculumTypes";

export const jsLessons28To32: CurriculumItem[] = [
  {
    id: "item-js-this-call-apply-bind",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "28. this, call(), apply(), and bind()",
    duration: "40 mins",
    type: "cheatsheet",
    position: 28,
    contentHeading: "Lesson 28: this, call(), apply(), and bind()",
    contentDescription: "Master JavaScript function execution context: dynamic 'this' binding, call() with individual arguments, apply() with argument arrays, and bind() for callback context preservation.",
    codeSnippet: {
      language: "JavaScript",
      code: "function greet(city, country) {\n  console.log(`Hello, I am ${this.name} from ${city}, ${country}!`);\n}\n\nconst user = { name: \"Hari\" };\n\n// 1. call() -> Invokes immediately with comma-separated arguments\ngreet.call(user, \"Bengaluru\", \"India\");\n\n// 2. apply() -> Invokes immediately with an array of arguments\ngreet.apply(user, [\"Hyderabad\", \"India\"]);\n\n// 3. bind() -> Returns a new function with locked 'this', for later execution\nconst greetHariInChennai = greet.bind(user, \"Chennai\", \"India\");\ngreetHariInChennai(); // Executed later!"
    },
    sections: [
      {
        title: "28.1 What is 'this'?",
        explanation: "'this' refers to the object associated with the current function call. Its value depends entirely on how and where the function is called at runtime.",
        bullets: [
          "In an object method (user.greet()): 'this' refers directly to the object before the dot (user).",
          "In a regular standalone function call: In non-strict mode, 'this' defaults to window. In strict mode ('use strict'), 'this' is undefined.",
          "In a constructor function or class instance (new User()): 'this' refers to the newly created instance.",
          "Important Scoping Rule: In a regular function, 'this' depends dynamically on the calling method. In an arrow function, 'this' does not have its own binding; it is inherited lexically from the surrounding scope."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const user = {\n  name: \"Hari\",\n  greet() {\n    console.log(\"Hello, \" + this.name);\n  }\n};\n\nuser.greet(); // Output: Hello, Hari\n// Here, 'this' refers to the user object."
        }
      },
      {
        title: "28.2 The call() Method",
        explanation: "call() calls a function immediately with a specified 'this' value and individual arguments passed one by one.",
        bullets: [
          "Syntax: fn.call(thisArg, arg1, arg2, ...)",
          "Executes immediately: No new function is created; the function runs on the spot.",
          "Individual arguments: You pass arguments separated by commas."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "function greet(city) {\n  console.log(`Hello ${this.name} from ${city}`);\n}\n\nconst user = { name: \"Hari\" };\n\n// Calls greet immediately with 'this' pointing to user:\ngreet.call(user, \"Bengaluru\");\n// Output: Hello Hari from Bengaluru"
        }
      },
      {
        title: "28.3 The apply() Method",
        explanation: "apply() works like call(), but passes additional function arguments as an array instead of comma-separated values.",
        bullets: [
          "Syntax: fn.apply(thisArg, [arg1, arg2, ...])",
          "Executes immediately: Just like call(), apply() runs the function right away.",
          "Array arguments: Arguments must be wrapped inside a single array [arg1, arg2]."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "function greet(city) {\n  console.log(`Hello ${this.name} from ${city}`);\n}\n\nconst user = { name: \"Hari\" };\n\n// Works like call(), but passes arguments as an array:\ngreet.apply(user, [\"Hyderabad\"]);\n// Output: Hello Hari from Hyderabad"
        }
      },
      {
        title: "28.4 The bind() Method",
        explanation: "bind() creates a new function with a fixed, permanently locked 'this' value. It does NOT execute the function immediately; it returns a new bound function that can be called whenever needed.",
        bullets: [
          "Syntax: const boundFn = fn.bind(thisArg, arg1, arg2, ...)",
          "Does not execute immediately: Returns a brand-new function with 'this' permanently bound to the provided object.",
          "Ideal for callbacks and timers: Perfect when you must pass an object method into an event listener or setTimeout without losing 'this'.",
          "Partial application (currying): You can pre-set initial arguments that will be remembered on every subsequent invocation."
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "function greet(city) {\n  console.log(`Hello ${this.name} from ${city}`);\n}\n\nconst user = { name: \"Hari\" };\n\n// Creates a new function with a fixed this value (does not run immediately):\nconst greetUser = greet.bind(user, \"Chennai\");\n\n// Later in code execution:\ngreetUser();\n// Output: Hello Hari from Chennai"
        }
      },
      {
        title: "28.5 Complete Comparison Matrix: call() vs apply() vs bind()",
        explanation: "Summary comparison to quickly identify when to use each method:",
        table: {
          headers: ["Method", "Executes Immediately?", "Argument Format", "Return Value", "Common Use Case"],
          rows: [
            ["call()", "Yes (immediate)", "Individual comma-separated: fn.call(thisArg, arg1, arg2)", "Result of the function", "Invoking a function with an explicit context and known parameters"],
            ["apply()", "Yes (immediate)", "Single Array: fn.apply(thisArg, [arg1, arg2])", "Result of the function", "Invoking a function when arguments are already inside an array"],
            ["bind()", "No (lazy)", "Individual comma-separated: fn.bind(thisArg, arg1, arg2)", "A brand-new bound function", "Preserving 'this' context for event listeners, callbacks, and setTimeout"]
          ]
        }
      },
      {
        title: "28.6 Real-World Problem: Losing Context in Callbacks",
        explanation: "When an object method is passed as a callback (e.g. to setTimeout or addEventListener), the calling context is detached, causing 'this' to become undefined or the window object. Using .bind(this) or an arrow function solves this permanently.",
        bullets: [
          "Passing 'obj.method' directly loses its host object reference.",
          "Fix 1: counter.increment.bind(counter)",
          "Fix 2: An arrow function wrapper: () => counter.increment()"
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const counter = {\n  count: 0,\n  increment() {\n    this.count++;\n    console.log(this.count);\n  }\n};\n\n// BUG: 'this' is lost inside setTimeout:\n// setTimeout(counter.increment, 1000); // NaN (this.count is undefined)\n\n// FIX 1: bind()\nsetTimeout(counter.increment.bind(counter), 1000); // 1\n\n// FIX 2: arrow function wrapper\nsetTimeout(() => counter.increment(), 1000); // 2"
        }
      }
    ],
    questions: [
      {
        id: "q-this-1",
        prompt: "What determines the value of 'this' in a standard regular function?",
        options: [
          { id: "th1", label: "How and where the function is called at runtime (the calling context)." },
          { id: "th2", label: "Where the function was originally written in source code." },
          { id: "th3", label: "The number of parameters in the function definition." },
          { id: "th4", label: "The browser's user-agent header." }
        ],
        correctIndex: 0,
        explanation: "In traditional functions, 'this' is determined dynamically by the invocation call-site (e.g. user.method() vs standalone method())."
      },
      {
        id: "q-this-2",
        prompt: "How does an arrow function resolve the 'this' keyword?",
        options: [
          { id: "th5", label: "It inherits 'this' lexically from its surrounding enclosing scope at declaration time." },
          { id: "th6", label: "It always binds 'this' to the global window object." },
          { id: "th7", label: "It binds 'this' to the HTML button element." },
          { id: "th8", label: "Arrow functions throw a SyntaxError if 'this' is accessed." }
        ],
        correctIndex: 0,
        explanation: "Arrow functions do not define their own execution context; they lexically capture the 'this' binding of the scope in which they were created."
      },
      {
        id: "q-this-3",
        prompt: "What is the key difference between 'fn.call()' and 'fn.apply()'?",
        options: [
          { id: "th9", label: "call() accepts arguments individually as comma-separated values; apply() accepts arguments as an array." },
          { id: "th10", label: "call() is asynchronous; apply() is synchronous." },
          { id: "th11", label: "apply() returns a Promise; call() does not." },
          { id: "th12", label: "apply() only works in strict mode." }
        ],
        correctIndex: 0,
        explanation: "Both call() and apply() invoke the function immediately with a specified 'this'. The only difference is argument syntax: fn.call(thisArg, a, b) vs fn.apply(thisArg, [a, b])."
      },
      {
        id: "q-this-4",
        prompt: "What does 'Function.prototype.bind()' return?",
        options: [
          { id: "th13", label: "A brand new function with its 'this' value permanently bound to the provided object." },
          { id: "th14", label: "The return value of executing the function immediately." },
          { id: "th15", label: "A Promise that resolves after 1 second." },
          { id: "th16", label: "A frozen copy of the original object." }
        ],
        correctIndex: 0,
        explanation: "bind() does not invoke the function immediately. It returns a new bound function that, when called later, executes with the preset 'this' context."
      },
      {
        id: "q-this-5",
        prompt: "What is the value of 'this' in a standalone function call in strict mode ('use strict')?",
        options: [
          { id: "th17", label: "undefined" },
          { id: "th18", label: "The global window object" },
          { id: "th19", label: "null" },
          { id: "th20", label: "{}" }
        ],
        correctIndex: 0,
        explanation: "In strict mode, if a function is called without an explicit execution context (e.g. fn()), 'this' remains undefined rather than defaulting to the global window object."
      },
      {
        id: "q-this-6",
        prompt: "Why does passing 'button.addEventListener(\"click\", user.handleClick)' often result in unexpected behavior if handleClick uses 'this'?",
        options: [
          { id: "th21", label: "The method is detached from 'user'; the browser invokes it with 'this' pointing to the button element (or undefined), losing access to 'user'." },
          { id: "th22", label: "Because addEventListener cannot call methods." },
          { id: "th23", label: "Because handleClick is converted into a string." },
          { id: "th24", label: "It throws a SyntaxError." }
        ],
        correctIndex: 0,
        explanation: "Passing an object method as a raw callback detaches it from its host object. When the event fires, the browser sets 'this' to the event target (the button), not 'user'."
      },
      {
        id: "q-this-7",
        prompt: "Can you re-bind an already bound function using another '.bind()' call?",
        options: [
          { id: "th25", label: "No, a function bound with bind() is permanently locked to its first bound 'this' context." },
          { id: "th26", label: "Yes, subsequent bind calls overwrite the previous context." },
          { id: "th27", label: "Only if called with apply()." },
          { id: "th28", label: "Only in Node.js." }
        ],
        correctIndex: 0,
        explanation: "Once a function is bound via bind(), its 'this' binding is permanent and cannot be overridden by subsequent bind(), call(), or apply() invocations."
      },
      {
        id: "q-this-8",
        prompt: "What does partial application (currying) with 'bind()' allow you to do?",
        options: [
          { id: "th29", label: "Pre-set both the 'this' context and initial leading arguments for future invocations." },
          { id: "th30", label: "Run the function in a web worker." },
          { id: "th31", label: "Encrypt the function arguments." },
          { id: "th32", label: "Convert the function into a JSON string." }
        ],
        correctIndex: 0,
        explanation: "bind(thisArg, arg1, arg2) allows you to pre-fill parameters. When the returned function is called with additional arguments, they are appended to the pre-filled ones."
      },
      {
        id: "q-this-9",
        prompt: "What does 'Math.max.apply(null, [10, 50, 20])' accomplish?",
        options: [
          { id: "th33", label: "Passes the array elements as individual arguments to Math.max, returning 50 (historical alternative to spread syntax)." },
          { id: "th34", label: "Throws a TypeError because null is not an object." },
          { id: "th35", label: "Returns null." },
          { id: "th36", label: "Returns [10, 50, 20]." }
        ],
        correctIndex: 0,
        explanation: "Before ES6 spread syntax (Math.max(...nums)), apply() was the standard way to pass an array of numbers to functions expecting comma-separated parameters."
      },
      {
        id: "q-this-10",
        prompt: "Can 'call()' or 'apply()' override the 'this' value of an arrow function?",
        options: [
          { id: "th37", label: "No, arrow functions retain their lexical 'this'; passing a 'thisArg' to call or apply on an arrow function is silently ignored." },
          { id: "th38", label: "Yes, call() always overrides any function's this." },
          { id: "th39", label: "It throws a TypeError." },
          { id: "th40", label: "Only in strict mode." }
        ],
        correctIndex: 0,
        explanation: "Arrow functions have permanent lexical 'this' bindings. Invoking them with call() or apply() passes arguments, but the 'thisArg' is completely ignored."
      }
    ]
  },
  {
    id: "item-js-classes-oop",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "29. Object-Oriented JavaScript and Classes",
    duration: "45 mins",
    type: "cheatsheet",
    position: 29,
    contentHeading: "Lesson 29: Object-Oriented JavaScript and Classes",
    contentDescription: "Master modern OOP in JavaScript: class blueprints, constructors, private fields (#), methods, instantiation with 'new', and the 4 pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    codeSnippet: {
      language: "JavaScript",
      code: "class BankAccount {\n  // Private field (Encapsulation)\n  #balance;\n\n  constructor(owner, initialBalance = 0) {\n    this.owner = owner;\n    this.#balance = initialBalance;\n  }\n\n  deposit(amount) {\n    if (amount <= 0) throw new Error(\"Deposit must be positive\");\n    this.#balance += amount;\n    return this.#balance;\n  }\n\n  getBalance() {\n    return this.#balance; // Controlled access (Abstraction)\n  }\n}\n\nconst account = new BankAccount(\"Hari\", 1000);\naccount.deposit(500);\nconsole.log(account.getBalance()); // 1500\n// console.log(account.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class"
    },
    sections: [
      {
        title: "29.1 What is Object-Oriented Programming (OOP)?",
        explanation: "Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around data entities (objects) rather than standalone functions and logic. An object combines properties (state) and methods (behavior) into a single cohesive unit.",
        bullets: [
          "State / Properties: Data variables describing the object (e.g. name, age, balance).",
          "Behavior / Methods: Functions that operate on and modify that state (e.g. deposit(), introduce()).",
          "Instances: Concrete objects created from a class template using the 'new' operator."
        ]
      },
      {
        title: "29.2 ES6 Classes & Constructors",
        explanation: "A class is an extensible program-code template for creating objects. The 'constructor()' method runs automatically when a new instance is created with 'new':",
        codeSnippet: {
          language: "JavaScript",
          code: "class Student {\n  constructor(name, age) {\n    this.name = name; // Instance property\n    this.age = age;\n  }\n\n  // Prototype method\n  introduce() {\n    console.log(`I am ${this.name}, aged ${this.age}`);\n  }\n}\n\nconst student1 = new Student(\"Hari\", 22);\nstudent1.introduce(); // \"I am Hari, aged 22\""
        }
      },
      {
        title: "29.3 The Four Pillars of OOP",
        explanation: "Modern object-oriented software is built on four core principles:",
        table: {
          headers: ["Pillar", "Definition", "JavaScript Implementation Example"],
          rows: [
            ["Encapsulation", "Bundling data and methods together while restricting direct access to internal state", "Private class fields with '#' prefix (e.g. #balance) or closure state"],
            ["Abstraction", "Hiding complex internal logic and exposing a clean, simple public interface", "Calling account.deposit(100) or ATM withdraw without knowing internal ledger processing"],
            ["Inheritance", "Creating specialized child classes that reuse functionality from parent classes", "class Student extends Person { ... }"],
            ["Polymorphism", "Allowing different objects to respond to identical method names in their own unique way", "new Dog().speak() -> 'Woof'; new Cat().speak() -> 'Meow'"]
          ]
        }
      },
      {
        title: "29.4 Private Class Fields (#)",
        explanation: "ES2022 officially introduced private class fields prefixed with '#'. Unlike private conventions (_name), '#' fields are enforced by the JavaScript engine at the syntax level and cannot be accessed or modified from outside the class.",
        codeSnippet: {
          language: "JavaScript",
          code: "class User {\n  #passwordHash;\n  constructor(username, password) {\n    this.username = username;\n    this.#passwordHash = hash(password);\n  }\n  verify(password) {\n    return this.#passwordHash === hash(password);\n  }\n}"
        }
      }
    ],
    questions: [
      {
        id: "q-oop-1",
        prompt: "What is a class in modern JavaScript?",
        options: [
          { id: "op1", label: "A blueprint or template used for creating objects with shared properties and methods." },
          { id: "op2", label: "A CSS selector used for styling text." },
          { id: "op3", label: "A special array that only stores numbers." },
          { id: "op4", label: "A HTML tag that renders forms." }
        ],
        correctIndex: 0,
        explanation: "A class acts as a template defining the structure, properties, and methods that instances created from it will possess."
      },
      {
        id: "q-oop-2",
        prompt: "What is the purpose of the 'constructor()' method in a JavaScript class?",
        options: [
          { id: "op5", label: "It is a special method called automatically when an object is instantiated with 'new' to initialize properties." },
          { id: "op6", label: "It compiles the JavaScript file into C++." },
          { id: "op7", label: "It destroys the object when memory is low." },
          { id: "op8", label: "It prevents other classes from inheriting properties." }
        ],
        correctIndex: 0,
        explanation: "The constructor method initializes an instance's state when 'new ClassName(...)' is invoked."
      },
      {
        id: "q-oop-3",
        prompt: "How do you declare a truly private field in a modern JavaScript class?",
        options: [
          { id: "op9", label: "By prefixing the field name with a hash symbol (#), e.g. #balance = 1000;" },
          { id: "op10", label: "By prefixing with an underscore (_balance)" },
          { id: "op11", label: "Using the 'private balance = 1000;' keyword" },
          { id: "op12", label: "By writing 'secret balance = 1000;'" }
        ],
        correctIndex: 0,
        explanation: "In modern ECMAScript (ES2022+), the '#' prefix creates true language-enforced private fields that cannot be accessed outside the class body."
      },
      {
        id: "q-oop-4",
        prompt: "Which OOP pillar is demonstrated when a Dog and a Cat both implement a 'speak()' method with different outputs ('Woof' and 'Meow')?",
        options: [
          { id: "op13", label: "Polymorphism" },
          { id: "op14", label: "Encapsulation" },
          { id: "op15", label: "Compilation" },
          { id: "op16", label: "Hoisting" }
        ],
        correctIndex: 0,
        explanation: "Polymorphism ('many forms') allows different classes to share a common method interface while providing their own customized implementations."
      },
      {
        id: "q-oop-5",
        prompt: "What does the 'Encapsulation' principle achieve in software architecture?",
        options: [
          { id: "op17", label: "It keeps related state and methods grouped together while preventing direct, unauthorized external tampering with internal data." },
          { id: "op18", label: "It turns all JavaScript code into a single string." },
          { id: "op19", label: "It downloads files faster." },
          { id: "op20", label: "It converts functions into CSS stylesheets." }
        ],
        correctIndex: 0,
        explanation: "Encapsulation bundles data and logic within an object and restricts direct modification, ensuring state changes only occur through validated public methods."
      },
      {
        id: "q-oop-6",
        prompt: "What is 'Abstraction' in Object-Oriented Programming?",
        options: [
          { id: "op21", label: "Hiding internal complexity and exposing only a clean, simple, and essential interface to consumers." },
          { id: "op22", label: "Writing code without comments." },
          { id: "op23", label: "Removing all methods from an object." },
          { id: "op24", label: "Running code asynchronously." }
        ],
        correctIndex: 0,
        explanation: "Abstraction simplifies interaction by concealing complicated internal details (like using an ATM machine without needing to understand its database transactions)."
      },
      {
        id: "q-oop-7",
        prompt: "What keyword is required to instantiate an object from a class blueprint in JavaScript?",
        options: [
          { id: "op25", label: "new" },
          { id: "op26", label: "create" },
          { id: "op27", label: "instantiate" },
          { id: "op28", label: "build" }
        ],
        correctIndex: 0,
        explanation: "The 'new' operator creates an instance of a user-defined object type or constructor function (e.g. const s = new Student())."
      },
      {
        id: "q-oop-8",
        prompt: "Where are methods defined inside a class body (e.g. 'introduce() {}') stored in memory?",
        options: [
          { id: "op29", label: "On the class's prototype object (Student.prototype), shared by all instances." },
          { id: "op30", label: "Duplicated separately in every single instantiated object." },
          { id: "op31", label: "In the browser's localStorage." },
          { id: "op32", label: "On the global window object." }
        ],
        correctIndex: 0,
        explanation: "Methods defined in a class are attached to the class's prototype, conserving memory because all instances share the same function reference."
      },
      {
        id: "q-oop-9",
        prompt: "What happens if code outside a class tries to access a private field directly, such as 'account.#balance'?",
        options: [
          { id: "op33", label: "JavaScript throws a compile-time SyntaxError: Private field must be declared in an enclosing class." },
          { id: "op34", label: "It returns undefined." },
          { id: "op35", label: "It prints null." },
          { id: "op36", label: "It returns 0." }
        ],
        correctIndex: 0,
        explanation: "Private '#' fields are enforced strictly by JavaScript engines; accessing them outside the class scope results in a SyntaxError."
      },
      {
        id: "q-oop-10",
        prompt: "What is a 'getter' method in a JavaScript class (using the 'get' keyword)?",
        options: [
          { id: "op37", label: "A method that binds an object property to a function that is called when that property is accessed (e.g. obj.fullName)." },
          { id: "op38", label: "An HTTP GET request." },
          { id: "op39", label: "A function that deletes properties." },
          { id: "op40", label: "A method that resets the object." }
        ],
        correctIndex: 0,
        explanation: "Getters bind a property to a function, allowing computed values to be read using standard property access syntax without calling parentheses ()."
      }
    ]
  },
  {
    id: "item-js-prototypes-inheritance",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "30. Prototypes and Inheritance",
    duration: "40 mins",
    type: "cheatsheet",
    position: 30,
    contentHeading: "Lesson 30: Prototypes and Inheritance",
    contentDescription: "Understand JavaScript's prototype chain, prototypal inheritance, Object.create(), class inheritance with 'extends', and the 'super()' keyword.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Class Inheritance with 'extends' and 'super'\nclass Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hello, I am ${this.name}!`;\n  }\n}\n\nclass Student extends Person {\n  constructor(name, course) {\n    super(name); // Must call parent constructor first!\n    this.course = course;\n  }\n  study() {\n    return `${this.name} is studying ${this.course}.`;\n  }\n}\n\nconst hari = new Student(\"Hari\", \"JavaScript\");\nconsole.log(hari.greet()); // Inherited from Person\nconsole.log(hari.study()); // Defined on Student"
    },
    sections: [
      {
        title: "30.1 What is a Prototype?",
        explanation: "In JavaScript, every object has an internal link to another object called its prototype. When you access a property or method on an object, JavaScript checks if the object owns it. If not, it searches up the prototype chain until it finds the property or reaches null.",
        bullets: [
          "Object.create(proto): Creates a new object with the specified prototype.",
          "Prototype Chain: The lookup sequence: object -> prototype -> Object.prototype -> null.",
          "Classes in JavaScript are syntactical sugar built directly on top of prototypes!"
        ],
        codeSnippet: {
          language: "JavaScript",
          code: "const user = {\n  greet() { console.log(\"Hello from prototype!\"); }\n};\n\nconst student = Object.create(user);\nstudent.name = \"Hari\";\nstudent.greet(); // \"Hello from prototype!\" (Found via prototype chain)"
        }
      },
      {
        title: "30.2 Class Inheritance using 'extends'",
        explanation: "The 'extends' keyword sets up prototypal inheritance between two classes. The child class inherits all non-private methods and static properties of the parent class.",
        codeSnippet: {
          language: "JavaScript",
          code: "class Vehicle {\n  start() { console.log(\"Engine started\"); }\n}\n\nclass Car extends Vehicle {\n  drive() { console.log(\"Driving car\"); }\n}\n\nconst myCar = new Car();\nmyCar.start(); // Inherited\nmyCar.drive(); // Own method"
        }
      },
      {
        title: "30.3 The 'super()' Keyword",
        explanation: "When a child class defines its own constructor(), it MUST call 'super()' before accessing 'this'. Calling super() invokes the parent class's constructor and binds the parent's properties to the child instance.",
        bullets: [
          "super(args): Calls the parent constructor.",
          "super.method(): Calls a method on the parent class (useful when overriding methods).",
          "Forgetting super(): Throws a ReferenceError: Must call super constructor in derived class before accessing 'this'."
        ]
      }
    ],
    questions: [
      {
        id: "q-proto-1",
        prompt: "What is a prototype in JavaScript?",
        options: [
          { id: "pt1", label: "An object from which other objects inherit properties and methods." },
          { id: "pt2", label: "A beta test version of a website." },
          { id: "pt3", label: "A compiler tool in Node.js." },
          { id: "pt4", label: "A JSON file format." }
        ],
        correctIndex: 0,
        explanation: "Every JavaScript object has a prototype object that serves as a fallback source of properties and methods via the prototype chain."
      },
      {
        id: "q-proto-2",
        prompt: "What is the Prototype Chain lookup order when accessing 'student.greet()'?",
        options: [
          { id: "pt5", label: "It checks 'student' own properties -> then student's prototype -> then Object.prototype -> then stops at null." },
          { id: "pt6", label: "It checks Object.prototype first, then the object." },
          { id: "pt7", label: "It queries the database." },
          { id: "pt8", label: "It checks global window variables only." }
        ],
        correctIndex: 0,
        explanation: "The JavaScript engine checks the object itself first. If missing, it steps up through its prototype chain until found or the chain ends at null."
      },
      {
        id: "q-proto-3",
        prompt: "Which keyword establishes inheritance between a child class and a parent class in JavaScript?",
        options: [
          { id: "pt9", label: "extends" },
          { id: "pt10", label: "inherits" },
          { id: "pt11", label: "implements" },
          { id: "pt12", label: "prototypeOf" }
        ],
        correctIndex: 0,
        explanation: "The 'extends' keyword is used in class declarations to create a child class that inherits from another class (e.g. class Dog extends Animal)."
      },
      {
        id: "q-proto-4",
        prompt: "Why must a child class constructor call 'super()' before using the 'this' keyword?",
        options: [
          { id: "pt13", label: "Calling super() executes the parent constructor to initialize the base object and instantiate 'this'." },
          { id: "pt14", label: "Because super() loads CSS styles." },
          { id: "pt15", label: "To convert the child class into a JSON string." },
          { id: "pt16", label: "It is optional and not strictly required." }
        ],
        correctIndex: 0,
        explanation: "In derived classes, 'this' is not initialized until the parent constructor is executed via super(). Accessing 'this' before super() throws a ReferenceError."
      },
      {
        id: "q-proto-5",
        prompt: "What is at the very top of the JavaScript prototype chain?",
        options: [
          { id: "pt17", label: "Object.prototype, whose own prototype is null." },
          { id: "pt18", label: "Array.prototype" },
          { id: "pt19", label: "window.document" },
          { id: "pt20", label: "Function.prototype" }
        ],
        correctIndex: 0,
        explanation: "Nearly all objects descend from Object.prototype, whose prototype is null, marking the definitive end of the prototype chain."
      },
      {
        id: "q-proto-6",
        prompt: "What does 'Object.create(proto)' do?",
        options: [
          { id: "pt21", label: "Creates a new object whose prototype is set explicitly to the specified 'proto' object." },
          { id: "pt22", label: "Deletes the prototype object." },
          { id: "pt23", label: "Freezes an object permanently." },
          { id: "pt24", label: "Creates an empty HTML div." }
        ],
        correctIndex: 0,
        explanation: "Object.create(proto) creates a fresh object with its internal [[Prototype]] link pointing directly to the argument passed."
      },
      {
        id: "q-proto-7",
        prompt: "Are ES6 classes a fundamentally new inheritance model or syntactic sugar over prototypes?",
        options: [
          { id: "pt25", label: "They are primarily syntactic sugar over JavaScript's existing prototype-based inheritance model." },
          { id: "pt26", label: "They are identical to Java bytecode classes." },
          { id: "pt27", label: "They completely replaced prototypes, which no longer exist in modern browsers." },
          { id: "pt28", label: "They run only on 64-bit processors." }
        ],
        correctIndex: 0,
        explanation: "ES6 classes introduce cleaner, class-based syntax, but underneath, JavaScript remains an object-oriented prototype-based language."
      },
      {
        id: "q-proto-8",
        prompt: "How can you check if an object is an instance of a specific class or constructor in its prototype chain?",
        options: [
          { id: "pt29", label: "object instanceof ClassName" },
          { id: "pt30", label: "typeof object === 'ClassName'" },
          { id: "pt31", label: "object.isTypeOf(ClassName)" },
          { id: "pt32", label: "ClassName.has(object)" }
        ],
        correctIndex: 0,
        explanation: "The 'instanceof' operator tests whether the prototype property of a constructor appears anywhere within the prototype chain of an object."
      },
      {
        id: "q-proto-9",
        prompt: "How can a child class call an overridden method on its parent class?",
        options: [
          { id: "pt33", label: "super.methodName()" },
          { id: "pt34", label: "parent.methodName()" },
          { id: "pt35", label: "this.super.methodName()" },
          { id: "pt36", label: "callParent(methodName)" }
        ],
        correctIndex: 0,
        explanation: "Inside child methods, super.methodName() delegates to the corresponding method implementation on the parent class prototype."
      },
      {
        id: "q-proto-10",
        prompt: "What does 'hasOwnProperty()' or 'Object.hasOwn(obj, prop)' check?",
        options: [
          { id: "pt37", label: "Whether the property belongs directly to the object itself, rather than being inherited through the prototype chain." },
          { id: "pt38", label: "Whether the property is a number." },
          { id: "pt39", label: "Whether the property is public or private." },
          { id: "pt40", label: "Whether the object is frozen." }
        ],
        correctIndex: 0,
        explanation: "Object.hasOwn(obj, 'prop') returns true only if 'prop' is an own, direct property of the object, excluding inherited prototype properties."
      }
    ]
  },
  {
    id: "item-js-performance-immutability",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "31. Performance, Immutability, and Best Practices",
    duration: "40 mins",
    type: "cheatsheet",
    position: 31,
    contentHeading: "Lesson 31: Performance, Immutability, and Best Practices",
    contentDescription: "Write fast, maintainable JavaScript: memoization/caching, DOM update optimization, immutability patterns, spread cloning, and core engineering best practices.",
    codeSnippet: {
      language: "JavaScript",
      code: "// 1. Immutability with arrays and objects (crucial for React state)\nconst numbers = [1, 2, 3];\nconst updatedNumbers = [...numbers, 4]; // Pure copy, no mutation!\n\nconst user = { name: \"Hari\", age: 22 };\nconst updatedUser = { ...user, age: 23 }; // Clean immutable update\n\n// 2. Performance: Memoization / Calculation Caching\nconst memoCache = {};\nfunction expensiveSquare(n) {\n  if (memoCache[n] !== undefined) return memoCache[n];\n  memoCache[n] = n * n;\n  return memoCache[n];\n}"
    },
    sections: [
      {
        title: "31.1 What is Performance in JavaScript?",
        explanation: "Performance means writing code that executes efficiently with minimal resource consumption, eliminating redundant operations, and keeping user interfaces responsive at 60 frames per second.",
        bullets: [
          "Avoid expensive operations inside loops.",
          "Cache / Memoize expensive or repetitive calculations.",
          "Batch DOM updates using DocumentFragment or replaceChildren() instead of repeatedly appending.",
          "Debounce or throttle high-frequency events (scroll, window resize, search keystroke input)."
        ]
      },
      {
        title: "31.2 Immutability: Mutating vs Creating New Values",
        explanation: "Immutability means treating data as unchangeable once created. Instead of mutating original data structures in place, you return a brand new copy containing the updates.",
        bullets: [
          "Mutable (risk of unexpected bugs): array.push(item), user.age = 23.",
          "Immutable (pure and predictable): [...array, item], { ...user, age: 23 }.",
          "Crucial for React & Redux: React relies on shallow reference comparison (prevProps !== nextProps) to know when to re-render. Mutating state in place breaks React's change detection!"
        ]
      },
      {
        title: "31.3 Professional JavaScript Best Practices",
        explanation: "Adopt these battle-tested development habits across all projects:",
        table: {
          headers: ["Practice", "Why It Matters"],
          rows: [
            ["Use 'const' by default", "Prevents accidental reassignment and clarifies intent"],
            ["Use 'let' only when reassignment is needed", "Restricts variable mutation to controlled loops or counters"],
            ["Avoid global variables", "Eliminates naming collisions and protects against global pollution"],
            ["Use descriptive, meaningful names", "Code is read far more often than it is written"],
            ["Always use strict equality (===)", "Avoids silent, unpredictable automatic type coercion errors"],
            ["Keep functions small and focused", "Functions that do one thing are easier to test, debug, and reuse"],
            ["Handle errors with try/catch", "Prevents unhandled promise rejections and graceful fallback UI"],
            ["Avoid premature optimization", "Write clear, readable code first; benchmark and optimize bottlenecks with data"]
          ]
        }
      }
    ],
    questions: [
      {
        id: "q-perf-1",
        prompt: "Why is immutability especially critical when updating state in modern UI frameworks like React?",
        options: [
          { id: "pf1", label: "React uses shallow reference equality checks (prevProps !== nextProps); mutating data in place keeps the same reference, causing React to miss state changes and skip re-renders." },
          { id: "pf2", label: "React only supports numbers, not objects." },
          { id: "pf3", label: "Mutating data causes immediate browser crashes." },
          { id: "pf4", label: "Because JavaScript deletes mutable variables after 5 seconds." }
        ],
        correctIndex: 0,
        explanation: "React relies on new object/array references to detect changes quickly. Mutating an existing state array (e.g. array.push) leaves the object reference identical, preventing components from updating."
      },
      {
        id: "q-perf-2",
        prompt: "What is an immutable way to append a new item '4' to '[1, 2, 3]'?",
        options: [
          { id: "pf5", label: "const updated = [...numbers, 4];" },
          { id: "pf6", label: "numbers.push(4);" },
          { id: "pf7", label: "numbers.unshift(4);" },
          { id: "pf8", label: "numbers.splice(3, 0, 4);" }
        ],
        correctIndex: 0,
        explanation: "The spread syntax [...numbers, 4] creates a new array containing all previous items plus 4 without mutating the original 'numbers' array."
      },
      {
        id: "q-perf-3",
        prompt: "What is 'memoization' in programming?",
        options: [
          { id: "pf9", label: "An optimization technique that caches the return values of expensive function calls based on their input arguments to avoid redundant work." },
          { id: "pf10", label: "A method to memorize code for exams." },
          { id: "pf11", label: "Deleting memory when a function exits." },
          { id: "pf12", label: "Translating code into machine language." }
        ],
        correctIndex: 0,
        explanation: "Memoization stores computed results in a lookup cache. When the function is called again with the same inputs, it returns the cached result immediately."
      },
      {
        id: "q-perf-4",
        prompt: "What is the difference between 'debouncing' and 'throttling' high-frequency events (like scroll or typing)?",
        options: [
          { id: "pf13", label: "Debounce waits for a pause in events before running once; throttle guarantees the function runs at most once per fixed time interval." },
          { id: "pf14", label: "Throttle cancels all events; debounce doubles them." },
          { id: "pf15", label: "Debounce is only for CSS; throttle is for HTML." },
          { id: "pf16", label: "There is no difference." }
        ],
        correctIndex: 0,
        explanation: "Debounce postpones execution until events stop firing for a specified delay (ideal for search input). Throttle enforces a maximum execution frequency (e.g. at most once every 200ms during scroll)."
      },
      {
        id: "q-perf-5",
        prompt: "Why is 'const' recommended by default for variable declarations instead of 'let' or 'var'?",
        options: [
          { id: "pf17", label: "It signals that the variable identifier will not be reassigned, preventing accidental reassignments and improving code clarity." },
          { id: "pf18", label: "'const' makes objects completely immutable." },
          { id: "pf19", label: "'const' variables use zero memory." },
          { id: "pf20", label: "'const' runs faster in browsers." }
        ],
        correctIndex: 0,
        explanation: "Using const by default clarifies developer intent and prevents accidental variable reassignment bugs. Use let only when reassignment is genuinely required."
      },
      {
        id: "q-perf-6",
        prompt: "Why should repeated manual DOM updates inside a long loop be avoided?",
        options: [
          { id: "pf21", label: "Each DOM modification can trigger browser layout reflow and repaint calculations, causing noticeable UI stutter and lag." },
          { id: "pf22", label: "The browser deletes the DOM tree after 10 updates." },
          { id: "pf23", label: "DOM loops throw a RangeError." },
          { id: "pf24", label: "Loops cannot touch HTML elements." }
        ],
        correctIndex: 0,
        explanation: "Manipulating the DOM is expensive. Repeatedly touching DOM elements in loops causes forced synchronous layout reflows; batching updates is far more performant."
      },
      {
        id: "q-perf-7",
        prompt: "What is an immutable way to update 'age: 23' on 'const user = { name: \"Hari\", age: 22 }'?",
        options: [
          { id: "pf25", label: "const updated = { ...user, age: 23 };" },
          { id: "pf26", label: "user.age = 23;" },
          { id: "pf27", label: "user['age'] = 23;" },
          { id: "pf28", label: "delete user.age; user.age = 23;" }
        ],
        correctIndex: 0,
        explanation: "Object spread { ...user, age: 23 } creates a fresh object with all of user's properties, overriding age without mutating the original 'user' object."
      },
      {
        id: "q-perf-8",
        prompt: "What is meant by 'avoid premature optimization'?",
        options: [
          { id: "pf29", label: "Prioritize writing clean, correct, readable code first; only optimize specific performance bottlenecks after measuring with profilers." },
          { id: "pf30", label: "Never optimize code under any circumstances." },
          { id: "pf31", label: "Only write code using for loops." },
          { id: "pf32", label: "Delete all variables before production." }
        ],
        correctIndex: 0,
        explanation: "Optimizing before identifying real bottlenecks often complicates code unnecessarily without real gains. Write clean code first, then measure."
      },
      {
        id: "q-perf-9",
        prompt: "Why is strict equality (===) strongly preferred over loose equality (==)?",
        options: [
          { id: "pf33", label: "Strict equality avoids unpredictable implicit type coercion bugs (like '0 == false' or '[] == 0')." },
          { id: "pf34", label: "=== converts both operands into numbers." },
          { id: "pf35", label: "=== only compares strings." },
          { id: "pf36", label: "== is deprecated in modern ECMAScript." }
        ],
        correctIndex: 0,
        explanation: "Loose equality (==) performs complex implicit type coercions that frequently cause subtle bugs. Strict equality (===) checks both value and type reliably."
      },
      {
        id: "q-perf-10",
        prompt: "What modern DOM method efficiently replaces all children of an element in a single operation?",
        options: [
          { id: "pf37", label: "element.replaceChildren(...newNodes)" },
          { id: "pf38", label: "element.innerHTML = '' then appendChild" },
          { id: "pf39", label: "element.empty()" },
          { id: "pf40", label: "element.clearAll()" }
        ],
        correctIndex: 0,
        explanation: "element.replaceChildren() removes all existing child nodes of an element and replaces them with the provided new nodes in a single optimized pass."
      }
    ]
  },
  {
    id: "item-js-final-project",
    moduleId: "mod-js-fundamentals",
    moduleTitle: "Fundamentals of JavaScript",
    modulePosition: 2,
    title: "32. Final Project — Interactive Task Tracker",
    duration: "60 mins",
    type: "cheatsheet",
    position: 32,
    contentHeading: "Lesson 32: Final Project — Interactive Task Tracker",
    contentDescription: "Build a complete, production-grade Task Management application with HTML, CSS, and modern JavaScript: state management, DOM manipulation, event listeners, localStorage persistence, and filtering.",
    codeSnippet: {
      language: "JavaScript",
      code: "// Core Interactive Task Tracker Implementation\nconst form = document.getElementById(\"task-form\");\nconst input = document.getElementById(\"task-input\");\nconst taskList = document.getElementById(\"task-list\");\nconst filter = document.getElementById(\"filter\");\nconst taskCount = document.getElementById(\"task-count\");\n\nlet tasks = JSON.parse(localStorage.getItem(\"tasks\")) || [];\n\nfunction saveTasks() {\n  localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n}\n\nfunction renderTasks() {\n  taskList.replaceChildren();\n  const visibleTasks = tasks.filter(task => {\n    if (filter.value === \"active\") return !task.completed;\n    if (filter.value === \"completed\") return task.completed;\n    return true;\n  });\n\n  visibleTasks.forEach(task => {\n    const li = document.createElement(\"li\");\n    const checkbox = document.createElement(\"input\");\n    checkbox.type = \"checkbox\";\n    checkbox.checked = task.completed;\n    checkbox.addEventListener(\"change\", () => {\n      task.completed = checkbox.checked;\n      saveTasks();\n      renderTasks();\n    });\n\n    const text = document.createElement(\"span\");\n    text.textContent = task.title; // Safe plain text (avoids XSS)\n    if (task.completed) text.style.textDecoration = \"line-through\";\n\n    const deleteBtn = document.createElement(\"button\");\n    deleteBtn.textContent = \"Delete\";\n    deleteBtn.addEventListener(\"click\", () => {\n      tasks = tasks.filter(t => t.id !== task.id);\n      saveTasks();\n      renderTasks();\n    });\n\n    li.append(checkbox, text, deleteBtn);\n    taskList.appendChild(li);\n  });\n\n  const done = tasks.filter(t => t.completed).length;\n  taskCount.textContent = `${done} completed out of ${tasks.length} tasks`;\n}\n\nform.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  const title = input.value.trim();\n  if (!title) return;\n  tasks.push({ id: crypto.randomUUID(), title, completed: false });\n  saveTasks();\n  renderTasks();\n  input.value = \"\";\n});\n\nfilter.addEventListener(\"change\", renderTasks);\nrenderTasks();"
    },
    sections: [
      {
        title: "32.1 Project Architecture & Key Features",
        explanation: "This project brings together all fundamental and modern JavaScript concepts learned throughout the course into an interactive application:",
        bullets: [
          "Add Tasks: Validates input, trims whitespace, generates a unique UUID with crypto.randomUUID(), and prevents page reload with event.preventDefault().",
          "Toggle Completion: Checkbox change events update state immutably and toggle line-through styling.",
          "Delete Tasks: Filters out the selected task by ID.",
          "Filter Tasks: Filter dropdown switches views between 'All', 'Active', and 'Completed' using Array.prototype.filter().",
          "LocalStorage Persistence: Saves state to localStorage as serialized JSON strings on every change.",
          "Live Summary Counter: Calculates active and completed task counts dynamically.",
          "Security: Sets text via 'textContent' instead of 'innerHTML' to prevent Cross-Site Scripting (XSS)."
        ]
      },
      {
        title: "32.2 HTML Structure",
        explanation: "Accessible, semantic HTML5 structure for the application:",
        codeSnippet: {
          language: "HTML",
          code: "<div class=\"task-app\">\n  <h1>Task Tracker</h1>\n  <form id=\"task-form\">\n    <input id=\"task-input\" placeholder=\"Enter a task\" required />\n    <button type=\"submit\">Add Task</button>\n  </form>\n\n  <select id=\"filter\">\n    <option value=\"all\">All Tasks</option>\n    <option value=\"active\">Active</option>\n    <option value=\"completed\">Completed</option>\n  </select>\n\n  <p id=\"task-count\"></p>\n  <ul id=\"task-list\"></ul>\n</div>"
        }
      },
      {
        title: "32.3 Concepts Covered Checklist",
        explanation: "Comprehensive synthesis of core web programming concepts implemented in this capstone:",
        bullets: [
          "DOM selection (getElementById) & creation (createElement, append).",
          "Event handling & listeners (submit, change, click).",
          "Preventing default browser form reloads (event.preventDefault()).",
          "String methods (trim()) & array methods (filter(), forEach()).",
          "JSON serialization (JSON.stringify) & parsing (JSON.parse).",
          "Browser persistence with window.localStorage.",
          "Generating unique identifiers using modern web APIs (crypto.randomUUID()).",
          "Defensive programming: safe plain text insertion via textContent to avoid XSS vulnerabilities."
        ]
      }
    ],
    questions: [
      {
        id: "q-proj-1",
        prompt: "Why is 'taskList.replaceChildren()' used at the beginning of 'renderTasks()'?",
        options: [
          { id: "pj1", label: "To clear out all old task DOM elements before re-rendering the updated list based on current state." },
          { id: "pj2", label: "To delete the tasks from localStorage permanently." },
          { id: "pj3", label: "To sort the tasks alphabetically." },
          { id: "pj4", label: "To submit the form." }
        ],
        correctIndex: 0,
        explanation: "Calling replaceChildren() without arguments clears all existing child nodes, ensuring a clean render of the current task list."
      },
      {
        id: "q-proj-2",
        prompt: "What does 'crypto.randomUUID()' provide when creating a new task?",
        options: [
          { id: "pj5", label: "A cryptographically secure, universally unique 36-character UUID string (e.g. 'c9bf9e57-1685-4c89-bafb-ff5af830be8a')." },
          { id: "pj6", label: "A random number between 0 and 1." },
          { id: "pj7", label: "The current system timestamp." },
          { id: "pj8", label: "A password hash." }
        ],
        correctIndex: 0,
        explanation: "crypto.randomUUID() is a standard modern browser API that generates unique UUIDs ideal for object identifiers."
      },
      {
        id: "q-proj-3",
        prompt: "Why is 'event.preventDefault()' critical in the task form submit handler?",
        options: [
          { id: "pj9", label: "Without it, the browser submits the form via HTTP GET/POST and reloads the page, wiping out in-memory state." },
          { id: "pj10", label: "To make the input field red." },
          { id: "pj11", label: "To prevent the user from typing." },
          { id: "pj12", label: "To delete all cookies." }
        ],
        correctIndex: 0,
        explanation: "Browser forms default to reloading or navigating the page on submit. Calling preventDefault() stops the reload so JavaScript can handle task creation smoothly."
      },
      {
        id: "q-proj-4",
        prompt: "Why is setting 'text.textContent = task.title' safer than 'text.innerHTML = task.title'?",
        options: [
          { id: "pj13", label: "It treats the title strictly as plain text, preventing Cross-Site Scripting (XSS) if a user types malicious HTML like '<img src=x onerror=alert(1)>'." },
          { id: "pj14", label: "textContent makes text bold." },
          { id: "pj15", label: "innerHTML is deprecated in HTML5." },
          { id: "pj16", label: "There is no security difference." }
        ],
        correctIndex: 0,
        explanation: "Using innerHTML interprets raw text as HTML, which allows script injection (XSS). textContent safely escapes user input as harmless plain text."
      },
      {
        id: "q-proj-5",
        prompt: "How does the filter dropdown show only active tasks without permanently deleting completed tasks?",
        options: [
          { id: "pj17", label: "It filters a temporary 'visibleTasks' array for display while leaving the master 'tasks' array intact in memory and storage." },
          { id: "pj18", label: "It deletes completed tasks and re-downloads them from the server." },
          { id: "pj19", label: "By setting display: none on CSS classes." },
          { id: "pj20", label: "By clearing the localStorage key." }
        ],
        correctIndex: 0,
        explanation: "The master 'tasks' array stores all tasks. The filter() method produces a separate filtered array for rendering, keeping the master state untouched."
      },
      {
        id: "q-proj-6",
        prompt: "What does 'tasks.filter(item => item.id !== task.id)' do when clicking Delete?",
        options: [
          { id: "pj21", label: "Returns a new array containing all tasks EXCEPT the one whose ID matches the deleted task." },
          { id: "pj22", label: "Deletes all tasks with the same title." },
          { id: "pj23", label: "Clears the entire tasks array." },
          { id: "pj24", label: "Throws an error if the item is not found." }
        ],
        correctIndex: 0,
        explanation: "Filtering by 'item.id !== task.id' creates a new array that retains every item except the target task, cleanly removing it from state."
      },
      {
        id: "q-proj-7",
        prompt: "Why is 'JSON.parse(localStorage.getItem(\"tasks\")) || []' used when initializing tasks?",
        options: [
          { id: "pj25", label: "It reconstructs stored tasks from JSON strings, or falls back to an empty array [] if localStorage has no saved data yet." },
          { id: "pj26", label: "It resets localStorage on every visit." },
          { id: "pj27", label: "It prevents other websites from reading storage." },
          { id: "pj28", label: "It forces the array to have 10 items." }
        ],
        correctIndex: 0,
        explanation: "If no data exists in localStorage, getItem() returns null. The logical OR (|| []) fallback ensures 'tasks' initializes as a valid array rather than null."
      },
      {
        id: "q-proj-8",
        prompt: "What event should you listen to on a '<select id=\"filter\">' dropdown to trigger re-rendering when the user chooses an option?",
        options: [
          { id: "pj29", label: "change" },
          { id: "pj30", label: "click" },
          { id: "pj31", label: "submit" },
          { id: "pj32", label: "hover" }
        ],
        correctIndex: 0,
        explanation: "The 'change' event fires whenever the user selects a different option in a dropdown or commits a new control value."
      },
      {
        id: "q-proj-9",
        prompt: "What does 'input.value.trim()' prevent when adding new tasks?",
        options: [
          { id: "pj33", label: "Prevents creating empty tasks or tasks containing only whitespace characters." },
          { id: "pj34", label: "Limits the task to 5 words." },
          { id: "pj35", label: "Converts text to uppercase." },
          { id: "pj36", label: "Removes punctuation marks." }
        ],
        correctIndex: 0,
        explanation: "trim() strips leading and trailing spaces. If a user presses Space several times and hits Enter, '   '.trim() evaluates to \"\", preventing blank tasks."
      },
      {
        id: "q-proj-10",
        prompt: "When does the 'change' event fire on a checkbox?",
        options: [
          { id: "pj37", label: "Whenever the user checks or unchecks the checkbox, updating its 'checked' boolean state." },
          { id: "pj38", label: "Only when the user unchecks it." },
          { id: "pj39", label: "Only on form submission." },
          { id: "pj40", label: "When the mouse hovers over it." }
        ],
        correctIndex: 0,
        explanation: "The 'change' event fires on checkboxes whenever their checked state transitions between true and false."
      }
    ]
  }
];
