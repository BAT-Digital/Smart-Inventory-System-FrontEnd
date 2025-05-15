import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { WriteOffTable } from "../components/Table";
import { TableActions } from "../components/TableActions";
import { useState } from "react";
import { useWriteOff } from "../hooks/useWriteOff";
import { AddWriteOffModal } from "../components/AddWriteOff";

export const WriteOff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    writeOffs,
    loading,
    refetch: reFetchWriteOffs,
  } = useWriteOff(searchTerm);

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
          <WriteOffTable writeOffs={writeOffs} loading={loading} />
        </div>
      </div>
      <AddWriteOffModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={reFetchWriteOffs}
      />
    </div>
  );
};
