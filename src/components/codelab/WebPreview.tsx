import React, { useEffect, useRef, useState, useMemo } from "react";
import { Monitor, Tablet, Smartphone, RotateCw, Terminal, Eye, AlertCircle } from "lucide-react";
import { CodeFile } from "../../lib/codelab/executionService";

interface WebPreviewProps {
  files: CodeFile[];
  onConsoleMessage?: (level: "log" | "warn" | "error" | "info", args: string[]) => void;
}

interface ConsoleEntry {
  id: string;
  level: "log" | "warn" | "error" | "info";
  message: string;
  time: string;
}

export const WebPreview: React.FC<WebPreviewProps> = ({ files, onConsoleMessage }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"preview" | "console">("preview");
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const [key, setKey] = useState(0);

  // Extract HTML, CSS, JS
  const htmlContent = files.find(f => f.name.endsWith(".html"))?.content || "<div style='font-family:sans-serif;padding:2rem;'><h1>No index.html file found</h1></div>";
  const cssContent = files.find(f => f.name.endsWith(".css"))?.content || "";
  const jsContent = files.find(f => f.name.endsWith(".js") && !f.name.endsWith(".json"))?.content || "";

  // Assemble full document with console interceptor
  const assembledDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlezeX Web Playground</title>
  <style>
    ${cssContent}
  </style>
  <script>
    (function() {
      function send(level, args) {
        try {
          const stringified = Array.from(args).map(arg => {
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg); } catch(e) { return String(arg); }
            }
            return String(arg);
          });
          window.parent.postMessage({
            type: 'blezex_preview_console',
            level: level,
            message: stringified.join(' ')
          }, '*');
        } catch(e) {}
      }
      
      const origLog = console.log;
      const origWarn = console.warn;
      const origError = console.error;
      const origInfo = console.info;

      console.log = function() { send('log', arguments); origLog.apply(console, arguments); };
      console.warn = function() { send('warn', arguments); origWarn.apply(console, arguments); };
      console.error = function() { send('error', arguments); origError.apply(console, arguments); };
      console.info = function() { send('info', arguments); origInfo.apply(console, arguments); };

      window.onerror = function(msg, url, line) {
        send('error', ['[Runtime Error Line ' + line + ']: ' + msg]);
        return false;
      };
    })();
  </script>
</head>
<body>
  ${htmlContent}
  <script>
    try {
      ${jsContent}
    } catch (err) {
      console.error(err.message);
    }
  </script>
</body>
</html>`;
  }, [htmlContent, cssContent, jsContent]);

  // Listen to iframe console messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "blezex_preview_console") {
        const { level, message } = event.data;
        const entry: ConsoleEntry = {
          id: Math.random().toString(36).substring(2, 9),
          level,
          message,
          time: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        };
        setConsoleLogs(prev => [...prev.slice(-150), entry]);
        if (onConsoleMessage) {
          onConsoleMessage(level, [message]);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onConsoleMessage]);

  const refreshPreview = () => {
    setKey(k => k + 1);
  };

  const clearConsole = () => {
    setConsoleLogs([]);
  };

  const getContainerWidth = () => {
    switch (deviceView) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 select-none">
      {/* Top Preview Controls Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-300">
        {/* Tab Toggle: Preview / Console */}
        <div className="flex items-center space-x-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-medium transition ${
              activeTab === "preview"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setActiveTab("console")}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-medium transition relative ${
              activeTab === "console"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
            {consoleLogs.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {consoleLogs.length}
              </span>
            )}
          </button>
        </div>

        {/* Viewport switchers (only visible when in preview mode) */}
        {activeTab === "preview" && (
          <div className="flex items-center space-x-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              title="Desktop View"
              onClick={() => setDeviceView("desktop")}
              className={`p-1.5 rounded transition ${
                deviceView === "desktop" ? "bg-slate-800 text-blue-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              title="Tablet View (768px)"
              onClick={() => setDeviceView("tablet")}
              className={`p-1.5 rounded transition ${
                deviceView === "tablet" ? "bg-slate-800 text-blue-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              title="Mobile View (375px)"
              onClick={() => setDeviceView("mobile")}
              className={`p-1.5 rounded transition ${
                deviceView === "mobile" ? "bg-slate-800 text-blue-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {activeTab === "console" && (
            <button
              onClick={clearConsole}
              className="text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 transition"
            >
              Clear
            </button>
          )}
          <button
            title="Reload Preview"
            onClick={refreshPreview}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-auto bg-slate-950 flex justify-center items-stretch p-1">
        {activeTab === "preview" ? (
          <div
            style={{ width: getContainerWidth() }}
            className="h-full transition-all duration-300 bg-white rounded shadow-md overflow-hidden"
          >
            <iframe
              key={key}
              ref={iframeRef}
              srcDoc={assembledDoc}
              title="BlezeX Web Preview"
              sandbox="allow-scripts allow-modals allow-forms"
              className="w-full h-full border-0 bg-white"
            />
          </div>
        ) : (
          <div className="w-full h-full p-3 font-mono text-xs overflow-y-auto space-y-1">
            {consoleLogs.length === 0 ? (
              <div className="text-slate-500 italic py-8 text-center">
                No console messages yet. Use <code className="text-blue-400">console.log(...)</code> in your JavaScript file.
              </div>
            ) : (
              consoleLogs.map(log => (
                <div
                  key={log.id}
                  className={`flex items-start space-x-2 p-1.5 rounded ${
                    log.level === "error"
                      ? "bg-red-950/40 text-red-300 border-l-2 border-red-500"
                      : log.level === "warn"
                      ? "bg-amber-950/40 text-amber-300 border-l-2 border-amber-500"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  <span className="text-slate-500 text-[10px] select-none pt-0.5">{log.time}</span>
                  {log.level === "error" && <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />}
                  <span className="whitespace-pre-wrap break-all flex-1">{log.message}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
