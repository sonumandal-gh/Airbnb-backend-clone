const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoConnect = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// routes import
const userRoutes = require("./src/routes/user.routes");
const homeRoutes = require("./src/routes/home.routes");
const bookingRoutes = require("./src/routes/booking.routes");

// routes connect
app.use("/api/users", userRoutes);
app.use("/api/homes", homeRoutes);
app.use("/api/bookings", bookingRoutes);

// server start
const PORT = process.env.PORT || 3000;

mongoConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});