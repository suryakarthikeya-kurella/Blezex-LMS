import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 6: PRODUCTION REACT AND PROJECT
// Lessons 124 - 127 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 124: REUSABLE ARCHITECTURE AND ENVIRONMENT VARIABLES
const lesson124: CurriculumItem = {
  id: "item-react-124-architecture-env-vars",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Module 6: Production React and Project",
  modulePosition: 6,
  title: "124. Reusable Architecture and Environment Variables",
  duration: "35 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 124: Reusable Architecture and Environment Variables",
  contentDescription: "Master enterprise folder architecture (feature-based organization, shared primitives, barrel exports), configuring environment variables securely across staging and production, and establishing clean dependency boundaries.",
  codeSnippet: {
    language: "bash",
    code: `# Standard Enterprise Feature-Based Folder Architecture
src/
├── app/                  # Application providers, global store, top router
│   ├── App.jsx
│   ├── router.jsx
│   └── store.js
├── features/             # Domain-specific feature modules
│   ├── auth/             # Authentication feature (components, hooks, api, slice)
│   │   ├── api/authApi.js
│   │   ├── components/LoginForm.jsx
│   │   ├── hooks/useAuth.js
│   │   └── index.js      # Public barrel export
│   └── courses/          # Courses feature module
│       ├── api/courseApi.js
│       ├── components/CourseCard.jsx
│       └── hooks/useCourses.js
├── shared/               # Reusable primitives across all features
│   ├── components/       # Design system primitives (Button, Modal, Input)
│   ├── hooks/            # Generic utilities (useDebounce, useLocalStorage)
│   └── utils/            # Pure helper functions (formatDate, formatCurrency)
└── assets/               # Static images, global typography & tokens`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Organizing a Supermarket vs a Messy Garage",
      explanation: "Imagine a chaotic garage where bicycle tires, milk cartons, garden hoses, and cereal boxes are dumped into one giant pile in the middle of the floor. Finding anything takes 30 minutes! In contrast, a modern supermarket is divided into clear departments: Produce, Bakery, Dairy, and Pharmacy. Each department has its own shelves, and shared equipment (like shopping carts) lives at the entrance. In production React, we organize files by 'Feature' (`features/courses/`, `features/auth/`), keeping related components, hooks, and API services co-located together, while generic components (`Button`, `Modal`) live in `shared/`.",
      bullets: [
        "Feature-Based Architecture: Co-locates everything a feature needs (UI, state, network calls) in one folder.",
        "Barrel Exports (`index.js`): Exposes clean public APIs for each feature while keeping internal helpers private.",
        "Environment Boundaries: Separate configurations for development, staging, and production."
      ]
    },
    {
      title: "2. The 3 Golden Rules of Reusable Architecture",
      explanation: "Best practices followed by top engineering teams:",
      table: {
        headers: ["Rule", "What It Dictates", "Why It Matters"],
        rows: [
          ["1. Co-locate by Feature", "Keep `CourseCard.jsx`, `useCourse.js`, and `courseApi.js` together in `features/courses/`", "Eliminates hopping across 10 folders to edit a single feature"],
          ["2. Shared Primitives", "Only place truly generic components (like `Button`, `Dialog`, `Input`) in `shared/`", "Prevents domain business logic from polluting generic UI primitives"],
          ["3. Explicit Environment Files", "Use `.env.development`, `.env.staging`, and `.env.production`", "Prevents accidentally pointing production users to localhost or staging databases"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Validating Environment Variables at Startup",
      explanation: "Never let an application boot up if a required environment variable is missing. Create an `env.js` validator:",
      bullets: [
        "Check Required Keys: `if (!import.meta.env.VITE_API_URL) throw new Error('Missing VITE_API_URL');`",
        "Type Safety: Convert numeric environment strings (like `VITE_PORT=3000`) into real integers before use.",
        "Fail Fast: Crashing immediately during startup is 100 times better than failing randomly during a student's checkout process!"
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these structural errors:",
      bullets: [
        "Organizing strictly by technical type (one giant `components/` folder with 300 files): Becomes unmaintainable in large apps.",
        "Circular Dependency Cycles: Feature A imports from Feature B, which imports from Feature A. Always extract common logic to `shared/`.",
        "Committing `.env.local` to Git: May contain personal staging credentials. Always add `.env.local` to `.gitignore`!"
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Refactor a flat React project into a feature-based folder tree with `features/auth/`, `features/courses/`, and `shared/components/`. Configure `.env.development` and `.env.production` files, and write an `env.js` helper that validates the existence of `VITE_API_BASE_URL` on app startup."
    }
  ],
  questions: [
    {
      id: "q-react-124-1",
      prompt: "What is 'feature-based' folder organization in large React codebases?",
      options: [
        { id: "a", label: "Co-locating components, hooks, API calls, and state slices together by domain feature (e.g. `features/courses/`) rather than splitting them into giant global folders" },
        { id: "b", label: "Putting all 500 files into a single folder" },
        { id: "c", label: "Deleting all CSS files" },
        { id: "d", label: "Writing all components inside `index.html`" }
      ],
      correctAnswer: "a",
      explanation: "Feature-based architecture clusters related code (UI, state, network) by domain responsibility, dramatically improving maintainability and code ownership."
    },
    {
      id: "q-react-124-2",
      prompt: "What is a 'barrel export' in modern JavaScript/React module architecture?",
      options: [
        { id: "a", label: "An `index.js` file that re-exports public components and functions from a folder, providing a clean unified import path" },
        { id: "b", label: "A build script that zips files" },
        { id: "c", label: "A function that deletes old branches" },
        { id: "d", label: "A Docker container" }
      ],
      correctAnswer: "a",
      explanation: "A barrel export (`export * from './CourseCard'`) enables clean imports like `import { CourseCard } from '@/features/courses'` instead of deeply nested file paths."
    },
    {
      id: "q-react-124-3",
      prompt: "Why should `.env.local` always be listed in `.gitignore`?",
      options: [
        { id: "a", label: "To prevent committing local overrides, developer credentials, or private configuration tokens to public Git repositories" },
        { id: "b", label: "Because Git cannot store text files" },
        { id: "c", label: "Because Vite deletes .env files" },
        { id: "d", label: "It is required for npm run build" }
      ],
      correctAnswer: "a",
      explanation: "`.env.local` is designed for developer-specific local machine overrides. Committing it risks credential leaks and cross-developer configuration conflicts."
    },
    {
      id: "q-react-124-4",
      prompt: "What is a circular dependency in module bundling, and how can you avoid it?",
      options: [
        { id: "a", label: "When Module A imports Module B, and Module B imports Module A; resolved by extracting the shared dependency into a common `shared/` module" },
        { id: "b", label: "When CSS colors repeat" },
        { id: "c", label: "When a loop runs forever" },
        { id: "d", label: "When two users have the same name" }
      ],
      correctAnswer: "a",
      explanation: "Circular dependencies cause undefined imports at runtime. Refactoring shared interfaces into a common layer eliminates the cycle."
    },
    {
      id: "q-react-124-5",
      prompt: "What type of components belong in `src/shared/components/`?",
      options: [
        { id: "a", label: "Domain-agnostic design system primitives (Button, Modal, Input, Badge) that have zero knowledge of specific business logic" },
        { id: "b", label: "Every component in the application" },
        { id: "c", label: "Only components with CSS animations" },
        { id: "d", label: "Only third-party npm packages" }
      ],
      correctAnswer: "a",
      explanation: "`shared/components/` contains reusable, generic UI building blocks that can be used in any feature without coupling to business rules."
    },
    {
      id: "q-react-124-6",
      prompt: "How can you validate required environment variables at application startup?",
      options: [
        { id: "a", label: "Export an `env.js` config file that checks `if (!import.meta.env.VITE_VAR) throw new Error(...)` during initial module evaluation" },
        { id: "b", label: "By testing on a mobile phone" },
        { id: "c", label: "By refreshing the web page" },
        { id: "d", label: "React validates environment variables automatically" }
      ],
      correctAnswer: "a",
      explanation: "A startup validation module fails fast if mandatory environment variables are missing, preventing hard-to-trace runtime errors later."
    },
    {
      id: "q-react-124-7",
      prompt: "What is the purpose of path aliasing (e.g. `@/components` instead of `../../../components`) in Vite?",
      options: [
        { id: "a", label: "It creates clean, absolute-like import paths from the `src/` directory, eliminating fragile relative dot-dot paths" },
        { id: "b", label: "It makes JavaScript run 10 times faster" },
        { id: "c", label: "It encrypts import statements" },
        { id: "d", label: "It is required for React" }
      ],
      correctAnswer: "a",
      explanation: "Configuring `resolve.alias` in `vite.config.js` allows using `@/` shortcuts, preventing broken imports when moving files."
    },
    {
      id: "q-react-124-8",
      prompt: "Why should you separate 'dumb' presentational components from 'smart' container components?",
      options: [
        { id: "a", label: "Presentational components only care about how things LOOK (props in, JSX out), making them pure, reusable, and easy to test" },
        { id: "b", label: "Because React only allows 1 smart component per app" },
        { id: "c", label: "Because dumb components do not use CSS" },
        { id: "d", label: "It is a requirement of JavaScript" }
      ],
      correctAnswer: "a",
      explanation: "Separating presentation from stateful logic creates modular, highly testable UI building blocks that can be easily previewed in Storybook."
    },
    {
      id: "q-react-124-9",
      prompt: "Which environment file is automatically loaded by Vite when running `npm run build`?",
      options: [
        { id: "a", label: "`.env.production`" },
        { id: "b", label: "`.env.development`" },
        { id: "c", label: "`.env.test`" },
        { id: "d", label: "`.env.backup`" }
      ],
      correctAnswer: "a",
      explanation: "Vite sets `mode = 'production'` during `npm run build`, causing it to load `.env.production` and apply production optimizations."
    },
    {
      id: "q-react-124-10",
      prompt: "What is the danger of creating a component that tries to do everything (fetch data, manage auth, handle navigation, and render UI)?",
      options: [
        { id: "a", label: "It violates the Single Responsibility Principle, making the component difficult to test, impossible to reuse, and fragile to maintain" },
        { id: "b", label: "It makes the computer shut down" },
        { id: "c", label: "The browser will refuse to render it" },
        { id: "d", label: "It is actually the recommended React pattern" }
      ],
      correctAnswer: "a",
      explanation: "'God components' become bloated nightmares. Decomposing into small components with single responsibilities creates robust, maintainable code."
    }
  ]
};

// LESSON 125: BUILD AND DEPLOYMENT
const lesson125: CurriculumItem = {
  id: "item-react-125-build-deployment",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Module 6: Production React and Project",
  modulePosition: 6,
  title: "125. Build and Deployment",
  duration: "35 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 125: Build and Deployment",
  contentDescription: "Master production bundling with Vite (npm run build, dist output), asset hashing, cache busting, local previewing (npm run preview), configuring single-page rewrites on Netlify/Vercel/Nginx, and CI/CD automation.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Execute Production Build
# Runs Vite build pipeline: tree-shaking, minification, CSS purging, and Rollup chunking
npm run build

# Expected Output:
# dist/index.html                   0.85 kB
# dist/assets/index-D7h4aK9e.css    12.40 kB
# dist/assets/index-B3k8sL2q.js     148.20 kB

# 2. Preview the Production Build Locally
# Spins up a static production preview server on localhost:4173 to test exact production behavior
npm run preview

# 3. Production SPA Server Rewrite (Nginx configuration snippet)
# location / {
#   try_files $uri $uri/ /index.html;
# }`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Printing and Shipping the Book",
      explanation: "Developing a React app with `npm run dev` is like writing a book manuscript on loose-leaf paper: you can erase words, shuffle paragraphs, and make live edits instantly. But you cannot ship loose-leaf notes to 100,000 customers! 'Building for Production' (`npm run build`) is the printing press: it compiles all your JSX, removes comments and whitespace (minification), removes unused code (tree-shaking), compresses CSS, and stamps a cryptographic hash onto every file (`index-B3k8sL2q.js`). Now your app is a collection of razor-sharp static files in the `dist/` folder, ready to be served from any global CDN in the world in 10 milliseconds!",
      bullets: [
        "Production Bundle: Minified, tree-shaken, and optimized static HTML, CSS, and JS output in `dist/`.",
        "Cache Busting: Unique content hashes (e.g. `main-C4j9x.js`) ensure users always download fresh updates when you release code, while letting browsers cache unchanged files forever.",
        "`npm run preview`: Simulates the real production server locally to catch deployment bugs before shipping."
      ]
    },
    {
      title: "2. The Build Pipeline Steps",
      explanation: "What happens when you run `npm run build`?",
      table: {
        headers: ["Step", "Tool / Action", "Result"],
        rows: [
          ["1. Type Check & Lint", "TypeScript `tsc --noEmit` and ESLint", "Catches type bugs and lint errors before bundling"],
          ["2. Tree-Shaking", "Rollup (inside Vite)", "Eliminates dead, unused functions from third-party libraries"],
          ["3. Minification", "esbuild / Terser", "Strips whitespace, renames variables to 1-letter names (`function a(b){...}`), reducing file size by 70%"],
          ["4. Asset Hashing", "Content-addressed filenames", "Generates `app-[hash].js` for optimal browser caching"],
          ["5. Output Directory", "Writes to `dist/`", "Pure static files ready for deployment to Vercel, Netlify, AWS S3, or Nginx"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: SPA Hosting Redirect Rules",
      explanation: "Because an SPA has only one physical file (`index.html`), cloud hosting platforms must be instructed to redirect all route requests to `index.html`:",
      bullets: [
        "Netlify (`_redirects` file in public/): `/*   /index.html   200`",
        "Vercel (`vercel.json`): `{ 'rewrites': [{ 'source': '/(.*)', 'destination': '/index.html' }] }`",
        "Nginx config: `try_files $uri $uri/ /index.html;`"
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these deployment mistakes:",
      bullets: [
        "Testing Only with Dev Server: `npm run dev` has different timing and error handling than production. Always test with `npm run preview` before pushing to production!",
        "Missing 404 Rewrite Configuration: Direct URL visits return '404 Not Found' after deployment because the host server is missing the SPA rewrite rule.",
        "Checking in the `dist/` folder: The `dist/` directory should NEVER be committed to Git. It should be built automatically by CI/CD on the deployment server."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Run `npm run build` on your project. Inspect the generated `dist/` directory and note the file sizes and hashed asset names. Run `npm run preview` to test the production build locally. Create a `_redirects` file for Netlify and verify that deep links survive page refresh."
    }
  ],
  questions: [
    {
      id: "q-react-125-1",
      prompt: "What does the command `npm run build` do in a Vite React project?",
      options: [
        { id: "a", label: "It compiles, minifies, tree-shakes, and bundles all source code and assets into an optimized production-ready `dist/` static directory" },
        { id: "b", label: "It starts the development server" },
        { id: "c", label: "It uploads files directly to GitHub" },
        { id: "d", label: "It deletes the database" }
      ],
      correctAnswer: "a",
      explanation: "`npm run build` invokes Vite's production pipeline, generating optimized static assets with minification and tree-shaking into `dist/`."
    },
    {
      id: "q-react-125-2",
      prompt: "What is the purpose of the `npm run preview` command?",
      options: [
        { id: "a", label: "To run a local static web server that serves the production `dist/` bundle so you can test production behavior before deploying" },
        { id: "b", label: "To preview the app on a mobile device via Bluetooth" },
        { id: "c", label: "To print the source code on a printer" },
        { id: "d", label: "To preview future versions of React" }
      ],
      correctAnswer: "a",
      explanation: "`npm run preview` serves your actual production build locally, allowing you to catch bundle, path, or environment issues prior to live release."
    },
    {
      id: "q-react-125-3",
      prompt: "Why do production asset files have random-looking hashes in their names (e.g. `index-B3k8sL2q.js`)?",
      options: [
        { id: "a", label: "For 'cache busting': browsers can cache files indefinitely, and whenever code changes, a new hash is generated, forcing browsers to download the update" },
        { id: "b", label: "To encrypt the file so hackers cannot read it" },
        { id: "c", label: "It is an error in Vite" },
        { id: "d", label: "To track user IP addresses" }
      ],
      correctAnswer: "a",
      explanation: "Content hashing ensures immutable caching headers: if the file hasn't changed, the browser uses the cached copy; if it changes, the new hash forces an update."
    },
    {
      id: "q-react-125-4",
      prompt: "What is 'tree-shaking' in modern JavaScript bundlers?",
      options: [
        { id: "a", label: "The process of analyzing ES module import/export statements and automatically discarding unused dead code from the final bundle" },
        { id: "b", label: "Shaking the computer to test responsiveness" },
        { id: "c", label: "Deleting old Git branches" },
        { id: "d", label: "A CSS shake animation" }
      ],
      correctAnswer: "a",
      explanation: "Tree-shaking relies on ES module static syntax to detect and remove unused exports, dramatically shrinking bundle size."
    },
    {
      id: "q-react-125-5",
      prompt: "Why must single-page applications configure a rewrite rule (e.g. `/* /index.html 200`) on cloud hosting platforms?",
      options: [
        { id: "a", label: "Because only `index.html` physically exists on the server disk; all client-side route paths must be served `index.html` so React Router can render them" },
        { id: "b", label: "Because HTML only supports 200 status codes" },
        { id: "c", label: "Because Vite only allows one page" },
        { id: "d", label: "To prevent users from using the Back button" }
      ],
      correctAnswer: "a",
      explanation: "Without an SPA rewrite rule, direct visits or refreshes to `/courses/react` return an HTTP 404 because no `/courses/react/index.html` file exists on the static server."
    },
    {
      id: "q-react-125-6",
      prompt: "Should the generated `dist/` or `build/` folder be checked into your Git repository?",
      options: [
        { id: "a", label: "No; compiled build output should be excluded via `.gitignore` and generated automatically by CI/CD during deployment" },
        { id: "b", label: "Yes, always commit the build folder" },
        { id: "c", label: "Only if you use GitHub Actions" },
        { id: "d", label: "Only if the project is open source" }
      ],
      correctAnswer: "a",
      explanation: "Generated artifacts pollute Git history and cause merge conflicts. Build artifacts should be generated by automated deployment pipelines."
    },
    {
      id: "q-react-125-7",
      prompt: "What does minification do to your JavaScript and CSS files during `npm run build`?",
      options: [
        { id: "a", label: "Removes whitespace, comments, shortens variable names, and optimizes expressions to drastically reduce download file sizes" },
        { id: "b", label: "Translates code into Spanish" },
        { id: "c", label: "Converts JavaScript into HTML" },
        { id: "d", label: "Deletes all console.log statements and shuts down the computer" }
      ],
      correctAnswer: "a",
      explanation: "Minification optimizes code density, transforming readable multi-line code into a compact, minimal payload for lightning-fast network transfer."
    },
    {
      id: "q-react-125-8",
      prompt: "What is a Content Delivery Network (CDN) and why is it ideal for deploying React static assets?",
      options: [
        { id: "a", label: "A globally distributed network of edge servers that caches static files close to the user's geographic location, providing near-instant loading times worldwide" },
        { id: "b", label: "A television channel that teaches coding" },
        { id: "c", label: "A type of SQL database" },
        { id: "d", label: "A private cable network" }
      ],
      correctAnswer: "a",
      explanation: "CDNs (like Cloudflare, Vercel Edge, AWS CloudFront) cache static assets globally, serving users from the closest geographic data center with minimal latency."
    },
    {
      id: "q-react-125-9",
      prompt: "What is Continuous Integration and Continuous Deployment (CI/CD)?",
      options: [
        { id: "a", label: "An automated pipeline that runs tests, checks linting, builds the project, and deploys it automatically on every Git commit or pull request" },
        { id: "b", label: "Typing code continuously without taking breaks" },
        { id: "c", label: "A computer hardware test" },
        { id: "d", label: "A certification exam" }
      ],
      correctAnswer: "a",
      explanation: "CI/CD automates quality gates (linting, testing) and production releases, ensuring that only verified, passing code reaches production users."
    },
    {
      id: "q-react-125-10",
      prompt: "How can you verify that your production bundle does not contain massive accidental dependencies?",
      options: [
        { id: "a", label: "Use a bundle visualizer plugin (like `rollup-plugin-visualizer`) to inspect a visual map of all package sizes in `dist/`" },
        { id: "b", label: "Open the file in Notepad and count the words" },
        { id: "c", label: "Delete package.json" },
        { id: "d", label: "Bundle size cannot be measured" }
      ],
      correctAnswer: "a",
      explanation: "Bundle visualizer plugins generate interactive treemaps of your production chunks, pinpointing oversized libraries that need optimization."
    }
  ]
};

// LESSON 126: FINAL REACT PROJECT
const lesson126: CurriculumItem = {
  id: "item-react-126-final-react-project",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Module 6: Production React and Project",
  modulePosition: 6,
  title: "126. Final React Project Architecture",
  duration: "35 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 126: Final React Project Architecture",
  contentDescription: "Understand assembling all concepts into an enterprise course management platform: routing, state management, API integration, accessible forms, performance memoization, test coverage, and deployment readiness.",
  codeSnippet: {
    language: "jsx",
    code: `// Enterprise End-to-End Course Catalog Architecture Flow
//
// [Browser Client]
//        |
//        v
// [React Router]: /courses?level=intermediate
//        |
//        v
// [CourseCatalog Component]
//        |-- useSearchParams(): Reads query & level filters
//        |-- useAuth(): Verifies user enrollment status
//        |-- useMemo(): Filters and sorts 500+ course records
//        |
//        v
// [API Client Service (courseApi.js)]
//        |-- fetch('/api/courses', { signal }) with AbortController
//        |-- Error Boundary catches network & rendering failures
//        |
//        v
// [Reusable UI Components]
//        |-- CourseCard (React.memo with accessible buttons)
//        |-- Controlled Enrollment Modal with useId form validation
//        |-- Suspense fallback for lazy-loaded Analytics view`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Building a Complete Modern Skyscraper",
      explanation: "Throughout this course, you have learned how to manufacture every individual component of a skyscraper: the foundation beams (JSX and components), the electrical wiring (state and useState), the plumbing and air ventilation (useEffect and data fetching), the elevator shafts (React Router), the secure keycard locks (Protected Routes), and the fire alarm circuit breakers (Error Boundaries). In Lesson 126, we don't just inspect loose pipes—we assemble the ENTIRE skyscraper! A complete, production-grade Course Management Platform where students can search, filter, enroll, review grades, and authenticate safely.",
      bullets: [
        "Architectural Harmony: Every tool has a dedicated role; no single component does everything.",
        "Predictable State: Clear separation between local UI state, shared global context, and remote server cache.",
        "Production Quality: Accessible, responsive, test-covered, and deployable with zero warnings."
      ]
    },
    {
      title: "2. The 7 Acceptance Criteria for the Final Project",
      explanation: "Your complete production React project must fulfill these 7 benchmarks:",
      table: {
        headers: ["Benchmark", "Requirement", "Technical Verification"],
        rows: [
          ["1. Public Catalog", "Search, category filters, and pagination", "`useSearchParams` with derived filtering"],
          ["2. Dynamic Details", "Individual detail view with route parameter", "`/courses/:id` using `useParams()`"],
          ["3. State Architecture", "Cart or enrollment state management", "Context + useReducer or Redux Toolkit slice"],
          ["4. Controlled Forms", "Enrollment / Review form with validation", "Controlled inputs with `useId` and accessible error text"],
          ["5. HTTP States", "Explicit visual states", "Loading spinner, error retry banner, empty state, success list"],
          ["6. Code Splitting", "Lazy-loaded dashboard routes", "`React.lazy()` with `<Suspense>` and `<ErrorBoundary>`"],
          ["7. Automated Tests", "Comprehensive user-behavior test suite", "Vitest + React Testing Library querying by accessible roles"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: End-to-End System Flow",
      explanation: "Trace data from user click to database and back:",
      bullets: [
        "1. Student clicks 'Enroll': Handler dispatches an enrollment action.",
        "2. API Service sends HTTPS request: Attached Bearer token verifies identity.",
        "3. Express Backend validates permission: Enrolls student in database.",
        "4. JSON response returns: React updates state, triggers celebratory toast, and updates enrollment badge."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Watch out for these final project mistakes:",
      bullets: [
        "Skipping Loading / Error States: An app that works only on fast Wi-Fi and crashes when offline is not production-ready.",
        "Inaccessible Forms: Missing `<label htmlFor>` connections.",
        "Committing Broken Builds: Always run `npm run build` locally to verify that TypeScript and Vite compile with zero errors before submission."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Deliver the completed application with a comprehensive README detailing project setup, architecture diagram, test execution commands (`npm test`), and deployment link on Vercel or Netlify."
    }
  ],
  questions: [
    {
      id: "q-react-126-1",
      prompt: "What is the primary objective of the Final React Project?",
      options: [
        { id: "a", label: "To synthesize all core React concepts (components, state, hooks, routing, API integration, optimization, testing) into an enterprise-grade application" },
        { id: "b", label: "To write 10,000 lines of CSS" },
        { id: "c", label: "To copy code from a blog post without understanding it" },
        { id: "d", label: "To memorize keyboard shortcuts" }
      ],
      correctAnswer: "a",
      explanation: "The capstone project demonstrates practical mastery by assembling all learned principles into an integrated, production-ready system."
    },
    {
      id: "q-react-126-2",
      prompt: "What are the four mandatory states that must be handled when integrating asynchronous APIs in the final project?",
      options: [
        { id: "a", label: "Loading state, Success state, Empty state, and Error state" },
        { id: "b", label: "Red, Yellow, Green, and Blue" },
        { id: "c", label: "HTML, CSS, JS, and JSON" },
        { id: "d", label: "Header, Nav, Main, and Footer" }
      ],
      correctAnswer: "a",
      explanation: "Explicitly handling loading, success, empty, and error states guarantees that users are never left confused by a blank or broken screen."
    },
    {
      id: "q-react-126-3",
      prompt: "How should authentication state be managed across the application?",
      options: [
        { id: "a", label: "Via a centralized `AuthContext` or Redux slice with persistent session recovery on mount and protected route guards" },
        { id: "b", label: "By saving passwords in component state in every file" },
        { id: "c", label: "Authentication should be skipped" },
        { id: "d", label: "By using alert boxes" }
      ],
      correctAnswer: "a",
      explanation: "A top-level AuthProvider provides consistent session tracking, token refresh, and login/logout capabilities across all views."
    },
    {
      id: "q-react-126-4",
      prompt: "Why should search filters and page numbers be synchronized with URL query parameters in the final project?",
      options: [
        { id: "a", label: "So students can bookmark their filtered catalog view, share links with friends, and retain active filters across page refresh" },
        { id: "b", label: "Because React Router requires all state in URLs" },
        { id: "c", label: "To increase server RAM" },
        { id: "d", label: "To prevent users from opening DevTools" }
      ],
      correctAnswer: "a",
      explanation: "URL-driven state makes application views shareable, linkable, and persistent across browser navigation."
    },
    {
      id: "q-react-126-5",
      prompt: "What ensures that form inputs in the final project are accessible to screen readers?",
      options: [
        { id: "a", label: "Associating each `<label>` with its `<input>` using matching `htmlFor` and `id` (using `useId`), along with `aria-describedby` for error text" },
        { id: "b", label: "Using colorful emojis" },
        { id: "c", label: "Making the placeholder text italic" },
        { id: "d", label: "Using sound effects on click" }
      ],
      correctAnswer: "a",
      explanation: "Proper label associations and ARIA attributes allow assistive technologies to communicate form controls clearly to all users."
    },
    {
      id: "q-react-126-6",
      prompt: "Why should code splitting with `React.lazy()` be used in the final project?",
      options: [
        { id: "a", label: "To split heavy features (like administration or analytics) into separate on-demand chunks, keeping the initial catalog load fast" },
        { id: "b", label: "Because Vite refuses to build without lazy loading" },
        { id: "c", label: "To delete unused components" },
        { id: "d", label: "To make the application run offline" }
      ],
      correctAnswer: "a",
      explanation: "Code splitting reduces the initial bundle size, drastically improving First Contentful Paint (FCP) and Time to Interactive (TTI)."
    },
    {
      id: "q-react-126-7",
      prompt: "What type of automated tests should be prioritized for the final project?",
      options: [
        { id: "a", label: "Component integration tests with React Testing Library that verify user journeys (searching, filtering, submitting forms)" },
        { id: "b", label: "Testing whether CSS colors are spelled correctly" },
        { id: "c", label: "Testing how many lines of code were written" },
        { id: "d", label: "Testing internal variable names" }
      ],
      correctAnswer: "a",
      explanation: "Integration tests focused on user journeys give the highest confidence that critical features work properly."
    },
    {
      id: "q-react-126-8",
      prompt: "What documentation should accompany a professional final React project repository?",
      options: [
        { id: "a", label: "A comprehensive README.md with project overview, architecture diagram, local setup instructions, test commands, and live deployment link" },
        { id: "b", label: "A blank file" },
        { id: "c", label: "Only the author's name" },
        { id: "d", label: "A link to YouTube" }
      ],
      correctAnswer: "a",
      explanation: "A polished README explains how to install dependencies, run development servers, execute tests, and understand the project's architecture."
    },
    {
      id: "q-react-126-9",
      prompt: "What must you verify before submitting the final project for review?",
      options: [
        { id: "a", label: "Run `npm run build` and `npm test` locally to confirm that TypeScript compiles cleanly, all tests pass, and zero build errors exist" },
        { id: "b", label: "Delete the node_modules folder" },
        { id: "c", label: "Shut down the laptop" },
        { id: "d", label: "Remove all comments" }
      ],
      correctAnswer: "a",
      explanation: "Verifying builds and tests locally catches broken syntax, missing imports, or failing assertions before code review."
    },
    {
      id: "q-react-126-10",
      prompt: "How does the finished React frontend communicate with backend services in a full-stack architecture?",
      options: [
        { id: "a", label: "By sending standardized HTTPS JSON requests to RESTful or GraphQL API endpoints configured via environment variables" },
        { id: "b", label: "By directly connecting to the PostgreSQL port 5432 from the browser" },
        { id: "c", label: "Through Bluetooth pairing" },
        { id: "d", label: "By writing to the server hard drive" }
      ],
      correctAnswer: "a",
      explanation: "The React frontend communicates over HTTP/HTTPS with backend APIs (e.g. Express), preserving security and separating concerns."
    }
  ]
};

// LESSON 127: REACT DEVTOOLS AND PROFILING
const lesson127: CurriculumItem = {
  id: "item-react-127-devtools-profiling",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Module 6: Production React and Project",
  modulePosition: 6,
  title: "127. React DevTools and Profiling",
  duration: "35 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lesson 127: React DevTools and Profiling",
  contentDescription: "Master inspecting component hierarchies with React Developer Tools, debugging state and props live in the browser, profiling render bottlenecks with Flamegraphs and Ranked charts, and measuring optimization improvements scientifically.",
  codeSnippet: {
    language: "jsx",
    code: `// Profiling Workflow in React Developer Tools:
// 
// 1. Open Chrome DevTools -> Click the "⚛ Profiler" tab
// 2. Click the gear icon (Settings) -> Check "Record why each component rendered"
// 3. Click the Blue "Record" button (Circle icon)
// 4. Perform the user interaction (e.g. type in the search bar, click enroll)
// 5. Click the Red "Stop" button
//
// 6. Inspect the Flamegraph / Ranked Chart:
//    - Gray bars: Component DID NOT re-render (Skipped / Memoized)
//    - Green / Yellow bars: Component re-rendered
//    - Hover over any component to see:
//      * Render Duration (e.g. 14.2ms)
//      * "Why did this render?": Shows changed props, hooks, or parent render`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Doctor's X-Ray Machine",
      explanation: "When you feel sick, a good doctor doesn't immediately open you up on the operating table with a surgical knife and guess what's wrong! They take an X-ray or an MRI first to see exactly where the problem is. 'React Developer Tools' is your hospital X-ray machine: the 'Components' tab lets you look inside any component to see its live props, state, and hooks in real time. And the 'Profiler' tab is your heart monitor: it records every heartbeat (render), measures how many milliseconds each component took to compute, and highlights in bright yellow the exact component that was running slow. You measure first, diagnose the real issue, make ONE targeted change, and verify the improvement!",
      bullets: [
        "Components Tab: Inspect and edit props, state, and context live in the browser without editing code.",
        "Profiler Tab: Record interactions to generate Flamegraph and Ranked performance charts.",
        "Scientific Optimization: Establish a baseline measurement -> Apply targeted fix -> Measure again -> Document the delta."
      ]
    },
    {
      title: "2. The Profiler Views Explained",
      explanation: "Understanding how to read React Profiler charts:",
      table: {
        headers: ["Profiler View", "Visual Representation", "What It Tells You"],
        rows: [
          ["Flamegraph Chart", "Nested horizontal bars showing component hierarchy", "Shows which subtrees took the longest time to render; wider bars mean longer render duration"],
          ["Ranked Chart", "Vertical bars sorted from slowest to fastest", "Instantly highlights the single most expensive component at the top of the chart"],
          ["'Why Did This Render?'", "Hover tooltip on any component", "Explicitly lists: 'Props changed: [onEnroll]' or 'Hook 2 changed: [count]'"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Highlighting Render Updates Live",
      explanation: "In React DevTools Settings, check 'Highlight updates when components render':",
      bullets: [
        "Visual Flashes: Components that re-render will flash with a colored border on screen in real time.",
        "Green Flash: Fast render that completed quickly.",
        "Yellow / Red Flash: Heavy render that took significant time.",
        "Detecting Wasteful Renders: If typing in an unrelated search box causes the entire navbar and footer to flash yellow, you have a wasteful re-render that can be isolated!"
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these profiling mistakes:",
      bullets: [
        "Profiling in Development Mode Only: Dev mode includes heavy React warning checks and is 2-5x slower than production. For accurate numbers, profile a production build with `npm run build` and profiling enabled (`--profile`).",
        "Optimizing Non-Bottlenecks: Spending 3 days memoizing a component that takes 0.2ms while ignoring a list component that takes 85ms.",
        "Guessing Instead of Measuring: Never assume you know where the bottleneck is without recording a Profiler trace."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Open React DevTools Profiler on a searchable course list of 1,000 items. Record a baseline trace while typing in the search box and record the render duration. Apply `useMemo` on the filter function and `React.memo` on the card items. Record a second trace and document the exact percentage improvement."
    }
  ],
  questions: [
    {
      id: "q-react-127-1",
      prompt: "What is the primary function of the 'Components' tab in React Developer Tools?",
      options: [
        { id: "a", label: "To inspect the live React component hierarchy, view and modify props, state, and hooks in real time directly in the browser" },
        { id: "b", label: "To edit HTML source files permanently on the server" },
        { id: "c", label: "To install npm packages" },
        { id: "d", label: "To check internet speed" }
      ],
      correctAnswer: "a",
      explanation: "The Components tab allows developers to inspect the Virtual DOM tree, examine live state/props, and test state changes interactively."
    },
    {
      id: "q-react-127-2",
      prompt: "What does the 'Profiler' tab in React DevTools measure?",
      options: [
        { id: "a", label: "How frequently components re-render and how many milliseconds each component takes to compute its render output" },
        { id: "b", label: "The user's social media profile" },
        { id: "c", label: "The temperature of the CPU" },
        { id: "d", label: "The number of lines of code" }
      ],
      correctAnswer: "a",
      explanation: "The Profiler records component render durations and frequencies, helping identify performance bottlenecks."
    },
    {
      id: "q-react-127-3",
      prompt: "What does a gray bar represent for a component in a React Profiler Flamegraph?",
      options: [
        { id: "a", label: "The component was completely skipped during this commit (it did not re-render)" },
        { id: "b", label: "The component crashed" },
        { id: "c", label: "The component was deleted" },
        { id: "d", label: "The component is written in CSS" }
      ],
      correctAnswer: "a",
      explanation: "Gray bars indicate that the component did not need to re-render during that specific commit, confirming that memoization worked."
    },
    {
      id: "q-react-127-4",
      prompt: "How can React DevTools tell you WHY a component re-rendered?",
      options: [
        { id: "a", label: "By enabling 'Record why each component rendered' in Profiler settings, then hovering over the component to see which props or hooks changed" },
        { id: "b", label: "By checking the browser history" },
        { id: "c", label: "By reading the package.json file" },
        { id: "d", label: "DevTools cannot explain render reasons" }
      ],
      correctAnswer: "a",
      explanation: "Enabling this setting reveals the exact reason for every re-render (e.g. 'Hook 1 changed' or 'Props changed: [filter]'), eliminating guesswork."
    },
    {
      id: "q-react-127-5",
      prompt: "Why is profiling in production mode (with profiling enabled) more accurate than development mode?",
      options: [
        { id: "a", label: "Because development mode runs extra debug checks, validations, and warnings that artificially inflate render times" },
        { id: "b", label: "Because development mode does not have a profiler" },
        { id: "c", label: "Because production mode runs on a different computer" },
        { id: "d", label: "There is no difference" }
      ],
      correctAnswer: "a",
      explanation: "Development builds are substantially slower due to runtime safety checks. Profiling a production build (`vite build --profile`) gives true performance metrics."
    },
    {
      id: "q-react-127-6",
      prompt: "What visual setting in React DevTools causes components to flash on screen whenever they re-render?",
      options: [
        { id: "a", label: "'Highlight updates when components render'" },
        { id: "b", label: "'Flash disco lights'" },
        { id: "c", label: "'Blink mode'" },
        { id: "d", label: "'CSS highlighter'" }
      ],
      correctAnswer: "a",
      explanation: "This setting renders colored outlines around components as they update, quickly exposing unintended or cascading re-renders."
    },
    {
      id: "q-react-127-7",
      prompt: "What does the 'Ranked Chart' in the Profiler show?",
      options: [
        { id: "a", label: "All rendered components sorted in descending order of render duration, placing the slowest components at the top" },
        { id: "b", label: "Student quiz scores" },
        { id: "c", label: "Course popularity" },
        { id: "d", label: "Alphabetical list of components" }
      ],
      correctAnswer: "a",
      explanation: "The Ranked chart sorts components by render duration, immediately highlighting which component took the most time to compute."
    },
    {
      id: "q-react-127-8",
      prompt: "What is the scientific workflow for optimizing React performance?",
      options: [
        { id: "a", label: "1. Measure baseline -> 2. Identify actual bottleneck with Profiler -> 3. Make ONE targeted change -> 4. Measure again to verify improvement" },
        { id: "b", label: "Wrap every single component in React.memo blindly" },
        { id: "c", label: "Delete all state variables" },
        { id: "d", label: "Rewrite the app in vanilla JavaScript" }
      ],
      correctAnswer: "a",
      explanation: "Scientific optimization relies on empirical measurement: establishing a baseline, isolating the bottleneck, applying a targeted fix, and validating results."
    },
    {
      id: "q-react-127-9",
      prompt: "What does the `$r` variable in Chrome DevTools Console represent when a component is selected in React DevTools?",
      options: [
        { id: "a", label: "A reference to the currently selected React component's Fiber node, props, and state" },
        { id: "b", label: "The current exchange rate of dollars" },
        { id: "c", label: "A random number" },
        { id: "d", label: "The root DOM node" }
      ],
      correctAnswer: "a",
      explanation: "Selecting a component in the React tree binds `$r` in the browser console, allowing interactive debugging of its props and state."
    },
    {
      id: "q-react-127-10",
      prompt: "What is an acceptable render time for a smooth 60 frames-per-second (fps) user interaction in a web browser?",
      options: [
        { id: "a", label: "Under 16 milliseconds per frame (1000ms / 60 frames = ~16.6ms)" },
        { id: "b", label: "5 seconds" },
        { id: "c", label: "1 minute" },
        { id: "d", label: "500 milliseconds" }
      ],
      correctAnswer: "a",
      explanation: "To maintain 60fps without dropped frames (jank), JavaScript execution, rendering, and painting must complete within a 16.6ms budget."
    }
  ]
};

// MODULE 6 QUIZ
const module06Quiz: CurriculumItem = {
  id: "item-react-mod06-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Module 6: Production React and Project",
  modulePosition: 6,
  title: "Module 6 Assessment: Production React MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 6 Quiz: Production Architecture & Optimization",
  contentDescription: "Evaluate your comprehensive mastery of production-grade React development: feature-based folder architecture, environment variables security, build optimization with Vite, asset hashing, tree-shaking, SPA deployment rewrites, and DevTools Profiler analysis.",
  questions: [
    ...(lesson124.questions || []).slice(0, 3),
    ...(lesson125.questions || []).slice(0, 3),
    ...(lesson126.questions || []).slice(0, 2),
    ...(lesson127.questions || []).slice(0, 2)
  ]
};

// MODULE 6 ASSESSMENT (LAB)
const module06Assessment: CurriculumItem = {
  id: "item-react-mod06-lab",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-06-production-project",
  moduleTitle: "Module 6: Production React and Project",
  modulePosition: 6,
  title: "Module 6 Lab: Production Build Audit & Profiler Benchmark",
  duration: "50 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 6 Lab Project: Production Build Audit & Profiler Benchmark",
  contentDescription: "Conduct a full production engineering audit: execute an optimized production build, inspect asset chunks, configure SPA server rewrite rules, and perform a scientific React DevTools profiling benchmark.",
  assignmentPrompt: {
    instructions: "Perform a production build and performance benchmark audit:\n1. Build & Measure: Run `npm run build` and document chunk sizes in `dist/`.\n2. Server Preview: Test the production bundle using `npm run preview` on `localhost:4173`.\n3. Profiler Benchmark: Open React DevTools Profiler, enable 'Record why each component rendered', and record a search interaction trace.\n4. Document Findings: Identify the single most expensive component in the Ranked chart and explain its render duration.\n5. Deployment Config: Write a deployment configuration file (`_redirects` or `vercel.json`) with an SPA rewrite rule.",
    deliverables: [
      "Verified production build output with minified hashed assets in dist/",
      "Profiler flamegraph trace report documenting render durations and component bottlenecks",
      "Production deployment configuration file ensuring deep link survival"
    ]
  }
};

export const reactModule06: CurriculumSubModule = {
  id: "module-react-06-production-project",
  subCourseId: "mod-react-essentials",
  title: "Module 6 — Production React and Project",
  description: "Structure production codebases, manage public/private environment variables, bundle with Vite, deploy SPAs, and profile with React DevTools.",
  position: 6,
  items: [
    lesson124,
    lesson125,
    lesson126,
    lesson127,
    module06Quiz,
    module06Assessment
  ]
};
