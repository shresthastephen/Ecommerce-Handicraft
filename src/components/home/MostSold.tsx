import { ProductCard } from "../product/ProductCard";
import { useProducts } from "../../hooks/useProducts";

export function MostSold() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="py-12 text-center">
        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  const bestSellers = products
    .filter((p) => p.isBestSeller)
    .slice(0, 8);

  return (
    <section className="pb-12 pt-8 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Most Sold Products
          </h2>
          <p className="text-muted-foreground">
            Our most popular divine sculptures loved by customers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 tex">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
