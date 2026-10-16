import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Icon, IconName } from "./icons";
import { ToastProvider } from "./admin/kit";
// Admin + Mentor chrome: persistent sidebar + compact header (Student keeps Layout's top nav).
type Item = { to: string; label: string; icon: IconName };
const NAV: Record<"admin" | "mentor", Item[]> = { admin: [
  { to: "/admin", label: "Overview", icon: "home" }, { to: "/admin/people", label: "People", icon: "users" },
  { to: "/admin/courses", label: "Courses", icon: "book" }, { to: "/admin/enrollments", label: "Course Access", icon: "key" },
  { to: "/admin/reports", label: "Reports", icon: "chart" }, { to: "/admin/audit", label: "Audit Log", icon: "list" },
],
  mentor: [{ to: "/mentor", label: "My Students", icon: "users" }, { to: "/profile", label: "Profile", icon: "user" }] };
const isActive = (to: string, path: string) => to === "/admin" ? path === to : path === to || path.startsWith(to + "/");
export default function AppShell() {
  const { profile, signOut } = useAuth(); const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false); // desktop: icons only
  const [drawer, setDrawer] = useState(false); // mobile: overlay
  const [menu, setMenu] = useState(false); const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => setDrawer(false), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const off = (e: MouseEvent) => { if (!menuRef.current?.contains(e.target as Node)) setMenu(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    document.addEventListener("mousedown", off); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); };
  }, [menu]);
  if (!profile || profile.role === "student") return null;
  const nav = NAV[profile.role]; const roleLabel = profile.role === "admin" ? "Admin" : "Mentor";
  const current = nav.find(n => isActive(n.to, pathname)) ?? (pathname === "/profile" ? { label: "Profile" } : undefined);
  const toggle = () => window.matchMedia("(min-width: 768px)").matches ? setCollapsed(c => !c) : setDrawer(d => !d);
  const label = `${collapsed ? "md:hidden" : ""}`;
  return (
    <div className="admin-ui min-h-screen md:flex">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-2 focus:z-50">Skip to content</a>
      {drawer && <div className="fixed inset-0 bg-ink/40 z-30 md:hidden" onClick={() => setDrawer(false)} aria-hidden="true" />}
      <aside aria-label="Sidebar" className={`fixed md:sticky top-0 z-40 h-screen shrink-0 bg-white border-r border-hairline flex flex-col transition-all duration-200 w-64 ${collapsed ? "md:w-[72px]" : "md:w-64"} ${drawer ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className={`h-16 flex items-center px-5 border-b border-hairline ${collapsed ? "md:justify-center md:px-0" : ""}`}>
          <span className="font-heading text-xl font-extrabold text-ink">Bleze<span className="text-brand">X</span><span className={`font-sans text-brand text-sm font-semibold ml-2 ${label}`}>portal</span></span>
        </div>
        <nav aria-label="Main" className="flex-1 overflow-y-auto p-3 space-y-1">{nav.map(n => { const on = isActive(n.to, pathname); return (
          <Link key={n.to} to={n.to} title={n.label} aria-current={on ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${collapsed ? "md:justify-center" : ""} ${on ? "bg-ink text-white" : "text-[#333] hover:bg-paper"}`}>
            <Icon name={n.icon} className={`w-5 h-5 shrink-0 ${on ? "text-brand" : ""}`} /><span className={label}>{n.label}</span></Link>); })}</nav>
        <p className={`px-5 py-3 text-xs text-muted border-t border-hairline ${label}`}>BlezeX Career Accelerator</p>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-hairline sticky top-0 z-20 flex items-center gap-3 px-4 md:px-6">
          <button className="p-2 -ml-2 rounded-lg hover:bg-paper" onClick={toggle} aria-label="Toggle sidebar"><Icon name="menu" /></button>
          <div className="min-w-0 flex-1"><p className="text-xs text-muted leading-none">{roleLabel}</p><p className="font-heading font-bold text-ink truncate">{current?.label ?? roleLabel}</p></div>
          <div className="relative" ref={menuRef}>
            <button className="flex items-center gap-2 rounded-full border border-hairline pl-1 pr-3 py-1 hover:border-ink" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu(m => !m)}>
              <span className="w-8 h-8 rounded-full bg-brand text-white grid place-items-center text-sm font-bold">{profile.full_name.trim().charAt(0).toUpperCase()}</span>
              <span className="hidden sm:block text-sm font-medium text-ink max-w-[10rem] truncate">{profile.full_name}</span></button>
            {menu && <div role="menu" className="absolute right-0 mt-2 w-56 bg-white border border-hairline rounded-2xl p-2 shadow-[0_8px_24px_-12px_rgba(17,17,17,.2)]">
              <p className="px-3 py-2 text-xs text-muted truncate">{profile.email}</p>
              <Link role="menuitem" to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-paper" onClick={() => setMenu(false)}><Icon name="user" className="w-4 h-4" />Profile</Link>
              <button role="menuitem" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-paper text-left" onClick={signOut}><Icon name="logout" className="w-4 h-4" />Sign out</button></div>}
          </div>
        </header>
        <main id="main" className="max-w-[1400px] mx-auto p-4 md:p-6"><ToastProvider><Outlet /></ToastProvider></main>
      </div>
    </div>
  );
}
