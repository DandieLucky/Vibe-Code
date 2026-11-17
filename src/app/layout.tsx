import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "ComposeLab — Platform Belajar Android & AI Prompting",
  description:
    "Belajar membangun aplikasi Android dengan Kotlin, Jetpack Compose, Room Database, dan Google Sign-In untuk siswa. Berpikir terstruktur dengan AI, bukan vibecoding.",
  keywords: [
    "ComposeLab",
    "Kotlin",
    "Jetpack Compose",
    "Room Database",
    "Credential Manager",
    "AI Prompting",
    "Belajar Android",
  ],
  authors: [{ name: "Tim Pengajar ComposeLab" }],
  openGraph: {
    title: "ComposeLab — Platform Belajar Pemrograman Terstruktur & AI Prompting",
    description:
      "Platform pembelajaran pemrograman terstruktur dengan bantuan AI, studi kasus aplikasi modern, dan penilaian proyek otomatis.",
    siteName: "ComposeLab",
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
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
