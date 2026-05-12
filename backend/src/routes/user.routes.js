const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getAllUsers,
  updateUserRole
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// Admin only
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);
router.patch("/:id/role", authMiddleware, adminMiddleware, updateUserRole);

// protected routes
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

router.post("/logout", authMiddleware, logoutUser);

module.exports = router;