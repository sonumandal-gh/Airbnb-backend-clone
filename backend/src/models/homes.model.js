const mongoose = require("mongoose");

const homesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },

  description:{
    type: String,
    require: true
  },

  price:{
    type: Number,
    require: true
  },

  location:{
    type: String,
    require: true
  },

  country: {
    type: String,
    require: true
  },

  Image: {
    type: String,
  },

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, {timestamps: true});

module.exports = mongoose.model('Homes', homesSchema);