import { Modal, Input, Button, Form, Select } from "antd";
import { AddProductModal } from "./AddProductModal";
import { useEffect, useState } from "react";
import { AlerModal } from "./AlertModal";
import { useSuppliers } from "../hooks/useSuppliers";
import {
  deleteBatchArrival,
  sendBatchArrival,
} from "../services/batchArrivalApi";
const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const AddDataModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState("something");
  const { suppliers } = useSuppliers();

  const [batchArrivalId, setBatchArrivalId] = useState<number>(0);

  useEffect(() => {
    if (selectedSupplier !== "something") {
      setIsModalOpen(true);
    }
  }, [selectedSupplier]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const supplierObj = suppliers.find((s) => s.name === values.supplier);
      if (!supplierObj) {
        throw new Error("Supplier not found");
      }

      // Send request to backend
      const response = await sendBatchArrival(
        supplierObj.supplierId,
        values.notes || ""
      );

      setBatchArrivalId(response.arrivalId);
      // Trigger next modal (AddProductModal)
      setSelectedSupplier(values.supplier);
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleOnCancel = async () => {
    try {
      await deleteBatchArrival(batchArrivalId);
    } catch (error) {
      console.error("handle On Cancel error:", error);
    }
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      setAlertMessage(
        `New batch from ${values.supplier} has been succesfully added`
      );
      setIsModalOpen(false);
      setSelectedSupplier("something");
      setAlertVisible(true);
      onClose(); // Close modal after submitting
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedSupplier("something");
    onClose();
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Add data
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
            rules={[{ required: true, message: "Choose supplier" }]}
          >
            <Select placeholder="Supplier*">
              {suppliers.map((supplier) => (
                <Option value={supplier.name}>{supplier.name}</Option>
              ))}
            </Select>
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
          onSuccess();
          onClose();
        }}
        onCancel={() => {
          // handle cancel
          setAlertVisible(false);
        }}
        showCancel={false}
      ></AlerModal>

      <AddProductModal
        key={selectedSupplier}
        open={isModalOpen}
        onClose={handleClose}
        onAdd={handleAdd}
        onCancel={handleOnCancel}
        selectedSupplier={selectedSupplier}
        batchArrivalId={batchArrivalId}
      />
    </>
  );
};
