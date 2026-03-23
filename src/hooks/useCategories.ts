import { useState } from "react";
import axios from "axios";
import type { CategoryInfo } from "../types/data";


export type Category = CategoryInfo;


export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, fetchCategories };
};