import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// UI/UX DESIGN CURRICULUM
// 6 Sequential Sub-Courses with Deep Lessons, Assessments & Capstone
// =========================================================================

// --- SUB-COURSE 1: UX Research & User-Centered Design Thinking ---
const uiuxMod1_1: CurriculumSubModule = {
  id: "mod-uiux-1-1",
  subCourseId: "subcourse-uiux-research",
  title: "Design Thinking & Qualitative User Research",
  position: 1,
  duration: "3.5 hours",
  items: [
    {
      id: "uiux-res-001",
      moduleId: "mod-uiux-1-1",
      moduleTitle: "Design Thinking & Qualitative User Research",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-research",
      subCourseTitle: "UX Research & Design Thinking Foundations",
      subCoursePosition: 1,
      title: "The 5 Stages of Design Thinking, User Interviews & Empathy Maps",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Foundations of Human-Centered Product Design",
      contentDescription: "Master the 5 stages of Design Thinking (Empathize, Define, Ideate, Prototype, Test), qualitative user interviewing techniques, synthesizing raw feedback into Empathy Maps, and creating actionable User Personas.",
      sections: [
        {
          title: "The Stanford d.school Design Thinking Methodology",
          explanation: "Design thinking is a non-linear, iterative methodology used to understand users, challenge assumptions, redefine problems, and create innovative prototype solutions.",
          bullets: [
            "Empathize: Conduct non-leading open interviews to understand emotional pain points and motivations.",
            "Define: Formulate a Point of View (POV) statement using the 'How Might We' (HMW) framework.",
            "Ideate: Generate divergent solutions using Crazy Eights and Mind Mapping before converging.",
            "Prototype: Build rapid throwaway artifacts (paper or low-fi Figma wireframes) to test hypotheses.",
            "Test: Observe users interacting with prototypes without coaching or intervening."
          ]
        }
      ],
      questions: [
        {
          id: "q-uiux-res-1",
          prompt: "What is the primary danger of asking leading questions (e.g. 'Don't you think this feature would save you time?') during a user research interview?",
          options: [
            { id: "a", label: "It introduces severe observer confirmation bias and social desirability bias, leading to false validation of flawed ideas" },
            { id: "b", label: "It makes the interview take twice as long" },
            { id: "c", label: "It crashes Figma" },
            { id: "d", label: "Users are legally prohibited from answering leading questions" }
          ],
          correctIndex: 0,
          explanation: "Leading questions prompt participants to agree with the interviewer out of politeness, destroying empirical validity and masking real user friction."
        }
      ]
    },
    {
      id: "uiux-res-quiz-1",
      moduleId: "mod-uiux-1-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-research",
      subCourseTitle: "UX Research & Design Thinking Foundations",
      subCoursePosition: 1,
      title: "Sub-Course Assessment: User Research & Empathy Synthesis",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Qualitative Synthesis, Journey Maps & Personas",
      contentDescription: "Evaluate your capability to identify cognitive biases, translate observational notes into customer journey stages, and formulate 'How Might We' problem statements.",
      questions: [
        {
          id: "q-uiux-res-2",
          prompt: "What are the 4 quadrants of a standard user Empathy Map?",
          options: [
            { id: "a", label: "Red, Blue, Green, Yellow" },
            { id: "b", label: "Says, Thinks, Does, Feels" },
            { id: "c", label: "HTML, CSS, JavaScript, SQL" },
            { id: "d", label: "Income, Age, Location, Device" }
          ],
          correctIndex: 1,
          explanation: "An Empathy Map synthesizes user research across what the user Says (direct quotes), Thinks (internal beliefs), Does (observable actions), and Feels (emotional state)."
        }
      ]
    }
  ]
};

export const uiuxSubCourse1: CurriculumSubCourse = {
  id: "subcourse-uiux-research",
  title: "UX Research & Design Thinking Foundations",
  position: 1,
  duration: "4.5 hours",
  description: "Master human-centered design thinking, conduct unmoderated and moderated user interviews, synthesize qualitative data into empathy maps, and frame 'How Might We' challenges.",
  modules: [uiuxMod1_1],
  items: [...uiuxMod1_1.items]
};

