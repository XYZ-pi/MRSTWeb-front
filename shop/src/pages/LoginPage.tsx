import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { api } from "../api/api";
import "../styles/global.css";

export default function LoginPage() {
  const { setCurrentUser } = useShop();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!userName.trim()) { setError("Введите имя пользователя"); return; }
    if (!password.trim()) { setError("Введите пароль"); return; }
    if (mode === "register" && !email.trim()) { setError("Введите email"); return; }

    setLoading(true);
    try {
      const data = mode === "login"
        ? await api.login(userName, password)
        : await api.register(userName, email, password);

      if (!data.token) throw new Error("Сервер не вернул токен");

      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || payload.role || "";
      const uName = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || payload.unique_name || payload.name || "";
      const id = Number(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.sub || 0);

      setCurrentUser({ id, userName: uName, role });
      navigate(role === "Admin" || role === "30" ? "/admin" : "/profile");

    } catch (e: any) {
      setError(e.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", background: "var(--surface2)",
    border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text)",
    fontSize: "15px", outline: "none", boxSizing: "border-box", marginBottom: "12px",
  };

  return (
    <main style={{ minHeight: "calc(100vh - 160px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "2.5rem", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>

        <div style={{ display: "flex", background: "var(--surface2)", borderRadius: "10px", padding: "4px", marginBottom: "2rem" }}>
          {(["login", "register"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }}
              style={{
                flex: 1, padding: "9px", background: mode === m ? "var(--accent)" : "none",
                color: mode === m ? "#fff" : "var(--text-muted)", border: "none",
                borderRadius: "8px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
              }}
            >
              {m === "login" ? "Войти" : "Регистрация"}
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
          {mode === "login" ? "Добро пожаловать!" : "Создать аккаунт"}
        </h2>

        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>Имя пользователя</label>
        <input placeholder="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} style={inputStyle} />

        {mode === "register" && (
          <>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>Email</label>
            <input placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </>
        )}

        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>Пароль</label>
        <input
          type="password" placeholder="••••••••" value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={inputStyle}
        />

        {error && <div style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>⚠ {error}</div>}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: "100%", background: "var(--accent)", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
          {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Создать аккаунт"}
        </button>
      </div>
    </main>
  );
}