import { supabase } from "../supabase";
import { SupportedLanguage } from "./languageRegistry";

export interface CodeFile {
  name: string;
  content: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  compile_output?: string;
  exit_code: number;
  runtime_ms: number;
  status: "success" | "error" | "timeout" | "engine_error";
  provider: "supabase_edge" | "direct_piston" | "wandbox";
}

// Map languages to Wandbox compilers
const WANDBOX_COMPILERS: Record<string, string> = {
  python: "cpython-3.12.7",
  py: "cpython-3.12.7",
  javascript: "nodejs-20.17.0",
  js: "nodejs-20.17.0",
  node: "nodejs-20.17.0",
  typescript: "typescript-5.6.2",
  ts: "typescript-5.6.2",
  cpp: "gcc-13.2.0",
  "c++": "gcc-13.2.0",
  c: "gcc-13.2.0-c",
  csharp: "mono-6.12.0.199",
  cs: "mono-6.12.0.199",
  java: "openjdk-jdk-22+36",
  go: "go-1.23.2",
  rust: "rust-1.82.0",
  rs: "rust-1.82.0",
  php: "php-8.3.12",
  ruby: "ruby-3.4.9",
  rb: "ruby-3.4.9",
  swift: "swift-6.0.1",
};

/**
 * Executes code on Wandbox open API
 */
async function executeViaWandbox(
  lang: SupportedLanguage,
  files: CodeFile[],
  stdin: string,
  startTime: number
): Promise<ExecutionResult> {
  const compiler = WANDBOX_COMPILERS[lang.id.toLowerCase()] || WANDBOX_COMPILERS[lang.monacoLanguage] || "cpython-3.12.7";
  const primaryFile = files[0] || { name: "main.txt", content: "" };
  const secondaryFiles = files.slice(1).map(f => ({ file: f.name, code: f.content }));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  let codeContent = primaryFile.content;
  if (lang.id === "java") {
    codeContent = codeContent.replace(/\bpublic\s+class\s+([A-Za-z0-9_]+)/g, "class $1");
  }

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler,
        code: codeContent,
        codes: secondaryFiles.length > 0 ? secondaryFiles : undefined,
        stdin,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const duration = Date.now() - startTime;

    if (!res.ok) {
      const err = await res.text();
      return {
        stdout: "",
        stderr: `Execution provider error (${res.status}): ${err}`,
        exit_code: 1,
        runtime_ms: duration,
        status: "engine_error",
        provider: "wandbox",
      };
    }

    const data = await res.json();
    const exitCode = parseInt(data.status, 10) || 0;
    const stdout = data.program_output || "";
    const stderr = data.program_error || data.compiler_error || "";
    const compileOutput = data.compiler_output || data.compiler_message || "";

    return {
      stdout,
      stderr,
      compile_output: compileOutput,
      exit_code: exitCode,
      runtime_ms: duration,
      status: exitCode === 0 && !stderr ? "success" : "error",
      provider: "wandbox",
    };
  } catch (err: any) {
    const isTimeout = err?.name === "AbortError";
    return {
      stdout: "",
      stderr: isTimeout ? "Execution timed out (10s limit exceeded)." : `Execution engine error: ${err.message}`,
      exit_code: 1,
      runtime_ms: Date.now() - startTime,
      status: isTimeout ? "timeout" : "error",
      provider: "wandbox",
    };
  }
}

/**
 * Execute code through the authenticated Supabase Edge Function or transparently
 * fallback to Wandbox if Piston returns 401 whitelist errors.
 */
export async function executeCode(
  lang: SupportedLanguage,
  files: CodeFile[],
  stdin: string = ""
): Promise<ExecutionResult> {
  const startTime = Date.now();
  const customPistonUrl = (import.meta as any).env?.VITE_PISTON_URL;

  // 1. If self-hosted / custom Piston URL is explicitly provided, use it
  if (customPistonUrl) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${customPistonUrl.replace(/\/+$/, "")}/api/v2/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: lang.pistonRuntime?.language || lang.id,
          version: lang.pistonRuntime?.version || "*",
          files: files.map(f => ({ name: f.name, content: f.content })),
          stdin,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      if (response.ok) {
        const json = await response.json();
        return {
          stdout: json.run?.stdout ?? json.stdout ?? "",
          stderr: json.run?.stderr ?? json.stderr ?? "",
          compile_output: json.compile?.stdout ?? json.compile?.stderr ?? "",
          exit_code: json.run?.code ?? 0,
          runtime_ms: Date.now() - startTime,
          status: (json.run?.code === 0 && !json.run?.stderr) ? "success" : "error",
          provider: "direct_piston",
        };
      }
    } catch {
      // Continue to next provider
    }
  }

  // 2. Try invoking the authenticated Supabase Edge Function
  try {
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke("code-runner", {
      body: {
        language: lang.pistonRuntime?.language || lang.id,
        version: lang.pistonRuntime?.version || "*",
        files: files.map(f => ({ name: f.name, content: f.content })),
        stdin,
        run_timeout: 5000,
      },
    });

    if (!edgeError && edgeData && !edgeData.error && edgeData.status !== "engine_error") {
      return {
        stdout: edgeData.stdout || "",
        stderr: edgeData.stderr || "",
        compile_output: edgeData.compile_output || "",
        exit_code: edgeData.exit_code ?? 0,
        runtime_ms: edgeData.runtime_ms ?? (Date.now() - startTime),
        status: edgeData.status || "success",
        provider: "supabase_edge",
      };
    }
  } catch {
    // Edge function not deployed or network issue
  }

  // 3. Try Piston API (handling the 401 whitelist gracefully)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: lang.pistonRuntime?.language || lang.id,
        version: lang.pistonRuntime?.version || "*",
        files: files.map(f => ({ name: f.name, content: f.content })),
        stdin,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const duration = Date.now() - startTime;

    if (response.ok) {
      const json = await response.json();
      return {
        stdout: json.run?.stdout ?? json.stdout ?? "",
        stderr: json.run?.stderr ?? json.stderr ?? "",
        compile_output: json.compile?.stdout ?? json.compile?.stderr ?? "",
        exit_code: json.run?.code ?? 0,
        runtime_ms: duration,
        status: (json.run?.code === 0 && !json.run?.stderr) ? "success" : "error",
        provider: "direct_piston",
      };
    }

    // If 401 (whitelist required) or server error, smoothly failover to Wandbox!
  } catch {
    // Failover to Wandbox
  }

  // 4. Robust failover to Wandbox open execution engine
  return executeViaWandbox(lang, files, stdin, startTime);
}
