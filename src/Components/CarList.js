import React from "react";
import { Link } from "react-router-dom";
import "./CarList.css";

const CarList = ({ cars, deleteCar, selectCarToEdit }) => {
  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.model} - {car.year} - ${car.price}
            <div className="button-group">
              <Link
                to={`/edit-car/${car.id}`}
                onClick={() => selectCarToEdit(car)}
              >
                Edit
              </Link>
              <button onClick={() => deleteCar(car.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
