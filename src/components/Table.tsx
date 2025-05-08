import { Table, Button } from "antd";
import { useState } from "react";
import { CompositionProductInfo } from "./CompositionProductInfo";

const dataSource = [
  {
    key: "1",
    id: 1,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 12:03",
  },
  {
    key: "2",
    id: 2,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  {
    key: "3",
    id: 3,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  {
    key: "4",
    id: 4,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  {
    key: "5",
    id: 5,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  {
    key: "6",
    id: 6,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  {
    key: "7",
    id: 7,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  {
    key: "8",
    id: 8,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  {
    key: "9",
    id: 9,
    supplier: "Лучшие кофейные зерна",
    notes: "что то там написали",
    receiver: "Али",
    time: "01.01.2025 11:43",
  },
  // Add more rows here...
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Поставщик",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "Заметки",
    dataIndex: "notes",
    key: "notes",
  },
  {
    title: "Принимающий",
    dataIndex: "receiver",
    key: "receiver",
  },
  {
    title: "Время поставки",
    dataIndex: "time",
    key: "time",
  },
];

const productSoloDataSource = [
  {
    key: "1",
    id: 1,
    name: "Молоко Родина",
    perishable: "Да",
    description: "Какое то молоко",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "2",
    id: 2,
    name: "Латте",
    perishable: "нет",
    description: "Какое то латте",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "3",
    id: 3,
    name: "Молоко Родина",
    perishable: "Да",
    description: "Какое то молоко",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "4",
    id: 4,
    name: "Молоко Родина",
    perishable: "Да",
    description: "Какое то молоко",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "5",
    id: 5,
    name: "Молоко Родина",
    perishable: "Да",
    description: "Какое то молоко",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "6",
    id: 6,
    name: "Латте",
    perishable: "нет",
    description: "Какое то латте",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "7",
    id: 7,
    name: "Молоко Родина",
    perishable: "Да",
    description: "Какое то молоко",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "8",
    id: 8,
    name: "Молоко Родина",
    perishable: "Да",
    description: "Какое то молоко",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  {
    key: "9",
    id: 9,
    name: "Молоко Родина",
    perishable: "Да",
    description: "Какое то молоко",
    price: "5000",
    volume: "1000",
    unit: "мл",
  },
  // Add more rows here...
];

const prdouctColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название товара",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Скоропортищийся",
    dataIndex: "perishable",
    key: "perishable",
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Состав",
    dataIndex: "composition",
    key: "composition",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Объем",
    dataIndex: "volume",
    key: "volume",
  },
  {
    title: "Единица измерения",
    dataIndex: "unit",
    key: "unit",
  },
];

const prdouctSoloColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название товара",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Скоропортищийся",
    dataIndex: "perishable",
    key: "perishable",
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Объем",
    dataIndex: "volume",
    key: "volume",
  },
  {
    title: "Единица измерения",
    dataIndex: "unit",
    key: "unit",
  },
];

const productInUseDataSource = [
  {
    key: "1",
    id: 1,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "2",
    id: 2,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "20",
    date_recieved: "01.01.2025",
  },
  {
    key: "3",
    id: 3,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "4",
    id: 4,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "5",
    id: 5,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "6",
    id: 6,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "7",
    id: 7,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "8",
    id: 8,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "9",
    id: 9,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
  {
    key: "10",
    id: 10,
    name: "Молоко Родина",
    added_by: "admin",
    quantity_recieved: "50",
    quantity_left: "10",
    date_recieved: "01.01.2025",
  },
];

const prdouctInUseColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название товара",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Кем добавлено",
    dataIndex: "added_by",
    key: "added_by",
  },
  {
    title: "Количетсво Поставлено",
    dataIndex: "quantity_recieved",
    key: "quantity_recieved",
  },
  {
    title: "Количество Осталось",
    dataIndex: "quantity_left",
    key: "quantity_left",
  },
  {
    title: "Дата поставки",
    dataIndex: "date_recieved",
    key: "date_recieved",
  },
];

export const ReceiptTable = () => {
  return (
    <div className="px-4">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 8 }}
        bordered
        className="custom-ant-table custom-border-table"
      />
    </div>
  );
};

interface Props {
  type: String;
}

export const AccountingProductTable: React.FC<Props> = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const productComplexDataSource = [
    {
      key: "1",
      id: 1,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "2",
      id: 2,
      name: "Латте",
      perishable: "нет",
      description: "Какое то латте",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "3",
      id: 3,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "4",
      id: 4,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "5",
      id: 5,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "6",
      id: 6,
      name: "Латте",
      perishable: "нет",
      description: "Какое то латте",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "7",
      id: 7,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "8",
      id: 8,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "9",
      id: 9,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    // Add more rows here...
  ];

  const productDataSource = [
    {
      key: "1",
      id: 1,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: "",
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "2",
      id: 2,
      name: "Латте",
      perishable: "нет",
      description: "Какое то латте",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "3",
      id: 3,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: "",
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "4",
      id: 4,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: "",
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "5",
      id: 5,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: "",
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "6",
      id: 6,
      name: "Латте",
      perishable: "нет",
      description: "Какое то латте",
      composition: (
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#335C67",
            color: "#FFFFFF",
          }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Узнать
        </Button>
      ),
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "7",
      id: 7,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: "",
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "8",
      id: 8,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: "",
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    {
      key: "9",
      id: 9,
      name: "Молоко Родина",
      perishable: "Да",
      description: "Какое то молоко",
      composition: "",
      price: "5000",
      volume: "1000",
      unit: "мл",
    },
    // Add more rows here...
  ];

  return (
    <>
      <div className="px-4">
        <Table
          dataSource={
            type === "solo"
              ? productSoloDataSource
              : type === "complex"
              ? productComplexDataSource
              : productDataSource
          }
          columns={type === "solo" ? prdouctSoloColumns : prdouctColumns}
          pagination={{ pageSize: 7 }}
          bordered
          className="custom-ant-table custom-border-table"
        />
      </div>
      <CompositionProductInfo
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={sampleProducts}
      />
    </>
  );
};

export const AccountingProductInUseTable = () => {
  return (
    <div className="px-4">
      <Table
        dataSource={productInUseDataSource}
        columns={prdouctInUseColumns}
        pagination={{ pageSize: 8 }}
        bordered
        className="custom-ant-table custom-border-table"
      />
    </div>
  );
};
