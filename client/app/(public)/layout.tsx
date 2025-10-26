"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { darkMode } = useDarkMode();
  return (
    <div className={`min-h-screen font-sans transition-all duration-500 ${darkMode ? "bg-[#0b0f19] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}
