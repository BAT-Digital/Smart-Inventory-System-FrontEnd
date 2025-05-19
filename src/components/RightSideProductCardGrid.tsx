import { Card } from "antd";
import { useParams } from "react-router-dom";
import { ProductExpirySelectModal } from "./ProductExpirySelectModal";
import { useState } from "react";
import { Product } from "../hooks/useProducts";
import axios from "../utils/axios";
import { SalesItemQuantityModal } from "./SalesItemQuantityModal";
import { BatchArrivalItem } from "../types/BatchArrivals";

type RightSideProductCardGridProps = {
  products: Product[];
  onSuccess: () => {};
};

export const RightSideProductCardGrid: React.FC<
  RightSideProductCardGridProps
> = ({ products, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [productName, setProductName] = useState(" ");
  const [selectedBarcode, setSelectedBarcode] = useState<string>("");
  const [batchItems, setBatchItems] = useState<BatchArrivalItem[]>([]);
  const { transactionId } = useParams<{ transactionId: string }>();
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleProductChange = async (barcode: string) => {
    setSelectedBarcode(barcode);

    if (!barcode) {
      setBatchItems([]);
      return;
    }

    try {
      const response = await axios.get<BatchArrivalItem[]>(
        `/api/batch-arrival-items/by-barcode/${barcode}`
      );
      setBatchItems(response.data);
    } catch (error) {
      console.error("Error fetching batch items:", error);
      // Handle error as needed
    } finally {
    }
  };

  const handleQuantity = async (barcode: string) => {
    try {
      console.log(barcode);
      const response = await axios.get<BatchArrivalItem[]>(
        `/api/batch-arrival-items/by-barcode/${barcode}`
      );

      // Calculate total quantity remaining
      const totalQuantity = response.data.reduce(
        (sum, item) => sum + Number(item.quantityRemaining),
        0
      );

      // Set the quantity field value
      setQuantity(totalQuantity);
    } catch (error) {
      console.error("Error fetching batch items:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-4">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={async () => {
              setProductName(product.productName);
              setProductId(product.productId);
              if (product.isPerishable) {
                handleProductChange(product.barcode);
                setIsModalOpen(true);
              } else {
                await handleQuantity(product.barcode);
                setIsQuantityModalOpen(true);
              }
            }}
          >
            <Card
              className="flex items-center gap-4"
              style={{
                backgroundColor: "#335C67",
                color: "white",
                borderRadius: "0.8rem",
                height: "100px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              hoverable
            >
              {/* Left side: Image box */}
              <div className="flex">
                {/* Right side: Text */}
                <div className="flex flex-col justify-center pl-5">
                  <div className="font-semibold text-white text-lg">
                    {product.productName}
                  </div>
                  <div className="text-white text-sm italic">
                    {product.volume} {product.unitOfMeasure}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <ProductExpirySelectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
        batchItems={batchItems}
        onSuccess={onSuccess}
        transactionId={parseInt(transactionId!)}
        productId={productId}
        productBarcode={selectedBarcode}
        type="manual"
      />

      <SalesItemQuantityModal
        open={isQuantityModalOpen}
        onClose={() => setIsQuantityModalOpen(false)}
        onSuccess={onSuccess}
        transactionId={parseInt(transactionId!)}
        productId={productId}
        productName={productName}
        expiryDate={null}
        quantity={quantity}
      />
    </>
  );
};
