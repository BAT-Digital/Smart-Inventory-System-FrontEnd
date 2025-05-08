import { Card } from "antd";
import { Link } from "react-router-dom";
import { ProductExpirySelectModal } from "../ProductExpirySelectModal";
import { useState } from "react";
import { Product } from "../../hooks/useProducts";

interface RightSideProductCardGridProps {
  products: Product[];
}

export const RightSideProductCardGrid: React.FC<
  RightSideProductCardGridProps
> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState(" ");

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-4">
        {products.map((product, index) => (
          <Link
            to="/sales_item_product"
            key={index}
            onClick={() => {
              setProductName(product.productName);
              setIsModalOpen(true);
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
          </Link>
        ))}
      </div>

      <ProductExpirySelectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
      />
    </>
  );
};
