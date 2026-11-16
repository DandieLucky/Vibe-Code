"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  FolderGit2,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  User,
  ShieldCheck,
  LogOut,
  Trophy,
  UserCircle2,
  GraduationCap,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const { user, isAuthenticated, isAdmin, isLoading, signOut } = useCurrentUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // ----------------------------------------------------------------------
  // Menu menyesuaikan siapa yang sedang melihat.
  // Tamu tidak pernah melihat menu personal; peserta tidak pernah melihat
  // menu Admin — jadi tidak ada tombol yang berujung "akses ditolak".
  // ----------------------------------------------------------------------
  const navLinks = isAdmin
    ? [
        { href: "/admin", label: "Dashboard Admin", icon: ShieldCheck },
        { href: "/beranda", label: "Beranda" },
        { href: "/kurikulum", label: "Kurikulum 6 Modul" },
        { href: "/kumpulan-karya", label: "Kumpulan Karya" },
        { href: "/leaderboard", label: "Papan Peringkat", icon: Trophy },
        { href: "/tutorial", label: "Tutorial", icon: Rocket },
      ]
    : isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard Saya", icon: GraduationCap },
        { href: "/tutorial", label: "Tutorial", icon: BookOpen },
        { href: "/kurikulum", label: "Kurikulum 6 Modul" },
        { href: "/kumpulan-karya", label: "Kumpulan Karya", badge: "Wajib" },
      ]
    : [
        { href: "/beranda", label: "Beranda" },
        { href: "/beranda#kurikulum", label: "Kurikulum 6 Modul" },
        { href: "/beranda#karya", label: "Alur Pelatihan" },
      ];

  const brandHref = isAdmin ? "/admin" : isAuthenticated ? "/dashboard" : "/beranda";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
        scrolled
          ? "bg-[#FAF6F0]/95 backdrop-blur-md border-[#E6DDD2] shadow-xs text-[#2B211B]"
          : "bg-[#FAF6F0] border-[#E6DDD2] text-[#2B211B]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <Link href={brandHref} className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-[#C4552D] flex items-center justify-center text-[#FDFBF7] shadow-sm group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#2B211B] group-hover:text-[#C4552D] transition-colors">
                  COMPOSELAB
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#C4552D]/10 text-[#9F3F1D] border border-[#C4552D]/25">
                  SMKN 1 JKT
                </span>
              </div>
              <p className="text-[11px] text-[#6A5A4E] hidden sm:block">
                Android Kotlin, Compose &amp; AI Prompting
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href.includes("#")
                ? false
                : link.href === "/beranda"
                ? pathname === "/beranda" || pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#9F3F1D] bg-[#EFE7DC] font-semibold"
                      : "text-[#4A3B31] hover:text-[#2B211B] hover:bg-[#F3ECE2]"
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-[#C4552D]" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-[#C4552D]/15 text-[#9F3F1D] border border-[#C4552D]/30 px-1.5 py-0.2 rounded-full font-bold ml-1">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons — menyesuaikan status login */}
          <div className="hidden sm:flex items-center gap-3">
            {isLoading ? (
              <div className="h-8 w-28 rounded-lg bg-[#EFE7DC] animate-pulse" />
            ) : isAuthenticated && user ? (
              /* Sudah login: menu pengguna */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1.5 rounded-xl hover:bg-[#F3ECE2] transition-colors"
                >
                  <span className="h-8 w-8 rounded-lg bg-[#C4552D] flex items-center justify-center text-[#FDFBF7] text-xs font-extrabold shrink-0">
                    {(user.full_name || user.email).charAt(0).toUpperCase()}
                  </span>
                  <span className="text-left hidden lg:block">
                    <span className="block text-xs font-bold text-[#2B211B] leading-tight max-w-[120px] truncate">
                      {user.full_name}
                    </span>
                    <span className="block text-[10px] text-[#9F3F1D] font-semibold">
                      {isAdmin ? "Administrator" : "Peserta"}
                    </span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6A5A4E]" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#FDFBF7] border border-[#E6DDD2] shadow-xl z-50 overflow-hidden">
                      <div className="px-3 py-2.5 border-b border-[#E6DDD2]">
                        <p className="text-xs font-bold text-[#2B211B] truncate">{user.full_name}</p>
                        <p className="text-[10px] text-[#6A5A4E] truncate">{user.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#9F3F1D] hover:bg-[#F3ECE2] border-b border-[#E6DDD2]"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Buka Dashboard Admin
                        </Link>
                      )}

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs text-[#4A3B31] hover:bg-[#F3ECE2] hover:text-[#2B211B]"
                      >
                        <GraduationCap className="w-4 h-4" />
                        Dashboard Saya
                      </Link>
                      <Link
                        href="/profil"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs text-[#4A3B31] hover:bg-[#F3ECE2] hover:text-[#2B211B]"
                      >
                        <UserCircle2 className="w-4 h-4" />
                        Pengaturan Profil
                      </Link>
                      <button
                        type="button"
                        onClick={() => { setUserMenuOpen(false); signOut(); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-rose-700 hover:bg-rose-50 border-t border-[#E6DDD2]"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Belum login: satu pintu masuk untuk admin maupun peserta */
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-[#4A3B31] hover:text-[#2B211B] hover:bg-[#F3ECE2]">
                    <User className="w-4 h-4 mr-1.5" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-[#C4552D] hover:bg-[#A94420] text-[#FDFBF7] font-bold shadow-sm">
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Daftar Gratis
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#6A5A4E] hover:text-[#2B211B] hover:bg-[#F3ECE2] focus:outline-none"
              aria-label="Toggle Menu Navigasi"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-[#E6DDD2] bg-[#FAF6F0] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = link.href.includes("#")
              ? false
              : link.href === "/beranda"
              ? pathname === "/beranda" || pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-[#EFE7DC] text-[#9F3F1D] font-semibold"
                    : "text-[#4A3B31] hover:bg-[#F3ECE2] hover:text-[#2B211B]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4 text-[#C4552D]" />}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <Badge variant="destructive" className="text-[10px]">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#E6DDD2] flex flex-col gap-2">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full justify-center bg-[#FDFBF7] border-[#D8CCBE] text-[#2B211B]">
                Masuk ke Akun
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button className="w-full justify-center bg-[#C4552D] hover:bg-[#A94420] text-[#FDFBF7] font-bold">
                Daftar &amp; Mulai Belajar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
