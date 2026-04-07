const express = require("express");
const router = express.Router();
const SupportRequest = require("../models/SupportRequest");
const Product = require("../models/Product");


// CREATE SUPPORT REQUEST
router.post("/add", async (req, res) => {

  try {

 const { userName, productName, message } = req.body;

const Product = require("../models/Product");

// find product
const product = await Product.findOne({ name: productName });

let productImage = "";

if (product) {
  productImage = product.image;
}

const request = new SupportRequest({
  userName,
  productName,
  productImage,
  message,
  requestStatus: "Pending"
});

    await request.save();

    res.json({ message: "Support request submitted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// GET ALL REQUESTS (ADMIN)
router.get("/", async (req, res) => {

  const requests = await SupportRequest.find();

  res.json(requests);

});


// UPDATE REQUEST STATUS
router.put("/:id", async (req, res) => {

  await SupportRequest.findByIdAndUpdate(
    req.params.id,
    { requestStatus: req.body.requestStatus },
    { returnDocument: "after" }
  );

  res.json({ message: "Status updated" });

});

// ADMIN REPLY TO SUPPORT REQUEST
router.put("/reply/:id", async (req, res) => {

  try {

    const { adminReply } = req.body;

    await SupportRequest.findByIdAndUpdate(
      req.params.id,
      { adminReply },
      { returnDocument: "after" }
    );

    res.json({ message: "Reply sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

module.exports = router;