import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useShop } from "../context/ShopContext";
import "../styles/global.css";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, totalItems, totalLikes, theme, setTheme } = useShop();
  const navigate = useNavigate();

  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

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
          <button className={styles.back} onClick={() => navigate("/")}>
            ← Назад
          </button>
          <h1 className={styles.title}>Корзина</h1>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛒</span>
            <p>Корзина пуста</p>
            <button className={styles.goBtn} onClick={() => navigate("/")}>
              Перейти в каталог
            </button>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {cart.map((item: any) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImg}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} />
                    ) : (
                      <span className={styles.noImg}>📦</span>
                    )}
                  </div>

                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>
                      {(item.price * item.quantity).toLocaleString("ru-RU")} MDL
                    </p>
                  </div>

                  <div className={styles.itemQty}>
                    <button onClick={() => removeFromCart(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Итого</h2>

              <div className={styles.summaryRow}>
                <span>Товаров:</span>
                <span>
                  {cart.reduce((s: number, i: any) => s + i.quantity, 0)} шт.
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span>Сумма:</span>
                <span className={styles.summaryTotal}>
                  {total.toLocaleString("ru-RU")} MDL
                </span>
              </div>

              <button
  className={styles.checkoutBtn}
  onClick={() => navigate("/checkout")}
>
  Оформить заказ →
</button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}