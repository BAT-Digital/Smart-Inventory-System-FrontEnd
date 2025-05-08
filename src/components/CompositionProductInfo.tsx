import { Modal, Table } from "antd";

// CompositionProductInfo.tsx
type Ingredient = {
  name: string;
  volume: string | number;
  unit: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  products: Ingredient[]; // updated from string[]
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
        width={400}
      >
        <div
          className="max-h-100 overflow-y-auto  "
          style={{ marginBottom: "8px" }}
        >
          <div className="">
            <Table
              dataSource={products}
              columns={prdouctColumns}
              pagination={false}
              bordered
              className="custom-ant-table custom-border-table"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
