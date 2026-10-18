import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// SUB-COURSE 6: VERSION CONTROL & COLLABORATION WITH GIT & GITHUB
// =========================================================================

// =========================================================================
// MODULE 1: LOCAL GIT WORKFLOW & VERSION CONTROL FUNDAMENTALS
// =========================================================================

const gitLesson01: CurriculumItem = {
      id: "item-git-01-intro-setup",
      moduleId: "mod-git-basics",
      moduleTitle: "Git Basics",
      modulePosition: 6,
      title: "01. Introduction to Version Control & Git Setup",
      duration: "30 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Lesson 01: Introduction to Version Control & Git Setup",
      contentDescription: "Understand the fundamentals of Distributed Version Control Systems (DVCS), the clear distinction between Git and GitHub, installing Git, and configuring your global developer identity.",
      codeSnippet: {
        language: "bash",
        code: "# 1. Verify Git Installation\ngit --version\n\n# 2. Configure Global Developer Identity\ngit config --global user.name \"Your Name\"\ngit config --global user.email \"youremail@example.com\"\n\n# 3. Set the default initial branch name to main\ngit config --global init.defaultBranch main\n\n# 4. View and verify your global configuration\ngit config --list --show-origin"
      },
      sections: [
        {
          title: "1.1 What is a Version Control System (VCS)?",
          explanation: "A Version Control System is a software utility that tracks and records changes made to files over time. It allows developers to review complete file history, revert to previous states if bugs are introduced, compare modifications across milestones, and collaborate concurrently without overwriting each other's code.",
          bullets: [
            "Complete Audit Trail: Every change is saved with an author, timestamp, cryptographic commit hash, and message.",
            "Fearless Experimentation: Developers can create branches to build features or test refactoring without risking production stability.",
            "Centralized vs Distributed: In centralized VCS (like SVN), a single central server holds the repository. In Distributed VCS (like Git), every developer possesses a complete, independent clone of the full repository history locally."
          ],
          diagram: "+-------------------------------------------------------------+\n|                 DISTRIBUTED VERSION CONTROL (Git)           |\n+-------------------------------------------------------------+\n| Developer A (Full Repo) <---> GitHub Remote <---> Developer B |\n|  [Working Dir]               [Origin/Main]       [Working Dir]|\n|  [Staging Area]                                  [Staging Area]|\n|  [Local Commits]                                 [Local Commits]|\n+-------------------------------------------------------------+"
        },
        {
          title: "1.2 Git vs GitHub: The Essential Distinction",
          explanation: "Many beginners confuse Git and GitHub. Understanding their distinct roles is vital for every developer:",
          table: {
            headers: ["Feature / Aspect", "Git", "GitHub"],
            rows: [
              ["What is it?", "A local command-line version control tool", "A cloud-based hosting platform for Git repositories"],
              ["Where does it run?", "Locally on your computer", "Remotely in the cloud (web-based)"],
              ["Internet Required?", "No — operates 100% offline", "Yes — required for pushing, pulling, and PR reviews"],
              ["Primary Purpose", "Tracking code history, branching, and merging", "Remote sharing, pull requests, issue tracking, and CI/CD"],
              ["Alternatives", "Mercurial, Subversion (SVN)", "GitLab, Bitbucket, Azure DevOps"]
            ]
          }
        },
        {
          title: "1.3 Configuring Your Git Identity",
          explanation: "Before making your first commit, Git requires your name and email. These credentials permanently attach to every commit snapshot you create, identifying you in repository logs and GitHub pull requests.",
          bullets: [
            "Global Scope (--global): Configures settings for your entire operating system user account (~/.gitconfig).",
            "Local Scope (--local): Configures settings for only the active repository (.git/config).",
            "System Scope (--system): Configures settings for all users on the operating system machine."
          ],
          codeSnippet: {
            language: "bash",
            code: "# Set your name and email globally\ngit config --global user.name \"Hari\"\ngit config --global user.email \"hari@example.com\"\n\n# Configure line ending handling (Windows: crlf, macOS/Linux: input)\ngit config --global core.autocrlf true\n\n# Verify your configuration\ngit config user.name\ngit config user.email"
          }
        }
      ],
      questions: [
        {
          id: "q-git-01-1",
          prompt: "What is the primary architectural difference between a Distributed VCS (like Git) and a Centralized VCS (like Subversion)?",
          options: [
            { id: "g1", label: "In Git, every clone is a full repository containing the complete commit history and can operate fully offline." },
            { id: "g2", label: "Centralized systems store repositories in the browser, while Git requires a cloud database." },
            { id: "g3", label: "Git only stores plain text files, while centralized systems store compiled binaries." },
            { id: "g4", label: "Git requires continuous internet connection to make any local commit." }
          ],
          correctIndex: 0,
          explanation: "In Distributed Version Control, every developer has a full mirror of the repository with complete commit history on their local machine, enabling offline commits, branching, and logging."
        },
        {
          id: "q-git-01-2",
          prompt: "Which statement accurately describes the relationship between Git and GitHub?",
          options: [
            { id: "g5", label: "Git is the local command-line tool for tracking code changes; GitHub is a cloud platform for hosting and collaborating on Git repositories." },
            { id: "g6", label: "Git and GitHub are identical products owned by Microsoft." },
            { id: "g7", label: "Git cannot function unless you are logged into a GitHub account." },
            { id: "g8", label: "GitHub is the programming language used to write Git commands." }
          ],
          correctIndex: 0,
          explanation: "Git is the open-source version control software running locally on your computer. GitHub is a cloud hosting service for Git repositories with collaboration features like pull requests and issue trackers."
        },
        {
          id: "q-git-01-3",
          prompt: "Which command correctly sets your global Git username for all repositories on your system?",
          options: [
            { id: "g9", label: "git config --global user.name \"Your Name\"" },
            { id: "g10", label: "git set user.name = \"Your Name\"" },
            { id: "g11", label: "git user --create \"Your Name\"" },
            { id: "g12", label: "git init user.name \"Your Name\"" }
          ],
          correctIndex: 0,
          explanation: "git config --global user.name 'Your Name' writes the username setting to the user's global ~/.gitconfig file."
        },
        {
          id: "q-git-01-4",
          prompt: "Where does Git store global configuration settings on a user's computer?",
          options: [
            { id: "g13", label: "In the user's home directory file (~/.gitconfig)." },
            { id: "g14", label: "In the browser's localStorage." },
            { id: "g15", label: "In the Windows System32 folder." },
            { id: "g16", label: "Directly on github.com." }
          ],
          correctIndex: 0,
          explanation: "Global Git configuration is stored in the .gitconfig file located in the user's home directory (~/.gitconfig)."
        },
        {
          id: "q-git-01-5",
          prompt: "What happens if you run 'git config --list' in your terminal?",
          options: [
            { id: "g17", label: "It prints all effective Git configuration keys and their values." },
            { id: "g18", label: "It deletes all configuration files." },
            { id: "g19", label: "It lists all files currently in the staging area." },
            { id: "g20", label: "It prints all GitHub followers." }
          ],
          correctIndex: 0,
          explanation: "git config --list lists all configuration variables (system, global, and local) applicable to the current environment."
        },
        {
          id: "q-git-01-6",
          prompt: "Why should you configure 'init.defaultBranch main' in modern Git versions?",
          options: [
            { id: "g21", label: "To standardize 'main' as the default initial branch name when creating new repositories with 'git init'." },
            { id: "g22", label: "To download the main branch from GitHub." },
            { id: "g23", label: "To lock all commits from being deleted." },
            { id: "g24", label: "To enable JavaScript syntax highlighting in Git." }
          ],
          correctIndex: 0,
          explanation: "Setting init.defaultBranch to main ensures new repositories created via git init use 'main' rather than the legacy 'master' branch name."
        },
        {
          id: "q-git-01-7",
          prompt: "Does Git require an internet connection to commit changes to a local repository?",
          options: [
            { id: "g25", label: "No, Git commits are stored locally in the .git directory on your disk and require no internet access." },
            { id: "g26", label: "Yes, every commit is immediately validated by remote cloud servers." },
            { id: "g27", label: "Only when committing image files." },
            { id: "g28", label: "Only on Windows operating systems." }
          ],
          correctIndex: 0,
          explanation: "Because Git is a distributed VCS, commits are saved entirely to your local .git folder on your hard drive, allowing full offline work."
        },
        {
          id: "q-git-01-8",
          prompt: "What is the purpose of configuring 'core.autocrlf' in Git?",
          options: [
            { id: "g29", label: "To normalize line-ending differences (CRLF on Windows vs LF on macOS/Linux) across collaborators." },
            { id: "g30", label: "To automatically format JavaScript code with Prettier." },
            { id: "g31", label: "To auto-compress large media files." },
            { id: "g32", label: "To automatically resolve all merge conflicts." }
          ],
          correctIndex: 0,
          explanation: "Windows uses Carriage Return + Line Feed (CRLF), while macOS/Linux uses Line Feed (LF). core.autocrlf prevents phantom diffs caused purely by line-ending styles."
        },
        {
          id: "q-git-01-9",
          prompt: "Can multiple Git identities be configured on the same machine for different projects?",
          options: [
            { id: "g33", label: "Yes, by configuring local repository settings with 'git config --local user.email ...' inside specific project folders." },
            { id: "g34", label: "No, Git only allows a single email address per computer." },
            { id: "g35", label: "Only if you install two separate copies of Git." },
            { id: "g36", label: "Only with paid GitHub Enterprise accounts." }
          ],
          correctIndex: 0,
          explanation: "Local repository configuration (--local) takes precedence over global configuration (--global), allowing different identities for work and personal projects."
        },
        {
          id: "q-git-01-10",
          prompt: "Which command allows you to check which specific configuration file defined each setting?",
          options: [
            { id: "g37", label: "git config --list --show-origin" },
            { id: "g38", label: "git status --origin" },
            { id: "g39", label: "git remote show" },
            { id: "g40", label: "git log --config" }
          ],
          correctIndex: 0,
          explanation: "git config --list --show-origin outputs every active configuration key alongside the exact file path where it was defined."
        }
      ]
    };

