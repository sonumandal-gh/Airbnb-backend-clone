const Booking = require("../models/booking.model");
const Home = require("../models/homes.model");

const createBooking = async (req, res) => {
  try {
    const { homeId, checkInDate, checkOutDate, guestCount } = req.body;

    if (!homeId || !checkInDate || !checkOutDate || !guestCount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Home check
    const home = await Home.findById(homeId);
    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    // Date validation
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({ message: "Check-out date must be after check-in date" });
    }

    // Calculate total price
    const days = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * home.price;

    const booking = await Booking.create({
      user: req.user._id,
      home: homeId,
      checkInDate,
      checkOutDate,
      guestCount,
      totalPrice,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email")
      .populate("home");

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get User Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("home");

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the person who booked can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  cancelBooking,
};