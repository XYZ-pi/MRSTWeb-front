import { useState, useMemo, useRef, useEffect } from "react";
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

const ITEMS_PER_PAGE = 6;

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
  const [priceMax, setPriceMax] = useState(15000);
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc" | "rating">("default");
  const [currentPage, setCurrentPage] = useState(1);

  const catalogRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  // Слушаем выбор категории из дропдауна
  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail as string;
      setActiveCategory(cat);
      setCurrentPage(1);
    };
    window.addEventListener("setCategory", handler);
    return () => window.removeEventListener("setCategory", handler);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      const matchPrice = p.price <= priceMax;
      return matchSearch && matchCategory && matchPrice;
    });

    if (sortBy === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));

    return result;
  }, [products, search, activeCategory, priceMax, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

          {/* Заголовок каталога */}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 1.5rem" }}>
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

          {/* Фильтры */}
          <div style={{
            maxWidth: "1280px", margin: "0 auto",
            padding: "0 2rem 1.5rem",
            display: "flex", gap: "1.5rem",
            alignItems: "center", flexWrap: "wrap"
          }}>

            {/* Ползунок цены */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 600 }}>
                Цена до:
              </span>
              <input
                type="range"
                min={0} max={15000} step={100}
                value={priceMax}
                onChange={(e) => { setPriceMax(Number(e.target.value)); setCurrentPage(1); }}
                style={{ width: "130px", accentColor: "var(--accent)", cursor: "pointer" }}
              />
              <span style={{
                fontSize: "13px", fontWeight: 700,
                color: "var(--text)", minWidth: "90px",
                background: "var(--surface2)", border: "1px solid var(--border)",
                padding: "4px 10px", borderRadius: "8px"
              }}>
                {priceMax.toLocaleString("ru-RU")} MDL
              </span>
            </div>

            {/* Сортировка */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 600 }}>
                Сортировка:
              </span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value as any); setCurrentPage(1); }}
                style={{
                  background: "var(--surface2)", border: "1px solid var(--border)",
                  color: "var(--text)", padding: "8px 12px",
                  borderRadius: "8px", fontSize: "13px",
                  cursor: "pointer", outline: "none",
                  fontFamily: "DM Sans, sans-serif"
                }}
              >
                <option value="default">По умолчанию</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          {/* Поиск и категории */}
          <SearchBar
            search={search}
            onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
            activeCategory={activeCategory}
            onCategoryChange={(c) => { setActiveCategory(c); setCurrentPage(1); }}
            foundCount={filteredProducts.length}
          />

          {/* Каталог */}
          <Catalog
            products={paginatedProducts}
            loading={loading}
            error={error}
            onAddToCart={addToCart}
            onToggleLike={toggleLike}
            onOpenProduct={setSelectedProduct}
            isInCart={isInCart}
            isLiked={isLiked}
          />

          {/* Пагинация */}
          {totalPages > 1 && (
            <div style={{
              display: "flex", justifyContent: "center",
              gap: "8px", padding: "2rem 0 3rem"
            }}>
              <button
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); catalogRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 16px", borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface2)", color: "var(--text-muted)",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.4 : 1,
                  fontFamily: "Syne, sans-serif", fontWeight: 700
                }}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); catalogRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    width: "40px", height: "40px",
                    background: page === currentPage ? "var(--accent)" : "var(--surface2)",
                    color: page === currentPage ? "#fff" : "var(--text)",
                    border: `1px solid ${page === currentPage ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "8px", fontWeight: 700,
                    cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "Syne, sans-serif", fontSize: "14px"
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); catalogRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 16px", borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface2)", color: "var(--text-muted)",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.4 : 1,
                  fontFamily: "Syne, sans-serif", fontWeight: 700
                }}
              >
                →
              </button>
            </div>
          )}
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