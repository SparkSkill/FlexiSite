"use client";
import AdminSidebar from "@/components/AdminSidebar";
import useAuth from "@/hooks/useAuth";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useAuth();
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-[#0b0f19] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <AdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
