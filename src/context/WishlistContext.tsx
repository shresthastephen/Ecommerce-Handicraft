import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { WishlistItem, Product } from "../types/data";

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "shrestha_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.product.product_id === product.product_id)) {
        return prev;
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.product_id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product.product_id === productId);
  };

  const toggleItem = (product: Product) => {
    if (isInWishlist(product.product_id)) {
      removeItem(product.product_id);
    } else {
      addItem(product);
    }
  };

  const clearWishlist = () => setItems([]);
  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        clearWishlist,
        isOpen,
        openWishlist,
        closeWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
