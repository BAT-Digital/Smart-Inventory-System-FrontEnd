import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { AccountingProductTable } from "../components/Table";
import { AccountingTableActions } from "../components/TableActions";
import { useState } from "react";
import { AddFullProductDataModal } from "../components/AddProductDataModal";
import {
  useComplexProducts,
  useProducts,
  useSoloProducts,
} from "../hooks/useProducts";

type Props = {
  type: String;
};

const prdouctSoloColumns = [
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

const prdouctColumns = [
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

export const AccountingProducts: React.FC<Props> = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, loading, refetch: reFetchProducts } = useProducts();
  const {
    complexProducts,
    complexLoading,

    refetch: reFetchComplexProducts,
  } = useComplexProducts();
  const {
    soloProducts,
    soloLoading,

    refetch: reFetchSoloProducts,
  } = useSoloProducts();

  const handleSearch = (value: string) => {
    console.log("Searching:", value);
  };

  const handleScan = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4">
          <div className="px-4">
            <AccountingTableActions
              onSearch={handleSearch}
              onScan={handleScan}
            />
          </div>
          <AccountingProductTable
            products={
              type === "solo"
                ? soloProducts
                : type === "complex"
                ? complexProducts
                : products
            }
            columns={type === "solo" ? prdouctSoloColumns : prdouctColumns}
            loading={
              type === "solo"
                ? soloLoading
                : type === "complex"
                ? complexLoading
                : loading
            }
          />
          <div
            className="flex items-center justify-center font-bold "
            style={{ fontSize: 16, textDecoration: "underline" }}
          >
            ПО ПРОДУКТАМ
          </div>
        </div>
      </div>
      <AddFullProductDataModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={
          type === "solo"
            ? reFetchSoloProducts
            : type === "complex"
            ? reFetchComplexProducts
            : reFetchProducts
        }
      />
    </div>
  );
};
