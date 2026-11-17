import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Hammer, Laptop, ChevronRight, Check, BookOpen } from "lucide-react";
import { PERSIAPAN } from "@/lib/data/tutorial-persiapan";
import { DEVELOPMENT } from "@/lib/data/tutorial-development";

export const metadata = {
  title: "Tutorial — ComposeLab",
  description: "Dua tutorial: persiapan perangkat sebelum praktik, dan panduan step-by-step membangun proyek aplikasi.",
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
      judul: "Tutorial persiapan laptop Android",
      ringkas: "Pasang Android Studio, siapkan HP USB Debugging / Emulator, Git, serta akun GitHub & Google Cloud.",
      total: PERSIAPAN.langkah.length,
      warna: "bg-accent",
    },
    {
      slug: "development",
      icon: Hammer,
      judul: "Tutorial development proyek aplikasi",
      ringkas: `${DEVELOPMENT.langkah.length} langkah terstruktur membangun aplikasi (UI, Autentikasi, Database CRUD) sampai kumpul karya.`,
      total: DEVELOPMENT.langkah.length,
      warna: "bg-ink",
    },
  ];

  return (
    <div className="bg-paper min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-muted mb-2">
            <Link href="/dashboard" className="hover:text-ink">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-ink">Tutorial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">
            Panduan Langkah demi Langkah
          </h1>
          <p className="text-sm text-ink-2 leading-relaxed max-w-2xl">
            Setiap langkah memuat panduan detail, hasil yang diharapkan, dan solusi kalau ada kendala.
            Tekan <strong>Selesai</strong> di setiap langkah; progresmu tersimpan otomatis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {daftar.map((t) => {
            const sudah = (progres[t.slug] ?? []).length;
            const persen = t.total > 0 ? Math.round((sudah / t.total) * 100) : 0;
            return (
              <Link key={t.slug} href={`/tutorial/${t.slug}`} className="group">
                <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs hover:border-accent transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`h-14 w-14 rounded-2xl ${t.warna} flex items-center justify-center shrink-0 shadow-xs`}>
                      <t.icon className="w-7 h-7 text-sheet" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h2 className="font-extrabold text-ink text-base sm:text-lg group-hover:text-accent transition-colors">
                          {t.judul}
                        </h2>
                        {persen === 100 && (
                          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            <Check className="w-3 h-3" /> Selesai
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink-2 leading-relaxed mb-3">{t.ringkas}</p>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-paper-3 rounded-full overflow-hidden">
                          <div className="h-full bg-accent transition-colors" style={{ width: `${persen}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-muted shrink-0">
                          {sudah} / {t.total} langkah
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent shrink-0 mt-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-rule bg-paper-2 p-5 flex gap-3">
          <BookOpen className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-ink mb-1">Catatan tentang progres</p>
            <p className="text-[11px] text-ink-2 leading-relaxed">
              Centang langkah hanya untuk membantumu melacak progres, bukan penilaian.
              Karyamu dinilai dari repository GitHub, screenshot aplikasi Android, dan fitur CRUD + Google Login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
