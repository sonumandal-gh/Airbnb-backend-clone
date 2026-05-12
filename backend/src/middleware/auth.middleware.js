const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    //Extract token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    //Extract token from cookies
    else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // No token
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    //Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //Get user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

module.exports = authMiddleware;