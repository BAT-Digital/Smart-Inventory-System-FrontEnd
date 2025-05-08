import { Card } from "antd";
import { Link } from "react-router-dom";

interface AccountingCategoriesCardGrid {
  categories: string[];
  type: String;
}

const COLORS = [
  "#EBA1A1",
  "#EBBEA1",
  "#A1B1EB",
  "#EBD3A1",
  "#EBA1AE",
  "#E8A1EB",
];
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const AccountingCategoriesCardGrid: React.FC<
  AccountingCategoriesCardGrid
> = ({ categories, type }) => {
  return (
    <div className="max-h-[520px] overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Link
            to="/accounting_categories_products"
            state={{ name: category, type: type }}
          >
            <Card
              key={index}
              className="flex min-h-60 items-center justify-center text-center font-semibold"
              style={{
                backgroundColor: getRandomColor(),
                color: "#FFFFFF",
                borderRadius: "0.8rem",
                height: "100px",
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                border: "25px solid #FFFFFF",
                fontSize: 20,
              }}
              hoverable
            >
              <div>{category}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
