import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "./supabase";
export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "mentor" | "student";
  status: string;
  must_change_password: boolean;
  is_alumni: boolean;
  education_level?: string | null;
  institution?: string | null;
  field_of_study?: string | null;
  graduation_year?: number | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
};
type C = { profile: Profile | null; loading: boolean; recovery: boolean; signOut: () => Promise<void>; refresh: () => Promise<void>; endRecovery: () => void };
const Ctx = createContext<C>({ profile: null, loading: true, recovery: false, signOut: async () => {}, refresh: async () => {}, endRecovery: () => {} });
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null); const [loading, setLoading] = useState(true); const [recovery, setRecovery] = useState(false);
  const load = async (uid?: string) => {
    if (!uid) { setProfile(null); setLoading(false); return; }
    const { data } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    setProfile(data && data.status === "active" ? (data as Profile) : null);
    if (data && data.status !== "active") await supabase.auth.signOut();
    setLoading(false);
  };
  const refresh = async () => { const { data } = await supabase.auth.getSession(); await load(data.session?.user.id); };
  useEffect(() => {
    refresh();
    const { data: sub } = supabase.auth.onAuthStateChange((ev, s) => { if (ev === "PASSWORD_RECOVERY") setRecovery(true); setTimeout(() => load(s?.user.id), 0); });
    return () => sub.subscription.unsubscribe();
  }, []);
  return <Ctx.Provider value={{ profile, loading, recovery, refresh, endRecovery: () => setRecovery(false), signOut: async () => { await supabase.auth.signOut(); } }}>{children}</Ctx.Provider>;
}
