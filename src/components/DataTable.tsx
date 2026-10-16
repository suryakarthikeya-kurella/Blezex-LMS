import { ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { fmtDate, short } from "../lib/format";
import Pager from "./Pager";
import { EmptyState, ErrorState, LoadingState, Panel, StatusBadge } from "./admin/kit";

const ISO = /^\d{4}-\d{2}-\d{2}T/; const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-/i;
const head = (c: string) => { const t = c.replace(/_pct$/, " %").replace(/_/g, " "); return t.charAt(0).toUpperCase() + t.slice(1); };
/** Presentation only: formats a raw cell without altering the underlying value. */
export function cell(c: string, v: any): ReactNode {
  if (v === null || v === undefined || v === "") return <span className="text-muted">—</span>;
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (c === "status") return <StatusBadge value={String(v)} />;
  if (c === "verification_id") return <Link className="font-mono text-xs underline" to={`/verify/${v}`}>{String(v)}</Link>;
  if (typeof v === "number") return c.endsWith("_pct") ? `${v}%` : v;
  if (typeof v === "object") { const j = JSON.stringify(v); return <span className="font-mono text-xs block max-w-[16rem] truncate" title={j}>{j}</span>; }
  const s = String(v);
  if (ISO.test(s)) return <span className="whitespace-nowrap">{fmtDate(s)}</span>;
  if (UUID.test(s)) return <span className="font-mono text-xs" title={s}>{short(s)}</span>;
  if (/^-?\d+(\.\d+)?$/.test(s)) return c.endsWith("_pct") ? `${s}%` : s;
  return <span className="block max-w-[18rem] truncate" title={s}>{s}</span>;
}
/** Generic paginated + sortable table over a view/table (admin reports). */
export default function DataTable({ source, sort }: { source: string; sort?: string }) {
  const [page, setPage] = useState(0); const [col, setCol] = useState<string | undefined>(sort); const [asc, setAsc] = useState(false); const size = 20;
  const { data, isLoading, error } = useQuery({ queryKey: [source, page, col, asc], queryFn: async () => {
    let q = supabase.from(source).select("*", { count: "exact" }); if (col) q = q.order(col, { ascending: asc });
    const r = await q.range(page * size, page * size + size - 1); if (r.error) throw r.error; return r; }, placeholderData: p => p });
  if (error) return <ErrorState error={error} />;
  if (isLoading) return <LoadingState />;
  const rows = data?.data ?? []; const cols = rows[0] ? Object.keys(rows[0]) : [];
  return <Panel className="overflow-hidden [&>div]:!p-0">{!rows.length ? <EmptyState title="No data for this report yet." /> :
    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs uppercase tracking-wide text-muted bg-paper">
      {cols.map(c => <th scope="col" key={c} className="px-4 py-3 font-medium whitespace-nowrap" aria-sort={col === c ? (asc ? "ascending" : "descending") : undefined}>
        <button className="uppercase tracking-wide hover:text-ink" onClick={() => { setAsc(col === c ? !asc : true); setCol(c); setPage(0); }}>{head(c)}{col === c ? (asc ? " ▲" : " ▼") : ""}</button></th>)}</tr></thead>
      <tbody>{rows.map((r: any, i) => <tr key={i} className="border-t border-hairline hover:bg-paper/60">{cols.map(c => <td key={c} className="px-4 py-2.5 align-top">{cell(c, r[c])}</td>)}</tr>)}</tbody></table></div>}
    {(data?.count ?? 0) > 0 && <div className="px-5 pb-4 -mt-1"><Pager page={page} size={size} total={data?.count ?? 0} onPage={setPage} /></div>}</Panel>;
}
