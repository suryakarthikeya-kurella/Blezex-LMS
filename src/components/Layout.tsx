import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Icon, { IconName } from "./Icon";
import AppShell from "./AppShell";
const nav = { student: [["/student", "Dashboard"], ["/student/courses", "My courses"], ["/student/journey", "My journey"]] } as const;
export default function Layout() {
  const { profile, loading, signOut } = useAuth(); const loc = useLocation();
  // Parent of every guarded route: it must redirect itself, returning null hid the route Guards (blank page after sign-out).
  if (loading) return <p className="p-8">Loading…</p>;
  if (!profile) return <Navigate to="/login" replace />;
  if (profile.role !== "student") return <AppShell />;
  const links = [...nav.student, ["/profile", "Profile"]];
  return (
    <div className="min-h-screen bg-[#F6F8FC] text-slate-800">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-2">Skip to content</a>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
        <Link to="/student" className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-lg font-extrabold text-white">B</span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">Blez<span className="text-brand">X</span><span className="ml-1 text-sm font-medium text-slate-400">learn</span></span>
        </Link>
        <p className="mb-3 mt-10 px-3 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Learning space</p>
        <nav aria-label="Main" className="space-y-1">
          {links.map(([to, label]) => {
            const active = loc.pathname === to || (to === "/profile" && loc.pathname.startsWith("/profile")) || (to === "/student/courses" && loc.pathname.startsWith("/student/course/"));
            const iconName: IconName = to === "/profile" ? "profile" : to === "/student" ? "dashboard" : to === "/student/courses" ? "courses" : "journey";
            return <Link key={to} to={to} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${active ? "bg-orange-50 text-brand" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
              <Icon name={iconName} size={19} />{label}
            </Link>;
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-brand">{profile.full_name?.charAt(0)?.toUpperCase() ?? "S"}</span>
            <div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{profile.full_name}</p><p className="text-xs capitalize text-slate-500">{profile.is_alumni ? "Alumni" : "Student"}</p></div>
          </div>
          <button className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900" onClick={signOut}>Sign out</button>
        </div>
      </aside>
      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 px-5 py-3 md:px-8 lg:flex-nowrap">
            <Link to="/student" className="flex items-center gap-2 lg:hidden"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand font-extrabold text-white">B</span><span className="font-display font-extrabold text-ink">Blez<span className="text-brand">X</span></span></Link>
            <p className="hidden text-sm font-medium text-slate-500 lg:block">Your learning journey, all in one place</p>
            <nav aria-label="Mobile main" className="order-last flex w-full items-center justify-between gap-1 overflow-x-auto lg:hidden">
              {links.map(([to, label]) => {
                const active = loc.pathname === to || (to === "/profile" && loc.pathname.startsWith("/profile")) || (to === "/student/courses" && loc.pathname.startsWith("/student/course/"));
                const iconName: IconName = to === "/profile" ? "profile" : to === "/student" ? "dashboard" : to === "/student/courses" ? "courses" : "journey";
                return <Link key={to} to={to} aria-current={active ? "page" : undefined} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold ${active ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"}`}><Icon name={iconName} size={14} />{label}</Link>;
              })}
              <button className="rounded-full px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100" onClick={signOut}>Sign out</button>
            </nav>
            <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-brand sm:flex lg:hidden">{profile.full_name?.charAt(0)?.toUpperCase() ?? "S"}</span>
          </div>
        </header>
        <main id="main" className="mx-auto max-w-[1440px] p-5 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
