const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      default: "General Complaint",
    },
    status: {
      type: String,
      enum: ["Pending", "Updated", "Completed"], // ✅ Restrict status values
      default: "Pending", // ✅ Default status is "Pending"
    },
    amountSpent: {  // ✅ Added this field to store the cost
        type: Number,
        default: 0,
      },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
