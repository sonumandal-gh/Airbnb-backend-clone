const express = require("express");
const router = express.Router();

const {
    createBooking,
    getBookings,
    getMyBookings,
    cancelBooking
} = require("../controllers/booking.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getBookings);
router.get("/my", authMiddleware, getMyBookings);
router.put("/cancel/:id", authMiddleware, cancelBooking);

module.exports = router;