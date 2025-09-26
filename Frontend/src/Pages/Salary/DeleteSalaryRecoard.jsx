import { useState, useEffect } from "react";
import BackButton from "../../components/Salary/BackButton";
import Spinner from "../../components/Salary/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import backgroundImage from "../../images/Salary/17.jpg";

const DeleteSalaryRecoard = () => {
  const [loading, setLoading] = useState(false);
  const [salaryInfo, setSalaryInfo] = useState(null);
  const navigate = useNavigate();
  const { _id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch salary information for display
    axios
      .get(`http://localhost:3000/api/salary/${_id}`)
      .then((response) => {
        setSalaryInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error fetching salary information", {
          variant: "error",
        });
      });
  }, [_id, enqueueSnackbar]);

  const handleDeleteSalary = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/api/salary/${_id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Salary record deleted successfully", {
          variant: "success",
        });
        navigate("/salary");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting salary record", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md">
        <div className="absolute top-8 left-8">
          <BackButton destination="/salary" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Delete Salary Record
          </h1>
          <p className="text-gray-500">This action cannot be undone</p>
        </div>

        {loading ? (
          <div className="flex justify-center my-8">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-red-500 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <div className="px-6 py-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mt-1">
                  Are you sure you want to delete this salary record?
                </p>
              </div>

              {salaryInfo && (
                <div className="bg-gray-50 rounded-md p-4 mb-6">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Employee:</div>
                    <div className="font-medium text-gray-800">
                      {salaryInfo.name}
                    </div>

                    <div className="text-gray-500">Staff ID:</div>
                    <div className="font-medium text-gray-800">
                      {salaryInfo.staff_id}
                    </div>

                    <div className="text-gray-500">Salary ID:</div>
                    <div className="font-medium text-gray-800">
                      {salaryInfo.s_id}
                    </div>

                    <div className="text-gray-500">Net Salary:</div>
                    <div className="font-medium text-gray-800">
                      Rs. {salaryInfo.netSalary}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => navigate("/salary")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSalary}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition-all flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8 text-xs text-gray-500">
          <p>
            Deleting this record will permanently remove all salary data for
            this payment period.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteSalaryRecoard;
