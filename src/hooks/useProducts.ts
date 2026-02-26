// import { useEffect, useState } from "react";
// import type { Product } from "../types/product";
// import { productImages } from "../mockdata/products";

// export const useProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);

//     // fetch("http://localhost:8000/api/products")
//     // fetch(`${import.meta.env.VITE_API_URL}/api/products`)

// const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
//   console.log('API URL:', apiUrl);

//   fetch(`${apiUrl}/api/products`)
//     .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch products");
//         return res.json();
//       })
//       .then((data) => {
//         const productsWithImages = data.map((product: Product) => ({
//           ...product,
//           images:
//             productImages[
//               product.category as keyof typeof productImages
//             ] || [],
//         }));

//         setProducts(productsWithImages);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   return { products, loading, error };
// };




import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { productImages } from "../mockdata/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Get the API URL from environment variables or fallback to localhost for development
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    console.log('API URL:', apiUrl);

    // Fetch products with async/await
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/products`);

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // Add product images based on category
        const productsWithImages = data.map((product: Product) => ({
          ...product,
          images: productImages[product.category as keyof typeof productImages] || [],
        }));

        setProducts(productsWithImages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();

    return () => {};

  }, []); 

  return { products, loading, error };
};