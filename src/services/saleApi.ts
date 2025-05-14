import axios from "../utils/axios";

export type ProductRequestDTO = {
  userId: number;
  barcode: string;
  expirationDate: string | null;
  quantity: number;
};

export const sell = async (
  transactionId: number,
  salesItemDTO: ProductRequestDTO[]
) => {
  try {
    const response = await axios.post(
      `/api/sales/process-sell-transaction/${transactionId}`,
      salesItemDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error processing sale :", error);
    throw error;
  }
};
