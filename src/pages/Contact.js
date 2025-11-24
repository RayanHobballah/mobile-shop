import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import contactImg from "../assets/contact.jpg";
import '../App.css';


 function Contact({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    alert("Message submitted.");
  };

  return (
    <div className="contact-page">
      <img src={contactImg} className="contact-img" alt="contact" />
      <div>
        <h2>Contact Us</h2>
        <textarea placeholder="Send message"></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
export default Contact;