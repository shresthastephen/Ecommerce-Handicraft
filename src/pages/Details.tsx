import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { useCategories } from "../hooks/useCategories";
import { useProduct } from "../hooks/useProductById";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";
import { cn } from "../libs/utils";
import { ProductCard } from "../components/product/ProductCard";

function UIButton({
  children,
  className = "",
  variant = "default",
  size = "md",
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "md" | "lg" | "icon";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-black text-black",
    outline: "border border-border hover:bg-accent",
    ghost: "hover:bg-accent",
  };

  const sizes = {
    md: "h-10 px-4",
    lg: "h-11 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

function UISkeleton({ className = "" }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { addItem: addToCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const { productId } = useParams();
  const { product, loading } = useProduct(productId);
  const { categories } = useCategories();
  const {
    products: allProducts,
    fetchProducts,
    loading: productsLoading,
  } = useProducts();

  const capitalize = (str: string | number) =>
    String(str)
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const inStock = product ? product.quantity > 0 : false;
  const isWishlisted = product ? isInWishlist(product.product_id) : false;
  const category = product
    ? categories.find((c) => c.category_id === product.category_id)
    : null;

  const relatedItems = useMemo(() => {
    if (!product) return [];

    return allProducts.filter(
      (item) =>
        item.category_id === product.category_id &&
        item.product_id !== product.product_id,
    );
  }, [allProducts, product]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleItem(product);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
    console.log(product);
  };

  if (!product && !loading) {
    return (
      <main className="min-h-screen py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
        <Link to="/shops" className="text-black hover:underline">
          Browse all products
        </Link>
      </main>
    );
  }

  const discount =
    product && product.original_price > 0
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100,
        )
      : 0;

  return (
    <main className="mb-4 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-base text-muted-foreground mb-6 flex-wrap">
          <Link to="/">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shops">Shops</Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link to={`/shops?category=${category.category_id}`}>
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate">
            {capitalize(product?.name ?? "")}
          </span>
        </nav>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <UISkeleton className="aspect-square w-full rounded-lg" />
              <div className="flex gap-2">
                {[1, 2].map((i) => (
                  <UISkeleton key={i} className="w-20 h-20 rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <UISkeleton className="h-8 w-3/4" />
              <UISkeleton className="h-4 w-1/4" />
              <UISkeleton className="h-6 w-1/3" />
              <UISkeleton className="h-24 w-full" />
              <UISkeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          product && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {/* <div className="grid md:grid-cols-2 gap-8 lg:gap-12"> */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Main Image */}
                  <div className="space-y-4 order-1 md:order-1">
                    <div className="aspect-[2/2.5] rounded-lg overflow-hidden bg-muted">
                      <img
                        src={`http://localhost:8000${
                          product?.images?.[activeImage] || product?.images?.[0]
                        }`}
                        alt={product?.name ?? "Product Image"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Related Images for small screens only */}
                    {product.images.length > 1 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto md:hidden">
                        {product.images.map((img: string, index: number) => (
                          <img
                            key={index}
                            src={`http://localhost:8000${img.trim()}`}
                            alt={`${product.name} - ${index + 1}`}
                            className={cn(
                              "w-20 h-20 object-cover rounded cursor-pointer flex-shrink-0 border-2",
                              activeImage === index
                                ? "border-yellow-500"
                                : "border-transparent hover:border-gray-300",
                            )}
                            onClick={() => setActiveImage(index)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="space-y-4 order-2 md:order-2">
                    <h1 className="text-2xl md:text-4xl font-sans mb-2">
                      {capitalize(product.name)}
                    </h1>
                    <p className="text-base text-muted-foreground mb-4">
                      <span className="capitalize">{product.material}</span> •{" "}
                      {product.sku}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-yellow-500">
                        NPR {product.price.toLocaleString()}
                      </span>
                      {product.original_price > product.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          NPR {product.original_price.toLocaleString()}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="px-2 py-1 text-sm font-semibold bg-gold-gradient text-black rounded">
                          Save {discount}%
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-2 whitespace-pre-wrap">
                      {product.description}
                    </p>

                    {/* Product details */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
                      <div>
                        <span className="text-base text-muted-foreground">
                          Dimensions (HxLxW inch)
                        </span>
                        <p className="text-lg font-bold">
                          {product.dimensions}
                        </p>
                      </div>
                      <div>
                        <span className="text-base text-muted-foreground">
                          Weight (kg)
                        </span>
                        <p className="text-lg font-bold">{product.weight}</p>
                      </div>
                      <div>
                        <span className="text-base text-muted-foreground">
                          Material
                        </span>
                        <p className="text-lg font-bold capitalize">
                          {product.material}
                        </p>
                      </div>
                      <div>
                        <span className="text-base text-muted-foreground">
                          Availability
                        </span>
                        <p className="text-lg font-bold">
                          {inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                    </div>

                    {/* Quantity and Action buttons */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-base font-medium">Quantity:</span>
                      <div className="flex items-center border-2 border-grey rounded-md">
                        <UIButton
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </UIButton>

                        <span className="w-12 text-center">{quantity}</span>

                        <UIButton
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity((q) => q + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </UIButton>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-4">
                      <UIButton
                        variant="outline"
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className="gap-2 border-2 border-yellow-500"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        Add to Cart
                      </UIButton>

                      <UIButton
                        variant="outline"
                        size="lg"
                        onClick={handleWishlistToggle}
                        className={cn(
                          "gap-2 border-2 border-yellow-500",
                          isWishlisted && "text-black",
                        )}
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5",
                            isWishlisted && "fill-current text-yellow-500",
                          )}
                        />
                        {isWishlisted ? "Saved" : "Save"}
                      </UIButton>
                    </div>

                    {/* Related images for md+ screens */}
                    {product.images.length > 1 && (
                      <section className="hidden md:block mt-8">
                        <h2 className="text-xl md:text-2xl font-semibold mb-2">
                          Related Images
                        </h2>
                        <div className="flex gap-2">
                          {product.images.map((img: string, index: number) => (
                            <img
                              key={index}
                              src={`http://localhost:8000${img.trim()}`}
                              alt={`${product.name} - ${index + 1}`}
                              className={cn(
                                "w-20 h-20 object-cover rounded cursor-pointer border-2",
                                activeImage === index
                                  ? "border-yellow-500"
                                  : "border-transparent hover:border-gray-300",
                              )}
                              onClick={() => setActiveImage(index)}
                            />
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
              {/* related Items */}
              <section className="lg:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Related Items</h2>

                  {productsLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-40 bg-gray-100 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  ) : relatedItems.length > 0 ? (
                    <div className="space-y-4">
                      {relatedItems.slice(0, 3).map((item) => (
                        // <ProductCard key={item.product_id} product={item} />
                        <Link
                          key={item.product_id}
                          to={`/product/${item.product_id}`}
                          className="group flex gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-yellow-500 hover:shadow-lg"
                        >
                          {/* Product Image */}
                          <div className="w-24 h-24 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                            <img
                              src={`http://localhost:8000${item.images[0]}`}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                {capitalize(item.name)}
                              </h3>

                              <p className="mt-1 text-xs text-gray-500 capitalize">
                                {item.material}
                              </p>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-base font-bold text-yellow-600">
                                NPR {item.price.toLocaleString()}
                              </span>

                              {item.original_price > item.price && (
                                <span className="rounded bg-gold-gradient px-2 py-0.5 text-[10px] font-semibold">
                                  -
                                  {Math.round(
                                    ((item.original_price - item.price) /
                                      item.original_price) *
                                      100,
                                  )}
                                  %
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No related items found.
                    </p>
                  )}
                </div>
              </section>
            </div>
          )
        )}

        {!loading && product && (
          <section className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Related Items</h2>
              {category && (
                <p className="text-sm text-muted-foreground">
                  More from {category.name}
                </p>
              )}
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-56 rounded-lg border border-gray-200 bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : relatedItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedItems.slice(0, 4).map((item) => (
                  <ProductCard key={item.product_id} product={item} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No related items found in this category.
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
