import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminUsername = localStorage.getItem("adminUsername");
    if (!adminUsername) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminUsername");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: "240px", background: "#1e1e2f", color: "white", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Panel</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/messages">Messages</Link>
          <Link to="/admin/repairs">Repairs</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/admins">Admins</Link>
          <Link to="/admin/categories">Categories</Link>

          <button onClick={handleLogout} style={{ marginTop: "20px" }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "20px", background: "#f4f4f4" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
