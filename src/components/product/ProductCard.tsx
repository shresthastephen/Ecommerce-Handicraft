import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Product } from "../../types/product";
import { useWishlist } from "../../context/WishlistContext";
import { cn } from "../../libs/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleWishlistClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();   // prevents Link navigation
    e.stopPropagation();  // prevents bubbling
    toggleItem(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover  transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold bg-gold-gradient text-white rounded">
            -{discount}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
            isWishlisted
              ? "bg-yellow-500 text-white"
              : "bg-white/80 text-black hover:bg-yellow-500 hover:text-white"
          )}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform",
              isWishlisted && "fill-current scale-110"
            )}
          />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground truncate group-hover:text-yellow-500 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-muted-foreground mt-1 capitalize">
          {product.material}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className=" text-sm md:text-lg font-semibold text-yellow-500">
            NPR {product.price.toLocaleString()}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              NPR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
