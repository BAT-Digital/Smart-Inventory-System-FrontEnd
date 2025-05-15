// hooks/useBatchArrivals.ts
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { BatchArrivalItem } from "../types/BatchArrivals";

export const useBatchArrivalItems = (arrivalId: number) => {
  const [data, setData] = useState<BatchArrivalItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (arrivalId: number) => {
    setLoading(true);
    try {
      await axios
        .get<BatchArrivalItem[]>(`/api/batch-arrival-items/${arrivalId}/items`)
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.error("Error fetching batch arrival items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(arrivalId);
  }, [arrivalId]);

  return { data, loading, refetch: fetchData };
};
