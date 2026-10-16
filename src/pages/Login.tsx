import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../lib/supabase";
import { loginSchema } from "../lib/schemas";
import { useAuth } from "../lib/auth";
import { Icon, IconName } from "../components/icons";
type F = z.infer<typeof loginSchema>;
const FEATURES: { icon: IconName; title: string; text: string }[] = [
  { icon: "bookopen", title: "Structured Learning", text: "Learn at your own pace with curated courses." },
  { icon: "users", title: "Mentor Guidance", text: "Get support and feedback from industry experts." },
  { icon: "award", title: "Verified Certificates", text: "Showcase your skills with trusted credentials." },
];
// Optional photo: drop it at public/login-hero.jpg. Without it the dark gradient + orange glow below shows instead.
const HERO = "linear-gradient(90deg,#0d0d0d 30%,rgba(13,13,13,.6) 62%,rgba(13,13,13,.15) 100%),url(/login-hero.jpg),radial-gradient(circle at 78% 72%,rgba(255,77,28,.28),transparent 55%),linear-gradient(160deg,#171717,#0b0b0b)";
const Wordmark = ({ className = "" }: { className?: string }) => <span className={`font-heading font-extrabold ${className}`}>Bleze<span className="text-brand">X</span></span>;
export default function Login() {
  const { profile, loading } = useAuth(); const [err, setErr] = useState(""); const [info, setInfo] = useState(""); const [show, setShow] = useState(false); const [sending, setSending] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(loginSchema) });
  const submit = async (v: F) => {
    setErr(""); setInfo("");
    const { error } = await supabase.auth.signInWithPassword(v);
    if (error) return setErr("Invalid credentials or account suspended.");
    // No navigation here: the profile loads asynchronously after sign-in, so redirecting now bounced back to /login. The redirect below fires once it is ready.
  };
  const reset = async () => {
    const email = getValues("email"); if (!email) { setInfo(""); return setErr("Enter your email first."); }
    setSending(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    setSending(false); setErr(""); setInfo(error ? error.message : "If the account exists, a reset link was sent.");
  };
  if (!loading && profile) return <Navigate to={`/${profile.role}`} replace />;
  return (
    <div className="admin-ui min-h-screen lg:grid lg:grid-cols-[58fr_42fr]">
      <aside className="hidden lg:flex relative overflow-hidden flex-col justify-between text-white px-[clamp(40px,5vw,76px)] py-[clamp(32px,5vh,52px)] bg-[#0d0d0d] bg-cover bg-right" style={{ backgroundImage: HERO }} aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 970 941" preserveAspectRatio="xMaxYMid slice" fill="none"><path d="M970 70C760 190 640 330 662 470c13 90 38 130 98 230" stroke="#FF4D1C" strokeOpacity=".55" /><path d="M970 130C800 230 700 360 692 486" stroke="#FF4D1C" strokeOpacity=".35" /><circle cx="692" cy="486" r="5" fill="#FF4D1C" /></svg>
        <div className="relative"><Wordmark className="text-[2.25rem] leading-none block" /><p className="text-[17px] text-white/80 mt-1">Career Accelerator</p></div>
        <div className="relative -top-10 max-w-[560px]">
          <div className="w-11 h-[3px] bg-brand rounded-full mb-5" />
          <p className="text-[13px] tracking-[0.28em] text-white/50 uppercase">Learn · Practise · Get certified</p>
          <p className="font-heading font-extrabold text-[clamp(2.75rem,4.3vw,4.1rem)] leading-[1.04] tracking-tight mt-4">Build the<br /><span className="text-brand">career</span> you want.</p>
          <p className="text-lg text-white/70 mt-5 max-w-md leading-relaxed">Access curated courses, expert mentorship and industry-aligned certifications — all in one place.</p>
          <ul className="mt-9 space-y-5">{FEATURES.map(f => <li key={f.title} className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-[#1c1411] border border-[#3b2518] grid place-items-center shrink-0"><Icon name={f.icon} className="w-7 h-7 text-brand" /></span>
            <span><span className="block font-heading font-semibold text-[17px]">{f.title}</span><span className="block text-sm text-white/60 mt-0.5">{f.text}</span></span></li>)}</ul>
        </div>
        <div className="relative flex items-center gap-6">
          <div><p className="font-heading font-bold text-[22px] leading-none">50+</p><p className="text-sm text-white/60 mt-1">Courses</p></div><span className="w-px h-10 bg-white/15" />
          <div><p className="font-heading font-bold text-[22px] leading-none text-brand">Expert</p><p className="text-sm text-white/60 mt-1">Mentors</p></div><span className="w-px h-10 bg-white/15" />
          <div><p className="font-heading font-bold text-[22px] leading-none text-brand">Real Skills</p><p className="text-sm text-white/60 mt-1">Real Opportunities</p></div>
        </div>
      </aside>
      <main className="relative flex flex-col items-center justify-center bg-[#FAF9F6] px-4 py-10 lg:pt-[clamp(40px,11.7vh,110px)] min-h-screen">
        <div className="lg:absolute lg:top-8 lg:right-8 order-last lg:order-none mt-8 lg:mt-0 flex items-center gap-3 rounded-2xl bg-[#FFF1EA] px-5 py-3">
          <Icon name="headset" className="w-7 h-7 text-brand shrink-0" /><p className="text-sm leading-tight"><span className="block font-semibold text-ink">Need help?</span><span className="text-[#555]">Contact your administrator.</span></p></div>
        <div className="w-full max-w-[508px]">
          <p className="lg:hidden mb-6 text-center"><Wordmark className="text-3xl text-ink" /><span className="block text-sm text-muted">Career Accelerator</span></p>
          <div className="bg-white rounded-[24px] p-7 sm:p-10 shadow-[0_24px_60px_-30px_rgba(17,17,17,.25)] border border-[#EFEDE8]">
            <h1 className="!font-extrabold text-[2.5rem] leading-tight">Welcome back</h1>
            <p className="text-lg text-muted mt-1">Sign in to your BlezeX account</p>
            <form onSubmit={handleSubmit(submit)} className="space-y-5 mt-8" noValidate>
              <div><label className="text-[15px] font-semibold text-ink" htmlFor="em">Email</label>
                <div className="relative mt-2"><Icon name="mail" className="w-5 h-5 text-[#444] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input id="em" className="inp !h-[52px] !rounded-xl !pl-12 !text-[15px] !bg-[#FBFAF8]" type="email" placeholder="you@example.com" autoComplete="username" aria-invalid={!!errors.email} {...register("email")} /></div>
                {errors.email && <p role="alert" className="text-xs text-red-600 mt-1.5">{errors.email.message}</p>}</div>
              <div><div className="flex items-center justify-between"><label className="text-[15px] font-semibold text-ink" htmlFor="pw">Password</label>
                  <button type="button" className="text-[15px] font-semibold text-brand hover:underline disabled:opacity-50" onClick={reset} disabled={sending}>{sending ? "Sending…" : "Forgot password?"}</button></div>
                <div className="relative mt-2"><Icon name="lock" className="w-5 h-5 text-[#444] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input id="pw" className="inp !h-[52px] !rounded-xl !pl-12 !pr-12 !text-[15px] !bg-[#FBFAF8]" type={show ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" aria-invalid={!!errors.password} {...register("password")} />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] hover:text-ink" aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} onClick={() => setShow(s => !s)}><Icon name={show ? "eyeoff" : "eye"} className="w-5 h-5" /></button></div>
                {errors.password && <p role="alert" className="text-xs text-red-600 mt-1.5">{errors.password.message}</p>}</div>
              {err && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{err}</p>}
              {info && <p role="status" className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-xl px-3 py-2">{info}</p>}
              <button className="btn w-full !h-14 !text-base !bg-brand hover:!bg-[#E63E10] inline-flex items-center justify-center gap-2" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : <>Sign in<Icon name="arrow" className="w-5 h-5" /></>}</button></form>
            <div className="flex items-center gap-4 my-6 text-sm text-muted"><span className="flex-1 h-px bg-hairline" />or<span className="flex-1 h-px bg-hairline" /></div>
            <div className="flex gap-3 rounded-xl bg-[#FFF1EA] p-4"><Icon name="shield" className="w-7 h-7 text-brand shrink-0" /><p className="text-sm leading-snug"><span className="block font-semibold text-ink text-[15px]">Secure access</span><span className="text-[#555]">Only authorized students, mentors and administrators can sign in.</span></p></div>
          </div>
          <div className="text-center text-sm mt-8 space-y-1"><p className="font-medium text-ink">BlezeX Career Accelerator</p>
            <p className="text-[#444]">For support: <a className="underline" href="mailto:connect.blezex@gmail.com">connect.blezex@gmail.com</a> &nbsp;|&nbsp; <a className="whitespace-nowrap" href="tel:+919059634555">+91 9059634555</a></p></div>
        </div>
      </main>
    </div>
  );
}
