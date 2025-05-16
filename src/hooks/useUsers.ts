// hooks/useBatchArrivals.ts
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { User } from "../types/User";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await axios.get<User[]>("/users").then((res) => {
        setUsers(res.data);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { users, loading, refetch: fetchData };
};
