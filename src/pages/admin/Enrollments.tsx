import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { fmtDay } from "../../lib/format";
import { ConfirmActionDialog, EmptyState, ErrorState, LoadingState, PageHeader, Panel, SearchBox, StatusBadge, useToast } from "../../components/admin/kit";

type Sel = { on: boolean; mentor: string; batch: string };
type Act = { kind: "paused" | "active" | "revoked" | "complete" | "revokeCert"; e: any } | null;
const VERB = { paused: "Pause", active: "Reactivate", revoked: "Revoke" } as const;
const NOTE = {
  paused: "The student keeps their history but cannot open the course or submit work until reactivated.",
  active: "The student regains access to the course.",
  revoked: "Access is removed. History is kept, and a new enrollment can be granted later.",
};

export default function Enrollments() {
  const toast = useToast();
  const [students, setStudents] = useState<any[]>([]); const [mentors, setMentors] = useState<any[]>([]); const [courses, setCourses] = useState<any[]>([]); const [batches, setBatches] = useState<any[]>([]);
  const [booting, setBooting] = useState(true); const [bootErr, setBootErr] = useState<unknown>(null);
  const [sf, setSf] = useState(""); const [sid, setSid] = useState(""); const [enr, setEnr] = useState<any[]>([]); const [enrErr, setEnrErr] = useState<unknown>(null); const [enrLoading, setEnrLoading] = useState(false);
  const [sel, setSel] = useState<Record<string, Sel>>({}); const [q, setQ] = useState("");
  const [act, setAct] = useState<Act>(null); const [elig, setElig] = useState<any>(undefined); const [eligErr, setEligErr] = useState(""); const [granting, setGranting] = useState(false);

  useEffect(() => { (async () => {
    const r = await Promise.all([
      supabase.from("profiles").select("id,full_name,email,is_alumni").eq("role", "student").order("full_name"),
      supabase.from("profiles").select("id,full_name").eq("role", "mentor").eq("status", "active"),
      supabase.from("courses").select("id,title,status,min_progress_pct,min_attendance_pct,min_assignment_avg").order("title"),
      supabase.from("batches").select("id,name,course_id")]);
    setBootErr(r.find(x => x.error)?.error ?? null);
    setStudents(r[0].data ?? []); setMentors(r[1].data ?? []); setCourses(r[2].data ?? []); setBatches(r[3].data ?? []); setBooting(false);
  })(); }, []);

  const loadEnr = useCallback(async (id: string) => {
    setEnrLoading(true);
    const r = await supabase.from("enrollments").select("*, courses(title), mentor:profiles!enrollments_mentor_id_fkey(full_name), certificates(verification_id,status)").eq("student_id", id).order("created_at", { ascending: false });
    setEnrErr(r.error); setEnr(r.data ?? []); setEnrLoading(false);
  }, []);
  useEffect(() => { setSel({}); if (sid) loadEnr(sid); else setEnr([]); }, [sid, loadEnr]);

  // Eligibility is read (existing RPC) when the certify dialog opens.
  useEffect(() => {
    if (act?.kind !== "complete") return; let live = true; setElig(undefined); setEligErr("");
    supabase.rpc("enrollment_eligibility", { eid: act.e.id }).then(({ data, error }) => { if (!live) return; if (error) setEligErr(error.message); else setElig(data?.[0] ?? null); });
    return () => { live = false; };
  }, [act]);

  const student = students.find(s => s.id === sid);
  const shownStudents = students.filter(s => (s.full_name + s.email).toLowerCase().includes(sf.trim().toLowerCase()));
  const liveCourses = useMemo(() => new Set(enr.filter(e => e.status === "active" || e.status === "paused").map(e => e.course_id)), [enr]);
  const shownCourses = courses.filter(c => c.title.toLowerCase().includes(q.trim().toLowerCase()));
  const picked = courses.filter(c => sel[c.id]?.on);
  const nameOf = (list: any[], id: string, key = "full_name") => list.find(x => x.id === id)?.[key];
  const upd = (cid: string, p: Partial<Sel>) => setSel(s => ({ ...s, [cid]: { ...({ on: false, mentor: "", batch: "" } as Sel), ...s[cid], ...p } }));

  const grant = async (): Promise<string | null> => {
    const rows = picked.map(c => ({ student_id: sid, course_id: c.id, mentor_id: sel[c.id].mentor || null, batch_id: sel[c.id].batch || null, status: "active" }));
    setGranting(true); const { error } = await supabase.from("enrollments").insert(rows); setGranting(false);
    if (error) return error.message.includes("duplicate") ? "The student already has an active or paused enrollment in one of these courses." : error.message;
    toast("ok", `Granted ${rows.length} course${rows.length === 1 ? "" : "s"} to ${student?.full_name}.`); setSel({}); loadEnr(sid); return null;
  };
  const reassign = async (e: any, patch: any) => {
    const { error } = await supabase.from("enrollments").update(patch).eq("id", e.id);
    toast(error ? "err" : "ok", error ? error.message : "Enrollment updated."); loadEnr(sid);
  };
  const confirmAct = async (): Promise<string | null> => {
    if (!act) return null; const { kind, e } = act;
    if (kind === "paused" || kind === "active" || kind === "revoked") {
      const { error } = await supabase.from("enrollments").update({ status: kind }).eq("id", e.id);
      if (error) return error.message; toast("ok", `${e.courses.title}: ${kind === "paused" ? "paused" : kind === "active" ? "reactivated" : "revoked"}.`);
    } else if (kind === "revokeCert") {
      const { error } = await supabase.from("certificates").update({ status: "revoked" }).eq("enrollment_id", e.id);
      if (error) return error.message; toast("ok", "Certificate revoked.");
    } else {
      const c = await supabase.from("certificates").insert({ enrollment_id: e.id }); if (c.error) return c.error.message;
      const u = await supabase.from("enrollments").update({ status: "completed" }).eq("id", e.id);
      if (u.error) { loadEnr(sid); return `The certificate was issued, but marking the enrollment completed failed: ${u.error.message}`; }
      toast("ok", "Completed and certificate issued.");
    }
    loadEnr(sid); return null;
  };

  const cert = (e: any) => e.certificates?.[0];
  return <>
    <PageHeader title="Course Access" description="Access is never automatic. Choose a student, review what they already have, then grant courses with an optional mentor and batch." />
    {bootErr ? <ErrorState error={bootErr} /> : booting ? <LoadingState /> : <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
      <div className="space-y-6 min-w-0">
        <Panel title="1 · Select a student">
          <div className="flex flex-wrap gap-2"><SearchBox label="Filter students" placeholder="Filter by name or email…" value={sf} onChange={setSf} />
            <select aria-label="Student" className="inp flex-1 min-w-[220px]" value={sid} onChange={e => setSid(e.target.value)}><option value="">Select student… ({shownStudents.length})</option>{shownStudents.map(s => <option key={s.id} value={s.id}>{s.full_name} ({s.email})</option>)}</select></div>
          {!students.length && <p className="text-sm text-muted mt-3">No students exist yet. <Link to="/admin/people" className="text-brand font-bold hover:underline">Create one in People</Link>.</p>}
          {student && <div className="mt-4 flex items-center gap-3 rounded-xl bg-paper p-3"><span className="w-10 h-10 rounded-full bg-brand text-white grid place-items-center font-bold">{student.full_name.charAt(0).toUpperCase()}</span>
            <div className="min-w-0 flex-1"><p className="font-bold text-ink truncate">{student.full_name}{student.is_alumni && " 🎓"}</p><p className="text-xs text-muted truncate">{student.email}</p></div>
            <div className="text-right text-xs text-muted">{enr.filter(e => e.status === "active").length} active · {enr.length} total</div></div>}
        </Panel>

        {sid && <Panel title="Existing enrollments">
          {enrErr ? <ErrorState error={enrErr} /> : enrLoading && !enr.length ? <LoadingState /> : !enr.length ? <EmptyState title="No enrollments yet." hint="Use the course list below to grant the first one." /> :
            <div className={`overflow-x-auto -mx-5 ${enrLoading ? "opacity-60" : ""}`}><table className="w-full text-sm min-w-[720px]">
              <thead><tr className="text-left text-xs uppercase tracking-wide text-muted bg-paper"><th className="px-5 py-2 font-medium">Course</th><th className="px-2 font-medium">Status</th><th className="px-2 font-medium">Mentor</th><th className="px-2 font-medium">Batch</th><th className="px-5 text-right font-medium">Actions</th></tr></thead>
              <tbody>{enr.map(e => { const locked = e.status === "revoked"; return <tr key={e.id} className="border-t border-hairline align-top">
                <td className="px-5 py-3"><p className="font-medium text-ink">{e.courses.title}</p><p className="text-xs text-muted">Granted {fmtDay(e.created_at)}</p>
                  {cert(e) && <p className="text-xs mt-1">🎓 <Link className="underline" to={`/verify/${cert(e).verification_id}`}>{cert(e).verification_id}</Link> <StatusBadge value={cert(e).status} /></p>}</td>
                <td className="px-2 py-3"><StatusBadge value={e.status} /></td>
                <td className="px-2 py-2"><select aria-label={`Mentor for ${e.courses.title}`} className="inp min-w-[150px]" value={e.mentor_id ?? ""} disabled={locked} onChange={ev => reassign(e, { mentor_id: ev.target.value || null })}><option value="">No mentor</option>{mentors.map(m => <option key={m.id} value={m.id}>{m.full_name}</option>)}</select></td>
                <td className="px-2 py-2"><select aria-label={`Batch for ${e.courses.title}`} className="inp min-w-[130px]" value={e.batch_id ?? ""} disabled={locked} onChange={ev => reassign(e, { batch_id: ev.target.value || null })}><option value="">No batch</option>{batches.filter(b => b.course_id === e.course_id).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></td>
                <td className="px-5 py-3"><div className="flex flex-wrap gap-1 justify-end">
                  {e.status === "active" && <button className="btn-ghost" onClick={() => setAct({ kind: "paused", e })}>Pause</button>}
                  {e.status !== "active" && !locked && <button className="btn-ghost" onClick={() => setAct({ kind: "active", e })}>Reactivate</button>}
                  {!locked && <button className="btn-ghost" onClick={() => setAct({ kind: "revoked", e })}>Revoke</button>}
                  {!locked && e.status !== "completed" && !e.certificates?.length && <button className="btn-ghost !bg-ink !text-white hover:!bg-brand hover:!border-brand" onClick={() => setAct({ kind: "complete", e })}>Complete + certify</button>}
                  {cert(e)?.status === "issued" && <button className="btn-ghost" onClick={() => setAct({ kind: "revokeCert", e })}>Revoke cert</button>}</div></td></tr>; })}</tbody></table></div>}
        </Panel>}

        {sid && <Panel title="2 · Choose courses" aside={<span className="text-xs text-muted">{picked.length} selected</span>}>
          <div className="mb-3"><SearchBox label="Search catalog" placeholder="Search the catalog…" value={q} onChange={setQ} /></div>
          {!shownCourses.length ? <EmptyState title={courses.length ? "No courses match your search." : "The catalog is empty."} /> : <ul className="divide-y divide-hairline">{shownCourses.map(c => { const has = liveCourses.has(c.id); const s = sel[c.id];
            return <li key={c.id} className="py-3 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 items-center">
              <label className={`flex gap-2 items-center font-medium ${has ? "opacity-60" : ""}`}><input type="checkbox" className="accent-[#FF4D1C]" disabled={has} checked={!!s?.on} onChange={e => upd(c.id, { on: e.target.checked })} />
                <span className="min-w-0"><span className="block truncate text-ink">{c.title}</span>{has ? <span className="text-xs text-muted font-normal">Already enrolled</span> : c.status !== "published" && <span className="text-xs text-amber-700 font-normal">Draft: students can’t open it until published</span>}</span></label>
              {s?.on && <><select aria-label={`Mentor for ${c.title}`} className="inp" value={s.mentor} onChange={e => upd(c.id, { mentor: e.target.value })}><option value="">Mentor (optional)</option>{mentors.map(m => <option key={m.id} value={m.id}>{m.full_name}</option>)}</select>
                <select aria-label={`Batch for ${c.title}`} className="inp" value={s.batch} onChange={e => upd(c.id, { batch: e.target.value })}><option value="">Batch (optional)</option>{batches.filter(b => b.course_id === c.id).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></>}</li>; })}</ul>}
        </Panel>}
        {!sid && <div className="bg-white border border-hairline rounded-[20px]"><EmptyState title="No student selected" hint="Pick a student above to see their enrollments and grant new courses." /></div>}
      </div>

      <aside className="lg:sticky lg:top-24"><Panel title="3 · Review & grant">
        {!sid ? <p className="text-sm text-muted">Select a student to begin.</p> : !picked.length ? <p className="text-sm text-muted">Tick one or more courses to build the access grant.</p> : <>
          <p className="text-sm mb-3">Granting to <b className="text-ink">{student?.full_name}</b></p>
          <ul className="space-y-2 mb-4">{picked.map(c => <li key={c.id} className="rounded-xl bg-paper px-3 py-2 text-sm"><p className="font-medium text-ink">{c.title}</p>
            <p className="text-xs text-muted">Mentor: {nameOf(mentors, sel[c.id].mentor) ?? "none"} · Batch: {nameOf(batches, sel[c.id].batch, "name") ?? "none"}</p></li>)}</ul>
          <GrantButton count={picked.length} onGrant={grant} busy={granting} name={student?.full_name} summary={picked.map(c => c.title)} /></>}
      </Panel></aside>
    </div>}

    <ConfirmActionDialog open={!!act} onClose={() => setAct(null)} onConfirm={confirmAct}
      danger={act?.kind === "revoked" || act?.kind === "revokeCert"} disabled={act?.kind === "complete" && !elig?.eligible}
      title={act?.kind === "complete" ? "Complete and certify?" : act?.kind === "revokeCert" ? "Revoke certificate?" : act ? `${VERB[act.kind]} enrollment?` : ""}
      confirmLabel={act?.kind === "complete" ? "Complete + certify" : act?.kind === "revokeCert" ? "Revoke certificate" : act ? VERB[act.kind] : ""}>
      {act && <><p><b>{student?.full_name}</b> · {act.e.courses.title}</p>
        {act.kind === "revokeCert" ? <p className="text-muted">The public verification page will show this certificate as REVOKED.</p> : act.kind === "complete" ? <Eligibility elig={elig} err={eligErr} course={courses.find(c => c.id === act.e.course_id)} /> : <p className="text-muted">{NOTE[act.kind]}</p>}</>}
    </ConfirmActionDialog>
  </>;
}

function GrantButton({ count, onGrant, busy, name, summary }: { count: number; onGrant: () => Promise<string | null>; busy: boolean; name?: string; summary: string[] }) {
  const [open, setOpen] = useState(false);
  return <><button className="btn w-full" disabled={busy} onClick={() => setOpen(true)}>Grant {count} course{count === 1 ? "" : "s"}</button>
    <ConfirmActionDialog open={open} onClose={() => setOpen(false)} onConfirm={onGrant} title="Grant course access?" confirmLabel="Grant access">
      <p>{name} will get <b>active</b> access to:</p><ul className="list-disc pl-5">{summary.map(t => <li key={t}>{t}</li>)}</ul><p className="text-muted">The student, and any assigned mentor, are notified.</p></ConfirmActionDialog></>;
}

function Eligibility({ elig, err, course }: { elig: any; err: string; course?: any }) {
  if (err) return <p role="alert" className="text-red-600">Could not check eligibility: {err}</p>;
  if (elig === undefined) return <LoadingState label="Checking completion rules…" />;
  if (!elig) return <p role="alert" className="text-red-600">No eligibility data was returned for this enrollment.</p>;
  const rows: [string, string, string][] = [
    ["Lesson progress", `${elig.progress_pct}%`, `≥ ${course?.min_progress_pct ?? "?"}%`],
    ["Attendance", `${elig.attendance_pct}%`, `≥ ${course?.min_attendance_pct ?? "?"}%`],
    ["Assignments graded", `${elig.assignments_graded} / ${elig.assignments_total}`, "all graded"],
    ["Assignment average", `${elig.assignment_avg}`, `≥ ${course?.min_assignment_avg ?? "?"}`]];
  return <><table className="w-full text-sm"><tbody>{rows.map(r => <tr key={r[0]} className="border-t border-hairline"><td className="py-1.5">{r[0]}</td><td className="font-bold text-ink">{r[1]}</td><td className="text-muted text-right">{r[2]}</td></tr>)}</tbody></table>
    {elig.eligible ? <p className="text-green-700 font-medium">Meets all completion rules. A certificate will be issued and the enrollment marked completed.</p>
      : <p role="alert" className="text-red-600 font-medium">Not eligible yet. Adjust the course rules in the course editor or wait for the work to be completed.</p>}</>;
}
