import React from "react";
import { Product } from "../types";
import { ProductCard } from "./ProductCard";
import styles from "./Catalog.module.css";

interface CatalogProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
  onToggleLike: (id: number) => void;
  onOpenProduct: (product: Product) => void;
  isInCart: (id: number) => boolean;
  isLiked: (id: number) => boolean;
}

export const Catalog: React.FC<CatalogProps> = ({
  products, loading, error,
  onAddToCart, onToggleLike, onOpenProduct,
  isInCart, isLiked,
}) => {
  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
          <p>Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className={styles.errorBanner}>
          <span>⚠</span> {error}
        </div>
      )}
      {products.length === 0 ? (
        <div className={styles.stateWrap}>
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить запрос или выбрать другую категорию</p>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleLike={onToggleLike}
              onOpenProduct={onOpenProduct}
              inCart={isInCart(product.id)}
              liked={isLiked(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
