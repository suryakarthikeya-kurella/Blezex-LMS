import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 5: AUTHENTICATION AND SECURITY
// Lessons 092 - 095 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 092: AUTHENTICATION, AUTHORIZATION AND PASSWORD HASHING
const lesson092: CurriculumItem = {
  id: "item-node-092-auth-password-hashing",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-05-auth-security",
  moduleTitle: "Module 5: Authentication and Security",
  modulePosition: 5,
  title: "Authentication, Authorization and Password Hashing",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Authentication, Authorization and Password Hashing: Argon2 & Bcrypt",
  contentDescription: "Master the distinction between authentication and authorization, cryptographic work factors, salt generation, Argon2id/bcrypt hashing, and preventing timing attacks.",
  codeSnippet: {
    language: "javascript",
    code: `// Secure Password Hashing and Verification with bcrypt
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12; // Computationally tuned work factor (~250ms per hash)

export async function hashPassword(plainPassword) {
  // Salt is automatically generated and embedded into the output hash string
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function verifyPassword(plainPassword, storedHash) {
  // Constant-time comparison defends against timing attack side-channels
  return bcrypt.compare(plainPassword, storedHash);
}

// User Registration Flow
export async function registerUser(email, password, userRepo) {
  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) throw new ConflictError('Email already registered');
  
  const passwordHash = await hashPassword(password);
  return userRepo.create({ email, passwordHash, role: 'student' });
}`
  },
  sections: [
    {
      title: "Core Concept: Authentication vs Authorization",
      explanation: "Software security begins with understanding two complementary concepts that are often conflated:\n\n1. Authentication (AuthN): Verifying IDENTITY ('Who are you?'). This occurs when a user presents their credentials (email and password, passkey, or OAuth token) and the server validates that they are genuinely who they claim to be.\n2. Authorization (AuthZ): Verifying PERMISSION ('What are you allowed to do?'). Once identity is verified, authorization determines whether this specific user is permitted to perform a given action, such as editing a course or viewing billing data."
    },
    {
      title: "Why General Hashing Algorithms (MD5 / SHA-256) Fail for Passwords",
      explanation: "Beginners often mistakenly believe that hashing passwords with SHA-256 or MD5 is secure. It is NOT. Modern cryptographic hash functions like SHA-256 were designed for digital signatures and file integrity verification—meaning they were engineered to be EXTREMELY FAST. A modern consumer graphics card (GPU) can compute over 10 billion SHA-256 hashes per second!\n\nIf an attacker steals a database table containing SHA-256 hashes, they can run precomputed Rainbow Tables and GPU brute-force dictionaries to crack millions of passwords in minutes.",
      table: {
        headers: ["Algorithm", "Type", "GPU Resistance", "Suitability for Passwords"],
        rows: [
          ["MD5 / SHA-1", "Fast cryptographic digest", "NONE (Completely broken)", "DANGEROUS — Never use"],
          ["SHA-256 / SHA-512", "Fast cryptographic digest", "POOR (Billions of guesses/sec on GPUs)", "INSECURE for passwords"],
          ["bcrypt", "Adaptive key derivation (Blowfish)", "HIGH (Expensive memory/CPU setup)", "EXCELLENT industry standard"],
          ["Argon2id", "Memory-hard password hashing", "MAXIMUM (Resistant to ASIC/GPU attacks)", "GOLD STANDARD (OWASP recommended)"]
        ]
      }
    },
    {
      title: "Salting and Adaptive Work Factors",
      explanation: "To defeat Rainbow Table dictionary attacks, password hashing algorithms generate a cryptographic 'Salt'—a string of random bytes combined with the password before hashing. Because every user has a unique salt, two users with identical passwords ('password123') produce completely different hash strings in the database.\n\nFurthermore, algorithms like bcrypt and Argon2id feature configurable 'Work Factors' (or cost factors). As computer hardware becomes faster over time, engineers can increase the salt rounds (e.g. from 10 to 12) to ensure computing a single hash always takes approximately 250 milliseconds, making automated brute-force attacks computationally infeasible."
    },
    {
      title: "Constant-Time Comparison & Timing Attacks",
      explanation: "When verifying passwords or security tokens, standard JavaScript string comparison (`storedToken === clientToken`) is vulnerable to Timing Attacks. Standard string comparison compares characters sequentially and returns `false` as soon as the first mismatch is found. An attacker measuring request latency down to nanoseconds can deduce character by character what the correct string is!\n\nAlways use constant-time comparison algorithms (such as `bcrypt.compare` or Node's native `crypto.timingSafeEqual`) that evaluate in identical time regardless of where mismatches occur."
    }
  ],
  questions: [
    {
      id: "q-node-092-1",
      prompt: "What is the primary difference between Authentication and Authorization?",
      options: [
        { id: "a", label: "Authentication verifies who you are; Authorization verifies what permissions you have" },
        { id: "b", label: "Authentication is done in CSS; Authorization is done in HTML" },
        { id: "c", label: "Authentication is only needed on mobile phones" },
        { id: "d", label: "They are synonyms for the exact same process" }
      ],
      correctIndex: 0,
      explanation: "Authentication establishes caller identity; authorization verifies whether that identified caller has the privilege to perform a specific action."
    },
    {
      id: "q-node-092-2",
      prompt: "Why should fast hashing algorithms like SHA-256 or MD5 never be used for user passwords?",
      options: [
        { id: "a", label: "Because SHA-256 is only available in Python" },
        { id: "b", label: "Because GPUs can calculate billions of SHA-256 hashes per second, making stolen password databases vulnerable to instant brute-force cracking" },
        { id: "c", label: "Because SHA-256 cannot hash letters" },
        { id: "d", label: "Because MD5 uses too much memory" }
      ],
      correctIndex: 1,
      explanation: "Fast hash functions allow attackers to test billions of password candidates per second using consumer GPUs and precomputed rainbow tables."
    },
    {
      id: "q-node-092-3",
      prompt: "What is the purpose of a cryptographic 'Salt' in password hashing?",
      options: [
        { id: "a", label: "To encrypt the database connection string" },
        { id: "b", label: "To combine unique random bytes with each password, ensuring identical passwords generate completely different hashes and defeating rainbow tables" },
        { id: "c", label: "To shorten password length" },
        { id: "d", label: "To speed up user login" }
      ],
      correctIndex: 1,
      explanation: "Salting ensures that identical passwords yield different hashes, preventing attackers from using universal lookup tables to crack multiple accounts simultaneously."
    },
    {
      id: "q-node-092-4",
      prompt: "Which password hashing algorithm is recognized as the current gold standard and recommended by OWASP?",
      options: [
        { id: "a", label: "Argon2id" },
        { id: "b", label: "DES" },
        { id: "c", label: "Base64" },
        { id: "d", label: "Rot13" }
      ],
      correctIndex: 0,
      explanation: "Argon2id won the Password Hashing Competition and is recommended by OWASP due to its resistance to both side-channel and GPU/ASIC attacks."
    },
    {
      id: "q-node-092-5",
      prompt: "What is a 'timing attack' in authentication systems?",
      options: [
        { id: "a", label: "When an attacker changes the server clock" },
        { id: "b", label: "When an attacker measures the precise time taken by string comparisons to deduce secret tokens character by character" },
        { id: "c", label: "When an attacker logs in at midnight" },
        { id: "d", label: "When an Express server restarts on a timer" }
      ],
      correctIndex: 1,
      explanation: "Standard string equality returns early on the first mismatched character; measuring response time variations allows attackers to guess secrets."
    },
    {
      id: "q-node-092-6",
      prompt: "What native Node.js crypto function performs constant-time buffer comparison to prevent timing attacks?",
      options: [
        { id: "a", label: "crypto.timingSafeEqual(bufA, bufB)" },
        { id: "b", label: "crypto.compareSafe()" },
        { id: "c", label: "crypto.equalTime()" },
        { id: "d", label: "crypto.matchStrict()" }
      ],
      correctIndex: 0,
      explanation: "crypto.timingSafeEqual executes in constant time regardless of where or whether byte mismatches occur, defeating timing analysis."
    },
    {
      id: "q-node-092-7",
      prompt: "What does increasing the 'salt rounds' (work factor) in bcrypt do?",
      options: [
        { id: "a", label: "It doubles the computational iterations for every round added, slowing down brute-force attacks" },
        { id: "b", label: "It makes the output hash twice as long" },
        { id: "c", label: "It reduces RAM consumption to zero" },
        { id: "d", label: "It changes the database schema" }
      ],
      correctIndex: 0,
      explanation: "Bcrypt work factor 2^N means increasing the cost parameter by 1 doubles the calculation time, keeping hashing intentionally slow against hardware advances."
    },
    {
      id: "q-node-092-8",
      prompt: "Why should login error messages always be generic (e.g. 'Invalid email or password') rather than specific?",
      options: [
        { id: "a", label: "To save internet bandwidth" },
        { id: "b", label: "To prevent username enumeration (revealing to attackers whether a given email address is registered on the platform)" },
        { id: "c", label: "Because Express cannot display more than 4 words" },
        { id: "d", label: "To comply with GDPR font standards" }
      ],
      correctIndex: 1,
      explanation: "Telling an attacker 'Email not found' allows them to compile a list of valid user accounts on your platform (user enumeration)."
    },
    {
      id: "q-node-092-9",
      prompt: "Can a bcrypt hash be 'decrypted' back into the original plain text password?",
      options: [
        { id: "a", label: "Yes, using the master database key" },
        { id: "b", label: "No, cryptographic hashing is a one-way mathematical function; verification is done by hashing candidate inputs and comparing hashes" },
        { id: "c", label: "Yes, by reversing the string" },
        { id: "d", label: "Only if the password is under 8 characters" }
      ],
      correctIndex: 1,
      explanation: "Hashing is strictly one-way; the original password is never recoverable from the hash. bcrypt.compare hashes the user input to test for a match."
    },
    {
      id: "q-node-092-10",
      prompt: "Where is the salt stored in a standard bcrypt hash string (`$2b$12$...`)?",
      options: [
        { id: "a", label: "In a separate secret text file on the server" },
        { id: "b", label: "Embedded directly inside the 60-character bcrypt hash string itself" },
        { id: "c", label: "In browser cookies" },
        { id: "d", label: "In git metadata" }
      ],
      correctIndex: 1,
      explanation: "A bcrypt hash string encapsulates the algorithm identifier ($2b$), cost factor ($12$), 22-character salt, and 31-character checksum into one string."
    }
  ]
};

