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
  const isProtected = path.startsWith("/dashboard") || path.startsWith("/profil");
  const isAdminArea = path.startsWith("/admin");

  if ((isProtected || isAdminArea) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // Cek role admin dari tabel profiles
  if (isAdminArea && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin" && profile?.role !== "instructor") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.searchParams.set("error", "akses_admin_ditolak");
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profil/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
