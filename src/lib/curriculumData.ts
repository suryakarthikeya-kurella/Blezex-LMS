export * from "./curriculumTypes";
import { CurriculumModule, CurriculumItem } from "./curriculumTypes";
import { htmlCssSubCourse } from "./curriculum/htmlCssData";
import { jsFundamentalsSubCourse } from "./curriculum/javascriptFundamentalsData";
import { databaseSqlSubCourse } from "./curriculum/databaseSqlData";
import { nodeExpressSubCourse } from "./curriculum/nodeExpressData";
import { reactJsSubCourse } from "./curriculum/reactJsData";
import { gitBasicsSubCourse } from "./curriculum/gitBasicsData";

/**
 * Parse human duration string (e.g., "25 mins", "1 hour, 30 mins", "90 mins") into minutes.
 */
export function parseDurationMinutes(durationStr?: string): number {
  if (!durationStr || typeof durationStr !== "string") return 0;
  let total = 0;
  // Match decimal or integer hours (e.g., "1.5 hours", "2 hrs", "1 hour", "1.5h")
  const hrMatch = durationStr.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h\b)/i);
  if (hrMatch) {
    total += Math.round(parseFloat(hrMatch[1]) * 60);
  }
  // Match minutes (e.g. "30 mins", "45 minutes", "15m", "15 min")
  const minMatch = durationStr.match(/(\d+)\s*(?:minutes?|mins?|m\b)/i);
  if (minMatch) {
    total += parseInt(minMatch[1], 10);
  }
  if (!hrMatch && !minMatch) {
    const num = parseInt(durationStr.trim(), 10);
    if (!isNaN(num) && num > 0) total += num;
  }
  return total;
}

/**
 * Format minutes into a friendly string like "45 hours, 10 mins" or "25 mins".
 */
