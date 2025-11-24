import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupBg from "../assets/signup-bg.jpg";
import '../App.css';


  function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignupClick = () => {
    if (!username || !password || !confirm) {
      alert("Fill all fields");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    alert("Account created! You can login now.");
    navigate("/login");
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: 'url(${signupBg})',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="signup-container">
        <h2>Sign Up</h2>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button onClick={handleSignupClick}>Create Account</button>
      </div>
    </div>
  );
}
export default Signup;