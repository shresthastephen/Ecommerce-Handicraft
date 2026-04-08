import { useState, useCallback } from "react";
import type { CategoryInfo } from "../types/data";
import API from "../routes/api";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading, error, fetchCategories };
};
