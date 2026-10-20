import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 3: EXPRESS AND HTTP
// Lessons 081 - 085 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 081: HTTP METHODS, STATUS CODES AND REST
const lesson081: CurriculumItem = {
  id: "item-node-081-http-methods-status-codes-rest",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-03-express-http",
  moduleTitle: "Module 3: Express and HTTP",
  modulePosition: 3,
  title: "HTTP Methods, Status Codes and REST",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "HTTP Methods, Status Codes and REST: Semantics & Architecture",
  contentDescription: "Master the HTTP protocol, request/response anatomies, REST architectural constraints, idempotency, safety, and correct status code selection across 2xx, 3xx, 4xx, and 5xx families.",
  codeSnippet: {
    language: "http",
    code: `POST /api/v1/courses HTTP/1.1
Host: api.blezex.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1Ni...

{
  "title": "PostgreSQL Performance Engineering",
  "level": "intermediate",
  "price": 149.99
}

HTTP/1.1 201 Created
Location: /api/v1/courses/crs_982
Content-Type: application/json

{
  "success": true,
  "data": {
    "id": "crs_982",
    "title": "PostgreSQL Performance Engineering",
    "createdAt": "2026-10-18T18:20:00Z"
  }
}`
  },
  sections: [
    {
      title: "Core Concept: The HTTP Client-Server Exchange",
      explanation: "Hypertext Transfer Protocol (HTTP) is the foundational request-response protocol powering the World Wide Web and modern API architectures. A client (browser, mobile app, or another backend service) opens a TCP connection to the server, transmits a plain-text HTTP request message (specifying method, path, headers, and optional body), and the server replies with an HTTP response message containing a three-digit status code, metadata headers, and payload data.\n\nREST (Representational State Transfer) is an architectural style introduced by Roy Fielding in 2000 that leverages standard HTTP semantics to expose system entities as 'resources' identified by clear URIs."
    },
    {
      title: "HTTP Verbs: Idempotency and Safety",
      explanation: "HTTP methods are characterized by two crucial architectural properties:\n\n1. Safe Methods: Operations that do not modify server-side state (read-only queries). They can be cached aggressively without risk.\n2. Idempotent Methods: Operations where making multiple identical requests has the exact same side-effect on the server as making a single request.",
      table: {
        headers: ["Method", "Primary Role", "Safe?", "Idempotent?", "Request Body?"],
        rows: [
          ["GET", "Retrieve a representation of a resource or collection", "YES", "YES", "NO"],
          ["POST", "Create a new resource or trigger non-idempotent operations", "NO", "NO", "YES"],
          ["PUT", "Completely replace a target resource or create if absent", "NO", "YES", "YES"],
          ["PATCH", "Apply partial modifications to an existing resource", "NO", "CONDITIONAL", "YES"],
          ["DELETE", "Remove a target resource from the system", "NO", "YES", "OPTIONAL"]
        ]
      }
    },
    {
      title: "Status Code Taxonomy: The 5 Standard Families",
      explanation: "HTTP status codes tell the client the exact operational outcome of their request:",
      bullets: [
        "2xx Success: 200 OK (standard read/update), 201 Created (resource added, includes Location header), 204 No Content (action succeeded with empty body, common for DELETE).",
        "3xx Redirection: 301 Moved Permanently (cachable SEO redirect), 304 Not Modified (caching validation check).",
        "4xx Client Errors: 400 Bad Request (malformed syntax/validation failure), 401 Unauthorized (missing or invalid authentication credentials), 403 Forbidden (authenticated user lacks permission), 404 Not Found (resource does not exist), 409 Conflict (duplicate unique key, e.g. email already registered), 422 Unprocessable Entity (syntactically valid but fails business rules), 429 Too Many Requests (rate limit exceeded).",
        "5xx Server Errors: 500 Internal Server Error (unhandled exception or unexpected database crash), 502 Bad Gateway (upstream proxy failure), 503 Service Unavailable (overloaded or maintenance mode), 504 Gateway Timeout (upstream service took too long)."
      ]
    },
    {
      title: "Common Pitfalls & Architectural Anti-Patterns",
      explanation: "The most frequent violation of REST is returning `200 OK` for an operation that actually failed, accompanied by an error body such as `{ error: true, message: 'Invalid credentials' }`. This breaks standard HTTP caching layers, load balancer health checks, and API client libraries.\n\nAlways communicate failure through genuine 4xx or 5xx status codes. Additionally, never use GET requests to trigger state-altering operations (such as `/delete-user?id=12`), as web crawlers and browser pre-fetchers will accidentally delete customer data!"
    }
  ],
  questions: [
    {
      id: "q-node-081-1",
      prompt: "What does it mean for an HTTP method to be 'idempotent'?",
      options: [
        { id: "a", label: "The request executes in under 10 milliseconds" },
        { id: "b", label: "Making multiple identical requests produces the exact same server state as making a single request" },
        { id: "c", label: "The request cannot be sent from mobile devices" },
        { id: "d", label: "The request automatically deletes user session cookies" }
      ],
      correctIndex: 1,
      explanation: "Idempotency means that executing the same request once or ten times leaves the system in the exact same state (e.g., PUT, DELETE, GET)."
    },
    {
      id: "q-node-081-2",
      prompt: "Which HTTP status code should be returned when a new database record is successfully created via `POST`?",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "201 Created" },
        { id: "c", label: "204 No Content" },
        { id: "d", label: "302 Found" }
      ],
      correctIndex: 1,
      explanation: "201 Created is the specific HTTP status communicating that a new resource was successfully generated and persisted on the server."
    },
    {
      id: "q-node-081-3",
      prompt: "What is the key difference between a 401 Unauthorized and a 403 Forbidden status code?",
      options: [
        { id: "a", label: "401 means authentication is missing or invalid; 403 means the user is authenticated but lacks required permission" },
        { id: "b", label: "401 is for mobile apps; 403 is for desktop browsers" },
        { id: "c", label: "401 means the database crashed; 403 means the URL is wrong" },
        { id: "d", label: "There is no difference in the HTTP specification" }
      ],
      correctIndex: 0,
      explanation: "401 indicates that the caller must supply valid credentials (authentication), whereas 403 indicates that credentials are known but the caller is forbidden from this action (authorization)."
    },
    {
      id: "q-node-081-4",
      prompt: "Why should `GET` requests never be used to delete records or modify system data?",
      options: [
        { id: "a", label: "Because GET requests cannot contain URLs" },
        { id: "b", label: "Because GET is defined as a 'safe' method; search engine spiders, browser prefetchers, and CDNs may pre-fetch GET links and cause unintended data destruction" },
        { id: "c", label: "Because Express does not support GET routes" },
        { id: "d", label: "Because GET requests are automatically blocked by cloud firewalls" }
      ],
      correctIndex: 1,
      explanation: "GET methods must be safe (side-effect free) because automated crawlers, proxies, and browser accelerators can and will trigger them without user intent."
    },
    {
      id: "q-node-081-5",
      prompt: "Which HTTP method is specifically intended for partial updates to an existing resource?",
      options: [
        { id: "a", label: "PUT" },
        { id: "b", label: "PATCH" },
        { id: "c", label: "POST" },
        { id: "d", label: "UPDATE" }
      ],
      correctIndex: 1,
      explanation: "PATCH is specifically designed for partial modifications (updating one or two fields), whereas PUT represents complete resource replacement."
    },
    {
      id: "q-node-081-6",
      prompt: "Which status code is appropriate when a user attempts to register with an email that is already taken?",
      options: [
        { id: "a", label: "404 Not Found" },
        { id: "b", label: "409 Conflict" },
        { id: "c", label: "500 Internal Server Error" },
        { id: "d", label: "204 No Content" }
      ],
      correctIndex: 1,
      explanation: "409 Conflict signifies that the request conflicts with the current state of the server, such as violating a unique database constraint on email."
    },
    {
      id: "q-node-081-7",
      prompt: "What does the 204 No Content status code communicate to the client?",
      options: [
        { id: "a", label: "The request failed because no data was found" },
        { id: "b", label: "The action succeeded, but there is intentionally no response body returned (common for successful DELETE operations)" },
        { id: "c", label: "The server is waiting for payment" },
        { id: "d", label: "The database table is completely empty" }
      ],
      correctIndex: 1,
      explanation: "204 indicates that the server successfully fulfilled the request and that there is no additional content to send in the response payload."
    },
    {
      id: "q-node-081-8",
      prompt: "Why is returning `HTTP 200 OK` with `{ status: 'error', code: 500 }` in the response body considered an API anti-pattern?",
      options: [
        { id: "a", label: "Because HTTP bodies cannot contain JSON" },
        { id: "b", label: "Because it breaks HTTP-aware infrastructure (API gateways, CDNs, monitoring tools, automated client SDKs) that rely on real status codes" },
        { id: "c", label: "Because browsers refuse to display 200 responses" },
        { id: "d", label: "Because Node.js crashes when status code is 200" }
      ],
      correctIndex: 1,
      explanation: "Concealing errors behind 200 OK misleads intermediate caching proxies, network health checks, and metrics systems into reporting 100% success."
    },
    {
      id: "q-node-081-9",
      prompt: "What does the 429 status code represent?",
      options: [
        { id: "a", label: "File too large" },
        { id: "b", label: "Too Many Requests (the client has exceeded the allowed rate limit)" },
        { id: "c", label: "Unsupported media type" },
        { id: "d", label: "Database locked" }
      ],
      correctIndex: 1,
      explanation: "429 Too Many Requests indicates that the client has sent too many requests within a given amount of time (rate limiting)."
    },
    {
      id: "q-node-081-10",
      prompt: "Which header in an HTTP request indicates the format of the data being sent in the request body?",
      options: [
        { id: "a", label: "Accept" },
        { id: "b", label: "Content-Type" },
        { id: "c", label: "Authorization" },
        { id: "d", label: "User-Agent" }
      ],
      correctIndex: 1,
      explanation: "The Content-Type header informs the server about the MIME type of the transmitted body (e.g., application/json or multipart/form-data)."
    }
  ]
};

