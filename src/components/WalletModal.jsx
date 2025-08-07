import React, { useState } from "react";
import axios from "axios";

const WalletModal = ({ onClose, userId, currentBalance, updateWalletBalance }) => {
  const [amount, setAmount] = useState("");
  const handleAddCash = async () => {
  try {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const res = await axios.post("/api/addCash", {
      user_id: userId,
      amount: parsedAmount,
    });

    // ✅ Expect full updated user object
    const updatedUser = res.data;

    // ✅ Call context updater with full user object
    updateWalletBalance(updatedUser);

    // ✅ Also update localStorage directly if needed
    localStorage.setItem("user", JSON.stringify(updatedUser));

    onClose();
  } catch (err) {
    console.error(err);
    alert("Failed to add cash");
  }
};




  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Wallet</h2>
        <p className="mb-2">Current Balance: ${currentBalance.toFixed(2)}</p>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            onClick={handleAddCash}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Cash
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
