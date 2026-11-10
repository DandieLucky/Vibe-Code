import type { Metadata } from "next";
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
  title: "Admin Dashboard — Vibe Code",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminNav = [
    { href: "/admin", label: "Overview Dashboard", icon: LayoutDashboard },
    { href: "/admin/submissions", label: "Kumpulan Karya & Penilaian", icon: FolderGit2, badge: "Prioritas" },
    { href: "/admin/curriculum", label: "Manajemen Kurikulum & CMS", icon: BookOpen },
    { href: "/admin/export", label: "Ekspor Excel & CSV", icon: FileSpreadsheet },
    { href: "/admin/google-sheets", label: "Integrasi Google Sheets", icon: Sheet },
    { href: "/admin/settings", label: "Pengaturan Platform", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 flex flex-col justify-between">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-white tracking-tight">
                  ADMIN PORTAL
                </span>
                <span className="block text-[10px] text-sky-400 font-mono">
                  Super Administrator
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
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-sky-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
