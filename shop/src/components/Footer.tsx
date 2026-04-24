import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
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
              <li>Одежда</li>
              <li>Обувь</li>
              <li>Пояса</li>
              <li>Защита</li>
              <li>Тренировочная экипировка</li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Магазин</h4>
            <ul>
              <li>О нас</li>
              <li>Доставка и оплата</li>
              <li>Возврат</li>
              <li>Контакты</li>
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
