import { Card } from "antd";
import { Link } from "react-router-dom";

interface RightSideCardGridProps {
  categories: string[];
}

const COLORS = ["#F6E27F", "#B80000", "#F19953"];
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const RightSideCardGrid: React.FC<RightSideCardGridProps> = ({
  categories,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {categories.map((category, index) => (
        <Link to="/sales_item_product" state={{ category: category }}>
          <Card
            key={index}
            className="flex items-center justify-center text-center font-semibold"
            style={{
              backgroundColor: getRandomColor(),
              color: "#333",
              borderRadius: "0.8rem",
              height: "100px",
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            hoverable
          >
            <div>{category}</div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
