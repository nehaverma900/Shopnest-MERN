import React, { useEffect, useState } from "react";
import axios from "axios";

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
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>User Details</h3>

            <p><strong>Name:</strong> {order.user?.name}</p>
            <p><strong>Email:</strong> {order.user?.email}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>

            <h3>Products</h3>

            {order.orderItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0",
                }}
              >
                <img
                  src={
                    item.product?.images?.length > 0
                      ? item.product.images[0].url
                      : "https://via.placeholder.com/100"
                  }
                  alt={item.product?.name}
                  width="100"
                  height="100"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <div>
                  <h4>{item.product?.name}</h4>
                  <p>Price: ₹{item.product?.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}

            <br />

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
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
                borderRadius: "5px",
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