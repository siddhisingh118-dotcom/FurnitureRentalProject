const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const { items, paymentMethod, paymentStatus } = req.body;

const newOrder = new Order({
 items: items.map(item => ({
  name: item.name,
  rentPrice: item.rentPrice || 0,
  quantity: item.quantity || 1
})),
  paymentMethod,
  paymentStatus,
  status: "Confirmed",
});

    const savedOrder = await newOrder.save();

    res.status(200).json({
      message: "Order placed successfully",
      order: savedOrder,
    });

  } catch (err) {
    res.status(500).json({ error: "Error placing order" });
  }
});

module.exports = router;