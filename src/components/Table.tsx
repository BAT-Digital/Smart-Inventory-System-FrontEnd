import { Table, Button } from "antd";
import { useState } from "react";
import { CompositionProductInfo } from "./CompositionProductInfo";
import { useBatchArrivals } from "../hooks/useBatchArrivals";
import {
  Product,
  useCategoryProducts,
  useProductInUse,
} from "../hooks/useProducts";
import {
  fetchCompositionByProductId,
  Ingredient,
} from "../hooks/useProductRecipe";

type ReceiptTableProps = {
  data: never[];
  loading: boolean;
};

export const ReceiptTable = ({ data, loading }: ReceiptTableProps) => {
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

  return (
    <div className="px-4">
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 8 }}
        bordered
        className="custom-ant-table custom-border-table"
      />
    </div>
  );
};

type Props = {
  products: Product[];
  columns: Columns[];
  loading: boolean;
};

type Columns = {
  title: string;
  dataIndex: string;
  key: string;
};

export const AccountingProductTable: React.FC<Props> = ({
  products,
  columns,
  loading,
}) => {
  const [compositionItems, setCompositionItems] = useState<Ingredient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchComposition = async (productId: number) => {
    try {
      const ingredients = await fetchCompositionByProductId(productId);
      setCompositionItems(ingredients);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch composition", err);
    }
  };

  const productDataSource = products.map((product, index) => ({
    key: index.toString(),
    id: product.productId,
    name: product.productName,
    perishable: product.isPerishable ? "Да" : "Нет",
    description: product.description || "",
    composition: product.isComposite ? (
      <Button
        type="primary"
        block
        style={{
          backgroundColor: "#335C67",
          color: "#FFFFFF",
        }}
        onClick={() => {
          fetchComposition(product.productId);
          setIsModalOpen(true);
        }}
      >
        Узнать
      </Button>
    ) : (
      ""
    ),
    price: product.price,
    volume: product.volume,
    unit: product.unitOfMeasure,
  }));

  return (
    <>
      <div className="px-4">
        <Table
          dataSource={productDataSource}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 7 }}
          bordered
          className="custom-ant-table custom-border-table"
        />
      </div>
      <CompositionProductInfo
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={compositionItems}
      />
    </>
  );
};

interface CategoryProps {
  type: String;
  name: String;
}

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

export const AccountingCategoryProductTable: React.FC<CategoryProps> = ({
  type,
  name,
}) => {
  const { categoryProducts, categoryloading } = useCategoryProducts({
    type,
    name,
  });

  const [compositionItems, setCompositionItems] = useState<Ingredient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchComposition = async (productId: number) => {
    try {
      const ingredients = await fetchCompositionByProductId(productId);
      setCompositionItems(ingredients);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch composition", err);
    }
  };

  const productDataSource = categoryProducts.map((product, index) => ({
    key: index.toString(),
    id: product.productId,
    name: product.productName,
    perishable: product.isPerishable ? "Да" : "Нет",
    description: product.description || "",
    composition: product.isComposite ? (
      <Button
        type="primary"
        block
        style={{
          backgroundColor: "#335C67",
          color: "#FFFFFF",
        }}
        onClick={() => {
          fetchComposition(product.productId);
          setIsModalOpen(true);
        }}
      >
        Узнать
      </Button>
    ) : (
      ""
    ),
    price: product.price,
    volume: product.volume,
    unit: product.unitOfMeasure,
  }));

  return (
    <>
      <div className="px-4">
        <Table
          dataSource={productDataSource}
          columns={prdouctColumns}
          loading={categoryloading}
          pagination={{ pageSize: 7 }}
          bordered
          className="custom-ant-table custom-border-table"
        />
      </div>
      <CompositionProductInfo
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={compositionItems}
      />
    </>
  );
};

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

type ProductInUseProps = {
  products: never[];
  loading: boolean;
};

export const AccountingProductInUseTable: React.FC<ProductInUseProps> = ({
  products,
  loading,
}) => {
  return (
    <div className="px-4">
      <Table
        dataSource={products}
        columns={prdouctInUseColumns}
        pagination={{ pageSize: 8 }}
        loading={loading}
        bordered
        className="custom-ant-table custom-border-table"
      />
    </div>
  );
};
