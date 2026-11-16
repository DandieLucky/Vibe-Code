import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  FileSpreadsheet,
  Sheet,
  Settings,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard — ComposeLab SMKN 1",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ------------------------------------------------------------------
  // Pertahanan berlapis: middleware sudah menahan, tapi layout memeriksa
  // ulang di server. Kalau suatu saat rute admin ditambahkan tanpa lewat
  // middleware, peserta tetap tidak bisa melihat isi portal admin.
  // ------------------------------------------------------------------
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=" + encodeURIComponent("/admin"));

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, must_change_password")
      .eq("id", user.id)
      .single();

    if (profile?.must_change_password) redirect("/profil?ganti-password=wajib");

    if (profile?.role !== "admin" && profile?.role !== "instructor") {
      redirect("/dashboard?error=akses_admin_ditolak");
    }
  }

  const adminNav = [
    { href: "/admin", label: "Overview Dashboard", icon: LayoutDashboard },
    { href: "/admin/submissions", label: "Kumpulan Karya & Penilaian", icon: FolderGit2, badge: "Prioritas" },
    { href: "/admin/curriculum", label: "Manajemen Kurikulum & CMS", icon: BookOpen },
    { href: "/admin/export", label: "Ekspor Excel & CSV", icon: FileSpreadsheet },
    { href: "/admin/google-sheets", label: "Integrasi Google Sheets", icon: Sheet },
    { href: "/admin/settings", label: "Pengaturan Platform", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#F3ECE2] text-[#4A3B31] border-r border-[#E6DDD2] shrink-0 flex flex-col justify-between">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-[#E6DDD2] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#C4552D] text-[#FDFBF7] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-[#2B211B] tracking-tight">
                  ADMIN PORTAL
                </span>
                <span className="block text-[10px] text-[#9F3F1D] font-mono">
                  Fasilitator SMKN 1
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-[#4A3B31] hover:text-[#2B211B] hover:bg-[#EFE7DC] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#C4552D]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#C4552D]/15 text-[#9F3F1D] border border-[#C4552D]/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="p-4 border-t border-[#E6DDD2] space-y-2">
          <Link
            href="/beranda"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#5D4E43] hover:text-[#2B211B] hover:bg-[#EFE7DC] transition-colors"
          >
            <span>Buka Website Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Sesi Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
