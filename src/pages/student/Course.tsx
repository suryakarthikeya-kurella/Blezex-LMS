import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sanitizeHtml } from "../../lib/sanitize";
import { submissionSchema } from "../../lib/schemas";
import { fmtDay } from "../../lib/format";
import QuizPanel from "../../components/QuizPanel";
import MilestonesPanel from "../../components/MilestonesPanel";
import { supabase } from "../../lib/supabase";
import { EmptyState, Field, LoadingState, PageHeader, Panel, StatusBadge, useToast } from "../../components/admin/kit";
export default function StudentCourse() {
  const { eid } = useParams(); const toast = useToast();
  const [e, setE] = useState<any>(null); const [loaded, setLoaded] = useState(false); const [mods, setMods] = useState<any[]>([]);
  const [done, setDone] = useState<Set<string>>(new Set()); const [cur, setCur] = useState(""); const [html, setHtml] = useState<Record<string, string>>({});
  const [asg, setAsg] = useState<any[]>([]); const [subs, setSubs] = useState<any[]>([]); const [evals, setEvals] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, { t: string; l: string }>>({}); const [busy, setBusy] = useState(""); const lock = useRef(false);
  const loadSubs = useCallback(async () => setSubs((await supabase.from("submissions").select("*").eq("enrollment_id", eid!)).data ?? []), [eid]);
  const load = useCallback(async () => {
    const { data: en } = await supabase.from("enrollments").select("id,status,course_id,course:courses(title)").eq("id", eid!).maybeSingle(); setE(en); setLoaded(true); if (!en) return;
    // lesson bodies are NOT loaded here: only the open lesson's HTML is fetched (below), so opening a course stays light
    const [m, p, a, s, v] = await Promise.all([
      supabase.from("modules").select("id,title,position,lessons(id,title,position,status)").eq("course_id", en.course_id).order("position"),
      supabase.from("lesson_progress").select("lesson_id").eq("enrollment_id", eid!), supabase.from("assignments").select("*").eq("course_id", en.course_id),
      supabase.from("submissions").select("*").eq("enrollment_id", eid!), supabase.from("evaluations").select("*").eq("enrollment_id", eid!).order("created_at", { ascending: false })]);
    setMods(m.data ?? []); const ds = new Set((p.data ?? []).map((x: any) => x.lesson_id)); setDone(ds); setAsg(a.data ?? []); setSubs(s.data ?? []); setEvals(v.data ?? []);
    const all = (m.data ?? []).flatMap((x: any) => [...(x.lessons ?? [])].sort((a: any, b: any) => a.position - b.position));
    setCur(c => c || (all.find((l: any) => !ds.has(l.id)) ?? all[0])?.id || "");
  }, [eid]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (!cur || html[cur] !== undefined) return; let live = true;
    supabase.from("lessons").select("content_html").eq("id", cur).maybeSingle().then(({ data }) => { if (live) setHtml(h => ({ ...h, [cur]: data?.content_html ?? "" })); });
    return () => { live = false; }; }, [cur, html]);
  const flat = mods.flatMap(m => [...(m.lessons ?? [])].sort((a: any, b: any) => a.position - b.position)); const idx = flat.findIndex(l => l.id === cur); const lesson = flat[idx];
  const toggle = async () => {
    if (lock.current) return; lock.current = true; setBusy("lesson"); const was = done.has(cur);
    const { error } = was ? await supabase.from("lesson_progress").delete().eq("enrollment_id", eid!).eq("lesson_id", cur) : await supabase.from("lesson_progress").insert({ enrollment_id: eid, lesson_id: cur });
    lock.current = false; setBusy(""); if (error) return toast("err", error.message);
    setDone(d => { const n = new Set(d); if (was) n.delete(cur); else n.add(cur); return n; }); // local update: no full reload
  };
  const submit = async (a: any) => {
    if (lock.current) return; const ex = subs.find(s => s.assignment_id === a.id);
    const f = { t: form[a.id]?.t ?? ex?.text_response ?? "", l: form[a.id]?.l ?? ex?.link_url ?? "" };
    const ok = submissionSchema.safeParse({ text: f.t, link: f.l }); if (!ok.success) return toast("err", ok.error.issues[0].message);
    const row = { text_response: f.t || null, link_url: f.l || null }; lock.current = true; setBusy(a.id);
    const { error } = ex ? await supabase.from("submissions").update(row).eq("id", ex.id) : await supabase.from("submissions").insert({ ...row, assignment_id: a.id, enrollment_id: eid });
    lock.current = false; setBusy(""); if (error) return toast("err", error.code === "23505" ? "This assignment was already submitted. Refresh to see it." : error.message);
    toast("ok", ex ? "Submission updated." : "Submitted."); loadSubs();
  };
  const back = <Link to="/student" className="text-sm font-semibold text-brand-dark hover:underline">← My learning</Link>;
  if (!loaded) return <LoadingState />;
  if (!e) return <><div className="mb-4">{back}</div><div className="bg-white border border-hairline rounded-[20px]"><EmptyState title="Course not available" hint="It doesn't exist or you don't have access to it." /></div></>;
  const open = e.status === "active" || e.status === "completed";
  return <>
    <div className="mb-3">{back}</div>
    <PageHeader title={e.course.title} actions={<StatusBadge value={e.status} />} description={e.status === "completed" ? "Completed: this course is now read-only." : e.status === "active" ? undefined : "Your access to this course is not active right now."} />
    {!open ? <div className="bg-white border border-hairline rounded-[20px]"><EmptyState title={`Access ${e.status}`} hint="Contact your administrator to restore access." /></div> :
    <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
      <Panel title="Lessons" className="lg:sticky lg:top-20"><nav aria-label="Lessons">{!flat.length ? <p className="text-sm text-muted">No published lessons yet.</p> : mods.map(m => <div key={m.id} className="mb-3 last:mb-0"><p className="font-semibold text-sm text-ink mb-1">{m.title}</p>
        {[...(m.lessons ?? [])].sort((a: any, b: any) => a.position - b.position).map((l: any) => <button key={l.id} onClick={() => setCur(l.id)} aria-current={cur === l.id ? "true" : undefined} className={`block w-full text-left text-sm px-2.5 py-1.5 rounded-lg ${cur === l.id ? "bg-ink text-white" : "hover:bg-paper"}`}><span aria-hidden="true">{done.has(l.id) ? "✓ " : "○ "}</span><span className="sr-only">{done.has(l.id) ? "Completed: " : "Not completed: "}</span>{l.title}</button>)}</div>)}</nav></Panel>
      <div className="space-y-6 min-w-0">
        {lesson && <Panel title={lesson.title}>
          {html[cur] === undefined ? <LoadingState label="Loading lesson…" /> : <div className="lesson" dangerouslySetInnerHTML={{ __html: sanitizeHtml(html[cur]) }} />}
          <div className="flex gap-2 mt-5 flex-wrap"><button className="btn-ghost" disabled={idx <= 0} onClick={() => setCur(flat[idx - 1].id)}>← Previous</button>
            {e.status === "active" && <button className="btn" disabled={!!busy} onClick={toggle}>{done.has(cur) ? "Mark incomplete" : "Mark complete"}</button>}
            <button className="btn-ghost" disabled={idx >= flat.length - 1} onClick={() => setCur(flat[idx + 1].id)}>Next →</button></div></Panel>}
        <Panel title="Assignments">{!asg.length ? <p className="text-sm text-muted">No assignments for this course.</p> : <div className="divide-y divide-hairline -my-4">{asg.map(a => { const s = subs.find(x => x.assignment_id === a.id); const locked = s?.status === "graded" || e.status !== "active"; return (
          <div key={a.id} className="py-4 text-sm"><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-ink">{a.title}</p>{a.due_date && <span className="text-xs text-muted tabular-nums">due {fmtDay(a.due_date)}</span>}{s && <StatusBadge value={s.status} />}</div>
            {a.instructions && <p className="mt-1 whitespace-pre-wrap">{a.instructions}</p>}
            {s?.status === "graded" && <p className="text-green-700 mt-2 tabular-nums">Score {s.score}{s.feedback && ` — ${s.feedback}`}</p>}
            {!locked && <div className="space-y-3 mt-3">
              <Field label="Your response" htmlFor={`t-${a.id}`}><textarea id={`t-${a.id}`} className="inp" rows={3} defaultValue={s?.text_response ?? ""} onChange={ev => setForm({ ...form, [a.id]: { t: ev.target.value, l: form[a.id]?.l ?? s?.link_url ?? "" } })} /></Field>
              <Field label="Project link" htmlFor={`l-${a.id}`} hint="Must start with https://"><input id={`l-${a.id}`} className="inp" defaultValue={s?.link_url ?? ""} onChange={ev => setForm({ ...form, [a.id]: { t: form[a.id]?.t ?? s?.text_response ?? "", l: ev.target.value } })} /></Field>
              <button className="btn" disabled={!!busy} onClick={() => submit(a)}>{busy === a.id ? "Saving…" : s ? "Resubmit" : "Submit"}</button></div>}</div>); })}</div>}</Panel>
        <QuizPanel courseId={e.course_id} eid={eid!} active={e.status === "active"} />
        <MilestonesPanel eid={eid!} who="student" />
        <Panel title="Mentor evaluations">{!evals.length ? <p className="text-sm text-muted">No evaluations from your mentor yet.</p> : <ul className="divide-y divide-hairline -my-2">{evals.map(x => <li key={x.id} className="py-2.5 text-sm flex flex-wrap gap-x-3 gap-y-1 items-baseline"><span className="font-medium text-ink">{x.criterion}</span><b className="tabular-nums">{x.score}/{x.max_score}</b><span className="text-muted flex-1">{x.remarks}</span><span className="text-xs text-muted tabular-nums">{fmtDay(x.created_at)}</span></li>)}</ul>}</Panel>
      </div></div>}
  </>;
}
