import React, { useEffect, useState } from "react";
import axios from "axios";

// 👇 Apna Render Backend URL
const API_URL = "https://shopnest-mern-3-v5io.onrender.com";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Status Updated");
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Deleted");
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin - Manage Orders</h2>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>User Details</h3>

            <p><strong>Name:</strong> {order.user?.name}</p>
            <p><strong>Email:</strong> {order.user?.email}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>

            <h4>Products</h4>

            {order.orderItems.map((item, index) => (
              <div key={index}>
                <p>
                  {item.product?.name} × {item.quantity}
                </p>
              </div>
            ))}

            <br />

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>

            <button
              onClick={() => deleteOrder(order._id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;

