const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  recipe: String,
  origin: String,
  isVegetarian: { type: Boolean, required: true },
});
const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
