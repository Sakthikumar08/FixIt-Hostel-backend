const RoomClean = require('../models/Roomclean');

// Fetch room cleaning records for a given room and month
exports.getRoomCleanStatus = async (req, res) => {
  try {
    const { roomNo, month, year } = req.query;
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;

    const records = await RoomClean.find({ 
      roomNo, 
      date: { $gte: startDate, $lte: endDate }
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cleaning status for a specific date
exports.updateRoomCleanStatus = async (req, res) => {
  try {
    const { roomNo, date, cleaned } = req.body;

    let record = await RoomClean.findOne({ roomNo, date });
    if (record) {
      record.cleaned = cleaned;
    } else {
      record = new RoomClean({ roomNo, date, cleaned });
    }
    
    await record.save();
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
