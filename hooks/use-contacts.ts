import { useEffect, useState } from "react";
import { clientQueries } from "@/lib/database/queries";
import type { Buyer, Seller, Investor } from "@/types/database";

export type Contact = (Buyer | Seller | Investor) & { type: 'buyer' | 'seller' | 'investor' };

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const [buyers, sellers, investors] = await Promise.all([
          clientQueries.getBuyers(),
          clientQueries.getSellers(),
          clientQueries.getInvestors(),
        ]);

        const allContacts: Contact[] = [
          ...buyers.map((c) => ({ ...c, type: 'buyer' as const })),
          ...sellers.map((c) => ({ ...c, type: 'seller' as const })),
          ...investors.map((c) => ({ ...c, type: 'investor' as const })),
        ];

        setContacts(allContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { contacts, loading };
};
