import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Slider from "./components/home/Slider";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Categories } from "./components/home/Categories";
import { MostSold } from "./components/home/MostSold";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Cart } from "./components/cart/Cart";
import { Wishlist } from "./components/wishlist/Wishlist";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <Slider />
          <Categories />
          <MostSold />
          <Footer />
          <Wishlist />
          <Cart />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
