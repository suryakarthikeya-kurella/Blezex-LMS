import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { passwordSchema } from "../lib/schemas";
import { Card, Title, Msg } from "../components/ui";
export default function Profile() {
  const { profile, refresh } = useAuth(); const [name, setName] = useState(profile?.full_name ?? ""); const [pw, setPw] = useState(""); const [pw2, setPw2] = useState(""); const [msg, setMsg] = useState("");
  const saveName = async () => { if (name.trim().length < 2) return setMsg("Name too short.");
    const { error } = await supabase.from("profiles").update({ full_name: name.trim() }).eq("id", profile!.id); setMsg(error?.message ?? "Profile updated."); refresh(); };
  const savePw = async () => { const p = passwordSchema.safeParse({ password: pw, confirm: pw2 }); if (!p.success) return setMsg(p.error.issues[0].message);
    const { error } = await supabase.auth.updateUser({ password: pw }); setMsg(error?.message ?? "Password changed."); setPw(""); setPw2(""); };
  return <><Title note="your details">Profile</Title><Msg m={msg} />
    <div className="grid md:grid-cols-2 gap-4">
      <Card><p className="text-xs text-muted mb-2">{profile?.email} · {profile?.role}</p><label className="text-xs" htmlFor="n">Full name</label>
        <input id="n" className="inp mb-2" value={name} onChange={e => setName(e.target.value)} /><button className="btn" onClick={saveName}>Save</button></Card>
      <Card><h2 className="font-bold mb-2">Change password</h2><input aria-label="New password" type="password" className="inp mb-2" placeholder="New password" value={pw} onChange={e => setPw(e.target.value)} />
        <input aria-label="Confirm" type="password" className="inp mb-2" placeholder="Confirm" value={pw2} onChange={e => setPw2(e.target.value)} /><button className="btn" onClick={savePw}>Update</button></Card></div></>;
}
