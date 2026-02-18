import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { productImages } from "../mockdata/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    // fetch("http://localhost:8000/api/products")
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const productsWithImages = data.map((product: Product) => ({
          ...product,
          images:
            productImages[
              product.category as keyof typeof productImages
            ] || [],
        }));

        setProducts(productsWithImages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};
