import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Code2,
  Database,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Laptop,
  Layers,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  FileSpreadsheet,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODULES_DATA, COURSE_INFO } from "@/lib/data/curriculum-data";

export default function LandingPage() {
  const totalLessons = MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0);

  const techStack = [
    {
      name: "Next.js 15 App Router",
      role: "Frontend & Server Actions",
      desc: "Framework React full-stack modern dengan Server-Side Rendering dan kompilasi secepat kilat.",
      icon: Code2,
      color: "from-slate-800 to-slate-900 text-white",
    },
    {
      name: "Supabase PostgreSQL",
      role: "Database, Auth & Storage",
      desc: "Database cloud PostgreSQL dengan Row Level Security, autentikasi sesi, dan bucket file.",
      icon: Database,
      color: "from-emerald-600 to-teal-700 text-white",
    },
    {
      name: "Google Antigravity",
      role: "Autonomous AI Coding Agent",
      desc: "AI coding agent yang mampu membaca codebase, mengedit file, dan menjalankan terminal otomatis.",
      icon: Cpu,
      color: "from-sky-600 to-indigo-700 text-white",
    },
    {
      name: "Vercel Cloud",
      role: "CI/CD & Live Deployment",
      desc: "Platform hosting global otomatis yang menerbitkan website seketika setiap kali git push.",
      icon: Cloud,
      color: "from-slate-900 to-slate-950 text-white",
    },
  ];

  const learningSteps = [
    {
      step: "01",
      title: "Persiapan & Setup Alat",
      desc: "Memasang Node.js 24 LTS, Git, VS Code, Google Antigravity, serta akun cloud Supabase & Vercel.",
    },
    {
      step: "02",
      title: "Menguasai Formula Prompt 6-Bagian",
      desc: "Mempelajari teknik instruksi presisi: Tujuan, Konteks, Instruksi, Batasan, Hasil Akhir, dan Validasi AI.",
    },
    {
      step: "03",
      title: "Membangun Aplikasi Katalog UMKM",
      desc: "Menerapkan fitur US-01 sampai US-06: database katalog, detail dinamis, pemesanan WhatsApp, dan login admin.",
    },
    {
      step: "04",
      title: "Deployment & Pengumpulan Karya",
      desc: "Mempublikasikan proyek ke domain Vercel publik dan mengumpulkan karya untuk penilaian administrator.",
    },
  ];

  const faqs = [
    {
      q: "Apakah platform ini bisa diikuti oleh pemula yang sama sekali belum pernah belajar pemrograman?",
      a: "Sangat bisa! Kurikulum dirancang khusus agar siapapun dapat mengikuti alur belajar bertahap. Anda akan dipandu langsung menggunakan prompt Google Antigravity siap pakai yang telah teruji, sehingga Anda fokus memahami arsitektur dan alur kerja aplikasi tanpa terhambat hafalan sintaks rumit.",
    },
    {
      q: "Apa perbedaan Google Antigravity dengan chatbot AI teks biasa seperti ChatGPT?",
      a: "Chatbot biasa hanya memberikan teks yang harus Anda salin dan tempel manual ke banyak file. Google Antigravity adalah AI Agent otonom: ia memiliki akses membaca seluruh file proyek di komputer Anda, menjalankan terminal, dan melakukan editing kode presisi di baris yang tepat secara mandiri.",
    },
    {
      q: "Proyek apa yang akan saya bangun selama mengikuti pelatihan ini?",
      a: "Anda akan membangun aplikasi Katalog Produk Digital UMKM dengan fitur katalog dinamis dari PostgreSQL Supabase, halaman detail produk, pemesanan otomatis via WhatsApp (wa.me), dashboard admin CRUD produk, dan proteksi middleware keamanan.",
    },
    {
      q: "Bagaimana cara pengumpulan karya dan penilaian oleh fasilitator/admin?",
      a: "Platform ini memiliki modul 'Kumpulan Karya Peserta'. Anda cukup mengunggah link GitHub publik Anda, link deployment Vercel aktif, dan screenshot aplikasi. Administrator dapat memeriksa karya di dashboard, memberikan catatan revisi atau kelulusan, serta mengekspor data ke Excel atau Google Sheets.",
    },
    {
      q: "Apakah data progres belajar saya tetap tersimpan jika saya belum membuat akun?",
      a: "Ya. Untuk mode demonstrasi tanpa login, platform otomatis menyimpan progres di localStorage peramban Anda. Begitu Anda mendaftar atau login, data progres disinkronkan secara aman ke database Supabase.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle grid background accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge Announcer */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Platform Pembelajaran Development Terintegrasi</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">Next.js 15 + Supabase + Antigravity</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Bangun Aplikasi Web dari Nol Sampai Online Dipandu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-200">
              AI Coding Agent
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Tidak perlu mahir koding konvensional terlebih dahulu. Pelajari pembuatan aplikasi web modern berskala produksi menggunakan arsitektur{" "}
            <strong className="text-white font-semibold">Google Antigravity</strong>, Next.js App Router, dan basis data cloud Supabase.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/kurikulum" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="accent"
                className="w-full sm:w-auto text-base font-bold shadow-xl shadow-sky-600/30 px-8 py-3.5 rounded-xl hover:scale-105 transition-all"
              >
                Mulai Belajar Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/kurikulum" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80 hover:text-white px-7 py-3.5 rounded-xl"
              >
                <BookOpen className="w-5 h-5 mr-2 text-sky-400" />
                Lihat Kurikulum 12 Modul
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">12 Modul</div>
              <p className="text-xs text-slate-400 mt-1">Kurikulum Terstruktur</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">{totalLessons}+ Materi</div>
              <p className="text-xs text-slate-400 mt-1">Tutorial Praktik Mandiri</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">100% Prompt</div>
              <p className="text-xs text-slate-400 mt-1">Siap Salin & Teruji</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">Vercel Ready</div>
              <p className="text-xs text-slate-400 mt-1">Publikasi Mandiri</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GAMBARAN TEKNOLOGI YANG DIPELAJARI
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <Badge variant="info" className="mb-3">
              STANDAR INDUSTRI MODERN
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Teknologi Modern yang Anda Kuasai
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Bukan sekadar tutorial membuat halaman statis biasa. Anda membangun aplikasi nyata menggunakan stack teknologi mutakhir yang digunakan startup teknologi global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center mb-5 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {tech.role}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2.5">
                      {tech.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                    <span>Materi Praktik Lengkap</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          GAMBARAN PROYEK AKHIR: KATALOG UMKM DIGITAL
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Narrative & Features */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge variant="teal" className="mb-3">
                  STUDI KASUS NYATA
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Proyek Akhir: Aplikasi Web Katalog Digital UMKM
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  Pada Modul 7, Anda akan membangun aplikasi katalog produk digital terintegrasi yang dapat langsung digunakan oleh pelaku UMKM untuk memajang produk mereka ke dunia online.
                </p>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    code: "US-01",
                    title: "Katalog Dinamis dari Supabase",
                    desc: "Data produk tersimpan di database PostgreSQL cloud dan dimuat secara Server-Side.",
                  },
                  {
                    code: "US-02",
                    title: "Halaman Detail Produk Interaktif",
                    desc: "Rute dinamis [id] yang menampilkan foto beresolusi tinggi, harga Rupiah, dan deskripsi.",
                  },
                  {
                    code: "US-03",
                    title: "Pemesanan Otomatis WhatsApp (wa.me)",
                    desc: "Klik satu tombol langsung membuka pesan pesanan sopan dan rapi ke nomor telepon pemilik toko.",
                  },
                  {
                    code: "US-04 s/d US-06",
                    title: "Panel Admin Terproteksi",
                    desc: "Login admin aman berbasis Supabase Auth dan middleware satpam untuk mengelola produk.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                  >
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                      {item.code}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/kurikulum/modul-7-membangun-aplikasi-katalog-umkm">
                  <Button variant="primary" size="md">
                    Pelajari Modul Katalog UMKM
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Mockup Showcase */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 p-2 shadow-2xl overflow-hidden">
                {/* Browser Mockup Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-950 rounded-t-xl border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-rose-500" />
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="mx-auto text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-0.5 rounded border border-slate-800">
                    https://katalog-umkm-anda.vercel.app
                  </div>
                </div>

                {/* App Preview Content */}
                <div className="bg-slate-50 p-6 rounded-b-xl space-y-4">
                  {/* Mini Store Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">
                        Toko Berkah UMKM
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Katalog Produk Berkualitas Pengrajin Lokal
                      </p>
                    </div>
                    <Badge variant="success" className="text-[10px]">
                      Buka Sekarang
                    </Badge>
                  </div>

                  {/* Sample Product Cards Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2">
                      <div className="h-24 bg-slate-100 rounded-lg overflow-hidden relative">
                        <img
                          src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400"
                          alt="Sambal Bawang"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">
                        Sambal Bawang Istimewa
                      </div>
                      <div className="text-xs font-extrabold text-sky-700">
                        Rp 28.000
                      </div>
                      <div className="w-full text-[10px] font-bold text-center py-1 bg-emerald-600 text-white rounded">
                        Pesan via WA
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2">
                      <div className="h-24 bg-slate-100 rounded-lg overflow-hidden relative">
                        <img
                          src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400"
                          alt="Tas Rotan"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">
                        Tas Anyaman Rotan Etnik
                      </div>
                      <div className="text-xs font-extrabold text-sky-700">
                        Rp 125.000
                      </div>
                      <div className="w-full text-[10px] font-bold text-center py-1 bg-emerald-600 text-white rounded">
                        Pesan via WA
                      </div>
                    </div>
                  </div>

                  {/* Trust Footer Note */}
                  <div className="text-center pt-2 text-[11px] text-slate-400 font-mono">
                    ✓ Terhubung ke Supabase PostgreSQL & WhatsApp API
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ALUR PEMBELAJARAN
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <Badge variant="default" className="mb-3">
              ROADMAP STEP-BY-STEP
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Alur Pembelajaran Terstruktur
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Empat tahapan terarah yang memastikan setiap peserta berhasil mencapai tujuan akhir memiliki aplikasi online sendiri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningSteps.map((s, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-extrabold text-slate-300 font-mono">
                    {s.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-3 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-sky-600">
                  <span>Tahap {idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DAFTAR 12 MODUL LENGKAP PREVIEW
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="info" className="mb-2">
                KURIKULUM UTUH
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                12 Modul Pembelajaran Komprehensif
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Setiap modul dilengkapi materi konsep, persiapan, langkah teknis, dan prompt siap salin.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/kurikulum">
                <Button variant="accent" size="sm">
                  Buka Halaman Kurikulum Penuh
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES_DATA.map((module) => (
              <Link
                key={module.id}
                href={`/kurikulum/${module.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      MODUL {module.module_number}
                    </span>
                    <Badge
                      variant={
                        module.difficulty_level === "Pemula"
                          ? "success"
                          : module.difficulty_level === "Menengah"
                          ? "info"
                          : "warning"
                      }
                      className="text-[10px]"
                    >
                      {module.difficulty_level}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{module.lessons.length} Materi Praktik</span>
                  <span className="font-medium text-sky-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Mulai Belajar &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ (PERTANYAAN UMUM)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-3">
              FAQ & BANTUAN
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Semua yang perlu Anda ketahui sebelum memulai perjalanan belajar.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 transition-all"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                  <span className="text-sky-600 font-mono text-sm shrink-0 mt-0.5">
                    Q{idx + 1}.
                  </span>
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CTA FINAL BANNER
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="teal" className="bg-teal-950 text-teal-300 border-teal-800">
            SIAP MELANGKAH HARI INI
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mulai Belajar Sekarang & Miliki Website Pertamamu
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ikuti materi dari Modul 1 sampai Modul 12 secara gratis. Bangun portofolio nyata dan kumpulkan karyamu di platform ini.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/kurikulum">
              <Button size="lg" variant="accent" className="font-bold px-8 shadow-lg">
                Buka Modul 1: Pengenalan Web
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/kumpulan-karya">
              <Button size="lg" variant="outline" className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white">
                Kumpulan Karya Peserta
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
