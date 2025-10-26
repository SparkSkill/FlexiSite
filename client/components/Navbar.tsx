"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function Navbar() {
  const [siteName, setSiteName] = useState("FlexiSite");
  const { darkMode, toggle } = useDarkMode();

  useEffect(() => {
    api
      .get("/settings")
      .then((res) => {
        if (res.data?.siteName) setSiteName(res.data.siteName);
      })
      .catch(() => {});
  }, []);

  const links = [
    { label: "Home", href: "/#" },
    { label: "Features", href: "/#features" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 w-full z-50 py-3 px-6 md:px-10 flex justify-between items-center border-b backdrop-blur-xl ${
        darkMode ? "bg-[#0b0f19]/70 border-white/10" : "bg-white/70 border-black/10"
      }`}
    >
      <a href="/" className="flex items-center gap-3">
        <span
          className="inline-flex size-8 rounded-md shadow-sm ring-1 ring-inset ring-black/10 overflow-hidden"
          aria-hidden
          style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }}
        />
        <span className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0866ff] to-purple-500">
          {siteName}
        </span>
      </a>
      <div className="flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="relative text-sm md:text-base font-medium opacity-80 hover:opacity-100 transition"
          >
            {l.label}
          </a>
        ))}
        <a
          href="/login"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0866ff]"
          style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }}
        >
          Sign in
        </a>
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          className={`ml-1 inline-flex items-center justify-center size-9 rounded-full ring-1 transition ${
            darkMode ? "bg-white/5 ring-white/15 hover:bg-white/10" : "bg-black/5 ring-black/10 hover:bg-black/10"
          }`}
        >
          {darkMode ? (
            // Sun icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-90">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            // Moon icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-90">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
            </svg>
          )}
        </button>
      </div>
    </motion.nav>
  );
}

