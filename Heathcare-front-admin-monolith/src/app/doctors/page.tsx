"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Doctor } from "@/types/doctor";

const DoctorTablePage = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [doctorsPerPage] = useState<number>(10); // Number of doctors per page
  const cookies = new Cookies();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = cookies.get('accessToken'); // Make sure you have a cookie named 'accessToken'
      try {
        const response = await fetch('http://localhost:8082/api/v1/doctors/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDoctorData(data.content);
        } else {
          console.error('Failed to fetch doctor data');
        }
      } catch (error) {
        console.error('Error fetching doctor data', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleUpdate = (doctorId: number) => {
    window.location.href = `/doctors/update?id=${doctorId}`;
  };

  const handleDelete = async (doctorId: number) => {
    const token = cookies.get('accessToken');
    try {
      const response = await fetch(`http://localhost:8082/api/v1/doctors/delete/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setDoctorData(prevDoctors => prevDoctors.filter(doctor => doctor.userId !== doctorId));
        alert(`Doctor with ID ${doctorId} deleted successfully`);
      } else {
        console.error(`Failed to delete doctor with ID ${doctorId}`);
      }
    } catch (error) {
      console.error(`Error deleting doctor with ID ${doctorId}:`, error);
    }
  };

  const handleConsult = (doctorId: number) => {
    window.location.href = `/doctors/consult?id=${doctorId}`;
  };

  const handleAddDoctor = () => {
    window.location.href = "/doctors/add";
  };

  // Filtering doctors based on search term
  const filteredDoctors = doctorData.filter(doctor =>
    doctor.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.cin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Doctors" url=""/>

      <div className="flex flex-col gap-10">
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search doctors..."
              className="px-4 py-2 border border-gray-300 rounded bg-[#F7F9FC] text-left dark:bg-dark-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddDoctor} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Doctor
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
              {currentDoctors.map((doctor, index) => (
                <tr key={index} className={index === currentDoctors.length - 1 ? "border-b-0 border-[#eee] dark:border-dark-3" : "border-b border-[#eee] dark:border-dark-3 px-4 py-4"}>
                  <td className="text-dark dark:text-white">
                    {doctor.firstname} {doctor.lastname}
                  </td>
                  <td className="text-dark dark:text-white">
                    {doctor.phone}
                  </td>
                  <td className="text-dark dark:text-white">
                    {doctor.email}
                  </td>
                  <td className="text-dark dark:text-white">
                    {doctor.address}
                  </td>
                  <td className="text-dark dark:text-white">
                    {doctor.gender}
                  </td>
                  <td className="text-dark dark:text-white">
                    {doctor.cin}
                  </td>
                  <td className="flex space-x-4 text-dark dark:text-white">
                    <button onClick={() => handleUpdate(doctor.userId)} className="hover:text-blue-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(doctor.userId)} className="hover:text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => handleConsult(doctor.userId)} className="hover:text-green-500">
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
                {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }, (_, i) => (
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

export default DoctorTablePage;
