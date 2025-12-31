import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const BASE = "http://localhost:5000";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE}/api/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const searchText = search.trim().toLowerCase();
  const enableSearch = searchText.length >= 3;

  const filteredCategories = categories
    .map((cat) => {
      const products = Array.isArray(cat.products) ? cat.products : [];
      const filteredProducts = enableSearch
        ? products.filter((p) => (p.name || "").toLowerCase().includes(searchText))
        : products;
      return { ...cat, products: filteredProducts };
    })
    .filter((cat) => (enableSearch ? cat.products.length > 0 : true));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px" }}>
        <input
          type="text"
          placeholder="Search product (type 3 letters)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 260, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ padding: "0 20px 20px 20px" }}>
        {filteredCategories.length === 0 ? (
          <p>{enableSearch ? "No products found." : "No categories/products found."}</p>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id} style={{ marginBottom: 30 }}>
              <h2 style={{ marginBottom: 15 }}>{cat.name}</h2>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
                {cat.products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
