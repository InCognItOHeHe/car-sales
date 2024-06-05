const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const Car = require("./models/car");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Połączenie z MongoDB
mongoose.connect("mongodb://localhost:27017/bmw-sales", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Endpoints

// Pobierz wszystkie samochody
app.get("/cars", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Dodaj nowy samochód
app.post("/cars", async (req, res) => {
  const newCar = new Car(req.body);
  await newCar.save();
  res.json(newCar);
});

// Edytuj samochód
app.put("/cars/:id", async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedCar);
});

// Usuń samochód
app.delete("/cars/:id", async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
