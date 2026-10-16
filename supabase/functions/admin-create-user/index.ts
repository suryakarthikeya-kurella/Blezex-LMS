
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: "Server configuration error" }, 500);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  const token = (req.headers.get("Authorization") ?? "")
    .replace(/^Bearer\s+/i, "");

  if (!token) {
    return json({ error: "Unauthenticated" }, 401);
  }

  const {
    data: { user },
    error: authError,
  } = await admin.auth.getUser(token);

  if (authError || !user) {
    return json({ error: "Unauthenticated" }, 401);
  }

  const { data: me, error: profileError } = await admin
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return json({ error: "Could not verify administrator permissions" }, 500);
  }

  if (me?.role !== "admin" || me.status !== "active") {
    return json({ error: "Forbidden" }, 403);
  }

  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: "Invalid request body" }, 400);
  }

  const { full_name, email: rawEmail, password, role } =
    body as Record<string, unknown>;
  // Supabase Auth lower-cases emails; store the same canonical form in profiles so lookups match.
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : rawEmail;

  if (role !== "student" && role !== "mentor") {
    return json({ error: "Role must be student or mentor" }, 400);
  }

  if (
    typeof full_name !== "string" ||
    !full_name.trim() ||
    full_name.trim().length > 120 ||
    typeof email !== "string" ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 72
  ) {
    return json(
      { error: "Invalid name, email or password (8–72 characters)" },
      400,
    );
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return json({ error: error?.message ?? "User creation failed" }, 400);
  }

  const { error: profileInsertError } = await admin.from("profiles").insert({
    id: data.user.id,
    full_name: full_name.trim(),
    email,
    role,
    must_change_password: true,
  });

  if (profileInsertError) {
    await admin.auth.admin.deleteUser(data.user.id);
    return json({ error: profileInsertError.message }, 400);
  }

  await admin.from("audit_logs").insert({
    actor_id: user.id,
    action: "create_user",
    entity: "profiles",
    entity_id: data.user.id,
    details: { role },
  });

  return json({ ok: true, id: data.user.id });
});
