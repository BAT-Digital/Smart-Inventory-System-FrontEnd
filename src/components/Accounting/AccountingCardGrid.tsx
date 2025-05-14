import { Card } from "antd";
import { Link } from "react-router-dom";

const cardData = [
  {
    id: 1,
    name: "PRODUCTS IN USE",
  },
  {
    id: 2,
    name: "BY CATEGORIES",
  },
  {
    id: 3,
    name: "ALL PRODUCTS",
  },
  {
    id: 4,
    name: "BY SUPPLIERS",
  },
  {
    id: 5,
    name: "SINGLE PRODUCTS",
  },
  {
    id: 6,
    name: "COMPLEX PRODUCTS",
  },
];

export const AccountingCardGrid: React.FC = ({}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {cardData.map((data) => (
        <Link
          to={
            data.id === 2
              ? "/accounting_categories"
              : data.id === 1
              ? "/accounting_in_use"
              : data.id === 4
              ? "/accounting_suppliers"
              : data.id === 3
              ? "/accounting_products"
              : data.id === 5
              ? "/accounting_solo_products"
              : "/accounting_complex_products"
          }
        >
          <Card
            key={data.id}
            className="flex min-h-60 items-center justify-center text-center font-semibold"
            style={{
              backgroundColor:
                data.id === 1
                  ? "#FFF3B0"
                  : data.id === 2
                  ? "#383531"
                  : data.id === 3
                  ? "#E09F3E"
                  : data.id === 4
                  ? "#9E2A2B"
                  : data.id === 5
                  ? "#FFF3B0"
                  : data.id === 6
                  ? "#FFFFFF"
                  : "#F19953",
              color:
                data.id === 2
                  ? "#FFFFFF"
                  : data.id === 3
                  ? "#FFFFFF"
                  : data.id === 4
                  ? "#FFFFFF"
                  : "#383531",
              borderRadius: "0.8rem",
              height: "100px",
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "3px solid #383531",
            }}
            hoverable
          >
            <div>{data.name}</div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
