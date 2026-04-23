import { useState, useMemo, useRef, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SearchBar } from "./components/SearchBar";
import { Catalog } from "./components/Catalog";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { CartModal } from "./components/CartModal";
import { FavoritesModal } from "./components/FavoritesModal";
import { ProductModal } from "./components/ProductModal";
import { useProducts } from "./hooks/useProducts";
import { useCart, useLikes } from "./hooks/useCart";
import { Product } from "./types";
import "./styles/global.css";

function App() {
  const { products, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, totalItems, isInCart } = useCart();
  const { toggleLike, isLiked, totalLikes, likedIds } = useLikes();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("hero");
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const catalogRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  // Применяем тему к :root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Слушаем выбор категории из дропдауна Header
  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail as string;
      setActiveCategory(cat);
      setTimeout(() => {
        catalogRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    };
    window.addEventListener("setCategory", handler);
    return () => window.removeEventListener("setCategory", handler);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "all" ||
        p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [products, search, activeCategory]);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "catalog") {
      catalogRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header
        cartCount={totalItems}
        likeCount={totalLikes}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <Hero onCatalogClick={() => handleNavigate("catalog")} />

      <main>
        <section ref={catalogRef} id="catalog" style={{ paddingTop: "5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 2rem" }}>
            <div style={{ marginBottom: "2.5rem" }}>
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

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onAdd={addToCart}
      />

      <FavoritesModal
        isOpen={favOpen}
        onClose={() => setFavOpen(false)}
        products={products}
        likedIds={likedIds}
        onToggleLike={toggleLike}
        onAddToCart={addToCart}
        isInCart={isInCart}
      />

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

export default App;
