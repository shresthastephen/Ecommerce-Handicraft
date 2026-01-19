import { cn } from "../../libs/utils";
import { ArrowUpDown } from "lucide-react";

export type FilterType = "all" | "top" | "new";
export type SortType = "none" | "low-to-high" | "high-to-low";

interface FilterSidebarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;

  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;

  sizeRange: [number, number];
  onSizeRangeChange: (range: [number, number]) => void;
  maxSize: number;

  weightRange: [number, number];
  onWeightRangeChange: (range: [number, number]) => void;
  maxWeight: number;

  sortOrder: SortType;
  onSortChange: (sort: SortType) => void;
}

export function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  maxPrice,
  sizeRange,
  onSizeRangeChange,
  maxSize,
  weightRange,
  onWeightRangeChange,
  maxWeight,
  sortOrder,
  onSortChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-56 shrink-0">
      <h3 className="font-semibold mb-4">Filters</h3>

      {/* PRICE */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">
          Price Range (₹)
        </label>

        <input
          type="range"
          min={0}
          max={maxPrice}
          step={100}
          value={priceRange[0]}
          onChange={(e) =>
            onPriceRangeChange([Number(e.target.value), priceRange[1]])
          }
          className="w-full"
        />

        <input
          type="range"
          min={0}
          max={maxPrice}
          step={100}
          value={priceRange[1]}
          onChange={(e) =>
            onPriceRangeChange([priceRange[0], Number(e.target.value)])
          }
          className="w-full mt-2"
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* SIZE */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">
          Size (inches)
        </label>

        <input
          type="range"
          min={0}
          max={maxSize}
          step={1}
          value={sizeRange[0]}
          onChange={(e) =>
            onSizeRangeChange([Number(e.target.value), sizeRange[1]])
          }
          className="w-full"
        />

        <input
          type="range"
          min={0}
          max={maxSize}
          step={1}
          value={sizeRange[1]}
          onChange={(e) =>
            onSizeRangeChange([sizeRange[0], Number(e.target.value)])
          }
          className="w-full mt-2"
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{sizeRange[0]}"</span>
          <span>{sizeRange[1]}"</span>
        </div>
      </div>

      {/* WEIGHT */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">
          Weight (kg)
        </label>

        <input
          type="range"
          min={0}
          max={maxWeight}
          step={0.1}
          value={weightRange[0]}
          onChange={(e) =>
            onWeightRangeChange([Number(e.target.value), weightRange[1]])
          }
          className="w-full"
        />

        <input
          type="range"
          min={0}
          max={maxWeight}
          step={0.1}
          value={weightRange[1]}
          onChange={(e) =>
            onWeightRangeChange([weightRange[0], Number(e.target.value)])
          }
          className="w-full mt-2"
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{weightRange[0]} kg</span>
          <span>{weightRange[1]} kg</span>
        </div>
      </div>

      {/* SORT */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">
          Sort by Price
        </label>

        <div className="flex flex-col gap-2">
          <button
            onClick={() =>
              onSortChange(sortOrder === "low-to-high" ? "none" : "low-to-high")
            }
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
              sortOrder === "low-to-high"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <ArrowUpDown className="h-4 w-4" />
            Low to High
          </button>

          <button
            onClick={() =>
              onSortChange(sortOrder === "high-to-low" ? "none" : "high-to-low")
            }
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
              sortOrder === "high-to-low"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <ArrowUpDown className="h-4 w-4" />
            High to Low
          </button>
        </div>
      </div>
    </aside>
  );
}
