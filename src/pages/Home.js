import React from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "../assets/home-bg.jpg";
import '../App.css';

function Home() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };

  return (
    <div className="home-container">
      <div className="home-overlay-box">
        <h1>Welcome to Our Mobile Shop!</h1>
        <button className="shop-btn" onClick={handleShopNow}>
          Shop Now
        </button>
      </div>
    </div>
  );
}
export default Home;