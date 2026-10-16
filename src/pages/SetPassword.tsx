import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../lib/supabase";
import { passwordSchema } from "../lib/schemas";
import { useAuth } from "../lib/auth";
import { Card, Annotation } from "../components/ui";
type F = z.infer<typeof passwordSchema>;
export default function SetPassword() {
  const { profile, refresh, endRecovery, signOut } = useAuth(); const [err, setErr] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(passwordSchema) });
  const submit = async (v: F) => {
    setErr("");
    const { error } = await supabase.auth.updateUser({ password: v.password });
    if (error) return setErr(error.message);
    if (profile) { const r = await supabase.from("profiles").update({ must_change_password: false }).eq("id", profile.id);
      if (r.error) return setErr("Your password was changed, but we could not finish the setup: " + r.error.message + ". Please try again."); }
    endRecovery(); await refresh(); window.location.assign("/");
  };
  return <div className="min-h-screen flex items-center justify-center p-4"><Card className="w-full max-w-sm">
    <h1 className="text-2xl font-extrabold">Set a new password</h1><Annotation text="almost there" />
    <form onSubmit={handleSubmit(submit)} className="space-y-3 mt-4" noValidate>
      <div><input aria-label="New password" className="inp" type="password" placeholder="New password" autoComplete="new-password" {...register("password")} />{errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}</div>
      <div><input aria-label="Confirm password" className="inp" type="password" placeholder="Confirm password" autoComplete="new-password" {...register("confirm")} />{errors.confirm && <p className="text-xs text-red-600">{errors.confirm.message}</p>}</div>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button className="btn w-full" disabled={isSubmitting}>Save password</button></form>
    <button className="text-xs underline mt-3" onClick={signOut}>Sign out</button></Card></div>;
}
