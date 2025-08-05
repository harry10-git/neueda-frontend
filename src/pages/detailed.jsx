import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext"; // Import AuthContext
import axios from "axios"; // Import axios
import Lottie from "react-lottie-player"; // Import Lottie player
import loadingAnimation from "../assets/Loading circles.json"; // Import loading animation
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"; // Import recharts components

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1", "#FF6F91", "#FFC75F"];

const Detailed = () => {
  const { user } = useContext(AuthContext); // Access user from context
  const [holdings, setHoldings] = useState([]); // State to store holdings
  const [error, setError] = useState(null); // State to handle errors
  const [isLoading, setIsLoading] = useState(true); // State to manage loading animation

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        if (user && user.user_id) {
          const startTime = Date.now(); // Record the start time
          const response = await axios.get(
            `http://localhost:3001/api/holdings/${user.user_id}`
          );
          const elapsedTime = Date.now() - startTime; // Calculate elapsed time
          const delay = Math.max(2000 - elapsedTime, 0); // Ensure a minimum of 2 seconds
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

  // Prepare data for the bar chart
  const barChartData = holdings.map((holding) => ({
    name: holding.stock_name,
    quantity: holding.holding_quantity,
  }));

  // Prepare data for the doughnut chart
  const doughnutChartData = holdings.map((holding) => ({
    name: holding.stock_name,
    value: holding.valuation,
  }));

  return (
    <div>
      <Navbar />
      <div className="p-8 grid grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Number of Stocks Held</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Holdings Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={doughnutChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60} // Add innerRadius to create a doughnut chart
                fill="#8884d8"
                label={(entry) => `${entry.name}: ${(entry.value).toFixed(2)}`}
              >
                {doughnutChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Detailed;