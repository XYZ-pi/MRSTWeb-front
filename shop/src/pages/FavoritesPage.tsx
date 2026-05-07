import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useShop } from "../context/ShopContext";
import "../styles/global.css";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const { products, likedIds, toggleLike, addToCart, totalItems, totalLikes, isInCart, theme, setTheme } = useShop();
  const navigate = useNavigate();
  const liked = products.filter((p: any) => likedIds.includes(p.id));

  return (
    <div>
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

      <main className={styles.main}>
        <div className={styles.top}>
          <button className={styles.back} onClick={() => navigate("/")}>← Назад</button>
          <h1 className={styles.title}>Избранное</h1>
        </div>

        {liked.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>♡</span>
            <p>Список избранного пуст</p>
            <button className={styles.goBtn} onClick={() => navigate("/")}>
              Перейти в каталог
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {liked.map((item: any) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardImg}>
                  {item.image
                    ? <img src={item.image} alt={item.title} />
                    : <span className={styles.noImg}>📦</span>
                  }
                  <button
                    className={styles.likeBtn}
                    onClick={() => toggleLike(item.id)}
                    title="Убрать из избранного"
                  >♥</button>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <p className={styles.cardPrice}>{item.price.toLocaleString("ru-RU")} MDL</p>
                  <button
                    className={`${styles.cartBtn} ${isInCart(item.id) ? styles.inCart : ""}`}
                    onClick={() => addToCart(item)}
                  >
                    {isInCart(item.id) ? "✓ В корзине" : "+ В корзину"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}