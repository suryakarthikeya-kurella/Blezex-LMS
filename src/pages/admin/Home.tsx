import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import { Icon, IconName } from "../../components/icons";
import Illustration from "../../components/Illustration";
import { EmptyState, ErrorState, LoadingState, MetricCard, Panel as KitPanel } from "../../components/admin/kit";
import { auditLabel, fmtDate } from "../../lib/format";

// KPI definitions are unchanged from the original overview; only error surfacing was added.
const count = async (t: string, f?: [string, string]) => {
  let q = supabase.from(t).select("*", { count: "exact", head: true }); if (f) q = q.eq(f[0], f[1]);
  const r = await q; if (r.error) throw r.error; return r.count ?? 0;
};
const KPIS: { label: string; icon: IconName; get: () => Promise<number> }[] = [
  { label: "Students", icon: "users", get: () => count("profiles", ["role", "student"]) },
  { label: "Mentors", icon: "mentor", get: () => count("profiles", ["role", "mentor"]) },
  { label: "Courses", icon: "book", get: () => count("courses") },
  { label: "Active enrollments", icon: "key", get: () => count("enrollments", ["status", "active"]) },
  { label: "Certificates", icon: "award", get: () => count("certificates", ["status", "issued"]) },
  { label: "Batches", icon: "layers", get: () => count("batches") },
];

const Panel = ({ title, link, children }: { title: string; link?: [string, string]; children: ReactNode }) =>
  <KitPanel title={title} aside={link && <Link to={link[0]} className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1">{link[1]}<Icon name="arrow" className="w-3.5 h-3.5" /></Link>}>{children}</KitPanel>;

function Kpis() {
  return <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">{KPIS.map(k => <Kpi key={k.label} {...k} />)}</div>;
}
function Kpi({ label, icon, get }: (typeof KPIS)[number]) {
  const { data, error, isLoading } = useQuery({ queryKey: ["admin-kpi", label], queryFn: get });
  return <MetricCard label={label} icon={icon}>
      {error ? <p role="alert" className="text-xs text-red-600" title={(error as Error).message}>Failed to load</p>
        : <p className="text-[2rem] font-heading font-bold tabular-nums text-ink leading-tight">{isLoading ? <span className="inline-block w-10 h-8 rounded bg-paper animate-pulse" /> : data}</p>}</MetricCard>;
}

function Activity() {
  const { data, error, isLoading } = useQuery({ queryKey: ["admin-activity"], queryFn: async () => {
    const r = await supabase.from("audit_logs").select("id,actor_id,action,entity,created_at,details").order("created_at", { ascending: false }).limit(8);
    if (r.error) throw r.error;
    const ids = [...new Set((r.data ?? []).map(x => x.actor_id).filter(Boolean))] as string[];
    const names: Record<string, string> = {};
    if (ids.length) { const p = await supabase.from("profiles").select("id,full_name").in("id", ids); if (p.error) throw p.error; (p.data ?? []).forEach(x => { names[x.id] = x.full_name; }); }
    return (r.data ?? []).map(x => ({ ...x, actor: x.actor_id ? names[x.actor_id] ?? "Unknown user" : "Not recorded" }));
  } });
  return <Panel title="Recent activity" link={["/admin/audit", "Audit log"]}>
    {error ? <ErrorState error={error} /> : isLoading ? <LoadingState /> : !data?.length ? <EmptyState title="No activity recorded yet." /> :
      <ul className="divide-y divide-hairline -my-2">{data.map(a => <li key={a.id} className="py-3 flex gap-3 items-start">
        <span className="mt-1.5 w-2 h-2 rounded-full bg-brand shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1"><p className="text-sm font-medium text-ink">{auditLabel(a)}</p><p className="text-xs text-muted truncate">by {a.actor}{a.entity ? ` · ${a.entity}` : ""}</p></div>
        <time className="text-xs text-muted whitespace-nowrap tabular-nums" dateTime={a.created_at}>{fmtDate(a.created_at)}</time></li>)}</ul>}</Panel>;
}

// Only items derivable directly from existing tables/views; zero-count items are hidden.
function Notices() {
  const { data, error, isLoading } = useQuery({ queryKey: ["admin-notices"], queryFn: async () => {
    const head = (t: string) => supabase.from(t).select("*", { count: "exact", head: true });
    const [noMentor, review, ready] = await Promise.all([
      head("enrollments").eq("status", "active").is("mentor_id", null),
      head("submissions").eq("status", "submitted"),
      head("v_report_completion").eq("status", "active").eq("eligible", true),
    ]);
    for (const r of [noMentor, review, ready]) if (r.error) throw r.error;
    return [
      { n: ready.count ?? 0, text: "active enrollments meet the completion rules and can be certified", to: "/admin/enrollments", cta: "Course Access" },
      { n: noMentor.count ?? 0, text: "active enrollments have no mentor assigned", to: "/admin/enrollments", cta: "Assign mentors" },
      { n: review.count ?? 0, text: "submissions are awaiting mentor review", to: "/admin/reports", cta: "Mentor workload" },
    ].filter(x => x.n > 0);
  } });
  return <Panel title="Operational notices">
    {error ? <ErrorState error={error} /> : isLoading ? <LoadingState /> : !data?.length ?
      <div className="text-center py-4"><span className="inline-grid place-items-center w-10 h-10 rounded-full bg-paper text-brand mb-2"><Icon name="check" /></span><p className="text-sm text-muted">Nothing needs your attention right now.</p></div> :
      <ul className="space-y-3">{data.map(x => <li key={x.text} className="flex gap-3 items-start">
        <span className="w-8 h-8 rounded-lg bg-paper text-brand grid place-items-center shrink-0"><Icon name="alert" className="w-4 h-4" /></span>
        <p className="text-sm flex-1"><b className="text-ink">{x.n}</b> {x.text}. <Link to={x.to} className="text-brand font-bold hover:underline">{x.cta}</Link></p></li>)}</ul>}</Panel>;
}

// Enrollments created per month (last 6 months) — one head-count query per month on enrollments.created_at.
function Trend() {
  const { data, error, isLoading } = useQuery({ queryKey: ["admin-enrollment-trend"], queryFn: async () => {
    const now = new Date();
    return Promise.all(Array.from({ length: 6 }, async (_, i) => {
      const s = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1), e = new Date(s.getFullYear(), s.getMonth() + 1, 1);
      const r = await supabase.from("enrollments").select("*", { count: "exact", head: true }).gte("created_at", s.toISOString()).lt("created_at", e.toISOString());
      if (r.error) throw r.error;
      return { label: s.toLocaleString(undefined, { month: "short" }), full: s.toLocaleString(undefined, { month: "long", year: "numeric" }), n: r.count ?? 0 };
    }));
  } });
  const max = Math.max(1, ...(data ?? []).map(d => d.n)); const H = 120;
  return <Panel title="Enrollments per month" link={["/admin/reports", "Reports"]}>
    {error ? <ErrorState error={error} /> : isLoading ? <LoadingState /> : !data?.some(d => d.n) ? <EmptyState title="No enrollments in the last 6 months." /> : <>
      <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label={`Enrollments per month: ${data.map(d => `${d.full} ${d.n}`).join(", ")}`}>
        <line x1="0" x2="360" y1={H + 10} y2={H + 10} stroke="#E7E5DF" />
        <line x1="0" x2="360" y1={10} y2={10} stroke="#E7E5DF" strokeDasharray="3 4" />
        {data.map((d, i) => { const h = Math.max(d.n ? 3 : 0, (d.n / max) * H); const x = i * 60 + 17; return <g key={d.full}><title>{`${d.full}: ${d.n} enrollment${d.n === 1 ? "" : "s"}`}</title>
          <rect x={i * 60} y="0" width="60" height="160" fill="transparent" />
          <rect x={x} y={H + 10 - h} width="26" height={h} rx="4" fill={i === 5 ? "#FF4D1C" : "#111111"} />
          <text x={x + 13} y={H + 6 - h} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">{d.n}</text>
          <text x={x + 13} y="150" textAnchor="middle" fontSize="11" fill="#616161">{d.label}</text></g>; })}
      </svg></>}</Panel>;
}

