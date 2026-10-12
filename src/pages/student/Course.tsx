import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sanitizeHtml } from "../../lib/sanitize";
import { submissionSchema } from "../../lib/schemas";
import QuizPanel from "../../components/QuizPanel";
import MilestonesPanel from "../../components/MilestonesPanel";
import { supabase } from "../../lib/supabase";
import { Card, Msg, Empty } from "../../components/ui";
export default function StudentCourse() {
  const { eid } = useParams(); const [e, setE] = useState<any>(null); const [mods, setMods] = useState<any[]>([]);
  const [done, setDone] = useState<Set<string>>(new Set()); const [cur, setCur] = useState<string>(""); const [asg, setAsg] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]); const [form, setForm] = useState<Record<string, { t: string; l: string }>>({}); const [msg, setMsg] = useState("");
  const load = async () => {
    const { data: en } = await supabase.from("enrollments").select("id,status,course_id,course:courses(title)").eq("id", eid!).maybeSingle(); setE(en); if (!en) return;
    const { data: m } = await supabase.from("modules").select("id,title,lessons(id,title,content_html,position,status)").eq("course_id", en.course_id).order("position"); setMods(m ?? []);
    const { data: p } = await supabase.from("lesson_progress").select("lesson_id").eq("enrollment_id", eid!); const ds = new Set((p ?? []).map((x: any) => x.lesson_id)); setDone(ds);
    const all = (m ?? []).flatMap((x: any) => [...(x.lessons ?? [])].sort((a: any, b: any) => a.position - b.position));
    setCur(c => c || (all.find((l: any) => !ds.has(l.id)) ?? all[0])?.id || "");
    setAsg((await supabase.from("assignments").select("*").eq("course_id", en.course_id)).data ?? []);
    setSubs((await supabase.from("submissions").select("*").eq("enrollment_id", eid!)).data ?? []);
  };
  useEffect(() => { load(); }, [eid]);
  const flat = mods.flatMap(m => [...(m.lessons ?? [])].sort((a: any, b: any) => a.position - b.position)); const idx = flat.findIndex(l => l.id === cur); const lesson = flat[idx];
  const toggle = async () => {
    const { error } = done.has(cur) ? await supabase.from("lesson_progress").delete().eq("enrollment_id", eid!).eq("lesson_id", cur) : await supabase.from("lesson_progress").insert({ enrollment_id: eid, lesson_id: cur });
    setMsg(error?.message ?? ""); load();
  };
  const submit = async (a: any) => {
    const f = form[a.id] ?? { t: "", l: "" }; const ok = submissionSchema.safeParse({ text: f.t, link: f.l }); if (!ok.success) return setMsg(ok.error.issues[0].message);
    const ex = subs.find(s => s.assignment_id === a.id);
    const row = { text_response: f.t || null, link_url: f.l || null };
    const { error } = ex ? await supabase.from("submissions").update(row).eq("id", ex.id) : await supabase.from("submissions").insert({ ...row, assignment_id: a.id, enrollment_id: eid });
    setMsg(error?.message ?? "Submitted."); load();
  };
  if (!e) return <p>Loading… or you do not have access to this course. <Link className="underline" to="/student">Back</Link></p>;
  return <><Link to="/student" className="text-sm underline">← My learning</Link><h1 className="text-3xl font-extrabold my-2">{e.course.title}</h1><Msg m={msg} />
    <div className="grid md:grid-cols-[260px_1fr] gap-4">
      <Card className="h-fit">{mods.map(m => <div key={m.id} className="mb-3"><p className="font-bold text-sm">{m.title}</p>{[...(m.lessons ?? [])].sort((a: any, b: any) => a.position - b.position).map((l: any) =>
        <button key={l.id} onClick={() => setCur(l.id)} className={`block w-full text-left text-sm px-2 py-1 rounded-lg ${cur === l.id ? "bg-ink text-white" : "hover:bg-paper"}`}>{done.has(l.id) ? "✓ " : "○ "}{l.title}</button>)}</div>)}
        {!flat.length && <Empty t="No published lessons yet." />}</Card>
      <div>{e.status !== "active" && <p className="text-sm text-muted mb-2">This enrollment is {e.status}: read-only.</p>}{lesson && <Card className="mb-4"><h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
        <div className="lesson" dangerouslySetInnerHTML={{ __html: sanitizeHtml(lesson.content_html ?? "") }} />
        <div className="flex gap-2 mt-4 flex-wrap"><button className="btn-ghost" disabled={idx <= 0} onClick={() => setCur(flat[idx - 1].id)}>← Previous</button>
          {e.status === "active" && <button className="btn" onClick={toggle}>{done.has(cur) ? "Mark incomplete" : "Mark complete"}</button>}
          <button className="btn-ghost" disabled={idx >= flat.length - 1} onClick={() => setCur(flat[idx + 1].id)}>Next →</button></div></Card>}
        <Card><h2 className="font-bold mb-2">Assignments</h2>{!asg.length ? <Empty t="No assignments." /> : asg.map(a => { const s = subs.find(x => x.assignment_id === a.id); const locked = s?.status === "graded" || e.status !== "active"; return (
          <div key={a.id} className="border-t border-hairline py-3 text-sm"><p className="font-bold">{a.title} {a.due_date && <span className="font-normal text-muted">· due {a.due_date}</span>}</p><p>{a.instructions}</p>
            {s?.status === "graded" && <p className="text-green-700">Score: {s.score} — {s.feedback}</p>}
            {!locked && <div className="space-y-2 mt-2"><textarea className="inp" placeholder="Your response" defaultValue={s?.text_response ?? ""} onChange={ev => setForm({ ...form, [a.id]: { t: ev.target.value, l: form[a.id]?.l ?? s?.link_url ?? "" } })} />
              <input className="inp" placeholder="Project link (https://…)" defaultValue={s?.link_url ?? ""} onChange={ev => setForm({ ...form, [a.id]: { t: form[a.id]?.t ?? s?.text_response ?? "", l: ev.target.value } })} />
              <button className="btn" onClick={() => submit(a)}>{s ? "Resubmit" : "Submit"}</button></div>}</div>); })}</Card>
        <div className="mt-4"><QuizPanel courseId={e.course_id} eid={eid!} active={e.status === "active"} /><MilestonesPanel eid={eid!} who="student" /></div></div></div></>;
}