// LESSON 082: EXPRESS SERVER SETUP AND ROUTING
const lesson082: CurriculumItem = {
  id: "item-node-082-express-setup-routing",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-03-express-http",
  moduleTitle: "Module 3: Express and HTTP",
  modulePosition: 3,
  title: "Express Server Setup and Routing",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Express Server Setup and Routing: Modularity & Parameter Extraction",
  contentDescription: "Understand the Express application lifecycle, registering HTTP methods and paths, sub-routers via express.Router, path parameter extraction, and query string parsing.",
  codeSnippet: {
    language: "javascript",
    code: `// Modular Express routing architecture
import express from 'express';

const courseRouter = express.Router();

// Simulated dataset
const courses = [{ id: '42', title: 'Full Stack Node Mastery', price: 99.00 }];

// Sub-route: GET /api/v1/courses/:id
courseRouter.get('/:id', (req, res) => {
  const { id } = req.params; // Route parameters
  const { fields } = req.query; // Query parameters: ?fields=title
  
  const course = courses.find(c => c.id === id);
  if (!course) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }

  res.json({ success: true, data: course });
});

// Mounting the router on the primary app
const app = express();
app.use(express.json());
app.use('/api/v1/courses', courseRouter);

export default app;`
  },
  sections: [
    {
      title: "Core Concept: The Express Framework Architecture",
      explanation: "While Node's built-in `node:http` module can create web servers, handling routing manually requires complex nested `if/switch` blocks inspecting `req.url` and `req.method`. Express is a minimalist, flexible web framework that organizes HTTP server development into clean routing tables and composable middleware functions."
    },
    {
      title: "Input Extraction: Params, Query Strings, and Bodies",
      explanation: "An HTTP request conveys client input through three distinct channels in Express:",
      table: {
        headers: ["Location", "Express Property", "Example URL / Body", "Primary Use Case"],
        rows: [
          ["Route Path Parameters", "req.params", "/api/courses/:id -> req.params.id", "Targeting a specific unique resource entity"],
          ["Query String", "req.query", "/courses?page=2&limit=20&sort=desc", "Filtering, paginating, searching, and sorting collections"],
          ["Request Body", "req.body", "{ \"title\": \"Node API\" } (JSON payload)", "Submitting complex form data or creation/update payloads"],
          ["Headers", "req.headers", "req.headers['authorization']", "Transmitting authentication tokens, API keys, and client metadata"]
        ]
      }
    },
    {
      title: "Modular Routing with express.Router()",
      explanation: "Rather than attaching fifty endpoints directly to the top-level `app` object (`app.get('/users')`, `app.post('/products')`), scalable applications isolate domain resources into dedicated mini-routers using `express.Router()`. Each router file manages only its own relative subpaths (`router.get('/')`, `router.get('/:id')`), which the primary application mounts under a unified prefix (`app.use('/api/v1/courses', courseRouter)`)."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Always remember that values parsed from `req.params` and `req.query` are strings. If a client queries `?limit=10`, `req.query.limit` is the string `'10'`, not the number `10`. Attempting arithmetic without parsing (`req.query.page + 1`) produces string concatenation (`'11'`). Always parse and validate types explicitly.\n\nAdditionally, order of route registration matters in Express: place specific static routes (`/courses/popular`) BEFORE dynamic parameterized routes (`/courses/:id`), otherwise Express matches `'popular'` as the `:id` parameter!"
    }
  ],
  questions: [
    {
      id: "q-node-082-1",
      prompt: "How do you extract a dynamic URL parameter defined as `/api/users/:userId` in an Express route handler?",
      options: [
        { id: "a", label: "req.query.userId" },
        { id: "b", label: "req.params.userId" },
        { id: "c", label: "req.body.userId" },
        { id: "d", label: "req.headers.userId" }
      ],
      correctIndex: 1,
      explanation: "Named route segments starting with a colon (e.g., :userId) are populated automatically on the req.params object."
    },
    {
      id: "q-node-082-2",
      prompt: "Where does Express populate parsed query parameters such as `?status=active&limit=10`?",
      options: [
        { id: "a", label: "req.body" },
        { id: "b", label: "req.query" },
        { id: "c", label: "req.params" },
        { id: "d", label: "req.search" }
      ],
      correctIndex: 1,
      explanation: "Query string parameters located after the '?' symbol in a URL are parsed into key-value pairs on req.query."
    },
    {
      id: "q-node-082-3",
      prompt: "Why should `express.Router()` be used instead of registering every endpoint on `app`?",
      options: [
        { id: "a", label: "Because app.get() is deprecated in Express 5" },
        { id: "b", label: "To modularize route handlers into distinct domain-specific files, avoiding monolithic files and enabling clean versioning" },
        { id: "c", label: "Because express.Router() automatically turns SQLite into PostgreSQL" },
        { id: "d", label: "To speed up internet download speeds" }
      ],
      correctIndex: 1,
      explanation: "express.Router() provides an isolated mini-application routing pipeline, allowing clean modular separation of routes by domain."
    },
    {
      id: "q-node-082-4",
      prompt: "If you register `app.get('/courses/:id', ...)` before `app.get('/courses/free', ...)`, what happens when a client requests `GET /courses/free`?",
      options: [
        { id: "a", label: "The `/courses/free` handler executes correctly" },
        { id: "b", label: "The `/courses/:id` handler executes first with `req.params.id = 'free'`, because Express matches routes in the order they are defined" },
        { id: "c", label: "Express throws a DuplicateRouteError" },
        { id: "d", label: "The server crashes" }
      ],
      correctIndex: 1,
      explanation: "Express evaluates routes sequentially in registration order; dynamic wildcards match static words unless static routes are registered first."
    },
    {
      id: "q-node-082-5",
      prompt: "What is the return data type of `req.params.id` when a user navigates to `/courses/42`?",
      options: [
        { id: "a", label: "Number (42)" },
        { id: "b", label: "String ('42')" },
        { id: "c", label: "BigInt" },
        { id: "d", label: "Buffer" }
      ],
      correctIndex: 1,
      explanation: "All path parameters extracted from URLs are strings. To use them as integers, you must parse them using parseInt() or Number()."
    },
    {
      id: "q-node-082-6",
      prompt: "How is a modular sub-router mounted onto a primary Express application under the path `/api/v1/auth`?",
      options: [
        { id: "a", label: "app.mount('/api/v1/auth', authRouter)" },
        { id: "b", label: "app.use('/api/v1/auth', authRouter)" },
        { id: "c", label: "app.route('/api/v1/auth', authRouter)" },
        { id: "d", label: "app.connect('/api/v1/auth', authRouter)" }
      ],
      correctIndex: 1,
      explanation: "app.use(pathPrefix, router) mounts the router middleware so all routes defined within that router are prefixed with pathPrefix."
    },
    {
      id: "q-node-082-7",
      prompt: "Which method sends a JSON response with the appropriate `Content-Type: application/json` header in Express?",
      options: [
        { id: "a", label: "res.writeJSON(object)" },
        { id: "b", label: "res.json(object)" },
        { id: "c", label: "res.sendString(JSON.stringify(object))" },
        { id: "d", label: "res.render(object)" }
      ],
      correctIndex: 1,
      explanation: "res.json() serializes the object, sets the Content-Type header to application/json, and finishes the response cycle."
    },
    {
      id: "q-node-082-8",
      prompt: "What happens if a route handler neither sends a response (e.g. res.json()) nor calls `next()`?",
      options: [
        { id: "a", label: "The request hangs indefinitely until the client or server times out" },
        { id: "b", label: "Express sends an automatic 200 OK after 100 milliseconds" },
        { id: "c", label: "The server process restarts" },
        { id: "d", label: "A 404 response is immediately returned" }
      ],
      correctIndex: 0,
      explanation: "Express requires every request path to either terminate by sending a response or pass control to the next handler using next(); otherwise the connection hangs."
    },
    {
      id: "q-node-082-9",
      prompt: "How can you specify that an optional route parameter exists in an Express path (e.g., year and optional month)?",
      options: [
        { id: "a", label: "Use a question mark: `/archive/:year/:month?`" },
        { id: "b", label: "Use brackets: `/archive/:year/[:month]`" },
        { id: "c", label: "Use exclamation mark: `/archive/:year/:month!`" },
        { id: "d", label: "Optional parameters are not supported in Express" }
      ],
      correctIndex: 0,
      explanation: "Appending a question mark to a path parameter symbol (:month?) marks it as optional in the path-to-regexp parser."
    },
    {
      id: "q-node-082-10",
      prompt: "What method defines an endpoint that matches ANY HTTP method (GET, POST, DELETE, etc.) on a path?",
      options: [
        { id: "a", label: "app.any(path, handler)" },
        { id: "b", label: "app.all(path, handler)" },
        { id: "c", label: "app.wildcard(path, handler)" },
        { id: "d", label: "app.match(path, handler)" }
      ],
      correctIndex: 1,
      explanation: "app.all() registers a route handler that triggers for all HTTP verbs matching that route path."
    }
  ]
};

