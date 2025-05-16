import { Modal, Input, Button, Form, Select } from "antd";
import { useState } from "react";
import { AlerModal } from "./AlertModal";
import { sendUser } from "../services/userApi";

const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const AddUserModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await sendUser(values.username, values.password, values.role);

      setAlertMessage(`New user: ${values.username} has been added`);
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
            Add New User
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
            name="username"
            rules={[{ required: true, message: "Supplier name!!" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" style={{ marginBottom: "8px" }}>
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item name="role" style={{ marginBottom: "8px" }}>
            <Select placeholder="Role">
              <Option value="ROLE_EMPLOYEE">Empoyee</Option>
              <Option value="ROLE_ADMIN">Admin</Option>
            </Select>
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
          onClose();
          form.resetFields();
        }}
        onCancel={() => {
          // handle cancel
          setAlertVisible(false);
          form.resetFields();
        }}
        showCancel={false}
      ></AlerModal>
    </>
  );
};
