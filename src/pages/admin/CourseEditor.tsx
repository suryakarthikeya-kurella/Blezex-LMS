import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sanitizeHtml } from "../../lib/sanitize";
import QuizEditor from "../../components/QuizEditor";
import Sessions from "../../components/Sessions";
import { supabase } from "../../lib/supabase";
import { Card, Title, Msg } from "../../components/ui";
export default function CourseEditor() {
  const { id } = useParams(); const [c, setC] = useState<any>(null); const [mods, setMods] = useState<any[]>([]);
  const [asg, setAsg] = useState<any[]>([]); const [bat, setBat] = useState<any[]>([]); const [msg, setMsg] = useState("");
  const [mt, setMt] = useState(""); const [l, setL] = useState({ module_id: "", title: "", content_html: "<h2>Heading</h2>\n<p>Content…</p>", status: "draft" });
  const [a, setA] = useState({ title: "", instructions: "", due_date: "" }); const [b, setB] = useState({ name: "", start_date: "" });
  const load = async () => {
    setC((await supabase.from("courses").select("*").eq("id", id!).single()).data);
    setMods((await supabase.from("modules").select("*, lessons(id,title,status,position)").eq("course_id", id!).order("position")).data ?? []);
    setAsg((await supabase.from("assignments").select("*").eq("course_id", id!)).data ?? []);
    setBat((await supabase.from("batches").select("*").eq("course_id", id!)).data ?? []);
  };
  useEffect(() => { load(); }, [id]);
  const [rules, setRules] = useState({ min_progress_pct: 100, min_attendance_pct: 75, min_assignment_avg: 40 });
  useEffect(() => { if (c) setRules({ min_progress_pct: c.min_progress_pct, min_attendance_pct: c.min_attendance_pct, min_assignment_avg: c.min_assignment_avg }); }, [c?.id]);
  const run = async (p: PromiseLike<{ error: any }>) => { const { error } = await p; setMsg(error?.message ?? "Saved."); load(); };
  const clean = sanitizeHtml;
  if (!c) return <p>Loading…</p>;
  return <><Title note={c.status}>{c.title}</Title><Msg m={msg} />
    <Card className="mb-4 flex gap-2 items-center"><span>Course status:</span>
      <button className="btn-ghost" onClick={() => run(supabase.from("courses").update({ status: c.status === "published" ? "draft" : "published" }).eq("id", id!))}>
        {c.status === "published" ? "Unpublish" : "Publish"}</button></Card>
    <Card className="mb-4"><h2 className="font-bold mb-2">Completion requirements (certificate eligibility)</h2>
      <div className="grid md:grid-cols-4 gap-2 items-end">{([["min_progress_pct", "Min lesson progress %"], ["min_attendance_pct", "Min attendance %"], ["min_assignment_avg", "Min assignment avg (0-100)"]] as const).map(([k, l]) =>
        <label key={k} className="text-xs">{l}<input type="number" min={0} max={100} className="inp" value={rules[k]} onChange={e => setRules({ ...rules, [k]: Number(e.target.value) })} /></label>)}
        <button className="btn" onClick={() => run(supabase.from("courses").update(rules).eq("id", id!))}>Save rules</button></div></Card>
    <Card className="mb-4"><h2 className="font-bold mb-2">Modules & lessons</h2>
      <div className="flex gap-2 mb-3"><input className="inp max-w-xs" placeholder="New module title" value={mt} onChange={e => setMt(e.target.value)} />
        <button className="btn-ghost" onClick={() => { run(supabase.from("modules").insert({ course_id: id, title: mt, position: mods.length + 1 })); setMt(""); }}>Add module</button></div>
      {mods.map(m => <div key={m.id} className="mb-2"><b>{m.title}</b><ul className="text-sm list-disc pl-6">{(m.lessons ?? []).map((x: any) =>
        <li key={x.id}>{x.title} <i className="text-muted">({x.status})</i> <button className="underline text-xs" onClick={() => run(supabase.from("lessons").update({ status: x.status === "published" ? "draft" : "published" }).eq("id", x.id))}>toggle</button>
          <button className="underline text-xs ml-2" onClick={() => confirm("Delete lesson?") && run(supabase.from("lessons").delete().eq("id", x.id))}>delete</button></li>)}</ul></div>)}</Card>
    <Card className="mb-4"><h2 className="font-bold mb-2">New lesson (rich HTML / inline SVG, sanitized)</h2>
      <form className="space-y-2" onSubmit={e => { e.preventDefault(); run(supabase.from("lessons").insert({ ...l, content_html: clean(l.content_html), position: 99 })); }}>
        <div className="grid md:grid-cols-3 gap-2">
          <select required className="inp" value={l.module_id} onChange={e => setL({ ...l, module_id: e.target.value })}><option value="">Module…</option>{mods.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}</select>
          <input required className="inp" placeholder="Lesson title" value={l.title} onChange={e => setL({ ...l, title: e.target.value })} />
          <select className="inp" value={l.status} onChange={e => setL({ ...l, status: e.target.value })}><option>draft</option><option>published</option></select></div>
        <textarea className="inp font-mono h-40" value={l.content_html} onChange={e => setL({ ...l, content_html: e.target.value })} />
        <div className="text-xs text-muted">Preview:</div><div className="lesson border border-hairline rounded-xl p-3" dangerouslySetInnerHTML={{ __html: clean(l.content_html) }} />
        <button className="btn">Save lesson</button></form></Card>
    <QuizEditor courseId={id!} />
    <Sessions courses={[{ id: id!, title: c.title }]} />
    <div className="grid md:grid-cols-2 gap-4">
      <Card><h2 className="font-bold mb-2">Assignments</h2>{asg.map(x => <p key={x.id} className="text-sm">• {x.title}</p>)}
        <form className="space-y-2 mt-2" onSubmit={e => { e.preventDefault(); run(supabase.from("assignments").insert({ course_id: id, title: a.title, instructions: a.instructions, due_date: a.due_date || null })); }}>
          <input required className="inp" placeholder="Title" value={a.title} onChange={e => setA({ ...a, title: e.target.value })} />
          <textarea className="inp" placeholder="Instructions" value={a.instructions} onChange={e => setA({ ...a, instructions: e.target.value })} />
          <input type="date" className="inp" value={a.due_date} onChange={e => setA({ ...a, due_date: e.target.value })} /><button className="btn">Add</button></form></Card>
      <Card><h2 className="font-bold mb-2">Batches</h2>{bat.map(x => <p key={x.id} className="text-sm">• {x.name}</p>)}
        <form className="space-y-2 mt-2" onSubmit={e => { e.preventDefault(); run(supabase.from("batches").insert({ course_id: id, name: b.name, start_date: b.start_date || null })); }}>
          <input required className="inp" placeholder="Batch name" value={b.name} onChange={e => setB({ ...b, name: e.target.value })} />
          <input type="date" className="inp" value={b.start_date} onChange={e => setB({ ...b, start_date: e.target.value })} /><button className="btn">Add</button></form></Card></div></>;
}
