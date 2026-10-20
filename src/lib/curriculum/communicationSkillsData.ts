import { CurriculumSubCourse } from "../curriculumTypes";
import rawData from "./communicationSkillsCurriculum.json";

// =========================================================================
// COMMUNICATION & PROFESSIONAL SKILLS CURRICULUM
// Complete 16 Sub-Courses with 87 Modules, 747 Lessons, and Certification Exams
// =========================================================================

export const COMMUNICATION_SKILLS_MODULES: CurriculumSubCourse[] = rawData as unknown as CurriculumSubCourse[];

export const [
  commSubCourse1,
  commSubCourse2,
  commSubCourse3,
  commSubCourse4,
  commSubCourse5,
  commSubCourse6,
  commSubCourse7,
  commSubCourse8,
  commSubCourse9,
  commSubCourse10,
  commSubCourse11,
  commSubCourse12,
  commSubCourse13,
  commSubCourse14,
  commSubCourse15,
  commSubCourse16,
] = COMMUNICATION_SKILLS_MODULES;

export default COMMUNICATION_SKILLS_MODULES;
