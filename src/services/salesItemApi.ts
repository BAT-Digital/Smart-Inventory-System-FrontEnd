import axios from "../utils/axios";

export type SalesItemDTO = {
  transactionId: number;
  productId: number;
  expiryDate: string | null;
  quantity: number;
};

export const sendSalesItem = async (salesItemDTO: SalesItemDTO) => {
  try {
    const response = await axios.post(
      "/api/sales-items/create-by-dto",
      salesItemDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error sending Sales Item :", error);
    throw error;
  }
};

export const deleteSalesItems = async (ids: number[]) => {
  try {
    const response = await axios.delete("/api/sales-items/delete-items", {
      data: ids,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting sales items:", error);
    throw error;
  }
};
