import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sanitizeHtml } from "../../lib/sanitize";
import QuizEditor from "../../components/QuizEditor";
import Sessions from "../../components/Sessions";
import { supabase } from "../../lib/supabase";
import { ConfirmActionDialog, EmptyState, Field, LoadingState, PageHeader, Panel, StatusBadge, useBusy, useToast } from "../../components/admin/kit";
const clamp = (n: number) => Math.min(100, Math.max(0, Number.isFinite(n) ? n : 0));
export default function CourseEditor() {
  const { id } = useParams(); const toast = useToast();
  const [c, setC] = useState<any>(null); const [mods, setMods] = useState<any[]>([]); const [asg, setAsg] = useState<any[]>([]); const [bat, setBat] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false); const [busy, guard] = useBusy(); const [confirm, setConfirm] = useState<null | { kind: "unpublish" | "lesson"; lesson?: any }>(null);
  const [mt, setMt] = useState(""); const [l, setL] = useState({ module_id: "", title: "", content_html: "<h2>Heading</h2>\n<p>Content…</p>", status: "draft" });
  const [a, setA] = useState({ title: "", instructions: "", due_date: "" }); const [b, setB] = useState({ name: "", start_date: "" });
  const [rules, setRules] = useState({ min_progress_pct: 100, min_attendance_pct: 75, min_assignment_avg: 40 });
  const load = useCallback(async () => {
    const [course, m, as, ba] = await Promise.all([
      supabase.from("courses").select("*").eq("id", id!).single(),
      supabase.from("modules").select("*, lessons(id,title,status,position)").eq("course_id", id!).order("position"),
      supabase.from("assignments").select("*").eq("course_id", id!), supabase.from("batches").select("*").eq("course_id", id!)]);
    setC(course.data); setMods(m.data ?? []); setAsg(as.data ?? []); setBat(ba.data ?? []); setLoaded(true);
  }, [id]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (c) setRules({ min_progress_pct: c.min_progress_pct, min_attendance_pct: c.min_attendance_pct, min_assignment_avg: c.min_assignment_avg }); }, [c?.id]);
  /** Runs one write; reports the real outcome; blocks double submits. Resolves to true on success. */
  const run = async (p: PromiseLike<{ error: any }>, ok = "Saved.") => (await guard(async () => {
    const { error } = await p; toast(error ? "err" : "ok", error ? error.message : ok); if (!error) await load(); return !error;
  })) ?? false;
  if (!loaded) return <LoadingState />;
  if (!c) return <div className="bg-white border border-hairline rounded-[20px]"><EmptyState title="Course not found" action={<Link className="btn-ghost" to="/admin/courses">Back to courses</Link>} /></div>;
  const published = c.status === "published";
  const ordered = (xs: any[]) => [...xs].sort((x, y) => x.position - y.position);
  return <>
    <div className="mb-3"><Link to="/admin/courses" className="text-sm font-semibold text-brand-dark hover:underline">← Courses</Link></div>
    <PageHeader title={c.title} description={c.description || undefined} actions={<StatusBadge value={c.status} />} />
    <div className="space-y-6">
      <Panel title="Publishing"><div className="flex flex-wrap items-center gap-3"><p className="text-sm flex-1 min-w-[220px]">{published ? "Published: enrolled students can open this course." : "Draft: students cannot see this course until it is published."}</p>
        <button className="btn-ghost" disabled={busy} onClick={() => published ? setConfirm({ kind: "unpublish" }) : run(supabase.from("courses").update({ status: "published" }).eq("id", id!), "Course published.")}>{published ? "Unpublish" : "Publish"}</button></div></Panel>

      <Panel title="Completion requirements" aside={<span className="text-xs text-muted">Certificate eligibility</span>}>
        <form className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end" onSubmit={e => { e.preventDefault(); run(supabase.from("courses").update({ min_progress_pct: clamp(rules.min_progress_pct), min_attendance_pct: clamp(rules.min_attendance_pct), min_assignment_avg: clamp(rules.min_assignment_avg) }).eq("id", id!), "Rules saved."); }}>
          {([["min_progress_pct", "Min lesson progress %"], ["min_attendance_pct", "Min attendance %"], ["min_assignment_avg", "Min assignment average (0–100)"]] as const).map(([k, label]) =>
            <Field key={k} label={label} htmlFor={`r-${k}`}><input id={`r-${k}`} type="number" min={0} max={100} className="inp" value={rules[k]} onChange={e => setRules({ ...rules, [k]: Number(e.target.value) })} /></Field>)}
          <button className="btn" disabled={busy}>Save rules</button></form></Panel>

      <Panel title="Modules & lessons">
        <form className="flex flex-wrap gap-2 items-end mb-4" onSubmit={e => { e.preventDefault(); if (!mt.trim()) return toast("err", "Module title is required."); run(supabase.from("modules").insert({ course_id: id, title: mt.trim() }), "Module added.").then(ok => ok && setMt("")); }}>
          <div className="flex-1 min-w-[200px] max-w-sm"><Field label="New module title" htmlFor="mod-title"><input id="mod-title" className="inp" value={mt} onChange={e => setMt(e.target.value)} /></Field></div>
          <button className="btn-ghost" disabled={busy}>Add module</button></form>
        {!mods.length ? <p className="text-sm text-muted">No modules yet.</p> : <div className="space-y-4">{mods.map(m => <div key={m.id}><p className="font-semibold text-ink">{m.title}</p>
          {!(m.lessons ?? []).length ? <p className="text-xs text-muted mt-1">No lessons in this module.</p> : <ul className="mt-1 divide-y divide-hairline text-sm">{ordered(m.lessons).map((x: any) => <li key={x.id} className="py-2 flex flex-wrap items-center gap-2"><span className="flex-1 min-w-[160px]">{x.title}</span><StatusBadge value={x.status} />
            <button className="underline text-xs" disabled={busy} onClick={() => run(supabase.from("lessons").update({ status: x.status === "published" ? "draft" : "published" }).eq("id", x.id), "Lesson updated.")}>{x.status === "published" ? "Unpublish" : "Publish"}</button>
            <button className="underline text-xs text-red-700" disabled={busy} onClick={() => setConfirm({ kind: "lesson", lesson: x })}>Delete</button></li>)}</ul>}</div>)}</div>}</Panel>

      <Panel title="New lesson" aside={<span className="text-xs text-muted">Rich HTML or inline SVG, sanitized on save</span>}>
        <form className="space-y-3" onSubmit={e => { e.preventDefault(); if (!l.module_id) return toast("err", "Choose a module first."); run(supabase.from("lessons").insert({ ...l, content_html: sanitizeHtml(l.content_html) }), "Lesson saved.").then(ok => ok && setL({ ...l, title: "" })); }}>
          <div className="grid md:grid-cols-3 gap-3">
            <Field label="Module" htmlFor="l-mod" required><select id="l-mod" required className="inp" value={l.module_id} onChange={e => setL({ ...l, module_id: e.target.value })}><option value="">Choose…</option>{mods.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}</select></Field>
            <Field label="Lesson title" htmlFor="l-title" required><input id="l-title" required className="inp" value={l.title} onChange={e => setL({ ...l, title: e.target.value })} /></Field>
            <Field label="Status" htmlFor="l-status"><select id="l-status" className="inp" value={l.status} onChange={e => setL({ ...l, status: e.target.value })}><option value="draft">Draft</option><option value="published">Published</option></select></Field></div>
          <Field label="Content (HTML)" htmlFor="l-html"><textarea id="l-html" className="inp font-mono h-40" value={l.content_html} onChange={e => setL({ ...l, content_html: e.target.value })} /></Field>
          <div><p className="text-xs text-muted mb-1">Preview</p><div className="lesson border border-hairline rounded-xl p-3" dangerouslySetInnerHTML={{ __html: sanitizeHtml(l.content_html) }} /></div>
          <button className="btn" disabled={busy}>{busy ? "Saving…" : "Save lesson"}</button></form></Panel>

      <QuizEditor courseId={id!} />
      <Sessions courses={[{ id: id!, title: c.title }]} />

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <Panel title="Assignments">{!asg.length ? <p className="text-sm text-muted mb-3">No assignments yet.</p> : <ul className="text-sm mb-3 divide-y divide-hairline">{asg.map(x => <li key={x.id} className="py-1.5">{x.title}{x.due_date && <span className="text-muted"> · due {x.due_date}</span>}</li>)}</ul>}
          <form className="space-y-3" onSubmit={e => { e.preventDefault(); run(supabase.from("assignments").insert({ course_id: id, title: a.title.trim(), instructions: a.instructions, due_date: a.due_date || null }), "Assignment added. Active students were notified.").then(ok => ok && setA({ title: "", instructions: "", due_date: "" })); }}>
            <Field label="Title" htmlFor="a-title" required><input id="a-title" required className="inp" value={a.title} onChange={e => setA({ ...a, title: e.target.value })} /></Field>
            <Field label="Instructions" htmlFor="a-ins"><textarea id="a-ins" className="inp" value={a.instructions} onChange={e => setA({ ...a, instructions: e.target.value })} /></Field>
            <Field label="Due date" htmlFor="a-due"><input id="a-due" type="date" className="inp" value={a.due_date} onChange={e => setA({ ...a, due_date: e.target.value })} /></Field>
            <button className="btn" disabled={busy}>Add assignment</button></form></Panel>
        <Panel title="Batches">{!bat.length ? <p className="text-sm text-muted mb-3">No batches yet.</p> : <ul className="text-sm mb-3 divide-y divide-hairline">{bat.map(x => <li key={x.id} className="py-1.5">{x.name}{x.start_date && <span className="text-muted"> · starts {x.start_date}</span>}</li>)}</ul>}
          <form className="space-y-3" onSubmit={e => { e.preventDefault(); run(supabase.from("batches").insert({ course_id: id, name: b.name.trim(), start_date: b.start_date || null }), "Batch added.").then(ok => ok && setB({ name: "", start_date: "" })); }}>
            <Field label="Batch name" htmlFor="b-name" required><input id="b-name" required className="inp" value={b.name} onChange={e => setB({ ...b, name: e.target.value })} /></Field>
            <Field label="Start date" htmlFor="b-start"><input id="b-start" type="date" className="inp" value={b.start_date} onChange={e => setB({ ...b, start_date: e.target.value })} /></Field>
            <button className="btn" disabled={busy}>Add batch</button></form></Panel></div>
    </div>

    <ConfirmActionDialog open={confirm?.kind === "unpublish"} onClose={() => setConfirm(null)} danger title="Unpublish this course?" confirmLabel="Unpublish"
      onConfirm={async () => { const { error } = await supabase.from("courses").update({ status: "draft" }).eq("id", id!); if (error) return error.message; toast("ok", "Course unpublished."); await load(); return null; }}>
      <p><b>{c.title}</b> will immediately disappear for every enrolled student until it is published again.</p><p className="text-muted">Enrollments, progress and submissions are kept.</p></ConfirmActionDialog>
    <ConfirmActionDialog open={confirm?.kind === "lesson"} onClose={() => setConfirm(null)} danger title="Delete this lesson?" confirmLabel="Delete lesson"
      onConfirm={async () => { const { error } = await supabase.from("lessons").delete().eq("id", confirm!.lesson.id); if (error) return error.message; toast("ok", "Lesson deleted."); await load(); return null; }}>
      <p><b>{confirm?.lesson?.title}</b> will be permanently deleted.</p><p className="text-muted">Students' completion marks for this lesson are deleted with it, which lowers their progress percentage. To hide it instead, unpublish it.</p></ConfirmActionDialog>
  </>;
}
