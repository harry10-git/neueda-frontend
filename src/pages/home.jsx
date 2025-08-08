import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext"; // Import AuthContext
import axios from "axios";
import PortfolioPieChart from "../components/PieChart"; // Import the new component
import HoldingsList from "../components/HoldingList"; // Import the HoldingsList component
import Overview from "../components/Overview";
import News from "../components/News";
import Lottie from "react-lottie-player"; // Import Lottie player
import loadingAnimation from "../assets/Loading circles.json"; // Import the loading animation JSON file
import "./home.css";

const Home = () => {
  const { user } = useContext(AuthContext); // Access user from context
  const [holdings, setHoldings] = useState([]); // State to store stock holdings
  const [error, setError] = useState(null); // State to handle errors
  const [isLoading, setIsLoading] = useState(true); // State to manage loading animation

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        if (user && user.user_id) {
          const startTime = Date.now(); // Record the start time
          const response = await axios.get(
            `/api/holdings/${user.user_id}`
          );
          const elapsedTime = Date.now() - startTime; // Calculate elapsed time
          const delay = Math.max(3000 - elapsedTime, 0); // Ensure a minimum of 2 seconds
          setTimeout(() => {
            setHoldings(response.data); // Set the holdings data
            setIsLoading(false); // Stop the loading animation
          }, delay);
        }
      } catch (err) {
        setError("Failed to fetch holdings. Please try again later.");
        setIsLoading(false); // Stop the loading animation in case of an error
      }
    };

    fetchHoldings();
  }, [user]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Lottie
            loop
            animationData={loadingAnimation}
            play
            style={{ width: 650, height: 650 }}
          />
        </div>
      </div>
    );
  }

  if (!error && holdings.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-bold text-gray-700 text-center">
            You have no holdings currently, please buy some stocks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {error && <p className="text-red-500">{error}</p>}

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
              <button
  onClick={() => navigate("/detailed")}
  className="px-4 py-2 bg-indigo-500 font-sans font-bold text-white rounded-xl hover:scale-110"
>
  View Detailed Information
</button>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-7/10 mx-auto" />

      <div>
        <News />
      </div>
    </div>
  );
};

export default Home;