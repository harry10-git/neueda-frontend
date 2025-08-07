import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Lottie from "react-lottie-player";
import loadingAnimation from "../assets/Ai-powered marketing tools abstract.json";
import BarChartComponent from "../components/BarChartComponent";
import DoughnutChartComponent from "../components/DoughnutChartComponent";
import PnLTableComponent from "../components/PnLTableComponent"; // Import PnLTableComponent

const Detailed = () => {
  const { user } = useContext(AuthContext);
  const [holdings, setHoldings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        if (user && user.user_id) {
          const startTime = Date.now();
          const response = await axios.get(
            `/api/holdings/${user.user_id}`
          );
          const elapsedTime = Date.now() - startTime;
          const delay = Math.max(2000 - elapsedTime, 0);
          setTimeout(() => {
            setHoldings(response.data);
            setIsLoading(false);
          }, delay);
        }
      } catch (err) {
        setError("Failed to fetch holdings. Please try again later.");
        setIsLoading(false);
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

  const barChartData = holdings.map((holding) => ({
    name: holding.stock_name,
    quantity: holding.holding_quantity,
  }));

  const doughnutChartData = holdings.map((holding) => ({
    name: holding.stock_name,
    value: holding.valuation,
  }));

  return (
    <div>
      <Navbar />
      <div className="px-8 py-4 grid grid-cols-2 gap-8 mt-4">
        <BarChartComponent data={barChartData} />
        <DoughnutChartComponent data={doughnutChartData} />
      </div>

      <div className="px-8 py-4">
        <PnLTableComponent holdings={holdings} />
      </div>
    </div>
  );
};

export default Detailed;