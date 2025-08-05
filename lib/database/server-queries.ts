import { createServerClient, hasSupabaseConfig as hasServerConfig } from "@/lib/supabase/server"
import type { Database } from "@/types/database"

// Server-side queries
export class ServerQueries {
  private supabase = createServerClient()

  async getCurrentUser() {
    if (!hasServerConfig()) {
      return {
        id: "mock-user-id",
        name: "Demo User",
        email: "demo@invictusre.com",
        role: "admin" as const,
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
      }
    }

    const {
      data: { user },
    } = await this.supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await this.supabase
      .from("users")
      .select(`
        *,
        company:companies(*)
      `)
      .eq("id", user.id)
      .single()

    if (error) throw error
    return data
  }
}

// Export instance
export const serverQueries = new ServerQueries()
