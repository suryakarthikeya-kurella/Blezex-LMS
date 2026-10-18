import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 3: BRANCHES AND COLLABORATION
// Lessons 135 - 139 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 135: BRANCHES AND MERGING
const lesson135: CurriculumItem = {
  id: "item-git-135-branches-merging",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-03-branches-collaboration",
  moduleTitle: "Module 3: Branches and Collaboration",
  modulePosition: 3,
  title: "135. Branches and Merging",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 135: Branches and Merging",
  contentDescription: "Understand Git branches as lightweight movable pointers, branch creation and switching with git switch, fast-forward vs 3-way merges, and branch deletion hygiene.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Create and switch to a new feature branch in one command
git switch -c feature/course-search

# 2. Make edits, stage, and commit on the isolated branch
git add src/components/CourseSearch.jsx
git commit -m "Add course search input component"

# 3. Switch back to the target integration branch (main)
git switch main

# 4. Merge the completed feature branch into main
git merge feature/course-search

# 5. Delete the merged feature branch cleanly
git branch -d feature/course-search`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Alternate Parallel Universes",
      explanation: "Imagine you are building a house. The foundation and living room are complete. Now, you want to test whether an indoor swimming pool or a greenhouse would look better. In real life, digging a pool might destroy the living room foundation! But in Git, a 'Branch' is creating an alternate parallel universe! You step into Universe A (`git switch -c feature/swimming-pool`), dig the pool, test it, and see how it looks. The living room in the primary universe (`main`) remains 100% untouched and safe. If the pool looks fantastic, you perform a 'Merge' (`git merge`), seamlessly fusing Universe A into the primary universe!",
      bullets: [
        "Lightweight Pointers: A branch in Git is NOT a duplicate folder of files; it is merely a tiny 41-byte text pointer pointing to a commit hash.",
        "`git switch -c <name>`: Modern, clean command to create and switch to a new branch.",
        "Fast-Forward Merge: Moves the pointer forward when no diverging commits exist on main.",
        "3-Way Merge: Creates a dedicated merge commit when both main and feature have diverged."
      ]
    },
    {
      title: "2. Fast-Forward Merge vs 3-Way Merge",
      explanation: "How Git combines branches based on history divergence:",
      table: {
        headers: ["Merge Type", "When It Happens", "Result in Git History"],
        rows: [
          ["Fast-Forward (FF)", "Target branch (`main`) has NO new commits since the feature branch was created", "Git simply moves the `main` pointer forward to match `feature`; no new commit is created"],
          ["3-Way (Recursive/ORT)", "Both `main` AND `feature` have new independent commits since they diverged", "Git compares the common ancestor + both branch tips and creates a new 'Merge Commit' with two parent hashes"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Modern `git switch` vs Legacy `git checkout`",
      explanation: "Prior to Git 2.23, `git checkout` was used for everything: switching branches, creating branches, and discarding file changes. This caused accidents where developers intending to switch branches accidentally erased uncommitted file edits!",
      bullets: [
        "`git switch <branch>`: Swaps active working branch cleanly.",
        "`git switch -c <branch>`: Creates a new branch and switches immediately.",
        "`git restore <file>`: Dedicated strictly to discarding or unstaging file changes."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these branching errors:",
      bullets: [
        "Committing to `main` Directly: In professional teams, `main` is protected. Always build in feature branches (`feature/feature-name`).",
        "Forgetting to Switch Back Before Merging: Running `git merge main` while still sitting on `feature/search` merges main into feature instead of feature into main!",
        "Long-Lived Stale Branches: Leaving branches open for 6 months without synchronizing with main leads to monstrous merge conflicts. Merge often."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a new branch `feature/navbar`. Add a `<nav>` element to `index.html` and commit. Switch back to `main`, observe that `index.html` does not have the nav element yet, and then merge `feature/navbar` into `main`. Delete the feature branch with `git branch -d`."
    }
  ],
  questions: [
    {
      id: "q-git-135-1",
      prompt: "What is a branch in Git under the hood?",
      options: [
        { id: "a", label: "A lightweight, movable pointer (a 41-byte reference file) pointing to a specific commit hash" },
        { id: "b", label: "A full copy of all files duplicated into a new folder on disk" },
        { id: "c", label: "A special CSS class" },
        { id: "d", label: "A private server in the cloud" }
      ],
      correctAnswer: "a",
      explanation: "Branches in Git are merely lightweight text files in `.git/refs/heads/` storing a 40-character commit hash pointer."
    },
    {
      id: "q-git-135-2",
      prompt: "What modern Git command creates a new branch and immediately switches to it?",
      options: [
        { id: "a", label: "`git switch -c <branch-name>`" },
        { id: "b", label: "`git branch <branch-name>`" },
        { id: "c", label: "`git make branch <branch-name>`" },
        { id: "d", label: "`git create <branch-name>`" }
      ],
      correctAnswer: "a",
      explanation: "`git switch -c <name>` (or legacy `git checkout -b <name>`) creates the branch pointer and updates HEAD to it in one command."
    },
    {
      id: "q-git-135-3",
      prompt: "What is a 'fast-forward' merge in Git?",
      options: [
        { id: "a", label: "A merge where Git simply moves the target branch pointer forward to the tip of the feature branch without creating an extra merge commit" },
        { id: "b", label: "A merge that skips all unit tests" },
        { id: "c", label: "A merge that deletes all commits" },
        { id: "d", label: "A merge done automatically by GitHub" }
      ],
      correctAnswer: "a",
      explanation: "If the target branch has not diverged with new commits, Git fast-forwards the pointer directly to the latest commit."
    },
    {
      id: "q-git-135-4",
      prompt: "When does Git create a '3-way merge commit'?",
      options: [
        { id: "a", label: "When both the target branch and the feature branch have diverged with new commits since their common ancestor" },
        { id: "b", label: "When three developers edit code at the same time" },
        { id: "c", label: "When you have 3 branches" },
        { id: "d", label: "Only on Linux servers" }
      ],
      correctAnswer: "a",
      explanation: "When history has diverged on both branches, Git combines them using a 3-way merge (common ancestor + both tips), producing a merge commit."
    },
    {
      id: "q-git-135-5",
      prompt: "What is `HEAD` in Git?",
      options: [
        { id: "a", label: "A special pointer that indicates the currently checked-out commit or active branch in your working tree" },
        { id: "b", label: "The first line of a file" },
        { id: "c", label: "The project manager's user account" },
        { id: "d", label: "The HTML `<head>` tag" }
      ],
      correctAnswer: "a",
      explanation: "`HEAD` is the symbolic reference pointing to the current branch or commit currently checked out in your working directory."
    },
    {
      id: "q-git-135-6",
      prompt: "How do you safely delete a local feature branch that has already been merged into `main`?",
      options: [
        { id: "a", label: "`git branch -d <branch-name>`" },
        { id: "b", label: "`git branch -D <branch-name>`" },
        { id: "c", label: "`git remove branch <branch-name>`" },
        { id: "d", label: "`git delete <branch-name>`" }
      ],
      correctAnswer: "a",
      explanation: "`-d` (lowercase) is the safe delete flag: Git verifies that the branch has been fully merged before allowing deletion."
    },
    {
      id: "q-git-135-7",
      prompt: "What happens if you try to delete an unmerged branch with `git branch -d <name>`?",
      options: [
        { id: "a", label: "Git refuses and issues a warning that unmerged work will be lost, requiring `-D` (uppercase) to force deletion" },
        { id: "b", label: "Git deletes it anyway" },
        { id: "c", label: "The repository crashes" },
        { id: "d", label: "It merges automatically" }
      ],
      correctAnswer: "a",
      explanation: "Git protects you from accidental data loss: lowercase `-d` refuses to delete unmerged commits unless forced with uppercase `-D`."
    },
    {
      id: "q-git-135-8",
      prompt: "Before running `git merge feature-branch`, which branch must you be currently sitting on?",
      options: [
        { id: "a", label: "The target integration branch (e.g. `main`) that you want to receive the changes" },
        { id: "b", label: "The `feature-branch` itself" },
        { id: "c", label: "It does not matter which branch you are on" },
        { id: "d", label: "On a detached HEAD" }
      ],
      correctAnswer: "a",
      explanation: "`git merge <branch>` pulls the specified branch INTO the currently checked-out active branch."
    },
    {
      id: "q-git-135-9",
      prompt: "How can you view a list of all local branches and see which branch is currently active?",
      options: [
        { id: "a", label: "`git branch` (the active branch is marked with an asterisk `*`)" },
        { id: "b", label: "`git list`" },
        { id: "c", label: "`git show branches`" },
        { id: "d", label: "`git status --all`" }
      ],
      correctAnswer: "a",
      explanation: "`git branch` prints all local branches and highlights the currently active branch with an asterisk and green text."
    },
    {
      id: "q-git-135-10",
      prompt: "Why should developers use descriptive branch naming conventions like `feature/search-filter` or `fix/login-null-token`?",
      options: [
        { id: "a", label: "To clearly communicate the branch's purpose to teammates and automate issue tracker integration" },
        { id: "b", label: "Because Git requires slashes in branch names" },
        { id: "c", label: "To make the file download faster" },
        { id: "d", label: "To encrypt the branch" }
      ],
      correctAnswer: "a",
      explanation: "Prefixing branches with `feature/`, `fix/`, or `docs/` creates self-documenting, organized collaboration workflows."
    }
  ]
};

// LESSON 136: MERGE CONFLICTS
const lesson136: CurriculumItem = {
  id: "item-git-136-merge-conflicts",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-03-branches-collaboration",
  moduleTitle: "Module 3: Branches and Collaboration",
  modulePosition: 3,
  title: "136. Merge Conflicts",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 136: Merge Conflicts",
  contentDescription: "Master identifying, understanding, and resolving merge conflicts: reading standard conflict markers (<<<<<<<, =======, >>>>>>>), editing files to intended integrated state, running tests, staging, and completing merges.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Git reports a conflict during merge:
# Auto-merging src/App.jsx
# CONFLICT (content): Merge conflict in src/App.jsx
# Automatic merge failed; fix conflicts and then commit the result.

# 2. Inspect conflict markers inside the conflicted file:
# <<<<<<< HEAD (Current branch: main)
# <header className="header-blue">BlezeX Learning Portal</header>
# =======
# <header className="header-dark">BlezeX Accelerator Hub</header>
# >>>>>>> feature/brand-update (Incoming branch)

# 3. Resolution Workflow:
# - Edit file to remove markers and keep desired integrated code
# - Run tests to verify code still compiles and works!
# - Stage the resolved file:
git add src/App.jsx

# - Finalize the merge commit:
git commit -m "Merge branch feature/brand-update resolving header conflicts"`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Two Editors and the Same Sentence",
      explanation: "Imagine two editors working on the same book manuscript. Editor A changes Chapter 1, and Editor B changes Chapter 5. When they bring their edits together, Git combines them automatically with zero issues! But what if Editor A edits Sentence 1 of Chapter 3 to say: 'The cat was BLACK', while at the exact same time Editor B edits Sentence 1 of Chapter 3 to say: 'The cat was WHITE'? When Git tries to combine them, Git cannot read your mind! It doesn't know whether the cat is black, white, or black-and-white. Git stops, marks the sentence with special conflict markers, and calls you (the human developer) to make the final decision!",
      bullets: [
        "Conflict: Occurs when two branches make different changes to the exact same lines of a file.",
        "Conflict Markers: `<<<<<<< HEAD` (your current branch), `=======` (divider), `>>>>>>> branch` (incoming branch).",
        "Never Guess: Understand the business logic intended by BOTH changes before resolving."
      ]
    },
    {
      title: "2. The Anatomy of Conflict Markers",
      explanation: "How to read the markers Git places in your source code:",
      table: {
        headers: ["Marker", "Meaning", "Action Required"],
        rows: [
          ["`<<<<<<< HEAD`", "Beginning of your current active branch's version", "Inspect your code"],
          ["`=======`", "Center divider separating the two competing versions", "Delete this divider during resolution"],
          ["`>>>>>>> feature`", "End of incoming branch's version", "Delete this marker line completely"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: The 5-Step Conflict Resolution Protocol",
      explanation: "Follow this systematic protocol every time you encounter a conflict:",
      bullets: [
        "Step 1: Run `git status` to see exactly which files are marked 'both modified'.",
        "Step 2: Open the conflicted file in VS Code or your editor.",
        "Step 3: Decide whether to accept Current, accept Incoming, or blend both into a new solution.",
        "Step 4: Delete all `<<<<<<<`, `=======`, and `>>>>>>>` marker lines.",
        "Step 5: Run your application tests to ensure nothing is broken, then run `git add <file>` and `git commit` to finalize!"
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these conflict resolution traps:",
      bullets: [
        "Leaving Conflict Markers in Code: Committing files that still have `<<<<<<< HEAD` in them. This causes syntax errors in JavaScript and crashes production!",
        "Blindly Choosing 'Accept All Incoming': Overwrites your teammates' work without understanding what they wrote.",
        "Aborting in a Panic: If you get overwhelmed, you can cleanly return to your pre-merge state at any time by running `git merge --abort`."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a deliberate merge conflict in a practice repository by editing the same line in `index.html` on both `main` and a `feature` branch. Run `git merge feature`, inspect the conflict markers, resolve the conflict manually, run `git add`, and finalize the merge commit."
    }
  ],
  questions: [
    {
      id: "q-git-136-1",
      prompt: "When does a merge conflict occur in Git?",
      options: [
        { id: "a", label: "When two branches have made conflicting modifications to the exact same lines of a file, preventing Git from automatically reconciling them" },
        { id: "b", label: "When two developers have the same first name" },
        { id: "c", label: "When the computer runs out of memory" },
        { id: "d", label: "When GitHub servers are down" }
      ],
      correctAnswer: "a",
      explanation: "A conflict arises when Git cannot automatically determine which edit to prioritize on identical lines of code."
    },
    {
      id: "q-git-136-2",
      prompt: "What does the `<<<<<<< HEAD` marker indicate in a conflicted file?",
      options: [
        { id: "a", label: "The beginning of the changes on the branch you currently have checked out (the target branch)" },
        { id: "b", label: "The start of the HTML `<head>` tag" },
        { id: "c", label: "A line with a syntax error" },
        { id: "d", label: "The incoming branch changes" }
      ],
      correctAnswer: "a",
      explanation: "`HEAD` indicates your active branch's code before the `=======` divider."
    },
    {
      id: "q-git-136-3",
      prompt: "What does the `=======` line represent inside a conflicted file?",
      options: [
        { id: "a", label: "The center divider separating your current branch's changes from the incoming branch's changes" },
        { id: "b", label: "An equal comparison operator in JavaScript" },
        { id: "c", label: "A comment line" },
        { id: "d", label: "The end of the file" }
      ],
      correctAnswer: "a",
      explanation: "The `=======` divider separates the current `HEAD` version above from the incoming branch version below."
    },
    {
      id: "q-git-136-4",
      prompt: "What command can you run to safely abort a conflicted merge and return your repository to the clean state before the merge attempt?",
      options: [
        { id: "a", label: "`git merge --abort`" },
        { id: "b", label: "`git cancel`" },
        { id: "c", label: "`git stop`" },
        { id: "d", label: "`git undo merge`" }
      ],
      correctAnswer: "a",
      explanation: "`git merge --abort` resets the working tree and staging index back to the exact commit before the merge was initiated."
    },
    {
      id: "q-git-136-5",
      prompt: "What must you do after manually editing a conflicted file to resolve the dispute?",
      options: [
        { id: "a", label: "Delete all conflict markers, verify code with tests, stage the resolved file with `git add`, and finalize with `git commit`" },
        { id: "b", label: "Run `git push` immediately" },
        { id: "c", label: "Delete the branch" },
        { id: "d", label: "Close the terminal" }
      ],
      correctAnswer: "a",
      explanation: "Resolving requires removing all conflict markers, staging the clean file (`git add`), and committing to record the resolved merge."
    },
    {
      id: "q-git-136-6",
      prompt: "What happens if you accidentally commit a file with `<<<<<<< HEAD` conflict markers still inside it?",
      options: [
        { id: "a", label: "The invalid syntax is baked into your source code, causing compilation errors, broken builds, or runtime crashes in production" },
        { id: "b", label: "Git deletes the markers automatically on commit" },
        { id: "c", label: "The browser ignores them" },
        { id: "d", label: "GitHub rejects the commit automatically" }
      ],
      correctAnswer: "a",
      explanation: "Git treats conflict markers as ordinary text. If you commit them, they will break JavaScript parsers and crash applications."
    },
    {
      id: "q-git-136-7",
      prompt: "What best practice helps minimize the frequency and complexity of merge conflicts in collaborative teams?",
      options: [
        { id: "a", label: "Keeping feature branches short-lived, committing in small atomic chunks, and regularly pulling updates from `main`" },
        { id: "b", label: "Only having one person write code" },
        { id: "c", label: "Never using branches" },
        { id: "d", label: "Disabling Git status" }
      ],
      correctAnswer: "a",
      explanation: "Small, frequent merges and pulling from `main` often prevents long-lived diverging code that breeds complex conflicts."
    },
    {
      id: "q-git-136-8",
      prompt: "In `git status`, how does Git label a file that has an active, unresolved merge conflict?",
      options: [
        { id: "a", label: "`both modified:`" },
        { id: "b", label: "`conflict error:`" },
        { id: "c", label: "`broken file:`" },
        { id: "d", label: "`locked:`" }
      ],
      correctAnswer: "a",
      explanation: "Unresolved merge conflicts appear under the 'Unmerged paths:' section labeled as `both modified:`."
    },
    {
      id: "q-git-136-9",
      prompt: "Can a merge conflict occur if two developers edit DIFFERENT files in the same repository?",
      options: [
        { id: "a", label: "No; Git reconciles edits in different files automatically without conflicts" },
        { id: "b", label: "Yes, Git conflicts on every commit" },
        { id: "c", label: "Only if the files have the same size" },
        { id: "d", label: "Only if both files end in `.js`" }
      ],
      correctAnswer: "a",
      explanation: "Git automatically merges changes across different files or non-overlapping sections of the same file without requiring human intervention."
    },
    {
      id: "q-git-136-10",
      prompt: "What feature in modern code editors (like VS Code) helps developers resolve merge conflicts visually?",
      options: [
        { id: "a", label: "Inline resolution lenses ('Accept Current Change', 'Accept Incoming Change', 'Accept Both Changes', 'Compare Changes')" },
        { id: "b", label: "Automatic speech recognition" },
        { id: "c", label: "Spell check" },
        { id: "d", label: "Dark mode themes" }
      ],
      correctAnswer: "a",
      explanation: "VS Code detects Git conflict markers and displays 1-click action buttons to accept current, incoming, or combined changes."
    }
  ]
};

// LESSON 137: REMOTES, FETCH, PULL AND PUSH
const lesson137: CurriculumItem = {
  id: "item-git-137-remotes-fetch-pull-push",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-03-branches-collaboration",
  moduleTitle: "Module 3: Branches and Collaboration",
  modulePosition: 3,
  title: "137. Remotes, Fetch, Pull and Push",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 137: Remotes, Fetch, Pull and Push",
  contentDescription: "Master synchronizing with remote repositories (origin), understanding the difference between git fetch (download objects) and git pull (fetch + merge), upstream branch tracking with -u, and diagnosing rejected pushes.",
  codeSnippet: {
    language: "bash",
    code: `# 1. View configured remote URLs (fetch and push)
git remote -v

# 2. Add a new remote repository named 'origin'
git remote add origin https://github.com/blezex/portal.git

# 3. DOWNLOAD remote changes WITHOUT merging into your local files (SAFE)
git fetch origin

# 4. DOWNLOAD and automatically MERGE remote changes into your active branch
git pull origin main

# 5. Push your local branch to the remote and establish upstream tracking (-u)
git push -u origin feature/course-search`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Checking the Mailbox vs Opening Letters Immediately",
      explanation: "Imagine you have a physical mailbox at the end of your driveway. `git fetch` is walking out to the mailbox, grabbing the envelopes, and bringing them inside to your kitchen counter. You haven't opened any letters or changed anything on your desk yet—you just downloaded the envelopes so you can safely inspect what arrived. `git pull` is opening the envelopes and immediately signing the papers without looking! `git pull` is actually TWO commands combined in one: `git fetch` (get envelopes) + `git merge` (combine into your desk). And `git push` is dropping your own outgoing letters into the postal box for the rest of the world to receive!",
      bullets: [
        "Remote: A named bookmark URL pointing to a shared repository (usually `origin`).",
        "`git fetch`: Downloads all commits and branches from the remote, updating remote-tracking branches (`origin/main`). Does NOT alter your working files.",
        "`git pull`: Executes `git fetch` followed immediately by `git merge origin/main`.",
        "`git push -u origin <branch>`: Transmits local commits to GitHub and sets default upstream tracking."
      ]
    },
    {
      title: "2. The Anatomy of Remote-Tracking Branches",
      explanation: "Understanding local vs remote references in Git:",
      table: {
        headers: ["Reference Name", "Where It Lives", "What It Represents"],
        rows: [
          ["`main`", "Local machine", "Your local working branch where you make commits"],
          ["`origin/main`", "Local machine (cached)", "A read-only local snapshot of where `main` was on GitHub the last time you fetched"],
          ["`origin` (Remote)", "GitHub cloud servers", "The actual remote repository shared by your team"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Diagnosing a Rejected Push (`[rejected - non-fast-forward]`)",
      explanation: "You run `git push origin main`, and Git screams: `[rejected - non-fast-forward] Updates were rejected because the remote contains work that you do not have locally.`",
      bullets: [
        "Why It Happened: A teammate pushed a commit to GitHub while you were working. GitHub protects their work from being overwritten by you!",
        "The Solution: Run `git pull origin main` (or `git pull --rebase origin main`), integrate their changes into your local branch, test, and then run `git push`.",
        "DANGER: NEVER run `git push --force` on shared branches! Force-pushing overwrites and deletes your teammates' commits from the server."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these remote sync mistakes:",
      bullets: [
        "Assuming `git pull` is Always Safe: Blindly running `git pull` with uncommitted local changes can cause unexpected merge conflicts. Stash or commit first.",
        "Forgetting `-u` on First Push: If you run `git push` on a new branch without `-u origin <branch>`, Git doesn't know where future `git pull` commands should sync.",
        "Committing Secrets to Remotes: Once pushed to GitHub, tokens are exposed to the world."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create a new repository on GitHub. Connect your local repository using `git remote add origin <url>`. Push your `main` branch with `git push -u origin main`. Verify with `git remote -v` and `git branch -vv` that upstream tracking is established."
    }
  ],
  questions: [
    {
      id: "q-git-137-1",
      prompt: "What is 'origin' in standard Git usage?",
      options: [
        { id: "a", label: "The default shorthand alias name given to the primary remote repository URL from which a project was cloned" },
        { id: "b", label: "The first commit ever made in Git" },
        { id: "c", label: "The computer's motherboard" },
        { id: "d", label: "The user's home country" }
      ],
      correctAnswer: "a",
      explanation: "`origin` is the default alias Git assigns to the remote repository URL when you clone or add a remote."
    },
    {
      id: "q-git-137-2",
      prompt: "What is the critical difference between `git fetch` and `git pull`?",
      options: [
        { id: "a", label: "`git fetch` only downloads remote objects and updates remote-tracking branches without modifying your local working files; `git pull` downloads AND immediately merges into your current branch" },
        { id: "b", label: "`git fetch` uploads code; `git pull` downloads code" },
        { id: "c", label: "`git fetch` is deprecated" },
        { id: "d", label: "They are identical commands" }
      ],
      correctAnswer: "a",
      explanation: "`git pull` is essentially shorthand for `git fetch` followed immediately by `git merge`."
    },
    {
      id: "q-git-137-3",
      prompt: "What does the `-u` flag in `git push -u origin feature` do?",
      options: [
        { id: "a", label: "Sets up upstream tracking, establishing a link so future `git push` and `git pull` commands remember to sync with `origin/feature` automatically" },
        { id: "b", label: "Forces the push by unlocking files" },
        { id: "c", label: "Upgrades Git to the latest version" },
        { id: "d", label: "Undoes the last commit" }
      ],
      correctAnswer: "a",
      explanation: "`-u` (`--set-upstream`) links your local branch to the remote branch, allowing you to simply type `git push` or `git pull` later."
    },
    {
      id: "q-git-137-4",
      prompt: "What causes a `[rejected - non-fast-forward]` error when running `git push`?",
      options: [
        { id: "a", label: "The remote repository contains commits that you do not have locally on your branch" },
        { id: "b", label: "Your internet connection is too slow" },
        { id: "c", label: "Your GitHub password was typed wrong" },
        { id: "d", label: "The repository reached its 100MB limit" }
      ],
      correctAnswer: "a",
      explanation: "Git rejects pushes when the remote branch has commits you lack, preventing you from accidentally overwriting colleagues' work."
    },
    {
      id: "q-git-137-5",
      prompt: "How should you properly resolve a `[rejected - non-fast-forward]` push rejection?",
      options: [
        { id: "a", label: "Run `git pull origin <branch>` to fetch and integrate remote commits into your local branch, resolve any conflicts, test, and push again" },
        { id: "b", label: "Run `git push --force` immediately" },
        { id: "c", label: "Delete your local repository and start over" },
        { id: "d", label: "Delete the remote repository" }
      ],
      correctAnswer: "a",
      explanation: "Pulling the latest remote changes integrates them into your branch, allowing you to test and push cleanly as a fast-forward."
    },
    {
      id: "q-git-137-6",
      prompt: "Why is `git push --force` dangerous on shared team branches (like `main`)?",
      options: [
        { id: "a", label: "It forcefully overwrites the remote branch history with your local history, permanently erasing any commits made by teammates that you did not have" },
        { id: "b", label: "It breaks the physical hard drive on the server" },
        { id: "c", label: "It deletes your GitHub user account" },
        { id: "d", label: "It is actually completely safe and recommended" }
      ],
      correctAnswer: "a",
      explanation: "Force-pushing destroys remote commits that don't exist locally, potentially erasing weeks of team work."
    },
    {
      id: "q-git-137-7",
      prompt: "What command displays all configured remote names along with their fetch and push URLs?",
      options: [
        { id: "a", label: "`git remote -v`" },
        { id: "b", label: "`git remotes --all`" },
        { id: "c", label: "`git show remotes`" },
        { id: "d", label: "`git status -r`" }
      ],
      correctAnswer: "a",
      explanation: "`git remote -v` (verbose) lists each remote alias alongside its target fetch and push URLs."
    },
    {
      id: "q-git-137-8",
      prompt: "What is `origin/main` in your local Git repository?",
      options: [
        { id: "a", label: "A remote-tracking branch that acts as a local cache of where the `main` branch was on the remote server the last time you communicated with it" },
        { id: "b", label: "The physical server in California" },
        { id: "c", label: "A branch you can edit and commit to directly" },
        { id: "d", label: "A deleted branch" }
      ],
      correctAnswer: "a",
      explanation: "Remote-tracking branches are read-only local pointers that reflect the state of branches on the remote server."
    },
    {
      id: "q-git-137-9",
      prompt: "How can you view all local AND remote branches at the same time?",
      options: [
        { id: "a", label: "`git branch -a`" },
        { id: "b", label: "`git show all branches`" },
        { id: "c", label: "`git remote branches`" },
        { id: "d", label: "`git log --branches`" }
      ],
      correctAnswer: "a",
      explanation: "`git branch -a` (all) lists local branches and remote-tracking branches (`remotes/origin/...`)."
    },
    {
      id: "q-git-137-10",
      prompt: "What is the safer alternative to `git push --force` that refuses to overwrite remote work if someone else pushed new commits?",
      options: [
        { id: "a", label: "`git push --force-with-lease`" },
        { id: "b", label: "`git push --safe`" },
        { id: "c", label: "`git push --careful`" },
        { id: "d", label: "`git push --no-overwrite`" }
      ],
      correctAnswer: "a",
      explanation: "`--force-with-lease` checks that your local cached reference matches the remote before overwriting, protecting against wiping others' commits."
    }
  ]
};

// LESSON 138: REBASE, CHERRY-PICK AND STASH
const lesson138: CurriculumItem = {
  id: "item-git-138-rebase-cherry-pick-stash",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-03-branches-collaboration",
  moduleTitle: "Module 3: Branches and Collaboration",
  modulePosition: 3,
  title: "138. Rebase, Cherry-Pick and Stash",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lesson 138: Rebase, Cherry-Pick and Stash",
  contentDescription: "Master advanced Git manipulation: linearizing history with git rebase, the Golden Rule of Rebasing (never rebase public shared branches), applying specific commits with git cherry-pick, and temporarily shelving uncommitted edits with git stash.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Stash uncommitted changes for a quick emergency context switch
git stash
# Switch to main, fix urgent bug, commit, then restore stashed work:
git stash pop

# 2. Rebase: Replay local feature commits on top of the latest main
# (Creates a clean linear history; NEVER rebase shared public branches!)
git switch feature/search
git rebase main

# 3. Cherry-Pick: Apply ONE specific commit from another branch to active branch
git cherry-pick a1b2c3d`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Drawer, The Re-stacker, and The Plucker",
      explanation: "Think of your daily work: 1) `git stash` is your desk drawer: you are in the middle of writing a 10-page essay and your desk is covered in papers. Suddenly your boss rushes in and says: 'Fix this typo on the website right now!' You can't commit unfinished half-sentences! So you sweep all papers into the desk drawer (`git stash`), fix the typo, commit, and then pull your papers back out onto the desk (`git stash pop`). 2) `git rebase` is like taking a stack of your personal handwritten notes and moving them from the bottom of a book to the very top page so your story reads in a straight, linear line. 3) `git cherry-pick` is plucking a single delicious strawberry off someone else's cake and placing it directly onto your own cake!",
      bullets: [
        "`git stash`: Temporarily shelves uncommitted modifications so you can switch tasks cleanly.",
        "`git rebase <base>`: Replays your commits on top of another branch tip to create linear history.",
        "`git cherry-pick <hash>`: Copies a specific commit from anywhere in the repository onto your current branch."
      ]
    },
    {
      title: "2. Merge vs Rebase: The Architectural Tradeoff",
      explanation: "Both combine branches, but they treat history completely differently:",
      table: {
        headers: ["Approach", "How It Combines History", "Pros & Cons"],
        rows: [
          ["`git merge`", "Non-destructive; preserves original commit timestamps and creates a merge commit", "Preserves exact chronological reality; can clutter history with merge bubbles"],
          ["`git rebase`", "Rewrites commit history; replays commits linearly on top of new base with brand-new SHA hashes", "Produces a beautiful, straight linear history; rewriting shared history breaks teammates' repos"]
        ]
      }
    },
    {
      title: "3. The Golden Rule of Rebasing",
      explanation: "NEVER rebase commits that exist outside your local machine and have been pushed to a shared public branch (like `main`)! Because rebasing creates brand-new commit hashes, other developers based on the old hashes will suffer catastrophic synchronization conflicts.",
      bullets: [
        "Safe to Rebase: Your private local feature branch before creating a pull request.",
        "FORBIDDEN to Rebase: `main`, `master`, or any branch teammates are actively branching from."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these advanced Git traps:",
      bullets: [
        "Rebasing Public History: Forces teammates to manually reconcile rewritten commits.",
        "Losing Stashes: Running `git stash pop` and encountering conflicts. Stashes stay in the stash list if pop encounters conflicts.",
        "Overusing Cherry-Pick: Cherry-picking creates duplicate commits with different hashes. Use branching and merging for full feature integration."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Make uncommitted changes in a working file. Stash them with `git stash`. Verify with `git status` that the working tree is clean. Run `git stash list`. Restore the changes with `git stash pop`. Practice cherry-picking a specific commit from a temporary branch onto `main`."
    }
  ],
  questions: [
    {
      id: "q-git-138-1",
      prompt: "What does `git stash` do?",
      options: [
        { id: "a", label: "Temporarily shelves (saves) uncommitted working directory and staging index modifications so you have a clean working tree to switch tasks" },
        { id: "b", label: "Permanently deletes all uncommitted files" },
        { id: "c", label: "Uploads files to an AWS S3 bucket" },
        { id: "d", label: "Compresses the repository into a zip file" }
      ],
      correctAnswer: "a",
      explanation: "`git stash` saves uncommitted dirty working state in a local stack, restoring your working tree to match `HEAD`."
    },
    {
      id: "q-git-138-2",
      prompt: "How do you restore and reapply your most recently stashed changes back onto your working directory?",
      options: [
        { id: "a", label: "`git stash pop`" },
        { id: "b", label: "`git stash restore`" },
        { id: "c", label: "`git stash get`" },
        { id: "d", label: "`git un基stash`" }
      ],
      correctAnswer: "a",
      explanation: "`git stash pop` applies the top stashed state back onto your working tree and removes it from the stash list."
    },
    {
      id: "q-git-138-3",
      prompt: "What does `git rebase main` do when run from a feature branch?",
      options: [
        { id: "a", label: "It takes the unique commits on your feature branch and replays them one by one on top of the latest tip of `main`, linearizing history" },
        { id: "b", label: "It deletes the feature branch" },
        { id: "c", label: "It merges main with a 3-way merge commit" },
        { id: "d", label: "It reverses all commits" }
      ],
      correctAnswer: "a",
      explanation: "Rebase changes the base commit of your branch, creating new commits on top of the target branch for a clean, linear git log."
    },
    {
      id: "q-git-138-4",
      prompt: "What is the 'Golden Rule of Rebasing' in Git?",
      options: [
        { id: "a", label: "Never rebase commits that have already been pushed to a shared public branch (like `main`)" },
        { id: "b", label: "Always rebase before every commit" },
        { id: "c", label: "Rebasing is forbidden on Fridays" },
        { id: "d", label: "Never rebase files with CSS" }
      ],
      correctAnswer: "a",
      explanation: "Rebasing rewrites commit hashes. Doing this on shared public branches creates duplicate commits and disrupts collaborators' history."
    },
    {
      id: "q-git-138-5",
      prompt: "What does `git cherry-pick <commit-hash>` do?",
      options: [
        { id: "a", label: "Applies the exact changes from a specific individual commit from anywhere in the repository onto your currently active branch" },
        { id: "b", label: "Picks the fastest internet connection" },
        { id: "c", label: "Deletes a specific commit" },
        { id: "d", label: "Merges an entire branch" }
      ],
      correctAnswer: "a",
      explanation: "`git cherry-pick` extracts a single commit's diff and applies it as a brand-new commit on the current branch."
    },
    {
      id: "q-git-138-6",
      prompt: "Why do commits that are rebased get brand-new commit SHA hashes?",
      options: [
        { id: "a", label: "Because their parent commit has changed, and Git commit hashes are cryptographically computed from the commit content and parent hash" },
        { id: "b", label: "It is a bug in Git" },
        { id: "c", label: "Because the file names are changed" },
        { id: "d", label: "Hashes are generated randomly by date" }
      ],
      correctAnswer: "a",
      explanation: "A commit's SHA is a hash of its tree, author, message, and parent SHA. Changing the base changes the parent, producing a new hash."
    },
    {
      id: "q-git-138-7",
      prompt: "What command displays a list of all currently stored stashes?",
      options: [
        { id: "a", label: "`git stash list`" },
        { id: "b", label: "`git stash show`" },
        { id: "c", label: "`git show stashes`" },
        { id: "d", label: "`git status --stash`" }
      ],
      correctAnswer: "a",
      explanation: "`git stash list` displays all saved stashes in the format `stash@{0}`, `stash@{1}`, etc."
    },
    {
      id: "q-git-138-8",
      prompt: "What is the difference between `git stash pop` and `git stash apply`?",
      options: [
        { id: "a", label: "`pop` applies the stash and removes it from the stash list; `apply` applies the stash but keeps it in the stash list" },
        { id: "b", label: "`apply` deletes all files" },
        { id: "c", label: "`pop` only works on numbers" },
        { id: "d", label: "They are exact synonyms" }
      ],
      correctAnswer: "a",
      explanation: "`git stash apply` is useful when you want to apply the same stashed changes across multiple different branches."
    },
    {
      id: "q-git-138-9",
      prompt: "How can you abort an in-progress rebase if you encounter overwhelming conflicts?",
      options: [
        { id: "a", label: "`git rebase --abort`" },
        { id: "b", label: "`git cancel`" },
        { id: "c", label: "`git rebase --stop`" },
        { id: "d", label: "`git reset rebase`" }
      ],
      correctAnswer: "a",
      explanation: "`git rebase --abort` cancels the rebase operation and returns the branch to its exact pre-rebase state."
    },
    {
      id: "q-git-138-10",
      prompt: "What is an interactive rebase (`git rebase -i HEAD~3`) commonly used for?",
      options: [
        { id: "a", label: "Squashing multiple small commits into one clean commit, rewording commit messages, or dropping unwanted local commits before merging" },
        { id: "b", label: "Playing an interactive terminal game" },
        { id: "c", label: "Pushing code to GitHub" },
        { id: "d", label: "Deleting the repository" }
      ],
      correctAnswer: "a",
      explanation: "Interactive rebasing lets you curate, squash, reorder, and polish local commit history before submitting for code review."
    }
  ]
};

// LESSON 139: PULL REQUESTS AND CODE REVIEW
const lesson139: CurriculumItem = {
  id: "item-git-139-pull-requests-code-review",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-03-branches-collaboration",
  moduleTitle: "Module 3: Branches and Collaboration",
  modulePosition: 3,
  title: "139. Pull Requests and Code Review",
  duration: "30 mins",
  type: "cheatsheet",
  position: 5,
  contentHeading: "Lesson 139: Pull Requests and Code Review",
  contentDescription: "Master asynchronous code review workflows: opening Pull Requests (PRs), writing high-context descriptions, continuous integration (CI) checks, addressing review comments constructively, and merge strategies.",
  codeSnippet: {
    language: "markdown",
    code: `## Pull Request Template Example:

### 1. Problem / Context
Students could not search for courses by level or duration on mobile devices.

### 2. Solution Summary
- Built \`CourseFilterBar\` with accessible dropdown and responsive layout.
- Synchronized filter query parameters with \`useSearchParams\`.
- Added unit tests verifying filtering logic.

### 3. Verification & Testing Evidence
- [x] All automated tests pass: \`npm test\`
- [x] Zero build warnings: \`npm run build\`
- [x] Verified on Chrome, Firefox, and mobile viewport (375px)
- Screenshot attached: [courses-filtered-mobile.png]`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Submitting an Article to a Magazine Editor",
      explanation: "Imagine you are a journalist writing for a national magazine. When you finish writing an article, you don't break into the printing factory at midnight, turn on the printing press, and stamp your article directly into tomorrow's magazine without anyone looking! You submit your draft to the Senior Editor (a 'Pull Request'). The Editor reads it, checks grammar and facts (Automated CI Tests), and leaves comments in the margins: 'Please clarify this sentence; make sure this source is verified' (Code Review). You make the small revisions, the Editor stamps 'APPROVED', and the article is officially merged into the magazine!",
      bullets: [
        "Pull Request (PR): A formal proposal to merge a feature branch into a target branch.",
        "Quality Gate: Protects production from bugs, security flaws, and accessibility oversights.",
        "Team Knowledge Sharing: Reviews educate junior developers and build shared ownership of code."
      ]
    },
    {
      title: "2. The Anatomy of a High-Impact Pull Request",
      explanation: "What senior developers look for in every PR:",
      table: {
        headers: ["Component", "Good Practice", "Why It Matters"],
        rows: [
          ["PR Size", "Small & Focused (< 400 lines of diff)", "Small PRs get reviewed in 15 minutes; giant 3,000-line PRs get rubber-stamped or delayed for weeks"],
          ["Description", "Clear summary of WHY, WHAT, and HOW", "Gives reviewers immediate context without guessing"],
          ["Test Evidence", "Screenshots, videos, or test output", "Proves the code actually works before merging"],
          ["CI Checks", "Passing unit tests, linting, and build gates", "Ensures zero broken code lands in `main`"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Addressing Review Comments Professionally",
      explanation: "Code review is about code, not ego. When a reviewer requests changes:",
      bullets: [
        "Commit additions to the SAME branch: Simply make edits, commit, and `git push origin feature/name`. The PR updates automatically in GitHub!",
        "Constructive Discussion: If you disagree with a suggestion, explain your technical rationale politely.",
        "Resolve Conversations: Mark threads as resolved only after the requested fix has been implemented."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these PR anti-patterns:",
      bullets: [
        "Opening a PR with Zero Description: Dropping a title like `fix` with no body leaves reviewers completely blind.",
        "Merging with Failing CI: Overriding red failing tests because you're in a hurry. Red tests exist to stop production outages!",
        "Creating a New PR for Every Fix: You don't close a PR and open a new one to fix a typo. Just push new commits to the same branch."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Push a feature branch to GitHub. Open a Pull Request into `main`. Write a professional description with Context, Solution, and Testing Evidence. Practice leaving a line-by-line comment on the Files Changed tab, push a follow-up commit to the branch, and merge the PR."
    }
  ],
  questions: [
    {
      id: "q-git-139-1",
      prompt: "What is a Pull Request (PR) or Merge Request (MR)?",
      options: [
        { id: "a", label: "A proposed set of code changes from a branch submitted for team review, discussion, automated CI testing, and approval before merging into a target branch" },
        { id: "b", label: "A request for a pay raise" },
        { id: "c", label: "A command that downloads code from GitHub" },
        { id: "d", label: "A bug report" }
      ],
      correctAnswer: "a",
      explanation: "A Pull Request packages a branch's commits, providing an interface for peer review, discussion, and automated CI quality checks."
    },
    {
      id: "q-git-139-2",
      prompt: "Why should Pull Requests be kept small and focused (ideally under 300-400 lines of diff)?",
      options: [
        { id: "a", label: "Small PRs are reviewed much faster, produce higher-quality thorough reviews, catch more bugs, and carry lower risk of merge conflicts" },
        { id: "b", label: "Because GitHub limits PRs to 400 lines" },
        { id: "c", label: "Because computers cannot process more lines" },
        { id: "d", label: "To write less code" }
      ],
      correctAnswer: "a",
      explanation: "Industry research demonstrates that review quality drops precipitously after 400 lines of code. Small PRs are easier to understand and review."
    },
    {
      id: "q-git-139-3",
      prompt: "What is Continuous Integration (CI) in the context of a Pull Request?",
      options: [
        { id: "a", label: "Automated scripts (e.g. GitHub Actions) that run tests, lint checks, and production builds on your branch to verify that code works before merging" },
        { id: "b", label: "Typing continuously without pause" },
        { id: "c", label: "A continuous video meeting" },
        { id: "d", label: "Daily meetings with managers" }
      ],
      correctAnswer: "a",
      explanation: "CI runs automated test suites and linters against incoming PRs, catching regressions before code is merged into `main`."
    },
    {
      id: "q-git-139-4",
      prompt: "How do you update an open Pull Request after a reviewer asks for changes?",
      options: [
        { id: "a", label: "Simply make the edits locally, commit, and `git push` to the same feature branch; GitHub updates the existing PR automatically" },
        { id: "b", label: "Close the PR and open a brand-new PR from scratch" },
        { id: "c", label: "Send the file to the reviewer by email" },
        { id: "d", label: "Delete the branch" }
      ],
      correctAnswer: "a",
      explanation: "An open PR tracks the feature branch. Pushing new commits to that branch automatically appends them to the open PR."
    },
    {
      id: "q-git-139-5",
      prompt: "What does 'Squash and Merge' do when merging a PR on GitHub?",
      options: [
        { id: "a", label: "Combines all individual commits from the feature branch into a single clean, unified commit on the target branch" },
        { id: "b", label: "Compresses files into a zip file" },
        { id: "c", label: "Deletes all files in the branch" },
        { id: "d", label: "Rejects the pull request" }
      ],
      correctAnswer: "a",
      explanation: "Squashing condenses a messy branch history (e.g. 'Fix typo', 'WIP', 'Test') into one concise, professional commit on `main`."
    },
    {
      id: "q-git-139-6",
      prompt: "What should you do if an automated CI check fails (turns red) on your Pull Request?",
      options: [
        { id: "a", label: "Click on the failed check logs, diagnose the failing test or lint error, fix it locally, and push an update" },
        { id: "b", label: "Merge the PR immediately anyway" },
        { id: "c", label: "Delete the CI test file" },
        { id: "d", label: "Ask the reviewer to ignore it" }
      ],
      correctAnswer: "a",
      explanation: "Failing CI checks indicate real regressions. Inspecting the build logs pinpoints the failing assertion so you can fix it."
    },
    {
      id: "q-git-139-7",
      prompt: "What should a comprehensive Pull Request description include?",
      options: [
        { id: "a", label: "The problem being solved (Context), the approach taken (Solution), testing evidence (Screenshots/Logs), and any breaking changes" },
        { id: "b", label: "Only the words 'Fixed stuff'" },
        { id: "c", label: "A copy of the entire source code in text" },
        { id: "d", label: "Personal contact details" }
      ],
      correctAnswer: "a",
      explanation: "A high-context description gives reviewers the background needed to review code effectively and preserves historical rationale for future developers."
    },
    {
      id: "q-git-139-8",
      prompt: "What is a 'Draft' Pull Request on GitHub?",
      options: [
        { id: "a", label: "A work-in-progress PR that notifies teammates of your direction and runs CI checks, but cannot be merged until marked 'Ready for review'" },
        { id: "b", label: "A deleted pull request" },
        { id: "c", label: "A PR that has no code" },
        { id: "d", label: "A private message" }
      ],
      correctAnswer: "a",
      explanation: "Draft PRs allow early feedback and CI verification while signaling that development is still in progress."
    },
    {
      id: "q-git-139-9",
      prompt: "Why should you never commit secrets or credentials in a feature branch even if you plan to delete them in a later commit of the same PR?",
      options: [
        { id: "a", label: "Because Git preserves every commit snapshot in history; anyone inspecting the PR's earlier commits can extract the secret" },
        { id: "b", label: "Because GitHub will delete your repository" },
        { id: "c", label: "Because it makes the PR title italic" },
        { id: "d", label: "Git deletes secrets automatically" }
      ],
      correctAnswer: "a",
      explanation: "Git history is permanent. Even if a secret is deleted in commit 3, it remains visible in commit 1 and 2 of the branch history."
    },
    {
      id: "q-git-139-10",
      prompt: "What does it mean to approve a Pull Request as a code reviewer?",
      options: [
        { id: "a", label: "You have reviewed the code for correctness, security, performance, accessibility, and tests, and endorse merging it into the codebase" },
        { id: "b", label: "You wrote the code yourself" },
        { id: "c", label: "You are the CEO of the company" },
        { id: "d", label: "It gives you GitHub points" }
      ],
      correctAnswer: "a",
      explanation: "Approval signifies that the reviewer has evaluated the code against quality standards and confirms it is ready for production integration."
    }
  ]
};

// MODULE 3 QUIZ
const gitModule03Quiz: CurriculumItem = {
  id: "item-git-mod03-quiz",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-03-branches-collaboration",
  moduleTitle: "Module 3: Branches and Collaboration",
  modulePosition: 3,
  title: "Module 3 Assessment: Branches & Collaboration MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 6,
  isModuleQuiz: true,
  contentHeading: "Module 3 Quiz: Branching, Conflicts, Remotes & PRs",
  contentDescription: "Evaluate your comprehensive mastery of Git collaboration: branch pointers, git switch, 3-way merges vs fast-forwards, conflict markers (<<<<<<< HEAD), conflict resolution protocols, remotes (origin), git fetch vs git pull, rejected pushes, git stash, rebase rules, and Pull Requests.",
  questions: [
    ...(lesson135.questions || []).slice(0, 2),
    ...(lesson136.questions || []).slice(0, 2),
    ...(lesson137.questions || []).slice(0, 2),
    ...(lesson138.questions || []).slice(0, 2),
    ...(lesson139.questions || []).slice(0, 2)
  ]
};

// MODULE 3 ASSESSMENT (LAB)
const gitModule03Assessment: CurriculumItem = {
  id: "item-git-mod03-lab",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-03-branches-collaboration",
  moduleTitle: "Module 3: Branches and Collaboration",
  modulePosition: 3,
  title: "Module 3 Lab: Multi-Branch Feature Workflow & Conflict Resolution",
  duration: "50 mins",
  type: "assignment",
  position: 7,
  isModuleAssessment: true,
  contentHeading: "Module 3 Lab Project: Multi-Branch Feature Workflow & Conflict Resolution",
  contentDescription: "Execute a complete team collaboration workflow: create feature branches with git switch -c, simulate an emergency context switch with git stash, generate and resolve an intentional merge conflict, and push with upstream tracking.",
  assignmentPrompt: {
    instructions: "Complete a real-world multi-branch collaboration simulation:\n1. Feature Branch: Create `feature/course-cards` using `git switch -c`.\n2. Context Switch: Make uncommitted edits, stash them with `git stash`, switch to `main` to make a hotfix commit, and restore your stash with `git stash pop`.\n3. Create Merge Conflict: Edit line 10 in `index.html` on both `main` and `feature/course-cards` differently.\n4. Merge & Resolve: Run `git merge feature/course-cards`, inspect the conflict markers, resolve to a clean combined solution, test, and commit.\n5. Remote Tracking: Connect a remote and push using `git push -u origin main`.",
    deliverables: [
      "Terminal log recording branch creation, stash pop, and merge conflict resolution",
      "Git commit history graph showing clean merge commit",
      "Repository pushed to remote with active upstream tracking"
    ]
  }
};

export const gitModule03: CurriculumSubModule = {
  id: "module-git-03-branches-collaboration",
  subCourseId: "mod-git-basics",
  title: "Module 3 — Branches and Collaboration",
  description: "Collaborate effectively: branch creation, fast-forward and 3-way merges, resolving merge conflicts, remote synchronizations with fetch/pull/push, and code reviews via Pull Requests.",
  position: 3,
  items: [
    lesson135,
    lesson136,
    lesson137,
    lesson138,
    lesson139,
    gitModule03Quiz,
    gitModule03Assessment
  ]
};
