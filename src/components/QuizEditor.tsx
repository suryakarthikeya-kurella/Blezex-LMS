import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, Msg } from "./ui";
export default function QuizEditor({ courseId }: { courseId: string }) {
  const [qs, setQs] = useState<any[]>([]); const [msg, setMsg] = useState(""); const [f, setF] = useState({ title: "", pass_pct: 60, max_attempts: 3 });
  const [qf, setQf] = useState<Record<string, { prompt: string; options: string; correct: number }>>({});
  const setQ = (id: string, patch: Partial<{ prompt: string; options: string; correct: number }>) => setQf(s => ({ ...s, [id]: { ...({ prompt: "", options: "", correct: 0 }), ...s[id], ...patch } }));
  const load = async () => setQs((await supabase.from("quizzes").select("*, quiz_questions(id,prompt,options,position)").eq("course_id", courseId)).data ?? []);
  useEffect(() => { load(); }, [courseId]);
  const addQuiz = async () => { if (!f.title) return setMsg("Title required."); const { error } = await supabase.from("quizzes").insert({ course_id: courseId, ...f }); setMsg(error?.message ?? "Quiz created."); setF({ ...f, title: "" }); load(); };
  const addQ = async (quizId: string) => {
    const v = qf[quizId]; const opts = (v?.options ?? "").split("\n").map(x => x.trim()).filter(Boolean);
    if (!v?.prompt || opts.length < 2) return setMsg("Question needs a prompt and at least 2 options (one per line).");
    if (v.correct < 0 || v.correct >= opts.length) return setMsg("Correct option number out of range.");
    const { data, error } = await supabase.from("quiz_questions").insert({ quiz_id: quizId, prompt: v.prompt, options: opts, position: 99 }).select("id").single();
    if (error) return setMsg(error.message);
    const k = await supabase.from("quiz_keys").insert({ question_id: data.id, correct_index: v.correct }); setMsg(k.error?.message ?? "Question added (answer key stored privately)."); setQf({ ...qf, [quizId]: { prompt: "", options: "", correct: 0 } }); load();
  };
  const toggle = async (z: any) => { const { error } = await supabase.from("quizzes").update({ status: z.status === "published" ? "draft" : "published" }).eq("id", z.id); setMsg(error?.message ?? ""); load(); };
  const delQ = async (id: string) => { if (confirm("Delete question?")) { await supabase.from("quiz_questions").delete().eq("id", id); load(); } };
  return <Card className="mb-4"><h2 className="font-bold mb-2">Quizzes</h2><Msg m={msg} />
    <div className="grid md:grid-cols-4 gap-2 mb-3"><input aria-label="Quiz title" className="inp" placeholder="Quiz title" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} />
      <label className="text-xs">Pass %<input type="number" min={1} max={100} className="inp" value={f.pass_pct} onChange={e => setF({ ...f, pass_pct: Number(e.target.value) })} /></label>
      <label className="text-xs">Max attempts<input type="number" min={1} className="inp" value={f.max_attempts} onChange={e => setF({ ...f, max_attempts: Number(e.target.value) })} /></label>
      <button className="btn self-end" onClick={addQuiz}>Create quiz</button></div>
    {qs.map(z => <div key={z.id} className="border-t border-hairline py-3"><p className="font-bold">{z.title} <i className="font-normal text-muted">({z.status}, pass {z.pass_pct}%, {z.max_attempts} attempts)</i> <button className="underline text-xs ml-2" onClick={() => toggle(z)}>{z.status === "published" ? "unpublish" : "publish"}</button></p>
      <ol className="list-decimal pl-6 text-sm">{(z.quiz_questions ?? []).map((x: any) => <li key={x.id}>{x.prompt} <span className="text-muted">[{(x.options as string[]).length} options]</span> <button className="underline text-xs" onClick={() => delQ(x.id)}>delete</button></li>)}</ol>
      <div className="grid md:grid-cols-[1fr_1fr_90px_auto] gap-2 mt-2"><input aria-label="Question" className="inp" placeholder="Question" value={qf[z.id]?.prompt ?? ""} onChange={e => setQ(z.id, { prompt: e.target.value })} />
        <textarea aria-label="Options" className="inp" placeholder={"Options, one per line"} value={qf[z.id]?.options ?? ""} onChange={e => setQ(z.id, { options: e.target.value })} />
        <input aria-label="Correct option number (0-based)" type="number" min={0} className="inp" placeholder="Correct #" value={qf[z.id]?.correct ?? 0} onChange={e => setQ(z.id, { correct: Number(e.target.value) })} />
        <button className="btn-ghost" onClick={() => addQ(z.id)}>Add question</button></div><p className="text-xs text-muted">Correct # is 0-based (first option = 0).</p></div>)}</Card>;
}
