const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  try {
    const { name, empid, department, hostel, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ empid });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    // Create new admin and hash password
    const admin = new Admin({ name, empid, department, hostel, password });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { empid, password } = req.body;

    const admin = await Admin.findOne({ empid });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token, // ✅ Return token
      admin: {
        name: admin.name,
        empid: admin.empid,
        department: admin.department,
        hostel: admin.hostel,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAdminDetails = async (req, res) => {
  try {
    const empid = req.user.empid; // Extract empid from authenticated admin

    if (!empid) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const admin = await Admin.findOne({ empid }).select("-password"); // Exclude password

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin details", error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin, getAdminDetails };