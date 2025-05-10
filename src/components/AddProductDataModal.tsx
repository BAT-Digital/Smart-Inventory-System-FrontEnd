import { Modal, Input, Button, Form, Select } from "antd";
import { useState } from "react";
const { Option } = Select;
import { AlerModal } from "./AlertModal";
import { AddCategoryModal } from "./AddCategory";
import { AddSupplierModal } from "./AddSupplier";
import { CompositeDataModal } from "./CompositeDataModal";
import { Category, useCategories } from "../hooks/useCategories";
import { Supplier, useSuppliers } from "../hooks/useSuppliers";
import { ProductDTO, sendProduct } from "../services/productApi";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddProductDataModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      onClose(); // Close modal after submitting
    });
  };

  return (
    <Modal
      title={
        <span className="text-white font-semibold flex justify-center mb-4">
          Данные продукта
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
          style={{ marginBottom: "8px" }}
          rules={[{ required: true, message: "Название Продукта*" }]}
        >
          <Select placeholder="Название Продукта*">
            <Option value="Молоко">Молоко</Option>
            <Option value="Латте">Латте</Option>
          </Select>
        </Form.Item>

        <div className="flex justify-between" style={{ marginBottom: "-16px" }}>
          <div className="mr-2">
            <Form.Item name="quantity">
              <Input placeholder="Количетсво" />
            </Form.Item>
          </div>
          <div className="ml-2">
            <Form.Item name="price">
              <Input placeholder="Цена" />
            </Form.Item>
          </div>
        </div>

        <Form.Item name="expiary_date">
          <Select placeholder="Срок годности">
            <Option value="Молоко">Молоко</Option>
            <Option value="Латте">Латте</Option>
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
            Добавить
          </Button>
          <Button onClick={onClose} className="w-1/2 ml-2" size="large">
            Отмена
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
              setAlertMessage(`${values.productName} был успешно добавлен`);
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

            setAlertMessage(`${values.productName} был успешно добавлен`);
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
            Данные продукта
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
          <Form.Item name="productName" style={{ marginBottom: "8px" }}>
            <Input placeholder="Название" />
          </Form.Item>
          <Form.Item name="barcode" style={{ marginBottom: "8px" }}>
            <Input placeholder="Баркод" />
          </Form.Item>
          <div className="flex" style={{ marginBottom: "-16px" }}>
            <div className="mr-2 flex-col-1 w-full">
              <Form.Item name="volume">
                <Input placeholder="Объем" />
              </Form.Item>
            </div>
            <div className="ml-2 flex-col-1 w-full">
              <Form.Item name="unitOfMeasure">
                <Select
                  placeholder="Единица измерения"
                  onChange={(value) => {
                    if (value === "другое") {
                      setShowUnitModal(true);
                      form.setFieldValue("unit", null); // reset the select field to prevent re-trigger
                    } else {
                      setCustomUnit(null);
                    }
                  }}
                  value={customUnit || form.getFieldValue("unit")}
                >
                  <Option value="л">л</Option>
                  <Option value="мл">мл</Option>
                  <Option value="штук(-и)">штук(-и)</Option>
                  <Option value="г">г</Option>
                  <Option value="мг">мг</Option>
                  <Option value="другое">другое</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item name="quantity" style={{ marginBottom: "8px" }}>
            <Input placeholder="Количество едениц товара" />
          </Form.Item>
          <Form.Item name="supplier" style={{ marginBottom: "8px" }}>
            <Select
              placeholder="Поставщик"
              onChange={(value) => {
                if (value === "другое") {
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
              <Option value="другое">другое</Option>
            </Select>
          </Form.Item>
          <Form.Item name="category" style={{ marginBottom: "8px" }}>
            <Select
              placeholder="Категория"
              onChange={(value) => {
                if (value === "другое") {
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
              <Option value="другое">другое</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" style={{ marginBottom: "8px" }}>
            <Input placeholder="Цена" />
          </Form.Item>
          <Form.Item name="description" style={{ marginBottom: "8px" }}>
            <Input.TextArea placeholder="описание" />
          </Form.Item>
          <Form.Item name="isPerishable" style={{ marginBottom: "8px" }}>
            <Select placeholder="Is perishable?">
              <Option value="true">Perishable</Option>
              <Option value="false">NonPerishable</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isComposite" style={{ marginBottom: "8px" }}>
            <Select placeholder="Характеристика продукта">
              <Option value="false">Единичный</Option>
              <Option value="true">Комплексный</Option>
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
              Добавить
            </Button>
            <Button onClick={onClose} className="w-1/2 ml-2" size="large">
              Отмена
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
              Добавьте новую единицу измерения
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
              name="unit"
              rules={[{ required: true, message: "Единица измерения!!" }]}
            >
              <Input
                placeholder="Единица измерения"
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
                Добавить
              </Button>
              <Button
                onClick={handleExtraModalClose}
                className="w-1/2 ml-2"
                size="large"
              >
                Отмена
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
