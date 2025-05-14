import { Card, Input, Button } from "antd";
import { RightSideCardGrid } from "./RightSideCardGrid";
import { useNavigate } from "react-router-dom";
import { AlerModal } from "./AlertModal";
import { useState } from "react";

type RightSideCategoriesProps = {
  onSearch: (value: string) => void;
  onCategorySelect: (category: string) => void;
  handleSell: () => {};
  onDelete: () => void;
  onCancel: () => {};
  categoryNames: string[];
};

export const RightSideCategories: React.FC<RightSideCategoriesProps> = ({
  onSearch,
  onCategorySelect,
  handleSell,
  onDelete,
  onCancel,
  categoryNames,
}) => {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <>
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
                <span>Categories</span>
              </div>
              <div>
                <Input.Search
                  placeholder="Search"
                  allowClear
                  value={searchValue}
                  onChange={handleChange}
                  onSearch={handleSearch}
                  style={{ width: 200 }}
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
            <div className="grid grid-cols-1 max-h-[10px] gap-3 ">
              <div className="flex justify-between">
                <div>
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
                    onClick={onDelete}
                  >
                    Delete items
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#9E2A2B",
                      color: "white",
                      minWidth: "150px",
                      minHeight: "46px",
                    }}
                    size="large"
                    onClick={() => setAlertVisible(true)}
                  >
                    Delete Check
                  </Button>
                </div>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#FFF3B0",
                    color: "#1E1E1E",
                    minWidth: "150px",
                    minHeight: "46px",
                  }}
                  size="large"
                  className="mx-3"
                  onClick={handleSell}
                >
                  Sell
                </Button>
              </div>
              <div className="flex justify-end">
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
                  className="mx-3"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AlerModal
        visible={alertVisible}
        message={"Delete this check, ok?"}
        onReady={() => {
          // handle confirmation
          onCancel();
          setAlertVisible(false);
          navigate("/sales");
        }}
        onCancel={() => {
          // handle cancel
          setAlertVisible(false);
        }}
        showCancel={true}
      ></AlerModal>
    </>
  );
};
