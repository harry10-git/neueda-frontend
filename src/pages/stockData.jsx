import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie-player"; // Import Lottie player
import stockDataAnimation from "../assets/stockData.json"; // Import stockData animation JSON file

const StockData = () => {
  const [stocks, setStocks] = useState([]); // State to store stock data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch data from the API
    const fetchStocks = async () => {
      const startTime = Date.now(); // Record the start time
      try {
        const response = await fetch("http://localhost:3001/api/getAllStocks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time
        const delay = Math.max(2000 - elapsedTime, 0); // Ensure a minimum of 2 seconds
        setTimeout(() => {
          setStocks(data); // Update state with fetched data
          setLoading(false); // Stop loading
        }, delay);
      } catch (err) {
        setError(err.message); // Handle errors
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchStocks();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Lottie
            loop
            animationData={stockDataAnimation}
            play
            style={{ width: 400, height: 400 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6">Stock Data</h1>
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {stocks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Current Price</th>
                  <th className="px-4 py-2 text-left">Price Diff</th>
                  <th className="px-4 py-2 text-left">Percent Change</th>
                  <th className="px-4 py-2 text-left">52-Week High</th>
                  <th className="px-4 py-2 text-left">52-Week Low</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.stock_id} className="border-b">
                    <td className="px-4 py-2">{stock.stock_id}</td>
                    <td className="px-4 py-2">{stock.stock_name}</td>
                    <td className="px-4 py-2">${stock.curr_price}</td>
                    <td
                      className={`px-4 py-2 ${
                        stock.price_diff < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {stock.price_diff > 0 ? "+" : ""}
                      {stock.price_diff}
                    </td>
                    <td
                      className={`px-4 py-2 ${
                        stock.percent_change < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {stock.percent_change > 0 ? "+" : ""}
                      {stock.percent_change}%
                    </td>
                    <td className="px-4 py-2">${stock.week_52_high}</td>
                    <td className="px-4 py-2">${stock.week_52_low}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StockData;