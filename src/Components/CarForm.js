import React, { useState, useEffect } from "react";

const CarForm = ({ addCar, editCar, carToEdit }) => {
  const [car, setCar] = useState({ model: "", year: "", price: "" });

  useEffect(() => {
    if (carToEdit) {
      setCar(carToEdit);
    }
  }, [carToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carToEdit) {
      editCar(car);
    } else {
      addCar(car);
    }
    setCar({ model: "", year: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={car.model}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={car.year}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={car.price}
        onChange={handleChange}
        required
      />
      <button type="submit">{carToEdit ? "Edit Car" : "Add Car"}</button>
    </form>
  );
};

export default CarForm;
