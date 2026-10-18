import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 4: ROUTING AND STATE ARCHITECTURE
// Lessons 114 - 118 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 114: CLIENT-SIDE ROUTING
const lesson114: CurriculumItem = {
  id: "item-react-114-client-side-routing",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-04-routing-architecture",
  moduleTitle: "Module 4: Routing and State Architecture",
  modulePosition: 4,
  title: "Client-Side Routing",
  duration: "35 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Client-Side Routing",
  contentDescription: "Understand Single Page Application (SPA) navigation, HTML5 History API (pushState, popstate), React Router DOM (Routes, Route, Link, NavLink, useNavigate, useParams), and 404 Not Found handling.",
  codeSnippet: {
    language: "jsx",
    code: `import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';

// 1. Navigation Header with active link styling
function NavigationBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}>
        Home
      </NavLink>
      <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}>
        Course Catalog
      </NavLink>
    </nav>
  );
}

// 2. Dynamic Route Component reading route parameters
function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="course-detail">
      <h2>Viewing Course ID: {courseId}</h2>
      <button onClick={() => navigate('/courses')} className="btn-back">
        ← Back to Catalog
      </button>
    </div>
  );
}

// 3. Application Route Tree with Catch-All 404
export function AppRouter() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <main className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseCatalogPage />} />
          {/* Dynamic route parameter :courseId */}
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Turning TV Channels vs Moving to a New House",
      explanation: "In traditional multi-page web applications (like websites from 2005), clicking a link was like packing all your furniture into moving trucks and driving to a brand new house: the browser screen flashes blank white, disconnects from the current page, downloads a whole new HTML document, re-parses all CSS, and re-executes all JavaScript from zero. But in a React Single Page Application (SPA) with Client-Side Routing, clicking a link is like changing the TV channel on your remote control! You never leave your living room: the frame stays in place, and only the show on the screen instantly switches. No blank screen, no full reloads!",
      bullets: [
        "SPA Navigation: The browser stays on the single `index.html` page; JavaScript updates the URL and swaps the active view component.",
        "HTML5 History API: Uses `window.history.pushState()` behind the scenes so the browser's Back and Forward buttons work normally.",
        "`<Link>` vs `<a>`: Never use raw `<a href='...'>` in React Router because it triggers a full browser reload. Always use `<Link to='...'>`."
      ]
    },
    {
      title: "Key React Router DOM Primitives",
      explanation: "The core components and hooks of React Router v6+:",
      table: {
        headers: ["Primitive", "Type", "Role & Usage"],
        rows: [
          ["`BrowserRouter`", "Component", "Top-level provider that connects React components to the browser's URL address bar"],
          ["`Routes` & `Route`", "Components", "Maps a URL path pattern (`/courses/:id`) to a React element (`<CourseDetail />`)"],
          ["`Link` / `NavLink`", "Components", "Declarative navigation links. `NavLink` provides an `isActive` state for highlighting active tabs"],
          ["`useParams()`", "Hook", "Extracts dynamic route parameters from the URL (e.g. `const { courseId } = useParams()`)"],
          ["`useNavigate()`", "Hook", "Programmatic navigation (e.g. redirecting after login or form submission: `navigate('/dashboard')`)"]
        ]
      }
    },
    {
      title: "Concept in Depth: Server Fallback Configuration",
      explanation: "A critical production requirement for SPAs: when a user directly navigates to `https://mysite.com/courses/react` or refreshes the page, the web server (Nginx, Netlify, Vercel) must be configured to serve `index.html` for all paths (`/*`). Without this redirect rule, the server returns an HTTP 404 because no physical file named `/courses/react` exists on the disk!",
      bullets: [
        "Server Rewrite Rule: Redirect all incoming requests to `/index.html` with a 200 OK status.",
        "Catch-All Route: Inside React, define `<Route path='*' element={<NotFound />} />` to handle genuinely invalid paths gracefully."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common routing pitfalls:",
      bullets: [
        "Using `<a href='/about'>`: Causes a full page refresh, wiping all in-memory React state. Always use `<Link to='/about'>`.",
        "Missing Catch-All Route: Omitting `<Route path='*' element={<NotFound />} />` leaves the screen blank when users mistype a URL.",
        "Forgetting Leading Slash: Writing `to='dashboard'` inside a nested route navigates relative to the current route (`/courses/dashboard`) rather than root (`/dashboard`)."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build a multi-view course browser with routes for `/` (Home), `/courses` (List), `/courses/:courseId` (Detail), and `*` (404 Page). Use `NavLink` to highlight the active menu item, and use `useNavigate` to provide a 'Return to Courses' button."
    }
  ],
  questions: [
    {
      id: "q-react-114-1",
      prompt: "What is client-side routing in a Single Page Application (SPA)?",
      options: [
        { id: "a", label: "Downloading a new HTML file from the web server for every link clicked" },
        { id: "b", label: "Intercepting URL changes via JavaScript and rendering different React components without requesting a full page reload from the server" },
        { id: "c", label: "Configuring a physical Wi-Fi hardware router" },
        { id: "d", label: "Using CSS media queries to resize images" }
      ],
      correctAnswer: "b",
      explanation: "Client-side routing updates the browser URL and renders matching components dynamically without fetching new HTML documents from the server."
    },
    {
      id: "q-react-114-2",
      prompt: "Why should you use React Router's `<Link to='/courses'>` instead of standard HTML `<a href='/courses'>`?",
      options: [
        { id: "a", label: "Because `<Link>` prevents full browser page reloads, preserving application state and providing instant navigation" },
        { id: "b", label: "Because `<a>` tags are deprecated in HTML5" },
        { id: "c", label: "Because `<Link>` can only be styled with CSS" },
        { id: "d", label: "There is no difference" }
      ],
      correctAnswer: "a",
      explanation: "Standard `<a>` tags cause the browser to unload the current document and request a new one, wiping React state. `<Link>` prevents this reload."
    },
    {
      id: "q-react-114-3",
      prompt: "Which hook is used to access dynamic route parameters (such as `:courseId` in `/courses/:courseId`)?",
      options: [
        { id: "a", label: "`useParams()`" },
        { id: "b", label: "`useLocation()`" },
        { id: "c", label: "`useRoute()`" },
        { id: "d", label: "`usePath()`" }
      ],
      correctAnswer: "a",
      explanation: "`useParams()` returns an object containing key/value pairs of dynamic parameters matched in the current `<Route path='.../:id'>`."
    },
    {
      id: "q-react-114-4",
      prompt: "How do you navigate programmatically (e.g., redirecting after login or form submission) in React Router v6+?",
      options: [
        { id: "a", label: "`window.location.href = '/dashboard'`" },
        { id: "b", label: "`const navigate = useNavigate(); navigate('/dashboard');`" },
        { id: "c", label: "`history.pushState('/dashboard')`" },
        { id: "d", label: "`router.redirect('/dashboard')`" }
      ],
      correctAnswer: "b",
      explanation: "`useNavigate()` returns a function that can programmatically push or replace route paths without a page refresh."
    },
    {
      id: "q-react-114-5",
      prompt: "What is the difference between `<Link>` and `<NavLink>` in React Router?",
      options: [
        { id: "a", label: "`<NavLink>` provides an `isActive` boolean callback to easily apply active CSS classes or styles to the current link" },
        { id: "b", label: "`<Link>` only works on desktop computers" },
        { id: "c", label: "`<NavLink>` requires an internet connection" },
        { id: "d", label: "`<Link>` is for external websites" }
      ],
      correctAnswer: "a",
      explanation: "`<NavLink>` is a specialized link component that automatically detects if its `to` path matches the current URL, simplifying navigation styling."
    },
    {
      id: "q-react-114-6",
      prompt: "What is the purpose of `<Route path='*' element={<NotFound />} />`?",
      options: [
        { id: "a", label: "It matches all routes simultaneously" },
        { id: "b", label: "It acts as a catch-all route for any URL that did not match previous routes, rendering a custom 404 page" },
        { id: "c", label: "It crashes the application" },
        { id: "d", label: "It disables routing" }
      ],
      correctAnswer: "b",
      explanation: "The wildcard path `*` matches any path that wasn't caught by earlier routes, rendering a helpful 404 Not Found screen."
    },
    {
      id: "q-react-114-7",
      prompt: "Why does refreshing a client-side routed page (e.g. `/courses/123`) return a server 404 error on unconfigured web servers?",
      options: [
        { id: "a", label: "Because the web server looks for a physical file named `/courses/123` on the disk and doesn't find it; the server must be configured to redirect all requests to `index.html`" },
        { id: "b", label: "Because React deletes the route on refresh" },
        { id: "c", label: "Because the browser deletes all cookies" },
        { id: "d", label: "Because Vite only supports one route" }
      ],
      correctAnswer: "a",
      explanation: "In an SPA, only `index.html` physically exists on disk. Production servers must rewrite unknown paths to `index.html` so React Router can handle them."
    },
    {
      id: "q-react-114-8",
      prompt: "What underlying browser API makes single-page navigation possible without full page refreshes?",
      options: [
        { id: "a", label: "HTML5 History API (`pushState` and `replaceState`)" },
        { id: "b", label: "WebGL Graphics API" },
        { id: "c", label: "Web Bluetooth API" },
        { id: "d", label: "Web Audio API" }
      ],
      correctAnswer: "a",
      explanation: "The HTML5 History API allows JavaScript to manipulate the browser URL and history stack programmatically without triggering a document reload."
    },
    {
      id: "q-react-114-9",
      prompt: "How can you pass state during programmatic navigation without showing it in the URL?",
      options: [
        { id: "a", label: "`navigate('/dashboard', { state: { fromLogin: true } })`" },
        { id: "b", label: "`navigate('/dashboard?state=true')`" },
        { id: "c", label: "`cookie.set('fromLogin', true)`" },
        { id: "d", label: "It is impossible in React Router" }
      ],
      correctAnswer: "a",
      explanation: "`useNavigate` accepts an options object with a `state` property, which can be retrieved on the target page via `useLocation().state`."
    },
    {
      id: "q-react-114-10",
      prompt: "Where must all `<Route>` components be nested in React Router v6?",
      options: [
        { id: "a", label: "Inside a `<Routes>` parent element" },
        { id: "b", label: "Inside a `<div>` tag" },
        { id: "c", label: "Inside a `<form>` tag" },
        { id: "d", label: "Directly in index.html" }
      ],
      correctAnswer: "a",
      explanation: "In React Router v6, all `<Route>` components must be direct children of a `<Routes>` container, which handles the path-matching logic."
    }
  ]
};

// LESSON 115: PROTECTED ROUTES AND AUTHENTICATION STATE
const lesson115: CurriculumItem = {
  id: "item-react-115-protected-routes-auth",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-04-routing-architecture",
  moduleTitle: "Module 4: Routing and State Architecture",
  modulePosition: 4,
  title: "Protected Routes and Authentication State",
  duration: "35 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Protected Routes and Authentication State",
  contentDescription: "Understand authentication vs authorization, client-side route guards, handling asynchronous auth resolution, redirecting with state return URLs, and why client-side route protection is NOT a substitute for server-side security.",
  codeSnippet: {
    language: "jsx",
    code: `import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// 1. Auth Context holding user session
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthResolving, setIsAuthResolving] = useState(true);

  useEffect(() => {
    // Check existing session token on mount
    const token = localStorage.getItem('blezex_token');
    if (token) {
      // Simulate verifying token with API
      setUser({ id: 'u1', name: 'Learner', role: 'student' });
    }
    setIsAuthResolving(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('blezex_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('blezex_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthResolving, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// 2. ProtectedRoute Guard Component
export function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthResolving } = useAuth();
  const location = useLocation();

  // State 1: Session verification in flight
  if (isAuthResolving) {
    return <div className="auth-spinner">Verifying credentials…</div>;
  }

  // State 2: Unauthenticated user -> Redirect to /login and preserve intended URL
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // State 3: Unauthorized role -> Access Denied
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="forbidden">403 Forbidden: Insufficient Permissions</div>;
  }

  // State 4: Authorized -> Render child route outlet
  return <Outlet />;
}`
  },
  sections: [
    {
      title: "Core Concept: The VIP Velvet Rope vs The Bank Vault",
      explanation: "Imagine a high-end club. A 'Protected Route' in React is like the velvet rope at the front door. If you don't have a VIP badge, the bouncer politely points you toward the ticket counter (`/login`). It creates a smooth, pleasant experience for guests. But NEVER forget: client-side JavaScript runs on the user's computer! A clever hacker can open Chrome DevTools, change `user.role = 'admin'` in memory, and bypass the velvet rope in 2 seconds! That is why the REAL security happens at the Bank Vault door: the backend server API. Every sensitive request must verify the JWT token on the server before handing over any data!",
      bullets: [
        "Authentication (AuthN): Verifying WHO the user is (identity check).",
        "Authorization (AuthZ): Verifying WHAT the user is permitted to do (permissions and roles).",
        "Golden Rule of Web Security: Hiding a button or route in React is a UX feature, NOT a security control. Server-side authorization is mandatory."
      ]
    },
    {
      title: "The 4 States of Authentication Routing",
      explanation: "A robust protected route guard must handle 4 distinct lifecycle states:",
      table: {
        headers: ["Authentication State", "Condition", "Component Action"],
        rows: [
          ["1. Resolving Session", "`isAuthResolving === true`", "Show loading indicator; DO NOT redirect prematurely!"],
          ["2. Unauthenticated", "`!user`", "Redirect to `/login` with `state={{ from: location }}` to preserve return target"],
          ["3. Unauthorized Role", "`user.role !== allowedRole`", "Render 403 Forbidden page or redirect to generic dashboard"],
          ["4. Authorized", "`user && authorized`", "Render `<Outlet />` allowing access to private dashboard views"]
        ]
      }
    },
    {
      title: "Concept in Depth: Preserving the Return URL",
      explanation: "When an unauthenticated user attempts to bookmark `https://mysite.com/courses/react/exam` and is redirected to `/login`, preserving `state={{ from: location }}` lets your login form redirect them right back to their intended exam after successful sign-in instead of stranding them on the home page.",
      bullets: [
        "In ProtectedRoute: `<Navigate to='/login' state={{ from: location }} replace />`",
        "In LoginPage: `const target = location.state?.from?.pathname || '/dashboard'; navigate(target);`"
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these security and UX bugs:",
      bullets: [
        "Redirecting before session check resolves: If you redirect to `/login` while the auth token is still being read from storage, authenticated users get kicked to login on every page refresh!",
        "Trusting Client Flags for Security: Sending a request to `/api/admin/delete-course` without verifying the user's role on the Express server.",
        "Storing Raw Passwords: Never store passwords in client state or localStorage. Only store short-lived JWT tokens or HTTP-only cookies."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create an `AdminRoute` component that protects `/admin/courses`. Allow only users with `role: 'admin'` to enter. Test that regular students are shown an accessible 'Access Denied: Admin privileges required' banner, and verify that unauthenticated users are redirected to `/login`."
    }
  ],
  questions: [
    {
      id: "q-react-115-1",
      prompt: "Why is client-side route protection (like `<ProtectedRoute />`) NOT a true security control on its own?",
      options: [
        { id: "a", label: "Because React only works on Android devices" },
        { id: "b", label: "Because client-side JavaScript runs in the user's browser, where an attacker can inspect, modify variables, or bypass client guards; the backend API must verify authorization for every request" },
        { id: "c", label: "Because CSS overrides route guards" },
        { id: "d", label: "Because client routing does not support passwords" }
      ],
      correctAnswer: "b",
      explanation: "All client code can be manipulated via browser developer tools. True security boundaries exist solely on the server and database."
    },
    {
      id: "q-react-115-2",
      prompt: "What is the difference between Authentication (AuthN) and Authorization (AuthZ)?",
      options: [
        { id: "a", label: "Authentication verifies WHO you are (identity); Authorization determines WHAT you are allowed to do (permissions/roles)" },
        { id: "b", label: "They are completely identical terms" },
        { id: "c", label: "Authentication is for CSS; Authorization is for HTML" },
        { id: "d", label: "Authentication is for databases; Authorization is for browsers" }
      ],
      correctAnswer: "a",
      explanation: "Authentication proves user identity (e.g. valid password or token), while authorization governs whether that identity has permission to perform an action."
    },
    {
      id: "q-react-115-3",
      prompt: "What will happen if your protected route does NOT check an `isLoadingSession` flag while reading tokens asynchronously on page refresh?",
      options: [
        { id: "a", label: "The user will be immediately and incorrectly redirected to the login page before the token has finished loading" },
        { id: "b", label: "The user will automatically become an administrator" },
        { id: "c", label: "The browser will delete all files" },
        { id: "d", label: "The page will freeze forever" }
      ],
      correctAnswer: "a",
      explanation: "If you don't show a loading spinner while session resolution is in flight, the guard sees `user === null` and immediately boots the user to `/login`."
    },
    {
      id: "q-react-115-4",
      prompt: "What does the `<Navigate replace />` prop do when redirecting an unauthenticated user?",
      options: [
        { id: "a", label: "It replaces the current entry in the history stack so clicking the browser Back button won't loop them back to the protected page" },
        { id: "b", label: "It replaces all CSS files" },
        { id: "c", label: "It changes the browser font" },
        { id: "d", label: "It deletes the user's account" }
      ],
      correctAnswer: "a",
      explanation: "`replace` overwrites the current history entry rather than pushing a new one, preventing frustrating Back-button redirect loops."
    },
    {
      id: "q-react-115-5",
      prompt: "What React Router component renders child route elements inside a layout or protected guard?",
      options: [
        { id: "a", label: "`<Outlet />`" },
        { id: "b", label: "`<Portal />`" },
        { id: "c", label: "`<Children />`" },
        { id: "d", label: "`<View />`" }
      ],
      correctAnswer: "a",
      explanation: "`<Outlet />` acts as a placeholder where child route components are dynamically injected and rendered within parent route layouts."
    },
    {
      id: "q-react-115-6",
      prompt: "How can you pass the user's intended target URL to the login page when redirecting?",
      options: [
        { id: "a", label: "`<Navigate to='/login' state={{ from: location }} />`" },
        { id: "b", label: "`localStorage.setItem('url', location)`" },
        { id: "c", label: "`window.target = location`" },
        { id: "d", label: "By sending an SMS" }
      ],
      correctAnswer: "a",
      explanation: "Passing `{ state: { from: location } }` preserves the intended path in React Router's location state, enabling post-login redirect."
    },
    {
      id: "q-react-115-7",
      prompt: "Where should sensitive authentication tokens (like JWTs) ideally be stored to prevent Cross-Site Scripting (XSS) theft?",
      options: [
        { id: "a", label: "In an HTTP-Only, Secure, SameSite cookie set by the backend server" },
        { id: "b", label: "In a public global JavaScript variable" },
        { id: "c", label: "In a text file on the desktop" },
        { id: "d", label: "Inside the HTML `<meta>` tag" }
      ],
      correctAnswer: "a",
      explanation: "HTTP-Only cookies cannot be read by client-side JavaScript, rendering them immune to extraction via XSS vulnerabilities."
    },
    {
      id: "q-react-115-8",
      prompt: "What HTTP status code represents an unauthorized client who lacks permission to access a specific resource?",
      options: [
        { id: "a", label: "403 Forbidden" },
        { id: "b", label: "200 OK" },
        { id: "c", label: "301 Moved Permanently" },
        { id: "d", label: "502 Bad Gateway" }
      ],
      correctAnswer: "a",
      explanation: "HTTP 403 Forbidden indicates the server understands who the caller is, but refuses authorization for the requested operation."
    },
    {
      id: "q-react-115-9",
      prompt: "What should happen to client-side state when a user clicks 'Log Out'?",
      options: [
        { id: "a", label: "Clear tokens from storage, reset user state to null, clear cached queries/data, and redirect to login or home" },
        { id: "b", label: "Only hide the navbar" },
        { id: "c", label: "Reload the page 5 times" },
        { id: "d", label: "Leave all private student data in memory" }
      ],
      correctAnswer: "a",
      explanation: "A clean logout clears authentication tokens, resets user state, flushes cached data, and redirects to public pages to prevent data leakage."
    },
    {
      id: "q-react-115-10",
      prompt: "Can a user bypass client-side role checks by modifying their JWT token in localStorage?",
      options: [
        { id: "a", label: "They can modify the client payload, but the backend server will reject it because the cryptographic signature will be invalid" },
        { id: "b", label: "Yes, they can make themselves admin on the database" },
        { id: "c", label: "No, localStorage is encrypted by Windows" },
        { id: "d", label: "Tokens cannot be modified" }
      ],
      correctAnswer: "a",
      explanation: "Tampering with a JWT payload breaks its cryptographic signature. Any properly configured backend will immediately reject the forged token."
    }
  ]
};

// LESSON 116: CONTEXT API AND REDUX TOOLKIT
const lesson116: CurriculumItem = {
  id: "item-react-116-context-vs-redux-toolkit",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-04-routing-architecture",
  moduleTitle: "Module 4: Routing and State Architecture",
  modulePosition: 4,
  title: "Context API and Redux Toolkit",
  duration: "35 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Context API and Redux Toolkit",
  contentDescription: "Understand architectural tradeoffs between React Context and Redux Toolkit (RTK), configuring global stores, creating slices with createSlice, dispatching actions, and choosing the right tool for local UI, global client state, and server cache.",
  codeSnippet: {
    language: "jsx",
    code: `// Redux Toolkit Architecture Pattern
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Create Slice with automated action creators and Immer immutability
const courseSlice = createSlice({
  name: 'courses',
  initialState: { enrolledIds: [], filter: 'all' },
  reducers: {
    enrollCourse: (state, action) => {
      // Immer allows direct mutable syntax under the hood!
      if (!state.enrolledIds.includes(action.payload)) {
        state.enrolledIds.push(action.payload);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { enrollCourse, setFilter } = courseSlice.actions;

// 2. Configure Global Store
export const store = configureStore({
  reducer: {
    courses: courseSlice.reducer
  }
});

// 3. Component consuming slice with useSelector & useDispatch
function CourseEnrollButton({ courseId }) {
  const dispatch = useDispatch();
  const isEnrolled = useSelector(state => state.courses.enrolledIds.includes(courseId));

  return (
    <button
      onClick={() => dispatch(enrollCourse(courseId))}
      disabled={isEnrolled}
      className={isEnrolled ? 'btn-enrolled' : 'btn-enroll'}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll Now'}
    </button>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Family Whiteboard vs Enterprise Central Dispatch",
      explanation: "Imagine a cozy family living room. If mom wants to tell everyone what time dinner is, she writes it on the kitchen whiteboard (React Context). It's simple, built-in, costs zero dollars, and everyone sees it. But imagine a bustling airport with 500 airplanes, baggage handlers, fuel trucks, and pilots. If people try to coordinate an entire airport using a single kitchen whiteboard, everyone will constantly bump into each other! That is when you need Redux Toolkit: a professional air-traffic control tower with centralized flight logs, strict flight plan actions (`dispatch`), automated recording, and middleware logging!",
      bullets: [
        "React Context: Built-in, low ceremony; best for low-frequency updates like Theme, Locale, and Auth.",
        "Redux Toolkit (RTK): Predictable enterprise state container with time-travel DevTools, action tracing, and fine-grained selector re-render optimization.",
        "Server Cache: Neither Context nor Redux is ideal for raw API caching; use TanStack Query or RTK Query for server state."
      ]
    },
    {
      title: "The Decision Matrix: Local State vs Context vs Redux",
      explanation: "Where should your application state live?",
      table: {
        headers: ["State Type", "Best Tool", "Examples"],
        rows: [
          ["Local UI State", "`useState` / `useReducer`", "Form inputs, modal open/close, accordion toggles, dropdown active"],
          ["Subtree / Static State", "React Context", "Theme (light/dark), current language, authenticated user profile"],
          ["Complex Global State", "Redux Toolkit (RTK)", "E-commerce shopping cart, complex audio/video editor timeline, cross-screen workflows"],
          ["Server Data Cache", "TanStack Query / RTK Query", "Course lists, search results, pagination, polling, background sync"]
        ]
      }
    },
    {
      title: "Concept in Depth: Redux Toolkit Features",
      explanation: "Modern Redux is drastically simpler than old 'vanilla Redux' from 2016:",
      bullets: [
        "`createSlice`: Automatically generates action creators and action types from your reducer functions.",
        "Immer Integration: Write `state.items.push(item)` inside reducers without violating immutability; Immer creates the frozen copy automatically.",
        "`useSelector`: Subscribes to specific slices of state with strict equality checks, preventing unnecessary re-renders of unrelated components."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these state architecture mistakes:",
      bullets: [
        "Putting Every Input into Redux: Creating actions for every single character typed in a text box. Keep form input local to the component!",
        "Ignoring Server State Tools: Manually writing 50 Redux actions (`FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`) when TanStack Query or RTK Query handles it in 3 lines.",
        "Mutating Outside Redux Reducers: Mutating objects inside `useSelector` or event handlers."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create an RTK slice for a student course cart with actions `addItem`, `removeItem`, and `clearCart`. Connect the store using `<Provider store={store}>`. Build a cart badge in the header that displays the item count using `useSelector`, and an enrollment button that dispatches `addItem`."
    }
  ],
  questions: [
    {
      id: "q-react-116-1",
      prompt: "What is the primary difference between React Context and Redux Toolkit?",
      options: [
        { id: "a", label: "Context is a built-in dependency injection mechanism; Redux Toolkit is a dedicated state management library with action tracing, middleware, and optimized selector subscriptions" },
        { id: "b", label: "Context only works on servers; Redux works in browsers" },
        { id: "c", label: "Redux has been deprecated and banned by Meta" },
        { id: "d", label: "Context requires paying a monthly license" }
      ],
      correctAnswer: "a",
      explanation: "Context is a prop-passing mechanism built into React. Redux Toolkit provides an enterprise architectural pattern with predictable actions, reducers, and DevTools."
    },
    {
      id: "q-react-116-2",
      prompt: "How does `useSelector` in Redux optimize component re-rendering compared to `useContext`?",
      options: [
        { id: "a", label: "`useSelector` only triggers a re-render if the specific value returned by the selector changes (by reference); `useContext` re-renders whenever ANY part of the context value changes" },
        { id: "b", label: "`useSelector` prevents all renders forever" },
        { id: "c", label: "`useSelector` deletes unused components" },
        { id: "d", label: "They have identical rendering behavior" }
      ],
      correctAnswer: "a",
      explanation: "`useSelector` subscribes to fine-grained state slices. If another slice changes, the component does not re-render. Context re-renders all consumers on any change."
    },
    {
      id: "q-react-116-3",
      prompt: "What does `createSlice` in Redux Toolkit do?",
      options: [
        { id: "a", label: "It slices an array into 3 pieces" },
        { id: "b", label: "It generates a reducer, state slice, and corresponding action creators automatically from a single definition" },
        { id: "c", label: "It divides the screen into multiple windows" },
        { id: "d", label: "It splits CSS files" }
      ],
      correctAnswer: "b",
      explanation: "`createSlice` packages the initial state, reducer functions, and action creators into a concise, unified configuration."
    },
    {
      id: "q-react-116-4",
      prompt: "Why can you write 'mutating' code like `state.todos.push(action.payload)` inside a Redux Toolkit reducer?",
      options: [
        { id: "a", label: "Because Redux Toolkit integrates Immer internally, which detects mutations and safely creates an immutable copy behind the scenes" },
        { id: "b", label: "Because JavaScript now allows direct state mutations" },
        { id: "c", label: "Because Redux ignores immutability" },
        { id: "d", label: "It only works if you use class components" }
      ],
      correctAnswer: "a",
      explanation: "Redux Toolkit uses Immer to wrap reducers. You can write simple mutating syntax, and Immer generates safe immutable updates automatically."
    },
    {
      id: "q-react-116-5",
      prompt: "Which tool is best suited for caching remote API data, background synchronization, and server pagination in modern React?",
      options: [
        { id: "a", label: "TanStack Query (React Query) or RTK Query" },
        { id: "b", label: "Vanilla useState with 10 variables" },
        { id: "c", label: "A global window object" },
        { id: "d", label: "CSS Variables" }
      ],
      correctAnswer: "a",
      explanation: "Dedicated server-state libraries like TanStack Query and RTK Query automate caching, deduplication, retries, and invalidation far better than hand-rolled state."
    },
    {
      id: "q-react-116-6",
      prompt: "Where should the ephemeral state of a text input box (while the user is actively typing) live?",
      options: [
        { id: "a", label: "In the local component state using `useState`" },
        { id: "b", label: "In the global Redux store" },
        { id: "c", label: "In a PostgreSQL database" },
        { id: "d", label: "In a global Context" }
      ],
      correctAnswer: "a",
      explanation: "Local UI state (like active typing) belongs in local `useState`. Dispatching global actions on every keystroke causes unnecessary overhead."
    },
    {
      id: "q-react-116-7",
      prompt: "What Redux feature allows developers to inspect every dispatched action, state diff, and travel backward through time?",
      options: [
        { id: "a", label: "Redux DevTools Extension" },
        { id: "b", label: "Browser Task Manager" },
        { id: "c", label: "Windows Event Viewer" },
        { id: "d", label: "GitHub Actions" }
      ],
      correctAnswer: "a",
      explanation: "The Redux DevTools browser extension records all dispatched actions, displays visual state diffs, and lets developers replay or rewind state."
    },
    {
      id: "q-react-116-8",
      prompt: "What is an action in Redux?",
      options: [
        { id: "a", label: "A plain JavaScript object that describes what happened (containing a `type` and optional `payload`)" },
        { id: "b", label: "A physical mouse click" },
        { id: "c", label: "A database index" },
        { id: "d", label: "A CSS transition effect" }
      ],
      correctAnswer: "a",
      explanation: "Actions are plain objects (e.g. `{ type: 'cart/addItem', payload: course }`) that represent an event or user intent."
    },
    {
      id: "q-react-116-9",
      prompt: "What is the role of `configureStore` in Redux Toolkit?",
      options: [
        { id: "a", label: "It combines slice reducers, enables Redux DevTools, and sets up sensible default middleware (including redux-thunk)" },
        { id: "b", label: "It creates an e-commerce website automatically" },
        { id: "c", label: "It purchases cloud servers" },
        { id: "d", label: "It compiles JSX into HTML" }
      ],
      correctAnswer: "a",
      explanation: "`configureStore` simplifies store setup, automatically wiring together reducers, middleware (thunk), and development tools."
    },
    {
      id: "q-react-116-10",
      prompt: "When is introducing Redux Toolkit UNNECESSARY in a React project?",
      options: [
        { id: "a", label: "When the application is small-to-medium and state can be managed comfortably with `useState`, `useReducer`, and React Context" },
        { id: "b", label: "When the project uses TypeScript" },
        { id: "c", label: "When you have more than 2 components" },
        { id: "d", label: "Redux is always mandatory for every React app" }
      ],
      correctAnswer: "a",
      explanation: "Do not add Redux prematurely. Many applications never need external state libraries if built-in React primitives suffice."
    }
  ]
};

// LESSON 117: NESTED ROUTES AND SHARED LAYOUTS
const lesson117: CurriculumItem = {
  id: "item-react-117-nested-routes-layouts",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-04-routing-architecture",
  moduleTitle: "Module 4: Routing and State Architecture",
  modulePosition: 4,
  title: "Nested Routes and Shared Layouts",
  duration: "35 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Nested Routes and Shared Layouts",
  contentDescription: "Master nested route hierarchies in React Router, building persistent dashboard shells (sidebars, navbars, breadcrumbs) with Outlet, relative routing paths, and index routes.",
  codeSnippet: {
    language: "jsx",
    code: `import React from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';

// 1. Dashboard Layout Shell: Persistent Sidebar & Header
function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <h3>BlezeX Student Hub</h3>
        <nav>
          {/* Relative links to child routes */}
          <NavLink to="courses" className={({ isActive }) => isActive ? 'active' : ''}>
            My Courses
          </NavLink>
          <NavLink to="grades" className={({ isActive }) => isActive ? 'active' : ''}>
            Grades & Quizzes
          </NavLink>
          <NavLink to="settings" className={({ isActive }) => isActive ? 'active' : ''}>
            Account Settings
          </NavLink>
        </nav>
      </aside>

      <div className="main-content">
        <header className="dashboard-header">Welcome back, Student!</header>
        {/* Child route content renders HERE inside <Outlet /> */}
        <section className="dashboard-body">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

// 2. Route Configuration using Nested Routes
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicHomePage />} />

      {/* Parent Route with Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Index route: renders when URL is exactly /dashboard */}
        <Route index element={<DashboardOverview />} />
        {/* Child routes: paths are relative (matches /dashboard/courses) */}
        <Route path="courses" element={<StudentCourses />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>
    </Routes>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: The Picture Frame and Photo Slides",
      explanation: "Imagine a beautiful wooden picture frame mounted on your wall. Inside the frame is a sidebar with menu buttons, a top header with your profile picture, and in the middle, a glass window (`<Outlet />`). When you navigate between 'My Courses', 'Grades', and 'Settings', the wooden frame, the sidebar, and the header NEVER move, redraw, or flicker! Only the photograph behind the glass window changes. 'Nested Routes' let you build persistent application shells so your users never feel jarring UI jumps when switching tabs.",
      bullets: [
        "Persistent Layout: Header, navigation sidebar, and breadcrumbs stay mounted across route changes.",
        "`<Outlet />`: The slot where the active child component appears.",
        "`index` Route: The default content displayed when the user visits the parent URL directly."
      ]
    },
    {
      title: "Relative Paths in Nested Routes",
      explanation: "Notice the difference in path definitions between parent and child routes:",
      table: {
        headers: ["Route Type", "Path Definition", "Full Matched URL in Browser"],
        rows: [
          ["Parent Route", "`path='/dashboard'`", "`/dashboard`"],
          ["Default Child", "`index`", "`/dashboard` (renders default overview)"],
          ["Relative Child", "`path='courses'` (No leading slash)", "`/dashboard/courses`"],
          ["Nested Param Child", "`path='courses/:id'`", "`/dashboard/courses/react-101`"]
        ]
      }
    },
    {
      title: "Concept in Depth: Preserving Scroll and State in Layouts",
      explanation: "Because `DashboardLayout` remains mounted while navigating between child routes, any state inside `DashboardLayout` (like a collapsed sidebar toggle or an active chat drawer) is completely preserved. Only the child component inside `<Outlet />` unmounts and remounts.",
      bullets: [
        "No Layout Flickering: Media players or video streams in the sidebar continue playing uninterrupted while navigating child content.",
        "Outlet Context: Parents can pass data down to any rendered child outlet via `<Outlet context={{ user, role }} />` and read it in children using `useOutletContext()`."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Watch out for these nested route errors:",
      bullets: [
        "Forgetting `<Outlet />`: Defining nested routes in JSX without putting `<Outlet />` inside the parent layout component renders a blank area for all child routes.",
        "Accidental Leading Slashes: Writing `path='/courses'` inside a `/dashboard` parent route. A leading slash means root `/courses`, not `/dashboard/courses`!",
        "Missing `index` route: Leaving the parent URL `/dashboard` with an empty outlet."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build a `CourseAdminShell` layout with a persistent left sidebar containing links for 'Overview', 'Curriculum', and 'Analytics'. Use `<Outlet />` to render each sub-page, configure an `index` route for the overview, and verify that toggling a 'Dark Mode' switch in the sidebar preserves its state when switching between child tabs."
    }
  ],
  questions: [
    {
      id: "q-react-117-1",
      prompt: "What is the primary benefit of nested routes and shared layouts in React Router?",
      options: [
        { id: "a", label: "They eliminate duplicate layout code by allowing persistent shells (like sidebars and navbars) to stay mounted while child views change" },
        { id: "b", label: "They speed up internet download speeds" },
        { id: "c", label: "They convert CSS files into JavaScript" },
        { id: "d", label: "They make databases redundant" }
      ],
      correctAnswer: "a",
      explanation: "Nested routes enable hierarchical UIs where parent layouts remain mounted and only the content inside the child outlet updates."
    },
    {
      id: "q-react-117-2",
      prompt: "What component must be included in a parent layout component to render its matched child route?",
      options: [
        { id: "a", label: "`<Outlet />`" },
        { id: "b", label: "`<Slot />`" },
        { id: "c", label: "`<Children />`" },
        { id: "d", label: "`<Target />`" }
      ],
      correctAnswer: "a",
      explanation: "The `<Outlet />` component tells React Router exactly where to inject the child route component inside the parent layout."
    },
    {
      id: "q-react-117-3",
      prompt: "What is an `index` route in React Router (`<Route index element={<Home />} />`)?",
      options: [
        { id: "a", label: "A route that matches when the parent's URL path is matched exactly, acting as the default child view" },
        { id: "b", label: "A database index" },
        { id: "c", label: "A list of all numbers" },
        { id: "d", label: "A route that only runs in development" }
      ],
      correctAnswer: "a",
      explanation: "An index route renders into the parent's `<Outlet />` when the user visits the parent URL itself without any additional child path segments."
    },
    {
      id: "q-react-117-4",
      prompt: "If a parent route has `path='/dashboard'`, how should a child route for `/dashboard/settings` be defined?",
      options: [
        { id: "a", label: "`<Route path='settings' element={<Settings />} />` (relative path without leading slash)" },
        { id: "b", label: "`<Route path='/dashboard/dashboard/settings' />`" },
        { id: "c", label: "`<Route path='//settings' />`" },
        { id: "d", label: "`<Route path='../settings' />`" }
      ],
      correctAnswer: "a",
      explanation: "Child routes use relative paths (`settings`). React Router automatically joins the parent path (`/dashboard`) with the child path."
    },
    {
      id: "q-react-117-5",
      prompt: "What happens if you define a leading slash on a nested child route (`path='/settings'`)?",
      options: [
        { id: "a", label: "It matches the root URL `/settings` instead of the nested path `/dashboard/settings`" },
        { id: "b", label: "It crashes the computer" },
        { id: "c", label: "It is converted to uppercase" },
        { id: "d", label: "React ignores leading slashes" }
      ],
      correctAnswer: "a",
      explanation: "A leading slash `/` indicates an absolute path from the root domain, overriding the parent's path prefix."
    },
    {
      id: "q-react-117-6",
      prompt: "How can a parent layout pass data down to child components rendered inside its `<Outlet />`?",
      options: [
        { id: "a", label: "Pass an object via the `context` prop: `<Outlet context={{ user }} />` and read it in the child via `useOutletContext()`" },
        { id: "b", label: "Write it on a cookie" },
        { id: "c", label: "By saving it as an image" },
        { id: "d", label: "Children cannot access parent layout data" }
      ],
      correctAnswer: "a",
      explanation: "`<Outlet context={data}>` and the matching `useOutletContext()` hook allow seamless data sharing between parent layouts and matched child views."
    },
    {
      id: "q-react-117-7",
      prompt: "What happens to the local state of a parent layout (e.g. an audio player) when navigating between different child routes?",
      options: [
        { id: "a", label: "The parent component stays mounted, so its local state and playing audio continue uninterrupted" },
        { id: "b", label: "The state is completely wiped and reset" },
        { id: "c", label: "The browser reloads" },
        { id: "d", label: "The audio stops" }
      ],
      correctAnswer: "a",
      explanation: "Because the parent layout remains mounted in the DOM, its local state, DOM elements, and media playback persist seamlessly across child navigation."
    },
    {
      id: "q-react-117-8",
      prompt: "Can a nested child route itself have further nested child routes?",
      options: [
        { id: "a", label: "Yes, React Router supports arbitrary levels of deeply nested routes and layouts" },
        { id: "b", label: "No, React Router strictly limits nesting to 1 level" },
        { id: "c", label: "Only if the routes are written in TypeScript" },
        { id: "d", label: "Only in mobile applications" }
      ],
      correctAnswer: "a",
      explanation: "Routes can be nested to any depth: e.g. `/app` (AppLayout) -> `/app/courses` (CourseLayout) -> `/app/courses/:id` (LessonLayout)."
    },
    {
      id: "q-react-117-9",
      prompt: "What happens if a parent route layout fails to include an `<Outlet />` component?",
      options: [
        { id: "a", label: "The parent renders, but none of the matched child components will ever appear on screen" },
        { id: "b", label: "The browser throws a 500 server error" },
        { id: "c", label: "React creates an `<Outlet />` at the very bottom of the document" },
        { id: "d", label: "It works normally" }
      ],
      correctAnswer: "a",
      explanation: "Without an `<Outlet />`, React Router has no target DOM location to mount the matched child element, so child content remains invisible."
    },
    {
      id: "q-react-117-10",
      prompt: "How can breadcrumb trails be generated dynamically in nested React Router applications?",
      options: [
        { id: "a", label: "By inspecting `useLocation().pathname` or using route `handle` metadata" },
        { id: "b", label: "By querying Google" },
        { id: "c", label: "By saving breadcrumbs in localStorage" },
        { id: "d", label: "Breadcrumbs can only be static HTML" }
      ],
      correctAnswer: "a",
      explanation: "Breadcrumbs are generated dynamically by splitting the current `location.pathname` or attaching `handle` metadata objects to route definitions."
    }
  ]
};

// LESSON 118: URL SEARCH PARAMETERS AND SHAREABLE FILTERS
const lesson118: CurriculumItem = {
  id: "item-react-118-url-search-params-filters",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-04-routing-architecture",
  moduleTitle: "Module 4: Routing and State Architecture",
  modulePosition: 4,
  title: "URL Search Parameters and Shareable Filters",
  duration: "35 mins",
  type: "cheatsheet",
  position: 5,
  contentHeading: "URL Search Parameters and Shareable Filters",
  contentDescription: "Master synchronizing search, filter, and pagination state into URL query strings with useSearchParams, creating bookmarkable/shareable URLs, and validating untrusted parameter inputs.",
  codeSnippet: {
    language: "jsx",
    code: `import React from 'react';
import { useSearchParams } from 'react-router-dom';

function FilterableCourseCatalog({ allCourses }) {
  // 1. useSearchParams acts like useState, but persists in the URL query string!
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Read query parameters with safe fallbacks
  const searchQuery = searchParams.get('q') || '';
  const selectedLevel = searchParams.get('level') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // 3. Update search parameters in the URL
  const updateFilter = (newLevel) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (newLevel === 'all') {
        next.delete('level'); // Clean up URL if default
      } else {
        next.set('level', newLevel);
      }
      next.set('page', '1'); // Reset to page 1 on filter change
      return next;
    });
  };

  const updateSearch = (query) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (!query.trim()) {
        next.delete('q');
      } else {
        next.set('q', query);
      }
      next.set('page', '1');
      return next;
    });
  };

  // 4. Compute filtered list as derived state
  const filteredCourses = allCourses.filter(c => {
    const matchesQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || c.level === selectedLevel;
    return matchesQuery && matchesLevel;
  });

  return (
    <div className="catalog-container">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search courses…"
          value={searchQuery}
          onChange={e => updateSearch(e.target.value)}
          className="search-input"
        />

        <select value={selectedLevel} onChange={e => updateFilter(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <p className="results-count">
        Showing {filteredCourses.length} courses (Page {currentPage})
      </p>

      <ul className="course-cards">
        {filteredCourses.map(c => <li key={c.id}>{c.title} — {c.level}</li>)}
      </ul>
    </div>
  );
}`
  },
  sections: [
    {
      title: "Core Concept: Sending a Bookmark to a Friend",
      explanation: "Imagine you are browsing an online library. You filter by 'React Books', sort by 'Most Popular', and navigate to Page 3. You find an amazing book list and want to text it to your friend. If your filters are stored only in local React state (`useState`), your URL is still just `library.com`. When your friend opens your link, they see Page 1 with zero filters applied! But if you store your filters in the URL query string (`library.com?topic=react&sort=popular&page=3`), your friend sees the EXACT same filtered view you were looking at! The URL IS an API!",
      bullets: [
        "Shareable & Bookmarkable: Anyone opening the URL arrives at the identical filtered view.",
        "Browser Refresh Resilience: Refreshing the tab does not reset the user's active search or page number.",
        "`useSearchParams()`: Hook from React Router that reads and updates the URL query string just like `useState`."
      ]
    },
    {
      title: "The URL State vs Local State Decision Rule",
      explanation: "Which pieces of state belong in the URL vs component memory?",
      table: {
        headers: ["State Type", "Where to Store", "Examples"],
        rows: [
          ["View-Defining State", "URL Search Params", "Search queries (`?q=react`), active category filter (`?cat=frontend`), sort order (`?sort=date`), active page (`?page=2`)"],
          ["Ephemeral UI State", "Local Component `useState`", "Is a dropdown open? Is a tooltip hovered? Active input focus state, accordion expansion"]
        ]
      }
    },
    {
      title: "Concept in Depth: Defensive Validation of URL Params",
      explanation: "Treat all data from the URL as UNTRUSTED user input. A user can manually edit the address bar to `?page=banana` or `?level=maliciousScript`:",
      bullets: [
        "Parse Integers Safely: `const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);`",
        "Whitelist Enums: Verify that `level` is in `['beginner', 'intermediate', 'advanced']`. If not, default to `'all'`."
      ]
    },
    {
      title: "Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these query parameter bugs:",
      bullets: [
        "Cluttering the URL with Default Values: Writing `?level=all&page=1&q=`. Remove default parameters using `params.delete('key')` to keep URLs clean.",
        "Forgetting to Reset Page on Filter Change: If the user is on Page 15 and selects a filter that only has 2 results, they will see an empty page! Always reset `page=1` when search or filter criteria change.",
        "Missing Type Conversion: `searchParams.get('page')` returns a STRING (`'1'`), not a number. Always parse integers with `parseInt(val, 10)`."
      ]
    },
    {
      title: "Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Build a shareable course filter. Bind a search input and a category dropdown to `useSearchParams`. Verify that copying the URL from the browser address bar and opening it in a new incognito window restores the exact search query and category filter automatically."
    }
  ],
  questions: [
    {
      id: "q-react-118-1",
      prompt: "What is the primary advantage of storing search, filter, and pagination state in URL search parameters?",
      options: [
        { id: "a", label: "It makes the current view bookmarkable, shareable with friends, and resilient to page refreshes" },
        { id: "b", label: "It makes database queries unnecessary" },
        { id: "c", label: "It removes the need for React" },
        { id: "d", label: "It makes web pages load without electricity" }
      ],
      correctAnswer: "a",
      explanation: "Storing filters in URL search parameters ensures that the exact state can be shared via a URL link and restored on refresh."
    },
    {
      id: "q-react-118-2",
      prompt: "Which React Router hook is used to read and update query string parameters (e.g. `?q=react&page=2`)?",
      options: [
        { id: "a", label: "`useSearchParams()`" },
        { id: "b", label: "`useQuery()`" },
        { id: "c", label: "`useFilter()`" },
        { id: "d", label: "`useUrl()`" }
      ],
      correctAnswer: "a",
      explanation: "`useSearchParams()` returns a `[searchParams, setSearchParams]` tuple, functioning like `useState` backed by the browser URL query string."
    },
    {
      id: "q-react-118-3",
      prompt: "What data type is returned by `searchParams.get('page')`?",
      options: [
        { id: "a", label: "A string (e.g. `'2'`) or `null` if the parameter is absent" },
        { id: "b", label: "A number automatically" },
        { id: "c", label: "A boolean" },
        { id: "d", label: "An array" }
      ],
      correctAnswer: "a",
      explanation: "URL parameters are always strings or `null`. You must explicitly parse numbers with `parseInt(val, 10)`."
    },
    {
      id: "q-react-118-4",
      prompt: "Why should you reset `page=1` whenever the user changes their search query or category filter?",
      options: [
        { id: "a", label: "Because the new filter might only have 1 page of results, leaving a user who was on page 10 looking at a blank page" },
        { id: "b", label: "Because React Router crashes on page 2" },
        { id: "c", label: "It is required by the browser" },
        { id: "d", label: "Because page 1 is the only valid page" }
      ],
      correctAnswer: "a",
      explanation: "Changing filter criteria alters the total item count. Resetting to page 1 prevents the user from being stranded on an out-of-range empty page."
    },
    {
      id: "q-react-118-5",
      prompt: "How can you remove a query parameter from the URL when it returns to its default value?",
      options: [
        { id: "a", label: "Using `searchParams.delete('paramName')` before calling `setSearchParams(searchParams)`" },
        { id: "b", label: "Setting it to `undefined`" },
        { id: "c", label: "By setting the value to an empty string" },
        { id: "d", label: "Closing the browser" }
      ],
      correctAnswer: "a",
      explanation: "Calling `.delete('key')` cleanly removes the key from the query string, keeping URLs short, elegant, and readable."
    },
    {
      id: "q-react-118-6",
      prompt: "Why should you treat URL search parameter values as untrusted input in your React components?",
      options: [
        { id: "a", label: "Because users can manually edit the browser address bar with malformed, out-of-range, or malicious values" },
        { id: "b", label: "Because Google edits URLs" },
        { id: "c", label: "Because URLs expire after 5 minutes" },
        { id: "d", label: "Because URLs cannot contain numbers" }
      ],
      correctAnswer: "a",
      explanation: "Anyone can type arbitrary text into the address bar. Defensive code must validate types, bounds, and enum whitelists."
    },
    {
      id: "q-react-118-7",
      prompt: "Which of the following state examples does NOT belong in the URL query string?",
      options: [
        { id: "a", label: "Whether a help tooltip is currently hovered/open" },
        { id: "b", label: "The current search keyword `?q=react`" },
        { id: "c", label: "The selected difficulty filter `?level=advanced`" },
        { id: "d", label: "The current catalog page `?page=3`" }
      ],
      correctAnswer: "a",
      explanation: "Ephemeral UI interactions like open tooltips, dropdown menus, or active hover states belong in local component `useState`, not the URL."
    },
    {
      id: "q-react-118-8",
      prompt: "How does `setSearchParams` handle browser history by default?",
      options: [
        { id: "a", label: "It pushes a new entry onto the history stack by default, but supports `{ replace: true }` to update the URL without adding new history entries" },
        { id: "b", label: "It clears all browser history" },
        { id: "c", label: "It reloads the page" },
        { id: "d", label: "It opens a new tab" }
      ],
      correctAnswer: "a",
      explanation: "Passing `{ replace: true }` updates the query string in place, which is ideal for real-time keystroke searches to avoid flooding the Back button."
    },
    {
      id: "q-react-118-9",
      prompt: "What native Web API class does React Router's `useSearchParams` wrap?",
      options: [
        { id: "a", label: "Standard `window.URLSearchParams`" },
        { id: "b", label: "`document.location`" },
        { id: "c", label: "`XMLHttpRequest`" },
        { id: "d", label: "`WebSocket`" }
      ],
      correctAnswer: "a",
      explanation: "`useSearchParams` wraps the standard browser `URLSearchParams` interface, providing methods like `.get()`, `.set()`, `.delete()`, and `.has()`."
    },
    {
      id: "q-react-118-10",
      prompt: "What happens if a user copies a URL containing `?level=intermediate` and pastes it into another browser?",
      options: [
        { id: "a", label: "The component reads `level=intermediate` from `useSearchParams()` on initial mount and renders the filtered view immediately" },
        { id: "b", label: "The filter is lost and resets to all" },
        { id: "c", label: "The browser throws an authorization error" },
        { id: "d", label: "The website crashes" }
      ],
      correctAnswer: "a",
      explanation: "Because state was encoded in the URL, the receiving browser extracts the parameters during initial render and displays the matching view."
    }
  ]
};

// MODULE 4 QUIZ
const module04Quiz: CurriculumItem = {
  id: "item-react-mod04-quiz",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-04-routing-architecture",
  moduleTitle: "Module 4: Routing and State Architecture",
  modulePosition: 4,
  title: "Module 4 Assessment: Routing & Architecture MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 6,
  isModuleQuiz: true,
  contentHeading: "Module 4 Quiz: Client-Side Routing & State Architecture",
  contentDescription: "Evaluate your comprehensive mastery of Single Page Application architecture: React Router v6+, useParams, useNavigate, protected routes, auth state resolution, Context vs Redux Toolkit, nested route layouts, and shareable URL query parameters.",
  questions: [
    ...(lesson114.questions || []).slice(0, 2),
    ...(lesson115.questions || []).slice(0, 2),
    ...(lesson116.questions || []).slice(0, 2),
    ...(lesson117.questions || []).slice(0, 2),
    ...(lesson118.questions || []).slice(0, 2)
  ]
};

// MODULE 4 ASSESSMENT (LAB)
const module04Assessment: CurriculumItem = {
  id: "item-react-mod04-lab",
  subCourseId: "mod-react-essentials",
  subCourseTitle: "React.js",
  subCoursePosition: 5,
  moduleId: "module-react-04-routing-architecture",
  moduleTitle: "Module 4: Routing and State Architecture",
  modulePosition: 4,
  title: "Module 4 Lab: Student Portal with Protected Routing & Shareable Search",
  duration: "50 mins",
  type: "assignment",
  position: 7,
  isModuleAssessment: true,
  contentHeading: "Module 4 Lab Project: Student Portal with Protected Routing & Shareable Search",
  contentDescription: "Develop an enterprise-style educational portal featuring client-side routing, protected student dashboards, persistent nested layouts with Outlet, and shareable URL search parameters.",
  assignmentPrompt: {
    instructions: "Build an educational student portal with advanced routing:\n1. Router Configuration: Set up routes for `/` (Catalog), `/courses/:id` (Details), `/dashboard` (Student Shell), and a 404 catch-all.\n2. Protected Route: Protect `/dashboard` with an auth guard that redirects unauthenticated users to `/login` with return location state.\n3. Nested Layout Shell: Build `DashboardLayout` with a persistent sidebar and `<Outlet />` for `/dashboard/overview` and `/dashboard/settings`.\n4. Shareable URL Filters: In the public catalog, bind search query and track filters to `useSearchParams`.\n5. Global State: Create an RTK slice or AuthContext for managing user login/logout.",
    deliverables: [
      "Modular route tree with clean relative nested routes and persistent layout shells",
      "Robust protected route guards with async loading resolution",
      "Shareable search URLs that restore filters on refresh or direct link visit"
    ]
  }
};

export const reactModule04: CurriculumSubModule = {
  id: "module-react-04-routing-architecture",
  subCourseId: "mod-react-essentials",
  title: "Module 4 — Routing and State Architecture",
  description: "Build Single Page Application navigation with React Router, protected route authorization guards, Redux Toolkit state stores, nested layout shells, and shareable URL search parameters.",
  position: 4,
  items: [
    lesson114,
    lesson115,
    lesson116,
    lesson117,
    lesson118,
    module04Quiz,
    module04Assessment
  ]
};
