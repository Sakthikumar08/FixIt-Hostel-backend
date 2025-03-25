const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, rollNo, department, batch, hostel, roomNo, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ rollNo });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Create new user and hash password
    const user = new User({ name, rollNo, department, batch, hostel, roomNo, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    const user = await User.findOne({ rollNo });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token, // ✅ Return token
      user: {
        name: user.name,
        rollNo: user.rollNo,
        department: user.department,
        batch: user.batch,
        hostel: user.hostel,
        roomNo: user.roomNo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
const getUserDetails = async (req, res) => {
  try {
    const rollNo = req.user.rollNo; // Extract rollNo from authenticated user

    if (!rollNo) {
      return res.status(400).json({ message: "Roll number is required" });
    }

    const user = await User.findOne({ rollNo }).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error: error.message });
  }
};





module.exports = { registerUser, loginUser, getUserDetails };
