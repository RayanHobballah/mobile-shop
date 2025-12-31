import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const BASE_URL = "http://localhost:5000";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shop</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {categories.length === 0 && !error && (
        <p>No categories/products found.</p>
      )}

      {categories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: "30px" }}>
          <h3>{cat.name}</h3>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {cat.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