const gitLesson02: CurriculumItem = {
      id: "item-git-02-workflow-staging",
      moduleId: "mod-git-basics",
      moduleTitle: "Git Basics",
      modulePosition: 6,
      title: "02. Core Git Workflow — Init, Staging, and Committing",
      duration: "40 mins",
      type: "cheatsheet",
      position: 2,
      contentHeading: "Lesson 02: Core Git Workflow — Init, Staging, and Committing",
      contentDescription: "Master the fundamental three trees of Git: Working Directory, Staging Area, and Repository History. Learn git init, status, add, commit, diff, and configuring .gitignore.",
      codeSnippet: {
        language: "bash",
        code: "# 1. Initialize a new Git repository\ngit init\n\n# 2. Check current status of files\ngit status\n\n# 3. Stage specific files or all changes\ngit add index.html style.css\ngit add .  # Stage all changes in current directory\n\n# 4. Create an atomic commit snapshot\ngit commit -m \"feat: create landing page hero section\"\n\n# 5. Inspect commit log history\ngit log --oneline --graph"
      },
      sections: [
        {
          title: "2.1 The Three Trees of Git",
          explanation: "Git manages your code using three distinct zones or 'trees':",
          bullets: [
            "1. Working Directory: The local folder and files you see and edit directly in your code editor (untracked or modified).",
            "2. Staging Area (Index): An intermediate preparation area where you select and assemble exactly which changes will be part of the next snapshot.",
            "3. Repository History (HEAD): The committed snapshots permanently stored in the .git database."
          ],
          diagram: "+---------------------+      git add      +------------------+     git commit     +--------------------+\n|  Working Directory  |  ------------->   |   Staging Area   |   ------------->   | Repository History |\n| (Files being edited)|                   |  (The Next Commit|                    |  (Permanent HEAD)  |\n+---------------------+                   +------------------+                    +--------------------+"
        },
        {
          title: "2.2 File Lifecycle in Git",
          explanation: "Every file in your working directory transitions through these distinct states:",
          table: {
            headers: ["State", "Description", "Next Action"],
            rows: [
              ["Untracked", "A new file created in the directory that Git is not yet tracking", "Run 'git add <file>' to track"],
              ["Modified", "A tracked file whose contents have changed since the last commit", "Run 'git add <file>' to stage"],
              ["Staged", "A modified or new file added to the staging index for the next commit", "Run 'git commit -m \"...\"'"],
              ["Unmodified", "A file whose state exactly matches the latest commit in HEAD", "Edit file to start cycle again"]
            ]
          }
        },
        {
          title: "2.3 The .gitignore File",
          explanation: "Not all project files should be tracked by Git. Secrets (API keys, passwords), dependencies (node_modules), build outputs (dist, build), and OS files (.DS_Store) should never enter repository history. Adding their filenames or glob patterns to a '.gitignore' file at the root of your project instructs Git to ignore them completely.",
          codeSnippet: {
            language: "bash",
            code: "# .gitignore example\nnode_modules/\ndist/\n.env\n.env.local\n*.log\n.DS_Store\nThumbs.db"
          }
        }
      ],
      questions: [
        {
          id: "q-git-02-1",
          prompt: "What is the purpose of the 'Staging Area' (Index) in Git?",
          options: [
            { id: "g41", label: "It allows you to selectively prepare and preview exactly which changes will be included in the next commit." },
            { id: "g42", label: "It compiles TypeScript files into JavaScript." },
            { id: "g43", label: "It pushes code directly to GitHub." },
            { id: "g44", label: "It deletes untracked files automatically." }
          ],
          correctIndex: 0,
          explanation: "The staging area provides precise control: you can make edits across 10 files, but stage only 2 related files for an atomic, focused commit."
        },
        {
          id: "q-git-02-2",
          prompt: "What does running 'git init' in a directory accomplish?",
          options: [
            { id: "g45", label: "It creates a hidden .git directory, transforming the folder into a Git repository." },
            { id: "g46", label: "It downloads files from GitHub." },
            { id: "g47", label: "It deletes all existing files." },
            { id: "g48", label: "It starts a local web server." }
          ],
          correctIndex: 0,
          explanation: "git init initializes a new Git repository by creating the hidden .git directory containing all metadata, object stores, and ref pointers."
        },
        {
          id: "q-git-02-3",
          prompt: "Which command shows the current state of the working directory and staging area?",
          options: [
            { id: "g49", label: "git status" },
            { id: "g50", label: "git check" },
            { id: "g51", label: "git inspect" },
            { id: "g52", label: "git info" }
          ],
          correctIndex: 0,
          explanation: "git status displays modified, staged, and untracked files, as well as the active branch and ahead/behind commit counts."
        },
        {
          id: "q-git-02-4",
          prompt: "What is the difference between 'git add <file>' and 'git commit -m \"message\"'?",
          options: [
            { id: "g53", label: "'git add' stages changes into the staging area; 'git commit' permanently saves those staged changes as a snapshot in history." },
            { id: "g54", label: "'git add' deletes files; 'git commit' restores them." },
            { id: "g55", label: "'git add' connects to the internet; 'git commit' works offline." },
            { id: "g56", label: "They are exact synonyms." }
          ],
          correctIndex: 0,
          explanation: "git add prepares changes in the index; git commit creates a permanent immutable snapshot with a commit hash, author, and timestamp."
        },
        {
          id: "q-git-02-5",
          prompt: "What type of files should ALWAYS be listed in a '.gitignore' file?",
          options: [
            { id: "g57", label: "Environment variables with secrets (.env), dependencies (node_modules), and build artifacts (dist)." },
            { id: "g58", label: "Source code files (HTML, CSS, JS)." },
            { id: "g59", label: "The README.md file." },
            { id: "g60", label: "Package.json." }
          ],
          correctIndex: 0,
          explanation: "Secrets like .env files and heavyweight dependencies like node_modules should never be committed to source control for security and repo size reasons."
        },
        {
          id: "q-git-02-6",
          prompt: "What command displays line-by-line differences between modified unstaged files and the latest commit?",
          options: [
            { id: "g61", label: "git diff" },
            { id: "g62", label: "git compare" },
            { id: "g63", label: "git changes" },
            { id: "g64", label: "git show --all" }
          ],
          correctIndex: 0,
          explanation: "git diff reveals line-level unstaged changes in the working directory compared to the staging index or last commit."
        },
        {
          id: "q-git-02-7",
          prompt: "How can you view the diff of changes that have ALREADY been staged with 'git add'?",
          options: [
            { id: "g65", label: "git diff --staged (or git diff --cached)" },
            { id: "g66", label: "git status -v" },
            { id: "g67", label: "git log -p" },
            { id: "g68", label: "git show index" }
          ],
          correctIndex: 0,
          explanation: "git diff --staged (or --cached) inspects changes that are currently staged and ready for the next commit."
        },
        {
          id: "q-git-02-8",
          prompt: "What does 'git log --oneline' display?",
          options: [
            { id: "g69", label: "A condensed history showing each commit's short 7-character SHA hash and commit message on a single line." },
            { id: "g70", label: "The first line of the README file." },
            { id: "g71", label: "The number of lines in the project." },
            { id: "g72", label: "Only the author's email address." }
          ],
          correctIndex: 0,
          explanation: "The --oneline flag formats git log output compactly: <short-hash> <commit-title>, making history scanning fast and readable."
        },
        {
          id: "q-git-02-9",
          prompt: "What is an 'atomic commit' in software engineering best practices?",
          options: [
            { id: "g73", label: "A commit that encapsulates a single logical change or feature, keeping history clean and easy to review or revert." },
            { id: "g74", label: "A commit containing 50 unrelated bug fixes and UI updates." },
            { id: "g75", label: "A commit that deletes the entire repository." },
            { id: "g76", label: "A commit made automatically every 5 minutes." }
          ],
          correctIndex: 0,
          explanation: "An atomic commit solves one specific task or fix. If a bug is later discovered, that exact commit can be safely reverted without breaking other features."
        },
        {
          id: "q-git-02-10",
          prompt: "If you accidentally stage a file with 'git add secret.txt', what modern command unstages it without losing your edits?",
          options: [
            { id: "g77", label: "git restore --staged secret.txt" },
            { id: "g78", label: "git delete secret.txt" },
            { id: "g79", label: "git clean -f" },
            { id: "g80", label: "git drop secret.txt" }
          ],
          correctIndex: 0,
          explanation: "git restore --staged <file> removes the file from the staging area while preserving all edits intact in your working directory."
        }
      ]
    };

