import { Modal, Button, Form, Radio, Typography } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
import { SalesItemQuantityModal } from "./SalesItemQuantityModal";
import axios from "../utils/axios";
import { BatchArrivalItem } from "../types/BatchArrivals";
import { SalesItemDTO, sendSalesItem } from "../services/salesItemApi";

const { Text } = Typography;

type Props = {
  open: boolean;
  onClose: () => void;
  productName: string;
  batchItems: BatchArrivalItem[];
  onSuccess: () => void;
  transactionId: number;
  productId: number;
  productBarcode: string;
  type: string;
  composite: boolean;
};

export const ProductExpirySelectModal = ({
  open,
  onClose,
  productName,
  batchItems,
  onSuccess,
  transactionId,
  productId,
  productBarcode,
  type,
  composite,
}: Props) => {
  const [form] = Form.useForm();
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);

  const handleExpiryDateChange = async () => {
    try {
      console.log(selectedOption);
      const response = await axios.get<BatchArrivalItem[]>(
        `/api/batch-arrival-items/by-barcode-and-expiry`,
        {
          params: {
            barcode: productBarcode,
            expiryDate: selectedOption,
          },
        }
      );

      // Calculate total quantity remaining
      const totalQuantity = response.data.reduce(
        (sum, item) => sum + Number(item.quantityRemaining),
        0
      );

      // Set the quantity field value
      setQuantity(totalQuantity);
    } catch (error) {
      console.error("Error fetching batch items by expiry:", error);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      console.log("Form values:", values);

      await handleExpiryDateChange();

      if (type === "manual") {
        setIsQuantityModalOpen(true);
        onClose(); // Close modal after submitting
      } else {
        const salesItemDTO: SalesItemDTO = {
          transactionId: transactionId,
          productId: productId,
          expiryDate: selectedOption,
          quantity: 1,
        };

        await sendSalesItem(salesItemDTO);
        onSuccess();
        form.resetFields();
        onClose();
      }
    });
  };

  return (
    <>
      <Modal
        title={
          <div className="text-white text-center mb-4 px-4">
            <Text strong style={{ color: "red", fontSize: 16 }}>
              Attention!
            </Text>{" "}
            There is a perishable product –{" "}
            <Text underline style={{ color: "red", fontSize: 16 }}>
              {productName}
            </Text>
            . Please choose product
          </div>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        className="custom-modal"
        width={400}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="expiryDate">
            <Radio.Group
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
              className="flex flex-col gap-3 px-4"
            >
              {batchItems.map((option, idx) => (
                <Radio
                  key={idx}
                  value={option.expiryDate}
                  className=" font-semibold"
                  style={{ color: "white", fontSize: 16, marginBottom: "10px" }}
                >
                  {option.expiryDate}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <div className="flex justify-between mt-4">
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
              className="w-1/2 mr-2"
              size="large"
            >
              Add
            </Button>
            <Button onClick={onClose} className="w-1/2 ml-2" size="large">
              Cancle
            </Button>
          </div>
        </Form>
      </Modal>

      <AlerModal
        visible={alertVisible}
        message={alertMessage || ""}
        onReady={() => {
          // handle confirmation
          setAlertVisible(false);
          setAlertMessage(null);
          onClose();
        }}
        onCancel={() => {
          // handle cancel
          setAlertVisible(false);
        }}
        showCancel={false}
      ></AlerModal>

      <SalesItemQuantityModal
        open={isQuantityModalOpen}
        onClose={() => setIsQuantityModalOpen(false)}
        onSuccess={onSuccess}
        transactionId={transactionId}
        productId={productId}
        productName={productName}
        expiryDate={selectedOption}
        quantity={quantity}
        composite={composite}
      />
    </>
  );
};
