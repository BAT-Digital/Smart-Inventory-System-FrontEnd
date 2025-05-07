import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import plus from "../assets/icons/+.png";
import CardGrid from "../components/CardGrid";
import { Button } from "antd";
import { useState } from "react";
import { AddCheckModal } from "../components/AddCheckModal";

export const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Navbar />
        <div className=" flex items-center justify-center">
          <div className="w-full max-w-6xl px-4 mt-12">
            <div className="flex flex-col pl-4 py-2">
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#FFF3B0",
                  color: "#1E1E1E",
                  border: "1px solid black",
                }}
                size="large"
              >
                <img src={plus} alt="" className="h-5 w-auto" />
              </Button>
            </div>
            <CardGrid></CardGrid>
          </div>
        </div>
      </div>

      <AddCheckModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
