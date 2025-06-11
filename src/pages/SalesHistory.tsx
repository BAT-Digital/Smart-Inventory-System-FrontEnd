import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { SalesHistoryTable } from "../components/Table";
import { SalesHistoryTableActions } from "../components/TableActions";
import { useState } from "react";
import { useSalesTransactionsByDate } from "../hooks/useSalesTransactions";

export const SalesHistory = () => {
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const { salesTransactions, total, loading } = useSalesTransactionsByDate(
    fromDate,
    toDate
  );

  const handleDateSearch = (from: string | null, to: string | null) => {
    setFromDate(from);
    setToDate(to);
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
            <SalesHistoryTableActions
              onSearch={handleDateSearch}
              total={total}
            />
          </div>
          <SalesHistoryTable
            salesTransactions={salesTransactions}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
