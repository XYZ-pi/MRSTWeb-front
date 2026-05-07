import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { SearchBar } from "../components/SearchBar";
import { Catalog } from "../components/Catalog";
import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { ProductModal } from "../components/ProductModal";

import { useShop } from "../context/ShopContext";
import { Product } from "../types";
import "../styles/global.css";

export default function HomePage() {
  const {
    products, loading, error,
    addToCart, totalItems, isInCart,
    toggleLike, isLiked, totalLikes,
    theme, setTheme,
  } = useShop();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const catalogRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [products, search, activeCategory]);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "catalog") catalogRef.current?.scrollIntoView({ behavior: "smooth" });
    if (section === "about") aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    if (section === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header
        cartCount={totalItems}
        likeCount={totalLikes}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCart={() => navigate("/cart")}
        onOpenFavorites={() => navigate("/favorites")}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <Hero onCatalogClick={() => handleNavigate("catalog")} />

      <main>
        <section ref={catalogRef} style={{ paddingTop: "5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 2rem" }}>
            <span style={{
              color: "var(--accent)", fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              display: "block", marginBottom: "0.5rem",
            }}>
              ◈ Каталог
            </span>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800, color: "var(--text)",
            }}>
              Все товары
            </h2>
          </div>

          <SearchBar
            search={search}
            onSearchChange={setSearch}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            foundCount={filteredProducts.length}
          />

          <Catalog
            products={filteredProducts}
            loading={loading}
            error={error}
            onAddToCart={addToCart}
            onToggleLike={toggleLike}
            onOpenProduct={setSelectedProduct}
            isInCart={isInCart}
            isLiked={isLiked}
          />
        </section>

        <About ref={aboutRef} />
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onToggleLike={toggleLike}
        inCart={selectedProduct ? isInCart(selectedProduct.id) : false}
        liked={selectedProduct ? isLiked(selectedProduct.id) : false}
      />
    </div>
  );
}