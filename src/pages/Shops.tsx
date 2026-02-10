import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import { products } from "../mockdata/products";
import { ProductCard } from "../components/product/ProductCard";
import { ProductCards } from "../components/product/ProductCards";
import {
  FilterSidebar,
  type FilterType,
  type SortType,
} from "../components/product/FilterSidebar";
import { FilterButtons } from "../components/product/FilterButtons";

function extractSize(dimensions: string): number {
  const match = dimensions.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function extractWeight(weight: string): number {
  const match = weight.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export default function Shops() {
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");


  const initialFilter = (searchParams.get("filter") as FilterType) || "all";
  const initialSearch = searchParams.get("search") || "";

  const maxPrice = Math.max(...products.map((p) => p.price));
  const maxSize = Math.max(...products.map((p) => extractSize(p.dimensions)));
  const maxWeight = Math.max(...products.map((p) => extractWeight(p.weight)));

  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(true);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, maxSize]);
  const [weightRange, setWeightRange] = useState<[number, number]>([
    0,
    maxWeight,
  ]);
  const [sortOrder, setSortOrder] = useState<SortType>("none");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [
    activeFilter,
    searchQuery,
    priceRange,
    sizeRange,
    weightRange,
    sortOrder,
  ]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // filter
    if (activeFilter === "top") {
      result = result.filter((p) => p.isBestSeller);
    } else if (activeFilter === "new") {
      result = result.filter((p) => p.isNewArrival);
    }

    if (categoryParam) {
    result = result.filter((p) => p.category === categoryParam);
  }

    // search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query),
      );
    }

    // price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // size
    result = result.filter((p) => {
      const size = extractSize(p.dimensions);
      return size >= sizeRange[0] && size <= sizeRange[1];
    });

    // weight
    result = result.filter((p) => {
      const weight = extractWeight(p.weight);
      return weight >= weightRange[0] && weight <= weightRange[1];
    });

    // sort
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    activeFilter,
    searchQuery,
    priceRange,
    sizeRange,
    weightRange,
    sortOrder,
    categoryParam,
  ]);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div className="sticky top-16 md:top-20 z-40 bg-white py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-serif font-semibold shrink-0">
              All Products
            </h1>

            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            <div className="flex-1 hidden sm:block" />

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-black bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 py-6">
          <div className="md:sticky md:top-44 md:self-start">
            <FilterSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
              sizeRange={sizeRange}
              onSizeRangeChange={setSizeRange}
              maxSize={maxSize}
              weightRange={weightRange}
              onWeightRangeChange={setWeightRange}
              maxWeight={maxWeight}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCards key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-lg">
                No products found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
