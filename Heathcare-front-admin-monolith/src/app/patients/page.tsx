"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Patient } from "@/types/patient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const PatientTablePage = () => {
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [patientsPerPage] = useState<number>(10); // Number of patients per page
  const cookies = new Cookies();

  useEffect(() => {
    const fetchPatients = async () => {
      const token = cookies.get('accessToken'); // Make sure you have a cookie named 'accessToken'
      try {
        const response = await fetch('http://localhost:8082/api/v1/patients/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setPatientData(data.content);
        } else {
          console.error('Failed to fetch patient data');
        }
      } catch (error) {
        console.error('Error fetching patient data', error);
      }
    };

    fetchPatients();
  }, []);

  const handleUpdate = (patientId: any) => {
    window.location.href = `/patients/update?id=${patientId}`;
  };

  const handleDelete = async (patientId: any) => {
    const token = cookies.get('accessToken');
    try {
      const response = await fetch(`http://localhost:8082/api/v1/patients/delete/${patientId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setPatientData(prevPatients => prevPatients.filter(patient => patient.personID !== patientId));
        alert('Patient deleted with success');
        console.log(`Patient with ID ${patientId} deleted successfully`);
        // window.location.reload();
      } else {
        console.error(`Failed to delete patient with ID ${patientId}`);
      }
    } catch (error) {
      console.error(`Error deleting patient with ID ${patientId}:`, error);
    }
  };

  const handleConsult = (patientId: any) => {
    window.location.href = `/patients/update?id=${patientId}`;
  };

  const handleAddPatient = () => {
    window.location.href = "/patients/add";
  };

  // Filtering patients based on search term
  const filteredPatients = patientData.filter(patient =>
    patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Patients" />

      <div className="flex flex-col gap-10">
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search patients..."
              className="px-4 py-2 border border-gray-300 rounded bg-[#F7F9FC] text-left dark:bg-dark-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddPatient} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Patient
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                  Name
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Phone
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Address
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Gender
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Cin
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => (
                <tr key={index} className={`${index === currentPatients.length - 1 ? "border-b-0" : "border-b"} border-[#eee] px-4 py-4 dark:border-dark-3`}>
                  <td className="text-dark dark:text-white">
                    {patient.firstname} {patient.lastname}
                  </td>
                  <td className="text-dark dark:text-white">
                    {patient.phone}
                  </td>
                  <td className="text-dark dark:text-white">
                    {patient.email}
                  </td>
                  <td className="text-dark dark:text-white">
                    {patient.address}
                  </td>
                  <td className="text-dark dark:text-white">
                    {patient.gender}
                  </td>
                  <td className="text-dark dark:text-white">
                    {patient.cin}
                  </td>
                  <td className="flex space-x-4 text-dark dark:text-white">
                    <button onClick={() => handleUpdate(patient.personID)} className="hover:text-blue-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(patient.personID)} className="hover:text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => handleConsult(patient.personID)} className="hover:text-green-500">
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
                {Array.from({ length: Math.ceil(filteredPatients.length / patientsPerPage) }, (_, i) => (
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

export default PatientTablePage;
