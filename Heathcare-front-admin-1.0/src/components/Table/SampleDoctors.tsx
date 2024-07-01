import React, { useState } from 'react';
import { mdiEye, mdiTrashCan, mdiPencil } from '@mdi/js';
import Button from '../Button';
import Buttons from '../Buttons';
import CardBoxModal from '../CardBox/Modal';
import UserAvatar from '../UserAvatar';
import { Doctor } from '../../interfaces'; // Assuming Doctor interface
import Cookies from 'universal-cookie';

type Props = {
  doctors: Doctor[];
};

const SampleDoctors: React.FC<Props> = ({ doctors }) => {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [isModalUpdateActive, setIsModalUpdateActive] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [updatedDoctor, setUpdatedDoctor] = useState<Doctor | null>(null);

  const doctorsPaginated = doctors.slice(perPage * currentPage, perPage * (currentPage + 1));
  const numPages = Math.ceil(doctors.length / perPage);
  const pagesList = Array.from(Array(numPages).keys());

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
    setIsModalUpdateActive(false);
  };

  const handleInfoButtonClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalInfoActive(true);
  };

  const handleUpdateButtonClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setUpdatedDoctor(doctor);
    setIsModalUpdateActive(true);
  };

  const handleUpdateSubmit = async () => {
    if (!updatedDoctor) return;

    try {
      const response = await fetch(`http://localhost:8082/api/v1/doctors/update/${updatedDoctor.personID}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDoctor),
      });

      if (!response.ok) {
        throw new Error('Failed to update doctor');
      }

      setIsModalUpdateActive(false); // Close the modal
      // window.location.reload(); // Reload the page if needed
    } catch (error) {
      console.error('Update doctor error:', error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedDoctor) {
      setUpdatedDoctor({ ...updatedDoctor, [name]: value });
    }
  };

  return (
    <>
      <CardBoxModal
        title="Doctor Information"
        buttonColor="info"
        buttonLabel="Close"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        {selectedDoctor && (
          <>
            <p><b>Name:</b> {selectedDoctor.firstname} {selectedDoctor.lastname}</p>
            <p><b>Phone:</b> {selectedDoctor.phone}</p>
            <p><b>Email:</b> {selectedDoctor.email}</p>
            <p><b>Address:</b> {selectedDoctor.address}</p>
            <p><b>Gender:</b> {selectedDoctor.gender}</p>
            <p><b>Date of Birth:</b> {selectedDoctor.dateOfBirth}</p>
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
        <p>Are you sure you want to delete this doctor?</p>
      </CardBoxModal>

      <CardBoxModal
        title="Update Doctor"
        buttonColor="info"
        buttonLabel="Save"
        isActive={isModalUpdateActive}
        onConfirm={handleUpdateSubmit}
        onCancel={handleModalAction}
      >
        {updatedDoctor && (
          <form>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstname"
                value={updatedDoctor.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={updatedDoctor.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={updatedDoctor.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedDoctor.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={updatedDoctor.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                value={updatedDoctor.gender}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={updatedDoctor.dateOfBirth}
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
          {doctorsPaginated.map((doctor: Doctor) => (
            <tr key={doctor.personID}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar username={`${doctor.firstname} ${doctor.lastname}`} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Name">{`${doctor.firstname} ${doctor.lastname}`}</td>
              <td data-label="Phone">{doctor.phone}</td>
              <td data-label="Email">{doctor.email}</td>
              <td data-label="Address">{doctor.address}</td>
              <td data-label="Gender">{doctor.gender}</td>
              <td data-label="Date of Birth">{doctor.dateOfBirth}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => handleInfoButtonClick(doctor)}
                    small
                  />
                  <Button
                    color="warning"
                    icon={mdiPencil}
                    onClick={() => handleUpdateButtonClick(doctor)}
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

export default SampleDoctors;
