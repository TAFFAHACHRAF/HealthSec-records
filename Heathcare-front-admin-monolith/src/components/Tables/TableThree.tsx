// // use client
// import React, { useEffect, useState } from 'react';
// import { Patient } from '@/types/patient';
// import Cookies from 'universal-cookie';

// const TableThree: React.FC = () => {
//   const [patientData, setPatientData] = useState<Patient[]>([]); // State to hold patient data
//   const cookies = new Cookies();
//   const accessToken = cookies.get('accessToken');

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         if (!accessToken) {
//           throw new Error('Access token not found');
//         }

//         const response = await fetch('http://localhost:8082/api/v1/patients/all', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch patient data');
//         }

//         const data = await response.json();
//         setPatientData(data.content); // Update state with fetched data
//       } catch (error) {
//         console.error('Error fetching patient data:', error);
//       }
//     };

//     fetchPatientData();
//   }, [accessToken]); // Include accessToken in dependency array

//   return (
//     <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
//             <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
//               Name
//             </th>
//             <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
//               Phone
//             </th>
//             <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
//               Email
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {patientData.map((patient, index) => (
//             <tr key={index} className={`${index === patientData.length - 1 ? "border-b-0" : "border-b"} border-[#eee] px-4 py-4 dark:border-dark-3`}>
//               <td className="text-dark dark:text-white">
//                 {patient.firstname} {patient.lastname}
//               </td>
//               <td className="text-dark dark:text-white">
//                 {patient.phone}
//               </td>
//               <td className="text-dark dark:text-white">
//                 {patient.email}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableThree;
