import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/database"

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if we have valid Supabase configuration
const hasSupabaseConfig = () => {
  return (
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://placeholder.supabase.co" &&
    supabaseAnonKey !== "placeholder-key"
  )
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Skip auth checks if Supabase is not configured (development mode)
  if (!hasSupabaseConfig()) {
    console.warn("Supabase not configured. Skipping authentication checks.")
    return res
  }

  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect authenticated routes
  const protectedPaths = [
    "/",
    "/buyers",
    "/sellers",
    "/investors",
    "/deals",
    "/quotes",
    "/contracts",
    "/calls",
    "/calendar",
    "/kpis",
    "/settings",
  ]
  const isProtectedPath = protectedPaths.some(
    (path) => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + "/"),
  )

  // Allow auth routes
  const isAuthPath = req.nextUrl.pathname.startsWith("/auth/")

  if (isProtectedPath && !session) {
    // Redirect to login if not authenticated
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/auth/login"
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthPath && session) {
    // Redirect to dashboard if already authenticated
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/"
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
