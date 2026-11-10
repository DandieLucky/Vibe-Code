import Link from "next/link";
import {
  LogIn,
  BookOpen, Trophy, Layers, Sparkles, ArrowRight, Github, Rocket, Globe,
  Users, ShieldCheck, GraduationCap, Code2, CheckCircle2, Lock, PlayCircle,
} from "lucide-react";
import { MODULES_DATA } from "@/lib/data/curriculum-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Vibe Code — Dashboard Utama",
  description:
    "Platform pembelajaran development terintegrasi. 12 modul, dari setup environment sampai aplikasi Anda online.",
};

export default function DashboardUtamaPage() {
  const totalLessons = MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0);

  const stats = [
    { icon: Layers,   value: String(MODULES_DATA.length), label: "Modul Terstruktur",   color: "from-sky-500 to-blue-600" },
    { icon: BookOpen, value: String(totalLessons),          label: "Materi Pelajaran",     color: "from-indigo-500 to-violet-600" },
    { icon: Rocket,   value: "Vercel",                      label: "Target Deploy Gratis", color: "from-emerald-500 to-teal-600" },
    { icon: Users,    value: "Terbuka",                      label: "Pendaftaran Peserta",  color: "from-amber-500 to-orange-600" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= HERO PUBLIK ================= */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                Platform Pembelajaran Development Terintegrasi
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5">
              Dari nol sampai aplikasi Anda{" "}
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                online di internet
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Anda tidak perlu bisa coding sebelumnya. Tiga belas modul menuntun langkah demi
              langkah: menyiapkan alat, membangun aplikasi, sampai mempublikasikannya ke
              internet dengan alamat sendiri. Semuanya gratis.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/register">
                <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold shadow-lg shadow-sky-600/25">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Daftar & Mulai Belajar
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold border-slate-700 text-slate-200 hover:bg-slate-800">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Masuk ke Akun Saya
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Materi kurikulum hanya terbuka setelah mendaftar. Pendaftaran gratis dan terbuka untuk umum.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATISTIK ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-extrabold text-slate-900 leading-none">{s.value}</p>
              <p className="text-[11px] text-slate-500 mt-1.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DUA PINTU MASUK ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Satu Akun, Dua Peran
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Semua orang masuk lewat pintu yang sama. Sistem mengenali peran Anda
            dan menampilkan dashboard yang sesuai — peserta tidak akan pernah melihat
            dashboard administrator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Peserta */}
          <div className="rounded-2xl border-2 border-sky-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900">Dashboard Peserta</h3>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                  Untuk siapa saja
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 mb-6">
              {[
                "Buka 13 modul & puluhan materi pelajaran",
                "Progres belajar tersimpan otomatis di akun",
                "Tandai materi favorit & tulis catatan pribadi",
                "Kumpulkan karya sekali, dinilai otomatis",
                "Pantau peringkat Anda di papan skor",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button variant="primary" size="lg" className="w-full font-bold">
                Daftar Sebagai Peserta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Admin */}
          <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 p-7 shadow-sm text-white">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h3 className="font-extrabold">Dashboard Administrator</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Terbatas — hanya akun fasilitator
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 mb-6">
              {[
                "Pantau seluruh karya peserta yang masuk",
                "Jalankan penilaian otomatis & lihat rincian skor",
                "Lihat 10 karya terbaik berdasarkan nilai",
                "Kelola kurikulum & pengaturan platform",
                "Ekspor data ke Excel / Google Sheets",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full font-bold border-slate-600 text-white hover:bg-slate-800">
                <Lock className="w-4 h-4 mr-2" />
                Masuk Sebagai Admin
              </Button>
            </Link>
            <p className="mt-3 text-[10px] text-slate-500 text-center">
              Akun admin dibuat oleh fasilitator, tidak bisa mendaftar sendiri.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PENDAHULUAN KURIKULUM (terkunci) ================= */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Apa Saja yang Akan Anda Pelajari
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                {MODULES_DATA.length} modul berurutan. Setiap modul menuntun satu bagian
                dari aplikasi Anda sampai siap dipublikasikan.
              </p>
            </div>
            <Link href="/register" className="hidden sm:block shrink-0">
              <Button variant="outline" size="sm" className="font-semibold">
                Buka Semua Modul
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES_DATA.slice(0, 6).map((m, i) => (
              <div key={m.slug} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="h-9 w-9 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center text-xs font-extrabold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Badge variant="default" className="text-[10px] shrink-0">
                    {m.lessons.length} materi
                  </Badge>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">{m.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                  {m.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <Lock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 mb-1">
              {MODULES_DATA.length - 6} modul lainnya menunggu di dalam
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Daftar gratis untuk membuka seluruh materi, latihan, dan panduan deploy.
            </p>
            <Link href="/register">
              <Button variant="primary" size="sm" className="font-bold">
                <PlayCircle className="w-3.5 h-3.5 mr-1.5" />
                Buka Akses Penuh
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ALUR 4 TAHAP ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Empat Tahap, Satu Hasil Nyata
          </h2>
          <p className="text-sm text-slate-600">
            Bukan sekadar menonton video — Anda menyelesaikan sesuatu yang bisa dibuka orang lain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: "01", icon: Code2,    t: "Belajar & Membangun", d: "Ikuti modul, tulis kode di komputer sendiri" },
            { n: "02", icon: Github,   t: "Unggah ke GitHub",     d: "Simpan kode Anda di repositori publik" },
            { n: "03", icon: Globe,    t: "Deploy ke Internet",   d: "Publikasikan dengan alamat gratis dari Vercel" },
            { n: "04", icon: Trophy,   t: "Dinilai Otomatis",     d: "Skor teknis + kualitas kode, masuk peringkat" },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6 relative">
              <span className="absolute top-5 right-5 text-3xl font-extrabold text-slate-100">{s.n}</span>
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center mb-4 relative">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1.5">{s.t}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA AKHIR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-indigo-700 p-10 sm:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Siap memulai karya pertama Anda?
            </h2>
            <p className="text-sm text-sky-100 mb-7 max-w-xl mx-auto leading-relaxed">
              Pendaftaran terbuka dan gratis. Tidak perlu kartu kredit, tidak perlu
              pengalaman coding sebelumnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto font-bold bg-white text-slate-900 hover:bg-slate-100">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold border-white/40 text-white hover:bg-white/10">
                  <LogIn className="w-4 h-4 mr-2" />
                  Masuk ke Akun Saya
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
