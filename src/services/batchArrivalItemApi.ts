import dayjs from "dayjs";
import axios from "../utils/axios";
import { Product } from "../hooks/useProducts";

type FormValues = {
  items: {
    quantityReceived: string;
    unitCost: string;
    expiryDate: dayjs.Dayjs;
  }[];
};

export const submitBatchArrivalItems = async (
  values: FormValues,
  selectedProducts: Product[],
  batchArrivalId: number
): Promise<void> => {
  const payload = selectedProducts.map((product, index) => {
    if (product.isPerishable) {
      const item = values.items[index];
      return {
        batchArrivalId,
        productId: product.productId,
        quantityReceived: parseFloat(item.quantityReceived),
        unitCost: parseFloat(item.unitCost),
        expiryDate: item.expiryDate.format("YYYY-MM-DD"),
      };
    } else {
      const item = values.items[index];
      return {
        batchArrivalId,
        productId: product.productId,
        quantityReceived: parseFloat(item.quantityReceived),
        unitCost: parseFloat(item.unitCost),
        expiryDate: null,
      };
    }
  });

  try {
    const response = await axios.post("/api/batch-arrival-items/", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};
