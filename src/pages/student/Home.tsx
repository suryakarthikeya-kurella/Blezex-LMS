import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import Notifications from "../../components/Notifications";
import Icon from "../../components/Icon";
import { Card, Empty } from "../../components/ui";
import {
  getCourseProgress,
  getQuizAttempts,
  getAssignmentSubmissions,
  getCompletedItemIds,
} from "../../lib/curriculumService";
import { FULL_STACK_MODULES, getCurriculumForCourse } from "../../lib/curriculumData";
import { calculateStreakInfo } from "../../lib/streakService";

const dateLabel = (value: string) => {
  if (!value) return "";
  const dateStr = value.includes("T") ? value.split("T")[0] : value;
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

export default function StudentHome() {
  const { profile } = useAuth();
  const [enr, setEnr] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [prog, setProg] = useState<any[]>([]);
  const [asg, setAsg] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [qa, setQa] = useState<any[]>([]);
  const [ms, setMs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  // Listen for progress and streak updates from Lesson completions, quizzes, or assignments
  useEffect(() => {
    const handleUpdate = () => setRefreshTick(t => t + 1);
    window.addEventListener("blezex:progress-updated", handleUpdate);
    window.addEventListener("blezex:streak-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("blezex:progress-updated", handleUpdate);
      window.removeEventListener("blezex:streak-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const g = async (q: PromiseLike<{ data: any; error: any }>) => {
          const r = await q;
          if (r.error) throw r.error;
          return r.data ?? [];
        };
        const [enrRows, lessonRows, progRows, asgRows, subsRows, qaRows, msRows] =
          await Promise.all([
            g(
              supabase
                .from("enrollments")
                .select(
                  "id,status,course_id,course:courses(id,title,description,slug,min_progress_pct),mentor:profiles!enrollments_mentor_id_fkey(full_name),certificates(verification_id,status)"
                )
            ),
            g(
              supabase
                .from("lessons")
                .select("id, modules!inner(course_id)")
                .eq("status", "published")
            ),
            g(supabase.from("lesson_progress").select("enrollment_id,lesson_id")),
            g(supabase.from("assignments").select("id,title,course_id,due_date")),
            g(
              supabase
                .from("submissions")
                .select("assignment_id,enrollment_id,status,score,feedback,created_at")
                .order("created_at", { ascending: false })
            ),
            g(
              supabase
                .from("quiz_attempts")
                .select("score_pct,passed,created_at,quiz:quizzes(title)")
                .order("created_at", { ascending: false })
                .limit(5)
            ),
            g(
              supabase
                .from("project_milestones")
                .select("id,title,status,due_date,enrollment_id")
                .neq("status", "evaluated")
            ),
          ]);

        if (cancelled) return;
        setEnr(enrRows);
        setLessons(lessonRows);
        setProg(progRows);
        setAsg(asgRows);
        setSubs(subsRows);
        setQa(qaRows);
        setMs(msRows);
      } catch (e: any) {
        if (!cancelled) setErr(e.message ?? "Network error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  // Fallback to active Full Stack Web Development track if student has no enrollments yet
  const displayEnrollments = useMemo(() => {
    return enr.length > 0
      ? enr
      : [
          {
            id: "full-stack-web",
            status: "active",
            course_id: "full-stack-web",
            course: {
              id: "full-stack-web",
              title: "Full Stack Web Development",
              description:
                "A comprehensive journey across HTML, CSS, JavaScript, React, Node.js APIs, and SQL databases. Build job-ready full-stack applications.",
              slug: "full-stack-web",
              min_progress_pct: 80,
            },
            certificates: [],
          },
        ];
  }, [enr]);

  // Calculate accurate progress for each enrolled course using unified service
  const courseProgressList = useMemo(() => {
    return displayEnrollments.map(e => ({
      enrollment: e,
      progress: getCourseProgress(e, lessons, prog),
    }));
  }, [displayEnrollments, lessons, prog, refreshTick]);

  const primaryEnrollment = displayEnrollments[0];
  const primaryProgress = courseProgressList[0]?.progress;
  const effectiveCourseId = primaryEnrollment?.id || "full-stack-web";

  // Identify next uncompleted lesson to spotlight for instant continue
  const nextLessonSpotlight = useMemo(() => {
    const primaryCurriculum = getCurriculumForCourse(
      primaryEnrollment?.course?.slug || primaryEnrollment?.course?.title || effectiveCourseId
    );
    const completedSet = getCompletedItemIds(effectiveCourseId);
    for (let modIdx = 0; modIdx < primaryCurriculum.length; modIdx++) {
      const mod = primaryCurriculum[modIdx];
      for (const item of mod.items) {
        if (!completedSet.has(item.id)) {
          return {
            item,
            module: mod,
            moduleIndex: modIdx + 1,
            isCompleted: false,
          };
        }
      }
    }
    const lastMod = primaryCurriculum[primaryCurriculum.length - 1];
    return {
      item: lastMod.items[lastMod.items.length - 1],
      module: lastMod,
      moduleIndex: primaryCurriculum.length,
      isCompleted: true,
    };
  }, [primaryEnrollment, effectiveCourseId, refreshTick]);

  const totalCompletedAcrossCourses = courseProgressList.reduce(
    (sum, item) => sum + item.progress.completedLessons,
    0
  );
  const totalLessonsAcrossCourses = courseProgressList.reduce(
    (sum, item) => sum + item.progress.totalLessons,
    0
  );
  const overall = totalLessonsAcrossCourses
    ? Math.round((totalCompletedAcrossCourses * 100) / totalLessonsAcrossCourses)
    : 0;

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = asg
    .filter(
      a =>
        a.due_date &&
        a.due_date >= today &&
        displayEnrollments.some(e => e.course_id === a.course_id && e.status === "active") &&
        !subs.some(s => s.assignment_id === a.id)
    )
    .sort((a, b) => a.due_date.localeCompare(b.due_date));

  const feedback = subs.filter(s => s.status === "graded").slice(0, 5);

  // Merge database quiz attempts with interactive curriculum quiz attempts
  const localQuizAttempts = getQuizAttempts();
  const allQuizAttempts = [
    ...qa.map(q => ({
      title: q.quiz?.title ?? "Quiz",
      created_at: q.created_at,
      score_pct: q.score_pct,
      passed: q.passed,
    })),
    ...localQuizAttempts.map(a => ({
      title: a.quiz?.title || a.course_title || "Knowledge Check",
      created_at: a.created_at,
      score_pct: a.score_pct,
      passed: a.passed,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Merge database milestones with submitted curriculum assignments
  const localAssignments = getAssignmentSubmissions();
  const allMilestones = [
    ...ms.map(m => ({
      id: m.id,
      title: m.title,
      status: m.status,
      due_date: m.due_date,
    })),
    ...localAssignments.map(s => ({
      id: s.id,
      title: s.title,
      status: s.status,
      due_date: s.created_at ? s.created_at.slice(0, 10) : undefined,
    })),
  ];

  // Dynamic study streak info (Option 1: consecutive days active, misses a day = 0, tracks max streak)
  const streakInfo = useMemo(() => calculateStreakInfo(), [refreshTick]);

  if (loading) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <p className="text-sm font-semibold text-slate-500">Preparing your personalized learning dashboard…</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
        <p className="font-bold">Could not load dashboard data</p>
        <p className="mt-1">{err}. Please check your connection and reload.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E1B4B] p-6 text-white shadow-xl md:p-9 border border-slate-800">
        {/* Luminous Glow Orbs */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 right-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-blue-300 backdrop-blur-xs">
              <Icon name="sparkle" size={13} className="text-blue-400" />
              <span>{profile?.is_alumni ? "Alumni Learning Portal" : "Student Career Accelerator"}</span>
            </div>

            <h1 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">
              Welcome back, {profile?.full_name?.split(" ")[0] ?? "Learner"} 👋
            </h1>

            <p className="text-sm leading-relaxed text-slate-300 sm:text-base max-w-xl">
              Consistent daily practice turns concepts into muscle memory. Keep up the momentum on your Full Stack track!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={`/student/course/${effectiveCourseId}/lesson/${nextLessonSpotlight.item.id}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]"
              >
                <span>{nextLessonSpotlight.isCompleted ? "Review Completed Track" : "Resume Next Lesson"}</span>
                <Icon name="arrow" size={15} />
              </Link>

              <Link
                to="/student/courses"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-xs transition hover:bg-white/20"
              >
                <span>All Courses</span>
              </Link>
            </div>
          </div>

          {/* Learning Streak & Consistency Card on Hero */}
          <div className="shrink-0 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md text-left w-full md:w-auto md:min-w-[300px] shadow-lg shadow-black/10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                  <Icon name="flame" size={15} />
                </span>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-blue-200">
                    Daily Streak
                  </span>
                  <span className="font-display text-sm font-extrabold text-white">
                    {streakInfo.currentStreak} {streakInfo.currentStreak === 1 ? "Day" : "Days"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  title="Highest historical streak achieved"
                  className="inline-flex items-center gap-1 rounded-full border border-blue-400/30 bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-blue-200 shadow-2xs"
                >
                  <Icon name="award" size={11} className="text-amber-300" />
                  <span>Max {streakInfo.maxStreak}d</span>
                </span>
              </div>
            </div>

            {/* Week Days Attendance Breakdown */}
            <div className="mt-3.5 grid grid-cols-7 gap-1.5">
              {streakInfo.weekDays.map((d, i) => {
                let badgeClass = "bg-white/10 text-slate-300 border border-white/10";
                let content: React.ReactNode = d.dayName[0];

                if (d.hasActivity) {
                  badgeClass = "bg-emerald-500 text-white font-black shadow-xs shadow-emerald-500/30 border border-emerald-400";
                  content = "✓";
                } else if (d.isToday) {
                  badgeClass = "bg-amber-400/20 text-amber-300 font-black border-2 border-amber-400 animate-pulse";
                  content = d.dayName[0];
                } else if (d.isFuture) {
                  badgeClass = "bg-white/5 text-slate-500 border border-dashed border-white/10";
                  content = d.dayName[0];
                }

                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span
                      title={`${d.dayName} (${d.date}): ${
                        d.hasActivity
                          ? "Lesson or activity completed ✓"
                          : d.isToday
                          ? "Today (study now to keep streak)"
                          : d.isFuture
                          ? "Upcoming"
                          : "Missed (streak resets if day skipped)"
                      }`}
                      className={`grid h-7 w-7 place-items-center rounded-lg text-[10px] transition-all hover:scale-110 ${badgeClass}`}
                    >
                      {content}
                    </span>
                    <span
                      className={`text-[9px] font-bold ${
                        d.isToday ? "text-amber-300 font-extrabold" : "text-slate-400"
                      }`}
                    >
                      {d.dayName}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Motivational Footer / Status Badge */}
            <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5 text-[11px]">
              <span className="truncate text-slate-300 text-[11px] font-medium" title={streakInfo.message}>
                {streakInfo.message}
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${
                  streakInfo.isActiveToday
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                }`}
              >
                {streakInfo.isActiveToday ? "Today Done ✓" : "Due Today"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Up Next: Continue Learning Spotlight Card */}
      <section aria-label="Continue learning spotlight">
        <div className="relative overflow-hidden rounded-3xl border border-blue-200/90 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <Icon name="play" size={20} />
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    Up Next in Sub-Course 0{nextLessonSpotlight.moduleIndex}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs font-bold text-slate-600">
                    {nextLessonSpotlight.module.title}
                  </span>
                </div>

                <h2 className="mt-1 font-display text-lg font-extrabold text-slate-900 sm:text-xl truncate">
                  {nextLessonSpotlight.item.title}
                </h2>

                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <Icon name="clock" size={13} className="text-amber-500" />
                    <span>{nextLessonSpotlight.item.duration}</span>
                  </span>
                  <span>·</span>
                  <span className="font-semibold capitalize text-indigo-700">
                    {nextLessonSpotlight.item.type === "cheatsheet"
                      ? "Interactive Cheat Sheet & Knowledge Check"
                      : nextLessonSpotlight.item.type === "quiz"
                      ? "Sub-Course Exam"
                      : "Graded Practical Project"}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={`/student/course/${effectiveCourseId}/lesson/${nextLessonSpotlight.item.id}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
            >
              <span>{nextLessonSpotlight.isCompleted ? "Review Topic" : "Start Lesson Now"}</span>
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Stat Metric Overview Cards */}
      <section aria-label="Learning metrics" className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {[
          {
            label: "Curriculum Progress",
            value: `${primaryProgress?.progressPct ?? overall}%`,
            sub: `${primaryProgress?.completedLessons ?? totalCompletedAcrossCourses} / ${primaryProgress?.totalLessons ?? totalLessonsAcrossCourses} lessons done`,
            icon: "progress" as const,
            tone: "bg-blue-50 text-blue-700 border-blue-200/60",
          },
          {
            label: "Enrolled Tracks",
            value: displayEnrollments.length,
            sub: `${primaryEnrollment?.course?.title || "Career Track"} Active`,
            icon: "courses" as const,
            tone: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
          },
          {
            label: "Quizzes & Checks",
            value: allQuizAttempts.length,
            sub: `${allQuizAttempts.filter(q => q.passed).length} passed with ≥70% score`,
            icon: "quiz" as const,
            tone: "bg-violet-50 text-violet-700 border-violet-200/60",
          },
          {
            label: "Assignments Due",
            value: upcoming.length,
            sub: upcoming.length > 0 ? "Upcoming deadlines" : "All caught up!",
            icon: "assignment" as const,
            tone: "bg-amber-50 text-amber-700 border-amber-200/60",
          },
        ].map(item => (
          <div
            key={item.label}
            className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-500">{item.label}</span>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${item.tone}`}>
                <Icon name={item.icon} size={18} />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {item.value}
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-400">{item.sub}</p>
          </div>
        ))}
      </section>

      {/* Main Course Progress & Sub-Courses Snapshot */}
      <section aria-label="Course completion status" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Active Career Accelerator Track
            </span>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              Course Progress & Curriculum Structure
            </h2>
          </div>
          <Link
            to={`/student/course/${effectiveCourseId}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
          >
            <span>View Track Curriculum</span>
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="grid gap-4">
          {courseProgressList.map(({ enrollment, progress }) => {
            const courseTitle = enrollment.course?.title || "Full Stack Web Development";
            const completedCount = progress.completedLessons;
            const totalCount = progress.totalLessons;
            const pct = progress.progressPct;
            const isCert = progress.isCertificateUnlocked;

            return (
              <Card
                key={enrollment.id}
                className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs transition-all hover:!border-blue-300 hover:!shadow-lg bg-white"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider border ${
                          pct >= 100
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : isCert
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : pct > 0
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {pct >= 100
                          ? "Course Completed ✓"
                          : isCert
                          ? "Certificate Unlocked 🎉"
                          : pct > 0
                          ? `In Progress · ${pct}%`
                          : "Ready to Begin"}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-slate-500">
                        {completedCount} of {totalCount} lessons & activities completed
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-xl font-extrabold text-slate-900 md:text-2xl">
                      {courseTitle}
                    </h3>

                    <p className="mt-1 line-clamp-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-500">
                      {enrollment.course?.description ||
                        "Master HTML, CSS, modern JavaScript ES6+, SQL databases, Node.js REST APIs, and React frontend development."}
                    </p>

                    {/* Sub-courses Mini Grid */}
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                      {getCurriculumForCourse(
                        enrollment.course?.slug || enrollment.course?.title || effectiveCourseId
                      ).map((m, idx) => {
                        const completedSet = getCompletedItemIds(effectiveCourseId);
                        const doneInMod = m.items.filter(it => completedSet.has(it.id)).length;
                        const modPct = m.items.length ? Math.round((doneInMod * 100) / m.items.length) : 0;
                        const isDone = modPct === 100;

                        return (
                          <div
                            key={m.id}
                            className={`rounded-xl border p-2.5 text-center transition ${
                              isDone
                                ? "border-emerald-200 bg-emerald-50/50 text-emerald-950"
                                : doneInMod > 0
                                ? "border-blue-200 bg-blue-50/50 text-blue-950"
                                : "border-slate-100 bg-slate-50/60 text-slate-600"
                            }`}
                          >
                            <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">
                              Sub-0{idx + 1}
                            </span>
                            <span className="block truncate text-[11px] font-bold text-slate-800" title={m.title}>
                              {m.title.split(" ")[0]}
                            </span>
                            <span className="mt-1 block text-[10px] font-extrabold text-blue-600">
                              {isDone ? "✓ Done" : `${modPct}%`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display text-4xl font-black tracking-tight text-slate-900">
                      {pct}%
                    </span>
                    <p className="text-xs font-bold text-slate-400">Overall Progress</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`${courseTitle} completion`}
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Footer status & Actions */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
                  <span
                    className={
                      isCert ? "font-bold text-emerald-700" : "font-medium text-slate-500"
                    }
                  >
                    {pct >= 100
                      ? "Course 100% completed! All certifications issued."
                      : isCert
                      ? "Certificate unlocked! Ready for completion review."
                      : `Certificate unlocks at 80% progress (${Math.max(0, 80 - pct)}% remaining)`}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/student/course/${effectiveCourseId}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-2xs"
                    >
                      <span>Course Overview</span>
                    </Link>

                    <Link
                      to={`/student/course/${effectiveCourseId}/lesson/${nextLessonSpotlight.item.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700"
                    >
                      <span>Continue Learning</span>
                      <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Assignments and Quizzes Grid */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs bg-white">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600">
                Action Items
              </span>
              <h2 className="mt-1 font-display text-xl font-extrabold text-slate-900">
                Upcoming Assignments & Deadlines
              </h2>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60">
              <Icon name="clock" size={18} />
            </span>
          </div>

          {!upcoming.length ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 font-bold mb-2">
                ✓
              </span>
              <p className="text-sm font-bold text-slate-800">You're all caught up!</p>
              <p className="text-xs text-slate-500 mt-1">No pending assignments or overdue tasks at this time.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcoming.slice(0, 5).map(a => {
                const course = displayEnrollments.find(e => e.course_id === a.course_id);
                return (
                  <div key={a.id} className="flex items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">{a.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {course?.course?.title ?? "Course assignment"}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="inline-block rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200/60">
                        Due {dateLabel(a.due_date)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Recent Quizzes Card */}
        <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs bg-white">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600">
                Comprehension
              </span>
              <h2 className="mt-1 font-display text-xl font-extrabold text-slate-900">
                Recent Knowledge Checks
              </h2>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-50 text-violet-700 border border-violet-200/60">
              <Icon name="quiz" size={18} />
            </span>
          </div>

          {!allQuizAttempts.length ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center">
              <p className="text-sm font-bold text-slate-800">No quizzes attempted yet</p>
              <p className="text-xs text-slate-500 mt-1">Test your understanding inside lesson modules to see scores here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {allQuizAttempts.slice(0, 5).map((q, i) => (
                <div key={`${q.created_at}-${i}`} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">{q.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {q.created_at ? dateLabel(q.created_at) : "Recent attempt"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-display text-base font-black text-slate-900">
                      {q.score_pct}%
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold border ${
                        q.passed
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {q.passed ? "PASSED" : "RETRY"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Mentor Feedback & Project Milestones Section */}
      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs bg-white">
          <div className="mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
              Mentorship Guidance
            </span>
            <h2 className="mt-1 font-display text-xl font-extrabold text-slate-900">
              Feedback & Graded Submissions
            </h2>
          </div>

          {!feedback.length ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center">
              <p className="text-sm font-bold text-slate-800">No graded submissions yet</p>
              <p className="text-xs text-slate-500 mt-1">Your code reviews and mentor feedback will appear here as soon as evaluated.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {feedback.map((s, i) => (
                <div key={`${s.assignment_id}-${i}`} className="py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-slate-800">Assignment Evaluation</p>
                    <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                      Score: {s.score ?? "—"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {s.feedback || "Your submission has been evaluated."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs bg-white">
          <div className="mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700">
              Practical Projects
            </span>
            <h2 className="mt-1 font-display text-xl font-extrabold text-slate-900">
              Project Milestones & Artifacts
            </h2>
          </div>

          {!allMilestones.length ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center">
              <p className="text-sm font-bold text-slate-800">No project milestones yet</p>
              <p className="text-xs text-slate-500 mt-1">Build practical sub-course projects to showcase in your portfolio.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {allMilestones.slice(0, 5).map(m => (
                <div key={m.id} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">{m.title}</p>
                    <p className="mt-0.5 text-xs capitalize text-slate-500 font-medium">{m.status}</p>
                  </div>
                  {m.due_date && (
                    <span className="shrink-0 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 border border-indigo-200/50">
                      {dateLabel(m.due_date)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <Notifications />
    </div>
  );
}

