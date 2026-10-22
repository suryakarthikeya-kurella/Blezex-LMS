export type ExecutionMode = "server" | "browser_preview" | "sql_engine";

export interface SupportedLanguage {
  id: string;
  name: string;
  category: "General" | "Web" | "Systems" | "Data & AI";
  monacoLanguage: string;
  extension: string;
  fileExtension?: string;
  executionMode: ExecutionMode;
  defaultFileName: string;
  starterCode: string;
  pistonRuntime?: {
    language: string;
    version: string;
  };
  description: string;
  badge: string;
  sampleInput?: string;
}

export const LANGUAGE_REGISTRY: Record<string, SupportedLanguage> = {
  python: {
    id: "python",
    name: "Python",
    category: "Data & AI",
    monacoLanguage: "python",
    extension: ".py",
    executionMode: "server",
    defaultFileName: "main.py",
    description: "Python 3 with standard library, data structures, and algorithms",
    badge: "v3.12",
    pistonRuntime: { language: "python", version: "3.10.0" },
    starterCode: `# BlezeX Python Code Lab
def solve():
    name = "BlezeX Learner"
    skills = ["Python", "FastAPI", "Data Structures", "Algorithms"]
    
    print(f"Welcome to BlezeX Code Lab, {name}!")
    print("Your Active Skills:")
    for i, skill in enumerate(skills, 1):
        print(f"  {i}. {skill}")

if __name__ == "__main__":
    solve()
`,
  },

  web: {
    id: "web",
    name: "Web (HTML / CSS / JS)",
    category: "Web",
    monacoLanguage: "html",
    extension: ".html",
    executionMode: "browser_preview",
    defaultFileName: "index.html",
    description: "Sandboxed browser runtime with real-time DOM preview and interactive console",
    badge: "Live Preview",
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BlezeX Web Playground</title>
</head>
<body>
  <div style="font-family: system-ui, sans-serif; text-align: center; padding: 2.5rem 1rem;">
    <h1 style="color: #2563eb; margin-bottom: 0.5rem;">BlezeX Web Playground</h1>
    <p style="color: #475569; font-size: 0.95rem;">Interactive frontend workspace with live sandboxed preview.</p>
    <button id="counter-btn" style="background: #2563eb; color: #fff; border: 0; padding: 0.5rem 1.25rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; margin-top: 1rem;">
      Clicked 0 times
    </button>
  </div>
</body>
</html>`,
  },

  sql: {
    id: "sql",
    name: "SQL",
    category: "Data & AI",
    monacoLanguage: "sql",
    extension: ".sql",
    executionMode: "sql_engine",
    defaultFileName: "query.sql",
    description: "Interactive relational database engine supporting SELECT, CREATE TABLE, INSERT, and queries",
    badge: "Relational",
    starterCode: `-- BlezeX Relational SQL Lab
-- Query existing data or create, insert, and manage your own tables:

SELECT name, track, gpa, status
FROM students
WHERE status = 'active'
ORDER BY gpa DESC;
`,
  },

  java: {
    id: "java",
    name: "Java",
    category: "Systems",
    monacoLanguage: "java",
    extension: ".java",
    executionMode: "server",
    defaultFileName: "Main.java",
    description: "Java 22 with object-oriented programming, standard library, and collections",
    badge: "Java 22",
    pistonRuntime: { language: "java", version: "15.0.2" },
    starterCode: `// BlezeX Java Programming Lab
class Main {
    public static void main(String[] args) {
        System.out.println("=== BlezeX Java Code Lab ===");
        String learner = "BlezeX Student";
        String[] topics = {"OOP Fundamentals", "Collections Framework", "Streams API", "Multithreading"};

        System.out.println("Learner: " + learner);
        System.out.println("Java Core Topics:");
        for (int i = 0; i < topics.length; i++) {
            System.out.println("  " + (i + 1) + ". " + topics[i]);
        }
    }
}
`,
  },

  cpp: {
    id: "cpp",
    name: "C++",
    category: "Systems",
    monacoLanguage: "cpp",
    extension: ".cpp",
    executionMode: "server",
    defaultFileName: "main.cpp",
    description: "Modern C++ (GCC 13) with STL, templates, memory management, and algorithms",
    badge: "C++20",
    pistonRuntime: { language: "cpp", version: "10.2.0" },
    starterCode: `// BlezeX C++ Programming Lab
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::cout << "=== BlezeX C++ Code Lab ===" << std::endl;
    std::vector<std::string> modules = {"STL Containers", "Pointers & References", "Templates", "Algorithms"};
    
    std::cout << "Core Modules:" << std::endl;
    for (size_t i = 0; i < modules.size(); ++i) {
        std::cout << "  " << (i + 1) << ". " << modules[i] << std::endl;
    }
    return 0;
}
`,
  },

  c: {
    id: "c",
    name: "C",
    category: "Systems",
    monacoLanguage: "c",
    extension: ".c",
    executionMode: "server",
    defaultFileName: "main.c",
    description: "C programming with GCC 13, pointers, memory allocation, and data structures",
    badge: "C17",
    pistonRuntime: { language: "c", version: "10.2.0" },
    starterCode: `// BlezeX C Programming Lab
#include <stdio.h>

int main(void) {
    printf("=== BlezeX C Programming Lab ===\\n");
    const char *skills[] = {"Pointers & Addresses", "Memory Management (malloc/free)", "Structs & Unions", "Data Structures"};
    int count = sizeof(skills) / sizeof(skills[0]);

    printf("Mastery Checklist:\\n");
    for (int i = 0; i < count; i++) {
        printf("  %d. %s\\n", i + 1, skills[i]);
    }
    return 0;
}
`,
  },

  javascript: {
    id: "javascript",
    name: "JavaScript (Node.js)",
    category: "Web",
    monacoLanguage: "javascript",
    extension: ".js",
    executionMode: "server",
    defaultFileName: "index.js",
    description: "Modern JavaScript with ES6+ syntax on Node.js runtime",
    badge: "Node.js v20",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    starterCode: `// BlezeX JavaScript (Node.js) Code Lab
function run() {
  const profile = {
    name: "BlezeX Developer",
    track: "Full Stack Engineering",
    skills: ["JavaScript", "Node.js", "Express", "Async/Await", "REST APIs"],
  };

  console.log(\`=== BlezeX JavaScript Lab ===\`);
  console.log(\`Developer: \${profile.name} (\${profile.track})\`);
  console.log("Core Competencies:");
  profile.skills.forEach((skill, index) => {
    console.log(\`  \${index + 1}. \${skill}\`);
  });
}

run();
`,
  },
};

export const DEFAULT_LANGUAGE = LANGUAGE_REGISTRY.python;

// Populate fileExtension alias for all registered languages
Object.values(LANGUAGE_REGISTRY).forEach(lang => {
  lang.fileExtension = lang.extension;
});

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = Object.values(LANGUAGE_REGISTRY);

export function getLanguageById(id?: string): SupportedLanguage {
  if (!id) return DEFAULT_LANGUAGE;
  const key = id.toLowerCase().trim();
  if (key === "node" || key === "js") return LANGUAGE_REGISTRY.javascript;
  if (key === "py") return LANGUAGE_REGISTRY.python;
  if (key === "c++") return LANGUAGE_REGISTRY.cpp;
  return LANGUAGE_REGISTRY[key] || DEFAULT_LANGUAGE;
}

export function getLanguagesByCategory(cat: string): SupportedLanguage[] {
  const normalized = cat.toLowerCase();
  return SUPPORTED_LANGUAGES.filter(l => {
    if (normalized === "web") return l.category === "Web";
    if (normalized === "data") return l.category === "Data & AI";
    if (normalized === "systems") return l.category === "Systems";
    return l.category.toLowerCase() === normalized;
  });
}
