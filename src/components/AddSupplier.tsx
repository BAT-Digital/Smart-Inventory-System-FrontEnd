import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
import { sendSupplier } from "../services/supplierApi";
import { Supplier } from "../hooks/useSuppliers";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (supplier: Supplier) => void;
};

export const AddSupplierModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const newSupplier: Supplier = await sendSupplier(
        values.supplier,
        values.address,
        values.contact_info
      );

      setAlertMessage(`New supplier: ${values.supplier} has been added`);
      setAlertVisible(true);
      onSuccess(newSupplier);
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
            Supplier data
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
            rules={[{ required: true, message: "Supplier name!!" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Supplier" />
          </Form.Item>
          <Form.Item name="address" style={{ marginBottom: "8px" }}>
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item name="contact_info" style={{ marginBottom: "8px" }}>
            <Input placeholder="Contact info" />
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
            <Button
              onClick={() => {
                onClose();
                form.resetFields();
              }}
              className="w-1/2 ml-2"
              size="large"
            >
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
          form.resetFields();
          onClose();
        }}
        onCancel={() => {
          // handle cancel
          form.resetFields();
          setAlertVisible(false);
        }}
        showCancel={false}
      ></AlerModal>
    </>
  );
};
