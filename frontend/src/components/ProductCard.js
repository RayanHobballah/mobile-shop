import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = "http://localhost:5000";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    const saved = localStorage.getItem("cart");
    let cart = [];

    if (saved) {
      try {
        cart = JSON.parse(saved);
        if (!Array.isArray(cart)) cart = [];
      } catch {
        cart = [];
      }
    }

    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) cart[index].qty = (cart[index].qty || 1) + qty;
    else cart.push({ id: product.id, name: product.name, price: Number(product.price), qty });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
    setQty(1);
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  return (
    <div style={{ width: 220, border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
      {product.image ? (
        <img
          src={`${BASE}/uploads/${product.image}`}
          alt={product.name}
          style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: 140,
            background: "#f2f2f2",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          No Image
        </div>
      )}

      <h4 style={{ margin: "10px 0 5px" }}>{product.name}</h4>
      <p>${product.price}</p>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
        <span style={{ margin: "0 10px" }}>{qty}</span>
        <button onClick={() => setQty(qty + 1)}>+</button>
      </div>

      <button onClick={addToCart} style={{ width: "100%", marginBottom: 8 }}>
        Add to Cart
      </button>

      <button onClick={buyNow} style={{ width: "100%" }}>
        Buy Now
      </button>
    </div>
  );
}
