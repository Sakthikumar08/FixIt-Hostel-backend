// routes/adminRoutes.js
const express = require("express");
const { registerAdmin, loginAdmin, getAdminDetails } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/details", protect, getAdminDetails); // Secure admin details route

module.exports = router;