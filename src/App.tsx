import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Cart } from "./components/cart/Cart";
import { Wishlist } from "./components/wishlist/Wishlist";
import Index from "./pages/Index";
import Shops from "./pages/Shops";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shops" element={<Shops />} />
          </Routes>
          <Footer />
          <Wishlist />
          <Cart />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
