const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  qrCode: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode', required: true },
  timestamp: { type: Date, default: Date.now },
  location: String,
  deviceType: String,
  ipAddress: String,
  userAgent: String
});

module.exports = mongoose.model('Event', EventSchema);

