const User = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please login first." });
    }

    const user = await User.findById(req.user.id || req.user._id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = adminMiddleware;
