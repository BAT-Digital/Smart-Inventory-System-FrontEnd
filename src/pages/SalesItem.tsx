import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { LeftSide } from "../components/LeftSide";
import { RightSideCategories } from "../components/RightSideCategories";
import { useNavigate, useParams } from "react-router-dom";
import { useSalesItems } from "../hooks/useSalesItems";
import { useState } from "react";
import { RightSideProducts } from "../components/RightSideProducts";
import { ProductRequestDTO, sell } from "../services/saleApi";
import { AlerModal } from "../components/AlertModal";
import { message } from "antd";
import Cookies from "js-cookie";
import { SalesItemDeleteModal } from "../components/salesItemDeleteModal";
import { deleteSalesTransaction } from "../services/salesTransactionApi";

export const SalesItem = () => {
  const navigate = useNavigate();
  const { transactionId: transactionIdStr } = useParams<{
    transactionId: string;
  }>();
  const transactionId = parseInt(transactionIdStr!);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigation = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { salesItems, refetch: reFetchSalesItems } = useSalesItems({
    transactionId,
  });

  const handleCancel = async () => {
    try {
      await deleteSalesTransaction(transactionId);
      navigation("/sales");
      message.success("Deleted check");
    } catch (error) {
      console.error("Delete Error:", error);
      message.error(`Delete Error: ${error}`);
    }
  };

  const handleSell = async () => {
    const userIdCookie = Cookies.get("user_id");

    if (!userIdCookie) {
      message.error("Session expired. Please log in again.");
      navigation("/");
      return;
    }

    try {
      const userId = parseInt(userIdCookie);
      const productRequestDTO: ProductRequestDTO[] = salesItems.map(
        (salesItem) => ({
          userId: userId,
          barcode: salesItem.product.barcode,
          expirationDate: salesItem.expiryDate,
          quantity: salesItem.quantity,
        })
      );

      const response = await sell(transactionId, productRequestDTO);

      setAlertMessage(response);
      setAlertVisible(true);
    } catch (error) {
      console.error("Sell Error:", error);
      message.error(`Sell Error: ${error}`);
    }
  };

  const handleSearch = (value: string) => {
    console.log("Searching:", value);
  };

  const handleCategorySelected = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex flex-col"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Navbar stays fixed-height */}
        <Navbar />
        {/* This takes the rest of the screen */}
        <div className="flex-1 flex items-stretch justify-center">
          <div className="w-full max-w-7xl flex px-4 mt-12">
            {/* Left side stretches full height */}
            <div className="w-[25%] mr-4 h-full">
              <LeftSide transactionId={transactionId} salesItems={salesItems} />
            </div>
            {/* Right side stretches full height */}
            <div className="w-[75%] ml-1 h-full">
              {selectedCategory ? (
                <RightSideProducts
                  onSearch={handleSearch}
                  onSuccess={reFetchSalesItems}
                  category={selectedCategory}
                  onBack={handleBackToCategories}
                  handleSell={handleSell}
                  onDelete={() => {
                    setIsModalOpen(true);
                  }}
                  onCancel={handleCancel}
                />
              ) : (
                <RightSideCategories
                  onSearch={handleSearch}
                  onCategorySelect={handleCategorySelected}
                  handleSell={handleSell}
                  onDelete={() => {
                    setIsModalOpen(true);
                  }}
                  onCancel={handleCancel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <AlerModal
        visible={alertVisible}
        message={alertMessage || ""}
        onReady={() => {
          // handle confirmation
          setAlertVisible(false);
          setAlertMessage(null);
          navigate("/sales");
        }}
        onCancel={() => {
          // handle cancel
          setAlertVisible(false);
        }}
        showCancel={false}
      ></AlerModal>

      <SalesItemDeleteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        salesItems={salesItems}
        onSuccess={reFetchSalesItems}
      />
    </>
  );
};
