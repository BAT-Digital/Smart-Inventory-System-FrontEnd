import { Card, Button, Select, List } from "antd";
import {
  useOldestLowRemaining,
  useTopProducts,
} from "../hooks/useDashboardApi";
const { Option } = Select;

export const DashboardCardGrid = () => {
  const { topProducts } = useTopProducts();
  const { batchItems } = useOldestLowRemaining();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ">
      {/* Оборот */}
      <Card
        className="col-span-1"
        title={
          <div className="flex justify-between items-center">
            <span>Turnover</span>
            <Select defaultValue="day" style={{ width: 100 }} size="small">
              <Option value="day">day</Option>
              <Option value="week">week</Option>
              <Option value="month">month</Option>
              <Option value="half_a_year">half a year</Option>
              <Option value="year">year</Option>
            </Select>
          </div>
        }
      ></Card>

      {/* Скачать общую статистику */}
      <Button
        type="text"
        className="col-span-1 min-h-35 text-lg font-semibold text-black w-full"
        style={{
          backgroundColor: "#FFF3B0",
          color: "#1E1E1E",
          fontSize: 22,
        }}
      >
        Download statistics
      </Button>

      {/* Топ продаваемых продуктов */}
      <Card
        className="col-span-1 row-span-2"
        title="Top Selling products:"
        bordered={false}
      >
        {topProducts.map((product) => (
          <div key={product.productId}>{product.productName}</div>
        ))}
      </Card>

      {/* Заработок */}
      <Card
        className="col-span-1"
        title={
          <div className="flex justify-between items-center">
            <span>Income</span>
            <Select defaultValue="day" style={{ width: 100 }} size="small">
              <Option value="day">day</Option>
              <Option value="week">week</Option>
              <Option value="month">month</Option>
              <Option value="half_a_year">half a year</Option>
              <Option value="year">year</Option>
            </Select>
          </div>
        }
        bordered={false}
      ></Card>

      {/* Крайние 3 дня */}
      <Card className="col-span-1" title="The last 3 days:" bordered={false}>
        {/* Insert bar chart or graph here */}
        <div className="h-24 bg-gray-200 rounded"></div>
      </Card>

      {/* Рекомендуется приобрести */}
      <Card
        className="col-span-1"
        title="Recommended to purchase:"
        bordered={false}
      >
        {batchItems.map((item) => (
          <div key={item.product.productName}>
            {item.product.productName} :::::: quantity remaining:{" "}
            {item.quantityRemaining}
          </div>
        ))}
      </Card>

      {/* Возможная дата будущей поставки */}
      <Card
        className="col-span-1"
        title="Possible future delivery date:"
        bordered={false}
      >
        {/* Content */}
        <div className="h-24 bg-gray-200 rounded"></div>
      </Card>

      {/* Топ продаваемых категорий */}
      <Card
        className="col-span-1"
        title="Top Selling categories:"
        bordered={false}
      >
        {/* Content */}
        <div className="h-24 bg-gray-200 rounded"></div>
      </Card>
    </div>
  );
};
