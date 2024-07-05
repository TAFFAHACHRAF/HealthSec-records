"use client"
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';

const AddRecordForm = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const userId = cookies.get("userId"); // Assuming userId is stored in cookies

  const [recordData, setRecordData] = useState({
    date: "", // Initialize with an empty string
    notes: "",
    diagnosis: "",
    treatment: "",
    patientId: "",
    doctorID: userId, // Assuming doctorID should be set from userId
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8082/api/v1/records/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...recordData,
          doctorID: parseInt(userId), // Ensure doctorID is parsed to integer if needed
          // date: new Date(recordData.date).toISOString(),
        }),
      });

      if (response.ok) {
        console.log("Record added successfully");
        window.location.href = "/records"; // Redirect to records page after successful addition
      } else {
        console.log(recordData)
        console.error("Failed to add record data");
      }
    } catch (error) {
      console.error("Error adding record data:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add Record" url=""/>

      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">Input Fields</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {/* <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={recordData.date}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div> */}

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Notes
                </label>
                <input
                  type="text"
                  name="notes"
                  value={recordData.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Diagnosis
                </label>
                <input
                  type="text"
                  name="diagnosis"
                  value={recordData.diagnosis}
                  onChange={handleChange}
                  placeholder="Diagnosis"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Treatment
                </label>
                <input
                  type="text"
                  name="treatment"
                  value={recordData.treatment}
                  onChange={handleChange}
                  placeholder="Treatment"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Patient ID
                </label>
                <input
                  type="text"
                  name="patientId"
                  value={recordData.patientId}
                  onChange={handleChange}
                  placeholder="Patient ID"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-opacity-90 focus:outline-none"
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddRecordForm;
