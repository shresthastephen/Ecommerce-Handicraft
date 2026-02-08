import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { products, categories } from "../mockdata/products";
import { ProductCard } from "../components/product/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";
import { cn } from "../libs/utils";


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
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { addItem: addToCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const product = products.find((p) => p.id === productId);
  const isWishlisted = product ? isInWishlist(product.id) : false;


  const category = product
    ? categories.find((c) => c.id === product.category)
    : null;

  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  useEffect(() => {
    setIsLoading(true);
    setQuantity(1);
    setActiveImage(0);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [productId]);

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
  };

  if (!product) {
    return (
      <main className="min-h-screen py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
        <Link to="/shops" className="text-primary hover:underline">
          Browse all products
        </Link>
      </main>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shops" className="hover:text-primary">
            Shops
          </Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link
                to={`/category/${category.id}`}
                className="hover:text-primary"
              >
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        {isLoading ? (
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
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        "w-20 h-20 rounded-md overflow-hidden border-2 transition-colors",
                        activeImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-semibold mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground capitalize mb-4">
                {product.material} • {category?.name}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-black">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="px-2 py-1 text-xs font-semibold bg-gold-gradient text-black rounded">
                    Save {discount}%
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4  rounded-lg">
                <div>
                  <span className="text-xs text-muted-foreground">
                    Dimensions
                  </span>
                  <p className="text-sm font-medium">
                    {product.dimensions}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Weight</span>
                  <p className="text-sm font-medium">{product.weight}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Material
                  </span>
                  <p className="text-sm font-medium">
                    {product.material}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Availability
                  </span>
                  <p className="text-sm font-medium">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-md">
                  <UIButton
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
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

              {/* Actions */}
              <div className="flex gap-3">

                <UIButton 
                variant="outline"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className=" gap-2 border-2 border-yellow-500"
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
                    // isWishlisted && "text-black  "
                  )}
                >
                  {/* <Heart
                    className={cn(
                      "h-5 w-5",
                      isWishlisted && "fill-current"
                    )}
                  />
                  {isWishlisted ? "Saved" : "Save"} */}

                  <Heart className="h-5 w-5"/>
                  Save
                </UIButton>
              </div>
            </div>
          </div>
        )}

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl md:text-2xl font-serif font-semibold mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
