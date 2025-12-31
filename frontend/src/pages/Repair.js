import React, { useState } from "react";
import axios from "axios";
import repairImg from "../assets/repair.jpg";
import "../App.css";

export default function Repair() {
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !description) {
      alert("Please fill phone number and description");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/repairs", formData);

      if (res.data.success) {
        alert("Repair request submitted");
        setPhone("");
        setDescription("");
        setImage(null);
        const el = document.getElementById("repairImageInput");
        if (el) el.value = "";
      } else {
        alert(res.data.message || "Failed to submit repair request");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="split-page">
      <img className="split-img" src={repairImg} alt="repair" />

      <div className="split-form">
        <h2>Repair Department</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone number (ex: 70123456)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Describe the problem..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
          />

          <input
            id="repairImageInput"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">Submit Repair</button>
        </form>
      </div>
    </div>
  );
}
