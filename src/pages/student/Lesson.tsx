import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon, { IconName } from "../../components/Icon";
import {
  FULL_STACK_MODULES,
  CurriculumItem,
  CurriculumModule,
  PracticeQuestion,
} from "../../lib/curriculumData";
import {
  fetchCourseCurriculum,
  getCompletedItemIds,
  saveCompletedItemId,
  isCurriculumModuleUnlocked,
  syncCompletedToSupabase,
  saveQuizAttempt,
  saveAssignmentSubmission,
} from "../../lib/curriculumService";

export default function StudentLesson() {
  const { eid, lid } = useParams();

  const [modules, setModules] = useState<CurriculumModule[]>(FULL_STACK_MODULES);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // View mode for lessons with questions: "learn" (reading notes) vs "quiz" (testing understanding)
  const [lessonMode, setLessonMode] = useState<"learn" | "quiz">("learn");

  // Quiz / Assessment submission & review state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Assignment state
  const [assignmentText, setAssignmentText] = useState("");
  const [assignmentLink, setAssignmentLink] = useState("");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Load course and curriculum
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchCourseCurriculum(eid || "full-stack-web");
        if (cancelled) return;
        setModules(result.modules);
        const savedCompleted = getCompletedItemIds(eid);
        setCompleted(savedCompleted);
      } catch (err) {
        console.error("Error loading curriculum:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [eid]);

  const allItems: CurriculumItem[] = useMemo(() => modules.flatMap(m => m.items), [modules]);

  // Find active item, default to first item if not found
  const activeItemIndex = useMemo(() => {
    if (!lid) return 0;
    const idx = allItems.findIndex(it => it.id === lid);
    return idx !== -1 ? idx : 0;
  }, [lid, allItems]);

  const activeItem: CurriculumItem = allItems[activeItemIndex] || allItems[0];

  const containingModule = useMemo(() => {
    return modules.find(m => m.id === activeItem?.moduleId) || modules[0];
  }, [modules, activeItem]);

  // Ensure containing module is expanded
  useEffect(() => {
    if (containingModule?.id) {
      setExpandedModules(prev => new Set([...prev, containingModule.id]));
    }
  }, [containingModule]);

  // Reset view mode and assignment state when switching lessons
  useEffect(() => {
    setLessonMode("learn");
    setAssignmentSubmitted(false);
    setAssignmentText("");
    setAssignmentLink("");
    setCopiedCode(false);
  }, [lid]);

  const toggleModuleAccordion = (modId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(modId)) next.delete(modId);
      else next.add(modId);
      return next;
    });
  };

  const isCurrentDone = completed.has(activeItem?.id);

  const effectiveEid = eid || "full-stack-web";

  // PERMANENT COMPLETION: once marked complete, cannot unmark!
  const markAsCompleted = () => {
    if (!activeItem || isCurrentDone) return;
    const updated = saveCompletedItemId(effectiveEid, activeItem.id, true, {
      title: activeItem.title,
      moduleTitle: containingModule?.title || activeItem.moduleTitle,
      courseTitle: "Full Stack Web Development",
    });
    setCompleted(new Set(updated));
    syncCompletedToSupabase(effectiveEid, activeItem.id, true);
  };

  const prevItem = activeItemIndex > 0 ? allItems[activeItemIndex - 1] : null;
  const nextItem = activeItemIndex < allItems.length - 1 ? allItems[activeItemIndex + 1] : null;

  const getItemIcon = (type: CurriculumItem["type"]): IconName => {
    switch (type) {
      case "cheatsheet":
        return "sheet";
      case "practice":
        return "pencil";
      case "quiz":
        return "quiz";
      case "assignment":
        return "code";
    }
  };

  const getItemBadge = (type: CurriculumItem["type"]) => {
    switch (type) {
      case "cheatsheet":
        return { label: "Cheat Sheet", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
      case "practice":
        return { label: "Practice", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "quiz":
        return { label: "Quiz", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
      case "assignment":
        return { label: "Project", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    }
  };

  // Questions for active item
  const questions: PracticeQuestion[] = activeItem?.questions || [];
  const isThisQuizSubmitted = !!quizSubmitted[activeItem?.id];

  // Count answered questions
  const answeredCount = useMemo(() => {
    return questions.filter(q => selectedAnswers[q.id] !== undefined).length;
  }, [questions, selectedAnswers]);

  // Calculate score for the quiz/practice
  const quizResults = useMemo(() => {
    if (!questions.length) return { total: 0, correct: 0, scorePct: 0, passed: false };
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const scorePct = Math.round((correct / questions.length) * 100);
    return {
      total: questions.length,
      correct,
      scorePct,
      passed: scorePct >= 70,
    };
  }, [questions, selectedAnswers]);

  const handleSubmitQuiz = () => {
    setQuizSubmitted(prev => ({ ...prev, [activeItem.id]: true }));
    saveQuizAttempt({
      enrollmentId: effectiveEid,
      quizId: activeItem.id,
      quizTitle: activeItem.title,
      scorePct: quizResults.scorePct,
      passed: quizResults.passed,
      courseTitle: containingModule?.title || "Full Stack Web Development",
    });
    markAsCompleted();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetakeQuiz = () => {
    setQuizSubmitted(prev => ({ ...prev, [activeItem.id]: false }));
    const newAnswers = { ...selectedAnswers };
    questions.forEach(q => delete newAnswers[q.id]);
    setSelectedAnswers(newAnswers);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyStarter = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-[#0a0f1d] text-white">
        <div className="text-center">
          <div className="relative mx-auto h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          </div>
          <p className="mt-5 text-sm font-bold tracking-wide text-slate-300">Loading BlezeX Learning Environment…</p>
        </div>
      </div>
    );
  }

  // --- RENDER SIDEBAR ---
  const renderSidebar = () => (
    <div className="flex h-full flex-col bg-[#0b1120] text-slate-200">
      {/* Top Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] px-5">
        <Link
          to={`/student/course/${effectiveEid}`}
          className="group inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-[.18em] text-slate-400 transition hover:text-white"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition group-hover:border-blue-500/50 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]">
            <Icon name="arrowLeft" size={13} className="transition group-hover:-translate-x-0.5" />
          </span>
          <span>Course Contents</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            setSidebarCollapsed(true);
            setMobileDrawerOpen(false);
          }}
          className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          title="Collapse sidebar"
          aria-label="Collapse contents sidebar"
        >
          <Icon name="sidebarCollapse" size={16} />
        </button>
      </div>

      {/* Module Accordions with Vertical Timeline */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {modules.map((mod, modIdx) => {
          const unlocked = isCurriculumModuleUnlocked(modIdx, modules, completed);
          const isExpanded = expandedModules.has(mod.id);
          const modItems = mod.items;
          const completedInMod = modItems.filter(it => completed.has(it.id)).length;
          const isCurrentMod = mod.id === containingModule?.id;

          return (
            <div key={mod.id} className="mb-2 overflow-hidden rounded-xl border border-white/[0.06] bg-slate-900/40">
              {/* Module Header */}
              <button
                type="button"
                onClick={() => toggleModuleAccordion(mod.id)}
                className={`flex w-full items-center justify-between px-3.5 py-3 text-left transition ${
                  isCurrentMod
                    ? "bg-gradient-to-r from-blue-950/60 to-slate-900/80 text-white"
                    : "text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="block font-display text-xs font-bold leading-snug">
                      {mod.title}
                    </span>
                    {!unlocked && <Icon name="lock" size={12} className="shrink-0 text-amber-400" />}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Icon name="clock" size={11} className="text-slate-500" /> {mod.duration}
                    </span>
                    <span>·</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.2 text-[10px] font-bold text-blue-300">
                      {completedInMod}/{modItems.length}
                    </span>
                  </div>
                </div>
                <span className="grid h-6 w-6 place-items-center rounded-md bg-white/5 text-slate-400">
                  <Icon
                    name={isExpanded ? "chevronDown" : "chevronRight"}
                    size={14}
                  />
                </span>
              </button>

              {/* Items in Module (Vertical Timeline) */}
              {isExpanded && (
                <div className="relative border-t border-white/[0.04] py-1.5">
                  <div className="space-y-0.5">
                    {modItems.map((item, itemIdx) => {
                      const isActive = item.id === activeItem?.id;
                      const isItemDone = completed.has(item.id);
                      const iconName = getItemIcon(item.type);
                      const badge = getItemBadge(item.type);

                      if (!unlocked) {
                        return (
                          <div
                            key={item.id}
                            className="relative flex items-center gap-3 rounded-lg mx-1 px-3 py-2 opacity-40"
                          >
                            {/* Vertical connector line segments (perfectly centered behind circle) */}
                            {itemIdx > 0 && (
                              <span
                                aria-hidden="true"
                                className="absolute left-[22px] top-0 h-1/2 w-0.5 -translate-x-1/2 bg-blue-500/35 pointer-events-none"
                              />
                            )}
                            {itemIdx < modItems.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="absolute left-[22px] top-1/2 -bottom-1 w-0.5 -translate-x-1/2 bg-blue-500/35 pointer-events-none"
                              />
                            )}

                            <span className="relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0b1120] text-slate-500 ring-2 ring-white/10">
                              <Icon name="lock" size={10} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="block truncate text-xs text-slate-400">{item.title}</span>
                              <span className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-500">
                                <Icon name="clock" size={10} /> {item.duration}
                              </span>
                            </div>
                            <span className="shrink-0 text-slate-600">
                              <Icon name={iconName} size={14} />
                            </span>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.id}
                          to={`/student/course/${effectiveEid}/lesson/${item.id}`}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`group relative flex items-center gap-3 rounded-lg mx-1 px-3 py-2 transition-all duration-150 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-purple-600/10 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30"
                              : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                          }`}
                        >
                          {/* Vertical connector line segments (perfectly centered behind circle) */}
                          {itemIdx > 0 && (
                            <span
                              aria-hidden="true"
                              className="absolute left-[22px] top-0 h-1/2 w-0.5 -translate-x-1/2 bg-blue-500/35 pointer-events-none"
                            />
                          )}
                          {itemIdx < modItems.length - 1 && (
                            <span
                              aria-hidden="true"
                              className="absolute left-[22px] top-1/2 -bottom-1 w-0.5 -translate-x-1/2 bg-blue-500/35 pointer-events-none"
                            />
                          )}

                          {/* Timeline Node Circle */}
                          <span
                            className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition ${
                              isItemDone
                                ? "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/40"
                                : isActive
                                ? "bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/30"
                                : "bg-[#0b1120] text-slate-500 ring-2 ring-white/15 group-hover:ring-white/40"
                            }`}
                          >
                            {isItemDone ? (
                              <Icon name="check" size={11} />
                            ) : isActive ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                            )}
                          </span>

                          {/* Details */}
                          <div className="min-w-0 flex-1">
                            <span className={`block truncate text-xs leading-snug ${isActive ? "text-white" : "text-slate-300"}`}>
                              {item.title}
                            </span>
                            <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                              <span className={`rounded px-1.5 py-0.2 border text-[9px] font-bold uppercase tracking-wider ${badge.color}`}>
                                {badge.label}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="clock" size={9} /> {item.duration}
                              </span>
                            </div>
                          </div>

                          {/* Right Type Icon */}
                          <span className={`shrink-0 transition ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                            <Icon name={iconName} size={15} />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-[#f8fafc] text-slate-800 antialiased">
      {/* Desktop Left Sidebar */}
      {!sidebarCollapsed && (
        <aside className="hidden h-full w-[310px] shrink-0 border-r border-slate-800/40 shadow-2xl lg:block xl:w-[330px]">
          {renderSidebar()}
        </aside>
      )}

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <aside className="relative z-10 h-full w-[min(88vw,330px)] shadow-2xl">
            {renderSidebar()}
          </aside>
        </div>
      )}

      {/* Main Learning Workspace */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top Header & Breadcrumb */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  setSidebarCollapsed(!sidebarCollapsed);
                } else {
                  setMobileDrawerOpen(true);
                }
              }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              title="Toggle curriculum contents"
            >
              <Icon name="sidebarCollapse" size={16} />
            </button>

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 truncate text-xs md:text-sm">
              <span className="rounded-lg bg-blue-50 px-2.5 py-1 font-bold text-blue-700 border border-blue-200/50">
                {containingModule?.title}
              </span>
              <span className="text-slate-300">&gt;</span>
              <span className="font-bold text-slate-900 truncate">{activeItem?.title}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Mode Switcher for cheatsheet items with questions */}
            {activeItem?.type === "cheatsheet" && questions.length > 0 && (
              <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setLessonMode("learn")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    lessonMode === "learn"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon name="sheet" size={13} />
                  <span>Cheat Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLessonMode("quiz")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    lessonMode === "quiz"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon name="quiz" size={13} />
                  <span>Test Mode ({questions.length})</span>
                </button>
              </div>
            )}

            <Link
              to={`/student/course/${effectiveEid}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Icon name="arrowLeft" size={14} />
              <span className="hidden sm:inline">Overview</span>
            </Link>
          </div>
        </header>

        {/* Scrollable Main Workspace */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-4xl space-y-6">

            {/* ============================================================== */}
            {/* --- TOPIC CHEAT SHEET: LEARN MODE (CONTENT & EXPLANATION) --- */}
            {/* ============================================================== */}
            {activeItem?.type === "cheatsheet" && lessonMode === "learn" && (
              <article className="space-y-6">
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-9">
                  {/* Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-gradient-to-r from-blue-50 to-indigo-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-700 shadow-xs">
                        <Icon name="sheet" size={12} />
                        <span>Topic Cheat Sheet</span>
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                        {activeItem.duration}
                      </span>
                    </div>

                    {isThisQuizSubmitted && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        quizResults.passed
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}>
                        <Icon name="check" size={12} />
                        Score: {quizResults.scorePct}% ({quizResults.correct}/{quizResults.total})
                      </span>
                    )}
                  </div>

                  {/* Heading & Summary */}
                  <h1 className="mt-4 font-display text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                    {activeItem.contentHeading || activeItem.title}
                  </h1>

                  {activeItem.contentDescription && (
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {activeItem.contentDescription}
                    </p>
                  )}

                  {/* Structured in-depth sections */}
                  {activeItem.sections && (
                    <div className="mt-8 space-y-8 border-t border-slate-100 pt-8">
                      {activeItem.sections.map((sec, idx) => (
                        <section key={idx} className="space-y-3.5">
                          <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-slate-900 md:text-xl">
                            <span className="h-2 w-2 rounded-full bg-blue-600 shadow-sm" />
                            <span>{sec.title}</span>
                          </h2>
                          <p className="text-sm leading-7 text-slate-600">
                            {sec.explanation}
                          </p>

                          {/* Bullet points */}
                          {sec.bullets && (
                            <ul className="space-y-2 pl-2">
                              {sec.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* ASCII / Unicode Architecture Diagrams */}
                          {sec.diagram && (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1120] shadow-md">
                              <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2 text-[11px] font-mono text-slate-400">
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                                  <span className="ml-2 font-semibold text-slate-300">Architecture & Layout Diagram</span>
                                </div>
                                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-blue-300">ASCII Map</span>
                              </div>
                              <div className="overflow-x-auto p-4 font-mono text-xs leading-5 text-blue-200">
                                <pre className="whitespace-pre">{sec.diagram}</pre>
                              </div>
                            </div>
                          )}

                          {/* Styled Reference Tables */}
                          {sec.table && (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm">
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left text-xs">
                                  <thead className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
                                    <tr>
                                      {sec.table.headers.map((h, hIdx) => (
                                        <th key={hIdx} className="px-4 py-3 font-bold tracking-wider uppercase text-[11px] text-blue-200">
                                          {h}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 bg-white">
                                    {sec.table.rows.map((row, rIdx) => (
                                      <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                                        {row.map((cell, cIdx) => (
                                          <td key={cIdx} className="px-4 py-3 text-slate-700 leading-relaxed font-mono text-[11px] md:text-xs">
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Captioned Figures */}
                          {sec.image && (
                            <figure className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-xs">
                              <img src={sec.image.src} alt={sec.image.alt || ""} className="mx-auto max-h-72 rounded-xl object-contain shadow-xs" />
                              {sec.image.caption && (
                                <figcaption className="mt-2 text-xs font-semibold text-slate-500">{sec.image.caption}</figcaption>
                              )}
                            </figure>
                          )}

                          {/* In-section targeted code snippet */}
                          {sec.codeSnippet && (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-800 bg-[#0e1726] p-4 text-xs font-mono text-slate-100 shadow-sm">
                              <pre className="whitespace-pre">{sec.codeSnippet.code}</pre>
                            </div>
                          )}
                        </section>
                      ))}
                    </div>
                  )}

                  {/* Code Summary & Reference placed at the END of the lesson sections */}
                  {activeItem.codeSnippet && (
                    <div className="relative mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-[#0e1726] text-white shadow-md">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span>Code Summary & Reference</span>
                        </span>
                        <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                          {activeItem.codeSnippet.language}
                        </span>
                      </div>

                      <div className="overflow-x-auto p-4 font-mono text-xs leading-6 md:text-sm">
                        <table className="w-full border-collapse">
                          <tbody>
                            {activeItem.codeSnippet.code.split("\n").map((line, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.03]">
                                <td className="w-8 select-none pr-4 text-right text-slate-500">
                                  {idx + 1}
                                </td>
                                <td className="whitespace-pre font-mono text-slate-100">
                                  {line}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* --- TEST YOUR UNDERSTANDING LAUNCH CARD --- */}
                  {questions.length > 0 && (
                    <div className="mt-10 overflow-hidden rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 p-6 md:p-8 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-700">
                            <Icon name="quiz" size={13} />
                            <span>Knowledge Check ({questions.length} Questions)</span>
                          </div>
                          <h3 className="font-display text-2xl font-black text-slate-900">
                            Ready to Test Your Understanding?
                          </h3>
                          <p className="text-sm leading-6 text-slate-600 max-w-xl">
                            Reinforce the concepts you've just learned. Answer all {questions.length} questions to verify your comprehension, calculate your score, and review explanations.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setLessonMode("quiz");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-indigo-500/35 active:scale-[0.98]"
                        >
                          <Icon name="pencil" size={17} />
                          <span>{isThisQuizSubmitted ? "Review / Retake Quiz" : "Start Test"}</span>
                          <Icon name="arrow" size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* ============================================================== */}
            {/* --- QUIZ / TEST MODE: QUESTIONS & EXPLANATIONS VIEW --- */}
            {/* ============================================================== */}
            {(activeItem?.type === "practice" || activeItem?.type === "quiz" || (activeItem?.type === "cheatsheet" && lessonMode === "quiz")) && (
              <section className="space-y-6">
                <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-9">
                  {/* Top Bar inside Quiz Mode */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                    <div className="flex items-center gap-3">
                      {activeItem?.type === "cheatsheet" && (
                        <button
                          type="button"
                          onClick={() => {
                            setLessonMode("learn");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Icon name="arrowLeft" size={13} />
                          <span>Back to Cheat Sheet</span>
                        </button>
                      )}

                      <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-purple-700 border border-purple-200/50">
                        {activeItem.type === "quiz" ? "Module Assessment" : activeItem.type === "practice" ? "Practice Lab" : "Knowledge Check"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <span>{questions.length} Questions</span>
                      <span>·</span>
                      <span className="text-indigo-600">{answeredCount}/{questions.length} Answered</span>
                    </div>
                  </div>

                  {/* Heading & Instructions */}
                  <div className="mt-5">
                    <h1 className="font-display text-2xl font-black text-slate-900 md:text-3xl">
                      {activeItem.type === "cheatsheet"
                        ? `Knowledge Check: ${activeItem.title}`
                        : (activeItem.contentHeading || activeItem.title)}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {isThisQuizSubmitted
                        ? "Review your score and read through the detailed explanations for every question below."
                        : "Select the best answer for each question. Once submitted, your score will be calculated and comprehensive explanations will be displayed."}
                    </p>
                  </div>

                  {/* Score Summary Box after submission */}
                  {isThisQuizSubmitted && (
                    <div className={`mt-6 overflow-hidden rounded-2xl border p-6 transition-all ${
                      quizResults.passed
                        ? "border-emerald-300 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white text-emerald-950"
                        : "border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50/50 to-white text-amber-950"
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                          <div className={`grid h-16 w-16 place-items-center rounded-2xl text-xl font-black shadow-md ${
                            quizResults.passed ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                          }`}>
                            {quizResults.scorePct}%
                          </div>
                          <div>
                            <p className="font-display text-lg font-black tracking-tight">
                              {quizResults.passed ? "🎉 Outstanding Work! You Passed!" : "Needs Review - Keep Learning!"}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-600">
                              You answered <strong className="text-slate-900">{quizResults.correct}</strong> out of <strong className="text-slate-900">{quizResults.total}</strong> questions correctly.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {activeItem?.type === "cheatsheet" && (
                            <button
                              type="button"
                              onClick={() => {
                                setLessonMode("learn");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                            >
                              Review Cheat Sheet
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={handleRetakeQuiz}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Questions List */}
                  <div className="mt-8 space-y-6 border-t border-slate-100 pt-6">
                    {questions.map((q, qIdx) => {
                      const selectedIdx = selectedAnswers[q.id];
                      const isCorrect = selectedIdx === q.correctIndex;
                      const hasSelected = selectedIdx !== undefined;

                      return (
                        <div
                          key={q.id}
                          className={`rounded-2xl border p-6 transition-all duration-150 ${
                            isThisQuizSubmitted
                              ? isCorrect
                                ? "border-emerald-300 bg-emerald-50/20"
                                : "border-rose-300 bg-rose-50/25"
                              : hasSelected
                              ? "border-indigo-200 bg-indigo-50/15"
                              : "border-slate-200 bg-slate-50/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="inline-block rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                                Question {qIdx + 1} of {questions.length}
                              </span>
                              <h2 className="font-display text-sm font-bold text-slate-900 md:text-base leading-snug">
                                {q.prompt}
                              </h2>
                            </div>

                            {/* Review badge after submission */}
                            {isThisQuizSubmitted && (
                              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${
                                isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                              }`}>
                                {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                              </span>
                            )}
                          </div>

                          {/* Code snippet in question prompt if available */}
                          {q.codeSnippet && (
                            <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-[#0e1726] p-3 text-xs font-mono text-slate-100">
                              <pre className="whitespace-pre">{q.codeSnippet.code}</pre>
                            </div>
                          )}

                          {/* Options */}
                          <div className="mt-4 space-y-2.5">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selectedIdx === optIdx;
                              const isThisTheCorrectAnswer = optIdx === q.correctIndex;

                              let optStyle = "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/80";

                              if (isThisQuizSubmitted) {
                                if (isThisTheCorrectAnswer) {
                                  optStyle = "border-emerald-500 bg-emerald-100/90 text-emerald-950 font-bold ring-2 ring-emerald-500/50 shadow-sm";
                                } else if (isThisSelected && !isCorrect) {
                                  optStyle = "border-rose-400 bg-rose-100 text-rose-950 line-through ring-2 ring-rose-400/50";
                                } else {
                                  optStyle = "border-slate-200 bg-white opacity-50";
                                }
                              } else if (isThisSelected) {
                                optStyle = "border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/40 font-semibold shadow-xs";
                              }

                              return (
                                <label
                                  key={opt.id}
                                  onClick={() => {
                                    if (!isThisQuizSubmitted) {
                                      setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                                    }
                                  }}
                                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-xs transition-all duration-150 ${optStyle}`}
                                >
                                  <input
                                    type="radio"
                                    name={q.id}
                                    disabled={isThisQuizSubmitted}
                                    checked={isThisSelected}
                                    onChange={() => {}}
                                    className="mt-0.5 accent-indigo-600"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <span className="block leading-5">{opt.label}</span>
                                    {opt.code && (
                                      <pre className="mt-2 rounded-lg bg-slate-900 p-2 font-mono text-[11px] text-white">
                                        {opt.code}
                                      </pre>
                                    )}
                                  </div>
                                </label>
                              );
                            })}
                          </div>

                          {/* Comprehensive Explanation shown after submission */}
                          {isThisQuizSubmitted && (
                            <div className={`mt-4 rounded-xl border p-4 text-xs leading-relaxed ${
                              isCorrect
                                ? "border-emerald-200 bg-emerald-50/60 text-emerald-900"
                                : "border-rose-200 bg-rose-50/60 text-rose-900"
                            }`}>
                              <p className="font-extrabold flex items-center gap-1.5">
                                <Icon name="check" size={14} className={isCorrect ? "text-emerald-600" : "text-rose-600"} />
                                <span>{isCorrect ? "Why it's correct:" : "Where you went wrong & explanation:"}</span>
                              </p>
                              <p className="mt-1.5 text-slate-700">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submission and Action Bar */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                    {!isThisQuizSubmitted ? (
                      <div className="flex flex-wrap items-center justify-between w-full gap-4">
                        <span className="text-xs font-semibold text-slate-500">
                          {answeredCount === questions.length ? (
                            <span className="text-emerald-600 font-bold">✓ All {questions.length} questions answered</span>
                          ) : (
                            <span>{questions.length - answeredCount} questions remaining</span>
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={handleSubmitQuiz}
                          disabled={answeredCount < questions.length}
                          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Icon name="check" size={15} />
                          <span>Submit Answers & View Score</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between w-full gap-4">
                        <div className="flex items-center gap-3">
                          {activeItem?.type === "cheatsheet" && (
                            <button
                              type="button"
                              onClick={() => {
                                setLessonMode("learn");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                            >
                              ← Back to Cheat Sheet
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={handleRetakeQuiz}
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                          >
                            Retake Quiz
                          </button>
                        </div>

                        {nextItem && (
                          <Link
                            to={`/student/course/${effectiveEid}/lesson/${nextItem.id}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                          >
                            <span>Proceed to Next Item</span>
                            <Icon name="arrow" size={14} />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </section>
            )}

            {/* ============================================================== */}
            {/* --- GRADED PROJECT ASSIGNMENT VIEW --- */}
            {/* ============================================================== */}
            {activeItem?.type === "assignment" && (
              <section className="space-y-6">
                <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-9">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-rose-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-rose-700 border border-rose-200/50">
                      Graded Project Assignment
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Estimated: {activeItem.duration}
                    </span>
                  </div>

                  <h1 className="mt-3 font-display text-2xl font-black text-slate-900 md:text-3xl">
                    {activeItem.contentHeading || activeItem.title}
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {activeItem.contentDescription || "Complete the project challenge below according to the specification and deliverables."}
                  </p>

                  {/* Project Instructions Box */}
                  {activeItem.assignmentPrompt?.instructions && (
                    <div className="mt-6 rounded-2xl border border-slate-200/90 bg-slate-50/60 p-6">
                      <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Project Overview & Requirements</h2>
                      <div className="mt-3 whitespace-pre-wrap font-sans text-xs leading-6 text-slate-700">
                        {activeItem.assignmentPrompt.instructions}
                      </div>
                    </div>
                  )}

                  {/* Deliverables Checklist */}
                  {activeItem.assignmentPrompt?.deliverables && (
                    <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6">
                      <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Grading Deliverables</h2>
                      <ul className="mt-3 space-y-2.5">
                        {activeItem.assignmentPrompt.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                              ✓
                            </span>
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Starter Code Block */}
                  {activeItem.assignmentPrompt?.starterCode && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-[#0e1726] shadow-md">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span>Starter Code Template (index.html)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyStarter(activeItem.assignmentPrompt!.starterCode!)}
                          className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white transition hover:bg-white/20"
                        >
                          {copiedCode ? "Copied! ✓" : "Copy Template"}
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto p-4 font-mono text-xs text-slate-100">
                        <pre className="whitespace-pre">{activeItem.assignmentPrompt.starterCode}</pre>
                      </div>
                    </div>
                  )}

                  {/* Submission Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAssignmentSubmitted(true);
                      saveAssignmentSubmission({
                        enrollmentId: effectiveEid,
                        assignmentId: activeItem.id,
                        title: activeItem.title,
                        text: assignmentText,
                        link: assignmentLink,
                        courseTitle: containingModule?.title || "Full Stack Web Development",
                      });
                      markAsCompleted();
                    }}
                    className="mt-8 space-y-5 border-t border-slate-100 pt-6"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Paste Code Solution or Project Summary Notes
                      </label>
                      <textarea
                        rows={6}
                        value={assignmentText}
                        onChange={(e) => setAssignmentText(e.target.value)}
                        placeholder="Write your explanation or paste your code solution here..."
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs shadow-inner outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Project Repository or Live Preview URL
                      </label>
                      <input
                        type="url"
                        value={assignmentLink}
                        onChange={(e) => setAssignmentLink(e.target.value)}
                        placeholder="https://github.com/..."
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-inner outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {assignmentSubmitted ? (
                        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                          <Icon name="check" size={16} />
                          <span>Submitted for mentor review & completion recorded!</span>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-indigo-600"
                        >
                          <Icon name="check" size={15} />
                          <span>Submit Assignment</span>
                        </button>
                      )}
                    </div>
                  </form>
                </article>
              </section>
            )}

            {/* Bottom Navigation & Completion Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-6">
              {prevItem ? (
                <Link
                  to={`/student/course/${effectiveEid}/lesson/${prevItem.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Icon name="arrowLeft" size={15} />
                  <span>Previous</span>
                </Link>
              ) : (
                <div />
              )}

              {/* PERMANENT COMPLETION BUTTON:
                  Once marked complete, it CANNOT be unmarked or toggled back */}
              {isCurrentDone ? (
                <div className="inline-flex cursor-default items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-2.5 text-xs font-extrabold text-emerald-800 shadow-sm">
                  <Icon name="check" size={16} className="text-emerald-600" />
                  <span>Completed ✓</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={markAsCompleted}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <Icon name="check" size={16} />
                  <span>Mark as Complete</span>
                </button>
              )}

              {nextItem ? (
                <Link
                  to={`/student/course/${effectiveEid}/lesson/${nextItem.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <span>Next</span>
                  <Icon name="arrow" size={15} />
                </Link>
              ) : (
                <div />
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
