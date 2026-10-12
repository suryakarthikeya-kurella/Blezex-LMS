import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../lib/supabase";
import { loginSchema } from "../lib/schemas";
import { Card, Annotation } from "../components/ui";
type F = z.infer<typeof loginSchema>;
export default function Login() {
  const nav = useNavigate(); const [err, setErr] = useState(""); const [info, setInfo] = useState("");
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(loginSchema) });
  const submit = async (v: F) => {
    setErr(""); setInfo("");
    const { error } = await supabase.auth.signInWithPassword(v);
    if (error) return setErr("Invalid credentials or account suspended.");
    nav("/");
  };
  const reset = async () => {
    const email = getValues("email"); if (!email) return setErr("Enter your email first.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    setErr(""); setInfo(error ? error.message : "If the account exists, a reset link was sent.");
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-paper"><Card className="w-full max-w-sm">
      <h1 className="text-2xl font-extrabold">Blez<span className="text-brand">X</span> Career Accelerator</h1><Annotation text="sign in to learn!" />
      <form onSubmit={handleSubmit(submit)} className="space-y-3 mt-4" noValidate>
        <div><label className="text-xs" htmlFor="em">Email</label><input id="em" className="inp" type="email" autoComplete="username" {...register("email")} />{errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}</div>
        <div><label className="text-xs" htmlFor="pw">Password</label><input id="pw" className="inp" type="password" autoComplete="current-password" {...register("password")} />{errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}</div>
        {err && <p role="alert" className="text-sm text-red-600">{err}</p>}{info && <p className="text-sm text-green-700">{info}</p>}
        <button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign in"}</button></form>
      <button className="text-xs underline mt-3" onClick={reset}>Forgot password?</button>
      <p className="text-xs text-muted mt-4">Accounts are created by your administrator. Support: connect.blezex@gmail.com · +91 9059634555</p></Card></div>
  );
}
