import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 hover:scale-105">
      <h2 className="text-xl font-bold mb-4">Number of Stocks Held</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;