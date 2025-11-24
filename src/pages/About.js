import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../assets/logo.png"; 

 function About() {
  return (
    <div className="about-page">
      <div className="about-image-wrapper">
        <img src={aboutImg} alt="About our mobile shop" />
      </div>
      <div className="about-text">
        <h2>About Our Mobile Shop</h2>
        <p>
          We are a modern mobile shop offering a wide range of smartphones,
          accessories, and repair services. Our goal is to provide high quality
          products with friendly customer service and simple online shopping.
        </p>
        <p>
          From the latest flagship phones to budget devices, our team is always
          ready to help you choose the best option for your needs.
        </p>
        <Link to="/shop">
          <button>Explore More</button>
        </Link>
      </div>
    </div>
  );
}
export default About;