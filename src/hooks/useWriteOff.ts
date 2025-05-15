import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { BatchArrivalItem } from "../types/BatchArrivals";

export type WriteOff = {
  writeOffId: number;
  batch: BatchArrivalItem;
  writeOffDate: string;
  quantity: number;
  reason: string;
};

export const useWriteOff = (searchTerm?: string) => {
  const [writeOffs, setWriteOffs] = useState<WriteOff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWriteOffs = async (search?: string) => {
    setLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      await axios
        .get<WriteOff[]>("/api/write-offs", params)
        .then((res) => setWriteOffs(res.data));
    } catch (error) {
      console.error("Error fetching write offs:", error);
      setError("Failed to load write offs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWriteOffs(searchTerm);
  }, [searchTerm]);

  return { writeOffs, loading, error, refetch: fetchWriteOffs };
};
