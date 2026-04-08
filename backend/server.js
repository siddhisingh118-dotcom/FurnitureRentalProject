require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin"); 
const supportRoutes = require("./routes/supportRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/orders", orderRoutes);

// MongoDB connection
const uri = process.env.MONGO_URI;

console.log("Attempting to connect to MongoDB..."); // Track progress

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000, // Stop hanging after 5 seconds
})
  .then(() => {
    console.log("✅ ✅ ✅ MongoDB Connected Successfully! ✅ ✅ ✅");
  })
  .catch(err => {
    console.log("❌ ❌ ❌ MongoDB Connection Error: ❌ ❌ ❌");
    console.error(err.message);
    // This will tell us if it's a "Timeout", "Auth Failed", or "DNS" issue
  });