const express = require("express");
const router = express.Router();

const {
    createBooking,
    getBookings,
    getMyBookings,
    cancelBooking
} = require("../controllers/booking.controller");

const auth = require("../middleware/auth.middleware");

router.post("/", auth, createBooking);
router.get("/", auth, getBookings);
router.get("/my", auth, getMyBookings);
router.put("/cancel/:id", auth, cancelBooking);

module.exports = router;