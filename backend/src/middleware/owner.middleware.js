const Home = require("../models/homes.model");

exports.isOwner = async (req, res) => {
  try{
    const home = await Home.findById(req.params.id);

    if(!home){
      return res.status(404).json({
        message: "Home not found"
      });
    }

    // owner check
    if (home.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not the owner"
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