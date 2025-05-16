import { Product } from "../hooks/useProducts";
import { Supplier } from "../hooks/useSuppliers";
import { User } from "./User";

export type BatchArrival = {
  arrivalId: number;
  supplier: Supplier;
  arrivalDate: Date;
  notes: string;
  addedBy: User;
};

export type BatchArrivalItem = {
  batchItemId: number;
  batchArrival: BatchArrival;
  product: Product;
  quantityReceived: number;
  quantityRemaining: number;
  expiryDate: string;
  unitCost: number;
};
