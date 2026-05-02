const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken
} = require("../controllers/user.controller");

const auth = require("../middleware/auth.middleware");

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// protected routes
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

router.post("/logout", auth, logoutUser);

module.exports = router;