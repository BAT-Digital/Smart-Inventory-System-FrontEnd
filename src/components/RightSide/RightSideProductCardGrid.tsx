import { Card } from "antd";
import { Link, useParams } from "react-router-dom";
import { ProductExpirySelectModal } from "../ProductExpirySelectModal";
import { useState } from "react";
import { Product } from "../../hooks/useProducts";
import { BatchArrivalItem } from "../AddProductDataModal";
import axios from "../../utils/axios";
import { SalesItemQuantityModal } from "../SalesItemQuantityModal";

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
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [batchItems, setBatchItems] = useState<BatchArrivalItem[]>([]);
  const [loadingBatchItems, setLoadingBatchItems] = useState(false);
  const { transactionId } = useParams<{ transactionId: string }>();
  const [productId, setProductId] = useState(0);

  const handleProductChange = async (barcode: string) => {
    setSelectedBarcode(barcode);

    if (!barcode) {
      setBatchItems([]);
      return;
    }

    try {
      setLoadingBatchItems(true);
      const response = await axios.get<BatchArrivalItem[]>(
        `/api/batch-arrival-items/by-barcode/${barcode}`
      );
      setBatchItems(response.data);
    } catch (error) {
      console.error("Error fetching batch items:", error);
      // Handle error as needed
    } finally {
      setLoadingBatchItems(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-4">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => {
              setProductName(product.productName);
              setProductId(product.productId);
              if (product.isPerishable) {
                handleProductChange(product.barcode);
                setIsModalOpen(true);
              } else {
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
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#2F2F2F",
                    borderRadius: "0.8rem",
                    flexShrink: 0,
                  }}
                />
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
      />

      <SalesItemQuantityModal
        open={isQuantityModalOpen}
        onClose={() => setIsQuantityModalOpen(false)}
        onSuccess={onSuccess}
        transactionId={parseInt(transactionId!)}
        productId={productId}
        productName={productName}
      />
    </>
  );
};
