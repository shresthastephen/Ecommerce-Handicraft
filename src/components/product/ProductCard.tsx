import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Product } from "../../types/data";
import { useWishlist } from "../../context/WishlistContext";
import { cn } from "../../libs/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const isWishlisted = isInWishlist(product.product_id);

  const discount =
    product.original_price > 0
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100,
        )
      : 0;

  const handleWishlistClick = () => {
    toggleItem(product);
    console.log(product);
    console.log("CARD:", product.quantity);
  };

  const capitalize = (str: string | number) =>
    String(str)
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="group relative block bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300",
          isWishlisted
            ? "bg-yellow-500 text-white"
            : "bg-white/80 text-black hover:bg-yellow-500 hover:text-white",
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all duration-300",
            isWishlisted && "fill-yellow-500 text-black scale-110",
          )}
        />
      </button>

      <Link to={`/product/${product.product_id}`}>
        {/* Image */}
        <div className="relative aspect-[3/3] overflow-hidden bg-muted">
          <img
            src={`http://localhost:8000${product?.images[0]}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {discount > 0 && (
            <span className="absolute top-3 left-3 px-3 py-1 text-sm font-semibold bg-gold-gradient text-white rounded">
              -{discount}%
            </span>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg md:text-xl text-foreground truncate group-hover:text-yellow-500 transition-colors">
            {capitalize(product.name)}
          </h3>

          <p className="text-sm md:text-base text-muted-foreground mt-1 capitalize">
            {product.material}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-base md:text-lg font-bold text-yellow-500">
              NPR {product.price.toLocaleString()}
            </span>

            {product.original_price > product.price && (
              <span className="text-sm md:text-base text-muted-foreground line-through">
                NPR {product.original_price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
