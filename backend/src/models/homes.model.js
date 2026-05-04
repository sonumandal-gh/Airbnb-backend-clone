const mongoose = require("mongoose");

const homesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description:{
    type: String,
    required: true
  },

  price:{
    type: Number,
    required: true
  },

  location:{
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  images: [
    {
      type: String,
    },
  ],

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, {timestamps: true});

module.exports = mongoose.model('Homes', homesSchema);