// LESSON 083: REQUEST, RESPONSE AND MIDDLEWARE
const lesson083: CurriculumItem = {
  id: "item-node-083-request-response-middleware",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-03-express-http",
  moduleTitle: "Module 3: Express and HTTP",
  modulePosition: 3,
  title: "Request, Response and Middleware",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Request, Response and Middleware: The Pipeline Pattern & Interceptors",
  contentDescription: "Master the Express middleware chain, execution ordering, request mutation, next(), the four-argument error middleware signature, and third-party middleware.",
  codeSnippet: {
    language: "javascript",
    code: `// Express Middleware Pipeline Example
import express from 'express';

const app = express();

// 1. Built-in body parsing middleware (must run before routes inspect req.body)
app.use(express.json({ limit: '1mb' }));

// 2. Custom application-level telemetry middleware
app.use((req, res, next) => {
  const start = Date.now();
  req.requestId = \`req_\${Math.random().toString(36).substring(2, 9)}\`;
  
  // Listen for the finish event to log accurate duration
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.requestId}] \${req.method} \${req.originalUrl} \${res.statusCode} - \${duration}ms\`);
  });
  
  next(); // Pass control to the next middleware in the pipeline
});

// 3. Protected route using inline authorization middleware
const requireAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Authentication token required' });
  }
  next();
};

app.get('/api/profile', requireAuth, (req, res) => {
  res.json({ user: 'authenticated_student', requestId: req.requestId });
});`
  },
  sections: [
    {
      title: "Core Concept: The Middleware Onion / Chain Pattern",
      explanation: "In Express, an application is essentially a sequential chain of middleware functions. A middleware function is a function that has access to the incoming Request object (`req`), the outgoing Response object (`res`), and the next middleware function in the application's request-response cycle (`next`).\n\nMiddleware can execute code, make changes to the request and response objects, end the request-response cycle, or call `next()` to pass control to the next middleware function in line."
    },
    {
      title: "Middleware Ordering is Observable Behavior",
      explanation: "The order in which middleware is passed to `app.use()` is strict and deterministic. If a route handler is registered before `express.json()`, that route will see `req.body` as `undefined` because the body parser has not executed yet.\n\nSimilarly, authentication middleware must execute before protected routes, and catch-all error handling middleware must execute after all routes are mounted.",
      table: {
        headers: ["Pipeline Step", "Middleware Role", "Signature", "Placement Order"],
        rows: [
          ["1. Parsing & Security", "Parses JSON body, sets CORS and security headers", "(req, res, next)", "Top of app before all routes"],
          ["2. Telemetry & Context", "Attaches correlation IDs, request timing logs", "(req, res, next)", "Early in pipeline"],
          ["3. Authentication", "Verifies JWT or session cookie; attaches req.user", "(req, res, next)", "Before protected resource routes"],
          ["4. Business Routes", "Executes controller logic; calls res.json()", "(req, res, next)", "Main body of app"],
          ["5. 404 Fallback", "Catches unhandled paths and returns 404", "(req, res, next)", "Immediately after all routes"],
          ["6. Global Error Handler", "Catches thrown errors and formats safe response", "(err, req, res, next)", "Dead last in application"]
        ]
      }
    },
    {
      title: "The Special 4-Argument Error Middleware",
      explanation: "Express identifies error-handling middleware specifically by inspecting function parameter length (`fn.length === 4`). Error middleware must declare exactly four parameters: `(err, req, res, next)`. If you omit the fourth `next` argument, Express treats it as regular middleware, and error handling will fail silently."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "A frequent catastrophic bug is calling `next()` after already sending a response with `res.json()`, or calling `next()` twice in different conditional branches without a `return` statement. This results in the infamous error:\n`Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`.\n\nAlways guard your middleware calls with an explicit return statement: `return next();` or `return res.status(400).json(...);`."
    }
  ],
  questions: [
    {
      id: "q-node-083-1",
      prompt: "What does calling `next()` inside an Express middleware function do?",
      options: [
        { id: "a", label: "It immediately terminates the HTTP connection" },
        { id: "b", label: "It passes control to the next middleware function in the registered execution pipeline" },
        { id: "c", label: "It commits the current database transaction" },
        { id: "d", label: "It restarts the server process" }
      ],
      correctIndex: 1,
      explanation: "next() signals to Express that the current middleware has finished its work and that execution should proceed to the next handler in the stack."
    },
    {
      id: "q-node-083-2",
      prompt: "What error occurs if code attempts to call `res.status().json()` after headers have already been transmitted to the client?",
      options: [
        { id: "a", label: "ERR_HTTP_HEADERS_SENT" },
        { id: "b", label: "ERR_SOCKET_CLOSED" },
        { id: "c", label: "ERR_OUT_OF_MEMORY" },
        { id: "d", label: "ERR_CONNECTION_REFUSED" }
      ],
      correctIndex: 0,
      explanation: "ERR_HTTP_HEADERS_SENT is thrown when an application attempts to write HTTP headers or status codes after they have already been flushed to the network socket."
    },
    {
      id: "q-node-083-3",
      prompt: "How does Express distinguish an error-handling middleware from a standard middleware?",
      options: [
        { id: "a", label: "By registering it with app.error() instead of app.use()" },
        { id: "b", label: "By inspecting the function's parameter count: error middleware declares exactly 4 arguments: (err, req, res, next)" },
        { id: "c", label: "By inspecting the filename in which it is written" },
        { id: "d", label: "By requiring an async keyword" }
      ],
      correctIndex: 1,
      explanation: "Express checks the function arity (fn.length); functions with exactly 4 parameters are treated specifically as error handlers."
    },
    {
      id: "q-node-083-4",
      prompt: "Why must `app.use(express.json())` be placed above route handlers in an Express file?",
      options: [
        { id: "a", label: "Because Express does not allow middleware below line 10" },
        { id: "b", label: "Because middleware executes in registration order; if routes run before express.json(), req.body will be undefined" },
        { id: "c", label: "Because express.json() deletes all subsequent routes" },
        { id: "d", label: "Because browsers send JSON from bottom to top" }
      ],
      correctIndex: 1,
      explanation: "Middleware order matters: express.json() must parse the raw stream into req.body before subsequent route handlers attempt to read req.body."
    },
    {
      id: "q-node-083-5",
      prompt: "How can middleware pass custom context (such as an authenticated user object) to downstream route handlers?",
      options: [
        { id: "a", label: "By writing to the global `window` object" },
        { id: "b", label: "By attaching properties directly to the `req` object (e.g. `req.user = decodedUser`)" },
        { id: "c", label: "By creating a temporary file on disk" },
        { id: "d", label: "By modifying package.json" }
      ],
      correctIndex: 1,
      explanation: "The req object persists across the entire request lifecycle; attaching data to req.user or req.requestId makes it accessible to all downstream handlers."
    },
    {
      id: "q-node-083-6",
      prompt: "How do you trigger the Express error-handling middleware from inside an asynchronous route handler?",
      options: [
        { id: "a", label: "Call `next(error)` with the error object as the argument" },
        { id: "b", label: "Call `res.error(error)`" },
        { id: "c", label: "Return null" },
        { id: "d", label: "Throwing an uncaught error in a background timer" }
      ],
      correctIndex: 0,
      explanation: "Passing any argument to next(err) instructs Express to skip all remaining standard middleware and jump directly to the nearest error handler."
    },
    {
      id: "q-node-083-7",
      prompt: "What built-in Express middleware serves static files (HTML, CSS, images) from a directory?",
      options: [
        { id: "a", label: "express.fileServer()" },
        { id: "b", label: "express.static(directoryPath)" },
        { id: "c", label: "express.assets()" },
        { id: "d", label: "express.public()" }
      ],
      correctIndex: 1,
      explanation: "express.static(rootPath) serves static assets directly from a designated directory on the server."
    },
    {
      id: "q-node-083-8",
      prompt: "What is the recommended practice when calling `next()` or sending a response inside an `if` block?",
      options: [
        { id: "a", label: "Never use if statements in middleware" },
        { id: "b", label: "Always prefix the call with `return` (e.g. `return next()`) to prevent execution from continuing into subsequent lines" },
        { id: "c", label: "Call process.exit()" },
        { id: "d", label: "Close the database connection" }
      ],
      correctIndex: 1,
      explanation: "Using return res.status(400)... or return next() ensures that the function halts immediately and does not accidentally execute subsequent statements."
    },
    {
      id: "q-node-083-9",
      prompt: "Where should the global 4-argument error-handling middleware be registered in an Express application?",
      options: [
        { id: "a", label: "At the very top of app.js before express.json()" },
        { id: "b", label: "At the very end of the file after all route handlers and 404 middlewares have been mounted" },
        { id: "c", label: "Inside package.json" },
        { id: "d", label: "Inside a React component" }
      ],
      correctIndex: 1,
      explanation: "Error middleware must be registered after all route handlers so that any error passed to next(err) from those routes can be caught."
    },
    {
      id: "q-node-083-10",
      prompt: "What event on the `res` object can be observed to measure total request-response duration accurately?",
      options: [
        { id: "a", label: "res.on('finish', ...)" },
        { id: "b", label: "res.on('start', ...)" },
        { id: "c", label: "res.on('destroy', ...)" },
        { id: "d", label: "res.on('packet', ...)" }
      ],
      correctIndex: 0,
      explanation: "The 'finish' event emits when the response headers and body have been completely flushed to the underlying operating system network socket."
    }
  ]
};

