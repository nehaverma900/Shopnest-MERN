const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create Order (User Login Required)
router.post(
  "/create",
  authMiddleware,
  createOrder
);

// My Orders
router.get(
  "/myorders",
  authMiddleware,
  getMyOrders
);

// Admin - All Orders
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// Single Order
router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

// Update Order Status (Admin)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

// Delete Order (Admin)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrder
);

module.exports = router;