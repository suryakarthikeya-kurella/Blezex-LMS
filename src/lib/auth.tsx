import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
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
  const [profile, setProfile] = useState<Profile | null>(null); const [loading, setLoading] = useState(true); const [recovery, setRecovery] = useState(false); const [notice, setNotice] = useState("");
  const inflight = useRef<{ uid: string; p: Promise<void> } | null>(null);
  const run = async (uid?: string) => {
    if (!uid) { setProfile(null); setLoading(false); return; }
    const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (error) setNotice("We couldn't load your profile. Check your connection and sign in again.");
    else if (data && data.status !== "active") { setNotice("Your account is suspended. Please contact your administrator."); await supabase.auth.signOut(); }
    else if (data) setNotice("");
    setProfile(data && data.status === "active" ? (data as Profile) : null);
    setLoading(false);
  };
  // Startup fires getSession() and the INITIAL_SESSION event for the same user; share one request.
  const load = (uid?: string) => {
    if (uid && inflight.current?.uid === uid) return inflight.current.p;
    const p: Promise<void> = run(uid).finally(() => { if (inflight.current?.p === p) inflight.current = null; });
    if (uid) inflight.current = { uid, p };
    return p;
  };
  const refresh = async () => { const { data } = await supabase.auth.getSession(); await load(data.session?.user.id); };
  useEffect(() => {
    refresh();
    const { data: sub } = supabase.auth.onAuthStateChange((ev, s) => { if (ev === "PASSWORD_RECOVERY") setRecovery(true); setTimeout(() => load(s?.user.id), 0); });
    return () => sub.subscription.unsubscribe();
  }, []);
  return <Ctx.Provider value={{ profile, loading, recovery, notice, clearNotice: () => setNotice(""), refresh, endRecovery: () => setRecovery(false), signOut: async () => { await supabase.auth.signOut(); } }}>{children}</Ctx.Provider>;
}
