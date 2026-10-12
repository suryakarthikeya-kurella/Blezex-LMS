import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Card, Title, Msg, Empty } from "../../components/ui";
type Sel = { on: boolean; mentor: string; batch: string };
export default function Enrollments() {
  const [students, setStudents] = useState<any[]>([]); const [mentors, setMentors] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]); const [batches, setBatches] = useState<any[]>([]);
  const [sid, setSid] = useState(""); const [enr, setEnr] = useState<any[]>([]); const [sel, setSel] = useState<Record<string, Sel>>({});
  const [q, setQ] = useState(""); const [msg, setMsg] = useState("");
  useEffect(() => { (async () => {
    setStudents((await supabase.from("profiles").select("id,full_name,email").eq("role", "student").order("full_name")).data ?? []);
    setMentors((await supabase.from("profiles").select("id,full_name").eq("role", "mentor").eq("status", "active")).data ?? []);
    setCourses((await supabase.from("courses").select("id,title").order("title")).data ?? []);
    setBatches((await supabase.from("batches").select("id,name,course_id")).data ?? []);
  })(); }, []);
  const loadEnr = async (id: string) => setEnr((await supabase.from("enrollments").select("*, courses(title), mentor:profiles!enrollments_mentor_id_fkey(full_name), certificates(verification_id,status)").eq("student_id", id).order("created_at", { ascending: false })).data ?? []);
  useEffect(() => { if (sid) loadEnr(sid); else setEnr([]); setSel({}); }, [sid]);
  const upd = (cid: string, p: Partial<Sel>) => setSel(s => ({ ...s, [cid]: { ...({ on: false, mentor: "", batch: "" } as Sel), ...s[cid], ...p } }));
  const grant = async () => {
    const rows = Object.entries(sel).filter(([, v]) => v.on).map(([cid, v]) => ({ student_id: sid, course_id: cid, mentor_id: v.mentor || null, batch_id: v.batch || null, status: "active" }));
    if (!rows.length) return setMsg("Select at least one course.");
    const { error } = await supabase.from("enrollments").insert(rows);
    setMsg(error ? (error.message.includes("duplicate") ? "Student already has an active/paused enrollment in one of these courses." : error.message) : `Granted ${rows.length} course(s).`);
    setSel({}); loadEnr(sid);
  };
  const setStatus = async (e: any, status: string) => {
    if (!confirm(`Set "${e.courses.title}" to ${status}?`)) return;
    const { error } = await supabase.from("enrollments").update({ status }).eq("id", e.id); setMsg(error?.message ?? "Updated."); loadEnr(sid);
  };
  
  const complete = async (e: any) => {
    const { data } = await supabase.rpc("enrollment_eligibility", { eid: e.id }); const r = data?.[0];
    if (!r?.eligible) return setMsg(`Not eligible: progress ${r?.progress_pct ?? 0}%, attendance ${r?.attendance_pct ?? 0}%, assignments graded ${r?.assignments_graded ?? 0}/${r?.assignments_total ?? 0}, avg ${r?.assignment_avg ?? 0}. Adjust the course rules or complete the work.`);
    if (!confirm("Mark completed and issue certificate?")) return;
    const c = await supabase.from("certificates").insert({ enrollment_id: e.id }); if (c.error) return setMsg(c.error.message);
    const u = await supabase.from("enrollments").update({ status: "completed" }).eq("id", e.id); setMsg(u.error?.message ?? "Completed and certificate issued."); loadEnr(sid);
  };
  const reassign = async (e: any, patch: any) => { const { error } = await supabase.from("enrollments").update(patch).eq("id", e.id); setMsg(error?.message ?? "Updated."); loadEnr(sid); };
  const revokeCert = async (e: any) => { const { error } = await supabase.from("certificates").update({ status: "revoked" }).eq("enrollment_id", e.id); setMsg(error?.message ?? "Certificate revoked."); loadEnr(sid); };
  const shown = courses.filter(c => c.title.toLowerCase().includes(q.toLowerCase()));
  return <><Title note="access is never automatic">Course Access</Title><Msg m={msg} />
    <select className="inp max-w-sm mb-4" value={sid} onChange={e => setSid(e.target.value)}><option value="">Select student…</option>{students.map(s => <option key={s.id} value={s.id}>{s.full_name} ({s.email})</option>)}</select>
    {sid && <>
      <Card className="mb-6"><h2 className="font-bold mb-2">Existing enrollments</h2>
        {!enr.length ? <Empty t="No enrollments yet." /> : <table className="w-full text-sm"><tbody>{enr.map(e => <tr key={e.id} className="border-t border-hairline">
          <td className="py-2 font-medium">{e.courses.title}</td><td>{e.status}</td><td><select aria-label="Mentor" className="inp" value={e.mentor_id ?? ""} disabled={e.status === "revoked"} onChange={ev => reassign(e, { mentor_id: ev.target.value || null })}><option value="">no mentor</option>{mentors.map(m => <option key={m.id} value={m.id}>{m.full_name}</option>)}</select></td>
          <td><select aria-label="Batch" className="inp" value={e.batch_id ?? ""} disabled={e.status === "revoked"} onChange={ev => reassign(e, { batch_id: ev.target.value || null })}><option value="">no batch</option>{batches.filter(b => b.course_id === e.course_id).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></td>
          <td className="space-x-1">
            {e.status === "active" && <button className="btn-ghost" onClick={() => setStatus(e, "paused")}>Pause</button>}
            {e.status !== "active" && e.status !== "revoked" && <button className="btn-ghost" onClick={() => setStatus(e, "active")}>Reactivate</button>}
            {e.status !== "revoked" && <button className="btn-ghost" onClick={() => setStatus(e, "revoked")}>Revoke</button>}
            {e.status !== "revoked" && e.status !== "completed" && !e.certificates?.length && <button className="btn-ghost" onClick={() => complete(e)}>Complete + certify</button>}
            {e.certificates?.[0]?.status === "issued" && <button className="btn-ghost" onClick={() => revokeCert(e)}>Revoke cert</button>}</td></tr>)}</tbody></table>}</Card>
      <Card><h2 className="font-bold mb-2">Grant course access</h2>
        <input className="inp max-w-xs mb-3" placeholder="Search catalog…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="space-y-2">{shown.map(c => <div key={c.id} className="grid md:grid-cols-4 gap-2 items-center border-t border-hairline pt-2">
          <label className="flex gap-2 items-center font-medium"><input type="checkbox" checked={!!sel[c.id]?.on} onChange={e => upd(c.id, { on: e.target.checked })} />{c.title}</label>
          <select className="inp" value={sel[c.id]?.mentor ?? ""} onChange={e => upd(c.id, { mentor: e.target.value })}><option value="">Mentor (optional)</option>{mentors.map(m => <option key={m.id} value={m.id}>{m.full_name}</option>)}</select>
          <select className="inp" value={sel[c.id]?.batch ?? ""} onChange={e => upd(c.id, { batch: e.target.value })}><option value="">Batch (optional)</option>{batches.filter(b => b.course_id === c.id).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select>
        </div>)}</div><button className="btn mt-4" onClick={grant}>Grant selected courses</button></Card></>}</>;
}
