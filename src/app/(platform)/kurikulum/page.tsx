import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import KurikulumList from "@/components/kurikulum/kurikulum-list";

export const metadata = {
  title: "Kurikulum 12 Modul — Vibe Code",
  description: "Daftar lengkap modul dan materi pembelajaran Vibe Code.",
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
