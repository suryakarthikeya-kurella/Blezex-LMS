import { FormEvent, useEffect, useState } from "react";
import { submissionSchema } from "../lib/schemas";
import { supabase } from "../lib/supabase";
import Icon from "./Icon";
import { Card, Empty, Msg } from "./ui";

export default function LessonAssignments({ lessonId, enrollmentId, active, courseId, targetAssignmentId, onSubmitted, titleLabel }: { lessonId?: string; enrollmentId: string; active: boolean; courseId?: string; targetAssignmentId?: string; onSubmitted?: () => void; titleLabel?: string }) {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, { text: string; link: string }>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      let assignmentRows: any[] = [];
      if (lessonId) {
        const res = await supabase.from("assignments").select("id,title,instructions,due_date,lesson_id").eq("lesson_id", lessonId);
        if (!res.error && res.data && res.data.length > 0) {
          assignmentRows = res.data;
        } else {
          const fallback = courseId
            ? await supabase.from("assignments").select("id,title,instructions,due_date").eq("course_id", courseId)
            : await supabase.from("assignments").select("id,title,instructions,due_date");
          assignmentRows = fallback.data ?? [];
        }
      } else if (courseId) {
        const res = await supabase.from("assignments").select("id,title,instructions,due_date").eq("course_id", courseId);
        assignmentRows = res.data ?? [];
      } else {
        const res = await supabase.from("assignments").select("id,title,instructions,due_date");
        assignmentRows = res.data ?? [];
      }
      if (targetAssignmentId) {
        assignmentRows = assignmentRows.filter(item => item.id === targetAssignmentId);
      }
      const { data: submissionRows, error: submissionError } = await supabase.from("submissions")
        .select("id,assignment_id,status,score,feedback,text_response,link_url,created_at")
        .eq("enrollment_id", enrollmentId);
      if (submissionError) {
        if (!cancelled) {
          setError(submissionError.message);
          setLoading(false);
        }
        return;
      }
      if (!cancelled) {
        const assignmentIds = new Set(assignmentRows.map(item => item.id));
        setAssignments(assignmentRows);
        setSubmissions((submissionRows ?? []).filter(item => assignmentIds.has(item.assignment_id)));
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [lessonId, enrollmentId, courseId, targetAssignmentId]);

  const submit = async (event: FormEvent<HTMLFormElement>, assignment: any) => {
    event.preventDefault();
    const answer = answers[assignment.id] ?? { text: "", link: "" };
    const parsed = submissionSchema.safeParse(answer);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0].message);
      return;
    }
    setSaving(assignment.id);
    setMessage("");
    const current = submissions.find(item => item.assignment_id === assignment.id);
    const payload = { text_response: answer.text.trim() || null, link_url: answer.link.trim() || null };
    const result = current
      ? await supabase.from("submissions").update(payload).eq("id", current.id)
      : await supabase.from("submissions").insert({ ...payload, assignment_id: assignment.id, enrollment_id: enrollmentId });
    if (result.error) {
      setMessage(result.error.message);
      setSaving("");
      return;
    }
    const { data, error: reloadError } = await supabase.from("submissions").select("id,assignment_id,status,score,feedback,text_response,link_url,created_at").eq("enrollment_id", enrollmentId);
    if (reloadError) setMessage(`Submitted, but could not refresh your submission: ${reloadError.message}`);
    else {
      const ids = new Set(assignments.map(item => item.id));
      setSubmissions((data ?? []).filter(item => ids.has(item.assignment_id)));
      setMessage("Practice submitted. You can review its status here.");
      onSubmitted?.();
    }
    setSaving("");
  };

  return <Card className="!rounded-2xl !border-slate-200 !shadow-sm">
    <div className="mb-3"><p className="text-xs font-bold uppercase tracking-[.14em] text-orange-600">Practice what you learned</p><h2 className="mt-1 flex items-center gap-2 font-display text-xl font-bold text-slate-900"><Icon name="assignment" size={19} />{titleLabel ?? (lessonId ? "Lesson assignment" : "Course assessments")}</h2></div>
    <Msg m={message} />
    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">Could not load this lesson's assignment: {error}</p>}
    {loading ? <p className="py-5 text-center text-sm text-slate-500">Loading lesson practice…</p> : !error && !assignments.length ? <Empty t="Practice for this lesson is being prepared." /> : <div className="divide-y divide-slate-100">
      {assignments.map(assignment => {
        const submission = submissions.find(item => item.assignment_id === assignment.id);
        const answer = answers[assignment.id] ?? { text: submission?.text_response ?? "", link: submission?.link_url ?? "" };
        const graded = submission?.status === "graded";
        return <section key={assignment.id} className="py-5 first:pt-2 last:pb-0">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold text-slate-900">{assignment.title}</h3>{assignment.due_date && <p className="mt-1 text-xs text-orange-700">Due {assignment.due_date}</p>}</div>{submission && <span className={`rounded-full px-3 py-1 text-xs font-bold ${graded ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{graded ? "Graded" : "Submitted"}</span>}</div>
          {assignment.instructions && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{assignment.instructions}</p>}
          {graded && <div className="mt-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-950"><p className="font-bold">Score: {submission.score ?? "—"}</p>{submission.feedback && <p className="mt-1 leading-6">{submission.feedback}</p>}</div>}
          {!graded && <form className="mt-4 space-y-3" onSubmit={event => submit(event, assignment)}>
            <label className="block text-xs font-semibold text-slate-600">Your answer<textarea className="inp mt-1.5 !min-h-24 !rounded-xl" value={answer.text} onChange={event => setAnswers(current => ({ ...current, [assignment.id]: { ...answer, text: event.target.value } }))} placeholder="Explain your solution or paste your code…" /></label>
            <label className="block text-xs font-semibold text-slate-600">Project link <input className="inp mt-1.5 !rounded-xl" type="url" value={answer.link} onChange={event => setAnswers(current => ({ ...current, [assignment.id]: { ...answer, link: event.target.value } }))} placeholder="https://…" /></label>
            <button type="submit" disabled={!active || saving === assignment.id} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"><Icon name={saving === assignment.id ? "clock" : "arrow"} size={15} />{saving === assignment.id ? "Submitting…" : submission ? "Resubmit practice" : "Submit practice"}</button>
          </form>}
        </section>;
      })}
    </div>}
  </Card>;
}
