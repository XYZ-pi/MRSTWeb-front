import { useState, useEffect } from "react";
import { Product } from "../types";
import { mockProducts } from "../data/products";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Небольшая задержка для реалистичного ощущения загрузки
    const t = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return { products, loading, error };
}
