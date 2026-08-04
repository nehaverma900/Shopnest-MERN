const express = require("express");
const router = express.Router();



const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");


// Add product to cart
router.post("/add", addToCart);

// Get user's cart
router.get("/:userId", getCart);

// Update cart item quantity
router.put("/update/:cartItemId", updateCart);

// Remove item from cart
router.delete("/remove/:cartItemId", removeFromCart);

// Clear complete cart
router.delete("/clear/:userId", clearCart);


module.exports = router;