const express = require('express');
const { createComplaint, getAllComplaints, updateComplaint, getComplaintStatsByType } = require('../controllers/complaintController');

const router = express.Router();

// POST route to create a new complaint
router.post('/', createComplaint);

// GET route to fetch all complaints
router.get('/', getAllComplaints);

router.put("/:id", updateComplaint);

router.get('/statsByType', getComplaintStatsByType);




module.exports = router;
