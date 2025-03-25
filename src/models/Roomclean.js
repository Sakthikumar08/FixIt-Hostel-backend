const mongoose = require('mongoose');

const roomCleanSchema = new mongoose.Schema({
  roomNo: { type: String, required: true },
  date: { type: String, required: true }, // Store as YYYY-MM-DD
  cleaned: { type: Boolean, default: false }, // True if cleaned
});

module.exports = mongoose.model('RoomClean', roomCleanSchema);
