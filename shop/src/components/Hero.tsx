import React from "react";
import styles from "./Hero.module.css";

interface HeroProps {
  onCatalogClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCatalogClick }) => {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg}>
        <div className={styles.stripe} />
        <div className={styles.stripe} />
        <div className={styles.stripe} />
        <div className={styles.circle} />
        <div className={styles.circle2} />
      </div>

<div className={styles.content}>

  {/* ЛЕВАЯ КОЛОНКА — текст */}
  <div>
    <div className={styles.badge}>Официальный партнёр WT с 2016 года</div>

    <h1 className={styles.title}>
      Экипировка<br />
      для <span className={styles.accent}>чемпионов</span><br />
      тхэквондо
    </h1>

    <p className={styles.desc}>
      Снаряжение для спортсменов всех уровней — от любителей до профессионалов —
      от первого добка до соревновательных электронных фут.
    </p>

    <div className={styles.actions}>
      <button className={styles.ctaBtn} onClick={onCatalogClick}>
        Перейти к каталогу <span>→</span>
      </button>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>150+</strong>
          <span>товаров</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <strong>5000+</strong>
          <span>спортсменов</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <strong>10 лет</strong>
          <span>на рынке</span>
        </div>
      </div>
    </div>

    <div className={styles.cats}>
      {[
        { label: "Одежда" },
        { label: "Обувь" },
        { label: "Пояса" },
        { label: "Защита" },
        { label: "Экипировка" },
      ].map(({ label }) => (
        <button key={label} className={styles.catChip} onClick={onCatalogClick}>
          {label}
        </button>
      ))}
    </div>
  </div>

  {/* ПРАВАЯ КОЛОНКА — картинка */}
  <div>
    <img
      src="/hero.png"
      alt="Тхэквондо"
      style={{ width: "100%", borderRadius: "20px", objectFit: "cover" }}
    />
  </div>
</div>

    </section>
  );
}