// --- SUB-COURSE 2: Information Architecture & Wireframing ---
const uiuxMod2_1: CurriculumSubModule = {
  id: "mod-uiux-2-1",
  subCourseId: "subcourse-uiux-ia",
  title: "User Flows, Site Maps & Low-Fi Wireframing",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "uiux-ia-001",
      moduleId: "mod-uiux-2-1",
      moduleTitle: "User Flows, Site Maps & Low-Fi Wireframing",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-ia",
      subCourseTitle: "Information Architecture & Wireframing",
      subCoursePosition: 2,
      title: "Site Hierarchies, Card Sorting, User Task Flows & Wireframes",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Structuring Intuitive Software: IA, Task Flows & Low-Fidelity Layouts",
      contentDescription: "Learn open and closed card sorting, tree testing, designing frictionless user task flows with decision nodes, and constructing low-fidelity wireframes in Figma.",
      sections: [
        {
          title: "User Task Flow Anatomy",
          explanation: "Task flows map the sequential steps a user takes to achieve a concrete goal (e.g. onboard into an LMS, checkout a cart, or invite a teammate).",
          bullets: [
            "Start / End: Pill-shaped boundary nodes indicating trigger and terminal states.",
            "Process Steps: Rectangles representing user actions or system operations.",
            "Decision Points: Diamonds indicating branching conditions (e.g. Is user authenticated? Yes/No).",
            "Error Loops: Explicit alternative paths guiding users back to recovery states."
          ]
        }
      ],
      questions: [
        {
          id: "q-uiux-ia-1",
          prompt: "What is the difference between open card sorting and closed card sorting in Information Architecture?",
          options: [
            { id: "a", label: "Open card sorting allows participants to create their own category labels; closed card sorting provides predefined category buckets for participants to sort into" },
            { id: "b", label: "Open card sorting is done outdoors" },
            { id: "c", label: "Closed card sorting only uses 2 cards" },
            { id: "d", label: "Open card sorting is automated with AI" }
          ],
          correctIndex: 0,
          explanation: "Open card sorting is generative (uncovering how users naturally group concepts and label categories); closed card sorting is evaluative (testing existing taxonomy structures)."
        }
      ]
    },
    {
      id: "uiux-ia-quiz-1",
      moduleId: "mod-uiux-2-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-ia",
      subCourseTitle: "Information Architecture & Wireframing",
      subCoursePosition: 2,
      title: "Sub-Course Assessment: Information Architecture & User Flows",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Hierarchy, Navigation Patterns & Wireframe Heuristics",
      contentDescription: "Evaluate your skills in structuring global navigation, breadcrumbs, task flows, decision diamonds, and digital wireframes.",
      questions: [
        {
          id: "q-uiux-ia-2",
          prompt: "Why should low-fidelity wireframes deliberately avoid colors, rich imagery, and final typography?",
          options: [
            { id: "a", label: "Because Figma cannot render colors in wireframe mode" },
            { id: "b", label: "To keep stakeholder feedback focused strictly on layout hierarchy, content flow, and structural navigation rather than subjective visual aesthetics" },
            { id: "c", label: "To save computer memory" },
            { id: "d", label: "Because color is not used in modern design" }
          ],
          correctIndex: 1,
          explanation: "Premature visual styling distracts stakeholders and users into debating font shades and button colors instead of evaluating whether the underlying navigation and flow solve the core problem."
        }
      ]
    }
  ]
};

export const uiuxSubCourse2: CurriculumSubCourse = {
  id: "subcourse-uiux-ia",
  title: "Information Architecture & Wireframing",
  position: 2,
  duration: "5 hours",
  description: "Structure software navigation hierarchies using card sorting and tree testing, diagram end-to-end user task flows, and craft rapid low-fidelity wireframes in Figma.",
  modules: [uiuxMod2_1],
  items: [...uiuxMod2_1.items]
};

