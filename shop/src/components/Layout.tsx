import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const { totalItems, totalLikes, theme, setTheme } = useShop();

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh" // Заставляет контейнер занимать всю высоту экрана
    }}>
      <Header
        cartCount={totalItems}
        likeCount={totalLikes}
        activeSection=""
        onNavigate={() => navigate("/")}
        onOpenCart={() => navigate("/cart")}
        onOpenFavorites={() => navigate("/favorites")}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      
      {/* flex: 1 заставляет main растягиваться, чтобы Footer всегда был внизу */}
      <main style={{ flex: 1, paddingTop: "80px" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}