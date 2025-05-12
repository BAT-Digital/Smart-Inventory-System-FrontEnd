import { Card, Table } from "antd";
import edit from "../assets/icons/edit.png";
import backArrow from "../assets/icons/backArrow.png";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import {
  SalesItem,
  useSalesItems,
  useSalesItemsName,
} from "../hooks/useSalesItems";
import { useState } from "react";

type DataType = {
  key: number;
  number: number;
  name: string;
  quantity: number;
  price: number;
};

const columns: ColumnsType<DataType> = [
  { title: "№", dataIndex: "number", key: "number", width: 50 },
  { title: "Name", dataIndex: "name", key: "name", width: 100 },
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  { title: "Price", dataIndex: "price", key: "price", width: 100 },
];

type Props = {
  transactionId: number;
  salesItems: SalesItem[];
};

export const LeftSide: React.FC<Props> = ({ transactionId, salesItems }) => {
  const dataSource: DataType[] = salesItems.map((salesItem, index) => ({
    key: salesItem.salesItemId,
    number: index + 1,
    name: salesItem.product.productName,
    quantity: salesItem.quantity,
    price: parseInt(salesItem.product.price) * salesItem.quantity,
  }));

  const name = useSalesItemsName({ transactionId });

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
              <span>{name}</span>
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
