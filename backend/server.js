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

const allowedOrigins = [
  "http://localhost:3000",
  "https://furniture-rental-project-d4dcrep1b.vercel.app",
  "https://furniture-rental-project-m05g9zdwe.vercel.app",
  "https://furniture-rental-project.vercel.app", // stable production URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

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
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log("✅ ✅ ✅ MongoDB Connected Successfully! ✅ ✅ ✅");
  })
  .catch(err => {
    console.log("❌ ❌ ❌ MongoDB Connection Error: ❌ ❌ ❌");
    console.error(err.message);
  });