import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useShop } from "../context/ShopContext";
import "../styles/global.css";

export default function DeliveryPage() {
  const { totalItems, totalLikes, theme, setTheme } = useShop();
  const navigate = useNavigate();

  return (
    <div>
      <Header
        cartCount={totalItems}
        likeCount={totalLikes}
        activeSection="delivery"
        onNavigate={() => navigate("/")}
        onOpenCart={() => navigate("/cart")}
        onOpenFavorites={() => navigate("/favorites")}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 2rem 4rem" }}>

        <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          ◈ Информация
        </p>
        <h1 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "3rem", color: "var(--text)" }}>
          Доставка и оплата
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            {
              icon: "🏙",
              title: "Доставка по Кишинёву",
              text: "Курьерская доставка в день заказа или на следующий день. Стоимость — 50 MDL. Бесплатно при заказе от 1500 MDL.",
              tag: "1–2 дня"
            },
            {
              icon: "🇲🇩",
              title: "Доставка по всей Молдове",
              text: "Отправляем через Posta Moldovei и Nova Poshta. Стоимость по тарифам перевозчика. Трекинг посылки в личном кабинете.",
              tag: "1–3 дня"
            },
            {
              icon: "💳",
              title: "Оплата картой онлайн",
              text: "Принимаем Visa и Mastercard. Оплата через защищённый шлюз. Деньги списываются только после подтверждения заказа.",
              tag: "Мгновенно"
            },
            {
              icon: "💵",
              title: "Оплата наличными",
              text: "При получении курьером или в пункте выдачи. Также при самовывозе из магазина по адресу: Кишинёв, ул. Спортивная, 1.",
              tag: "При получении"
            },
            {
              icon: "↩",
              title: "Возврат и обмен",
              text: "Возврат в течение 30 дней. Товар должен быть в оригинальной упаковке. Обмен размера при первом заказе — бесплатно.",
              tag: "30 дней"
            },
          ].map(({ icon, title, text, tag }) => (
            <div key={title} style={{
              display: "flex", gap: "1.25rem", alignItems: "flex-start",
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: "16px", padding: "1.5rem",
              transition: "border-color 0.2s"
            }}>
              <span style={{ fontSize: "2rem", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <h3 style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--text)", fontSize: "1rem" }}>{title}</h3>
                  <span style={{
                    background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.25)",
                    color: "var(--accent)", fontSize: "11px", fontWeight: 700,
                    padding: "2px 10px", borderRadius: "99px"
                  }}>
                    {tag}
                  </span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}