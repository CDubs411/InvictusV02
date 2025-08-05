"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { clientQueries } from "@/lib/database/queries"
import type { User } from "@/types/database"

export function useSupabase() {
  const supabase = getSupabaseClient()
  return supabase
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await clientQueries.getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = getSupabaseClient().auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        getUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

export function useBuyers() {
  const [buyers, setBuyers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const data = await clientQueries.getBuyers()
        setBuyers(data || [])
      } catch (error) {
        console.error("Error fetching buyers:", error)
        setBuyers([])
      } finally {
        setLoading(false)
      }
    }

    fetchBuyers()
  }, [])

  const createBuyer = async (buyer: any) => {
    try {
      const newBuyer = await clientQueries.createBuyer(buyer)
      setBuyers((prev) => [newBuyer, ...prev])
      return newBuyer
    } catch (error) {
      console.error("Error creating buyer:", error)
      throw error
    }
  }

  return { buyers, loading, createBuyer }
}

// Similar hooks for other entities
export function useSellers() {
  const [sellers, setSellers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await clientQueries.getSellers()
        setSellers(data || [])
      } catch (error) {
        console.error("Error fetching sellers:", error)
        setSellers([])
      } finally {
        setLoading(false)
      }
    }

    fetchSellers()
  }, [])

  return { sellers, loading }
}

export function useInvestors() {
  const [investors, setInvestors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const data = await clientQueries.getInvestors()
        setInvestors(data || [])
      } catch (error) {
        console.error("Error fetching investors:", error)
        setInvestors([])
      } finally {
        setLoading(false)
      }
    }

    fetchInvestors()
  }, [])

  return { investors, loading }
}

export function useDeals() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await clientQueries.getDeals()
        setDeals(data || [])
      } catch (error) {
        console.error("Error fetching deals:", error)
        setDeals([])
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  return { deals, loading }
}
