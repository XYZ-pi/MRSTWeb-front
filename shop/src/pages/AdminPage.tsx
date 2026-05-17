import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "users">("products");

  // Products state
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "", description: "", price: 0,
    category: "", image: "", ratingRate: 0, ratingCount: 0, badge: ""
  });
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Users state
  const [users, setUsers] = useState<any[]>([]);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (role !== "Admin") { navigate("/profile"); return; }

    loadProducts();
    loadUsers();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getAllProducts();
      setProducts(data);
    } catch (e) { console.error(e); }
  };

  const loadUsers = async () => {
    try {
      const data = await api.getAllUsers();
      setUsers(data);
    } catch (e) { console.error(e); }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Удалить товар?")) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (e) { alert("Ошибка удаления"); }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      await api.updateProduct(editingProduct.id, {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        image: editingProduct.image,
        ratingRate: editingProduct.ratingRate,
        ratingCount: editingProduct.ratingCount,
        badge: editingProduct.badge,
      });
      setEditingProduct(null);
      loadProducts();
    } catch (e) { alert("Ошибка обновления"); }
  };

  const handleAddProduct = async () => {
    try {
      await api.createProduct(newProduct);
      setNewProduct({ name: "", description: "", price: 0, category: "", image: "", ratingRate: 0, ratingCount: 0, badge: "" });
      setShowAddProduct(false);
      loadProducts();
    } catch (e) { alert("Ошибка создания"); }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Удалить пользователя?")) return;
    try {
      await api.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (e) { alert("Ошибка удаления"); }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "24px" }}>🛠 Панель администратора</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
        <button onClick={() => setTab("products")} style={{
          padding: "10px 24px", borderRadius: "8px", border: "none",
          background: tab === "products" ? "#000" : "#eee",
          color: tab === "products" ? "#fff" : "#000",
          cursor: "pointer", fontWeight: 700
        }}>
          Товары
        </button>
        <button onClick={() => setTab("users")} style={{
          padding: "10px 24px", borderRadius: "8px", border: "none",
          background: tab === "users" ? "#000" : "#eee",
          color: tab === "users" ? "#fff" : "#000",
          cursor: "pointer", fontWeight: 700
        }}>
          Пользователи
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {tab === "products" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2>Товары ({products.length})</h2>
            <button onClick={() => setShowAddProduct(!showAddProduct)} style={{
              padding: "10px 20px", background: "#000", color: "#fff",
              border: "none", borderRadius: "8px", cursor: "pointer"
            }}>
              + Добавить товар
            </button>
          </div>

          {/* Add product form */}
          {showAddProduct && (
            <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "12px", marginBottom: "24px" }}>
              <h3>Новый товар</h3>
              {[
                { label: "Название", key: "name" },
                { label: "Описание", key: "description" },
                { label: "Категория", key: "category" },
                { label: "Картинка (путь)", key: "image" },
                { label: "Бейдж", key: "badge" },
              ].map(({ label, key }) => (
                <div key={key} style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>{label}</label>
                  <input
                    value={(newProduct as any)[key]}
                    onChange={e => setNewProduct({ ...newProduct, [key]: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>Цена</label>
                  <input type="number" value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>Рейтинг</label>
                  <input type="number" step="0.1" value={newProduct.ratingRate}
                    onChange={e => setNewProduct({ ...newProduct, ratingRate: Number(e.target.value) })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                <button onClick={handleAddProduct} style={{
                  padding: "10px 20px", background: "#000", color: "#fff",
                  border: "none", borderRadius: "8px", cursor: "pointer"
                }}>Сохранить</button>
                <button onClick={() => setShowAddProduct(false)} style={{
                  padding: "10px 20px", background: "#eee",
                  border: "none", borderRadius: "8px", cursor: "pointer"
                }}>Отмена</button>
              </div>
            </div>
          )}

          {/* Products table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={th}>ID</th>
                <th style={th}>Название</th>
                <th style={th}>Цена</th>
                <th style={th}>Категория</th>
                <th style={th}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.name}</td>
                  <td style={td}>{p.price} MDL</td>
                  <td style={td}>{p.category}</td>
                  <td style={td}>
                    <button onClick={() => setEditingProduct(p)} style={editBtn}>✏️ Изменить</button>
                    <button onClick={() => handleDeleteProduct(p.id)} style={deleteBtn}>🗑 Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit modal */}
          {editingProduct && (
            <div style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.5)", display: "flex",
              alignItems: "center", justifyContent: "center", zIndex: 1000
            }}>
              <div style={{
                background: "#fff", padding: "32px", borderRadius: "16px",
                width: "500px", maxHeight: "80vh", overflowY: "auto"
              }}>
                <h3>Редактировать товар</h3>
                {[
                  { label: "Название", key: "name" },
                  { label: "Описание", key: "description" },
                  { label: "Категория", key: "category" },
                  { label: "Картинка", key: "image" },
                  { label: "Бейдж", key: "badge" },
                ].map(({ label, key }) => (
                  <div key={key} style={{ marginBottom: "8px" }}>
                    <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>{label}</label>
                    <input
                      value={editingProduct[key] ?? ""}
                      onChange={e => setEditingProduct({ ...editingProduct, [key]: e.target.value })}
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>Цена</label>
                    <input type="number" value={editingProduct.price}
                      onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "13px", marginBottom: "4px" }}>Рейтинг</label>
                    <input type="number" step="0.1" value={editingProduct.ratingRate}
                      onChange={e => setEditingProduct({ ...editingProduct, ratingRate: Number(e.target.value) })}
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                  <button onClick={handleUpdateProduct} style={{
                    padding: "10px 20px", background: "#000", color: "#fff",
                    border: "none", borderRadius: "8px", cursor: "pointer"
                  }}>Сохранить</button>
                  <button onClick={() => setEditingProduct(null)} style={{
                    padding: "10px 20px", background: "#eee",
                    border: "none", borderRadius: "8px", cursor: "pointer"
                  }}>Отмена</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* USERS TAB */}
      {tab === "users" && (
        <div>
          <h2 style={{ marginBottom: "16px" }}>Пользователи ({users.length})</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={th}>ID</th>
                <th style={th}>Имя</th>
                <th style={th}>Email</th>
                <th style={th}>Роль</th>
                <th style={th}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{u.id}</td>
                  <td style={td}>{u.userName}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>
                    <span style={{
                      padding: "4px 10px", borderRadius: "6px",
                      background: u.role === 30 ? "#000" : u.role === 20 ? "#555" : "#eee",
                      color: u.role === 30 || u.role === 20 ? "#fff" : "#000",
                      fontSize: "12px"
                    }}>
                      {u.role === 30 ? "Admin" : u.role === 20 ? "Manager" : "User"}
                    </span>
                  </td>
                  <td style={td}>
                    <button onClick={() => handleDeleteUser(u.id)} style={deleteBtn}>
                      🗑 Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "12px 16px", textAlign: "left",
  fontWeight: 700, fontSize: "13px"
};

const td: React.CSSProperties = {
  padding: "12px 16px", fontSize: "14px"
};

const editBtn: React.CSSProperties = {
  padding: "6px 12px", marginRight: "8px",
  background: "#f5f5f5", border: "1px solid #ddd",
  borderRadius: "6px", cursor: "pointer"
};

const deleteBtn: React.CSSProperties = {
  padding: "6px 12px",
  background: "#fff0f0", border: "1px solid #ffccc7",
  color: "#cc0000", borderRadius: "6px", cursor: "pointer"
};