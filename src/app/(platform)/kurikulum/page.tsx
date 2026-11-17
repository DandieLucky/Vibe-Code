import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurriculumModules } from "@/lib/data-access/curriculum";
import KurikulumList from "@/components/kurikulum/kurikulum-list";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kurikulum Pembelajaran — ComposeLab",
  description: "Daftar lengkap modul pelatihan pemrograman terstruktur & AI prompting di ComposeLab.",
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

  const modules = await getCurriculumModules({ includeUnpublished: false });
  return <KurikulumList modules={modules} />;
}
