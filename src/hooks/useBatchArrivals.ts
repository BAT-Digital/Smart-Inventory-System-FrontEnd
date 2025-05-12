// hooks/useBatchArrivals.ts
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";

export const useBatchArrivals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBatchArrivals = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/batch-arrivals")
      .then((res) => {
        const mapped = res.data.map((item: any, index: number) => ({
          key: index,
          id: item.arrivalId,
          supplier: item.supplier.name,
          notes: item.notes || "-",
          receiver: item.addedBy.username,
          time: new Date(item.arrivalDate).toLocaleString("ru-RU"),
        }));
        setData(mapped);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchBatchArrivals();
  }, [fetchBatchArrivals]);

  return { data, loading, refetch: fetchBatchArrivals };
};
