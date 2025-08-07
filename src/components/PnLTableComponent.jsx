import React from "react";
import CountUp from "react-countup"; // Import CountUp

const PnLTableComponent = ({ holdings }) => {
  // Calculate total P&L
  const totalPnL = holdings.reduce((total, holding) => {
    const currentValuation = holding.curr_price * holding.holding_quantity;
    const profitLoss = currentValuation - holding.valuation;
    return total + profitLoss;
  }, 0);

  return (
    <div className="">
    <div className="flex items-center justify-center mb-4 text-2xl">
      <p className="mx-8">Total Money Invested: $<CountUp start={0} end={holdings.reduce((sum, h) => sum + h.valuation, 0)} duration={2} decimals={2} separator="," />
      </p>
      <p className="mx-8">
        Total Current Valuation: $<CountUp start={0} end={holdings.reduce((sum, h) => sum + (h.curr_price * h.holding_quantity), 0)} duration={2} decimals={2} separator="," />
      </p>
    </div>
      <div className="bg-[#1A2A80] text-white shadow-md rounded-lg p-6">
        <div className="bg-white shadow-md text-black my-2 py-1 flex items-center justify-center px-4 rounded-lg">
          <h2 className="text-xl font-bold">
            Total Profit & Loss (P&L):{" "}
            <span className={totalPnL >= 0 ? "text-green-600" : "text-red-600"}>
              $
              <CountUp
                start={0}
                end={totalPnL}
                duration={2} // Animation duration in seconds
                decimals={2} // Number of decimal places
                separator="," // Add commas for thousands
              />
            </span>
          </h2>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="border border-gray-300 px-4 py-2">Stock Name</th>
              <th className="border border-gray-300 px-4 py-2">Your Valuation</th>
              <th className="border border-gray-300 px-4 py-2">Current Valuation</th>
              <th className="border border-gray-300 px-4 py-2">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => {
              const currentValuation = holding.curr_price * holding.holding_quantity;
              const profitLoss = currentValuation - holding.valuation;

              return (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{holding.stock_name}</td>
                  <td className="border border-gray-300 px-4 py-2">${holding.valuation.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">${currentValuation.toFixed(2)}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-bold ${
                      profitLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${profitLoss.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default PnLTableComponent;