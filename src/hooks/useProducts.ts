import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "../types/data";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:8000/api/products";  
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Product[]>(API_URL);
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();  
  }, []);

  return { products, loading, error, fetchProducts: () => { 
    setLoading(true);
    setError(null);
    axios.get<Product[]>(API_URL)
      .then(response => setProducts(response.data))
      .catch(err => setError(err.message || "Failed to fetch products"))
      .finally(() => setLoading(false));
  }
  };
};