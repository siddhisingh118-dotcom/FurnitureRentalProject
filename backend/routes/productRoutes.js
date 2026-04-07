const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product
router.post("/add", async (req, res) => {
  try {
    const { name, category, rentPrice, securityDeposit, image } = req.body;
    const product = new Product({ name, category, rentPrice, securityDeposit, image });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, category, rentPrice, securityDeposit, image } = req.body;
    if (name) product.name = name;
    if (category) product.category = category;
    if (rentPrice) product.rentPrice = rentPrice;
    if (securityDeposit !== undefined) product.securityDeposit = securityDeposit;
    if (image) product.image = image;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;