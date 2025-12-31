import React, { useEffect, useState } from "react";
import axios from "axios";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCartItems(parsed);
        else setCartItems([]);
      } catch (e) {
        setCartItems([]);
      }
    }
  }, []);

  const totalPrice = cartItems.reduce(function (sum, item) {
    const qty = item.qty ? Number(item.qty) : 1;
    return sum + Number(item.price) * qty;
  }, 0);

  const productsText = cartItems
    .map(function (item) {
      const qty = item.qty ? Number(item.qty) : 1;
      return item.name + " (x" + qty + ") - $" + item.price;
    })
    .join(" | ");

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill name, phone, and address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        name: name,
        phone: phone,
        address: address,
        products: productsText,
        total_price: totalPrice
      });

      if (res.data && res.data.success) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
        setName("");
        setPhone("");
        setAddress("");
      } else {
        alert((res.data && res.data.message) || "Failed to place order");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <h3>Your Order</h3>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div style={{ marginBottom: "15px" }}>
          {cartItems.map(function (item, index) {
            const qty = item.qty ? Number(item.qty) : 1;
            return (
              <div key={index} style={{ marginBottom: "6px" }}>
                <b>{item.name}</b> — ${item.price} (x{qty})
              </div>
            );
          })}
          <p style={{ marginTop: "10px" }}>
            <b>Total: ${totalPrice.toFixed(2)}</b>
          </p>
        </div>
      )}

      <h3>Delivery Info</h3>
      <form onSubmit={placeOrder}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "320px" }}
        />

        <input
          type="text"
          placeholder="Phone (ex: 70123456)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "320px" }}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "320px" }}
        />

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;