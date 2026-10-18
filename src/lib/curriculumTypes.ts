export interface PracticeQuestion {
  id: string;
  prompt: string;
  codeSnippet?: { language: string; code: string };
  options: Array<{ id: string; label: string; code?: string }>;
  correctIndex: number;
  explanation: string;
}

export interface CheatSheetSection {
  title: string;
  explanation?: string;
  bullets?: string[];
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  diagram?: string;
  image?: {
    src: string;
    alt?: string;
    caption?: string;
  };
}

export interface CurriculumItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  modulePosition: number;
  subCourseId?: string;
  subCourseTitle?: string;
  subCoursePosition?: number;
  title: string;
  duration: string;
  type: "cheatsheet" | "practice" | "quiz" | "assignment";
  position: number;
  contentHeading?: string;
  contentDescription?: string;
  sections?: CheatSheetSection[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  contentHtml?: string;
  questions?: PracticeQuestion[];
  assignmentPrompt?: {
    instructions: string;
    starterCode?: string;
    deliverables: string[];
  };
}

export interface CurriculumModule {
  id: string;
  title: string;
  position: number;
  duration: string;
  description: string;
  items: CurriculumItem[];
}

/**
 * Sub-Course interface representing progressive sequential courses
 * inside the Main Course (Full Stack Web Development).
 */
export type CurriculumSubCourse = CurriculumModule;

