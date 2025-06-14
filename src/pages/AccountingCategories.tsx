import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import plus from "../assets/icons/+.png";
import { Button } from "antd";
import { AccountingCategoriesCardGrid } from "../components/Accounting/AccountingCategoriesCardGrid";
import { useState } from "react";
import { AddCategoryModal } from "../components/AddCategory";
import { AddSupplierModal } from "../components/AddSupplier";
import { useCategories } from "../hooks/useCategories";
import { useSuppliers } from "../hooks/useSuppliers";
import { useNavigate } from "react-router-dom";
import backArrowCard from "../assets/icons/backArrowCard.png";

interface Props {
  type: String;
}

export const AccountingCategories: React.FC<Props> = ({ type }) => {
  const { categories, refetch: refetchCategories } = useCategories();
  const { suppliers, refetch: refetchSuppliers } = useSuppliers();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const navigate = useNavigate();

  const categoryNames = categories.map((c) => c.name);
  const supplierNames = suppliers.map((c) => c.name);

  const handleCategorySubmit = () => {
    setIsCategoryModalOpen(true);
  };

  const handleSupplierySubmit = () => {
    setIsSupplierModalOpen(true);
  };

  const handleCategoryAdded = () => {
    refetchCategories();
  };

  const handleSupplierAdded = () => {
    refetchSuppliers();
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Navbar />
        <div className=" flex items-center justify-center">
          <div className="w-full max-w-6xl px-4 mt-10">
            <div className="flex pl-4 py-2">
              <button
                className="group cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <img
                  src={backArrowCard}
                  alt=""
                  className="h-10 w-auto px-2 transition-transform duration-200 group-hover:scale-110"
                />
              </button>
              <Button
                type="primary"
                onClick={
                  type === "supplier"
                    ? handleSupplierySubmit
                    : handleCategorySubmit
                }
                style={{
                  backgroundColor: "#FFF3B0",
                  color: "#1E1E1E",
                  border: "2px solid black",
                }}
                size="large"
                className="w-full"
              >
                <img src={plus} alt="" className="h-5 w-auto" />
              </Button>
            </div>
            <AccountingCategoriesCardGrid
              categories={type === "supplier" ? supplierNames : categoryNames}
              type={type}
            />

            <div
              className="flex items-center justify-center font-bold pt-2"
              style={{ fontSize: 16, textDecoration: "underline" }}
            >
              {type === "supplier" ? "BY SUPPLIERS" : "BY CATEGORIES"}
            </div>
          </div>
        </div>
      </div>

      <AddCategoryModal
        open={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSuccess={handleCategoryAdded}
      />
      <AddSupplierModal
        open={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        onSuccess={handleSupplierAdded}
      />
    </>
  );
};
