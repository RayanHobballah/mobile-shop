import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:5000";
const MAIN_ADMIN_USERNAME = "72330526@students.liu.edu.lb";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loggedAdminUsername = localStorage.getItem("adminUsername");
  const isMainAdmin = loggedAdminUsername === MAIN_ADMIN_USERNAME;

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${BASE}/api/admins`);
      setAdmins(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      alert("Failed to load admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async () => {
    if (!isMainAdmin) {
      alert("Only main admin can add admins");
      return;
    }

    if (!newUsername || !newPassword) {
      alert("All fields required");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE}/api/admins`,
        { username: newUsername, password: newPassword },
        { headers: { "x-admin-username": loggedAdminUsername } }
      );

      if (res.data && res.data.success) {
        setNewUsername("");
        setNewPassword("");
        fetchAdmins();
      } else {
        alert((res.data && res.data.message) || "Failed to add admin");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const deleteAdmin = async (id, username) => {
    if (!isMainAdmin) {
      alert("Only main admin can delete admins");
      return;
    }

    if (username === MAIN_ADMIN_USERNAME) {
      alert("Cannot delete main admin");
      return;
    }

    if (!window.confirm("Delete this admin?")) return;

    try {
      const res = await axios.delete(`${BASE}/api/admins/${id}`, {
        headers: { "x-admin-username": loggedAdminUsername }
      });

      if (res.data && res.data.success) fetchAdmins();
      else alert((res.data && res.data.message) || "Failed to delete admin");
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <h2>Admins</h2>

      {!isMainAdmin ? (
        <p style={{ color: "red" }}>Only main admin can add/delete admins.</p>
      ) : null}

      <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 6, marginBottom: 15 }}>
        <h3>Add Admin</h3>

        <input
          type="email"
          placeholder="Admin email"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={{ padding: 8, marginRight: 10, width: 240 }}
        />

        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ padding: 8, marginRight: 10, width: 240 }}
        />

        <button onClick={addAdmin} disabled={!isMainAdmin}>
          Add
        </button>
      </div>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan="3" align="center">No admins found</td>
            </tr>
          ) : (
            admins.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.username}</td>
                <td align="center">
                  <button
                    onClick={() => deleteAdmin(a.id, a.username)}
                    disabled={!isMainAdmin || a.username === MAIN_ADMIN_USERNAME}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
