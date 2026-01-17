import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categories } from "../../mockdata/products";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const navigate = useNavigate();
  const { totalItems: cartItems, openCart } = useCart();
  const { totalItems: wishlistItems, openWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/shops?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
  };

  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled
          ? "bg-background/95 backdrop-blur shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="font-serif font-bold text-sm md:text-lg text-primary-foreground">
                SH
              </span>
            </div>
            <span className="font-serif text-lg md:text-xl font-semibold">
              Shrestha Handicraft
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/shops">Shops</Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-1 nav-link">
                Categories <ChevronDown className="h-4 w-4" />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-md border bg-white shadow-lg">
                  {sortedCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="block px-4 py-2 text-sm hover:bg-muted transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for statues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md bg-secondary/50 border border-transparent focus:outline-none focus:border-primary"
              />
            </div>
          </form>

          {/* Action Buttons */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-fade-in">
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">
                Home
              </Link>
              <Link to="/shops" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">
                Shops
              </Link>

              <div className="border-t pt-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Categories
                </p>
                {sortedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-link"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Reusable Icon Button ---------- */
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
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}



