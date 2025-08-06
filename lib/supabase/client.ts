import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Check if we have valid Supabase configuration
export const hasSupabaseConfig = () => {
  return supabaseUrl !== "https://placeholder.supabase.co" && supabaseAnonKey !== "placeholder-key"
}

// Client-side Supabase client (for use in components)
export const createClient = () => {
  if (!hasSupabaseConfig()) {
    console.warn(
      "Supabase configuration missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    )
    // Return a mock client for development
    return createSupabaseClient(supabaseUrl, supabaseAnonKey)
  }

  return createClientComponentClient<Database>()
}

// Singleton pattern to prevent multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient()
  }
  return supabaseClient
}

export const reinitializeSupabaseClient = (url: string, key: string) => {
  // Update the environment variables for the current session
  process.env.NEXT_PUBLIC_SUPABASE_URL = url
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = key

  // Create a new client with the updated credentials
  supabaseClient = createClientComponentClient<Database>({
    supabaseUrl: url,
    supabaseKey: key,
  })

  return supabaseClient
}
