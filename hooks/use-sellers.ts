import { useEffect, useState } from "react";
import { clientQueries } from "@/lib/database/queries";
import type { Seller as SellerType } from "@/types/database";

export type Seller = SellerType & {
  created_by_user: { name: string } | null;
};

export const useSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const data = await clientQueries.getSellers();
        setSellers(data as Seller[]);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return { sellers, loading };
};