// Module 1 Quiz & Assessment
const gitModule01Quiz: CurriculumItem = {
  id: "item-git-m1-quiz",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Basics",
  subCoursePosition: 6,
  moduleId: "module-git-01-local-workflow",
  moduleTitle: "Module 1: Local Git Workflow & Fundamentals",
  modulePosition: 1,
  title: "Module 1 MCQs: Local Git Workflow, Staging & Commit Hygiene",
  duration: "25 mins",
  type: "quiz",
  position: 3,
  isModuleQuiz: true,
  contentHeading: "Module 1 Assessment: Git Fundamentals Knowledge Check",
  contentDescription: "Evaluate your understanding of Distributed VCS, git init, staging area transitions, commit messages, git log, diffing, and .gitignore patterns.",
  questions: [
    ...gitLesson01.questions!.slice(0, 7),
    ...gitLesson02.questions!.slice(0, 8)
  ]
};

const gitModule01Assessment: CurriculumItem = {
  id: "item-git-m1-assessment",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Basics",
  subCoursePosition: 6,
  moduleId: "module-git-01-local-workflow",
  moduleTitle: "Module 1: Local Git Workflow & Fundamentals",
  modulePosition: 1,
  title: "Module 1 Assessment: Local Repository Initialization & Commit Hygiene Lab",
  duration: "45 mins",
  type: "assignment",
  position: 4,
  isModuleAssessment: true,
  contentHeading: "Module 1 Practical Challenge: Local Commit Hygiene & Ignored Assets",
  contentDescription: "Initialize a clean local Git repository, configure global user identity, author a comprehensive .gitignore file, and record 3 atomic conventional commits.",
  assignmentPrompt: {
    instructions: "Execute local Git setup and staging workflow:\n1. Initialize a new Git repository with default branch 'main'.\n2. Configure .gitignore ignoring node_modules, .env, and dist/.\n3. Author 3 atomic commits following Conventional Commits (feat, chore, docs).\n4. Run git log --oneline and submit your terminal output.",
    deliverables: [
      "Terminal transcript showing repository initialization and status",
      "Contents of .gitignore properly excluding sensitive assets",
      "Git commit history with semantic commit prefixes"
    ]
  }
};

const gitModule01: CurriculumSubModule = {
  id: "module-git-01-local-workflow",
  subCourseId: "mod-git-basics",
  title: "Module 1: Local Git Workflow & Fundamentals",
  description: "Master local version control mechanics: repository initialization, staging area lifecycle, atomic commit hygiene, diffing modifications, and configuring .gitignore.",
  position: 1,
  duration: "2 hours, 10 mins",
  lessons: [gitLesson01, gitLesson02],
  moduleQuiz: gitModule01Quiz,
  moduleAssessment: gitModule01Assessment,
  items: [gitLesson01, gitLesson02, gitModule01Quiz, gitModule01Assessment]
};

// =========================================================================
// MODULE 2: BRANCHING STRATEGIES & REMOTE COLLABORATION WITH GITHUB
// =========================================================================