// LESSON 093: SESSIONS, COOKIES AND JWT
const lesson093: CurriculumItem = {
  id: "item-node-093-sessions-cookies-jwt",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-05-auth-security",
  moduleTitle: "Module 5: Authentication and Security",
  modulePosition: 5,
  title: "Sessions, Cookies and JWT",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Sessions, Cookies and JWT: Stateful vs Stateless Authentication",
  contentDescription: "Understand server-side sessions vs stateless JSON Web Tokens (JWTs), cryptographic signing vs encryption, cookie security flags (HttpOnly, Secure, SameSite), and refresh token rotation.",
  codeSnippet: {
    language: "javascript",
    code: `// Secure Cookie-Based JWT Transmission Architecture
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export function generateAccessToken(user) {
  // Never embed passwords or sensitive private keys into JWT claims
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    ACCESS_SECRET,
    { expiresIn: '15m' } // Short-lived access token
  );
}

export function sendAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript (XSS) from reading the cookie
    secure: process.env.NODE_ENV === 'production', // Transmitted strictly over HTTPS
    sameSite: 'strict', // Neutralizes Cross-Site Request Forgery (CSRF)
    maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds
  });
}`
  },
  sections: [
    {
      title: "Core Concept: Stateful Sessions vs Stateless Tokens",
      explanation: "HTTP is a stateless protocol. To maintain user login state across multiple requests, systems adopt one of two architectural patterns:\n\n1. Stateful Sessions (Server-Side): The server generates a random session ID, stores session state (user ID, permissions) in an in-memory database like Redis, and issues an HTTP cookie containing only the session ID. The server must query Redis on every single request. Instant revocation is easy (delete the session from Redis).\n\n2. Stateless Tokens (JWT): The server packages user identity and claims into a cryptographically signed JSON Web Token (JWT) and transmits it to the client. On subsequent requests, the server validates the cryptographic signature without querying any database. However, revoking an unexpired token before its expiration requires maintaining a revocation blocklist."
    },
    {
      title: "The Anatomy of a JSON Web Token",
      explanation: "A JWT is composed of three Base64URL-encoded strings separated by periods (`header.payload.signature`):",
      table: {
        headers: ["JWT Part", "Contents", "Can Anyone Read It?", "Can Anyone Modify It?"],
        rows: [
          ["Header", "Algorithm (e.g. HS256) and token type ('JWT')", "YES (Decodable by anyone)", "NO (Breaks signature)"],
          ["Payload (Claims)", "Identity claims (sub, email, role, exp, iat)", "YES (NEVER put secrets here!)", "NO (Breaks signature)"],
          ["Signature", "HMAC-SHA256(header + '.' + payload, secretKey)", "Cryptographic digest", "IMPOSSIBLE without server secret"]
        ]
      }
    },
    {
      title: "The Critical Distinction: Signing vs Encryption",
      explanation: "A signed JWT is NOT encrypted! Any client, proxy, or browser extension can decode the Base64 payload and read all user claims in plain text. Signing merely guarantees that the payload has not been tampered with or forged by an unauthorized party. Never put credit card numbers, passwords, or personal identification data inside a JWT payload."
    },
    {
      title: "Cookie Security: Defending Against XSS and CSRF",
      explanation: "Storing JWTs in browser `localStorage` is an extreme vulnerability: any Cross-Site Scripting (XSS) bug in any third-party npm package can read `localStorage.getItem('token')` and exfiltrate your user's credentials to an attacker's server.\n\nAlways store authentication tokens inside HTTP cookies configured with strict security flags:",
      bullets: [
        "HttpOnly: Blocks client-side JavaScript (`document.cookie`) from reading the cookie, completely neutralizing XSS token theft.",
        "Secure: Guarantees the browser only transmits the cookie over encrypted HTTPS connections (disabled only on localhost development).",
        "SameSite=Strict (or Lax): Instructs the browser not to attach the cookie to cross-origin requests, neutralizing Cross-Site Request Forgery (CSRF) attacks."
      ]
    }
  ],
  questions: [
    {
      id: "q-node-093-1",
      prompt: "Why is storing JWT authentication tokens in browser `localStorage` considered a security risk?",
      options: [
        { id: "a", label: "Because localStorage cannot store strings" },
        { id: "b", label: "Because any JavaScript running on the page (including malicious third-party dependencies via XSS) can access localStorage and steal the token" },
        { id: "c", label: "Because localStorage is wiped when the browser is closed" },
        { id: "d", label: "Because localStorage is limited to 1 kilobyte" }
      ],
      correctIndex: 1,
      explanation: "localStorage is vulnerable to Cross-Site Scripting (XSS); any compromised script can extract tokens. HttpOnly cookies cannot be accessed via JavaScript."
    },
    {
      id: "q-node-093-2",
      prompt: "What does the `HttpOnly` cookie flag guarantee?",
      options: [
        { id: "a", label: "The cookie is sent over HTTP instead of HTTPS" },
        { id: "b", label: "Client-side JavaScript (`document.cookie`) cannot read or access the cookie, protecting it from XSS exfiltration" },
        { id: "c", label: "The cookie never expires" },
        { id: "d", label: "The cookie is only valid on Mondays" }
      ],
      correctIndex: 1,
      explanation: "HttpOnly instructs the browser that JavaScript must never be permitted to access document.cookie, mitigating XSS token theft."
    },
    {
      id: "q-node-093-3",
      prompt: "Is the payload of a standard signed JWT encrypted?",
      options: [
        { id: "a", label: "Yes, it is encrypted using AES-256" },
        { id: "b", label: "No, it is merely Base64URL-encoded and can be decoded and read in plain text by anyone who inspects it" },
        { id: "c", label: "Only if the user is an admin" },
        { id: "d", label: "Yes, using the database password" }
      ],
      correctIndex: 1,
      explanation: "Signed JWTs provide integrity verification, not confidentiality. The payload is easily decodable; never store private secrets inside it."
    },
    {
      id: "q-node-093-4",
      prompt: "What are the three parts of a JWT separated by dots?",
      options: [
        { id: "a", label: "Header, Payload, and Signature" },
        { id: "b", label: "Username, Password, and Role" },
        { id: "c", label: "Method, Path, and Body" },
        { id: "d", label: "Public Key, Private Key, and Salt" }
      ],
      correctIndex: 0,
      explanation: "A JWT consists of Header (algorithm & token type), Payload (claims & expiry), and Signature (cryptographic digest)."
    },
    {
      id: "q-node-093-5",
      prompt: "What does the `SameSite=Strict` cookie attribute defend against?",
      options: [
        { id: "a", label: "SQL Injection" },
        { id: "b", label: "Cross-Site Request Forgery (CSRF)" },
        { id: "c", label: "Buffer Overflow" },
        { id: "d", label: "Denial of Service" }
      ],
      correctIndex: 1,
      explanation: "SameSite=Strict prevents the browser from sending the cookie in cross-site requests (e.g. following links from external sites), defeating CSRF."
    },
    {
      id: "q-node-093-6",
      prompt: "What is the primary architectural tradeoff between stateful sessions (Redis) and stateless tokens (JWT)?",
      options: [
        { id: "a", label: "Sessions allow instant revocation but require a database lookup on every request; JWTs avoid database lookups but are difficult to revoke before expiry" },
        { id: "b", label: "JWTs only work on mobile devices; sessions only work on PCs" },
        { id: "c", label: "Sessions run faster than memory" },
        { id: "d", label: "JWTs require Windows Server" }
      ],
      correctIndex: 0,
      explanation: "JWTs enable stateless verification across services without database lookups, but revoking an active JWT before it expires requires a blacklist."
    },
    {
      id: "q-node-093-7",
      prompt: "What is the role of a short-lived Access Token (e.g. 15 mins) paired with a long-lived Refresh Token (e.g. 7 days)?",
      options: [
        { id: "a", label: "To double the database storage requirements" },
        { id: "b", label: "To limit the exposure window if an access token is leaked, while allowing users to obtain new tokens seamlessly using a revocable refresh token" },
        { id: "c", label: "To convert cookies into HTML" },
        { id: "d", label: "To bypass CORS checks" }
      ],
      correctIndex: 1,
      explanation: "Short-lived access tokens minimize the damage of token theft, while refresh tokens allow clients to renew credentials and can be revoked on logout."
    },
    {
      id: "q-node-093-8",
      prompt: "What claim in a JWT payload specifies the timestamp after which the token is invalid?",
      options: [
        { id: "a", label: "iat (Issued At)" },
        { id: "b", label: "exp (Expiration Time)" },
        { id: "c", label: "sub (Subject)" },
        { id: "d", label: "aud (Audience)" }
      ],
      correctIndex: 1,
      explanation: "The exp claim contains a Unix timestamp denoting the exact moment after which the token must be rejected as expired."
    },
    {
      id: "q-node-093-9",
      prompt: "What happens if an attacker modifies the payload of a JWT (e.g. changing `role: 'student'` to `role: 'admin'`) without knowing the server secret?",
      options: [
        { id: "a", label: "The server accepts it" },
        { id: "b", label: "The signature check (`jwt.verify`) fails and the server rejects the token as invalid" },
        { id: "c", label: "The server deletes the database" },
        { id: "d", label: "The token transforms into a cookie" }
      ],
      correctIndex: 1,
      explanation: "The signature is calculated over the header and payload using the secret; modifying the payload renders the signature invalid."
    },
    {
      id: "q-node-093-10",
      prompt: "What should an authentication middleware do upon verifying a valid JWT in Express?",
      options: [
        { id: "a", label: "Send an immediate 200 OK response" },
        { id: "b", label: "Attach decoded user claims to `req.user` and call `next()` to proceed to downstream handlers" },
        { id: "c", label: "Delete the token" },
        { id: "d", label: "Restart the server" }
      ],
      correctIndex: 1,
      explanation: "Attaching decoded claims (req.user = decoded) makes user identity and permissions accessible to subsequent controllers and business services."
    }
  ]
};

