import { salesdata } from "@/data/data";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SalesTable = () => {
  const [filterDays, setFilterDays] = useState(1); // Default filter: 1 day
  const [filteredData, setFilteredData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date();
    const filteredSalesData = salesdata.filter((row) => {
      const rowDate = new Date(row.date);
      const differenceInDays = (currentDate - rowDate) / (1000 * 3600 * 24);
      return differenceInDays <= filterDays;
    });
    setFilteredData(filteredSalesData);
  }, [filterDays]);

  const handleFilterChange = (event) => {
    const days = parseInt(event.target.value);
    setFilterDays(days);
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    // Chart.js configuration
    const ctx = document.getElementById("salesChart");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: filteredData.map((row) => row.date),
        datasets: [
          {
            label: "Sales",
            data: filteredData.map((row) => row.sales),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Sales",
            },
          },
        },
      },
    });
  }, [filteredData]);

  return (
    <div>
      <div className="text-end px-10 bg-green-500">
        <select
          value={filterDays}
          onChange={handleFilterChange}
          className="border-2 py-2 my-4 rounded-lg"
        >
          <option value={1}>1 day</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
          {/* Add more filter options if needed */}
        </select>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 border-b">Date </th>
            <th className="py-2 border-b">Product Name</th>
            <th className="py-2 border-b">Product Price</th>
            <th className="py-2 border-b">Quantity</th>
            <th className="py-2 border-b">Total Sales</th>
            <th className="py-2 border-b">Store Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td className="py-2 text-center border-b">{row.date}</td>
              <td className="py-2 text-center border-b">{row.productName}</td>
              <td className="py-2 text-center border-b">{row.productPrice}</td>
              <td className="py-2 text-center border-b">{row.quantity}</td>
              <td className="py-2 text-center border-b">{row.sales}</td>
              <td className="py-2 text-center border-b">{row.storeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <h1 className="text-3xl text-center mt-10 font-bold text-green-500">Graph Chart</h1>
      <canvas id="salesChart" className="mt-6"></canvas> */}
    </div>
  );
};

export default SalesTable;
