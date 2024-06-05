import React from "react";
import { Link } from "react-router-dom";
import "./CarList.css";

const CarList = ({ cars, deleteCar, selectCarToEdit }) => {
  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.model} - {car.year} - ${car.price} - Quantity: {car.quantity} -
            Color: {car.color} - Engine: {car.engine}
            <div className="button-group">
              <Link
                to={`/edit-car/${car._id}`}
                onClick={() => selectCarToEdit(car)}
                className="edit-button"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteCar(car._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