// --- SUB-COURSE 3: Visual Design Systems & Figma Mastery ---
const uiuxMod3_1: CurriculumSubModule = {
  id: "mod-uiux-3-1",
  subCourseId: "subcourse-uiux-figma",
  title: "Auto-Layout, Components, Tokens & Typography",
  position: 1,
  duration: "5 hours",
  items: [
    {
      id: "uiux-fig-001",
      moduleId: "mod-uiux-3-1",
      moduleTitle: "Auto-Layout, Components, Tokens & Typography",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-figma",
      subCourseTitle: "Visual Design Systems & Figma Mastery",
      subCoursePosition: 3,
      title: "The 8pt Grid System, Auto-Layout 5.0, Component Variants & Design Tokens",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Scalable UI Architecture: Design Tokens & Component Hierarchies in Figma",
      contentDescription: "Master typography scales, the 8-point spatial grid system, 60-30-10 color theory, Auto-Layout nesting with responsive constraints, Component Properties (Boolean, Text, Instance Swap), and design token variables.",
      sections: [
        {
          title: "The 8pt Spatial Grid Standard",
          explanation: "Using multiples of 8 (4, 8, 12, 16, 24, 32, 48, 64) for padding, margins, and component heights harmonizes layouts and maps 1:1 with developer CSS box models.",
          bullets: [
            "Consistency: Eliminates guesswork; every spacing decision is a multiple of 8 (or 4 for tight micro-elements).",
            "Screen Density: 8 divides evenly into common display resolutions (1080p, 1440p, 4K, standard mobile viewports).",
            "Component Tokens: Standard button heights (32px small, 40px medium, 48px large, 56px touch target)."
          ]
        }
      ],
      questions: [
        {
          id: "q-uiux-fig-1",
          prompt: "What is the primary benefit of using Figma Component Variants and Component Properties instead of maintaining dozens of disconnected button frames?",
          options: [
            { id: "a", label: "It makes Figma export directly to an iPhone app" },
            { id: "b", label: "It consolidates states (Default, Hover, Pressed, Disabled) and properties (Icons, Sizes, Types) into a single scalable component, slashing file bloat" },
            { id: "c", label: "It deletes unused layers" },
            { id: "d", label: "It converts vector paths into raster bitmaps" }
          ],
          correctIndex: 1,
          explanation: "Component properties and variants allow designers to toggle icons, modify labels, and switch visual states within a single unified component instance."
        }
      ]
    },
    {
      id: "uiux-fig-quiz-1",
      moduleId: "mod-uiux-3-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-figma",
      subCourseTitle: "Visual Design Systems & Figma Mastery",
      subCoursePosition: 3,
      title: "Sub-Course Assessment: Figma Mastery & Design Systems",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Auto-Layout, Tokens & Responsive Constraints",
      contentDescription: "Evaluate your proficiency in configuring nested Auto-Layout frames (Fill container vs Hug contents), color variable modes, and typography hierarchy.",
      questions: [
        {
          id: "q-uiux-fig-2",
          prompt: "In Figma Auto-Layout, what setting ensures that a child text element stretches responsively to occupy all available horizontal width inside its parent card?",
          options: [
            { id: "a", label: "Fixed width" },
            { id: "b", label: "Fill container (or 'Fill')" },
            { id: "c", label: "Hug contents" },
            { id: "d", label: "Center align" }
          ],
          correctIndex: 1,
          explanation: "`Fill container` instructs the child element to expand dynamically to fill whatever remaining space the parent Auto-Layout frame provides."
        }
      ]
    }
  ]
};

export const uiuxSubCourse3: CurriculumSubCourse = {
  id: "subcourse-uiux-figma",
  title: "Visual Design Systems & Figma Mastery",
  position: 3,
  duration: "5.5 hours",
  description: "Construct scalable design systems in Figma utilizing the 8pt grid system, Auto-Layout, nested components, interactive variants, and global design token variables.",
  modules: [uiuxMod3_1],
  items: [...uiuxMod3_1.items]
};

