"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  const load = () => api.get("/messages").then((res) => setMessages(res.data || [])).catch(() => {});

  useEffect(() => { load(); }, []);

  const mark = async (id: string, isRead: boolean) => {
    await api.patch(`/messages/${id}/read`, { isRead });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete message?")) return;
    await api.delete(`/messages/${id}`);
    load();
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Messages</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m._id} className="p-4 bg-white border rounded">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">{m.name} ({m.email})</div>
                {m.subject && <div className="text-sm text-gray-600">{m.subject}</div>}
              </div>
              <div className="space-x-2">
                <button className="text-blue-600" onClick={() => mark(m._id, !m.isRead)}>{m.isRead ? "Mark Unread" : "Mark Read"}</button>
                <button className="text-red-600" onClick={() => remove(m._id)}>Delete</button>
              </div>
            </div>
            <p className="mt-2 text-sm">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p>No messages.</p>}
      </div>
    </section>
  );
}

