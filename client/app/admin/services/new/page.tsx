"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function NewService() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/services", {
        name: form.name,
        description: form.description,
        price: form.price ? Number(form.price) : undefined,
      });
      router.push("/admin/services");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create service");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">New Service</h1>
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <input className="w-full border p-2 rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea className="w-full border p-2 rounded" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="w-full border p-2 rounded" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">Create</button>
      </form>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </section>
  );
}

