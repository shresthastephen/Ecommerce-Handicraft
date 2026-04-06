import { useState, useMemo, useCallback } from "react";
import type { Stock } from "../types/data";
import API from "../routes/api";

export const useStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.get("/stocks");
      setStocks(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch stocks");
    } finally {
      setLoading(false);
    }
  }, []);

  const bestSellers = useMemo(
    () => stocks.filter((s) => s.is_bestseller),
    [stocks],
  );

  const newArrivals = useMemo(
    () => stocks.filter((s) => s.is_newarrival),
    [stocks],
  );

  return { stocks, bestSellers, newArrivals, loading, error, fetchStocks };
};
