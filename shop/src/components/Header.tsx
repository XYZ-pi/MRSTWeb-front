import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  cartCount: number;
  likeCount: number;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const Header = ({
  cartCount,
  likeCount,
  theme,
  onToggleTheme,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        <button className={styles.logo} onClick={() => navigate("/")}>
          TKDequip
        </button>

        <div className={styles.counters}>

          <button onClick={onToggleTheme}>
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <button onClick={() => navigate("/favorites")}>
            ❤️ {likeCount}
          </button>

          <button onClick={() => navigate("/cart")}>
            🛒 {cartCount}
          </button>

        </div>

      </div>
    </header>
  );
};