import { Card } from "antd";
import { useMemo } from "react";

type RightSideCardGridProps = {
  categories: string[];
  onCategorySelect: (category: string) => void;
};

const COLORS = ["#F6E27F", "#B80000", "#F19953"];

export const RightSideCardGrid: React.FC<RightSideCardGridProps> = ({
  categories,
  onCategorySelect,
}) => {
  const categoryColors = useMemo(() => {
    const colorMap: Record<string, string> = {};
    categories.forEach((category) => {
      colorMap[category] = COLORS[Math.floor(Math.random() * COLORS.length)];
    });
    return colorMap;
  }, [categories]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {categories.map((category, index) => (
        <div onClick={() => onCategorySelect(category)}>
          <Card
            key={index}
            className="flex items-center justify-center text-center font-semibold"
            style={{
              backgroundColor: "#F6E27F",
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
        </div>
      ))}
    </div>
  );
};
