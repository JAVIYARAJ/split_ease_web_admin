"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { clearAuthCookies } from "@/lib/supabase/actions"

interface UserContextType {
  user: User | null
  adminData: { message?: string; is_admin?: boolean; full_name?: string; role?: string } | null
  displayName: string
  email: string
  initials: string
  loading: boolean
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  adminData: null,
  displayName: "",
  email: "",
  initials: "AD",
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
})

function getInitials(name: string, email: string): string {
  if (name) {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return parts[0].slice(0, 2).toUpperCase()
  }
  return email.split("@")[0].slice(0, 2).toUpperCase()
}

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [adminData, setAdminData] = useState<{
    message?: string
    is_admin?: boolean
    full_name?: string
    role?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const logout = async () => {
    try {
      // 1. Sign out from Supabase (clears local storage/memory)
      await supabase.auth.signOut()
      
      // 2. Hard clear all Supabase cookies via Server Action
      // This is crucial for Brave and other privacy-first browsers
      await clearAuthCookies()
      
      // 3. Clear local React state instantly
      setUser(null)
      setAdminData(null)
      
      // 4. NUCLEAR LOGOUT: Hard redirect to landing page
      if (typeof window !== 'undefined') {
        window.location.replace("/")
      }
    } catch (err) {
      console.error("Error during logout:", err)
      // Final fallback
      if (typeof window !== 'undefined') {
        window.location.replace("/")
      }
    }
  }

  const fetchAdminStatus = async (currentUser: User | null, isInitialLoad = false) => {
    if (!currentUser) {
      setAdminData(null)
      if (isInitialLoad) setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase.rpc("check_admin_access_rpc")

      if (error || !data?.is_admin) {
        console.error("Admin validation failed:", { error, message: data?.message })
        await logout()
      } else {
        setAdminData(data)
      }
    } catch (err) {
      console.error("Critical error in admin status check:", err)
      await logout()
    } finally {
      if (isInitialLoad) setLoading(false)
    }
  }

  const refreshUser = async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
    await fetchAdminStatus(data.user)
  }

  useEffect(() => {
    // 1. Check initial session
    supabase.auth.getUser().then(async ({ data }) => {
      const currentUser = data.user
      setUser(currentUser)
      await fetchAdminStatus(currentUser, true)
    })

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        await fetchAdminStatus(currentUser)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setAdminData(null)
        // Hard redirect to landing page on explicit sign out
        if (typeof window !== 'undefined' && window.location.pathname !== "/") {
          window.location.replace("/")
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Auto-redirect if logged out and on a protected route (/ and /login are public)
  useEffect(() => {
    const publicPaths = ["/", "/login"]
    if (!loading && !user && typeof window !== 'undefined' && !publicPaths.includes(window.location.pathname)) {
      window.location.replace("/")
    }
  }, [user, loading])

  const email = user?.email ?? ""
  const displayName =
    adminData?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.display_name ||
    email.split("@")[0] ||
    "Admin"

  const initials = getInitials(displayName, email)

  return (
    <UserContext.Provider value={{ user, adminData, displayName, email, initials, loading, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
