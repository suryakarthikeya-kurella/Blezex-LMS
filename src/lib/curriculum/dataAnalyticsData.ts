import { CurriculumSubCourse } from "../curriculumTypes";
import rawData from "./dataAnalyticsCurriculum.json";

// =========================================================================
// DATA ANALYTICS & BUSINESS INTELLIGENCE CURRICULUM
// Complete 15 Sub-Courses with 66 Modules, 458 Lessons, and Certification Exams
// =========================================================================

export const DATA_ANALYTICS_MODULES: CurriculumSubCourse[] = rawData as unknown as CurriculumSubCourse[];

export const [
  dataSubCourse1,
  dataSubCourse2,
  dataSubCourse3,
  dataSubCourse4,
  dataSubCourse5,
  dataSubCourse6,
  dataSubCourse7,
  dataSubCourse8,
  dataSubCourse9,
  dataSubCourse10,
  dataSubCourse11,
  dataSubCourse12,
  dataSubCourse13,
  dataSubCourse14,
  dataSubCourse15,
] = DATA_ANALYTICS_MODULES;

export default DATA_ANALYTICS_MODULES;
