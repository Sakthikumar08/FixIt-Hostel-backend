const Laundry = require("../models/Laundry");
const path = require("path");

exports.addLaundry = async (req, res) => {
  try {
    const { name, department, year, noOfDresses, date, image } = req.body;

    if (!image || !image.startsWith("http")) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    const newLaundry = new Laundry({
      name,
      department,
      year,
      noOfDresses,
      date,
      image,  // Store URL directly
    });

    await newLaundry.save();
    res.status(201).json({ message: "Laundry details saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving laundry details." });
  }
};

exports.getLaundry = async (req, res) => {
  try {
    const laundryList = await Laundry.find();
    res.json(laundryList);
  } catch (error) {
    res.status(500).json({ error: "Error fetching laundry details." });
  }
};