// LESSON 094: AUTHORIZATION AND ROLE-BASED ACCESS
const lesson094: CurriculumItem = {
  id: "item-node-094-authorization-rbac",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-05-auth-security",
  moduleTitle: "Module 5: Authentication and Security",
  modulePosition: 5,
  title: "Authorization and Role-Based Access",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Authorization and Role-Based Access: RBAC, Ownership & Deny-by-Default",
  contentDescription: "Master Role-Based Access Control (RBAC), resource-level ownership validation (IDOR defense), reusable authorization middleware factories, and the principle of least privilege.",
  codeSnippet: {
    language: "javascript",
    code: `// Role-Based and Ownership Authorization Middleware
export function requireRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: \`Forbidden: Requires one of [\${allowedRoles.join(', ')}]\`
      });
    }
    next();
  };
}

// Ownership verification preventing IDOR (Insecure Direct Object Reference)
export async function requireCourseOwnership(req, res, next) {
  const course = await courseRepo.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });

  // Admins can manage everything; instructors can only manage their own courses
  if (req.user.role !== 'admin' && course.instructorId !== req.user.id) {
    return res.status(403).json({ error: 'You do not have permission to modify this course' });
  }

  req.course = course; // Attach verified resource to avoid duplicate database query
  next();
}`
  },
  sections: [
    {
      title: "Core Concept: The Principle of Least Privilege",
      explanation: "The Principle of Least Privilege (PoLP) states that every user, process, and system component must be granted strictly the minimum access privileges necessary to perform its intended job—and no more.\n\nIn a learning platform, students should only access their own profile and enrolled courses; instructors should manage the courses they authored; and administrators should have system governance capabilities. Hiding an 'Admin Panel' button in a React UI is NOT security: if the server accepts raw HTTP requests from a student calling `/api/admin/courses`, your system is compromised."
    },
    {
      title: "Role-Based Access Control (RBAC) Architecture",
      explanation: "RBAC organizes permissions by mapping users to roles (e.g. `student`, `instructor`, `admin`), where each role carries specific authorized capabilities. Reusable middleware factories allow declarative route protection:",
      table: {
        headers: ["Endpoint", "HTTP Method", "Authorized Roles", "Ownership Check Required?"],
        rows: [
          ["/api/v1/courses", "GET", "Public (Any role)", "NO"],
          ["/api/v1/courses", "POST", "['instructor', 'admin']", "NO (New resource)"],
          ["/api/v1/courses/:id", "PATCH / DELETE", "['instructor', 'admin']", "YES (Must be course author or admin)"],
          ["/api/v1/admin/users", "GET / DELETE", "['admin'] only", "NO (Admin governance)"]
        ]
      }
    },
    {
      title: "Defending Against IDOR (Insecure Direct Object Reference)",
      explanation: "A critical OWASP Top 10 vulnerability is Insecure Direct Object Reference (IDOR). An IDOR occurs when an application checks that a user has a valid role (e.g. 'instructor'), but fails to verify that the target course actually belongs to that instructor:\n\n```javascript\n// VULNERABLE: Any instructor can edit ANY course in the database!\napp.patch('/api/courses/:id', requireRoles('instructor'), async (req, res) => {\n  await db.updateCourse(req.params.id, req.body);\n});\n```\n\nTo prevent IDOR, always verify resource ownership: `WHERE id = req.params.id AND (instructor_id = req.user.id OR req.user.role = 'admin')`."
    },
    {
      title: "Common Pitfalls & Runtime Best Practices",
      explanation: "Adopt a strict Deny-by-Default security posture. If a route does not explicitly allow anonymous public access, assume it requires authentication. Furthermore, never allow clients to specify their own role in registration bodies (`req.body.role = 'admin'`). Default new accounts to the lowest privilege level ('student') and require explicit administrative elevation."
    }
  ],
  questions: [
    {
      id: "q-node-094-1",
      prompt: "What is an Insecure Direct Object Reference (IDOR) vulnerability?",
      options: [
        { id: "a", label: "When a database connection times out" },
        { id: "b", label: "When an application exposes a direct reference to an internal resource (e.g. `/api/courses/42`) without verifying that the requesting user owns or has permission to access that specific resource" },
        { id: "c", label: "When an HTML form lacks a submit button" },
        { id: "d", label: "When a CSS file is missing" }
      ],
      correctIndex: 1,
      explanation: "IDOR occurs when access control is missing at the object level, allowing authenticated users to access or modify resources belonging to others by simply changing the ID."
    },
    {
      id: "q-node-094-2",
      prompt: "Why is hiding an 'Admin Dashboard' link in a React frontend navigation bar insufficient for access control?",
      options: [
        { id: "a", label: "Because React does not support hiding components" },
        { id: "b", label: "Because any user can forge raw HTTP requests directly to the backend admin endpoints using cURL or developer tools" },
        { id: "c", label: "Because browsers unhide links automatically" },
        { id: "d", label: "Because CSS overrides backend security" }
      ],
      correctIndex: 1,
      explanation: "Frontend UI changes are visual conveniences; real security authorization must be enforced on the server for every incoming request."
    },
    {
      id: "q-node-094-3",
      prompt: "What HTTP status code must be returned when an authenticated student attempts to call an admin-only endpoint?",
      options: [
        { id: "a", label: "401 Unauthorized" },
        { id: "b", label: "403 Forbidden" },
        { id: "c", label: "404 Not Found" },
        { id: "d", label: "500 Internal Error" }
      ],
      correctIndex: 1,
      explanation: "403 Forbidden indicates that the caller's identity is authenticated, but their account lacks the necessary permissions for the requested resource."
    },
    {
      id: "q-node-094-4",
      prompt: "What is the 'Deny-by-Default' security architecture principle?",
      options: [
        { id: "a", label: "Access is forbidden to all resources unless explicitly permitted by an authorized rule" },
        { id: "b", label: "All users are automatically deleted after 30 days" },
        { id: "c", label: "All HTTP requests return 404" },
        { id: "d", label: "Database queries are disabled" }
      ],
      correctIndex: 0,
      explanation: "Deny-by-Default ensures that unconfigured endpoints remain protected, preventing accidental public exposure of new features."
    },
    {
      id: "q-node-094-5",
      prompt: "How does a middleware factory function like `requireRoles('admin', 'instructor')` work in Express?",
      options: [
        { id: "a", label: "It compiles TypeScript" },
        { id: "b", label: "It returns an Express middleware function `(req, res, next)` that captures the allowed roles via closure and verifies `req.user.role`" },
        { id: "c", label: "It deletes unauthorized users from the database" },
        { id: "d", label: "It restarts the web server" }
      ],
      correctIndex: 1,
      explanation: "A middleware factory takes role arguments and returns a configured middleware handler that verifies whether req.user.role is authorized."
    },
    {
      id: "q-node-094-6",
      prompt: "Why should self-registration endpoints (`POST /api/register`) ignore `req.body.role`?",
      options: [
        { id: "a", label: "Because roles cannot be stored in databases" },
        { id: "b", label: "To prevent privilege escalation where an attacker registers a new account and assigns themselves the 'admin' role" },
        { id: "c", label: "Because Express does not allow strings in POST bodies" },
        { id: "d", label: "To save RAM" }
      ],
      correctIndex: 1,
      explanation: "Allowing users to set their own role enables instant privilege escalation. Roles must be assigned by the server (default 'student') or elevated by admins."
    },
    {
      id: "q-node-094-7",
      prompt: "What is the Principle of Least Privilege (PoLP)?",
      options: [
        { id: "a", label: "Granting users the absolute minimum set of permissions necessary to complete their job" },
        { id: "b", label: "Giving all developers root access to production" },
        { id: "c", label: "Running all servers as root" },
        { id: "d", label: "Disabling passwords entirely" }
      ],
      correctIndex: 0,
      explanation: "Least privilege minimizes the potential blast radius if an account, credential, or service is compromised."
    },
    {
      id: "q-node-094-8",
      prompt: "How can resource ownership checks be optimized to avoid duplicate database lookups in route handlers?",
      options: [
        { id: "a", label: "By skipping the check entirely" },
        { id: "b", label: "By attaching the loaded and verified resource object directly to `req` (e.g. `req.course = course`) so downstream controllers can use it immediately" },
        { id: "c", label: "By storing all courses in browser cookies" },
        { id: "d", label: "By running SQL queries in CSS" }
      ],
      correctIndex: 1,
      explanation: "Attaching the fetched record to the req object avoids redundant database queries between authorization middleware and the controller."
    },
    {
      id: "q-node-094-9",
      prompt: "What is Attribute-Based Access Control (ABAC) compared to Role-Based Access Control (RBAC)?",
      options: [
        { id: "a", label: "ABAC evaluates dynamic contextual attributes (user department, resource classification, time of day, IP subnet) rather than static role labels" },
        { id: "b", label: "ABAC only works in relational databases" },
        { id: "c", label: "ABAC is completely deprecated" },
        { id: "d", label: "ABAC requires HTML5" }
      ],
      correctIndex: 0,
      explanation: "ABAC provides fine-grained authorization policies based on attributes of the user, the resource, the action, and environmental context."
    },
    {
      id: "q-node-094-10",
      prompt: "When deleting a course, what authorization criteria should be verified?",
      options: [
        { id: "a", label: "Verify the user is logged in only" },
        { id: "b", label: "Verify the user has permission AND is either an administrator or the specific instructor who created that course" },
        { id: "c", label: "Verify that the user has a Gmail address" },
        { id: "d", label: "Verify the browser is Google Chrome" }
      ],
      correctIndex: 1,
      explanation: "State-altering operations on specific resources must verify both general role permission and specific resource ownership."
    }
  ]
};

