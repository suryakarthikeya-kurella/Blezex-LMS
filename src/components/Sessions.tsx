import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, Msg, Empty } from "./ui";
export default function Sessions({ courses }: { courses: { id: string; title: string }[] }) {
  const [rows, setRows] = useState<any[]>([]); const [batches, setBatches] = useState<any[]>([]); const [msg, setMsg] = useState("");
  const [f, setF] = useState({ course_id: courses[0]?.id ?? "", batch_id: "", title: "", session_date: "" });
  const load = async () => { setRows((await supabase.from("class_sessions").select("*, course:courses(title)").order("session_date", { ascending: false }).limit(50)).data ?? []);
    setBatches((await supabase.from("batches").select("id,name,course_id")).data ?? []); };
  useEffect(() => { load(); }, []);
  useEffect(() => { if (!f.course_id && courses[0]) setF(x => ({ ...x, course_id: courses[0].id })); }, [courses]);
  const add = async () => { if (!f.course_id || !f.title || !f.session_date) return setMsg("Course, title and date required.");
    const { error } = await supabase.from("class_sessions").insert({ course_id: f.course_id, batch_id: f.batch_id || null, title: f.title, session_date: f.session_date });
    setMsg(error?.message ?? "Session scheduled."); load(); };
  const del = async (id: string) => { if (confirm("Delete session?")) { await supabase.from("class_sessions").delete().eq("id", id); load(); } };
  return <Card className="mb-6"><h2 className="font-bold mb-2">Class sessions</h2><Msg m={msg} />
    <div className="grid md:grid-cols-5 gap-2 mb-3">
      <select aria-label="Course" className="inp" value={f.course_id} onChange={e => setF({ ...f, course_id: e.target.value })}>{courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
      <select aria-label="Batch" className="inp" value={f.batch_id} onChange={e => setF({ ...f, batch_id: e.target.value })}><option value="">All batches</option>{batches.filter(b => b.course_id === f.course_id).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select>
      <input aria-label="Title" className="inp" placeholder="Title" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} />
      <input aria-label="Date" type="date" className="inp" value={f.session_date} onChange={e => setF({ ...f, session_date: e.target.value })} />
      <button className="btn" onClick={add}>Schedule</button></div>
    {!rows.length ? <Empty t="No sessions." /> : rows.map(s => <p key={s.id} className="text-sm border-t border-hairline py-1">{s.session_date} · {s.title} · <i>{s.course?.title}</i> <button className="underline text-xs ml-2" onClick={() => del(s.id)}>delete</button></p>)}</Card>;
}
