import { getSupabaseClient } from "@/lib/supabase/client"

export async function getCurrentUser() {
  const supabase = getSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: appUser, error } = await supabase
    .from("users")
    .select(`
      *,
      company:companies(*)
    `)
    .eq("id", user.id)
    .single()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }

  return appUser
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Insufficient permissions")
  }
  return user
}
