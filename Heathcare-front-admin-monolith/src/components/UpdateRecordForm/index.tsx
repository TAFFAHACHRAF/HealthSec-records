"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const UpdateRecordForm = () => {
  const [recordData, setRecordData] = useState({
    recordID: "",
    date: "",
    treatment: "",
    notes: "",
    doctorID: "",
    diagnosis: "",
    patientID: "",
  });

  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const recordId = urlParams.get("id");
    if (recordId) {
      fetchRecordData(recordId);
    }
  }, []);

  const fetchRecordData = async (recordId:any) => {
    try {
      const response = await fetch(`http://localhost:8082/api/v1/records/getby/${recordId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Format the date to YYYY-MM-DD
        const formattedDate = new Date(data.date).toISOString().split('T')[0];
        setRecordData({ ...data, date: formattedDate });
      } else {
        console.error("Failed to fetch record data");
      }
    } catch (error) {
      console.error("Error fetching record data:", error);
    }
  };

  return (
    <>
      <form className="">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">Input Fields</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={recordData.date}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
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
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={recordData.notes}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
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
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateRecordForm;
