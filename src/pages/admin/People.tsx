import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../../lib/supabase";
import { createUserSchema } from "../../lib/schemas";
import { fmtDay } from "../../lib/format";
import Pager from "../../components/Pager";
import { Icon } from "../../components/icons";
import { ConfirmActionDialog, EmptyState, ErrorState, Field, FormSection, LoadingState, Modal, PageHeader, Panel, SearchBox, StatusBadge, Toolbar, useToast } from "../../components/admin/kit";
type F = z.infer<typeof createUserSchema>;
const EMPTY: F = { role: "student", full_name: "", email: "", password: "" };

/** Edge Function non-2xx responses hide the JSON body inside error.context; surface its message. */
const fnError = async (error: any, data: any) => {
  if (data?.error) return String(data.error);
  try { const b = await error?.context?.json?.(); if (b?.error) return String(b.error); } catch { /* fall through */ }
  return error?.message ?? "Could not create the account.";
};

export default function People() {
  const toast = useToast();
  const [rows, setRows] = useState<any[]>([]); const [total, setTotal] = useState(0); const [page, setPage] = useState(0); const [q, setQ] = useState("");
  const [role, setRole] = useState(""); const [status, setStatus] = useState(""); const [sort, setSort] = useState("created_at");
  const [loading, setLoading] = useState(true); const [error, setError] = useState<unknown>(null); const size = 15;
  const [creating, setCreating] = useState(false); const [formErr, setFormErr] = useState(""); const [target, setTarget] = useState<any>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(createUserSchema), defaultValues: EMPTY });

  const load = useCallback(async () => {
    setLoading(true);
    let s = supabase.from("profiles").select("*", { count: "exact" }); if (role) s = s.eq("role", role); if (status) s = s.eq("status", status);
    const term = q.trim().replace(/[,()%*]/g, " ").trim(); // these characters would break the PostgREST or() filter
    if (term) s = s.or(`full_name.ilike.%${term}%,email.ilike.%${term}%`);
    const r = await s.order(sort, { ascending: sort !== "created_at" }).range(page * size, page * size + size - 1);
    setError(r.error); setRows(r.data ?? []); setTotal(r.count ?? 0); setLoading(false);
  }, [page, q, role, status, sort]);
  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setFormErr(""); reset(EMPTY); setCreating(true); };
  const create = async (v: F) => {
    setFormErr("");
    const { data, error } = await supabase.functions.invoke("admin-create-user", { body: v });
    if (error || data?.error) return setFormErr(await fnError(error, data)); // keep the dialog open with values intact
    setCreating(false); toast("ok", `Account created for ${v.full_name}. They must change the temporary password at first login.`); load();
  };
  const toggle = async () => {
    const p = target; const next = p.status === "active" ? "suspended" : "active";
    const { error } = await supabase.from("profiles").update({ status: next }).eq("id", p.id);
    if (error) return error.message;
    toast("ok", `${p.full_name} ${next === "suspended" ? "suspended" : "reactivated"}.`); load(); return null;
  };
  const filtered = !!(q.trim() || role || status);

  return <>
    <PageHeader title="People" description="Administrators create every account. Create students and mentors, then suspend or reactivate access."
      actions={<button className="btn inline-flex items-center gap-1.5" onClick={openCreate}><Icon name="plus" className="w-4 h-4" />Create user</button>} />

    <Toolbar>
      <SearchBox label="Search people" placeholder="Search name or email…" value={q} onChange={v => { setPage(0); setQ(v); }} />
      <select aria-label="Role filter" className="inp max-w-[150px]" value={role} onChange={e => { setPage(0); setRole(e.target.value); }}><option value="">All roles</option><option>student</option><option>mentor</option><option>admin</option></select>
      <select aria-label="Status filter" className="inp max-w-[150px]" value={status} onChange={e => { setPage(0); setStatus(e.target.value); }}><option value="">All statuses</option><option>active</option><option>suspended</option></select>
      <select aria-label="Sort" className="inp max-w-[160px]" value={sort} onChange={e => setSort(e.target.value)}><option value="created_at">Newest</option><option value="full_name">Name A–Z</option><option value="role">Role</option></select>
    </Toolbar>

    <Panel className="overflow-hidden [&>div]:!p-0">
      {error ? <div className="p-5"><ErrorState error={error} /></div> : loading && !rows.length ? <LoadingState /> : !rows.length ?
        <EmptyState title={filtered ? "No people match these filters." : "No people yet."} hint={filtered ? "Try a different search or clear the filters." : "Create the first student or mentor account."}
          action={filtered ? <button className="btn-ghost" onClick={() => { setQ(""); setRole(""); setStatus(""); setPage(0); }}>Clear filters</button> : <button className="btn" onClick={openCreate}>Create user</button>} /> :
        <div className={`overflow-x-auto ${loading ? "opacity-60" : ""}`}><table className="w-full text-sm">
          <thead><tr className="text-left text-xs uppercase tracking-wide text-muted bg-paper"><th scope="col" className="px-5 py-3 font-medium">Person</th><th scope="col" className="px-3 font-medium">Role</th><th scope="col" className="px-3 font-medium hidden sm:table-cell">Status</th><th scope="col" className="px-3 font-medium hidden md:table-cell">Created</th><th scope="col" className="px-5 text-right font-medium">Action</th></tr></thead>
          <tbody>{rows.map(p => <tr key={p.id} className="border-t border-hairline">
            <td className="px-5 py-3"><p className="font-medium text-ink">{p.full_name}{p.is_alumni && <span title="Alumni" className="ml-1">🎓</span>}</p><p className="text-xs text-muted">{p.email}</p></td>
            <td className="px-3"><div className="flex flex-col items-start gap-1"><StatusBadge value={p.role} /><span className="sm:hidden"><StatusBadge value={p.status} /></span></div></td><td className="px-3 hidden sm:table-cell"><StatusBadge value={p.status} /></td>
            <td className="px-3 hidden md:table-cell text-muted whitespace-nowrap">{fmtDay(p.created_at)}</td>
            <td className="px-5 text-right">{p.role === "admin" ? <span className="text-xs text-muted" title="Administrators cannot be suspended here">Protected</span> :
              <button className="btn-ghost" onClick={() => setTarget(p)}>{p.status === "active" ? "Suspend" : "Reactivate"}</button>}</td></tr>)}</tbody></table></div>}
      {total > 0 && <div className="px-5 pb-4 -mt-1"><Pager page={page} size={size} total={total} onPage={setPage} /></div>}
    </Panel>

    <Modal open={creating} onClose={() => !isSubmitting && setCreating(false)} title="Create user" description="The user signs in with the temporary password and must replace it immediately.">
      <form onSubmit={handleSubmit(create)} noValidate className="space-y-5">
        <FormSection title="Identity">
          <Field label="Full name" htmlFor="cu-name" required error={errors.full_name?.message}><input id="cu-name" className="inp" autoComplete="off" {...register("full_name")} /></Field>
          <Field label="Email" htmlFor="cu-email" required error={errors.email?.message}><input id="cu-email" type="email" className="inp" autoComplete="off" {...register("email")} /></Field>
        </FormSection>
        <FormSection title="Access">
          <Field label="Role" htmlFor="cu-role" required><select id="cu-role" className="inp" {...register("role")}><option value="student">Student</option><option value="mentor">Mentor</option></select></Field>
          <Field label="Temporary password" htmlFor="cu-pw" required error={errors.password?.message} hint="At least 8 characters. Share it with the user securely."><input id="cu-pw" className="inp" autoComplete="off" {...register("password")} /></Field>
        </FormSection>
        {formErr && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{formErr}</p>}
        <div className="flex justify-end gap-2"><button type="button" className="btn-ghost" onClick={() => setCreating(false)} disabled={isSubmitting}>Cancel</button>
          <button className="btn" disabled={isSubmitting}>{isSubmitting ? "Creating…" : "Create user"}</button></div>
      </form>
    </Modal>

    <ConfirmActionDialog open={!!target} onClose={() => setTarget(null)} onConfirm={toggle} danger={target?.status === "active"}
      title={target?.status === "active" ? "Suspend account?" : "Reactivate account?"} confirmLabel={target?.status === "active" ? "Suspend" : "Reactivate"}>
      {target && <><p><b>{target.full_name}</b> ({target.email})</p>
        <p className="text-muted">{target.status === "active" ? "They will be signed out and unable to see any data until reactivated. Their records are kept." : "They will be able to sign in and see their data again."}</p></>}
    </ConfirmActionDialog>
  </>;
}
