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

export const useBatchArrivalsSearch = (searchTerm?: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (search?: string) => {
    setLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      await axios.get("/api/batch-arrivals/search", params).then((res) => {
        const mapped = res.data.map((item: any, index: number) => ({
          key: index,
          id: item.arrivalId,
          supplier: item.supplier.name,
          notes: item.notes || "-",
          receiver: item.addedBy.username,
          time: new Date(item.arrivalDate).toLocaleString("ru-RU"),
        }));
        setData(mapped);
      });
    } catch (error) {
      console.error("Error fetching batch arrivals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  return { data, loading, refetch: fetchData };
};
