import { CurriculumSubCourse } from "../curriculumTypes";
import rawData from "./pythonProgrammingCurriculum.json";

// =========================================================================
// PYTHON PROGRAMMING & PROBLEM SOLVING CURRICULUM
// Complete 16 Sub-Courses with 66 Modules, 518 Lessons, and Certification Exams
// =========================================================================

export const PYTHON_PROGRAMMING_MODULES: CurriculumSubCourse[] = rawData as unknown as CurriculumSubCourse[];

export const [
  pySubCourse1,
  pySubCourse2,
  pySubCourse3,
  pySubCourse4,
  pySubCourse5,
  pySubCourse6,
  pySubCourse7,
  pySubCourse8,
  pySubCourse9,
  pySubCourse10,
  pySubCourse11,
  pySubCourse12,
  pySubCourse13,
  pySubCourse14,
  pySubCourse15,
  pySubCourse16,
] = PYTHON_PROGRAMMING_MODULES;

export default PYTHON_PROGRAMMING_MODULES;
