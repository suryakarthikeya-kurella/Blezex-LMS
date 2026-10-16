export const fmtDate = (v: string) => new Date(v).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
export const fmtDay = (v: string) => new Date(v).toLocaleDateString(undefined, { dateStyle: "medium" });
export const short = (id: string) => id.length > 12 ? `${id.slice(0, 8)}…` : id;
/** Human label for an audit_logs.action value. Unknown actions fall back to the raw text, de-snake-cased. */
export const auditLabel = (a: { action: string; details?: any }) => {
  switch (a.action) {
    case "INSERT_enrollment": return "Granted course access";
    case "UPDATE_enrollment": return a.details?.status ? `Updated an enrollment (now ${a.details.status})` : "Updated an enrollment";
    case "create_user": return `Created ${a.details?.role ?? "a"} account`;
    case "set_status_suspended": return "Suspended an account";
    case "set_status_active": return "Reactivated an account";
    case "issue_certificate": return "Issued a certificate";
    case "certificate_revoked": return "Revoked a certificate";
    case "course_published": return "Published a course";
    case "course_draft": return "Unpublished a course";
    default: return a.action.replace(/_/g, " ");
  }
};
/** Today's date as YYYY-MM-DD in the user's LOCAL timezone (toISOString() would use UTC and be off by a day for part of every day). */
export const todayLocal = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
