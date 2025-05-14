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

export const useCategoriesSearch = (searchTerm?: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async (search?: string) => {
    setLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      axios
        .get("/api/categories/search", params)
        .then((res) => setCategories(res.data));
    } catch (error) {
      console.error(`Error fetching categories searching:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(searchTerm);
  }, [searchTerm]);

  return { categories, loading, refetch: fetchCategories };
};

type Props = {
  selectedCategory: string | null;
  searchTerm?: string;
};

export const useProductsByCategory = ({
  selectedCategory,
  searchTerm,
}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductsByCategory = async (search?: string) => {
    setLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      axios
        .get(`/api/products/by-category/${selectedCategory}`, params)
        .then((res) => setProducts(res.data));
    } catch (error) {
      console.error(`Error fetching products by category:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(searchTerm);
  }, [searchTerm, selectedCategory]);

  return { products, loading, refetch: fetchProductsByCategory };
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
