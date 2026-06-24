import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Импортируем хук
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  const navigate = useNavigate(); // 2. Инициализируем навигацию

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/World_Taekwondo_Federation_logo.svg/1280px-World_Taekwondo_Federation_logo.svg.png"
                alt="TKD"
                className={styles.logoImg}
              />
              <span>TKDequip</span>
            </div>
            <p>Официальный партнёр WT.<br />Профессиональная экипировка для тхэквондо.</p>
            <div className={styles.cert}>
              <span>✓ Сертифицировано WT</span>
            </div>
          </div>

          <div className={styles.links}>
            <h4>Каталог</h4>
            <ul>
              {/* Можно оставить как есть, если это просто списки категорий */}
              <li>Одежда</li>
              <li>Обувь</li>
              <li>Защита</li>
              <li>Тренировочная экипировка</li>
              <li>Другое</li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Магазин</h4>
            <ul>
              {/* 3. Добавляем кликабельность через onClick */}
              <li onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>О нас</li>
              <li onClick={() => navigate("/delivery")} style={{ cursor: "pointer" }}>Доставка и оплата</li>
              <li onClick={() => navigate("/favorites")} style={{ cursor: "pointer" }}>Избранное</li>
              <li onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>Корзина</li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>Контакты</h4>
            <p>info@tkdequip.ru</p>
            <p>+373 (68) 111-111</p>
            <p>Кишинёв, ул. Спортивная, 1</p>
            <div className={styles.socials}>
              {["VK", "TG", "YT"].map((s) => (
                <button key={s} className={styles.socialBtn}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} TKDequip. Все права защищены.</p>
          <p>Официальный партнёр World Taekwondo</p>
        </div>
      </div>
    </footer>
  );
};