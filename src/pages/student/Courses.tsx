import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { supabase } from "../../lib/supabase";
import { Card } from "../../components/ui";
import { getCourseProgress, getCompletedItemIds } from "../../lib/curriculumService";
import { FULL_STACK_MODULES, getCourseTotalMinutes, formatMinutesToHuman } from "../../lib/curriculumData";

export default function StudentCourses() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "in_progress" | "completed">("all");

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
          supabase
            .from("enrollments")
            .select("id,status,course_id,course:courses(title,description,slug,min_progress_pct)"),
          supabase
            .from("modules")
            .select("id,title,course_id,lessons(id,status)")
            .order("position"),
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

  const displayCourses = useMemo(() => {
    return enrollments.length > 0
      ? enrollments
      : [
          {
            id: "full-stack-web",
            status: "active",
            course_id: "full-stack-web",
            course: {
              title: "Full Stack Web Development",
              description:
                "A comprehensive journey across HTML & CSS, JavaScript, SQL databases, Node.js & Express APIs, React, and Git basics. Build job-ready full-stack applications.",
              slug: "full-stack-web",
              min_progress_pct: 80,
            },
          },
        ];
  }, [enrollments]);

  const filteredCourses = useMemo(() => {
    return displayCourses.filter(enrollment => {
      const title = enrollment.course?.title?.toLowerCase() || "";
      const desc = enrollment.course?.description?.toLowerCase() || "";
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || title.includes(query) || desc.includes(query);

      const progress = getCourseProgress(enrollment);
      if (activeTab === "in_progress") {
        return matchesSearch && progress.progressPct > 0 && progress.progressPct < 100;
      }
      if (activeTab === "completed") {
        return matchesSearch && progress.progressPct >= 100;
      }
      return matchesSearch;
    });
  }, [displayCourses, searchQuery, activeTab, refreshTick]);

  const fullStackDuration = formatMinutesToHuman(getCourseTotalMinutes(FULL_STACK_MODULES));

  if (loading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-sm font-semibold text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <span>Loading learning tracks…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
        <p className="font-bold">Error loading courses</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header with Breadcrumb & Quick Actions */}
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-blue-700 shadow-2xs">
            <Icon name="courses" size={13} />
            <span>Curriculum Catalog</span>
          </span>
          <h1 className="mt-2.5 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            My Learning Tracks
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 max-w-2xl">
            Explore sequential curriculum tracks, interactive cheat sheets, practice assessments, and real-world project deliverables.
          </p>
        </div>

        <Link
          to="/student/journey"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 shadow-2xs"
        >
          <Icon name="journey" size={16} className="text-blue-600" />
          <span>My Journey & Milestones</span>
        </Link>
      </header>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5">
          {[
            { id: "all", label: `All Tracks (${displayCourses.length})` },
            { id: "in_progress", label: "In Progress" },
            { id: "completed", label: "Completed" },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="search" size={15} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search topics, skills, or tracks..."
            className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 shadow-2xs"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map(enrollment => {
          const courseModules = modules.filter(module => module.course_id === enrollment.course_id);
          const isFullStack =
            enrollment.course?.slug === "full-stack-web" ||
            !enrollment.course?.slug ||
            enrollment.course?.title?.toLowerCase().includes("full stack");
          const totalSubCoursesCount = isFullStack ? FULL_STACK_MODULES.length : courseModules.length || 1;
          const progress = getCourseProgress(enrollment);
          const totalLessons = progress.totalLessons;
          const completedLessons = progress.completedLessons;
          const pct = progress.progressPct;
          const tags = isFullStack
            ? ["HTML5", "CSS3", "JavaScript", "SQL", "Node.js", "React", "Git"]
            : courseModules.length
            ? courseModules.slice(0, 5).map(m => m.title)
            : ["Web Engineering"];

          return (
            <Link
              key={enrollment.id}
              to={`/student/course/${enrollment.id}`}
              className="group block rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              <Card className="h-full !rounded-3xl !border-slate-200/90 !p-0 !shadow-xs transition-all duration-300 group-hover:-translate-y-1.5 group-hover:!border-blue-300 group-hover:!shadow-xl flex flex-col justify-between overflow-hidden bg-white">
                <div className="p-6">
                  {/* Top Header Row with Icon and Progress Ring / Pill */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <Icon name="courses" size={26} />
                    </span>

                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full text-white shadow-xs ${
                        pct >= 100
                          ? "bg-emerald-500"
                          : pct > 0
                          ? "bg-blue-600 font-extrabold text-[11px]"
                          : "bg-slate-200 text-slate-500 font-bold text-[10px]"
                      }`}
                      aria-label={`Course progress ${pct}%`}
                    >
                      {pct >= 100 ? <Icon name="check" size={17} /> : `${pct}%`}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="mt-5 flex items-center gap-2">
                    <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 border border-blue-200/50">
                      Career Accelerator
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {totalSubCoursesCount} Sub-Courses
                    </span>
                  </div>

                  <h2 className="mt-2 font-display text-xl font-black leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
                    {enrollment.course?.title ?? "Course"}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-xs sm:text-sm leading-relaxed text-slate-500">
                    {enrollment.course?.description ||
                      "Open your course to explore lessons, projects, and other learning resources."}
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

                  {/* Progress Bar */}
                  <div className="mt-5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className={pct > 0 ? "text-blue-600 font-extrabold" : "text-slate-400"}>
                        {pct >= 100 ? "Completed ✓" : pct > 0 ? `${pct}% completed` : "Not started"}
                      </span>
                      <span className="text-slate-400">
                        {completedLessons} / {totalLessons}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="mt-5 flex min-h-7 flex-wrap gap-1.5">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-lg border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 group-hover:border-slate-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5 bg-slate-50/70 rounded-b-3xl">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Enrollment
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Curriculum</span>
                    <Icon name="arrow" size={13} />
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {!filteredCourses.length && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-10 text-center shadow-xs">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
            <Icon name="search" size={20} />
          </span>
          <h2 className="font-display text-lg font-bold text-slate-800">No tracks match your search</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or switch back to the "All Tracks" tab.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

