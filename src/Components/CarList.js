import React from "react";

const CarList = ({ cars, deleteCar, selectCarToEdit }) => {
  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.model} - {car.year} - ${car.price}
            <button onClick={() => selectCarToEdit(car)}>Edit</button>
            <button onClick={() => deleteCar(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
