import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Gerbang masuk platform.
 *
 * Belum login        → /beranda  (dashboard utama publik)
 * Peserta            → /dashboard (dashboard peserta)
 * Admin / instruktur → /admin     (portal administrator)
 *
 * Nama domain tetap sama untuk semua orang; yang berbeda hanya apa yang
 * mereka lihat setelah dikenali.
 */
export default async function RootPage() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) redirect("/beranda");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/beranda");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, must_change_password")
    .eq("id", user.id)
    .single();

  if (profile?.must_change_password) redirect("/profil?ganti-password=wajib");

  const role = profile?.role;
  redirect(role === "admin" || role === "instructor" ? "/admin" : "/dashboard");
}
