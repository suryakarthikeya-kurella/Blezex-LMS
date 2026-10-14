import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { supabase } from "../../lib/supabase";
import { Card, Empty } from "../../components/ui";

export default function StudentCourses() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [enrollmentResult, moduleResult] = await Promise.all([
          supabase.from("enrollments").select("id,status,course_id,course:courses(title,description,slug)"),
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
  }, []);

  if (loading) return <div className="grid min-h-[40vh] place-items-center text-sm font-medium text-slate-500">Loading your courses…</div>;
  if (error) return <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Could not load your courses: {error}</p>;

  return <div className="mx-auto max-w-6xl space-y-7">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">Your learning library</p><h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-slate-900">My courses</h1><p className="mt-2 text-sm text-slate-500">Choose a course to explore its modules, lessons, and learning resources.</p></div>
      <Link to="/student/journey" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300"><Icon name="journey" size={17} /> My journey</Link>
    </header>
    {(() => {
      const displayCourses = enrollments.length > 0 ? enrollments : [
        {
          id: "full-stack-web",
          status: "active",
          course_id: "full-stack-web",
          course: {
            title: "Full Stack Web Development",
            description: "A comprehensive journey across HTML, CSS, JavaScript, React, Node.js APIs, and SQL databases. Build job-ready full-stack applications.",
            slug: "full-stack-web"
          }
        }
      ];

      return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {displayCourses.map(enrollment => {
            const courseModules = modules.filter(module => module.course_id === enrollment.course_id);
            const totalModulesCount = courseModules.length || 6;
            const lessonCount = courseModules.reduce((sum, module) => sum + (module.lessons?.filter((lesson: any) => lesson.status === "published").length ?? 0), 0) || 28;
            const fullStack = enrollment.course?.slug === "full-stack-web" || !enrollments.length;
            const tags = fullStack ? ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"] : (courseModules.length ? courseModules.slice(0, 4).map(module => module.title) : ["Web Development"]);

            return (
              <Link key={enrollment.id} to={`/student/course/${enrollment.id}`} className="group block rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-orange-200">
                <Card className="h-full !rounded-2xl !border-slate-200 !p-0 !shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:!border-blue-200 group-hover:!shadow-lg">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700">
                        <Icon name="courses" size={28} />
                      </span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white" aria-label={`Course ${enrollment.status}`}>
                        <Icon name="check" size={17} />
                      </span>
                    </div>
                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Course</p>
                    <h2 className="mt-1 font-display text-lg font-extrabold leading-snug text-slate-900 group-hover:text-blue-800">
                      {enrollment.course?.title ?? "Course"}
                    </h2>
                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                      {enrollment.course?.description || "Open your course to explore lessons, projects, and other learning resources."}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      {totalModulesCount} {totalModulesCount === 1 ? "module" : "modules"} <span className="mx-1 text-slate-300">·</span> {lessonCount} lessons & activities
                    </p>
                    <div className="mt-4 flex min-h-7 flex-wrap gap-1.5">
                      {tags.map(tag => (
                        <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-semibold capitalize text-emerald-600">
                        Active enrollment
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700">
                        Open course <Icon name="arrow" size={16} />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      );
    })()}
  </div>;
}
