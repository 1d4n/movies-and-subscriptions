const mongoose = require("mongoose");

const movieSubSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Subscription = new mongoose.Schema({
  memberId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  movies: [movieSubSchema],
});

module.exports = mongoose.model("Subscription", Subscription, "subscriptions");
