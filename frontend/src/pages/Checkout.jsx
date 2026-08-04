import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

// 👇 Apna Render Backend URL
const API_URL = "https://shopnest-mern-3-v5io.onrender.com";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!name || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const orderItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        `${API_URL}/api/orders/create`,
        {
          orderItems,
          totalPrice,
          shippingInfo: {
            name,
            phone,
            address,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Order Placed Successfully!");
        clearCart();
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Order Failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Checkout</h2>

      <h3>Total Amount: ₹{totalPrice}</h3>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Shipping Address"
        rows="4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={handlePlaceOrder}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
