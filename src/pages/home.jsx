import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext"; // Import AuthContext
import axios from "axios";
import PortfolioPieChart from "../components/PieChart"; // Import the new component
import HoldingsList from "../components/HoldingList"; // Import the HoldingsList component
import Overview from "../components/Overview";
import './home.css'
import News from "../components/News";

const Home = () => {
  const { user } = useContext(AuthContext); // Access user from context
  const [holdings, setHoldings] = useState([]); // State to store stock holdings
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(
            `http://localhost:3001/api/holdings/${user.user_id}`
          );
          setHoldings(response.data); // Set the holdings data
        }
      } catch (err) {
        setError("Failed to fetch holdings. Please try again later.");
      }
    };

    fetchHoldings();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {error && <p className="text-red-500">{error}</p>}
        {!error && holdings.length === 0 && (
          <p className="text-gray-500">No holdings found.</p>
        )}

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            {holdings.length > 0 ? (
              <PortfolioPieChart holdings={holdings} />
            ) : (
              <h1 className="text-2xl font-bold text-gray-500">No Holdings</h1>
            )}
          </div>

          {/* Render an Overview component for each stock in the holdings array */}
        
          <div className="col-span-3">
            <div className="mt-14">
            {holdings.length > 0 ? (
              <Overview holdings={holdings} />
            ) : (
              <p className="text-center text-gray-500">
                No holdings available.
              </p>
            )}
            </div>

            <div className="mt-5 flex justify-center">
                <button className="px-4 py-2 bg-indigo-500 font-sans font-bold text-white rounded-xl hover:scale-110">View Detailed Information</button>
            </div>

          </div>
        </div>

        
      </div>

        <hr className="w-8/10 mx-auto" />
        
        <div>
            <News />
        </div>

    </div>
  );
};

export default Home;
