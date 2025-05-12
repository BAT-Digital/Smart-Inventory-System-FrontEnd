// hooks/useCategories.ts
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";

export type SalesTransaction = {
  transactionId: number;
  credentials: string;
  status: string;
  transactionDate: string;
  totalAmount: number;
};

export const useSalesTransactions = () => {
  const [salesTransactions, setSalesTransactions] = useState<
    SalesTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchSalesTransactions = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/sales-transactions")
      .then((res) => setSalesTransactions(res.data))
      .catch((err) => console.error("Failed to fetch salesTransactions:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSalesTransactions();
  }, [fetchSalesTransactions]);

  return { salesTransactions, loading, refetch: fetchSalesTransactions };
};
