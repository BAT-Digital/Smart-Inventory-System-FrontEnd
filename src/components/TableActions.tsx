import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import plus from "../assets/icons/+.png";
import plusCard from "../assets/icons/plus.png";
import backArrowCard from "../assets/icons/backArrowCard.png";

interface TableActionsProps {
  onSearch: (value: string) => void;
  onScan: () => void;
}

interface CategoriesTableActionsProps {
  onSearch: (value: string) => void;
  onScan: () => void;
  name: String;
}

export const TableActions: React.FC<TableActionsProps> = ({
  onSearch,
  onScan,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
      <Input.Search
        placeholder="Поиск"
        onSearch={onSearch}
        style={{ width: 200 }}
        allowClear
      />
      <div className="flex items-center">
        <Link to="/arrival" onClick={onScan}>
          <img src={plusCard} alt="" className="h-10 w-auto px-2" />
        </Link>
        <Button
          type="primary"
          size="large"
          onClick={onScan}
          style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
        >
          Отсканировать товар
        </Button>
      </div>
    </div>
  );
};

export const AccountingTableActions: React.FC<TableActionsProps> = ({
  onSearch,
  onScan,
}) => {
  return (
    <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
      <div className="flex items-center">
        <Link to="/arrival">
          <img src={backArrowCard} alt="" className="h-10 w-auto px-2" />
        </Link>
        <Input.Search
          placeholder="Поиск"
          onSearch={onSearch}
          style={{ width: 200 }}
          allowClear
        />
      </div>
      <div className="flex items-center">
        <Button
          type="primary"
          onClick={onScan}
          style={{
            backgroundColor: "#FFF3B0",
            color: "#1E1E1E",
            border: "2px solid #335C67",
          }}
          size="large"
        >
          <img src={plus} alt="" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const AccountingInUseTableActions: React.FC<TableActionsProps> = ({
  onSearch,
  onScan,
}) => {
  return (
    <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
      <div className="flex items-center">
        <Link to="/arrival">
          <img src={backArrowCard} alt="" className="h-10 w-auto px-2" />
        </Link>
        <Input.Search
          placeholder="Поиск"
          onSearch={onSearch}
          style={{ width: 200 }}
          allowClear
        />
      </div>
      <div className="flex items-center">
        <div>
          <Button
            type="primary"
            onClick={onScan}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#383531",
              border: "2px solid #335C67",
            }}
            size="large"
            className="mr-2"
          >
            Баркод
          </Button>
          <Button
            type="primary"
            onClick={onScan}
            style={{
              backgroundColor: "#FFF3B0",
              color: "#1E1E1E",
              border: "2px solid #335C67",
            }}
            size="large"
          >
            <img src={plus} alt="" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AccountingCategoriesProductsTableActions: React.FC<
  CategoriesTableActionsProps
> = ({ onSearch, onScan, name }) => {
  return (
    <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
      <div className="flex items-center">
        <Link to="/arrival">
          <img src={backArrowCard} alt="" className="h-10 w-auto px-2" />
        </Link>
        <Input.Search
          placeholder="Поиск"
          onSearch={onSearch}
          style={{ width: 200 }}
          allowClear
        />
      </div>
      <div
        className="flex items-center justify-center font-bold "
        style={{ fontSize: 16, textDecoration: "underline" }}
      >
        {name}
      </div>
      <div className="flex items-center">
        <Button
          type="primary"
          onClick={onScan}
          style={{
            backgroundColor: "#FFF3B0",
            color: "#1E1E1E",
            border: "2px solid #335C67",
          }}
          size="large"
        >
          <img src={plus} alt="" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
