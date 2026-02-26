// import { useEffect, useState } from "react";
// import type { Product } from "../types/product";
// import { productImages } from "../mockdata/products";

// export const useProduct = (productId?: string) => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!productId) return;

//     setLoading(true);

//     // fetch(`http://localhost:8000/api/products/${productId}`)
//     // fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)


//     const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
//   console.log('API URL:', apiUrl);

//   fetch(`${apiUrl}/api/products`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Product not found");
//         return res.json();
//       })
//       .then((data) => {
//         setProduct({
//           ...data,
//           images:
//             productImages[data.category as keyof typeof productImages] || [],
//         });
//         setLoading(false);
//       })
//       .catch(() => {
//         setProduct(null);
//         setLoading(false);
//       });
//   }, [productId]);

//   return { product, loading };
// };



import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { productImages } from "../mockdata/products";

export const useProduct = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    console.log('API URL:', apiUrl);

    // Fetch the specific product by its productId
    fetch(`${apiUrl}/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          images: productImages[data.category as keyof typeof productImages] || [],
        });
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);  // If error occurs, set product to null
        setLoading(false);
      });

  }, [productId]);  // Re-run effect when productId changes

  return { product, loading };
};