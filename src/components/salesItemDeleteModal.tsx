import { Modal, Button, Form, message } from "antd";
import { useState } from "react";
import classNames from "classnames";
import { SalesItem } from "../hooks/useSalesItems";
import { deleteSalesItems } from "../services/salesItemApi";

type Props = {
  open: boolean;
  onClose: () => void;
  salesItems: SalesItem[];
  onSuccess: () => {};
};

export const SalesItemDeleteModal = ({
  open,
  onClose,
  salesItems,
  onSuccess,
}: Props) => {
  const [selectedItems, setSelectedItems] = useState<SalesItem[]>([]);

  const handleItemClick = (item: SalesItem) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((i) => i !== item); // Unselect
      } else {
        return [...prevSelected, item]; // Select
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedItems) return;
    const ids: number[] = selectedItems.map((item) => item.salesItemId);

    await deleteSalesItems(ids);

    onSuccess();
    message.success("deleted products");
    onClose();
  };

  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Выберите продукты
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
          <div
            className="max-h-60 overflow-y-auto grid p-2 gap-2 bg-[#F2F2F0]"
            style={{ borderRadius: 4 }}
          >
            {salesItems.map((item) => (
              <div
                key={item.salesItemId}
                onClick={() => handleItemClick(item)}
                className={classNames(
                  "p-3 rounded cursor-pointer border transition-all",
                  {
                    "bg-[#FFF3B0] border-black": selectedItems.includes(item),
                    "bg-white hover:bg-gray-100 border-gray-300":
                      !selectedItems.includes(item),
                  }
                )}
              >
                {item.product.productName}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!selectedItems}
              style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
              className="w-1/2 mr-2"
              size="large"
            >
              Удалить
            </Button>
            <Button
              onClick={() => {
                setSelectedItems([]);
                onClose();
              }}
              className="w-1/2 ml-2"
              size="large"
            >
              Отмена
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
