// hooks/useCategories.ts
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";
import { Product } from "./useProducts";

export type Category = {
  categoryId: number;
  name: string;
  description: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return { categories, loading, refetch: fetchCategories };
};

interface Props {
  category: String;
}

export const useProductsByCategory = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/products/by-category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err))
      .finally(() => setLoading(false));
  }, []);

  console.log(products);

  return { products, loading };
};

interface supplierProps {
  selectedSupplier: string;
}

export const useProductsBySupplier = ({ selectedSupplier }: supplierProps) => {
  const [productsBySupplier, setProductsBySupplier] = useState<Product[]>([]);
  const [productsBySupplierLoading, setProductsBySupplierLoading] =
    useState(true);

  useEffect(() => {
    axios
      .get(`/api/products/by-supplier/${selectedSupplier}`)
      .then((res) => setProductsBySupplier(res.data))
      .catch((err) => console.error("Failed to fetch suppliers:", err))
      .finally(() => setProductsBySupplierLoading(false));
  }, []);

  return { productsBySupplier, productsBySupplierLoading };
};
