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
      { href: "/admin", label: "Admin", icon: ShieldCheck },
      { href: "/beranda", label: "Beranda" },
      { href: "/kurikulum", label: "Kurikulum" },
      { href: "/kumpulan-karya", label: "Karya" },
      { href: "/leaderboard", label: "Peringkat", icon: Trophy },
      { href: "/tutorial", label: "Tutorial", icon: Rocket },
    ]
    : isAuthenticated
      ? [
        { href: "/dashboard", label: "Dashboard", icon: GraduationCap },
        { href: "/tutorial", label: "Tutorial", icon: BookOpen },
        { href: "/kurikulum", label: "Kurikulum 10 Modul" },
        { href: "/kumpulan-karya", label: "Kumpulan Karya", badge: "Wajib" },
      ]
      : [
        { href: "/beranda", label: "Beranda" },
        { href: "/beranda#kurikulum", label: "Kurikulum 10 Modul" },
        { href: "/beranda#karya", label: "Alur Pelatihan" },
      ];

  const brandHref = isAdmin ? "/admin" : isAuthenticated ? "/dashboard" : "/beranda";

  const isNavLinkActive = (href: string) =>
    href.includes("#")
      ? false
      : href === "/beranda"
        ? pathname === "/beranda" || pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${scrolled
          ? "bg-paper backdrop-blur-md border-rule shadow-xs text-ink"
          : "bg-paper border-rule text-ink"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <Link href={brandHref} className="flex items-center gap-3 group shrink-0">
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-sheet shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-ink group-hover:text-accent transition-colors">
                  COMPOSELAB
                </span>
              </div>
              <p className="text-[11px] text-muted hidden xl:block whitespace-nowrap">
                Android Kotlin, Compose &amp; AI Prompting
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = isNavLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${isActive
                      ? "text-accent bg-paper-3 font-semibold"
                      : "text-ink-2 hover:text-ink hover:bg-paper-2"
                    }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-accent" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-accent-soft text-accent border border-rule px-1.5 py-0.2 rounded-full font-bold ml-1">
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
              <div className="h-8 w-28 rounded-lg bg-paper-3 animate-pulse motion-reduce:animate-none" />
            ) : isAuthenticated && user ? (
              /* Sudah login: menu pengguna */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1.5 rounded-xl hover:bg-paper-2 transition-colors"
                >
                  <span className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-sheet text-xs font-extrabold shrink-0">
                    {(user.full_name || user.email).charAt(0).toUpperCase()}
                  </span>
                  <span className="text-left hidden lg:block">
                    <span className="block text-xs font-bold text-ink leading-tight max-w-[120px] truncate">
                      {user.full_name}
                    </span>
                    <span className="block text-[10px] text-accent font-semibold">
                      {isAdmin ? "Administrator" : "Peserta"}
                    </span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-sheet border border-rule shadow-md z-50 overflow-hidden">
                      <div className="px-3 py-2.5 border-b border-rule">
                        <p className="text-xs font-bold text-ink truncate">{user.full_name}</p>
                        <p className="text-[10px] text-muted truncate">{user.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-accent hover:bg-paper-2 border-b border-rule"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Buka Dashboard Admin
                        </Link>
                      )}

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs text-ink-2 hover:bg-paper-2 hover:text-ink"
                      >
                        <GraduationCap className="w-4 h-4" />
                        Dashboard Saya
                      </Link>
                      <Link
                        href="/profil"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs text-ink-2 hover:bg-paper-2 hover:text-ink"
                      >
                        <UserCircle2 className="w-4 h-4" />
                        Pengaturan Profil
                      </Link>
                      <button
                        type="button"
                        onClick={() => { setUserMenuOpen(false); signOut(); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-rose-700 hover:bg-rose-50 border-t border-rule"
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
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-1.5" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="accent" size="sm" className="font-bold">
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Daftar
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
              className="p-2 rounded-lg text-muted hover:text-ink hover:bg-paper-2 focus:outline-none"
              aria-label="Toggle Menu Navigasi"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-rule bg-paper px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${isActive
                    ? "bg-paper-3 text-accent font-semibold"
                    : "text-ink-2 hover:bg-paper-2 hover:text-ink"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4 text-accent" />}
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
          <div className="pt-4 border-t border-rule flex flex-col gap-2">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full justify-center">
                Masuk ke Akun
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button variant="accent" className="w-full justify-center font-bold">
                Daftar &amp; Mulai Belajar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
