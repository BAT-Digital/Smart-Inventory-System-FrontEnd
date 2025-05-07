import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddCategoryModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      setAlertMessage(`Новая категория ${values.category} была создана`);
      setAlertVisible(true);
      onClose(); // Close modal after submitting
    });
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Новый чек
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
            name="category"
            rules={[{ required: true, message: "Название категории!!" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Категория" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder="Описание" rows={4} />
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
