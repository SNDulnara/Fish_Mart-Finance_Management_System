import { useState } from "react";
import BackButton from "../../components/Salary/BackButton";
import Spinner from "../../components/Salary/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteStaff = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteStaff = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/api/staff/${_id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Staff member deleted successfully", {
          variant: "success",
        });
        navigate("/staff");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting staff member", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="bg-purple-200 min-h-screen">
      <div className="p-4">
        <BackButton destination="/staff" />
        <h1 className="text-3xl my-4">Delete Staff Member</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto bg-rose-100">
          <h3 className="text-2xl">
            Are you sure you want to delete this staff member?
          </h3>

          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteStaff}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStaff;
