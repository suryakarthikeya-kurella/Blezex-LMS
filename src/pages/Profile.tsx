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

  return (
    <div className="mx-auto max-w-4xl space-y-7 pb-12">
      <header className="border-b border-slate-200/80 pb-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-blue-700 shadow-2xs">
          <Icon name="profile" size={13} />
          <span>Account Settings</span>
        </span>
        <h1 className="mt-2.5 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Student Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal details, academic background, and security credentials.
        </p>
      </header>

      <Msg m={msg} />

      <form onSubmit={saveProfile} className="space-y-6">
        <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs md:!p-8 bg-white">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Icon name="profile" size={20} />
            </span>
            <div>
              <h2 className="font-display text-xl font-extrabold text-slate-900">Personal Information</h2>
              <p className="text-xs text-slate-500">Your core identity details</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Full Name
              <input
                className={`${inputClass} mt-2`}
                autoComplete="name"
                value={details.full_name}
                onChange={event => change("full_name", event.target.value)}
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Email Address
              <input
                className={`${inputClass} mt-2 bg-slate-50 text-slate-500 cursor-not-allowed`}
                type="email"
                autoComplete="email"
                value={profile?.email ?? ""}
                readOnly
                aria-describedby="email-note"
              />
              <span id="email-note" className="mt-1.5 block text-[11px] font-normal text-slate-400">
                Managed by your account administrator.
              </span>
            </label>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Account Role
              <div className="mt-2 flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs font-bold capitalize text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{profile?.role} {profile?.is_alumni ? "· Alumni" : "· Active Learner"}</span>
              </div>
            </div>
          </div>
        </Card>

        {profile?.role === "student" && (
          <>
            <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs md:!p-8 bg-white">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/20">
                  <Icon name="book" size={20} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-slate-900">Academic Background</h2>
                  <p className="text-xs text-slate-500">Education and study specialization</p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Education Level
                  <select
                    className={`${inputClass} mt-2`}
                    value={details.education_level}
                    onChange={event => change("education_level", event.target.value)}
                  >
                    <option value="">Select education level</option>
                    <option>High school</option>
                    <option>Diploma</option>
                    <option>Undergraduate</option>
                    <option>Graduate</option>
                    <option>Postgraduate</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Institution
                  <input
                    className={`${inputClass} mt-2`}
                    autoComplete="organization"
                    placeholder="School, college, or university"
                    value={details.institution}
                    onChange={event => change("institution", event.target.value)}
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Field of Study
                  <input
                    className={`${inputClass} mt-2`}
                    placeholder="e.g. Computer Science / Engineering"
                    value={details.field_of_study}
                    onChange={event => change("field_of_study", event.target.value)}
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Graduation Year
                  <input
                    className={`${inputClass} mt-2`}
                    type="number"
                    min="1900"
                    max="2200"
                    inputMode="numeric"
                    placeholder="e.g. 2026"
                    value={details.graduation_year}
                    onChange={event => change("graduation_year", event.target.value)}
                  />
                </label>
              </div>
            </Card>

            <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs md:!p-8 bg-white">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
                  <Icon name="bell" size={20} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-slate-900">Family & Emergency Contact</h2>
                  <p className="text-xs text-slate-500">Contact person for student support or verification</p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Contact Name
                  <input
                    className={`${inputClass} mt-2`}
                    autoComplete="off"
                    placeholder="Parent, guardian, or trusted contact"
                    value={details.emergency_contact_name}
                    onChange={event => change("emergency_contact_name", event.target.value)}
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Contact Phone
                  <input
                    className={`${inputClass} mt-2`}
                    type="tel"
                    autoComplete="off"
                    placeholder="Include country/area code"
                    value={details.emergency_contact_phone}
                    onChange={event => change("emergency_contact_phone", event.target.value)}
                  />
                </label>
              </div>
            </Card>
          </>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-lg disabled:cursor-wait disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Saving Changes…" : "Save Profile"} {!saving && <Icon name="check" size={17} />}
          </button>
        </div>
      </form>

      <Card className="!rounded-3xl !border-slate-200/90 !p-6 !shadow-xs md:!p-8 bg-white">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-xs">
            <Icon name="lock" size={20} />
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold text-slate-900">Password & Security</h2>
            <p className="text-xs text-slate-500">Update your access password</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            aria-label="New password"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            placeholder="New password (min. 8 characters)"
            value={pw}
            onChange={event => setPw(event.target.value)}
          />
          <input
            aria-label="Confirm password"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            placeholder="Confirm new password"
            value={pw2}
            onChange={event => setPw2(event.target.value)}
          />
        </div>
        <button
          type="button"
          className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 hover:border-slate-300"
          onClick={savePw}
        >
          Update Password
        </button>
      </Card>
    </div>
  );
}
