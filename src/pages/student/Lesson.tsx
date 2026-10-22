import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon, { IconName } from "../../components/Icon";
import {
  FULL_STACK_MODULES,
  CurriculumItem,
  CurriculumModule,
  PracticeQuestion,
  getModuleTotalMinutes,
  formatMinutesToHuman,
  getCurriculumForCourse,
  findCurriculumItem,
  cleanSubCourseTitle,
  cleanModuleTitle,
  cleanLessonHeading,
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
import { useAuth } from "../../lib/auth";
import { LessonCodingExercise } from "../../components/codelab/LessonCodingExercise";
import { getExerciseForLesson } from "../../lib/codelab/exerciseData";

export default function StudentLesson() {
  const { profile } = useAuth();
  const { eid, lid } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState<CurriculumModule[]>(() => getCurriculumForCourse(eid));
  const [course, setCourse] = useState<any>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  const scrollToTop = (smooth = false) => {
    // 1. Ref on main scrollable workspace
    if (mainScrollRef.current) {
      if (smooth) {
        mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        mainScrollRef.current.scrollTop = 0;
        try {
          mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        } catch {}
      }
    }
    // 2. Query selector fallback for any element with lesson-scroll-container
    const container = document.getElementById("lesson-scroll-container") || document.querySelector(".lesson-scroll-container");
    if (container && container !== mainScrollRef.current) {
      if (smooth) {
        container.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        (container as HTMLElement).scrollTop = 0;
      }
    }
    // 3. Anchor element scrollIntoView
    const anchor = document.getElementById("lesson-top-anchor");
    if (anchor) {
      try {
        anchor.scrollIntoView({ behavior: smooth ? "smooth" : ("instant" as ScrollBehavior), block: "start" });
      } catch {
        anchor.scrollIntoView(true);
      }
    }
    // 4. Window and html/body
    if (smooth) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  };

  const handleSetLessonMode = (mode: "learn" | "quiz" | "code") => {
    setLessonMode(mode);
    scrollToTop(true);
  };

  // View mode for lessons with questions: "learn" (reading notes) vs "quiz" (testing understanding) vs "code" (interactive coding exercise)
  const [lessonMode, setLessonMode] = useState<"learn" | "quiz" | "code">("learn");

  // Quiz / Assessment submission & review state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Assignment state
  const [assignmentText, setAssignmentText] = useState("");
  const [assignmentLink, setAssignmentLink] = useState("");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState(false);
  const [openSidebarModules, setOpenSidebarModules] = useState<Record<string, boolean>>({});

  const toggleSidebarModule = (modId: string) => {
    setOpenSidebarModules(prev => ({
      ...prev,
      [modId]: prev[modId] === false ? true : false,
    }));
  };

  const handleCopyCodeSnippet = (codeText: string) => {
    try {
      navigator.clipboard.writeText(codeText);
      setCopiedCodeSnippet(true);
      setTimeout(() => setCopiedCodeSnippet(false), 2000);
    } catch {}
  };

  // Load course and curriculum
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchCourseCurriculum(eid || "full-stack-web");
        if (cancelled) return;
        setCourse(result.course);
        setModules(result.modules);
        const savedCompleted = getCompletedItemIds(eid, profile?.id);
        setCompleted(savedCompleted);
      } catch (err) {
        console.error("Error loading curriculum:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [eid, profile?.id]);

  // Find which sub-course contains the current lesson lid
  const containingModule = useMemo(() => {
    if (!lid) return modules[0];
    const foundMod = modules.find(m => m.items.some(it => it.id === lid));
    if (foundMod) return foundMod;
    const globalLookup = findCurriculumItem(lid);
    if (globalLookup) return globalLookup.module;
    return modules[0];
  }, [modules, lid]);

  const containingModuleIndex = useMemo(() => {
    return modules.findIndex(m => m.id === containingModule?.id);
  }, [modules, containingModule]);

  // Lessons belonging ONLY to the active sub-course
  const subCourseLessons: CurriculumItem[] = useMemo(() => {
    return containingModule?.items || [];
  }, [containingModule]);

  // Find active item within this sub-course
  const activeItemIndex = useMemo(() => {
    if (!lid) return 0;
    const idx = subCourseLessons.findIndex(it => it.id === lid);
    return idx !== -1 ? idx : 0;
  }, [lid, subCourseLessons]);

  const activeItem: CurriculumItem = subCourseLessons[activeItemIndex] || subCourseLessons[0];

  const completedInSubCourse = useMemo(() => {
    return subCourseLessons.filter(it => completed.has(it.id)).length;
  }, [subCourseLessons, completed]);

  const subCoursePct = subCourseLessons.length
    ? Math.round((completedInSubCourse * 100) / subCourseLessons.length)
    : 0;

  const isCurrentSubCourseUnlocked = useMemo(() => {
    if (modules.length === 0 || containingModuleIndex <= 0) return true;
    return isCurriculumModuleUnlocked(containingModuleIndex, modules, completed);
  }, [containingModuleIndex, modules, completed]);

  const nextSubCourse = useMemo(() => {
    if (containingModuleIndex >= 0 && containingModuleIndex < modules.length - 1) {
      return modules[containingModuleIndex + 1];
    }
    return null;
  }, [containingModuleIndex, modules]);

  const isCurrentSubCourseAllDone = useMemo(() => {
    return subCourseLessons.length > 0 && subCourseLessons.every(it => completed.has(it.id));
  }, [subCourseLessons, completed]);

  // Reset view mode and assignment state, and scroll to top when opening any lesson
  useEffect(() => {
    if (loading) return;

    setLessonMode("learn");
    setAssignmentSubmitted(false);
    setAssignmentText("");
    setAssignmentLink("");

    scrollToTop(false);
    const rafId = requestAnimationFrame(() => {
      scrollToTop(false);
    });
    const timerId1 = setTimeout(() => {
      scrollToTop(false);
    }, 40);
    const timerId2 = setTimeout(() => {
      scrollToTop(false);
    }, 120);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId1);
      clearTimeout(timerId2);
    };
  }, [lid, loading]);

  // Auto-expand the module containing the active item in sidebar
  useEffect(() => {
    if (activeItem?.moduleId) {
      setOpenSidebarModules(prev => ({
        ...prev,
        [activeItem.moduleId!]: true
      }));
    }
  }, [activeItem?.id, activeItem?.moduleId]);

  const isCurrentDone = completed.has(activeItem?.id);

  const effectiveEid = eid || "full-stack-web";

  // PERMANENT COMPLETION: once marked complete, cannot unmark!
  const markAsCompleted = () => {
    if (!activeItem || isCurrentDone) return;
    const updated = saveCompletedItemId(effectiveEid, activeItem.id, true, {
      title: activeItem.title,
      moduleTitle: containingModule?.title || activeItem.moduleTitle,
      courseTitle: course?.title || containingModule?.title || "Course Track",
    }, profile?.id);
    setCompleted(new Set(updated));
    syncCompletedToSupabase(effectiveEid, activeItem.id, true);
  };

  const prevItem = activeItemIndex > 0 ? subCourseLessons[activeItemIndex - 1] : null;
  const nextItem = activeItemIndex < subCourseLessons.length - 1 ? subCourseLessons[activeItemIndex + 1] : null;

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

  const getItemBadge = (item: CurriculumItem) => {
    if (item.isSubCourseAssessment) {
      if (item.type === "quiz") return { label: "Course Exam", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" };
      return { label: "Capstone", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" };
    }
    if (item.isModuleQuiz) {
      return { label: "Module MCQs", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };
    }
    if (item.isModuleAssessment) {
      return { label: "Module Lab", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" };
    }
    switch (item.type) {
      case "cheatsheet":
        return { label: "Lesson", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
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
      const targetIdx = q.correctIndex !== undefined
        ? q.correctIndex
        : q.options.findIndex(opt => opt.id === q.correctAnswer);
      if (selectedAnswers[q.id] === targetIdx) {
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
      courseTitle: course?.title || containingModule?.title || "Course Track",
    }, profile?.id);
    markAsCompleted();
    scrollToTop(true);
  };

  const handleRetakeQuiz = () => {
    setQuizSubmitted(prev => ({ ...prev, [activeItem.id]: false }));
    const newAnswers = { ...selectedAnswers };
    questions.forEach(q => delete newAnswers[q.id]);
    setSelectedAnswers(newAnswers);
    scrollToTop(true);
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

  // --- LOCKED SUB-COURSE SHIELD ---
  if (!isCurrentSubCourseUnlocked) {
    const prevSub = containingModuleIndex > 0 ? modules[containingModuleIndex - 1] : null;
    const prevItems = prevSub?.items || [];
    const prevDone = prevItems.filter(it => completed.has(it.id)).length;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1d] p-6 text-white">
        <div className="max-w-md w-full rounded-3xl border border-amber-500/30 bg-slate-900/95 p-8 text-center shadow-2xl backdrop-blur-md">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-inner">
            <Icon name="lock" size={32} />
          </span>
          <span className="mt-4 inline-block text-[10px] font-black uppercase tracking-widest text-amber-400">
            COURSE LOCKED
          </span>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-white">
            {containingModule?.title || "Sub-Course Locked"}
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            This lesson is part of a locked sub-course. You must finish all lessons and assessments in{" "}
            <strong className="text-amber-300">{prevSub?.title || "the previous course"}</strong> first ({prevDone}/{prevItems.length} completed).
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/student/course/${effectiveEid}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
            >
              <Icon name="arrowLeft" size={14} /> Back to Course Track
            </Link>
            <button
              type="button"
              onClick={() => {
                // Find first incomplete lesson in earliest unlocked subcourse
                for (let i = 0; i < modules.length; i++) {
                  if (isCurriculumModuleUnlocked(i, modules, completed)) {
                    const incomplete = modules[i].items.find(it => !completed.has(it.id));
                    if (incomplete) {
                      navigate(`/student/course/${effectiveEid}/lesson/${incomplete.id}`);
                      return;
                    }
                  }
                }
                navigate(`/student/course/${effectiveEid}`);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition"
            >
              <span>Go to Active Lesson</span>
              <Icon name="arrow" size={14} />
            </button>
          </div>
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
          <span>Program Sub-Courses</span>
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

      {/* Active Sub-Course Header Card (Only this sub-course is shown) */}
      {containingModule && (
        <div className="border-b border-white/[0.08] bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-[#0b1120] p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-blue-300 border border-blue-400/20">
              Sub-Course 0{containingModuleIndex + 1}
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              0{containingModuleIndex + 1} of 0{modules.length}
            </span>
          </div>

          <h2 className="mt-2 font-display text-xs font-bold leading-snug text-white">
            {cleanSubCourseTitle(containingModule.title)}
          </h2>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Icon name="clock" size={11} className="text-amber-500" />
              <span>{formatMinutesToHuman(getModuleTotalMinutes(containingModule))}</span>
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-blue-300">
              {completedInSubCourse}/{subCourseLessons.length} Completed
            </span>
          </div>

          {/* Sub-course progress bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full transition-all duration-300 ${
                subCoursePct >= 100
                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              }`}
              style={{ width: `${subCoursePct}%` }}
            />
          </div>
        </div>
      )}

      {/* Vertical Timeline Lessons List: Grouped by Module */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {containingModule?.modules && containingModule.modules.length > 0 ? (
          <>
            {containingModule.modules.map((mod, modIdx) => {
              const isOpen = openSidebarModules[mod.id] !== false;
              return (
                <div key={mod.id} className="space-y-1">
                  {/* Module Header / Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleSidebarModule(mod.id)}
                    className="w-full text-left sticky top-0 z-20 my-1 px-2.5 py-1.5 rounded-lg bg-[#0f172a]/95 hover:bg-[#1e293b] backdrop-blur-xs border border-white/10 flex items-center justify-between shadow-xs transition-colors cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded bg-blue-500/25 text-[9px] font-black text-blue-300 group-hover:scale-105 transition-transform">
                        {modIdx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-slate-200 truncate group-hover:text-blue-300 transition-colors">
                        {cleanModuleTitle(mod.title)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {mod.items.filter(it => completed.has(it.id)).length}/{mod.items.length}
                      </span>
                      <Icon
                        name="chevronDown"
                        size={12}
                        className={`text-slate-400 group-hover:text-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Items in Module (Collapsible) */}
                  {isOpen && (
                    <div className="relative space-y-0.5 py-1">
                      {mod.items.map((item, itemIdx) => {
                        const isActive = item.id === activeItem?.id;
                        const isItemDone = completed.has(item.id);
                        const iconName = getItemIcon(item.type);
                        const badge = getItemBadge(item);

                        return (
                          <Link
                            key={item.id}
                            to={`/student/course/${effectiveEid}/lesson/${item.id}`}
                            onClick={() => {
                              setMobileDrawerOpen(false);
                              scrollToTop(false);
                            }}
                            className={`group relative flex items-center gap-3 rounded-lg mx-1 px-3 py-2 transition-all duration-150 ${
                              isActive
                                ? "bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-purple-600/10 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30"
                                : !isCurrentSubCourseUnlocked
                                ? "text-slate-400 hover:bg-white/[0.03]"
                                : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                            }`}
                          >
                            {/* Timeline Node Circle */}
                            <span
                              className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition ${
                                !isCurrentSubCourseUnlocked
                                  ? "bg-[#0b1120] text-amber-500/80 ring-2 ring-amber-500/30"
                                  : isItemDone
                                  ? "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/40"
                                  : isActive
                                  ? "bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/30"
                                  : "bg-[#0b1120] text-slate-500 ring-2 ring-white/15 group-hover:ring-white/40"
                              }`}
                            >
                              {!isCurrentSubCourseUnlocked ? (
                                <Icon name="lock" size={10} className="text-amber-400" />
                              ) : isItemDone ? (
                                <Icon name="check" size={11} />
                              ) : isActive ? (
                                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                              )}
                            </span>

                            {/* Details */}
                            <div className="min-w-0 flex-1">
                              <span className={`block truncate text-xs leading-snug ${
                                isActive ? "text-white" : !isCurrentSubCourseUnlocked ? "text-slate-400" : "text-slate-300"
                              }`}>
                                {cleanLessonHeading(item.title)}
                              </span>
                              <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                                <span className={`rounded px-1.5 py-0.2 border text-[9px] font-bold uppercase tracking-wider ${
                                  !isCurrentSubCourseUnlocked ? "border-amber-500/20 bg-amber-500/10 text-amber-300" : badge.color
                                }`}>
                                  {!isCurrentSubCourseUnlocked ? "Locked" : badge.label}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="clock" size={9} /> {item.duration}
                                </span>
                              </div>
                            </div>

                            {/* Right Type Icon */}
                            <span className={`shrink-0 transition ${
                              isActive ? "text-blue-400" : !isCurrentSubCourseUnlocked ? "text-slate-600" : "text-slate-500 group-hover:text-slate-300"
                            }`}>
                              {!isCurrentSubCourseUnlocked ? <Icon name="lock" size={12} className="text-amber-500/60" /> : <Icon name={iconName} size={15} />}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sub-Course Final Assessment Section */}
            {(containingModule.courseAssessment || containingModule.courseProject) && (
              <div className="pt-2 border-t border-white/10 space-y-1">
                <div className="sticky top-0 z-20 my-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-950/60 to-purple-950/60 backdrop-blur-xs border border-amber-500/30 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon name="sparkle" size={13} className="text-amber-400 shrink-0" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 truncate">
                      Sub-Course Assessment
                    </span>
                  </div>
                </div>

                <div className="relative space-y-0.5 py-1">
                  {[containingModule.courseAssessment, containingModule.courseProject].filter(Boolean).map(item => {
                    if (!item) return null;
                    const isActive = item.id === activeItem?.id;
                    const isItemDone = completed.has(item.id);
                    const iconName = getItemIcon(item.type);
                    const badge = getItemBadge(item);

                    return (
                      <Link
                        key={item.id}
                        to={`/student/course/${effectiveEid}/lesson/${item.id}`}
                        onClick={() => {
                          setMobileDrawerOpen(false);
                          scrollToTop(false);
                        }}
                        className={`group relative flex items-center gap-3 rounded-lg mx-1 px-3 py-2 transition-all duration-150 ${
                          isActive
                            ? "bg-gradient-to-r from-amber-600/25 via-purple-600/20 to-blue-600/10 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/40"
                            : !isCurrentSubCourseUnlocked
                            ? "text-slate-400 hover:bg-white/[0.03]"
                            : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <span
                          className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition ${
                            !isCurrentSubCourseUnlocked
                              ? "bg-[#0b1120] text-amber-500/80 ring-2 ring-amber-500/30"
                              : isItemDone
                              ? "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/40"
                              : isActive
                              ? "bg-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.6)] ring-4 ring-amber-500/30"
                              : "bg-[#0b1120] text-amber-500/70 ring-2 ring-amber-500/30 group-hover:ring-amber-500/50"
                          }`}
                        >
                          {!isCurrentSubCourseUnlocked ? (
                            <Icon name="lock" size={10} className="text-amber-400" />
                          ) : isItemDone ? (
                            <Icon name="check" size={11} />
                          ) : (
                            "★"
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <span className={`block truncate text-xs leading-snug ${
                            isActive ? "text-amber-200" : !isCurrentSubCourseUnlocked ? "text-slate-400" : "text-slate-300"
                          }`}>
                            {cleanLessonHeading(item.title)}
                          </span>
                          <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                            <span className={`rounded px-1.5 py-0.2 border text-[9px] font-bold uppercase tracking-wider ${
                              !isCurrentSubCourseUnlocked ? "border-amber-500/20 bg-amber-500/10 text-amber-300" : badge.color
                            }`}>
                              {!isCurrentSubCourseUnlocked ? "Locked" : badge.label}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="clock" size={9} /> {item.duration}
                            </span>
                          </div>
                        </div>

                        <span className={`shrink-0 transition ${
                          isActive ? "text-amber-400" : !isCurrentSubCourseUnlocked ? "text-slate-600" : "text-slate-500 group-hover:text-slate-300"
                        }`}>
                          {!isCurrentSubCourseUnlocked ? <Icon name="lock" size={12} className="text-amber-500/60" /> : <Icon name={iconName} size={15} />}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Flat fallback */
          <div className="relative space-y-0.5 py-1">
            {subCourseLessons.map((item, itemIdx) => {
              const isActive = item.id === activeItem?.id;
              const isItemDone = completed.has(item.id);
              const iconName = getItemIcon(item.type);
              const badge = getItemBadge(item);

              return (
                <Link
                  key={item.id}
                  to={`/student/course/${effectiveEid}/lesson/${item.id}`}
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    scrollToTop(false);
                  }}
                  className={`group relative flex items-center gap-3 rounded-lg mx-1 px-3 py-2 transition-all duration-150 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-purple-600/10 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
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

                  <span className={`shrink-0 transition ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                    <Icon name={iconName} size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
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
              <Link to="/student/courses" className="hidden sm:inline font-semibold text-slate-400 hover:text-slate-600 truncate max-w-[150px]">
                {course?.title || "Courses"}
              </Link>
              <span className="hidden sm:inline text-slate-300">&gt;</span>
              <Link
                to={`/student/course/${effectiveEid}`}
                className="rounded-lg bg-blue-50 px-2.5 py-1 font-bold text-blue-700 border border-blue-200/50 truncate max-w-[200px] hover:bg-blue-100 transition"
              >
                Sub-Course {containingModuleIndex >= 0 ? containingModuleIndex + 1 : ""}: {cleanSubCourseTitle(containingModule?.title)}
              </Link>
              {activeItem?.moduleTitle && (
                <>
                  <span className="hidden md:inline text-slate-300">&gt;</span>
                  <span className="hidden md:inline text-slate-500 font-semibold truncate max-w-[160px]">
                    {cleanModuleTitle(activeItem.moduleTitle)}
                  </span>
                </>
              )}
              <span className="text-slate-300">&gt;</span>
              <span className="font-bold text-slate-900 truncate">{cleanLessonHeading(activeItem?.title)}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Mode Switcher for lessons */}
            <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => handleSetLessonMode("learn")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  lessonMode === "learn"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon name="sheet" size={13} />
                <span>Cheat Sheet</span>
              </button>
              {questions.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleSetLessonMode("quiz")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    lessonMode === "quiz"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon name="quiz" size={13} />
                  <span>Test ({questions.length})</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => handleSetLessonMode("code")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  lessonMode === "code"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon name="code" size={13} />
                <span>Code Lab</span>
              </button>
            </div>

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
        <div
          ref={mainScrollRef}
          key={lid}
          id="lesson-scroll-container"
          className="lesson-scroll-container flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8"
        >
          <div id="lesson-top-anchor" className="h-0 w-0 pointer-events-none" />
          <div className="mx-auto max-w-4xl space-y-6">

            {!isCurrentSubCourseUnlocked ? (
              <div className="rounded-3xl border border-amber-200/90 bg-gradient-to-b from-amber-50/50 via-white to-slate-50/50 p-8 md:p-12 text-center shadow-sm">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-100 text-amber-600 shadow-xs">
                  <Icon name="lock" size={28} />
                </div>
                <span className="mt-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-800">
                  Sub-Course Locked
                </span>
                <h2 className="mt-3 font-display text-2xl font-black text-slate-900 md:text-3xl">
                  {cleanSubCourseTitle(containingModule?.title)}
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
                  This sub-course is currently locked. Complete all previous sub-course lessons and assessments to unlock this track.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to={`/student/course/${effectiveEid}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
                  >
                    <Icon name="arrowLeft" size={14} />
                    <span>Back to Course Track Overview</span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
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
                    {cleanLessonHeading(activeItem.contentHeading || activeItem.title)}
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
                          <span className="font-semibold text-slate-300">Code Summary & Reference</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyCodeSnippet(activeItem.codeSnippet!.code)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-200 transition hover:bg-white/20 hover:text-white"
                          >
                            <Icon name={copiedCodeSnippet ? "check" : "copy"} size={12} />
                            <span>{copiedCodeSnippet ? "Copied!" : "Copy code"}</span>
                          </button>
                          <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                            {activeItem.codeSnippet.language}
                          </span>
                        </div>
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
                          onClick={() => handleSetLessonMode("quiz")}
                          className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-indigo-500/35 active:scale-[0.98]"
                        >
                          <Icon name="pencil" size={17} />
                          <span>{isThisQuizSubmitted ? "Review / Retake Quiz" : "Start Test"}</span>
                          <Icon name="arrow" size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* --- INTERACTIVE CODE LAB LAUNCH CARD --- */}
                  <div className="mt-6 overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
                          <Icon name="code" size={13} />
                          <span>Hands-On Coding Lab</span>
                        </div>
                        <h3 className="font-display text-2xl font-black text-slate-900">
                          Practice in the BlezeX Code Lab
                        </h3>
                        <p className="text-sm leading-6 text-slate-600 max-w-xl">
                          Apply this lesson's concepts directly in the code editor. Solve algorithmic problems, query databases, run tests against automated test cases, and earn learning streak credit.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSetLessonMode("code")}
                        className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-emerald-500/35 active:scale-[0.98]"
                      >
                        <Icon name="code" size={17} />
                        <span>Launch Code Lab</span>
                        <Icon name="arrow" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* ============================================================== */}
            {/* --- INTERACTIVE CODE LAB / CODING EXERCISE VIEW --- */}
            {/* ============================================================== */}
            {(lessonMode === "code" || (activeItem?.type === "practice" && lessonMode !== "quiz")) && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSetLessonMode("learn")}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      <Icon name="arrowLeft" size={13} />
                      <span>Back to Reading Notes</span>
                    </button>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-200/50">
                      Live Coding Challenge
                    </span>
                  </div>

                  <Link
                    to="/student/codelab"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                  >
                    <span>Open Standalone IDE</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                </div>

                <LessonCodingExercise
                  exercise={getExerciseForLesson(activeItem?.id, activeItem?.title, activeItem?.type)}
                  enrollmentId={effectiveEid}
                  lessonId={activeItem?.id}
                  courseTitle={course?.title}
                  userId={profile?.id}
                  onComplete={() => markAsCompleted()}
                  isAlreadyCompleted={isCurrentDone}
                />
              </section>
            )}

            {/* ============================================================== */}
            {/* --- QUIZ / TEST MODE: QUESTIONS & EXPLANATIONS VIEW --- */}
            {/* ============================================================== */}
            {(lessonMode === "quiz" || (activeItem?.type === "quiz" && lessonMode !== "code")) && (
              <section className="space-y-6">
                <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-9">
                  {/* Top Bar inside Quiz Mode */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                    <div className="flex items-center gap-3">
                      {activeItem?.type === "cheatsheet" && (
                        <button
                          type="button"
                          onClick={() => handleSetLessonMode("learn")}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Icon name="arrowLeft" size={13} />
                          <span>Back to Cheat Sheet</span>
                        </button>
                      )}

                      <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-purple-700 border border-purple-200/50">
                        {activeItem.type === "quiz" ? "Sub-Course Assessment Exam" : activeItem.type === "practice" ? "Practice Lab" : "Knowledge Check"}
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
                        ? `Knowledge Check: ${cleanLessonHeading(activeItem.title)}`
                        : cleanLessonHeading(activeItem.contentHeading || activeItem.title)}
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
                              onClick={() => handleSetLessonMode("learn")}
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
                      const targetIdx = q.correctIndex !== undefined
                        ? q.correctIndex
                        : q.options.findIndex(opt => opt.id === q.correctAnswer);
                      const isCorrect = selectedIdx === targetIdx;
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
                              const isThisTheCorrectAnswer = optIdx === targetIdx;

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
                              onClick={() => handleSetLessonMode("learn")}
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

                        {nextItem ? (
                          <Link
                            to={`/student/course/${effectiveEid}/lesson/${nextItem.id}`}
                            onClick={() => scrollToTop(false)}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                          >
                            <span>Proceed to Next Item</span>
                            <Icon name="arrow" size={14} />
                          </Link>
                        ) : nextSubCourse && (isCurrentSubCourseAllDone || isCurrentDone) ? (
                          <Link
                            to={`/student/course/${effectiveEid}/lesson/${nextSubCourse.items[0]?.id}`}
                            onClick={() => scrollToTop(false)}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:from-emerald-500 hover:to-teal-500"
                          >
                            <span>Next Course: {nextSubCourse.title}</span>
                            <Icon name="arrow" size={14} />
                          </Link>
                        ) : (
                          <Link
                            to={`/student/course/${effectiveEid}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                          >
                            <span>Back to Course Track</span>
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
                      Sub-Course Graded Project Assignment
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Estimated: {activeItem.duration}
                    </span>
                  </div>

                  <h1 className="mt-3 font-display text-2xl font-black text-slate-900 md:text-3xl">
                    {cleanLessonHeading(activeItem.contentHeading || activeItem.title)}
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
                        courseTitle: course?.title || containingModule?.title || "Course Track",
                      }, profile?.id);
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
                  onClick={() => scrollToTop(false)}
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
                  onClick={() => scrollToTop(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <span>Next</span>
                  <Icon name="arrow" size={15} />
                </Link>
              ) : nextSubCourse && (isCurrentSubCourseAllDone || isCurrentDone) ? (
                <Link
                  to={`/student/course/${effectiveEid}/lesson/${nextSubCourse.items[0]?.id}`}
                  onClick={() => scrollToTop(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500"
                >
                  <span>Next Sub-Course: {cleanSubCourseTitle(nextSubCourse.title)}</span>
                  <Icon name="arrow" size={15} />
                </Link>
              ) : (
                <Link
                  to={`/student/course/${effectiveEid}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <span>Back to Course Track</span>
                  <Icon name="arrow" size={15} />
                </Link>
              )}
            </div>

              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
