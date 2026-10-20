import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { supabase } from "../../lib/supabase";
import { Card } from "../../components/ui";
import {
  getCourseProgress,
  getQuizAttempts,
  getAllJourneyEvents,
} from "../../lib/curriculumService";
import { calculateStreakInfo } from "../../lib/streakService";
import { useAuth } from "../../lib/auth";

export default function StudentJourney() {
  const { profile } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);
  const [eventFilter, setEventFilter] = useState<"all" | "lesson" | "quiz" | "milestone">("all");

  // Listen for progress updates so changes in Lesson reflect instantly
  useEffect(() => {
    const handleUpdate = () => setRefreshTick(t => t + 1);
    window.addEventListener("blezex:progress-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("blezex:progress-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const read = async (query: PromiseLike<{ data: any; error: any }>) => {
          const result = await query;
          if (result.error) throw result.error;
          return result.data ?? [];
        };
        const [enrollmentRows, lessonRows, progressRows, attemptRows, milestoneRows] =
          await Promise.all([
            read(
              supabase
                .from("enrollments")
                .select(
                  "id,status,course_id,created_at,course:courses(id,title,description,slug,min_progress_pct),certificates(verification_id,status)"
                )
            ),
            read(
              supabase
                .from("lessons")
                .select("id,modules!inner(course_id)")
                .eq("status", "published")
            ),
            read(
              supabase
                .from("lesson_progress")
                .select("enrollment_id,lesson_id,completed_at")
                .order("completed_at", { ascending: false })
            ),
            read(
              supabase
                .from("quiz_attempts")
                .select(
                  "id,enrollment_id,score_pct,passed,created_at,quiz:quizzes(title,course_id)"
                )
                .order("created_at", { ascending: false })
                .limit(30)
            ),
            read(
              supabase
                .from("project_milestones")
                .select("id,enrollment_id,title,status,due_date,created_at")
                .order("created_at", { ascending: false })
            ),
          ]);

        if (cancelled) return;
        setEnrollments(enrollmentRows);
        setLessons(lessonRows);
        setProgress(progressRows);
        setAttempts(attemptRows);
        setMilestones(milestoneRows);
      } catch (cause: any) {
        if (!cancelled) setError(cause?.message ?? "Could not load your learning journey.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  // Fallback to active Full Stack Web Development course if no enrollments in DB
  const defaultEnrollment = {
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
  };

  const displayEnrollments = enrollments.length > 0 ? enrollments : [defaultEnrollment];

  const studentEnrollmentIds = useMemo(() => new Set(enrollments.map((e: any) => e.id)), [enrollments]);

  // Calculate accurate progress for each enrolled course using unified service
  const courseProgressList = useMemo(() => {
    return displayEnrollments.map(e => ({
      enrollment: e,
      progress: getCourseProgress(e, lessons, progress, profile?.id),
    }));
  }, [displayEnrollments, lessons, progress, profile?.id, refreshTick]);

  // Gather all activity dates from database strictly for THIS student
  const dbActivityDates = useMemo(() => {
    const dates: string[] = [];
    if (studentEnrollmentIds.size === 0) return dates;

    progress.forEach((p: any) => {
      if (p.completed_at && studentEnrollmentIds.has(p.enrollment_id)) {
        dates.push(p.completed_at);
      }
    });
    attempts.forEach((a: any) => {
      if (a.created_at && studentEnrollmentIds.has(a.enrollment_id)) {
        dates.push(a.created_at);
      }
    });
    milestones.forEach((m: any) => {
      if (m.created_at && studentEnrollmentIds.has(m.enrollment_id)) {
        dates.push(m.created_at);
      }
    });
    return dates;
  }, [studentEnrollmentIds, progress, attempts, milestones]);

  const streakInfo = useMemo(
    () => calculateStreakInfo(profile?.id, dbActivityDates),
    [profile?.id, dbActivityDates, refreshTick]
  );

  const totalLessons = courseProgressList.reduce(
    (sum, item) => sum + item.progress.totalLessons,
    0
  );
  const completedLessons = courseProgressList.reduce(
    (sum, item) => sum + item.progress.completedLessons,
    0
  );
  const overallProgress = totalLessons
    ? Math.round((completedLessons * 100) / totalLessons)
    : 0;

  // Passed quizzes: combine database attempts and curriculum quizzes for THIS student
  const localQuizAttempts = getQuizAttempts(undefined, profile?.id);
  const passedLocal = localQuizAttempts.filter(a => a.passed).length;
  const passedDb = attempts.filter(attempt => attempt.passed && studentEnrollmentIds.has(attempt.enrollment_id)).length;
  const passedQuizzes = passedLocal + passedDb;

  // Certificates earned
  const earnedCertificates = displayEnrollments.flatMap(enrollment =>
    (enrollment.certificates ?? []).filter((certificate: any) => certificate.status === "issued")
  );

  // Full timeline combining curriculum activities and DB rows for THIS student
  const allEvents = useMemo(() => {
    return getAllJourneyEvents(
      displayEnrollments[0]?.id || "full-stack-web",
      progress,
      lessons,
      displayEnrollments,
      attempts,
      milestones,
      profile?.id
    );
  }, [displayEnrollments, progress, lessons, attempts, milestones, profile?.id, refreshTick]);

  const filteredEvents = useMemo(() => {
    if (eventFilter === "all") return allEvents;
    return allEvents.filter(e => e.kind === eventFilter);
  }, [allEvents, eventFilter]);

  if (loading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-sm font-semibold text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <span>Loading your learning journey…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
        <p className="font-bold">Error loading journey</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <header className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E1B4B] p-6 text-white shadow-xl md:p-9 border border-slate-800">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 right-1/4 -z-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
        />

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-blue-300">
              <Icon name="award" size={13} className="text-blue-400" />
              <span>Career Milestones</span>
            </span>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              My Learning Journey
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              Every lesson, knowledge check, and practical project builds your software engineering capability. Review your accomplishments below.
            </p>
          </div>

          <Link
            to="/student/courses"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 shadow-md transition hover:bg-blue-50"
          >
            <Icon name="courses" size={16} />
            <span>Explore Courses</span>
          </Link>
        </div>
      </header>

      {/* 4 Stat Achievement Metric Cards */}
      <section aria-label="Journey achievements" className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {[
          {
            label: "Overall Track Progress",
            value: `${overallProgress}%`,
            sub: `${completedLessons} of ${totalLessons} topics done`,
            icon: "progress" as const,
            tone: "bg-blue-50 text-blue-700 border-blue-200/60",
          },
          {
            label: "Completed Lessons",
            value: completedLessons,
            sub: "Pedagogical modules",
            icon: "book" as const,
            tone: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
          },
          {
            label: "Quizzes Passed",
            value: passedQuizzes,
            sub: "Validated comprehension",
            icon: "quiz" as const,
            tone: "bg-violet-50 text-violet-700 border-violet-200/60",
          },
          {
            label: "Certificates Earned",
            value: earnedCertificates.length,
            sub: overallProgress >= 80 ? "Eligible for Review" : "Unlocks at 80%",
            icon: "certificate" as const,
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

      {/* Learning Habit & Daily Streak Consistency Card */}
      <section aria-label="Learning streak consistency">
        <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-white p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
                <Icon name="flame" size={24} />
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-100 border border-amber-200 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-800">
                    Daily Study Habit
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-500">
                    {streakInfo.totalActiveDays} Total Active Days Recorded
                  </span>
                </div>

                <h2 className="mt-1 font-display text-xl font-extrabold text-slate-900">
                  {streakInfo.currentStreak} Day Learning Streak
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
                  {streakInfo.isActiveToday
                    ? "Streak alive! You have successfully completed coursework today. Miss a day, and the streak resets to 0."
                    : streakInfo.currentStreak > 0
                    ? `Keep your ${streakInfo.currentStreak}-day streak alive! Complete any lesson or quiz today before midnight.`
                    : "Complete any lesson, quiz, or assignment today to ignite your daily streak!"}
                </p>
              </div>
            </div>

            {/* Streak metrics + Calendar badges */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/80 border border-amber-200/60 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-left sm:text-center pr-2 sm:border-r border-slate-200/80">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  All-Time Best
                </span>
                <span className="font-display text-xl font-black text-amber-700">
                  {streakInfo.maxStreak} <span className="text-xs font-bold text-slate-500">Days</span>
                </span>
              </div>

              {/* 7-Day Week Indicator */}
              <div className="flex items-center gap-1.5">
                {streakInfo.weekDays.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span
                      title={`${d.dayName} (${d.date}): ${d.hasActivity ? "Completed ✓" : d.isToday ? "Today" : d.isFuture ? "Upcoming" : "Missed"}`}
                      className={`grid h-7 w-7 place-items-center rounded-lg text-[10px] font-bold ${
                        d.hasActivity
                          ? "bg-emerald-500 text-white shadow-xs"
                          : d.isToday
                          ? "bg-amber-100 text-amber-800 border-2 border-amber-400 animate-pulse font-extrabold"
                          : d.isFuture
                          ? "bg-slate-50 text-slate-400 border border-dashed border-slate-200"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {d.hasActivity ? "✓" : d.dayName[0]}
                    </span>
                    <span className={`text-[9px] font-bold ${d.isToday ? "text-amber-700 font-extrabold" : "text-slate-400"}`}>
                      {d.dayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Milestones Cards */}
      <section className="space-y-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
            Active Milestones
          </span>
          <h2 className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-slate-900">
            Course Tracks & Thresholds
          </h2>
        </div>

        <div className="space-y-4">
          {courseProgressList.map(({ enrollment, progress: progInfo }) => {
            const courseTitle = enrollment.course?.title ?? "Course";
            const effectiveCourseId = enrollment.id || "full-stack-web";
            const done = progInfo.completedLessons;
            const total = progInfo.totalLessons;
            const pct = progInfo.progressPct;
            const target = progInfo.targetPct;
            const certificate = enrollment.certificates?.find((item: any) => item.status === "issued");
            const isUnlocked = progInfo.isCertificateUnlocked;

            return (
              <Card
                key={enrollment.id}
                className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs transition-all hover:!border-blue-300 hover:!shadow-lg bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                      {courseTitle}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {done} of {total} lessons & activities completed
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl font-black text-slate-900">{pct}%</span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {pct >= 100 ? "Completed ✓" : pct > 0 ? "In Progress" : "Not Started"}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`${courseTitle} progress`}
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 pt-3.5">
                  <p className={isUnlocked ? "font-bold text-emerald-700" : "font-medium text-slate-500"}>
                    {certificate
                      ? "Certificate earned ✓"
                      : isUnlocked
                      ? "Certificate unlocked · awaiting course completion review"
                      : `Certificate unlocks at ${target}% · ${Math.max(0, target - pct)}% remaining`}
                  </p>
                  <Link
                    to={`/student/course/${effectiveCourseId}`}
                    className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    <span>Continue Track</span>
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Timeline Section with Filter Tabs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600">
              Live Activity Stream
            </span>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              Learning Activity Timeline
            </h2>
          </div>

          {/* Event Filter Tabs */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100/80 p-1">
            {[
              { id: "all", label: `All (${allEvents.length})` },
              { id: "lesson", label: "Lessons" },
              { id: "quiz", label: "Quizzes" },
              { id: "milestone", label: "Projects" },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setEventFilter(tab.id as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  eventFilter === tab.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs bg-white">
          {!filteredEvents.length ? (
            <div className="py-8 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400 mb-2">
                <Icon name="journey" size={20} />
              </span>
              <p className="text-sm font-bold text-slate-800">No activity recorded for this filter</p>
              <p className="text-xs text-slate-500 mt-1">Complete lessons and practice tests to build your history.</p>
            </div>
          ) : (
            <ol className="relative space-y-6 pl-4 border-l-2 border-slate-100 ml-3">
              {filteredEvents.map((event: any) => (
                <li key={event.key} className="relative pl-6">
                  {/* Timeline Dot Node */}
                  <span
                    className={`absolute -left-[27px] top-0 grid h-7 w-7 place-items-center rounded-full text-white shadow-xs ${
                      event.kind === "lesson"
                        ? "bg-emerald-500 ring-4 ring-emerald-50"
                        : event.kind === "quiz"
                        ? "bg-violet-600 ring-4 ring-violet-50"
                        : "bg-blue-600 ring-4 ring-blue-50"
                    }`}
                  >
                    <Icon
                      name={
                        event.kind === "lesson"
                          ? "check"
                          : event.kind === "quiz"
                          ? "quiz"
                          : "milestone"
                      }
                      size={13}
                    />
                  </span>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {event.title}
                      </span>
                      <time className="text-xs font-semibold text-slate-400">
                        {event.created_at
                          ? new Date(event.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recent"}
                      </time>
                    </div>

                    {event.detail && (
                      <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                        {event.detail}
                      </p>
                    )}

                    <div className="mt-2.5 flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                          event.kind === "lesson"
                            ? "bg-emerald-100 text-emerald-800"
                            : event.kind === "quiz"
                            ? "bg-violet-100 text-violet-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {event.kind === "lesson"
                          ? "Lesson Completed"
                          : event.kind === "quiz"
                          ? "Knowledge Check"
                          : "Project Submission"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </section>
    </div>
  );
}

