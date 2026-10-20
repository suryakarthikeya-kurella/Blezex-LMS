import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { supabase } from "../../lib/supabase";
import { Card } from "../../components/ui";
import { getCourseProgress, getCompletedItemIds } from "../../lib/curriculumService";
import { useAuth } from "../../lib/auth";
import {
  FULL_STACK_MODULES,
  getCourseTotalMinutes,
  formatMinutesToHuman,
  getCurriculumForCourse,
  LAUNCH_COURSES_METADATA,
} from "../../lib/curriculumData";

export function getCourseCodeBadge(slugOrTitle: string): string {
  const s = slugOrTitle.toLowerCase();
  if (s.includes("full-stack") || s.includes("full stack")) return "Technical 01";
  if (s.includes("machine learning") || s.includes("machine-learning") || s.includes("data science") || s.includes("ai-ml")) return "Technical 02";
  if (s.includes("data analytics") || s.includes("business intelligence")) return "Technical 03";
  if (s.includes("automation") || s.includes("generative")) return "Technical 04";
  if (s.includes("python")) return "Technical 05";
  if (s.includes("marketing") || s.includes("digital")) return "Non-technical 06";
  if (s.includes("communication")) return "Non-technical 07";
  if (s.includes("entrepreneurship") || s.includes("business development")) return "Non-technical 08";
  if (s.includes("career") || s.includes("carrer") || s.includes("readiness") || s.includes("employability")) return "Non-technical 09";
  return "Career Track";
}

const getCourseTheme = (slugOrTitle: string) => {
  const s = slugOrTitle.toLowerCase();

  // 7. Communication & Professional Skills
  if (s.includes("communication") || s.includes("etiquette") || s.includes("presentation")) {
    return {
      gradient: "from-pink-600 via-rose-600 to-fuchsia-700",
      accentBorder: "group-hover:!border-rose-300",
      shadow: "shadow-rose-500/20",
      pillBg: "bg-rose-50 text-rose-700 border-rose-200/60",
      barColor: "from-pink-600 via-rose-600 to-fuchsia-600",
      iconName: "certificate" as const,
    };
  }

  // 8. Entrepreneurship & Business Development
  if (s.includes("entrepreneurship") || s.includes("startup") || s.includes("business development")) {
    return {
      gradient: "from-orange-600 via-amber-600 to-red-600",
      accentBorder: "group-hover:!border-orange-300",
      shadow: "shadow-orange-500/20",
      pillBg: "bg-orange-50 text-orange-700 border-orange-200/60",
      barColor: "from-orange-600 via-amber-600 to-red-500",
      iconName: "milestone" as const,
    };
  }

  // 9. Career Readiness & Employability
  if (s.includes("career") || s.includes("employability") || s.includes("interview") || s.includes("readiness")) {
    return {
      gradient: "from-emerald-700 via-teal-700 to-slate-800",
      accentBorder: "group-hover:!border-teal-300",
      shadow: "shadow-teal-500/20",
      pillBg: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
      barColor: "from-emerald-600 via-teal-600 to-slate-700",
      iconName: "award" as const,
    };
  }

  // 2. AI, Machine Learning & Data Science
  if (s.includes("machine learning") || s.includes("data science") || s.includes("ai-ml")) {
    return {
      gradient: "from-teal-600 via-emerald-600 to-cyan-700",
      accentBorder: "group-hover:!border-teal-300",
      shadow: "shadow-teal-500/20",
      pillBg: "bg-teal-50 text-teal-700 border-teal-200/60",
      barColor: "from-teal-600 via-emerald-600 to-cyan-600",
      iconName: "sparkle" as const,
    };
  }

  // 5. Python Programming & Problem Solving
  if (s.includes("python-programming") || s.includes("python programming") || (s.includes("python") && !s.includes("data"))) {
    return {
      gradient: "from-blue-600 via-sky-600 to-indigo-700",
      accentBorder: "group-hover:!border-sky-300",
      shadow: "shadow-sky-500/20",
      pillBg: "bg-sky-50 text-sky-700 border-sky-200/60",
      barColor: "from-blue-600 via-sky-600 to-indigo-600",
      iconName: "code" as const,
    };
  }

  // 4. Generative AI & Intelligent Automation
  if (s.includes("generative") || s.includes("gen-ai") || s.includes("ai-automation") || s.includes("automation")) {
    return {
      gradient: "from-violet-600 via-purple-600 to-indigo-700",
      accentBorder: "group-hover:!border-purple-300",
      shadow: "shadow-purple-500/20",
      pillBg: "bg-purple-50 text-purple-700 border-purple-200/60",
      barColor: "from-violet-600 via-purple-600 to-indigo-600",
      iconName: "sparkle" as const,
    };
  }

  // 3. Data Analytics & Business Intelligence
  if (s.includes("data") || s.includes("analytics") || s.includes("business intelligence")) {
    return {
      gradient: "from-emerald-600 via-teal-600 to-cyan-700",
      accentBorder: "group-hover:!border-emerald-300",
      shadow: "shadow-emerald-500/20",
      pillBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      barColor: "from-emerald-600 via-teal-600 to-cyan-600",
      iconName: "progress" as const,
    };
  }

  // 6. Digital Marketing & Personal Branding
  if (s.includes("marketing") || s.includes("digital") || s.includes("branding")) {
    return {
      gradient: "from-amber-500 via-orange-600 to-rose-600",
      accentBorder: "group-hover:!border-amber-300",
      shadow: "shadow-amber-500/20",
      pillBg: "bg-amber-50 text-amber-700 border-amber-200/60",
      barColor: "from-amber-500 via-orange-600 to-rose-500",
      iconName: "target" as const,
    };
  }

  // Cloud & DevOps
  if (s.includes("cloud") || s.includes("devops")) {
    return {
      gradient: "from-sky-500 via-blue-600 to-indigo-700",
      accentBorder: "group-hover:!border-sky-300",
      shadow: "shadow-sky-500/20",
      pillBg: "bg-sky-50 text-sky-700 border-sky-200/60",
      barColor: "from-sky-500 via-blue-600 to-indigo-600",
      iconName: "dashboard" as const,
    };
  }

  // UI/UX Design
  if (s.includes("ui") || s.includes("ux") || s.includes("design")) {
    return {
      gradient: "from-fuchsia-600 via-pink-600 to-rose-600",
      accentBorder: "group-hover:!border-pink-300",
      shadow: "shadow-pink-500/20",
      pillBg: "bg-pink-50 text-pink-700 border-pink-200/60",
      barColor: "from-fuchsia-600 via-pink-600 to-rose-500",
      iconName: "pencil" as const,
    };
  }

  // 1. Full-Stack Web Development Default
  return {
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    accentBorder: "group-hover:!border-blue-300",
    shadow: "shadow-blue-500/20",
    pillBg: "bg-blue-50 text-blue-700 border-blue-200/60",
    barColor: "from-blue-600 via-indigo-600 to-emerald-500",
    iconName: "code" as const,
  };
};

