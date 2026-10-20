import { supabase } from "./supabase";
import { FULL_STACK_MODULES, CurriculumModule, CurriculumItem, getCurriculumForCourse, getCourseMetadata } from "./curriculumData";
import { isCertificateUnlocked } from "./certificateUnlock";
import { recordDailyActivity, resolveActiveUserId } from "./streakService";

const STORAGE_PREFIX = "blezex_curriculum_completed_";
const QUIZ_STORAGE_KEY = "blezex_quiz_attempts";
const ASSIGNMENT_STORAGE_KEY = "blezex_assignment_submissions";
const JOURNEY_EVENTS_KEY = "blezex_journey_events";

export interface JourneyEvent {
  key: string;
  kind: "lesson" | "quiz" | "milestone";
  title: string;
  detail?: string;
  created_at: string;
  score_pct?: number;
  passed?: boolean;
  enrollment_id?: string;
  user_id?: string;
}

export interface StoredQuizAttempt {
  id: string;
  enrollment_id: string;
  quiz_id: string;
  score_pct: number;
  passed: boolean;
  created_at: string;
  quiz?: { title: string; course_id?: string };
  course_title?: string;
  user_id?: string;
}

export interface StoredAssignmentSubmission {
  id: string;
  enrollment_id: string;
  assignment_id: string;
  title: string;
  status: "submitted" | "evaluated";
  due_date?: string;
  created_at: string;
  course_title?: string;
  text?: string;
  link?: string;
  user_id?: string;
}

export interface CourseProgressInfo {
  totalLessons: number;
  completedLessons: number;
  progressPct: number;
  isCertificateUnlocked: boolean;
  targetPct: number;
  status: "not_started" | "in_progress" | "certificate_unlocked" | "completed";
}

export function notifyProgressUpdated() {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("blezex:progress-updated"));
      window.dispatchEvent(new CustomEvent("blezex:streak-updated"));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  }
}

/**
 * Retrieve completed curriculum item IDs.
 * Checks both enrollment-specific storage key and global full-stack keys
 * so progress is always consistent across pages and routes.
 */
export function getCompletedItemIds(enrollmentId?: string, userId?: string | null): Set<string> {
  const uid = resolveActiveUserId(userId);
  const combined = new Set<string>();
  const keysToRead: string[] = [];

  if (uid && uid !== "guest") {
    if (enrollmentId) {
      keysToRead.push(`${STORAGE_PREFIX}${uid}_${enrollmentId}`);
    }
    if (!enrollmentId || enrollmentId === "full-stack-web" || enrollmentId === "7779e007-096a-4295-a772-be469591e24b") {
      keysToRead.push(`${STORAGE_PREFIX}${uid}_full-stack-web`);
      keysToRead.push(`${STORAGE_PREFIX}${uid}_default`);
    }
  } else {
    if (enrollmentId) {
      keysToRead.push(`${STORAGE_PREFIX}${enrollmentId}`);
    }
    if (!enrollmentId || enrollmentId === "full-stack-web" || enrollmentId === "7779e007-096a-4295-a772-be469591e24b") {
      keysToRead.push(`${STORAGE_PREFIX}full-stack-web`);
      keysToRead.push(`${STORAGE_PREFIX}default`);
    }
  }

  for (const k of keysToRead) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          for (const id of arr) {
            if (typeof id === "string") combined.add(id);
          }
        }
      }
    } catch {}
  }
  return combined;
}

/**
 * Save a completed curriculum item.
 * Updates user-scoped storage key, records a timeline event,
 * records streak activity, and notifies components.
 */
export function saveCompletedItemId(
  enrollmentId: string,
  itemId: string,
  completed: boolean,
  metadata?: { title?: string; moduleTitle?: string; courseTitle?: string },
  userId?: string | null
): Set<string> {
  const uid = resolveActiveUserId(userId);
  const current = getCompletedItemIds(enrollmentId, uid);
  if (completed) {
    current.add(itemId);
  } else {
    current.delete(itemId);
  }

  const serialized = JSON.stringify(Array.from(current));
  try {
    if (uid && uid !== "guest") {
      if (enrollmentId) {
        localStorage.setItem(`${STORAGE_PREFIX}${uid}_${enrollmentId}`, serialized);
      }
      localStorage.setItem(`${STORAGE_PREFIX}${uid}_full-stack-web`, serialized);
    } else {
      if (enrollmentId) {
        localStorage.setItem(`${STORAGE_PREFIX}${enrollmentId}`, serialized);
      }
      localStorage.setItem(`${STORAGE_PREFIX}full-stack-web`, serialized);
    }
  } catch {}

  if (completed) {
    addJourneyEvent({
      key: `lesson-${itemId}-${enrollmentId || "default"}`,
      kind: "lesson",
      title: metadata?.title || "Lesson completed",
      detail: metadata?.moduleTitle || metadata?.courseTitle || "Full Stack Web Development",
      created_at: new Date().toISOString(),
      enrollment_id: enrollmentId,
      user_id: uid,
    }, uid);
    recordDailyActivity(new Date(), uid);
  }

  notifyProgressUpdated();
  return current;
}

