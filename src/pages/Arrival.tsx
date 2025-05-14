import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { ReceiptTable } from "../components/Table";
import { TableActions } from "../components/TableActions";
import { useState } from "react";
import { AddDataModal } from "../components/AddDataModal";
import { useBatchArrivalsSearch } from "../hooks/useBatchArrivals";

export const Arrival = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    loading,
    refetch: reFetchBatchArrivals,
  } = useBatchArrivalsSearch(searchTerm);

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
            <TableActions onSearch={handleSearch} onScan={handleScan} />
          </div>
          <ReceiptTable data={data} loading={loading} />
        </div>
      </div>
      <AddDataModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={reFetchBatchArrivals}
      />
    </div>
  );
};
