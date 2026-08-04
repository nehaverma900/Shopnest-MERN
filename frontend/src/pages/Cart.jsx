import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const API_URL = "https://shopnest-mern-3-v5io.onrender.com";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          {cart.map((product) => {
            const image =
              product.images?.length > 0
                ? `${API_URL}${product.images[0].url}`
                : "https://via.placeholder.com/120";

            return (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={image}
                  alt={product.name}
                  width="120"
                  height="120"
                />

                <h3>{product.name}</h3>

                <p>Price: ₹{product.price}</p>

                <h4>Quantity: {product.quantity}</h4>

                <button onClick={() => decreaseQuantity(product._id)}>
                  ➖
                </button>

                <button
                  onClick={() => increaseQuantity(product._id)}
                  style={{ margin: "0 10px" }}
                >
                  ➕
                </button>

                <br />
                <br />

                <button onClick={() => removeFromCart(product._id)}>
                  Remove
                </button>
              </div>
            );
          })}

          <hr />

          <h2>Total: ₹{total}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;