// --- SUB-COURSE 4: Interactive Prototyping & Micro-Interactions ---
const uiuxMod4_1: CurriculumSubModule = {
  id: "mod-uiux-4-1",
  subCourseId: "subcourse-uiux-proto",
  title: "Smart Animate, Micro-Interactions & Gestures",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "uiux-pr-001",
      moduleId: "mod-uiux-4-1",
      moduleTitle: "Smart Animate, Micro-Interactions & Gestures",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-proto",
      subCourseTitle: "Interactive Prototyping & Micro-Interactions",
      subCoursePosition: 4,
      title: "High-Fidelity Prototyping, Smart Animate & Motion Curves",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Motion Design & Realistic App Prototyping in Figma",
      contentDescription: "Master Smart Animate layer matching rules, easing curves (Ease-Out, Custom Bezier, Spring physics), component state transitions, modal drawers, and mobile swipe gestures.",
      sections: [
        {
          title: "The Golden Rule of Smart Animate in Figma",
          explanation: "Figma Smart Animate interpolates position, size, opacity, and rotation between matching layers across two frames.",
          bullets: [
            "Exact Layer Names: Layers must share identical names across both frames (e.g. `icon-search` in Frame 1 and `icon-search` in Frame 2).",
            "Matching Hierarchy: Layers should reside within matching group/frame parent structures.",
            "Easing Curves: Use Ease-Out (200-300ms) for elements entering the screen; use Ease-In for exits."
          ]
        }
      ],
      questions: [
        {
          id: "q-uiux-pr-1",
          prompt: "Why will Figma Smart Animate fail to smoothly animate a button between two frames, dissolving instead?",
          options: [
            { id: "a", label: "Because the layer names in the two frames are different (e.g. 'Frame 24' vs 'Button Primary')" },
            { id: "b", label: "Because Figma only supports motion in paid plans" },
            { id: "c", label: "Because the computer monitor is 60Hz" },
            { id: "d", label: "Because the prototype has more than 5 screens" }
          ],
          correctIndex: 0,
          explanation: "Smart Animate matches layers by exact layer name. If names differ, Figma treats them as separate objects and defaults to a cross-dissolve fade."
        }
      ]
    },
    {
      id: "uiux-proto-quiz-1",
      moduleId: "mod-uiux-4-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-proto",
      subCourseTitle: "Interactive Prototyping & Micro-Interactions",
      subCoursePosition: 4,
      title: "Sub-Course Assessment: Motion Design & Prototyping",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Interactive States, Overlays & Spring Physics",
      contentDescription: "Evaluate your capability to build realistic mobile prototypes with sticky headers, bottom navigation switches, and fluid micro-interactions.",
      questions: [
        {
          id: "q-uiux-pr-2",
          prompt: "What is the primary psychological purpose of micro-interactions (e.g. a subtle button press depression or checkmark burst) in software UX?",
          options: [
            { id: "a", label: "To show off motion design skills" },
            { id: "b", label: "To provide immediate visual feedback confirming that user input has been received, communicating system status (Nielsen Heuristic #1)" },
            { id: "c", label: "To slow down user interaction" },
            { id: "d", label: "To drain mobile device battery" }
          ],
          correctIndex: 1,
          explanation: "Micro-interactions provide sensory feedback acknowledging user actions, reassuring the user that the system is responsive and functioning properly."
        }
      ]
    }
  ]
};

export const uiuxSubCourse4: CurriculumSubCourse = {
  id: "subcourse-uiux-proto",
  title: "Interactive Prototyping & Micro-Interactions",
  position: 4,
  duration: "5 hours",
  description: "Bring static UI designs to life using Figma Smart Animate, interactive component states, spring physics curves, gesture navigation, and realistic micro-interactions.",
  modules: [uiuxMod4_1],
  items: [...uiuxMod4_1.items]
};

