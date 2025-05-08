// hooks/useCategories.ts
import { useEffect, useState } from "react";
import axios from "axios";

export interface Category {
  categoryId: number;
  name: string;
  description: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};
