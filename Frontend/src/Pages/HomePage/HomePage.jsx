import React from "react";
import backgroundImage from "./../../images/Salary/17.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h1 className="text-3xl font-bold text-sky-600 mb-8">Fish Mart</h1>

        <p className="text-lg text-gray-700 mb-6">
          Welcome to Fish Mart, your trusted partner for all your fishery needs.
        </p>

        <div className="space-y-4">
          <Link to="/salary">
            <button className="bg-indigo-600 text-white font-semibold rounded-md p-4 w-full mb-2 cursor-pointer">
              View Salaries.
            </button>
          </Link>
          <Link to="/profitandloss">
            <button className="bg-indigo-600 text-white font-semibold rounded-md p-4 w-full mb-2 cursor-pointer">
              Profit And Loss Statement.
            </button>
          </Link>
          <Link to="/SOFP">
            <button className="bg-indigo-600 text-white font-semibold rounded-md p-4 w-full mb-2 cursor-pointer">
              Statement of Financial Position.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
