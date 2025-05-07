import React from "react";
import { Modal, Button } from "antd";

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onReady: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export const AlerModal: React.FC<CustomAlertProps> = ({
  visible,
  message,
  onReady,
  onCancel,
  showCancel = false,
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      closable={false}
      centered
      title={
        <span className="text-white font-semibold flex justify-center mb-4">
          {message}
        </span>
      }
      footer={null}
      className="custom-modal"
      width={400}
    >
      {showCancel ? (
        <div className="flex justify-between mt-4">
          <Button
            onClick={onReady}
            type="primary"
            style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
            className="w-1/2 mr-2"
            size="large"
          >
            Готово
          </Button>
          <Button
            type="primary"
            onClick={onCancel}
            className="w-1/2 ml-2"
            size="large"
          >
            Отмена
          </Button>
        </div>
      ) : (
        <Button
          onClick={onReady}
          type="primary"
          style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
          className="w-full"
          size="large"
        >
          Готово
        </Button>
      )}
    </Modal>
  );
};
