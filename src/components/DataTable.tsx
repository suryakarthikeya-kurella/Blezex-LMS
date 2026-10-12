import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import Pager from "./Pager";
import { Card, Empty } from "./ui";
/** Generic paginated + sortable table over a view/table (admin reports, audit log). */
export default function DataTable({ source, sort }: { source: string; sort?: string }) {
  const [page, setPage] = useState(0); const [col, setCol] = useState<string | undefined>(sort); const [asc, setAsc] = useState(false); const size = 20;
  const { data, isLoading, error } = useQuery({ queryKey: [source, page, col, asc], queryFn: async () => {
    let q = supabase.from(source).select("*", { count: "exact" }); if (col) q = q.order(col, { ascending: asc });
    const r = await q.range(page * size, page * size + size - 1); if (r.error) throw r.error; return r; } });
  if (error) return <p className="text-red-600 text-sm">Could not load: {(error as Error).message}</p>;
  if (isLoading) return <p>Loading…</p>;
  const rows = data?.data ?? []; const cols = rows[0] ? Object.keys(rows[0]) : [];
  return <Card><div className="overflow-x-auto">{!rows.length ? <Empty t="No data." /> : <table className="w-full text-sm"><thead><tr className="text-left text-muted">
    {cols.map(c => <th key={c} className="pr-3"><button onClick={() => { setAsc(col === c ? !asc : true); setCol(c); }}>{c.replace(/_/g, " ")}{col === c ? (asc ? " ▲" : " ▼") : ""}</button></th>)}</tr></thead>
    <tbody>{rows.map((r: any, i) => <tr key={i} className="border-t border-hairline">{cols.map(c => <td key={c} className="pr-3 py-1.5 align-top">{typeof r[c] === "object" && r[c] ? JSON.stringify(r[c]) : String(r[c] ?? "—")}</td>)}</tr>)}</tbody></table>}</div>
    <Pager page={page} size={size} total={data?.count ?? 0} onPage={setPage} /></Card>;
}
