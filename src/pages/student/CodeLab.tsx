import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Code2,
  FolderOpen,
  Plus,
  Play,
  Save,
  Copy,
  Trash2,
  Share2,
  Terminal,
  Database,
  Eye,
  Settings,
  Layers,
  Sparkles,
  Check,
  ChevronDown,
  Info,
  ArrowLeft,
  RefreshCw,
  Sliders,
  FileCode
} from "lucide-react";
import { useAuth } from "../../lib/auth";
import { SUPPORTED_LANGUAGES, getLanguageById, SupportedLanguage } from "../../lib/codelab/languageRegistry";
import { CodeEditor } from "../../components/codelab/CodeEditor";
import { WebPreview } from "../../components/codelab/WebPreview";
import { executeCode, CodeFile, ExecutionResult } from "../../lib/codelab/executionService";
import { executeSqlQuery, SqlQueryResult, SAMPLE_DB_SCHEMA, TableSchemaInfo } from "../../lib/codelab/sqlRunner";
import {
  listProjects,
  getProject,
  createProject,
  saveProject,
  deleteProject,
  duplicateProject,
  CodeProject
} from "../../lib/codelab/projectService";

export default function StudentCodeLab() {
  const { projectId } = useParams<{ projectId?: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();

  // State
  const [currentProject, setCurrentProject] = useState<CodeProject | null>(null);
  const [projectTitle, setProjectTitle] = useState("Untitled Project");
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    getLanguageById("python") || SUPPORTED_LANGUAGES[0]
  );
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [activeFileName, setActiveFileName] = useState<string>("");
  const [stdinInput, setStdinInput] = useState<string>("");

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [sqlResult, setSqlResult] = useState<SqlQueryResult | null>(null);
  const [bottomTab, setBottomTab] = useState<"terminal" | "stdin" | "schema">("terminal");

  // Project manager modal
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [savedProjects, setSavedProjects] = useState<CodeProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load project or initialize default
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (projectId) {
        const proj = await getProject(projectId);
        if (cancelled) return;
        if (proj) {
          setCurrentProject(proj);
          setProjectTitle(proj.title);
          const lang = getLanguageById(proj.language) || SUPPORTED_LANGUAGES[0];
          setSelectedLanguage(lang);
          if (proj.files && proj.files.length > 0) {
            setFiles(proj.files.map(f => ({ name: f.name, content: f.content })));
            setActiveFileName(proj.files[0].name);
          }
          return;
        }
      }

      // Default new project (Python)
      const defaultLang = getLanguageById("python") || SUPPORTED_LANGUAGES[0];
      setSelectedLanguage(defaultLang);
      setProjectTitle("Python Scratchpad");
      const defaultFileName = `main${defaultLang.extension}`;
      setFiles([
        {
          name: defaultFileName,
          content: defaultLang.starterCode,
        },
      ]);
      setActiveFileName(defaultFileName);
      setCurrentProject(null);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle language switch
  const handleSelectLanguage = (langId: string) => {
    const lang = getLanguageById(langId);
    if (!lang) return;

    if (files.length > 0 && files[0].content.trim() !== selectedLanguage.starterCode.trim()) {
      if (!window.confirm("Switching language will replace your current files with starter template. Continue?")) {
        return;
      }
    }

    setSelectedLanguage(lang);
    setProjectTitle(`${lang.name} Playground`);

    if (lang.id === "web") {
      setFiles([
        { name: "index.html", content: lang.starterCode },
        { name: "styles.css", content: "/* CSS Styling */\nbody {\n  font-family: system-ui, sans-serif;\n  padding: 2rem;\n  background: #f8fafc;\n  color: #0f172a;\n}" },
        { name: "script.js", content: "// JavaScript Code\nconsole.log('BlezeX Web Playground Loaded!');" },
      ]);
      setActiveFileName("index.html");
    } else {
      const fileName = `main${lang.extension}`;
      setFiles([{ name: fileName, content: lang.starterCode }]);
      setActiveFileName(fileName);
    }

    setExecutionResult(null);
    setSqlResult(null);
  };

  // File mutations
  const handleSelectFile = (name: string) => {
    setActiveFileName(name);
  };

  const handleChangeContent = (fileName: string, newContent: string) => {
    setFiles(prev =>
      prev.map(f => (f.name === fileName ? { ...f, content: newContent } : f))
    );
  };

  const handleAddFile = (fileName: string) => {
    setFiles(prev => [...prev, { name: fileName, content: "" }]);
    setActiveFileName(fileName);
  };

  const handleDeleteFile = (fileName: string) => {
    if (files.length <= 1) return;
    setFiles(prev => prev.filter(f => f.name !== fileName));
    if (activeFileName === fileName) {
      const remaining = files.filter(f => f.name !== fileName);
      setActiveFileName(remaining[0]?.name || "");
    }
  };

  // Run code
  const handleRunCode = async () => {
    setIsRunning(true);
    setBottomTab("terminal");

    try {
      if (selectedLanguage.executionMode === "sql_engine") {
        const activeContent = files.find(f => f.name === activeFileName)?.content || files[0]?.content || "";
        const res = await executeSqlQuery(activeContent);
        setSqlResult(res);
        setExecutionResult({
          stdout: res.error ? "" : `Query executed successfully (${res.rowCount} rows returned)`,
          stderr: res.error || "",
          exit_code: res.error ? 1 : 0,
          runtime_ms: res.executionTimeMs || 0,
          status: res.error ? "error" : "success",
          provider: "direct_piston",
        });
      } else {
        const result = await executeCode(selectedLanguage, files, stdinInput);
        setExecutionResult(result);
      }
    } catch (err: any) {
      setExecutionResult({
        stdout: "",
        stderr: `Failed to execute: ${err.message}`,
        exit_code: 1,
        runtime_ms: 0,
        status: "error",
        provider: "direct_piston",
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Save project
  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      if (currentProject) {
        await saveProject(
          {
            ...currentProject,
            title: projectTitle,
            language: selectedLanguage.id,
          },
          files.map((f, idx) => ({
            name: f.name,
            content: f.content,
            is_entry_point: idx === 0,
            position: idx + 1,
          }))
        );
        showNotification("Project saved successfully!");
      } else {
        const newProj = await createProject({
          title: projectTitle,
          language: selectedLanguage.id,
          files: files.map((f, idx) => ({
            name: f.name,
            content: f.content,
            is_entry_point: idx === 0,
            position: idx + 1,
          })),
        });
        setCurrentProject(newProj);
        navigate(`/student/codelab/${newProj.id}`, { replace: true });
        showNotification("Project created and saved!");
      }
    } catch {
      showNotification("Could not save project. Changes preserved locally.");
    } finally {
      setIsSaving(false);
    }
  };

  // Open projects list
  const handleOpenProjectsModal = async () => {
    setIsProjectsModalOpen(true);
    setLoadingProjects(true);
    try {
      const list = await listProjects();
      setSavedProjects(list);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleOpenProject = (id: string) => {
    setIsProjectsModalOpen(false);
    navigate(`/student/codelab/${id}`);
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await deleteProject(id);
    setSavedProjects(prev => prev.filter(p => p.id !== id));
    if (currentProject?.id === id) {
      navigate("/student/codelab");
    }
    showNotification("Project deleted.");
  };

  const handleDuplicateProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const copy = await duplicateProject(id);
    if (copy) {
      setSavedProjects(prev => [copy, ...prev]);
      showNotification("Project duplicated!");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 text-slate-200 antialiased overflow-hidden">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#090e17] border-b border-slate-800 text-xs">
        {/* Left: Brand, Project Title & Language Dropdown */}
        <div className="flex items-center space-x-3">
          <Link
            to="/student/dashboard"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Dashboard</span>
          </Link>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          {/* Project Title Input */}
          <div className="flex items-center space-x-1.5">
            <Code2 className="w-4 h-4 text-blue-500" />
            <input
              type="text"
              value={projectTitle}
              onChange={e => setProjectTitle(e.target.value)}
              placeholder="Untitled Project"
              className="bg-transparent hover:bg-slate-900 focus:bg-slate-900 border border-transparent focus:border-slate-700 rounded px-2 py-1 font-semibold text-white focus:outline-none max-w-[180px] sm:max-w-[240px] truncate"
            />
          </div>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage.id}
              onChange={e => handleSelectLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium cursor-pointer focus:outline-none focus:border-blue-500"
            >
              {SUPPORTED_LANGUAGES.map((lang: SupportedLanguage) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} {lang.badge ? `(${lang.badge})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Actions (Projects, Run, Save, Share) */}
        <div className="flex items-center space-x-2">
          {/* Notification Badge */}
          {notification && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              <Check className="w-3 h-3" />
              {notification}
            </span>
          )}

          {/* My Projects */}
          <button
            onClick={handleOpenProjectsModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 transition"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-medium">Projects</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveProject}
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">{isSaving ? "Saving..." : "Save"}</span>
          </button>

          {/* Run Button (for non-web) */}
          {selectedLanguage.id !== "web" && (
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg font-bold shadow-lg transition ${
                isRunning
                  ? "bg-emerald-600/50 text-emerald-200 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
              }`}
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "Running..." : "Run Code"}</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Editor (or 50% split if Web mode) */}
        <div className={`h-full flex flex-col ${selectedLanguage.id === "web" ? "w-full md:w-1/2" : "w-full md:w-3/5"} border-r border-slate-800`}>
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              files={files}
              activeFileName={activeFileName}
              onSelectFile={handleSelectFile}
              onChangeContent={handleChangeContent}
              onAddFile={handleAddFile}
              onDeleteFile={handleDeleteFile}
              onRun={selectedLanguage.id !== "web" ? handleRunCode : undefined}
              onSave={handleSaveProject}
              isRunning={isRunning}
              isSaving={isSaving}
              languageConfig={selectedLanguage}
            />
          </div>
        </div>

        {/* Right Side: Web Preview (if web) OR Terminal / SQL Runner / Stdin (if compiled/script/sql) */}
        <div className={`h-full flex flex-col ${selectedLanguage.id === "web" ? "w-full md:w-1/2" : "w-full md:w-2/5"} bg-slate-950`}>
          {selectedLanguage.id === "web" ? (
            <WebPreview files={files} />
          ) : (
            <div className="flex flex-col h-full">
              {/* Output Tabs Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 border-b border-slate-800 text-xs">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setBottomTab("terminal")}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-md font-medium transition ${
                      bottomTab === "terminal"
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Output Terminal</span>
                  </button>

                  <button
                    onClick={() => setBottomTab("stdin")}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-md font-medium transition ${
                      bottomTab === "stdin"
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Standard Input (stdin)</span>
                  </button>

                  {selectedLanguage.id === "sql" && (
                    <button
                      onClick={() => setBottomTab("schema")}
                      className={`flex items-center space-x-1.5 px-3 py-1 rounded-md font-medium transition ${
                        bottomTab === "schema"
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Database className="w-3.5 h-3.5 text-amber-400" />
                      <span>DB Tables</span>
                    </button>
                  )}
                </div>

                {executionResult && (
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                    <span>{executionResult.runtime_ms}ms</span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        executionResult.exit_code === 0
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-950 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      exit {executionResult.exit_code}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Tab Content */}
              <div className="flex-1 overflow-auto p-4 font-mono text-xs bg-slate-950">
                {bottomTab === "terminal" && (
                  <div className="space-y-3">
                    {/* Compilation Output if present */}
                    {executionResult?.compile_output && (
                      <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-amber-300 whitespace-pre-wrap">
                        <div className="font-bold mb-1 text-amber-400">Compilation:</div>
                        {executionResult.compile_output}
                      </div>
                    )}

                    {/* Standard Error */}
                    {executionResult?.stderr && (
                      <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-lg text-rose-300 whitespace-pre-wrap">
                        <div className="font-bold mb-1 text-rose-400">Error:</div>
                        {executionResult.stderr}
                      </div>
                    )}

                    {/* SQL Table Output if SQL mode */}
                    {selectedLanguage.id === "sql" && sqlResult && sqlResult.rows && (
                      <div className="overflow-x-auto rounded-lg border border-slate-800">
                        {sqlResult.rows.length === 0 ? (
                          <div className="p-4 text-slate-500 italic">Query executed successfully. 0 rows returned.</div>
                        ) : (
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
                                {Object.keys(sqlResult.rows[0]).map(col => (
                                  <th key={col} className="p-2 border-r border-slate-800 last:border-r-0">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sqlResult.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b border-slate-850 hover:bg-slate-900/50">
                                  {Object.values(row).map((val: any, cIdx) => (
                                    <td key={cIdx} className="p-2 border-r border-slate-850 last:border-r-0 text-slate-200">
                                      {typeof val === "object" ? JSON.stringify(val) : String(val)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}

                    {/* Standard Output */}
                    {executionResult?.stdout && (
                      <div className="whitespace-pre-wrap text-slate-200 leading-relaxed font-mono">
                        {executionResult.stdout}
                      </div>
                    )}

                    {!executionResult && !isRunning && (
                      <div className="text-center py-16 text-slate-600 space-y-2 select-none">
                        <Terminal className="w-8 h-8 mx-auto opacity-30" />
                        <p>Output terminal ready. Click "Run Code" or press <kbd className="bg-slate-900 px-1 py-0.5 rounded text-slate-400">Ctrl+Enter</kbd></p>
                      </div>
                    )}
                  </div>
                )}

                {bottomTab === "stdin" && (
                  <div className="space-y-2">
                    <label className="block text-slate-400 text-xs font-sans">
                      Standard Input (passed to program during execution):
                    </label>
                    <textarea
                      value={stdinInput}
                      onChange={e => setStdinInput(e.target.value)}
                      placeholder="Enter interactive inputs here (e.g. multiple lines for input() or cin)..."
                      className="w-full h-44 bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-blue-500 font-mono resize-none text-xs"
                    />
                  </div>
                )}

                {bottomTab === "schema" && (
                  <div className="space-y-4 font-sans">
                    <div className="text-slate-400 text-xs">
                      Pre-populated relational tables available for SQL queries:
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {SAMPLE_DB_SCHEMA.map((table: TableSchemaInfo) => (
                        <div key={table.tableName} className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="font-bold text-amber-400 text-xs font-mono">{table.tableName}</div>
                          <div className="text-[11px] text-slate-400 mt-1">{table.description}</div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {table.columns.map((c: string) => (
                              <span key={c} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[10px]">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Projects Modal */}
      {isProjectsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">My Code Lab Projects</h3>
              </div>
              <button
                onClick={() => setIsProjectsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {loadingProjects ? (
                <div className="text-center py-8 text-slate-500 text-xs">Loading projects...</div>
              ) : savedProjects.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <FileCode className="w-8 h-8 mx-auto opacity-40" />
                  <p className="text-xs">No saved projects found. Click "Save" to keep your work!</p>
                </div>
              ) : (
                savedProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => handleOpenProject(proj.id)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-850 hover:border-slate-700 cursor-pointer transition group"
                  >
                    <div>
                      <div className="font-semibold text-white text-xs flex items-center gap-2">
                        <span>{proj.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-blue-400 uppercase font-mono">
                          {proj.language}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Updated {new Date(proj.updated_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100">
                      <button
                        title="Duplicate"
                        onClick={e => handleDuplicateProject(proj.id, e)}
                        className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Delete"
                        onClick={e => handleDeleteProject(proj.id, e)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
              <button
                onClick={() => {
                  setIsProjectsModalOpen(false);
                  navigate("/student/codelab");
                }}
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Scratchpad</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
