import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, Empty } from "./ui";
export default function Notifications() {
  const [n, setN] = useState<any[]>([]);
  const load = async () => setN((await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(15)).data ?? []);
  useEffect(() => { load(); }, []);
  const read = async (id?: string) => { let q = supabase.from("notifications").update({ read: true }); q = id ? q.eq("id", id) : q.eq("read", false); await q; load(); };
  const unread = n.filter(x => !x.read).length;
  return <Card className="mt-6"><div className="flex justify-between"><h2 className="font-bold">Notifications {unread > 0 && <span className="bg-brand text-white rounded-full px-2 text-xs">{unread}</span>}</h2>
    {unread > 0 && <button className="underline text-xs" onClick={() => read()}>Mark all read</button>}</div>
    {!n.length ? <Empty t="Nothing new." /> : n.map(x => <div key={x.id} className={`text-sm py-1.5 border-t border-hairline ${x.read ? "opacity-50" : ""}`}>
      <b>{x.title}</b> — {x.body} {!x.read && <button className="underline text-xs ml-2" onClick={() => read(x.id)}>mark read</button>}</div>)}</Card>;
}
