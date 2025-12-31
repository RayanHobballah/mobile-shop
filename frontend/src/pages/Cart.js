import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increase = (i) => {
    const c = [...cart];
    c[i].qty += 1;
    setCart(c);
  };

  const decrease = (i) => {
    const c = [...cart];
    if (c[i].qty > 1) c[i].qty -= 1;
    setCart(c);
  };

  const removeItem = (i) => {
    if (!window.confirm("Remove item?")) return;
    setCart(cart.filter((_, index) => index !== i));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10
              }}
            >
              <b>{item.name}</b>
              <p>${item.price}</p>

              <button onClick={() => decrease(i)}>-</button>
              <span style={{ margin: "0 10px" }}>{item.qty}</span>
              <button onClick={() => increase(i)}>+</button>

              <br />

              <button
                style={{ marginTop: 6 }}
                onClick={() => removeItem(i)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>

          <button onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
