import { useState, useEffect } from "react";
import { Product } from "../types";

const BASE_URL = "https://localhost:7114/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/product/all`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки товаров");
        return res.json();
      })
      .then((data) => {
        const mapped: Product[] = data.map((p: any) => ({
          id: p.id,
          title: p.name,
          price: p.price,
          category: p.category,
          image: `http://localhost:5173${p.image}`,          
          description: p.description,
          rating: { rate: p.ratingRate, count: p.ratingCount },
          badge: p.badge ?? undefined,
        }));
        setProducts(mapped);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}