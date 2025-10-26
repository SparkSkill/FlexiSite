"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const { darkMode } = useDarkMode();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      await api.post("/messages", form);
      setStatus("Message sent. We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus(err?.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <section className={`${darkMode ? "bg-[#0b0f19]" : "bg-gray-100"} py-24 px-6 md:px-20`}>
      <h3 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Contact Us</h3>
      <form onSubmit={submit} className={`max-w-2xl mx-auto rounded-3xl shadow-xl p-10 backdrop-blur-lg border ${darkMode ? "bg-[#111827]/80 border-gray-800" : "bg-white/90 border-gray-200"} space-y-6`}>
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Name" className="input-modern" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" className="input-modern" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <input type="text" placeholder="Subject" className="input-modern" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        <textarea placeholder="Message" rows={5} className="input-modern resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <motion.button whileHover={{ scale: 1.05 }} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:opacity-90">
          Send Message
        </motion.button>
      </form>
      {status && <p className="mt-4 text-sm text-center">{status}</p>}
    </section>
  );
}
