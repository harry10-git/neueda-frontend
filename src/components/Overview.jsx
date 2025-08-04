import React from "react";

const Overview = ({ holdings }) => {
  // Ensure at least 7 rows by adding blank rows if needed
  const rows = [...holdings];
  while (rows.length < 7) {
    rows.push({ stock_id: `blank-${rows.length}`, isBlank: true });
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Logo</th>
            <th className="px-4 py-2 text-left">Stock Name</th>
            <th className="px-4 py-2 text-left">Current Price</th>
            <th className="px-4 py-2 text-left">Holding Qtq</th>
            <th className="px-4 py-2 text-left">Price Difference</th>
            <th className="px-4 py-2 text-left">Percentage Difference</th>
            <th className="px-4 py-2 text-left">52-Week High</th>
            <th className="px-4 py-2 text-left">52-Week Low</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((stock, index) => (
            <tr key={stock.stock_id || index} className="border-b">
              {/* Logo Column */}
              <td className="px-4 py-2">
                {stock.isBlank ? (
                  "-"
                ) : (
                  <img
                    src={stock.logo}
                    alt={`${stock.stock_name} logo`}
                    className="w-8 h-8 object-contain"
                  />
                )}
              </td>
              <td className="px-4 py-2">
                {stock.isBlank ? "-" : stock.stock_name}
              </td>
              <td className="px-4 py-2">
                {stock.isBlank ? "-" : `$${stock.curr_price?.toFixed(2)}`}
              </td>
              <td className="px-4 py-2">
                {stock.isBlank ? "-" : `${stock.holding_quantity?.toFixed(2)}`}
              </td>
              <td
                className={`px-4 py-2 ${
                  stock.isBlank
                    ? ""
                    : stock.price_diff < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {stock.isBlank
                  ? "-"
                  : `${stock.price_diff > 0 ? "+" : ""}${stock.price_diff?.toFixed(2)}`}
              </td>
              <td
                className={`px-4 py-2 ${
                  stock.isBlank
                    ? ""
                    : stock.percent_diff < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {stock.isBlank
                  ? "-"
                  : `${stock.percent_diff > 0 ? "+" : ""}${stock.percent_diff?.toFixed(2)}%`}
              </td>
              <td className="px-4 py-2">
                {stock.isBlank ? "-" : `$${stock.week_52_high?.toFixed(2)}`}
              </td>
              <td className="px-4 py-2">
                {stock.isBlank ? "-" : `$${stock.week_52_low?.toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;