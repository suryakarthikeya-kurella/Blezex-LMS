import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { isCertificateUnlocked } from "../../lib/certificateUnlock";
import { supabase } from "../../lib/supabase";
import { Card, Empty } from "../../components/ui";

export default function StudentJourney() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const read = async (query: PromiseLike<{ data: any; error: any }>) => {
          const result = await query;
          if (result.error) throw result.error;
          return result.data ?? [];
        };
        const [enrollmentRows, lessonRows, progressRows, attemptRows, milestoneRows] = await Promise.all([
          read(supabase.from("enrollments").select("id,status,course_id,created_at,course:courses(title,min_progress_pct),certificates(verification_id,status)")),
          read(supabase.from("lessons").select("id,modules!inner(course_id)").eq("status", "published")),
          read(supabase.from("lesson_progress").select("enrollment_id,lesson_id,completed_at").order("completed_at", { ascending: false })),
          read(supabase.from("quiz_attempts").select("id,enrollment_id,score_pct,passed,created_at,quiz:quizzes(title,course_id)").order("created_at", { ascending: false }).limit(30)),
          read(supabase.from("project_milestones").select("id,enrollment_id,title,status,due_date,created_at").order("created_at", { ascending: false })),
        ]);
        setEnrollments(enrollmentRows);
        setLessons(lessonRows);
        setProgress(progressRows);
        setAttempts(attemptRows);
        setMilestones(milestoneRows);
      } catch (cause: any) {
        setError(cause?.message ?? "Could not load your learning journey.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="grid min-h-[40vh] place-items-center text-sm font-medium text-slate-500">Loading your journey…</div>;
  if (error) return <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Could not load your journey: {error}</p>;

  const totalLessons = enrollments.reduce((sum, enrollment) => sum + lessons.filter(lesson => lesson.modules.course_id === enrollment.course_id).length, 0);
  const completedLessons = enrollments.reduce((sum, enrollment) => {
    const courseLessonIds = new Set(lessons.filter(lesson => lesson.modules.course_id === enrollment.course_id).map(lesson => lesson.id));
    return sum + progress.filter(row => row.enrollment_id === enrollment.id && courseLessonIds.has(row.lesson_id)).length;
  }, 0);
  const overallProgress = totalLessons ? Math.round(completedLessons * 100 / totalLessons) : 0;
  const passedQuizzes = attempts.filter(attempt => attempt.passed).length;
  const earnedCertificates = enrollments.flatMap(enrollment => (enrollment.certificates ?? []).filter((certificate: any) => certificate.status === "issued"));
  const journeyEvents = [
    ...progress.map(row => {
      const lesson = lessons.find(item => item.id === row.lesson_id);
      const enrollment = enrollments.find(item => item.id === row.enrollment_id);
      if (!lesson || !enrollment) return null;
      return { key: `lesson-${row.lesson_id}-${row.enrollment_id}`, kind: "lesson", title: "Lesson completed", detail: enrollment.course?.title, created_at: row.completed_at };
    }),
    ...attempts.map(attempt => {
      const enrollment = enrollments.find(item => item.id === attempt.enrollment_id);
      return { key: `quiz-${attempt.id}`, kind: "quiz", title: attempt.quiz?.title ?? "Quiz attempt", detail: `${attempt.score_pct}% · ${attempt.passed ? "Passed" : "Keep practicing"}${enrollment?.course?.title ? ` · ${enrollment.course.title}` : ""}`, created_at: attempt.created_at };
    }),
    ...milestones.filter(milestone => milestone.status !== "pending").map(milestone => {
      const enrollment = enrollments.find(item => item.id === milestone.enrollment_id);
      return { key: `milestone-${milestone.id}`, kind: "milestone", title: milestone.status === "evaluated" ? "Project milestone evaluated" : "Project milestone submitted", detail: `${milestone.title}${enrollment?.course?.title ? ` · ${enrollment.course.title}` : ""}`, created_at: milestone.created_at };
    }),
  ].filter(Boolean).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 12);

  return <div className="space-y-7">
    <header className="rounded-[26px] bg-gradient-to-br from-[#17243D] via-[#233B60] to-[#31516B] p-6 text-white shadow-sm md:p-8">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-orange-200">Every step counts</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="font-display text-3xl font-extrabold tracking-tight">My journey</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">See the progress you have made, milestones you have reached, and what is next.</p></div><Link to="/student/courses" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-orange-50"><Icon name="courses" size={17} /> All courses</Link></div>
    </header>
    <section aria-label="Journey achievements" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[
        { label: "Overall progress", value: `${overallProgress}%`, note: `${completedLessons} of ${totalLessons} lessons`, icon: "progress" as const, style: "bg-blue-50 text-blue-700" },
        { label: "Completed lessons", value: completedLessons, note: "Learning milestones", icon: "book" as const, style: "bg-emerald-50 text-emerald-700" },
        { label: "Quizzes passed", value: passedQuizzes, note: "Knowledge checks", icon: "quiz" as const, style: "bg-violet-50 text-violet-700" },
        { label: "Certificates earned", value: earnedCertificates.length, note: "Verified achievements", icon: "certificate" as const, style: "bg-orange-50 text-orange-700" },
      ].map(item => <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-5">
        <div className="flex items-start justify-between gap-2"><p className="text-xs font-semibold text-slate-500 md:text-sm">{item.label}</p><span className={`grid h-9 w-9 place-items-center rounded-xl ${item.style}`}><Icon name={item.icon} size={18} /></span></div>
        <p className="mt-3 font-display text-3xl font-extrabold text-slate-900">{item.value}</p><p className="mt-1 text-xs text-slate-500">{item.note}</p>
      </div>)}
    </section>
    <section>
      <div className="mb-4"><p className="text-xs font-bold uppercase tracking-[.15em] text-brand">Your progress</p><h2 className="mt-1 font-display text-2xl font-extrabold text-slate-900">Course milestones</h2></div>
      {!enrollments.length ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white"><Empty t="Your course journey will appear here when you are enrolled." /></div> :
        <div className="space-y-3">{enrollments.map(enrollment => {
          const courseLessons = lessons.filter(lesson => lesson.modules.course_id === enrollment.course_id);
          const done = progress.filter(row => row.enrollment_id === enrollment.id && courseLessons.some(lesson => lesson.id === row.lesson_id)).length;
          const pct = courseLessons.length ? Math.round(done * 100 / courseLessons.length) : 0;
          const target = enrollment.course?.min_progress_pct ?? 100;
          const certificate = enrollment.certificates?.find((item: any) => item.status === "issued");
          return <Card key={enrollment.id} className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-display text-lg font-bold text-slate-900">{enrollment.course?.title ?? "Course"}</h3><p className="mt-1 text-xs text-slate-500">{done} of {courseLessons.length} lessons completed</p></div><span className="text-xl font-extrabold text-slate-900">{pct}%</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={`${enrollment.course?.title ?? "Course"} progress`} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-gradient-to-r from-brand to-orange-400" style={{ width: `${pct}%` }} /></div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <p className={isCertificateUnlocked(pct, target) ? "font-semibold text-emerald-700" : "text-slate-500"}>{certificate ? "Certificate earned" : isCertificateUnlocked(pct, target) ? "Certificate unlocked · awaiting course completion review" : `Certificate unlocks at ${target}% · ${Math.max(0, target - pct)}% to go`}</p>
              <Link to={`/student/course/${enrollment.id}`} className="inline-flex items-center gap-1 font-bold text-brand hover:text-orange-700">Continue course <Icon name="arrow" size={15} /></Link>
            </div>
          </Card>;
        })}</div>}
    </section>
    <section>
      <div className="mb-4"><p className="text-xs font-bold uppercase tracking-[.15em] text-blue-700">Your recent activity</p><h2 className="mt-1 font-display text-2xl font-extrabold text-slate-900">Journey timeline</h2></div>
      <Card className="!rounded-2xl !border-slate-200/80 !p-5 !shadow-sm md:!p-6">
        {!journeyEvents.length ? <Empty t="Your lesson completions, quizzes, and project submissions will appear here." /> : <ol className="space-y-5">{journeyEvents.map((event: any) => <li key={event.key} className="flex gap-3">
          <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${event.kind === "lesson" ? "bg-emerald-50 text-emerald-700" : event.kind === "quiz" ? "bg-violet-50 text-violet-700" : "bg-blue-50 text-blue-700"}`}><Icon name={event.kind === "lesson" ? "check" : event.kind === "quiz" ? "quiz" : "milestone"} size={17} /></span>
          <div className="min-w-0 flex-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0"><div className="flex flex-wrap justify-between gap-2"><p className="text-sm font-bold text-slate-800">{event.title}</p><time className="text-xs text-slate-400">{event.created_at ? new Date(event.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""}</time></div><p className="mt-1 text-xs text-slate-500">{event.detail}</p></div>
        </li>)}</ol>}
      </Card>
    </section>
  </div>;
}
