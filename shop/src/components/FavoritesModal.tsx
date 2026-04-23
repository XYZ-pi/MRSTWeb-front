import React, { useEffect } from "react";
import { Product } from "../types";
import styles from "./Modal.module.css";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  likedIds: number[];
  onToggleLike: (id: number) => void;
  onAddToCart: (product: Product) => void;
  isInCart: (id: number) => boolean;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen, onClose, products, likedIds, onToggleLike, onAddToCart, isInCart,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const likedProducts = products.filter((p) => likedIds.includes(p.id));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIconPink}>♥</span>
            <h2 className={styles.title}>Избранное</h2>
            <span className={`${styles.countBadge} ${styles.countBadgePink}`}>{likedProducts.length}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          {likedProducts.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>♡</span>
              <p>Список избранного пуст</p>
              <span>Нажмите ♥ на карточке товара</span>
            </div>
          ) : (
            <ul className={styles.list}>
              {likedProducts.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemImg}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>{item.price.toLocaleString("ru-RU")} ₽</p>
                  </div>
                  <div className={styles.itemActions}>
                    <button
                      className={`${styles.cartSmBtn} ${isInCart(item.id) ? styles.cartSmBtnActive : ""}`}
                      onClick={() => onAddToCart(item)}
                      title="В корзину"
                    >
                      {isInCart(item.id) ? "✓" : "⊞"}
                    </button>
                    <button
                      className={styles.unlikeBtn}
                      onClick={() => onToggleLike(item.id)}
                      title="Убрать из избранного"
                    >
                      ♥
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
