import { Modal } from "antd";
import { BatchArrivalItem } from "../types/BatchArrivals";

type Props = {
  open: boolean;
  onClose: () => void;
  batchItems: BatchArrivalItem[]; // updated from string[]
};

export const BatchArrivalItemsModal = ({
  open,
  onClose,
  batchItems,
}: Props) => {
  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Products
          </span>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        className="custom-modal"
        width={500}
      >
        <div className="max-h-100" style={{ marginBottom: "8px" }}>
          <div className="">
            <div
              className="max-h-60 overflow-y-auto grid p-2 gap-2 bg-[#F2F2F0]"
              style={{ borderRadius: 4 }}
            >
              {batchItems.map((item) => (
                <div
                  key={item.product.productName}
                  className="p-3 rounded bg-white hover:bg-gray-100 border-gray-300"
                  style={{ fontSize: 16 }}
                >
                  {item.product.productName} | {item.quantityRemaining}{" "}
                  remaining out of {item.quantityReceived} received
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
