import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const image =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "https://via.placeholder.com/200";

  return (
    <div className="card">
      <img
        src={image}
        alt={product.name}
        width="200"
        height="200"
      />

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <br />
      <br />

      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;