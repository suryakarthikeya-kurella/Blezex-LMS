import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../../lib/supabase";
import { createUserSchema } from "../../lib/schemas";
import Pager from "../../components/Pager";
import { Card, Title, Msg } from "../../components/ui";
type F = z.infer<typeof createUserSchema>;
export default function People() {
  const [rows, setRows] = useState<any[]>([]); const [total, setTotal] = useState(0); const [page, setPage] = useState(0); const [q, setQ] = useState("");
  const [role, setRole] = useState(""); const [sort, setSort] = useState("created_at"); const [msg, setMsg] = useState(""); const size = 15;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(createUserSchema), defaultValues: { role: "student" } });
  const load = async () => {
    let s = supabase.from("profiles").select("*", { count: "exact" }); if (role) s = s.eq("role", role);
    if (q.trim()) s = s.or(`full_name.ilike.%${q.trim()}%,email.ilike.%${q.trim()}%`);
    const { data, count, error } = await s.order(sort, { ascending: sort !== "created_at" }).range(page * size, page * size + size - 1);
    if (error) setMsg(error.message); setRows(data ?? []); setTotal(count ?? 0);
  };
  useEffect(() => { load(); }, [page, q, role, sort]);
  const create = async (v: F) => {
    setMsg(""); const { data, error } = await supabase.functions.invoke("admin-create-user", { body: v });
    if (error || data?.error) return setMsg(data?.error ?? error?.message ?? "Failed");
    setMsg("Account created. The user must change the temporary password at first login."); reset({ role: "student", full_name: "", email: "", password: "" }); load();
  };
  const toggle = async (p: any) => {
    if (!confirm(`${p.status === "active" ? "Suspend" : "Reactivate"} ${p.full_name}?`)) return;
    const { error } = await supabase.from("profiles").update({ status: p.status === "active" ? "suspended" : "active" }).eq("id", p.id);
    if (!error) await supabase.from("audit_logs").insert({ action: "set_status_" + (p.status === "active" ? "suspended" : "active"), entity: "profiles", entity_id: p.id }).then(() => {}, () => {});
    setMsg(error?.message ?? ""); load();
  };
  return <><Title note="admins create all accounts">People</Title>
    <Card className="mb-6"><h2 className="font-bold mb-3">Create student / mentor</h2>
      <form onSubmit={handleSubmit(create)} className="grid md:grid-cols-5 gap-2" noValidate>
        <div><input aria-label="Full name" className="inp" placeholder="Full name" {...register("full_name")} /><p className="text-xs text-red-600">{errors.full_name?.message}</p></div>
        <div><input aria-label="Email" className="inp" placeholder="Email" {...register("email")} /><p className="text-xs text-red-600">{errors.email?.message}</p></div>
        <div><input aria-label="Temporary password" className="inp" placeholder="Temp password (8+)" {...register("password")} /><p className="text-xs text-red-600">{errors.password?.message}</p></div>
        <select aria-label="Role" className="inp" {...register("role")}><option value="student">student</option><option value="mentor">mentor</option></select>
        <button className="btn" disabled={isSubmitting}>Create</button></form><Msg m={msg} /></Card>
    <div className="flex flex-wrap gap-2 mb-3">
      <input aria-label="Search" className="inp max-w-xs" placeholder="Search name/email…" value={q} onChange={e => { setPage(0); setQ(e.target.value); }} />
      <select aria-label="Role filter" className="inp max-w-[140px]" value={role} onChange={e => { setPage(0); setRole(e.target.value); }}><option value="">All roles</option><option>student</option><option>mentor</option><option>admin</option></select>
      <select aria-label="Sort" className="inp max-w-[160px]" value={sort} onChange={e => setSort(e.target.value)}><option value="created_at">Newest</option><option value="full_name">Name A–Z</option><option value="role">Role</option></select></div>
    <Card className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-muted"><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th /></tr></thead>
      <tbody>{rows.map(p => <tr key={p.id} className="border-t border-hairline"><td className="py-2">{p.full_name}{p.is_alumni && " 🎓"}</td><td>{p.email}</td><td>{p.role}</td><td>{p.status}</td>
        <td>{p.role !== "admin" && <button className="btn-ghost" onClick={() => toggle(p)}>{p.status === "active" ? "Suspend" : "Reactivate"}</button>}</td></tr>)}</tbody></table>
      <Pager page={page} size={size} total={total} onPage={setPage} /></Card></>;
}
