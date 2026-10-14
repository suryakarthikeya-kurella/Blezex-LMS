import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, Msg, Empty } from "./ui";
import Icon from "./Icon";
export default function QuizPanel({ courseId, eid, active, lessonId, targetQuizId, onCompleted }: { courseId: string; eid: string; active: boolean; lessonId?: string; targetQuizId?: string; onCompleted?: () => void }) {
  const [qs, setQs] = useState<any[]>([]); const [att, setAtt] = useState<any[]>([]); const [open, setOpen] = useState(targetQuizId ?? ""); const [ans, setAns] = useState<Record<string, number>>({}); const [msg, setMsg] = useState(""); const [latest, setLatest] = useState<any>(null);
  const load = async () => {
    let quizzes: any[] = [];
    if (lessonId) {
      const res = await supabase.from("quizzes").select("*, quiz_questions(id,prompt,options,position)").eq("course_id", courseId).eq("status", "published").eq("lesson_id", lessonId);
      if (!res.error && res.data && res.data.length > 0) {
        quizzes = res.data;
      } else {
        const fallback = await supabase.from("quizzes").select("*, quiz_questions(id,prompt,options,position)").eq("course_id", courseId).eq("status", "published");
        quizzes = fallback.data ?? [];
      }
    } else {
      const res = await supabase.from("quizzes").select("*, quiz_questions(id,prompt,options,position)").eq("course_id", courseId).eq("status", "published");
      if (res.error) { setMsg(res.error.message); return; }
      quizzes = res.data ?? [];
    }
    if (targetQuizId) {
      const match = quizzes.find(item => item.id === targetQuizId);
      if (match) setOpen(targetQuizId);
    }
    setQs(quizzes);
    const { data: attempts, error: attemptsError } = await supabase.from("quiz_attempts").select("*").eq("enrollment_id", eid).order("created_at", { ascending: false });
    if (attemptsError) { setMsg(attemptsError.message); return; }
    const attemptRows = attempts ?? [];
    const quizAttempts = attemptRows.filter(attempt => quizzes.some(quiz => quiz.id === attempt.quiz_id));
    setAtt(quizAttempts);
    const mostRecent = quizAttempts[0];
    const quiz = quizzes.find(item => item.id === mostRecent?.quiz_id);
    setLatest(mostRecent && quiz ? {
      ...mostRecent,
      attempts_used: quizAttempts.filter(attempt => attempt.quiz_id === quiz.id).length,
      attempts_max: quiz.max_attempts,
    } : null);
  };
  useEffect(() => { setQs([]); setAtt([]); setLatest(null); setOpen(targetQuizId ?? ""); setAns({}); load(); }, [courseId, eid, lessonId, targetQuizId]);
  const submit = async (z: any) => {
    if (Object.keys(ans).length < (z.quiz_questions ?? []).length) return setMsg("Answer every question.");
    const { data, error } = await supabase.rpc("submit_quiz", { qid: z.id, eid, answers: ans });
    if (error) return setMsg(error.message);
    if (!data?.length) return setMsg("The quiz was submitted, but no result was returned. Refresh the page to check your attempt history.");
    setMsg("");
    setOpen("");
    setAns({});
    await load();
    onCompleted?.();
  };
  return <Card className="!rounded-2xl !border-slate-200 !shadow-sm"><h2 className="mb-2 flex items-center gap-2 font-display font-bold text-slate-900"><Icon name="quiz" size={18} />{lessonId ? "Lesson knowledge check" : "Quizzes"}</h2><Msg m={msg} />
    {latest && <div role="status" className={`my-4 rounded-2xl border p-4 ${latest.passed ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
      <div className="flex items-start gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${latest.passed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}><Icon name={latest.passed ? "check" : "target"} size={18} /></span><div><p className="font-display font-extrabold">{latest.passed ? "Quiz passed!" : "Keep practicing"}</p><p className="mt-1 text-sm">Your score: <b>{latest.score_pct}%</b> · Passing score: {qs.find(quiz => quiz.id === latest.quiz_id)?.pass_pct ?? "—"}%</p><p className="mt-1 text-xs">Attempt {latest.attempts_used} of {latest.attempts_max}</p></div></div>
    </div>}
    {!qs.length ? <Empty t={lessonId ? "This lesson quiz is being prepared. Please check back soon." : "No quizzes yet."} /> : qs.map(z => {
    const mine = att.filter(a => a.quiz_id === z.id); const best = mine.length ? Math.max(...mine.map(a => Number(a.score_pct))) : null;
    const questions = [...(z.quiz_questions ?? [])].sort((a: any, b: any) => a.position - b.position);
    const previousBest = best !== null ? best : latest?.quiz_id === z.id ? Number(latest.score_pct) : null;
    return <div key={z.id} className="border-t border-hairline py-3 text-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-bold">{z.title}</p><p className="mt-1 text-xs text-muted">{questions.length} questions · pass {z.pass_pct}% · {z.max_attempts - mine.length} attempts left{previousBest !== null && ` · best ${previousBest}%`}</p></div>{lessonId && <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700">Lesson quiz</span>}</div>
      {open === z.id ? <div className="mt-2 space-y-3">{[...(z.quiz_questions ?? [])].sort((a: any, b: any) => a.position - b.position).map((q: any, i: number) => <fieldset key={q.id}><legend className="font-medium">{i + 1}. {q.prompt}</legend>
        {(q.options as string[]).map((o, k) => <label key={k} className={`mt-2 flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2.5 transition ${ans[q.id] === k ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}><input className="mt-1 accent-blue-700" type="radio" name={q.id} checked={ans[q.id] === k} onChange={() => setAns({ ...ans, [q.id]: k })} /><span>{o}</span></label>)}</fieldset>)}
        <button className="btn inline-flex items-center gap-2" onClick={() => submit(z)}><Icon name="check" size={16} />Submit quiz</button></div>
        : active && mine.length < z.max_attempts && <button className="btn-ghost mt-3 inline-flex items-center gap-2" onClick={() => { setLatest(null); setOpen(z.id); setAns({}); }}><Icon name="quiz" size={15} />{mine.length ? "Try again" : "Start quiz"}</button>}
      {mine.length > 0 && <details className="mt-3 rounded-xl bg-slate-50 px-3 py-2"><summary className="cursor-pointer text-xs font-bold text-slate-600">Attempt history ({mine.length})</summary><ol className="mt-2 space-y-2">{mine.map((attempt, index) => <li key={attempt.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 py-2 text-xs"><span>Attempt {mine.length - index} · {new Date(attempt.created_at).toLocaleString()}</span><span className={`font-bold ${attempt.passed ? "text-emerald-700" : "text-amber-700"}`}>{attempt.score_pct}% · {attempt.passed ? "Passed" : "Not passed"}</span></li>)}</ol></details>}</div>; })}</Card>;
}
