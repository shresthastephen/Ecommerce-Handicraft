import { useState, useEffect } from "react";
import axios from "axios";
import  type { Stock } from "../types/data";

const API_URL = "http://localhost:8000/api/stocks";

export const useStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [bestSellers, setBestSellers] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      setStocks(res.data);

      const best = res.data.filter((s: Stock) => s.is_bestseller);
      setBestSellers(best);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch stocks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return {
    stocks,
    bestSellers, 
    loading,
    error,
    fetchStocks,
  };
};