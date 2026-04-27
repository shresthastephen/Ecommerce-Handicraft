// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { ChevronRight, Minus, Plus, Heart, ShoppingBag } from "lucide-react";
// import { useCategories } from "../hooks/useCategories";
// import { useProduct } from "../hooks/useProductById";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { toast } from "sonner";
// import { cn } from "../libs/utils";

// function UIButton({
//   children,
//   className = "",
//   variant = "default",
//   size = "md",
//   disabled,
//   ...props
// }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "default" | "outline" | "ghost";
//   size?: "md" | "lg" | "icon";
// }) {
//   const base =
//     "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

//   const variants = {
//     default: "bg-black text-black",
//     outline: "border border-border hover:bg-accent",
//     ghost: "hover:bg-accent",
//   };

//   const sizes = {
//     md: "h-10 px-4",
//     lg: "h-11 px-6 text-base",
//     icon: "h-10 w-10",
//   };

//   return (
//     <button
//       className={cn(base, variants[variant], sizes[size], className)}
//       disabled={disabled}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// function UISkeleton({ className = "" }: { className?: string }) {
//   return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
// }

// export default function ProductDetail() {
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState(0);

//   const { addItem: addToCart } = useCart();
//   const { isInWishlist, toggleItem } = useWishlist();

//   // fetch product from API
//   const { productId } = useParams();
//   const { product, loading } = useProduct(productId);

//   const { categories } = useCategories();

// const inStock = product ? product.quantity > 0 : false;

//   const isWishlisted = product ? isInWishlist(product.product_id) : false;

//   const category = product
//     ? categories.find((c) => c.category_id === product.category_id)
//     : null;

//   const handleAddToCart = () => {
//     if (!product) return;
//     for (let i = 0; i < quantity; i++) {
//       addToCart(product);
//     }
//     toast.success(`Added ${quantity} item(s) to cart!`);
//   };

//   const handleWishlistToggle = () => {
//     if (!product) return;
//     toggleItem(product);
//     toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
//   };

//   if (!product && !loading) {
//     return (
//       <main className="min-h-screen py-16 text-center">
//         <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
//         <Link to="/shops" className="text-black hover:underline">
//           Browse all products
//         </Link>
//       </main>
//     );
//   }

//   const discount =
//     product && product.original_price > 0
//       ? Math.round(
//           ((product.original_price - product.price) / product.original_price) *
//             100,
//         )
//       : 0;

//   return (
//     <main className="mb-4 py-8">
//       <div className="container mx-auto px-4">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-2 text-base text-muted-foreground mb-6 flex-wrap">
//           <Link to="/">Home</Link>
//           <ChevronRight className="h-4 w-4" />
//           <Link to="/shops">Shops</Link>
//           {category && (
//             <>
//               <ChevronRight className="h-4 w-4" />
//               <Link to={`/shops?category=${category.category_id}`}>
//                 {category.name}
//               </Link>
//             </>
//           )}
//           <ChevronRight className="h-4 w-4" />
//           <span className="text-foreground truncate">{product?.name}</span>
//         </nav>

//         {loading ? (
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <UISkeleton className="aspect-square w-full rounded-lg" />
//               <div className="flex gap-2">
//                 {[1, 2].map((i) => (
//                   <UISkeleton key={i} className="w-20 h-20 rounded-md" />
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-4">
//               <UISkeleton className="h-8 w-3/4" />
//               <UISkeleton className="h-4 w-1/4" />
//               <UISkeleton className="h-6 w-1/3" />
//               <UISkeleton className="h-24 w-full" />
//               <UISkeleton className="h-10 w-full" />
//             </div>
//           </div>
//         ) : (
//           product && (
//             <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//               {/* Image */}
//               <div className="space-y-4">
//                 <div className="aspect-[2/2.5] rounded-lg overflow-hidden bg-muted">
//                   <img
//                     src={`http://localhost:8000${
//                       product?.images?.[activeImage] || product?.images?.[0]
//                     }`}
//                     alt={product?.name ?? "Product Image"}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>

//               {/* Product info */}
//               <div>
//                 <h1 className="text-2xl md:text-4xl font-sans mb-2">
//                   {product.name}
//                 </h1>
//                 <p className="text-base text-muted-foreground capitalize mb-4">
//                   {product.material} • {product.sku}
//                 </p>

