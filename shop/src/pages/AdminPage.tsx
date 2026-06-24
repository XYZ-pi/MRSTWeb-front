import React, { useState, useEffect } from "react";
import { api } from "../api/api";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "users">("products");
  const [isAdding, setIsAdding] = useState(false);
  const [newProd, setNewProd] = useState({ name: "", price: 0 });

  const loadData = async () => {
    try {
      const p = await api.getAllProducts();
      setProducts(p);
      const u = await api.getAllUsers();
      setUsers(u);
    } catch (e) { console.error("Ошибка загрузки данных:", e); }
  };

  useEffect(() => { loadData(); }, []);

  const getRoleLabel = (role: any) => {
    if (role === 30) return "Admin";
    if (role === 20) return "Manager";
    return "User";
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await api.deleteUser(id);
      alert("Пользователь успешно удален");
      loadData();
    } catch (error) {
      console.error(error);
      alert("Не удалось удалить пользователя");
    }
  };

  const handleAddProduct = async () => {
    try {
      // Добавляем поля, которые требует ваш сервер (Category/Description)
      await api.createProduct({
        ...newProd,
        category: "Default",
        description: "Default"
      });
      setIsAdding(false);
      setNewProd({ name: "", price: 0 });
      loadData();
    } catch (e: any) { alert("Ошибка при создании товара: " + e.message); }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#F4F7FE", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "30px", color: "#2B3674" }}>Панель администратора</h1>
      
      <div style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
        <button onClick={() => setActiveTab("products")} style={btnStyle(activeTab === "products")}>Товары</button>
        <button onClick={() => setActiveTab("users")} style={btnStyle(activeTab === "users")}>Пользователи</button>
        {activeTab === "products" && (
          <button onClick={() => setIsAdding(!isAdding)} style={{ ...btnStyle(false), backgroundColor: "#4318FF", color: "white" }}>
            {isAdding ? "Отмена" : "+ Добавить"}
          </button>
        )}
      </div>

      {isAdding && (
        <div style={{ background: "white", padding: "20px", borderRadius: "20px", marginBottom: "20px", display: "flex", gap: "15px", boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)" }}>
          <input placeholder="Название" value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Цена" value={newProd.price} onChange={(e) => setNewProd({...newProd, price: Number(e.target.value)})} style={inputStyle} />
          <button onClick={handleAddProduct} style={{ ...btnStyle(true), backgroundColor: "#05CD99", color: "white" }}>Сохранить</button>
        </div>
      )}

      <div style={{ background: "white", padding: "20px", borderRadius: "20px", boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "#A3AED0", textAlign: "left" }}>
              <th style={{ padding: "15px" }}>{activeTab === "products" ? "Название" : "Имя пользователя"}</th>
              <th style={{ padding: "15px" }}>{activeTab === "products" ? "Цена" : "Email"}</th>
              {activeTab === "users" && <th style={{ padding: "15px" }}>Роль</th>}
              <th style={{ padding: "15px", textAlign: "right" }}>Действие</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === "products" 
              ? products.map(p => (
                  <tr key={p.id} style={{ borderTop: "1px solid #F4F7FE" }}>
                    <td style={{ padding: "20px", fontWeight: "600" }}>{p.name}</td>
                    <td style={{ padding: "20px" }}>{p.price} MDL</td>
                    <td style={{ padding: "20px", textAlign: "right" }}><button onClick={() => api.deleteProduct(p.id).then(loadData)} style={delBtn}>Удалить</button></td>
                  </tr>
                ))
              : users.map(u => (
                  <tr key={u.id} style={{ borderTop: "1px solid #F4F7FE" }}>
                    <td style={{ padding: "20px", fontWeight: "600" }}>{u.username || u.userName || u.name}</td>
                    <td style={{ padding: "20px" }}>{u.email}</td>
                    <td style={{ padding: "20px", color: "#4318FF", fontWeight: "bold" }}>{getRoleLabel(u.role)}</td>
                    <td style={{ padding: "20px", textAlign: "right" }}><button onClick={() => handleDeleteUser(u.id)} style={delBtn}>Бан</button></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

const btnStyle = (active: boolean) => ({
  padding: "12px 24px",
  borderRadius: "15px",
  border: "none",
  backgroundColor: active ? "#4318FF" : "#FFFFFF",
  color: active ? "white" : "#A3AED0",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
});

const inputStyle = { padding: "12px", borderRadius: "10px", border: "1px solid #E0E5F2", flex: 1 };
const delBtn = { border: "none", background: "#FFEBEB", color: "#EE5D5D", padding: "8px 16px", borderRadius: "10px", cursor: "pointer" };