// LESSON 095: CORS, CSRF, INJECTION AND SECURITY HEADERS
const lesson095: CurriculumItem = {
  id: "item-node-095-cors-csrf-injection-headers",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-05-auth-security",
  moduleTitle: "Module 5: Authentication and Security",
  modulePosition: 5,
  title: "CORS, CSRF, Injection and Security Headers",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "CORS, CSRF, Injection and Security Headers: Full Defense-in-Depth",
  contentDescription: "Master Cross-Origin Resource Sharing (CORS), preflight OPTIONS requests, CSRF defenses, NoSQL injection neutralization, and HTTP security headers with Helmet.",
  codeSnippet: {
    language: "javascript",
    code: `// Enterprise Defense-in-Depth Security Middleware Stack
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// 1. Helmet sets 15+ secure HTTP headers (CSP, HSTS, X-Content-Type-Options)
app.use(helmet());

// 2. Strict CORS allowlisting (never use origin: '*' with credentials: true)
const ALLOWED_ORIGINS = new Set([
  'https://blezex.com',
  'https://student.blezex.com'
]);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser server-to-server or mobile requests without origin header
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS_VIOLATION: Cross-origin access denied'));
  },
  credentials: true, // Permits transmission of HttpOnly cookies across origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));`
  },
  sections: [
    {
      title: "Core Concept: The Browser Same-Origin Policy & CORS",
      explanation: "Web browsers enforce the Same-Origin Policy (SOP): by default, JavaScript running on `https://my-site.com` is forbidden from reading HTTP responses from `https://api.blezex.com`. This fundamental browser defense prevents malicious websites from stealing banking data using active user sessions.\n\nCross-Origin Resource Sharing (CORS) is a mechanism by which a server explicitly advertises via HTTP response headers (`Access-Control-Allow-Origin`) which trusted external browser origins are permitted to read its responses.\n\nCrucial architectural note: CORS is enforced solely by WEB BROWSERS. CORS does NOT protect your API against backend scripts, cURL, or hackers, and it is NOT an authentication mechanism!"
    },
    {
      title: "Preflight Requests: The OPTIONS Method",
      explanation: "For 'non-simple' cross-origin requests (such as requests using `PATCH`, `DELETE`, custom headers like `Authorization`, or JSON `Content-Type`), the browser sends a preliminary `OPTIONS` request called a 'preflight' to ask the server whether the operation is permitted. Your Express server must reply to `OPTIONS` with appropriate CORS headers before the browser dispatches the real HTTP request."
    },
    {
      title: "Defending with Helmet: HTTP Security Headers",
      explanation: "The `helmet` middleware configures standard defensive HTTP headers that shield browsers from common exploits:",
      table: {
        headers: ["HTTP Header", "Purpose / Threat Neutralized", "Configured by Helmet"],
        rows: [
          ["Content-Security-Policy (CSP)", "Restricts script, style, and media sources to prevent XSS injection", "YES (Configurable directives)"],
          ["Strict-Transport-Security (HSTS)", "Forces browser to communicate strictly over HTTPS, defeating SSL stripping", "YES (max-age=15552000)"],
          ["X-Content-Type-Options: nosniff", "Prevents MIME-type sniffing (executing images as scripts)", "YES"],
          ["X-Frame-Options: SAMEORIGIN", "Prevents clickjacking by blocking iframe embedding on other sites", "YES"],
          ["Referrer-Policy: no-referrer", "Prevents leaking sensitive URLs in Referer headers", "YES"]
        ]
      }
    },
    {
      title: "NoSQL and SQL Injection Defense",
      explanation: "Never concatenate raw input into database queries. In SQL, use parameterized queries with placeholders (`$1, $2`). In MongoDB, protect against NoSQL Injection (where an attacker submits `{ \"$gt\": \"\" }` as a password in JSON) by using packages like `express-mongo-sanitize` to strip all `$` and `.` operators from request keys."
    }
  ],
  questions: [
    {
      id: "q-node-095-1",
      prompt: "Who enforces the Cross-Origin Resource Sharing (CORS) policy?",
      options: [
        { id: "a", label: "The database engine" },
        { id: "b", label: "The client's web browser" },
        { id: "c", label: "The physical router" },
        { id: "d", label: "The Node.js V8 compiler" }
      ],
      correctIndex: 1,
      explanation: "CORS is strictly a browser-enforced security mechanism. Non-browser clients (like Postman or cURL) ignore CORS completely."
    },
    {
      id: "q-node-095-2",
      prompt: "Can CORS replace backend API authentication?",
      options: [
        { id: "a", label: "Yes, enabling CORS guarantees only friendly users can connect" },
        { id: "b", label: "No, CORS does not stop any non-browser client (cURL, Python, mobile apps) from connecting directly to your API" },
        { id: "c", label: "Only in single-page React apps" },
        { id: "d", label: "Only if using HTTPS" }
      ],
      correctIndex: 1,
      explanation: "CORS only instructs web browsers whether to expose response data to frontend scripts; it does not block backend scripts or hackers from querying endpoints."
    },
    {
      id: "q-node-095-3",
      prompt: "What HTTP method does a browser dispatch for CORS preflight checks before sending a non-simple request?",
      options: [
        { id: "a", label: "HEAD" },
        { id: "b", label: "OPTIONS" },
        { id: "c", label: "CONNECT" },
        { id: "d", label: "TRACE" }
      ],
      correctIndex: 1,
      explanation: "Browsers dispatch an HTTP OPTIONS request to query server permissions and verify allowed methods, headers, and credentials before the real request."
    },
    {
      id: "q-node-095-4",
      prompt: "Why is combining `origin: '*'` with `credentials: true` prohibited by browser CORS specifications?",
      options: [
        { id: "a", label: "Because browsers cannot parse wildcards" },
        { id: "b", label: "Because allowing any arbitrary malicious website to send credentialed cookie requests would completely dismantle web security" },
        { id: "c", label: "Because asterisks crash Express" },
        { id: "d", label: "Because SSL certificates reject asterisks" }
      ],
      correctIndex: 1,
      explanation: "Browsers deliberately reject Access-Control-Allow-Origin: * when credentials are enabled to prevent rogue websites from making authenticated requests on behalf of users."
    },
    {
      id: "q-node-095-5",
      prompt: "What does the `helmet` npm package do in an Express application?",
      options: [
        { id: "a", label: "It compiles JavaScript to C++" },
        { id: "b", label: "It automatically configures over 15 secure HTTP response headers (CSP, HSTS, X-Content-Type-Options) to shield against common web vulnerabilities" },
        { id: "c", label: "It backs up the PostgreSQL database" },
        { id: "d", label: "It styles HTML forms" }
      ],
      correctIndex: 1,
      explanation: "Helmet sets sensible HTTP security headers, enforcing HTTPS, preventing clickjacking, stopping MIME-sniffing, and establishing Content Security Policies."
    },
    {
      id: "q-node-095-6",
      prompt: "What does the `Strict-Transport-Security` (HSTS) header instruct the browser to do?",
      options: [
        { id: "a", label: "Force all future requests to that domain to strictly use HTTPS, refusing to connect over unencrypted HTTP" },
        { id: "b", label: "Disable all JavaScript" },
        { id: "c", label: "Delete all stored cookies" },
        { id: "d", label: "Encrypt client hard drives" }
      ],
      correctIndex: 0,
      explanation: "HSTS tells browsers to remember that this site must only be accessed over HTTPS, mitigating SSL-stripping man-in-the-middle attacks."
    },
    {
      id: "q-node-095-7",
      prompt: "What is NoSQL Injection in MongoDB applications?",
      options: [
        { id: "a", label: "When SQL queries are sent to a Mongo cluster" },
        { id: "b", label: "When attackers submit MongoDB query operators (like `{\"username\": \"admin\", \"password\": {\"$ne\": \"\"}}`) in JSON bodies to bypass authentication" },
        { id: "c", label: "When MongoDB runs out of disk space" },
        { id: "d", label: "When CSS styles break" }
      ],
      correctIndex: 1,
      explanation: "If JSON request bodies are passed directly into MongoDB query functions without sanitization, operators like $ne or $gt allow bypassing password checks."
    },
    {
      id: "q-node-095-8",
      prompt: "What does the `X-Content-Type-Options: nosniff` header accomplish?",
      options: [
        { id: "a", label: "It stops browsers from trying to guess ('sniff') the MIME type of a file, forcing them to adhere strictly to the declared Content-Type" },
        { id: "b", label: "It blocks search engines" },
        { id: "c", label: "It compresses text files" },
        { id: "d", label: "It hides server IP addresses" }
      ],
      correctIndex: 0,
      explanation: "nosniff prevents browsers from executing a user-uploaded image or text file as JavaScript if it happens to contain script tags."
    },
    {
      id: "q-node-095-9",
      prompt: "What does the `X-Frame-Options: SAMEORIGIN` header defend against?",
      options: [
        { id: "a", label: "Clickjacking (preventing malicious websites from embedding your application inside an invisible iframe to hijack user clicks)" },
        { id: "b", label: "SQL Injection" },
        { id: "c", label: "DDoS attacks" },
        { id: "d", label: "Memory exhaustion" }
      ],
      correctIndex: 0,
      explanation: "X-Frame-Options stops other websites from rendering your pages in iframes, preventing clickjacking attacks that fool users into clicking hidden buttons."
    },
    {
      id: "q-node-095-10",
      prompt: "How does `express-mongo-sanitize` defend against NoSQL injection?",
      options: [
        { id: "a", label: "It strips all keys in `req.body`, `req.query`, and `req.params` that begin with `$` or contain `.`" },
        { id: "b", label: "It turns MongoDB into PostgreSQL" },
        { id: "c", label: "It deletes the database records" },
        { id: "d", label: "It encrypts the entire source code" }
      ],
      correctIndex: 0,
      explanation: "express-mongo-sanitize sanitizes untrusted input objects by removing any keys starting with the $ operator symbol or containing dots."
    }
  ]
};

