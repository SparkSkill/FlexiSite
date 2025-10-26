"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data || [])).catch(() => {});
  }, []);

  return (
    <section className="py-8 px-6 md:px-20">
      <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {services.map((s) => (
          <motion.div key={s._id} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 150 }} className={`p-10 rounded-3xl border relative overflow-hidden group ${darkMode ? "bg-[#111827] border-gray-800 hover:border-purple-500" : "bg-white border-gray-200 hover:border-blue-500"}`}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-500 to-purple-500 transition-all"></div>
            <h3 className="text-2xl font-bold mb-3 text-blue-500">{s.name}</h3>
            {s.price != null && <p className="opacity-80 mb-2">${s.price}</p>}
            {s.description && <p className="opacity-80 mb-6">{s.description}</p>}
          </motion.div>
        ))}
        {services.length === 0 && <p className="text-center col-span-full opacity-70">No services yet.</p>}
      </div>
    </section>
  );
}
