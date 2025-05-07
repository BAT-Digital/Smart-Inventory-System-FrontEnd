import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddSupplierModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      setAlertMessage(`Новый поставщик ${values.supplier} был добавлен`);
      setAlertVisible(true);
      onClose(); // Close modal after submitting
    });
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Данные о поставщике
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
          <Form.Item
            name="supplier"
            rules={[{ required: true, message: "Название категории!!" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Поставщик" />
          </Form.Item>
          <Form.Item name="address" style={{ marginBottom: "8px" }}>
            <Input placeholder="Адрес" />
          </Form.Item>
          <Form.Item name="contact_info" style={{ marginBottom: "8px" }}>
            <Input placeholder="Контактные данные" />
          </Form.Item>
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
