"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ResponseMedicalRecordDTO } from "@/types/record";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

const RecordTablePage = () => {
  const [recordData, setRecordData] = useState<ResponseMedicalRecordDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10); // Number of records per page
  const cookies = new Cookies();

  useEffect(() => {
    const fetchRecords = async () => {
      const token = cookies.get('accessToken'); // Make sure you have a cookie named 'accessToken'
      try {
        const response = await fetch(`http://localhost:8082/api/v1/records/all?page=${currentPage-1}&size=${recordsPerPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecordData(data.content);
        } else {
          console.error('Failed to fetch records data');
        }
      } catch (error) {
        console.error('Error fetching records data', error);
      }
    };

    fetchRecords();
  }, []);

  // const handleUpdate = (recordId: string) => {
  //   window.location.href = `/records/update?id=${recordId}`;
  // };

  const handleConsult = (recordId: string) => {
    window.location.href = `/records/consult?id=${recordId}`;
  };

  const handleAddRecord = () => {
    window.location.href = `/records/add`;
  };

  const handleDelete = async (recordId: string) => {
    const token = cookies.get('accessToken');
    try {
      const response = await fetch(`http://localhost:8082/api/v1/records/${recordId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {   
        setRecordData(prevRecords => prevRecords.filter(record => record.recordID !== recordId)); 
        alert('Record deleted successfully');
        console.log(`Record with ID ${recordId} deleted successfully`);
        // window.location.reload(); 
      } else {
        console.error(`Failed to delete record with ID ${recordId}`);
      }
    } catch (error) {
      console.error(`Error deleting record with ID ${recordId}:`, error);
    }
  };

  // Filtering records based on search term
  const filteredRecords = recordData.filter(record =>
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Medical Records" url=""/>

      <div className="flex flex-col gap-10">
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search records..."
              className="px-4 py-2 border border-gray-300 rounded bg-[#F7F9FC] text-left dark:bg-dark-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddRecord} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Record
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                  Patient Id
                </th>
                <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                  Notes
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Diagnosis
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Treatment
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index} className={`${index === currentRecords.length - 1 ? "border-b-0" : "border-b"} border-[#eee] px-4 py-4 dark:border-dark-3`}>
                  <td className="text-dark dark:text-white">
                    {record.patientId}
                  </td>
                  <td className="text-dark dark:text-white">
                    {record.notes}
                  </td>
                  <td className="text-dark dark:text-white">
                    {record.diagnosis}
                  </td>
                  <td className="text-dark dark:text-white">
                    {record.treatment}
                  </td>
                  <td className="flex space-x-4 text-dark dark:text-white">             
                    <button onClick={() => handleDelete(record.recordID)} className="hover:text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => handleConsult(record.recordID)} className="hover:text-green-500">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-end mt-4">
            <nav className="block">
              <ul className="flex pl-0 list-none rounded my-2">
                {Array.from({ length: Math.ceil(filteredRecords.length / recordsPerPage) }, (_, i) => (
                  <li key={i} className="mx-1">
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded ${currentPage === i + 1 ? 'bg-gray-300' : ''}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RecordTablePage;
