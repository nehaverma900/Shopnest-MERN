import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");
  };

  if (!token || !user) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Profile</h2>
        <h3>Please Login First ❌</h3>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>👤 My Profile</h2>

      <hr />

      <h3>Name</h3>
      <p>{user.name}</p>

      <h3>Email</h3>
      <p>{user.email}</p>

      <h3>Role</h3>
      <p>{user.role}</p>

      <br />

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;