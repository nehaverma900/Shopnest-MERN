const express = require("express");

const router = express.Router();

const {
  processPayment,
  verifyPayment,
  getPaymentKey,
} = require("../controllers/paymentController");

// Create Payment Order
router.post("/process", processPayment);

// Verify Payment
router.post("/verify", verifyPayment);

// Get Razorpay Key
router.get("/key", getPaymentKey);

module.exports = router;