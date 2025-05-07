import { Modal, Input, Button, Form, Select } from "antd";
import { AddProductModal } from "./AddProductModal";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddDataModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      setIsModalOpen(true);
      onClose(); // Close modal after submitting
    });
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      setAlertMessage(
        `Новая партия от ${values.supplier} была успешно добавлена`
      );
      setIsModalOpen(false);
      setAlertVisible(true);
      onClose(); // Close modal after submitting
    });
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Добавьте данные
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
            rules={[{ required: true, message: "Выберите поставщика" }]}
          >
            <Select placeholder="Поставщик*">
              <Option value="Лучшие кофейные зерна">
                Лучшие кофейные зерна
              </Option>
              <Option value="Arabica Premium">Arabica Premium</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes">
            <Input.TextArea placeholder="Напишите заметки..." rows={4} />
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

      <AddProductModal open={isModalOpen} onClose={handleAdd} />
    </>
  );
};
