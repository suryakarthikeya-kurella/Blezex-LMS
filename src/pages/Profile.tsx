import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { passwordSchema } from "../lib/schemas";
import { Card, Msg } from "../components/ui";
import Icon from "../components/Icon";

type ProfileDetails = {
  full_name: string;
  education_level: string;
  institution: string;
  field_of_study: string;
  graduation_year: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
};

const inputClass = "inp !rounded-xl !border-slate-200 !px-3.5 !py-3";

export default function Profile() {
  const { profile, refresh } = useAuth();
  const [details, setDetails] = useState<ProfileDetails>({
    full_name: profile?.full_name ?? "",
    education_level: profile?.education_level ?? "",
    institution: profile?.institution ?? "",
    field_of_study: profile?.field_of_study ?? "",
    graduation_year: profile?.graduation_year?.toString() ?? "",
    emergency_contact_name: profile?.emergency_contact_name ?? "",
    emergency_contact_phone: profile?.emergency_contact_phone ?? "",
  });
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const change = (key: keyof ProfileDetails, value: string) => setDetails(current => ({ ...current, [key]: value }));
  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (details.full_name.trim().length < 2) return setMsg("Name must be at least 2 characters.");
    const year = details.graduation_year.trim();
    if (year && (!/^\d{4}$/.test(year) || Number(year) < 1900 || Number(year) > 2200)) return setMsg("Enter a valid graduation year.");
    const hasEmergencyInfo = details.emergency_contact_name.trim() || details.emergency_contact_phone.trim();
    if (hasEmergencyInfo && (!details.emergency_contact_name.trim() || details.emergency_contact_phone.trim().length < 7)) return setMsg("Add both an emergency contact name and a valid phone number, or leave both blank.");

    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: details.full_name.trim(),
      education_level: details.education_level || null,
      institution: details.institution.trim() || null,
      field_of_study: details.field_of_study.trim() || null,
      graduation_year: year ? Number(year) : null,
      emergency_contact_name: details.emergency_contact_name.trim() || null,
      emergency_contact_phone: details.emergency_contact_phone.trim() || null,
    }).eq("id", profile!.id);
    if (error) setMsg(error.message);
    else {
      await refresh();
      setMsg("Your profile has been updated.");
    }
    setSaving(false);
  };

  const savePw = async () => {
    const parsed = passwordSchema.safeParse({ password: pw, confirm: pw2 });
    if (!parsed.success) return setMsg(parsed.error.issues[0].message);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setMsg(error?.message ?? "Password changed.");
    if (!error) { setPw(""); setPw2(""); }
  };

  return <div className="mx-auto max-w-4xl space-y-6">
    <header><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">Your account</p><h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-slate-900">Profile</h1><p className="mt-2 text-sm text-slate-500">Keep your personal and education details up to date.</p></header>
    <Msg m={msg} />
    <form onSubmit={saveProfile} className="space-y-5">
      <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm md:!p-7">
        <div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon name="profile" /></span><div><h2 className="font-display text-lg font-bold text-slate-900">Personal details</h2><p className="text-xs text-slate-500">Your basic account information</p></div></div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Full name<input className={`${inputClass} mt-1.5`} autoComplete="name" value={details.full_name} onChange={event => change("full_name", event.target.value)} /></label>
          <label className="text-sm font-semibold text-slate-700">Email address<input className={`${inputClass} mt-1.5 bg-slate-50 text-slate-500`} type="email" autoComplete="email" value={profile?.email ?? ""} readOnly aria-describedby="email-note" /><span id="email-note" className="mt-1 block text-xs font-normal text-slate-400">Email is managed by your account administrator.</span></label>
          <div className="text-sm font-semibold text-slate-700">Account type<div className="mt-1.5 flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium capitalize text-slate-600"><Icon name="profile" size={17} />{profile?.role}{profile?.is_alumni ? " · alumni" : ""}</div></div>
        </div>
      </Card>
      {profile?.role === "student" && <>
        <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm md:!p-7">
          <div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700"><Icon name="book" /></span><div><h2 className="font-display text-lg font-bold text-slate-900">Education details</h2><p className="text-xs text-slate-500">Optional information to personalize your learning experience</p></div></div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Education level<select className={`${inputClass} mt-1.5`} value={details.education_level} onChange={event => change("education_level", event.target.value)}><option value="">Select education level</option><option>High school</option><option>Diploma</option><option>Undergraduate</option><option>Graduate</option><option>Postgraduate</option><option>Other</option></select></label>
            <label className="text-sm font-semibold text-slate-700">Institution<input className={`${inputClass} mt-1.5`} autoComplete="organization" placeholder="School, college, or university" value={details.institution} onChange={event => change("institution", event.target.value)} /></label>
            <label className="text-sm font-semibold text-slate-700">Field of study<input className={`${inputClass} mt-1.5`} placeholder="e.g. Computer Science" value={details.field_of_study} onChange={event => change("field_of_study", event.target.value)} /></label>
            <label className="text-sm font-semibold text-slate-700">Graduation year<input className={`${inputClass} mt-1.5`} type="number" min="1900" max="2200" inputMode="numeric" placeholder="e.g. 2027" value={details.graduation_year} onChange={event => change("graduation_year", event.target.value)} /></label>
          </div>
        </Card>
        <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm md:!p-7">
          <div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-700"><Icon name="bell" /></span><div><h2 className="font-display text-lg font-bold text-slate-900">Family / emergency contact</h2><p className="text-xs text-slate-500">Optional; used only if we need to reach someone about your learning support</p></div></div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Contact name<input className={`${inputClass} mt-1.5`} autoComplete="off" placeholder="Parent, guardian, or trusted contact" value={details.emergency_contact_name} onChange={event => change("emergency_contact_name", event.target.value)} /></label>
            <label className="text-sm font-semibold text-slate-700">Contact phone<input className={`${inputClass} mt-1.5`} type="tel" autoComplete="off" placeholder="Include country code if needed" value={details.emergency_contact_phone} onChange={event => change("emergency_contact_phone", event.target.value)} /></label>
          </div>
        </Card>
      </>}
      <div className="flex justify-end"><button className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-brand disabled:cursor-wait disabled:opacity-60" disabled={saving}>{saving ? "Saving…" : "Save profile"} {!saving && <Icon name="check" size={17} />}</button></div>
    </form>
    <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm md:!p-7">
      <div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700"><Icon name="lock" /></span><div><h2 className="font-display text-lg font-bold text-slate-900">Password & security</h2><p className="text-xs text-slate-500">Choose a strong password to protect your account</p></div></div>
      <div className="grid gap-3 md:grid-cols-2"><input aria-label="New password" type="password" autoComplete="new-password" className={inputClass} placeholder="New password" value={pw} onChange={event => setPw(event.target.value)} />
        <input aria-label="Confirm password" type="password" autoComplete="new-password" className={inputClass} placeholder="Confirm new password" value={pw2} onChange={event => setPw2(event.target.value)} /></div>
      <button className="mt-3 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" onClick={savePw}>Update password</button>
    </Card>
  </div>;
}
