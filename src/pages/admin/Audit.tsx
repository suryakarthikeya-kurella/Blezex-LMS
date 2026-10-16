import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { auditLabel, fmtDate, short } from "../../lib/format";
import Pager from "../../components/Pager";
import { EmptyState, ErrorState, LoadingState, Modal, PageHeader, Panel, SearchBox, Toolbar } from "../../components/admin/kit";

// details keys that hold a record id we can name with a read-only lookup
const LOOKUP: Record<string, [string, string]> = { student: ["profiles", "full_name"], mentor: ["profiles", "full_name"], course: ["courses", "title"], batch: ["batches", "name"] };
const size = 20;

export default function Audit() {
  const [page, setPage] = useState(0); const [q, setQ] = useState(""); const [asc, setAsc] = useState(false); const [row, setRow] = useState<any>(null);
  const term = q.trim().replace(/[%,()*]/g, " ").trim();
  const { data, isLoading, error } = useQuery({ queryKey: ["audit", page, term, asc], placeholderData: p => p, queryFn: async () => {
    let s = supabase.from("audit_logs").select("*", { count: "exact" }); if (term) s = s.ilike("action", `%${term}%`);
    const r = await s.order("created_at", { ascending: asc }).range(page * size, page * size + size - 1); if (r.error) throw r.error;
    const ids = [...new Set((r.data ?? []).map(x => x.actor_id).filter(Boolean))] as string[]; const names: Record<string, string> = {};
    if (ids.length) { const p = await supabase.from("profiles").select("id,full_name").in("id", ids); (p.data ?? []).forEach(x => { names[x.id] = x.full_name; }); } // unresolved actors fall back to their id
    return { rows: (r.data ?? []).map(x => ({ ...x, actor: x.actor_id ? names[x.actor_id] ?? null : null })), count: r.count ?? 0 };
  } });
  return <>
    <PageHeader title="Audit Log" description="A record of account and enrollment changes. Open an event to see its full details." />
    <Toolbar><SearchBox label="Search events" placeholder="Search by action, e.g. enrollment…" value={q} onChange={v => { setPage(0); setQ(v); }} />
      <button className="btn-ghost" onClick={() => { setAsc(a => !a); setPage(0); }}>{asc ? "Oldest first ▲" : "Newest first ▼"}</button></Toolbar>
    {error ? <ErrorState error={error} /> : isLoading ? <LoadingState /> :
      <Panel className="overflow-hidden [&>div]:!p-0">{!data?.rows.length ? <EmptyState title={term ? "No events match your search." : "No audit events yet."} /> :
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs uppercase tracking-wide text-muted bg-paper"><th className="px-4 py-3 font-medium">When</th><th className="px-3 font-medium">Event</th><th className="px-3 font-medium">Actor</th><th className="px-3 font-medium">Target</th><th className="px-4" /></tr></thead>
          <tbody>{data.rows.map(r => <tr key={r.id} className="border-t border-hairline hover:bg-paper/60 align-top">
            <td className="px-4 py-2.5 whitespace-nowrap text-muted">{fmtDate(r.created_at)}</td>
            <td className="px-3"><p className="font-medium text-ink">{auditLabel(r)}</p><p className="font-mono text-xs text-muted">{r.action}</p></td>
            <td className="px-3">{r.actor ? <span title={r.actor_id}>{r.actor}</span> : r.actor_id ? <span className="font-mono text-xs" title={r.actor_id}>{short(r.actor_id)}</span> : <span className="text-muted">Not recorded</span>}</td>
            <td className="px-3">{r.entity ?? "—"}{r.entity_id && <span className="font-mono text-xs text-muted block" title={r.entity_id}>{short(r.entity_id)}</span>}</td>
            <td className="px-4 text-right"><button className="btn-ghost" onClick={() => setRow(r)}>Details</button></td></tr>)}</tbody></table></div>}
        {!!data?.count && <div className="px-5 pb-4 -mt-1"><Pager page={page} size={size} total={data.count} onPage={setPage} /></div>}</Panel>}
    <Modal open={!!row} onClose={() => setRow(null)} title={row ? auditLabel(row) : ""} description={row ? fmtDate(row.created_at) : undefined} wide>{row && <Detail r={row} />}</Modal>
  </>;
}

function Detail({ r }: { r: any }) {
  const [names, setNames] = useState<Record<string, string>>({});
  useEffect(() => { let live = true; (async () => {
    const out: Record<string, string> = {};
    await Promise.all(Object.entries(LOOKUP).map(async ([k, [t, c]]) => { const v = r.details?.[k]; if (typeof v !== "string") return;
      const x = await supabase.from(t).select(c).eq("id", v).maybeSingle(); const n = (x.data as any)?.[c]; if (n) out[k] = n; }));
    if (live) setNames(out); })(); return () => { live = false; }; }, [r]);
  const kv: [string, string][] = [["Action", r.action], ["Actor", r.actor ? `${r.actor} (${r.actor_id})` : r.actor_id ?? "Not recorded"], ["Entity", r.entity ?? "—"], ["Entity ID", r.entity_id ?? "—"], ["Event ID", String(r.id)]];
  const det = r.details && typeof r.details === "object" ? Object.entries(r.details) : [];
  return <div className="space-y-5 text-sm">
    <dl className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-1.5">{kv.map(([k, v]) => <div key={k} className="contents"><dt className="text-muted">{k}</dt><dd className="font-mono text-xs break-all self-center">{v}</dd></div>)}</dl>
    <div><h3 className="font-bold text-ink mb-2 text-sm">Details</h3>{!det.length ? <p className="text-muted">No additional details were recorded.</p> :
      <dl className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-1.5">{det.map(([k, v]) => <div key={k} className="contents"><dt className="text-muted capitalize">{k.replace(/_/g, " ")}</dt>
        <dd className="break-all">{names[k] && <b className="text-ink mr-2 font-body">{names[k]}</b>}<span className="font-mono text-xs">{typeof v === "object" ? JSON.stringify(v) : String(v ?? "—")}</span></dd></div>)}</dl>}</div>
    <details><summary className="cursor-pointer text-xs font-bold text-muted">Raw JSON</summary><pre className="mt-2 bg-ink text-white text-xs rounded-xl p-3 overflow-x-auto">{JSON.stringify(r, null, 2)}</pre></details></div>;
}
