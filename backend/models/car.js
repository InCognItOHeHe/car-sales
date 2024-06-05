const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: String,
  year: Number,
  price: Number,
  quantity: Number,
  color: String,
  engine: String,
});

module.exports = mongoose.model("Car", carSchema);
