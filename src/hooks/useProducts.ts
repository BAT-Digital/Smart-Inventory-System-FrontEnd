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

export const useProductsSearch = (searchTerm?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (search?: string) => {
    setLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      await axios
        .get<Product[]>("/api/products/search", params)
        .then((res) => setProducts(res.data));
    } catch (error) {
      console.error("Error fetching batch arrivals:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm]);

  return { products, loading, error, refetch: fetchProducts };
};

type Props = {
  type: String;
  name: String;
  searchTerm?: string;
};

export const useCategoryProducts = ({ type, name, searchTerm }: Props) => {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categoryloading, setCategoryLoading] = useState<boolean>(true);
  const [categoryerror, setCategoryError] = useState<string | null>(null);

  const fetchCategoryProducts = async (search?: string) => {
    setCategoryLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      const endpoint =
        type === "category"
          ? `/api/products/by-category/${name}`
          : `/api/products/by-supplier/${name}`;

      axios
        .get<Product[]>(endpoint, params)
        .then((res) => setCategoryProducts(res.data));
    } catch (error) {
      console.error(`Error fetching products by ${type}:`, error);
      setCategoryError("Failed to load products");
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts(searchTerm);
  }, [searchTerm]);

  return {
    categoryProducts,
    categoryloading,
    categoryerror,
    refetch: fetchCategoryProducts,
  };
};

export const useComplexProducts = (searchTerm?: string) => {
  const [complexProducts, setComplexProducts] = useState<Product[]>([]);
  const [complexLoading, setComplexLoading] = useState<boolean>(true);
  const [complexError, setComplexError] = useState<string | null>(null);

  const fetchComplexProducts = async (search?: string) => {
    setComplexLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      axios
        .get<Product[]>("/api/products/composite/true", params)
        .then((res) => setComplexProducts(res.data));
    } catch (error) {
      console.error("Error fetching batch arrivals:", error);
      setComplexError("Failed to load products");
    } finally {
      setComplexLoading(false);
    }
  };

  useEffect(() => {
    fetchComplexProducts(searchTerm);
  }, [searchTerm]);

  return {
    complexProducts,
    complexLoading,
    complexError,
    refetch: fetchComplexProducts,
  };
};

export const useSoloProducts = (searchTerm?: string) => {
  const [soloProducts, setSoloProducts] = useState<Product[]>([]);
  const [soloLoading, setSoloLoading] = useState<boolean>(true);
  const [soloError, setSoloError] = useState<string | null>(null);

  const fetchSoloProducts = async (search?: string) => {
    setSoloLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      axios
        .get<Product[]>("/api/products/composite/false", params)
        .then((res) => setSoloProducts(res.data));
    } catch (error) {
      console.error("Error fetching batch arrivals:", error);
      setSoloError("Failed to load products");
    } finally {
      setSoloLoading(false);
    }
  };

  useEffect(() => {
    fetchSoloProducts(searchTerm);
  }, [searchTerm]);

  return { soloProducts, soloLoading, soloError, refetch: fetchSoloProducts };
};

export const useProductInUse = (searchTerm?: string) => {
  const [productInUseDataSource, setData] = useState([]);
  const [productInUseloading, setLoading] = useState(false);

  const fetchProductsInUse = async (search?: string) => {
    setLoading(true);
    try {
      const params = search ? { params: { search } } : {};
      await axios.get("/api/products-in-use/search", params).then((res) => {
        const mapped = res.data.map((item: any, index: number) => ({
          key: index,
          id: item.productId,
          name: item.product.productName,
          added_by: item.assignedBy.username,
          quantity_recieved:
            item.volumeReceived + " " + item.product.unitOfMeasure,
          quantity_left:
            item.volumeRemaining + " " + item.product.unitOfMeasure,
          date_recieved: new Date(item.assignedDate).toLocaleString("ru-RU"),
        }));
        setData(mapped);
      });
    } catch (error) {
      console.error("Error fetching productsInUse:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsInUse(searchTerm);
  }, [searchTerm]);

  return {
    productInUseDataSource,
    productInUseloading,
    refetch: fetchProductsInUse,
  };
};
