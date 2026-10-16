import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, Msg, Empty } from "./ui";
export default function MilestonesPanel({ eid, who }: { eid: string; who: "student" | "mentor" }) {
  const [rows, setRows] = useState<any[]>([]); const [msg, setMsg] = useState(""); const [n, setN] = useState({ title: "", description: "", due_date: "" });
  const [ed, setEd] = useState<Record<string, any>>({});
  const load = async () => setRows((await supabase.from("project_milestones").select("*").eq("enrollment_id", eid).order("created_at")).data ?? []);
  useEffect(() => { load(); }, [eid]);
  const add = async () => { if (!n.title) return setMsg("Title required."); const { error } = await supabase.from("project_milestones").insert({ enrollment_id: eid, title: n.title, description: n.description, due_date: n.due_date || null }); setMsg(error?.message ?? "Milestone added."); setN({ title: "", description: "", due_date: "" }); load(); };
  const submit = async (m: any) => { const v = ed[m.id] ?? {}; const link = v.link_url ?? m.link_url ?? "";
    if (!/^https?:\/\//.test(link)) return setMsg("Add a project link starting with http(s)://");
    const { error } = await supabase.from("project_milestones").update({ link_url: link, student_notes: v.student_notes ?? m.student_notes, status: "submitted" }).eq("id", m.id); setMsg(error?.message ?? "Milestone submitted."); load(); };
  const evaluate = async (m: any) => { const v = ed[m.id] ?? {}; if (v.score === undefined || v.score === "") return setMsg("Enter a score.");
    const { error } = await supabase.from("project_milestones").update({ score: Number(v.score), feedback: v.feedback ?? "", status: "evaluated", evaluated_by: (await supabase.auth.getUser()).data.user?.id }).eq("id", m.id); setMsg(error?.message ?? "Evaluated."); load(); };
  const set = (id: string, k: string, val: any) => setEd(s => ({ ...s, [id]: { ...s[id], [k]: val } }));
  return <Card className="mb-4"><h2 className="font-bold mb-2">Project milestones</h2><Msg m={msg} />
    {who === "mentor" && <div className="grid md:grid-cols-4 gap-2 mb-3"><input aria-label="Milestone title" className="inp" placeholder="Title" value={n.title} onChange={e => setN({ ...n, title: e.target.value })} />
      <input aria-label="Description" className="inp" placeholder="Description" value={n.description} onChange={e => setN({ ...n, description: e.target.value })} />
      <input aria-label="Due date" type="date" className="inp" value={n.due_date} onChange={e => setN({ ...n, due_date: e.target.value })} /><button className="btn" onClick={add}>Add milestone</button></div>}
    {!rows.length ? <Empty t="No milestones." /> : rows.map(m => <div key={m.id} className="border-t border-hairline py-2 text-sm"><p><b>{m.title}</b> <i className="text-muted">({m.status}{m.due_date && ` · due ${m.due_date}`})</i></p><p>{m.description}</p>
      {m.link_url && <a className="underline text-brand-dark" href={m.link_url} target="_blank" rel="noopener noreferrer">{m.link_url}</a>}{m.student_notes && <p>Notes: {m.student_notes}</p>}
      {m.status === "evaluated" && <p className="text-green-700">Score {m.score} — {m.feedback}</p>}
      {who === "student" && m.status !== "evaluated" && <div className="space-y-2 mt-2"><input aria-label="Project link" className="inp" placeholder="Project link (https://…)" defaultValue={m.link_url ?? ""} onChange={e => set(m.id, "link_url", e.target.value)} />
        <textarea aria-label="Notes" className="inp" placeholder="Notes" defaultValue={m.student_notes ?? ""} onChange={e => set(m.id, "student_notes", e.target.value)} /><button className="btn" onClick={() => submit(m)}>{m.status === "submitted" ? "Resubmit" : "Submit"}</button></div>}
      {who === "mentor" && m.status !== "evaluated" && <div className="flex gap-2 mt-2"><input aria-label="Score" type="number" className="inp max-w-[100px]" placeholder="Score" onChange={e => set(m.id, "score", e.target.value)} />
        <input aria-label="Feedback" className="inp" placeholder="Feedback" onChange={e => set(m.id, "feedback", e.target.value)} /><button className="btn" onClick={() => evaluate(m)}>Evaluate</button></div>}</div>)}</Card>;
}