// MODULE 5 ASSESSMENT QUIZ (10 comprehensive questions)
const nodeModule05Quiz: CurriculumItem = {
  id: "item-node-m5-quiz",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-05-auth-security",
  moduleTitle: "Module 5: Authentication and Security",
  modulePosition: 5,
  title: "Module 5 Assessment: Authentication & Security MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  contentHeading: "Module 5 Assessment: Hashing, JWTs, RBAC, IDOR & Defense-in-Depth",
  contentDescription: "Evaluate your comprehensive mastery of password hashing, constant-time comparisons, JWT signatures, HttpOnly cookie flags, RBAC authorization, IDOR defenses, CORS, and Helmet headers.",
  questions: [
    ...(lesson092.questions || []).slice(0, 3),
    ...(lesson093.questions || []).slice(0, 3),
    ...(lesson094.questions || []).slice(0, 2),
    ...(lesson095.questions || []).slice(0, 2)
  ]
};

// MODULE 5 HANDS-ON ASSESSMENT LAB
const nodeModule05Lab: CurriculumItem = {
  id: "item-node-m5-lab",
  subCourseId: "mod-node-express",
  subCourseTitle: "Node.js & Express.js",
  subCoursePosition: 4,
  moduleId: "module-node-05-auth-security",
  moduleTitle: "Module 5: Authentication and Security",
  modulePosition: 5,
  title: "Module 5 Assessment: Secure Auth Engine with RBAC & Helmet Shield",
  duration: "75 mins",
  type: "assignment",
  position: 6,
  contentHeading: "Module 5 Project Lab: Enterprise Authentication & Authorization Pipeline",
  contentDescription: "Build a complete authentication and authorization microservice featuring bcrypt password hashing, short-lived JWTs stored in HttpOnly cookies, RBAC route protection, IDOR ownership validation, and Helmet headers.",
  sections: [
    {
      title: "Lab Objectives & Requirements",
      explanation: "In this practical lab, you will construct a production-ready authentication and security subsystem meeting strict OWASP security guidelines:",
      bullets: [
        "Cryptographic Hashing: Implement user registration and login using `bcrypt` (work factor 12) with generic login error responses to prevent user enumeration.",
        "Secure JWT Architecture: Sign short-lived access tokens (15-minute expiry) containing user ID and role claims; transmit tokens in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.",
        "Role-Based Access Control: Build a reusable `requireRoles(...allowedRoles)` middleware factory and protect admin and instructor routes.",
        "IDOR Defense: Build an ownership verification middleware ensuring instructors can only modify courses they authored, while administrators have universal access.",
        "Defense-in-Depth Hardening: Configure `helmet()` for secure HTTP headers, restrict CORS to specific client origins with credentials enabled, and sanitize inputs."
      ]
    },
    {
      title: "Expected Deliverable Specification",
      explanation: "Submit your implementation containing:\n1. `src/services/authService.js`: Registration, login, and bcrypt verification.\n2. `src/middleware/authMiddleware.js`: JWT cookie verifier attaching `req.user`.\n3. `src/middleware/rbacMiddleware.js`: Role and resource ownership checks.\n4. `src/config/security.js`: Helmet and CORS configuration modules."
    }
  ]
};

// Exporting Module 5
export const nodeModule05: CurriculumSubModule = {
  id: "module-node-05-auth-security",
  title: "Module 5: Authentication and Security",
  description: "Master cryptographic password hashing, stateful sessions vs stateless JWTs, HttpOnly cookies, RBAC, IDOR ownership validation, CORS, and Helmet security headers.",
  position: 5,
  duration: "3 hours",
  items: [
    lesson092,
    lesson093,
    lesson094,
    lesson095,
    nodeModule05Quiz,
    nodeModule05Lab
  ]
};
