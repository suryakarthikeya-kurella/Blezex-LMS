export default function Pager({ page, size, total, onPage }: { page: number; size: number; total: number; onPage: (p: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / size));
  return <div className="flex items-center gap-2 text-sm mt-3 tabular-nums" role="navigation" aria-label="Pagination">
    <button className="btn-ghost" disabled={page <= 0} onClick={() => onPage(page - 1)}>Prev</button>
    <span>Page {page + 1} / {pages} · {total} rows</span>
    <button className="btn-ghost" disabled={page + 1 >= pages} onClick={() => onPage(page + 1)}>Next</button></div>;
}
