import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginBg from "../assets/login-bg.jpg";
import '../App.css';


  function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
      return;
    }
    login(username);
    navigate("/");
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: 'url(${loginBg})',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-container">
        <h2>Login</h2>
        <input
          placeholder="Username or Email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLoginClick}>Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;