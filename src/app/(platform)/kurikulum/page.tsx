import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import KurikulumList from "@/components/kurikulum/kurikulum-list";

export const metadata = {
  title: "Kurikulum 6 Modul — ComposeLab SMKN 1",
  description: "Daftar lengkap 6 modul pelatihan Android Kotlin & Jetpack Compose di ComposeLab SMKN 1.",
};

/**
 * Halaman daftar kurikulum — TERKUNCI.
 *
 * Pemeriksaan dilakukan di server, jadi belum ada satu pun judul materi
 * yang dikirim ke browser sebelum pengunjung terdaftar dan masuk.
 */
export default async function KurikulumPage() {
  const supabase = await createServerSupabaseClient();

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=" + encodeURIComponent("/kurikulum"));
  }

  return <KurikulumList />;
}
