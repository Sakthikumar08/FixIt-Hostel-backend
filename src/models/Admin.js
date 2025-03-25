const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empid: { type: String, required: true, unique: true }, 
  department: { type: String, required: true },
  hostel: { type: String, enum: ["Boys", "Girls"], required: true },
  password: { type: String, required: true },
});

// Hash password before saving to DB
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
