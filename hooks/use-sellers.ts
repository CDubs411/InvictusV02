import { useEffect, useState } from 'react'
import { supabase } from '@/lib/utils/supabase'

export const useSellers = () => {
  const [sellers, setSellers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSellers = async () => {
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error('Error fetching sellers:', error)
      else setSellers(data || [])

      setLoading(false)
    }

    fetchSellers()
  }, [])

  return { sellers, loading }
}
