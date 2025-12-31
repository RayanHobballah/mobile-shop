import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:5000";

export default function Repairs() {
  const [repairs, setRepairs] = useState([]);

  const fetchRepairs = async () => {
    try {
      const res = await axios.get(`${BASE}/api/repairs`);
      setRepairs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      alert("Failed to load repairs");
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

  const deleteRepair = async (id) => {
    if (!window.confirm("Delete this repair?")) return;

    try {
      await axios.delete(`${BASE}/api/repairs/${id}`);
      fetchRepairs();
    } catch (err) {
      console.log(err);
      alert("Failed to delete repair");
    }
  };

  return (
    <div>
      <h2>Repairs</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>WhatsApp</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {repairs.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">No repairs found</td>
            </tr>
          ) : (
            repairs.map((r) => (
              <tr key={r.id}>
                <td align="center">
                  <a
                    href={`https://wa.me/961${r.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    title="WhatsApp"
                  >
                    📱
                  </a>
                </td>
                <td>{r.phone}</td>
                <td>{r.description}</td>
                <td align="center">
                  {r.image ? (
                    <img src={`${BASE}/uploads/${r.image}`} alt="repair" width="90" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td align="center">
                  <button onClick={() => deleteRepair(r.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
