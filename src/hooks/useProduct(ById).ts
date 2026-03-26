import { useEffect, useState } from "react";
import type { Product } from "../types/data";

export const useProduct = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);

    fetch(`http://localhost:8000/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          images: data.images || [], // ✅ only API images
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  return { product, loading };
};