import { Modal, Button, Form, Radio, Typography } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
import { BatchArrivalItem } from "./AddProductDataModal";
import { SalesItemQuantityModal } from "./SalesItemQuantityModal";

const { Text } = Typography;

type Props = {
  open: boolean;
  onClose: () => void;
  productName: string;
  batchItems: BatchArrivalItem[];
  onSuccess: () => void;
  transactionId: number;
  productId: number;
};

export const ProductExpirySelectModal = ({
  open,
  onClose,
  productName,
  batchItems,
  onSuccess,
  transactionId,
  productId,
}: Props) => {
  const [form] = Form.useForm();
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);

      setExpiryDate(values.expiryDate);

      setIsQuantityModalOpen(true);
      onClose(); // Close modal after submitting
    });
  };

  return (
    <>
      <Modal
        title={
          <div className="text-white text-center mb-4 px-4">
            <Text strong style={{ color: "red", fontSize: 16 }}>
              Внимание!
            </Text>{" "}
            В составе позиции находится скоропортящийся продукт –{" "}
            <Text underline style={{ color: "red", fontSize: 16 }}>
              {productName}
            </Text>
            . Пожалуйста выберите используемый продукт
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
              Добавить
            </Button>
            <Button onClick={onClose} className="w-1/2 ml-2" size="large">
              Отмена
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
        expiryDate={expiryDate}
      />
    </>
  );
};
