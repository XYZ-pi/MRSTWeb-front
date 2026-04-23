export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating?: { rate: number; count: number };
  inStock?: boolean;
  badge?: string;
}

export type Category = "all" | "clothing" | "shoes" | "belts" | "protection" | "equipment";

export interface CartItem extends Product {
  quantity: number;
}
