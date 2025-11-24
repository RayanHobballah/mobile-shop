import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import repairImg from "../assets/repair.jpg";
import '../App.css';


 function Repair({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    alert("Repair request submitted.");
  };

  return (
    <div className="repair-page">
      <img src={repairImg} alt="repair" />
      <div>
        <h2>Phone Repair</h2>
        <textarea placeholder="Describe the problem"></textarea>
        <input type="file" />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
export default Repair;