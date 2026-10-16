import { ReactNode } from "react";
// Minimal stroke icon set (24x24, lucide-style paths) — no icon dependency.
const P: Record<string, ReactNode> = {
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
  users: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" /><path d="M16 3.1a4 4 0 010 7.8M22 21v-2a4 4 0 00-3-3.9" /></>,
  mentor: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" /><path d="M16 11l2 2 4-4" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5z" /><path d="M4 19.5A2.5 2.5 0 006.5 22H20v-5" /></>,
  key: <><circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3L21 2M16 7l3 3" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></>,
  list: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  award: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></>,
  layers: <><path d="M12 2l10 5-10 5L2 7z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  logout: <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  alert: <><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /><path d="M12 9v4M12 17h.01" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeoff: <><path d="M3 3l18 18" /><path d="M10.6 6.1A10 10 0 0112 6c6.5 0 10 6 10 6a17 17 0 01-3.2 3.8M6.6 7.6C3.8 9.3 2 12 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.5-1" /><path d="M9.9 9.9a3 3 0 004.2 4.2" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.4 8.5-8 9-4.6-.5-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M21 19a4 4 0 01-4 3h-3" /></>,
  bookopen: <><path d="M2 4h7a3 3 0 013 3v14a2 2 0 00-2-2H2z" /><path d="M22 4h-7a3 3 0 00-3 3v14a2 2 0 012-2h8z" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
};
export type IconName = keyof typeof P;
export const Icon = ({ name, className = "w-5 h-5" }: { name: IconName; className?: string }) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{P[name]}</svg>;
