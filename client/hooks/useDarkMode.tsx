"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { darkMode: boolean; toggle: () => void; set: (v: boolean) => void };
const DarkCtx = createContext<Ctx | null>(null);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("fs_dark") : null;
    if (saved) setDarkMode(saved === "1");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fs_dark", darkMode ? "1" : "0");
      document.body.classList.toggle("fs-dark", darkMode);
    }
  }, [darkMode]);

  return (
    <DarkCtx.Provider value={{ darkMode, toggle: () => setDarkMode((v) => !v), set: setDarkMode }}>
      {children}
    </DarkCtx.Provider>
  );
}

export function useDarkMode() {
  const ctx = useContext(DarkCtx);
  if (!ctx) throw new Error("useDarkMode must be used within DarkModeProvider");
  return ctx;
}

