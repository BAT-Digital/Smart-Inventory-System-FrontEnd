import { Modal, Input, Button, Form, Select, message } from "antd";
import { useState } from "react";
const { Option } = Select;
import { useProducts } from "../hooks/useProducts";
import axios from "../utils/axios";
import { BatchArrivalItem } from "../types/BatchArrivals";
import { WriteOffDTO } from "../types/WriteOff";
import { sendWriteOff } from "../services/writeOffApi";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const AddWriteOffModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const { products } = useProducts();
  const [batchItems, setBatchItems] = useState<BatchArrivalItem[]>([]);
  const [loadingBatchItems, setLoadingBatchItems] = useState(false);

  const handleProductChange = async (barcode: string) => {
    form.setFieldsValue({ expiry_date: undefined, quantity: undefined });

    if (!barcode) {
      setBatchItems([]);
      return;
    }

    try {
      setLoadingBatchItems(true);
      const response = await axios.get<BatchArrivalItem[]>(
        `/api/batch-arrival-items/by-barcode/${barcode}`
      );
      setBatchItems(response.data);
    } catch (error) {
      console.error("Error fetching batch items:", error);
      // Handle error as needed
    } finally {
      setLoadingBatchItems(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const writeOffDTO: WriteOffDTO = {
        batchItemId: values.batch_item,
        quantity: values.quantity,
        reason: values.reason,
      };

      const response = await sendWriteOff(writeOffDTO);
      message.info(response);

      form.resetFields(); // Reset all form fields
      setBatchItems([]);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed create write off");
    }
  };

  const handleClose = () => {
    form.resetFields();
    setBatchItems([]);
    onClose();
  };

  return (
    <Modal
      title={
        <span className="text-white font-semibold flex justify-center mb-4">
          Write Off data
        </span>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      className="custom-modal"
      width={400}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="product"
          style={{ marginBottom: "8px" }}
          rules={[{ required: true, message: "Product name*" }]}
        >
          <Select
            showSearch
            placeholder="Product*"
            onChange={handleProductChange}
            optionFilterProp="children"
            filterOption={(
              input: string,
              option: { children: string } | undefined
            ) =>
              (option?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {products.map((product) => (
              <Option value={product.barcode}>{product.productName}</Option>
            ))}
          </Select>
        </Form.Item>

        <div style={{ marginBottom: "-16px" }}>
          <Form.Item name="batch_item">
            <Select
              placeholder="Choose Arrival"
              loading={loadingBatchItems}
              disabled={batchItems.length === 0}
            >
              {batchItems.map((item) => (
                <Option key={item.batchItemId} value={item.batchItemId}>
                  {item.batchArrival.supplier.name} ({" "}
                  {new Date(item.batchArrival.arrivalDate).toLocaleString(
                    "ru-RU"
                  )}
                  )
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div style={{ marginBottom: "-16px" }}>
          <Form.Item name="quantity">
            <Input placeholder="Quantity" />
          </Form.Item>
        </div>
        <div style={{ marginBottom: "-10px" }}>
          <Form.Item name="reason">
            <Input.TextArea placeholder="Reason" />
          </Form.Item>
        </div>

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
          <Button onClick={handleClose} className="w-1/2 ml-2" size="large">
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