const gitLesson03: CurriculumItem = {
      id: "item-git-03-branching-merging",
      moduleId: "mod-git-basics",
      moduleTitle: "Git Basics",
      modulePosition: 6,
      title: "03. Git Branching, Merging & Merge Conflicts",
      duration: "45 mins",
      type: "cheatsheet",
      position: 3,
      contentHeading: "Lesson 03: Git Branching, Merging & Merge Conflicts",
      contentDescription: "Master branching strategies, switching contexts with git switch, fast-forward vs 3-way merges, and understanding and resolving merge conflicts step by step.",
      codeSnippet: {
        language: "bash",
        code: "# 1. Create and switch to a new feature branch\ngit switch -c feature/login\n# (Traditional alternative: git checkout -b feature/login)\n\n# 2. Make commits on the feature branch\ngit commit -m \"feat: implement login form validation\"\n\n# 3. Switch back to main and merge the feature branch\ngit switch main\ngit merge feature/login\n\n# 4. Delete the merged feature branch safely\ngit branch -d feature/login"
      },
      sections: [
        {
          title: "3.1 What is a Branch in Git?",
          explanation: "In Git, a branch is simply a lightweight, movable pointer to a specific commit. Unlike other VCS tools that copy entire directories of code, creating a branch in Git is instantaneous and costs virtually zero disk space.",
          bullets: [
            "Isolation: Work on experimental features, refactoring, or hotfixes without affecting the stable 'main' branch.",
            "HEAD: A special pointer that indicates which branch and commit your working directory is currently checked out to.",
            "Switching branches: Updates the files in your working directory to match the commit pointed to by that branch."
          ],
          diagram: "main:      A ---> B -----------> E (Merged Commit)\n                   \\           /\nfeature:            C ------> D"
        },
        {
          title: "3.2 Fast-Forward vs 3-Way Merge Commits",
          explanation: "When you run 'git merge <branch>', Git evaluates the commit history to determine how to join the two lines of development:",
          bullets: [
            "Fast-Forward Merge: If the target branch has received NO new commits since the feature branch diverged, Git simply moves the target pointer forward to the tip of the feature branch. No extra merge commit is created.",
            "Three-Way Merge: If both branches have advanced with independent commits, Git combines changes from both tips along with their common ancestor, creating a new 'merge commit' with two parent commits."
          ]
        },
        {
          title: "3.3 Understanding & Resolving Merge Conflicts",
          explanation: "A merge conflict occurs when Git cannot automatically determine how to reconcile changes — specifically when different commits modify the exact same lines of code in the same file. Git halts the merge and inserts conflict markers directly into the affected files:",
          bullets: [
            "<<<<<<< HEAD: The content present on your current active branch.",
            "=======: The separator divider between conflicting versions.",
            ">>>>>>> feature-branch: The incoming content from the branch being merged.",
            "Resolution steps: 1) Open file, 2) Decide which code to keep and delete the conflict markers, 3) Stage with 'git add', 4) Commit with 'git commit'."
          ],
          codeSnippet: {
            language: "html",
            code: "<<<<<<< HEAD\n<button class=\"btn-primary\">Log In Now</button>\n=======\n<button class=\"btn-outline\">Sign In to BlezeX</button>\n>>>>>>> feature/login-ui"
          }
        }
      ],
      questions: [
        {
          id: "q-git-03-1",
          prompt: "What is a Git branch under the hood?",
          options: [
            { id: "g81", label: "A lightweight movable pointer to a specific commit hash." },
            { id: "g82", label: "A duplicate copy of the entire project folder." },
            { id: "g83", label: "A remote branch stored only on GitHub." },
            { id: "g84", label: "A zip archive of the working directory." }
          ],
          correctIndex: 0,
          explanation: "In Git, branches are simply 41-byte text files holding the 40-character SHA-1 commit hash they currently point to."
        },
        {
          id: "q-git-03-2",
          prompt: "Which modern command creates AND immediately switches to a new branch named 'feature/auth'?",
          options: [
            { id: "g85", label: "git switch -c feature/auth" },
            { id: "g86", label: "git branch --start feature/auth" },
            { id: "g87", label: "git merge --new feature/auth" },
            { id: "g88", label: "git create feature/auth" }
          ],
          correctIndex: 0,
          explanation: "git switch -c <name> (or the older git checkout -b <name>) creates a new branch and switches HEAD to it in a single step."
        },
        {
          id: "q-git-03-3",
          prompt: "What does the special pointer 'HEAD' represent in Git?",
          options: [
            { id: "g89", label: "The current branch or commit checked out in your working directory." },
            { id: "g90", label: "The first commit ever made in the project." },
            { id: "g91", label: "The remote server address." },
            { id: "g92", label: "The repository administrator's username." }
          ],
          correctIndex: 0,
          explanation: "HEAD points to the currently checked-out branch or commit, indicating where your next commit will attach."
        },
        {
          id: "q-git-03-4",
          prompt: "When does a 'Fast-Forward' merge occur?",
          options: [
            { id: "g93", label: "When the active branch has no new commits since the feature branch was branched off, allowing Git to simply move the pointer forward." },
            { id: "g94", label: "Whenever you merge with an internet speed greater than 100 Mbps." },
            { id: "g95", label: "Only when merging three branches simultaneously." },
            { id: "g96", label: "When there are merge conflicts in all files." }
          ],
          correctIndex: 0,
          explanation: "If no divergent commits occurred on the base branch, Git fast-forwards the pointer directly to the tip of the feature branch without creating a merge commit."
        },
        {
          id: "q-git-03-5",
          prompt: "What causes a merge conflict in Git?",
          options: [
            { id: "g97", label: "When both branches modified the same lines in the same file differently and Git cannot automatically decide which version to keep." },
            { id: "g98", label: "When two files have the same file size." },
            { id: "g99", label: "When a commit message has a spelling error." },
            { id: "g100", label: "When switching branches without an internet connection." }
          ],
          correctIndex: 0,
          explanation: "Merge conflicts occur when two conflicting modifications touch identical lines, requiring human review to decide the desired code."
        },
        {
          id: "q-git-03-6",
          prompt: "In a Git merge conflict marker, what does the section between '<<<<<<< HEAD' and '=======' represent?",
          options: [
            { id: "g101", label: "The content on the current active branch you are merging INTO." },
            { id: "g102", label: "The incoming content from the branch being merged." },
            { id: "g103", label: "Deleted lines that cannot be recovered." },
            { id: "g104", label: "Comments generated by GitHub." }
          ],
          correctIndex: 0,
          explanation: "HEAD represents your current branch (e.g. main). The code between <<<<<<< HEAD and ======= is what currently exists on your active branch."
        },
        {
          id: "q-git-03-7",
          prompt: "What is the correct sequence of steps to resolve a Git merge conflict?",
          options: [
            { id: "g105", label: "1) Edit files to resolve conflicting lines, 2) Remove conflict markers, 3) 'git add <file>', 4) 'git commit'." },
            { id: "g106", label: "1) Delete the .git folder, 2) Run 'git init'." },
            { id: "g107", label: "1) Run 'git push --force' immediately." },
            { id: "g108", label: "1) Close VS Code without saving." }
          ],
          correctIndex: 0,
          explanation: "After manually editing the files and removing the <<<<<<<, =======, >>>>>>> markers, stage the resolved files with git add and finalize with git commit."
        },
        {
          id: "q-git-03-8",
          prompt: "How do you safely delete a local feature branch that has already been merged?",
          options: [
            { id: "g109", label: "git branch -d feature-name" },
            { id: "g110", label: "git branch --destroy-all" },
            { id: "g111", label: "git remove branch feature-name" },
            { id: "g112", label: "git kill feature-name" }
          ],
          correctIndex: 0,
          explanation: "git branch -d <name> safely deletes a branch only if its commits have already been merged into upstream branches."
        },
        {
          id: "q-git-03-9",
          prompt: "What is the difference between 'git branch -d' (lowercase) and 'git branch -D' (uppercase)?",
          options: [
            { id: "g113", label: "'-d' checks if the branch has been merged first; '-D' force-deletes the branch regardless of unmerged commits." },
            { id: "g114", label: "'-D' deletes remote GitHub branches; '-d' deletes local branches." },
            { id: "g115", label: "'-d' is deprecated in modern Git." },
            { id: "g116", label: "There is no difference." }
          ],
          correctIndex: 0,
          explanation: "-d contains a safety check preventing data loss. -D forces deletion even if the branch contains unmerged commits."
        },
        {
          id: "q-git-03-10",
          prompt: "How can you abort an in-progress merge conflict and return your repository to the exact state before merging?",
          options: [
            { id: "g117", label: "git merge --abort" },
            { id: "g118", label: "git stop merge" },
            { id: "g119", label: "git reset --cloud" },
            { id: "g120", label: "git clean --all" }
          ],
          correctIndex: 0,
          explanation: "git merge --abort terminates the conflict resolution process and reconstructs the pre-merge state of your working directory."
        }
      ]
    };