export function formatMinutesToHuman(totalMinutes: number): string {
  if (totalMinutes <= 0) return "0 mins";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours > 0 && mins > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}, ${mins} mins`;
  }
  if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `${mins} mins`;
}

/**
 * Format minutes into a compact string like "45h 10m".
 */
export function formatMinutesCompact(totalMinutes: number): string {
  if (totalMinutes <= 0) return "0m";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

/**
 * Calculate the exact total minutes for any module or sub-course from its items.
 */
export function getModuleTotalMinutes(mod: any): number {
  if (!mod) return 0;
  let items: any[] = Array.isArray(mod.items) && mod.items.length > 0 ? mod.items : [];
  if (items.length === 0 && Array.isArray(mod.modules)) {
    items = mod.modules.flatMap((m: any) => m.items || m.lessons || []);
  }
  let sum = items.reduce((acc: number, it: any) => acc + parseDurationMinutes(it?.duration), 0);
  if (mod.courseAssessment?.duration) {
    sum += parseDurationMinutes(mod.courseAssessment.duration);
  }
  if (mod.courseProject?.duration) {
    sum += parseDurationMinutes(mod.courseProject.duration);
  }
  if (sum === 0 && mod.duration) {
    sum = parseDurationMinutes(mod.duration);
  }
  return sum;
}

/**
 * Calculate the exact total minutes for a full course across all modules.
 */
export function getCourseTotalMinutes(mods: Array<any>): number {
  if (!mods || !Array.isArray(mods)) return 0;
  return mods.reduce((sum, m) => sum + getModuleTotalMinutes(m), 0);
}

export const getSubCourseTotalMinutes = getModuleTotalMinutes;

import { AI_AUTOMATION_MODULES } from "./curriculum/aiAutomationData";
import { CLOUD_DEVOPS_MODULES } from "./curriculum/cloudDevopsData";
import { DATA_ANALYTICS_MODULES } from "./curriculum/dataAnalyticsData";
import { DIGITAL_MARKETING_MODULES } from "./curriculum/digitalMarketingData";
import { UI_UX_DESIGN_MODULES } from "./curriculum/uiUxDesignData";
import { AI_ML_DATA_SCIENCE_MODULES } from "./curriculum/aiMlDataScienceData";
import { PYTHON_PROGRAMMING_MODULES } from "./curriculum/pythonProgrammingData";
import { COMMUNICATION_SKILLS_MODULES } from "./curriculum/communicationSkillsData";
import { ENTREPRENEURSHIP_MODULES } from "./curriculum/entrepreneurshipData";
import { CAREER_READINESS_MODULES } from "./curriculum/careerReadinessData";

export {
  AI_AUTOMATION_MODULES,
  CLOUD_DEVOPS_MODULES,
  DATA_ANALYTICS_MODULES,
  DIGITAL_MARKETING_MODULES,
  UI_UX_DESIGN_MODULES,
  AI_ML_DATA_SCIENCE_MODULES,
  PYTHON_PROGRAMMING_MODULES,
  COMMUNICATION_SKILLS_MODULES,
  ENTREPRENEURSHIP_MODULES,
  CAREER_READINESS_MODULES,
};

// =========================================================================
// 1. FULL STACK WEB DEVELOPMENT CURRICULUM (6 SUB-COURSES)
// =========================================================================

export const FULL_STACK_MODULES: CurriculumModule[] = [
  htmlCssSubCourse,
  jsFundamentalsSubCourse,
  databaseSqlSubCourse,
  nodeExpressSubCourse,
  reactJsSubCourse,
  gitBasicsSubCourse
];

export const FULL_STACK_SUB_COURSES = FULL_STACK_MODULES;

/**
 * Universal lookup mapping course ID, slug, or title to its curriculum track
 */
export function getCurriculumForCourse(courseIdOrSlug?: string): CurriculumModule[] {
  if (!courseIdOrSlug) return FULL_STACK_MODULES;
  const s = courseIdOrSlug.toLowerCase();
  
  // 2. AI, Machine Learning & Data Science
  if (
    s.includes("ai-ml") ||
    s.includes("machine-learning") ||
    s.includes("machine learning") ||
    s.includes("data-science") ||
    s.includes("data science") ||
    s === "ec1aa94e-d94c-4dec-aea4-df6a251f6afb"
  ) {
    return AI_ML_DATA_SCIENCE_MODULES;
  }

  // 4. Generative AI & Intelligent Automation
  if (
    s.includes("generative") ||
    s.includes("gen-ai") ||
    s.includes("ai-automation") ||
    s.includes("ai automation") ||
    s === "d554eb67-97aa-41d7-9af9-61735112a7c9" ||
    (s.includes("intelligent automation"))
  ) {
    return AI_AUTOMATION_MODULES;
  }

  // 5. Python Programming & Problem Solving
  if (
    s.includes("python-programming") ||
    s.includes("python programming") ||
    s.includes("problem-solving") ||
    s.includes("problem solving") ||
    s === "21f59e2e-0237-46d8-bad5-5ad60ab7235f" ||
    (s.includes("python") && !s.includes("data") && !s.includes("ml"))
  ) {
    return PYTHON_PROGRAMMING_MODULES;
  }

  // 3. Data Analytics & Business Intelligence
  if (
    s.includes("data-analytics") ||
    s.includes("data analytics") ||
    s.includes("business intelligence") ||
    s.includes("power-bi") ||
    s.includes("analytics") ||
    s === "4ea2dbff-d166-443e-817e-a54fe59244ab"
  ) {
    return DATA_ANALYTICS_MODULES;
  }

  // 6. Digital Marketing & Personal Branding (18 Subcourses)
  if (
    s.includes("marketing") ||
    s.includes("digital") ||
    s.includes("branding") ||
    s === "373e7d95-4e2a-4dfd-9df6-606560aba857"
  ) {
    return DIGITAL_MARKETING_MODULES;
  }

  // 7. Communication & Professional Skills
  if (
    s.includes("communication") ||
    s.includes("professional skills") ||
    s.includes("workplace etiquette") ||
    s.includes("presentation") ||
    s === "50c43e3e-c579-4cf7-8dec-62eb40c30f86"
  ) {
    return COMMUNICATION_SKILLS_MODULES;
  }

  // 8. Entrepreneurship & Business Development
  if (
    s.includes("entrepreneurship") ||
    s.includes("business development") ||
    s.includes("startup") ||
    s.includes("sales") ||
    s === "a4a3faff-4660-4b12-85ce-57d1da72ea60"
  ) {
    return ENTREPRENEURSHIP_MODULES;
  }

  // 9. Career Readiness & Employability
  if (
    s.includes("career") ||
    s.includes("readiness") ||
    s.includes("employability") ||
    s.includes("interview") ||
    s.includes("resume") ||
    s === "2ff01e9f-73ec-48bc-be0a-b80ebf2d1c75"
  ) {
    return CAREER_READINESS_MODULES;
  }

  // Legacy / Additional Courses
  if (
    s.includes("cloud") ||
    s.includes("devops") ||
    s === "705f11ad-ec0d-480c-b93c-562e946a0ca8"
  ) {
    return CLOUD_DEVOPS_MODULES;
  }

  if (
    s.includes("ui") ||
    s.includes("ux") ||
    s.includes("design") ||
    s === "ce507e5b-4f95-4b61-a014-519a25f063ea"
  ) {
    return UI_UX_DESIGN_MODULES;
  }

  // Default to 1. Full Stack Web Development
  return FULL_STACK_MODULES;
}

export const ALL_COURSES_CURRICULA: Record<string, CurriculumModule[]> = {
  // 1. Full-Stack Web Development
  "full-stack-web": FULL_STACK_MODULES,
  "full-stack-web-development": FULL_STACK_MODULES,
  "7779e007-096a-4295-a772-be469591e24b": FULL_STACK_MODULES,

  // 2. AI, Machine Learning & Data Science
  "ai-ml-data-science": AI_ML_DATA_SCIENCE_MODULES,
  "ai-machine-learning-data-science": AI_ML_DATA_SCIENCE_MODULES,
  "ai-machine-learning-data-science-mvge03d6": AI_ML_DATA_SCIENCE_MODULES,
  "ec1aa94e-d94c-4dec-aea4-df6a251f6afb": AI_ML_DATA_SCIENCE_MODULES,

  // 3. Data Analytics & Business Intelligence
  "data-analytics-bi": DATA_ANALYTICS_MODULES,
  "data-analytics": DATA_ANALYTICS_MODULES,
  "4ea2dbff-d166-443e-817e-a54fe59244ab": DATA_ANALYTICS_MODULES,

  // 4. Generative AI & Intelligent Automation
  "generative-ai-automation": AI_AUTOMATION_MODULES,
  "ai-automation": AI_AUTOMATION_MODULES,
  "ai-automation-mvdy48ts": AI_AUTOMATION_MODULES,
  "d554eb67-97aa-41d7-9af9-61735112a7c9": AI_AUTOMATION_MODULES,

  // 5. Python Programming & Problem Solving
  "python-programming": PYTHON_PROGRAMMING_MODULES,
  "python-programming-problem-solving": PYTHON_PROGRAMMING_MODULES,
  "python-programming-problem-solving-mvge1ju7": PYTHON_PROGRAMMING_MODULES,
  "21f59e2e-0237-46d8-bad5-5ad60ab7235f": PYTHON_PROGRAMMING_MODULES,

  // 6. Digital Marketing & Personal Branding (18 Subcourses)
  "digital-marketing": DIGITAL_MARKETING_MODULES,
  "digital-marketing-personal-branding": DIGITAL_MARKETING_MODULES,
  "373e7d95-4e2a-4dfd-9df6-606560aba857": DIGITAL_MARKETING_MODULES,

  // 7. Communication & Professional Skills
  "communication-skills": COMMUNICATION_SKILLS_MODULES,
  "communication-professional-skills": COMMUNICATION_SKILLS_MODULES,
  "communication-professional-skills-mvge9tmi": COMMUNICATION_SKILLS_MODULES,
  "50c43e3e-c579-4cf7-8dec-62eb40c30f86": COMMUNICATION_SKILLS_MODULES,

  // 8. Entrepreneurship & Business Development
  "entrepreneurship-business": ENTREPRENEURSHIP_MODULES,
  "entrepreneurship-business-development": ENTREPRENEURSHIP_MODULES,
  "entrepreneurship-business-development-mvge78k9": ENTREPRENEURSHIP_MODULES,
  "a4a3faff-4660-4b12-85ce-57d1da72ea60": ENTREPRENEURSHIP_MODULES,

  // 9. Career Readiness & Employability
  "career-readiness": CAREER_READINESS_MODULES,
  "career-readiness-employability": CAREER_READINESS_MODULES,
  "carrer-readiness-employability-mvge5776": CAREER_READINESS_MODULES,
  "2ff01e9f-73ec-48bc-be0a-b80ebf2d1c75": CAREER_READINESS_MODULES,
};

/**
 * Search across all courses for an item by ID
 */
export function findCurriculumItem(itemId: string): { item: CurriculumItem; module: CurriculumModule; index: number } | null {
  const allModulesList = [
    ...FULL_STACK_MODULES,
    ...AI_ML_DATA_SCIENCE_MODULES,
    ...DATA_ANALYTICS_MODULES,
    ...AI_AUTOMATION_MODULES,
    ...PYTHON_PROGRAMMING_MODULES,
    ...DIGITAL_MARKETING_MODULES,
    ...COMMUNICATION_SKILLS_MODULES,
    ...ENTREPRENEURSHIP_MODULES,
    ...CAREER_READINESS_MODULES,
    ...CLOUD_DEVOPS_MODULES,
    ...UI_UX_DESIGN_MODULES
  ];
  for (const mod of allModulesList) {
    const itemIndex = mod.items.findIndex(it => it.id === itemId);
    if (itemIndex !== -1) {
      return { item: mod.items[itemIndex], module: mod, index: itemIndex };
    }
  }
  return null;
}

export interface CourseMetadata {
  id: string;
  slug: string;
  title: string;
  code: string;
  description: string;
  min_progress_pct: number;
  category: "technical" | "non-technical";
  tags: string[];
}

export const LAUNCH_COURSES_METADATA: CourseMetadata[] = [
  {
    id: "full-stack-web",
    slug: "full-stack-web",
    title: "1. Full-Stack Web Development",
    code: "Technical 01",
    description: "HTML, CSS, JavaScript, React, APIs, databases, authentication and deployment.",
    min_progress_pct: 80,
    category: "technical",
    tags: ["HTML5 & CSS3", "JavaScript", "SQL", "Node.js", "React", "Git"],
  },
  {
    id: "ai-ml-data-science",
    slug: "ai-ml-data-science",
    title: "2. AI, Machine Learning & Data Science",
    code: "Technical 02",
    description: "Python, data processing, algorithms, model training, evaluation and practical projects.",
    min_progress_pct: 80,
    category: "technical",
    tags: ["NumPy", "Pandas", "Scikit-Learn", "EDA", "ROC-AUC", "FastAPI"],
  },
  {
    id: "data-analytics-bi",
    slug: "data-analytics-bi",
    title: "3. Data Analytics & Business Intelligence",
    code: "Technical 03",
    description: "Excel, SQL, data cleaning, Power BI, dashboards and business insights.",
    min_progress_pct: 80,
    category: "technical",
    tags: ["Excel Analytics", "Advanced SQL", "Power BI", "Data Cleaning", "Dashboards", "Business Insights"],
  },
  {
    id: "generative-ai-automation",
    slug: "generative-ai-automation",
    title: "4. Generative AI & Intelligent Automation",
    code: "Technical 04",
    description: "LLM fundamentals, prompting, APIs, workflow automation, RAG fundamentals and AI applications.",
    min_progress_pct: 80,
    category: "technical",
    tags: ["LLM Prompting", "OpenAI & Anthropic APIs", "RAG Pipelines", "ChromaDB", "AI Agents", "n8n Automation"],
  },
  {
    id: "python-programming",
    slug: "python-programming",
    title: "5. Python Programming & Problem Solving",
    code: "Technical 05",
    description: "Programming fundamentals, functions, OOP, data structures, algorithms and debugging.",
    min_progress_pct: 80,
    category: "technical",
    tags: ["Python 3", "OOP & Inheritance", "Data Structures", "Algorithms", "pytest", "Big-O Analysis"],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "6. Digital Marketing & Personal Branding",
    code: "Non-technical 06",
    description: "Content strategy, SEO, social media, campaign analytics and portfolio building.",
    min_progress_pct: 80,
    category: "non-technical",
    tags: ["SEO & Keywords", "Google Ads", "Meta Ads", "Content Strategy", "Email Marketing", "GA4 Analytics"],
  },
  {
    id: "communication-skills",
    slug: "communication-skills",
    title: "7. Communication & Professional Skills",
    code: "Non-technical 07",
    description: "Business communication, presentations, teamwork, email writing and workplace etiquette.",
    min_progress_pct: 80,
    category: "non-technical",
    tags: ["Minto Pyramid", "Active Listening", "Slide Presentations", "SBI Feedback", "Harvard Negotiation", "Executive Gravitas"],
  },
  {
    id: "entrepreneurship-business",
    slug: "entrepreneurship-business",
    title: "8. Entrepreneurship & Business Development",
    code: "Non-technical 08",
    description: "Customer discovery, lead generation, sales, CRM, proposals and business planning.",
    min_progress_pct: 80,
    category: "non-technical",
    tags: ["The Mom Test", "Lean Canvas", "B2B Outbound", "SPIN Selling", "CRM Pipelines", "Pitch Decks"],
  },
  {
    id: "career-readiness",
    slug: "career-readiness",
    title: "9. Career Readiness & Employability",
    code: "Non-technical 09",
    description: "Resume building, interview practice, aptitude, job search, LinkedIn and portfolio preparation.",
    min_progress_pct: 80,
    category: "non-technical",
    tags: ["Google XYZ Resume", "LinkedIn SEO", "STAR Interviewing", "Fermi Estimation", "Cold Networking", "Salary Negotiation"],
  },
];

export function getCourseCodeBadge(slugOrTitle: string): string {
  const s = slugOrTitle.toLowerCase();
  if (s.includes("full-stack") || s.includes("full stack")) return "Technical 01";
  if (s.includes("machine learning") || s.includes("machine-learning") || s.includes("data science") || s.includes("ai-ml")) return "Technical 02";
  if (s.includes("data analytics") || s.includes("business intelligence")) return "Technical 03";
  if (s.includes("automation") || s.includes("generative")) return "Technical 04";
  if (s.includes("python")) return "Technical 05";
  if (s.includes("marketing") || s.includes("digital")) return "Non-technical 06";
  if (s.includes("communication")) return "Non-technical 07";
  if (s.includes("entrepreneurship") || s.includes("business development")) return "Non-technical 08";
  if (s.includes("career") || s.includes("carrer") || s.includes("readiness") || s.includes("employability")) return "Non-technical 09";
  return "Career Track";
}

export function getCourseMetadata(slugOrId?: string): CourseMetadata {
  if (!slugOrId) return LAUNCH_COURSES_METADATA[0];
  const s = slugOrId.toLowerCase();
  const direct = LAUNCH_COURSES_METADATA.find(c => c.slug === s || c.id === s);
  if (direct) return direct;
  const partial = LAUNCH_COURSES_METADATA.find(c => s.includes(c.slug) || c.slug.includes(s));
  if (partial) return partial;
  return LAUNCH_COURSES_METADATA[0];
}

/**
 * Strips duplicate "Subcourse 1:", "Sub-Course 1:", "1." prefixes so subcourse titles display cleanly without redundancy
 */
export function cleanSubCourseTitle(title?: string): string {
  if (!title) return "";
  return title
    .replace(/^Sub-?Course\s*\d+\s*[:\-–—]\s*/i, "")
    .replace(/^\d+\.\s*/, "")
    .trim();
}

/**
 * Strips duplicate "Module 1:", "Module 1.1:", "1." prefixes so module headings display cleanly without redundancy
 */
export function cleanModuleTitle(title?: string): string {
  if (!title) return "";
  return title
    .replace(/^Module\s*[\d\.]+\s*[:\-–—]\s*/i, "")
    .replace(/^\d+\.\s*/, "")
    .trim();
}

/**
 * Strips "Mastery Guide:", "Mastering", or the word "Mastery" from lesson headings
 */
export function cleanLessonHeading(title?: string): string {
  if (!title) return "";
  return title
    .replace(/^Mastery\s+Guide\s*[:\-–—]\s*/i, "")
    .replace(/^Mastering\s+/i, "")
    .replace(/^Mastery\s*[:\-–—]\s*/i, "")
    .replace(/\bMastering\b:?\s*/gi, "")
    .replace(/\bMastery\b:?\s*/gi, "")
    .replace(/Sub-?Course\s*\d+\s*[:\-–—]\s*/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

