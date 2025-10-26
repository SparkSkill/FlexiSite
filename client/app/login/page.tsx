"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function LoginPage() {
  const router = useRouter();
  const { darkMode, toggle } = useDarkMode();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      router.push("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-0px)] flex items-center justify-center px-6 py-16">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(8,102,255,0.35) 0%, rgba(124,58,237,0.28) 35%, rgba(15,23,42,0) 70%), linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)",
        }}
      />

      {/* Dark mode toggle */}
      <button
        onClick={toggle}
        aria-label="Toggle dark mode"
        className={`absolute top-6 right-6 inline-flex items-center justify-center h-9 w-9 rounded-full ring-1 transition ${
          darkMode ? "bg-white/5 ring-white/15 hover:bg-white/10" : "bg-black/5 ring-black/10 hover:bg-black/10"
        }`}
      >
        {darkMode ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-90">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-90">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        )}
      </button>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-3xl border shadow-lg p-8 backdrop-blur-xl ${
          darkMode ? "bg-[#0f172a]/70 border-white/10" : "bg-white/80 border-black/10"
        }`}
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-md" style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }} />
          <h1 className="text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0866ff] to-purple-500">
            Admin Login
          </h1>
          <p className="mt-2 text-sm opacity-70">Access your dashboard securely.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="input-modern"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            autoComplete="username"
          />
          <input
            className="input-modern"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
          />
          <button
            className="w-full py-3 rounded-xl text-white font-semibold shadow-lg disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #0866ff 0%, #7c3aed 100%)" }}
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-red-400">
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
