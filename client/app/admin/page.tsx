"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({ pages: 0, services: 0, messages: 0 });

  useEffect(() => {
    Promise.all([api.get("/pages"), api.get("/services"), api.get("/messages")])
      .then(([p, s, m]) => setSummary({ pages: p.data?.length || 0, services: s.data?.length || 0, messages: m.data?.length || 0 }))
      .catch(() => {});
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 border rounded bg-white">Pages: {summary.pages}</div>
        <div className="p-4 border rounded bg-white">Services: {summary.services}</div>
        <div className="p-4 border rounded bg-white">Messages: {summary.messages}</div>
      </div>
    </section>
  );
}

