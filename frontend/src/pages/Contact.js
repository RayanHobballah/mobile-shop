import React, { useState } from "react";
import axios from "axios";
import contactImg from "../assets/contact.jpg";
import "../App.css";

export default function Contact() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    if (!phone || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        phone,
        message
      });

      if (res.data.success) {
        alert("Message sent successfully");
        setPhone("");
        setMessage("");
      } else {
        alert(res.data.message || "Failed to send message");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="split-page">
      <img className="split-img" src={contactImg} alt="contact" />

      <div className="split-form">
        <h2>Contact Us</h2>

        <form onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Phone number (ex: 70123456)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
