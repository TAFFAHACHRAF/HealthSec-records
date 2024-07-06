"use client"

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';

const AddPatientForm = () => {
  const [patientData, setPatientData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    cin: "",
    doctorID: "",
  });

  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const userId = cookies.get("userId"); // Assuming userId is stored in cookies

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8082/api/v1/patients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...patientData,
          doctorID: userId, // Include userId in the request body
        }),
      });

      if (response.ok) {
        console.log("Patient added successfully");
        window.location.href = "/patients"; // Redirect to patients page
      } else {
        console.error("Failed to add patient data");
      }
    } catch (error) {
      console.error("Error adding patient data:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add Patient" url="" />

      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
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
                  type="text"
                  name="firstname"
                  value={patientData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={patientData.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
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
                  value={patientData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={patientData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={patientData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  value={patientData.gender}
                  onChange={handleChange}
                  placeholder="Gender"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={patientData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  CIN
                </label>
                <input
                  type="text"
                  name="cin"
                  value={patientData.cin}
                  onChange={handleChange}
                  placeholder="CIN"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-opacity-90 focus:outline-none"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPatientForm;
