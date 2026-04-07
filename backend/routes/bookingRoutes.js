const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Product = require("../models/Product");


// ADD BOOKINGS
router.post("/add", async (req, res) => {

  try {

    const {
      userName,
      userId,
      productId,
      productName,
      productImage,
      rentPrice,
      rentalDuration,
      securityDeposit,
      totalPrice,
      deliveryAddress,
      deliveryDate
    } = req.body;

    console.log("Incoming productId:",productId);
    console.log("Incoming Data 👉", req.body);

    const booking = new Booking({
      userName,
      userId,
      productId,
      productName,
      productImage,
      rentPrice,
      rentalDuration,
      securityDeposit,
      totalPrice,
      deliveryAddress,
      deliveryDate,
      bookingStatus: "Confirmed"
    });

    await booking.save();
    
    if (productId){
    await Product.findByIdAndUpdate(productId, {
      isAvailable: false
    })
  };

    res.json({ message: "Booking successful" });

  } catch (error) {
  console.log("FULL ERROR 👉", error);
  console.log("ERROR MESSAGE 👉", error.message);
  res.status(500).json({ message: error.message });
}

});

// GET ALL BOOKINGS
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("productId", "category");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET BOOKINGS BY USER
router.get("/user/:userId", async (req, res) => {

  try {

    const bookings = await Booking.find({
      userId: req.params.userId
    });

    res.json(bookings);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

// UPDATE RENTAL DURATION
router.put("/update/:id", async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const duration = req.body.rentalDuration;

    const securityDeposit = booking.rentPrice * 2;

    const totalPrice = (booking.rentPrice * duration) + securityDeposit;

    booking.rentalDuration = duration;
    booking.securityDeposit = securityDeposit;
    booking.totalPrice = totalPrice;

    await booking.save();

    res.json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

// SCHEDULE PICKUP DATE
router.put("/schedule-pickup/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.pickupDate = new Date(req.body.pickupDate);

    await booking.save();

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REQUEST RETURN
router.put("/request-return/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.returnRequested = true;

    await booking.save();

    res.json({ success: true, booking });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// APPROVE RETURN
router.put("/approve-return/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.returnApproved = true;
    booking.bookingStatus = "Return Approved";

    await booking.save();

    await Product.findByIdAndUpdate(booking.productId, {
      isAvailable: true
    });

    res.json({ success: true, booking });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// COMPLETE BOOKING (MAKE PRODUCT AVAILABLE AGAIN)
router.put("/complete/:id", async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "Completed";

    await booking.save();

    res.json({ success: true, booking });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;