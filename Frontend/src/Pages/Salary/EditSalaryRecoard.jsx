import React, { useState, useEffect } from "react";
import BackButton from "../../components/Salary/BackButton";
import Spinner from "../../components/Salary/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import backgroundImage from "../../images/Salary/17.jpg";

const EditSalaryRecoard = () => {
  const [s_id, setS_id] = useState("");
  const [staff_id, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const [allowance, setAllowance] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const { _id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/salary/${_id}`)
      .then((response) => {
        setS_id(response.data.s_id);
        setStaffId(response.data.staff_id);
        setName(response.data.name);
        setBasicSalary(response.data.basicSalary);
        setHours(response.data.hours);
        setDays(response.data.days || ""); // Handle case where days might not exist in old records
        setAllowance(response.data.allowance);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error fetching salary data", { variant: "error" });
        console.log(error);
      });
  }, [_id]);

  const handleEditSalary = () => {
    // Hours validation - only if provided
    if (
      hours &&
      (!/^\d+(\.\d{1,2})?$/.test(hours) ||
        parseFloat(hours) <= 0 ||
        parseFloat(hours) > 300)
    ) {
      setMessage({ 
        text: "Please enter a valid number of hours (between 1 and 300)", 
        type: "error" 
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    // Days validation - only if provided
    if (
      days &&
      (!/^\d+$/.test(days) || parseInt(days) <= 0 || parseInt(days) > 31)
    ) {
      setMessage({ 
        text: "Please enter a valid number of days (between 1 and 31)", 
        type: "error" 
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    // Allowance validation - only if provided
    if (allowance) {
      if (!/^\d+(\.\d{1,2})?$/.test(allowance)) {
        setMessage({ 
          text: "Please enter a valid number for allowance", 
          type: "error" 
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        return;
      }
      if (parseFloat(allowance) > 999999) {
        setMessage({ 
          text: "Allowance cannot exceed 999,999", 
          type: "error" 
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        return;
      }
    }

    const salaryData = {
      name,
      basicSalary,
      hours: hours || undefined,
      days: days || undefined,
      allowance: allowance || undefined
    };

    setLoading(true);
    axios
      .put(`http://localhost:3000/api/salary/${_id}`, salaryData)
      .then(() => {
        setLoading(false);
        setMessage({ text: "Salary updated successfully!", type: "success" });
        setTimeout(() => {
          setMessage({ text: "", type: "" });
          navigate("/salary");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setMessage({ text: "Error updating salary record", type: "error" });
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
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-800 text-center mt-6 mb-4">
            Update Salary Information
          </h1>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
            Modify salary details and optional information for this employee
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
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-white text-lg font-bold">
                      Staff: {name}
                    </h2>
                    <p className="text-sky-100 text-sm">ID: {staff_id}</p>
                  </div>
                  <div className="bg-white text-sky-600 rounded-lg px-3 py-1 text-sm font-bold">
                    Salary #{s_id}
                  </div>
                </div>
              </div>

              <form className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Read-only fields */}
                  <div className="col-span-full">
                    <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wider mb-4 border-b pb-2">
                      Employee Information
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Staff ID
                    </label>
                    <input
                      type="text"
                      value={staff_id}
                      readOnly
                      className="bg-gray-50 border border-gray-200 rounded-lg w-full px-4 py-2.5 text-gray-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      readOnly
                      className="bg-gray-50 border border-gray-200 rounded-lg w-full px-4 py-2.5 text-gray-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Basic Salary
                    </label>
                    <input
                      type="text"
                      value={basicSalary}
                      readOnly
                      className="bg-gray-50 border border-gray-200 rounded-lg w-full px-4 py-2.5 text-gray-700 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Fixed monthly salary
                    </p>
                  </div>

                  {/* Editable fields */}
                  <div className="col-span-full mt-2">
                    <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wider mb-4 border-b pb-2">
                      Modify Salary Details
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Working Hours{" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) =>
                        setHours(e.target.value.replace(/[^0-9.]/g, ""))
                      }
                      className="border border-gray-300 rounded-lg w-full px-4 py-2.5 text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                      placeholder="e.g. 160"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Total working hours for this period
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Working Days{" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={days}
                      onChange={(e) =>
                        setDays(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="border border-gray-300 rounded-lg w-full px-4 py-2.5 text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                      placeholder="e.g. 20"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Number of days worked
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allowance (Rs.){" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={allowance}
                      onChange={(e) =>
                        setAllowance(e.target.value.replace(/[^0-9.]/g, ""))
                      }
                      className="border border-gray-300 rounded-lg w-full px-4 py-2.5 text-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                      placeholder="Additional allowance amount"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Any additional allowances for this employee
                    </p>
                  </div>
                </div>

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
                    onClick={handleEditSalary}
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
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    Update Salary
                  </button>
                </div>
              </form>
            </div>

            <div className="text-center mt-6 text-gray-500 text-sm">
              <p>
                All changes will be automatically calculated including EPF, ETF
                and Net Salary
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditSalaryRecoard;
