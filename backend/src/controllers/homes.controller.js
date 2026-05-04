const Home = require("../models/homes.model");

// Add Homes
const createHome = async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;

    if (!title || !description || !price || !location || !country) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Duplicate check
    const existing = await Home.findOne({ title, location });

    if (existing) {
      return res.status(403).json({
        message: "Home already exists"
      });
    }

    const newHome = await Home.create({
      title,
      description,
      price,
      location,
      country,
      images: req.body.images || [],
      host: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Home created successfully",
      data: newHome
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all homes
const getHome = async (req, res) => {
  try {
    const homes = await Home.find();

    res.status(200).json({
      success: true,
      count: homes.length,
      homes
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// get single home
const getSingleHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id).populate("host", "fullName email phoneNumber");

    if (!home) {
      return res.status(404).json({
        message: "Home Not found"
      });
    }

    res.status(200).json({
      success: true,
      data: home
    });
  }
  catch (error) {
    return res.status(500).json({
      message: "Home Not Found",
      error: error.message
    });
  }
};

// Update Homes
const updateHome = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedHome = await Home.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedHome) {
      return res.status(404).json({
        message: "home not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Home updated successfully",
      data: updatedHome
    });

  }
  catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Delete home
const deleteHome = async (req, res) => {
  try {
    const { id } = req.params;

    const home = await Home.findByIdAndDelete(id);

    if (!home) {
      return res.status(404).json({
        message: "Home not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Home deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  createHome,
  getHome,
  getSingleHome,
  updateHome,
  deleteHome
};