import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";
import { Product } from "./useProducts";
import { BatchArrivalItem } from "../types/BatchArrivals";

export const useTopProducts = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopProducts = useCallback(() => {
    setLoading(true);
    axios
      .get<Product[]>("/api/dashboard/top-performing-products")
      .then((res) => setTopProducts(res.data))
      .catch((err) => {
        console.error("Error fetching top products:", err);
        setError("Failed to load top products");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);

  return { topProducts, loading, error, refetch: fetchTopProducts };
};

export const useOldestLowRemaining = () => {
  const [batchItems, setBatchItems] = useState<BatchArrivalItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOldestLowRemaining = useCallback(() => {
    setLoading(true);
    axios
      .get<BatchArrivalItem[]>("/api/dashboard/oldest-low-remaining-batches")
      .then((res) => setBatchItems(res.data))
      .catch((err) => {
        console.error("Error fetching top products:", err);
        setError("Failed to load top products");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchOldestLowRemaining();
  }, [fetchOldestLowRemaining]);

  return { batchItems, loading, error, refetch: fetchOldestLowRemaining };
};
