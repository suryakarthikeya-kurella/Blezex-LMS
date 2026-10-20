import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Icon, { IconName } from "./Icon";
import AppShell from "./AppShell";
import { calculateStreakInfo, StreakInfo } from "../lib/streakService";

const nav = {
  student: [
    { to: "/student", label: "Dashboard", icon: "dashboard" as IconName },
    { to: "/student/courses", label: "My Courses", icon: "courses" as IconName },
    { to: "/student/journey", label: "My Journey", icon: "journey" as IconName },
  ],
} as const;

export default function Layout() {
  const { profile, loading, signOut } = useAuth();
  const loc = useLocation();
  const [streak, setStreak] = useState<StreakInfo>(() => calculateStreakInfo(profile?.id));

  useEffect(() => {
    const updateStreak = () => setStreak(calculateStreakInfo(profile?.id));
    updateStreak();
    window.addEventListener("blezex:streak-updated", updateStreak);
    window.addEventListener("blezex:progress-updated", updateStreak);
    window.addEventListener("storage", updateStreak);
    return () => {
      window.removeEventListener("blezex:streak-updated", updateStreak);
      window.removeEventListener("blezex:progress-updated", updateStreak);
      window.removeEventListener("storage", updateStreak);
    };
  }, [profile?.id]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3 text-sm font-semibold text-slate-500">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <span>Loading learning space…</span>
        </div>
      </div>
    );
  }

  if (!profile) return <Navigate to="/login" replace />;
  if (profile.role !== "student") return <AppShell />;

  const links = [
    ...nav.student,
    { to: "/profile", label: "Profile", icon: "profile" as IconName },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-blue-600 selection:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Desktop Fixed Left Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/90 bg-white px-5 py-6 lg:flex">
        {/* Brand Header */}
        <Link to="/student" className="group flex items-center gap-3 px-1.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-lg font-black text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            B
          </span>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
              Blez<span className="text-blue-600">eX</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 -mt-0.5">
              Career Accelerator
            </span>
          </div>
        </Link>

        {/* Section Label */}
        <div className="mb-2 mt-8 px-2.5 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[.18em] text-slate-400">
          <span>Learning Space</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" title="Live System" />
        </div>

        {/* Navigation Items */}
        <nav aria-label="Main" className="space-y-1">
          {links.map(({ to, label, icon }) => {
            const active =
              loc.pathname === to ||
              (to === "/profile" && loc.pathname.startsWith("/profile")) ||
              (to === "/student/courses" && loc.pathname.startsWith("/student/course/"));

            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? "page" : undefined}
                className={`group relative flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold transition-all duration-150 ${active
                    ? "bg-blue-50/90 text-blue-700 shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-blue-600" />
                )}
                <span
                  className={`grid h-8 w-8 place-items-center rounded-xl transition-colors ${active
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200/80 group-hover:text-slate-800"
                    }`}
                >
                  <Icon name={icon} size={16} />
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>


        {/* User Profile Footer Card */}
        <div className="mt-auto rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-extrabold text-white shadow-xs">
              {profile.full_name?.charAt(0)?.toUpperCase() ?? "S"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">
                {profile.full_name}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="capitalize">{profile.is_alumni ? "Alumni" : "Active Student"}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 shadow-2xs"
          >
            <Icon name="logout" size={14} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area with Top Header */}
      <div className="min-h-screen lg:pl-64">
        {/* Modern Sticky Top Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 md:px-8">
            {/* Mobile Brand Logo */}
            <Link to="/student" className="flex items-center gap-2.5 lg:hidden">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-extrabold text-white shadow-xs">
                B
              </span>
              <span className="font-display font-extrabold tracking-tight text-slate-900">
                Blez<span className="text-blue-600">eX</span>
              </span>
            </Link>

            {/* Desktop Header Left Subtext */}
            <div className="hidden lg:flex items-center gap-2.5 text-xs font-semibold text-slate-500">
              <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700 font-bold border border-blue-200/50">
                Career Accelerator Tracks
              </span>
              <span className="text-slate-300">·</span>
              <span>Empowering your path to software, data, AI, and design leadership</span>
            </div>

            {/* Top Right Quick Badges */}
            <div className="flex items-center gap-3">
              <span
                title={`Current streak: ${streak.currentStreak} days | Best streak: ${streak.maxStreak} days. Resets to 0 if a day is missed.`}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-200/90 bg-amber-50/90 px-3 py-1 text-xs font-bold text-amber-900 shadow-2xs"
              >
                <Icon name="flame" size={14} className="text-amber-500" />
                <span>{streak.currentStreak} Day{streak.currentStreak === 1 ? "" : "s"}</span>
                <span className="text-slate-300">·</span>
                <span className="text-[10px] text-amber-700 font-extrabold">Max {streak.maxStreak}d</span>
                {streak.isActiveToday && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Active today ✓" />
                )}
              </span>

              <Link
                to="/profile"
                className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-100 text-xs font-extrabold text-blue-700">
                  {profile.full_name?.charAt(0)?.toUpperCase() ?? "S"}
                </span>
                <span className="hidden md:inline truncate max-w-[120px]">
                  {profile.full_name?.split(" ")[0]}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <nav
            aria-label="Mobile main"
            className="flex items-center justify-around border-t border-slate-100 bg-white px-3 py-2 lg:hidden"
          >
            {links.map(({ to, label, icon }) => {
              const active =
                loc.pathname === to ||
                (to === "/profile" && loc.pathname.startsWith("/profile")) ||
                (to === "/student/courses" && loc.pathname.startsWith("/student/course/"));

              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1 text-[11px] font-bold transition ${active ? "text-blue-600 font-extrabold" : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  <Icon name={icon} size={18} />
                  <span>{label}</span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={signOut}
              className="flex flex-col items-center gap-1 rounded-xl px-3 py-1 text-[11px] font-bold text-slate-500 hover:text-slate-900"
            >
              <Icon name="logout" size={18} />
              <span>Exit</span>
            </button>
          </nav>
        </header>

        {/* Main Content View Outlet */}
        <main id="main" className="mx-auto max-w-[1440px] p-5 md:p-8 animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

