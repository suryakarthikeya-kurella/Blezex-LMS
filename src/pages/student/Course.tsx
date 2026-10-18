import { useEffect, useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Icon, { IconName } from "../../components/Icon";
import { isCertificateUnlocked } from "../../lib/certificateUnlock";
import { Card, Empty } from "../../components/ui";
import { fetchCourseCurriculum, getCompletedItemIds, isCurriculumModuleUnlocked } from "../../lib/curriculumService";
import {
  CurriculumModule,
  CurriculumItem,
  getCourseTotalMinutes,
  getModuleTotalMinutes,
  formatMinutesToHuman,
} from "../../lib/curriculumData";

const SUB_COURSE_TAGS: Record<string, string[]> = {
  "html-css-foundations": ["HTML5", "CSS3", "BOOTSTRAP"],
  "js-fundamentals": ["JAVASCRIPT", "ES6+", "DOM"],
  "database-sql": ["SQL", "POSTGRESQL", "DATABASE"],
  "node-express": ["NODE.JS", "EXPRESS", "REST API"],
  "react-js": ["REACT", "HOOKS", "JSX"],
  "git-basics": ["GIT", "GITHUB", "WORKFLOW"],
};

export default function StudentCourse() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [subCourses, setSubCourses] = useState<CurriculumModule[]>([]);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [selectedSubCourse, setSelectedSubCourse] = useState<CurriculumModule | null>(null);
  const [lockAlertMessage, setLockAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDrawerModules, setOpenDrawerModules] = useState<Record<string, boolean>>({});

  const toggleDrawerModule = (moduleId: string) => {
    setOpenDrawerModules(prev => ({
      ...prev,
      [moduleId]: prev[moduleId] === false ? true : false,
    }));
  };

  const expandAllDrawerModules = () => {
    if (!selectedSubCourse?.modules) return;
    const next: Record<string, boolean> = {};
    selectedSubCourse.modules.forEach(m => { next[m.id] = true; });
    setOpenDrawerModules(next);
  };

  const collapseAllDrawerModules = () => {
    if (!selectedSubCourse?.modules) return;
    const next: Record<string, boolean> = {};
    selectedSubCourse.modules.forEach(m => { next[m.id] = false; });
    setOpenDrawerModules(next);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchCourseCurriculum(eid || "full-stack-web");
        if (cancelled) return;
        setCourse(result.course);
        setSubCourses(result.modules);
        const completedIds = getCompletedItemIds(eid);
        setCompleted(completedIds);
      } catch (e) {
        console.error("Error loading course:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [eid]);

  // Close drawer on Escape key and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedSubCourse(null);
        setLockAlertMessage(null);
      }
    };
    if (selectedSubCourse) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSubCourse]);

  const allItems: CurriculumItem[] = useMemo(() => subCourses.flatMap(sc => sc.items), [subCourses]);
  const totalItemsCount = allItems.length;
  const completedCount = allItems.filter(item => completed.has(item.id)).length;
  const progressPct = totalItemsCount ? Math.round((completedCount * 100) / totalItemsCount) : 0;
  const requiredPct = course?.min_progress_pct ?? 80;
  const certificateUnlocked = isCertificateUnlocked(progressPct, requiredPct);

  // Dynamic Course Duration calculated from curriculum items
  const totalCourseMinutes = useMemo(() => getCourseTotalMinutes(subCourses), [subCourses]);
  const formattedTotalCourseDuration = formatMinutesToHuman(totalCourseMinutes);

  const effectiveEid = eid || "full-stack-web";

  // Sub-course custom SVG icons
  const renderSubCourseIcon = (subCourseId: string) => {
    switch (subCourseId) {
      case "html-css-foundations":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
          </svg>
        );
      case "js-fundamentals":
        return <Icon name="code" size={22} />;
      case "database-sql":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </svg>
        );
      case "node-express":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <rect x="2" y="2" width="20" height="8" rx="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        );
      case "react-js":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        );
      case "git-basics":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
        );
      default:
        return <Icon name="book" size={22} />;
    }
  };

  const handleSubCourseClick = (subCourse: CurriculumModule, index: number) => {
    const unlocked = isCurriculumModuleUnlocked(index, subCourses, completed);
    if (!unlocked) {
      const prevSub = subCourses[index - 1];
      setLockAlertMessage(
        `Note: Complete Sub-Course ${index} (${prevSub?.title || "previous"}) to earn official certification credits. You can explore all modules below.`
      );
    } else {
      setLockAlertMessage(null);
    }
    setSelectedSubCourse(subCourse);
  };

  if (loading) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-sm font-semibold text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <span>Loading course and sub-courses…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7 pb-12">
      {/* Top Breadcrumb Nav */}
      <Link
        to="/student/courses"
        className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 transition hover:text-brand"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 bg-white transition group-hover:border-slate-300 group-hover:bg-slate-50 shadow-xs">
          <Icon name="arrowLeft" size={14} />
        </span>
        <span>Back to my courses</span>
      </Link>

      {/* Lock alert notice if user clicks locked subcourse */}
      {lockAlertMessage && (
        <div className="flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3.5 text-xs font-semibold text-amber-900 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-200 text-amber-800">
              <Icon name="lock" size={13} />
            </span>
            <span>{lockAlertMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setLockAlertMessage(null)}
            className="rounded-lg p-1 text-amber-700 hover:bg-amber-100 transition"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      )}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main Content: Course & Sub-Courses Grid */}
        <main className="min-w-0 space-y-7">
          {/* Main Course Hero Card */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-blue-50/30 p-6 sm:p-8 md:p-9 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                    Main Career Track
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200/80 bg-indigo-50/60 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 shadow-xs">
                    6 Sub-Courses
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 shadow-xs">
                    Full Stack 2026
                  </span>
                </div>

                <h1 className="mt-3.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
                  {course?.title || "Full Stack Web Development"}
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 font-normal sm:text-base">
                  {course?.description ||
                    "Master full-stack engineering across 6 progressive sub-courses. Complete each sub-course sequentially to build job-ready skills in modern frontend, backend APIs, relational databases, and version control."}
                </p>

                {/* Stat pills cluster */}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 shadow-xs">
                    <Icon name="book" size={15} className="text-blue-600" />
                    <span>{subCourses.length} Sub-Courses</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 shadow-xs">
                    <Icon name="sheet" size={15} className="text-indigo-600" />
                    <span>{totalItemsCount} Lessons & Activities</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200/80 bg-amber-50/60 px-3 py-1.5 text-amber-900 shadow-xs">
                    <Icon name="clock" size={15} className="text-amber-600" />
                    <span className="font-bold">{formattedTotalCourseDuration} Total</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-3 py-1.5 text-emerald-800 shadow-xs">
                    <Icon name="certificate" size={15} className="text-emerald-600" />
                    <span>Master Track Certification</span>
                  </span>
                </div>
              </div>

              {/* Progress Ring Card */}
              <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm backdrop-blur-xs">
                <div
                  className="relative grid h-18 w-18 place-items-center rounded-full transition-all duration-500 shadow-xs"
                  style={{
                    background: `conic-gradient(#2563eb ${progressPct * 3.6}deg, #e2e8f0 ${progressPct * 3.6}deg)`,
                  }}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white font-display text-sm font-extrabold text-blue-900 shadow-inner">
                    {progressPct}%
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Program Progress</p>
                  <p className="mt-0.5 font-display text-base font-extrabold text-slate-900">
                    {completedCount} <span className="text-xs font-medium text-slate-500">/ {totalItemsCount} completed</span>
                  </p>
                  <span
                    className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      progressPct >= 100
                        ? "bg-emerald-100 text-emerald-800"
                        : progressPct > 0
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {progressPct >= 100 ? "Track Completed!" : progressPct > 0 ? "In Progress" : "Get Started"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Sub-Courses Grid Section Header */}
          <section className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Icon name="courses" size={20} className="text-blue-600" />
                <h2 className="font-display text-xl font-extrabold text-slate-900">
                  Program Sub-Courses
                </h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Click on any sub-course to view its lessons, practice questions, and graded assessments.
              </p>
            </div>

            {/* Sub-Course Cards Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {subCourses.map((subCourse, idx) => {
                const unlocked = isCurriculumModuleUnlocked(idx, subCourses, completed);
                const items = subCourse.items;
                const doneCount = items.filter(it => completed.has(it.id)).length;
                const isAllDone = items.length > 0 && doneCount === items.length;
                const subCoursePct = items.length ? Math.round((doneCount * 100) / items.length) : 0;
                const tags = SUB_COURSE_TAGS[subCourse.id] || ["WEB", "DEV"];
                const duration = formatMinutesToHuman(getModuleTotalMinutes(subCourse));

                return (
                  <div
                    key={subCourse.id}
                    onClick={() => handleSubCourseClick(subCourse, idx)}
                    className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg ${
                      !unlocked ? "border-slate-200 bg-slate-50/70" : "border-slate-200/90"
                    }`}
                  >
                    <div>
                      {/* Top Row: Icon + Status Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`grid h-12 w-12 place-items-center rounded-2xl transition-all shadow-xs ${
                            !unlocked
                              ? "bg-slate-200 text-slate-500"
                              : isAllDone
                              ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/25"
                              : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                          }`}
                        >
                          {renderSubCourseIcon(subCourse.id)}
                        </span>

                        {/* Top-right Status Indicator (like green checkmark in image) */}
                        <div>
                          {isAllDone ? (
                            <span
                              className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white shadow-sm"
                              title="Sub-course completed"
                            >
                              <Icon name="check" size={15} />
                            </span>
                          ) : !unlocked ? (
                            <span
                              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500"
                              title="Locked"
                            >
                              <Icon name="lock" size={11} /> Locked
                            </span>
                          ) : doneCount > 0 ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                              {doneCount}/{items.length} ({subCoursePct}%)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                              Ready
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sub-course Number & Title */}
                      <div className="mt-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Sub-Course {idx + 1}
                        </span>
                        <h3 className="mt-0.5 font-display text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {idx + 1}. {subCourse.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                          {subCourse.description}
                        </p>
                      </div>

                      {/* Meta: Topics count and duration */}
                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>{items.length} Topics</span>
                        <span className="text-slate-300">·</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Icon name="clock" size={12} className="text-amber-500" />
                          <span>{duration}</span>
                        </span>
                      </div>

                      {/* Tags / Pills (like HTML, CSS, BOOTSTRAP in image) */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {tags.map(tag => (
                          <span
                            key={tag}
                            className="rounded-md border border-slate-200/80 bg-slate-100/80 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Progress Bar */}
                    <div className="mt-5 border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span>Progress</span>
                        <span className={isAllDone ? "text-emerald-600" : unlocked && doneCount > 0 ? "text-blue-600" : ""}>
                          {subCoursePct}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isAllDone
                              ? "bg-emerald-500"
                              : "bg-gradient-to-r from-blue-600 to-indigo-600"
                          }`}
                          style={{ width: `${subCoursePct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!subCourses.length && (
              <Card className="!rounded-2xl !border-slate-200">
                <Empty t="Program sub-courses are being loaded." />
              </Card>
            )}
          </section>
        </main>

        {/* Sidebar: Certificate & Key Takeaways (Restored like before) */}
        <aside className="space-y-6 xl:sticky xl:top-24">
          {/* Certificate Card */}
          <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm">
            {certificateUnlocked ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Icon name="certificate" size={20} />
                  <h2 className="font-display font-bold text-slate-900">Course Certificate</h2>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                    <Icon name="unlock" size={26} />
                  </span>
                  <p className="mt-3 font-display text-base font-extrabold text-emerald-950">Certificate Unlocked!</p>
                  <p className="mt-1 text-xs text-emerald-800">
                    You have achieved {progressPct}% completion (required: {requiredPct}%).
                  </p>
                  <Link
                    to="/student/journey"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    <Icon name="certificate" size={14} /> View Certificate
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-700 bg-[#1e293b] p-5 text-center text-white shadow-inner">
                  <div className="relative">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-violet-500/20 text-violet-300">
                      <Icon name="lock" size={24} />
                    </span>
                    <h2 className="mt-3 font-display text-base font-extrabold leading-tight">
                      Complete modules to<br />unlock certificate
                    </h2>
                    <p className="mt-1.5 text-xs text-slate-300">
                      {requiredPct}% progress required · {Math.max(0, requiredPct - progressPct)}% remaining
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Progress to unlock</span>
                  <span className="font-extrabold text-slate-900">{progressPct}% / {requiredPct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, (progressPct / requiredPct) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Key Takeaways Card (Restored like before) */}
          <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm">
            <h2 className="font-display font-bold text-slate-900">Key Takeaways</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              By completing this track, you will have built real-world frontend and backend applications from scratch:
            </p>
            <div className="my-4 border-t border-slate-100" />
            <ul className="space-y-3 text-xs leading-5 text-slate-600">
              {[
                "Semantic HTML5 & accessible landmark structures",
                "Responsive CSS with modern Flexbox & CSS Grid",
                "ES6+ JavaScript, DOM events, and asynchronous fetch",
                "React state, props, custom hooks, and component trees",
                "Node.js Express REST APIs and server-side routes",
                "Relational SQL databases, queries, and joins",
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* Sub-Course Details Drawer (Slide-out panel matching Reference Image 1) */}
      {/* ========================================================================= */}
      {selectedSubCourse && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSelectedSubCourse(null)}
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
            <div className="w-screen max-w-md sm:max-w-xl bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right rounded-l-3xl overflow-hidden">
              {/* Drawer Top Header (matching Image 1) */}
              <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                      {renderSubCourseIcon(selectedSubCourse.id)}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        COURSE / SUB-COURSE
                      </span>
                      <h2 className="font-display text-xl font-extrabold text-slate-900">
                        {selectedSubCourse.title}
                      </h2>
                    </div>
                  </div>

                  {/* Close 'X' Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedSubCourse(null)}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs"
                    aria-label="Close drawer"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>

                {/* Sub-course brief + progress summary in drawer */}
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  {selectedSubCourse.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700">
                    <Icon name="sheet" size={13} /> {selectedSubCourse.items.length} Topics & Activities
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-amber-800">
                    <Icon name="clock" size={13} className="text-amber-600" />
                    {formatMinutesToHuman(getModuleTotalMinutes(selectedSubCourse))}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-emerald-800">
                    <Icon name="check" size={13} className="text-emerald-600" />
                    {selectedSubCourse.items.filter(it => completed.has(it.id)).length} / {selectedSubCourse.items.length} Completed
                  </span>
                </div>
              </div>

              {/* Drawer Topics List: Hierarchical Modules & Course Assessment */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-slate-50/40">
                {selectedSubCourse.modules && selectedSubCourse.modules.length > 0 ? (
                  <>
                    {/* Header Controls: Expand / Collapse All */}
                    <div className="flex items-center justify-between gap-2 px-1 pb-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {selectedSubCourse.modules.length} Modules in this Sub-Course
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={expandAllDrawerModules}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                        >
                          Expand All
                        </button>
                        <span className="text-slate-300">·</span>
                        <button
                          type="button"
                          onClick={collapseAllDrawerModules}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                          Collapse All
                        </button>
                      </div>
                    </div>

                    {/* Render Each Module in the Sub-Course with Accordion Dropdown */}
                    {selectedSubCourse.modules.map((mod, modIdx) => {
                      const modCompletedCount = mod.items.filter(it => completed.has(it.id)).length;
                      const isModDone = mod.items.length > 0 && modCompletedCount === mod.items.length;
                      const isOpen = openDrawerModules[mod.id] !== false;

                      return (
                        <div key={mod.id} className="space-y-2">
                          {/* Module Header Card (Dropdown Trigger) */}
                          <div
                            onClick={() => toggleDrawerModule(mod.id)}
                            className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 transition-all cursor-pointer shadow-2xs select-none group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-blue-600 text-[11px] font-black text-white shadow-xs group-hover:scale-105 transition-transform">
                                {modIdx + 1}
                              </span>
                              <div className="min-w-0">
                                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">
                                  MODULE {modIdx + 1} · {mod.items.length} TOPICS
                                </span>
                                <h3 className="font-display text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                  {mod.title}
                                </h3>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                                isModDone ? "bg-emerald-100 text-emerald-800" : "bg-white text-slate-600 border border-slate-200"
                              }`}>
                                {modCompletedCount}/{mod.items.length} Done
                              </span>
                              <span className="grid h-6 w-6 place-items-center text-slate-400 group-hover:text-slate-600 transition-transform">
                                <Icon
                                  name="chevronDown"
                                  size={14}
                                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                              </span>
                            </div>
                          </div>

                          {/* Items inside this module (Collapsible) */}
                          {isOpen && (
                            <div className="space-y-2 pl-2 border-l-2 border-blue-500/20 ml-3 pt-1">
                            {mod.items.map((item, itemIdx) => {
                              const isDone = completed.has(item.id);

                              let itemBadge = { label: "LESSON", color: "text-blue-600 bg-blue-50 border-blue-200" };
                              if (item.isModuleQuiz) {
                                itemBadge = { label: "MODULE MCQS", color: "text-purple-700 bg-purple-50 border-purple-200" };
                              } else if (item.isModuleAssessment) {
                                itemBadge = { label: "MODULE ASSESSMENT", color: "text-amber-800 bg-amber-50 border-amber-200" };
                              } else if (item.type === "quiz") {
                                itemBadge = { label: "EXAM", color: "text-purple-700 bg-purple-50 border-purple-200" };
                              } else if (item.type === "assignment") {
                                itemBadge = { label: "LAB PROJECT", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
                              }

                              return (
                                <div
                                  key={item.id}
                                  onClick={() => {
                                    setSelectedSubCourse(null);
                                    navigate(`/student/course/${effectiveEid}/lesson/${item.id}`);
                                  }}
                                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs transition-all hover:border-blue-400 hover:shadow-md cursor-pointer"
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    {isDone ? (
                                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-xs">
                                        <Icon name="check" size={14} />
                                      </span>
                                    ) : (
                                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-xs">
                                        {itemIdx + 1}
                                      </span>
                                    )}

                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className={`inline-block rounded px-1.5 py-0.2 border text-[9px] font-black uppercase tracking-wider ${itemBadge.color}`}>
                                          {itemBadge.label}
                                        </span>
                                        {item.questions && item.questions.length > 0 && (
                                          <span className="text-[10px] text-slate-400 font-medium">
                                            {item.questions.length} Questions
                                          </span>
                                        )}
                                      </div>
                                      <span className="mt-0.5 block font-display text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                                        {item.title}
                                      </span>
                                      <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                                        <span className="flex items-center gap-1">
                                          <Icon name="clock" size={10} /> {item.duration}
                                        </span>
                                        {isDone && (
                                          <>
                                            <span>·</span>
                                            <span className="font-bold text-emerald-600">Completed</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                                    <Icon name="chevronRight" size={16} />
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        </div>
                      );
                    })}

                    {/* Sub-Course Final Assessment Section */}
                    {(selectedSubCourse.courseAssessment || selectedSubCourse.courseProject) && (
                      <div className="mt-6 pt-4 border-t-2 border-slate-200 space-y-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200/80">
                          <Icon name="sparkle" size={16} className="text-amber-600" />
                          <div>
                            <span className="block text-[10px] font-black uppercase tracking-widest text-amber-700">
                              SUB-COURSE CAPSTONE
                            </span>
                            <h3 className="font-display text-xs font-bold text-slate-900">
                              Final Course Assessment & Certification
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-2 pl-2 border-l-2 border-amber-500/40 ml-3">
                          {[selectedSubCourse.courseAssessment, selectedSubCourse.courseProject].filter(Boolean).map((assessmentItem, aIdx) => {
                            if (!assessmentItem) return null;
                            const isDone = completed.has(assessmentItem.id);

                            return (
                              <div
                                key={assessmentItem.id}
                                onClick={() => {
                                  setSelectedSubCourse(null);
                                  navigate(`/student/course/${effectiveEid}/lesson/${assessmentItem.id}`);
                                }}
                                className="group flex items-center justify-between gap-3 rounded-xl border border-amber-200/80 bg-white p-3.5 shadow-xs transition-all hover:border-amber-400 hover:shadow-md cursor-pointer"
                              >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  {isDone ? (
                                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-xs">
                                      <Icon name="check" size={14} />
                                    </span>
                                  ) : (
                                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber-300 bg-amber-50 text-xs font-black text-amber-700 shadow-xs">
                                      ★
                                    </span>
                                  )}

                                  <div className="min-w-0 flex-1">
                                    <span className="inline-block rounded px-1.5 py-0.2 border text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border-amber-200">
                                      {assessmentItem.type === "quiz" ? "COURSE FINAL EXAM" : "CAPSTONE PROJECT"}
                                    </span>
                                    <span className="mt-0.5 block font-display text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors truncate">
                                      {assessmentItem.title}
                                    </span>
                                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                                      <span className="flex items-center gap-1">
                                        <Icon name="clock" size={10} /> {assessmentItem.duration}
                                      </span>
                                      {assessmentItem.questions && (
                                        <>
                                          <span>·</span>
                                          <span>{assessmentItem.questions.length} Questions</span>
                                        </>
                                      )}
                                      {isDone && (
                                        <>
                                          <span>·</span>
                                          <span className="font-bold text-emerald-600">Completed</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-amber-500 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all">
                                  <Icon name="chevronRight" size={16} />
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Flat Fallback */
                  selectedSubCourse.items.map((item, itemIdx) => {
                    const isDone = completed.has(item.id);

                    let itemLabel = "TOPIC";
                    if (item.type === "quiz") itemLabel = "SUB-COURSE EXAM";
                    else if (item.type === "assignment") itemLabel = "GRADED PROJECT";
                    else if (item.type === "practice") itemLabel = "PRACTICE LAB";

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedSubCourse(null);
                          navigate(`/student/course/${effectiveEid}/lesson/${item.id}`);
                        }}
                        className="group flex items-center justify-between gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all hover:border-blue-400 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          {isDone ? (
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-xs">
                              <Icon name="check" size={16} />
                            </span>
                          ) : (
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-100 text-xs font-bold text-slate-600 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-xs">
                              {itemIdx + 1}
                            </span>
                          )}

                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {itemLabel}
                            </span>
                            <span className="mt-0.5 block font-display text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                              {item.title}
                            </span>
                            <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Icon name="clock" size={11} /> {item.duration}
                              </span>
                              {isDone && (
                                <>
                                  <span>·</span>
                                  <span className="font-bold text-emerald-600">Completed</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                          <Icon name="chevronRight" size={18} />
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-slate-200/80 bg-white p-4 sm:p-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSubCourse(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                >
                  Close
                </button>

                {(() => {
                  const firstIncomplete =
                    selectedSubCourse.items.find(it => !completed.has(it.id)) || selectedSubCourse.items[0];
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubCourse(null);
                        if (firstIncomplete) {
                          navigate(`/student/course/${effectiveEid}/lesson/${firstIncomplete.id}`);
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
                    >
                      <span>
                        {selectedSubCourse.items.some(it => completed.has(it.id))
                          ? "Continue Sub-Course"
                          : "Start Sub-Course"}
                      </span>
                      <Icon name="arrow" size={14} />
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
