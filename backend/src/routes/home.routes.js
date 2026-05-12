const express = require("express");
const router = express.Router();

const {
  createHome,
  getHome,
  getSingleHome,
  updateHome,
  deleteHome
} = require("../controllers/homes.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { isOwner } = require("../middleware/owner.middleware");

// public
router.get("/", getHome);
router.get("/:id", getSingleHome);

// protected
router.post("/", authMiddleware, createHome);
router.put("/:id", authMiddleware, isOwner, updateHome);
router.delete("/:id", authMiddleware, isOwner, deleteHome);

module.exports = router;