import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ProfitLossChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const years = ['2023', '2024', '2025'];
        const data = await Promise.all(
          years.map(async (year) => {
            const response = await axios.get(`http://localhost:3000/api/profitandloss/${year}`);
            return {
              year,
              fishSales: response.data.fishSales || 0,
              totalProfit: response.data.totalProfit || 0,
              netProfit: response.data.otherProfit || 0
            };
          })
        );
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-sky-600 mb-6">Financial Performance Overview</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `Rs. ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="fishSales"
              name="Fish Sales"
              stroke="#0284c7"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="totalProfit"
              name="Total Profit"
              stroke="#059669"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="netProfit"
              name="Net Profit"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitLossChart; 