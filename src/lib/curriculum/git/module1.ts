import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 1: VERSION CONTROL FOUNDATIONS
// Lessons 128 - 130 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 128: WHAT VERSION CONTROL SOLVES
const lesson128: CurriculumItem = {
  id: "item-git-128-what-version-control-solves",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-01-foundations",
  moduleTitle: "Module 1: Version Control Foundations",
  modulePosition: 1,
  title: "128. What Version Control Solves",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 128: What Version Control Solves",
  contentDescription: "Understand the fundamental problems of code management without version control, distributed vs centralized architectures, snapshot-based history graphs, and the distinction between Git and GitHub.",
  codeSnippet: {
    language: "bash",
    code: `# Git records snapshots of an entire project over time:
# Working Tree  -->  Staging Area (Index)  -->  Commit History (Repository)
#
# Each commit is an immutable cryptographic snapshot identified by a SHA-1/SHA-256 hash.
# Multiple branches form a directed acyclic graph (DAG) of project history.

# Verify your local Git installation
git --version`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Never-Ending Folder of Final Versions",
      explanation: "Imagine you are writing a college thesis without version control. On Monday, you save your document as `thesis.docx`. On Tuesday, you make edits and save it as `thesis_final.docx`. On Wednesday, your professor gives feedback, so you save `thesis_final_v2_REALLY_FINAL.docx`. By Friday, you have 25 different files with names like `thesis_final_FINAL_USE_THIS_ONE_OCT18.docx`! If a paragraph gets accidentally deleted, you have no idea which file had it, what was changed, or who changed it. A Version Control System (VCS) like Git replaces this nightmare: you keep only ONE clean project folder, and Git acts as a magical time machine, recording exact photographic snapshots of your entire project at every milestone!",
      bullets: [
        "Time Travel: Instantly view or roll back to any historical snapshot of your project.",
        "Accountability: Every line of code has an author, timestamp, and explanation message.",
        "Fearless Experimentation: Create branches to test ideas without breaking working code."
      ]
    },
    {
      title: "2. Git vs GitHub: The Essential Distinction",
      explanation: "Beginners often confuse Git and GitHub. They are completely different tools:",
      table: {
        headers: ["Feature / Aspect", "Git", "GitHub"],
        rows: [
          ["What is it?", "A command-line tool / distributed version control engine", "A cloud-based web hosting platform for Git repositories"],
          ["Creator", "Linus Torvalds (2005)", "Chris Wanstrath, PJ Hyett, Tom Preston-Werner (2008, acquired by Microsoft)"],
          ["Where it runs", "Locally on your computer", "Remotely on cloud servers via browser or API"],
          ["Internet Required?", "NO — 100% functional offline", "YES — required for remote collaboration, pull requests, and CI/CD"],
          ["Alternatives", "Mercurial, Subversion (SVN)", "GitLab, Bitbucket, Azure DevOps"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Centralized vs Distributed VCS",
      explanation: "Older systems like Subversion (SVN) were Centralized: a single central server held the repository history. If the central server went down or you lost Wi-Fi, you couldn't commit, view logs, or branch. Git is Distributed (DVCS): every single developer who clones a repository gets a 100% complete, independent copy of the ENTIRE project history locally on their hard drive!",
      bullets: [
        "Offline Power: Commit, branch, diff, and inspect logs on an airplane with zero internet.",
        "Full Redundancy: If the GitHub remote server was struck by lightning, any developer's local clone could restore the entire repository history with zero data loss."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these foundational misconceptions:",
      bullets: [
        "Thinking Git is Just Cloud Backup: Git is a directed graph of revisions, not Dropbox or Google Drive. Simply copying files doesn't track diffs or branches.",
        "Believing Local Commits are Auto-Saved to GitHub: Commits stay strictly on your local computer until you explicitly run `git push`.",
        "Committing Large Binary Files: Storing 5GB video files in Git bloats the repository history for every developer. Use Git LFS for large media."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Open your terminal and run `git --version`. Write a brief technical memo explaining the architectural difference between a Centralized Version Control System (like SVN) and a Distributed Version Control System (like Git), noting why Git survives network outages."
    }
  ],
  questions: [
    {
      id: "q-git-128-1",
      prompt: "What is Git?",
      options: [
        { id: "a", label: "A distributed version control system designed to record file history, manage revisions, and enable team collaboration" },
        { id: "b", label: "A cloud-based website owned by Microsoft" },
        { id: "c", label: "A programming language like Python or Java" },
        { id: "d", label: "A database management system" }
      ],
      correctAnswer: "a",
      explanation: "Git is a distributed version control engine created by Linus Torvalds that tracks changes in source code files over time."
    },
    {
      id: "q-git-128-2",
      prompt: "What is the primary difference between Git and GitHub?",
      options: [
        { id: "a", label: "Git is the local command-line version control tool; GitHub is a cloud hosting service for Git repositories" },
        { id: "b", label: "Git is for Windows; GitHub is for Mac" },
        { id: "c", label: "Git requires internet; GitHub runs offline" },
        { id: "d", label: "They are two names for the exact same software" }
      ],
      correctAnswer: "a",
      explanation: "Git is the version control software running locally; GitHub is a web-based hosting platform providing remote collaboration, issue tracking, and PRs."
    },
    {
      id: "q-git-128-3",
      prompt: "What is the defining characteristic of a 'Distributed' Version Control System (DVCS) like Git?",
      options: [
        { id: "a", label: "Every developer's clone contains a full copy of the entire project repository history on their local machine" },
        { id: "b", label: "History is only stored on a single central server" },
        { id: "c", label: "It cannot work without an active internet connection" },
        { id: "d", label: "It only allows one person to edit code at a time" }
      ],
      correctAnswer: "a",
      explanation: "In a DVCS, every local clone is a full repository mirror, enabling complete offline functionality and total redundancy."
    },
    {
      id: "q-git-128-4",
      prompt: "How does Git model project history internally?",
      options: [
        { id: "a", label: "As a stream of cryptographic snapshots forming a directed acyclic graph (DAG)" },
        { id: "b", label: "As a table in Microsoft Excel" },
        { id: "c", label: "As a flat text file that gets overwritten" },
        { id: "d", label: "As a ZIP archive on Google Drive" }
      ],
      correctAnswer: "a",
      explanation: "Git models history as a series of complete project snapshots pointing to parent commits in a directed acyclic graph (DAG)."
    },
    {
      id: "q-git-128-5",
      prompt: "Can you commit changes and create branches in Git while working offline without an internet connection?",
      options: [
        { id: "a", label: "Yes, Git is completely distributed and operates locally without needing a network connection" },
        { id: "b", label: "No, Git requires constant Wi-Fi connection to function" },
        { id: "c", label: "Only if you have an active GitHub subscription" },
        { id: "d", label: "Only on Linux computers" }
      ],
      correctAnswer: "a",
      explanation: "Because repository history lives locally, almost all Git operations (`commit`, `branch`, `diff`, `log`) execute entirely offline."
    },
    {
      id: "q-git-128-6",
      prompt: "Why is Git superior to keeping manual backup folders like `project_v1`, `project_final`, `project_final_v2`?",
      options: [
        { id: "a", label: "Git tracks exact diffs, commit authors, timestamps, branches, and merges systematically without cluttering your filesystem with duplicate folders" },
        { id: "b", label: "Git compresses files into MP3 format" },
        { id: "c", label: "Manual folders are illegal under software engineering standards" },
        { id: "d", label: "Git automatically writes all code for you" }
      ],
      correctAnswer: "a",
      explanation: "Git replaces manual file duplication with an immutable cryptographic audit log, providing instant rollback and branch management."
    },
    {
      id: "q-git-128-7",
      prompt: "Who originally created Git in 2005?",
      options: [
        { id: "a", label: "Linus Torvalds (the creator of the Linux kernel)" },
        { id: "b", label: "Bill Gates" },
        { id: "c", label: "Mark Zuckerberg" },
        { id: "d", label: "Steve Jobs" }
      ],
      correctAnswer: "a",
      explanation: "Linus Torvalds created Git in 2005 to manage the massively distributed development of the Linux kernel."
    },
    {
      id: "q-git-128-8",
      prompt: "If you commit code locally on your laptop, does GitHub automatically receive the new commit immediately?",
      options: [
        { id: "a", label: "No; commits remain strictly local until you explicitly push them to the remote repository using `git push`" },
        { id: "b", label: "Yes, Git auto-syncs over Bluetooth" },
        { id: "c", label: "Yes, if the laptop has internet" },
        { id: "d", label: "Only if the file is named index.html" }
      ],
      correctAnswer: "a",
      explanation: "Commits are created locally in your `.git` database. You must run `git push` to transfer those commits to a remote server like GitHub."
    },
    {
      id: "q-git-128-9",
      prompt: "What is an alternative remote hosting service to GitHub?",
      options: [
        { id: "a", label: "GitLab, Bitbucket, and Azure DevOps" },
        { id: "b", label: "Photoshop" },
        { id: "c", label: "Spotify" },
        { id: "d", label: "VLC Media Player" }
      ],
      correctAnswer: "a",
      explanation: "GitLab, Bitbucket, and Azure DevOps are all prominent cloud Git hosting platforms offering collaboration, PRs, and CI/CD."
    },
    {
      id: "q-git-128-10",
      prompt: "What happens if a developer's computer crashes, but they pushed their commits to GitHub earlier that day?",
      options: [
        { id: "a", label: "Their code history is completely safe on the remote repository and can be cloned onto any new computer" },
        { id: "b", label: "GitHub deletes their account" },
        { id: "c", label: "All commits are lost forever" },
        { id: "d", label: "The repository locks itself" }
      ],
      correctAnswer: "a",
      explanation: "Remote repositories act as off-site backups. Cloning the repository restores the complete project state and history onto a new machine."
    }
  ]
};

// LESSON 129: INSTALL AND CONFIGURE GIT
const lesson129: CurriculumItem = {
  id: "item-git-129-install-configure-git",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-01-foundations",
  moduleTitle: "Module 1: Version Control Foundations",
  modulePosition: 1,
  title: "129. Install and Configure Git",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 129: Install and Configure Git",
  contentDescription: "Master installing Git, setting up global developer identity (user.name and user.email), configuring the default initial branch (init.defaultBranch main), configuring text editors, and inspecting config levels.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Configure Global Committer Identity (Mandatory before first commit!)
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"

# 2. Configure Modern Default Initial Branch Name to "main" (instead of legacy "master")
git config --global init.defaultBranch main

# 3. Configure Line-Ending Handling (CRLF on Windows vs LF on Mac/Linux)
# On Windows:
git config --global core.autocrlf true
# On macOS / Linux:
# git config --global core.autocrlf input

# 4. View and Verify All Configured Settings Across All Levels
git config --list --show-origin`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Getting Your Official Passport Stamp",
      explanation: "Imagine you are an explorer traveling the world. Before entering any foreign country, border control looks at your official passport: it has your Name and your Photo ID. Every time you cross a border, they stamp your passport with your name and the date. In Git, configuring `user.name` and `user.email` is getting your official committer passport! These are NOT your login passwords for GitHub; they are the metadata labels stamped permanently onto every single snapshot you create. If you don't configure your passport, Git won't let you stamp any commits!",
      bullets: [
        "Commit Metadata: `user.name` and `user.email` identify the author in `git log` and GitHub contribution graphs.",
        "Not Authentication: Commit email is metadata, not your GitHub login password or SSH private key.",
        "3 Configuration Levels: System, Global (user account), and Local (repository specific)."
      ]
    },
    {
      title: "2. The 3 Configuration Scopes in Git",
      explanation: "Where Git stores your settings and how they override each other:",
      table: {
        headers: ["Scope Flag", "File Location", "Applies To"],
        rows: [
          ["`--system`", "`/etc/gitconfig` (System-wide)", "All users on the operating system computer"],
          ["`--global` (Most Common)", "`~/.gitconfig` (User home directory)", "All repositories created by your user account"],
          ["`--local` (Default if inside repo)", "`.git/config` (Inside current repo)", "Only the specific active repository (overrides global)"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Line Endings (CRLF vs LF)",
      explanation: "Windows and Unix (macOS/Linux) format line breaks differently: Windows uses Carriage Return + Line Feed (`\\r\\n`), while macOS/Linux uses Line Feed (`\\n`). If teammates use different operating systems, Git can detect every line in a file as 'changed' just because of invisible line breaks!",
      bullets: [
        "Windows setting: `git config --global core.autocrlf true` (converts CRLF to LF on commit, and LF to CRLF on checkout).",
        "macOS/Linux setting: `git config --global core.autocrlf input` (converts CRLF to LF on commit)."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these initial setup mistakes:",
      bullets: [
        "Using a Fake Email: Using `test@test.com` means GitHub won't link your commits to your profile or award your green contribution squares.",
        "Legacy Default Branch: Forgetting to set `init.defaultBranch main` results in creating repositories with the outdated default branch name `master`.",
        "Putting Quotes in the Wrong Place: Typing `git config --global user.name John Doe` sets your name to 'John' and gives an error. Always quote strings with spaces: `\"John Doe\"`."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Open your terminal and run `git config --list --show-origin`. Inspect the file location of your global `.gitconfig`. Set your name, your primary GitHub email, and set the default initial branch to `main`. Confirm the new values by checking the output of `git config user.name`."
    }
  ],
  questions: [
    {
      id: "q-git-129-1",
      prompt: "What are the two mandatory configuration settings Git requires before you can make your first commit?",
      options: [
        { id: "a", label: "`user.name` and `user.email`" },
        { id: "b", label: "`user.password` and `user.ssn`" },
        { id: "c", label: "`user.creditcard` and `user.phone`" },
        { id: "d", label: "`browser.name` and `editor.font`" }
      ],
      correctAnswer: "a",
      explanation: "Git permanently records `user.name` and `user.email` in the commit metadata of every revision you create."
    },
    {
      id: "q-git-129-2",
      prompt: "What does the `--global` flag do when running `git config`?",
      options: [
        { id: "a", label: "It applies the configuration setting to all Git repositories for the current operating system user account" },
        { id: "b", label: "It publishes your settings publicly to the worldwide internet" },
        { id: "c", label: "It changes settings for every computer on your home Wi-Fi" },
        { id: "d", label: "It deletes local repository settings" }
      ],
      correctAnswer: "a",
      explanation: "The `--global` flag writes to `~/.gitconfig` in your user home directory, applying across all repositories you work on."
    },
    {
      id: "q-git-129-3",
      prompt: "Is the email configured in `git config user.email` used for authenticating your GitHub account password?",
      options: [
        { id: "a", label: "No; it is merely an author metadata label attached to commit snapshots; network authentication uses SSH keys or Personal Access Tokens (PAT)" },
        { id: "b", label: "Yes, it is your master password" },
        { id: "c", label: "Yes, Git logs into GitHub with that email" },
        { id: "d", label: "Email is not supported in Git" }
      ],
      correctAnswer: "a",
      explanation: "Commit author identity is distinct from network authentication. An author label identifies who wrote the code, while SSH/PATs authenticate network pushes."
    },
    {
      id: "q-git-129-4",
      prompt: "What command sets the default initial branch name to 'main' for all future repositories created with `git init`?",
      options: [
        { id: "a", label: "`git config --global init.defaultBranch main`" },
        { id: "b", label: "`git set branch main`" },
        { id: "c", label: "`git branch -M main`" },
        { id: "d", label: "`git default branch = main`" }
      ],
      correctAnswer: "a",
      explanation: "`init.defaultBranch main` configures Git to automatically name the initial branch `main` rather than legacy `master`."
    },
    {
      id: "q-git-129-5",
      prompt: "If a repository has a local setting configured in `.git/config`, will it override the global setting in `~/.gitconfig`?",
      options: [
        { id: "a", label: "Yes, local repository settings have higher priority and override global settings" },
        { id: "b", label: "No, global settings always win" },
        { id: "c", label: "Git throws an error if settings conflict" },
        { id: "d", label: "Only on Linux" }
      ],
      correctAnswer: "a",
      explanation: "Git config follows a hierarchy: `--local` overrides `--global`, which in turn overrides `--system`."
    },
    {
      id: "q-git-129-6",
      prompt: "What command displays all current Git configuration values along with the exact file path where each setting is defined?",
      options: [
        { id: "a", label: "`git config --list --show-origin`" },
        { id: "b", label: "`git show all`" },
        { id: "c", label: "`git status`" },
        { id: "d", label: "`git log`" }
      ],
      correctAnswer: "a",
      explanation: "`--list --show-origin` lists all active configuration keys and displays which configuration file (`.gitconfig`, `.git/config`) defined them."
    },
    {
      id: "q-git-129-7",
      prompt: "Why should Windows developers configure `git config --global core.autocrlf true`?",
      options: [
        { id: "a", label: "To automatically normalize Windows CRLF line endings to Unix LF on commit, preventing false diff conflicts across operating systems" },
        { id: "b", label: "To increase typing speed" },
        { id: "c", label: "To make Windows run Linux software" },
        { id: "d", label: "Because Windows crashes without it" }
      ],
      correctAnswer: "a",
      explanation: "Windows uses CRLF while Mac/Linux uses LF. `core.autocrlf` ensures consistent LF line endings in repository storage."
    },
    {
      id: "q-git-129-8",
      prompt: "How can you set Visual Studio Code as your default Git commit editor?",
      options: [
        { id: "a", label: "`git config --global core.editor 'code --wait'`" },
        { id: "b", label: "`git set editor vscode`" },
        { id: "c", label: "`git open vscode`" },
        { id: "d", label: "By dragging the Git icon into VS Code" }
      ],
      correctAnswer: "a",
      explanation: "`core.editor 'code --wait'` tells Git to launch VS Code and wait until the commit message file is closed before finalizing the commit."
    },
    {
      id: "q-git-129-9",
      prompt: "What happens if you try to commit without setting `user.name` or `user.email` on a fresh Git install?",
      options: [
        { id: "a", label: "Git halts and refuses to commit, displaying an error instructing you to run `git config`" },
        { id: "b", label: "The repository deletes itself" },
        { id: "c", label: "Git invents a random name" },
        { id: "d", label: "The computer reboots" }
      ],
      correctAnswer: "a",
      explanation: "Git strictly enforces committer identification and will prompt you to set your name and email before proceeding."
    },
    {
      id: "q-git-129-10",
      prompt: "Where is the global `.gitconfig` file located on your computer?",
      options: [
        { id: "a", label: "In the user's home directory (`~/.gitconfig` or `C:\\Users\\Username\\.gitconfig`)" },
        { id: "b", label: "Inside the Windows System32 folder" },
        { id: "c", label: "On the GitHub website" },
        { id: "d", label: "In the desktop recycle bin" }
      ],
      correctAnswer: "a",
      explanation: "The user-level global configuration file is stored in your operating system home directory as `.gitconfig`."
    }
  ]
};

// LESSON 130: REPOSITORIES AND THE THREE AREAS
const lesson130: CurriculumItem = {
  id: "item-git-130-repositories-three-areas",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-01-foundations",
  moduleTitle: "Module 1: Version Control Foundations",
  modulePosition: 1,
  title: "130. Repositories and the Three Areas",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 130: Repositories and the Three Areas",
  contentDescription: "Master the fundamental architecture of Git: Working Tree, Staging Area (Index), and Repository (Commit History), file lifecycle states (untracked, modified, staged, committed), and reading git status.",
  codeSnippet: {
    language: "bash",
    code: `# The Three Primary Areas of Git:
#
# 1. WORKING DIRECTORY: The physical sandbox where you edit files
#    (e.g., index.html, styles.css)
#
# 2. STAGING AREA (INDEX): The drafting table where you prepare the next commit snapshot
#    (git add index.html)
#
# 3. REPOSITORY (.git/): The permanent database containing commit history snapshots
#    (git commit -m "Add header layout")

# Inspect the status of files across all three areas
git status`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Photo Shoot and the Frame",
      explanation: "Imagine you are a professional photographer. 1) The 'Working Directory' is your studio floor: there are costumes, props, lights, and models running around everywhere in various stages of messiness. 2) The 'Staging Area' (Index) is the camera frame: you don't take a photo of the whole messy floor! You invite only the model in the finished costume to step inside the white backdrop frame (`git add`). You can adjust their pose and inspect the frame (`git status`). 3) The 'Repository' is when you press the shutter button (`git commit`): SNAP! The photograph is permanently recorded in your photo album. Even if the model changes clothes on the studio floor, the photo in your album never changes!",
      bullets: [
        "Working Tree: Your live files currently visible in your code editor.",
        "Staging Area (Index): An in-memory staging table that previews the NEXT commit snapshot.",
        "Git Repository: The `.git/` folder containing permanent, immutable commit objects."
      ]
    },
    {
      title: "2. The 4 Lifecycle States of a File in Git",
      explanation: "Every file in your project directory belongs to one of 4 states:",
      table: {
        headers: ["File State", "Meaning", "Git Status Color / Symbol"],
        rows: [
          ["Untracked", "New file created on disk that Git has never recorded before", "Red (under 'Untracked files:')"],
          ["Modified", "Tracked file that has changes in working tree not yet staged", "Red (under 'Changes not staged for commit:')"],
          ["Staged", "Modified or new file added to the staging index ready for commit", "Green (under 'Changes to be committed:')"],
          ["Unmodified / Committed", "File matches the latest commit snapshot in the repository", "Clean working tree (nothing to commit)"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Why Does the Staging Area Exist?",
      explanation: "Why doesn't Git just commit all modified files automatically like saving a file in Word? The Staging Area allows for CRAFTSMANSHIP. Suppose you worked for 3 hours and touched 6 files: 2 files fix a critical login bug, and 4 files start a new dashboard feature. With the Staging Area, you can stage ONLY the 2 bugfix files (`git add auth.js login.js`), commit them with a focused message (`'Fix login null error'`), and then stage the remaining 4 files in a separate commit! Commits remain atomic, focused, and reviewable.",
      bullets: [
        "Atomic Commits: Small, coherent changes that do one job well.",
        "Intentional Selection: Review the staged diff before snapshotting to prevent accidental secret commits."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these common workflow mistakes:",
      bullets: [
        "Deleting the hidden `.git/` folder: The `.git/` folder IS your repository! Deleting it wipes your entire commit history, all branches, and configuration.",
        "Blindly Running `git add .` Without Checking Status: Stages temporary files, `.env` files with secret passwords, and generated artifacts accidentally.",
        "Forgetting to Stage Before Committing: Editing a file and running `git commit` without `git add` results in `'no changes added to commit'`."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a new directory. Initialize Git with `git init`. Create two files: `fileA.txt` and `fileB.txt`. Run `git status`. Stage ONLY `fileA.txt` using `git add fileA.txt`. Run `git status` again to observe `fileA.txt` in green (staged) and `fileB.txt` in red (untracked). Commit the staged file."
    }
  ],
  questions: [
    {
      id: "q-git-130-1",
      prompt: "What are the 'Three Areas' of a local Git project?",
      options: [
        { id: "a", label: "The Working Directory, the Staging Area (Index), and the Git Repository" },
        { id: "b", label: "Frontend, Backend, and Database" },
        { id: "c", label: "HTML, CSS, and JavaScript" },
        { id: "d", label: "Chrome, Safari, and Firefox" }
      ],
      correctAnswer: "a",
      explanation: "Git divides your project into the Working Directory (live files), Staging Area (prepared snapshot), and the Repository (committed history)."
    },
    {
      id: "q-git-130-2",
      prompt: "What is the primary role of the Staging Area (Index) in Git?",
      options: [
        { id: "a", label: "To allow developers to selectively prepare, organize, and review the exact snapshot of files that will be included in the next commit" },
        { id: "b", label: "To host the website on the internet" },
        { id: "c", label: "To compile TypeScript code" },
        { id: "d", label: "To delete untracked files" }
      ],
      correctAnswer: "a",
      explanation: "The Staging Area acts as a drafting table, letting you assemble focused, atomic commits rather than committing everything blindly."
    },
    {
      id: "q-git-130-3",
      prompt: "What does the command `git status` show you?",
      options: [
        { id: "a", label: "Which files are untracked, which have unstaged modifications, and which are staged ready for commit" },
        { id: "b", label: "The status of your internet connection" },
        { id: "c", label: "The battery percentage of your laptop" },
        { id: "d", label: "How many users are logged in" }
      ],
      correctAnswer: "a",
      explanation: "`git status` provides a comprehensive overview of file states across the Working Tree and Staging Area relative to the current HEAD commit."
    },
    {
      id: "q-git-130-4",
      prompt: "What is an 'untracked' file in Git?",
      options: [
        { id: "a", label: "A new file in your working directory that has never been committed or added to the staging index before" },
        { id: "b", label: "A file that has been deleted" },
        { id: "c", label: "A file that is locked with a password" },
        { id: "d", label: "A file located outside your computer" }
      ],
      correctAnswer: "a",
      explanation: "An untracked file exists on disk, but Git does not monitor its revisions until you explicitly run `git add` on it."
    },
    {
      id: "q-git-130-5",
      prompt: "Where does Git store all of its repository data, commit objects, branches, and configuration files?",
      options: [
        { id: "a", label: "Inside the hidden `.git/` folder located at the root of your project directory" },
        { id: "b", label: "In the Windows Registry" },
        { id: "c", label: "On the desktop" },
        { id: "d", label: "In the browser's cookies" }
      ],
      correctAnswer: "a",
      explanation: "The hidden `.git/` directory contains the complete Git object database, ref pointers, index staging file, and repository config."
    },
    {
      id: "q-git-130-6",
      prompt: "What happens if you accidentally delete the hidden `.git/` folder from your project?",
      options: [
        { id: "a", label: "The project ceases to be a Git repository; all local commit history, branches, and version tracking are completely destroyed" },
        { id: "b", label: "Nothing happens; Git recreates it automatically" },
        { id: "c", label: "The project runs faster" },
        { id: "d", label: "The operating system shuts down" }
      ],
      correctAnswer: "a",
      explanation: "The `.git/` folder IS the repository. Deleting it destroys all version history, leaving only the unversioned working files."
    },
    {
      id: "q-git-130-7",
      prompt: "What does it mean when a file is in the 'Staged' state (green in `git status`)?",
      options: [
        { id: "a", label: "Its current changes have been added to the staging index and will be permanently recorded in the next `git commit`" },
        { id: "b", label: "The file has been uploaded to the server" },
        { id: "c", label: "The file is locked and cannot be edited" },
        { id: "d", label: "The file is approved by the project manager" }
      ],
      correctAnswer: "a",
      explanation: "Staged files represent the exact proposed snapshot prepared to be written into repository history upon calling `git commit`."
    },
    {
      id: "q-git-130-8",
      prompt: "If you modify a tracked file, stage it with `git add`, and then edit it again before committing, what will `git status` show?",
      options: [
        { id: "a", label: "The file will appear twice: once under staged changes (green) with the first edit, and once under unstaged changes (red) with the second edit" },
        { id: "b", label: "Git throws an error and deletes the file" },
        { id: "c", label: "The second edit is automatically staged" },
        { id: "d", label: "The file becomes untracked" }
      ],
      correctAnswer: "a",
      explanation: "Git stages snapshots of files, not files themselves. Subsequent edits remain in the working tree until staged with another `git add`."
    },
    {
      id: "q-git-130-9",
      prompt: "What command moves changes from the Working Directory into the Staging Area?",
      options: [
        { id: "a", label: "`git add <filename>`" },
        { id: "b", label: "`git stage <filename>`" },
        { id: "c", label: "`git move <filename>`" },
        { id: "d", label: "`git push <filename>`" }
      ],
      correctAnswer: "a",
      explanation: "`git add` copies file contents into the Git object store and updates the index staging file."
    },
    {
      id: "q-git-130-10",
      prompt: "What is an 'atomic commit' in professional software development?",
      options: [
        { id: "a", label: "A small, focused commit that addresses a single logical task or bugfix, making it easy to review, revert, or cherry-pick" },
        { id: "b", label: "A commit containing 5,000 files from 3 months of work" },
        { id: "c", label: "A commit that deletes the entire database" },
        { id: "d", label: "A commit created by an AI agent" }
      ],
      correctAnswer: "a",
      explanation: "Atomic commits encapsulate one coherent change. If a bug is found later, an atomic commit can be safely reverted without breaking unrelated features."
    }
  ]
};

// MODULE 1 QUIZ
const gitModule01Quiz: CurriculumItem = {
  id: "item-git-mod01-quiz",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-01-foundations",
  moduleTitle: "Module 1: Version Control Foundations",
  modulePosition: 1,
  title: "Module 1 Assessment: Version Control Foundations MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 4,
  isModuleQuiz: true,
  contentHeading: "Module 1 Quiz: Version Control Architecture & The Three Areas",
  contentDescription: "Evaluate your comprehensive mastery of Git version control foundations: DVCS architecture, Git vs GitHub, global configuration, line endings, the Three Areas (Working Tree, Staging Area, Repository), and file lifecycle states.",
  questions: [
    ...(lesson128.questions || []).slice(0, 3),
    ...(lesson129.questions || []).slice(0, 3),
    ...(lesson130.questions || []).slice(0, 4)
  ]
};

// MODULE 1 ASSESSMENT (LAB)
const gitModule01Assessment: CurriculumItem = {
  id: "item-git-mod01-lab",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-01-foundations",
  moduleTitle: "Module 1: Version Control Foundations",
  modulePosition: 1,
  title: "Module 1 Lab: Initialize, Configure & Stage Across the Three Areas",
  duration: "45 mins",
  type: "assignment",
  position: 5,
  isModuleAssessment: true,
  contentHeading: "Module 1 Lab Project: Initialize, Configure & Stage Across the Three Areas",
  contentDescription: "Initialize a fresh local repository from scratch, configure global and local identity, create multi-file changes, and stage selective atomic commits across the Three Areas.",
  assignmentPrompt: {
    instructions: "Perform a hands-on local repository setup:\n1. Verify and configure your global Git identity: `user.name` and `user.email`.\n2. Set your default initial branch to `main`.\n3. Create a project directory `git-lab-foundations` and run `git init`.\n4. Create `index.html` and `styles.css`.\n5. Run `git status` and explain why both are untracked.\n6. Stage ONLY `index.html` and commit with message 'Add initial HTML skeleton'.\n7. Verify with `git log` that the commit was recorded with your name and email.",
    deliverables: [
      "Terminal log transcript showing `git config` and `git status` transitions",
      "Repository containing atomic initial commit on `main` branch",
      "Brief explanation of why selective staging prevents messy commits"
    ]
  }
};

export const gitModule01: CurriculumSubModule = {
  id: "module-git-01-foundations",
  subCourseId: "mod-git-basics",
  title: "Module 1 — Version Control Foundations",
  description: "Understand distributed version control, configure Git user metadata, and master the Three Areas (Working Directory, Staging Index, and Git Repository).",
  position: 1,
  items: [
    lesson128,
    lesson129,
    lesson130,
    gitModule01Quiz,
    gitModule01Assessment
  ]
};
