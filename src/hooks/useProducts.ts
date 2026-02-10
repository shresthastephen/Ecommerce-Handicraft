import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { productImages } from "../mockdata/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then(res => res.json())
      .then(data => {
        // attach frontend images to products
        const mapped = data.map((p: Product) => ({
          ...p,
          images: productImages[p.category] || [],
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  return { products, loading };
};
