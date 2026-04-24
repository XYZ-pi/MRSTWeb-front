import React from "react";
import { Product } from "../types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleLike: (id: number) => void;
  onOpenProduct: (product: Product) => void;
  inCart: boolean;
  liked: boolean;
}

const categoryIcons: Record<string, string> = {
  clothing:   "👕",
  shoes:      "👟",
  belts:      "🥋",
  protection: "🛡",
  equipment:  "🥊",
};

const categoryNames: Record<string, string> = {
  clothing:   "Одежда",
  shoes:      "Обувь",
  belts:      "Пояса",
  protection: "Защита",
  equipment:  "Экипировка",
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product, onAddToCart, onToggleLike, onOpenProduct, inCart, liked,
}) => {
  return (
    <div className={styles.card} onClick={() => onOpenProduct(product)}>
      <div className={styles.imageWrap}>
        {product.image ? (
          <img src={product.image} alt={product.title} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span className={styles.placeholderIcon}>{categoryIcons[product.category] ?? "📦"}</span>
            <span className={styles.placeholderText}>Фото скоро</span>
          </div>
        )}

        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}

        <button
          className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
          onClick={(e) => { e.stopPropagation(); onToggleLike(product.id); }}
          aria-label={liked ? "Убрать из избранного" : "В избранное"}
        >
          {liked ? "♥" : "♡"}
        </button>

        <span className={styles.category}>
          {categoryIcons[product.category]} {categoryNames[product.category] ?? product.category}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>

        {product.rating && (
          <div className={styles.rating}>
            <span className={styles.stars}>
              {"★".repeat(Math.round(product.rating.rate))}
              {"☆".repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className={styles.ratingNum}>{product.rating.rate.toFixed(1)}</span>
            <span className={styles.ratingCount}>({product.rating.count})</span>
          </div>
        )}

        <div className={styles.footer}>
          <div>
<span className={styles.price}>{product.price.toLocaleString("ro-MD")} MDL</span>          </div>
          <button
            className={`${styles.cartBtn} ${inCart ? styles.inCart : ""}`}
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          >
            {inCart ? "✓ В корзине" : "+ В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
};
