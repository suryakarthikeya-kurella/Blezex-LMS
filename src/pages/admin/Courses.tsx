import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../../lib/supabase";
import { Icon } from "../../components/icons";
import { EmptyState, ErrorState, Field, LoadingState, Modal, PageHeader, SearchBox, StatusBadge, Toolbar, useToast } from "../../components/admin/kit";

const courseSchema = z.object({ title: z.string().trim().min(2, "Course title is required"), description: z.string().trim().max(1000, "Keep it under 1000 characters"), track_id: z.string() });
const trackSchema = z.object({ name: z.string().trim().min(2, "Track name is required") });
type CF = z.infer<typeof courseSchema>; type TF = z.infer<typeof trackSchema>;

export default function Courses() {
  const toast = useToast();
  const [rows, setRows] = useState<any[]>([]); const [tracks, setTracks] = useState<any[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<unknown>(null);
  const [q, setQ] = useState(""); const [trackF, setTrackF] = useState(""); const [statusF, setStatusF] = useState("");
  const [dlg, setDlg] = useState<"" | "course" | "track">(""); const [formErr, setFormErr] = useState("");
  const cf = useForm<CF>({ resolver: zodResolver(courseSchema), defaultValues: { title: "", description: "", track_id: "" } });
  const tf = useForm<TF>({ resolver: zodResolver(trackSchema), defaultValues: { name: "" } });

  const load = useCallback(async () => {
    const [c, t] = await Promise.all([supabase.from("courses").select("*, tracks(name)").order("created_at"), supabase.from("tracks").select("*").order("name")]);
    setError(c.error ?? t.error); setRows(c.data ?? []); setTracks(t.data ?? []); setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const open = (d: "course" | "track") => { setFormErr(""); cf.reset(); tf.reset(); setDlg(d); };
  const addCourse = async (v: CF) => {
    setFormErr("");
    const { error } = await supabase.from("courses").insert({ title: v.title, description: v.description || null, track_id: v.track_id || null, slug: v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36) });
    if (error) return setFormErr(error.message);
    setDlg(""); toast("ok", `Course "${v.title}" created as a draft. Open it to add content.`); load();
  };
  const addTrack = async (v: TF) => {
    setFormErr(""); const { error } = await supabase.from("tracks").insert({ name: v.name });
    if (error) return setFormErr(error.code === "23505" ? "A track with this name already exists." : error.message);
    setDlg(""); toast("ok", `Track "${v.name}" added.`); load();
  };

  const shown = useMemo(() => rows.filter(c => (!q.trim() || c.title.toLowerCase().includes(q.trim().toLowerCase())) && (!trackF || (trackF === "none" ? !c.track_id : c.track_id === trackF)) && (!statusF || c.status === statusF)), [rows, q, trackF, statusF]);
  const filtered = !!(q.trim() || trackF || statusF);

  return <>
    <PageHeader title="Courses" description="Build the catalog. New courses start as drafts; open one to add modules, lessons, quizzes, assignments and batches."
      actions={<><button className="btn-ghost" onClick={() => open("track")}>Add track</button><button className="btn inline-flex items-center gap-1.5" onClick={() => open("course")}><Icon name="plus" className="w-4 h-4" />New course</button></>} />

    <Toolbar>
      <SearchBox label="Search courses" placeholder="Search by course title…" value={q} onChange={setQ} />
      <select aria-label="Track filter" className="inp max-w-[200px]" value={trackF} onChange={e => setTrackF(e.target.value)}><option value="">All tracks</option><option value="none">No track</option>{tracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
      <select aria-label="Status filter" className="inp max-w-[150px]" value={statusF} onChange={e => setStatusF(e.target.value)}><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option></select>
      {!loading && !error && <span className="text-xs text-muted ml-auto">{shown.length} of {rows.length} course{rows.length === 1 ? "" : "s"}</span>}
    </Toolbar>

    {error ? <ErrorState error={error} /> : loading ? <LoadingState /> : !shown.length ?
      <div className="bg-white border border-hairline rounded-[20px]"><EmptyState title={filtered ? "No courses match these filters." : "No courses yet."} hint={filtered ? "Try a different search or clear the filters." : "Create your first course to get started."}
        action={filtered ? <button className="btn-ghost" onClick={() => { setQ(""); setTrackF(""); setStatusF(""); }}>Clear filters</button> : <button className="btn" onClick={() => open("course")}>New course</button>} /></div> :
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{shown.map(c =>
        <article key={c.id} className="bg-white border border-hairline rounded-[20px] p-5 flex flex-col shadow-[0_8px_24px_-12px_rgba(17,17,17,.08)] hover:border-ink transition-colors">
          <div className="flex items-center justify-between gap-2 mb-3"><span className="text-xs font-medium text-muted truncate">{c.tracks?.name ?? "No track"}</span><StatusBadge value={c.status} /></div>
          <h2 className="text-lg font-semibold leading-snug">{c.title}</h2>
          <p className="text-sm text-muted mt-1 mb-4 line-clamp-3 flex-1">{c.description || "No description."}</p>
          <Link className="btn-ghost self-start inline-flex items-center gap-1.5" to={`/admin/courses/${c.id}`}>Edit content<Icon name="arrow" className="w-3.5 h-3.5" /></Link></article>)}</div>}

    <Modal open={dlg === "course"} onClose={() => !cf.formState.isSubmitting && setDlg("")} title="New course" description="Created as a draft. Publish it from the course editor when ready.">
      <form onSubmit={cf.handleSubmit(addCourse)} noValidate className="space-y-4">
        <Field label="Course title" htmlFor="c-title" required error={cf.formState.errors.title?.message}><input id="c-title" className="inp" {...cf.register("title")} /></Field>
        <Field label="Description" htmlFor="c-desc" error={cf.formState.errors.description?.message}><textarea id="c-desc" rows={3} className="inp" {...cf.register("description")} /></Field>
        <Field label="Track" htmlFor="c-track" hint="Optional. Add tracks with the Add track button."><select id="c-track" className="inp" {...cf.register("track_id")}><option value="">No track</option>{tracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></Field>
        {formErr && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{formErr}</p>}
        <div className="flex justify-end gap-2"><button type="button" className="btn-ghost" onClick={() => setDlg("")} disabled={cf.formState.isSubmitting}>Cancel</button><button className="btn" disabled={cf.formState.isSubmitting}>{cf.formState.isSubmitting ? "Creating…" : "Create course"}</button></div></form>
    </Modal>

    <Modal open={dlg === "track"} onClose={() => !tf.formState.isSubmitting && setDlg("")} title="Add track" description="Tracks group related courses.">
      <form onSubmit={tf.handleSubmit(addTrack)} noValidate className="space-y-4">
        <Field label="Track name" htmlFor="t-name" required error={tf.formState.errors.name?.message}><input id="t-name" className="inp" {...tf.register("name")} /></Field>
        {tracks.length > 0 && <p className="text-xs text-muted">Existing: {tracks.map(t => t.name).join(", ")}</p>}
        {formErr && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{formErr}</p>}
        <div className="flex justify-end gap-2"><button type="button" className="btn-ghost" onClick={() => setDlg("")} disabled={tf.formState.isSubmitting}>Cancel</button><button className="btn" disabled={tf.formState.isSubmitting}>{tf.formState.isSubmitting ? "Adding…" : "Add track"}</button></div></form>
    </Modal>
  </>;
}
