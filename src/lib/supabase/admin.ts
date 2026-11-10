import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "./client";

export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (
    !isSupabaseConfigured() ||
    !serviceRoleKey ||
    serviceRoleKey.includes("placeholder")
  ) {
    return null;
  }

  return createClient(supabaseUrl!, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
