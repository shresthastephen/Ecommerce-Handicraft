// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useCategories } from "../../hooks/useCategories";
// import { useProducts } from "../../hooks/useProducts";

// export function Categories() {
//   const { categories, fetchCategories } = useCategories();
//   const { products, fetchProducts } = useProducts();

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   return (
//     <section className="my-10">
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
//           Shop by Deity
//         </h2>

//         <div className="flex flex-wrap justify-center gap-6 md:gap-10">
//           {categories.map((category) => {
//             const product = products.find(
//               (p) => p.category_name === category.name,
//             );

//             return (
//               <Link
//                 key={category.category_id}
//                 to={`/shops?category=${category.category_id}`}
//                 className="group flex flex-col items-center"
//               >
//                 <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-border hover:border-yellow-500 transition-all duration-300 group-hover:scale-105">
//                   <img
//                     src={`http://localhost:8000${product?.images[0]}`}
//                     alt={category.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <span className="mt-3 text-sm md:text-base font-medium group-hover:text-yellow-600 transition-colors">
//                   {category.name}
//                 </span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";

export function Categories() {
  const { categories, loading: catLoading, fetchCategories } = useCategories();
  const { products, loading: prodLoading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  if (catLoading || prodLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <section className="my-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Shop by Deity
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category) => {
            const product = products.find(
              (p) => p.category_name === category.name,
            );

            return (
              <Link
                key={category.category_id}
                to={`/shops?category=${category.category_id}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-border hover:border-yellow-500 transition-all duration-300 group-hover:scale-105">
                  <img
                    src={`http://localhost:8000${product?.images?.[0] ?? "/placeholder.png"}`}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="mt-3 text-sm md:text-base font-medium group-hover:text-yellow-600 transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
