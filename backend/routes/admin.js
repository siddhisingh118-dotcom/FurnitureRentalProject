const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Product = require("../models/Product");

// ====== Bookings ======

// Get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update booking status
router.put("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.bookingStatus = req.body.bookingStatus; // Delivered / Cancelled
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ====== Dashboard Stats ======
router.get("/stats", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ bookingStatus: "Confirmed" });
    const deliveredBookings = await Booking.countDocuments({ bookingStatus: "Delivered" });
    const totalProducts = await Product.countDocuments();

    res.json({ totalBookings, confirmedBookings, deliveredBookings, totalProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;