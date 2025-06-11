import { Table, Button } from "antd";
import { useState } from "react";
import { CompositionProductInfo } from "./CompositionProductInfo";
import { Product } from "../hooks/useProducts";
import {
  fetchCompositionByProductId,
  Ingredient,
} from "../hooks/useProductRecipe";
import { WriteOff } from "../hooks/useWriteOff";
import { BatchArrival } from "../types/BatchArrivals";
import { useBatchArrivalItems } from "../hooks/useBatchArrivalItems";
import { BatchArrivalItemsModal } from "./BatchArrivalItemsModal";
import { User } from "../types/User";
import { SalesTransaction } from "../hooks/useSalesTransactions";
import { useSalesItems } from "../hooks/useSalesItems";
import { SalesItemsModal } from "./SalesItemsModal";

type UserTableProps = {
  users: User[];
  loading: boolean;
};

export const UserTable = ({ users, loading }: UserTableProps) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created date",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  const data = users.map((user) => ({
    id: user.userId,
    username: user.username,
    role: user.role,
    created_at: new Date(user.createdAt).toLocaleString("Ru-ru"),
  }));

  return (
    <div className="mt-2">
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 6 }}
        bordered
        className="custom-ant-table custom-border-table"
      />
    </div>
  );
};

type WriteOffTableProps = {
  writeOffs: WriteOff[];
  loading: boolean;
};

export const WriteOffTable = ({ writeOffs, loading }: WriteOffTableProps) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Write-Off Date",
      dataIndex: "writeOffDate",
      key: "writeOffDate",
    },
  ];

  const data = writeOffs.map((writeOff) => ({
    id: writeOff.writeOffId,
    product: writeOff.batch.product.productName,
    reason: writeOff.reason,
    quantity: writeOff.quantity,
    writeOffDate: writeOff.writeOffDate,
  }));

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

type ReceiptTableProps = {
  data: BatchArrival[];
  loading: boolean;
};

export const ReceiptTable = ({ data, loading }: ReceiptTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArrivalId, setSelectedArrivalId] = useState<number>(0);

  const { data: batchItems } = useBatchArrivalItems(selectedArrivalId);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Arrival time",
      dataIndex: "time",
      key: "time",
    },
  ];

  const handleSeeProducts = (arrivalId: number) => {
    setSelectedArrivalId(arrivalId);
    setIsModalOpen(true);
  };

  const mappedData = data.map((item, index: number) => ({
    key: index,
    id: item.arrivalId,
    supplier: item.supplier.name,
    notes: item.notes || "-",
    products: (
      <Button
        type="primary"
        block
        style={{
          backgroundColor: "#335C67",
          color: "#FFFFFF",
        }}
        onClick={() => {
          handleSeeProducts(item.arrivalId);
          setIsModalOpen(true);
        }}
      >
        See
      </Button>
    ),
    receiver: item.addedBy.username,
    time: new Date(item.arrivalDate).toLocaleString("ru-RU"),
  }));

  return (
    <>
      <div className="px-4">
        <Table
          dataSource={mappedData}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 7 }}
          bordered
          className="custom-ant-table custom-border-table"
        />
      </div>
      <BatchArrivalItemsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        batchItems={batchItems}
      />
    </>
  );
};

type SalesHistoryTableProps = {
  salesTransactions: SalesTransaction[];
  loading: boolean;
};

export const SalesHistoryTable = ({
  salesTransactions,
  loading,
}: SalesHistoryTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setSelectedTransactionId] = useState<number>(0);

  const { salesItems: salesItems } = useSalesItems({ transactionId });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Сredentials",
      dataIndex: "credentials",
      key: "credentials",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
    },
  ];

  const handleSeeProducts = (transactionId: number) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  const mappedData = salesTransactions.map((transaction, index: number) => ({
    key: index,
    id: transaction.transactionId,
    credentials: transaction.credentials,
    products: (
      <Button
        type="primary"
        block
        style={{
          backgroundColor: "#335C67",
          color: "#FFFFFF",
        }}
        onClick={() => {
          handleSeeProducts(transaction.transactionId);
        }}
      >
        See
      </Button>
    ),
    totalAmount: "₸" + String(transaction.totalAmount),
    transactionDate: new Date(transaction.transactionDate).toLocaleString(
      "ru-RU"
    ),
  }));

  return (
    <>
      <div className="px-4">
        <Table
          dataSource={mappedData}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 7 }}
          bordered
          className="custom-ant-table custom-border-table"
        />
      </div>
      <SalesItemsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        salesItems={salesItems}
      />
    </>
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
    perishable: product.isPerishable ? "Yes" : "No",
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
        See
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

type CategoryProps = {
  categoryProducts: Product[];
  categoryloading: boolean;
};

const prdouctColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Perishable",
    dataIndex: "perishable",
    key: "perishable",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Composition",
    dataIndex: "composition",
    key: "composition",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Volume",
    dataIndex: "volume",
    key: "volume",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
];

export const AccountingCategoryProductTable: React.FC<CategoryProps> = ({
  categoryProducts,
  categoryloading,
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

  const productDataSource = categoryProducts.map((product, index) => ({
    key: index.toString(),
    id: product.productId,
    name: product.productName,
    perishable: product.isPerishable ? "Yes" : "No",
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
        Check
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
    title: "Product name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Added by",
    dataIndex: "added_by",
    key: "added_by",
  },
  {
    title: "Quantity recieved",
    dataIndex: "quantity_recieved",
    key: "quantity_recieved",
  },
  {
    title: "Quantity left",
    dataIndex: "quantity_left",
    key: "quantity_left",
  },
  {
    title: "Date recieved",
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
