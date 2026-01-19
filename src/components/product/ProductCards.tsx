export function ProductCards() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse">
      {/* Image */}
      <div className="aspect-square w-full bg-gray-200" />

      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-200 rounded" />

        {/* Price */}
        <div className="h-3 w-1/4 bg-gray-200 rounded" />

        {/* Tags / buttons */}
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
