const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const Food = require("./models/food.js");

const server = express();
server.use(express.urlencoded({ extended: false }));
server.use(methodOverride("_method")); // we use this prefix to change the method
server.use(express.static("public"));
server.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
server.listen(3000, () => {
  console.log("Listening on port 3000");
});

// GET /
server.get("/", async (req, res) => {
  res.render("index.ejs");
});

server.get("/foods/new", (req, res) => {
  res.render("foods/new.ejs");
});

// create
server.post("/foods", async (req, res) => {
  if (req.body.isVegetarian === "on") {
    req.body.isVegetarian = true;
  } else {
    req.body.isVegetarian = false;
  }
  await Food.create(req.body);
  res.redirect("/foods");
});

server.get("/foods", async (req, res) => {
  const allFoods = await Food.find();

  res.render("foods/index.ejs", { foods: allFoods });
});

server.get("/foods/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);
  res.render("foods/show.ejs", { food: food });
});

server.delete("/foods/:id", async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.redirect("/foods");
});
//Edit

server.get("/foods/:id/edit", async (req, res) => {
  const foundFood = await Food.findById(req.params.id);
  res.render("foods/edit.ejs", {
    food: foundFood,
  });
});

//Update

server.put("/foods/:id", async (req, res) => {
  if (req.body.isVegetarian === "on") {
    req.body.isVegetarian = true;
  } else {
    req.body.isVegetarian = false;
  }
  await Food.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/foods/${req.params.id}`);
});
