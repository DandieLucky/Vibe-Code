import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { TutorialView } from "@/components/tutorial/tutorial-view";
import { DEVELOPMENT } from "@/lib/data/tutorial-development";

export const metadata = {
  title: "Tutorial Development — Vibe Code",
  description: "Panduan langkah demi langkah, lengkap dengan gambar dan pemeriksaan hasil.",
};

/**
 * Halaman tutorial — hanya untuk peserta yang sudah login.
 * Progres centang tersimpan di database, jadi bisa lanjut dari perangkat lain.
 */
export default async function Halaman() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=" + encodeURIComponent("/tutorial/development"));
  }

  return <TutorialView bagian={DEVELOPMENT} storageKey="vibe_tutorial_development" />;
}
