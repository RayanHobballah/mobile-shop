import React from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "../assets/home-bg.jpg";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="home-overlay">
        <h1>Welcome to Our Mobile Shop</h1>
        <p>
          Buy phones, accessories, and request repairs easily.
          Quality products, fast service, and trusted support.
        </p>

        <button onClick={() => navigate("/shop")}>
          Explore Shop
        </button>
      </div>
    </div>
  );
}
