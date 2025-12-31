import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:5000";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE}/api/messages`);
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      alert("Failed to load messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`${BASE}/api/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.log(err);
      alert("Failed to delete message");
    }
  };

  return (
    <div>
      <h2>Messages</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>WhatsApp</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">No messages found</td>
            </tr>
          ) : (
            messages.map((m) => (
              <tr key={m.id}>
                <td align="center">
                  <a
                    href={`https://wa.me/961${m.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    title="WhatsApp"
                  >
                    📱
                  </a>
                </td>
                <td>{m.phone}</td>
                <td>{m.message}</td>
                <td align="center">
                  <button onClick={() => deleteMessage(m.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
