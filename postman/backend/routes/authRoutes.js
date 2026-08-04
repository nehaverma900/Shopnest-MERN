const express = require("express");

const router = express.Router();


const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ================= Public Routes =================
router.post("/register", registerUser);
router.post("/login", loginUser);

// ================= Protected Route =================
router.post("/logout", authMiddleware, logoutUser);

// ================= Admin Route =================
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;