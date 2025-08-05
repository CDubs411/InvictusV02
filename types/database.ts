export type QuoteSettings = {
  labor_rate: number
  material_markup: number
  default_profit_margin: number
  overhead_percentage: number
  tax_rate: number
}

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          created_at: string
          quote_settings: QuoteSettings
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          quote_settings?: QuoteSettings
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          quote_settings?: QuoteSettings
        }
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: "admin" | "closer" | "assistant"
          company_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role: "admin" | "closer" | "assistant"
          company_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: "admin" | "closer" | "assistant"
          company_id?: string
          created_at?: string
        }
      }
      buyers: {
        Row: {
          id: string
          name: string
          phone: string | null
          email: string | null
          address: string | null
          notes: string | null
          company_id: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          company_id: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          company_id?: string
          created_by?: string
          created_at?: string
        }
      }
      sellers: {
        Row: {
          id: string
          name: string
          phone: string | null
          email: string | null
          address: string | null
          notes: string | null
          company_id: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          company_id: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          company_id?: string
          created_by?: string
          created_at?: string
        }
      }
      investors: {
        Row: {
          id: string
          name: string
          phone: string | null
          email: string | null
          address: string | null
          notes: string | null
          company_id: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          company_id: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          company_id?: string
          created_by?: string
          created_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          seller_id: string | null
          buyer_id: string | null
          investor_id: string | null
          status: "new" | "quoted" | "contracted" | "closed"
          quote_id: string | null
          contract_id: string | null
          close_date: string | null
          company_id: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          seller_id?: string | null
          buyer_id?: string | null
          investor_id?: string | null
          status?: "new" | "quoted" | "contracted" | "closed"
          quote_id?: string | null
          contract_id?: string | null
          close_date?: string | null
          company_id: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          seller_id?: string | null
          buyer_id?: string | null
          investor_id?: string | null
          status?: "new" | "quoted" | "contracted" | "closed"
          quote_id?: string | null
          contract_id?: string | null
          close_date?: string | null
          company_id?: string
          created_by?: string
          created_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          deal_id: string | null
          value: number
          variables_json: any
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          deal_id?: string | null
          value: number
          variables_json?: any
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          deal_id?: string | null
          value?: number
          variables_json?: any
          created_by?: string
          created_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          deal_id: string
          file_url: string | null
          signed: boolean
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          deal_id: string
          file_url?: string | null
          signed?: boolean
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          deal_id?: string
          file_url?: string | null
          signed?: boolean
          created_by?: string
          created_at?: string
        }
      }
      calls: {
        Row: {
          id: string
          user_id: string
          contact_id: string
          contact_type: "buyer" | "seller" | "investor"
          recording_url: string | null
          duration: number
          timestamp: string
        }
        Insert: {
          id?: string
          user_id: string
          contact_id: string
          contact_type: "buyer" | "seller" | "investor"
          recording_url?: string | null
          duration?: number
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_id?: string
          contact_type?: "buyer" | "seller" | "investor"
          recording_url?: string | null
          duration?: number
          timestamp?: string
        }
      }
      kpis: {
        Row: {
          id: string
          user_id: string
          type: "calls_made" | "deals_closed" | "quotes_sent" | "contracts_signed"
          value: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: "calls_made" | "deals_closed" | "quotes_sent" | "contracts_signed"
          value: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: "calls_made" | "deals_closed" | "quotes_sent" | "contracts_signed"
          value?: number
          created_at?: string
        }
      }
      calendar_events: {
        Row: {
          id: string
          title: string
          start_time: string
          end_time: string
          company_id: string
          user_id: string
          type: "quote" | "follow-up" | "meeting" | "call" | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          start_time: string
          end_time: string
          company_id: string
          user_id: string
          type?: "quote" | "follow-up" | "meeting" | "call" | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          start_time?: string
          end_time?: string
          company_id?: string
          user_id?: string
          type?: "quote" | "follow-up" | "meeting" | "call" | null
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          file_url: string
          file_type: string | null
          company_id: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          file_url: string
          file_type?: string | null
          company_id: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          file_url?: string
          file_type?: string | null
          company_id?: string
          created_by?: string
          created_at?: string
        }
      }
    }
  }
}

// Convenience types
export type Company = Database["public"]["Tables"]["companies"]["Row"]
export type User = Database["public"]["Tables"]["users"]["Row"]
export type Buyer = Database["public"]["Tables"]["buyers"]["Row"]
export type Seller = Database["public"]["Tables"]["sellers"]["Row"]
export type Investor = Database["public"]["Tables"]["investors"]["Row"]
export type Deal = Database["public"]["Tables"]["deals"]["Row"]
export type Quote = Database["public"]["Tables"]["quotes"]["Row"]
export type Contract = Database["public"]["Tables"]["contracts"]["Row"]
export type Call = Database["public"]["Tables"]["calls"]["Row"]
export type KPI = Database["public"]["Tables"]["kpis"]["Row"]
export type CalendarEvent = Database["public"]["Tables"]["calendar_events"]["Row"]
export type Document = Database["public"]["Tables"]["documents"]["Row"]

// Contact union type for calls
export type Contact = Buyer | Seller | Investor
export type ContactType = "buyer" | "seller" | "investor"
