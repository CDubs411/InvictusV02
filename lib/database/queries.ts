import { getSupabaseClient, hasSupabaseConfig } from "@/lib/supabase/client"
import { createServerClient, hasSupabaseConfig as hasServerConfig } from "@/lib/supabase/server"
import type { Database } from "@/types/database"

type Tables = Database["public"]["Tables"]

// Mock data for development when Supabase is not configured
const mockBuyers = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    address: "Austin, TX",
    notes: "First-time buyer, pre-approved for $350K",
    tags: ["First-Time", "Pre-Approved"],
    budget_min: 250000,
    budget_max: 350000,
    status: "active" as const,
    company_id: "1",
    created_by: "1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by_user: { name: "Brendan Martinez" },
  },
  // Add more mock data as needed
]

// Client-side queries
export class ClientQueries {
  private supabase = getSupabaseClient()

  // Buyers
  async getBuyers() {
    if (!hasSupabaseConfig()) {
      console.log("Using mock data for buyers")
      return mockBuyers
    }

    const { data, error } = await this.supabase
      .from("buyers")
      .select(`
        *,
        created_by_user:users!buyers_created_by_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createKPI(kpi: Tables["kpis"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      console.log("Mock: Creating KPI", kpi)
      return {
        ...kpi,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("kpis").insert(kpi).select().single()

    if (error) throw error
    return data
  }

  async createBuyer(buyer: Tables["buyers"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      console.log("Mock: Creating buyer", buyer)
      return {
        ...buyer,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("buyers").insert(buyer).select().single()

    if (error) throw error
    return data
  }

  async updateBuyer(id: string, updates: Tables["buyers"]["Update"]) {
    if (!hasSupabaseConfig()) {
      console.log("Mock: Updating buyer", id, updates)
      return { ...updates, id, updated_at: new Date().toISOString() }
    }

    const { data, error } = await this.supabase.from("buyers").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  async deleteBuyer(id: string) {
    if (!hasSupabaseConfig()) {
      console.log("Mock: Deleting buyer", id)
      return
    }

    const { error } = await this.supabase.from("buyers").delete().eq("id", id)

    if (error) throw error
  }

  // Add similar mock implementations for other methods...
  async getSellers() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("sellers")
      .select(`
        *,
        created_by_user:users!sellers_created_by_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createSeller(seller: Tables["sellers"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      return {
        ...seller,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("sellers").insert(seller).select().single()

    if (error) throw error
    return data
  }

  async getInvestors() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("investors")
      .select(`
        *,
        created_by_user:users!investors_created_by_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createInvestor(investor: Tables["investors"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      return {
        ...investor,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("investors").insert(investor).select().single()

    if (error) throw error
    return data
  }

  async getDeals() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("deals")
      .select(`
        *,
        seller:sellers(name, address),
        buyer:buyers(name, address),
        investor:investors(name, address),
        quote:quotes(value, status),
        contract:contracts(signed, status),
        created_by_user:users!deals_created_by_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createDeal(deal: Tables["deals"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      return {
        ...deal,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("deals").insert(deal).select().single()

    if (error) throw error
    return data
  }

  async getQuotes() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("quotes")
      .select(`
        *,
        deal:deals(title, property_address, seller:sellers(name), buyer:buyers(name), investor:investors(name)),
        created_by_user:users!quotes_created_by_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createQuote(quote: Tables["quotes"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      return {
        ...quote,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("quotes").insert(quote).select().single()

    if (error) throw error
    return data
  }

  async getContracts() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("contracts")
      .select(`
        *,
        deal:deals(title, property_address, value, seller:sellers(name), buyer:buyers(name), investor:investors(name)),
        created_by_user:users!contracts_created_by_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createContract(contract: Tables["contracts"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      return {
        ...contract,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("contracts").insert(contract).select().single()

    if (error) throw error
    return data
  }

  async getCalls() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("calls")
      .select(`
        *,
        user:users!calls_user_id_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createCall(call: Tables["calls"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      return { ...call, id: Date.now().toString(), created_at: new Date().toISOString() }
    }

    const { data, error } = await this.supabase.from("calls").insert(call).select().single()

    if (error) throw error
    return data
  }

  async getCalendarEvents() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("calendar_events")
      .select(`
        *,
        user:users!calendar_events_user_id_fkey(name)
      `)
      .order("start_time", { ascending: true })

    if (error) throw error
    return data
  }

  async createCalendarEvent(event: Tables["calendar_events"]["Insert"]) {
    if (!hasSupabaseConfig()) {
      return {
        ...event,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const { data, error } = await this.supabase.from("calendar_events").insert(event).select().single()

    if (error) throw error
    return data
  }

  async getKPIs() {
    if (!hasSupabaseConfig()) {
      return []
    }

    const { data, error } = await this.supabase
      .from("kpis")
      .select(`
        *,
        user:users!kpis_user_id_fkey(name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async getCurrentUser() {
    if (!hasSupabaseConfig()) {
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

  async getCompanyUsers() {
    if (!hasSupabaseConfig()) {
      return [
        {
          id: "1",
          name: "Brendan Martinez",
          email: "brendan@invictusre.com",
          role: "closer" as const,
          company_id: "1",
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]
    }

    const { data, error } = await this.supabase.from("users").select("*").order("name")

    if (error) throw error
    return data
  }
}

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

// Export instances
export const clientQueries = new ClientQueries()
export const serverQueries = new ServerQueries()
