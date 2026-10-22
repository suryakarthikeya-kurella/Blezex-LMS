import React, { useState } from "react";
import {
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Terminal as TerminalIcon,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Check,
  AlertTriangle
} from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { executeCode, CodeFile } from "../../lib/codelab/executionService";
import { executeSqlQuery } from "../../lib/codelab/sqlRunner";
import { getLanguageById } from "../../lib/codelab/languageRegistry";
import { CodingExercise, TestCase } from "../../lib/codelab/exerciseData";
import { supabase } from "../../lib/supabase";

interface LessonCodingExerciseProps {
  exercise: CodingExercise;
  enrollmentId?: string;
  lessonId?: string;
  courseTitle?: string;
  userId?: string | null;
  onComplete?: () => void;
  isAlreadyCompleted?: boolean;
}

interface TestRunResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: string;
  error?: string;
  runtimeMs?: number;
}

export const LessonCodingExercise: React.FC<LessonCodingExerciseProps> = ({
  exercise,
  enrollmentId = "full-stack-web",
  lessonId,
  courseTitle,
  userId,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  const langConfig = getLanguageById(exercise.language);
  const ext = langConfig?.extension || ".txt";
  const entryFileName = `solution${ext}`;

  const [files, setFiles] = useState<CodeFile[]>([
    {
      name: entryFileName,
      content: exercise.starterCode,
    },
  ]);
  const [activeFileName, setActiveFileName] = useState(entryFileName);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestRunResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<"instructions" | "tests" | "output">("instructions");
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(isAlreadyCompleted);

  const activeContent = files[0]?.content || "";

  const handleChangeContent = (_name: string, newContent: string) => {
    setFiles([{ name: entryFileName, content: newContent }]);
  };

  const handleResetCode = () => {
    if (window.confirm("Reset code to original starter template?")) {
      setFiles([{ name: entryFileName, content: exercise.starterCode }]);
      setTestResults(null);
      setConsoleOutput("");
    }
  };

  // Run a single test or quick test
  const handleQuickRun = async () => {
    setIsRunning(true);
    setActiveTab("output");
    setConsoleOutput("Executing code...\n");

    const sampleTest = exercise.testCases[0];
    const sampleInput = sampleTest ? sampleTest.input : "";

    try {
      if (exercise.language === "sql") {
        const res = await executeSqlQuery(activeContent);
        if (res.error) {
          setConsoleOutput(`SQL Error: ${res.error}\n`);
        } else {
          setConsoleOutput(
            `Query executed successfully in ${res.executionTimeMs}ms\nRows returned: ${res.rowCount}\n\n` +
            JSON.stringify(res.rows, null, 2)
          );
        }
      } else {
        const result = await executeCode(langConfig || { id: exercise.language } as any, files, sampleInput);
        let out = "";
        if (result.compile_output) {
          out += `[Compiler Output]:\n${result.compile_output}\n\n`;
        }
        if (result.stdout) {
          out += result.stdout;
        }
        if (result.stderr) {
          out += `\n[Error]:\n${result.stderr}`;
        }
        if (!out) {
          out = "(Process completed with no standard output)";
        }
        out += `\n\nExecution Time: ${result.runtime_ms}ms | Exit Code: ${result.exit_code}`;
        setConsoleOutput(out);
      }
    } catch (err: any) {
      setConsoleOutput(`Execution failure: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Evaluate all test cases
  const handleSubmitAndEvaluate = async () => {
    setIsSubmitting(true);
    setActiveTab("tests");
    const results: TestRunResult[] = [];
    let allPassed = true;

    try {
      for (const tc of exercise.testCases) {
        if (exercise.language === "sql") {
          const res = await executeSqlQuery(activeContent);
          const rawRows = JSON.stringify(res.rows || []);
          const normalizedExpected = tc.expectedOutput.trim().toLowerCase();
          const passed = !res.error && rawRows.toLowerCase().includes(normalizedExpected);

          results.push({
            testCase: tc,
            passed,
            actualOutput: res.error ? `Error: ${res.error}` : JSON.stringify(res.rows, null, 2),
            runtimeMs: res.executionTimeMs,
          });

          if (!passed) allPassed = false;
        } else {
          const result = await executeCode(langConfig || { id: exercise.language } as any, files, tc.input);
          const trimmedStdout = (result.stdout || "").trim();
          const expectedTrimmed = tc.expectedOutput.trim();

          const passed = result.exit_code === 0 && trimmedStdout === expectedTrimmed;

          results.push({
            testCase: tc,
            passed,
            actualOutput: result.stdout || result.stderr || "",
            error: result.stderr,
            runtimeMs: result.runtime_ms,
          });

          if (!passed) allPassed = false;
        }
      }

      setTestResults(results);

      // Record submission to Supabase / local
      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;
      const status = allPassed ? "passed" : "failed";

      try {
        if (userId) {
          await supabase.from("coding_exercise_submissions").insert({
            exercise_id: exercise.id,
            enrollment_id: enrollmentId,
            student_id: userId,
            submitted_code: activeContent,
            tests_passed: passedCount,
            tests_total: totalCount,
            status,
            runtime_ms: results.reduce((acc, r) => acc + (r.runtimeMs || 0), 0),
          });
        }
      } catch {
        // Fallback or ignore network issue
      }

      if (allPassed) {
        setSubmissionSuccess(true);
        if (onComplete) {
          onComplete();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleHint = (idx: number) => {
    if (revealedHints.includes(idx)) {
      setRevealedHints(revealedHints.filter(h => h !== idx));
    } else {
      setRevealedHints([...revealedHints, idx]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[780px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl text-slate-200">
      {/* Left Pane: Instructions, Hints, and Test Case Status (40%) */}
      <div className="w-full lg:w-[42%] flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-[#0c1220]">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2 text-xs">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab("instructions")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === "instructions"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setActiveTab("tests")}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === "tests"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>Tests</span>
              {testResults && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800">
                  {testResults.filter(r => r.passed).length}/{testResults.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === "output"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Output
            </button>
          </div>

          <button
            onClick={handleResetCode}
            title="Reset code"
            className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 p-1.5 rounded hover:bg-slate-800 transition text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 text-sm space-y-5">
          {activeTab === "instructions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{exercise.language.toUpperCase()} Coding Challenge</span>
                </span>
                {submissionSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight">{exercise.title}</h2>

              <div className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-sans bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                {exercise.instructions}
              </div>

              {/* Sample Test Case Preview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sample Test Cases</h4>
                <div className="space-y-2">
                  {exercise.testCases.filter(tc => !tc.isHidden).map(tc => (
                    <div key={tc.id} className="bg-slate-900/90 rounded-lg p-3 text-xs border border-slate-800 font-mono">
                      <div className="text-slate-400 font-semibold mb-1 text-[11px]">{tc.name}</div>
                      {tc.input && (
                        <div className="text-slate-300">
                          <span className="text-slate-500">Input:</span> {tc.input}
                        </div>
                      )}
                      <div className="text-emerald-400">
                        <span className="text-slate-500">Expected:</span> {tc.expectedOutput}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hints Accordion */}
              {exercise.hints && exercise.hints.length > 0 && (
                <div className="border-t border-slate-800/80 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hints & Guidance ({exercise.hints.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {exercise.hints.map((hint, idx) => {
                      const isRevealed = revealedHints.includes(idx);
                      return (
                        <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden">
                          <button
                            onClick={() => toggleHint(idx)}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-850 transition"
                          >
                            <span className="flex items-center gap-2">
                              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                              <span>Hint {idx + 1}</span>
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isRevealed ? "rotate-90" : ""}`} />
                          </button>
                          {isRevealed && (
                            <div className="px-3 pb-3 pt-1 text-xs text-amber-200/90 bg-amber-950/20 border-t border-amber-500/10 font-sans">
                              {hint}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "tests" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Test Suite Results</h3>

              {!testResults ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <TerminalIcon className="w-8 h-8 mx-auto opacity-40" />
                  <p className="text-xs">Click "Submit & Run Tests" to evaluate your solution against the verification test suite.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Summary Banner */}
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    testResults.every(r => r.passed)
                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                      : "bg-rose-950/40 border-rose-500/40 text-rose-300"
                  }`}>
                    <div className="flex items-center gap-3">
                      {testResults.every(r => r.passed) ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-400" />
                      )}
                      <div>
                        <div className="font-bold text-sm">
                          {testResults.every(r => r.passed)
                            ? "All Test Cases Passed! 🎉"
                            : `${testResults.filter(r => r.passed).length} of ${testResults.length} Tests Passed`}
                        </div>
                        <div className="text-xs opacity-80">
                          {testResults.every(r => r.passed)
                            ? "Lesson completed and learning streak recorded."
                            : "Check the failing test cases below and adjust your code."}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* List of Cases */}
                  {testResults.map((r, i) => (
                    <div
                      key={r.testCase.id}
                      className={`p-3.5 rounded-xl border text-xs font-mono space-y-1.5 ${
                        r.passed
                          ? "bg-slate-900/50 border-emerald-500/20"
                          : "bg-rose-950/20 border-rose-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">
                          Case {i + 1}: {r.testCase.name} {r.testCase.isHidden && "(Hidden)"}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          r.passed ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                        }`}>
                          {r.passed ? "Passed" : "Failed"}
                        </span>
                      </div>

                      {!r.testCase.isHidden && (
                        <>
                          {r.testCase.input && (
                            <div className="text-slate-400 text-[11px]">
                              <span className="text-slate-500">Input:</span> {r.testCase.input}
                            </div>
                          )}
                          <div className="text-emerald-400 text-[11px]">
                            <span className="text-slate-500">Expected:</span> {r.testCase.expectedOutput}
                          </div>
                          {!r.passed && (
                            <div className="text-rose-400 text-[11px]">
                              <span className="text-slate-500">Actual:</span> {r.actualOutput || "(empty)"}
                            </div>
                          )}
                        </>
                      )}

                      {r.testCase.isHidden && !r.passed && (
                        <div className="text-slate-400 text-[11px] italic">
                          (Hidden test case output details are protected)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "output" && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Console Standard Output</h3>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 min-h-[220px] whitespace-pre-wrap break-all">
                {consoleOutput || <span className="text-slate-600 italic">No output yet. Run your code to test execution.</span>}
              </div>
            </div>
          )}
        </div>

        {/* Action Button Bar at Bottom of Left Pane */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleQuickRun}
            disabled={isRunning || isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Running..." : "Run Sample"}</span>
          </button>

          <button
            type="button"
            onClick={handleSubmitAndEvaluate}
            disabled={isRunning || isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Evaluating...</span>
            ) : (
              <>
                <span>Submit Solution</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Pane: Code Editor (58%) */}
      <div className="w-full lg:w-[58%] h-full flex flex-col bg-slate-900">
        <CodeEditor
          files={files}
          activeFileName={activeFileName}
          onSelectFile={setActiveFileName}
          onChangeContent={handleChangeContent}
          onRun={handleQuickRun}
          isRunning={isRunning || isSubmitting}
          languageConfig={langConfig}
        />
      </div>
    </div>
  );
};
