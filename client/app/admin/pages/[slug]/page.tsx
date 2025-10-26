"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

export default function EditPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const [page, setPage] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api.get(`/pages/slug/${slug}`).then((res) => setPage(res.data)).catch(() => setPage(null));
  }, [slug]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page?._id) return;
    try {
      const res = await api.put(`/pages/${page._id}`, { title: page.title, meta: page.meta, sections: page.sections || [] });
      setPage(res.data);
      setStatus("Saved");
    } catch (err: any) {
      setStatus(err?.response?.data?.message || "Failed to save");
    }
  };

  if (!page) return <p>Loading...</p>;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Edit Page: {slug}</h1>
      <form onSubmit={save} className="space-y-4 max-w-2xl">
        <input className="w-full border p-2 rounded" value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Meta Description" value={page.meta?.description || ""} onChange={(e) => setPage({ ...page, meta: { ...(page.meta || {}), description: e.target.value } })} />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">Save</button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </section>
  );
}

