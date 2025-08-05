import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext"; // Import AuthContext

const Buy = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [stocks, setStocks] = useState([]); // State to store stocks from API
  const [selectedStockId, setSelectedStockId] = useState(null); // Track selected stock
  const [buyQuantity, setBuyQuantity] = useState(""); // Track input quantity
  const [totalPrice, setTotalPrice] = useState(0); // Track total price
  const [walletCash, setWalletCash] = useState(0); // Initialize wallet cash
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getAllStockBuy/");
        if (!response.ok) {
          throw new Error("Failed to fetch stocks");
        }
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    const fetchWalletCash = async () => {
      try {
        console.log('user id', user.user_id);
        
        const response = await fetch("http://localhost:3001/api/getWalletCash/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.user_id }), // Pass user_id in the body
          
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wallet cash");
        }

        const data = await response.json();
        console.log('gotten cash ', data.wallet_cash);
        
        setWalletCash(Number(data.wallet_cash)); // Update wallet cash from API response
      } catch (error) {
        console.error("Error fetching wallet cash:", error);
      }
    };

    if (user) {
      fetchStocks();
      fetchWalletCash();
    }
  }, [user]);

  const handleBuy = async (stockId, stockPrice) => {
    const totalCost = buyQuantity * stockPrice;

    if (totalCost > walletCash) {
      alert("Insufficient funds");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id, // Correct field name
          stock_id: stockId, // Correct field name
          buyQuantity: buyQuantity, // Correct field name
          curr_price: stockPrice, // Correct field name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to buy stock");
        return;
      }

      // Navigate to home on successful purchase
      navigate("/home");
    } catch (error) {
      console.error("Error buying stock:", error);
      alert("An error occurred while processing your request.");
    }
  };

  const handleQuantityChange = (stockId, stockPrice, quantity) => {
    setSelectedStockId(stockId); // Set the selected stock
    setBuyQuantity(quantity); // Update the quantity
    setTotalPrice(quantity * stockPrice); // Calculate total price
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Buy Stocks</h1>
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Logo</th>
              <th className="px-4 py-2 text-left">Stock Name</th>
              <th className="px-4 py-2 text-left">Current Price</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={`${stock.stock_id}-${index}`} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={stock.logo}
                    alt={`${stock.stock_name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                </td>
                <td className="px-4 py-2">{stock.stock_name}</td>
                <td className="px-4 py-2">${stock.curr_price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={selectedStockId === stock.stock_id ? buyQuantity : ""}
                    onFocus={() => {
                      setSelectedStockId(stock.stock_id);
                      setBuyQuantity(""); // Clear previous input
                      setTotalPrice(0); // Reset total price
                    }}
                    onChange={(e) =>
                      handleQuantityChange(
                        stock.stock_id,
                        stock.curr_price,
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleBuy(stock.stock_id, stock.curr_price)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Price */}
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-gray-600">
            Wallet Cash: ${Number(walletCash).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Buy;