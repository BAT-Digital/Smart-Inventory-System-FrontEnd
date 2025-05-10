import axios from "../utils/axios";

type FormValues = {
  items: {
    ingredientId: string;
    quantityReceived: string;
  }[];
};

type CompositeItem = {
  name: string;
  volume: string;
};

export const submitProductRecipes = async (
  values: FormValues,
  compositeItems: CompositeItem[],
  finalProductId: number
): Promise<void> => {
  const payload = compositeItems.map((_product, index) => {
    const item = values.items[index];
    return {
      finalProductId,
      ingredientId: parseInt(item.ingredientId),
      quantityRequired: parseFloat(item.quantityReceived),
    };
  });

  console.log(payload);

  try {
    const response = await axios.post(
      "/api/product-recipes/process-recipes",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};
