// models/fruit.js

const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    recipe: String,
    origin: String,
    isVegetarian: { type: Boolean, required: true },
  });
  const Food = mongoose.model("Food", foodSchema); // create model

  // models/fruit.js

module.exports = Food;
