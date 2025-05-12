// hooks/useCategories.ts
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";
import { SalesTransaction } from "./useSalesTransactions";
import { Product } from "./useProducts";

export type SalesItem = {
  salesItemId: number;
  salesTransaction: SalesTransaction;
  product: Product;
  quantity: number;
  expiryDate: string | null;
};

type Props = {
  transactionId: number;
};

export const useSalesItemsName = ({ transactionId }: Props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`/api/sales-transactions/${transactionId}`)
      .then((res) => setName(res.data.credentials))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, [transactionId]);

  return name;
};

export const useSalesItems = ({ transactionId }: Props) => {
  const [salesItems, setSalesItems] = useState<SalesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSalesItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<SalesItem[]>(
        `/api/sales-items/transaction/${transactionId}`
      );
      setSalesItems(response.data);
    } catch (err) {
      console.error("Failed to fetch salesItems:", err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, [transactionId]);

  useEffect(() => {
    fetchSalesItems();
  }, [fetchSalesItems, transactionId]);

  return { salesItems, loading, name, error, refetch: fetchSalesItems };
};
