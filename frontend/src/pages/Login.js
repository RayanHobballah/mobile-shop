import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import loginBg from "../assets/login-bg.jpg";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });

      if (res.data.success) {
        if (res.data.role === "admin") {
          localStorage.setItem("adminUsername", username);
          navigate("/admin/orders");
        } else {
          localStorage.removeItem("adminUsername");
          navigate("/shop");
        }
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
