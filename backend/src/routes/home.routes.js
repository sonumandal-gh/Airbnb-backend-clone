const express = require("express");
const router = express.Router();

const {
  createHome,
  getHome,
  getSingleHome,
  updateHome,
  deletHome
} = require("../controllers/homes.controller");

const {isOwner} = require("../middleware/owner.middleware");

// public
router.get("/", getHome);
router.get("/:id", getSingleHome);

// protected
router.post("/", auth, createHome);
router.put("/:id",auth, isOwner, updateHome);
router.delete("/:id", auth, isOwner, deletHome);

module.exports = router;