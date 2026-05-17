const BASE_URL = "https://localhost:7114/api";

export const api = {
  // =====================
  // AUTH
  // =====================

  login: async (userName: string, password: string) => {
    const res = await fetch(`${BASE_URL}/session/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Invalid credentials");
    }

    return await res.json();
  },

  register: async (userName: string, email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/session/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "User already exists");
    }

    return await res.json();
  },

  // =====================
  // ORDERS
  // =====================

  createOrder: async (order: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Order failed");
    }

    return await res.json();
  },

  // ✅ ИСПРАВЛЕНО: больше НЕ передаём userId
  getUserOrders: async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/order/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Cannot load orders");
    }

    return await res.json();
  },

  updateOrderStatus: async (orderId: number, status: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/order/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(status),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Cannot update order");
    }

    return await res.json();
  },

  deleteOrder: async (orderId: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/order/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Cannot delete order");
    }

    return true;
  },

  // =====================
  // ME
  // =====================

  getMe: async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/session/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Не авторизован");

    return await res.json();
  },

  // =====================
  // PRODUCTS (ADMIN)
  // =====================

  getAllProducts: async () => {
    const res = await fetch(`${BASE_URL}/product/all`);
    if (!res.ok) throw new Error("Cannot load products");
    return await res.json();
  },

  createProduct: async (product: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Cannot create product");

    return await res.json();
  },

  updateProduct: async (id: number, product: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Cannot update product");

    return await res.json();
  },

  deleteProduct: async (id: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Cannot delete product");

    return true;
  },

  // =====================
  // USERS (ADMIN)
  // =====================

  getAllUsers: async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/user/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Cannot load users");

    return await res.json();
  },

  deleteUser: async (id: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Cannot delete user");

    return true;
  },

  updateUser: async (id: number, user: any) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error("Cannot update user");

    return await res.json();
  },
};