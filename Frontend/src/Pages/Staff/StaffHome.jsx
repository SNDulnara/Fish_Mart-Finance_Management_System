import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Salary/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import backgroundImage from "../../images/Salary/17.jpg";

const StaffHome = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const keys = ["full_name", "role", "email", "status"];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/staff")
      .then((response) => {
        setStaff(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
        setLoading(false);
      });
  }, []);

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase().includes(query.toLowerCase()))
    );
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
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <div className="flex justify-between items-center my-4">
          <h1 className="text-3xl font-bold text-black">Staff List</h1>
          <Link to="/staff/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border-collapse border border-slate-500">
            <thead>
              <tr>
                <th className="border border-slate-600 p-2">No</th>
                <th className="border border-slate-600 p-2">Staff ID</th>
                <th className="border border-slate-600 p-2">Full Name</th>
                <th className="border border-slate-600 p-2">Role</th>
                <th className="border border-slate-600 p-2">Email</th>
                <th className="border border-slate-600 p-2">Phone</th>
                <th className="border border-slate-600 p-2">Salary</th>
                <th className="border border-slate-600 p-2">Status</th>
                <th className="border border-slate-600 p-2">Operations</th>
              </tr>
            </thead>
            <tbody>
              {search(staff).map((staffMember, index) => (
                <tr key={staffMember._id} className="text-center">
                  <td className="border border-slate-600 p-2">{index + 1}</td>
                  <td className="border border-slate-600 p-2">
                    {staffMember.staff_id}
                  </td>
                  <td className="border border-slate-600 p-2">
                    {staffMember.full_name}
                  </td>
                  <td className="border border-slate-600 p-2">
                    {staffMember.role}
                  </td>
                  <td className="border border-slate-600 p-2">
                    {staffMember.email}
                  </td>
                  <td className="border border-slate-600 p-2">
                    {staffMember.phone_number}
                  </td>
                  <td className="border border-slate-600 p-2">
                    {staffMember.salary}
                  </td>
                  <td className="border border-slate-600 p-2">
                    {staffMember.status}
                  </td>
                  <td className="border border-slate-600 p-2">
                    <div className="flex justify-center gap-2">
                      <Link to={`/staff/details/${staffMember._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/staff/edit/${staffMember._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/staff/delete/${staffMember._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StaffHome;
