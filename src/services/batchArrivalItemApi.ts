import dayjs from "dayjs";
import axios from "../utils/axios";

type Product = {
  productId: number;
  productName: string;
};

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
    const item = values.items[index];
    return {
      batchArrivalId,
      productId: product.productId,
      quantityReceived: parseFloat(item.quantityReceived),
      unitCost: parseFloat(item.unitCost),
      expiryDate: item.expiryDate.format("YYYY-MM-DD"),
    };
  });

  try {
    const response = await axios.post("/api/batch-arrival-items/", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};
