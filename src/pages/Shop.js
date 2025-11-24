import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import '../App.css';


 function Shop({ user, addToCart }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 999,
      img: product1,
      description: "128GB, 6.1-inch display, excellent performance",
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      price: 899,
      img: product2,
      description: "256GB, AMOLED display, high-quality camera",
    },
    {
      id: 3,
      name: "Xiaomi Redmi Note 11",
      price: 299,
      img: product3,
      description: "128GB, fast charging, budget friendly",
    },
    {
      id: 4,
      name: "Apple AirPods Pro",
      price: 249,
      img: product4,
      description: "Noise-cancelling, wireless charging case",
    },
  ];

  return (
    <div className="shop-page">
      <h1 className="shop-title">Our Products</h1>
      <div className="products-container">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}
export default Shop;