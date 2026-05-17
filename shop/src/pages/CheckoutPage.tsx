import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { api } from "../api/api";
import { useEffect } from "react";

export default function CheckoutPage() {
    const { cart, removeFromCart } = useShop();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/login");
    }, []);

    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    const handleOrder = async () => {
        if (cart.length === 0) {
            alert("Корзина пуста");
            return;
        }
        try {
            const order = {
                items: cart.map(i => ({
                    productId: i.id,
                    productName: i.title,
                    price: i.price,
                    quantity: i.quantity,
                }))
            };
            await api.createOrder(order);
            cart.forEach(i => removeFromCart(i.id));
            alert("Заказ создан!");
            navigate("/profile");
        } catch (e: any) {
            alert("Ошибка: " + e.message);
        }
    };

    return (
        <div style={{ padding: 40, maxWidth: 700 }}>
            <h1>Оформление заказа</h1>

            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    <div style={{ marginTop: 20 }}>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                display: "flex", justifyContent: "space-between",
                                padding: 12, borderBottom: "1px solid #eee"
                            }}>
                                <span>{item.title} × {item.quantity}</span>
                                <b>{(item.price * item.quantity).toFixed(2)} ₽</b>
                            </div>
                        ))}
                    </div>
                    <h2 style={{ marginTop: 20 }}>Итого: {total.toFixed(2)} ₽</h2>
                    <button onClick={handleOrder} style={{
                        padding: "12px 24px", background: "black", color: "white",
                        border: "none", borderRadius: 6, fontSize: 16, cursor: "pointer",
                        marginTop: 20
                    }}>
                        Подтвердить заказ
                    </button>
                </>
            )}
        </div>
    );
}