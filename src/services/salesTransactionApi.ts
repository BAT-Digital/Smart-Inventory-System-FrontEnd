// src/api/batchArrivalApi.ts
import axios from "../utils/axios";

export const sendTransaction = async (credentials: string) => {
  const payload = {
    credentials,
    status: '"PROCESSING"',
    totalAmount: 0,
  };

  try {
    const response = await axios.post(
      "/api/sales-transactions/create-by-dto",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};

export const cancelCheck = async (transactionId: number) => {
  try {
    const response = await axios.post(
      `/api/sales/cancel-check/${transactionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting sales transaction:", error);
    throw error;
  }
};
