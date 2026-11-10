import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronRight, Github, Rocket, Globe, CheckCircle2, AlertTriangle, Terminal, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Panduan Deploy ke Vercel — Vibe Code",
  description: "Langkah demi langkah mempublikasikan karya Anda ke internet secara gratis.",
};

const steps = [
  {
    n: 1,
    title: "Pastikan proyek jalan di komputer Anda",
    icon: Terminal,
    body: [
      "Buka terminal di folder proyek Anda.",
      "Jalankan `npm install` lalu `npm run dev`.",
      "Buka http://localhost:3000 — kalau tampil, proyek Anda siap.",
      "Jalankan `npm run build` — kalau tidak ada error, lanjut ke langkah 2.",
    ],
  },
  {
    n: 2,
    title: "Unggah kode ke GitHub (harus repo PUBLIK)",
    icon: Github,
    body: [
      "Buat repository baru di https://github.com/new",
      "PENTING: pilih **Public**, jangan Private. Penilaian otomatis tidak bisa membaca repo private.",
      "Jangan centang README/gitignore (biar tidak bentrok).",
      "Di terminal, jalankan berurutan:",
      "`git init` → `git add .` → `git commit -m \"karya saya\"`",
      "`git branch -M main`",
      "`git remote add origin https://github.com/USERNAME/NAMA-REPO.git`",
      "`git push -u origin main`",
      "Segarkan halaman repo — file Anda sudah terlihat.",
    ],
  },
  {
    n: 3,
    title: "Daftar akun Vercel",
    icon: Rocket,
    body: [
      "Buka https://vercel.com/signup",
      "Pilih **Continue with GitHub** (bukan email) — supaya repo langsung terdeteksi.",
      "Klik Authorize. Selesai, tidak perlu kartu kredit.",
    ],
  },
  {
    n: 4,
    title: "Impor proyek dari GitHub",
    icon: Globe,
    body: [
      "Di dashboard Vercel, klik **Add New… → Project**.",
      "Cari nama repo Anda, klik **Import**.",
      "Framework akan otomatis terdeteksi sebagai Next.js. Biarkan apa adanya.",
      "JANGAN klik Deploy dulu — lanjut ke langkah 5.",
    ],
  },
  {
    n: 5,
    title: "Isi Environment Variables (jika proyek Anda pakai Supabase)",
    icon: AlertTriangle,
    body: [
      "Buka bagian **Environment Variables**.",
      "Tambahkan satu per satu (nama harus sama persis):",
      "`NEXT_PUBLIC_SUPABASE_URL` — ambil dari Supabase, menu Settings → API",
      "`NEXT_PUBLIC_SUPABASE_ANON_KEY` — dari tempat yang sama",
      "JANGAN pernah memasukkan `SUPABASE_SERVICE_ROLE_KEY` ke proyek publik.",
      "Kalau proyek Anda belum pakai Supabase, lewati langkah ini.",
    ],
  },
  {
    n: 6,
    title: "Klik Deploy",
    icon: Rocket,
    body: [
      "Klik tombol **Deploy**. Tunggu sekitar 1-2 menit.",
      "Setelah selesai, Anda dapat alamat seperti https://proyek-anda.vercel.app",
      "Buka alamat itu — karya Anda sudah online dan bisa diakses siapa saja.",
    ],
  },
  {
    n: 7,
    title: "Kumpulkan karyanya di platform ini",
    icon: CheckCircle2,
    body: [
      "Salin **link GitHub** repo Anda (contoh: https://github.com/username/proyek)",
      "Salin **link Vercel** yang tadi (contoh: https://proyek-anda.vercel.app)",
      "Buka menu **Kumpulan Karya** dan isi formulir.",
      "PENTING: pengumpulan hanya bisa dilakukan **SATU KALI**. Pastikan kedua link sudah benar sebelum menekan kirim.",
      "Setelah dikirim, sistem akan menilai karya Anda secara otomatis.",
    ],
  },
];

const faqs = [
  ["Situs saya error 404 saat dibuka. Kenapa?",
   "Biasanya karena folder proyek yang di-upload bukan folder utama, atau kamu meng-upload folder induk yang berisi subfolder lain. Pastikan package.json berada tepat di root repository."],
  ["Build gagal di Vercel tapi jalan di komputer saya.",
   "Cek pesan error di tab Build Logs Vercel. Paling sering karena ada file yang tidak sengaja di-upload (seperti node_modules) atau environment variable belum diisi."],
  ["Apakah Vercel gratis?",
   "Ya, untuk proyek pembelajaran/pribadi paket Hobby gratis selamanya. Batasnya 100 GB bandwidth per bulan — jauh lebih dari cukup untuk tugas pelatihan."],
  ["Kenapa repo harus publik?",
   "Karena sistem penilaian otomatis membaca kode Anda dari GitHub untuk menilai kualitas. Repo private tidak bisa dibaca, sehingga nilai Anda akan kehilangan komponen penilaian AI."],
  ["Bolehkah saya memperbaiki karya setelah mengumpulkan?",
   "Tidak. Pengumpulan hanya satu kali. Karena itu, pastikan situs sudah bisa dibuka dan repo sudah publik SEBELUM menekan tombol kumpulkan."],
  ["Link Vercel saya berubah setiap kali update. Kenapa?",
   "Alamat https://proyek-anda.vercel.app selalu tetap. Yang berubah hanya alamat preview (yang ada tulisan acak di depan). Gunakan yang tanpa awalan acak."],
];

export default async function PanduanDeployPage() {
  // Panduan deploy hanya untuk peserta terdaftar.
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=" + encodeURIComponent("/panduan-deploy"));
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-800">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800">Panduan Deploy</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Panduan Deploy ke Vercel
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Dari kode di komputer sampai online — dalam 7 langkah
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-xs text-sky-900">
            <strong>Sebelum mulai:</strong> pastikan proyek Anda sudah selesai 12 modul.
            Deploy itu mudah, tapi mempublikasikan karya yang belum jadi akan merugikan
            nilai Anda.
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center font-bold shrink-0">
                  {s.n}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <s.icon className="w-4 h-4 text-sky-600" />
                    {s.title}
                  </h2>
                  <ul className="space-y-2">
                    {s.body.map((line, i) => (
                      <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-2">
                        <span className="text-slate-300 shrink-0">•</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px]">$1</code>')
                              .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-10">
          <h2 className="font-bold text-slate-900 mb-4">Pertanyaan yang Sering Muncul</h2>
          <div className="space-y-4">
            {faqs.map(([q, a], i) => (
              <div key={i} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                <h3 className="text-xs font-bold text-slate-800 mb-1.5">{q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-sky-300 bg-gradient-to-r from-sky-50 to-white p-6 text-center">
          <h2 className="font-bold text-slate-900 mb-2">Sudah berhasil deploy?</h2>
          <p className="text-xs text-slate-600 mb-4">
            Kumpulkan link GitHub dan link situs Anda sekarang. Hanya bisa sekali.
          </p>
          <Link
            href="/kumpulan-karya"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Kumpulkan Karya Saya
          </Link>
        </div>
      </div>
    </div>
  );
}
