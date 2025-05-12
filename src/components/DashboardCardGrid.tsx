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
            <span>Оборот</span>
            <Select defaultValue="день" style={{ width: 100 }} size="small">
              <Option value="день">день</Option>
              <Option value="неделя">неделя</Option>
              <Option value="месяц">месяц</Option>
              <Option value="полгода">полгода</Option>
              <Option value="год">год</Option>
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
        Скачать общую статистику
      </Button>

      {/* Топ продаваемых продуктов */}
      <Card
        className="col-span-1 row-span-2"
        title="Топ продаваемых продуктов:"
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
            <span>Заработок</span>
            <Select defaultValue="день" style={{ width: 100 }} size="small">
              <Option value="день">день</Option>
              <Option value="неделя">неделя</Option>
              <Option value="месяц">месяц</Option>
              <Option value="полгода">полгода</Option>
              <Option value="год">год</Option>
            </Select>
          </div>
        }
        bordered={false}
      ></Card>

      {/* Крайние 3 дня */}
      <Card className="col-span-1" title="Крайние 3 дня:" bordered={false}>
        {/* Insert bar chart or graph here */}
        <div className="h-24 bg-gray-200 rounded"></div>
      </Card>

      {/* Рекомендуется приобрести */}
      <Card
        className="col-span-1"
        title="Рекомендуется приобрести:"
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
        title="Возможная дата будущей поставки:"
        bordered={false}
      >
        {/* Content */}
        <div className="h-24 bg-gray-200 rounded"></div>
      </Card>

      {/* Топ продаваемых категорий */}
      <Card
        className="col-span-1"
        title="Топ продаваемых категорий:"
        bordered={false}
      >
        {/* Content */}
        <div className="h-24 bg-gray-200 rounded"></div>
      </Card>
    </div>
  );
};
