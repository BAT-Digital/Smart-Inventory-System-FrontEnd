// hooks/useCategories.ts
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export interface Supplier {
  supplierId: number;
  name: string;
  address: string;
  contactInfo: string;
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = useCallback(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Failed to fetch suppliers:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return { suppliers, loading, refetch: fetchSuppliers };
};
