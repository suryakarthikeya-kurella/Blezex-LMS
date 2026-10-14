import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon, { IconName } from "../../components/Icon";
import { isCertificateUnlocked } from "../../lib/certificateUnlock";
import { Card, Empty } from "../../components/ui";
import { fetchCourseCurriculum, getCompletedItemIds, isCurriculumModuleUnlocked } from "../../lib/curriculumService";
import { CurriculumModule, CurriculumItem } from "../../lib/curriculumData";

export default function StudentCourse() {
  const { eid } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<CurriculumModule[]>([]);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchCourseCurriculum(eid || "full-stack-web");
        if (cancelled) return;
        setCourse(result.course);
        setModules(result.modules);
        const completedIds = getCompletedItemIds(eid);
        setCompleted(completedIds);
        // Expand the first module by default
        if (result.modules.length > 0) {
          setExpandedModules(new Set([result.modules[0].id]));
        }
      } catch (e) {
        console.error("Error loading course:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [eid]);

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(modId)) next.delete(modId);
      else next.add(modId);
      return next;
    });
  };

  const allItems: CurriculumItem[] = modules.flatMap(m => m.items);
  const totalItemsCount = allItems.length;
  const completedCount = allItems.filter(item => completed.has(item.id)).length;
  const progressPct = totalItemsCount ? Math.round((completedCount * 100) / totalItemsCount) : 0;
  const requiredPct = course?.min_progress_pct ?? 80;
  const certificateUnlocked = isCertificateUnlocked(progressPct, requiredPct);

  const getItemTypeBadge = (type: CurriculumItem["type"]) => {
    switch (type) {
      case "cheatsheet":
        return { label: "Cheat Sheet", icon: "sheet" as IconName, color: "text-blue-700 bg-blue-50" };
      case "practice":
        return { label: "Practice", icon: "pencil" as IconName, color: "text-purple-600 bg-purple-50" };
      case "quiz":
        return { label: "Quiz", icon: "quiz" as IconName, color: "text-emerald-700 bg-emerald-50" };
      case "assignment":
        return { label: "Assignment", icon: "assignment" as IconName, color: "text-rose-600 bg-rose-50" };
      default:
        return { label: "Topic Guide", icon: "sheet" as IconName, color: "text-slate-700 bg-slate-50" };
    }
  };

  if (loading) {
    return <div className="grid min-h-[40vh] place-items-center text-sm font-medium text-slate-500">Loading course curriculum…</div>;
  }

  const effectiveEid = eid || "full-stack-web";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Link to="/student/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand">
        <Icon name="arrowLeft" size={16} />
        <span>Back to my courses</span>
      </Link>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main Content: Course Modules */}
        <main className="min-w-0 space-y-5">
          <Card className="!rounded-2xl !border-slate-200 !p-6 !shadow-sm md:!p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  Interactive Learning Track
                </span>
                <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                  {course?.title || "Full Stack Web Development"}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  {course?.description || "Build job-ready full-stack skills through structured language modules, in-depth cheat sheets, interactive knowledge checks, and project assignments."}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5"><Icon name="book" size={16} className="text-blue-600" /> {modules.length} Modules</span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1.5"><Icon name="sheet" size={16} className="text-blue-600" /> {totalItemsCount} Cheat Sheets & Activities</span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1.5"><Icon name="clock" size={16} className="text-amber-600" /> ~48 Hours Total</span>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <div
                  className="relative grid h-16 w-16 place-items-center rounded-full"
                  style={{ background: `conic-gradient(#2563eb ${progressPct * 3.6}deg, #dbeafe ${progressPct * 3.6}deg)` }}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-xs font-extrabold text-blue-900 shadow-sm">
                    {progressPct}%
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Your Progress</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{completedCount} of {totalItemsCount} completed</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                    {progressPct >= 100 ? "Completed!" : progressPct > 0 ? "In Progress" : "Get Started"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-b border-slate-200 pb-3">
              <span className="inline-flex items-center gap-2 border-b-2 border-blue-600 px-3 pb-3 text-sm font-bold text-blue-700">
                <Icon name="book" size={17} /> Curriculum Modules ({modules.length})
              </span>
            </div>
          </Card>

          {/* Module List */}
          <section aria-label="Course curriculum modules" className="space-y-4">
            {modules.map((module, moduleIndex) => {
              const unlocked = isCurriculumModuleUnlocked(moduleIndex, modules, completed);
              const isExpanded = expandedModules.has(module.id);
              const moduleItems = module.items;
              const moduleDone = moduleItems.filter(it => completed.has(it.id)).length;
              const isAllDone = moduleItems.length > 0 && moduleDone === moduleItems.length;

              return (
                <section
                  key={module.id}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${
                    isExpanded ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Module Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleModuleExpand(module.id)}
                    className={`flex w-full items-center gap-3.5 px-5 py-4 text-left transition ${
                      !unlocked
                        ? "bg-slate-50/80 opacity-75 hover:bg-slate-100/70"
                        : isExpanded
                        ? "bg-slate-50/50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {/* Status Circle */}
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                        !unlocked
                          ? "bg-slate-200 text-slate-500"
                          : isAllDone
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {!unlocked ? (
                        <Icon name="lock" size={16} />
                      ) : isAllDone ? (
                        <Icon name="check" size={18} />
                      ) : (
                        <span>{String(moduleIndex + 1).padStart(2, "0")}</span>
                      )}
                    </span>

                    {/* Title and details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">
                          Module {String(moduleIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <Icon name="clock" size={12} /> {module.duration}
                        </span>
                      </div>
                      <h2 className="mt-0.5 font-display text-base font-bold text-slate-900">
                        {module.title}
                      </h2>
                      {!unlocked && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-amber-700">
                          <Icon name="lock" size={12} /> Complete Module {moduleIndex} to unlock
                        </p>
                      )}
                    </div>

                    {/* Progress count */}
                    <div className="text-right">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                        {moduleDone} / {moduleItems.length}
                      </span>
                    </div>

                    <Icon
                      name={isExpanded ? "chevronDown" : "chevronRight"}
                      size={18}
                      className="shrink-0 text-slate-400 transition"
                    />
                  </button>

                  {/* Module Item List */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-white divide-y divide-slate-100">
                      {moduleItems.map((item, itemIdx) => {
                        const isDone = completed.has(item.id);
                        const badge = getItemTypeBadge(item.type);

                        if (!unlocked) {
                          return (
                            <div key={item.id} className="flex items-center gap-3.5 px-5 py-3.5 opacity-60">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-400">
                                {itemIdx + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-slate-600">{item.title}</span>
                                <span className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                                  <span>{item.duration}</span>
                                  <span>·</span>
                                  <span className="flex items-center gap-1"><Icon name="lock" size={11} /> Locked</span>
                                </span>
                              </div>
                              <span className="text-slate-400"><Icon name={badge.icon} size={17} /></span>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={item.id}
                            to={`/student/course/${effectiveEid}/lesson/${item.id}`}
                            className="group flex items-center gap-3.5 px-5 py-3.5 transition hover:bg-blue-50/60"
                          >
                            <span
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition ${
                                isDone
                                  ? "bg-emerald-500 text-white shadow-sm"
                                  : "border border-slate-200 bg-white text-slate-500 group-hover:border-blue-400 group-hover:text-blue-600"
                              }`}
                            >
                              {isDone ? <Icon name="check" size={14} /> : <span>{itemIdx + 1}</span>}
                            </span>

                            <div className="min-w-0 flex-1">
                              <span className="block text-sm font-bold text-slate-800 group-hover:text-blue-700">
                                {item.title}
                              </span>
                              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Icon name="clock" size={12} /> {item.duration}
                                </span>
                                <span>·</span>
                                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badge.color}`}>
                                  {badge.label}
                                </span>
                                {isDone && (
                                  <span className="text-[10px] font-bold text-emerald-600">✓ Completed</span>
                                )}
                              </div>
                            </div>

                            <span className="text-slate-400 transition group-hover:text-blue-600">
                              <Icon name={badge.icon} size={18} />
                            </span>
                            <Icon
                              name="chevronRight"
                              size={16}
                              className="text-slate-300 opacity-0 transition group-hover:opacity-100 group-hover:text-blue-600"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}

            {!modules.length && (
              <Card className="!rounded-2xl !border-slate-200">
                <Empty t="Course curriculum modules are being loaded." />
              </Card>
            )}
          </section>
        </main>

        {/* Sidebar: Certificate & Outcomes */}
        <aside className="space-y-5 xl:sticky xl:top-24">
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

          {/* Course Outcomes */}
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
    </div>
  );
}
