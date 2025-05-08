import { Card, Table } from "antd";
import edit from "../assets/icons/edit.png";
import backArrow from "../assets/icons/backArrow.png";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  number: number;
  name: string;
  quantity: number;
  price: number;
}

const dataSource: DataType[] = [
  { key: "1", number: 1, name: "Item A", quantity: 2, price: 100 },
  { key: "2", number: 2, name: "Item B", quantity: 1, price: 200 },
  { key: "3", number: 3, name: "Item C", quantity: 5, price: 50 },
  // Add more to test scrolling
];

const columns: ColumnsType<DataType> = [
  { title: "№", dataIndex: "number", key: "number", width: 50 },
  { title: "Name", dataIndex: "name", key: "name", width: 100 },
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  { title: "Price", dataIndex: "price", key: "price", width: 100 },
];

export const LeftSide = () => {
  const navigate = useNavigate();
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
        }}
        title={
          <div className="flex justify-between items-center text-base font-semibold text-white">
            <div className="flex items-center">
              <button
                className="group cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <img
                  src={backArrow}
                  alt=""
                  className="h-3 w-auto pr-3 transition-transform duration-200 group-hover:scale-110"
                />
              </button>
              <span>Имя Чека</span>
            </div>
            <img src={edit} alt="" className="h-6 w-auto " />
          </div>
        }
      >
        {/* Table Wrapper - fixed height */}
        <div className="flex-[8] max-h-[490px] overflow-y-auto">
          <Table
            className="no-rounded-table"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="middle"
            bordered
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 0,
            }}
          />
        </div>

        {/* Bottom Price */}
        <div className="flex-[2] p-4 border-t flex justify-end bg-[#335C67]">
          <div className="text-lg font-semibold text-white">Итого: 550 ₸</div>
        </div>
      </Card>
    </div>
  );
};
