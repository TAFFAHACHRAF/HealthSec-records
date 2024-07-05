"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const UpdateDoctorForm = () => {
  const [doctorData, setDoctorData] = useState({
    personID: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    cin: "",
    doctorSpecialization: "",
  });

  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get("id");
    if (doctorId) {
      fetchDoctorData(doctorId);
    }
  }, []);

  const fetchDoctorData = async (doctorId:any) => {
    try {
      const response = await fetch(`http://localhost:8082/api/v1/doctors/getby/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDoctorData(data);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const doctorId = urlParams.get("id");
      
      const requestBody = {
        address: doctorData.address,
        doctorSpecialization: doctorData.doctorSpecialization,
        gender: doctorData.gender,
        phone: doctorData.phone,
        dateOfBirth: new Date(doctorData.dateOfBirth).toISOString(),
      };

      const response = await fetch(`http://localhost:8082/api/v1/doctors/update/${doctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Doctor updated successfully");
        window.location.href = "/doctors"; // Redirect to doctors page
      } else {
        console.error("Failed to update doctor data");
      }
    } catch (error) {
      console.error("Error updating doctor data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">Input Fields</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  First Name
                </label>
                <input
                  disabled
                  type="text"
                  name="firstname"
                  value={doctorData.firstname}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Last Name
                </label>
                <input
                  disabled
                  type="text"
                  name="lastname"
                  value={doctorData.lastname}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={doctorData.phone}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={doctorData.email}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={doctorData.address}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Gender
                </label>
                <input
                  disabled
                  type="text"
                  name="gender"
                  value={doctorData.gender}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Date of Birth
                </label>
                <input
                  disabled
                  type="date"
                  name="dateOfBirth"
                  value={doctorData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  CIN
                </label>
                <input
                  disabled
                  type="text"
                  name="cin"
                  value={doctorData.cin}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Specialization
                </label>
                <input
                  type="text"
                  name="doctorSpecialization"
                  value={doctorData.doctorSpecialization}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
              >
                Update Doctor
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateDoctorForm;
