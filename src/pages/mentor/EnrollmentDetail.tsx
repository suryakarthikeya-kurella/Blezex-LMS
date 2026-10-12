import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import MilestonesPanel from "../../components/MilestonesPanel";
import { Card, Title, Msg, Empty } from "../../components/ui";
export default function EnrollmentDetail() {
  const { eid } = useParams(); const [e, setE] = useState<any>(null); const [el, setEl] = useState<any>(null); const [att, setAtt] = useState<any[]>([]); const [qa, setQa] = useState<any[]>([]); const [ev, setEv] = useState<any[]>([]);
  const [f, setF] = useState({ criterion: "", score: "", max_score: "10", remarks: "" }); const [msg, setMsg] = useState("");
  const load = async () => {
    setE((await supabase.from("enrollments").select("id,status,course:courses(title),student:profiles!enrollments_student_id_fkey(full_name,email)").eq("id", eid!).maybeSingle()).data);
    setEl((await supabase.rpc("enrollment_eligibility", { eid })).data?.[0] ?? null);
    setAtt((await supabase.from("attendance").select("session_date,present").eq("enrollment_id", eid!).order("session_date", { ascending: false })).data ?? []);
    setQa((await supabase.from("quiz_attempts").select("score_pct,passed,created_at,quiz:quizzes(title)").eq("enrollment_id", eid!).order("created_at", { ascending: false })).data ?? []);
    setEv((await supabase.from("evaluations").select("*").eq("enrollment_id", eid!).order("created_at", { ascending: false })).data ?? []);
  };
  useEffect(() => { load(); }, [eid]);
  const add = async () => { if (!f.criterion || f.score === "") return setMsg("Criterion and score required.");
    const { error } = await supabase.from("evaluations").insert({ enrollment_id: eid, criterion: f.criterion, score: Number(f.score), max_score: Number(f.max_score), remarks: f.remarks }); setMsg(error?.message ?? "Evaluation saved."); setF({ criterion: "", score: "", max_score: "10", remarks: "" }); load(); };
  if (!e) return <p>Loading… or not authorized. <Link className="underline" to="/mentor">Back</Link></p>;
  return <><Link to="/mentor" className="text-sm underline">← My students</Link><Title note={e.status}>{e.student.full_name} · {e.course.title}</Title><Msg m={msg} />
    {el && <Card className="mb-4 grid grid-cols-2 md:grid-cols-5 gap-3 text-sm"><div>Progress<p className="text-2xl font-bold">{el.progress_pct}%</p></div><div>Attendance<p className="text-2xl font-bold">{el.attendance_pct}%</p></div>
      <div>Assignment avg<p className="text-2xl font-bold">{el.assignment_avg}</p></div><div>Graded<p className="text-2xl font-bold">{el.assignments_graded}/{el.assignments_total}</p></div><div>Eligible<p className="text-2xl font-bold">{el.eligible ? "Yes" : "Not yet"}</p></div></Card>}
    <MilestonesPanel eid={eid!} who="mentor" />
    <Card className="mb-4"><h2 className="font-bold mb-2">Evaluations</h2>
      <div className="grid md:grid-cols-5 gap-2 mb-2"><input aria-label="Criterion" className="inp" placeholder="Criterion" value={f.criterion} onChange={e => setF({ ...f, criterion: e.target.value })} />
        <input aria-label="Score" type="number" className="inp" placeholder="Score" value={f.score} onChange={e => setF({ ...f, score: e.target.value })} /><input aria-label="Max score" type="number" className="inp" value={f.max_score} onChange={e => setF({ ...f, max_score: e.target.value })} />
        <input aria-label="Remarks" className="inp" placeholder="Remarks" value={f.remarks} onChange={e => setF({ ...f, remarks: e.target.value })} /><button className="btn" onClick={add}>Add</button></div>
      {!ev.length ? <Empty t="No evaluations." /> : ev.map(x => <p key={x.id} className="text-sm border-t border-hairline py-1">{x.criterion}: <b>{x.score}/{x.max_score}</b> {x.remarks}</p>)}</Card>
    <div className="grid md:grid-cols-2 gap-4"><Card><h2 className="font-bold mb-2">Quiz attempts</h2>{!qa.length ? <Empty t="None." /> : qa.map((a, i) => <p key={i} className="text-sm">{a.quiz?.title}: {a.score_pct}% {a.passed ? "✓" : "✗"}</p>)}</Card>
      <Card><h2 className="font-bold mb-2">Attendance</h2>{!att.length ? <Empty t="None." /> : att.map((a, i) => <p key={i} className="text-sm">{a.session_date}: {a.present ? "present" : "absent"}</p>)}</Card></div></>;
}
