// hooks/useProducts.ts
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";

export type Product = {
  productId: number;
  productName: string;
  barcode: string;
  isPerishable: boolean;
  isComposite: boolean;
  unitOfMeasure: string;
  description: string;
  price: string;
  volume: string;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    axios
      .get<Product[]>("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

type Props = {
  type: String;
  name: String;
};

export const useCategoryProducts = ({ type, name }: Props) => {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categoryloading, setCategoryLoading] = useState<boolean>(true);
  const [categoryerror, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    const endpoint =
      type === "category"
        ? `/api/products/by-category/${name}`
        : `/api/products/by-supplier/${name}`;

    axios
      .get<Product[]>(endpoint)
      .then((res) => setCategoryProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setCategoryError("Failed to load products");
      })
      .finally(() => setCategoryLoading(false));
  }, [type, name]);

  return { categoryProducts, categoryloading, categoryerror };
};

export const useComplexProducts = () => {
  const [complexProducts, setComplexProducts] = useState<Product[]>([]);
  const [complexLoading, setComplexLoading] = useState<boolean>(true);
  const [complexError, setComplexError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Product[]>("/api/products/composite/true")
      .then((res) => setComplexProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setComplexError("Failed to load products");
      })
      .finally(() => setComplexLoading(false));
  }, []);

  return { complexProducts, complexLoading, complexError };
};

export const useSoloProducts = () => {
  const [soloProducts, setSoloProducts] = useState<Product[]>([]);
  const [soloLoading, setSoloLoading] = useState<boolean>(true);
  const [soloError, setSoloError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Product[]>("/api/products/composite/false")
      .then((res) => setSoloProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setSoloError("Failed to load products");
      })
      .finally(() => setSoloLoading(false));
  }, []);

  return { soloProducts, soloLoading, soloError };
};

export const useProductInUse = () => {
  const [productInUseDataSource, setData] = useState([]);
  const [productInUseloading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products-in-use")
      .then((res) => {
        const mapped = res.data.map((item: any, index: number) => ({
          key: index,
          id: item.productId,
          name: item.product.productName,
          added_by: item.assignedBy.username,
          quantity_recieved: item.volumeReceived,
          quantity_left: item.volumeRemaining,
          date_recieved: new Date(item.assignedDate).toLocaleString("ru-RU"),
        }));
        setData(mapped);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { productInUseDataSource, productInUseloading };
};