// LESSON 084: REST API DESIGN AND VALIDATION
const lesson084: CurriculumItem = {
  id: "item-node-084-rest-api-design-validation",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-03-express-http",
  moduleTitle: "Module 3: Express and HTTP",
  modulePosition: 3,
  title: "REST API Design and Validation",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "REST API Design and Validation: URL Conventions & Response Envelopes",
  contentDescription: "Master industry-standard REST URL naming conventions, nested resource representations, consistent JSON response envelope schemas, and pagination metadata.",
  codeSnippet: {
    language: "javascript",
    code: `// Standardized RESTful Response Envelope Pattern
export function sendSuccess(res, data, statusCode = 200, meta = null) {
  const response = { success: true, data };
  if (meta) response.meta = meta;
  return res.status(statusCode).json(response);
}

export function sendError(res, message, statusCode = 400, details = null) {
  const response = { success: false, error: message };
  if (details) response.details = details;
  return res.status(statusCode).json(response);
}

// Controller usage
app.get('/api/v1/courses', async (req, res) => {
  const courses = await fetchCourses();
  return sendSuccess(res, courses, 200, { total: courses.length, page: 1 });
});`
  },
  sections: [
    {
      title: "Core Concept: Resource-Oriented URL Modeling",
      explanation: "In RESTful API design, URIs represent nouns (resources and collections), while HTTP methods represent verbs (the operations performed on those resources). Naming URLs with action verbs (such as `/getCourse`, `/saveStudent`, or `/deleteOrder`) is an anti-pattern. Instead, model your API around plural nouns:\n\n- `GET /api/v1/courses`: Retrieve list of courses\n- `POST /api/v1/courses`: Create a new course\n- `GET /api/v1/courses/42`: Retrieve course #42\n- `PATCH /api/v1/courses/42`: Partially update course #42\n- `DELETE /api/v1/courses/42`: Delete course #42"
    },
    {
      title: "Hierarchical & Nested Sub-Resources",
      explanation: "When a resource naturally belongs to another resource (such as reviews or enrollments belonging to a course), nesting represents the relationship clearly in the URL path:",
      table: {
        headers: ["Endpoint", "HTTP Verb", "Purpose", "Rule of Thumb"],
        rows: [
          ["/courses/:courseId/reviews", "GET", "List all reviews for specific course", "Limit nesting to maximum 2 levels deep"],
          ["/courses/:courseId/reviews", "POST", "Submit a new review for specific course", "Parent must exist or return 404"],
          ["/reviews/:reviewId", "DELETE", "Delete a specific review directly", "Avoid deep nesting (/courses/1/reviews/5/comments/9)"]
        ]
      }
    },
    {
      title: "Consistent Response Envelopes",
      explanation: "Client applications (such as React, iOS, or Android frontends) struggle when API endpoints return inconsistent JSON shapes. Professional engineering teams adopt a standard envelope structure for all responses:\n\n```json\n// Success Response\n{\n  \"success\": true,\n  \"data\": { \"id\": \"crs_101\", \"title\": \"React Mastery\" },\n  \"meta\": { \"page\": 1, \"limit\": 20, \"total\": 105 }\n}\n\n// Error Response\n{\n  \"success\": false,\n  \"error\": \"Validation failed\",\n  \"details\": [\n    { \"field\": \"price\", \"message\": \"Price must be greater than zero\" }\n  ]\n}\n```"
    },
    {
      title: "Common Pitfalls & Architectural Best Practices",
      explanation: "Never expose internal database table column names directly to public clients if they reveal implementation secrets or contain sensitive fields (such as `password_hash`, `internal_notes`, or `stripe_customer_id`). Always serialize your database rows into sanitized Public Transfer Objects (DTOs) before sending them in `res.json()`."
    }
  ],
  questions: [
    {
      id: "q-node-084-1",
      prompt: "Which URL naming convention adheres strictly to REST architectural principles?",
      options: [
        { id: "a", label: "POST /api/v1/createNewStudent" },
        { id: "b", label: "POST /api/v1/students" },
        { id: "c", label: "GET /api/v1/student_add" },
        { id: "d", label: "POST /api/v1/student/create/new" }
      ],
      correctIndex: 1,
      explanation: "REST URIs should use plural nouns representing resources; the HTTP verb (POST) conveys the creation action."
    },
    {
      id: "q-node-084-2",
      prompt: "Why should deep resource URL nesting (e.g. `/schools/1/departments/2/teachers/3/classes/4/students`) be avoided?",
      options: [
        { id: "a", label: "Because URLs cannot exceed 20 characters in Chrome" },
        { id: "b", label: "Because deeply nested URLs become brittle, overly coupled, difficult to query, and awkward to paginate" },
        { id: "c", label: "Because Node.js rejects URLs with more than two slashes" },
        { id: "d", label: "Because DNS servers cannot resolve nested paths" }
      ],
      correctIndex: 1,
      explanation: "Deep nesting creates cumbersome and brittle endpoints. Industry best practice is to limit nesting to 1-2 levels and use direct resource IDs for deeper operations."
    },
    {
      id: "q-node-084-3",
      prompt: "What is the primary benefit of enforcing a consistent response envelope (e.g. `{ success, data, error }`) across all endpoints?",
      options: [
        { id: "a", label: "It eliminates the need for database indexes" },
        { id: "b", label: "It allows client applications to write unified API handling logic, interceptors, and error boundaries" },
        { id: "c", label: "It automatically compiles JavaScript into WebAssembly" },
        { id: "d", label: "It makes Express run faster" }
      ],
      correctIndex: 1,
      explanation: "A standardized envelope ensures frontend clients can parse responses predictably and handle errors uniformly across all services."
    },
    {
      id: "q-node-084-4",
      prompt: "Why should sensitive database fields like `password_hash` be explicitly stripped before returning a user object in an API response?",
      options: [
        { id: "a", label: "Because password hashes cannot be serialized into JSON" },
        { id: "b", label: "To prevent exposing cryptographic hashes to client-side inspection or man-in-the-middle attackers" },
        { id: "c", label: "Because hashes cause the V8 engine to crash" },
        { id: "d", label: "Because React does not support strings longer than 20 characters" }
      ],
      correctIndex: 1,
      explanation: "Leaking password hashes—even salted ones—exposes credentials to offline brute-force cracking if traffic or logs are intercepted."
    },
    {
      id: "q-node-084-5",
      prompt: "Which HTTP status code is appropriate when a client sends a request with valid JSON syntax but invalid business values (e.g. negative price)?",
      options: [
        { id: "a", label: "200 OK" },
        { id: "b", label: "400 Bad Request (or 422 Unprocessable Entity)" },
        { id: "c", label: "500 Internal Server Error" },
        { id: "d", label: "502 Bad Gateway" }
      ],
      correctIndex: 1,
      explanation: "400 Bad Request or 422 Unprocessable Entity signals to the client that the input was received but failed data validation rules."
    },
    {
      id: "q-node-084-6",
      prompt: "What HTTP header does a client send to inform the server what response format it expects to receive back?",
      options: [
        { id: "a", label: "Content-Type" },
        { id: "b", label: "Accept" },
        { id: "c", label: "Host" },
        { id: "d", label: "User-Agent" }
      ],
      correctIndex: 1,
      explanation: "The Accept header specifies the media types acceptable for the response (e.g. Accept: application/json)."
    },
    {
      id: "q-node-084-7",
      prompt: "What is an appropriate response when a client calls `GET /api/v1/courses/999` and course 999 does not exist?",
      options: [
        { id: "a", label: "Return 200 OK with `null`" },
        { id: "b", label: "Return 404 Not Found with a JSON error describing that the resource does not exist" },
        { id: "c", label: "Return 500 Internal Server Error" },
        { id: "d", label: "Return 301 Redirect to Google" }
      ],
      correctIndex: 1,
      explanation: "404 Not Found is the precise status communicating that the targeted resource ID does not exist on the server."
    },
    {
      id: "q-node-084-8",
      prompt: "What should an API return when a collection query matches zero results (e.g. searching for a nonexistent course name)?",
      options: [
        { id: "a", label: "404 Not Found" },
        { id: "b", label: "200 OK with an empty array `[]` in the data property" },
        { id: "c", label: "500 Server Error" },
        { id: "d", label: "400 Bad Request" }
      ],
      correctIndex: 1,
      explanation: "A search query matching zero results is a valid query: the collection exists, but happens to be empty, so 200 OK with data: [] is correct."
    },
    {
      id: "q-node-084-9",
      prompt: "What header is traditionally included in a `201 Created` response to tell the client where to locate the new resource?",
      options: [
        { id: "a", label: "Location" },
        { id: "b", label: "Referer" },
        { id: "c", label: "Destination" },
        { id: "d", label: "Origin" }
      ],
      correctIndex: 0,
      explanation: "The Location header indicates the URL of the newly created resource (e.g. Location: /api/v1/courses/crs_123)."
    },
    {
      id: "q-node-084-10",
      prompt: "How should an API handle deprecation of an older API version?",
      options: [
        { id: "a", label: "Immediately delete all old endpoints with no notice" },
        { id: "b", label: "Use additive changes where possible, announce deprecation schedules, and attach a Deprecation or Sunset HTTP header" },
        { id: "c", label: "Corrupt old responses deliberately" },
        { id: "d", label: "Change all passwords" }
      ],
      correctIndex: 1,
      explanation: "Proper API governance uses additive modifications, deprecation documentation, and Sunset/Deprecation headers to allow clients to migrate safely."
    }
  ]
};

