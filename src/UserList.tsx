import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log("✅ Users:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("❌ Error fetching users:", err));
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
  };

  const headerStyle = {
    textAlign: "center" as const,
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const itemStyle = {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "0.2s",
    backgroundColor: "#fafafa",
  };

  const nameStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "#222",
  };

  const emailStyle = {
    fontSize: "14px",
    color: "#666",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>👥 User List</h2>

        {users.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>No users found.</p>
        ) : (
          <ul style={listStyle}>
            {users.map((u:any) => (
              <li key={u._id} style={itemStyle}>
                <p style={nameStyle}>{u.name}</p>
                <p style={emailStyle}>{u.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
