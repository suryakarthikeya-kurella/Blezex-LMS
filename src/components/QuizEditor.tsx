import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ConfirmActionDialog, Field, Panel, StatusBadge, useBusy, useToast } from "./admin/kit";
type QF = { prompt: string; options: string; correct: string };
const EMPTY: QF = { prompt: "", options: "", correct: "1" };
export default function QuizEditor({ courseId }: { courseId: string }) {
  const toast = useToast();
  const [qs, setQs] = useState<any[]>([]); const [busy, guard] = useBusy(); const [f, setF] = useState({ title: "", pass_pct: 60, max_attempts: 3 });
  const [qf, setQf] = useState<Record<string, QF>>({}); const [del, setDel] = useState<any>(null);
  const get = (id: string) => qf[id] ?? EMPTY; const setQ = (id: string, p: Partial<QF>) => setQf(s => ({ ...s, [id]: { ...EMPTY, ...s[id], ...p } }));
  const load = useCallback(async () => setQs((await supabase.from("quizzes").select("*, quiz_questions(id,prompt,options,position)").eq("course_id", courseId)).data ?? []), [courseId]);
  useEffect(() => { load(); }, [load]);
  const addQuiz = async () => {
    if (!f.title.trim()) return toast("err", "Quiz title is required.");
    await guard(async () => { const { error } = await supabase.from("quizzes").insert({ course_id: courseId, ...f, title: f.title.trim() });
      if (error) return toast("err", error.message); toast("ok", "Quiz created as a draft."); setF({ ...f, title: "" }); load(); });
  };
  const addQ = async (quizId: string) => {
    const v = get(quizId); const opts = v.options.split("\n").map(x => x.trim()).filter(Boolean); const n = Number(v.correct);
    if (!v.prompt.trim() || opts.length < 2) return toast("err", "A question needs text and at least 2 options (one per line).");
    if (!Number.isInteger(n) || n < 1 || n > opts.length) return toast("err", `Correct option must be a number from 1 to ${opts.length}.`);
    // question + private answer key are created in ONE database call, so a question can never exist without its key
    await guard(async () => { const { error } = await supabase.rpc("add_quiz_question", { qid: quizId, p_prompt: v.prompt, p_options: opts, p_correct: n - 1 });
      if (error) return toast("err", error.message); toast("ok", "Question added (answer key stored privately)."); setQf({ ...qf, [quizId]: EMPTY }); load(); });
  };
  const toggle = async (z: any) => {
    const next = z.status === "published" ? "draft" : "published";
    if (next === "published" && !(z.quiz_questions ?? []).length) return toast("err", "Add at least one question before publishing.");
    const { error } = await supabase.from("quizzes").update({ status: next }).eq("id", z.id); toast(error ? "err" : "ok", error?.message ?? `Quiz ${next === "published" ? "published" : "unpublished"}.`); load();
  };
  return <Panel title="Quizzes">
    <form className="grid md:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end mb-4" onSubmit={e => { e.preventDefault(); addQuiz(); }}>
      <Field label="Quiz title" htmlFor="qz-title" required><input id="qz-title" className="inp" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} /></Field>
      <Field label="Pass %" htmlFor="qz-pass"><input id="qz-pass" type="number" min={1} max={100} className="inp" value={f.pass_pct} onChange={e => setF({ ...f, pass_pct: Number(e.target.value) })} /></Field>
      <Field label="Max attempts" htmlFor="qz-att"><input id="qz-att" type="number" min={1} className="inp" value={f.max_attempts} onChange={e => setF({ ...f, max_attempts: Number(e.target.value) })} /></Field>
      <button className="btn" disabled={busy}>Create quiz</button></form>
    {!qs.length && <p className="text-sm text-muted">No quizzes yet.</p>}
    {qs.map(z => { const qsorted = [...(z.quiz_questions ?? [])].sort((a: any, b: any) => a.position - b.position); return <div key={z.id} className="border-t border-hairline py-4">
      <div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-ink">{z.title}</p><StatusBadge value={z.status} /><span className="text-xs text-muted">pass {z.pass_pct}% · {z.max_attempts} attempts</span>
        <button className="underline text-xs ml-auto" onClick={() => toggle(z)}>{z.status === "published" ? "Unpublish" : "Publish"}</button></div>
      <ol className="list-decimal pl-6 text-sm mt-2">{qsorted.map((x: any) => <li key={x.id} className="py-0.5">{x.prompt} <span className="text-muted">[{(x.options as string[]).length} options]</span> <button className="underline text-xs text-red-700" onClick={() => setDel(x)}>delete</button></li>)}</ol>
      <form className="grid md:grid-cols-[1fr_1fr_110px_auto] gap-3 items-end mt-3" onSubmit={e => { e.preventDefault(); addQ(z.id); }}>
        <Field label="Question" htmlFor={`q-${z.id}`}><input id={`q-${z.id}`} className="inp" value={get(z.id).prompt} onChange={e => setQ(z.id, { prompt: e.target.value })} /></Field>
        <Field label="Options (one per line)" htmlFor={`o-${z.id}`}><textarea id={`o-${z.id}`} rows={3} className="inp" value={get(z.id).options} onChange={e => setQ(z.id, { options: e.target.value })} /></Field>
        <Field label="Correct #" htmlFor={`c-${z.id}`} hint="1 = first"><input id={`c-${z.id}`} type="number" min={1} className="inp" value={get(z.id).correct} onChange={e => setQ(z.id, { correct: e.target.value })} /></Field>
        <button className="btn-ghost" disabled={busy}>Add question</button></form></div>; })}
    <ConfirmActionDialog open={!!del} onClose={() => setDel(null)} danger title="Delete this question?" confirmLabel="Delete question"
      onConfirm={async () => { const { error } = await supabase.from("quiz_questions").delete().eq("id", del.id); if (error) return error.message; toast("ok", "Question deleted."); load(); return null; }}>
      <p>{del?.prompt}</p><p className="text-muted">Existing attempt scores are kept; future attempts are scored without this question.</p></ConfirmActionDialog>
  </Panel>;
}
