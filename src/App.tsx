import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, ReactNode, Suspense } from "react";
import { useAuth } from "./lib/auth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import SetPassword from "./pages/SetPassword";
const Profile = lazy(() => import("./pages/Profile"));
const AdminHome = lazy(() => import("./pages/admin/Home"));
const People = lazy(() => import("./pages/admin/People"));
const Courses = lazy(() => import("./pages/admin/Courses"));
const CourseEditor = lazy(() => import("./pages/admin/CourseEditor"));
const Enrollments = lazy(() => import("./pages/admin/Enrollments"));
const Reports = lazy(() => import("./pages/admin/Reports"));
const Audit = lazy(() => import("./pages/admin/Audit"));
const MentorHome = lazy(() => import("./pages/mentor/Home"));
const MentorEnrollment = lazy(() => import("./pages/mentor/EnrollmentDetail"));
const StudentHome = lazy(() => import("./pages/student/Home"));
const StudentCourse = lazy(() => import("./pages/student/Course"));

function Guard({ role, children }: { role: string; children: ReactNode }) {
  const { profile, loading } = useAuth();
  if (loading) return <p className="p-8">Loading…</p>;
  if (!profile) return <Navigate to="/login" replace />;
  if (profile.role !== role) return <Navigate to={`/${profile.role}`} replace />;
  return <>{children}</>;
}
function Root() {
  const { profile, loading } = useAuth();
  if (loading) return <p className="p-8">Loading…</p>;
  return <Navigate to={profile ? `/${profile.role}` : "/login"} replace />;
}
export default function App() {
  const { profile, recovery } = useAuth();
  if (recovery || profile?.must_change_password) return <SetPassword />;
  const A = (c: ReactNode) => <Guard role="admin">{c}</Guard>;
  return (
    <Suspense fallback={<p className="p-8">Loading…</p>}>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:id" element={<Verify />} />
      <Route element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={A(<AdminHome />)} />
        <Route path="/admin/people" element={A(<People />)} />
        <Route path="/admin/courses" element={A(<Courses />)} />
        <Route path="/admin/courses/:id" element={A(<CourseEditor />)} />
        <Route path="/admin/enrollments" element={A(<Enrollments />)} />
        <Route path="/admin/reports" element={A(<Reports />)} />
        <Route path="/admin/audit" element={A(<Audit />)} />
        <Route path="/mentor" element={<Guard role="mentor"><MentorHome /></Guard>} />
        <Route path="/mentor/enrollment/:eid" element={<Guard role="mentor"><MentorEnrollment /></Guard>} />
        <Route path="/student" element={<Guard role="student"><StudentHome /></Guard>} />
        <Route path="/student/course/:eid" element={<Guard role="student"><StudentCourse /></Guard>} />
      </Route>
      <Route path="*" element={<Root />} />
    </Routes>
    </Suspense>
  );
}