const gitLesson04: CurriculumItem = {
      id: "item-git-04-remotes-github",
      moduleId: "mod-git-basics",
      moduleTitle: "Git Basics",
      modulePosition: 6,
      title: "04. Remote Repositories & Collaboration with GitHub",
      duration: "40 mins",
      type: "cheatsheet",
      position: 4,
      contentHeading: "Lesson 04: Remote Repositories & Collaboration with GitHub",
      contentDescription: "Collaborate effectively on distributed teams: linking remote repositories, pushing, pulling, cloning, understanding fetch vs pull, and mastering Pull Request (PR) workflows.",
      codeSnippet: {
        language: "bash",
        code: "# 1. Link your local repository to a remote GitHub repository\ngit remote add origin https://github.com/username/project.git\n\n# 2. Verify registered remotes\ngit remote -v\n\n# 3. Push local main branch and set upstream tracking\ngit push -u origin main\n\n# 4. Clone an existing repository to a new computer\ngit clone https://github.com/username/project.git\n\n# 5. Fetch remote updates without merging immediately\ngit fetch origin\n\n# 6. Pull latest updates (fetch + merge)\ngit pull origin main"
      },
      sections: [
        {
          title: "4.1 What is a Git Remote?",
          explanation: "A remote is a common version of your repository that is hosted on the internet or network, typically on platforms like GitHub, GitLab, or Bitbucket. Collaborators synchronize their local work by pushing to and pulling from remotes.",
          bullets: [
            "origin: The default shorthand alias Git assigns to the primary remote repository URL you clone from or link to.",
            "git remote add origin <url>: Associates your local repo with the remote cloud address.",
            "Upstream branch (-u): Links a local branch to a specific remote branch, allowing you to run simply 'git push' or 'git pull' in future without specifying remote and branch names."
          ]
        },
        {
          title: "4.2 Fetch vs Pull: The Critical Difference",
          explanation: "Understanding the difference between fetching and pulling prevents unexpected merge conflicts:",
          table: {
            headers: ["Command", "What it does", "Affects Working Files?", "Safe to run anytime?"],
            rows: [
              ["git fetch", "Downloads latest commits and refs from remote into remote-tracking branches (e.g. origin/main)", "No — your working files are completely untouched", "Yes — 100% non-destructive"],
              ["git pull", "Downloads remote commits AND immediately merges them into your active local branch (git fetch + git merge)", "Yes — can modify files and cause merge conflicts", "Only when working directory is clean"]
            ]
          }
        },
        {
          title: "4.3 The GitHub Pull Request (PR) Workflow",
          explanation: "In professional software teams, developers do not push directly to the 'main' branch. Instead, they follow the Feature Branch Pull Request workflow:",
          bullets: [
            "1. Create feature branch locally: git switch -c feature/payment-gateway",
            "2. Commit changes atomically with clean messages.",
            "3. Push feature branch to GitHub: git push -u origin feature/payment-gateway",
            "4. Open a Pull Request on GitHub comparing feature/payment-gateway -> main.",
            "5. Teammates review code, leave comments, and automated CI tests verify code quality.",
            "6. Once approved, the PR is merged into main and deployed."
          ]
        }
      ],
      questions: [
        {
          id: "q-git-04-1",
          prompt: "What does the alias 'origin' typically represent in Git?",
          options: [
            { id: "g121", label: "The default name given to the primary remote repository URL." },
            { id: "g122", label: "The first file created in the project." },
            { id: "g123", label: "The original creator of the Git software (Linus Torvalds)." },
            { id: "g124", label: "The root directory on your hard drive." }
          ],
          correctIndex: 0,
          explanation: "When you clone a repository or link a remote, Git by default names that remote server 'origin'."
        },
        {
          id: "q-git-04-2",
          prompt: "What is the key difference between 'git fetch' and 'git pull'?",
          options: [
            { id: "g125", label: "'git fetch' downloads new commits without modifying your local working files; 'git pull' fetches AND immediately merges them into your current branch." },
            { id: "g126", label: "'git fetch' uploads files; 'git pull' downloads files." },
            { id: "g127", label: "'git pull' deletes uncommitted changes; 'git fetch' does not." },
            { id: "g128", label: "They are completely identical commands." }
          ],
          correctIndex: 0,
          explanation: "git pull is shorthand for running git fetch followed immediately by git merge FETCH_HEAD."
        },
        {
          id: "q-git-04-3",
          prompt: "What does the '-u' (or '--set-upstream') flag do in 'git push -u origin main'?",
          options: [
            { id: "g129", label: "It establishes a tracking link between local 'main' and 'origin/main', allowing future 'git push' and 'git pull' commands without typing arguments." },
            { id: "g130", label: "It upgrades Git to the newest version." },
            { id: "g131", label: "It uninstalls temporary branches." },
            { id: "g132", label: "It marks the push as urgent." }
          ],
          correctIndex: 0,
          explanation: "The -u flag creates a tracking reference between the local and remote branch so Git remembers where to push and pull."
        },
        {
          id: "q-git-04-4",
          prompt: "Which command downloads a full copy of an existing GitHub repository onto your computer for the first time?",
          options: [
            { id: "g133", label: "git clone <repository-url>" },
            { id: "g134", label: "git download <repository-url>" },
            { id: "g135", label: "git copy <repository-url>" },
            { id: "g136", label: "git fetch --all" }
          ],
          correctIndex: 0,
          explanation: "git clone <url> initializes a new directory, connects origin, fetches all remote branches, and checks out the default branch."
        },
        {
          id: "q-git-04-5",
          prompt: "What is a 'Pull Request' (PR) on GitHub?",
          options: [
            { id: "g137", label: "A proposal to merge changes from a feature branch into the target branch (main), allowing code review, discussions, and automated tests." },
            { id: "g138", label: "A request sent to GitHub for technical support." },
            { id: "g139", label: "A command to download files to your computer." },
            { id: "g140", label: "An invoice for repository hosting." }
          ],
          correctIndex: 0,
          explanation: "A Pull Request is a collaborative GitHub feature where developers submit changes for peer review and automated testing before merging into production."
        },
        {
          id: "q-git-04-6",
          prompt: "How do you inspect the URLs of all remote repositories configured for your local project?",
          options: [
            { id: "g141", label: "git remote -v" },
            { id: "g142", label: "git show urls" },
            { id: "g143", label: "git list --remotes" },
            { id: "g144", label: "git network info" }
          ],
          correctIndex: 0,
          explanation: "git remote -v lists all registered remote names alongside their fetch and push URLs."
        },
        {
          id: "q-git-04-7",
          prompt: "Why is pushing directly to the 'main' branch considered a bad practice in professional development teams?",
          options: [
            { id: "g145", label: "It bypasses peer code reviews, continuous integration (CI) tests, and risks pushing untested bugs into production." },
            { id: "g146", label: "Because Git automatically charges fees for direct pushes." },
            { id: "g147", label: "Because main branches only accept zip files." },
            { id: "g148", label: "Because direct pushes delete older commits." }
          ],
          correctIndex: 0,
          explanation: "Professional teams enforce branch protection rules on main, requiring pull requests, peer approvals, and green CI tests to maintain code quality."
        },
        {
          id: "q-git-04-8",
          prompt: "What happens if you run 'git push' and the remote repository has commits that you do not have locally?",
          options: [
            { id: "g149", label: "Git rejects the push and informs you to pull and integrate remote changes first before pushing." },
            { id: "g150", label: "Git deletes the remote commits automatically." },
            { id: "g151", label: "Git crashes the terminal." },
            { id: "g152", label: "Git creates a new GitHub account." }
          ],
          correctIndex: 0,
          explanation: "To prevent overwriting teammate work, Git rejects non-fast-forward pushes. You must run 'git pull' to integrate upstream changes before pushing."
        },
        {
          id: "q-git-04-9",
          prompt: "What does 'git stash' do when you need to switch branches urgently but have incomplete, uncommitted work?",
          options: [
            { id: "g153", label: "It temporarily shelves (stashes) your uncommitted modified changes, reverting working files to a clean HEAD state." },
            { id: "g154", label: "It permanently deletes your changes." },
            { id: "g155", label: "It pushes your code to GitHub secretly." },
            { id: "g156", label: "It formats your code." }
          ],
          correctIndex: 0,
          explanation: "git stash saves modified and staged changes onto a temporary stack so you can switch branches cleanly, and later reapply them with 'git stash pop'."
        },
        {
          id: "q-git-04-10",
          prompt: "Which command safely creates a new commit that undoes the exact changes of an earlier bad commit without altering commit history?",
          options: [
            { id: "g157", label: "git revert <commit-hash>" },
            { id: "g158", label: "git reset --hard HEAD~1" },
            { id: "g159", label: "git delete <commit-hash>" },
            { id: "g160", label: "git erase" }
          ],
          correctIndex: 0,
          explanation: "git revert creates a brand new inverse commit, making it safe for public shared branches because it preserves linear commit history."
        }
      ]
    };

