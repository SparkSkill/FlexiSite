"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function Footer() {
  const [year] = useState(new Date().getFullYear());
  const [siteName, setSiteName] = useState("FlexiSite");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    api
      .get("/settings")
      .then((res) => {
        if (res.data?.siteName) setSiteName(res.data.siteName);
      })
      .catch(() => {});
  }, []);

  return (
    <footer
      className={`text-center py-10 border-t backdrop-blur-xl ${
        darkMode ? "bg-[#0b0f19]/60 border-white/10 text-gray-400" : "bg-white/60 border-black/10 text-gray-700"
      }`}
    >
      <p className="text-sm opacity-80">© {year} {siteName}. All rights reserved.</p>
    </footer>
  );
}

