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
    default: return a.action.replace(/_/g, " ");
  }
};
