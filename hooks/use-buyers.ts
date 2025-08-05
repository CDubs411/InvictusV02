import { useEffect, useState } from "react";
import { clientQueries } from "@/lib/database/client-queries";
import type { Buyer as BuyerType } from "@/types/database";

export type Buyer = BuyerType & {
  created_by_user: { name: string } | null;
};

export const useBuyers = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        setLoading(true);
        const data = await clientQueries.getBuyers();
        setBuyers(data as Buyer[]);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  return { buyers, loading };
};
