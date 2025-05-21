import { Card, Button, message, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  ForcastProduct,
  ForecastResponse,
  ForecastService,
} from "../hooks/useDashboardApi";

export const DashboardCardGrid = () => {
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchLatestForecast = async () => {
    try {
      setLoading(true);
      const data = await ForecastService.getLatestForecast();
      setForecastData(data);
      setIsInitialLoad(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const refreshForecast = async () => {
    try {
      setLoading(true);
      const data = await ForecastService.generateNewForecast();
      setForecastData(data);
      message.success("Forecast updated successfully");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLatestForecast();
  }, []);

  if (isInitialLoad) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <Button
          type="text"
          className="col-span-1 min-h-full text-lg font-semibold text-black w-full"
          style={{
            backgroundColor: "#FFF3B0",
            color: "#1E1E1E",
            fontSize: "22px",
          }}
          onClick={refreshForecast}
          loading={loading}
        >
          {loading ? "Generating Forecast..." : "Download Statistics"}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Button
        type="text"
        className="col-span-1 min-h-full text-lg font-semibold text-black w-full"
        style={{
          backgroundColor: "#FFF3B0",
          color: "#1E1E1E",
          fontSize: "22px",
        }}
        onClick={refreshForecast}
        loading={loading}
      >
        {loading ? "Generating Forecast..." : "Download Statistics"}
      </Button>

      {forecastData?.topProducts?.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          loading={loading}
        />
      ))}

      <SupplierCard products={forecastData?.topProducts} loading={loading} />
      <CategoryCard products={forecastData?.topProducts} loading={loading} />
    </div>
  );
};

const ProductCard = ({
  product,
  loading,
}: {
  product: ForcastProduct;
  loading: boolean;
}) => (
  <Card
    className="col-span-1"
    title={
      <div className="flex justify-between items-center">
        <span>{product.productName}</span>
        <Tag color="blue">{product.categoryName}</Tag>
      </div>
    }
    bordered={false}
    loading={loading}
  >
    <div className="space-y-2">
      <div>
        <strong>Forecast:</strong> {product.forecasted_sales.toFixed(1)} units
      </div>
      <div>
        <strong>Peak:</strong> {new Date(product.peak_day).toLocaleDateString()}{" "}
        ({product.peak_value.toFixed(1)} units)
      </div>
      <div>
        <strong>Stock:</strong> {product.currentStock}
        {product.restockNeeded > 0 && (
          <span className="text-red-500 ml-2">
            ‼️ Restock {product.restockNeeded.toFixed(1)} units
          </span>
        )}
      </div>
    </div>
  </Card>
);

const SupplierCard = ({
  products,
  loading,
}: {
  products?: ForcastProduct[];
  loading: boolean;
}) => (
  <Card
    className="col-span-1"
    title="Top Suppliers"
    bordered={false}
    loading={loading}
  >
    {products && (
      <ul className="list-disc pl-4">
        {ForecastService.getTopSuppliers(products).map((supplier) => (
          <li key={supplier}>{supplier}</li>
        ))}
      </ul>
    )}
  </Card>
);

const CategoryCard = ({
  products,
  loading,
}: {
  products?: ForcastProduct[];
  loading: boolean;
}) => (
  <Card
    className="col-span-1"
    title="Top Categories"
    bordered={false}
    loading={loading}
  >
    {products && (
      <ul className="list-disc pl-4">
        {ForecastService.getTopCategories(products).map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    )}
  </Card>
);
