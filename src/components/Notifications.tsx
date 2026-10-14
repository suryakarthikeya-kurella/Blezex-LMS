import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, Empty } from "./ui";
import Icon from "./Icon";
export default function Notifications() {
  const [n, setN] = useState<any[]>([]);
  const load = async () => setN((await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(15)).data ?? []);
  useEffect(() => { load(); }, []);
  const read = async (id?: string) => { let q = supabase.from("notifications").update({ read: true }); q = id ? q.eq("id", id) : q.eq("read", false); await q; load(); };
  const unread = n.filter(x => !x.read).length;
  return <Card className="mt-6 !rounded-2xl !border-slate-200/80 !shadow-sm"><div className="flex items-center justify-between gap-3"><h2 className="flex items-center gap-2 font-display font-bold text-slate-900"><Icon name="bell" size={18} />Notifications {unread > 0 && <span className="rounded-full bg-brand px-2 py-0.5 text-xs text-white">{unread}</span>}</h2>
    {unread > 0 && <button className="underline text-xs" onClick={() => read()}>Mark all read</button>}</div>
    {!n.length ? <Empty t="Nothing new." /> : n.map(x => <div key={x.id} className={`text-sm py-1.5 border-t border-hairline ${x.read ? "opacity-50" : ""}`}>
      <b>{x.title}</b> — {x.body} {!x.read && <button className="underline text-xs ml-2" onClick={() => read(x.id)}>mark read</button>}</div>)}</Card>;
}
