import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 2: EVERYDAY WORKFLOW
// Lessons 131 - 134 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 131: INITIALIZE, CLONE AND INSPECT
const lesson131: CurriculumItem = {
  id: "item-git-131-init-clone-inspect",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-02-everyday-workflow",
  moduleTitle: "Module 2: Everyday Workflow",
  modulePosition: 2,
  title: "131. Initialize, Clone and Inspect",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 131: Initialize, Clone and Inspect",
  contentDescription: "Master initializing new repositories with git init, cloning remote projects with git clone, inspecting status with git status, viewing log graphs with git log, and comparing revisions with git diff.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Initialize a brand-new repository in the current directory
git init

# 2. Clone an existing repository from GitHub
git clone https://github.com/blezex/learning-portal.git

# 3. Inspect repository status
git status

# 4. View formatted, compact history graph
git log --oneline --graph --decorate --all

# 5. Inspect unstaged differences between Working Tree and Staging Area
git diff`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Planting a Seed vs Buying a Potted Plant",
      explanation: "Starting a project in Git happens in one of two ways. 1) `git init` is planting a seed in an empty flower pot: you start with an empty folder on your desktop, run `git init`, and Git creates a hidden `.git` brain inside it. It has zero history, waiting for you to create your first commit. 2) `git clone` is going to a garden nursery and buying a fully grown, healthy potted plant: you provide a GitHub URL, and Git downloads the ENTIRE plant—every branch, every commit from the past 5 years, and sets up your remote connection automatically!",
      bullets: [
        "`git init`: Creates a new, blank local Git repository (`.git` directory).",
        "`git clone <url>`: Copies an entire remote repository, sets up `origin`, and checks out the default branch.",
        "`git log`: Inspects the chronological chain of commit snapshots."
      ]
    },
    {
      title: "2. The Daily Inspection Toolkit",
      explanation: "Run these 3 commands constantly throughout your working day:",
      table: {
        headers: ["Command", "What It Shows", "When to Run"],
        rows: [
          ["`git status`", "Current branch, staged files, unstaged modified files, untracked files", "Before and after every single edit, add, or commit"],
          ["`git diff`", "Exact line-by-line additions (+) and deletions (-) in unstaged working files", "Before running `git add` to review your edits"],
          ["`git log --oneline`", "Compact list of recent commit hashes and messages", "After committing to verify history is clean and focused"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Advanced `git log` Formatting",
      explanation: "Raw `git log` can be verbose and hard to read. Professional developers use clean formatting flags:",
      bullets: [
        "`--oneline`: Compresses each commit into a 7-character short hash and subject line.",
        "`--graph`: Draws a visual ASCII graph showing branch lines and merges.",
        "`-n <number>`: Limits output to the last `N` commits (e.g. `git log -n 5`).",
        "`--stat`: Shows which files changed and how many lines were inserted or deleted."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these beginner workflow mistakes:",
      bullets: [
        "Nesting Repositories: Running `git init` inside a folder that is already inside an existing Git repository. This creates confusing nested sub-repositories.",
        "Getting Stuck in the `git log` Pager: `git log` opens a scrollable terminal pager (`less`). To exit and return to your prompt, simply press the `q` key on your keyboard!",
        "Cloning Inside Another Repo: Always navigate to a clean parent directory (e.g. `cd ~/projects`) before running `git clone`."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Clone an open-source repository or practice repo. Inspect the status with `git status`. Use `git log --oneline -n 10` to view the 10 most recent commits. Use `git show <hash>` to inspect the exact diff introduced by the latest commit."
    }
  ],
  questions: [
    {
      id: "q-git-131-1",
      prompt: "What does the command `git init` do?",
      options: [
        { id: "a", label: "Initializes a new, empty Git repository in the current directory by creating a hidden `.git` folder" },
        { id: "b", label: "Installs Git on your computer" },
        { id: "c", label: "Uploads your code to GitHub" },
        { id: "d", label: "Deletes all files in the current folder" }
      ],
      correctAnswer: "a",
      explanation: "`git init` creates the `.git` metadata directory, transforming an ordinary directory into a tracked Git repository."
    },
    {
      id: "q-git-131-2",
      prompt: "What does `git clone <url>` do?",
      options: [
        { id: "a", label: "Downloads a full clone of an existing remote repository, copies all branches and history, and configures the default 'origin' remote" },
        { id: "b", label: "Copies a single file from the internet" },
        { id: "c", label: "Creates a backup on a USB stick" },
        { id: "d", label: "Deletes the remote repository" }
      ],
      correctAnswer: "a",
      explanation: "`git clone` initializes a new directory, downloads the full object database from the remote URL, and checks out the main branch."
    },
    {
      id: "q-git-131-3",
      prompt: "How do you exit the `git log` pager screen in your terminal when it finishes displaying history?",
      options: [
        { id: "a", label: "Press the `q` key" },
        { id: "b", label: "Unplug the computer" },
        { id: "c", label: "Type `exit` and hit enter" },
        { id: "d", label: "Press Backspace 10 times" }
      ],
      correctAnswer: "a",
      explanation: "Terminal pagers (like `less`) used by Git log can be exited by pressing the `q` key to quit back to your shell prompt."
    },
    {
      id: "q-git-131-4",
      prompt: "What is the difference between `git log` and `git status`?",
      options: [
        { id: "a", label: "`git status` shows the current state of working files and staging index; `git log` shows the historical record of committed snapshots" },
        { id: "b", label: "They are identical commands" },
        { id: "c", label: "`git log` only works with internet" },
        { id: "d", label: "`git status` only works on Sundays" }
      ],
      correctAnswer: "a",
      explanation: "`git status` reflects the immediate present (uncommitted changes); `git log` reflects the committed past."
    },
    {
      id: "q-git-131-5",
      prompt: "What does the `--oneline` flag do in `git log --oneline`?",
      options: [
        { id: "a", label: "Displays each commit as a single concise line with its abbreviated SHA hash and commit subject" },
        { id: "b", label: "Deletes all commits except one" },
        { id: "c", label: "Forces Git to run on a single CPU core" },
        { id: "d", label: "Limits commits to 1 character" }
      ],
      correctAnswer: "a",
      explanation: "`--oneline` is a formatting shortcut that condenses commit logs into a high-level, easily scannable list."
    },
    {
      id: "q-git-131-6",
      prompt: "What does `git diff` (with no flags) compare?",
      options: [
        { id: "a", label: "Changes in your Working Directory compared to your Staging Area (unstaged modifications)" },
        { id: "b", label: "Changes between two remote servers" },
        { id: "c", label: "Changes between two different computers" },
        { id: "d", label: "Changes between two branches" }
      ],
      correctAnswer: "a",
      explanation: "Plain `git diff` shows unstaged modifications currently in your working directory that have not yet been added to the staging index."
    },
    {
      id: "q-git-131-7",
      prompt: "What command inspects the details and diff of a specific commit using its hash?",
      options: [
        { id: "a", label: "`git show <commit-hash>`" },
        { id: "b", label: "`git view <commit-hash>`" },
        { id: "c", label: "`git inspect <commit-hash>`" },
        { id: "d", label: "`git open <commit-hash>`" }
      ],
      correctAnswer: "a",
      explanation: "`git show <hash>` displays the author, timestamp, commit message, and full diff patch introduced by that commit."
    },
    {
      id: "q-git-131-8",
      prompt: "Why should you avoid running `git init` inside an existing repository or user home directory (`C:\\Users\\Username` or `~`)?",
      options: [
        { id: "a", label: "It will track your entire computer hard drive or create nested repository conflicts, causing massive accidental file tracking" },
        { id: "b", label: "Because Git will delete your home folder" },
        { id: "c", label: "Because Windows will lock your files" },
        { id: "d", label: "It is technically impossible" }
      ],
      correctAnswer: "a",
      explanation: "Initializing Git in a root home directory turns all personal files, downloads, and app data into untracked files in a giant unintended repository."
    },
    {
      id: "q-git-131-9",
      prompt: "What does `git diff --staged` (or `git diff --cached`) display?",
      options: [
        { id: "a", label: "The differences between your Staging Area and the latest commit snapshot in the repository" },
        { id: "b", label: "Unstaged working files" },
        { id: "c", label: "Differences between two remote repositories" },
        { id: "d", label: "Deleted branches" }
      ],
      correctAnswer: "a",
      explanation: "`git diff --staged` shows the exact patch that will be recorded if you execute `git commit` right now."
    },
    {
      id: "q-git-131-10",
      prompt: "How can you view only the last 3 commits in `git log`?",
      options: [
        { id: "a", label: "`git log -n 3`" },
        { id: "b", label: "`git log --three`" },
        { id: "c", label: "`git log --limit=3`" },
        { id: "d", label: "`git log -3commits`" }
      ],
      correctAnswer: "a",
      explanation: "The `-n <number>` flag limits the commit log history to the specified count."
    }
  ]
};

// LESSON 132: STAGE AND COMMIT CHANGES
const lesson132: CurriculumItem = {
  id: "item-git-132-stage-commit-changes",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-02-everyday-workflow",
  moduleTitle: "Module 2: Everyday Workflow",
  modulePosition: 2,
  title: "132. Stage and Commit Changes",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 132: Stage and Commit Changes",
  contentDescription: "Master staging files with git add, reviewing staged changes with git diff --staged, crafting professional commit messages, and understanding commit immutability.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Stage specific files for the next commit
git add src/components/CourseCard.jsx
git add src/styles/courseCard.css

# 2. Review the exact staged snapshot before committing
git diff --staged

# 3. Record the snapshot with a clear, imperative commit message
git commit -m "Add responsive course card component and styles"

# 4. Interactive Staging: Split a large modified file into smaller chunks (hunks)
# git add -p filename.js`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Packing a Shipping Box",
      explanation: "Think of `git add` as placing items inside a cardboard shipping box, and `git commit` as sealing the box with shipping tape and printing a clear label on the outside. You don't throw your dirty laundry, a half-eaten sandwich, and your birthday present all into the same shipping box! You pack only the birthday present, seal it, and write 'Birthday gift for Alice' on the box. Then you pack your laundry into a separate box. Each commit should represent ONE coherent, logical change with an accurate label!",
      bullets: [
        "`git add <file>`: Moves changes into the staging box.",
        "`git diff --staged`: Opens the box to double-check that no private secrets or unwanted files fell in.",
        "`git commit -m '<msg>'`: Seals the snapshot permanently into the repository history."
      ]
    },
    {
      title: "2. The Anatomy of a Professional Commit Message",
      explanation: "Industry-standard commit messages follow the Imperative Mood guideline:",
      table: {
        headers: ["Standard", "Good Example (Imperative)", "Bad Example (Vague / Past tense)"],
        rows: [
          ["Imperative Voice", "`Add course filter dropdown`", "`Added some stuff`"],
          ["Fixing a Bug", "`Fix null pointer in student auth token`", "`Fixed bug`"],
          ["Refactoring", "`Refactor course card to functional component`", "`Changes`"],
          ["Updating Docs", "`Update API endpoint URL in README`", "`docs`"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Interactive Patch Staging (`git add -p`)",
      explanation: "What if you edited 50 lines in `App.jsx`, but 20 lines fix a bug and 30 lines start a new feature? You can split the file during staging using `git add -p` (patch mode):",
      bullets: [
        "Git divides the file changes into individual chunks called 'hunks'.",
        "Git prompts: `Stage this hunk [y,n,q,a,d,s,e,?]?`",
        "Press `y` to stage the bugfix hunk, and `n` to skip the feature hunk. This lets you craft two perfect, isolated commits from a single file!"
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these commit mistakes:",
      bullets: [
        "Vague Commit Messages: Writing messages like `updates`, `wip`, `fixed`, or `asdf`. Six months later, nobody will know what was changed or why.",
        "Committing Everything with `git commit -a -m`: Bypasses staging and can commit unwanted temporary files or debug `console.log` statements.",
        "Giant Megacommit: Working for 3 weeks and committing 200 files in one giant commit. If a bug is introduced, pinpointing the cause is nearly impossible."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create two focused commits in a test repository. Commit 1: Add a header to `index.html`. Commit 2: Add styles to `styles.css`. Ensure each commit message uses the imperative mood and verify the history with `git log --oneline`."
    }
  ],
  questions: [
    {
      id: "q-git-132-1",
      prompt: "What does `git add src/` do?",
      options: [
        { id: "a", label: "Stages all new, modified, and deleted files within the `src/` directory for the next commit" },
        { id: "b", label: "Deletes the `src/` directory" },
        { id: "c", label: "Uploads `src/` to GitHub" },
        { id: "d", label: "Compiles JavaScript files" }
      ],
      correctAnswer: "a",
      explanation: "`git add <path>` stages all changes within the specified directory path."
    },
    {
      id: "q-git-132-2",
      prompt: "Why should you run `git diff --staged` before running `git commit`?",
      options: [
        { id: "a", label: "To review the exact staged changes and verify that no accidental secrets, console logs, or unrelated files are being committed" },
        { id: "b", label: "Because Git requires it before committing" },
        { id: "c", label: "To format your JavaScript code" },
        { id: "d", label: "To delete untracked files" }
      ],
      correctAnswer: "a",
      explanation: "Reviewing the staged diff is your last line of defense against committing accidental secrets, debug statements, or broken code."
    },
    {
      id: "q-git-132-3",
      prompt: "Which of the following is written in the recommended 'imperative mood' for Git commit messages?",
      options: [
        { id: "a", label: "`Add search filter to course catalog`" },
        { id: "b", label: "`Added some search stuff yesterday`" },
        { id: "c", label: "`I was adding filters and it works now`" },
        { id: "d", label: "`Fixing bugs and things`" }
      ],
      correctAnswer: "a",
      explanation: "Git conventions specify the imperative mood ('Add', 'Fix', 'Refactor'), completing the sentence: 'If applied, this commit will... [Add search filter]'."
    },
    {
      id: "q-git-132-4",
      prompt: "What does interactive staging (`git add -p`) allow a developer to do?",
      options: [
        { id: "a", label: "Selectively stage specific chunks (hunks) of changes within a single modified file, splitting a large change into multiple atomic commits" },
        { id: "b", label: "Add password protection to a commit" },
        { id: "c", label: "Print the commit on a physical printer" },
        { id: "d", label: "Push code to production automatically" }
      ],
      correctAnswer: "a",
      explanation: "`git add -p` steps through individual diff hunks, allowing you to stage only desired changes while leaving others in the working directory."
    },
    {
      id: "q-git-132-5",
      prompt: "What does the `-m` flag in `git commit -m 'My message'` signify?",
      options: [
        { id: "a", label: "It supplies the commit message inline directly in the terminal command without opening a text editor" },
        { id: "b", label: "It marks the commit as main" },
        { id: "c", label: "It merges two branches" },
        { id: "d", label: "It moves files" }
      ],
      correctAnswer: "a",
      explanation: "`-m` stands for message, allowing you to provide the commit title string directly on the command line."
    },
    {
      id: "q-git-132-6",
      prompt: "What happens if you run `git commit` without the `-m` flag?",
      options: [
        { id: "a", label: "Git opens your configured default text editor (e.g. VS Code or Vim) so you can write a multi-line commit message" },
        { id: "b", label: "The commit is aborted immediately" },
        { id: "c", label: "Git invents a random message" },
        { id: "d", label: "All files are deleted" }
      ],
      correctAnswer: "a",
      explanation: "Without `-m`, Git launches the configured editor (`core.editor`), allowing you to write a comprehensive commit title and description."
    },
    {
      id: "q-git-132-7",
      prompt: "What is the cryptographic identity of every Git commit snapshot?",
      options: [
        { id: "a", label: "A unique 40-character SHA-1 (or 64-character SHA-256) cryptographic hash" },
        { id: "b", label: "A sequential integer like 1, 2, 3" },
        { id: "c", label: "The developer's phone number" },
        { id: "d", label: "The current date and time string" }
      ],
      correctAnswer: "a",
      explanation: "Git hashes the commit snapshot, author, timestamp, parent hash, and message using SHA to create an immutable cryptographic checksum."
    },
    {
      id: "q-git-132-8",
      prompt: "What does `git commit --amend` allow you to do?",
      options: [
        { id: "a", label: "Modify the most recent commit by updating its message or including newly staged files (only safe for unpushed local commits!)" },
        { id: "b", label: "Delete all previous commits" },
        { id: "c", label: "Create a new branch" },
        { id: "d", label: "Send an email" }
      ],
      correctAnswer: "a",
      explanation: "`--amend` replaces the tip of the current branch with a new commit containing staged changes or an updated message."
    },
    {
      id: "q-git-132-9",
      prompt: "Why is running `git commit -am 'Message'` dangerous for untracked files?",
      options: [
        { id: "a", label: "Because the `-a` flag only automatically stages modified tracked files; it completely ignores brand-new untracked files" },
        { id: "b", label: "Because it deletes the files" },
        { id: "c", label: "Because it makes the commit public" },
        { id: "d", label: "Because it requires root permissions" }
      ],
      correctAnswer: "a",
      explanation: "`git commit -a` only captures tracked files. Brand-new files will be left behind as untracked unless explicitly staged with `git add`."
    },
    {
      id: "q-git-132-10",
      prompt: "What is an atomic commit in a collaborative team repository?",
      options: [
        { id: "a", label: "A commit that encapsulates a single complete, self-contained change that does not break builds or tests" },
        { id: "b", label: "A commit made by nuclear physicists" },
        { id: "c", label: "A commit that deletes the repository" },
        { id: "d", label: "A commit that cannot be merged" }
      ],
      correctAnswer: "a",
      explanation: "Atomic commits make project history clean, bisectable (via `git bisect`), and easily revertible if issues arise."
    }
  ]
};

// LESSON 133: IGNORE FILES AND INSPECT DIFFS
const lesson133: CurriculumItem = {
  id: "item-git-133-ignore-files-diffs",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-02-everyday-workflow",
  moduleTitle: "Module 2: Everyday Workflow",
  modulePosition: 2,
  title: "133. Ignore Files and Inspect Diffs",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 133: Ignore Files and Inspect Diffs",
  contentDescription: "Master configuring .gitignore patterns, preventing committing secrets, local dependencies (node_modules), and build artifacts (dist), untracking accidentally committed files with git rm --cached, and reading unified diffs.",
  codeSnippet: {
    language: "bash",
    code: `# Standard .gitignore file for a modern Full-Stack React & Node project
# Dependencies (NEVER commit; regenerate with npm install)
node_modules/

# Local Environment Variables & Secrets (CRITICAL SECURITY)
.env
.env.local
.env.*.local

# Build Artifacts & Distribution Folders
dist/
build/

# Operating System Junk
.DS_Store
Thumbs.db

# Untrack an accidentally committed file without deleting it from disk:
# git rm --cached .env`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Do Not Disturb Sign on the Hotel Door",
      explanation: "Imagine a hotel maid walking down the hallway. If a guest puts a 'Do Not Disturb' sign on their door, the maid walks right past and ignores that room completely. A `.gitignore` file is your project's 'Do Not Disturb' sign for Git! It lists all the temporary junk files, operating system clutter, huge 500MB `node_modules` folders, and private `.env` password files that Git should NEVER look at, stage, or upload to GitHub. Without `.gitignore`, running `git add .` would drag 50,000 junk files into your repository!",
      bullets: [
        "`.gitignore`: A plain text file placed at the root of your repository.",
        "Security Shield: Keeps private database passwords and secret API keys out of public view.",
        "Repo Hygiene: Prevents repository bloat by excluding files that can be easily regenerated via `npm install` or `npm run build`."
      ]
    },
    {
      title: "2. The 3 Things You Must NEVER Commit to Git",
      explanation: "Memorize these three categories of forbidden files:",
      table: {
        headers: ["Category", "Why It is Forbidden", "Examples to Ignore"],
        rows: [
          ["1. Secrets & Credentials", "Committing passwords or API tokens to GitHub leads to immediate bot exploits and database theft", "`.env`, `*.pem`, `id_rsa`, `serviceAccountKey.json`"],
          ["2. Dependencies", "Dependencies should be downloaded fresh via `package.json` manifest; committing them wastes hundreds of megabytes", "`node_modules/`, `vendor/`"],
          ["3. Build Artifacts", "Generated automatically by build tools; committing them causes massive merge conflicts", "`dist/`, `build/`, `.cache/`"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: How to Untrack an Already Committed File",
      explanation: "A vital Git rule: Adding a file to `.gitignore` only works if the file is currently UNTRACKED. If you already committed `.env` in the past, Git will continue tracking it! To stop tracking it without deleting your local copy from your hard drive, run:",
      bullets: [
        "`git rm --cached .env`: Removes `.env` from the staging index and repository history.",
        "`git commit -m 'Stop tracking .env file'`: Permanently stops Git from tracking changes to that file.",
        "The physical `.env` file remains untouched on your local computer."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these ignore file mistakes:",
      bullets: [
        "Committing `.env` and pushing to GitHub: Once pushed, the secret is in public Git history forever, even if deleted in a later commit! You must immediately revoke and rotate the compromised password or token.",
        "Spelling `.gitignore` incorrectly: Naming it `gitignore.txt` or `.gitIgnore`. It must be all lowercase and start with a dot.",
        "Forgetting trailing slash on folders: Write `node_modules/` with a trailing slash to explicitly target directories."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a `.gitignore` file that ignores `node_modules/`, `dist/`, and `.env`. Create a test `.env` file containing `SECRET_KEY=123`. Run `git status` and verify that Git completely ignores the `.env` file."
    }
  ],
  questions: [
    {
      id: "q-git-133-1",
      prompt: "What is the purpose of a `.gitignore` file in a Git repository?",
      options: [
        { id: "a", label: "To specify untracked file patterns and directories that Git should intentionally ignore and never stage or track" },
        { id: "b", label: "To delete files from your computer" },
        { id: "c", label: "To ignore syntax errors in JavaScript" },
        { id: "d", label: "To block spam emails" }
      ],
      correctAnswer: "a",
      explanation: "`.gitignore` tells Git which files or directories to omit from untracked listings, preventing them from being staged or committed."
    },
    {
      id: "q-git-133-2",
      prompt: "Why should `node_modules/` NEVER be committed to a Git repository?",
      options: [
        { id: "a", label: "Because it contains thousands of third-party files that can be regenerated cleanly at any time by running `npm install` from `package.json`" },
        { id: "b", label: "Because Git deletes node_modules automatically" },
        { id: "c", label: "Because node_modules is encrypted" },
        { id: "d", label: "Because npm packages cannot run in Git" }
      ],
      correctAnswer: "a",
      explanation: "Committing `node_modules/` inflates repository size by hundreds of megabytes and creates platform-specific compilation conflicts."
    },
    {
      id: "q-git-133-3",
      prompt: "What happens if a sensitive `.env` file containing a database password is accidentally committed and pushed to a public GitHub repository?",
      options: [
        { id: "a", label: "Automated scanner bots scrape the secret within seconds; you must immediately revoke and rotate the credentials on your database" },
        { id: "b", label: "GitHub hides passwords automatically" },
        { id: "c", label: "Nothing happens" },
        { id: "d", label: "The password is encrypted by GitHub" }
      ],
      correctAnswer: "a",
      explanation: "Public repositories are actively monitored by malicious bots that harvest leaked keys. Exposed secrets must be revoked immediately."
    },
    {
      id: "q-git-133-4",
      prompt: "If a file was already committed to Git in the past, will adding its name to `.gitignore` stop Git from tracking changes to it?",
      options: [
        { id: "a", label: "No; `.gitignore` only ignores untracked files; an already tracked file must first be untracked with `git rm --cached <file>`" },
        { id: "b", label: "Yes, Git immediately stops tracking it" },
        { id: "c", label: "It deletes the file from disk" },
        { id: "d", label: "It throws a fatal syntax error" }
      ],
      correctAnswer: "a",
      explanation: "`.gitignore` does not apply to files that are already tracked. You must run `git rm --cached <file>` to remove it from the index."
    },
    {
      id: "q-git-133-5",
      prompt: "What does the command `git rm --cached <file>` do?",
      options: [
        { id: "a", label: "Removes the file from Git's staging index/tracking, but leaves the physical file intact in your working directory" },
        { id: "b", label: "Permanently deletes the file from your computer hard drive" },
        { id: "c", label: "Clears your web browser cache" },
        { id: "d", label: "Re-downloads the file from GitHub" }
      ],
      correctAnswer: "a",
      explanation: "The `--cached` flag instructs Git to remove the file from version tracking without deleting the actual file on disk."
    },
    {
      id: "q-git-133-6",
      prompt: "What does the pattern `*.log` in a `.gitignore` file match?",
      options: [
        { id: "a", label: "All files ending with the `.log` extension in the repository" },
        { id: "b", label: "Only files named exactly `*.log`" },
        { id: "c", label: "All files in the project" },
        { id: "d", label: "The `git log` command" }
      ],
      correctAnswer: "a",
      explanation: "The wildcard asterisk `*` matches any character sequence, matching all files ending in `.log`."
    },
    {
      id: "q-git-133-7",
      prompt: "How can you un-ignore a specific file that matches a general ignore rule in `.gitignore`?",
      options: [
        { id: "a", label: "Prefix the filename with an exclamation mark: `!important.log`" },
        { id: "b", label: "Put the filename in quotes" },
        { id: "c", label: "Add the word `include`" },
        { id: "d", label: "It is impossible to un-ignore" }
      ],
      correctAnswer: "a",
      explanation: "An exclamation mark `!` negates a pattern, allowing you to re-include specific files that would otherwise be ignored."
    },
    {
      id: "q-git-133-8",
      prompt: "What does a green plus sign (`+`) indicate in a `git diff` output?",
      options: [
        { id: "a", label: "A line of code that was newly added" },
        { id: "b", label: "A line of code that was deleted" },
        { id: "c", label: "A line of code with a syntax error" },
        { id: "d", label: "A line of code that was approved" }
      ],
      correctAnswer: "a",
      explanation: "In unified diff format, lines beginning with `+` represent newly inserted lines of code."
    },
    {
      id: "q-git-133-9",
      prompt: "What does a red minus sign (`-`) indicate in a `git diff` output?",
      options: [
        { id: "a", label: "A line of code that was deleted or replaced" },
        { id: "b", label: "A comment line" },
        { id: "c", label: "A negative number in JavaScript" },
        { id: "d", label: "A line of code that was copied" }
      ],
      correctAnswer: "a",
      explanation: "In unified diff format, lines beginning with `-` represent lines removed from the previous revision."
    },
    {
      id: "q-git-133-10",
      prompt: "Where should the main `.gitignore` file be placed in a project?",
      options: [
        { id: "a", label: "At the root directory of the Git repository" },
        { id: "b", label: "Inside the `.git` folder" },
        { id: "c", label: "Inside `node_modules`" },
        { id: "d", label: "On the desktop" }
      ],
      correctAnswer: "a",
      explanation: "Placing `.gitignore` at the repository root ensures its ignore patterns apply across the entire project tree."
    }
  ]
};

// LESSON 134: UNDOING CHANGES SAFELY
const lesson134: CurriculumItem = {
  id: "item-git-134-undoing-changes-safely",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-02-everyday-workflow",
  moduleTitle: "Module 2: Everyday Workflow",
  modulePosition: 2,
  title: "134. Undoing Changes Safely",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lesson 134: Undoing Changes Safely",
  contentDescription: "Master the safe recovery toolkit in Git: discarding working tree changes with git restore, un-staging files with git restore --staged, safe public history rollback with git revert, and understanding the risks of git reset --hard.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Discard UNSTAGED modifications in the working directory
# (Restores file back to the latest commit/staged version)
git restore file.txt

# 2. UN-STAGE a file (Moves file out of the staging index back to modified)
git restore --staged file.txt

# 3. SAFE RECOVERY FOR SHARED / PUBLIC COMMITS:
# Creates a brand-new commit that applies the EXACT INVERSE of a bad commit
git revert <commit-hash>

# 4. LOCAL ONLY: Soft reset moves branch pointer back without deleting code
# git reset --soft HEAD~1`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Eraser vs Bank Correction Entry",
      explanation: "Imagine you are writing in your personal journal at home. If you write a sentence you don't like, you can take a pencil eraser, rub it out vigorously, and pretend it never happened (`git restore` or `git reset`). But imagine you work as an accountant at a bank. If you accidentally credit an extra $500 to a customer's account and send out their bank statement (shared public history), you CANNOT take an eraser to the bank's public ledger and rip pages out of the book! That is accounting fraud! Instead, you write a brand-new correcting transaction: 'Adjustment: -$500 to correct error' (`git revert`). Everyone sees what happened, no history is erased, and the balance is restored perfectly!",
      bullets: [
        "`git restore <file>`: Discards uncommitted working changes.",
        "`git restore --staged <file>`: Un-stages changes without losing your edits.",
        "`git revert <commit>`: Safe, public undo. Creates an inverse commit without rewriting history."
      ]
    },
    {
      title: "2. The Recovery Decision Matrix",
      explanation: "Choose the exact right undo command for your situation:",
      table: {
        headers: ["What You Want to Undo", "Has it Been Pushed to GitHub?", "Command to Use", "Risk Level"],
        rows: [
          ["Unstaged edits in working tree", "No (uncommitted)", "`git restore <file>`", "Medium (permanently discards unstaged changes!)"],
          ["File accidentally staged", "No (in index)", "`git restore --staged <file>`", "Safe (keeps changes in working directory)"],
          ["Last commit (local only)", "NO (strictly local)", "`git reset --soft HEAD~1`", "Safe (un-commits, keeps changes staged)"],
          ["A commit ALREADY pushed to GitHub", "YES (shared with team)", "`git revert <commit-hash>`", "100% Safe (preserves shared history)"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: The Danger of `git reset --hard`",
      explanation: "`git reset --hard` moves your branch pointer backward AND wipes out all unstaged and staged changes in your working tree:",
      bullets: [
        "Irreversible Loss: Uncommitted changes in your working tree that were never staged or committed are GONE FOREVER. Git cannot recover uncommitted text!",
        "Rule of Thumb: Always run `git status` and `git diff` before any reset command."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these catastrophic recovery mistakes:",
      bullets: [
        "Running `reset --hard` on Shared Branches: Rewriting history on `main` causes massive merge conflicts and breaks teammates' repositories.",
        "Using old deprecated `git checkout -- file.txt`: Modern Git uses `git restore file.txt`, which is unambiguous and safer.",
        "Panic-deleting Files: Don't delete your repository folder if something goes wrong. Git has tools (like `git restore` and `git reflog`) to recover almost anything."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Make an edit to a file and discard it using `git restore`. Make another edit, stage it with `git add`, and unstage it using `git restore --staged`. Make a commit, and then create a safe inverse rollback using `git revert HEAD`."
    }
  ],
  questions: [
    {
      id: "q-git-134-1",
      prompt: "How do you discard uncommitted modifications in a working tree file and restore it to the latest commit?",
      options: [
        { id: "a", label: "`git restore <filename>`" },
        { id: "b", label: "`git delete <filename>`" },
        { id: "c", label: "`git clean --all`" },
        { id: "d", label: "`git undo <filename>`" }
      ],
      correctAnswer: "a",
      explanation: "`git restore <file>` discards unstaged modifications in your working directory, reverting the file back to its state in the staging index or latest commit."
    },
    {
      id: "q-git-134-2",
      prompt: "How do you un-stage a file that you accidentally staged with `git add`, keeping your edits safe in your working directory?",
      options: [
        { id: "a", label: "`git restore --staged <filename>`" },
        { id: "b", label: "`git rm -f <filename>`" },
        { id: "c", label: "`git delete --index`" },
        { id: "d", label: "`git unstage <filename>`" }
      ],
      correctAnswer: "a",
      explanation: "`git restore --staged <file>` removes the file from the staging area without destroying your working directory edits."
    },
    {
      id: "q-git-134-3",
      prompt: "Why is `git revert <commit-hash>` the safest way to undo a commit that has ALREADY been pushed to a shared remote repository (like GitHub)?",
      options: [
        { id: "a", label: "Because it does NOT rewrite shared history; it creates a brand-new commit that applies the exact inverse changes, preserving linear history for all teammates" },
        { id: "b", label: "Because it deletes the GitHub repository" },
        { id: "c", label: "Because it runs faster than other commands" },
        { id: "d", label: "Because it doesn't require Git" }
      ],
      correctAnswer: "a",
      explanation: "`git revert` records a new forward-moving commit that reverses a previous change, avoiding history rewriting and synchronization conflicts."
    },
    {
      id: "q-git-134-4",
      prompt: "What is the extreme danger of running `git reset --hard`?",
      options: [
        { id: "a", label: "It forcefully discards all unstaged and staged changes in your working tree; any work not committed is permanently lost and unrecoverable" },
        { id: "b", label: "It turns off the computer" },
        { id: "c", label: "It deletes the `.git` folder" },
        { id: "d", label: "It corrupts the hard drive hardware" }
      ],
      correctAnswer: "a",
      explanation: "`git reset --hard` overwrites the working tree and staging index. Uncommitted changes that were never recorded in Git's database cannot be recovered."
    },
    {
      id: "q-git-134-5",
      prompt: "What does `git reset --soft HEAD~1` do to your repository?",
      options: [
        { id: "a", label: "It undoes the most recent commit, but leaves all of its changes staged in the index ready to be recommitted" },
        { id: "b", label: "It deletes the last commit and all files" },
        { id: "c", label: "It creates a backup branch" },
        { id: "d", label: "It pushes to the remote server" }
      ],
      correctAnswer: "a",
      explanation: "`--soft` moves the branch pointer back one commit without touching the index or working tree, ideal for re-doing a commit message or staging."
    },
    {
      id: "q-git-134-6",
      prompt: "What does `git reset --mixed HEAD~1` (the default mode of `git reset`) do?",
      options: [
        { id: "a", label: "It undoes the last commit and un-stages the changes, leaving the modifications intact in your working directory" },
        { id: "b", label: "It permanently deletes all files" },
        { id: "c", label: "It creates a merge commit" },
        { id: "d", label: "It resets the terminal font" }
      ],
      correctAnswer: "a",
      explanation: "The default `--mixed` mode moves the branch pointer and clears the staging index, but preserves your working directory modifications."
    },
    {
      id: "q-git-134-7",
      prompt: "Can Git recover uncommitted changes that you discarded using `git restore`?",
      options: [
        { id: "a", label: "No; because the changes were never committed or saved to Git's database, they are permanently erased from the disk" },
        { id: "b", label: "Yes, Git saves them in the cloud" },
        { id: "c", label: "Yes, via `git log`" },
        { id: "d", label: "Only on Sundays" }
      ],
      correctAnswer: "a",
      explanation: "Git can only recover what has been committed (or at least staged). Working directory changes discarded before saving cannot be restored."
    },
    {
      id: "q-git-134-8",
      prompt: "What command shows the history of the `HEAD` reference movements on your local machine, allowing you to recover 'lost' commits?",
      options: [
        { id: "a", label: "`git reflog`" },
        { id: "b", label: "`git rescue`" },
        { id: "c", label: "`git recover`" },
        { id: "d", label: "`git find`" }
      ],
      correctAnswer: "a",
      explanation: "`git reflog` maintains a local chronological log of every time HEAD moved, allowing you to locate and restore commits lost after resets or rebases."
    },
    {
      id: "q-git-134-9",
      prompt: "Why did Git introduce `git restore` and `git switch` in Git 2.23+?",
      options: [
        { id: "a", label: "To separate the confusing, overloaded responsibilities of the legacy `git checkout` command into dedicated, safer commands" },
        { id: "b", label: "Because `git checkout` was deleted" },
        { id: "c", label: "To make Git run without a keyboard" },
        { id: "d", label: "Because GitHub required it" }
      ],
      correctAnswer: "a",
      explanation: "Legacy `git checkout` handled both branch switching and file restoration, leading to accidental file overwrites. The modern commands separate these tasks cleanly."
    },
    {
      id: "q-git-134-10",
      prompt: "What should you do before executing any potentially destructive Git command?",
      options: [
        { id: "a", label: "Run `git status` and `git diff` to understand exactly what uncommitted work exists" },
        { id: "b", label: "Delete the terminal" },
        { id: "c", label: "Restart the computer" },
        { id: "d", label: "Force-push to GitHub" }
      ],
      correctAnswer: "a",
      explanation: "Checking `git status` and diffs ensures you know whether you have uncommitted or staged work that might be affected by destructive commands."
    }
  ]
};

// MODULE 2 QUIZ
const gitModule02Quiz: CurriculumItem = {
  id: "item-git-mod02-quiz",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-02-everyday-workflow",
  moduleTitle: "Module 2: Everyday Workflow",
  modulePosition: 2,
  title: "Module 2 Assessment: Everyday Workflow MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 2 Quiz: Everyday Workflow & Safe Recovery",
  contentDescription: "Evaluate your comprehensive mastery of everyday Git workflows: git init, git clone, git status, git log formatting, atomic commits, imperative messages, .gitignore rules, untracking files with git rm --cached, git restore, and git revert.",
  questions: [
    ...(lesson131.questions || []).slice(0, 3),
    ...(lesson132.questions || []).slice(0, 3),
    ...(lesson133.questions || []).slice(0, 2),
    ...(lesson134.questions || []).slice(0, 2)
  ]
};

// MODULE 2 ASSESSMENT (LAB)
const gitModule02Assessment: CurriculumItem = {
  id: "item-git-mod02-lab",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-02-everyday-workflow",
  moduleTitle: "Module 2: Everyday Workflow",
  modulePosition: 2,
  title: "Module 2 Lab: Ignore Secrets & Execute Safe Rollbacks",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 2 Lab Project: Ignore Secrets & Execute Safe Rollbacks",
  contentDescription: "Build a safe everyday workflow: configure robust .gitignore rules for credentials and build artifacts, practice atomic staging, and execute safe rollbacks using git restore and git revert.",
  assignmentPrompt: {
    instructions: "Demonstrate safe everyday Git workflow hygiene:\n1. Create `.gitignore` to ignore `.env`, `node_modules/`, and `dist/`.\n2. Create an initial commit with `index.html` and `.gitignore`.\n3. Make an intentional mistake in `index.html` and discard it with `git restore index.html`.\n4. Stage a valid change, un-stage it with `git restore --staged index.html`, and verify status.\n5. Commit a change with a professional imperative commit message.\n6. Execute `git revert HEAD` to safely undo the commit and verify with `git log --oneline`.",
    deliverables: [
      "Terminal transcript showing restore, unstage, and revert transitions",
      "Git log showing the revert commit cleanly recorded in project history",
      "Correctly configured .gitignore preventing secret leakage"
    ]
  }
};

export const gitModule02: CurriculumSubModule = {
  id: "module-git-02-everyday-workflow",
  subCourseId: "mod-git-basics",
  title: "Module 2 — Everyday Workflow",
  description: "Execute day-to-day Git operations: initializing repositories, inspecting working tree status, crafting atomic commits, ignoring build files, and safely undoing uncommitted and committed changes.",
  position: 2,
  items: [
    lesson131,
    lesson132,
    lesson133,
    lesson134,
    gitModule02Quiz,
    gitModule02Assessment
  ]
};
