import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import { useProducts } from "../hooks/useProducts";
import { useStocks } from "../hooks/useStocks";
import { ProductCard } from "../components/product/ProductCard";
import { ProductCards } from "../components/product/ProductCards";
import {
  FilterSidebar,
  type FilterType,
  type SortType,
} from "../components/product/FilterSidebar";
import { FilterButtons } from "../components/product/FilterButtons";

function extractSize(dimensions: string): number {
  const match = dimensions?.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function extractWeight(weight: string): number {
  const match = weight?.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export default function Shops() {
  const { products, fetchProducts, loading } = useProducts();
  const { bestSellers, newArrivals, fetchStocks } = useStocks();
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const initialFilter = (searchParams.get("filter") as FilterType) || "all";
  const initialSearch = searchParams.get("search") || "";

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<SortType>("none");

  useEffect(() => {
    fetchProducts();
    fetchStocks();
  }, [fetchProducts, fetchStocks]);

  const maxPrice = useMemo(
    () => (products.length ? Math.max(...products.map((p) => p.price)) : 0),
    [products],
  );

  const maxSize = useMemo(
    () =>
      products.length
        ? Math.max(...products.map((p) => extractSize(p.dimensions)))
        : 0,
    [products],
  );

  const maxWeight = useMemo(
    () =>
      products.length
        ? Math.max(...products.map((p) => extractWeight(p.weight)))
        : 0,
    [products],
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, maxSize]);
  const [weightRange, setWeightRange] = useState<[number, number]>([
    0,
    maxWeight,
  ]);

  useMemo(() => {
    setPriceRange([0, maxPrice]);
    setSizeRange([0, maxSize]);
    setWeightRange([0, maxWeight]);
  }, [maxPrice, maxSize, maxWeight]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeFilter === "top") {
      const bestSellerIds = bestSellers.map((s) => String(s.product_id));
      result = result.filter((p) =>
        bestSellerIds.includes(String(p.product_id)),
      );
    } else if (activeFilter === "new") {
      const newArrivalIds = newArrivals.map((s) => String(s.product_id));
      result = result.filter((p) =>
        newArrivalIds.includes(String(p.product_id)),
      );
    }

    if (categoryParam) {
      result = result.filter((p) => String(p.category_id) === categoryParam);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category_name.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query),
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    result = result.filter((p) => {
      const size = extractSize(p.dimensions);
      return size >= sizeRange[0] && size <= sizeRange[1];
    });

    result = result.filter((p) => {
      const weight = extractWeight(p.weight);
      return weight >= weightRange[0] && weight <= weightRange[1];
    });

    // Sort
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    products,
    activeFilter,
    searchQuery,
    priceRange,
    sizeRange,
    weightRange,
    sortOrder,
    categoryParam,
    bestSellers,
    newArrivals,
  ]);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="sticky top-16 md:top-20 z-40 bg-white py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold shrink-0">
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

        {/* Mobile filters btn */}
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className={`
            md:hidden rounded-md px-4 py-2 text-sm font-medium mt-4 transition-colors duration-200
            ${showMobileFilters ? "bg-yellow-500 text-black" : "bg-gray-100 text-black"}
          `}
        >
          Filters
        </button>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-8 py-6">
          <div
            className={`
              ${showMobileFilters ? "block" : "hidden"} 
              md:block md:sticky md:top-44 md:self-start
            `}
          >
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
            {loading ? (
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
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
