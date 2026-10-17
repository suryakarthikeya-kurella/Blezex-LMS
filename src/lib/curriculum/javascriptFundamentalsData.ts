import { CurriculumModule } from "../curriculumTypes";
import { jsLessons1To10 } from "./jsLessons1To10";
import { jsLessons11To16 } from "./jsLessons11To16";
import { jsLessons17To21 } from "./jsLessons17To21";
import { jsLessons22To27 } from "./jsLessons22To27";
import { jsLessons28To32 } from "./jsLessons28To32";
import { jsModuleAssessment } from "./jsModuleAssessment";
import { jsGradedAssignment } from "./jsGradedAssignment";

export const jsFundamentalsModule: CurriculumModule = {
  id: "mod-js-fundamentals",
  title: "Fundamentals of JavaScript",
  position: 2,
  duration: "32 hours, 15 mins",
  description: "Comprehensive JavaScript curriculum: from variables, data types, and functions to advanced array methods, objects, DOM, events, browser storage, async programming (Promises, async/await, Fetch), the Event Loop, closures, 'this' & binding, ES6 classes, prototypes, performance, the comprehensive 30-question Module Assessment, and the Graded Project Assignment.",
  items: [
    ...jsLessons1To10,
    ...jsLessons11To16,
    ...jsLessons17To21,
    ...jsLessons22To27,
    ...jsLessons28To32,
    jsModuleAssessment,
    jsGradedAssignment
  ]
};
