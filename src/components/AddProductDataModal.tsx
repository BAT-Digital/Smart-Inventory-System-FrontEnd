import { Modal, Input, Button, Form, Select } from "antd";
import { useState } from "react";
const { Option } = Select;
import plusWhite from "../assets/icons/plustWhite.png";
import trash from "../assets/icons/trash.png";
import { AlerModal } from "./AlertModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

type CompositeItem = {
  name: string;
  volume: string;
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

const sampleProducts = [
  "Молоко",
  "Хлеб",
  "Сыр",
  "Яблоки",
  "Мясо",
  "Йогурт",
  "Картофель",
  "Масло",
  "Помидоры",
  "Огурцы",
  "Макароны",
  "Рис",
  "Кофе",
  "Чай",
];

export const AddFullProductDataModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [customUnit, setCustomUnit] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [customCategory, setCustomCategory] = useState<string | null>(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [customSupplier, setCustomSupplier] = useState<string | null>(null);
  const [showCompositeModal, setShowCompositeModal] = useState(false);
  const [compositeItems, setCompositeItems] = useState([
    { name: "", volume: "" },
    { name: "", volume: "" },
  ]);

  const addCompositeItem = () => {
    setCompositeItems([...compositeItems, { name: "", volume: "" }]);
  };

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

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      try {
        if (values.characteristics === "Комплексный") {
          // Show modal instead of submitting directly
          setShowCompositeModal(true);
        } else {
          // Submit form as usual
          console.log("Form values:", values);
          const productName = values.name || "Продукт";
          setAlertMessage(`${productName} был успешно добавлен`);
          setAlertVisible(true);
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
          <Form.Item name="name" style={{ marginBottom: "8px" }}>
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
              <Form.Item name="unit">
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
            >
              <Option value="л">л</Option>
              <Option value="мл">мл</Option>
              <Option value="штук(-и)">штук(-и)</Option>
              <Option value="г">г</Option>
              <Option value="мг">мг</Option>
              <Option value="другое">другое</Option>
            </Select>
          </Form.Item>
          <Form.Item name="category" style={{ marginBottom: "8px" }}>
            <Select
              placeholder="Категория"
              onChange={(value) => {
                if (value === "другое") {
                  setShowCategoryModal(true);
                  form.setFieldValue("category", null); // reset the select field to prevent re-trigger
                } else {
                  setCustomCategory(null);
                }
              }}
              value={customCategory || form.getFieldValue("category")}
            >
              <Option value="л">л</Option>
              <Option value="мл">мл</Option>
              <Option value="штук(-и)">штук(-и)</Option>
              <Option value="г">г</Option>
              <Option value="мг">мг</Option>
              <Option value="другое">другое</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" style={{ marginBottom: "8px" }}>
            <Input placeholder="Цена" />
          </Form.Item>
          <Form.Item name="description" style={{ marginBottom: "8px" }}>
            <Input.TextArea placeholder="описание" />
          </Form.Item>
          <Form.Item name="characteristics" style={{ marginBottom: "8px" }}>
            <Select placeholder="Характеристика продукта">
              <Option value="Единичный">Единичный</Option>
              <Option value="Комплексный">Комплексный</Option>
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
        <Modal
          title={
            <span className="text-white font-semibold flex justify-center mb-4">
              Добавьте новую категорию
            </span>
          }
          open={showCategoryModal}
          onCancel={() => setShowCategoryModal(false)}
          onOk={() => {
            if (customCategory) {
              form.setFieldValue("category", customCategory);
              setShowCategoryModal(false);
            }
          }}
          footer={null}
          centered
          className="custom-modal"
          width={360}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Название категории!!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Категория"
                value={customCategory ?? ""}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="description">
              <Input.TextArea placeholder="Описание" rows={4} />
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
        {/* Supplier Modal */}
        <Modal
          title={
            <span className="text-white font-semibold flex justify-center mb-4">
              Добавьте нового поставщика
            </span>
          }
          open={showSupplierModal}
          onCancel={() => setShowSupplierModal(false)}
          onOk={() => {
            if (customSupplier) {
              form.setFieldValue("supplier", customSupplier);
              setShowSupplierModal(false);
            }
          }}
          footer={null}
          centered
          className="custom-modal"
          width={360}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="supplier"
              rules={[{ required: true, message: "Название категории!!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Поставщик"
                value={customSupplier ?? ""}
                onChange={(e) => setCustomSupplier(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="address" style={{ marginBottom: "8px" }}>
              <Input placeholder="Адрес" />
            </Form.Item>
            <Form.Item name="contact_info" style={{ marginBottom: "8px" }}>
              <Input placeholder="Контактные данные" />
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
        <Modal
          title={
            <span className="text-white font-semibold flex justify-center mb-4">
              Предоставьте данные о комплексном товаре
            </span>
          }
          open={showCompositeModal}
          onCancel={() => setShowCompositeModal(false)}
          onOk={() => {
            console.log("Composite Product Components:", compositeItems);
            setShowCompositeModal(false);
          }}
          footer={null}
          centered
          className="custom-modal"
          width={400}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="Название"
              rules={[{ message: "Название товара!!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Название" />
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
                  <Select
                    placeholder="Название продукта"
                    className="w-full"
                    style={{ marginBottom: "8px" }}
                  >
                    {sampleProducts.map((product) => (
                      <Option value={product}>{product}</Option>
                    ))}
                  </Select>
                  <Input
                    placeholder="Объем продукта"
                    value={item.volume}
                    onChange={(e) =>
                      handleCompositeChange(index, "volume", e.target.value)
                    }
                  />
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
                onClick={() => setShowCompositeModal(false)}
                style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
                className="w-1/2 mr-2"
                size="large"
              >
                Добавить
              </Button>
              <Button
                onClick={() => setShowCompositeModal(false)}
                className="w-1/2 ml-2"
                size="large"
              >
                Отмена
              </Button>
            </div>
          </Form>
        </Modal>
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
