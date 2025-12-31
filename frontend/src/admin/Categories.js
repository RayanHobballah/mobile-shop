import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:5000";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category_id: ""
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE}/api/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      alert("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!categoryName) {
      alert("Category name required");
      return;
    }

    try {
      const res = await axios.post(`${BASE}/api/categories`, { name: categoryName });

      if (res.data && res.data.success) {
        setCategoryName("");
        fetchCategories();
      } else {
        alert((res.data && res.data.message) || "Failed to add category");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const addProduct = async () => {
    const { name, price, description, image, category_id } = productData;

    if (!name || !price || !category_id) {
      alert("Name, price and category required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description || "");
    if (image) formData.append("image", image);
    formData.append("category_id", category_id);

    try {
      const res = await axios.post(`${BASE}/api/products`, formData);

      if (res.data && res.data.success) {
        alert("Product added");
        setProductData({ name: "", price: "", description: "", image: null, category_id: "" });
        const el = document.getElementById("productImageInput");
        if (el) el.value = "";
        fetchCategories();
      } else {
        alert((res.data && res.data.message) || "Failed to add product");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await axios.delete(`${BASE}/api/products/${id}`);
      if (res.data && res.data.success) fetchCategories();
      else alert((res.data && res.data.message) || "Failed to delete product");
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <h2>Categories & Products</h2>

      <div style={{ marginBottom: 20 }}>
        <h3>Add Category</h3>
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{ marginRight: 10, padding: 8 }}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>

      <hr />

      <div style={{ marginBottom: 20 }}>
        <h3>Add Product</h3>

        <input
          type="text"
          placeholder="Product name"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          style={{ display: "block", marginBottom: 10, padding: 8, width: 320 }}
        />

        <input
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          style={{ display: "block", marginBottom: 10, padding: 8, width: 320 }}
        />

        <textarea
          placeholder="Description"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          rows="4"
          style={{ display: "block", marginBottom: 10, padding: 8, width: 320 }}
        />

        <input
          id="productImageInput"
          type="file"
          onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })}
          style={{ display: "block", marginBottom: 10 }}
        />

        <select
          value={productData.category_id}
          onChange={(e) => setProductData({ ...productData, category_id: e.target.value })}
          style={{ display: "block", marginBottom: 10, padding: 8, width: 320 }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={addProduct}>Add Product</button>
      </div>

      <hr />

      {categories.length === 0 ? (
        <p>No categories</p>
      ) : (
        categories.map((cat) => (
          <div key={cat.id} style={{ marginBottom: 20 }}>
            <h3>{cat.name}</h3>

            {cat.products && cat.products.length > 0 ? (
              <ul>
                {cat.products.map((p) => (
                  <li key={p.id} style={{ marginBottom: 6 }}>
                    {p.name} - ${p.price}{" "}
                    <button onClick={() => deleteProduct(p.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
