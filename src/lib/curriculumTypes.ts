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
  isModuleQuiz?: boolean;
  isModuleAssessment?: boolean;
  isSubCourseAssessment?: boolean;
}

export interface CurriculumSubModule {
  id: string;
  subCourseId: string;
  title: string;
  description: string;
  position: number;
  duration?: string;
  lessons: CurriculumItem[];
  moduleQuiz?: CurriculumItem;
  moduleAssessment?: CurriculumItem;
  items: CurriculumItem[];
}

export interface CurriculumSubCourse {
  id: string;
  title: string;
  position: number;
  duration: string;
  description: string;
  modules: CurriculumSubModule[];
  courseAssessment?: CurriculumItem;
  courseProject?: CurriculumItem;
  items: CurriculumItem[];
}

/**
 * Backward compatibility: CurriculumModule maps to CurriculumSubCourse
 */
export type CurriculumModule = CurriculumSubCourse;


