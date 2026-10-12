import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import Notifications from "../../components/Notifications";
import { Card, Title, Empty } from "../../components/ui";
export default function StudentHome() {
  const { profile } = useAuth(); const [enr, setEnr] = useState<any[]>([]); const [lessons, setLessons] = useState<any[]>([]); const [prog, setProg] = useState<any[]>([]);
  const [asg, setAsg] = useState<any[]>([]); const [subs, setSubs] = useState<any[]>([]); const [qa, setQa] = useState<any[]>([]); const [ms, setMs] = useState<any[]>([]); const [att, setAtt] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); const [err, setErr] = useState("");
  useEffect(() => { (async () => { try {
    const g = async (q: PromiseLike<{ data: any; error: any }>) => { const r = await q; if (r.error) throw r.error; return r.data ?? []; };
    setEnr(await g(supabase.from("enrollments").select("id,status,course_id,course:courses(title),mentor:profiles!enrollments_mentor_id_fkey(full_name),certificates(verification_id,status)")));
    setLessons(await g(supabase.from("lessons").select("id, modules!inner(course_id)").eq("status", "published")));
    setProg(await g(supabase.from("lesson_progress").select("enrollment_id,lesson_id")));
    setAsg(await g(supabase.from("assignments").select("id,title,course_id,due_date")));
    setSubs(await g(supabase.from("submissions").select("assignment_id,enrollment_id,status,score,feedback,created_at").order("created_at", { ascending: false })));
    setQa(await g(supabase.from("quiz_attempts").select("score_pct,passed,created_at,quiz:quizzes(title)").order("created_at", { ascending: false }).limit(5)));
    setMs(await g(supabase.from("project_milestones").select("id,title,status,due_date,enrollment_id").neq("status", "evaluated")));
    setAtt(await g(supabase.from("attendance").select("enrollment_id,present")));
  } catch (e: any) { setErr(e.message ?? "Network error"); } setLoading(false); })(); }, []);
  const pct = (e: any) => { const t = lessons.filter(l => l.modules.course_id === e.course_id).length; const d = prog.filter(p => p.enrollment_id === e.id).length; return t ? Math.round(100 * d / t) : 0; };
  const attPct = (e: any) => { const a = att.filter(x => x.enrollment_id === e.id); return a.length ? Math.round(100 * a.filter(x => x.present).length / a.length) + "%" : "—"; };
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = asg.filter(a => a.due_date && a.due_date >= today && enr.some(e => e.course_id === a.course_id && e.status === "active") && !subs.some(s => s.assignment_id === a.id)).sort((a, b) => a.due_date.localeCompare(b.due_date));
  const feedback = subs.filter(s => s.status === "graded").slice(0, 5);
  if (loading) return <p>Loading…</p>;
  if (err) return <p role="alert" className="text-red-600">Could not load your data: {err}. Check your connection and reload.</p>;
  return <><Title note={profile?.is_alumni ? "alumni 🎓" : "keep going!"}>Hi {profile?.full_name}</Title>
    {!enr.length ? <Empty t="You have no course access yet. Contact your administrator." /> :
      <div className="grid md:grid-cols-2 gap-4">{enr.map(e => <Card key={e.id} hov>
        <p className="text-xs text-muted">{e.status} · mentor: {e.mentor?.full_name ?? "—"} · attendance {attPct(e)}</p><h3 className="text-lg font-bold">{e.course.title}</h3>
        <div className="h-2 bg-paper rounded-full my-3 overflow-hidden" role="progressbar" aria-valuenow={pct(e)} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-brand" style={{ width: `${pct(e)}%` }} /></div>
        <p className="text-xs mb-3">{pct(e)}% complete</p>
        {(e.status === "active" || e.status === "completed") ? <Link className="btn inline-block" to={`/student/course/${e.id}`}>{pct(e) && e.status === "active" ? "Continue learning" : "Open course"}</Link> : <p className="text-sm text-muted">Access {e.status}.</p>}
        {e.certificates?.filter((c: any) => c.status === "issued").map((c: any) => <p key={c.verification_id} className="text-xs mt-2">🎓 Certificate: <Link className="underline" to={`/verify/${c.verification_id}`}>{c.verification_id}</Link></p>)}</Card>)}</div>}
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <Card><h2 className="font-bold mb-2">Upcoming assignments</h2>{!upcoming.length ? <Empty t="Nothing due." /> : upcoming.map(a => <p key={a.id} className="text-sm">{a.due_date} · {a.title}</p>)}</Card>
      <Card><h2 className="font-bold mb-2">Quiz results</h2>{!qa.length ? <Empty t="No attempts yet." /> : qa.map((q, i) => <p key={i} className="text-sm">{q.quiz?.title}: {q.score_pct}% {q.passed ? "✓" : "✗"}</p>)}</Card>
      <Card><h2 className="font-bold mb-2">Mentor feedback</h2>{!feedback.length ? <Empty t="No feedback yet." /> : feedback.map((s, i) => <p key={i} className="text-sm">Score {s.score}: {s.feedback || "—"}</p>)}</Card>
      <Card><h2 className="font-bold mb-2">Project milestones</h2>{!ms.length ? <Empty t="No open milestones." /> : ms.map(m => <p key={m.id} className="text-sm">{m.title} <i className="text-muted">({m.status}{m.due_date && ` · due ${m.due_date}`})</i></p>)}</Card></div>
    <Notifications /></>;
}