//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="text-2xl font-bold text-yellow-500">
//                     NPR {product.price.toLocaleString()}
//                   </span>
//                   <span className="text-lg text-muted-foreground line-through">
//                     NPR {product.original_price.toLocaleString()}
//                   </span>
//                   {discount > 0 && (
//                     <span className="px-2 py-1 text-sm font-semibold bg-gold-gradient text-black rounded">
//                       Save {discount}%
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-muted-foreground mb-2 whitespace-pre-wrap">
//                   {product.description}
//                 </p>

//                 {/* Product details */}
//                 <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
//                   <div>
//                     <span className="text-base text-muted-foreground">
//                       Dimensions (HxLxW inch)
//                     </span>
//                     <p className="text-lg font-bold">{product.dimensions}</p>
//                   </div>
//                   <div>
//                     <span className="text-base text-muted-foreground">
//                       Weight (kg)
//                     </span>
//                     <p className="text-lg font-bold">{product.weight}</p>
//                   </div>
//                   <div>
//                     <span className="text-base text-muted-foreground">
//                       Material
//                     </span>
//                     <p className="text-lg font-bold capitalize">{product.material}</p>
//                   </div>
//                   <div>
//                     <span className="text-base text-muted-foreground">
//                       Availability
//                     </span>
//                     <p className="text-lg font-bold">
//                       {inStock ? "In Stock" : "Out of Stock"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 mb-4">
//                   <span className="text-base font-medium">Quantity:</span>
//                   <div className="flex items-center border-2 border-grey rounded-md">
//                     <UIButton
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                       disabled={quantity <= 1}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </UIButton>

//                     <span className="w-12 text-center">{quantity}</span>

//                     <UIButton
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setQuantity((q) => q + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </UIButton>
//                   </div>
//                 </div>

//                 {/* Action buttons */}
//                 <div className="flex gap-3">
//                   <UIButton
//                     variant="outline"
//                     size="lg"
//                     onClick={handleAddToCart}
//                     disabled={!inStock}
//                     className="gap-2 border-2 border-yellow-500"
//                   >
//                     <ShoppingBag className="h-5 w-5" />
//                     Add to Cart
//                   </UIButton>

//                   <UIButton
//                     variant="outline"
//                     size="lg"
//                     onClick={handleWishlistToggle}
//                     className={cn(
//                       "gap-2 border-2 border-yellow-500",
//                       isWishlisted && "text-black",
//                     )}
//                   >
//                     <Heart
//                       className={cn(
//                         "h-5 w-5",
//                         isWishlisted && "fill-current text-yellow-500",
//                       )}
//                     />
//                     {isWishlisted ? "Saved" : "Save"}
//                   </UIButton>
//                 </div>

//                 {/* Related images */}
//                 <section className="mt-8">
//                   <h2 className="text-xl md:text-2xl font-semibold mb-2">
//                     Related Images
//                   </h2>

//                   {product.images.length > 1 && (
//                     <div className="flex gap-2">
//                       {product.images.map((img: string, index: number) => (
//                         <img
//                           key={index}
//                           src={`http://localhost:8000${img.trim()}`}
//                           alt={`${product.name} - ${index + 1}`}
//                           className={cn(
//                             "w-20 h-20 object-cover rounded cursor-pointer border-2",
//                             activeImage === index
//                               ? "border-yellow-500"
//                               : "border-transparent hover:border-gray-300",
//                           )}
//                           onClick={() => setActiveImage(index)}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </section>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </main>
//   );
// }


import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, Heart, ShoppingBag } from "lucide-react";
import { useCategories } from "../hooks/useCategories";
import { useProduct } from "../hooks/useProductById";
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
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { addItem: addToCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const { productId } = useParams();
  const { product, loading } = useProduct(productId);
  const { categories } = useCategories();

  const inStock = product ? product.quantity > 0 : false;
  const isWishlisted = product ? isInWishlist(product.product_id) : false;
  const category = product
    ? categories.find((c) => c.category_id === product.category_id)
    : null;

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
          <span className="text-foreground truncate">{product?.name}</span>
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
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
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
                  {product.name}
                </h1>
                <p className="text-base text-muted-foreground capitalize mb-4">
                  {product.material} • {product.sku}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-yellow-500">
                    NPR {product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    NPR {product.original_price.toLocaleString()}
                  </span>
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
                    <p className="text-lg font-bold">{product.dimensions}</p>
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
          )
        )}
      </div>
    </main>
  );
}