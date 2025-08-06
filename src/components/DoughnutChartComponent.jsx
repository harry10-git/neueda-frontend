import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1", "#FF6F91", "#FFC75F"];

const DoughnutChartComponent = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 hover:scale-105">
      <h2 className="text-xl font-bold mb-4">Holdings Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${(entry.value).toFixed(2)}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChartComponent;