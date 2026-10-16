import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import { fmtDay, todayLocal } from "../../lib/format";
import Notifications from "../../components/Notifications";
import { EmptyState, ErrorState, LoadingState, MetricCard, Panel, StatusBadge, WelcomeBanner } from "../../components/admin/kit";
export default function StudentHome() {
  const { profile } = useAuth(); const [enr, setEnr] = useState<any[]>([]); const [lessons, setLessons] = useState<any[]>([]); const [prog, setProg] = useState<any[]>([]);
  const [asg, setAsg] = useState<any[]>([]); const [subs, setSubs] = useState<any[]>([]); const [qa, setQa] = useState<any[]>([]); const [ms, setMs] = useState<any[]>([]); const [att, setAtt] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); const [err, setErr] = useState("");
  useEffect(() => { (async () => { try {
    // independent reads run in parallel (previously 8 sequential round trips)
    const r = await Promise.all([
      supabase.from("enrollments").select("id,status,course_id,course:courses(title),mentor:profiles!enrollments_mentor_id_fkey(full_name),certificates(verification_id,status)"),
      supabase.from("lessons").select("id, modules!inner(course_id)").eq("status", "published"),
      supabase.from("lesson_progress").select("enrollment_id,lesson_id"),
      supabase.from("assignments").select("id,title,course_id,due_date"),
      supabase.from("submissions").select("assignment_id,enrollment_id,status,score,feedback,created_at").order("created_at", { ascending: false }),
      supabase.from("quiz_attempts").select("score_pct,passed,created_at,quiz:quizzes(title)").order("created_at", { ascending: false }).limit(5),
      supabase.from("project_milestones").select("id,title,status,due_date,enrollment_id").neq("status", "evaluated"),
      supabase.from("attendance").select("enrollment_id,present")]);
    const bad = r.find(x => x.error); if (bad?.error) throw bad.error;
    setEnr(r[0].data ?? []); setLessons(r[1].data ?? []); setProg(r[2].data ?? []); setAsg(r[3].data ?? []); setSubs(r[4].data ?? []); setQa(r[5].data ?? []); setMs(r[6].data ?? []); setAtt(r[7].data ?? []);
  } catch (e: any) { setErr(e.message ?? "Network error"); } setLoading(false); })(); }, []);
  // progress counts only published lessons that belong to the enrollment's course, so it can never exceed 100%
  const pub = new Set(lessons.map(l => l.id));
  const pct = (e: any) => { const t = lessons.filter(l => l.modules.course_id === e.course_id).length; const d = prog.filter(p => p.enrollment_id === e.id && pub.has(p.lesson_id)).length; return t ? Math.min(100, Math.round(100 * d / t)) : 0; };
  const attPct = (e: any) => { const a = att.filter(x => x.enrollment_id === e.id); return a.length ? Math.round(100 * a.filter(x => x.present).length / a.length) + "%" : "—"; };
  const today = todayLocal();
  const active = enr.filter(e => e.status === "active");
  const upcoming = asg.filter(a => a.due_date && a.due_date >= today && active.some(e => e.course_id === a.course_id) && !subs.some(s => s.assignment_id === a.id)).sort((a, b) => a.due_date.localeCompare(b.due_date));
  const feedback = subs.filter(s => s.status === "graded").slice(0, 5);
  const avg = active.length ? Math.round(active.reduce((n, e) => n + pct(e), 0) / active.length) : 0;
  if (loading) return <LoadingState />;
  if (err) return <ErrorState error={new Error(err + ". Check your connection and reload.")} />;
  const first = active[0];
  return <div className="space-y-6">
    <WelcomeBanner eyebrow={profile?.is_alumni ? "BlezeX alumni 🎓" : "Your learning"} title={`Hi ${profile?.full_name?.split(" ")[0] ?? ""}`}
      text={enr.length ? "Pick up where you left off, hand in assignments and track your progress." : "Your administrator grants course access. Once you are enrolled, your courses appear here."}
      cta={first ? { label: "Continue learning", to: `/student/course/${first.id}` } : undefined} />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{([["Active courses", active.length, "book"], ["Average progress", `${avg}%`, "chart"], ["Assignments due", upcoming.length, "list"], ["Open milestones", ms.length, "award"]] as const).map(([k, v, icon]) =>
      <MetricCard key={k} label={k} icon={icon}><p className="text-[2rem] font-heading font-bold tabular-nums text-ink leading-tight">{v}</p></MetricCard>)}</div>
    {!enr.length ? <div className="bg-white border border-hairline rounded-[20px]"><EmptyState title="No course access yet" hint="Contact your administrator to be enrolled in a course." /></div> :
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{enr.map(e => { const p = pct(e); return <article key={e.id} className="bg-white border border-hairline rounded-[20px] p-5 flex flex-col shadow-[0_8px_24px_-12px_rgba(17,17,17,.08)]">
        <div className="flex items-center justify-between gap-2 mb-2"><span className="text-xs text-muted truncate">Mentor: {e.mentor?.full_name ?? "—"} · Attendance {attPct(e)}</span><StatusBadge value={e.status} /></div>
        <h2 className="text-lg font-semibold leading-snug">{e.course.title}</h2>
        <div className="h-2 bg-paper rounded-full my-3 overflow-hidden" role="progressbar" aria-label={`${e.course.title} progress`} aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-brand" style={{ width: `${p}%` }} /></div>
        <p className="text-xs text-muted mb-4 tabular-nums">{p}% complete</p>
        <div className="mt-auto">{(e.status === "active" || e.status === "completed") ? <Link className="btn inline-block" to={`/student/course/${e.id}`}>{p && e.status === "active" ? "Continue learning" : "Open course"}</Link> : <p className="text-sm text-muted">Access is {e.status}. Contact your administrator.</p>}
          {e.certificates?.filter((c: any) => c.status === "issued").map((c: any) => <p key={c.verification_id} className="text-xs mt-3">🎓 Certificate: <Link className="underline text-brand-dark" to={`/verify/${c.verification_id}`}>{c.verification_id}</Link></p>)}</div></article>; })}</div>}
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <Panel title="Upcoming assignments">{!upcoming.length ? <p className="text-sm text-muted">Nothing due.</p> : <ul className="divide-y divide-hairline -my-2">{upcoming.map(a => <li key={a.id} className="py-2 text-sm flex justify-between gap-2"><span>{a.title}</span><span className="text-muted tabular-nums">{fmtDay(a.due_date)}</span></li>)}</ul>}</Panel>
      <Panel title="Quiz results">{!qa.length ? <p className="text-sm text-muted">No attempts yet.</p> : <ul className="divide-y divide-hairline -my-2">{qa.map((q, i) => <li key={i} className="py-2 text-sm flex justify-between gap-2"><span>{q.quiz?.title}</span><span className="tabular-nums"><b>{q.score_pct}%</b> <span className={q.passed ? "text-green-700" : "text-red-600"}>{q.passed ? "Passed" : "Not passed"}</span></span></li>)}</ul>}</Panel>
      <Panel title="Mentor feedback">{!feedback.length ? <p className="text-sm text-muted">No feedback yet.</p> : <ul className="divide-y divide-hairline -my-2">{feedback.map((s, i) => <li key={i} className="py-2 text-sm"><b className="tabular-nums">Score {s.score}</b>{s.feedback && <span className="text-muted"> — {s.feedback}</span>}</li>)}</ul>}</Panel>
      <Panel title="Project milestones">{!ms.length ? <p className="text-sm text-muted">No open milestones.</p> : <ul className="divide-y divide-hairline -my-2">{ms.map(m => <li key={m.id} className="py-2 text-sm flex flex-wrap justify-between gap-2"><span>{m.title}</span><span className="flex gap-2 items-center"><StatusBadge value={m.status} />{m.due_date && <span className="text-xs text-muted tabular-nums">due {fmtDay(m.due_date)}</span>}</span></li>)}</ul>}</Panel>
    </div>
    <Notifications />
  </div>;
}
