import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import AppShell from "./AppShell";
// Parent of every guarded route. It must redirect itself: returning null here hid the route Guards (blank page after sign-out).
export default function Layout() {
  const { profile, loading } = useAuth();
  if (loading) return <p className="p-8">Loading…</p>;
  if (!profile) return <Navigate to="/login" replace />;
  return <AppShell />;
}
