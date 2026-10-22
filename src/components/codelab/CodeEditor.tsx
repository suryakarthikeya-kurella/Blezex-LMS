import React, { useState, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import {
  FileCode,
  Plus,
  X,
  Play,
  Save,
  Moon,
  Sun,
  Settings,
  Sparkles,
  Check,
  FileText,
  Database
} from "lucide-react";
import { CodeFile } from "../../lib/codelab/executionService";
import { SupportedLanguage } from "../../lib/codelab/languageRegistry";

interface CodeEditorProps {
  files: CodeFile[];
  activeFileName: string;
  onSelectFile: (fileName: string) => void;
  onChangeContent: (fileName: string, newContent: string) => void;
  onAddFile?: (fileName: string) => void;
  onDeleteFile?: (fileName: string) => void;
  onRenameFile?: (oldName: string, newName: string) => void;
  onRun?: () => void;
  onSave?: () => void;
  isRunning?: boolean;
  isSaving?: boolean;
  languageConfig?: SupportedLanguage;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  files,
  activeFileName,
  onSelectFile,
  onChangeContent,
  onAddFile,
  onDeleteFile,
  onRun,
  onSave,
  isRunning = false,
  isSaving = false,
  languageConfig,
  readOnly = false,
}) => {
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [fontSize, setFontSize] = useState<number>(14);
  const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
  const [showSettings, setShowSettings] = useState(false);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [newFileNameInput, setNewFileNameInput] = useState("");

  const activeFile = files.find(f => f.name === activeFileName) || files[0];

  // Derive monaco language from file extension or active language
  const getMonacoLanguage = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "py":
        return "python";
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "html":
        return "html";
      case "css":
        return "css";
      case "sql":
        return "sql";
      case "java":
        return "java";
      case "cpp":
      case "cc":
      case "h":
        return "cpp";
      case "c":
        return "c";
      case "cs":
        return "csharp";
      case "go":
        return "go";
      case "rs":
        return "rust";
      case "php":
        return "php";
      case "rb":
        return "ruby";
      case "kt":
        return "kotlin";
      case "swift":
        return "swift";
      case "r":
        return "r";
      case "json":
        return "json";
      case "md":
        return "markdown";
      default:
        return languageConfig?.monacoLanguage || "plaintext";
    }
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (onRun && !isRunning) {
        onRun();
      }
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (onSave) {
        onSave();
      }
    });
  };

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newFileNameInput.trim();
    if (!trimmed) return;
    if (files.some(f => f.name.toLowerCase() === trimmed.toLowerCase())) {
      alert("A file with this name already exists.");
      return;
    }
    if (onAddFile) {
      onAddFile(trimmed);
      onSelectFile(trimmed);
    }
    setNewFileNameInput("");
    setIsNewFileModalOpen(false);
  };

  // Get appropriate tab icon
  const getFileIcon = (name: string) => {
    if (name.endsWith(".sql")) return <Database className="w-3.5 h-3.5 text-amber-400" />;
    if (name.endsWith(".html")) return <FileCode className="w-3.5 h-3.5 text-orange-400" />;
    if (name.endsWith(".css")) return <FileCode className="w-3.5 h-3.5 text-sky-400" />;
    if (name.endsWith(".js") || name.endsWith(".ts")) return <FileCode className="w-3.5 h-3.5 text-yellow-400" />;
    if (name.endsWith(".py")) return <FileCode className="w-3.5 h-3.5 text-blue-400" />;
    return <FileText className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-b border-slate-800 text-xs">
        {/* Tabs Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-[65%] no-scrollbar">
          {files.map(file => {
            const isActive = file.name === activeFile?.name;
            return (
              <div
                key={file.name}
                onClick={() => onSelectFile(file.name)}
                className={`group flex items-center space-x-1.5 px-3 py-1.5 rounded-t-md text-xs font-mono transition cursor-pointer select-none border-t-2 ${
                  isActive
                    ? "bg-slate-900 text-blue-400 border-blue-500 font-medium"
                    : "bg-slate-950/60 text-slate-400 border-transparent hover:bg-slate-900/60 hover:text-slate-300"
                }`}
              >
                {getFileIcon(file.name)}
                <span className="truncate max-w-[120px]">{file.name}</span>
                {files.length > 1 && onDeleteFile && !readOnly && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteFile(file.name);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-400 ml-1 p-0.5 rounded transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          {onAddFile && !readOnly && (
            <button
              onClick={() => setIsNewFileModalOpen(true)}
              className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
              title="Add File"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Action Tools: Run, Save, Theme, Font, Shortcuts */}
        <div className="flex items-center space-x-2">
          {/* Run Button */}
          {onRun && (
            <button
              onClick={onRun}
              disabled={isRunning}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md font-medium text-xs shadow-sm transition ${
                isRunning
                  ? "bg-emerald-600/50 text-emerald-200 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
              title="Run Code (Ctrl + Enter)"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "Running..." : "Run"}</span>
            </button>
          )}

          {/* Save Button */}
          {onSave && (
            <button
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Save Project (Ctrl + S)"
            >
              {isSaving ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? "Saved" : "Save"}</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(t => (t === "vs-dark" ? "light" : "vs-dark"))}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
            title={`Switch to ${theme === "vs-dark" ? "Light" : "Dark"} theme`}
          >
            {theme === "vs-dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Settings Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
              title="Editor Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-3 z-50 text-slate-300 text-xs space-y-3">
                <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1">Editor Settings</div>
                
                <div>
                  <label className="block text-slate-400 mb-1">Font Size</label>
                  <select
                    value={fontSize}
                    onChange={e => setFontSize(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                  >
                    <option value={12}>12 px</option>
                    <option value={14}>14 px (Default)</option>
                    <option value={16}>16 px</option>
                    <option value={18}>18 px</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Word Wrap</label>
                  <select
                    value={wordWrap}
                    onChange={e => setWordWrap(e.target.value as "on" | "off")}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                  >
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>

                <div className="pt-1 text-[11px] text-slate-400">
                  <div><kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px]">Ctrl+Enter</kbd> Run</div>
                  <div className="mt-1"><kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px]">Ctrl+S</kbd> Save</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="flex-1 relative overflow-hidden bg-slate-900">
        {activeFile ? (
          <Editor
            height="100%"
            theme={theme}
            language={getMonacoLanguage(activeFile.name)}
            value={activeFile.content}
            onChange={val => onChangeContent(activeFile.name, val || "")}
            onMount={handleEditorMount}
            options={{
              fontSize,
              wordWrap,
              readOnly,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              formatOnPaste: true,
              fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
              fontLigatures: true,
              suggestOnTriggerCharacters: true,
              lineNumbersMinChars: 3,
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <Sparkles className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No file selected</p>
          </div>
        )}
      </div>

      {/* Modal for adding a new file */}
      {isNewFileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 w-full max-w-sm shadow-2xl">
            <h3 className="text-sm font-semibold text-white mb-2">New Project File</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter file name with extension (e.g. <code className="text-blue-400">helper.py</code>, <code className="text-blue-400">utils.js</code>, <code className="text-blue-400">style.css</code>)
            </p>
            <form onSubmit={handleCreateFile}>
              <input
                type="text"
                autoFocus
                placeholder="filename.ext"
                value={newFileNameInput}
                onChange={e => setNewFileNameInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-4 font-mono"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewFileModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newFileNameInput.trim()}
                  className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition disabled:opacity-50"
                >
                  Create File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
