const express = require("express");

const router = express.Router();

np

const {
  getDashboardStats,
  getSalesAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
  getProductAnalytics,
} = require("../controllers/analyticsController");

// Dashboard Statistics
router.get("/dashboard", getDashboardStats);

// Sales Analytics
router.get("/sales", getSalesAnalytics);

// Order Analytics
router.get("/orders", getOrderAnalytics);

// User Analytics
router.get("/users", getUserAnalytics);

// Product Analytics
router.get("/products", getProductAnalytics);

module.exports = router;