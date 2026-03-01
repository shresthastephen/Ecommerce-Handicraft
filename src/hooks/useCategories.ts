import { useEffect, useState } from "react";

export interface Category {
  id: string;
  name: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/categories/all")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { categories, loading };
};

// import { useEffect, useState } from "react";

// export interface Category {
//   id: string;
//   name: string;
// }

// export const useCategories = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
//     console.log('API URL:', apiUrl);

//     fetch(`${apiUrl}/products`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, []);

//   return { categories, loading };
// };
