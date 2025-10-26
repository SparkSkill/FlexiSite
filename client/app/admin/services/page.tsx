"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);

  const load = () => api.get("/services").then((res) => setServices(res.data || [])).catch(() => {});

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete service?")) return;
    await api.delete(`/services/${id}`);
    load();
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Services</h1>
        <Link href="/admin/services/new" className="bg-black text-white px-3 py-2 rounded">New</Link>
      </div>
      <div className="space-y-2">
        {services.map((s) => (
          <div key={s._id} className="flex items-center justify-between p-3 bg-white border rounded">
            <div>
              <div className="font-medium">{s.name}</div>
              {s.price != null && <div className="text-sm text-gray-600">${s.price}</div>}
            </div>
            <button onClick={() => remove(s._id)} className="text-red-600">Delete</button>
          </div>
        ))}
        {services.length === 0 && <p>No services yet.</p>}
      </div>
    </section>
  );
}

