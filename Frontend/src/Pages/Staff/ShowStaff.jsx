import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/Salary/BackButton";
import Spinner from "../../components/Salary/Spinner";
import backgroundImage from "../../images/Salary/10.jpg";

const ShowStaff = () => {
  const [staff, setStaff] = useState({});
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/staff/${_id}`)
      .then((response) => {
        setStaff(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [_id]);

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
      <div className="">
        <div className="p-4">
          <BackButton destination="/staff" />
          <h1 className="text-3xl my-4 text-center font-bold text-black">
            Staff Details
          </h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col border-2 border-black rounded-xl w-[600px] p-4 mx-auto">
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Staff ID
                </span>
                <span className="font-bold text-black">{staff.staff_id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Full Name
                </span>
                <span className="font-bold text-black">{staff.full_name}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Role
                </span>
                <span className="font-bold text-black">{staff.role}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Email
                </span>
                <span className="font-bold text-black">{staff.email}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Phone Number
                </span>
                <span className="font-bold text-black">
                  {staff.phone_number}
                </span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Address
                </span>
                <span className="font-bold text-black">{staff.address}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Salary
                </span>
                <span className="font-bold text-black">{staff.salary}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Hire Date
                </span>
                <span className="font-bold text-black">{staff.hire_date}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Status
                </span>
                <span className="font-bold text-black">{staff.status}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Created At
                </span>
                <span className="font-bold text-black">
                  {new Date(staff.createdAt).toString()}
                </span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500 font-bold text-blue-500">
                  Last Updated
                </span>
                <span className="font-bold text-black">
                  {new Date(staff.updatedAt).toString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowStaff;
