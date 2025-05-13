import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
import { SalesItemDTO, sendSalesItem } from "../services/salesItemApi";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  transactionId: number;
  productId: number;
  productName: string;
  expiryDate: string | null;
  quantity: number;
};

export const SalesItemQuantityModal = ({
  open,
  onClose,
  onSuccess,
  transactionId,
  productId,
  productName,
  expiryDate,
  quantity,
}: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const salesItemDTO: SalesItemDTO = {
        transactionId: transactionId,
        productId: productId,
        expiryDate: expiryDate,
        quantity: values.quantity,
      };

      await sendSalesItem(salesItemDTO);

      setAlertMessage(`${productName} был добавлен`);
      setAlertVisible(true);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Количество
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
          <div className="flex" style={{ marginBottom: "-10px" }}>
            <div className="mr-1">
              <Form.Item name="quantity">
                <Input placeholder="Количетсво" />
              </Form.Item>
            </div>
            <div className="ml-1">
              <span style={{ color: "white", fontSize: 18 }}>
                из {quantity}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
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
    </>
  );
};
