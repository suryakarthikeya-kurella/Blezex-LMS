import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { supabase } from "../../lib/supabase";
import { Card, Empty } from "../../components/ui";
import {
  getCourseProgress,
  getQuizAttempts,
  getAllJourneyEvents,
} from "../../lib/curriculumService";

export default function StudentJourney() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  // Listen for progress updates so changes in Lesson or other tabs reflect instantly
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

  if (loading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-sm font-medium text-slate-500">
        Loading your journey…
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        Could not load your journey: {error}
      </p>
    );
  }

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

  // Calculate accurate progress for each enrolled course using unified service
  const courseProgressList = displayEnrollments.map(e => ({
    enrollment: e,
    progress: getCourseProgress(e, lessons, progress),
  }));

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

  // Passed quizzes: combine database attempts and curriculum quizzes
  const localQuizAttempts = getQuizAttempts();
  const passedLocal = localQuizAttempts.filter(a => a.passed).length;
  const passedDb = attempts.filter(attempt => attempt.passed).length;
  const passedQuizzes = passedLocal + passedDb;

  // Certificates earned
  const earnedCertificates = displayEnrollments.flatMap(enrollment =>
    (enrollment.certificates ?? []).filter((certificate: any) => certificate.status === "issued")
  );

  // Full timeline combining curriculum activities (lessons, quizzes, projects) and DB rows
  const journeyEvents = getAllJourneyEvents(
    displayEnrollments[0]?.id || "full-stack-web",
    progress,
    lessons,
    displayEnrollments,
    attempts,
    milestones
  ).slice(0, 20);

  return (
    <div className="space-y-7">
      <header className="rounded-[26px] bg-gradient-to-br from-[#17243D] via-[#233B60] to-[#31516B] p-6 text-white shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-orange-200">
          Every step counts
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">My journey</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">
              See the progress you have made, milestones you have reached, and what is next.
            </p>
          </div>
          <Link
            to="/student/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-orange-50 shadow-sm"
          >
            <Icon name="courses" size={17} /> All courses
          </Link>
        </div>
      </header>

      {/* Overview Stat Cards */}
      <section aria-label="Journey achievements" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: "Overall progress",
            value: `${overallProgress}%`,
            note: `${completedLessons} of ${totalLessons} lessons`,
            icon: "progress" as const,
            style: "bg-blue-50 text-blue-700",
          },
          {
            label: "Completed lessons",
            value: completedLessons,
            note: "Learning milestones",
            icon: "book" as const,
            style: "bg-emerald-50 text-emerald-700",
          },
          {
            label: "Quizzes passed",
            value: passedQuizzes,
            note: "Knowledge checks",
            icon: "quiz" as const,
            style: "bg-violet-50 text-violet-700",
          },
          {
            label: "Certificates earned",
            value: earnedCertificates.length,
            note: overallProgress >= 80 ? "Eligible for certificate" : "Verified achievements",
            icon: "certificate" as const,
            style: "bg-orange-50 text-orange-700",
          },
        ].map(item => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold text-slate-500 md:text-sm">{item.label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${item.style}`}>
                <Icon name={item.icon} size={18} />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-slate-900">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500">{item.note}</p>
          </div>
        ))}
      </section>

      {/* Course Milestones Section */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-brand">Your progress</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-slate-900">
            Course milestones
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
                className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm transition hover:!border-blue-200 md:!p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 md:text-xl">
                      {courseTitle}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {done} of {total} lessons & activities completed
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-2xl font-black text-slate-900">{pct}%</span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {pct >= 100 ? "Completed" : pct > 0 ? "In Progress" : "Not Started"}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`${courseTitle} progress`}
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 pt-3">
                  <p className={isUnlocked ? "font-semibold text-emerald-700" : "text-slate-500"}>
                    {certificate
                      ? "Certificate earned ✓"
                      : isUnlocked
                      ? "Certificate unlocked · awaiting course completion review"
                      : `Certificate unlocks at ${target}% · ${Math.max(0, target - pct)}% to go`}
                  </p>
                  <Link
                    to={`/student/course/${effectiveCourseId}`}
                    className="inline-flex items-center gap-1 font-bold text-brand hover:text-orange-700"
                  >
                    Continue course <Icon name="arrow" size={15} />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Activity Timeline */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-blue-700">
            Your recent activity
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-slate-900">
            Journey timeline
          </h2>
        </div>
        <Card className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm md:!p-6">
          {!journeyEvents.length ? (
            <Empty t="Your lesson completions, quizzes, and project submissions will appear here." />
          ) : (
            <ol className="space-y-5">
              {journeyEvents.map((event: any) => (
                <li key={event.key} className="flex gap-3.5">
                  <span
                    className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                      event.kind === "lesson"
                        ? "bg-emerald-50 text-emerald-700"
                        : event.kind === "quiz"
                        ? "bg-violet-50 text-violet-700"
                        : "bg-blue-50 text-blue-700"
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
                      size={17}
                    />
                  </span>
                  <div className="min-w-0 flex-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800">{event.title}</p>
                      <time className="text-xs text-slate-400">
                        {event.created_at
                          ? new Date(event.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </time>
                    </div>
                    {event.detail && (
                      <p className="mt-1 text-xs text-slate-500">{event.detail}</p>
                    )}
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