// Module 2 Quiz & Assessment
const gitModule02Quiz: CurriculumItem = {
  id: "item-git-m2-quiz",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Basics",
  subCoursePosition: 6,
  moduleId: "module-git-02-branching-remotes",
  moduleTitle: "Module 2: Branching Strategies & Remote Collaboration",
  modulePosition: 2,
  title: "Module 2 MCQs: Branching, Fast-Forward Merges & GitHub Remotes",
  duration: "25 mins",
  type: "quiz",
  position: 7,
  isModuleQuiz: true,
  contentHeading: "Module 2 Assessment: Branching & Remote Workflow Check",
  contentDescription: "Evaluate your understanding of git branch, checkout/switch, fast-forward vs 3-way merges, merge conflicts, git push, fetch vs pull, and Pull Request reviews.",
  questions: [
    ...gitLesson03.questions!.slice(0, 7),
    ...gitLesson04.questions!.slice(0, 8)
  ]
};

const gitModule02Assessment: CurriculumItem = {
  id: "item-git-m2-assessment",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Basics",
  subCoursePosition: 6,
  moduleId: "module-git-02-branching-remotes",
  moduleTitle: "Module 2: Branching Strategies & Remote Collaboration",
  modulePosition: 2,
  title: "Module 2 Assessment: Feature Branching, Remote Sync & PR Workflow",
  duration: "50 mins",
  type: "assignment",
  position: 8,
  isModuleAssessment: true,
  contentHeading: "Module 2 Practical Challenge: Collaborative GitHub Workflow",
  contentDescription: "Connect your local repository to a remote GitHub repository, create and push an isolated feature branch, open a Pull Request, and perform a clean merge.",
  assignmentPrompt: {
    instructions: "Demonstrate remote team collaboration workflows:\n1. Add remote 'origin' pointing to your GitHub repository.\n2. Create a branch 'feature/contact-page' and make changes.\n3. Push branch to GitHub using 'git push -u origin feature/contact-page'.\n4. Open a Pull Request on GitHub and merge it into main.",
    deliverables: [
      "GitHub Pull Request link and merge confirmation",
      "Terminal output of 'git remote -v' and 'git branch -a'",
      "Local sync confirmation using 'git pull origin main'"
    ]
  }
};

const gitModule02: CurriculumSubModule = {
  id: "module-git-02-branching-remotes",
  subCourseId: "mod-git-basics",
  title: "Module 2: Branching Strategies & Remote Collaboration",
  description: "Master team collaboration with Git and GitHub: feature branching, fast-forward and 3-way merges, merge conflict resolution, remote repositories (push/pull/fetch), and Pull Requests.",
  position: 2,
  duration: "2 hours, 20 mins",
  lessons: [gitLesson03, gitLesson04],
  moduleQuiz: gitModule02Quiz,
  moduleAssessment: gitModule02Assessment,
  items: [gitLesson03, gitLesson04, gitModule02Quiz, gitModule02Assessment]
};

// =========================================================================
// SUB-COURSE FINAL ASSESSMENT
// =========================================================================

