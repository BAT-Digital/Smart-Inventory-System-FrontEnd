import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
import { sendTransaction } from "../services/salesTransactionApi";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const AddCheckModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await sendTransaction(values.name);

      setAlertMessage(`New receipt in the name of ${values.name} was created`);
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
            New check
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
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="notes">
            <Input.TextArea placeholder="Notes..." rows={4} />
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
