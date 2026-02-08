import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export function Cart() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
    
      <div
        className="fixed inset-0 bg-black/50 z-50 "
        onClick={closeCart}
      />
      
      <div className="fixed right-0 top-0 h-full w-full md:w-[400px] lg:w-[25%] min-w-[320px] bg-white shadow-xl z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({items.length})
          </h2>

          <button
            onClick={closeCart}
            className="p-2 rounded-md "
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <h3 className="font-medium mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm  mb-4">
                Discover our collection of divine statues
              </p>

              <Link
                to="/shops"
                onClick={closeCart}
                className="inline-flex items-center justify-center rounded-md bg-gold-gradient px-4 py-2"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3  rounded-lg"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={closeCart}
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
                      onClick={closeCart}
                    >
                      <h4 className="font-medium text-sm truncate ">
                        {item.product.name}
                      </h4>
                    </Link>

                    <p className=" font-semibold text-sm mt-1">
                      ₹{item.product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      {/* Quantity */}
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="h-7 w-7 flex items-center justify-center rounded-l-md"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="h-7 w-7 flex items-center justify-center rounded-r-md "
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="h-7 w-7 flex items-center justify-center rounded-md text-red hover:bg-red/10"
                        aria-label="Remove item"
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span className="text-primary">
                NPR{subtotal.toLocaleString()}
              </span>
            </div>

            <p className="text-xs">
              Shipping and taxes calculated at checkout
            </p>

            <button
              onClick={closeCart}
              className="w-full rounded-md  px-4 py-3 text-lg font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
