import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Card } from "../components/ui";
export default function Verify() {
  const { id } = useParams(); const [r, setR] = useState<any>(undefined);
  useEffect(() => { supabase.rpc("verify_certificate", { vid: id }).then(({ data }) => setR(data?.[0] ?? null)); }, [id]);
  return <div className="min-h-screen flex items-center justify-center p-4"><Card className="max-w-md w-full">
    <h1 className="text-2xl font-extrabold mb-2">Certificate Verification</h1>
    {r === undefined ? "Checking…" : r === null ? <p className="text-red-600">No certificate found for {id}.</p> :
      <div><p><b>{r.student_name}</b> completed <b>{r.course_title}</b></p><p className="text-sm">Issued: {new Date(r.issued_at).toLocaleDateString()}</p>
      <p className={r.status === "issued" ? "text-green-700 font-bold" : "text-red-600 font-bold"}>{String(r.status).toUpperCase()}</p></div>}
  </Card></div>;
}
