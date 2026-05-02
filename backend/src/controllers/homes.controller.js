const Home = require("../models/homes.model");

// Add Homes
exports.createHome = async (req, res) => {
  try{
    const {title, description, price, location, country} = req.body;

    if (!title || !description || !price || !location || !country) {
      return res.status(400).json({
        success: false,
        message: "All fields are require"
      });
    }

    // Dublicate/validation logic
    const existing = await Home.findOne({title, location});

    if(existing){
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
      Image: req.body.images || [],
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
exports.getHome = async (req, res) => {
  try{
    const homes = await Home.find();

    res.status(200).json({
      count: Home.length,
      Home
    });
  }
  catch(error){
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

// get single home
exports.getSingleHome = async (req, res) => {
  try{
    const home = await Home.findById(req.params.id).populate("host");

    if(!home){
      return res.status(404).json({
        message: "Home Not found"
      });
    }
  }
  catch(error){
    return rea.status(500).json({
      message: "Home Not Found"
    });
  }
}

// Ubdate Homes
exports.updateHome = async(req, res) => {
  try{
    const {id} = req.params;

    const updatedHome = await Home.findByIdAndUpdate(
      id,
      req.body,
      {new: true}
    );

    // if not found
    if(!updatedHome){
      req.status(404).json({
        message: "home not found"
      });
    }

    res.status(200).json({
      message: "Home updated sussfully",
      Home: updatedHome 
    });

  }
  catch(error){
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

// Delete home
exports.deletHome = async (req, res) => {
  try{
    const {id} = req.params;

    const home = await Home.findByIdAndDelete(id);

    if(!home){
      res.status(400).json({
        message: "Home is not faund"
      });
    }

    res.status(200).json({
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};