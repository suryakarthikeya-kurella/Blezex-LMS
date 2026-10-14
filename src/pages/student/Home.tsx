import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import Notifications from "../../components/Notifications";
import Icon from "../../components/Icon";
import { Card, Empty } from "../../components/ui";

const dateLabel = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });

export default function StudentHome() {
  const { profile } = useAuth();
  const [enr, setEnr] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [prog, setProg] = useState<any[]>([]);
  const [asg, setAsg] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [qa, setQa] = useState<any[]>([]);
  const [ms, setMs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => { (async () => { try {
    const g = async (q: PromiseLike<{ data: any; error: any }>) => { const r = await q; if (r.error) throw r.error; return r.data ?? []; };
    setEnr(await g(supabase.from("enrollments").select("id,status,course_id,course:courses(title),mentor:profiles!enrollments_mentor_id_fkey(full_name),certificates(verification_id,status)")));
    setLessons(await g(supabase.from("lessons").select("id, modules!inner(course_id)").eq("status", "published")));
    setProg(await g(supabase.from("lesson_progress").select("enrollment_id,lesson_id")));
    setAsg(await g(supabase.from("assignments").select("id,title,course_id,due_date")));
    setSubs(await g(supabase.from("submissions").select("assignment_id,enrollment_id,status,score,feedback,created_at").order("created_at", { ascending: false })));
    setQa(await g(supabase.from("quiz_attempts").select("score_pct,passed,created_at,quiz:quizzes(title)").order("created_at", { ascending: false }).limit(5)));
    setMs(await g(supabase.from("project_milestones").select("id,title,status,due_date,enrollment_id").neq("status", "evaluated")));
  } catch (e: any) { setErr(e.message ?? "Network error"); } setLoading(false); })(); }, []);

  const pct = (e: any) => {
    const total = lessons.filter(l => l.modules.course_id === e.course_id).length;
    const done = prog.filter(p => p.enrollment_id === e.id).length;
    return total ? Math.round(100 * done / total) : 0;
  };
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = asg.filter(a => a.due_date && a.due_date >= today && enr.some(e => e.course_id === a.course_id && e.status === "active") && !subs.some(s => s.assignment_id === a.id)).sort((a, b) => a.due_date.localeCompare(b.due_date));
  const feedback = subs.filter(s => s.status === "graded").slice(0, 5);
  const active = enr.filter(e => e.status === "active");
  const overall = enr.length ? Math.round(enr.reduce((sum, e) => sum + pct(e), 0) / enr.length) : 0;

  if (loading) return <div className="grid min-h-[50vh] place-items-center"><p className="text-sm font-medium text-slate-500">Getting your learning space ready…</p></div>;
  if (err) return <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Could not load your data: {err}. Check your connection and reload.</p>;

  return <div className="space-y-8">
    <section className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#17243D] via-[#233B60] to-[#2D5570] px-6 py-8 text-white shadow-lg md:px-10 md:py-10">
      <div aria-hidden="true" className="absolute -right-10 -top-20 -z-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 right-1/4 -z-10 h-64 w-64 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="relative max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-orange-200">{profile?.is_alumni ? "Alumni learning space" : "Your learning space"}</p>
        <h1 className="flex items-center gap-2 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">Welcome back, {profile?.full_name?.split(" ")[0] ?? "learner"} <Icon name="target" size={23} className="text-orange-200" /></h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 md:text-base">Small steps add up. Pick up where you left off and keep building skills that move you forward.</p>
        <Link to="/student/courses" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-orange-50">Explore my courses <Icon name="arrow" size={17} /></Link>
      </div>
      <div aria-hidden="true" className="absolute bottom-8 right-10 hidden h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/5 md:flex"><Icon name="target" size={56} className="text-orange-200/80" /></div>
    </section>

    <section aria-label="Learning overview" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[
        { label: "Enrolled courses", value: enr.length, note: `${active.length} currently active`, icon: "courses" as const, tone: "bg-blue-50 text-blue-700" },
        { label: "Overall progress", value: `${overall}%`, note: "Across your courses", icon: "progress" as const, tone: "bg-emerald-50 text-emerald-700" },
        { label: "Due assignments", value: upcoming.length, note: "Ready for your focus", icon: "assignment" as const, tone: "bg-orange-50 text-orange-700" },
        { label: "Open milestones", value: ms.length, note: "Project checkpoints", icon: "milestone" as const, tone: "bg-violet-50 text-violet-700" },
      ].map(item => <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5">
        <div className="flex items-start justify-between gap-2"><p className="text-xs font-semibold text-slate-500 md:text-sm">{item.label}</p><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${item.tone}`}><Icon name={item.icon} size={18} /></span></div>
        <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900">{item.value}</p><p className="mt-1 text-xs text-slate-500">{item.note}</p>
      </div>)}
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      <Link to="/student/courses" className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon name="courses" /></span><h2 className="mt-4 font-display text-lg font-bold text-slate-900">My courses <span className="text-slate-400">· {enr.length}</span></h2><p className="mt-1 text-sm text-slate-500">Open course materials, activities, and certificate progress.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">Go to courses <Icon name="arrow" size={16} /></span>
      </Link>
      <Link to="/student/journey" className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700"><Icon name="journey" /></span><h2 className="mt-4 font-display text-lg font-bold text-slate-900">My journey</h2><p className="mt-1 text-sm text-slate-500">Celebrate your progress and see your recent learning milestones.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">View journey <Icon name="arrow" size={16} /></span>
      </Link>
    </section>

    <section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
      <Card className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm md:!p-6">
        <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-orange-600">Stay on track</p><h2 className="mt-1 font-display text-xl font-bold text-slate-900">Upcoming assignments</h2></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-700"><Icon name="clock" /></span></div>
        {!upcoming.length ? <Empty t="Nothing due. You're all caught up!" /> : <div className="divide-y divide-slate-100">{upcoming.slice(0, 5).map(a => {
          const course = enr.find(e => e.course_id === a.course_id);
          return <div key={a.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{a.title}</p><p className="mt-1 text-xs text-slate-500">{course?.course?.title ?? "Course assignment"}</p></div>
            <div className="shrink-0 text-right"><p className="text-xs font-bold text-orange-700">Due {dateLabel(a.due_date)}</p>{course && <Link to={`/student/course/${course.id}`} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand">Open course <Icon name="arrow" size={13} /></Link>}</div>
          </div>;
        })}</div>}
      </Card>
      <Card className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm md:!p-6">
        <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-blue-600">Practice & improve</p><h2 className="mt-1 font-display text-xl font-bold text-slate-900">Recent quiz results</h2></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-lg text-blue-700">✎</span></div>
        {!qa.length ? <Empty t="Your quiz attempts will show up here." /> : <div className="divide-y divide-slate-100">{qa.map((q, i) => <div key={`${q.created_at}-${i}`} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{q.quiz?.title ?? "Quiz"}</p><p className="mt-1 text-xs text-slate-500">{q.created_at ? new Date(q.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Recent attempt"}</p></div>
          <div className="flex shrink-0 items-center gap-2"><span className="font-display text-lg font-extrabold text-slate-900">{q.score_pct}%</span><span aria-label={q.passed ? "Passed" : "Not passed"} className={`rounded-full px-2 py-1 text-[10px] font-bold ${q.passed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{q.passed ? "PASSED" : "RETRY"}</span></div>
        </div>)}</div>}
      </Card>
    </section>

    <section className="grid gap-5 xl:grid-cols-2">
      <Card className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm md:!p-6">
        <div className="mb-3"><p className="text-xs font-bold uppercase tracking-[.14em] text-emerald-700">From your mentor</p><h2 className="mt-1 font-display text-xl font-bold text-slate-900">Feedback & grades</h2></div>
        {!feedback.length ? <Empty t="Mentor feedback and graded work will appear here." /> : <div className="divide-y divide-slate-100">{feedback.map((s, i) => <div key={`${s.assignment_id}-${i}`} className="py-3"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-slate-800">Assignment feedback</p><span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">Score {s.score ?? "—"}</span></div><p className="mt-2 text-sm leading-6 text-slate-600">{s.feedback || "Your work has been graded."}</p></div>)}</div>}
      </Card>
      <Card className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm md:!p-6">
        <div className="mb-3"><p className="text-xs font-bold uppercase tracking-[.14em] text-violet-700">Build something real</p><h2 className="mt-1 font-display text-xl font-bold text-slate-900">Project milestones</h2></div>
        {!ms.length ? <Empty t="No open milestones. Your project checkpoints will appear here." /> : <div className="divide-y divide-slate-100">{ms.map(m => <div key={m.id} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{m.title}</p><p className="mt-1 text-xs capitalize text-slate-500">{m.status}</p></div>{m.due_date && <span className="shrink-0 rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">Due {dateLabel(m.due_date)}</span>}</div>)}</div>}
      </Card>
    </section>
    <Notifications />
  </div>;
}
