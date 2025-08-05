import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Check if we have valid Supabase configuration
export const hasSupabaseConfig = () => {
  return supabaseUrl !== "https://placeholder.supabase.co" && supabaseAnonKey !== "placeholder-key"
}

// Server-side Supabase client (for use in Server Components)
export const createServerClient = () => {
  if (!hasSupabaseConfig()) {
    console.warn("Supabase configuration missing. Using mock client for development.")
    return createSupabaseClient(supabaseUrl, supabaseAnonKey)
  }

  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

// Route handler client (for use in API routes)
export const createRouteClient = () => {
  if (!hasSupabaseConfig()) {
    console.warn("Supabase configuration missing. Using mock client for development.")
    return createSupabaseClient(supabaseUrl, supabaseAnonKey)
  }

  const cookieStore = cookies()
  return createRouteHandlerClient<Database>({ cookies: () => cookieStore })
}
