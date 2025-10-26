"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function HomePage() {
  const { darkMode } = useDarkMode();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(Array.isArray(res.data) ? res.data.slice(0, 3) : []))
      .catch(() => setServices([]));
  }, []);

  const fallback = ["Web Design", "App Development", "SEO Optimization"];
  const items = services.length > 0 ? services.map((s: any) => s.name) : fallback;

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-28 px-6 text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% -10%, rgba(8,102,255,0.35) 0%, rgba(124,58,237,0.28) 35%, rgba(15,23,42,0) 70%), linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)",
          }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm"
        >
          Build Fast. Look Modern.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl max-w-3xl mx-auto opacity-95 mb-10"
        >
          A Meta-inspired, glassy UI for high‑trust, high‑impact web experiences.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="flex items-center justify-center gap-4">
          <a
            href="/login"
            className="px-7 py-3 rounded-full text-white font-semibold shadow-lg"
            style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }}
          >
            Start Free Demo
          </a>
          <a
            href="#features"
            className="px-7 py-3 rounded-full bg-white/15 ring-1 ring-white/20 hover:bg-white/20 transition"
          >
            Explore Features
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 md:px-20">
        <h3 className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-[#0866ff] to-purple-500 bg-clip-text text-transparent">
          Designed for Momentum
        </h3>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {[
            {
              title: "Glassy Surfaces",
              desc: "Frosted cards with thin borders and soft shadows.",
            },
            { title: "Fluid Motion", desc: "Framer Motion transitions tuned for calm polish." },
            { title: "Dark Mode", desc: "A single click for a deep, focused UI." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`p-8 rounded-3xl border shadow-sm hover:shadow-md transition-transform duration-300 will-change-transform ${
                darkMode ? "bg-[#0f172a]/60 border-white/10" : "bg-white/70 border-black/10"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-4 h-10 w-10 rounded-md" style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }} />
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p className="opacity-70 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-24 px-6 md:px-20">
        <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#0866ff] to-purple-500 bg-clip-text text-transparent">
          Our Services
        </h3>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {items.map((service, i) => (
            <motion.div
              key={service + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className={`p-8 rounded-3xl border relative overflow-hidden group ${
                darkMode ? "bg-[#0f172a]/60 border-white/10" : "bg-white/70 border-black/10"
              }`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all" style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }} />
              <h4 className="text-2xl font-bold mb-3 text-[#0866ff]">{service}</h4>
              <p className="opacity-80 mb-6">Professional {service.toLowerCase()} services crafted for growth and performance.</p>
              <a
                href="/services"
                className="inline-block px-5 py-2 rounded-full text-white shadow"
                style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }}
              >
                Learn More
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`${darkMode ? "bg-[#0b0f19]" : "bg-gray-100"} py-24 px-6 md:px-20`}>
        <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#0866ff] to-purple-500 bg-clip-text text-transparent">
          Contact Us
        </h3>
        <form
          action="/contact"
          className={`max-w-2xl mx-auto rounded-3xl shadow-xl p-10 border glass ${
            darkMode ? "bg-[#0f172a]/70 border-white/10" : "bg-white/80 border-black/10"
          } space-y-6`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Name" className="input-modern" />
            <input type="email" placeholder="Email" className="input-modern" />
          </div>
          <textarea placeholder="Message" rows={5} className="input-modern resize-none" />
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="/contact"
            className="block text-center w-full py-3 text-white font-semibold rounded-full shadow-lg hover:opacity-95"
            style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }}
          >
            Send Message
          </motion.a>
        </form>
      </section>
    </>
  );
}
