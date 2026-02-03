import { ArrowUpDown } from "lucide-react";
import { cn } from "../../libs/utils";
import { RangeSlider } from "./RangeSlider";

export type FilterType = "all" | "top" | "new";
export type SortType = "none" | "low-to-high" | "high-to-low";

interface FilterSidebarProps {
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

        <RangeSlider
          value={priceRange}
          max={maxPrice}
          step={100}
          onChange={onPriceRangeChange}
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>NPR {priceRange[0]}</span>
          <span>NPR {priceRange[1]}</span>
        </div>
      </div>

      {/* SIZE */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">Size (inches)</label>

        <RangeSlider
          value={sizeRange}
          max={maxSize}
          step={1}
          onChange={onSizeRangeChange}
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{sizeRange[0]}"</span>
          <span>{sizeRange[1]}"</span>
        </div>
      </div>

      {/* WEIGHT */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">Weight (kg)</label>

        <RangeSlider
          value={weightRange}
          max={maxWeight}
          step={0.1}
          onChange={onWeightRangeChange}
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{weightRange[0]} kg</span>
          <span>{weightRange[1]} kg</span>
        </div>
      </div>

      {/* SORT */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">Sort by Price</label>

        <div className="flex flex-col gap-2">
          <button
            onClick={() =>
              onSortChange(sortOrder === "low-to-high" ? "none" : "low-to-high")
            }
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm border-2 border-yellow-500",
              sortOrder === "low-to-high"
                ? "bg-yellow-500 text-black"
                : "bg-white ",
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
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm border-2 border-yellow-500",
              sortOrder === "high-to-low"
                ? "bg-yellow-500 text-black"
                : "bg-white ",
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
