import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, Msg, Empty } from "./ui";
export default function QuizPanel({ courseId, eid, active }: { courseId: string; eid: string; active: boolean }) {
  const [qs, setQs] = useState<any[]>([]); const [att, setAtt] = useState<any[]>([]); const [open, setOpen] = useState(""); const [ans, setAns] = useState<Record<string, number>>({}); const [msg, setMsg] = useState("");
  const load = async () => {
    setQs((await supabase.from("quizzes").select("*, quiz_questions(id,prompt,options,position)").eq("course_id", courseId).eq("status", "published")).data ?? []);
    setAtt((await supabase.from("quiz_attempts").select("*").eq("enrollment_id", eid).order("created_at", { ascending: false })).data ?? []);
  };
  useEffect(() => { load(); }, [courseId, eid]);
  const submit = async (z: any) => {
    if (Object.keys(ans).length < (z.quiz_questions ?? []).length) return setMsg("Answer every question.");
    const { data, error } = await supabase.rpc("submit_quiz", { qid: z.id, eid, answers: ans });
    if (error) return setMsg(error.message); const r = data[0];
    setMsg(`Score ${r.score_pct}% — ${r.passed ? "PASSED" : "not passed"} (attempt ${r.attempts_used}/${r.attempts_max})`); setOpen(""); setAns({}); load();
  };
  return <Card className="mb-4"><h2 className="font-bold mb-2">Quizzes</h2><Msg m={msg} />{!qs.length ? <Empty t="No quizzes yet." /> : qs.map(z => {
    const mine = att.filter(a => a.quiz_id === z.id); const best = mine.length ? Math.max(...mine.map(a => Number(a.score_pct))) : null;
    return <div key={z.id} className="border-t border-hairline py-3 text-sm"><p className="font-bold">{z.title} <span className="font-normal text-muted">· pass {z.pass_pct}% · attempts {mine.length}/{z.max_attempts}{best !== null && ` · best ${best}%`}</span></p>
      {open === z.id ? <div className="mt-2 space-y-3">{[...(z.quiz_questions ?? [])].sort((a: any, b: any) => a.position - b.position).map((q: any, i: number) => <fieldset key={q.id}><legend className="font-medium">{i + 1}. {q.prompt}</legend>
        {(q.options as string[]).map((o, k) => <label key={k} className="block"><input type="radio" name={q.id} checked={ans[q.id] === k} onChange={() => setAns({ ...ans, [q.id]: k })} /> {o}</label>)}</fieldset>)}
        <button className="btn" onClick={() => submit(z)}>Submit quiz</button></div>
        : active && mine.length < z.max_attempts && <button className="btn-ghost mt-2" onClick={() => { setOpen(z.id); setAns({}); }}>Take quiz</button>}</div>; })}</Card>;
}
