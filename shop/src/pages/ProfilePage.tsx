import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useShop } from "../context/ShopContext";
import "../styles/global.css";

const statusLabels: Record<number, string> = {
  0: "Новый",
  1: "В обработке",
  2: "Доставлен",
  3: "Отменён",
};

const statusColors: Record<number, { bg: string; color: string }> = {
  0: { bg: "rgba(255,193,7,0.12)", color: "#e65100" },
  1: { bg: "rgba(108,99,255,0.12)", color: "var(--accent)" },
  2: { bg: "rgba(67,233,123,0.12)", color: "var(--accent3)" },
  3: { bg: "rgba(255,101,132,0.12)", color: "var(--accent2)" },
};

export default function ProfilePage() {
  const { currentUser, logout } = useShop();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    api.getUserOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!currentUser) return null;

  return (
    // Убрали Header и Footer. 
    // Padding: 2rem (32px) вместо 100px, так как Layout уже дает отступ сверху.
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 2rem 4rem" }}>
      
      <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
        ◈ Личный кабинет
      </p>
      <h1 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "2rem", color: "var(--text)", marginBottom: "2rem" }}>
        Привет, {currentUser.userName}!
      </h1>

      {/* Карточка профиля */}
      <div style={{
        background: "var(--card-bg)", border: "1px solid var(--border)",
        borderRadius: "16px", padding: "1.5rem",
        display: "flex", alignItems: "center",
        gap: "1.5rem", marginBottom: "1.5rem"
      }}>
        <div style={{
          width: "64px", height: "64px",
          background: "var(--accent)",
          borderRadius: "50%", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontFamily: "Syne", fontWeight: 800,
          fontSize: "1.75rem", color: "#fff",
          flexShrink: 0,
        }}>
          {currentUser.userName.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>
            {currentUser.userName}
          </div>
          <div style={{
            display: "inline-block", marginTop: "4px",
            background: currentUser.role === "Admin" || currentUser.role === "30" ? "rgba(108,99,255,0.12)" : "var(--surface2)",
            border: `1px solid ${currentUser.role === "Admin" || currentUser.role === "30" ? "rgba(108,99,255,0.3)" : "var(--border)"}`,
            color: currentUser.role === "Admin" || currentUser.role === "30" ? "var(--accent)" : "var(--text-muted)",
            fontSize: "12px", fontWeight: 700,
            padding: "3px 10px", borderRadius: "99px",
            textTransform: "uppercase", letterSpacing: "0.06em"
          }}>
            {currentUser.role === "30" ? "Admin" : currentUser.role === "20" ? "Manager" : currentUser.role}
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "3rem" }}>
        <button onClick={() => navigate("/")} style={{
          padding: "10px 20px", background: "var(--surface2)",
          border: "1px solid var(--border)", borderRadius: "10px",
          color: "var(--text)", fontFamily: "Syne", fontWeight: 600,
          fontSize: "14px", cursor: "pointer", transition: "all 0.2s"
        }}>
          На главную
        </button>

        {(currentUser.role === "Admin" || currentUser.role === "30") && (
          <button onClick={() => navigate("/admin")} style={{
            padding: "10px 20px", background: "rgba(108,99,255,0.12)",
            border: "1px solid rgba(108,99,255,0.3)", borderRadius: "10px",
            color: "var(--accent)", fontFamily: "Syne", fontWeight: 600,
            fontSize: "14px", cursor: "pointer", transition: "all 0.2s"
          }}>
            Панель администратора
          </button>
        )}

        <button onClick={handleLogout} style={{
          padding: "10px 20px", background: "rgba(255,101,132,0.1)",
          border: "1px solid rgba(255,101,132,0.3)", borderRadius: "10px",
          color: "var(--accent2)", fontFamily: "Syne", fontWeight: 600,
          fontSize: "14px", cursor: "pointer", transition: "all 0.2s"
        }}>
          Выйти
        </button>
      </div>

      {/* История заказов */}
      <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
        ◈ История заказов
      </p>
      <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.4rem", color: "var(--text)", marginBottom: "1.5rem" }}>
        Мои заказы
      </h2>

      {loadingOrders ? (
        <div style={{ color: "var(--text-muted)", padding: "2rem 0" }}>Загрузка...</div>
      ) : orders.length === 0 ? (
        <div style={{
          background: "var(--card-bg)", border: "1px solid var(--border)",
          borderRadius: "16px", padding: "3rem", textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem", opacity: 0.4 }}>📦</div>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Заказов пока нет</p>
          <button onClick={() => navigate("/")} style={{
            marginTop: "1rem", background: "var(--accent)", color: "#fff",
            border: "none", borderRadius: "8px", padding: "10px 20px",
            fontFamily: "Syne", fontWeight: 700, cursor: "pointer", fontSize: "14px"
          }}>
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order: any) => (
            <div key={order.id} style={{
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: "16px", padding: "1.5rem",
              transition: "border-color 0.2s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1rem", color: "var(--text)" }}>
                  Заказ #{order.id}
                </span>
                <span style={{
                  padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: 700,
                  background: statusColors[order.status]?.bg ?? "#f5f5f5",
                  color: statusColors[order.status]?.color ?? "var(--text-muted)",
                }}>
                  {statusLabels[order.status] ?? "Неизвестно"}
                </span>
              </div>

              {order.items && order.items.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  {order.items.map((item: any, i: number) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "8px 0", borderBottom: "1px solid var(--border)",
                      fontSize: "14px", color: "var(--text-muted)"
                    }}>
                      <span>{item.productName}</span>
                      <span>{item.quantity} × {item.price} MDL</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ textAlign: "right", fontFamily: "Syne", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>
                Итого: {order.totalPrice} MDL
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}