import React, { useState } from 'react';
import { mdiEye, mdiTrashCan, mdiPencil } from '@mdi/js';
import Button from '../Button';
import Buttons from '../Buttons';
import CardBoxModal from '../CardBox/Modal';
import UserAvatar from '../UserAvatar';
import { Patient } from '../../interfaces'; // Assuming Patient interface
import Cookies from 'universal-cookie';

type Props = {
  patients: Patient[];
};

const SamplePatients: React.FC<Props> = ({ patients }) => {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [isModalUpdateActive, setIsModalUpdateActive] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [updatedPatient, setUpdatedPatient] = useState<Patient | null>(null);

  const patientsPaginated = patients.slice(perPage * currentPage, perPage * (currentPage + 1));
  const numPages = Math.ceil(patients.length / perPage);
  const pagesList = Array.from(Array(numPages).keys());

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
    setIsModalUpdateActive(false);
  };

  const handleInfoButtonClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalInfoActive(true);
  };

  const handleUpdateButtonClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setUpdatedPatient(patient);
    setIsModalUpdateActive(true);
  };

  const handleUpdateSubmit = async () => {
    if (!updatedPatient) return;

    try {
      const response = await fetch(`http://localhost:8082/api/v1/patients/update/${updatedPatient.personID}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      });

      if (!response.ok) {
        throw new Error('Failed to update patient');
      }

      setIsModalUpdateActive(false); // Close the modal
      // window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Update patient error:', error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedPatient) {
      setUpdatedPatient({ ...updatedPatient, [name]: value });
    }
  };

  return (
    <>
      <CardBoxModal
        title="Patient Information"
        buttonColor="info"
        buttonLabel="Close"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        {selectedPatient && (
          <>
            <p><b>Name:</b> {selectedPatient.firstname} {selectedPatient.lastname}</p>
            <p><b>Phone:</b> {selectedPatient.phone}</p>
            <p><b>Email:</b> {selectedPatient.email}</p>
            <p><b>Address:</b> {selectedPatient.address}</p>
            <p><b>Gender:</b> {selectedPatient.gender}</p>
            <p><b>Date of Birth:</b> {selectedPatient.dateOfBirth}</p>
          </>
        )}
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>Are you sure you want to delete this patient?</p>
      </CardBoxModal>

      <CardBoxModal
        title="Update Patient"
        buttonColor="info"
        buttonLabel="Save"
        isActive={isModalUpdateActive}
        onConfirm={handleUpdateSubmit}
        onCancel={handleModalAction}
      >
        {updatedPatient && (
          <form>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="firstname"
                value={updatedPatient.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={updatedPatient.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={updatedPatient.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedPatient.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={updatedPatient.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                value={updatedPatient.gender}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={updatedPatient.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </form>
        )}
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {patientsPaginated.map((patient: Patient) => (
            <tr key={patient.personID}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar username={`${patient.firstname} ${patient.lastname}`} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Name">{`${patient.firstname} ${patient.lastname}`}</td>
              <td data-label="Phone">{patient.phone}</td>
              <td data-label="Email">{patient.email}</td>
              <td data-label="Address">{patient.address}</td>
              <td data-label="Gender">{patient.gender}</td>
              <td data-label="Date of Birth">{patient.dateOfBirth}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => handleInfoButtonClick(patient)}
                    small
                  />
                  <Button
                    color="warning"
                    icon={mdiPencil}
                    onClick={() => handleUpdateButtonClick(patient)}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={(page + 1).toString()}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  );
};

export default SamplePatients;
