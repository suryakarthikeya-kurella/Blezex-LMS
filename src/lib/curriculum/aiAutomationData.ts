import { CurriculumSubCourse } from "../curriculumTypes";
import rawData from "./aiAutomationCurriculum.json";

// =========================================================================
// AI AUTOMATION CURRICULUM
// Complete 10 Sub-Courses with 40 Modules, 285 Lessons, and Certification Exams
// =========================================================================

export const AI_AUTOMATION_MODULES: CurriculumSubCourse[] = rawData as unknown as CurriculumSubCourse[];

export const [
  aiSubCourse1,
  aiSubCourse2,
  aiSubCourse3,
  aiSubCourse4,
  aiSubCourse5,
  aiSubCourse6,
  aiSubCourse7,
  aiSubCourse8,
  aiSubCourse9,
  aiSubCourse10,
] = AI_AUTOMATION_MODULES;

export default AI_AUTOMATION_MODULES;
