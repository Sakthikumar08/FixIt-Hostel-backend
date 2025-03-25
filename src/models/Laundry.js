const mongoose = require("mongoose");

const laundrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  noOfDresses: { type: Number, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Laundry", laundrySchema);