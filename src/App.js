import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CarForm from "./components/CarForm";
import CarList from "./components/CarList";
import axios from "axios";
import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);
  const [carToEdit, setCarToEdit] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await axios.get("http://localhost:5000/cars");
    setCars(response.data);
  };

  const addCar = async (car) => {
    const response = await axios.post("http://localhost:5000/cars", car);
    setCars([...cars, response.data]);
  };

  const editCar = async (updatedCar) => {
    const response = await axios.put(
      `http://localhost:5000/cars/${updatedCar.id}`,
      updatedCar
    );
    setCars(
      cars.map((car) => (car.id === updatedCar.id ? response.data : car))
    );
    setCarToEdit(null);
  };

  const deleteCar = async (id) => {
    await axios.delete(`http://localhost:5000/cars/${id}`);
    setCars(cars.filter((car) => car.id !== id));
  };

  const selectCarToEdit = (car) => {
    setCarToEdit(car);
  };

  return (
    <Router>
      <div>
        <h1>BMW Sales Manager</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-car">Add Car</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <CarList
                  cars={cars}
                  deleteCar={deleteCar}
                  selectCarToEdit={selectCarToEdit}
                />
              }
            />
            <Route
              path="/add-car"
              element={<CarForm addCar={addCar} carToEdit={null} />}
            />
            <Route
              path="/edit-car/:id"
              element={<CarForm editCar={editCar} carToEdit={carToEdit} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
