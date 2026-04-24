import React, { useEffect } from "react";
import { Product } from "../types";
import styles from "./ProductModal.module.css";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleLike: (id: number) => void;
  inCart: boolean;
  liked: boolean;
}

const categoryMap: Record<string, string> = {
  clothing:   "Одежда",
  shoes:      "Обувь",
  belts:      "Пояса",
  protection: "Защита",
  equipment:  "Тренировочная экипировка",
};

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleLike,
  inCart,
  liked,
}) => {
  useEffect(() => {
    if (product) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.inner}>
          <div className={styles.imageWrap}>
            <img src={product.image} alt={product.title} className={styles.image} />
            <button
              className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
              onClick={() => onToggleLike(product.id)}
            >
              {liked ? "♥" : "♡"}
            </button>
          </div>

          <div className={styles.info}>
            <span className={styles.category}>
              {categoryMap[product.category] ?? product.category}
            </span>

            <h2 className={styles.title}>{product.title}</h2>

            {product.rating && (
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {"★".repeat(Math.round(product.rating.rate))}
                  {"☆".repeat(5 - Math.round(product.rating.rate))}
                </span>
                <span className={styles.ratingNum}>{product.rating.rate.toFixed(1)}</span>
                <span className={styles.ratingCount}>({product.rating.count} отзывов)</span>
              </div>
            )}

            <p className={styles.description}>{product.description}</p>

            <div className={styles.priceRow}>
{product.price.toLocaleString("ro-MD")} MDL              <span className={styles.oldPrice}>{Math.round(product.price * 1.2).toLocaleString("ro-MD")} MDL</span>
              <span className={styles.discount}>-20%</span>
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.cartBtn} ${inCart ? styles.inCart : ""}`}
                onClick={() => onAddToCart(product)}
              >
                {inCart ? "✓ В корзине" : "+ В корзину"}
              </button>
              <button
                className={`${styles.wishBtn} ${liked ? styles.wishBtnActive : ""}`}
                onClick={() => onToggleLike(product.id)}
              >
                {liked ? "♥" : "♡"}
              </button>
            </div>

            <div className={styles.badges}>
              <span className={styles.badge}>🚚 Бесплатная доставка</span>
              <span className={styles.badge}>↩ Возврат 30 дней</span>
              <span className={styles.badge}>🔒 Безопасная оплата</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
