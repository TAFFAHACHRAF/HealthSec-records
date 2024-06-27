import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import SampleMedicalRecords from '../components/Table/SampleMedicalRecords'
import { getPageTitle } from '../config'
import Cookies from 'universal-cookie'

const MedicalRecordsPage = () => {
  const [records, setRecords] = useState<any[]>([]);
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://localhost:8082/api/v1/records/all', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }

        const data = await response.json();
        setRecords(data.content);
      } catch (error) {
        console.error('Fetch records error:', error.message);
        // Handle error fetching records
      }
    };

    fetchRecords();
  }, [accessToken]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Medical Records')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Medical Records" main>
          <Button
            href="https://github.com/justboil/admin-one-react-tailwind"
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
          <SampleMedicalRecords records={records} /> {/* Assuming SamplePatients can handle records */}
        </CardBox>

        <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

        <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar>

        {records.length === 0 && (
          <CardBox>
            <p>No medical records found.</p>
          </CardBox>
        )}
      </SectionMain>
    </>
  );
};

MedicalRecordsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default MedicalRecordsPage;
