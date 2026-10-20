import { CurriculumSubCourse } from "../curriculumTypes";
import rawData from "./careerReadinessCurriculum.json";

// =========================================================================
// CAREER READINESS & EMPLOYABILITY CURRICULUM
// Complete 14 Sub-Courses with 57 Modules, 386 Lessons, and Certification Exams
// =========================================================================

export const CAREER_READINESS_MODULES: CurriculumSubCourse[] = rawData as unknown as CurriculumSubCourse[];

export const [
  crSubCourse1,
  crSubCourse2,
  crSubCourse3,
  crSubCourse4,
  crSubCourse5,
  crSubCourse6,
  crSubCourse7,
  crSubCourse8,
  crSubCourse9,
  crSubCourse10,
  crSubCourse11,
  crSubCourse12,
  crSubCourse13,
  crSubCourse14,
] = CAREER_READINESS_MODULES;

export default CAREER_READINESS_MODULES;
