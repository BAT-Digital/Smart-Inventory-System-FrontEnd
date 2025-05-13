import { Card } from "antd";
import { Link } from "react-router-dom";
import { SalesTransaction } from "../hooks/useSalesTransactions";

type Props = {
  salesTransactions: SalesTransaction[];
};

const CardGrid: React.FC<Props> = ({ salesTransactions }) => {
  return (
    <div className="max-h-[520px] overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {salesTransactions.map((salesTransaction) => (
          <Link to={`/sales_item/${salesTransaction.transactionId}`}>
            <Card
              key={salesTransaction.transactionId}
              className="h-60 shadow-md rounded-xl border border-gray-200"
              headStyle={{
                backgroundColor: "#335C67",
                padding: "12px 20px",
              }}
              title={
                <div className="flex justify-between items-center text-base font-semibold text-white">
                  <span>{salesTransaction.credentials}</span>
                  <span>{salesTransaction.transactionDate}</span>
                </div>
              }
            >
              <p>{salesTransaction.status}</p>
              <div className="absolute bottom-4 right-4 text-sm font-bold text-black">
                Total: ${salesTransaction.totalAmount}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
