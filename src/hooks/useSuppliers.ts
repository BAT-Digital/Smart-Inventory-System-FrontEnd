// hooks/useCategories.ts
import { useEffect, useState } from "react";
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Failed to fetch suppliers:", err))
      .finally(() => setLoading(false));
  }, []);

  return { suppliers, loading };
};
