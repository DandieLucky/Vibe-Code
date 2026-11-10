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
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/kurikulum", label: "Kurikulum 12 Modul" },
    { href: "/kumpulan-karya", label: "Kumpulan Karya", badge: "Wajib" },
    { href: "/leaderboard", label: "Papan Peringkat", icon: Trophy },
    { href: "/panduan-deploy", label: "Panduan Deploy", icon: Rocket },
    { href: "/dashboard", label: "Dashboard Peserta" },
    { href: "/admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md border-slate-800 shadow-md text-white"
          : "bg-slate-900 border-slate-800 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  VIBE CODE
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  ANTIGRAVITY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Platform Pembelajaran Web Dev Terintegrasi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-sky-300 bg-slate-800/80 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-sky-400" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-400/30 px-1.5 py-0.2 rounded-full font-bold ml-1 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <User className="w-4 h-4 mr-1.5" />
                Masuk
              </Button>
            </Link>
            <Link href="/kurikulum">
              <Button
                variant="accent"
                size="sm"
                className="font-bold shadow-md shadow-sky-600/20"
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                Mulai Belajar
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Menu Navigasi"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-slate-800 text-sky-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4 text-sky-400" />}
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
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full justify-center bg-slate-800 border-slate-700 text-slate-200">
                Masuk ke Akun
              </Button>
            </Link>
            <Link href="/kurikulum" className="w-full">
              <Button variant="accent" className="w-full justify-center font-bold">
                Mulai Belajar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
