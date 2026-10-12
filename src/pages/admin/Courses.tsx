import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Card, Title, Msg } from "../../components/ui";
export default function Courses() {
  const [rows, setRows] = useState<any[]>([]); const [tracks, setTracks] = useState<any[]>([]); const [msg, setMsg] = useState("");
  const [f, setF] = useState({ title: "", description: "", track_id: "" }); const [t, setT] = useState("");
  const load = async () => {
    setRows((await supabase.from("courses").select("*, tracks(name)").order("created_at")).data ?? []);
    setTracks((await supabase.from("tracks").select("*").order("name")).data ?? []);
  };
  useEffect(() => { load(); }, []);
  const add = async (e: FormEvent) => { e.preventDefault();
    const { error } = await supabase.from("courses").insert({ title: f.title, description: f.description, track_id: f.track_id || null, slug: f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36) });
    setMsg(error?.message ?? ""); if (!error) setF({ title: "", description: "", track_id: "" }); load(); };
  const addTrack = async () => { if (!t) return; const { error } = await supabase.from("tracks").insert({ name: t }); setMsg(error?.message ?? ""); setT(""); load(); };
  return <><Title note="add 50+ courses, no code needed">Course Catalog</Title>
    <Card className="mb-6"><form onSubmit={add} className="grid md:grid-cols-4 gap-2">
      <input className="inp" required placeholder="Course title" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} />
      <input className="inp" placeholder="Description" value={f.description} onChange={e => setF({ ...f, description: e.target.value })} />
      <select className="inp" value={f.track_id} onChange={e => setF({ ...f, track_id: e.target.value })}><option value="">No track</option>{tracks.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
      <button className="btn">Add course</button></form>
      <div className="flex gap-2 mt-3"><input className="inp max-w-xs" placeholder="New track name" value={t} onChange={e => setT(e.target.value)} /><button className="btn-ghost" onClick={addTrack}>Add track</button></div><Msg m={msg} /></Card>
    <div className="grid md:grid-cols-2 gap-4">{rows.map(c => <Card key={c.id} hov>
      <p className="text-xs text-muted">{c.tracks?.name ?? "—"} · {c.status}</p><h3 className="text-lg font-bold">{c.title}</h3><p className="text-sm mb-3">{c.description}</p>
      <Link className="btn-ghost" to={`/admin/courses/${c.id}`}>Edit content</Link></Card>)}</div></>;
}
