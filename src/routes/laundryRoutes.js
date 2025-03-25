const express = require("express");
const { addLaundry, getLaundry } = require("../controllers/laundryController");

const router = express.Router();

router.post("/", addLaundry);  // No file upload
router.get("/", getLaundry);

module.exports = router;
