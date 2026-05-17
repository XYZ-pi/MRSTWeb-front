import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useShop } from "../context/ShopContext";
import { api } from "../api/api";
import "../styles/global.css";

export default function LoginPage() {
  const { totalItems, totalLikes, theme, setTheme } = useShop();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");

  // login = userName (или email, но backend ждёт userName)
  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    try {
      let data;

      // ✅ LOGIN FIX (главное исправление)
      if (mode === "login") {
        data = await api.login(userName, password);
      } else {
        data = await api.register(userName, email, password);
      }

      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split(".")[1]));

      const role =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        payload.role;

      setSuccess("Успешно!");

      setTimeout(() => {
        if (role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }, 800);
    } catch (e: any) {
      setError(e.message || "Ошибка входа");
    }
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

      <div style={container}>
        <div style={card}>
          <div style={tabs}>
            <button style={tab(mode === "login")} onClick={() => setMode("login")}>
              Вход
            </button>
            <button style={tab(mode === "register")} onClick={() => setMode("register")}>
              Регистрация
            </button>
          </div>

          {/* LOGIN INPUT (userName) */}
          <input
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={input}
          />

          {/* REGISTER ONLY */}
          {mode === "register" && (
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={input}
            />
          )}

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button onClick={handleSubmit} style={btn}>
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// styles
const container: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card: React.CSSProperties = {
  width: 360,
  padding: 20,
  borderRadius: 12,
  border: "1px solid #ccc",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
};

const btn: React.CSSProperties = {
  width: "100%",
  padding: 10,
  background: "black",
  color: "white",
};

const tabs = {
  display: "flex",
  marginBottom: 10,
};

const tab = (active: boolean): React.CSSProperties => ({
  flex: 1,
  padding: 10,
  background: active ? "black" : "#eee",
  color: active ? "white" : "black",
});