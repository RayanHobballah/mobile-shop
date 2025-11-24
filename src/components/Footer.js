import React from "react";
import { Link } from "react-router-dom";

 function Footer() {
  return (
    <footer className="footer">
      <h3>Mobile Shop</h3>
      <p>
        <Link to="/about">About Us</Link> |{" "}
        <Link to="/contact">Contact Us</Link>
      </p>
      <p>© 2025 Copyright</p>
    </footer>
  );
}
export default Footer;