// LESSON 085: REQUEST VALIDATION AND SCHEMA DESIGN
const lesson085: CurriculumItem = {
  id: "item-node-085-request-validation-schema-design",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-03-express-http",
  moduleTitle: "Module 3: Express and HTTP",
  modulePosition: 3,
  title: "Request Validation and Schema Design",
  duration: "30 mins",
  type: "cheatsheet",
  position: 5,
  contentHeading: "Request Validation and Schema Design: Defense-in-Depth & Zod Schemas",
  contentDescription: "Understand why client-side validation is insufficient, schema declaration using validation libraries (Zod), input sanitization, and generating informative 400 Bad Request error arrays.",
  codeSnippet: {
    language: "javascript",
    code: `// Schema-Based Request Validation Middleware
import { z } from 'zod';

// Declare strict validation schema for course creation
export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().trim().min(5, 'Title must be at least 5 characters').max(100),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    price: z.number().nonnegative('Price cannot be negative').max(9999.99),
    tags: z.array(z.string().trim()).min(1, 'At least one tag is required')
  })
});

// Reusable validation middleware factory
export const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });
    // Replace raw request inputs with cleaned and parsed data
    req.body = parsed.body;
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        issues: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      });
    }
    return next(error);
  }
};`
  },
  sections: [
    {
      title: "Core Concept: The Zero-Trust Security Principle",
      explanation: "A foundational rule of backend engineering is: NEVER TRUST CLIENT DATA. While modern React and mobile applications provide client-side form validation to enhance user experience, any attacker or automated script can bypass frontend code entirely using cURL, Postman, or custom Python scripts.\n\nThe backend server must validate every single byte of input at the network boundary before passing data to business services or database layers."
    },
    {
      title: "Schema Validation vs Manual If Statements",
      explanation: "Writing ad-hoc manual validation statements (`if (!req.body.title) ...`) across dozens of route handlers leads to missing checks, inconsistent error formats, and unmaintainable code.\n\nModern backends employ declarative schema validation engines (such as Zod, Joi, or Yup) that strictly enforce data shapes, type coercion, string trimming, and boundary limits:",
      table: {
        headers: ["Feature", "Manual if Checks", "Declarative Schema Validation (Zod)"],
        rows: [
          ["Type Enforcement", "Verbose (`typeof x === 'string'`)", "Declarative (`z.string()`, `z.number()`)"],
          ["Input Trimming", "Must manually call `.trim()` on every field", "Built-in `.trim()` transformation"],
          ["Enum Allowlisting", "Manual Set lookup (`allowed.has(val)`)", "`z.enum(['beginner', 'advanced'])`"],
          ["Error Output", "Ad-hoc, inconsistent error messages", "Standardized JSON array of path-indexed error issues"],
          ["Extra Field Stripping", "Prone to prototype poisoning & mass assignment", "Automatically strips undeclared malicious fields"]
        ]
      }
    },
    {
      title: "The Danger of Mass Assignment",
      explanation: "Mass assignment is a critical vulnerability where an attacker injects unexpected fields into an HTTP request body (such as `{ \"role\": \"admin\", \"isVerified\": true }`). If the backend passes `req.body` directly into an ORM update or database insert, the attacker elevates their own privileges.\n\nStrict schema validation protects your system by stripping all undeclared keys or throwing a validation error if unexpected keys appear."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Validation is strictly distinct from Authorization. Schema validation verifies data format (e.g. 'is this a valid UUID and valid price?'). Authorization verifies permissions (e.g. 'does this specific student own the course they are trying to update?'). Never confuse the two: valid data can still request an action the user is not permitted to perform!"
    }
  ],
  questions: [
    {
      id: "q-node-085-1",
      prompt: "Why is client-side form validation in React insufficient for backend security?",
      options: [
        { id: "a", label: "Because React does not support form inputs" },
        { id: "b", label: "Because any client can bypass the browser UI and send raw HTTP requests directly to the API using cURL or Postman" },
        { id: "c", label: "Because client validation causes memory leaks in the browser" },
        { id: "d", label: "Because browsers automatically disable JavaScript in forms" }
      ],
      correctIndex: 1,
      explanation: "The browser is completely outside your trust boundary. Anyone can forge arbitrary HTTP requests directly to your API without using your frontend."
    },
    {
      id: "q-node-085-2",
      prompt: "What is the 'mass assignment' vulnerability in web APIs?",
      options: [
        { id: "a", label: "Assigning too many variables inside a loop" },
        { id: "b", label: "Allowing untrusted request body properties (like `role: 'admin'`) to be passed directly to database models without filtering" },
        { id: "c", label: "Sending emails to 10,000 students at once" },
        { id: "d", label: "Assigning multiple CSS classes to an HTML tag" }
      ],
      correctIndex: 1,
      explanation: "Mass assignment occurs when unexpected fields submitted by users are blindly saved to the database, allowing unauthorized privilege escalation."
    },
    {
      id: "q-node-085-3",
      prompt: "What HTTP status code should be returned when an incoming request fails schema validation?",
      options: [
        { id: "a", label: "500 Internal Server Error" },
        { id: "b", label: "400 Bad Request" },
        { id: "c", label: "401 Unauthorized" },
        { id: "d", label: "403 Forbidden" }
      ],
      correctIndex: 1,
      explanation: "400 Bad Request signals that the server cannot process the request due to perceived client error (such as invalid request syntax or validation failure)."
    },
    {
      id: "q-node-085-4",
      prompt: "What is the primary difference between Validation and Authorization?",
      options: [
        { id: "a", label: "Validation checks if input data is properly formatted; Authorization checks if the user has permission to perform the action" },
        { id: "b", label: "Validation is done in SQL; Authorization is done in CSS" },
        { id: "c", label: "Authorization must always run in the browser" },
        { id: "d", label: "There is no difference" }
      ],
      correctIndex: 0,
      explanation: "Validation ensures data format and constraints are correct; authorization verifies whether the authenticated actor is permitted to execute that operation."
    },
    {
      id: "q-node-085-5",
      prompt: "Which schema method in Zod restricts a field to a predetermined set of acceptable string values?",
      options: [
        { id: "a", label: "z.enum(['beginner', 'intermediate', 'advanced'])" },
        { id: "b", label: "z.list('beginner', 'intermediate')" },
        { id: "c", label: "z.options(['beginner'])" },
        { id: "d", label: "z.subset()" }
      ],
      correctIndex: 0,
      explanation: "z.enum() creates a validation rule that permits only values included in the specified array of string literals."
    },
    {
      id: "q-node-085-6",
      prompt: "Why should strings be sanitized with `.trim()` during request validation?",
      options: [
        { id: "a", label: "To convert them to lowercase" },
        { id: "b", label: "To strip leading and trailing whitespace that can cause duplicate unique entries or accidental empty inputs" },
        { id: "c", label: "To compress string length for internet cables" },
        { id: "d", label: "To prevent CSS styling errors" }
      ],
      correctIndex: 1,
      explanation: "Trimming whitespace prevents errors where ' user@test.com ' is treated as distinct from 'user@test.com' or where strings containing only spaces pass length checks."
    },
    {
      id: "q-node-085-7",
      prompt: "How should a reusable validation middleware handle a validation failure?",
      options: [
        { id: "a", label: "Log the error and let the request proceed to the database" },
        { id: "b", label: "Return a 400 response immediately with a structured array of fields and error messages, halting the pipeline" },
        { id: "c", label: "Restart the Express process" },
        { id: "d", label: "Delete the user account" }
      ],
      correctIndex: 1,
      explanation: "Halting the pipeline with a 400 response and structured issues array provides clear feedback to the client without wasting backend processing."
    },
    {
      id: "q-node-085-8",
      prompt: "What is the benefit of validating `req.query` and `req.params` in addition to `req.body`?",
      options: [
        { id: "a", label: "It ensures IDs are valid UUIDs/integers and pagination numbers are positive before hitting database queries" },
        { id: "b", label: "It allows Express to run without Node.js" },
        { id: "c", label: "It reduces RAM usage to zero" },
        { id: "d", label: "It replaces SSL certificates" }
      ],
      correctIndex: 0,
      explanation: "Validating query and path parameters catches invalid database query inputs early (e.g., page=-5 or id='invalid_uuid') before they trigger database exceptions."
    },
    {
      id: "q-node-085-9",
      prompt: "What does Zod's `.nonnegative()` method enforce on a number schema?",
      options: [
        { id: "a", label: "The number must be greater than or equal to 0" },
        { id: "b", label: "The number must be strictly odd" },
        { id: "c", label: "The number must be a prime number" },
        { id: "d", label: "The number must have decimal places" }
      ],
      correctIndex: 0,
      explanation: "z.number().nonnegative() guarantees that the number is greater than or equal to zero (>= 0), making it ideal for prices, quantities, and balances."
    },
    {
      id: "q-node-085-10",
      prompt: "What does a schema validation middleware do when validation succeeds?",
      options: [
        { id: "a", label: "Calls `res.send()`" },
        { id: "b", label: "Assigns the cleaned, parsed data back to `req` and calls `next()` to advance to the route controller" },
        { id: "c", label: "Throws an unhandled exception" },
        { id: "d", label: "Logs the user out" }
      ],
      correctIndex: 1,
      explanation: "Successful validation cleans and parses the input, attaches it back to req, and invokes next() so the controller receives certified clean data."
    }
  ]
};

