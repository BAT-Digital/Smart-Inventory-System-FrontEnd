import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { AccountingProductInUseTable } from "../components/Table";
import { useState } from "react";
import { AccountingInUseTableActions } from "../components/TableActions";
import { AddProductDataModal } from "../components/AddProductDataModal";

export const AccountingInUse = () => {
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
      <div className="mt-8 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4">
          <div className="px-4">
            <AccountingInUseTableActions
              onSearch={handleSearch}
              onScan={handleScan}
            />
          </div>
          <AccountingProductInUseTable />
          <div
            className="flex items-center justify-center font-bold "
            style={{ fontSize: 16, textDecoration: "underline" }}
          >
            В ИСПОЛЬЗОВАНИИ
          </div>
        </div>
      </div>
      <AddProductDataModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
