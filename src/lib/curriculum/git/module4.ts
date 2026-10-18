import { CurriculumSubModule, CurriculumItem } from "../../curriculumTypes";

// =========================================================================
// MODULE 4: TEAM WORKFLOWS AND RECOVERY
// Lessons 140 - 143 + Module Quiz + Module Assessment Lab
// =========================================================================

// LESSON 140: TAGS AND RELEASES
const lesson140: CurriculumItem = {
  id: "item-git-140-tags-releases",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Module 4: Team Workflows and Recovery",
  modulePosition: 4,
  title: "140. Tags and Releases",
  duration: "30 mins",
  type: "cheatsheet",
  position: 1,
  contentHeading: "Lesson 140: Tags and Releases",
  contentDescription: "Master marking release milestones with Git tags: lightweight vs annotated tags (git tag -a), Semantic Versioning (SemVer: MAJOR.MINOR.PATCH), publishing tags to remotes, and generating GitHub releases.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Create an ANNOTATED tag with message and author metadata (Recommended for releases)
git tag -a v1.0.0 -m "Release v1.0.0: Initial launch of BlezeX Course Portal"

# 2. View tag details, cryptographic signature, and attached commit
git show v1.0.0

# 3. List all tags in the repository
git tag -l "v1.*"

# 4. PUSH tags to the remote repository (Tags are NOT pushed by default!)
git push origin v1.0.0
# Or push all local tags:
# git push origin --tags`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Trophy on the Bookshelf",
      explanation: "Think of your project history as a long marathon race with thousands of footsteps (commits). A 'Branch' is a runner who keeps running forward every single day. But a 'Tag' is a permanent golden trophy placed at the Mile 10 marker (`v1.0.0`). The trophy NEVER moves, even as the runners keep racing ahead! When customers download your software, they don't download a moving branch; they download the frozen milestone marked by the trophy: `v1.0.0` or `v2.1.0`. And Semantic Versioning is the universal numbering system stamped on that trophy!",
      bullets: [
        "Annotated Tag (`git tag -a`): Contains tagger name, email, date, and release notes (best for releases).",
        "Lightweight Tag: A simple pointer pointing to a commit without extra metadata.",
        "Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH` format (e.g. `2.4.1`).",
        "Pushing Tags: Tags must be pushed explicitly with `git push origin <tag>` or `--tags`."
      ]
    },
    {
      title: "2. Semantic Versioning (SemVer) Explained",
      explanation: "The global standard for software version numbers:",
      table: {
        headers: ["Segment", "When to Increment", "Example Transition"],
        rows: [
          ["`MAJOR` (X.0.0)", "Incompatible API changes or breaking updates that require consumers to change code", "`1.4.2 -> 2.0.0`"],
          ["`MINOR` (0.X.0)", "Adding new features in a backward-compatible manner (no breaking changes)", "`2.0.0 -> 2.1.0`"],
          ["`PATCH` (0.0.X)", "Backward-compatible bug fixes and security patches", "`2.1.0 -> 2.1.1`"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: GitHub Releases",
      explanation: "A GitHub Release is built directly on top of a Git tag. It pairs the immutable Git tag snapshot with downloadable pre-compiled binary packages, automated changelogs, and release release notes for users.",
      bullets: [
        "Tag is the Foundation: Every GitHub release requires a Git tag.",
        "Release Notes: Documents new features, bugfixes, contributors, and migration guides."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these tagging mistakes:",
      bullets: [
        "Expecting `git push` to Push Tags: Running `git push` pushes ONLY branches! You MUST explicitly run `git push origin v1.0.0` or `git push origin --tags`.",
        "Retagging the Same Version to a New Commit: Changing what `v1.0.0` points to breaks dependency caches worldwide. If you made a fix, increment the patch version to `v1.0.1`!",
        "Using Lightweight Tags for Production Releases: Lightweight tags lack tagger information and release descriptions. Always use annotated tags: `git tag -a`."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Create an annotated tag `v1.0.0` with a release message. View the tag details with `git show v1.0.0`. Push the tag to your remote repository with `git push origin v1.0.0`. In GitHub, create a new Release based on that tag with release notes."
    }
  ],
  questions: [
    {
      id: "q-git-140-1",
      prompt: "What is a Git tag primarily used for?",
      options: [
        { id: "a", label: "To mark a permanent, immovable milestone in project history (such as a production release version like v1.0.0)" },
        { id: "b", label: "To create a new branch" },
        { id: "c", label: "To delete old commits" },
        { id: "d", label: "To format JavaScript code" }
      ],
      correctAnswer: "a",
      explanation: "Tags create permanent, named references to specific commits, typically used to represent released versions of software."
    },
    {
      id: "q-git-140-2",
      prompt: "What is the difference between a lightweight tag and an annotated tag in Git?",
      options: [
        { id: "a", label: "An annotated tag (`git tag -a`) is stored as a full Git object with tagger name, email, date, and message; a lightweight tag is merely a simple pointer to a commit" },
        { id: "b", label: "Lightweight tags only work on Mac" },
        { id: "c", label: "Annotated tags are deleted after 30 days" },
        { id: "d", label: "There is no difference" }
      ],
      correctAnswer: "a",
      explanation: "Annotated tags contain complete cryptographic metadata and release notes, making them the industry standard for production releases."
    },
    {
      id: "q-git-140-3",
      prompt: "According to Semantic Versioning (SemVer), which number should you increment when fixing a bug without breaking backward compatibility?",
      options: [
        { id: "a", label: "The PATCH version (e.g. `1.0.1 -> 1.0.2`)" },
        { id: "b", label: "The MAJOR version (e.g. `1.0.1 -> 2.0.0`)" },
        { id: "c", label: "The MINOR version (e.g. `1.0.1 -> 1.1.0`)" },
        { id: "d", label: "All three numbers simultaneously" }
      ],
      correctAnswer: "a",
      explanation: "SemVer dictates: MAJOR for breaking changes, MINOR for backward-compatible features, and PATCH for backward-compatible bug fixes."
    },
    {
      id: "q-git-140-4",
      prompt: "According to Semantic Versioning, which number must be incremented when introducing breaking changes that require users to update their code?",
      options: [
        { id: "a", label: "The MAJOR version (e.g. `2.4.1 -> 3.0.0`)" },
        { id: "b", label: "The MINOR version" },
        { id: "c", label: "The PATCH version" },
        { id: "d", label: "None; breaking changes are forbidden" }
      ],
      correctAnswer: "a",
      explanation: "A MAJOR bump signals to consumers that the update contains breaking changes or incompatible API modifications."
    },
    {
      id: "q-git-140-5",
      prompt: "Does running a standard `git push origin main` command push your newly created local tags to GitHub?",
      options: [
        { id: "a", label: "No; tags are not pushed automatically and must be explicitly pushed using `git push origin <tagname>` or `git push origin --tags`" },
        { id: "b", label: "Yes, all tags are always pushed with branches" },
        { id: "c", label: "Only annotated tags are pushed automatically" },
        { id: "d", label: "Tags can never be pushed to remotes" }
      ],
      correctAnswer: "a",
      explanation: "By default, `git push` transfers only commits and branch references. Tags must be pushed explicitly."
    },
    {
      id: "q-git-140-6",
      prompt: "What command displays the metadata, author, and commit associated with a specific tag?",
      options: [
        { id: "a", label: "`git show <tagname>`" },
        { id: "b", label: "`git inspect <tagname>`" },
        { id: "c", label: "`git view <tagname>`" },
        { id: "d", label: "`git open <tagname>`" }
      ],
      correctAnswer: "a",
      explanation: "`git show <tag>` displays the tagger name, date, tag message, and the diff of the tagged commit."
    },
    {
      id: "q-git-140-7",
      prompt: "Why is it considered bad practice to delete a published tag and recreate it on a different commit?",
      options: [
        { id: "a", label: "Because package managers and users who already downloaded the tag will have cached the old commit, causing checksum failures and broken builds" },
        { id: "b", label: "Because Git will crash" },
        { id: "c", label: "Because GitHub bans accounts that delete tags" },
        { id: "d", label: "It is technically impossible to delete a tag" }
      ],
      correctAnswer: "a",
      explanation: "Tags represent immutable releases. Overwriting published tags breaks downstream dependency caches. Always increment the version instead."
    },
    {
      id: "q-git-140-8",
      prompt: "How can you tag a historical commit from the past that you forgot to tag at the time?",
      options: [
        { id: "a", label: "`git tag -a v1.0.0 <commit-hash> -m 'Release message'`" },
        { id: "b", label: "You cannot tag past commits" },
        { id: "c", label: "By resetting time in Windows" },
        { id: "d", label: "By creating a pull request" }
      ],
      correctAnswer: "a",
      explanation: "Passing the target commit hash at the end of the `git tag` command attaches the tag to that specific historical commit."
    },
    {
      id: "q-git-140-9",
      prompt: "What is the relationship between a Git tag and a GitHub Release?",
      options: [
        { id: "a", label: "A GitHub Release is a web-based layer built on top of an underlying Git tag, adding release notes and downloadable binary assets" },
        { id: "b", label: "They are completely unrelated and cannot be used together" },
        { id: "c", label: "A GitHub release replaces the need for Git tags" },
        { id: "d", label: "Releases can only be created by Git commands" }
      ],
      correctAnswer: "a",
      explanation: "GitHub Releases enhance Git tags with formatted markdown changelogs, binary asset downloads, and release tracking."
    },
    {
      id: "q-git-140-10",
      prompt: "What command lists all tags matching a specific pattern (like all version 1 releases)?",
      options: [
        { id: "a", label: "`git tag -l 'v1.*'`" },
        { id: "b", label: "`git find tags v1`" },
        { id: "c", label: "`git show v1`" },
        { id: "d", label: "`git filter tags v1`" }
      ],
      correctAnswer: "a",
      explanation: "`git tag -l <pattern>` lists tags filtered by wildcards, such as `v1.*` or `*-beta`."
    }
  ]
};

// LESSON 141: GITHUB COLLABORATION AND PERMISSIONS
const lesson141: CurriculumItem = {
  id: "item-git-141-github-collaboration-permissions",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Module 4: Team Workflows and Recovery",
  modulePosition: 4,
  title: "141. GitHub Collaboration and Permissions",
  duration: "30 mins",
  type: "cheatsheet",
  position: 2,
  contentHeading: "Lesson 141: GitHub Collaboration and Permissions",
  contentDescription: "Master team collaboration controls: repository permission tiers (Read, Triage, Write, Maintain, Admin), diagnosing HTTP 403 Forbidden errors, SSH authentication vs Personal Access Tokens (PAT), and branch protection rules.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Test SSH connection to GitHub servers
ssh -T git@github.com
# Expected output:
# Hi username! You've successfully authenticated, but GitHub does not provide shell access.

# 2. Check remote repository configuration and active upstream
git remote -v
git branch -vv

# 3. Diagnosing HTTP 403 Forbidden on git push:
# - Check which account you are authenticated with:
# gh auth status (if using GitHub CLI)
# - Verify you have Write or Admin collaborator permission on the target repository!`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Keycards at an Office Building",
      explanation: "Imagine a modern corporate headquarters. When you walk up to the front glass door, you swipe your electronic keycard (SSH Key or Personal Access Token). That proves WHO you are (Authentication). Once inside, the security computer looks up your role in the company directory (Authorization). If you are an intern, your keycard opens the 1st-floor breakroom (Read Access). It will NOT open the 10th-floor Executive Boardroom (Write/Admin Access)! If you try to swipe into the boardroom, the door beeps red: '403 Forbidden!'. That is GitHub permissions: your SSH key proves your identity, but the repository owner must grant you 'Write' permission before you can push code!",
      bullets: [
        "Authentication: Proving identity via SSH keys or Personal Access Tokens (passwords are disabled for git push).",
        "Permission Tiers: Read, Triage, Write, Maintain, Admin.",
        "HTTP 403 Forbidden: You are authenticated, but lack authorization/collaborator permission on the repository."
      ]
    },
    {
      title: "2. GitHub Permission Levels Explained",
      explanation: "Understanding the 5 standard collaborator tiers on GitHub:",
      table: {
        headers: ["Permission Tier", "What the User Can Do", "Best For"],
        rows: [
          ["Read", "Clone, view code, open issues, fork", "Public open-source visitors, auditors"],
          ["Triage", "Manage issues and PR labels without write access", "Bug triagers, community managers"],
          ["Write", "Push to branches, merge non-protected PRs", "Core development team members"],
          ["Maintain", "Manage repository settings without sensitive actions", "Team leads, project managers"],
          ["Admin", "Full access: delete repo, manage collaborators, configure branch protection", "Repository owners and engineering directors"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Branch Protection Rules",
      explanation: "On production branches (like `main`), teams configure Branch Protection Rules on GitHub:",
      bullets: [
        "Require a pull request before merging (prohibits direct pushes to main).",
        "Require at least 1 or 2 approving code reviews from designated code owners.",
        "Require status checks (CI tests, linting) to pass before merging.",
        "Require linear history or signed commits."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these permission and authentication errors:",
      bullets: [
        "Using GitHub Password in Terminal: GitHub deprecated password authentication for Git in 2021. You must use SSH keys or a Personal Access Token (PAT).",
        "Pushing with Wrong Account: Having personal and work GitHub accounts on the same computer. Configure `~/.ssh/config` to manage multiple keys.",
        "Sharing Access Tokens: Never post a Personal Access Token in Slack or commit it to a repository."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Generate an SSH key using `ssh-keygen -t ed25519`. Add the public key to your GitHub account settings. Test your connection with `ssh -T git@github.com`. On your test repository, configure a branch protection rule on `main` that requires a pull request and at least 1 approval."
    }
  ],
  questions: [
    {
      id: "q-git-141-1",
      prompt: "What does an HTTP 403 Forbidden error during `git push` usually indicate?",
      options: [
        { id: "a", label: "You are successfully authenticated, but your account lacks Write or Admin collaborator permission on the target repository" },
        { id: "b", label: "The repository has been permanently deleted" },
        { id: "c", label: "Your computer has a virus" },
        { id: "d", label: "Git is not installed" }
      ],
      correctAnswer: "a",
      explanation: "403 Forbidden indicates valid identity authentication, but insufficient authorization permission to write to the repository."
    },
    {
      id: "q-git-141-2",
      prompt: "Can you use your GitHub account password to authenticate `git push` operations in terminal?",
      options: [
        { id: "a", label: "No; GitHub deprecated password authentication in 2021 in favor of SSH keys or Personal Access Tokens (PATs)" },
        { id: "b", label: "Yes, passwords are the only method supported" },
        { id: "c", label: "Only on Windows" },
        { id: "d", label: "Only if your password has 20 characters" }
      ],
      correctAnswer: "a",
      explanation: "GitHub requires token-based authentication (Personal Access Tokens or SSH keys) for all Git operations to prevent credential theft."
    },
    {
      id: "q-git-141-3",
      prompt: "Which GitHub repository permission tier allows developers to push commits and open/merge pull requests?",
      options: [
        { id: "a", label: "Write" },
        { id: "b", label: "Read" },
        { id: "c", label: "Triage" },
        { id: "d", label: "Guest" }
      ],
      correctAnswer: "a",
      explanation: "The 'Write' permission tier is standard for active developers, granting push and merge rights to non-protected branches."
    },
    {
      id: "q-git-141-4",
      prompt: "What is a 'Branch Protection Rule' in GitHub?",
      options: [
        { id: "a", label: "A repository security setting that enforces workflow rules on key branches (e.g. requiring PRs, passing CI tests, and peer reviews before merging into main)" },
        { id: "b", label: "An antivirus software for Git" },
        { id: "c", label: "A password on a branch" },
        { id: "d", label: "A rule that deletes old branches" }
      ],
      correctAnswer: "a",
      explanation: "Branch protection rules safeguard production branches from direct pushes, unreviewed code, and failing test builds."
    },
    {
      id: "q-git-141-5",
      prompt: "What command verifies that your local machine's SSH key is recognized by GitHub?",
      options: [
        { id: "a", label: "`ssh -T git@github.com`" },
        { id: "b", label: "`git ping github`" },
        { id: "c", label: "`ssh connect github`" },
        { id: "d", label: "`git verify ssh`" }
      ],
      correctAnswer: "a",
      explanation: "`ssh -T git@github.com` attempts an SSH handshake and prints a personalized greeting if authentication succeeds."
    },
    {
      id: "q-git-141-6",
      prompt: "What is the difference between a private SSH key (`id_ed25519`) and a public SSH key (`id_ed25519.pub`)?",
      options: [
        { id: "a", label: "The private key must NEVER leave your computer; the public key is uploaded to GitHub to verify your cryptographic signatures" },
        { id: "b", label: "The private key is for GitHub; the public key is for your computer" },
        { id: "c", label: "They are identical files" },
        { id: "d", label: "Public keys are deprecated" }
      ],
      correctAnswer: "a",
      explanation: "Public-key cryptography relies on keeping the private key secret on your machine, while sharing the public key with servers to verify identity."
    },
    {
      id: "q-git-141-7",
      prompt: "What is a Personal Access Token (PAT) in GitHub?",
      options: [
        { id: "a", label: "A revocable, scoped credential string used in place of a password for authenticating Git operations over HTTPS" },
        { id: "b", label: "A physical plastic keycard" },
        { id: "c", label: "A user profile picture" },
        { id: "d", label: "A Bitcoin token" }
      ],
      correctAnswer: "a",
      explanation: "PATs provide fine-grained, time-limited credentials for authenticating API and Git HTTPS operations without exposing account passwords."
    },
    {
      id: "q-git-141-8",
      prompt: "How can open-source contributors submit code changes to a repository where they do NOT have Write permissions?",
      options: [
        { id: "a", label: "By 'Forking' the repository to their own account, making changes in a branch on their fork, and opening a Pull Request back to the original repository" },
        { id: "b", label: "By emailing the files to the owner" },
        { id: "c", label: "It is impossible to contribute without write permission" },
        { id: "d", label: "By hacking the repository" }
      ],
      correctAnswer: "a",
      explanation: "The Fork-and-Pull-Request model allows anyone to contribute without needing direct write access to the upstream repository."
    },
    {
      id: "q-git-141-9",
      prompt: "What happens if someone attempts to `git push` directly to a protected branch that requires pull requests?",
      options: [
        { id: "a", label: "GitHub rejects the push with an error message: 'Protected branch: changes must be made through a pull request'" },
        { id: "b", label: "The branch is deleted" },
        { id: "c", label: "The push succeeds anyway" },
        { id: "d", label: "The developer's account is locked" }
      ],
      correctAnswer: "a",
      explanation: "Branch protection rules are enforced at the server level, preventing direct pushes from bypassing quality gates."
    },
    {
      id: "q-git-141-10",
      prompt: "What is CODEOWNERS in GitHub?",
      options: [
        { id: "a", label: "A special configuration file (`.github/CODEOWNERS`) that automatically requests reviews from specific team members when files they own are modified" },
        { id: "b", label: "A list of copyright holders" },
        { id: "c", label: "A list of paid subscribers" },
        { id: "d", label: "A command to buy software" }
      ],
      correctAnswer: "a",
      explanation: "`CODEOWNERS` maps code directories to responsible individuals or teams, automating PR review assignments."
    }
  ]
};

// LESSON 142: TEAM WORKFLOW AND PROJECT HYGIENE
const lesson142: CurriculumItem = {
  id: "item-git-142-workflow-project-hygiene",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Module 4: Team Workflows and Recovery",
  modulePosition: 4,
  title: "142. Team Workflow and Project Hygiene",
  duration: "30 mins",
  type: "cheatsheet",
  position: 3,
  contentHeading: "Lesson 142: Team Workflow and Project Hygiene",
  contentDescription: "Master standard collaborative engineering workflows: GitHub Flow vs GitFlow, keeping main deployable at all times, documentation hygiene (README, LICENSE, CONTRIBUTING), and pre-commit linting hooks (Husky).",
  codeSnippet: {
    language: "bash",
    code: `# Standard GitHub Flow:
# 1. Main is ALWAYS deployable and protected
# 2. Create feature branch from latest main
git switch main
git pull origin main
git switch -c feature/course-reviews

# 3. Work in focused, atomic commits
git add src/
git commit -m "Add star rating review component"

# 4. Push to remote and open Pull Request for review and CI checks
git push -u origin feature/course-reviews

# 5. Merge PR into main and deploy to production immediately`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: Operating a Clean Professional Kitchen",
      explanation: "In a five-star restaurant, chefs don't chop raw chicken on the main serving counter while dirty pots pile up in the sink. The main counter (`main` branch) is kept spotlessly clean and ready to plate meals at any second! Prep cooks work on isolated cutting boards (feature branches). When vegetables are chopped and inspected (code review + CI tests), they are brought to the main counter. After a dish is served, the cutting board is washed and put away (branch deleted). 'Project Hygiene' means keeping your repository clean, documented, tested, and deployable at any moment of the day!",
      bullets: [
        "Deployable `main`: The `main` branch must always compile, pass tests, and be ready for immediate production release.",
        "GitHub Flow: The modern standard: short-lived feature branches, fast PRs, automated CI testing, and continuous deployment.",
        "Repository Documentation: `README.md`, `CONTRIBUTING.md`, and `LICENSE` files."
      ]
    },
    {
      title: "2. GitHub Flow vs Traditional GitFlow",
      explanation: "Comparing modern workflows with legacy branching models:",
      table: {
        headers: ["Workflow Model", "Characteristics", "When to Use"],
        rows: [
          ["GitHub Flow (Modern Standard)", "Single `main` branch + short-lived feature branches + PRs + continuous deployment", "SaaS, web applications, rapid continuous releases, modern Agile teams"],
          ["GitFlow (Legacy / Heavy)", "Multiple permanent branches (`master`, `develop`, `release/*`, `hotfix/*`)", "Traditional boxed software, mobile apps with strict scheduled app store release cycles"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Pre-Commit Hooks (Husky & Lint-Staged)",
      explanation: "Human discipline alone is not enough. Teams use automated Git hooks (via Husky) to enforce quality gates locally before code can even be committed:",
      bullets: [
        "Pre-commit Hook: Runs ESLint and Prettier on staged files before allowing a commit to be created.",
        "Pre-push Hook: Executes test suites (`npm test`) before allowing code to be pushed to GitHub.",
        "Prevents Broken Code: Catches syntax errors before they ever leave the developer's laptop."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these team hygiene traps:",
      bullets: [
        "Breaking `main`: Merging broken code that causes other developers' builds to fail. Treat breaking `main` as an emergency priority.",
        "Missing Setup Documentation: A project with no README instructions on how to install or run tests. New hires waste 3 days just setting up their laptops.",
        "Leaving Dead Branches: Never deleting feature branches after merging. Clean up local and remote merged branches."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Write a team workflow checklist for a 5-person engineering team. Include rules for branch naming, commit message conventions, PR review requirements, and pre-commit linting rules. Create a professional `README.md` with setup steps, test execution, and deployment instructions."
    }
  ],
  questions: [
    {
      id: "q-git-142-1",
      prompt: "What is the core principle of the modern 'GitHub Flow' branching model?",
      options: [
        { id: "a", label: "The `main` branch is always stable and deployable; all work is done in short-lived feature branches merged via reviewed and tested Pull Requests" },
        { id: "b", label: "Never use branches" },
        { id: "c", label: "Deploy to production only once every 2 years" },
        { id: "d", label: "Commit all code directly to main without review" }
      ],
      correctAnswer: "a",
      explanation: "GitHub Flow is a lightweight, branch-based workflow that supports continuous delivery where `main` remains deployable at all times."
    },
    {
      id: "q-git-142-2",
      prompt: "Why should feature branches be short-lived (merged within 1-3 days)?",
      options: [
        { id: "a", label: "To prevent large divergences from `main`, minimize merge conflicts, and deliver small, testable increments of value quickly" },
        { id: "b", label: "Because Git branches automatically expire after 72 hours" },
        { id: "c", label: "To save server disk space" },
        { id: "d", label: "Because Git only supports 5 branches at a time" }
      ],
      correctAnswer: "a",
      explanation: "Long-lived branches drift away from `main`, accumulating massive merge conflicts and integration hurdles."
    },
    {
      id: "q-git-142-3",
      prompt: "What is the purpose of Git hooks (such as Husky pre-commit hooks)?",
      options: [
        { id: "a", label: "To automate local quality checks (like linting, formatting, or running tests) before allowing commits or pushes to execute" },
        { id: "b", label: "To hook the computer to a wall outlet" },
        { id: "c", label: "To download movies" },
        { id: "d", label: "To create sound effects on commit" }
      ],
      correctAnswer: "a",
      explanation: "Git hooks execute custom scripts automatically at key execution points (like pre-commit), catching formatting and linting errors early."
    },
    {
      id: "q-git-142-4",
      prompt: "What should a professional `README.md` file contain in a software repository?",
      options: [
        { id: "a", label: "Project description, prerequisites, installation steps, development commands (`npm run dev`), testing instructions, and deployment guides" },
        { id: "b", label: "Only the author's biography" },
        { id: "c", label: "A list of computer hardware specifications" },
        { id: "d", label: "A copy of Wikipedia" }
      ],
      correctAnswer: "a",
      explanation: "A good README serves as the project front door, allowing new developers and contributors to onboard and run the application quickly."
    },
    {
      id: "q-git-142-5",
      prompt: "What is the purpose of a `CONTRIBUTING.md` file in an open-source or team project?",
      options: [
        { id: "a", label: "To explain the guidelines, coding standards, branch conventions, and testing requirements for submitting pull requests" },
        { id: "b", label: "To list financial donations" },
        { id: "c", label: "To sell software licenses" },
        { id: "d", label: "To track employee salaries" }
      ],
      correctAnswer: "a",
      explanation: "`CONTRIBUTING.md` outlines expectations and standards for external and internal contributors proposing changes."
    },
    {
      id: "q-git-142-6",
      prompt: "Why should merged feature branches be deleted locally and remotely?",
      options: [
        { id: "a", label: "To maintain repository hygiene, avoid clutter, and prevent confusion over which branches are actively in development" },
        { id: "b", label: "Because Git will stop working if you have more than 10 branches" },
        { id: "c", label: "Deleting a branch deletes its commits from history" },
        { id: "d", label: "GitHub requires branch deletion" }
      ],
      correctAnswer: "a",
      explanation: "Once merged, the commits are permanently preserved on `main`. Deleting stale branch pointers keeps the branch list clean."
    },
    {
      id: "q-git-142-7",
      prompt: "What command prunes local remote-tracking branches that have been deleted on GitHub?",
      options: [
        { id: "a", label: "`git fetch --prune`" },
        { id: "b", label: "`git clean branches`" },
        { id: "c", label: "`git delete stale`" },
        { id: "d", label: "`git remove dead`" }
      ],
      correctAnswer: "a",
      explanation: "`git fetch --prune` removes stale remote-tracking branches (e.g. `origin/old-feature`) that no longer exist on the remote server."
    },
    {
      id: "q-git-142-8",
      prompt: "What is the Golden Rule of production branch stability for software engineering teams?",
      options: [
        { id: "a", label: "`main` must ALWAYS be in a green, deployable, fully tested state; never merge code that breaks tests or compilation" },
        { id: "b", label: "Break things fast and fix them next month" },
        { id: "c", label: "Only test in production" },
        { id: "d", label: "Never write unit tests" }
      ],
      correctAnswer: "a",
      explanation: "Maintaining a deployable `main` allows teams to release hotfixes and updates at any time with total confidence."
    },
    {
      id: "q-git-142-9",
      prompt: "What is a `LICENSE` file in an open-source repository?",
      options: [
        { id: "a", label: "A legal document that defines the permissions, rights, and restrictions on how others can use, copy, modify, or distribute the software (e.g. MIT, Apache 2.0)" },
        { id: "b", label: "A driver's license" },
        { id: "c", label: "A software receipt" },
        { id: "d", label: "A computer warranty" }
      ],
      correctAnswer: "a",
      explanation: "Without an open-source license, default copyright laws apply and nobody has legal permission to use or modify the code."
    },
    {
      id: "q-git-142-10",
      prompt: "How can teams enforce consistent code formatting across all developers automatically?",
      options: [
        { id: "a", label: "Using Prettier configured with an automated pre-commit hook or CI check" },
        { id: "b", label: "Arguing in code reviews about tabs vs spaces" },
        { id: "c", label: "Writing all code on one line" },
        { id: "d", label: "Banning formatting tools" }
      ],
      correctAnswer: "a",
      explanation: "Automated formatters like Prettier eliminate bike-shedding and style debates in PRs by formatting code consistently on save or commit."
    }
  ]
};

// LESSON 143: REFLOG AND RECOVERING LOST COMMITS
const lesson143: CurriculumItem = {
  id: "item-git-143-reflog-recovering-commits",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Module 4: Team Workflows and Recovery",
  modulePosition: 4,
  title: "143. Reflog and Recovering Lost Commits",
  duration: "30 mins",
  type: "cheatsheet",
  position: 4,
  contentHeading: "Lesson 143: Reflog and Recovering Lost Commits",
  contentDescription: "Master Git's ultimate safety net: inspecting HEAD reference movements with git reflog, rescuing 'lost' commits after accidental resets or branch deletions, and understanding Git garbage collection.",
  codeSnippet: {
    language: "bash",
    code: `# 1. Disaster Strikes: Accidental reset or deleted branch!
# git reset --hard HEAD~2  (Accidentally wiped last 2 commits!)

# 2. Open Git's Local Flight Data Recorder (reflog)
git reflog

# Sample Reflog Output:
# a1b2c3d HEAD@{0}: reset: moving to HEAD~2
# e4f5g6h HEAD@{1}: commit: Add complete student gradebook feature  <-- LOST COMMIT!
# 7i8j9k0 HEAD@{2}: commit: Add course reviews

# 3. Rescue the lost commit by creating a recovery branch at that exact SHA:
git switch -c rescue-branch e4f5g6h

# All "lost" code is completely restored!`
  },
  sections: [
    {
      title: "1. Professor's Simple Analogy: The Airplane Flight Data Recorder (Black Box)",
      explanation: "Imagine an airplane with a pilot. If the pilot accidentally flies in the wrong direction or loses their navigation chart, they don't panic—the airplane has a tamper-proof 'Black Box' flight data recorder! The black box records every single move the controls made: 10:01 AM pilot turned left, 10:04 AM pilot adjusted altitude. In Git, `git reflog` is your indestructible black box! Even if you run `git reset --hard` or delete an entire branch, Git does NOT immediately delete the commit objects from disk. Git records every single movement of the `HEAD` pointer in the reflog. As long as you can find the commit hash in `git reflog`, you can rescue your code in 10 seconds!",
      bullets: [
        "`git reflog`: The local reference log recording every time `HEAD` moved (commits, checkouts, resets, merges, rebases).",
        "Orphaned Commits: Commits detached from a branch still survive in the `.git` database for at least 30 to 90 days before garbage collection.",
        "Recovery Protocol: Identify commit hash in `git reflog` -> run `git switch -c recovery-branch <hash>`."
      ]
    },
    {
      title: "2. What `git reflog` Tracks vs `git log`",
      explanation: "The crucial difference between the two logs:",
      table: {
        headers: ["Log Tool", "What It Shows", "Can It Find Deleted/Reset Commits?"],
        rows: [
          ["`git log`", "Shows only reachable commits in the active branch history graph", "NO — if you reset backward, the abandoned commits vanish from `git log`"],
          ["`git reflog`", "Shows chronological diary of every move HEAD made on your local machine", "YES! Shows the exact hash right before the reset occurred"]
        ]
      }
    },
    {
      title: "3. Concept in Depth: Git Garbage Collection (`git gc`)",
      explanation: "Git does not immediately delete discarded objects. Commits that have no branch pointing to them are called 'dangling' or 'unreachable' objects. Git keeps unreachable objects for at least 30 days (and tracked objects for 90 days) before running automatic garbage collection (`git gc`). That gives you a 30-day safety net to rescue lost work!",
      bullets: [
        "Safety Window: You have weeks to rescue an accidentally deleted commit.",
        "Local Only: Reflogs are completely local to your computer and are never pushed to GitHub."
      ]
    },
    {
      title: "4. Common Pitfalls & How to Avoid Them",
      explanation: "Avoid these recovery traps:",
      bullets: [
        "Relying on Reflog for Uncommitted Work: `git reflog` ONLY tracks commits! If you had uncommitted edits in your working directory and ran `reset --hard`, the reflog cannot rescue them.",
        "Assuming Reflog Syncs Across Computers: Reflogs are strictly local to your specific machine. You cannot inspect your teammate's reflog on GitHub.",
        "Overwriting Recovery Branches: When rescuing a commit, always create a BRAND NEW branch: `git switch -c recovery-branch <hash>`."
      ]
    },
    {
      title: "5. Hands-on Practice Lab Challenge",
      explanation: "Lab Prompt: Make a commit with a test file. Run `git reset --hard HEAD~1` to simulate an accidental deletion. Observe that `git log` shows the commit is gone. Open `git reflog`, locate the commit hash, and rescue it by running `git switch -c restored-branch <hash>`. Verify all files are recovered."
    }
  ],
  questions: [
    {
      id: "q-git-143-1",
      prompt: "What is `git reflog` in Git?",
      options: [
        { id: "a", label: "A local log recording every movement of HEAD and branch references on your machine, enabling recovery of seemingly lost commits" },
        { id: "b", label: "A list of all remote GitHub repositories" },
        { id: "c", label: "A tool to delete branches permanently" },
        { id: "d", label: "A list of user passwords" }
      ],
      correctAnswer: "a",
      explanation: "`git reflog` (reference log) acts as an audit trail of every time HEAD updated, providing a safety net to find discarded commits."
    },
    {
      id: "q-git-143-2",
      prompt: "If you accidentally delete a branch containing commits, or run `git reset --hard HEAD~1`, how can you rescue the lost commits?",
      options: [
        { id: "a", label: "Find the commit hash in `git reflog` and create a new branch at that commit using `git switch -c rescue-branch <commit-hash>`" },
        { id: "b", label: "Re-install Git" },
        { id: "c", label: "Call GitHub customer support" },
        { id: "d", label: "The commits are permanently destroyed immediately" }
      ],
      correctAnswer: "a",
      explanation: "Even when a branch pointer is deleted, the commit objects remain in Git's database and can be rescued by creating a new branch at their SHA."
    },
    {
      id: "q-git-143-3",
      prompt: "Can `git reflog` recover changes that were NEVER committed (only saved in the working directory before running `git reset --hard`)?",
      options: [
        { id: "a", label: "No; reflog only tracks commits and reference movements; uncommitted edits that were never committed or stashed cannot be recovered" },
        { id: "b", label: "Yes, Git saves every keystroke" },
        { id: "c", label: "Yes, via Windows cache" },
        { id: "d", label: "Only if the file is smaller than 1KB" }
      ],
      correctAnswer: "a",
      explanation: "Git's safety nets only apply to data written into Git's object database via commits or stashes. Uncommitted working files cannot be recovered."
    },
    {
      id: "q-git-143-4",
      prompt: "Are reflogs transferred to remote repositories when you run `git push`?",
      options: [
        { id: "a", label: "No; reflogs are strictly local to your machine and are never shared or pushed to remotes" },
        { id: "b", label: "Yes, all reflogs are visible to teammates on GitHub" },
        { id: "c", label: "Only if you use `--tags`" },
        { id: "d", label: "Reflogs are public to the entire internet" }
      ],
      correctAnswer: "a",
      explanation: "Reflogs record local actions on a specific computer and are never synchronized across networks."
    },
    {
      id: "q-git-143-5",
      prompt: "What is an 'orphaned' or 'unreachable' commit in Git?",
      options: [
        { id: "a", label: "A commit that exists in the `.git` database but has no active branch or tag reference pointing to it" },
        { id: "b", label: "A commit written by an unknown author" },
        { id: "c", label: "A commit that has a merge conflict" },
        { id: "d", label: "A commit with no commit message" }
      ],
      correctAnswer: "a",
      explanation: "An unreachable commit is detached from any branch or tag, but remains intact in the object store until pruned by garbage collection."
    },
    {
      id: "q-git-143-6",
      prompt: "How long does Git typically retain unreachable commits in the local database before pruning them during garbage collection (`git gc`)?",
      options: [
        { id: "a", label: "At least 30 days by default (and 90 days for reflog-reachable objects)" },
        { id: "b", label: "10 seconds" },
        { id: "c", label: "Forever (Git never deletes anything)" },
        { id: "d", label: "24 hours" }
      ],
      correctAnswer: "a",
      explanation: "Git maintains a generous retention grace period (default 30-90 days), giving developers ample time to rescue discarded commits."
    },
    {
      id: "q-git-143-7",
      prompt: "What does `HEAD@{1}` represent in `git reflog`?",
      options: [
        { id: "a", label: "The position of `HEAD` prior to the most recent action (one step back in reference history)" },
        { id: "b", label: "Commit number 1 in the repository" },
        { id: "c", label: "The root branch" },
        { id: "d", label: "The current branch" }
      ],
      correctAnswer: "a",
      explanation: "`HEAD@{n}` represents where HEAD was `n` reference movements ago."
    },
    {
      id: "q-git-143-8",
      prompt: "What does 'detached HEAD' mean in Git?",
      options: [
        { id: "a", label: "You have checked out a specific commit hash directly rather than a named branch; new commits will not belong to any branch unless a branch is created" },
        { id: "b", label: "Your Git installation is broken" },
        { id: "c", label: "The repository has no branches" },
        { id: "d", label: "The computer has lost internet connection" }
      ],
      correctAnswer: "a",
      explanation: "In a detached HEAD state, HEAD points directly to a commit instead of a branch reference."
    },
    {
      id: "q-git-143-9",
      prompt: "How do you preserve commits made while in a 'detached HEAD' state before switching branches?",
      options: [
        { id: "a", label: "Run `git switch -c <new-branch-name>` to create and attach a named branch pointer to the current commit" },
        { id: "b", label: "Run `git reset --hard`" },
        { id: "c", label: "Delete the `.git` folder" },
        { id: "d", label: "It cannot be saved" }
      ],
      correctAnswer: "a",
      explanation: "Creating a branch with `git switch -c <name>` anchors the commits to a named reference, preventing them from becoming orphaned."
    },
    {
      id: "q-git-143-10",
      prompt: "What is the primary takeaway regarding data safety in Git?",
      options: [
        { id: "a", label: "Once code has been committed to Git, it is almost impossible to lose permanently unless you wait 30 days or delete the `.git` folder" },
        { id: "b", label: "Git loses code frequently" },
        { id: "c", label: "You should never use reset" },
        { id: "d", label: "Only cloud backups are safe" }
      ],
      correctAnswer: "a",
      explanation: "Git's append-only object database and local reflog make committed work virtually impossible to lose by accident."
    }
  ]
};

// MODULE 4 QUIZ
const gitModule04Quiz: CurriculumItem = {
  id: "item-git-mod04-quiz",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Module 4: Team Workflows and Recovery",
  modulePosition: 4,
  title: "Module 4 Assessment: Team Workflows & Recovery MCQs",
  duration: "25 mins",
  type: "quiz",
  position: 5,
  isModuleQuiz: true,
  contentHeading: "Module 4 Quiz: Releases, Permissions, Hygiene & Reflog Recovery",
  contentDescription: "Evaluate your comprehensive mastery of advanced team workflows and recovery: Git tags, Semantic Versioning (SemVer), GitHub permission tiers, 403 Forbidden diagnostics, SSH authentication, GitHub Flow, repository hygiene, branch protection rules, and reflog commit recovery.",
  questions: [
    ...(lesson140.questions || []).slice(0, 3),
    ...(lesson141.questions || []).slice(0, 3),
    ...(lesson142.questions || []).slice(0, 2),
    ...(lesson143.questions || []).slice(0, 2)
  ]
};

// MODULE 4 ASSESSMENT (LAB)
const gitModule04Assessment: CurriculumItem = {
  id: "item-git-mod04-lab",
  subCourseId: "mod-git-basics",
  subCourseTitle: "Git Fundamentals",
  subCoursePosition: 6,
  moduleId: "module-git-04-workflows-recovery",
  moduleTitle: "Module 4: Team Workflows and Recovery",
  modulePosition: 4,
  title: "Module 4 Lab: Release Tagging & Reflog Disaster Recovery",
  duration: "45 mins",
  type: "assignment",
  position: 6,
  isModuleAssessment: true,
  contentHeading: "Module 4 Lab Project: Release Tagging & Reflog Disaster Recovery",
  contentDescription: "Execute release tagging with SemVer, simulate an accidental hard reset disaster, use git reflog to trace the lost commit SHA, and rescue the commit onto a dedicated recovery branch.",
  assignmentPrompt: {
    instructions: "Perform professional release management and disaster recovery:\n1. Semantic Versioning: Create an annotated tag `v1.0.0` with a release message and push it with `git push origin v1.0.0`.\n2. Simulate Disaster: Create a commit with a critical feature, note its message, and run `git reset --hard HEAD~1` to simulate an accidental wipeout.\n3. Verify Loss: Run `git log` and confirm the commit has disappeared from the branch history.\n4. Reflog Investigation: Run `git reflog`, identify the action and commit hash right before the reset occurred.\n5. Rescue Operation: Run `git switch -c recovery-feature <hash>` and confirm that all files and commits are fully restored.",
    deliverables: [
      "Terminal log transcript showing `git tag -a`, `git reset --hard`, and `git reflog` rescue sequence",
      "Git log confirming the rescued commit is active on `recovery-feature`",
      "Brief post-mortem writeup explaining how reflog protects against data loss"
    ]
  }
};

export const gitModule04: CurriculumSubModule = {
  id: "module-git-04-workflows-recovery",
  subCourseId: "mod-git-basics",
  title: "Module 4 — Team Workflows and Recovery",
  description: "Master enterprise Git governance: release tagging with SemVer, GitHub team permissions and security, repository hygiene checklists, and disaster recovery using git reflog.",
  position: 4,
  items: [
    lesson140,
    lesson141,
    lesson142,
    lesson143,
    gitModule04Quiz,
    gitModule04Assessment
  ]
};
