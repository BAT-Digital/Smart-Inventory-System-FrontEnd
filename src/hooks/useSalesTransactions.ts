// hooks/useCategories.ts
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";
import dayjs from "dayjs";

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
      .get('/api/sales-transactions/by-status?status="PROCESSING"')
      .then((res) => setSalesTransactions(res.data))
      .catch((err) => console.error("Failed to fetch salesTransactions:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSalesTransactions();
  }, [fetchSalesTransactions]);

  return { salesTransactions, loading, refetch: fetchSalesTransactions };
};

export const useSalesTransactionsByDate = (
  from: string | null,
  to: string | null
) => {
  const [salesTransactions, setSalesTransactions] = useState<
    SalesTransaction[]
  >([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const today = dayjs().format("YYYY-MM-DD");
  const fromDate = from ?? today;
  const toDate = to ?? today;

  const fetchSalesTransactions = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `/api/sales-transactions/by-date-range?from=${fromDate}&to=${toDate}`
      )
      .then((res) => {
        setSalesTransactions(res.data.transactions);
        setTotal(res.data.total);
      })
      .catch((err) => console.error("Failed to fetch salesTransactions:", err))
      .finally(() => setLoading(false));
  }, [from, to]);

  useEffect(() => {
    fetchSalesTransactions();
  }, [fetchSalesTransactions]);

  return { salesTransactions, total, loading, refetch: fetchSalesTransactions };
};
