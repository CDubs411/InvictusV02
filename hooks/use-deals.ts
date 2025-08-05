import { useEffect, useState } from "react";
import { clientQueries } from "@/lib/database/queries";
import type { Deal as DealType } from "@/types/database";

export type Deal = DealType & {
  seller: { name: string; address: string } | null;
  buyer: { name: string; address: string } | null;
  investor: { name: string; address: string } | null;
  quote: { value: number; status: string } | null;
  contract: { signed: boolean; status: string } | null;
  created_by_user: { name: string } | null;
};

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const data = await clientQueries.getDeals();
        setDeals(data as Deal[]);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return { deals, loading };
};
