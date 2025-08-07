import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../context/authContext"; // Import AuthContext
import { FaWallet } from "react-icons/fa"; // Import wallet icon

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const [walletCash, setWalletCash] = useState(null); // State to store wallet cash
  const navigate = useNavigate(); // Initialize navigate

  const fetchWalletCash = async () => {
    try {
      const response = await fetch("/api/getWalletCash/", {
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
      setWalletCash(Number(data.wallet_cash)); // Update wallet cash from API response
    } catch (error) {
      console.error("Error fetching wallet cash:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWalletCash();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigate("/"); // Redirect to the home page after logout
    } catch (error) {
      alert(`Logout failed: ${error.message}`); // Handle any errors
    }
  };

  return (
    <nav className=" bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] px-8 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Title and Username */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")} // Navigate to `/` on click
            className="text-2xl font-bold text-white hover:text-blue-800 transition-colors hover:scale-110 duration-300 "
          >
            NeuCoin
          </button>
          <div className="flex items-center justify-center">
            {user && (
              <span className="text-xl text-white font-medium">
                Welcome, {user.user_name}
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <ul className="flex space-x-6 text-white font-medium items-center">
          <li className="hover:scale-125 duration-300">
            <Link
              to="/home"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li className="hover:scale-125 duration-300">
            <Link
              to="/stockData"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              StockData
            </Link>
          </li>
          <li className="hover:scale-125 duration-300">
            <Link
              to="/buy"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Buy
            </Link>
          </li>
          <li className="hover:scale-125 duration-300">
            <Link
              to="/sell"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Sell
            </Link>
          </li>

          {/* Wallet Icon */}
          <li className="hover:scale-125 duration-300">
            <button
              onClick={() => navigate("/addCash")}
              className="flex items-center space-x-2 hover:text-gray-200 transition-colors duration-300"
            >
              <FaWallet className="text-xl" /> {/* Wallet Icon */}
              <span>Wallet</span>
            </button>
          </li>
        </ul>

        {/* Chat-Bot and Logout Buttons */}
        <div className="flex items-center space-x-4">
        {/* <h3 className="text-white font-serif text-lg">{user.user_name}</h3> */}
          {/* Chat-Bot Button */}
          <button
            onClick={() => navigate("/chatbot")}
            className="relative inline-block text-lg group"
          >
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative">Chat-Bot</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="relative inline-block text-lg group"
          >
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-red-500 transition-colors duration-300 ease-out border-2 border-red-500 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-red-500 group-hover:-rotate-180 ease"></span>
              <span className="relative">Logout</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-red-500 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
