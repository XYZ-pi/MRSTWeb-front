import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useCart, useLikes } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";

interface ShopContextType {
  products: any[];
  loading: boolean;
  error: string | null;
  cart: any[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
  isInCart: (id: number) => boolean;
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
  totalLikes: number;
  likedIds: number[];
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
}

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const { products, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, totalItems, isInCart } = useCart();
  const { toggleLike, isLiked, totalLikes, likedIds } = useLikes();
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ShopContext.Provider value={{
      products, loading, error,
      cart, addToCart, removeFromCart, totalItems, isInCart,
      toggleLike, isLiked, totalLikes, likedIds,
      theme, setTheme,
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}