// --- SUB-COURSE 5: Accessibility (WCAG) & Usability Testing ---
const uiuxMod5_1: CurriculumSubModule = {
  id: "mod-uiux-5-1",
  subCourseId: "subcourse-uiux-access",
  title: "WCAG Standards, Heuristic Audits & Usability Testing",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "uiux-acc-001",
      moduleId: "mod-uiux-5-1",
      moduleTitle: "WCAG Standards, Heuristic Audits & Usability Testing",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-access",
      subCourseTitle: "Accessibility (WCAG) & Usability Testing",
      subCoursePosition: 5,
      title: "WCAG 2.2 AA Contrast Compliance, Screen Readers & Usability Scripts",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Inclusive Design Standards & Empirical Usability Evaluation",
      contentDescription: "Master Web Content Accessibility Guidelines (WCAG 2.2 AA), contrast ratios, keyboard navigation focus rings, screen reader semantics, Jakob Nielsen's 10 Usability Heuristics, and System Usability Scale (SUS) scoring.",
      sections: [
        {
          title: "WCAG 2.2 AA Color Contrast Benchmarks",
          explanation: "Ensuring text is readable for individuals with visual impairments or working on low-brightness displays under direct sunlight.",
          bullets: [
            "Normal Body Text (< 18pt or < 14pt bold): Requires minimum 4.5:1 contrast ratio against the background.",
            "Large Text (>= 18pt or >= 14pt bold): Requires minimum 3:1 contrast ratio.",
            "UI Components & Graphical Objects (inputs, icons): Requires minimum 3:1 contrast ratio.",
            "Never Rely on Color Alone: Form errors must pair color changes with clear icons and explanatory text."
          ]
        }
      ],
      questions: [
        {
          id: "q-uiux-acc-1",
          prompt: "Under WCAG 2.2 Level AA, what is the minimum required contrast ratio for regular body text (14px) against its background?",
          options: [
            { id: "a", label: "2:1" },
            { id: "b", label: "4.5:1" },
            { id: "c", label: "7:1" },
            { id: "d", label: "10:1" }
          ],
          correctIndex: 1,
          explanation: "WCAG 2.2 Level AA mandates a minimum contrast ratio of 4.5:1 for standard body text to ensure readability for users with moderate visual impairments."
        }
      ]
    },
    {
      id: "uiux-acc-quiz-1",
      moduleId: "mod-uiux-5-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-access",
      subCourseTitle: "Accessibility (WCAG) & Usability Testing",
      subCoursePosition: 5,
      title: "Sub-Course Assessment: Accessibility & Heuristic Auditing",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Heuristic Evaluation & Usability Metrics",
      contentDescription: "Evaluate your capability to conduct heuristic audits, identify WCAG accessibility violations, write neutral usability test prompts, and compute System Usability Scale (SUS) scores.",
      questions: [
        {
          id: "q-uiux-acc-2",
          prompt: "What is an above-average System Usability Scale (SUS) score representing strong software usability?",
          options: [
            { id: "a", label: "30" },
            { id: "b", label: "68 or above (with 80+ considered world-class)" },
            { id: "c", label: "10" },
            { id: "d", label: "50" }
          ],
          correctIndex: 1,
          explanation: "The industry average SUS benchmark is 68. Scores above 68 represent above-average usability; scores above 80 represent elite, highly usable digital products."
        }
      ]
    }
  ]
};

export const uiuxSubCourse5: CurriculumSubCourse = {
  id: "subcourse-uiux-access",
  title: "Accessibility (WCAG) & Usability Testing",
  position: 5,
  duration: "5 hours",
  description: "Ensure WCAG 2.2 AA accessibility compliance, conduct comprehensive heuristic usability audits, write moderated testing scripts, and calculate SUS usability scores.",
  modules: [uiuxMod5_1],
  items: [...uiuxMod5_1.items]
};

