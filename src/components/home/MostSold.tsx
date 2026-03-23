import { useEffect, useState } from "react";
import { ProductCard } from "../product/ProductCard";
import { useStocks } from "../../hooks/useStocks";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/data";


function parseImages(images: string | string[] | null | undefined): string[] {
  if (!images) return ["/placeholder.png"];
  if (Array.isArray(images)) return images.length ? images : ["/placeholder.png"];
  if (typeof images === "string") {
    const trimmed = images.replace(/^{|}$/g, "");
    const arr = trimmed
      .split(",")
      .map((img) => img.trim())
      .filter(Boolean);
    return arr.length ? arr : ["/placeholder.png"];
  }
  return ["/placeholder.png"];
}

export function MostSold() {
  const { bestSellers, loading: stockLoading, error: stockError } = useStocks();
  const { products, loading: productsLoading, error: productsError } = useProducts();

  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!bestSellers || !products) return;

    const mapped: Product[] = bestSellers
      .map((stock) => {
        const product = products.find(
          (p) => String(p.product_id) === String(stock.product_id)
        );

        if (!product) {
          return {
            product_id: String(stock.product_id),
            sku: String(stock.product_id),
            name: `Product ${stock.product_id}`,
            description: "No description available",
            price: 0,
            original_price: 0,
            images: ["/placeholder.png"],
            category_name: "",
            material: "",
            dimensions: "",
            weight: "",
            created_at: stock.created_at,
          } as Product;
        }

        return {
          ...product,
          price: Number(product.price),
          original_price: Number(product.original_price),
          images: parseImages(product.images),
        };
      })
      .slice(0, 8); 

    setBestSellerProducts(mapped);
  }, [bestSellers, products]);


  if (productsLoading || stockLoading) {
    return (
      <section className="py-12 text-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (stockError || productsError) {
    return (
      <section className="py-12 text-center">
        <p className="text-red-500">{stockError || productsError}</p>
      </section>
    );
  }

  if (!bestSellerProducts.length) {
    return (
      <section className="py-12 text-center">
        <p>No best-seller products found.</p>
      </section>
    );
  }

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellerProducts.length ? (
            bestSellerProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <p>No best-seller products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}