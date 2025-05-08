// hooks/useBatchArrivals.ts
import { useEffect, useState } from "react";
import axios from "axios";

export const useBatchArrivals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/batch-arrivals")
      .then((res) => {
        const mapped = res.data.map((item: any, index: number) => ({
          key: index,
          id: item.arrivalId,
          supplier: item.supplier.name,
          notes: item.notes || "-",
          receiver: item.addedBy.username,
          time: new Date(item.arrivalDate).toLocaleString("ru-RU"),
        }));
        setData(mapped);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
