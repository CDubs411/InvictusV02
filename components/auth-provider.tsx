"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient, hasSupabaseConfig } from "@/lib/supabase/client"
import type { User } from "@supabase/auth-helpers-nextjs"
import type { User as AppUser } from "@/types/database"

interface AuthContextType {
  user: User | null
  appUser: AppUser | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      if (!hasSupabaseConfig()) {
        // Set mock user for development
        setAppUser({
          id: "mock-user-id",
          name: "Demo User",
          email: "demo@invictusre.com",
          role: "admin",
          company_id: "mock-company-id",
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          company: {
            id: "mock-company-id",
            name: "Invictus Real Estate",
            address: "123 Business Plaza, Austin, TX 78701",
            phone: "(555) 123-4567",
            email: "info@invictusre.com",
            website: "www.invictusre.com",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        })
        setLoading(false)
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Fetch app user data
        const { data: appUserData } = await supabase
          .from("users")
          .select(`
            *,
            company:companies(*)
          `)
          .eq("id", user.id)
          .single()

        setAppUser(appUserData)
      }

      setLoading(false)
    }

    getUser()

    if (!hasSupabaseConfig()) {
      return
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: appUserData } = await supabase
          .from("users")
          .select(`
              *,
              company:companies(*)
            `)
          .eq("id", session.user.id)
          .single()

        setAppUser(appUserData)
      } else {
        setAppUser(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signOut = async () => {
    if (!hasSupabaseConfig()) {
      console.log("Mock: Signing out")
      setUser(null)
      setAppUser(null)
      router.push("/auth/login")
      return
    }

    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, appUser, loading, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