/**
 * Calculate accurate course progress for any enrollment.
 * For Full Stack Web Development, uses the 38 interactive curriculum items
 * and the student's completed items.
 */
export function getCourseProgress(
  enrollment: any,
  dbLessons: any[] = [],
  dbProgress: any[] = [],
  userId?: string | null
): CourseProgressInfo {
  const uid = resolveActiveUserId(userId || enrollment?.user_id);
  const enrollmentId = enrollment?.id || "full-stack-web";
  const courseSlug = enrollment?.course?.slug || enrollment?.course_id || "";
  const courseTitle = enrollment?.course?.title || "";
  const targetPct = enrollment?.course?.min_progress_pct ?? 80;

  // Resolve curriculum for this specific course track
  const courseCurriculum = getCurriculumForCourse(courseSlug || courseTitle || enrollment?.id);
  const allCurriculumItems = (courseCurriculum || []).flatMap(m => {
    if (Array.isArray(m?.items) && m.items.length > 0) return m.items;
    if (Array.isArray(m?.modules)) {
      return m.modules.flatMap(mod => Array.isArray(mod?.items) ? mod.items : []);
    }
    return [];
  }).filter((item): item is CurriculumItem => !!item && typeof item.id === "string");
  const totalLessons = allCurriculumItems.length || 1;
  const completedSet = getCompletedItemIds(enrollmentId, uid);

  // Count how many valid curriculum items have been completed in this track
  const completedLessons = allCurriculumItems.filter(item => item && completedSet.has(item.id)).length;
  const progressPct = totalLessons ? Math.round((completedLessons * 100) / totalLessons) : 0;
  const certificateUnlocked = isCertificateUnlocked(progressPct, targetPct);

  let status: CourseProgressInfo["status"] = "not_started";
  if (progressPct >= 100) status = "completed";
  else if (certificateUnlocked) status = "certificate_unlocked";
  else if (progressPct > 0) status = "in_progress";

  return {
    totalLessons,
    completedLessons,
    progressPct,
    isCertificateUnlocked: certificateUnlocked,
    targetPct,
    status,
  };
}

