import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-title">Mobile Shop</div>
          <div className="footer-sub">All rights reserved © {new Date().getFullYear()}</div>
        </div>

        <div className="footer-right">
          <Link className="footer-link" to="/about">About Us</Link>
          <Link className="footer-link" to="/contact">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
