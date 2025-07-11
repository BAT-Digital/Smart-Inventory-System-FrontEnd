import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import plus from "../assets/icons/+.png";
import plusCard from "../assets/icons/plus.png";
import backArrowCard from "../assets/icons/backArrowCard.png";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

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
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };
  return (
    <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
      <Input.Search
        placeholder="Search"
        allowClear
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
      <div className="flex items-center">
        <button className="cursor-pointer" onClick={onScan}>
          <img src={plusCard} alt="" className="h-10 w-auto px-2" />
        </button>
        <Button
          type="primary"
          size="large"
          onClick={onScan}
          style={{ backgroundColor: "#FFF3B0", color: "#1E1E1E" }}
        >
          Scan item
        </Button>
      </div>
    </div>
  );
};

interface SalesHistoryTableActionsProps {
  onSearch: (from: string | null, to: string | null) => void;
  total: number;
}

export const SalesHistoryTableActions: React.FC<
  SalesHistoryTableActionsProps
> = ({ onSearch, total }) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const handleFromDateChange = (date: Dayjs | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Dayjs | null) => {
    setToDate(date);
  };

  const handleSearch = () => {
    const from = fromDate ? fromDate.format("YYYY-MM-DD") : null;
    const to = toDate ? toDate.format("YYYY-MM-DD") : null;
    onSearch(from, to);
  };

  return (
    <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
      <div className="flex gap-2 flex-wrap items-center">
        <DatePicker
          placeholder="From Date"
          value={fromDate}
          onChange={handleFromDateChange}
          style={{ width: 150 }}
        />
        <DatePicker
          placeholder="To Date"
          value={toDate}
          onChange={handleToDateChange}
          style={{ width: 150 }}
        />
        <div>
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#FFF3B0",
              color: "#1E1E1E",
            }}
            onClick={handleSearch}
          >
            Filter
          </Button>
        </div>
      </div>
      <div className="flex items-center pr-1">
        <div className="text-lg font-semibold text-black">
          Revenue: ₸{total}
        </div>
      </div>
    </div>
  );
};

export const WriteOffTableActions: React.FC<TableActionsProps> = ({
  onSearch,
  onScan,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };
  return (
    <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
      <Input.Search
        placeholder="Search"
        allowClear
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
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

export const AccountingTableActions: React.FC<TableActionsProps> = ({
  onSearch,
  onScan,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
      <div className="flex items-center">
        <button className="group cursor-pointer" onClick={() => navigate(-1)}>
          <img
            src={backArrowCard}
            alt=""
            className="h-10 w-auto px-2 transition-transform duration-200 group-hover:scale-110"
          />
        </button>
        <Input.Search
          placeholder="Поиск"
          allowClear
          value={searchValue}
          onChange={handleChange}
          onSearch={handleSearch}
          style={{ width: 200 }}
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
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
      <div className="flex items-center">
        <button className="group cursor-pointer" onClick={() => navigate(-1)}>
          <img
            src={backArrowCard}
            alt=""
            className="h-10 w-auto px-2 transition-transform duration-200 group-hover:scale-110"
          />
        </button>
        <Input.Search
          placeholder="Search"
          allowClear
          value={searchValue}
          onChange={handleChange}
          onSearch={handleSearch}
          style={{ width: 200 }}
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
            Barcode
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
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
      <div className="flex items-center">
        <button className="group cursor-pointer" onClick={() => navigate(-1)}>
          <img
            src={backArrowCard}
            alt=""
            className="h-10 w-auto px-2 transition-transform duration-200 group-hover:scale-110"
          />
        </button>
        <Input.Search
          placeholder="Search"
          allowClear
          value={searchValue}
          onChange={handleChange}
          onSearch={handleSearch}
          style={{ width: 200 }}
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