const QUICK: { to: string; label: string; hint: string; icon: IconName }[] = [
  { to: "/admin/people", label: "Manage people", hint: "Create or suspend accounts", icon: "users" },
  { to: "/admin/courses", label: "Manage courses", hint: "Edit content and rules", icon: "book" },
  { to: "/admin/enrollments", label: "Grant course access", hint: "Enroll, assign mentors, certify", icon: "key" },
  { to: "/admin/reports", label: "View reports", hint: "Completion, attendance, workload", icon: "chart" },
];
const Quick = () => <Panel title="Quick access"><div className="grid gap-2">{QUICK.map(q =>
  <Link key={q.to} to={q.to} className="group flex items-center gap-3 rounded-xl border border-hairline p-3 hover:border-ink transition-colors">
    <span className="w-9 h-9 rounded-lg bg-paper text-brand grid place-items-center shrink-0"><Icon name={q.icon} /></span>
    <span className="flex-1 min-w-0"><span className="block text-sm font-bold text-ink">{q.label}</span><span className="block text-xs text-muted truncate">{q.hint}</span></span>
    <Icon name="arrow" className="w-4 h-4 text-muted group-hover:text-brand" /></Link>)}</div></Panel>;

export default function AdminHome() {
  const { profile } = useAuth();
  return <div className="space-y-6">
    <section className="rounded-[20px] bg-ink text-white overflow-hidden grid md:grid-cols-[1fr_260px] items-center gap-4 p-5 md:p-6" aria-label="Welcome">
      <div><p className="text-sm font-semibold text-brand">Your command center</p>
        <h1 className="!text-white text-3xl md:text-[2rem] mt-1">Welcome back, {profile?.full_name?.split(" ")[0] || "Admin"}</h1>
        <p className="text-white/75 mt-2 max-w-xl text-sm md:text-base">Run the BlezeX Career Accelerator: onboard students and mentors, publish courses, grant access and certify completions.</p>
        <Link to="/admin/enrollments" className="inline-flex mt-5 rounded-full bg-brand px-5 py-2 text-sm font-semibold font-sans text-white hover:bg-white hover:text-ink transition-colors">Grant course access</Link></div>
      <div className="hidden md:block"><Illustration /></div></section>
    <Kpis />
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6"><Activity /><Trend /></div>
      <div className="space-y-6"><Notices /><Quick /></div></div>
  </div>;
}
