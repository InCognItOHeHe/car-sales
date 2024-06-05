const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new car
router.post("/", async (req, res) => {
  const car = new Car({
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    quantity: req.body.quantity,
    color: req.body.color,
    engine: req.body.engine,
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a car
router.put("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.model = req.body.model;
    car.year = req.body.year;
    car.price = req.body.price;
    car.quantity = req.body.quantity;
    car.color = req.body.color;
    car.engine = req.body.engine;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a car
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: "Car not found" });
    }

    await car.remove();
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