export function saveQuizAttempt(attempt: {
  enrollmentId: string;
  quizId: string;
  quizTitle: string;
  scorePct: number;
  passed: boolean;
  courseTitle?: string;
}, userId?: string | null) {
  const uid = resolveActiveUserId(userId);
  const attempts = getQuizAttempts();
  const newAttempt: StoredQuizAttempt = {
    id: `quiz-attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    enrollment_id: attempt.enrollmentId,
    quiz_id: attempt.quizId,
    score_pct: attempt.scorePct,
    passed: attempt.passed,
    created_at: new Date().toISOString(),
    quiz: {
      title: attempt.quizTitle,
      course_id: attempt.enrollmentId,
    },
    course_title: attempt.courseTitle || "Full Stack Web Development",
    user_id: uid,
  };

  attempts.unshift(newAttempt);
  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(attempts.slice(0, 50)));
    localStorage.setItem(`blezex_quiz_attempts_${uid}`, JSON.stringify(attempts.filter(a => !a.user_id || a.user_id === uid).slice(0, 50)));
  } catch {}

  addJourneyEvent({
    key: `quiz-${newAttempt.id}`,
    kind: "quiz",
    title: attempt.quizTitle || "Knowledge Check Quiz",
    detail: `${attempt.scorePct}% · ${attempt.passed ? "Passed" : "Keep practicing"}${newAttempt.course_title ? ` · ${newAttempt.course_title}` : ""}`,
    created_at: newAttempt.created_at,
    score_pct: attempt.scorePct,
    passed: attempt.passed,
    enrollment_id: attempt.enrollmentId,
    user_id: uid,
  }, uid);

  recordDailyActivity(new Date(), uid);
  notifyProgressUpdated();
}

export function getQuizAttempts(enrollmentId?: string, userId?: string | null): StoredQuizAttempt[] {
  const uid = resolveActiveUserId(userId);
  try {
    let list: StoredQuizAttempt[] = [];
    if (uid && uid !== "guest") {
      const userRaw = localStorage.getItem(`blezex_quiz_attempts_${uid}`);
      if (userRaw) {
        list = JSON.parse(userRaw);
      }
    }
    if (!list.length) {
      const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed.filter(a => a && a.user_id === uid);
        }
      }
    }
    if (!Array.isArray(list)) return [];
    if (!enrollmentId) return list;
    return list.filter(
      a =>
        !a.enrollment_id ||
        a.enrollment_id === enrollmentId ||
        a.enrollment_id === "full-stack-web" ||
        enrollmentId === "full-stack-web"
    );
  } catch {
    return [];
  }
}

export function saveAssignmentSubmission(sub: {
  enrollmentId: string;
  assignmentId: string;
  title: string;
  text?: string;
  link?: string;
  courseTitle?: string;
}, userId?: string | null) {
  const uid = resolveActiveUserId(userId);
  const list = getAssignmentSubmissions(undefined, uid);
  const newSub: StoredAssignmentSubmission = {
    id: `assignment-sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    enrollment_id: sub.enrollmentId,
    assignment_id: sub.assignmentId,
    title: sub.title,
    status: "submitted",
    created_at: new Date().toISOString(),
    course_title: sub.courseTitle || "Full Stack Web Development",
    text: sub.text,
    link: sub.link,
    user_id: uid,
  };

  list.unshift(newSub);
  try {
    localStorage.setItem(ASSIGNMENT_STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
    localStorage.setItem(`blezex_assignment_submissions_${uid}`, JSON.stringify(list.filter(s => s.user_id === uid).slice(0, 50)));
  } catch {}

  addJourneyEvent({
    key: `milestone-${newSub.id}`,
    kind: "milestone",
    title: sub.title || "Project milestone submitted",
    detail: `${sub.title}${newSub.course_title ? ` · ${newSub.course_title}` : ""}`,
    created_at: newSub.created_at,
    enrollment_id: sub.enrollmentId,
    user_id: uid,
  }, uid);

  recordDailyActivity(new Date(), uid);
  notifyProgressUpdated();
}

export function getAssignmentSubmissions(enrollmentId?: string, userId?: string | null): StoredAssignmentSubmission[] {
  const uid = resolveActiveUserId(userId);
  try {
    let list: StoredAssignmentSubmission[] = [];
    if (uid && uid !== "guest") {
      const userRaw = localStorage.getItem(`blezex_assignment_submissions_${uid}`);
      if (userRaw) {
        list = JSON.parse(userRaw);
      }
    }
    if (!list.length) {
      const raw = localStorage.getItem(ASSIGNMENT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed.filter(s => s && s.user_id === uid);
        }
      }
    }
    if (!Array.isArray(list)) return [];
    if (!enrollmentId) return list;
    return list.filter(
      s =>
        !s.enrollment_id ||
        s.enrollment_id === enrollmentId ||
        s.enrollment_id === "full-stack-web" ||
        enrollmentId === "full-stack-web"
    );
  } catch {
    return [];
  }
}

export function addJourneyEvent(event: JourneyEvent, userId?: string | null) {
  const uid = resolveActiveUserId(userId || event.user_id);
  const events = getStoredJourneyEvents(undefined, uid);
  const eventWithUser = { ...event, user_id: uid };
  const filtered = events.filter(e => e.key !== eventWithUser.key);
  filtered.unshift(eventWithUser);
  try {
    localStorage.setItem(JOURNEY_EVENTS_KEY, JSON.stringify(filtered.slice(0, 100)));
    localStorage.setItem(`blezex_journey_events_${uid}`, JSON.stringify(filtered.filter(e => e.user_id === uid).slice(0, 100)));
  } catch {}
}

export function getStoredJourneyEvents(enrollmentId?: string, userId?: string | null): JourneyEvent[] {
  const uid = resolveActiveUserId(userId);
  try {
    let list: JourneyEvent[] = [];
    if (uid && uid !== "guest") {
      const userRaw = localStorage.getItem(`blezex_journey_events_${uid}`);
      if (userRaw) {
        list = JSON.parse(userRaw);
      }
    }
    if (!list.length) {
      const raw = localStorage.getItem(JOURNEY_EVENTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed.filter(e => e && e.user_id === uid);
        }
      }
    }
    if (!Array.isArray(list)) return [];
    if (!enrollmentId) return list;
    return list.filter(
      e =>
        !e.enrollment_id ||
        e.enrollment_id === enrollmentId ||
        e.enrollment_id === "full-stack-web" ||
        enrollmentId === "full-stack-web"
    );
  } catch {
    return [];
  }
}

