// src/api/batchArrivalApi.ts
import axios from "../utils/axios";

export type ProductDTO = {
  categoryId: number;
  productName: string;
  barcode: string;
  isPerishable: boolean;
  isComposite: boolean;
  unitOfMeasure: string;
  supplierId: number;
  description: string;
  threshold: number;
  price: number;
  volume: number;
};

export const sendProduct = async (ProductDTO: ProductDTO) => {
  try {
    const response = await axios.post("/api/products", ProductDTO);
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