const getCourseTags = (slugOrTitle: string): string[] => {
  const s = slugOrTitle.toLowerCase();
  if (s.includes("communication") || s.includes("etiquette"))
    return ["Minto Pyramid", "Active Listening", "Slide Design", "SBI Feedback", "Harvard Negotiation", "Gravitas"];
  if (s.includes("entrepreneurship") || s.includes("startup") || s.includes("business development"))
    return ["The Mom Test", "Lean Canvas", "B2B Outbound", "SPIN Selling", "CRM Pipelines", "Pitch Decks"];
  if (s.includes("career") || s.includes("employability") || s.includes("readiness"))
    return ["Google XYZ Resume", "LinkedIn SEO", "STAR Method", "Fermi Estimation", "Cold Networking", "Salary Negotiation"];
  if (s.includes("ai-ml") || s.includes("machine learning") || s.includes("data science"))
    return ["NumPy", "Pandas", "Scikit-Learn", "EDA", "ROC-AUC", "FastAPI"];
  if (s.includes("python-programming") || s.includes("python programming") || (s.includes("python") && !s.includes("data")))
    return ["Python 3", "OOP & Dunder", "Data Structures", "Algorithms", "pytest", "Big-O Analysis"];
  if (s.includes("generative") || s.includes("automation") || s.includes("gen-ai"))
    return ["LLM Prompting", "OpenAI & Claude", "RAG Pipelines", "AI Agents", "n8n Automation", "Evals"];
  if (s.includes("data") || s.includes("analytics") || s.includes("business intelligence"))
    return ["Excel Analytics", "Advanced SQL", "Power BI", "Data Cleaning", "Dashboards", "Business Insights"];
  if (s.includes("marketing") || s.includes("digital") || s.includes("branding"))
    return ["Growth Funnels", "Technical SEO", "Meta Ads", "Google Ads", "Email Flows", "GA4 Analytics"];
  if (s.includes("cloud") || s.includes("devops"))
    return ["Linux", "Docker", "AWS Cloud", "GitHub Actions", "Terraform", "Kubernetes"];
  if (s.includes("ui") || s.includes("ux") || s.includes("design"))
    return ["Design Thinking", "Task Flows", "Figma", "Auto-Layout", "WCAG AA", "Prototyping"];
  return ["HTML5 & CSS3", "JavaScript", "SQL", "Node.js", "React", "Git"];
};

