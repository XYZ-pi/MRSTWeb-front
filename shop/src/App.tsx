import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import DeliveryPage from "./pages/DeliveryPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}