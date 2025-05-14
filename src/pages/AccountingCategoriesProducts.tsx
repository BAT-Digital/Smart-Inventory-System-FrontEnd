import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { AccountingCategoryProductTable } from "../components/Table";
import { AccountingCategoriesProductsTableActions } from "../components/TableActions";
import { useState } from "react";
import { AddFullProductDataModal } from "../components/AddProductDataModal";
import { useLocation } from "react-router-dom";
import { useCategoryProducts } from "../hooks/useProducts";

export const AccountingCategoriesProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { name } = location.state || { name: "No category" };
  const { type } = location.state || { type: "No category" };

  const { categoryProducts, categoryloading } = useCategoryProducts({
    type,
    name,
    searchTerm,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
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
          <AccountingCategoryProductTable
            categoryProducts={categoryProducts}
            categoryloading={categoryloading}
          />
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