export default function StudentCourses() {
  const { profile } = useAuth();
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
            .select("id,status,course_id,course:courses(id,title,description,slug,min_progress_pct)")
            .eq("status", "active"),
          supabase
            .from("modules")
            .select("id,title,course_id,lessons(id,status)")
            .order("position"),
        ]);
        if (enrollmentResult.error) throw enrollmentResult.error;
        if (moduleResult.error) throw moduleResult.error;
        // Keep ONLY active enrollments that have a valid course created in admin portal
        const validEnrollments = (enrollmentResult.data ?? []).filter(
          (e: any) => e.status === "active" && e.course && (e.course as any).title
        );
        setEnrollments(validEnrollments);
        setModules(moduleResult.data ?? []);
      } catch (cause: any) {
        setError(cause?.message ?? "Could not load your courses.");
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshTick]);

  const displayCourses = useMemo(() => {
    return enrollments;
  }, [enrollments]);

  const filteredCourses = useMemo(() => {
    return displayCourses.filter(enrollment => {
      const title = enrollment.course?.title?.toLowerCase() || "";
      const desc = enrollment.course?.description?.toLowerCase() || "";
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || title.includes(query) || desc.includes(query);

      const progress = getCourseProgress(enrollment, undefined, undefined, profile?.id);
      if (activeTab === "in_progress") {
        return matchesSearch && progress.progressPct > 0 && progress.progressPct < 100;
      }
      if (activeTab === "completed") {
        return matchesSearch && progress.progressPct >= 100;
      }
      return matchesSearch;
    });
  }, [displayCourses, searchQuery, activeTab, profile?.id, refreshTick]);

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
            Explore sequential curriculum tracks, interactive cheat sheets, practice assessments, and real-world project deliverables across software engineering, AI, cloud, data, and design.
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
          const courseCurriculum = getCurriculumForCourse(
            enrollment.course?.slug || enrollment.course?.title || enrollment.course_id
          );
          const totalSubCoursesCount = courseCurriculum.length;
          const progress = getCourseProgress(enrollment, undefined, undefined, profile?.id);
          const totalLessons = progress.totalLessons;
          const completedLessons = progress.completedLessons;
          const pct = progress.progressPct;
          const trackDuration = formatMinutesToHuman(getCourseTotalMinutes(courseCurriculum));
          const courseIdentifier = enrollment.course?.slug || enrollment.course?.title || "";
          const theme = getCourseTheme(courseIdentifier);
          const tags = getCourseTags(courseIdentifier);

          return (
            <Link
              key={enrollment.id}
              to={`/student/course/${enrollment.id}`}
              className="group block rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              <Card className={`h-full !rounded-3xl !border-slate-200/90 !p-0 !shadow-xs transition-all duration-300 group-hover:-translate-y-1.5 ${theme.accentBorder} group-hover:!shadow-xl flex flex-col justify-between overflow-hidden bg-white`}>
                <div className="p-6">
                  {/* Top Header Row with Icon and Progress Ring / Pill */}
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${theme.gradient} text-white shadow-md ${theme.shadow} group-hover:scale-105 transition-transform`}>
                      <Icon name={theme.iconName} size={26} />
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
                    <span className={`rounded-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border ${theme.pillBg}`}>
                      {getCourseCodeBadge(enrollment.course?.title || enrollment.course?.slug || "")}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {totalSubCoursesCount} Sub-Courses
                    </span>
                  </div>

                  <h2 className="mt-2 font-display text-xl font-black leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
                    {enrollment.course?.title || "Career Track"}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-xs sm:text-sm leading-relaxed text-slate-500">
                    {courseIdentifier.toLowerCase().includes("ai automation") || courseIdentifier.toLowerCase().includes("ai-automation")
                      ? "Architect end-to-end event-driven workflows, visual n8n pipelines, LLMs, and autonomous agents."
                      : courseIdentifier.toLowerCase().includes("data analytics") || courseIdentifier.toLowerCase().includes("data-analytics")
                      ? "Excel modeling, advanced SQL, Python Pandas, Power BI, Tableau, ETL pipelines, and predictive analytics."
                      : courseIdentifier.toLowerCase().includes("ai-ml") || courseIdentifier.toLowerCase().includes("machine learning") || courseIdentifier.toLowerCase().includes("data science")
                      ? "Linear algebra, Python, supervised ML, deep neural nets, computer vision, NLP, LLMs, and MLOps."
                      : courseIdentifier.toLowerCase().includes("career") || courseIdentifier.toLowerCase().includes("readiness") || courseIdentifier.toLowerCase().includes("employability")
                      ? "ATS resume engineering, LinkedIn networking, STAR behavioral interviews, quantitative aptitude, AI productivity, and corporate success."
                      : courseIdentifier.toLowerCase().includes("entrepreneurship") || courseIdentifier.toLowerCase().includes("business development") || courseIdentifier.toLowerCase().includes("business-development")
                      ? "Customer discovery, Lean Canvas modeling, financial statements, B2B sales pipelines, startup funding, and venture scaling."
                      : courseIdentifier.toLowerCase().includes("python")
                      ? "Core syntax, CPython memory models, data structures, algorithms, OOP, asyncio concurrency, and FastAPI applications."
                      : courseIdentifier.toLowerCase().includes("communication")
                      ? "Business communication, workplace English, active listening, Minto Pyramid writing, public speaking, negotiation, and executive presence."
                      : enrollment.course?.description ||
                        "Open your course to explore lessons, projects, and other learning resources."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="font-bold text-slate-700">{totalSubCoursesCount} Sub-Courses</span>
                    <span className="text-slate-300">·</span>
                    <span>{totalLessons} lessons & activities</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <Icon name="clock" size={12} className="text-amber-500" />
                      {trackDuration}
                    </span>
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

