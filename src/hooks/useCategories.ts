

// import { useEffect, useState } from "react";

// export interface Category {
//   id: string;
//   name: string;
// }

// export const useCategories = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/products/categories/all")
//     // fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
 
//     const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
//   console.log('API URL:', apiUrl);

//   fetch(`${apiUrl}/products`)
//     .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return { categories, loading };
// };



import { useEffect, useState } from "react";

export interface Category {
  id: string;
  name: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    console.log('API URL:', apiUrl);

    // Fetch categories from the correct endpoint
    fetch(`${apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);  // Set loading false in case of error
      });
  }, []);  // Empty dependency array ensures this effect runs once on mount

  return { categories, loading };
};