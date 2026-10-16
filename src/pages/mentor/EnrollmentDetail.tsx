import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { fmtDay } from "../../lib/format";
import MilestonesPanel from "../../components/MilestonesPanel";
import { EmptyState, Field, LoadingState, MetricCard, PageHeader, Panel, StatusBadge, useBusy, useToast } from "../../components/admin/kit";
const EMPTY = { criterion: "", score: "", max_score: "10", remarks: "" };
export default function EnrollmentDetail() {
  const { eid } = useParams(); const toast = useToast();
  const [e, setE] = useState<any>(null); const [el, setEl] = useState<any>(null); const [att, setAtt] = useState<any[]>([]); const [qa, setQa] = useState<any[]>([]); const [ev, setEv] = useState<any[]>([]);
  const [f, setF] = useState(EMPTY); const [loaded, setLoaded] = useState(false); const [saving, guard] = useBusy();
  const load = useCallback(async () => {
    const [en, elig, at, qz, evs] = await Promise.all([
      supabase.from("enrollments").select("id,status,course:courses(title),student:profiles!enrollments_student_id_fkey(full_name,email)").eq("id", eid!).maybeSingle(),
      supabase.rpc("enrollment_eligibility", { eid }),
      supabase.from("attendance").select("session_date,present").eq("enrollment_id", eid!).order("session_date", { ascending: false }),
      supabase.from("quiz_attempts").select("score_pct,passed,created_at,quiz:quizzes(title)").eq("enrollment_id", eid!).order("created_at", { ascending: false }),
      supabase.from("evaluations").select("*").eq("enrollment_id", eid!).order("created_at", { ascending: false })]);
    setE(en.data); setEl(elig.data?.[0] ?? null); setAtt(at.data ?? []); setQa(qz.data ?? []); setEv(evs.data ?? []); setLoaded(true);
  }, [eid]);
  useEffect(() => { load(); }, [load]);
  const add = async () => {
    if (!f.criterion || f.score === "") return toast("err", "Criterion and score are required.");
    await guard(async () => {
      const { error } = await supabase.from("evaluations").insert({ enrollment_id: eid, criterion: f.criterion, score: Number(f.score), max_score: Number(f.max_score), remarks: f.remarks });
      if (error) return toast("err", error.message); // keep the typed values on failure
      toast("ok", "Evaluation saved."); setF(EMPTY); load(); });
  };
  const back = <Link to="/mentor" className="text-sm font-semibold text-brand-dark hover:underline">← My students</Link>;
  if (!loaded) return <LoadingState />;
  if (!e) return <><div className="mb-4">{back}</div><div className="bg-white border border-hairline rounded-[20px]"><EmptyState title="Enrollment not found" hint="It may not exist, or it is not assigned to you." /></div></>;
  const metrics: [string, string][] = el ? [["Progress", `${el.progress_pct}%`], ["Attendance", `${el.attendance_pct}%`], ["Assignment avg", `${el.assignment_avg}`], ["Graded", `${el.assignments_graded}/${el.assignments_total}`], ["Eligible", el.eligible ? "Yes" : "Not yet"]] : [];
  return <>
    <div className="mb-3">{back}</div>
    <PageHeader title={e.student.full_name} description={`${e.course.title} · ${e.student.email}`} actions={<StatusBadge value={e.status} />} />
    {!!metrics.length && <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">{metrics.map(([k, v]) => <MetricCard key={k} label={k} icon={k === "Eligible" ? "award" : k === "Attendance" ? "list" : k === "Progress" ? "chart" : "book"}>
      <p className="text-[1.75rem] font-heading font-bold tabular-nums text-ink leading-tight">{v}</p></MetricCard>)}</div>}
    <div className="space-y-6">
      <MilestonesPanel eid={eid!} who="mentor" />
      <Panel title="Evaluations">
        <div className="grid md:grid-cols-[1.4fr_100px_100px_1.6fr_auto] gap-3 items-end mb-4">
          <Field label="Criterion" htmlFor="ev-c" required><input id="ev-c" className="inp" value={f.criterion} onChange={x => setF({ ...f, criterion: x.target.value })} /></Field>
          <Field label="Score" htmlFor="ev-s" required><input id="ev-s" type="number" className="inp" value={f.score} onChange={x => setF({ ...f, score: x.target.value })} /></Field>
          <Field label="Max score" htmlFor="ev-m"><input id="ev-m" type="number" className="inp" value={f.max_score} onChange={x => setF({ ...f, max_score: x.target.value })} /></Field>
          <Field label="Remarks" htmlFor="ev-r"><input id="ev-r" className="inp" value={f.remarks} onChange={x => setF({ ...f, remarks: x.target.value })} /></Field>
          <button className="btn" onClick={add} disabled={saving}>{saving ? "Saving…" : "Add"}</button></div>
        {!ev.length ? <p className="text-sm text-muted">No evaluations recorded yet.</p> : <ul className="divide-y divide-hairline border-t border-hairline">{ev.map(x => <li key={x.id} className="py-2.5 text-sm flex flex-wrap gap-x-3 gap-y-1 items-baseline">
          <span className="font-medium text-ink">{x.criterion}</span><b className="tabular-nums">{x.score}/{x.max_score}</b><span className="text-muted flex-1">{x.remarks}</span><span className="text-xs text-muted tabular-nums">{fmtDay(x.created_at)}</span></li>)}</ul>}
      </Panel>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <Panel title="Quiz attempts">{!qa.length ? <p className="text-sm text-muted">No attempts yet.</p> : <ul className="divide-y divide-hairline -my-2">{qa.map((a, i) => <li key={i} className="py-2 text-sm flex justify-between gap-2"><span>{a.quiz?.title}</span><span className="tabular-nums"><b>{a.score_pct}%</b> <span className={a.passed ? "text-green-700" : "text-red-600"}>{a.passed ? "Passed" : "Not passed"}</span></span></li>)}</ul>}</Panel>
        <Panel title="Attendance">{!att.length ? <p className="text-sm text-muted">No attendance recorded yet.</p> : <ul className="divide-y divide-hairline -my-2">{att.map((a, i) => <li key={i} className="py-2 text-sm flex justify-between gap-2"><span className="tabular-nums">{fmtDay(a.session_date)}</span><span className={a.present ? "text-green-700" : "text-red-600"}>{a.present ? "Present" : "Absent"}</span></li>)}</ul>}</Panel>
      </div>
    </div>
  </>;
}
