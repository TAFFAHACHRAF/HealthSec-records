import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBox/Component/Empty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'
import Cookies from 'universal-cookie'
import SamplePatients from '../components/Table/SamplePatients'

// Define Props type if needed
// interface Props {}

const PatientPage =() => {
  const [patients, setPatients] = useState<any[]>([]);
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://localhost:8082/api/v1/patients/all', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        setPatients(data.content); // Assuming 'content' contains the array of patients
      } catch (error) {
        console.error('Fetch patients error:', error.message);
        // Handle error fetching patients
      }
    };

    fetchPatients();
  }, [accessToken]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Patients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Patients" main>
          <Button
            href=""
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar>

        <CardBox className="mb-6" hasTable>
          {/* Assuming SamplePatients renders CardBoxTransaction */}
          <SamplePatients patients={patients} />
        </CardBox>

        <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

        <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar>

        {patients.length === 0 && (
          <CardBox>
            <p>No patients found.</p>
          </CardBox>
        )}
      </SectionMain>
    </>
  );
};

PatientPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default PatientPage;
