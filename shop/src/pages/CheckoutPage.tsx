import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { api } from "../api/api";

export default function CheckoutPage() {
  const { cart, removeFromCart } = useShop();
  const navigate = useNavigate();
  const total = cart.reduce((s: number, i: any) => s + i.price * i.quantity, 0);

  const handleOrder = async () => {
    try {
      const order = { 
        items: cart.map((i: any) => ({ 
          productId: i.id, 
          productName: i.title, 
          price: i.price, 
          quantity: i.quantity 
        })) 
      };
      await api.createOrder(order);
      cart.forEach((i: any) => removeFromCart(i.id));
      alert("Заказ успешно оформлен!");
      navigate("/profile");
    } catch (e: any) {
      alert("Ошибка при оформлении");
    }
  };

  return (
    // Убрали padding: 40px 10% и minHeight: 100vh, 
    // так как они теперь управляются глобально через Layout
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "30px" }}>Оформление заказа</h1>
      
      <div style={{ 
        background: "#FFF", 
        padding: "30px", 
        borderRadius: "16px", 
        boxShadow: "0px 4px 16px rgba(154, 156, 178, 0.08)" 
      }}>
        {cart.length === 0 ? <p>Корзина пуста</p> : (
          <>
            {cart.map((item: any) => (
              <div key={item.id} style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                padding: "16px 0", 
                borderBottom: "1px solid #F0F2FA" 
              }}>
                <span>{item.title} × {item.quantity}</span>
                <b style={{ color: "#5D5FEF" }}>{(item.price * item.quantity).toFixed(2)} MDL</b>
              </div>
            ))}
            
            <h2 style={{ marginTop: "20px" }}>Итого: {total.toFixed(2)} MDL</h2>
            
            <button 
              onClick={handleOrder} 
              style={{ 
                width: "100%", 
                backgroundColor: "#5D5FEF", 
                color: "white", 
                padding: "16px", 
                borderRadius: "12px", 
                border: "none", 
                cursor: "pointer", 
                marginTop: "20px", 
                fontWeight: "bold" 
              }}
            >
              Подтвердить заказ
            </button>
          </>
        )}
      </div>
    </div>
  );
}