import { Navigate, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "./lib/auth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import SetPassword from "./pages/SetPassword";
import Profile from "./pages/Profile";
import AdminHome from "./pages/admin/Home";
import People from "./pages/admin/People";
import Courses from "./pages/admin/Courses";
import CourseEditor from "./pages/admin/CourseEditor";
import Enrollments from "./pages/admin/Enrollments";
import Reports from "./pages/admin/Reports";
import Audit from "./pages/admin/Audit";
import MentorHome from "./pages/mentor/Home";
import MentorEnrollment from "./pages/mentor/EnrollmentDetail";
import StudentHome from "./pages/student/Home";
import StudentCourse from "./pages/student/Course";
import StudentCourses from "./pages/student/Courses";
import StudentJourney from "./pages/student/Journey";
import StudentLesson from "./pages/student/Lesson";

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
        <Route path="/student/courses" element={<Guard role="student"><StudentCourses /></Guard>} />
        <Route path="/student/journey" element={<Guard role="student"><StudentJourney /></Guard>} />
        <Route path="/student/course/:eid" element={<Guard role="student"><StudentCourse /></Guard>} />
        <Route path="/student/course/:eid/lesson/:lid" element={<Guard role="student"><StudentLesson /></Guard>} />
      </Route>
      <Route path="*" element={<Root />} />
    </Routes>
  );
}
