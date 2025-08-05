import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import Lottie from "react-lottie-player"; // Import Lottie player
import addCashAnimation from "../assets/AddCash.json"; // Import AddCash animation JSON file
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddCash = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [currentBalance, setCurrentBalance] = useState(0); // State to store current balance
  const [amountToAdd, setAmountToAdd] = useState(""); // State to track input amount
  const [loading, setLoading] = useState(false); // State to manage loading
  const [showAnimation, setShowAnimation] = useState(false); // State to manage animation display
  const navigate = useNavigate(); // Initialize navigate

  // Fetch current balance
  useEffect(() => {
    const fetchWalletCash = async () => {
      try {
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
        setCurrentBalance(Number(data.wallet_cash)); // Update current balance
      } catch (error) {
        console.error("Error fetching wallet cash:", error);
      }
    };

    if (user) {
      fetchWalletCash();
    }
  }, [user]);

  // Handle Add Cash
  const handleAddCash = async () => {
    if (!amountToAdd || amountToAdd <= 0) {
      alert("Please enter a valid amount to add.");
      return;
    }

    console.log("Amount to add:", Number(amountToAdd)); // Log the amount being sent to the API

    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:3001/api/addCash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id, // Pass user_id
          amount: Number(amountToAdd), // Pass amount
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add cash");
      }

      const data = await response.json();
      console.log(data.message || "Cash added successfully!");

      setCurrentBalance((prev) => prev + Number(amountToAdd)); // Update balance locally
      setAmountToAdd(""); // Clear input

      // Show animation for 3 seconds and navigate to /home
      setShowAnimation(true);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      console.error("Error adding cash:", error);
      alert("An error occurred while adding cash.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Show animation if `showAnimation` is true
  if (showAnimation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Lottie
          loop={false}
          animationData={addCashAnimation}
          play
          style={{ width: 400, height: 400 }}
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="glowing-card bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Add Cash to Wallet
          </h1>

          {/* Current Balance */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700">
              Current Balance:
            </p>
            <p className="text-3xl font-bold text-green-600">
              ${currentBalance.toFixed(2)}
            </p>
          </div>

          {/* Input for Amount */}
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter Amount to Add:
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add Cash Button */}
          <button
            onClick={handleAddCash}
            disabled={loading}
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            }`}
          >
            {loading ? "Adding Cash..." : "Add Cash"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCash;