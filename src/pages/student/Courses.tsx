import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { supabase } from "../../lib/supabase";
import { Card } from "../../components/ui";
import { getCourseProgress } from "../../lib/curriculumService";
import { FULL_STACK_MODULES, getCourseTotalMinutes, formatMinutesToHuman } from "../../lib/curriculumData";

export default function StudentCourses() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

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
    (async () => {
      try {
        const [enrollmentResult, moduleResult] = await Promise.all([
          supabase.from("enrollments").select("id,status,course_id,course:courses(title,description,slug,min_progress_pct)"),
          supabase.from("modules").select("id,title,course_id,lessons(id,status)").order("position"),
        ]);
        if (enrollmentResult.error) throw enrollmentResult.error;
        if (moduleResult.error) throw moduleResult.error;
        setEnrollments(enrollmentResult.data ?? []);
        setModules(moduleResult.data ?? []);
      } catch (cause: any) {
        setError(cause?.message ?? "Could not load your courses.");
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshTick]);

  if (loading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-sm font-semibold text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <span>Loading your courses…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
        Could not load your courses: {error}
      </p>
    );
  }

  const fullStackDuration = formatMinutesToHuman(getCourseTotalMinutes(FULL_STACK_MODULES));

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
            Learning Catalog
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            My Courses
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Select a learning track to access modules, topic cheat sheets, practice assessments, and project milestones.
          </p>
        </div>
        <Link
          to="/student/journey"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 shadow-xs"
        >
          <Icon name="journey" size={16} className="text-blue-600" />
          <span>My Journey</span>
        </Link>
      </header>

      {(() => {
        const displayCourses = enrollments.length > 0 ? enrollments : [
          {
            id: "full-stack-web",
            status: "active",
            course_id: "full-stack-web",
            course: {
              title: "Full Stack Web Development",
              description: "A comprehensive journey across HTML & CSS, JavaScript, SQL databases, Node.js & Express APIs, React, and Git basics. Build job-ready full-stack applications.",
              slug: "full-stack-web",
              min_progress_pct: 80,
            }
          }
        ];

        return (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayCourses.map(enrollment => {
              const courseModules = modules.filter(module => module.course_id === enrollment.course_id);
              const isFullStack = enrollment.course?.slug === "full-stack-web" || !enrollment.course?.slug || enrollment.course?.title?.toLowerCase().includes("full stack");
              const totalSubCoursesCount = isFullStack ? FULL_STACK_MODULES.length : (courseModules.length || 1);
              const progress = getCourseProgress(enrollment);
              const totalLessons = progress.totalLessons;
              const completedLessons = progress.completedLessons;
              const pct = progress.progressPct;
              const tags = isFullStack
                ? ["HTML & CSS", "JavaScript", "SQL", "Node.js", "React", "Git"]
                : (courseModules.length ? courseModules.slice(0, 4).map(module => module.title) : ["Web Development"]);

              return (
                <Link
                  key={enrollment.id}
                  to={`/student/course/${enrollment.id}`}
                  className="group block rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                >
                  <Card className="h-full !rounded-3xl !border-slate-200/90 !p-0 !shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:!border-blue-300 group-hover:!shadow-xl flex flex-col justify-between overflow-hidden bg-white">
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-blue-500/15 text-blue-700 shadow-xs ring-1 ring-blue-500/20">
                          <Icon name="courses" size={26} />
                        </span>
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full text-white shadow-xs ${
                            pct >= 100 ? "bg-emerald-500" : pct > 0 ? "bg-blue-600" : "bg-slate-200 text-slate-500"
                          }`}
                          aria-label={`Course progress ${pct}%`}
                        >
                          {pct >= 100 ? <Icon name="check" size={16} /> : <span className="text-[10px] font-extrabold">{pct}%</span>}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-200/50">
                          Main Career Track
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {totalSubCoursesCount} Sub-Courses
                        </span>
                      </div>

                      <h2 className="mt-1.5 font-display text-lg font-extrabold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                        {enrollment.course?.title ?? "Course"}
                      </h2>
                      <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                        {enrollment.course?.description || "Open your course to explore lessons, projects, and other learning resources."}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                        <span className="font-bold text-slate-700">{totalSubCoursesCount} Sub-Courses</span>
                        <span className="text-slate-300">·</span>
                        <span>{totalLessons} lessons & activities</span>
                        {isFullStack && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="flex items-center gap-1 font-bold text-amber-700">
                              <Icon name="clock" size={12} className="text-amber-500" />
                              {fullStackDuration}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Course progress bar */}
                      <div className="mt-4 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-semibold">
                          <span className={pct > 0 ? "text-blue-700 font-bold" : "text-slate-400"}>
                            {pct >= 100 ? "Completed ✓" : pct > 0 ? `${pct}% completed` : "Not started"}
                          </span>
                          <span className="text-slate-400">{completedLessons} / {totalLessons}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-400 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex min-h-7 flex-wrap gap-1.5">
                        {tags.map(tag => (
                          <span key={tag} className="rounded-lg border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5 bg-slate-50/60 rounded-b-3xl">
                      <span className="text-xs font-semibold capitalize text-emerald-700 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active enrollment
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-0.5 transition-transform">
                        Open curriculum <Icon name="arrow" size={13} />
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}
