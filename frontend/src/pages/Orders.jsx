import React, { useEffect, useState } from "react";
import axios from "axios";

// 👇 Apna Render Backend URL
const API_URL = "https://shopnest-mern-3-v5io.onrender.com";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API_URL}/api/orders/myorders`,
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Total Price:</strong> ₹{order.totalPrice}
            </p>

            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>

            <h4>Products:</h4>

            {order.orderItems.map((item, index) => (
              <div key={index}>
                <p>
                  {item.product?.name} × {item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;