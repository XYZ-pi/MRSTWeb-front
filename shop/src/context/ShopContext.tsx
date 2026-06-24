import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useCart, useLikes } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";

interface UserInfo {
  id: number;
  userName: string;
  role: string;
}

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
  currentUser: UserInfo | null;
  setCurrentUser: (u: UserInfo | null) => void;
  logout: () => void;
}

const ShopContext = createContext<ShopContextType | null>(null);

function getUserFromToken(): UserInfo | null {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role =
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      payload.role;
    const userName =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      payload.unique_name ||
      payload.name;
    const id =
      Number(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]) ||
      Number(payload.sub);
    if (!userName) return null;
    return { id, userName, role };
  } catch {
    return null;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const { products, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, totalItems, isInCart } = useCart();
  const { toggleLike, isLiked, totalLikes, likedIds } = useLikes();
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(getUserFromToken);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <ShopContext.Provider value={{
      products, loading, error,
      cart, addToCart, removeFromCart, totalItems, isInCart,
      toggleLike, isLiked, totalLikes, likedIds,
      theme, setTheme,
      currentUser, setCurrentUser, logout,
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