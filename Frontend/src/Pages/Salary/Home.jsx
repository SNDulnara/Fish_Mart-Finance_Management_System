import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Salary/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsSearch } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaFileDownload } from "react-icons/fa";
import SalaryPdf from "../../components/Salary/SalaryPdf";
import SalarySearchReportPdf from "../../components/Salary/SalarySearchReportPdf";
import backgroundImage from "../../images/Salary/17.jpg";

const Home = () => {
  const [salary, setSalary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const keys = ["name", "basicSalary", "role", "attendance", "staff_id"];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/salary")
      .then((response) => {
        setSalary(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const search = (data) => {
    if (!query.trim()) return data;
    
    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        if (!value) return false;
        return value.toString().toLowerCase().includes(query.toLowerCase().trim());
      })
    );
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Salary <span className="text-sky-600">Management</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            View and manage employee salary records efficiently with detailed
            information
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Bar and Report Button */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-96">
                <BsSearch className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, salary or role..."
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                  value={query}
                  onChange={handleSearch}
                  autoComplete="off"
                />
              </div>
              
              {/* Generate Report Button - Only show when there are search results */}
              {query && search(salary).length > 0 && (
                <PDFDownloadLink
                  document={<SalarySearchReportPdf searchResults={search(salary)} searchQuery={query} />}
                  fileName={`Salary-Search-Report-${new Date().toISOString().split('T')[0]}.pdf`}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
                >
                  {({ loading }) =>
                    loading ? (
                      <span className="animate-pulse">Generating...</span>
                    ) : (
                      <>
                        <FaFileDownload className="text-lg" />
                        <span>Generate Report</span>
                      </>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div>

            {/* Add New Button */}
            <Link
              to="/salary/create"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
            >
              <MdOutlineAddBox className="text-xl" />
              <span>Add New Salary</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center my-16">
            <Spinner />
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-xl shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Staff ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Basic Salary
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Hours
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Allowance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Overtime
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      EPF
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      ETF
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Net Salary
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {search(salary).map((salary, index) => (
                    <tr
                      key={salary._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {salary.s_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {salary.staff_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {salary.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {salary.role || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900">
                        Rs. {salary.basicSalary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                        {salary.hours || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                        Rs. {salary.allowance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                        Rs. {salary.overtime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                        Rs. {salary.epf}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                        Rs. {salary.etf}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-green-600">
                        Rs. {salary.netSalary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Link
                            to={`/salary/details/${salary._id}`}
                            className="p-2 rounded-full hover:bg-green-100 transition-colors text-green-600"
                            title="View Details"
                          >
                            <BsInfoCircle className="text-lg" />
                          </Link>
                          <Link
                            to={`/salary/edit/${salary._id}`}
                            className="p-2 rounded-full hover:bg-yellow-100 transition-colors text-yellow-600"
                            title="Edit"
                          >
                            <AiOutlineEdit className="text-lg" />
                          </Link>
                          <Link
                            to={`/salary/delete/${salary._id}`}
                            className="p-2 rounded-full hover:bg-red-100 transition-colors text-red-600"
                            title="Delete"
                          >
                            <MdOutlineDelete className="text-lg" />
                          </Link>
                          <PDFDownloadLink
                            document={<SalaryPdf salary={salary} />}
                            fileName={`Salary-${salary.name}-${salary.s_id}.pdf`}
                            className="p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600"
                            title="Download PDF"
                          >
                            {({ loading }) =>
                              loading ? (
                                <span className="animate-pulse">...</span>
                              ) : (
                                <FaFileDownload className="text-lg" />
                              )
                            }
                          </PDFDownloadLink>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {search(salary).length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">
                  No salary records found matching your search
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats Summary Cards */}
        {!loading && salary.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sky-500">
              <h3 className="text-gray-500 text-sm uppercase font-semibold">
                Total Records
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {salary.length}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm uppercase font-semibold">
                Average Salary
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                Rs.{" "}
                {(
                  salary.reduce(
                    (acc, item) => acc + parseFloat(item.netSalary),
                    0
                  ) / salary.length
                ).toFixed(2)}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <h3 className="text-gray-500 text-sm uppercase font-semibold">
                Highest Salary
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                Rs.{" "}
                {Math.max(
                  ...salary.map((item) => parseFloat(item.netSalary))
                ).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
