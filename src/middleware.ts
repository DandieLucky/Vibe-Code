import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware Supabase: menyegarkan sesi auth di setiap request dan
 * melindungi route privat (/dashboard, /profil, /admin).
 *
 * Jika Supabase belum dikonfigurasi (mode demo), middleware meneruskan
 * request tanpa menyentuh sesi — platform tetap bisa dipakai tanpa env.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const configured =
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    !supabaseUrl.includes("mock-supabase") &&
    !supabaseUrl.includes("your-project-id");

  if (!configured) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // PENTING: getUser() harus dipanggil agar token di-refresh.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected =
    path.startsWith("/dashboard") ||
    path.startsWith("/profil") ||
    path.startsWith("/kurikulum") ||
    path.startsWith("/panduan-deploy") ||
    path === "/leaderboard" ||
    path.startsWith("/leaderboard/");
  const isAdminArea = path.startsWith("/admin");
  const isPublicPage = ["/", "/beranda", "/login", "/register"].some(
    (p) => path === p || path.startsWith(p + "/")
  );

  // Papan peringkat khusus administrator — peserta tidak boleh melihatnya.
  const isAdminOnly = path === "/leaderboard" || path.startsWith("/leaderboard/");

  if ((isProtected || isAdminArea) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // Ambil profil sekali untuk cek role + status wajib ganti password
  // Cek wajib-ganti-password di mana pun pengguna berada (kecuali halaman publik)
  if (user && !isPublicPage) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, must_change_password")
      .eq("id", user.id)
      .single();

    // Paksa ganti password sebelum boleh memakai platform
    const isChangingPassword = path.startsWith("/profil");
    if (profile?.must_change_password && !isChangingPassword) {
      const url = request.nextUrl.clone();
      url.pathname = "/profil";
      url.searchParams.set("ganti-password", "wajib");
      return NextResponse.redirect(url);
    }

    // Papan peringkat hanya untuk admin
    if (isAdminOnly && profile?.role !== "admin" && profile?.role !== "instructor") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.search = "";
      return NextResponse.redirect(url);
    }

    // Batasi area admin
    if (isAdminArea && profile?.role !== "admin" && profile?.role !== "instructor") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.searchParams.set("error", "akses_admin_ditolak");
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  // Cakup SEMUA rute kecuali aset statis. Sebelumnya matcher hanya memuat
  // 5 rute sehingga /kurikulum dan /panduan-deploy lolos begitu saja dari
  // pemeriksaan wajib-ganti-password.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|xml|woff2?)$).*)",
  ],
};
