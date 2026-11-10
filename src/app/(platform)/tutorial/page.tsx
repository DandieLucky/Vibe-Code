import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Hammer, Laptop, ChevronRight, Check, BookOpen } from "lucide-react";

export const metadata = {
  title: "Tutorial — Vibe Code",
  description: "Dua tutorial: persiapan laptop sebelum acara, dan development aplikasi saat acara.",
};

export default async function HalamanTutorial() {
  const supabase = await createServerSupabaseClient();
  let progres: Record<string, string[]> = {};

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=" + encodeURIComponent("/tutorial"));

    const { data } = await supabase
      .from("profiles")
      .select("tutorial_progress")
      .eq("id", user.id)
      .single();
    progres = (data as any)?.tutorial_progress ?? {};
  }

  const daftar = [
    {
      slug: "persiapan",
      icon: Laptop,
      judul: "Tutorial persiapan laptop",
      ringkas: "Pasang Node.js, Git, VS Code + AI agent, lalu siapkan akun. Kerjakan sebelum hari acara.",
      total: 5,
      warna: "from-amber-500 to-orange-600",
    },
    {
      slug: "development",
      icon: Hammer,
      judul: "Tutorial development",
      ringkas: "17 langkah membangun aplikasi dari deploy pertama sampai dikumpulkan, lengkap dengan prompt AI.",
      total: 17,
      warna: "from-sky-500 to-indigo-600",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/dashboard" className="hover:text-slate-800">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-800">Tutorial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Panduan Langkah demi Langkah
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            Setiap langkah memuat gambar panduan, hasil yang diharapkan, dan solusi kalau ada kendala.
            Tekan <strong>Selesai</strong> di setiap langkah — progresmu tersimpan otomatis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {daftar.map((t) => {
            const sudah = (progres[t.slug] ?? []).length;
            const persen = t.total > 0 ? Math.round((sudah / t.total) * 100) : 0;
            return (
              <Link key={t.slug} href={`/tutorial/${t.slug}`} className="group">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${t.warna} flex items-center justify-center shrink-0 shadow-md`}>
                      <t.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h2 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-sky-700 transition-colors">
                          {t.judul}
                        </h2>
                        {persen === 100 && (
                          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            <Check className="w-3 h-3" /> Selesai
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">{t.ringkas}</p>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all" style={{ width: `${persen}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 shrink-0">
                          {sudah} / {t.total} langkah
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 shrink-0 mt-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-5 flex gap-3">
          <BookOpen className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-sky-900 mb-1">Catatan tentang progres</p>
            <p className="text-[11px] text-sky-800 leading-relaxed">
              Centang langkah hanya untuk membantumu melacak progres, bukan penilaian.
              Karyamu dinilai dari link aplikasi yang kamu kumpulkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
