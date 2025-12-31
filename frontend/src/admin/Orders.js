import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:5000";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${BASE}/api/orders`);
      setOrders(res.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`${BASE}/api/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to delete order");
    }
  };

  return (
    <div>
      <h2>Orders</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Products</th>
            <th>Total ($)</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" align="center">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.phone}</td>
                <td>{o.address}</td>
                <td>{o.products}</td>
                <td>{Number(o.total_price).toFixed(2)}</td>
                <td align="center">
                  <button onClick={() => deleteOrder(o.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
