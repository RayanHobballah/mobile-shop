import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/" className="brand">
          Mobile Shop
        </NavLink>
      </div>

      <div className="nav-right">
        <NavLink to="/" className="link">
          Home
        </NavLink>

        <NavLink to="/shop" className="link">
          Shop
        </NavLink>

        <NavLink to="/about" className="link">
          About Us
        </NavLink>

        <NavLink to="/contact" className="link">
          Contact Us
        </NavLink>

        <NavLink to="/repair" className="link">
          Repair
        </NavLink>

        <NavLink to="/cart" className="link">
          Cart
        </NavLink>

        <NavLink to="/login" className="link loginBtn">
          Login
        </NavLink>
      </div>
    </nav>
  );
}