// MODULE 3 ASSESSMENT QUIZ (10 comprehensive questions)
const nodeModule03Quiz: CurriculumItem = {
  id: "item-node-m3-quiz",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-03-express-http",
  moduleTitle: "Module 3: Express and HTTP",
  modulePosition: 3,
  title: "Module 3 Assessment: Express & HTTP Architecture MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 6,
  contentHeading: "Module 3 Assessment: HTTP Verbs, Status Codes, Routers & Middleware",
  contentDescription: "Evaluate your comprehensive mastery of HTTP semantics, idempotent operations, Express sub-routing, request-response pipelines, and schema-driven validation.",
  questions: [
    ...(lesson081.questions || []).slice(0, 2),
    ...(lesson082.questions || []).slice(0, 2),
    ...(lesson083.questions || []).slice(0, 2),
    ...(lesson084.questions || []).slice(0, 2),
    ...(lesson085.questions || []).slice(0, 2)
  ]
};

// MODULE 3 HANDS-ON ASSESSMENT LAB
const nodeModule03Lab: CurriculumItem = {
  id: "item-node-m3-lab",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-03-express-http",
  moduleTitle: "Module 3: Express and HTTP",
  modulePosition: 3,
  title: "Module 3 Assessment: Production RESTful Course Catalog API",
  duration: "75 mins",
  type: "assignment",
  position: 7,
  contentHeading: "Module 3 Project Lab: Full REST API Pipeline with Zod Validation",
  contentDescription: "Construct a production-grade Express REST API with modular sub-routers, request correlation ID telemetry, Zod schema validation, and standardized JSON envelopes.",
  sections: [
    {
      title: "Lab Objectives & Requirements",
      explanation: "In this practical lab, you will build an Express backend implementing industry-standard REST API architecture:",
      bullets: [
        "Modular Routing: Mount a dedicated `courseRouter` under `/api/v1/courses` using `express.Router()`.",
        "Telemetry & Correlation IDs: Implement middleware that assigns a unique `req.id` (UUID or nanoid) to every incoming request, logs request method/path, and sets an `X-Request-Id` response header.",
        "Zod Schema Validation: Declare schemas validating `POST /courses` (title 5-100 chars, price >= 0, level in enum) and `PATCH /courses/:id` (partial schema). Return structured 400 Bad Request responses on failure.",
        "Standardized Response Envelopes: Ensure every successful endpoint returns `{ success: true, data: ... }` and every error returns `{ success: false, error: ..., details: ... }`.",
        "404 and Error Middleware: Implement a catch-all 404 handler for unknown routes and a global 4-argument error handler returning safe error descriptions."
      ]
    },
    {
      title: "Expected Deliverable Specification",
      explanation: "Submit your implementation containing:\n1. `src/routes/courses.js`: Express router with CRUD operations.\n2. `src/middleware/validate.js`: Generic Zod schema validation wrapper.\n3. `src/schemas/courseSchema.js`: Input schemas for course creation and editing.\n4. `src/middleware/errorHandler.js`: Centralized 4-argument error interceptor."
    }
  ]
};

// Exporting Module 3
export const nodeModule03: CurriculumSubModule = {
  id: "module-node-03-express-http",
  title: "Module 3: Express and HTTP",
  description: "Master HTTP semantics, REST architectural constraints, Express routers, middleware pipelines, error handling, and declarative Zod schema validation.",
  position: 3,
  duration: "3 hours",
  items: [
    lesson081,
    lesson082,
    lesson083,
    lesson084,
    lesson085,
    nodeModule03Quiz,
    nodeModule03Lab
  ]
};
