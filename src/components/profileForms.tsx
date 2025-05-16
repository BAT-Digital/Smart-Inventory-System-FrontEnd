import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";

type FieldType = {
  currentPassword: string;
  newPassword: string;
};

export const PasswordChange: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      // Here you would typically call an API to change the password
      console.log("Password change submitted:", values);
      message.success("Password changed successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        <h2 className="text-xl font-semibold mb-6">Change password</h2>

        <Form
          form={form}
          name="passwordChangeForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Current password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password size="large" placeholder="Enter current password" />
          </Form.Item>

          <Form.Item<FieldType>
            label="New password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password size="large" placeholder="Enter new password" />
          </Form.Item>

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full"
              style={{ backgroundColor: "#335C67", color: "#FFFFFF" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
