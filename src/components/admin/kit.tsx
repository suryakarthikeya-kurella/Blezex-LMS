import { createContext, FormEvent, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Icon, IconName } from "../icons";
import { cn } from "../../lib/utils";

/* ---------- page + layout ---------- */
export const PageHeader = ({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) =>
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div className="min-w-0"><h1 className="text-[1.75rem] md:text-3xl leading-tight">{title}</h1>{description && <p className="text-sm text-muted mt-1 max-w-2xl">{description}</p>}</div>
    {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}</div>;

export const Panel = ({ title, aside, children, className }: { title?: string; aside?: ReactNode; children: ReactNode; className?: string }) =>
  <section className={cn("bg-white border border-hairline rounded-[20px] shadow-[0_8px_24px_-12px_rgba(17,17,17,.08)]", className)}>
    {title && <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-hairline"><h2 className="text-[17px] font-semibold text-ink">{title}</h2>{aside}</div>}
    <div className="p-5">{children}</div></section>;

export const MetricCard = ({ label, icon, children }: { label: string; icon: IconName; children: ReactNode }) =>
  <div className="bg-white border border-hairline rounded-[20px] p-4 flex flex-col gap-3 shadow-[0_8px_24px_-12px_rgba(17,17,17,.08)]">
    <span className="w-10 h-10 rounded-xl bg-paper text-brand grid place-items-center"><Icon name={icon} /></span>
    <div><p className="text-sm text-muted">{label}</p>{children}</div></div>;

/* ---------- states ---------- */
export const LoadingState = ({ label = "Loading…" }: { label?: string }) =>
  <div role="status" className="flex items-center justify-center gap-2 py-10 text-sm text-muted"><span className="w-4 h-4 rounded-full border-2 border-hairline border-t-brand animate-spin" />{label}</div>;
export const EmptyState = ({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) =>
  <div className="text-center py-10 px-4"><p className="font-bold text-ink">{title}</p>{hint && <p className="text-sm text-muted mt-1">{hint}</p>}{action && <div className="mt-4">{action}</div>}</div>;
export const ErrorState = ({ error }: { error: unknown }) =>
  <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">Could not load: {(error as Error)?.message ?? "unknown error"}</p>;

/* ---------- badges ---------- */
const TONE: Record<string, string> = {
  success: "bg-green-50 text-green-800 border-green-200", warn: "bg-amber-50 text-amber-800 border-amber-200", danger: "bg-red-50 text-red-700 border-red-200",
  brand: "bg-[#FFF0EB] text-[#B42E0A] border-[#FFD2C4]", ink: "bg-ink text-white border-ink", neutral: "bg-paper text-[#444] border-hairline" };
const BADGE: Record<string, string> = { active: "success", published: "success", issued: "success", paused: "warn", draft: "warn", pending: "warn",
  revoked: "danger", suspended: "danger", completed: "ink", admin: "brand", mentor: "ink", student: "neutral" };
export const StatusBadge = ({ value }: { value: string }) =>
  <span className={cn("inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize", TONE[BADGE[value] ?? "neutral"])}>{value}</span>;

/* ---------- forms ---------- */
export const FormSection = ({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) =>
  <fieldset className="space-y-3"><legend className="font-semibold text-ink text-sm">{title}</legend>{hint && <p className="text-xs text-muted -mt-1">{hint}</p>}{children}</fieldset>;
export const Field = ({ label, htmlFor, required, error, hint, children }: { label: string; htmlFor: string; required?: boolean; error?: string; hint?: string; children: ReactNode }) =>
  <div><label htmlFor={htmlFor} className="text-[13px] font-medium text-ink">{label}{required && <span className="text-brand" aria-hidden="true"> *</span>}{required && <span className="sr-only"> (required)</span>}</label>
    <div className="mt-1">{children}</div>{hint && !error && <p className="text-xs text-muted mt-1">{hint}</p>}{error && <p role="alert" className="text-xs text-red-600 mt-1">{error}</p>}</div>;
export const SearchBox = ({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label: string }) =>
  <div className="relative flex-1 min-w-[200px] max-w-sm"><Icon name="search" className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
    <input aria-label={label} className="inp pl-9" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} /></div>;
export const Toolbar = ({ children }: { children: ReactNode }) => <div className="flex flex-wrap items-center gap-2 mb-4">{children}</div>;

/* ---------- dialogs (native <dialog>: focus trap, Esc, focus restore) ---------- */
export function Modal({ open, onClose, title, description, children, wide }: { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close(); }, [open]);
  return <dialog ref={ref} onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dlg-title"
    className={cn("m-auto w-[calc(100%-2rem)] rounded-2xl border border-hairline bg-white p-0 text-[#333] shadow-[0_24px_60px_-20px_rgba(17,17,17,.4)] backdrop:bg-ink/40", wide ? "max-w-2xl" : "max-w-md")}>
    {open && <div className="p-6">
      <div className="flex items-start justify-between gap-3 mb-4"><div><h2 id="dlg-title" className="text-lg font-bold text-ink">{title}</h2>{description && <p className="text-sm text-muted mt-1">{description}</p>}</div>
        <button type="button" className="p-1 -mr-1 rounded-lg hover:bg-paper" onClick={onClose} aria-label="Close dialog"><Icon name="x" className="w-5 h-5" /></button></div>
      {children}</div>}</dialog>;
}
/** onConfirm resolves to an error message, or null on success (dialog then closes). */
export function ConfirmActionDialog({ open, title, children, confirmLabel, danger, disabled, onConfirm, onClose }:
  { open: boolean; title: string; children: ReactNode; confirmLabel: string; danger?: boolean; disabled?: boolean; onConfirm: () => Promise<string | null>; onClose: () => void }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  useEffect(() => { if (open) { setErr(""); setBusy(false); } }, [open]);
  const go = async (e: FormEvent) => { e.preventDefault(); if (busy) return; setBusy(true); setErr(""); const m = await onConfirm(); setBusy(false); if (m) setErr(m); else onClose(); };
  return <Modal open={open} onClose={() => { if (!busy) onClose(); }} title={title}>
    <form onSubmit={go}><div className="text-sm space-y-2">{children}</div>
      {err && <p role="alert" className="text-sm text-red-600 mt-3">{err}</p>}
      <div className="flex justify-end gap-2 mt-5"><button type="button" className="btn-ghost" onClick={onClose} disabled={busy}>Cancel</button>
        <button className={cn("btn", danger && "!bg-red-600 hover:!bg-red-700")} disabled={busy || disabled}>{busy ? "Working…" : confirmLabel}</button></div></form></Modal>;
}

/* ---------- toasts ---------- */
type T = { id: number; kind: "ok" | "err"; text: string };
const ToastCtx = createContext<(kind: T["kind"], text: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);
export function ToastProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<T[]>([]); const n = useRef(0);
  const push = useCallback((kind: T["kind"], text: string) => { const id = ++n.current; setList(l => [...l, { id, kind, text }]); setTimeout(() => setList(l => l.filter(x => x.id !== id)), kind === "err" ? 8000 : 4000); }, []);
  return <ToastCtx.Provider value={push}>{children}
    <div className="fixed bottom-4 right-4 z-[60] space-y-2 w-[calc(100%-2rem)] max-w-sm" aria-live="polite">{list.map(t =>
      <div key={t.id} role={t.kind === "err" ? "alert" : "status"} className={cn("flex items-start gap-2 rounded-xl border px-4 py-3 text-sm bg-white shadow-lg", t.kind === "err" ? "border-red-200 text-red-700" : "border-green-200 text-green-800")}>
        <span className="flex-1">{t.text}</span><button aria-label="Dismiss" onClick={() => setList(l => l.filter(x => x.id !== t.id))}><Icon name="x" className="w-4 h-4" /></button></div>)}</div></ToastCtx.Provider>;
}
