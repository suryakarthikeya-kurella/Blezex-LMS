import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/ui";
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
} from "../../lib/curriculumService";

export default function StudentLesson() {
  const { eid, lid } = useParams();

  const [modules, setModules] = useState<CurriculumModule[]>(FULL_STACK_MODULES);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Quiz / Assessment submission & review state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Assignment state
  const [assignmentText, setAssignmentText] = useState("");
  const [assignmentLink, setAssignmentLink] = useState("");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

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

  // Reset assignment state when switching lessons
  useEffect(() => {
    setAssignmentSubmitted(false);
    setAssignmentText("");
    setAssignmentLink("");
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

  // PERMANENT COMPLETION: once marked complete, cannot unmark!
  const markAsCompleted = () => {
    if (!activeItem || isCurrentDone) return;
    const updated = saveCompletedItemId(eid || "full-stack-web", activeItem.id, true);
    setCompleted(new Set(updated));
    syncCompletedToSupabase(eid || "full-stack-web", activeItem.id, true);
  };

  const prevItem = activeItemIndex > 0 ? allItems[activeItemIndex - 1] : null;
  const nextItem = activeItemIndex < allItems.length - 1 ? allItems[activeItemIndex + 1] : null;

  const effectiveEid = eid || "full-stack-web";

  const getItemIcon = (type: CurriculumItem["type"]): IconName => {
    switch (type) {
      case "cheatsheet":
        return "sheet";
      case "practice":
        return "pencil";
      case "quiz":
        return "quiz";
      case "assignment":
        return "assignment";
    }
  };

  // Questions for active item
  const questions: PracticeQuestion[] = activeItem?.questions || [];
  const isThisQuizSubmitted = !!quizSubmitted[activeItem?.id];

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
    // Automatically mark the lesson as completed upon quiz submission
    markAsCompleted();
  };

  const handleRetakeQuiz = () => {
    setQuizSubmitted(prev => ({ ...prev, [activeItem.id]: false }));
    const newAnswers = { ...selectedAnswers };
    questions.forEach(q => delete newAnswers[q.id]);
    setSelectedAnswers(newAnswers);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-[#15233b] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
          <p className="mt-4 text-sm font-semibold tracking-wide text-blue-200">Loading learning environment…</p>
        </div>
      </div>
    );
  }

  // Render Left Contents Sidebar
  const renderSidebar = () => (
    <div className="flex h-full flex-col bg-[#15233b] text-white">
      {/* Top Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <Link
          to={`/student/course/${effectiveEid}`}
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-blue-300 transition hover:text-white"
        >
          <Icon name="arrowLeft" size={14} className="transition group-hover:-translate-x-0.5" />
          <span>CONTENTS</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            setSidebarCollapsed(true);
            setMobileDrawerOpen(false);
          }}
          className="rounded-lg p-1.5 text-blue-200 transition hover:bg-white/10 hover:text-white"
          title="Collapse sidebar"
          aria-label="Collapse contents sidebar"
        >
          <Icon name="sidebarCollapse" size={17} />
        </button>
      </div>

      {/* Module Accordions with Vertical Timeline */}
      <div className="flex-1 overflow-y-auto py-2">
        {modules.map((mod, modIdx) => {
          const unlocked = isCurriculumModuleUnlocked(modIdx, modules, completed);
          const isExpanded = expandedModules.has(mod.id);
          const modItems = mod.items;
          const completedInMod = modItems.filter(it => completed.has(it.id)).length;

          return (
            <div key={mod.id} className="border-b border-white/5 last:border-0">
              {/* Module Header */}
              <button
                type="button"
                onClick={() => toggleModuleAccordion(mod.id)}
                className={`flex w-full items-center justify-between px-4 py-3.5 text-left transition ${
                  mod.id === containingModule?.id
                    ? "bg-[#1c2e4d] text-white"
                    : "text-blue-100/90 hover:bg-white/5"
                }`}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="block font-display text-xs font-bold leading-snug">
                      {mod.title}
                    </span>
                    {!unlocked && <Icon name="lock" size={12} className="shrink-0 text-amber-400" />}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-blue-200/60">
                    <span className="flex items-center gap-1">
                      <Icon name="clock" size={11} /> {mod.duration}
                    </span>
                    <span>·</span>
                    <span>{completedInMod}/{modItems.length}</span>
                  </div>
                </div>
                <Icon
                  name={isExpanded ? "chevronDown" : "chevronRight"}
                  size={15}
                  className="shrink-0 text-blue-300/70"
                />
              </button>

              {/* Items in Module (Vertical Timeline) */}
              {isExpanded && (
                <div className="relative py-2">
                  {/* Continuous Timeline vertical line */}
                  <div className="absolute bottom-4 left-[26px] top-4 w-0.5 bg-blue-400/25" />

                  <div className="space-y-0.5">
                    {modItems.map(item => {
                      const isActive = item.id === activeItem?.id;
                      const isItemDone = completed.has(item.id);
                      const iconName = getItemIcon(item.type);

                      if (!unlocked) {
                        return (
                          <div
                            key={item.id}
                            className="relative flex items-center gap-3 px-4 py-2.5 opacity-40"
                          >
                            <span className="relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#15233b] text-blue-200 ring-2 ring-white/10">
                              <Icon name="lock" size={10} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="block truncate text-xs text-blue-100">{item.title}</span>
                              <span className="mt-0.5 flex items-center gap-1 text-[10px] text-blue-200/50">
                                <Icon name="clock" size={10} /> {item.duration}
                              </span>
                            </div>
                            <span className="shrink-0 text-blue-200/40">
                              <Icon name={iconName} size={15} />
                            </span>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.id}
                          to={`/student/course/${effectiveEid}/lesson/${item.id}`}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`group relative flex items-center gap-3 px-4 py-2.5 transition ${
                            isActive
                              ? "bg-[#23385f] text-white shadow-inner"
                              : "text-blue-100/80 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {/* Timeline Node Circle */}
                          <span
                            className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition ${
                              isItemDone
                                ? "bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-400/40"
                                : isActive
                                ? "bg-blue-500 text-white ring-2 ring-blue-300"
                                : "bg-[#15233b] text-blue-200 ring-2 ring-white/20 group-hover:ring-white/40"
                            }`}
                          >
                            {isItemDone ? (
                              <Icon name="check" size={12} />
                            ) : isActive ? (
                              <span className="h-2 w-2 rounded-full bg-white" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-300/60" />
                            )}
                          </span>

                          {/* Details */}
                          <div className="min-w-0 flex-1">
                            <span className={`block truncate text-xs leading-5 ${isActive ? "font-bold text-white" : "font-medium"}`}>
                              {item.title}
                            </span>
                            <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-blue-200/60">
                              <Icon name="clock" size={10} /> {item.duration}
                            </span>
                          </div>

                          {/* Right Type Icon */}
                          <span className={`shrink-0 transition ${isActive ? "text-blue-300" : "text-blue-200/60 group-hover:text-blue-200"}`}>
                            <Icon name={iconName} size={16} />
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
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-[#f4f7fb] text-slate-800 antialiased">
      {/* Desktop Left Sidebar */}
      {!sidebarCollapsed && (
        <aside className="hidden h-full w-[310px] shrink-0 border-r border-slate-800/20 lg:block xl:w-[330px]">
          {renderSidebar()}
        </aside>
      )}

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
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
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            {(sidebarCollapsed || true) && (
              <button
                type="button"
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    setSidebarCollapsed(!sidebarCollapsed);
                  } else {
                    setMobileDrawerOpen(true);
                  }
                }}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-100"
                title="Toggle curriculum contents"
              >
                <Icon name="sidebarCollapse" size={16} />
              </button>
            )}

            <nav aria-label="Breadcrumb" className="truncate text-xs font-medium md:text-sm">
              <span className="font-semibold text-blue-800">{containingModule?.title}</span>
              <span className="mx-2 text-slate-300">&gt;</span>
              <span className="font-bold text-slate-900">{activeItem?.title}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/student/course/${effectiveEid}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Icon name="arrowLeft" size={14} />
              <span className="hidden sm:inline">Course overview</span>
            </Link>
          </div>
        </header>

        {/* Scrollable Main Workspace */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-4xl space-y-6">

            {/* --- COMPREHENSIVE CHEAT SHEET / TOPIC VIEW --- */}
            {activeItem?.type === "cheatsheet" && (
              <article className="space-y-6">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-8">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                      Topic Cheat Sheet
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Estimated read: {activeItem.duration}
                    </span>
                  </div>

                  <h1 className="mt-3 font-display text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                    {activeItem.contentHeading || activeItem.title}
                  </h1>

                  {activeItem.contentDescription && (
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {activeItem.contentDescription}
                    </p>
                  )}

                  {/* Primary Code Block with line numbers and language tag */}
                  {activeItem.codeSnippet && (
                    <div className="relative mt-6 overflow-hidden rounded-xl bg-[#0e1726] text-white shadow-md">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span>Syntax Reference</span>
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

                  {/* Structured in-depth sections */}
                  {activeItem.sections && (
                    <div className="mt-8 space-y-7 border-t border-slate-100 pt-7">
                      {activeItem.sections.map((sec, idx) => (
                        <section key={idx} className="space-y-3">
                          <h2 className="font-display text-lg font-bold text-slate-900">
                            {sec.title}
                          </h2>
                          <p className="text-sm leading-6 text-slate-600">
                            {sec.explanation}
                          </p>

                          {sec.bullets && (
                            <ul className="space-y-2 pl-2">
                              {sec.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {sec.codeSnippet && (
                            <div className="mt-3 overflow-hidden rounded-xl bg-[#0e1726] p-4 text-xs font-mono text-slate-100 shadow-sm">
                              <pre className="whitespace-pre">{sec.codeSnippet.code}</pre>
                            </div>
                          )}
                        </section>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interactive Practice / Quiz at the bottom of the cheat sheet */}
                {questions.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-700">
                          Knowledge Check
                        </span>
                        <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
                          Review Questions ({questions.length})
                        </h2>
                      </div>

                      {isThisQuizSubmitted && (
                        <div className="text-right">
                          <span className={`inline-block rounded-xl px-3.5 py-1.5 text-xs font-bold ${
                            quizResults.passed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                          }`}>
                            Score: {quizResults.scorePct}% ({quizResults.correct}/{quizResults.total} correct)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Questions List */}
                    <div className="mt-6 space-y-6">
                      {questions.map((q, qIdx) => {
                        const selectedIdx = selectedAnswers[q.id];
                        const isCorrect = selectedIdx === q.correctIndex;
                        const hasSelected = selectedIdx !== undefined;

                        return (
                          <div
                            key={q.id}
                            className={`rounded-xl border p-5 transition ${
                              isThisQuizSubmitted
                                ? isCorrect
                                  ? "border-emerald-300 bg-emerald-50/40"
                                  : "border-rose-300 bg-rose-50/40"
                                : "border-slate-200 bg-slate-50/50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="font-display text-sm font-bold text-slate-900">
                                {qIdx + 1}. {q.prompt}
                              </p>

                              {/* Review badge after submission */}
                              {isThisQuizSubmitted && (
                                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                                  isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                                }`}>
                                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                                </span>
                              )}
                            </div>

                            {/* Options */}
                            <div className="mt-4 space-y-2.5">
                              {q.options.map((opt, optIdx) => {
                                const isThisSelected = selectedIdx === optIdx;
                                const isThisTheCorrectAnswer = optIdx === q.correctIndex;

                                let optStyle = "border-slate-200 bg-white hover:border-blue-300";

                                if (isThisQuizSubmitted) {
                                  if (isThisTheCorrectAnswer) {
                                    optStyle = "border-emerald-500 bg-emerald-100 text-emerald-950 font-bold ring-1 ring-emerald-500";
                                  } else if (isThisSelected && !isCorrect) {
                                    optStyle = "border-rose-400 bg-rose-100 text-rose-950 line-through ring-1 ring-rose-400";
                                  } else {
                                    optStyle = "border-slate-200 bg-white opacity-60";
                                  }
                                } else if (isThisSelected) {
                                  optStyle = "border-blue-500 bg-blue-50 text-blue-900 ring-1 ring-blue-500";
                                }

                                return (
                                  <label
                                    key={opt.id}
                                    onClick={() => {
                                      if (!isThisQuizSubmitted) {
                                        setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                                      }
                                    }}
                                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs transition ${optStyle}`}
                                  >
                                    <input
                                      type="radio"
                                      name={q.id}
                                      disabled={isThisQuizSubmitted}
                                      checked={isThisSelected}
                                      onChange={() => {}}
                                      className="mt-0.5 accent-blue-600"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <span className="block leading-5">{opt.label}</span>
                                      {opt.code && (
                                        <pre className="mt-2 rounded bg-slate-900 p-2 font-mono text-white">
                                          {opt.code}
                                        </pre>
                                      )}
                                    </div>
                                  </label>
                                );
                              })}
                            </div>

                            {/* Explanation shown after submission */}
                            {isThisQuizSubmitted && (
                              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-700">
                                <p className="font-bold text-slate-900">
                                  {isCorrect ? "✓ Why it's correct:" : "✗ Correction & Explanation:"}
                                </p>
                                <p className="mt-1 leading-5">{q.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Quiz Action Buttons */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                      {!isThisQuizSubmitted ? (
                        <button
                          type="button"
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(selectedAnswers).length < questions.length}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Icon name="check" size={15} />
                          <span>Submit Answers & Check Score</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleRetakeQuiz}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                          <Icon name="clock" size={14} />
                          <span>Retake Quiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </article>
            )}

            {/* --- QUIZ & PRACTICE VIEW WITH SCORE & WRONG ANSWER REVIEW --- */}
            {(activeItem?.type === "practice" || activeItem?.type === "quiz") && (
              <section className="space-y-6">
                <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-700">
                      {activeItem.type === "quiz" ? "Module Assessment" : "Interactive Practice"}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {questions.length} Questions
                    </span>
                  </div>

                  <h1 className="mt-3 font-display text-2xl font-black text-slate-900 md:text-3xl">
                    {activeItem.contentHeading || activeItem.title}
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {activeItem.contentDescription || "Answer all questions below and submit to calculate your score and review any questions answered incorrectly."}
                  </p>

                  {/* Score Summary Box after submission */}
                  {isThisQuizSubmitted && (
                    <div className={`mt-6 rounded-2xl border p-5 ${
                      quizResults.passed
                        ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                        : "border-amber-200 bg-amber-50 text-amber-950"
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className={`grid h-12 w-12 place-items-center rounded-full text-lg font-extrabold ${
                            quizResults.passed ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                          }`}>
                            {quizResults.scorePct}%
                          </span>
                          <div>
                            <p className="font-display text-base font-extrabold">
                              {quizResults.passed ? "Great Job! You Passed!" : "Needs Review"}
                            </p>
                            <p className="text-xs">
                              {quizResults.correct} of {quizResults.total} questions answered correctly.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-white/80 px-3 py-1 text-xs font-bold shadow-sm">
                            Passing score: 70%
                          </span>
                          <button
                            type="button"
                            onClick={handleRetakeQuiz}
                            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold shadow-sm hover:bg-slate-50"
                          >
                            Retake
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* All Questions with Review */}
                  <div className="mt-6 space-y-6 border-t border-slate-100 pt-6">
                    {questions.map((q, idx) => {
                      const selectedIdx = selectedAnswers[q.id];
                      const isCorrect = selectedIdx === q.correctIndex;

                      return (
                        <div
                          key={q.id}
                          className={`rounded-xl border p-5 transition ${
                            isThisQuizSubmitted
                              ? isCorrect
                                ? "border-emerald-300 bg-emerald-50/30"
                                : "border-rose-300 bg-rose-50/40"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h2 className="font-display text-sm font-bold text-slate-900">
                              {idx + 1}. {q.prompt}
                            </h2>

                            {isThisQuizSubmitted && (
                              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                                isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                              }`}>
                                {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                              </span>
                            )}
                          </div>

                          <div className="mt-4 space-y-2.5">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selectedIdx === optIdx;
                              const isThisTheCorrectAnswer = optIdx === q.correctIndex;

                              let optStyle = "border-slate-200 bg-white hover:border-blue-300";

                              if (isThisQuizSubmitted) {
                                if (isThisTheCorrectAnswer) {
                                  optStyle = "border-emerald-500 bg-emerald-100 text-emerald-950 font-bold ring-1 ring-emerald-500";
                                } else if (isThisSelected && !isCorrect) {
                                  optStyle = "border-rose-400 bg-rose-100 text-rose-950 line-through ring-1 ring-rose-400";
                                } else {
                                  optStyle = "border-slate-200 bg-white opacity-60";
                                }
                              } else if (isThisSelected) {
                                optStyle = "border-blue-500 bg-blue-50 text-blue-900 ring-1 ring-blue-500";
                              }

                              return (
                                <label
                                  key={opt.id}
                                  onClick={() => {
                                    if (!isThisQuizSubmitted) {
                                      setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                                    }
                                  }}
                                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs transition ${optStyle}`}
                                >
                                  <input
                                    type="radio"
                                    name={q.id}
                                    disabled={isThisQuizSubmitted}
                                    checked={isThisSelected}
                                    onChange={() => {}}
                                    className="mt-0.5 accent-blue-600"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <span className="block leading-5">{opt.label}</span>
                                    {opt.code && (
                                      <pre className="mt-2 rounded bg-slate-900 p-2 font-mono text-white">
                                        {opt.code}
                                      </pre>
                                    )}
                                  </div>
                                </label>
                              );
                            })}
                          </div>

                          {/* Review feedback showing why wrong / right */}
                          {isThisQuizSubmitted && (
                            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-700">
                              <p className="font-bold text-slate-900">
                                {isCorrect ? "✓ Correct!" : "✗ Where you went wrong:"}
                              </p>
                              <p className="mt-1 leading-5">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submission bar */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    {!isThisQuizSubmitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length < questions.length}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Icon name="check" size={15} />
                        <span>Submit Assessment & View Results</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-emerald-700">
                          ✓ Assessment submitted & score recorded.
                        </span>
                        <button
                          type="button"
                          onClick={handleRetakeQuiz}
                          className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                        >
                          Retake Assessment
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              </section>
            )}

            {/* --- COURSE ASSIGNMENT VIEW --- */}
            {activeItem?.type === "assignment" && (
              <section className="space-y-6">
                <Card className="!rounded-2xl !border-slate-200 !p-6 md:!p-8">
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-700">
                    Graded Project Assignment
                  </span>
                  <h1 className="mt-2 font-display text-2xl font-black text-slate-900 md:text-3xl">
                    {activeItem.contentHeading || activeItem.title}
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {activeItem.assignmentPrompt?.instructions || "Review the project deliverables and submit your code solution or deployment link."}
                  </p>

                  {activeItem.assignmentPrompt?.deliverables && (
                    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Deliverables</h2>
                      <ul className="mt-2.5 space-y-2">
                        {activeItem.assignmentPrompt.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Icon name="check" size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Submission Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAssignmentSubmitted(true);
                      markAsCompleted();
                    }}
                    className="mt-6 space-y-4 border-t border-slate-100 pt-5"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                        Paste Code or Solution Notes
                      </label>
                      <textarea
                        rows={5}
                        value={assignmentText}
                        onChange={(e) => setAssignmentText(e.target.value)}
                        placeholder="Write your explanation or paste your code solution here..."
                        className="inp mt-2 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                        Project Repository or Live Preview Link
                      </label>
                      <input
                        type="url"
                        value={assignmentLink}
                        onChange={(e) => setAssignmentLink(e.target.value)}
                        placeholder="https://github.com/..."
                        className="inp mt-2 text-xs"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {assignmentSubmitted ? (
                        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700">
                          <Icon name="check" size={16} />
                          <span>Submitted for mentor review!</span>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
                        >
                          <Icon name="check" size={15} />
                          <span>Submit Assignment</span>
                        </button>
                      )}
                    </div>
                  </form>
                </Card>
              </section>
            )}

            {/* Bottom Actions Bar */}
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
