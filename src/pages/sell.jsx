import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie-player"; // Import Lottie player
import sellAnimation from "../assets/sell.json"; // Import the sell animation JSON file

const Sell = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [holdings, setHoldings] = useState([]); // State to store holdings
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [selectedStockId, setSelectedStockId] = useState(null); // Track the selected stock for selling
  const [sellQuantities, setSellQuantities] = useState({}); // Track input values for each stock
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const startTime = Date.now(); // Record the start time
        const response = await fetch(`/api/holdings/${user.user_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch holdings");
        }
        const data = await response.json();
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time
        const delay = Math.max(3000 - elapsedTime, 0); // Ensure a minimum of 3 seconds
        setTimeout(() => {
          setHoldings(data);
          setLoading(false); // Stop the loading animation
        }, delay);
      } catch (err) {
        setError(err.message);
        setLoading(false); // Stop the loading animation in case of an error
      }
    };

    fetchHoldings();
  }, [user.user_id]);

  const handleSell = async (stockId, currPrice, sellQuantity) => {
    console.log({
      user_id: user.user_id,
      stock_id: stockId,
      curr_price: currPrice,
      sellQuantity: sellQuantity, // Updated field name
    });
    try {
      const response = await fetch("/api/sell/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          stock_id: stockId,
          curr_price: currPrice,
          sellQuantity: sellQuantity, // Updated field name
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sell stock");
      }

      // Redirect to home page after successful sell
      navigate("/home");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Lottie
            loop
            animationData={sellAnimation}
            play
            style={{ width: 650, height: 650 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Sell Stocks</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {holdings.map((stock) => (
              <div
                key={stock.stock_id}
                className={`bg-white shadow-md rounded-lg p-4 flex flex-col items-center ${
                  selectedStockId === stock.stock_id ? "border-2 border-blue-500" : ""
                }`}
              >
                {/* Stock Logo */}
                <img
                  src={stock.logo}
                  alt={`${stock.stock_name} logo`}
                  className="w-16 h-16 object-contain mb-4"
                />
                {/* Stock Name */}
                <h2 className="text-lg font-bold mb-2">{stock.stock_name}</h2>
                {/* Holding Quantity */}
                <p className="text-gray-600 mb-4">
                  Holdings: {stock.holding_quantity}
                </p>
                {/* Current Price */}
                <p className="text-gray-600 mb-4">
                  Price: ${stock.curr_price.toFixed(2)}
                </p>
                {/* Input for Shares to Sell */}
                <input
                  type="number"
                  min="1"
                  max={stock.holding_quantity}
                  placeholder="Enter shares to sell"
                  className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                  value={sellQuantities[stock.stock_id] || ""}
                  onFocus={() => setSelectedStockId(stock.stock_id)} // Set the selected stock
                  onChange={(e) => {
                    const value = Math.min(
                      stock.holding_quantity,
                      Math.max(0, e.target.value)
                    );
                    setSellQuantities((prev) => ({
                      ...prev,
                      [stock.stock_id]: value, // Update the quantity for the selected stock
                    }));
                  }}
                />
                {/* Sell Button */}
                <button
                  onClick={() => {
                    const sellQuantity = sellQuantities[stock.stock_id];
                    if (sellQuantity > 0) {
                      handleSell(stock.stock_id, stock.curr_price, sellQuantity);
                    } else {
                      alert("Please enter a valid quantity to sell.");
                    }
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Sell
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell;