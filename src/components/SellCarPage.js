import React, { useState } from "react";
import axios from "axios";

const SellCarPage = ({ cars }) => {
  const [selectedCarId, setSelectedCarId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSellCar = async () => {
    try {
      // Pobierz wybrany samochód na podstawie jego ID
      const selectedCar = cars.find((car) => car._id === selectedCarId);

      // Sprawdź, czy wybrano samochód
      if (!selectedCar) {
        console.error("Selected car not found");
        return;
      }

      // Odejmij ilość sprzedanych pojazdów
      selectedCar.quantity -= quantity;

      // Wyślij zaktualizowany samochód na serwer
      await axios.put(
        `http://localhost:5000/cars/${selectedCarId}`,
        selectedCar
      );

      // Wyczyść wybór samochodu
      setSelectedCarId("");
      // Wyczyść ilość sprzedanych pojazdów
      setQuantity(1);

      // Poinformuj użytkownika o udanej sprzedaży
      alert(`Sold ${quantity} car(s) successfully.`);
    } catch (error) {
      console.error("Error selling car:", error);
    }
  };

  return (
    <div>
      <h2>Sell Car</h2>
      <select
        value={selectedCarId}
        onChange={(e) => setSelectedCarId(e.target.value)}
      >
        <option value="">Select car</option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.model} - {car.year}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleSellCar}>Sell Car</button>
    </div>
  );
};

export default SellCarPage;
