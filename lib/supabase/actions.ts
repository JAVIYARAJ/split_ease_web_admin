"use server"

import { cookies } from "next/headers"

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  
  // Supabase uses 'sb-' prefix for its cookies
  const allCookies = cookieStore.getAll()
  const authCookies = allCookies.filter(c => c.name.startsWith('sb-'))
  
  for (const cookie of authCookies) {
    cookieStore.delete(cookie.name)
  }
}
