import React from "react";
import { useNavigate } from "react-router-dom";
import aboutImg from "../assets/logo.png";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div
        className="about-image"
        style={{ backgroundImage: `url(${aboutImg})` }}
      ></div>

      <div className="about-content">
        <h1>About Our Mobile Shop</h1>

        <p>
          We provide high-quality mobile phones, accessories, and professional repair services.
        </p>

        <p>
          Whether you are buying a new phone or fixing one, we are here to help you.
        </p>

        <button className="about-btn" onClick={() => navigate("/shop")}>
          Explore More
        </button>
      </div>
    </div>
  );
}
