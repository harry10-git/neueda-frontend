import React from "react";

const HoldingsList = ({ holdings }) => {
  return (
    <ul className="space-y-4 mt-8">
      {holdings.map((holding, index) => (
        <li
          key={holding.id || index} // Use holding.id if available, otherwise fallback to index
          className="p-4 border rounded-lg shadow-md bg-white"
        >
          <h2 className="text-lg font-semibold">{holding.stock_name}</h2>
          <p>Quantity: {holding.holding_quantity}</p>
        </li>
      ))}
    </ul>
  );
};

export default HoldingsList;