import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import styles from "./Header.module.css";

interface HeaderProps {
  cartCount: number;
  likeCount: number;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const CATEGORIES = [
  { id: "all",        label: "Все товары" },
  { id: "clothing",   label: "Одежда" },
  { id: "shoes",      label: "Обувь" },
  { id: "belts",      label: "Пояса" },
  { id: "protection", label: "Защита" },
  { id: "equipment",  label: "Тренировочная экипировка" },
];

export const Header: React.FC<HeaderProps> = ({
  cartCount, likeCount, onNavigate,
  onOpenCart, onOpenFavorites,
  theme, onToggleTheme,
}) => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useShop();

  // Закрыть дропдауны при клике вне
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) {
        setCatalogOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCategory = (id: string) => {
    setCatalogOpen(false);
    navigate("/");
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("setCategory", { detail: id }));
      onNavigate("catalog");
    }, 50);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* Логотип */}
        <button className={styles.logo} onClick={() => navigate("/")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/World_Taekwondo_Federation_logo.svg/1280px-World_Taekwondo_Federation_logo.svg.png"
            alt="TKD logo"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>
            <span className={styles.logoTKD}>TKD</span>
            <span className={styles.logoEquip}>equip</span>
          </span>
        </button>

        {/* Навигация */}
        <nav className={styles.nav}>
          <div className={styles.catalogWrap} ref={catalogRef}>
            <button
              className={`${styles.navLink} ${isActive("/") ? styles.active : ""} ${catalogOpen ? styles.active : ""}`}
              onClick={() => setCatalogOpen((v) => !v)}
            >
              Каталог
              <span className={`${styles.chevron} ${catalogOpen ? styles.chevronOpen : ""}`}>▾</span>
            </button>

            {catalogOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownArrow} />
                {CATEGORIES.map(({ id, label }) => (
                  <button
                    key={id}
                    className={styles.dropdownItem}
                    onClick={() => handleCategory(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={`${styles.navLink} ${isActive("/about") ? styles.active : ""}`}
            onClick={() => navigate("/about")}
          >
            О нас
          </button>

          <button
            className={`${styles.navLink} ${isActive("/delivery") ? styles.active : ""}`}
            onClick={() => navigate("/delivery")}
          >
            Доставка
          </button>
        </nav>

        {/* Правые кнопки */}
        <div className={styles.counters}>

          {/* Тема */}
          <button className={styles.themeBtn} onClick={onToggleTheme} title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}>
            {theme === "dark" ? "☀" : "☾"}
          </button>

          {/* Пользователь — дропдаун если залогинен, иначе переход на /login */}
          {currentUser ? (
            <div className={styles.catalogWrap} ref={userMenuRef}>
              <button
                className={`${styles.counterBtn} ${styles.userBtn}`}
                onClick={() => setUserMenuOpen(v => !v)}
                title={currentUser.userName}
              >
                <span className={styles.userAvatar}>
                  {currentUser.userName.charAt(0).toUpperCase()}
                </span>
              </button>

              {userMenuOpen && (
                <div className={`${styles.dropdown} ${styles.userDropdown}`}>
                  <div className={styles.dropdownArrow} />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{currentUser.userName}</span>
                    <span className={styles.userRole}>{currentUser.role}</span>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} onClick={() => { navigate("/profile"); setUserMenuOpen(false); }}>
                    Личный кабинет
                  </button>
                  {(currentUser.role === "Admin" || currentUser.role === "30") && (
                    <button className={styles.dropdownItem} onClick={() => { navigate("/admin"); setUserMenuOpen(false); }}>
                      Панель администратора
                    </button>
                  )}
                  <div className={styles.dropdownDivider} />
                  <button className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className={styles.counterBtn} onClick={() => navigate("/login")} title="Войти">
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          )}

          {/* Избранное */}
          <button className={styles.counterBtn} onClick={onOpenFavorites} title="Избранное">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {likeCount > 0 && <span className={`${styles.badge} ${styles.badgePink}`}>{likeCount}</span>}
          </button>

          {/* Корзина */}
          <button className={styles.counterBtn} onClick={onOpenCart} title="Корзина">
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && <span className={`${styles.badge} ${styles.badgePurple}`}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};