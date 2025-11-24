import React from "react";
import '../App.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <img src={product.img} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={onAddToCart}>Buy</button>
    </div>
  );
}
export default ProductCard;