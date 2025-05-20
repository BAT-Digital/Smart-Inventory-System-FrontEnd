import { Modal, Button, Form, Input, DatePicker } from "antd";
import plus from "../assets/icons/plustWhite.png";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { AddFullProductDataModal } from "./AddProductDataModal";
import { useProductsBySupplier } from "../hooks/useCategories";
import { submitBatchArrivalItems } from "../services/batchArrivalItemApi";
import { Product } from "../hooks/useProducts";
import axios from "../utils/axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { AlerModal } from "./AlertModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  selectedSupplier: string;
  batchArrivalId: number;
  onCancel: () => void;
};

export const AddProductModal = ({
  open,
  onClose,
  onAdd,
  selectedSupplier,
  batchArrivalId,
  onCancel,
}: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const { productsBySupplier } = useProductsBySupplier({ selectedSupplier });
  const [alertVisible, setAlertVisible] = useState(false);
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://192.168.10.9:8080/ws"),
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

  const handleScan = async () => {
    try {
      const response = await axios.get(`/api/products/barcode/${barcode}`);
      const product: Product = response.data;
      const foundProduct = productsBySupplier.find(
        (item) => item.barcode === product.barcode
      );
      if (productsBySupplier.some((item) => item.barcode === product.barcode)) {
        handleProductClick(foundProduct!);
      } else {
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    handleScan();
  }, [barcode]);

  const handleProductClick = (product: Product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter((p) => p !== product); // Unselect
      } else {
        return [...prevSelected, product]; // Select
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedProducts) return;
    console.log("Selected products:", selectedProducts);
    setIsDataModalOpen(true);
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Add products
          </span>
        }
        open={open}
        onCancel={() => {
          onCancel();
          onClose();
        }}
        footer={null}
        centered
        className="custom-modal"
        width={500}
      >
        <Form layout="vertical">
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
            style={{ backgroundColor: "#9E2A2B", color: "#1E1E1E" }}
            size="large"
            className="w-full mb-3"
          >
            <img src={plus} alt="" className="h-4 w-auto" />
          </Button>
          <div
            className="max-h-60 overflow-y-auto grid p-2 gap-2 bg-[#F2F2F0]"
            style={{ borderRadius: 4 }}
          >
            {productsBySupplier.map((product) => (
              <div
                key={product.productId}
                onClick={() => handleProductClick(product)}
                className={classNames(
                  "p-3 rounded cursor-pointer border transition-all",
                  {
                    "bg-[#FFF3B0] border-black":
                      selectedProducts.includes(product),
                    "bg-white hover:bg-gray-100 border-gray-300":
                      !selectedProducts.includes(product),
                  }
                )}
              >
                {product.productName}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!selectedProducts}
              style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
              className="w-1/2 mr-2"
              size="large"
            >
              Add
            </Button>
            <Button
              onClick={() => {
                onCancel();
                onClose();
              }}
              className="w-1/2 ml-2"
              size="large"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>

      <AddFullProductDataModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {}}
      />
      <AddProductDataBatchModal
        open={isDataModalOpen}
        onClose={() => {
          setIsDataModalOpen(false);
        }}
        onAdd={onAdd}
        selectedProducts={selectedProducts}
        batchArrivalId={batchArrivalId}
      ></AddProductDataBatchModal>
      <AlerModal
        visible={alertVisible}
        message={"No product with that barcode from the supplier"}
        onReady={() => setAlertVisible(false)}
        onCancel={() => {
          setAlertVisible(false);
        }}
        showCancel={false}
      ></AlerModal>
    </>
  );
};

type DataModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  selectedProducts: Product[];
  batchArrivalId: number;
};

export const AddProductDataBatchModal = ({
  open,
  onClose,
  onAdd,
  selectedProducts,
  batchArrivalId,
}: DataModalProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await submitBatchArrivalItems(values, selectedProducts, batchArrivalId);
      onAdd();
    } catch (error) {
      console.error("Error submitting batch arrival items:", error);
    }
  };

  return (
    <Modal
      title={
        <span className="text-white font-semibold flex justify-center mb-4">
          Products data
        </span>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="custom-modal"
      width={400}
    >
      <Form form={form} layout="vertical">
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {selectedProducts.map((product, index) => (
            <>
              <Form.Item
                key={product.productId}
                style={{ marginBottom: "8px", color: "white" }}
                className="flex justify-center"
              >
                {product.productName}
              </Form.Item>
              <div
                className="flex justify-between"
                style={{ marginBottom: "-16px" }}
              >
                <div className="mr-2">
                  <Form.Item
                    name={["items", index, "quantityReceived"]}
                    rules={[{ required: true, message: "Enter quantity" }]}
                  >
                    <Input placeholder="Quantity" />
                  </Form.Item>
                </div>
                <div className="ml-2">
                  <Form.Item
                    name={["items", index, "unitCost"]}
                    rules={[{ required: true, message: "Enter unit cost" }]}
                  >
                    <Input placeholder="Unit cost" />
                  </Form.Item>
                </div>
              </div>
              {product.isPerishable && (
                <Form.Item
                  name={["items", index, "expiryDate"]}
                  rules={[{ required: true, message: "Choose date" }]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Expiry date"
                    className="w-full"
                  />
                </Form.Item>
              )}
            </>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
            className="w-1/2 mr-2"
            size="large"
          >
            Add
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              onClose();
            }}
            className="w-1/2 ml-2"
            size="large"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
