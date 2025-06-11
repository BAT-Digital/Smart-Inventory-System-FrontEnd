import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { LeftSide } from "../components/LeftSide";
import { RightSideCategories } from "../components/RightSideCategories";
import { useNavigate, useParams } from "react-router-dom";
import { useSalesItems } from "../hooks/useSalesItems";
import { useEffect, useState } from "react";
import { RightSideProducts } from "../components/RightSideProducts";
import { ProductRequestDTO, sell } from "../services/saleApi";
import { AlerModal } from "../components/AlertModal";
import { message } from "antd";
import Cookies from "js-cookie";
import { SalesItemDeleteModal } from "../components/salesItemDeleteModal";
import { cancelCheck } from "../services/salesTransactionApi";
import {
  useCategoriesSearch,
  useProductsByCategory,
} from "../hooks/useCategories";
import { SalesItemDTO, sendSalesItem } from "../services/salesItemApi";
import axios from "../utils/axios";
import { Product } from "../hooks/useProducts";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ProductExpirySelectModal } from "../components/ProductExpirySelectModal";
import { BatchArrivalItem } from "../types/BatchArrivals";

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
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [barcode, setBarcode] = useState("");

  const [productName, setProductName] = useState(" ");
  const [batchItems, setBatchItems] = useState<BatchArrivalItem[]>([]);
  const [productId, setProductId] = useState(0);
  const [composite, setComposite] = useState(false);

  const { salesItems, refetch: reFetchSalesItems } = useSalesItems({
    transactionId,
  });

  const { categories } = useCategoriesSearch(searchTerm);
  const categoryNames = categories.map((c) => c.name);

  const { products } = useProductsByCategory({ selectedCategory, searchTerm });

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://192.168.171.16:8080/ws"),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      client.subscribe("/topic/barcodes", (message) => {
        setBarcode(message.body);
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const handleAddProductByBarcode = async () => {
    try {
      const response = await axios.get(`/api/products/barcode/${barcode}`);
      const product: Product = response.data;
      setProductName(product.productName);
      setProductId(product.productId);
      setComposite(product.isComposite);

      if (!product.isPerishable) {
        const salesItemDTO: SalesItemDTO = {
          transactionId: transactionId,
          productId: product.productId,
          expiryDate: null,
          quantity: 1,
        };

        await sendSalesItem(salesItemDTO);
        setBarcode("");
        reFetchSalesItems();
      } else {
        try {
          const response = await axios.get<BatchArrivalItem[]>(
            `/api/batch-arrival-items/by-barcode/${barcode}`
          );
          setBatchItems(response.data);
        } catch (error) {
          console.error("Error fetching batch items:", error);
        }
        setIsExpiryModalOpen(true);
        setBarcode("");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    handleAddProductByBarcode();
  }, [barcode]);

  const handleCancel = async () => {
    try {
      await cancelCheck(transactionId);
      navigation("/sales");
      message.success("Check deleted");
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
    setSearchTerm(value);
  };

  const handleCategorySelected = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm("");
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
                  products={products}
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
                  categoryNames={categoryNames}
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

      <ProductExpirySelectModal
        open={isExpiryModalOpen}
        onClose={() => setIsExpiryModalOpen(false)}
        productName={productName}
        batchItems={batchItems}
        onSuccess={reFetchSalesItems}
        transactionId={transactionId}
        productId={productId}
        productBarcode={barcode}
        type="automatic"
        composite={composite}
      />
    </>
  );
};
