const express = require('express');
const QRCode = require('qrcode');
const auth = require('../middleware/auth');
const QRCodeModel = require('../models/QRCode');
const Event = require('../models/Event');

const router = express.Router();

// Generate Static QR Code
router.post('/generate-static', auth, async (req, res) => {
  try {
    const { url, metadata } = req.body;
    const qrCode = new QRCodeModel({
      owner: req.user.id,
      url,
      isDynamic: false,
      metadata
    });
    await qrCode.save();

    const qrCodeImage = await QRCode.toDataURL(url);
    res.json({ qrCode, qrCodeImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate Dynamic QR Code
router.post('/generate-dynamic', auth, async (req, res) => {
  try {
    const { url, metadata } = req.body;
    const qrCode = new QRCodeModel({
      owner: req.user.id,
      url,
      isDynamic: true,
      metadata
    });
    await qrCode.save();

    const dynamicUrl = `${process.env.BASE_URL}/qr/${qrCode.id}/redirect`;
    const qrCodeImage = await QRCode.toDataURL(dynamicUrl);
    res.json({ qrCode, qrCodeImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Dynamic QR Code
router.put('/:id/update', auth, async (req, res) => {
  try {
    const { newUrl } = req.body;
    const qrCode = await QRCodeModel.findById(req.params.id);

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    if (qrCode.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (!qrCode.isDynamic) {
      return res.status(400).json({ message: 'This QR code is not dynamic' });
    }

    qrCode.url = newUrl;
    qrCode.updatedAt = new Date();
    await qrCode.save();

    res.json({ message: 'QR code updated successfully', qrCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track QR Code Event
router.post('/:id/track', async (req, res) => {
  try {
    const { location, deviceType } = req.body;
    const event = new Event({
      qrCode: req.params.id,
      location,
      deviceType,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    await event.save();

    res.json({ message: 'Event tracked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get QR Code Events
router.get('/:id/events', auth, async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findById(req.params.id);

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    if (qrCode.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const events = await Event.find({ qrCode: req.params.id });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get QR Code Analytics
router.get('/:id/analytics', auth, async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findById(req.params.id);

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    if (qrCode.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const totalScans = await Event.countDocuments({ qrCode: req.params.id });
    const uniqueUsers = await Event.distinct('ipAddress', { qrCode: req.params.id });
    const scansPerDay = await Event.aggregate([
      { $match: { qrCode: qrCode._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalScans,
      uniqueUsers: uniqueUsers.length,
      scansPerDay
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User's QR Codes
router.get('/my-codes', auth, async (req, res) => {
  try {
    const qrCodes = await QRCodeModel.find({ owner: req.user.id });
    res.json(qrCodes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Redirect Dynamic QR Code
router.get('/:id/redirect', async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findById(req.params.id);

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    res.redirect(qrCode.url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

