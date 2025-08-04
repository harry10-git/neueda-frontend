import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1", "#FF6F91", "#FFC75F"];

const PortfolioPieChart = ({ holdings }) => {
  const totalQuantity = holdings.reduce((sum, holding) => sum + holding.holding_quantity, 0);
  const pieData = holdings.map((holding) => ({
    name: holding.stock_name,
    value: holding.holding_quantity, // Use numeric value directly
  }));

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Portfolio Distribution</h2>
      <PieChart width={500} height={400}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label={(entry) => `${entry.name}: ${((entry.value / totalQuantity) * 100).toFixed(2)}%`} // Calculate percentage here
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${((value / totalQuantity) * 100).toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PortfolioPieChart;