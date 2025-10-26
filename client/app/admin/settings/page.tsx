"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function AdminSettings() {
  const [form, setForm] = useState({ siteName: "", contactEmail: "", phone: "", address: "", socialLinks: { facebook: "", instagram: "", linkedin: "" } });
  const [status, setStatus] = useState<string | null>(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    api.get("/settings").then((res) => {
      const s = res.data || {};
      setForm({
        siteName: s.siteName || "",
        contactEmail: s.contactEmail || "",
        phone: s.phone || "",
        address: s.address || "",
        socialLinks: {
          facebook: s?.socialLinks?.facebook || "",
          instagram: s?.socialLinks?.instagram || "",
          linkedin: s?.socialLinks?.linkedin || "",
        },
      });
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      await api.put("/settings", form);
      setStatus("Saved");
    } catch (err: any) {
      setStatus(err?.response?.data?.message || "Failed to save");
    }
  };

  return (
    <section className="py-6 px-6 md:px-20">
      <h3 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Site Settings</h3>
      <form onSubmit={save} className={`max-w-4xl mx-auto p-12 rounded-3xl shadow-2xl backdrop-blur-xl border ${darkMode ? "bg-[#111827]/90 border-gray-800" : "bg-white/80 border-gray-200"} space-y-8`}>
        {[
          { key: "siteName", label: "Site Name", type: "text", placeholder: "FlexiSite" },
          { key: "contactEmail", label: "Contact Email", type: "email", placeholder: "admin@flexisite.com" },
          { key: "phone", label: "Phone", type: "text", placeholder: "+961 70 123 456" },
          { key: "address", label: "Address", type: "text", placeholder: "Beirut, Lebanon" },
        ].map((f: any) => (
          <div key={f.key}>
            <label className="block mb-2 font-semibold tracking-wide text-lg">{f.label}</label>
            {f.key === "address" ? (
              <textarea className="input-modern" value={(form as any)[f.key] as string} placeholder={f.placeholder} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            ) : (
              <input className="input-modern" type={f.type} value={(form as any)[f.key] as string} placeholder={f.placeholder} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            )}
          </div>
        ))}

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { key: "facebook", label: "Facebook" },
            { key: "instagram", label: "Instagram" },
            { key: "linkedin", label: "LinkedIn" },
          ].map((s) => (
            <div key={s.key}>
              <label className="block mb-2 font-semibold text-lg">{s.label}</label>
              <input className="input-modern" type="url" placeholder={`https://${s.key}.com/flexisite`} value={(form.socialLinks as any)[s.key]} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, [s.key]: e.target.value } })} />
            </div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.03 }} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:opacity-90" type="submit">
          Save Settings
        </motion.button>
        {status && <p className="text-center text-sm">{status}</p>}
      </form>
    </section>
  );
}
