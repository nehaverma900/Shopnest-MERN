import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const image =
    product.images && product.images.length > 0
      ? `http://localhost:5000${product.images[0].url}`
      : "https://via.placeholder.com/350";

  return (
    <div style={{ padding: "30px" }}>
      <h1>Product Details</h1>

      <img
        src={image}
        alt={product.name}
        width="350"
        height="350"
      />

      <h2>{product.name}</h2>

      <h3>₹{product.price}</h3>

      <p>{product.description}</p>

      <p><b>Category:</b> {product.category}</p>

      <p><b>Stock:</b> {product.stock}</p>

      <button>Add To Cart</button>
    </div>
  );
}

export default ProductDetails;