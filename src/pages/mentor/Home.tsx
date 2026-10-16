import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import { todayLocal } from "../../lib/format";
import Sessions from "../../components/Sessions";
import Notifications from "../../components/Notifications";
import { EmptyState, ErrorState, LoadingState, MetricCard, Panel, SearchBox, StatusBadge, Toolbar, WelcomeBanner, useToast } from "../../components/admin/kit";
export default function MentorHome() {
  const { profile } = useAuth(); const toast = useToast();
  const [enr, setEnr] = useState<any[]>([]); const [subs, setSubs] = useState<any[]>([]); const [sessions, setSessions] = useState<any[]>([]); const [att, setAtt] = useState<any[]>([]);
  const [pendingTotal, setPendingTotal] = useState(0); const [loading, setLoading] = useState(true); const [error, setError] = useState<unknown>(null);
  const [sid, setSid] = useState(""); const [filter, setFilter] = useState(""); const [courseF, setCourseF] = useState(""); const [statusF, setStatusF] = useState("");
  const [g, setG] = useState<Record<string, { score: string; feedback: string }>>({});
  const load = useCallback(async () => {
    const sel = "*, assignment:assignments(title), enrollment:enrollments(student:profiles!enrollments_student_id_fkey(full_name))";
    const r = await Promise.all([
      supabase.from("enrollments").select("id,status,course_id,batch_id,batch:batches(name),course:courses(title),student:profiles!enrollments_student_id_fkey(full_name,email)").neq("status", "revoked").order("created_at"),
      // the grading queue is queried directly (oldest first) so pending work can never be pushed out by newer graded rows
      supabase.from("submissions").select(sel, { count: "exact" }).eq("status", "submitted").order("created_at", { ascending: true }).limit(100),
      supabase.from("submissions").select(sel).eq("status", "graded").order("created_at", { ascending: false }).limit(20),
      supabase.from("class_sessions").select("*, course:courses(title)").order("session_date", { ascending: false }).limit(30)]);
    setError(r.find(x => x.error)?.error ?? null);
    setEnr(r[0].data ?? []); setSubs([...(r[1].data ?? []), ...(r[2].data ?? [])]); setPendingTotal(r[1].count ?? (r[1].data ?? []).length); setSessions(r[3].data ?? []); setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (sid) supabase.from("attendance").select("enrollment_id,present").eq("session_id", sid).then(({ data }) => setAtt(data ?? [])); else setAtt([]); }, [sid]);
  const session = sessions.find(s => s.id === sid);
  const mark = async (eid: string, present: boolean) => {
    const { error } = await supabase.from("attendance").upsert({ enrollment_id: eid, session_id: sid, session_date: session.session_date, present }, { onConflict: "enrollment_id,session_id" });
    if (error) return toast("err", error.message);
    toast("ok", "Attendance saved."); setAtt(a => [...a.filter(x => x.enrollment_id !== eid), { enrollment_id: eid, present }]);
  };
  const grade = async (s: any) => { const v = g[s.id]; if (!v || v.score === "") return toast("err", "Enter a score (0-100).");
    const { error } = await supabase.from("submissions").update({ score: Number(v.score), feedback: v.feedback, status: "graded", graded_by: profile?.id }).eq("id", s.id);
    if (error) return toast("err", error.message); toast("ok", "Submission graded."); load(); };
  const courses = Array.from(new Map(enr.map(e => [e.course_id, e.course.title])).entries());
  const shown = enr.filter(e => (e.course.title + e.student.full_name).toLowerCase().includes(filter.toLowerCase()) && (!courseF || e.course_id === courseF) && (!statusF || e.status === statusF));
  const roster = session ? enr.filter(e => e.course_id === session.course_id && e.status === "active" && (!session.batch_id || e.batch_id === session.batch_id)) : [];
  const pending = subs.filter(s => s.status === "submitted");
  const ordered = subs; // pending (oldest first) then recent graded
  const today = todayLocal();
  const metrics: [string, any, Parameters<typeof MetricCard>[0]["icon"]][] = [
    ["Active enrollments", enr.filter(e => e.status === "active").length, "users"], ["Courses", courses.length, "book"],
    ["Pending evaluations", pendingTotal, "alert"], ["Upcoming sessions", sessions.filter(s => s.session_date >= today).length, "list"]];
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  return <div className="space-y-6">
    <WelcomeBanner eyebrow="Your mentor dashboard" title={`Welcome back, ${profile?.full_name?.split(" ")[0] || "Mentor"}`}
      text="Review your students' work, take attendance and keep every enrollment on track. You only see students assigned to you." cta={pendingTotal ? { label: `Review ${pendingTotal} pending`, href: "#submissions" } : undefined} />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{metrics.map(([label, v, icon]) => <MetricCard key={label} label={label} icon={icon}><p className="text-[2rem] font-heading font-bold tabular-nums text-ink leading-tight">{v}</p></MetricCard>)}</div>

    <Panel title="Assigned enrollments" className="overflow-hidden [&>div:last-child]:!p-0">
      <div className="p-5 pb-0"><Toolbar>
        <SearchBox label="Filter students" placeholder="Filter by student or course…" value={filter} onChange={setFilter} />
        <select aria-label="Course" className="inp max-w-[220px]" value={courseF} onChange={e => setCourseF(e.target.value)}><option value="">All courses</option>{courses.map(([id, t]) => <option key={id} value={id}>{t}</option>)}</select>
        <select aria-label="Status" className="inp max-w-[150px]" value={statusF} onChange={e => setStatusF(e.target.value)}><option value="">Any status</option><option>active</option><option>paused</option><option>completed</option></select></Toolbar></div>
      {!shown.length ? <EmptyState title={enr.length ? "No enrollments match these filters." : "No students assigned yet."} hint={enr.length ? undefined : "An administrator assigns students to you from Course Access."} /> :
        <div className="overflow-x-auto"><table className="w-full text-sm min-w-[560px]"><thead><tr className="text-left text-xs uppercase tracking-wide text-muted bg-paper"><th scope="col" className="px-5 py-3 font-medium">Student</th><th scope="col" className="px-3 font-medium">Course</th><th scope="col" className="px-3 font-medium">Batch</th><th scope="col" className="px-3 font-medium">Status</th><th scope="col" className="px-5" /></tr></thead>
          <tbody>{shown.map(e => <tr key={e.id} className="border-t border-hairline"><td className="px-5 py-3"><p className="font-medium text-ink">{e.student.full_name}</p><p className="text-xs text-muted">{e.student.email}</p></td>
            <td className="px-3">{e.course.title}</td><td className="px-3 text-muted">{e.batch?.name ?? "—"}</td><td className="px-3"><StatusBadge value={e.status} /></td>
            <td className="px-5 text-right"><Link className="btn-ghost" to={`/mentor/enrollment/${e.id}`}>Open</Link></td></tr>)}</tbody></table></div>}
    </Panel>

    <div className="grid lg:grid-cols-5 gap-6 items-start">
      <div id="submissions" className="lg:col-span-3 scroll-mt-20"><Panel title="Submissions" aside={<span className="text-xs text-muted">{pendingTotal > pending.length ? `${pendingTotal} pending (showing the oldest ${pending.length})` : `${pendingTotal} pending`}</span>}>
        {!ordered.length ? <EmptyState title="No submissions yet." hint="Student work appears here as soon as it is submitted." /> : <ul className="divide-y divide-hairline -my-3">{ordered.map(s => <li key={s.id} className="py-4 text-sm">
          <div className="flex items-start justify-between gap-2"><p><b className="text-ink">{s.enrollment?.student?.full_name}</b> <span className="text-muted">— {s.assignment?.title}</span></p><StatusBadge value={s.status} /></div>
          {s.text_response && <p className="whitespace-pre-wrap mt-2">{s.text_response}</p>}
          {s.link_url && <a className="underline text-brand-dark break-all" href={s.link_url} target="_blank" rel="noopener noreferrer">{s.link_url}</a>}
          {s.status === "submitted" && <div className="flex flex-wrap gap-2 mt-3"><input aria-label="Score" className="inp max-w-[100px]" type="number" min={0} max={100} placeholder="Score" onChange={e => setG({ ...g, [s.id]: { score: e.target.value, feedback: g[s.id]?.feedback ?? "" } })} />
            <input aria-label="Feedback" className="inp flex-1 min-w-[160px]" placeholder="Feedback" onChange={e => setG({ ...g, [s.id]: { score: g[s.id]?.score ?? "", feedback: e.target.value } })} /><button className="btn" onClick={() => grade(s)}>Grade</button></div>}
          {s.status === "graded" && <p className="text-green-700 mt-2">Score {s.score}{s.feedback && ` — ${s.feedback}`}</p>}</li>)}</ul>}
      </Panel></div>

      <div className="lg:col-span-2 flex flex-col gap-6 [&>*]:!m-0">
        <Panel title="Take attendance">
          <select aria-label="Session" className="inp mb-3" value={sid} onChange={e => setSid(e.target.value)}><option value="">Select session…</option>{sessions.map(s => <option key={s.id} value={s.id}>{s.session_date} · {s.title} · {s.course?.title}</option>)}</select>
          {!sid ? <p className="text-sm text-muted">Choose a session to mark who attended.</p> : !roster.length ? <p className="text-sm text-muted">No active students in this course.</p> :
            <ul className="divide-y divide-hairline">{roster.map(e => { const a = att.find(x => x.enrollment_id === e.id); return <li key={e.id} className="flex flex-wrap gap-2 items-center text-sm py-2"><span className="flex-1 min-w-[120px] font-medium text-ink">{e.student.full_name}</span>
              <span className="text-xs text-muted">{a ? (a.present ? "✓ present" : "✗ absent") : "—"}</span><button className="btn-ghost" onClick={() => mark(e.id, true)}>Present</button><button className="btn-ghost" onClick={() => mark(e.id, false)}>Absent</button></li>; })}</ul>}
        </Panel>
        <Notifications />
      </div>
    </div>
    <Sessions courses={courses.map(([id, title]) => ({ id, title }))} />
  </div>;
}
