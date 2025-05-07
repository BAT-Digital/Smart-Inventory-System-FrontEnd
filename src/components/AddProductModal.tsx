import { Modal, Button, Form } from "antd";
import plus from "../assets/icons/plustWhite.png";
import { useState } from "react";
import classNames from "classnames";
import { AddFullProductDataModal } from "./AddProductDataModal";

type Props = {
  open: boolean;
  onClose: () => void;
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

export const AddProductModal = ({ open, onClose }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: string) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter((p) => p !== product); // Unselect
      } else {
        return [...prevSelected, product]; // Select
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedProducts) return;
    console.log("Selected products:", selectedProducts);
    onClose();
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Добавьте продукт
          </span>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        className="custom-modal"
        width={500}
      >
        <Form layout="vertical">
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
            style={{ backgroundColor: "#9E2A2B", color: "#1E1E1E" }}
            size="large"
            className="w-full mb-3"
          >
            <img src={plus} alt="" className="h-4 w-auto" />
          </Button>
          <div
            className="max-h-60 overflow-y-auto grid p-2 gap-2 bg-[#F2F2F0]"
            style={{ borderRadius: 4 }}
          >
            {sampleProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => handleProductClick(product)}
                className={classNames(
                  "p-3 rounded cursor-pointer border transition-all",
                  {
                    "bg-[#FFF3B0] border-black":
                      selectedProducts.includes(product),
                    "bg-white hover:bg-gray-100 border-gray-300":
                      !selectedProducts.includes(product),
                  }
                )}
              >
                {product}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!selectedProducts}
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

      <AddFullProductDataModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
