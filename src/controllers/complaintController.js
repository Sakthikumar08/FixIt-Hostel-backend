const Complaint = require('../models/Complaint');

// Create a new complaint (POST)
const createComplaint = async (req, res) => {
    try {
        const { name, email, department, roomNumber, date, description, complaintType } = req.body;

        if (!name || !email || !department || !roomNumber || !date || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const complaint = new Complaint({
            name,
            email,
            department,
            roomNumber,
            date,
            description,
            complaintType,
        });

        const savedComplaint = await complaint.save();
        res.status(201).json(savedComplaint);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get all complaints (GET)
/* const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
 */
const getAllComplaints = async (req, res) => {
    try {
        const { type } = req.query; // Get the complaint type from query params
        let complaints;

        if (type) {
            complaints = await Complaint.find({ complaintType: type }); // Filter complaints by type
        } else {
            complaints = await Complaint.find(); // Fetch all complaints if no type is specified
        }

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
// ✅ Update complaint status and amount spent
const updateComplaint = async (req, res) => {
    const { id } = req.params;
    const { status, amountSpent } = req.body;
  
    try {
      const complaint = await Complaint.findById(id);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
  
      // Update fields
      complaint.status = status || complaint.status;
      complaint.amountSpent = amountSpent !== undefined ? amountSpent : complaint.amountSpent;
  
      // Save updated complaint
      await complaint.save();
      res.json({ message: "Complaint updated successfully", complaint });
    } catch (error) {
      console.error("Error updating complaint:", error);
      res.status(500).json({ message: "Failed to update complaint", error: error.message });
    }
  };

  const getComplaintStatsByType = async (req, res) => {
    try {
        const complaintStats = await Complaint.aggregate([
            {
                $group: {
                    _id: "$complaintType",  // Grouping by complaint type
                    raised: { $sum: 1 },
                    updated: { $sum: { $cond: [{ $eq: ["$status", "Updated"] }, 1, 0] } },
                    completed: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } },
                    totalAmountSpent: { $sum: "$amountSpent" }
                }
            }
        ]);

        res.status(200).json(complaintStats);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



module.exports = { createComplaint, getAllComplaints, updateComplaint , getComplaintStatsByType};
