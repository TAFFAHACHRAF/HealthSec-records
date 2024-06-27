import React, { useState } from 'react';
import { mdiEye, mdiTrashCan, mdiPencil } from '@mdi/js';
import Button from '../Button';
import Buttons from '../Buttons';
import CardBoxModal from '../CardBox/Modal';
import UserAvatar from '../UserAvatar';
import { Record } from '../../interfaces'; // Assuming Record interface
import Cookies from 'universal-cookie';

type Props = {
  records: Record[];
};

const SampleMedicalRecords: React.FC<Props> = ({ records }) => {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const recordsPaginated = records.slice(perPage * currentPage, perPage * (currentPage + 1));
  const numPages = Math.ceil(records.length / perPage);
  const pagesList = Array.from(Array(numPages).keys());

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
  };

  const handleInfoButtonClick = (record: Record) => {
    setSelectedRecord(record);
    setIsModalInfoActive(true);
  };

  return (
    <>
      <CardBoxModal
        title="Record Information"
        buttonColor="info"
        buttonLabel="Close"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        {selectedRecord && (
          <>
            <p><b>Record ID:</b> {selectedRecord.recordID}</p>
            <p><b>Date:</b> {selectedRecord.date}</p>
            <p><b>Notes:</b> {selectedRecord.notes}</p>
            <p><b>Diagnosis:</b> {selectedRecord.diagnosis}</p>
            <p><b>Treatment:</b> {selectedRecord.treatment}</p>
            <p><b>Patient ID:</b> {selectedRecord.patientId}</p>
            <p><b>Doctor ID:</b> {selectedRecord.doctorId}</p>
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
        <p>Are you sure you want to delete this record?</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th />
            <th>Date</th>
            <th>Notes</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {recordsPaginated.map((record: Record) => (
            <tr key={record.recordID}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {/* You can customize this part based on your needs */}
                <UserAvatar username={`${record.patientId}`} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Date">{record.date}</td>
              <td data-label="Notes">{record.notes}</td>
              <td data-label="Diagnosis">{record.diagnosis}</td>
              <td data-label="Treatment">{record.treatment}</td>
              <td data-label="Patient ID">{record.patientId}</td>
              <td data-label="Doctor ID">{record.doctorId}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => handleInfoButtonClick(record)}
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

export default SampleMedicalRecords;
