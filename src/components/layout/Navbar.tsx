import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categories } from "../../mockdata/products";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { totalItems: cartItems, openCart } = useCart();
  const { totalItems: wishlistItems, openWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // category dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCategoryOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/shops?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
  };

  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  // close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsMobileCategoryOpen(false); // also close categories
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled ? "bg-white/70 backdrop-blur shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="font-serif font-bold text-sm md:text-lg">
                SH
              </span>
            </div>
            <span className="font-serif text-lg md:text-xl font-semibold">
              Shrestha Handicraft
            </span>
          </Link>

          {/*  nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/shops">
              Shops
            </Link>

            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setIsCategoryOpen((p) => !p)}
                className="flex items-center gap-1 nav-link"
                aria-expanded={isCategoryOpen}
              >
                Categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-md border bg-white shadow-lg animate-fade-in">
                  {sortedCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shops?category=${cat.id}`}
                      onClick={() => setIsCategoryOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-muted transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* seach */}

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <input
                type="search"
                placeholder="Search for statues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white border border-black outline-none
                  focus:ring-1 focus:ring-yellow-500"
              />
            </div>
          </form>

          {/* btn */}
          <div className="flex items-center gap-2">
            <IconButton onClick={openWishlist} badge={wishlistItems}>
              <Heart className="h-5 w-5" />
            </IconButton>

            <IconButton onClick={openCart} badge={cartItems}>
              <ShoppingBag className="h-5 w-5" />
            </IconButton>

            <button
              className="md:hidden p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* mobile view */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden border-t py-4 animate-fade-in"
          >
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <input
                  type="search"
                  placeholder="Search for statues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-md border"
                />
              </div>
            </form>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-link"
              >
                Home
              </Link>
              <Link
                to="/shops"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-link"
              >
                Shops
              </Link>

              <div className="border-t pt-3">
                <button
                  onClick={() => setIsMobileCategoryOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full mobile-link"
                >
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    Categories
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isMobileCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isMobileCategoryOpen ? "max-h-96 mt-2" : "max-h-0"
                  }`}
                >
                  {sortedCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shops?category=${cat.id}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileCategoryOpen(false);
                      }}
                      className="block px-4 py-2 text-sm hover:bg-muted transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function IconButton({
  children,
  onClick,
  badge,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-md hover:bg-muted transition"
    >
      {children}
      {badge && badge > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-xs flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
