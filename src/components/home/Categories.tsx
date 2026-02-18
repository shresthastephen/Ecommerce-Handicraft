import { Link } from "react-router-dom";
import { categories } from "../../mockdata/products";

export function Categories() {
  return (
    <section className="my-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Shop by Deity
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shops?category=${category.id}`}
              className="group flex flex-col items-center"
            >
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-border hover:border-yellow-500 transition-all duration-300 group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-3 text-sm md:text-base font-medium  group-hover:text-yellow-600 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
