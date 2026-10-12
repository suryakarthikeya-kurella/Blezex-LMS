import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Card, Title } from "../../components/ui";
const count = async (t: string, f?: [string, string]) => {
  let q = supabase.from(t).select("*", { count: "exact", head: true }); if (f) q = q.eq(f[0], f[1]);
  return (await q).count ?? 0;
};
export default function AdminHome() {
  const [s, setS] = useState<Record<string, number>>({});
  useEffect(() => { (async () => setS({
    Students: await count("profiles", ["role", "student"]), Mentors: await count("profiles", ["role", "mentor"]),
    Courses: await count("courses"), "Active enrollments": await count("enrollments", ["status", "active"]),
    Certificates: await count("certificates", ["status", "issued"]), Batches: await count("batches"),
  }))(); }, []);
  return <><Title note="live from the database">Admin Overview</Title>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Object.entries(s).map(([k, v]) =>
      <Card key={k} hov><p className="text-sm text-muted">{k}</p><p className="text-4xl font-display font-extrabold">{v}</p></Card>)}</div></>;
}
