import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useShop } from "../context/ShopContext";
import "../styles/global.css";

export default function LoginPage() {
  const { totalItems, totalLikes, theme, setTheme } = useShop();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (mode === "register" && !name.trim()) return setError("Введите имя");
    if (!email.includes("@")) return setError("Некорректный email");
    if (password.length < 6) return setError("Пароль минимум 6 символов");

    setSuccess(mode === "login" ? "Вход выполнен!" : `Добро пожаловать, ${name}`);
    setTimeout(() => navigate("/"), 1200);
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

      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px",
        background: "var(--bg)"
      }}>
        <div style={{
          width: "420px",
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
        }}>

          {/* tabs */}
          <div style={{
            display: "flex",
            background: "var(--surface2)",
            borderRadius: "12px",
            padding: "4px",
            marginBottom: "24px"
          }}>
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as any)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                  background: mode === m ? "var(--accent)" : "transparent",
                  color: mode === m ? "#fff" : "var(--text-muted)"
                }}
              >
                {m === "login" ? "Вход" : "Регистрация"}
              </button>
            ))}
          </div>

          <h2 style={{ color: "var(--text)", marginBottom: 4 }}>
            {mode === "login" ? "Добро пожаловать" : "Создать аккаунт"}
          </h2>

          <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>
            {mode === "login" ? "Войдите в систему" : "Регистрация нового пользователя"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {mode === "register" && (
              <input
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={input}
              />
            )}

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={input}
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={input}
            />

            {error && <div style={err}>{error}</div>}
            {success && <div style={ok}>{success}</div>}

            <button onClick={handleSubmit} style={btn}>
              {mode === "login" ? "Войти" : "Зарегистрироваться"}
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const input: React.CSSProperties = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--surface2)",
  color: "var(--text)"
};

const btn: React.CSSProperties = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "var(--accent)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const err: React.CSSProperties = {
  color: "red",
  fontSize: 13
};

const ok: React.CSSProperties = {
  color: "limegreen",
  fontSize: 13
};