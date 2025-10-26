import type { Metadata } from "next";
import "./globals.css";
import { DarkModeProvider } from "@/hooks/useDarkMode";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "FlexiSite",
  description: "Dynamic business CMS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen ${inter.className} bg-[--background] text-[--foreground] antialiased transition-colors duration-300`}>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
