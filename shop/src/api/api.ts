// src/api/api.ts
const BASE_URL = "https://localhost:7114/api";

const getHeaders = (withAuth: boolean = false): HeadersInit => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (withAuth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // SESSION
  login: async (userName: string, password: string) => {
    const res = await fetch(`${BASE_URL}/session/auth`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ userName, password }),
    });
    if (!res.ok) throw new Error("Ошибка входа");
    return await res.json();
  },

  register: async (userName: string, email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/session/register`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ userName, email, password }),
    });
    if (!res.ok) throw new Error("Ошибка регистрации");
    return await res.json();
  },

  // USERS
  getAllUsers: async () => {
    const res = await fetch(`${BASE_URL}/user/all`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error("Ошибка загрузки пользователей");
    return await res.json();
  },

  deleteUser: async (id: number) => {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error("Ошибка удаления");
    return true;
  },

  // PRODUCTS
  getAllProducts: async () => {
    const res = await fetch(`${BASE_URL}/product/all`);
    if (!res.ok) throw new Error("Ошибка загрузки товаров");
    return await res.json();
  },

  createProduct: async (product: any) => {
    const res = await fetch(`${BASE_URL}/product`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Ошибка создания товара");
    return await res.json();
  },

  deleteProduct: async (id: number) => {
    const res = await fetch(`${BASE_URL}/product/${id}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error("Ошибка удаления товара");
    return true;
  },

  // ORDERS
  createOrder: async (order: any) => {
    const res = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error("Ошибка создания заказа");
    return await res.json();
  },

  getUserOrders: async () => {
    const res = await fetch(`${BASE_URL}/order/my`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!res.ok) throw new Error("Ошибка загрузки заказов");
    return await res.json();
  },
};