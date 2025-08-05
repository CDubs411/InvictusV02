import { useEffect, useState } from "react";
import { clientQueries } from "@/lib/database/client-queries";
import type { Investor as InvestorType } from "@/types/database";

export type Investor = InvestorType & {
  created_by_user: { name: string } | null;
};

export const useInvestors = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setLoading(true);
        const data = await clientQueries.getInvestors();
        setInvestors(data as Investor[]);
      } catch (error) {
        console.error("Error fetching investors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  return { investors, loading };
};
