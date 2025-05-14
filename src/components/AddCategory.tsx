import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
import { sendCategory } from "../services/categoryApi";
import { Category } from "../hooks/useCategories";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (category: Category) => void;
};

export const AddCategoryModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const newCategory: Category = await sendCategory(
        values.category,
        values.description
      );

      setAlertMessage(`New category: ${values.category} has been created`);
      setAlertVisible(true);
      onSuccess(newCategory);
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
            New Category
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
            rules={[{ required: true, message: "Category name!!" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder="Description" rows={4} />
          </Form.Item>
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
            <Button onClick={onClose} className="w-1/2 ml-2" size="large">
              Cancel
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
