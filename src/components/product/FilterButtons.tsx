import type { FilterType } from "../product/FilterSidebar";

type FilterButtonsProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

export function FilterButtons({
  activeFilter,
  onFilterChange,
  hasActiveFilters,
  onClearFilters,
}: FilterButtonsProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Best Sellers", value: "top" },
    { label: "New Arrivals", value: "new" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition
            ${
              activeFilter === filter.value
                ? "bg-yellow-500 text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {filter.label}
        </button>
      ))}

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className={` px-4 py-2 rounded-md text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200`}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
