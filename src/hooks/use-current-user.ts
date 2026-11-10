"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type UserRole = "student" | "admin" | "instructor" | "guest";

export interface CurrentUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  institution: string | null;
  must_change_password: boolean;
  /** true = Supabase belum dikonfigurasi, platform jalan dalam mode demo */
  demoMode: boolean;
}

interface UseCurrentUserResult {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Satu sumber kebenaran untuk identitas pengguna di sisi klien.
 *
 * Dipakai navbar, dashboard, dan guard halaman, supaya keputusan
 * "tampilkan menu apa" selalu konsisten dan tidak ada dua tempat
 * yang bisa berbeda pendapat soal siapa yang sedang login.
 */
export function useCurrentUser(): UseCurrentUserResult {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const supabase = createClient();

      if (!supabase) {
        // Mode demo tanpa Supabase: anggap tamu
        setUser(null);
        setIsLoading(false);
        return;
      }

      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, email, full_name, role, institution, must_change_password")
        .eq("id", authUser.id)
        .single();

      setUser({
        id: authUser.id,
        email: profile?.email ?? authUser.email ?? "",
        full_name: profile?.full_name ?? authUser.email?.split("@")[0] ?? "Pengguna",
        role: (profile?.role ?? "student") as UserRole,
        institution: profile?.institution ?? null,
        must_change_password: profile?.must_change_password ?? false,
        demoMode: false,
      });
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!cancelled) await load();
    })();

    // Ikut berubah saat login/logout dari tab lain
    let unsub: (() => void) | undefined;
    (async () => {
      const supabase = createClient();
      if (!supabase) return;
      const { data } = supabase.auth.onAuthStateChange(() => {
        if (!cancelled) load();
      });
      unsub = () => data.subscription.unsubscribe();
    })();

    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, [load]);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }, [router]);

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin" || user?.role === "instructor",
    isLoading,
    refresh: load,
    signOut,
  };
}
