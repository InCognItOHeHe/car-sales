import React, { useState } from "react";
import CarForm from "./Components/CarForm";
import CarList from "./Components/CarList";

const App = () => {
  const [cars, setCars] = useState([]);
  const [carToEdit, setCarToEdit] = useState(null);

  const addCar = (car) => {
    car.id = Date.now();
    setCars([...cars, car]);
  };

  const editCar = (updatedCar) => {
    setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
    setCarToEdit(null);
  };

  const deleteCar = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const selectCarToEdit = (car) => {
    setCarToEdit(car);
  };

  return (
    <div>
      <h1>BMW Sales Manager</h1>
      <CarForm addCar={addCar} editCar={editCar} carToEdit={carToEdit} />
      <CarList
        cars={cars}
        deleteCar={deleteCar}
        selectCarToEdit={selectCarToEdit}
      />
    </div>
  );
};

export default App;
