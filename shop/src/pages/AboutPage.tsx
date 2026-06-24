import "../styles/global.css";

export default function AboutPage() {
  return (
    <main style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "2rem 2rem 6rem", 
      fontFamily: "DM Sans, sans-serif" 
    }}>
      <p style={{ 
        color: "var(--accent)", 
        fontWeight: 600, 
        fontSize: "13px", 
        textTransform: "uppercase", 
        letterSpacing: "0.1em", 
        marginBottom: "0.5rem" 
      }}>
        ◈ О компании
      </p>
      
      <h1 style={{ 
        fontWeight: 800, 
        fontSize: "2.5rem", 
        color: "var(--text)", 
        marginBottom: "2rem", 
        letterSpacing: "-0.02em" 
      }}>
        TKDequip
      </h1>

      <div style={{ 
        color: "var(--text)", 
        fontSize: "16px", 
        lineHeight: "1.7", 
        display: "flex", 
        flexDirection: "column", 
        gap: "1.5rem" 
      }}>
        <p>
          Добро пожаловать в <strong>TKDequip</strong> — ваш надежный проводник в мире профессиональной экипировки для Тхэквондо. 
        </p>
      </div>
    </main>
  );
}