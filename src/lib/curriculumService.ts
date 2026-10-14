import { supabase } from "./supabase";
import { FULL_STACK_MODULES, CurriculumModule, CurriculumItem } from "./curriculumData";

const STORAGE_PREFIX = "blezex_curriculum_completed_";

export function getCompletedItemIds(enrollmentId?: string): Set<string> {
  const key = `${STORAGE_PREFIX}${enrollmentId || "default"}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function saveCompletedItemId(enrollmentId: string, itemId: string, completed: boolean): Set<string> {
  const key = `${STORAGE_PREFIX}${enrollmentId || "default"}`;
  const current = getCompletedItemIds(enrollmentId);
  if (completed) {
    current.add(itemId);
  } else {
    current.delete(itemId);
  }
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(current)));
  } catch {}
  return current;
}

export function isCurriculumModuleUnlocked(
  moduleIndex: number,
  modules: CurriculumModule[],
  completedItemIds: Set<string>
): boolean {
  if (moduleIndex <= 0) return true;
  if (moduleIndex >= modules.length) return false;
  // All items in the previous module must be completed
  const prevModule = modules[moduleIndex - 1];
  if (!prevModule || !prevModule.items.length) return true;
  return prevModule.items.every(it => completedItemIds.has(it.id));
}

export async function fetchCourseCurriculum(
  courseIdOrEid: string
): Promise<{
  course: { id: string; title: string; description: string; slug: string; min_progress_pct: number };
  modules: CurriculumModule[];
  enrollmentId: string;
  source: "supabase" | "static";
}> {
  let enrollmentId = courseIdOrEid;
  let courseTitle = "Full Stack Web Development";
  let courseDesc = "A practical path through HTML, CSS, responsive design, JavaScript, React, APIs, databases, testing, and deployment.";
  let courseSlug = "full-stack-web";
  let minProgress = 80;

  try {
    // 1. Try checking enrollment by id
    const { data: enrollmentRow } = await supabase
      .from("enrollments")
      .select("id, status, course_id, course:courses(id, title, description, slug, min_progress_pct)")
      .eq("id", courseIdOrEid)
      .maybeSingle();

    if (enrollmentRow) {
      enrollmentId = enrollmentRow.id;
      const c = enrollmentRow.course as any;
      if (c) {
        courseTitle = c.title || courseTitle;
        courseDesc = c.description || courseDesc;
        courseSlug = c.slug || courseSlug;
        minProgress = c.min_progress_pct ?? minProgress;
      }
    } else {
      // 2. Try looking up course by slug or id
      const { data: courseRow } = await supabase
        .from("courses")
        .select("id, title, description, slug, min_progress_pct")
        .or(`id.eq.${courseIdOrEid},slug.eq.${courseIdOrEid}`)
        .maybeSingle();

      if (courseRow) {
        courseTitle = courseRow.title || courseTitle;
        courseDesc = courseRow.description || courseDesc;
        courseSlug = courseRow.slug || courseSlug;
        minProgress = courseRow.min_progress_pct ?? minProgress;
      }
    }
  } catch {}

  return {
    course: {
      id: courseSlug,
      title: courseTitle,
      description: courseDesc,
      slug: courseSlug,
      min_progress_pct: minProgress,
    },
    modules: FULL_STACK_MODULES,
    enrollmentId,
    source: "static",
  };
}

export async function syncCompletedToSupabase(enrollmentId: string, lessonId: string, completed: boolean) {
  try {
    if (completed) {
      await supabase.from("lesson_progress").insert({ enrollment_id: enrollmentId, lesson_id: lessonId });
    } else {
      await supabase.from("lesson_progress").delete().eq("enrollment_id", enrollmentId).eq("lesson_id", lessonId);
    }
  } catch {}
}
