import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Vibe Code — Platform Pembelajaran Development Terintegrasi",
  description:
    "Belajar membuat aplikasi web dari nol sampai online menggunakan Google Antigravity, Next.js, dan Supabase. Kurikulum terstruktur 12 modul dengan prompt AI siap pakai.",
  keywords: [
    "Google Antigravity",
    "Next.js",
    "Supabase",
    "Web Development",
    "Katalog UMKM",
    "AI Coding Agent",
    "Belajar Pemrograman Pemula",
  ],
  authors: [{ name: "Tim Profesional Vibe Code" }],
  openGraph: {
    title: "Vibe Code — Platform Pembelajaran Development Terintegrasi",
    description:
      "Bangun aplikasi web katalog UMKM Anda sendiri dari nol hingga live di Vercel menggunakan Google Antigravity.",
    siteName: "Vibe Code",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
