import React, { useEffect } from "react";
import { CartItem, Product } from "../types";
import styles from "./Modal.module.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
  onAdd: (product: Product) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, onRemove, onAdd }) => {
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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>⊞</span>
            <h2 className={styles.title}>Корзина</h2>
            <span className={styles.countBadge}>{cart.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛒</span>
              <p>Корзина пуста</p>
              <span>Добавьте товары из каталога</span>
            </div>
          ) : (
            <ul className={styles.list}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemImg}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>{(item.price * item.quantity).toLocaleString("ru-RU")} ₽</p>
                  </div>
                  <div className={styles.itemQty}>
                    <button className={styles.qtyBtn} onClick={() => onRemove(item.id)}>−</button>
                    <span className={styles.qtyNum}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => onAdd(item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Итого:</span>
              <span className={styles.totalPrice}>{total.toLocaleString("ru-RU")} ₽</span>
            </div>
            <button className={styles.checkoutBtn}>Оформить заказ →</button>
          </div>
        )}
      </div>
    </div>
  );
};