const gitSubCourseExam: CurriculumItem = {
  ...({
      id: "item-git-05-module-assessment",
      moduleId: "mod-git-basics",
      moduleTitle: "Git Basics",
      modulePosition: 6,
      title: "05. Module Assessment: Git Basics Certification Exam",
      duration: "45 mins",
      type: "quiz",
      position: 5,
      contentHeading: "Module Assessment: Git Basics Certification Quiz",
      contentDescription: "Evaluate your comprehensive understanding of modern Git version control: architecture, staging lifecycle, atomic commits, branching workflows, fast-forward vs 3-way merges, conflict resolution, remotes, and GitHub collaboration.",
      questions: [
        {
          id: "git-exam-1",
          prompt: "What type of version control architecture does Git implement?",
          options: [
            { id: "ge1", label: "Distributed Version Control System (DVCS)" },
            { id: "ge2", label: "Centralized Version Control System (CVCS)" },
            { id: "ge3", label: "Local-only Locking System" },
            { id: "ge4", label: "Peer-to-peer Blockchain Storage" }
          ],
          correctIndex: 0,
          explanation: "Git is a Distributed VCS: every local clone contains full project history and objects."
        },
        {
          id: "git-exam-2",
          prompt: "Which folder contains all of Git's tracking data, object stores, configuration, and commit history for a repository?",
          options: [
            { id: "ge5", label: "The hidden '.git' folder in the repository root" },
            { id: "ge6", label: "node_modules/.cache" },
            { id: "ge7", label: "/tmp/git-data" },
            { id: "ge8", label: "The browser AppData directory" }
          ],
          correctIndex: 0,
          explanation: "All repository metadata, snapshots, branches, and logs are contained within the hidden .git directory."
        },
        {
          id: "git-exam-3",
          prompt: "Which configuration command configures your global committer email across all repositories on your computer?",
          options: [
            { id: "ge9", label: "git config --global user.email \"email@example.com\"" },
            { id: "ge10", label: "git set email \"email@example.com\"" },
            { id: "ge11", label: "git config --system email \"email@example.com\"" },
            { id: "ge12", label: "git user --email \"email@example.com\"" }
          ],
          correctIndex: 0,
          explanation: "git config --global user.email sets the author email in the global ~/.gitconfig file."
        },
        {
          id: "git-exam-4",
          prompt: "What does the command 'git init' do in an empty directory?",
          options: [
            { id: "ge13", label: "Initializes a brand-new, empty Git repository by generating the .git folder." },
            { id: "ge14", label: "Clones a repository from GitHub." },
            { id: "ge15", label: "Connects the computer to the internet." },
            { id: "ge16", label: "Deletes all untracked files." }
          ],
          correctIndex: 0,
          explanation: "git init establishes a new Git repository in the current directory."
        },
        {
          id: "git-exam-5",
          prompt: "What are the three core zones or trees in the Git architecture?",
          options: [
            { id: "ge17", label: "Working Directory, Staging Area (Index), and Repository (HEAD)" },
            { id: "ge18", label: "Client, Web Server, and Database" },
            { id: "ge19", label: "HTML, CSS, and JavaScript" },
            { id: "ge20", label: "Input, Process, and Output" }
          ],
          correctIndex: 0,
          explanation: "Git moves code through the Working Directory -> Staging Area -> Repository History."
        },
        {
          id: "git-exam-6",
          prompt: "What status is assigned to a newly created file in your project directory before you run 'git add'?",
          options: [
            { id: "ge21", label: "Untracked" },
            { id: "ge22", label: "Staged" },
            { id: "ge23", label: "Committed" },
            { id: "ge24", label: "Ignored" }
          ],
          correctIndex: 0,
          explanation: "Files created in the working tree that do not yet exist in Git's index are classified as Untracked."
        },
        {
          id: "git-exam-7",
          prompt: "What is the function of the 'git add .' command?",
          options: [
            { id: "ge25", label: "Stages all modified and new untracked files in the current directory and subdirectories for the next commit." },
            { id: "ge26", label: "Commits all changes directly to the remote repository." },
            { id: "ge27", label: "Prints the current directory path." },
            { id: "ge28", label: "Deletes all files in the current folder." }
          ],
          correctIndex: 0,
          explanation: "git add . stages all changes in the current directory tree into the staging area."
        },
        {
          id: "git-exam-8",
          prompt: "What does 'git status' communicate to the developer?",
          options: [
            { id: "ge29", label: "The current branch, staged changes, unstaged modified files, and untracked files." },
            { id: "ge30", label: "The download speed of your Wi-Fi network." },
            { id: "ge31", label: "The list of all GitHub issues assigned to you." },
            { id: "ge32", label: "The remaining battery life on your laptop." }
          ],
          correctIndex: 0,
          explanation: "git status reports on the active branch and differences between working directory, staging area, and HEAD."
        },
        {
          id: "git-exam-9",
          prompt: "Why should API secrets and credentials stored in '.env' NEVER be committed to Git?",
          options: [
            { id: "ge33", label: "Because commit history is permanent and accessible to anyone with repository read access, risking severe security breaches." },
            { id: "ge34", label: "Because Git does not support files beginning with a dot (.)." },
            { id: "ge35", label: "Because .env files corrupt the .git folder." },
            { id: "ge36", label: "Because GitHub charges $10 per environment variable." }
          ],
          correctIndex: 0,
          explanation: "Committing secrets compromises systems. Even if deleted in later commits, secrets remain permanently visible in past commit history."
        },
        {
          id: "git-exam-10",
          prompt: "How does Git uniquely identify every commit snapshot in history?",
          options: [
            { id: "ge37", label: "Using a 40-character hexadecimal SHA-1 hash calculated from the commit's content, author, and parent." },
            { id: "ge38", label: "Using simple sequential numbers (1, 2, 3...)." },
            { id: "ge39", label: "Using the developer's computer IP address." },
            { id: "ge40", label: "Using the file line count." }
          ],
          correctIndex: 0,
          explanation: "Git uses cryptographic SHA-1 hashes to uniquely and immutably identify each commit snapshot."
        },
        {
          id: "git-exam-11",
          prompt: "What command displays the difference between files in the working directory and files in the staging area?",
          options: [
            { id: "ge41", label: "git diff" },
            { id: "ge42", label: "git history" },
            { id: "ge43", label: "git show --staged" },
            { id: "ge44", label: "git log" }
          ],
          correctIndex: 0,
          explanation: "git diff shows unstaged modifications in your working tree against the index."
        },
        {
          id: "git-exam-12",
          prompt: "What does the 'git commit -m \"message\"' command perform?",
          options: [
            { id: "ge45", label: "Saves staged changes permanently into the local repository database as a new commit snapshot." },
            { id: "ge46", label: "Uploads code directly to a web host." },
            { id: "ge47", label: "Clears your local changes." },
            { id: "ge48", label: "Sends an email to your project manager." }
          ],
          correctIndex: 0,
          explanation: "git commit records staged changes into the local repository with author and message."
        },
        {
          id: "git-exam-13",
          prompt: "What is the purpose of 'git switch <branch-name>'?",
          options: [
            { id: "ge49", label: "Switches your working directory context to the specified branch." },
            { id: "ge50", label: "Renames the specified branch." },
            { id: "ge51", label: "Deletes the specified branch." },
            { id: "ge52", label: "Merges the branch into main." }
          ],
          correctIndex: 0,
          explanation: "git switch updates HEAD and your working directory to the target branch."
        },
        {
          id: "git-exam-14",
          prompt: "Which command creates a new branch named 'feature/nav' WITHOUT switching to it immediately?",
          options: [
            { id: "ge53", label: "git branch feature/nav" },
            { id: "ge54", label: "git switch -c feature/nav" },
            { id: "ge55", label: "git checkout -b feature/nav" },
            { id: "ge56", label: "git init feature/nav" }
          ],
          correctIndex: 0,
          explanation: "git branch <name> creates the branch pointer without switching HEAD to it."
        },
        {
          id: "git-exam-15",
          prompt: "What is a 'merge commit'?",
          options: [
            { id: "ge57", label: "A commit with two (or more) parent commits created during a 3-way merge uniting divergent branches." },
            { id: "ge58", label: "A commit that cancels previous commits." },
            { id: "ge59", label: "A commit that deletes a branch." },
            { id: "ge60", label: "A commit that failed due to an error." }
          ],
          correctIndex: 0,
          explanation: "A merge commit explicitly ties two distinct branches together, possessing two parent commit hashes."
        },
        {
          id: "git-exam-16",
          prompt: "What markers does Git place in a file when a merge conflict occurs?",
          options: [
            { id: "ge61", label: "<<<<<<< HEAD, =======, and >>>>>>> <branch-name>" },
            { id: "ge62", label: "[CONFLICT_START], [DIVIDER], [CONFLICT_END]" },
            { id: "ge63", label: "/* ERROR */ and /* FIX */" },
            { id: "ge64", label: "<!-- MERGE FAILED -->" }
          ],
          correctIndex: 0,
          explanation: "Git annotates conflicting lines with <<<<<<< HEAD, =======, and >>>>>>> <branch> markers."
        },
        {
          id: "git-exam-17",
          prompt: "How do you signal to Git that you have resolved a merge conflict in 'app.js'?",
          options: [
            { id: "ge65", label: "By staging the resolved file with 'git add app.js' and completing 'git commit'." },
            { id: "ge66", label: "By deleting app.js." },
            { id: "ge67", label: "By running 'git conflict --resolved'." },
            { id: "ge68", label: "By restarting the computer." }
          ],
          correctIndex: 0,
          explanation: "Staging the modified file with git add tells Git the conflict has been resolved, and git commit finalizes the merge commit."
        },
        {
          id: "git-exam-18",
          prompt: "What does 'git merge --abort' do during conflict resolution?",
          options: [
            { id: "ge69", label: "Stops the merge process and restores the project back to the state before 'git merge' was called." },
            { id: "ge70", label: "Forces the merge through by choosing the incoming changes automatically." },
            { id: "ge71", label: "Deletes the repository." },
            { id: "ge72", label: "Pushes the conflict to GitHub." }
          ],
          correctIndex: 0,
          explanation: "git merge --abort safely cancels the merge attempt and reverts all files to pre-merge condition."
        },
        {
          id: "git-exam-19",
          prompt: "Which command links your local repository to a remote GitHub URL under the conventional alias 'origin'?",
          options: [
            { id: "ge73", label: "git remote add origin <url>" },
            { id: "ge74", label: "git link <url> as origin" },
            { id: "ge75", label: "git set-origin <url>" },
            { id: "ge76", label: "git connect <url>" }
          ],
          correctIndex: 0,
          explanation: "git remote add origin <url> registers the remote repository location under the alias 'origin'."
        },
        {
          id: "git-exam-20",
          prompt: "What happens when you execute 'git clone <url>'?",
          options: [
            { id: "ge77", label: "Git creates a new directory, downloads all commits, branches, and tags, registers 'origin', and checks out the default branch." },
            { id: "ge78", label: "It downloads only the index.html file." },
            { id: "ge79", label: "It deletes the remote repository." },
            { id: "ge80", label: "It starts a live server on port 3000." }
          ],
          correctIndex: 0,
          explanation: "git clone creates a complete local mirror of the remote repository and checks out the default branch."
        },
        {
          id: "git-exam-21",
          prompt: "Why is 'git fetch' safer than 'git pull' when you have local uncommitted changes?",
          options: [
            { id: "ge81", label: "'git fetch' only updates remote-tracking branches without touching your working files, whereas 'git pull' merges immediately." },
            { id: "ge82", label: "'git pull' is an experimental feature." },
            { id: "ge83", label: "'git fetch' requires no internet." },
            { id: "ge84", label: "'git fetch' automatically formats code." }
          ],
          correctIndex: 0,
          explanation: "git fetch never modifies your working tree or active local branch, making it risk-free to run anytime."
        },
        {
          id: "git-exam-22",
          prompt: "What does 'git stash' do with your local modified files?",
          options: [
            { id: "ge85", label: "Saves them to an internal temporary stash stack and reverts working directory to clean HEAD state." },
            { id: "ge86", label: "Sends them to the recycle bin." },
            { id: "ge87", label: "Commits them with a random message." },
            { id: "ge88", label: "Publishes them to GitHub as a secret Gist." }
          ],
          correctIndex: 0,
          explanation: "git stash shelves your uncommitted modifications on a stack so you can pull, switch branches, or test other code cleanly."
        },
        {
          id: "git-exam-23",
          prompt: "How do you restore stashed changes back into your working directory?",
          options: [
            { id: "ge89", label: "git stash pop" },
            { id: "ge90", label: "git stash delete" },
            { id: "ge91", label: "git unstash --all" },
            { id: "ge92", label: "git recover" }
          ],
          correctIndex: 0,
          explanation: "git stash pop applies the most recent stashed state back onto your working directory and drops it from the stash stack."
        },
        {
          id: "git-exam-24",
          prompt: "What is a 'Pull Request' (PR) in modern software engineering collaboration?",
          options: [
            { id: "ge93", label: "A formal mechanism to review, discuss, and run automated CI checks on feature branch changes before merging them into main." },
            { id: "ge94", label: "A command to download files from an FTP server." },
            { id: "ge95", label: "A request sent to GitHub for billing refunds." },
            { id: "ge96", label: "An automated compiler error." }
          ],
          correctIndex: 0,
          explanation: "Pull Requests enable collaborative code review, discussion, and continuous integration checks before integrating code."
        },
        {
          id: "git-exam-25",
          prompt: "Why is 'git revert <commit-hash>' preferred over 'git reset --hard' on shared team branches?",
          options: [
            { id: "ge97", label: "'git revert' preserves commit history by creating a new inverse commit, preventing rewriting history for other teammates." },
            { id: "ge98", label: "'git reset' only works on Windows." },
            { id: "ge99", label: "'git revert' is faster than git reset." },
            { id: "ge100", label: "'git revert' automatically writes test cases." }
          ],
          correctIndex: 0,
          explanation: "Rewriting shared history with git reset breaks teammates' local clones. git revert appends a new commit that undoes changes safely."
        }
      ]
    }),
  title: "Sub-Course Assessment: Git & GitHub Comprehensive Certification Exam",
  isSubCourseAssessment: true,
  position: 9
};