export function getAllJourneyEvents(
  enrollmentId?: string,
  dbProgress: any[] = [],
  dbLessons: any[] = [],
  dbEnrollments: any[] = [],
  dbAttempts: any[] = [],
  dbMilestones: any[] = [],
  userId?: string | null
): JourneyEvent[] {
  const uid = resolveActiveUserId(userId);
  const storedEvents = getStoredJourneyEvents(enrollmentId, uid);
  const completedIds = getCompletedItemIds(enrollmentId, uid);
  const allCurriculumItems = FULL_STACK_MODULES.flatMap(m => m.items);

  // Synthesize events for any completed items that may have been saved without an event
  const synthEvents: JourneyEvent[] = [];
  for (const item of allCurriculumItems) {
    if (completedIds.has(item.id)) {
      const exists = storedEvents.some(e => e.key.includes(item.id));
      if (!exists) {
        synthEvents.push({
          key: `lesson-${item.id}-${enrollmentId || "default"}`,
          kind: item.type === "quiz" ? "quiz" : item.type === "assignment" ? "milestone" : "lesson",
          title: item.title,
          detail: item.moduleTitle,
          created_at: new Date().toISOString(),
          enrollment_id: enrollmentId,
          user_id: uid,
        });
      }
    }
  }

  // DB progress events: ONLY for this student's enrollments
  const dbEvents: JourneyEvent[] = dbProgress
    .map(row => {
      const lesson = dbLessons.find(item => item.id === row.lesson_id);
      const enrollment = dbEnrollments.find(item => item.id === row.enrollment_id);
      if (!lesson || !enrollment) return null;
      return {
        key: `db-lesson-${row.lesson_id}-${row.enrollment_id}`,
        kind: "lesson" as const,
        title: lesson.title || "Lesson completed",
        detail: enrollment.course?.title || "Enrolled course",
        created_at: row.completed_at || new Date().toISOString(),
        enrollment_id: row.enrollment_id,
        user_id: uid,
      };
    })
    .filter(Boolean) as JourneyEvent[];

  // DB quiz attempts: ONLY for this student's enrollments
  const dbAttemptEvents: JourneyEvent[] = dbAttempts
    .filter(att => dbEnrollments.some(item => item.id === att.enrollment_id))
    .map(att => {
      const enrollment = dbEnrollments.find(item => item.id === att.enrollment_id);
      return {
        key: `db-quiz-${att.id}`,
        kind: "quiz" as const,
        title: att.quiz?.title ?? "Quiz attempt",
        detail: `${att.score_pct}% · ${att.passed ? "Passed" : "Keep practicing"}${
          enrollment?.course?.title ? ` · ${enrollment.course.title}` : ""
        }`,
        created_at: att.created_at || new Date().toISOString(),
        enrollment_id: att.enrollment_id,
        score_pct: att.score_pct,
        passed: att.passed,
        user_id: uid,
      };
    });

  // DB milestones: ONLY for this student's enrollments
  const dbMilestoneEvents: JourneyEvent[] = dbMilestones
    .filter(m => m.status !== "pending" && dbEnrollments.some(item => item.id === m.enrollment_id))
    .map(m => {
      const enrollment = dbEnrollments.find(item => item.id === m.enrollment_id);
      return {
        key: `db-milestone-${m.id}`,
        kind: "milestone" as const,
        title: m.status === "evaluated" ? "Project milestone evaluated" : "Project milestone submitted",
        detail: `${m.title}${enrollment?.course?.title ? ` · ${enrollment.course.title}` : ""}`,
        created_at: m.created_at || new Date().toISOString(),
        enrollment_id: m.enrollment_id,
        user_id: uid,
      };
    });

  const merged = [
    ...storedEvents,
    ...synthEvents,
    ...dbEvents,
    ...dbAttemptEvents,
    ...dbMilestoneEvents,
  ];

  // Deduplicate by key and sort descending by created_at
  const seen = new Set<string>();
  const unique: JourneyEvent[] = [];
  for (const ev of merged) {
    if (!seen.has(ev.key)) {
      seen.add(ev.key);
      unique.push(ev);
    }
  }

  return unique.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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
  const fallbackMeta = getCourseMetadata(courseIdOrEid);
  let enrollmentId = courseIdOrEid;
  let courseTitle = fallbackMeta.title;
  let courseDesc = fallbackMeta.description;
  let courseSlug = fallbackMeta.slug;
  let minProgress = fallbackMeta.min_progress_pct;

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

  const resolvedModules = getCurriculumForCourse(courseSlug || courseTitle || courseIdOrEid);

  return {
    course: {
      id: courseSlug,
      title: courseTitle,
      description: courseDesc,
      slug: courseSlug,
      min_progress_pct: minProgress,
    },
    modules: resolvedModules,
    enrollmentId,
    source: "static",
  };
}

export async function syncCompletedToSupabase(enrollmentId: string, lessonId: string, completed: boolean) {
  // Only attempt insert if both enrollmentId and lessonId are valid UUIDs to prevent PostgreSQL syntax errors
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(enrollmentId) || !uuidRegex.test(lessonId)) {
    return;
  }
  try {
    if (completed) {
      await supabase.from("lesson_progress").insert({ enrollment_id: enrollmentId, lesson_id: lessonId });
    } else {
      await supabase.from("lesson_progress").delete().eq("enrollment_id", enrollmentId).eq("lesson_id", lessonId);
    }
  } catch {}
}
