import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../context/authContext"; // Import AuthContext

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const navigate = useNavigate(); // Initialize navigate

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
          <h1 className="text-2xl font-bold text-white">NeuCoin</h1>
          {user && (
            <span className="text-lg text-white font-medium">
              Welcome, {user.user_name}, {user.user_id}
            </span>
          )}
        </div>

        {/* Links */}
        <ul className="flex space-x-6 text-white font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/stockData"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              StockData
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/sell"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Sell
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;