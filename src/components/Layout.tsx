import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
const nav = {
  admin: [["/admin", "Overview"], ["/admin/people", "People"], ["/admin/courses", "Courses"], ["/admin/enrollments", "Course Access"], ["/admin/reports", "Reports"], ["/admin/audit", "Audit Log"]],
  mentor: [["/mentor", "My Students"]],
  student: [["/student", "My Learning"]],
} as const;
export default function Layout() {
  const { profile, signOut } = useAuth(); const loc = useLocation();
  if (!profile) return null;
  const links = [...nav[profile.role], ["/profile", "Profile"]];
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-2">Skip to content</a>
      <header className="bg-white border-b border-hairline sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-display text-xl font-extrabold text-ink">Blez<span className="text-brand">X</span><span className="font-hand text-brand text-lg ml-2">portal</span></span>
          <nav aria-label="Main" className="flex gap-1 flex-wrap flex-1 order-last md:order-none w-full md:w-auto overflow-x-auto">{links.map(([to, l]) =>
            <Link key={to} to={to} aria-current={loc.pathname === to ? "page" : undefined} className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${loc.pathname === to ? "bg-ink text-white" : "hover:bg-paper"}`}>{l}</Link>)}</nav>
          <span className="text-xs text-muted">{profile.full_name} · {profile.role}{profile.is_alumni ? " · alumni" : ""}</span>
          <button className="btn-ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>
      <main id="main" className="max-w-6xl mx-auto p-4 md:p-6"><Outlet /></main>
    </div>
  );
}
