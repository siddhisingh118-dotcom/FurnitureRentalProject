require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ===== Middleware =====
app.use(express.json());

// CORS setup for frontend
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ===== Routes =====
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/admin");
const supportRoutes = require("./routes/supportRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/orders", orderRoutes);

// ===== Serve Frontend in Production =====
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "client/build");
  app.use(express.static(clientBuildPath));

  app.get(/^\/.*$/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// ===== Error handling middleware =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong" });
});

// ===== MongoDB Connection & Server Start =====
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));