import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';


 function Checkout({ user, cart }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    alert("Order submitted.");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.length === 0 && <p>No items in cart.</p>}
      {cart.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (each)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ${total}</h3>

          <input placeholder="Phone Number" />
          <input placeholder="Full Name" />
          <input placeholder="Address" />
          <button onClick={handleSubmit}>Submit Order</button>
        </>
      )}
    </div>
  );
}
export default Checkout;