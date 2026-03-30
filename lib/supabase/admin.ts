import { createClient } from "@supabase/supabase-js";

/**
 * Admin client uses the SERVICE ROLE key — bypasses RLS.
 * NEVER expose this on the client side. Use only in Server Actions / API Routes.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
