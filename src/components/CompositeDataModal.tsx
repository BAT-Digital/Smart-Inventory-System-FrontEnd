import { Button, Form, Input, Modal, Select } from "antd";
import plusWhite from "../assets/icons/plustWhite.png";
import trash from "../assets/icons/trash.png";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { submitProductRecipes } from "../services/productRecipeApi";
const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  name: string;
  finalProductId: number;
  onSuccess: () => void;
};

type CompositeItem = {
  name: string;
  volume: string;
};

export const CompositeDataModal = ({
  open,
  onClose,
  name,
  finalProductId,
  onSuccess,
}: Props) => {
  const [form] = Form.useForm();
  const [compositeItems, setCompositeItems] = useState([
    { name: "", volume: "" },
    { name: "", volume: "" },
  ]);

  const addCompositeItem = () => {
    setCompositeItems([...compositeItems, { name: "", volume: "" }]);
  };

  const { products } = useProducts();

  const handleCompositeChange = (
    index: number,
    field: keyof CompositeItem,
    value: string
  ) => {
    const updatedItems = [...compositeItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setCompositeItems(updatedItems);
  };

  const handleDeleteComposite = (index: number) => {
    const updatedItems = compositeItems.filter((_, i) => i !== index);
    setCompositeItems(updatedItems);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await submitProductRecipes(values, compositeItems, finalProductId);

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
            Provide composite product data
          </span>
        }
        open={open}
        onCancel={onClose}
        onOk={() => {
          console.log("Composite Product Components:", compositeItems);
          onClose();
        }}
        footer={null}
        centered
        className="custom-modal"
        width={400}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            rules={[{ message: "Name!!" }]}
            style={{ marginBottom: "8px", color: "white" }}
            className="flex justify-center"
          >
            <span style={{ fontSize: 18 }}>{name}</span>
          </Form.Item>
          <Button
            type="primary"
            onClick={addCompositeItem}
            style={{
              backgroundColor: "#AF0F0F",
              color: "white",
              marginBottom: "8px",
            }}
            className="w-full"
            size="middle"
          >
            <img src={plusWhite} alt="" className="h-5" />
          </Button>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: "8px",
            }}
          >
            {compositeItems.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                  backgroundColor: "#fafafa",
                }}
              >
                <Form.Item name={["items", index, "ingredientId"]}>
                  <Select
                    placeholder="Product name"
                    className="w-full"
                    style={{ marginBottom: "8px" }}
                  >
                    {products.map((product) => (
                      <Option value={product.productId}>
                        {product.productName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name={["items", index, "quantityReceived"]}>
                  <Input
                    placeholder="Volume"
                    value={item.volume}
                    onChange={(e) =>
                      handleCompositeChange(index, "volume", e.target.value)
                    }
                  />
                </Form.Item>
                <div className="w-full flex justify-end mt-2">
                  <Button
                    size="small"
                    onClick={() => handleDeleteComposite(index)}
                    style={{
                      backgroundColor: "#383531",
                      color: "white",
                      marginBottom: "8px",
                    }}
                    className=""
                  >
                    <img src={trash} alt="trash" className="h-4" />
                  </Button>
                </div>
              </div>
            ))}
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
            <Button onClick={onClose} className="w-1/2 ml-2" size="large">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
