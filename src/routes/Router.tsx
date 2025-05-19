import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Arrival } from "../pages/Arrival";
import { Sales } from "../pages/Sales";
import { SalesItem } from "../pages/SalesItem";
import { Accounting } from "../pages/Accounting";
import { AccountingCategories } from "../pages/AccountingCategories";
import { AccountingProducts } from "../pages/AccountingProducts";
import { AccountingInUse } from "../pages/AccountingInUse";
import { AccountingCategoriesProducts } from "../pages/AccountingCategoriesProducts";
import { Dashboard } from "../pages/Dashboard";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { WriteOff } from "../pages/WriteOff";
import BarcodeDisplay from "../pages/BarcodeDisplay";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/barcode-test" element={<BarcodeDisplay />} />
        <Route path="/" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route
          path="/accounting_categories"
          element={<AccountingCategories type="category" />}
        />
        <Route
          path="/accounting_suppliers"
          element={<AccountingCategories type="supplier" />}
        />
        <Route
          path="/accounting_categories_products"
          element={<AccountingCategoriesProducts />}
        />
        <Route
          path="/accounting_products"
          element={<AccountingProducts type="all" />}
        />
        <Route
          path="/accounting_solo_products"
          element={<AccountingProducts type="solo" />}
        />
        <Route
          path="/accounting_complex_products"
          element={<AccountingProducts type="complex" />}
        />
        <Route path="/accounting_in_use" element={<AccountingInUse />} />
        <Route path="/arrival" element={<Arrival />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/write-off" element={<WriteOff />} />
        <Route path="/sales_item/:transactionId" element={<SalesItem />} />
      </Routes>
    </Router>
  );
}
