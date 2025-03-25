const express = require("express");
const { registerUser, loginUser, getUserDetails } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", protect, getUserDetails); // Secure user details route
/* router.get("/profile", protect, getUserDetails); */

module.exports = router;
