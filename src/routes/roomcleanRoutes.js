const express = require('express');
const { getRoomCleanStatus, updateRoomCleanStatus } = require('../controllers/roomcleanController');

const router = express.Router();

router.get('/', getRoomCleanStatus); // Fetch cleaning status
router.post('/update', updateRoomCleanStatus); // Update status

module.exports = router;
