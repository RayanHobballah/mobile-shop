import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const nav = useNavigate();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Choose a section from the left.</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => nav("/admin/users")}>Users</button>
        <button onClick={() => nav("/admin/messages")}>Messages</button>
        <button onClick={() => nav("/admin/repairs")}>Repairs</button>
        <button onClick={() => nav("/admin/categories")}>Categories</button>
        <button onClick={() => nav("/admin/products")}>Products</button>
        <button onClick={() => nav("/admin/admins")}>Admins</button>
      </div>
    </div>
  );
}
