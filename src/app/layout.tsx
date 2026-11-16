import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "ComposeLab SMKN 1 — Platform Belajar Android & AI Prompting",
  description:
    "Belajar membangun aplikasi Android dengan Kotlin, Jetpack Compose, Room Database, dan Google Sign-In untuk siswa kelas 10 SMK Negeri 1 Jakarta. Berpikir terstruktur dengan AI, bukan vibecoding.",
  keywords: [
    "ComposeLab SMKN 1",
    "SMK Negeri 1 Jakarta",
    "Kotlin",
    "Jetpack Compose",
    "Room Database",
    "Credential Manager",
    "AI Prompting",
    "Belajar Android Kelas 10",
  ],
  authors: [{ name: "Tim Pengajar RPL SMKN 1 Jakarta" }],
  openGraph: {
    title: "ComposeLab SMKN 1 — Platform Belajar Android & AI Prompting",
    description:
      "Bangun aplikasi Android SakuSiswa dengan Kotlin, Jetpack Compose, Room Database, dan Login Google menggunakan pendekatan berpikir terstruktur.",
    siteName: "ComposeLab SMKN 1",
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
