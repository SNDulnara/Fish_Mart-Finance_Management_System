import React, { useState } from "react";
import BackButton from "../../components/Salary/BackButton";
import Spinner from "../../components/Salary/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import backgroundImage from "../../images/Salary/17.jpg";

const CreateStaff = () => {
  const [full_name, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [hire_date, setHireDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const roles = [
    "Warehouse Staff",
    "Fleet Manager",
    "Fisherman",
    "Rider",
    "Other",
  ];

  const handleSaveStaff = () => {
    // Name validation
    if (!/^[A-Za-z\s]+$/.test(full_name)) {
      enqueueSnackbar("Please enter letters only for Name", {
        variant: "error",
      });
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      enqueueSnackbar("Please enter a valid email address", {
        variant: "error",
      });
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone_number)) {
      enqueueSnackbar("Please enter a valid 10-digit phone number", {
        variant: "error",
      });
      return;
    }

    // Salary validation
    if (!/^\d+$/.test(salary)) {
      enqueueSnackbar("Please enter a valid number for salary", {
        variant: "error",
      });
      return;
    }

    const data = {
      full_name,
      role,
      email,
      phone_number,
      address,
      salary,
      hire_date,
      status,
    };

    setLoading(true);
    axios
      .post("http://localhost:3000/api/staff", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Staff member created successfully", {
          variant: "success",
        });
        navigate("/staff");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Error creating staff member", { variant: "error" });
      });
  };

  return (
    <div
      className="p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="min-h-screen">
        <div className="p-4">
          <BackButton destination="/staff" />
          <h1 className="text-3xl my-4 text-center font-bold text-black">
            Add New Staff Member
          </h1>
          {loading ? <Spinner /> : ""}
          <div className="flex flex-col border-2 border-black rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Full Name</label>
              <input
                type="text"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              >
                <option value="">Select a role</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Phone Number</label>
              <input
                type="text"
                value={phone_number}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="border-2 border-gray-500 px-4 py-2 w-full"
                maxLength={10}
              />
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Salary</label>
              <input
                type="text"
                value={salary}
                onChange={(e) =>
                  setSalary(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Hire Date</label>
              <input
                type="date"
                value={hire_date}
                onChange={(e) => setHireDate(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              className="p-2 bg-sky-300 m-8 font-bold text-black"
              onClick={handleSaveStaff}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
