import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Sessions from "../../components/Sessions";
import Notifications from "../../components/Notifications";
import { Card, Title, Msg, Empty } from "../../components/ui";
export default function MentorHome() {
  const [enr, setEnr] = useState<any[]>([]); const [subs, setSubs] = useState<any[]>([]); const [sessions, setSessions] = useState<any[]>([]); const [att, setAtt] = useState<any[]>([]);
  const [sid, setSid] = useState(""); const [msg, setMsg] = useState(""); const [filter, setFilter] = useState(""); const [courseF, setCourseF] = useState(""); const [statusF, setStatusF] = useState("");
  const [g, setG] = useState<Record<string, { score: string; feedback: string }>>({});
  const load = async () => {
    setEnr((await supabase.from("enrollments").select("id,status,course_id,batch:batches(name),course:courses(title),student:profiles!enrollments_student_id_fkey(full_name,email)").order("created_at")).data ?? []);
    setSubs((await supabase.from("submissions").select("*, assignment:assignments(title), enrollment:enrollments(student:profiles!enrollments_student_id_fkey(full_name))").order("created_at", { ascending: false }).limit(100)).data ?? []);
    setSessions((await supabase.from("class_sessions").select("*, course:courses(title)").order("session_date", { ascending: false }).limit(30)).data ?? []);
  };
  useEffect(() => { load(); }, []);
  useEffect(() => { if (sid) supabase.from("attendance").select("enrollment_id,present").eq("session_id", sid).then(({ data }) => setAtt(data ?? [])); else setAtt([]); }, [sid]);
  const session = sessions.find(s => s.id === sid);
  const mark = async (eid: string, present: boolean) => {
    const { error } = await supabase.from("attendance").upsert({ enrollment_id: eid, session_id: sid, session_date: session.session_date, present }, { onConflict: "enrollment_id,session_date" });
    setMsg(error?.message ?? "Attendance saved."); setAtt(a => [...a.filter(x => x.enrollment_id !== eid), { enrollment_id: eid, present }]);
  };
  const grade = async (s: any) => { const v = g[s.id]; if (!v || v.score === "") return setMsg("Enter a score (0-100).");
    const { error } = await supabase.from("submissions").update({ score: Number(v.score), feedback: v.feedback, status: "graded", graded_by: (await supabase.auth.getUser()).data.user?.id }).eq("id", s.id); setMsg(error?.message ?? "Graded."); load(); };
  const courses = Array.from(new Map(enr.map(e => [e.course_id, e.course.title])).entries());
  const shown = enr.filter(e => (e.course.title + e.student.full_name).toLowerCase().includes(filter.toLowerCase()) && (!courseF || e.course_id === courseF) && (!statusF || e.status === statusF));
  const roster = session ? enr.filter(e => e.course_id === session.course_id && e.status === "active" && (!session.batch_id || true)) : [];
  const pending = subs.filter(s => s.status === "submitted");
  return <><Title note="only your assigned students">Mentor Dashboard</Title><Msg m={msg} />
    <p className="mb-3 text-sm">Pending evaluations: <b>{pending.length}</b></p>
    <div className="flex flex-wrap gap-2 mb-3"><input aria-label="Filter" className="inp max-w-xs" placeholder="Filter by student / course" value={filter} onChange={e => setFilter(e.target.value)} />
      <select aria-label="Course" className="inp max-w-[200px]" value={courseF} onChange={e => setCourseF(e.target.value)}><option value="">All courses</option>{courses.map(([id, t]) => <option key={id} value={id}>{t}</option>)}</select>
      <select aria-label="Status" className="inp max-w-[140px]" value={statusF} onChange={e => setStatusF(e.target.value)}><option value="">Any status</option><option>active</option><option>paused</option><option>completed</option></select></div>
    <Card className="mb-6 overflow-x-auto"><h2 className="font-bold mb-2">Assigned enrollments</h2>{!shown.length ? <Empty t="No students assigned." /> :
      <table className="w-full text-sm"><tbody>{shown.map(e => <tr key={e.id} className="border-t border-hairline"><td className="py-2">{e.student.full_name}</td><td>{e.course.title}</td><td>{e.batch?.name ?? "—"}</td><td>{e.status}</td>
        <td><Link className="btn-ghost" to={`/mentor/enrollment/${e.id}`}>Open</Link></td></tr>)}</tbody></table>}</Card>
    <Sessions courses={courses.map(([id, title]) => ({ id, title }))} />
    <Card className="mb-6"><h2 className="font-bold mb-2">Take attendance</h2>
      <select aria-label="Session" className="inp max-w-md mb-3" value={sid} onChange={e => setSid(e.target.value)}><option value="">Select session…</option>{sessions.map(s => <option key={s.id} value={s.id}>{s.session_date} · {s.title} · {s.course?.title}</option>)}</select>
      {roster.map(e => { const a = att.find(x => x.enrollment_id === e.id); return <div key={e.id} className="flex gap-2 items-center text-sm py-1 border-t border-hairline"><span className="flex-1">{e.student.full_name}</span>
        <span className="text-xs">{a ? (a.present ? "✓ present" : "✗ absent") : "—"}</span><button className="btn-ghost" onClick={() => mark(e.id, true)}>Present</button><button className="btn-ghost" onClick={() => mark(e.id, false)}>Absent</button></div>; })}</Card>
    <Card><h2 className="font-bold mb-2">Submissions</h2>{!subs.length ? <Empty t="No submissions yet." /> : subs.map(s => <div key={s.id} className="border-t border-hairline py-3 text-sm">
      <p><b>{s.enrollment?.student?.full_name}</b> — {s.assignment?.title} <i className="text-muted">({s.status})</i></p><p className="whitespace-pre-wrap">{s.text_response}</p>
      {s.link_url && <a className="underline text-brand" href={s.link_url} target="_blank" rel="noopener noreferrer">{s.link_url}</a>}
      {s.status === "submitted" && <div className="flex gap-2 mt-2"><input aria-label="Score" className="inp max-w-[100px]" type="number" min={0} max={100} placeholder="Score" onChange={e => setG({ ...g, [s.id]: { score: e.target.value, feedback: g[s.id]?.feedback ?? "" } })} />
        <input aria-label="Feedback" className="inp" placeholder="Feedback" onChange={e => setG({ ...g, [s.id]: { score: g[s.id]?.score ?? "", feedback: e.target.value } })} /><button className="btn" onClick={() => grade(s)}>Grade</button></div>}
      {s.status === "graded" && <p className="text-green-700">Score {s.score} — {s.feedback}</p>}</div>)}</Card>
    <Notifications /></>;
}
