import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { AccountingProductTable } from "../components/Table";
import { AccountingTableActions } from "../components/TableActions";
import { useState } from "react";
import { AddFullProductDataModal } from "../components/AddProductDataModal";

interface Props {
  type: String;
}

export const AccountingProducts: React.FC<Props> = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <AccountingProductTable type={type} />
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
      />
    </div>
  );
};
