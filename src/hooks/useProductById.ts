import { useState, useCallback, useEffect } from "react";
import type { Product } from "../types/data";
import API from "../routes/api";

export const useProduct = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductById = useCallback(async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await API.get(`/products/${productId}`);
      setProduct(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch product");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  return { product, loading, error, fetchProductById };
};
