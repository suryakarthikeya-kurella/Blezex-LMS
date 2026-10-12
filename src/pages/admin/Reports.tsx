import { useState } from "react";
import DataTable from "../../components/DataTable";
import { Title } from "../../components/ui";
const T = [["v_report_enrollments", "Enrollments", "created_at"], ["v_report_completion", "Completion", "progress_pct"], ["v_report_mentor_workload", "Mentor workload", "active_students"],
  ["v_report_attendance", "Attendance", "attendance_pct"], ["v_report_evaluations", "Evaluations", "avg_pct"], ["v_report_certificates", "Certificates", "issued_at"]] as const;
export default function Reports() {
  const [t, setT] = useState<string>(T[0][0]);
  return <><Title note="real data, paginated">Reports</Title>
    <div role="tablist" className="flex gap-1 flex-wrap mb-4">{T.map(([k, l]) => <button key={k} role="tab" aria-selected={t === k} className={`px-3 py-1.5 rounded-full text-sm ${t === k ? "bg-ink text-white" : "bg-white border border-hairline"}`} onClick={() => setT(k)}>{l}</button>)}</div>
    <DataTable key={t} source={t} sort={T.find(x => x[0] === t)![2]} /></>;
}
