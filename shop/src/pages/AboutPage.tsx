import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useShop } from "../context/ShopContext";
import "../styles/global.css";

export default function AboutPage() {
  const { totalItems, totalLikes, theme, setTheme } = useShop();
  const navigate = useNavigate();

  return (
    <div>
      <Header
        cartCount={totalItems}
        likeCount={totalLikes}
        activeSection="about"
        onNavigate={() => navigate("/")}
        onOpenCart={() => navigate("/cart")}
        onOpenFavorites={() => navigate("/favorites")}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "100px 2rem 4rem" }}>

        <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          ◈ О магазине
        </p>
        <h1 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "3rem", color: "var(--text)" }}>
          Всё для тхэквондо —<br />в одном месте
        </h1>

        {/* Карточки */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {[
            { icon: "🏆", title: "Кто мы", text: "TKDequip — специализированный магазин экипировки для тхэквондо в Молдове. Работаем с 2016 года, являемся официальным партнёром World Taekwondo." },
            { icon: "🎯", title: "Наша миссия", text: "Обеспечить каждого спортсмена — от новичка до чемпиона — качественной сертифицированной экипировкой по честной цене." },
            { icon: "✅", title: "Сертификация WT", text: "Вся продукция сертифицирована World Taekwondo и допущена к официальным соревнованиям любого уровня." },
            { icon: "👨‍🏫", title: "Экспертиза", text: "Наши консультанты — действующие тренеры по тхэквондо. Помогут подобрать экипировку под уровень, возраст и цели." },
            { icon: "🚚", title: "Доставка", text: "Доставляем по всей Молдове через Posta Moldovei и Nova Poshta. Бесплатная доставка по Кишинёву от 1500 MDL." },
            { icon: "↩", title: "Гарантия", text: "Возврат в течение 30 дней без вопросов. Обмен размера — бесплатно при первом заказе." },
          ].map(({ icon, title, text }) => (
            <div key={title} style={{
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: "16px", padding: "1.5rem",
              transition: "all 0.2s"
            }}>
              <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>{icon}</span>
              <h3 style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text)", fontSize: "1rem" }}>{title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div style={{
          background: "var(--card-bg)", border: "1px solid var(--border)",
          borderRadius: "16px", padding: "2rem",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem"
        }}>
          {[
            { num: "2016", label: "год основания" },
            { num: "5000+", label: "клиентов" },
            { num: "150+", label: "товаров" },
            { num: "8 лет", label: "на рынке" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Syne", fontSize: "1.8rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}