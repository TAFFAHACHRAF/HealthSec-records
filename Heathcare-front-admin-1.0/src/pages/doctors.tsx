import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import LayoutAuthenticated from '../layouts/Authenticated';
import NotificationBar from '../components/NotificationBar';
import SectionMain from '../components/Section/Main';
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton';
import SampleDoctors from '../components/Table/SampleDoctors';
import { getPageTitle } from '../config';
import Cookies from 'universal-cookie';

const DoctorPage = (): ReactElement => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://localhost:8082/api/v1/doctors/all', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }

        const data = await response.json();
        setDoctors(data.content); // Assuming 'content' contains the array of doctors
      } catch (error) {
        console.error('Fetch doctors error:', error.message);
        // Handle error fetching doctors
      }
    };

    fetchDoctors();
  }, [accessToken]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Doctors')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Doctors" main>
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
          <SampleDoctors doctors={doctors} /> {/* Render your doctors data */}
        </CardBox>

        <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

        <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar>

        {doctors.length === 0 && (
          <CardBox>
            <p>No doctors found.</p>
          </CardBox>
        )}
      </SectionMain>
    </>
  );
};

DoctorPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default DoctorPage;
