import React, { forwardRef } from "react";
import styles from "./About.module.css";

export const About = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.badge}>🥋 О магазине</div>
          <h2 className={styles.title}>Всё для<br />тхэквондо —<br />в одном месте</h2>
          <p className={styles.sub}>
            TKDequip — специализированный магазин экипировки для тхэквондо.
            Мы работаем с 2015 года и являемся официальным партнёром WTF в России.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.features}>
            {[
              { icon: "🏆", title: "Официальный партнёр WTF", desc: "Вся продукция сертифицирована и допущена к соревнованиям" },
              { icon: "🚚", title: "Доставка по всей России", desc: "Отправляем в любой город от 1 до 5 дней" },
              { icon: "📏", title: "Помощь с размером", desc: "Консультация тренера по выбору экипировки" },
              { icon: "↩", title: "Возврат 30 дней", desc: "Если не подошло — вернём деньги без вопросов" },
              { icon: "🔧", title: "Гарантия качества", desc: "Работаем только с проверенными производителями" },
              { icon: "💬", title: "Поддержка 24/7", desc: "Ответим на любой вопрос по экипировке" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className={styles.feature}>
                <span className={styles.featureIcon}>{icon}</span>
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.belts}>
        {["Белый", "Жёлтый", "Зелёный", "Синий", "Красный", "Чёрный"].map((color, i) => (
          <div key={color} className={styles.belt} style={{ "--i": i } as React.CSSProperties}>
            <span>{color}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

About.displayName = "About";
