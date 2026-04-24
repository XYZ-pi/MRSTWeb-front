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
            Мы работаем с 2016 года и являемся официальным партнёром WT в Молдове.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.features}>
            {[
              { icon: "🏆", title: "Официальный партнёр WT", desc: "Вся продукция сертифицирована и допущена к соревнованиям" },
              { icon: "🚚", title: "Доставка по всей Молдове", desc: "Отправляем в любой город от 1 до 5 дней" },
              { icon: "📏", title: "Помощь с размером", desc: "Консультация тренера по выбору экипировки" },
              { icon: "↩", title: "Возврат 30 дней", desc: "Если не подошло — вернём деньги" },
              { icon: "🔧", title: "Гарантия качества", desc: "Работаем только с проверенными производителями" },
              { icon: "💬", title: "Поддержка", desc: "Ответим на любой вопрос по экипировке" },
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
        {[
  { label: "Белый",        bg: "#e8e8e8", text: "#333" },
  { label: "Бело-жёлтый", bg: "linear-gradient(90deg,#e8e8e8 50%,#f5c518 50%)", text: "#333" },
  { label: "Жёлтый",      bg: "#f5c518", text: "#333" },
  { label: "Жёлто-зелёный",  bg: "linear-gradient(90deg,#f5c518 50%,#22a845 50%)", text: "#333" },
  { label: "Зелёный",     bg: "#22a845", text: "#fff" },
  { label: "Зелёно-синий",  bg: "linear-gradient(90deg,#22a845 50%,#1a6fc4 50%)", text: "#fff" },
  { label: "Синий",       bg: "#1a6fc4", text: "#fff" },
  { label: "Сине-красный",bg: "linear-gradient(90deg,#1a6fc4 50%,#c0392b 50%)", text: "#fff" },
  { label: "Красный",     bg: "#c0392b", text: "#fff" },
  { label: "Красно-чёрный",bg: "linear-gradient(90deg,#c0392b 50%,#111 50%)", text: "#fff" },
  { label: "Чёрный",      bg: "#111",    text: "#fff" },
].map(({ label, bg, text }) => (
          <div key={label} className={styles.belt} style={{ background: bg, color: text }}>
  <span>{label}</span>
</div>
        ))}
      </div>
    </section>
  );
});

About.displayName = "About";
