const mongoose = require("mongoose");

//URL Schema
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },

  shortUrl: {
    type: String,
    required: true,
  },

  unique_name: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
