import axios from "../utils/axios";

export type ProductRequestDTO = {
  userId: number;
  barcode: string;
  expirationDate: string;
  quantity: number;
};

export const moveToProductInUse = async (products: ProductRequestDTO[]) => {
  try {
    const response = await axios.post(
      "/api/products-in-use/move-to-product-in-use",
      products
    );
    return response.data;
  } catch (error) {
    console.error("Error moving products to in-use:", error);
    throw error;
  }
};
