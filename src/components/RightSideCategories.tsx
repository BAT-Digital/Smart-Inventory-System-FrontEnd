import { Card, Input, Button } from "antd";
import { RightSideCardGrid } from "./RightSideCardGrid";
import { useCategories } from "../hooks/useCategories";

type RightSideCategoriesProps = {
  onSearch: (value: string) => void;
  onCategorySelect: (category: string) => void;
  handleSell: () => {};
};

export const RightSideCategories: React.FC<RightSideCategoriesProps> = ({
  onSearch,
  onCategorySelect,
  handleSell,
}) => {
  const { categories } = useCategories();

  const categoryNames = categories.map((c) => c.name);

  return (
    <div className="h-full">
      <Card
        className="h-full flex flex-col"
        style={{
          backgroundColor: "#335C67",
          borderRadius: "0.8rem 0.8rem 0 0",
          display: "flex",
          flexDirection: "column",
        }}
        bodyStyle={{
          padding: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "0 0 0 0",
          overflow: "hidden",
        }}
        title={
          <div className="flex justify-between items-center text-base font-semibold text-white">
            <div className="flex items-center">
              <span>Категории</span>
            </div>
            <div>
              <Input.Search
                placeholder="Поиск"
                onSearch={onSearch}
                style={{ width: 200 }}
                allowClear
              />
            </div>
          </div>
        }
      >
        {/* Scrollable content */}
        <div className="flex-[8] overflow-y-auto max-h-[490px]">
          <RightSideCardGrid
            categories={categoryNames}
            onCategorySelect={onCategorySelect}
          />
        </div>

        {/* Footer buttons */}
        <div className="flex-[2] max-h-[490px] p-4 border-t bg-[#335C67]">
          <div className="grid grid-cols-1 max-h-[10px] gap-3 justify-items-end">
            <div className="flex">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#9E2A2B",
                  color: "white",
                  minWidth: "150px",
                  minHeight: "46px",
                }}
                size="large"
                className="mx-3"
              >
                Ложное пробитие
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#FFF3B0",
                  color: "#1E1E1E",
                  minWidth: "150px",
                  minHeight: "46px",
                }}
                size="large"
                onClick={handleSell}
              >
                Продать
              </Button>
            </div>
            <Button
              type="primary"
              style={{
                border: "2px solid white",
                color: "white",
                backgroundColor: "transparent",
                minWidth: "150px",
                minHeight: "46px",
              }}
              size="large"
            >
              Отмена
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
