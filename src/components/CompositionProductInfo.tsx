import { Modal, Button, Table } from "antd";

type Props = {
  open: boolean;
  onClose: () => void;
  products: string[];
};

const prdouctColumns = [
  {
    title: "Название товара",
    dataIndex: "name",
    key: "name",
    width: "50%",
  },
  {
    title: "Объем",
    dataIndex: "volume",
    key: "volume",
    width: "30%",
  },
  {
    title: "Единица измерения",
    dataIndex: "unit",
    key: "unit",
    width: "20%",
  },
];

const productItems = [
  {
    name: "Молоко",
    volume: "100",
    unit: "мл",
  },
  {
    name: "Молоко",
    volume: "100",
    unit: "мл",
  },
  {
    name: "Молоко",
    volume: "100",
    unit: "мл",
  },
  {
    name: "Молоко",
    volume: "100",
    unit: "мл",
  },
  {
    name: "Молоко",
    volume: "100",
    unit: "мл",
  },
  {
    name: "Молоко",
    volume: "100",
    unit: "мл",
  },
  {
    name: "Молоко",
    volume: "100",
    unit: "мл",
  },
];

export const CompositionProductInfo = ({ open, onClose, products }: Props) => {
  return (
    <>
      <Modal
        title={
          <span className="text-white font-semibold flex justify-center mb-4">
            Composition product
          </span>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        className="custom-modal"
        width={500}
      >
        <div
          className="max-h-100 overflow-y-auto  "
          style={{ marginBottom: "8px" }}
        >
          <div className="">
            <Table
              dataSource={productItems}
              columns={prdouctColumns}
              pagination={false}
              bordered
              className="custom-ant-table custom-border-table"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={onClose} className="w-full" size="large">
            Закрыть
          </Button>
        </div>
      </Modal>
    </>
  );
};
