import { useState } from "react";
import DataTable from "../../components/DataTable";
import { PageHeader } from "../../components/admin/kit";
const T = [
  ["v_report_enrollments", "Enrollments", "created_at", "Every course access grant: student, course, mentor, batch and status."],
  ["v_report_completion", "Completion", "progress_pct", "Progress, attendance and assignment average per enrollment, and whether it is eligible for certification."],
  ["v_report_mentor_workload", "Mentor workload", "active_students", "Active students, courses and submissions awaiting review for each mentor."],
  ["v_report_attendance", "Attendance", "attendance_pct", "Sessions held and attended per enrollment."],
  ["v_report_evaluations", "Evaluations", "avg_pct", "Number of mentor evaluations and the average score per enrollment."],
  ["v_report_certificates", "Certificates", "issued_at", "Issued and revoked certificates with their public verification IDs."],
] as const;
export default function Reports() {
  const [t, setT] = useState<string>(T[0][0]); const cur = T.find(x => x[0] === t)!;
  return <><PageHeader title="Reports" description="Read-only views over live data. Click a column heading to sort." />
    <div role="tablist" aria-label="Report" className="flex gap-1.5 flex-wrap mb-2">{T.map(([k, l]) => <button key={k} role="tab" aria-selected={t === k} className={`px-3.5 py-1.5 rounded-full text-sm font-medium border ${t === k ? "bg-ink text-white border-ink" : "bg-white border-hairline hover:border-ink"}`} onClick={() => setT(k)}>{l}</button>)}</div>
    <p className="text-sm text-muted mb-4">{cur[3]}</p>
    <DataTable key={t} source={t} sort={cur[2]} /></>;
}
