import React from "react";
import { CATEGORIES } from "../data/products";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  foundCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  search, onSearchChange, activeCategory, onCategoryChange, foundCount,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchRow}>
        <div className={styles.inputWrap}>
          <span className={styles.icon}>⌕</span>
          <input
            type="text"
            placeholder="Поиск экипировки..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.input}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => onSearchChange("")}>✕</button>
          )}
        </div>
        <div className={styles.count}>
          <span className={styles.countNum}>{foundCount}</span>
          <span className={styles.countLabel}>товаров</span>
        </div>
      </div>

      <div className={styles.filters}>
        {CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            className={`${styles.filterBtn} ${activeCategory === id ? styles.active : ""}`}
            onClick={() => onCategoryChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
