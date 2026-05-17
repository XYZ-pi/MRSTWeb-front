import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

const statusLabels: Record<number, string> = {
  0: "Новый",
  1: "В обработке",
  2: "Доставлен",
  3: "Отменён",
};

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const payload = JSON.parse(atob(token.split(".")[1]));
    
    // ИСПРАВЛЕНО - Number() чтобы id был числом
    const userId = Number(
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
      payload.sub
    );
    const userName =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      payload.unique_name;
    const role =
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      payload.role;

    setUser({ id: userId, userName, role });

    api.getUserOrders(userId)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div style={{ padding: 40 }}>Загрузка...</div>;
  if (!user) return null;

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>Личный кабинет</h1>

      <div style={{ background: "#f5f5f5", padding: 20, borderRadius: 8, marginTop: 20 }}>
        <p><b>Имя пользователя:</b> {user.userName}</p>
        <p><b>Роль:</b> {user.role === "Admin" || user.role === 30 || user.role === "30" ? "Admin" : user.role === "Manager" || user.role === 20 ? "Manager" : "User"}</p>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={() => navigate("/")} style={btnSecondary}>
          На главную
        </button>
        {(user.role === "Admin" || user.role === 30 || user.role === "30") && (
          <button onClick={() => navigate("/admin")} style={btnSecondary}>
            Админ-панель
          </button>
        )}
        <button onClick={handleLogout} style={btnDanger}>
          Выйти
        </button>
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>История заказов</h2>

      {orders.length === 0 ? (
        <div style={{ background: "#f5f5f5", padding: 20, borderRadius: 8, textAlign: "center", color: "#888" }}>
          Заказов пока нет
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {orders.map((order: any) => (
            <div key={order.id} style={{
              border: "1px solid #eee", borderRadius: 12,
              padding: 20, background: "#fff"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 700 }}>Заказ #{order.id}</span>
                <span style={{
                  padding: "4px 12px", borderRadius: 6, fontSize: 13,
                  background: order.status === 2 ? "#e6f4ea" : order.status === 3 ? "#fce8e6" : "#fff3e0",
                  color: order.status === 2 ? "#2e7d32" : order.status === 3 ? "#c62828" : "#e65100",
                }}>
                  {statusLabels[order.status] ?? "Неизвестно"}
                </span>
              </div>

              {order.items && order.items.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  {order.items.map((item: any, i: number) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "6px 0", borderBottom: "1px solid #f5f5f5",
                      fontSize: 14
                    }}>
                      <span>{item.productName}</span>
                      <span>{item.quantity} × {item.price} MDL</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ textAlign: "right", fontWeight: 700 }}>
                Итого: {order.totalPrice} MDL
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const btnSecondary: React.CSSProperties = {
  padding: "10px 20px", background: "#eee", border: "1px solid #ccc",
  borderRadius: 6, cursor: "pointer"
};

const btnDanger: React.CSSProperties = {
  padding: "10px 20px", background: "#d32f2f", color: "white",
  border: "none", borderRadius: 6, cursor: "pointer"
};