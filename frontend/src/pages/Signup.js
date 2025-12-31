import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import signupBg from "../assets/signup-bg.jpg";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password
      });

      if (res.data.success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${signupBg})` }}>
      <div className="auth-card">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
