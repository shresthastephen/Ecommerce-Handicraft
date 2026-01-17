import { X, Heart, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export function Wishlist() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = (item: (typeof items)[0]) => {
    addToCart(item.product);
    removeItem(item.product.id);
    toast.success("Added to cart!");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeWishlist}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[400px] lg:w-[25%] min-w-[320px] bg-white shadow-xl z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist ({items.length})
          </h2>

          <button
            onClick={closeWishlist}
            className="p-2 rounded-md"
            aria-label="Close wishlist"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Heart className="h-16 w-16 mb-4" />
              <h3 className="font-medium mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-sm mb-4">
                Save items you love for later
              </p>

              <Link
                to="/shops"
                onClick={closeWishlist}
                className="inline-flex items-center justify-center rounded-md bg-gold-gradient px-4 py-2 "
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-lg"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={closeWishlist}
                    className="shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={closeWishlist}
                    >
                      <h4 className="font-medium text-sm truncate">
                        {item.product.name}
                      </h4>
                    </Link>

                    <div className="flex items-center gap-2 mt-1">
                      <span className=" font-semibold text-sm">
                        ₹{item.product.price.toLocaleString()}
                      </span>
                      <span className="text-xs line-through">
                        ₹{item.product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      {/* Add to cart */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-border px-3 py-1.5 "
                      >
                        <ShoppingBag className="h-3 w-3" />
                        Add to Cart
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="h-8 w-8 flex items-center justify-center rounded-md text-red hover:bg-red/10"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
