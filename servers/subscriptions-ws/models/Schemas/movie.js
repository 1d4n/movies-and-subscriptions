const mongoose = require("mongoose");

const Movie = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  premiered: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Movie", Movie, "movies");
