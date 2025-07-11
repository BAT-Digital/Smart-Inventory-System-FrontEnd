// hooks/useCategories.ts
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";

export type Supplier = {
  supplierId: number;
  name: string;
  address: string;
  contactInfo: string;
};

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Failed to fetch suppliers:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return { suppliers, loading, refetch: fetchSuppliers };
};
