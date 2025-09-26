import React, { useState } from "react";
import BackButton from "../../components/Salary/BackButton";
import Spinner from "../../components/Salary/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import backgroundImage from "../../images/Salary/17.jpg";

const CreateSalaryRecoard = () => {
  const [staff_id, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const [allowance, setAllowance] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleStaffIdChange = (e) => {
    const inputStaffId = e.target.value;
    setStaffId(inputStaffId);

    if (inputStaffId.length >= 6) {
      // Fetch staff details from the staff table
      axios
        .get(`http://localhost:3000/api/staff/staff-data/${inputStaffId}`)
        .then((response) => {
          if (response.data) {
            setName(response.data.full_name);
            setBasicSalary(response.data.salary.toString());
            setMessage({ text: "Employee found successfully!", type: "success" });
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
          } else {
            setName("");
            setBasicSalary("");
            setMessage({ text: "Invalid Staff ID - Person not found", type: "error" });
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
          }
        })
        .catch((error) => {
          console.log(error);
          setName("");
          setBasicSalary("");
          setMessage({ text: "Invalid Staff ID - Person not found", type: "error" });
          setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        });
    } else {
      setName("");
      setBasicSalary("");
      setMessage({ text: "", type: "" });
    }
  };

  const handleSaveSalary = () => {
    if (!staff_id || !name || !basicSalary) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    // Validate hours if provided
    if (hours && (!/^\d+(\.\d{1,2})?$/.test(hours) || parseFloat(hours) <= 0 || parseFloat(hours) > 300)) {
      setMessage({ text: "Please enter valid hours (between 1 and 300)", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    // Validate days if provided
    if (days && (!/^\d+$/.test(days) || parseInt(days) <= 0 || parseInt(days) > 31)) {
      setMessage({ text: "Please enter valid days (between 1 and 31)", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    // Validate allowance if provided
    if (allowance) {
      if (!/^\d+(\.\d{1,2})?$/.test(allowance)) {
        setMessage({ text: "Please enter a valid number for allowance", type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        return;
      }
      if (parseFloat(allowance) > 999999) {
        setMessage({ text: "Allowance cannot exceed 999,999", type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        return;
      }
    }

    const salaryData = {
      staff_id,
      name,
      basicSalary,
      hours: hours || undefined,
      days: days || undefined,
      allowance: allowance || undefined
    };

    setLoading(true);
    axios
      .post("http://localhost:3000/api/salary", salaryData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Salary Record Created successfully", { variant: "success" });
        navigate("/salary");
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error creating salary:', error);
        setMessage({ 
          text: error.response?.data?.message || "Error creating salary record", 
          type: "error" 
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      });
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Message Popup */}
      {message.text && (
        <div
          className={`fixed bottom-4 left-4 p-4 rounded-lg shadow-lg ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {message.text}
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <BackButton destination="/salary" />
          <h1 className="text-3xl font-bold text-gray-800 text-center mt-6 mb-4">
            Create New Salary Record
          </h1>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
            Enter staff ID to retrieve employee information and create a salary
            record
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center my-8">
            <Spinner />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header Bar */}
              <div className="bg-sky-600 px-6 py-4">
                <h2 className="text-white text-lg font-bold">
                  New Salary Record
                </h2>
                <p className="text-sky-100 text-sm">
                  Enter employee details below
                </p>
              </div>

              <form className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Staff ID Section - Always visible */}
                  <div className="border-b pb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Staff ID <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={staff_id}
                        onChange={handleStaffIdChange}
                        className="border border-gray-300 rounded-l-lg w-full px-4 py-2.5 text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                        placeholder="Enter Staff ID (S-XXXX)"
                        maxLength={6}
                      />
                      <div className="bg-gray-100 px-4 py-2.5 rounded-r-lg border border-l-0 border-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the staff ID in format S-XXXX to retrieve employee information
                    </p>
                  </div>

                  {/* Rest of the form - Only show if name exists */}
                  {name && (
                    <>
                      {/* Employee Info Section */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-800 mb-3">
                          Employee Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={name}
                              readOnly
                              className="bg-white border border-gray-200 rounded-lg w-full px-3 py-2 text-gray-700 text-sm focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Basic Salary (Rs.)
                            </label>
                            <input
                              type="text"
                              value={basicSalary}
                              readOnly
                              className="bg-white border border-gray-200 rounded-lg w-full px-3 py-2 text-gray-700 text-sm focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Salary Details Section */}
                      <div className="border-t pt-6">
                        <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wider mb-4">
                          Salary Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Working Hours{" "}
                              <span className="text-gray-400 text-xs">
                                (Optional)
                              </span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={hours}
                                onChange={(e) =>
                                  setHours(
                                    e.target.value.replace(/[^0-9.]/g, "")
                                  )
                                }
                                className="border border-gray-300 rounded-lg w-full pl-4 pr-10 py-2.5 text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                                placeholder="e.g. 160"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                hrs
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Total working hours for this period
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Working Days{" "}
                              <span className="text-gray-400 text-xs">
                                (Optional)
                              </span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={days}
                                onChange={(e) =>
                                  setDays(e.target.value.replace(/[^0-9]/g, ""))
                                }
                                className="border border-gray-300 rounded-lg w-full pl-4 pr-10 py-2.5 text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                                placeholder="e.g. 20"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                days
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Number of days worked
                            </p>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Allowance (Rs.){" "}
                              <span className="text-gray-400 text-xs">
                                (Optional)
                              </span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                Rs.
                              </div>
                              <input
                                type="text"
                                value={allowance}
                                onChange={(e) =>
                                  setAllowance(
                                    e.target.value.replace(/[^0-9.]/g, "")
                                  )
                                }
                                className="border border-gray-300 rounded-lg w-full pl-10 py-2.5 text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                                placeholder="Additional allowance amount"
                              />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Any additional allowances for this employee
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-end mt-8">
                        <button
                          type="button"
                          onClick={() => navigate("/salary")}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg mr-4 hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveSalary}
                          className="px-6 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all shadow-md font-medium flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Create Salary
                        </button>
                      </div>

                      {/* Info text */}
                      <div className="text-center mt-6 text-gray-500 text-sm">
                        <p>
                          EPF, ETF, and Net Salary will be automatically calculated based
                          on the above information
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSalaryRecoard;
