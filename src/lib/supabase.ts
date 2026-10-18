import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.includes("yvlvwipfkkuryhqgyirt")
  ? "https://efrayupwmrtzfqfuided.supabase.co"
  : (import.meta.env.VITE_SUPABASE_URL || "https://efrayupwmrtzfqfuided.supabase.co");

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.includes("RM0Xt9FIduV2w")
  ? "sb_publishable_KKuTKD_AB-0OHewzyIfwsQ_EaAG9Jrd"
  : (import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_KKuTKD_AB-0OHewzyIfwsQ_EaAG9Jrd");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