// --- SUB-COURSE 6: Developer Handoff & Portfolio Capstone ---
const uiuxMod6_1: CurriculumSubModule = {
  id: "mod-uiux-6-1",
  subCourseId: "subcourse-uiux-capstone",
  title: "Design-to-Code Handoff & Portfolio Capstone",
  position: 1,
  duration: "6.5 hours",
  items: [
    {
      id: "uiux-han-001",
      moduleId: "mod-uiux-6-1",
      moduleTitle: "Design-to-Code Handoff & Portfolio Capstone",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-capstone",
      subCourseTitle: "Developer Handoff & Portfolio Capstone",
      subCoursePosition: 6,
      title: "Figma Dev Mode, Design Tokens, Redlines & Case Study Storytelling",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Frictionless Engineering Alignment: Tokens, Redlines & Case Studies",
      contentDescription: "Master Figma Dev Mode, exporting design tokens (JSON/CSS variables), documenting edge cases (empty states, errors, loading skeletons), and structuring compelling UX portfolio case studies.",
      sections: [
        {
          title: "Complete Edge-State Design Checklist",
          explanation: "A UI design is incomplete if it only showcases the 'happy path'. Engineers require explicit designs for all state variations.",
          bullets: [
            "Empty States: First-time user experience with clear call-to-action buttons to create data.",
            "Loading States: Skeleton loaders matching content dimensions rather than jarring center spinners.",
            "Error States: Inline validation errors, toast notifications, and full-page offline fallbacks.",
            "Extreme Content: How cards handle 3-word titles vs 150-word runaway titles (text truncation rules)."
          ]
        }
      ],
      questions: [
        {
          id: "q-uiux-han-1",
          prompt: "Why are skeleton loaders preferred over full-screen spinning indicators in modern UI engineering?",
          options: [
            { id: "a", label: "They make the database faster" },
            { id: "b", label: "They reduce perceived wait time by showing the anticipated layout structure immediately, preventing jarring visual layout shifts as content arrives" },
            { id: "c", label: "They take zero lines of CSS" },
            { id: "d", label: "Spinners are banned in iOS" }
          ],
          correctIndex: 1,
          explanation: "Skeleton screens communicate cognitive progress by illustrating the layout shape beforehand, lowering perceived latency and avoiding layout shifts."
        }
      ]
    },
    {
      id: "uiux-capstone-assignment",
      moduleId: "mod-uiux-6-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-uiux-capstone",
      subCourseTitle: "Developer Handoff & Portfolio Capstone",
      subCoursePosition: 6,
      title: "Capstone Project: End-to-End Modern SaaS Product Redesign & Case Study",
      duration: "4 hours",
      type: "assignment",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Capstone Project: End-to-End SaaS Product Design & Case Study",
      contentDescription: "Execute a complete product design engagement: conduct user research, diagram user task flows, establish a scalable 8pt grid design system in Figma with tokens and Auto-Layout, build a fully interactive clickable prototype, perform WCAG accessibility audits, and write a high-impact portfolio case study.",
      assignmentPrompt: {
        instructions: "Produce a world-class, hire-ready UI/UX portfolio case study: (1) Problem Framing & User Research Synthesis, (2) User Task Flows & Low-Fi Wireframe progressions, (3) Scalable Figma Design System with typography, colors, and interactive component variants, (4) Fully interactive high-fidelity clickable prototype, and (5) Documented developer handoff specs with edge cases and WCAG AA verification.",
        deliverables: [
          "Figma Design File link / exported frames demonstrating design system components, variants, and tokens.",
          "Clickable high-fidelity desktop and mobile prototype with realistic Smart Animate transitions.",
          "WCAG 2.2 AA Accessibility & Heuristic Audit report showing color contrast verification.",
          "Comprehensive UX Case Study document (Problem, Research, Iterations, Final Solution, and Business Impact Metrics)."
        ],
        starterCode: `# UI/UX Design Capstone Deliverable Structure
# 1. Executive Summary & Problem Statement: Reducing Customer Onboarding Friction
# 2. Research Findings: 5 User Interviews -> Key Pain Points & Persona
# 3. Information Architecture & Task Flow Diagram
# 4. Design System Architecture: 8pt Grid, Primary/Neutral Tokens, Auto-Layout 5.0
# 5. Interactive Prototype Links & Dev Mode Handoff Redlines`
      }
    }
  ]
};

export const uiuxSubCourse6: CurriculumSubCourse = {
  id: "subcourse-uiux-capstone",
  title: "Developer Handoff & Portfolio Capstone",
  position: 6,
  duration: "7 hours",
  description: "Master Figma Dev Mode, document edge cases and skeleton states, align with frontend engineers via design tokens, and deliver the comprehensive SaaS Product Design Portfolio Capstone.",
  modules: [uiuxMod6_1],
  items: [...uiuxMod6_1.items]
};

export const UI_UX_DESIGN_MODULES: CurriculumSubCourse[] = [
  uiuxSubCourse1,
  uiuxSubCourse2,
  uiuxSubCourse3,
  uiuxSubCourse4,
  uiuxSubCourse5,
  uiuxSubCourse6
];
