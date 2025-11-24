import React from "react";
import { Link } from "react-router-dom";
import '../App.css';


 function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <h2>Mobile Shop</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop Now</Link></li>
        <li><Link to="/repair">Repair</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
export default Navbar;