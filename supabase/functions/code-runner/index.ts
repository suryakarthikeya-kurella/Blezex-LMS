import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// In-memory rate limiting map for edge function instance
// Max 25 executions per minute per user
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 25;

  const userRecord = rateLimits.get(userId);
  if (!userRecord || now > userRecord.resetAt) {
    rateLimits.set(userId, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (userRecord.count >= maxRequests) {
    return true;
  }

  userRecord.count += 1;
  return false;
}

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

async function runWandbox(language: string, files: any[], stdin: string, startTime: number) {
  const compiler = WANDBOX_COMPILERS[language.toLowerCase()] || "cpython-3.12.7";
  const primaryFile = files[0] || { content: "" };
  const secondaryFiles = files.slice(1).map(f => ({ file: f.name, code: f.content }));

  let codeContent = primaryFile.content;
  if (language.toLowerCase().includes("java")) {
    codeContent = codeContent.replace(/\bpublic\s+class\s+([A-Za-z0-9_]+)/g, "class $1");
  }

  const res = await fetch("https://wandbox.org/api/compile.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      compiler,
      code: codeContent,
      codes: secondaryFiles.length > 0 ? secondaryFiles : undefined,
      stdin,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return jsonResponse({ error: `Wandbox error (${res.status}): ${errText}`, status: "engine_error" }, 502);
  }

  const data = await res.json();
  const exitCode = parseInt(data.status, 10) || 0;

  return jsonResponse({
    language,
    version: compiler,
    stdout: data.program_output || "",
    stderr: data.program_error || data.compiler_error || "",
    compile_output: data.compiler_output || data.compiler_message || "",
    exit_code: exitCode,
    runtime_ms: Date.now() - startTime,
    status: exitCode === 0 ? "success" : "error",
    provider: "wandbox",
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const pistonApiEndpoint = Deno.env.get("PISTON_API_URL") || "https://emkc.org/api/v2/piston/execute";
  const pistonApiKey = Deno.env.get("PISTON_API_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Server configuration error: missing Supabase credentials" }, 500);
  }

  // 1. Authenticate calling student or admin
  const authClient = createClient(supabaseUrl, serviceRoleKey);
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");

  if (!token) {
    return jsonResponse({ error: "Unauthenticated request" }, 401);
  }

  const { data: { user }, error: authError } = await authClient.auth.getUser(token);
  if (authError || !user) {
    return jsonResponse({ error: "Invalid authentication credentials" }, 401);
  }

  // 2. Enforce active profile check
  const { data: profile } = await authClient
    .from("profiles")
    .select("status, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.status !== "active") {
    return jsonResponse({ error: "Account is suspended or inactive" }, 403);
  }

  // 3. Enforce rate limiting
  if (isRateLimited(user.id)) {
    return jsonResponse(
      { error: "Rate limit reached. Please wait a moment before running more code." },
      429
    );
  }

  // 4. Validate payload
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return jsonResponse({ error: "Invalid request payload" }, 400);
  }

  const { language, version = "*", files, stdin = "", run_timeout = 5000 } = body;

  if (!language || typeof language !== "string") {
    return jsonResponse({ error: "Language is required" }, 400);
  }

  if (!Array.isArray(files) || files.length === 0) {
    return jsonResponse({ error: "At least one file is required" }, 400);
  }

  // Safety checks on file content length (max 100KB total)
  const totalLength = files.reduce((acc, f) => acc + (f?.content?.length || 0), 0);
  if (totalLength > 100_000) {
    return jsonResponse({ error: "Payload exceeds 100KB limit" }, 400);
  }

  // 5. Proxy to execution service with Wandbox failover
  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8_000);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (pistonApiKey) {
      headers["Authorization"] = pistonApiKey;
    }

    const pistonResponse = await fetch(pistonApiEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        language,
        version,
        files,
        stdin: typeof stdin === "string" ? stdin : "",
        run_timeout: Math.min(Number(run_timeout) || 5000, 10000),
      }),
      signal: controller.signal,
    }).catch(() => null);

    clearTimeout(timeoutId);
    const executionDuration = Date.now() - startTime;

    // If Piston succeeded
    if (pistonResponse && pistonResponse.ok) {
      const result = await pistonResponse.json();
      return jsonResponse({
        language: result.language,
        version: result.version,
        stdout: result.run?.stdout ?? result.stdout ?? "",
        stderr: result.run?.stderr ?? result.stderr ?? "",
        compile_output: result.compile?.stdout ?? result.compile?.stderr ?? "",
        exit_code: result.run?.code ?? 0,
        runtime_ms: executionDuration,
        status: "success",
        provider: "piston",
      });
    }

    // If Piston returned 401 (whitelist required) or failed: smoothly failover to Wandbox!
    return await runWandbox(language, files, typeof stdin === "string" ? stdin : "", startTime);
  } catch (err: any) {
    // Wandbox failover on any network error
    try {
      return await runWandbox(language, files, typeof stdin === "string" ? stdin : "", startTime);
    } catch {
      return jsonResponse(
        {
          error: `Execution engine error: ${err.message}`,
          status: "engine_error",
        },
        504
      );
    }
  }
});
