// hooks/useBatchArrivals.ts
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { BatchArrival } from "../types/BatchArrivals";

export const useBatchArrivalsSearch = (searchTerm?: string) => {
  const [data, setData] = useState<BatchArrival[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (search?: string) => {
    setLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      await axios
        .get<BatchArrival[]>("/api/batch-arrivals/search", params)
        .then((res) => {
          setData(res.data);
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
