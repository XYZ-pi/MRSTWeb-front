import { useState } from "react";
import { Product, CartItem } from "../types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (id: number) => cart.some((item) => item.id === id);

  return { cart, addToCart, removeFromCart, totalItems, isInCart };
}

export function useLikes() {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isLiked = (id: number) => liked.has(id);
  const totalLikes = liked.size;
  const likedIds = Array.from(liked);

  return { toggleLike, isLiked, totalLikes, likedIds };
}
