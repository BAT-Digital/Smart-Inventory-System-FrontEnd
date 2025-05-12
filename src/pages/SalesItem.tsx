import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import { LeftSide } from "../components/LeftSide";
import { RightSideCategories } from "../components/RightSide/RightSideCategories";
import { useParams } from "react-router-dom";
import { useSalesItems } from "../hooks/useSalesItems";

export const SalesItem = () => {
  const { transactionId: transactionIdStr } = useParams<{
    transactionId: string;
  }>();
  const transactionId = parseInt(transactionIdStr!);

  const { salesItems, refetch: reFetchSalesItems } = useSalesItems({
    transactionId,
  });
  const handleSearch = (value: string) => {
    console.log("Searching:", value);
  };
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Navbar stays fixed-height */}
      <Navbar />

      {/* This takes the rest of the screen */}
      <div className="flex-1 flex items-stretch justify-center">
        <div className="w-full max-w-7xl flex px-4 mt-12">
          {/* Left side stretches full height */}
          <div className="w-[25%] mr-4 h-full">
            <LeftSide transactionId={transactionId} salesItems={salesItems} />
          </div>

          {/* Right side stretches full height */}
          <div className="w-[75%] ml-1 h-full">
            <RightSideCategories onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};
