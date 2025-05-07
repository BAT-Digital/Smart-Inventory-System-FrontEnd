import { Card } from "antd";
import { Link } from "react-router-dom";

interface RightSideCardGridProps {
  categories: string[];
}

export const RightSideCardGrid: React.FC<RightSideCardGridProps> = ({
  categories,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {categories.map((category, index) => (
        <Link to="/sales_item_product">
          <Card
            key={index}
            className="flex items-center justify-center text-center font-semibold"
            style={{
              backgroundColor:
                index % 3 === 0
                  ? "#F6E27F"
                  : index % 3 === 1
                  ? "#B80000"
                  : "#F19953",
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
