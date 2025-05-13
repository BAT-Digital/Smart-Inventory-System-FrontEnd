import { Modal, Input, Button, Form, Select, message } from "antd";
import { useState } from "react";
const { Option } = Select;
import { AlerModal } from "./AlertModal";
import { AddCategoryModal } from "./AddCategory";
import { AddSupplierModal } from "./AddSupplier";
import { CompositeDataModal } from "./CompositeDataModal";
import { Category, useCategories } from "../hooks/useCategories";
import { Supplier, useSuppliers } from "../hooks/useSuppliers";
import { ProductDTO, sendProduct } from "../services/productApi";
import { useProducts } from "../hooks/useProducts";
import axios from "../utils/axios";
import {
  moveToProductInUse,
  ProductRequestDTO,
} from "../services/productInUseApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export type BatchArrivalItem = {
  batchItemId: number;
  quantityRemaining: number;
  expiryDate: string; // or Date if you prefer
};

export const AddProductDataModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const { products } = useProducts();
  const [batchItems, setBatchItems] = useState<BatchArrivalItem[]>([]);
  const [loadingBatchItems, setLoadingBatchItems] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const navigation = useNavigate();

  const handleProductChange = async (barcode: string) => {
    setSelectedBarcode(barcode);
    form.setFieldsValue({ expiry_date: undefined, quantity: undefined });
    setQuantity(0); // Reset related fields

    if (!barcode) {
      setBatchItems([]);
      return;
    }

    try {
      setLoadingBatchItems(true);
      const response = await axios.get<BatchArrivalItem[]>(
        `/api/batch-arrival-items/by-barcode/${barcode}`
      );
      if (response.data.length === 1) {
        setQuantity(response.data[0].quantityRemaining);
      }
      setBatchItems(response.data);
    } catch (error) {
      console.error("Error fetching batch items:", error);
      // Handle error as needed
    } finally {
      setLoadingBatchItems(false);
    }
  };

  const handleExpiryDateChange = async (expiryDate: string) => {
    if (!selectedBarcode || !expiryDate) return;

    try {
      const response = await axios.get<BatchArrivalItem[]>(
        `/api/batch-arrival-items/by-barcode-and-expiry`,
        {
          params: {
            barcode: selectedBarcode,
            expiryDate: expiryDate,
          },
        }
      );

      // Calculate total quantity remaining
      const totalQuantity = response.data.reduce(
        (sum, item) => sum + Number(item.quantityRemaining),
        0
      );

      // Set the quantity field value
      setQuantity(totalQuantity);
    } catch (error) {
      console.error("Error fetching batch items by expiry:", error);
    }
  };

  const handleSubmit = async () => {
    const userIdCookie = Cookies.get("user_id");

    if (!userIdCookie) {
      message.error("Session expired. Please log in again.");
      navigation("/");
      return;
    }

    try {
      const values = await form.validateFields();
      const userId = parseInt(userIdCookie);

      const productRequest: ProductRequestDTO = {
        userId: userId,
        barcode: selectedBarcode!,
        expirationDate: values.expiry_date,
        quantity: values.quantity,
      };

      console.log(productRequest);

      const response = await moveToProductInUse([productRequest]);
      message.info(response);

      form.resetFields(); // Reset all form fields
      setBatchItems([]); // Clear batch items
      setSelectedBarcode(null); // Reset barcode selection
      setQuantity(0);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to move product");
    }
  };

  const handleClose = () => {
    form.resetFields();
    setBatchItems([]);
    setSelectedBarcode(null);
    setQuantity(0);
    onClose();
  };

  return (
    <Modal
      title={
        <span className="text-white font-semibold flex justify-center mb-4">
          Product data
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
          <Select placeholder="Product*" onChange={handleProductChange}>
            {products.map((product) => (
              <Option value={product.barcode}>{product.productName}</Option>
            ))}
          </Select>
        </Form.Item>

        <div style={{ marginBottom: "-16px" }}>
          <Form.Item name="expiry_date">
            <Select
              placeholder="Expiry date"
              loading={loadingBatchItems}
              disabled={batchItems.length === 0}
              onChange={handleExpiryDateChange}
            >
              {batchItems.map((item) => (
                <Option key={item.batchItemId} value={item.expiryDate}>
                  {item.expiryDate} (Quantity left: {item.quantityRemaining})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex" style={{ marginBottom: "-10px" }}>
          <div className="mr-1">
            <Form.Item name="quantity">
              <Input placeholder="Quantity" />
            </Form.Item>
          </div>
          <div className="ml-1">
            <span style={{ color: "white", fontSize: 18 }}>
              out of {quantity}
            </span>
          </div>
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

type FullProductProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const AddFullProductDataModal = ({
  open,
  onClose,
  onSuccess,
}: FullProductProps) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [customUnit, setCustomUnit] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [customCategory, setCustomCategory] = useState<Category | null>(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [customSupplier, setCustomSupplier] = useState<Supplier | null>(null);
  const [name, setName] = useState<string>("");
  const [showCompositeModal, setShowCompositeModal] = useState(false);
  const [finalProductId, setFinalProductId] = useState(0);

  const { categories, refetch: refetchCategories } = useCategories();
  const { suppliers, refetch: refetchSuppliers } = useSuppliers();

  const handleCategoryAdded = () => {
    refetchCategories();
  };

  const handleSupplierAdded = () => {
    refetchSuppliers();
  };

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        if (values.isComposite === "true") {
          try {
            const productDTO: ProductDTO = {
              categoryId: values.category,
              productName: values.productName,
              barcode: values.barcode,
              isPerishable: values.isPerishable,
              isComposite: values.isComposite,
              unitOfMeasure: values.unitOfMeasure,
              supplierId: values.supplier,
              description: values.description,
              price: values.price,
              volume: values.volume,
            };

            const response = await sendProduct(productDTO);

            const productId = parseInt(response);

            if (Number.isNaN(productId)) {
              setAlertMessage(response);
              setAlertVisible(true);
              onClose();
            } else {
              setName(values.productName);
              setFinalProductId(productId);
              setAlertMessage(
                `${values.productName} has been successfully added`
              );
              setShowCompositeModal(true);
            }
          } catch (error) {
            console.error("Submission error:", error);
          }
        } else {
          try {
            const productDTO: ProductDTO = {
              categoryId: values.category,
              productName: values.productName,
              barcode: values.barcode,
              isPerishable: values.isPerishable,
              isComposite: values.isComposite,
              unitOfMeasure: values.unitOfMeasure,
              supplierId: values.supplier,
              description: values.description,
              price: values.price,
              volume: values.volume,
            };
            await sendProduct(productDTO);

            setAlertMessage(
              `${values.productName} has been successfully added`
            );
            setAlertVisible(true);
            onSuccess();
          } catch (error) {
            console.error("Submission error:", error);
          }
        }
      } catch (errorInfo) {
        console.log("Validation failed:", errorInfo);
      }
    });
  };

  const handleExtraModalClose = () => {
    setShowUnitModal(false);
    setShowCategoryModal(false);
    setShowSupplierModal(false);
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Product data
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
            name="productName"
            rules={[{ required: true, message: "Please enter product name" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Product name" />
          </Form.Item>
          <Form.Item
            name="barcode"
            rules={[{ required: true, message: "Please enter barcode" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input placeholder="Barcode" />
          </Form.Item>
          <div className="flex" style={{ marginBottom: "-16px" }}>
            <div className="mr-2 flex-col-1 w-full">
              <Form.Item
                name="volume"
                rules={[{ required: true, message: "Please enter volume" }]}
              >
                <Input placeholder="Volume" />
              </Form.Item>
            </div>
            <div className="ml-2 flex-col-1 w-full">
              <Form.Item
                name="unitOfMeasure"
                rules={[{ required: true, message: "Please enter unit" }]}
              >
                <Select
                  placeholder="Unit"
                  onChange={(value) => {
                    if (value === "else") {
                      setShowUnitModal(true);
                      form.setFieldValue("unitOfMeasure", null); // reset the select field to prevent re-trigger
                    } else {
                      setCustomUnit(null);
                    }
                  }}
                  value={customUnit || form.getFieldValue("unitOfMeasure")}
                >
                  <Option value="l">l</Option>
                  <Option value="ml">ml</Option>
                  <Option value="piece(-s)">piece(-s)</Option>
                  <Option value="g">g</Option>
                  <Option value="mg">mg</Option>
                  <Option value="else">else</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="quantity"
            style={{ marginBottom: "8px" }}
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <Input placeholder="Quantity" />
          </Form.Item>
          <Form.Item
            name="supplier"
            style={{ marginBottom: "8px" }}
            rules={[{ required: true, message: "Please enter supplier" }]}
          >
            <Select
              placeholder="Supplier"
              onChange={(value) => {
                if (value === "else") {
                  setShowSupplierModal(true);
                  form.setFieldValue("supplier", null); // reset the select field to prevent re-trigger
                } else {
                  setCustomSupplier(null);
                }
              }}
              value={form.getFieldValue("supplier")}
            >
              {suppliers.map((supplier) => (
                <Option value={supplier.supplierId}>{supplier.name}</Option>
              ))}
              <Option value="else">else</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            style={{ marginBottom: "8px" }}
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Select
              placeholder="Category"
              onChange={(value) => {
                if (value === "else") {
                  setShowCategoryModal(true);
                  form.setFieldValue("category", null); // reset
                } else {
                  setCustomCategory(null); // clear custom
                }
              }}
              value={form.getFieldValue("category")}
            >
              {categories.map((category) => (
                <Option value={category.categoryId}>{category.name}</Option>
              ))}
              <Option value="else">else</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            style={{ marginBottom: "8px" }}
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="description"
            style={{ marginBottom: "8px" }}
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="isPerishable"
            style={{ marginBottom: "8px" }}
            rules={[{ required: true, message: "Please choose is perishable" }]}
          >
            <Select placeholder="Is perishable?">
              <Option value="true">Perishable</Option>
              <Option value="false">NonPerishable</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="isComposite"
            style={{ marginBottom: "8px" }}
            rules={[{ required: true, message: "Please choose is composite" }]}
          >
            <Select placeholder="Is composite?">
              <Option value="false">Single</Option>
              <Option value="true">Composite</Option>
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
            <Button onClick={onClose} className="w-1/2 ml-2" size="large">
              Cancel
            </Button>
          </div>
        </Form>

        {/* Category Modal */}
        <AddCategoryModal
          open={showCategoryModal}
          onClose={handleExtraModalClose}
          onSuccess={(newCategory) => {
            setCustomCategory(newCategory);
            form.setFieldValue("category", newCategory.categoryId);
            handleCategoryAdded(); // ✅ auto-select it
          }}
        />

        {/* Supplier Modal */}
        <AddSupplierModal
          open={showSupplierModal}
          onClose={handleExtraModalClose}
          onSuccess={(newSupplier) => {
            setCustomSupplier(newSupplier);
            form.setFieldValue("supplier", newSupplier.supplierId);
            handleSupplierAdded();
          }}
        />

        {/* Unit Modal */}
        <Modal
          title={
            <span className="text-white font-semibold flex justify-center mb-4">
              Add new unit of measure
            </span>
          }
          open={showUnitModal}
          onCancel={() => setShowUnitModal(false)}
          onOk={() => {
            if (customUnit) {
              form.setFieldValue("supplier", customUnit);
              setShowUnitModal(false);
            }
          }}
          footer={null}
          centered
          className="custom-modal"
          width={360}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="unitOfMeasure"
              rules={[{ required: true, message: "Unit of measure!!" }]}
            >
              <Input
                placeholder="Unit of measure"
                value={customUnit ?? ""}
                onChange={(e) => setCustomUnit(e.target.value)}
              />
            </Form.Item>
            <div className="flex justify-between">
              <Button
                type="primary"
                onClick={handleExtraModalClose}
                style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
                className="w-1/2 mr-2"
                size="large"
              >
                Add
              </Button>
              <Button
                onClick={handleExtraModalClose}
                className="w-1/2 ml-2"
                size="large"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Composite Modal */}
        <CompositeDataModal
          open={showCompositeModal}
          onClose={() => setShowCompositeModal(false)}
          name={name}
          finalProductId={finalProductId}
          onSuccess={() => {
            setAlertVisible(true);
            onSuccess();
          }}
        />
      </Modal>

      {/* Alert */}
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
