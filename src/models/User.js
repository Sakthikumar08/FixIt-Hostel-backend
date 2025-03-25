const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  batch: { type: String, required: true },
  hostel: { type: String, enum: ["Boys", "Girls"], required: true },
  roomNo: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
