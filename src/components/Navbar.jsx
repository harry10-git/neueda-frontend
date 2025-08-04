import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext"; // Import AuthContext

const Navbar = () => {
  const { user } = useContext(AuthContext); // Access user from context

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
              to="/trades"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Trades
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;