const gitSubCourseProject: CurriculumItem = {
  ...({
      id: "item-git-06-graded-assignment",
      moduleId: "mod-git-basics",
      moduleTitle: "Git Basics",
      modulePosition: 6,
      title: "06. Graded Project Assignment: Git Feature Workflow & Conflict Resolution",
      duration: "60 mins",
      type: "assignment",
      position: 6,
      contentHeading: "Graded Project Assignment: Production Git Branching & Conflict Resolution",
      contentDescription: "Execute a complete real-world Git collaborative workflow: initialize a repository, establish semantic commit history, configure .gitignore, create isolated feature branches, simulate a merge conflict, and resolve it cleanly.",
      assignmentPrompt: {
        instructions: `Demonstrate your mastery of professional Git version control by executing a multi-branch development and conflict resolution workflow.

Project Scenario & Requirements:
1. Initialize Repository:
   - Create a local directory named 'blezex-git-capstone'.
   - Initialize Git using 'git init' and ensure the default branch is 'main'.
   - Configure a '.gitignore' file ignoring 'node_modules/', '.env', and '*.log'.

2. Foundation Commit:
   - Create an 'index.html' file with basic semantic HTML5 structure.
   - Stage and commit with a semantic commit message: 'feat: initialize project with semantic index.html'.

3. Feature Branch 1 (Theme Feature):
   - Create and switch to a branch named 'feature/dark-theme'.
   - Update the <body> element in 'index.html' to include class="dark-theme" and a header '<header><h1>BlezeX Dark Mode</h1></header>'.
   - Stage and commit: 'feat: add dark theme markup and header'.

4. Base Branch Update (Simulating Teammate Work):
   - Switch back to 'main'.
   - On 'main', edit the exact same <body> element and header to '<header><h1>BlezeX Career Accelerator</h1></header>'.
   - Stage and commit on main: 'feat: update brand header on main'.

5. Trigger & Resolve the Merge Conflict:
   - On 'main', execute 'git merge feature/dark-theme'.
   - Git will report a MERGE CONFLICT in 'index.html'.
   - Open 'index.html', inspect the conflict markers (<<<<<<< HEAD, =======, >>>>>>> feature/dark-theme).
   - Manually combine the best elements from both branches into a cohesive header: e.g. '<header><h1 class="dark-theme">BlezeX Career Accelerator — Dark Mode</h1></header>'.
   - Delete all conflict markers, save the file.
   - Stage the resolved file: 'git add index.html'.
   - Finalize the merge: 'git commit -m "merge: resolve header conflict uniting brand title and dark theme"'.

6. Submission:
   - Run 'git log --oneline --graph --all' in your terminal and paste the complete log output into the text submission area below.
   - If you pushed your repository to GitHub, provide the repository URL in the GitHub Link input field.`,
        deliverables: [
          "Complete git log --oneline --graph output showing the branching, divergence, and merge commit.",
          "Demonstration of a properly configured .gitignore file ignoring .env and node_modules.",
          "Evidence of an atomic semantic commit history (feat, merge, chore prefixes).",
          "Clean resolution of the simulated merge conflict with zero remaining conflict markers (<<<<<<<, =======, >>>>>>>).",
          "Safe deletion of the merged feature branch with 'git branch -d feature/dark-theme'."
        ]
      }
    }),
  title: "Sub-Course Capstone Project: Git Feature Workflow & Merge Conflict Resolution",
  isSubCourseAssessment: true,
  position: 10
};

export const gitBasicsSubCourse: CurriculumSubCourse = {
  id: "mod-git-basics",
  title: "Version Control with Git & GitHub",
  position: 6,
  duration: "5 hours, 10 mins",
  description: "Master modern version control with Git and GitHub: repository configuration, staging area lifecycle, commit hygiene, branching strategies, fast-forward and 3-way merges, merge conflict resolution, remotes (push/pull/fetch), pull requests, and collaborative workflows.",
  modules: [gitModule01, gitModule02],
  courseAssessment: gitSubCourseExam,
  courseProject: gitSubCourseProject,
  items: [
    ...gitModule01.items,
    ...gitModule02.items,
    gitSubCourseExam,
    gitSubCourseProject
  ]
};

/**
 * Backward compatibility alias
 */
export const gitBasicsModule = gitBasicsSubCourse;
