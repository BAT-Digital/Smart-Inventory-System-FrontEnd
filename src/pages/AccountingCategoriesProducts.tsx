import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { AccountingCategoryProductTable } from "../components/Table";
import { AccountingCategoriesProductsTableActions } from "../components/TableActions";
import { useState } from "react";
import { AddFullProductDataModal } from "../components/AddProductDataModal";
import { useLocation } from "react-router-dom";

export const AccountingCategoriesProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { name } = location.state || { name: "Категория не указана" };
  const { type } = location.state || { type: "Категория не указана" };

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
            <AccountingCategoriesProductsTableActions
              onSearch={handleSearch}
              onScan={handleScan}
              name={name}
            />
          </div>
          <AccountingCategoryProductTable type={type} name={name} />
        </div>
      </div>
      <AddFullProductDataModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
};
